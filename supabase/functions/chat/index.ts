import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const ALLOWED_ORIGINS = [
  "https://bdprompt.com",
  "https://www.bdprompt.com",
  "http://localhost:5173",
  "http://localhost:3000",
];

function getCorsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get("origin") || "";
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Credentials": "true",
  };
}

const RATE_LIMIT_MAX_REQUESTS = 30;
const RATE_LIMIT_WINDOW_MINUTES = 60;

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);
  
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    // Verify JWT and get user
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

    // Check rate limit
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

    // Log usage
    await supabase.rpc("log_ai_usage", {
      _user_id: user.id,
      _function_name: "chat",
    });

    const { messages } = await req.json();
    
    // Validate messages array
    if (!Array.isArray(messages) || messages.length === 0 || messages.length > 50) {
      return new Response(JSON.stringify({ error: "Invalid request", code: "VALIDATION_ERROR" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Validate each message structure and calculate total length
    let totalChars = 0;
    for (const msg of messages) {
      if (!msg || typeof msg !== 'object') {
        return new Response(JSON.stringify({ error: "Invalid request", code: "VALIDATION_ERROR" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (!msg.role || typeof msg.role !== 'string' || !['user', 'assistant', 'system'].includes(msg.role)) {
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
      totalChars += msg.content.length;
    }

    // Prevent token exhaustion by limiting total message length
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
            content: `You are a helpful AI assistant for bdprompt.com, a Bengali AI prompts marketplace. 
            
Your responsibilities:
1. Help users find relevant prompts by understanding their needs
2. Assist in creating custom prompts with best practices
3. Provide bilingual support (Bengali/English) - respond in the same language the user uses
4. Guide users through the platform features
5. Offer prompt engineering tips and suggestions

Be concise, friendly, and culturally aware when dealing with Bengali users. If a user asks in Bengali (বাংলা), respond in Bengali. If they ask in English, respond in English.` 
          },
          ...messages.slice(-20), // Limit to last 20 messages for context
        ],
        stream: true,
      }),
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
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: "Service temporarily unavailable", code: "SERVICE_ERROR" }), {
      status: 503,
      headers: { ...getCorsHeaders(req), "Content-Type": "application/json" },
    });
  }
});
