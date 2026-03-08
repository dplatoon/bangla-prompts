import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import Stripe from "https://esm.sh/stripe@14.21.0?target=deno";

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

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);
  
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

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
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    // User client for auth verification
    const supabaseUser = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: { user }, error: userError } = await supabaseUser.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Invalid authentication" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { promptId, successUrl, cancelUrl } = await req.json();

    if (!promptId || typeof promptId !== "string") {
      return new Response(JSON.stringify({ error: "Invalid prompt ID" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Use service role client to read prompt data (bypasses admin-only RLS)
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    const { data: prompt, error: promptError } = await supabaseAdmin
      .from("prompts")
      .select("id, title_bn, title_en, price, is_free, is_published")
      .eq("id", promptId)
      .single();

    if (promptError || !prompt) {
      console.error("Prompt not found:", promptError);
      return new Response(JSON.stringify({ error: "Prompt not found" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!prompt.is_published) {
      return new Response(JSON.stringify({ error: "Prompt is not available" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (prompt.is_free || prompt.price === 0) {
      return new Response(JSON.stringify({ error: "This prompt is free" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check if already purchased (use service role for reliable check)
    const { data: existingPurchase } = await supabaseAdmin
      .from("prompt_purchases")
      .select("id")
      .eq("user_id", user.id)
      .eq("prompt_id", promptId)
      .single();

    if (existingPurchase) {
      return new Response(JSON.stringify({ error: "You have already purchased this prompt" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeSecretKey) {
      console.error("STRIPE_SECRET_KEY not configured");
      return new Response(JSON.stringify({ error: "Service temporarily unavailable", code: "SERVICE_ERROR" }), {
        status: 503,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const stripe = new Stripe(stripeSecretKey, {
      apiVersion: "2023-10-16",
    });

    const priceInBDT = Number(prompt.price);
    const BDT_TO_USD_RATE = 121;
    const priceInUSD = Math.ceil(priceInBDT / BDT_TO_USD_RATE);
    const priceInCents = Math.max(50, priceInUSD * 100);

    console.log(`Creating checkout for prompt ${promptId}, price: ${priceInBDT} BDT = ${priceInCents} cents USD`);

    // Add timeout to Stripe API call
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: prompt.title_bn || prompt.title_en,
                description: `Premium AI Prompt - bdprompt.com`,
              },
              unit_amount: priceInCents,
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: successUrl || `${req.headers.get("origin")}/prompt/${promptId}?purchase=success`,
        cancel_url: cancelUrl || `${req.headers.get("origin")}/prompt/${promptId}?purchase=cancelled`,
        metadata: {
          prompt_id: promptId,
          user_id: user.id,
          amount_bdt: priceInBDT.toString(),
        },
        customer_email: user.email,
      });

      console.log(`Checkout session created: ${session.id}`);

      return new Response(JSON.stringify({ url: session.url, sessionId: session.id }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } finally {
      clearTimeout(timeout);
    }
  } catch (error) {
    console.error("Checkout error:", error);
    return new Response(
      JSON.stringify({ error: "Service temporarily unavailable", code: "SERVICE_ERROR" }),
      {
        status: 503,
        headers: { ...getCorsHeaders(req), "Content-Type": "application/json" },
      }
    );
  }
});
