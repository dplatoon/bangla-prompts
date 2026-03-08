import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const ALLOWED_ORIGINS = [
  "https://bdprompt.com",
  "https://www.bdprompt.com",
  "https://id-preview--8787d62d-ea8a-489d-9b35-936ad6e92151.lovable.app",
  "https://bangla-prompt.lovable.app",
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

const RATE_LIMIT_MAX_REQUESTS = 15;
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
      _function_name: "suggest-prompt",
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
      _function_name: "suggest-prompt",
    });

    const { prompt, language = 'en' } = await req.json();
    const OPENAI_API_KEY = Deno.env.get("OPENAI_API_KEY");
    
    if (!OPENAI_API_KEY) {
      console.error("OPENAI_API_KEY is not configured");
      throw new Error("Service configuration error");
    }
    
    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0 || prompt.length > 10000) {
      return new Response(JSON.stringify({ error: "Invalid request", code: "VALIDATION_ERROR" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    
    if (containsSuspiciousPatterns(prompt)) {
      console.warn("Suspicious pattern detected in prompt from user:", user.id);
      return new Response(JSON.stringify({ error: "Invalid request content", code: "VALIDATION_ERROR" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    
    if (language && typeof language !== "string" || !['en', 'bn'].includes(language)) {
      return new Response(JSON.stringify({ error: "Invalid request", code: "VALIDATION_ERROR" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const systemMessage = language === 'bn' 
      ? `আপনি একজন প্রম্পট ইঞ্জিনিয়ারিং বিশেষজ্ঞ। ব্যবহারকারীর প্রম্পট উন্নত করতে 3টি সংক্ষিপ্ত পরামর্শ দিন। প্রতিটি পরামর্শ একটি বাক্যে দিন। শুধুমাত্র পরামর্শগুলি দিন, অন্য কোনো ব্যাখ্যা নয়।`
      : `You are a prompt engineering expert. Provide 3 brief suggestions to improve the user's prompt. Each suggestion should be one sentence. Only provide the suggestions, no other explanation.`;

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
            { role: "system", content: systemMessage },
            { role: "user", content: `Prompt to improve: "${prompt}"` }
          ],
          temperature: 0.8,
          max_tokens: 500,
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
        const errorText = await response.text();
        console.error("External API error:", response.status, errorText);
        throw new Error("Service error");
      }

      const data = await response.json();
      const suggestions = data.choices[0].message.content;

      return new Response(JSON.stringify({ suggestions }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } finally {
      clearTimeout(timeout);
    }
  } catch (e) {
    console.error("suggest-prompt error:", e);
    return new Response(JSON.stringify({ error: "Service temporarily unavailable", code: "SERVICE_ERROR" }), {
      status: 503,
      headers: { ...getCorsHeaders(req), "Content-Type": "application/json" },
    });
  }
});
