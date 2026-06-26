import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeadersPublic } from "../_shared/cors.ts";

const corsHeaders = corsHeadersPublic;

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const title = (url.searchParams.get("title") || "AI Prompt").slice(0, 200);
    const titleBn = (url.searchParams.get("titleBn") || "").slice(0, 200);
    const category = (url.searchParams.get("category") || "").slice(0, 100);
    const author = (url.searchParams.get("author") || "bdprompt.com").slice(0, 100);
    const rawPrice = (url.searchParams.get("price") || "0").slice(0, 20);
    const rawRating = (url.searchParams.get("rating") || "4.5").slice(0, 10);
    // Validate numeric inputs; fall back to safe defaults if not numeric
    const price = /^\d+(\.\d+)?$/.test(rawPrice) ? rawPrice : "0";
    const rating = /^\d+(\.\d+)?$/.test(rawRating) ? rawRating : "4.5";

    // Display title (prefer Bengali if available)
    const displayTitle = titleBn || title;
    const isFree = price === "0" || price === "";
    const priceText = isFree ? "ফ্রি" : `৳${price}`;

    // Generate SVG-based OG image
    const svg = `
      <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#0f766e;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#115e59;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#134e4a;stop-opacity:1" />
          </linearGradient>
          <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#ffb020;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#f59e0b;stop-opacity:1" />
          </linearGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="8" flood-opacity="0.3"/>
          </filter>
        </defs>
        
        <!-- Background -->
        <rect width="1200" height="630" fill="url(#bgGradient)"/>
        
        <!-- Decorative pattern -->
        <g opacity="0.1">
          <circle cx="100" cy="100" r="150" fill="white"/>
          <circle cx="1100" cy="530" r="200" fill="white"/>
          <circle cx="900" cy="80" r="80" fill="white"/>
        </g>
        
        <!-- Logo area -->
        <g filter="url(#shadow)">
          <rect x="60" y="50" width="80" height="80" rx="16" fill="white"/>
          <text x="100" y="105" font-family="Arial, sans-serif" font-size="48" font-weight="bold" fill="#0f766e" text-anchor="middle">B</text>
        </g>
        
        <!-- Brand name -->
        <text x="160" y="105" font-family="Arial, sans-serif" font-size="32" font-weight="bold" fill="white">bdprompt.com</text>
        
        <!-- Category badge -->
        <g transform="translate(60, 160)">
          <rect width="${Math.max(category.length * 14 + 40, 120)}" height="40" rx="20" fill="url(#accentGradient)"/>
          <text x="${Math.max(category.length * 7 + 20, 60)}" y="27" font-family="Arial, sans-serif" font-size="18" font-weight="600" fill="#1a1a1a" text-anchor="middle">${escapeXml(category)}</text>
        </g>
        
        <!-- Main title -->
        <foreignObject x="60" y="230" width="1080" height="200">
          <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: 'Noto Sans Bengali', Arial, sans-serif; font-size: 56px; font-weight: bold; color: white; line-height: 1.2; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;">
            ${escapeHtml(displayTitle)}
          </div>
        </foreignObject>
        
        <!-- Bottom info bar -->
        <rect x="0" y="530" width="1200" height="100" fill="rgba(0,0,0,0.3)"/>
        
        <!-- Author -->
        <g transform="translate(60, 565)">
          <circle cx="20" cy="20" r="20" fill="white" opacity="0.2"/>
          <text x="20" y="27" font-family="Arial, sans-serif" font-size="20" fill="white" opacity="0.8" text-anchor="middle">👤</text>
          <text x="55" y="27" font-family="Arial, sans-serif" font-size="20" fill="white">${escapeXml(author)}</text>
        </g>
        
        <!-- Rating -->
        <g transform="translate(350, 565)">
          <text x="0" y="27" font-family="Arial, sans-serif" font-size="20" fill="#fbbf24">★</text>
          <text x="30" y="27" font-family="Arial, sans-serif" font-size="20" fill="white">${escapeXml(rating)}</text>
        </g>
        
        <!-- Price badge -->
        <g transform="translate(1000, 555)">
          <rect width="140" height="50" rx="25" fill="url(#accentGradient)"/>
          <text x="70" y="33" font-family="'Noto Sans Bengali', Arial, sans-serif" font-size="22" font-weight="bold" fill="#1a1a1a" text-anchor="middle">${escapeXml(priceText)}</text>
        </g>
        
        <!-- Tagline -->
        <text x="600" y="500" font-family="'Noto Sans Bengali', Arial, sans-serif" font-size="24" fill="white" opacity="0.8" text-anchor="middle">বাংলা AI প্রম্পট হাব</text>
      </svg>
    `;

    return new Response(svg, {
      headers: {
        ...corsHeaders,
        "Content-Type": "image/svg+xml",
        "Cache-Control": "public, max-age=86400, s-maxage=86400",
      },
    });
  } catch (error) {
    console.error("OG Image generation error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to generate OG image" }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});

// Helper functions to escape XML/HTML entities
function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
