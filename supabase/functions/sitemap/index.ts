import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

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
    "Content-Type": "application/xml",
  };
}

Deno.serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);
  
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    // Fetch all published prompts
    const { data: prompts, error: promptsError } = await supabase
      .from('prompts')
      .select('slug, updated_at')
      .eq('is_published', true)
      .order('updated_at', { ascending: false })

    if (promptsError) throw promptsError

    // Fetch all categories
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('slug')

    if (categoriesError) throw categoriesError

    const baseUrl = 'https://bdprompt.com'
    const today = new Date().toISOString().split('T')[0]

    // Static pages with their priorities
    const staticPages = [
      { url: '/', priority: '1.0', changefreq: 'daily' },
      { url: '/explore', priority: '0.9', changefreq: 'daily' },
      { url: '/playground', priority: '0.8', changefreq: 'weekly' },
      { url: '/prompt-packs', priority: '0.8', changefreq: 'weekly' },
      { url: '/product', priority: '0.7', changefreq: 'weekly' },
      { url: '/api', priority: '0.7', changefreq: 'weekly' },
      { url: '/community', priority: '0.7', changefreq: 'weekly' },
      { url: '/blog', priority: '0.7', changefreq: 'weekly' },
      { url: '/shikkha', priority: '0.8', changefreq: 'weekly' },
      { url: '/kobita', priority: '0.8', changefreq: 'weekly' },
      { url: '/business', priority: '0.8', changefreq: 'weekly' },
      { url: '/resources', priority: '0.7', changefreq: 'weekly' },
      { url: '/become-creator', priority: '0.6', changefreq: 'monthly' },
      { url: '/support', priority: '0.5', changefreq: 'monthly' },
      { url: '/legal', priority: '0.3', changefreq: 'monthly' },
      { url: '/privacy', priority: '0.3', changefreq: 'monthly' },
      { url: '/terms', priority: '0.3', changefreq: 'monthly' },
      { url: '/cookies', priority: '0.3', changefreq: 'monthly' },
      { url: '/dmca', priority: '0.3', changefreq: 'monthly' },
      { url: '/guidelines', priority: '0.3', changefreq: 'monthly' },
    ]

    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`

    // Add static pages
    for (const page of staticPages) {
      sitemap += `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    ${page.url === '/' ? `<xhtml:link rel="alternate" hreflang="bn" href="${baseUrl}/" />
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/?lang=en" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/" />
    <image:image>
      <image:loc>${baseUrl}/og-image.png</image:loc>
      <image:title>bdprompt.com - বাংলা AI প্রম্পট হাব</image:title>
    </image:image>` : ''}
  </url>
`
    }

    // Add category pages
    if (categories) {
      for (const category of categories) {
        sitemap += `  <url>
    <loc>${baseUrl}/explore?category=${category.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
`
      }
    }

    // Add prompt detail pages
    if (prompts) {
      for (const prompt of prompts) {
        const lastmod = prompt.updated_at ? prompt.updated_at.split('T')[0] : today
        sitemap += `  <url>
    <loc>${baseUrl}/prompt/${prompt.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>
`
      }
    }

    sitemap += '</urlset>'

    return new Response(sitemap, {
      headers: corsHeaders,
      status: 200,
    })
  } catch (error) {
    console.error('Sitemap generation error:', error)
    return new Response(`Error generating sitemap: ${error.message}`, {
      status: 500,
      headers: { 'Content-Type': 'text/plain' },
    })
  }
})
