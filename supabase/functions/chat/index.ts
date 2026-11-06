import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { getCorsHeaders } from "../_shared/cors.ts";

const RATE_LIMIT_MAX_REQUESTS = 30;
const RATE_LIMIT_WINDOW_MINUTES = 60;

const SUSPICIOUS_PATTERNS = [
  /ignore.*previous.*instructions/i,
  /disregard.*above.*instructions/i,
  /forget.*everything.*said/i,
  /system.*role.*admin/i,
  /\[SYSTEM\]/i,
  /\[ADMIN\]/i,
  /bypass.*security/i,
  /reveal.*api.*key/i,
  /show.*password/i,
];

function containsSuspiciousPatterns(content: string): boolean {
  return SUSPICIOUS_PATTERNS.some(pattern => pattern.test(content));
}

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);
  
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Authentication required" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Invalid authentication" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { data: withinLimit } = await supabase.rpc("check_rate_limit", {
      _user_id: user.id,
      _function_name: "chat",
      _max_requests: RATE_LIMIT_MAX_REQUESTS,
      _window_minutes: RATE_LIMIT_WINDOW_MINUTES,
    });

    if (!withinLimit) {
      return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    await supabase.rpc("log_ai_usage", {
      _user_id: user.id,
      _function_name: "chat",
    });

    const { messages } = await req.json();
    
    if (!Array.isArray(messages) || messages.length === 0 || messages.length > 50) {
      return new Response(JSON.stringify({ error: "Invalid request", code: "VALIDATION_ERROR" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let totalChars = 0;
    for (const msg of messages) {
      if (!msg || typeof msg !== 'object') {
        return new Response(JSON.stringify({ error: "Invalid request", code: "VALIDATION_ERROR" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      // Only user/assistant roles allowed from callers; the server defines the system prompt itself
      if (!msg.role || typeof msg.role !== 'string' || !['user', 'assistant'].includes(msg.role)) {
        return new Response(JSON.stringify({ error: "Invalid request", code: "VALIDATION_ERROR" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (!msg.content || typeof msg.content !== 'string' || msg.content.length > 2000) {
        return new Response(JSON.stringify({ error: "Invalid request", code: "VALIDATION_ERROR" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (containsSuspiciousPatterns(msg.content)) {
        console.warn("Suspicious pattern detected in message from user:", user.id);
        return new Response(JSON.stringify({ error: "Invalid request content", code: "VALIDATION_ERROR" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      totalChars += msg.content.length;
    }

    if (totalChars > 20000) {
      return new Response(JSON.stringify({ error: "Total message length exceeds limit", code: "VALIDATION_ERROR" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
    if (!OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY is not configured");
      throw new Error("Service configuration error");
    }

    // Add timeout to external API call
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { 
              role: "system", 
              content: `You are a helpful AI assistant for bdprompt.com, a Bangla AI prompts marketplace. 
              
Your responsibilities:
1. Help users find relevant prompts by understanding their needs
2. Assist in creating custom prompts with best practices
3. Provide bilingual support (Bangla/English) - respond in the same language the user uses
4. Guide users through the platform features
5. Offer prompt engineering tips and suggestions

Be concise, friendly, and culturally aware when dealing with Bangla users. If a user asks in Bangla (বাংলা), respond in Bangla. If they ask in English, respond in English.`
            },
            // Conversation history is caller-controlled, so never grant it the
            // assistant role. Treat every supplied turn as untrusted user context.
            ...messages.slice(-20).map((msg: { role: string; content: string }) => ({
              role: "user",
              content: msg.content,
            })),
          ],
          stream: true,
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        if (response.status === 429) {
          return new Response(JSON.stringify({ error: "Service busy. Please try again later.", code: "RATE_LIMIT" }), {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          });
        }
        const t = await response.text();
        console.error("External API error:", response.status, t);
        return new Response(JSON.stringify({ error: "Service temporarily unavailable", code: "SERVICE_ERROR" }), {
          status: 503,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      return new Response(response.body, {
        headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
      });
    } finally {
      clearTimeout(timeout);
    }
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: "Service temporarily unavailable", code: "SERVICE_ERROR" }), {
      status: 503,
      headers: { ...getCorsHeaders(req), "Content-Type": "application/json" },
    });
  }
});
