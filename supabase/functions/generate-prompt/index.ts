import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const ALLOWED_ORIGINS = [
  "https://bdprompt.com",
  "https://www.bdprompt.com",
  "http://localhost:5173",
  "http://localhost:3000",
  "https://id-preview--8787d62d-ea8a-489d-9b35-936ad6e92151.lovable.app",
  "https://bangla-prompt.lovable.app",
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

const RATE_LIMIT_MAX_REQUESTS = 20;
const RATE_LIMIT_WINDOW_MINUTES = 60;

// Map frontend model names to Lovable AI model names
const MODEL_MAP: Record<string, string> = {
  "gemini-2.5-flash": "google/gemini-2.5-flash",
  "gemini-2.5-pro": "google/gemini-2.5-pro",
  "gpt-4o-mini": "openai/gpt-5-mini",
  "gemini-3-flash": "google/gemini-3-flash-preview",
};

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
      _function_name: "generate-prompt",
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
      _function_name: "generate-prompt",
    });

    const { prompt, model = "gemini-2.5-flash", temperature = 0.7, maxTokens = 1024 } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      throw new Error("AI service is not configured");
    }
    
    if (!prompt || typeof prompt !== "string" || prompt.length > 10000) {
      return new Response(JSON.stringify({ error: "Invalid prompt. Must be a string under 10000 characters." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const safeTemperature = typeof temperature === "number" ? Math.min(2, Math.max(0, temperature)) : 0.7;
    const safeMaxTokens = typeof maxTokens === "number" ? Math.min(4096, Math.max(50, maxTokens)) : 1024;
    
    // Map frontend model to Lovable AI model
    const aiModel = MODEL_MAP[model] || "google/gemini-3-flash-preview";

    console.log(`Generating with model: ${aiModel}, temperature: ${safeTemperature}, maxTokens: ${safeMaxTokens}`);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: aiModel,
        messages: [
          { 
            role: "system", 
            content: "You are a helpful AI assistant for BDPrompt, a Bengali AI prompt platform. Respond in the same language as the user's prompt. If the prompt is in Bengali, respond in Bengali. Be helpful, creative, and concise." 
          },
          { role: "user", content: prompt }
        ],
        temperature: safeTemperature,
        max_tokens: safeMaxTokens,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Lovable AI error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please contact support." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error("AI generation failed");
    }

    const data = await response.json();
    const generatedText = data.choices?.[0]?.message?.content || "";

    return new Response(JSON.stringify({ output: generatedText }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-prompt error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "An error occurred. Please try again." }), {
      status: 500,
      headers: { ...getCorsHeaders(req), "Content-Type": "application/json" },
    });
  }
});
