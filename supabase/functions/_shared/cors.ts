// Shared CORS configuration for all edge functions
const ALLOWED_ORIGINS = [
  "https://bdprompt.com",
  "https://www.bdprompt.com",
  "https://id-preview--8787d62d-ea8a-489d-9b35-936ad6e92151.lovable.app",
  "https://bangla-prompt.lovable.app",
  "http://localhost:5173",
  "http://localhost:3000",
];

interface CorsOptions {
  extraHeaders?: string[];
  allowAllOrigins?: boolean;
}

/**
 * Get CORS headers for a request with optional extra headers
 * @param req - The incoming request
 * @param options - CORS options
 * @returns CORS headers object
 */
export function getCorsHeaders(req: Request, options?: CorsOptions): Record<string, string> {
  const { extraHeaders = [], allowAllOrigins = false } = options || {};
  
  const origin = req.headers.get("origin") || "";
  const allowedOrigin = allowAllOrigins 
    ? "*"
    : ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  
  const baseHeaders = [
    "authorization",
    "x-client-info",
    "apikey",
    "content-type",
  ];
  
  const allHeaders = [...baseHeaders, ...extraHeaders].join(", ");
  
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": allHeaders,
    "Access-Control-Allow-Credentials": allowAllOrigins ? "false" : "true",
  };
}

/**
 * Static CORS headers for public endpoints that don't need credential support
 */
export const corsHeadersPublic = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
