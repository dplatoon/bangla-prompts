import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Fetch all published prompts
    const { data: prompts, error } = await supabase
      .from('prompts')
      .select('id, slug, updated_at, created_at')
      .eq('is_published', true)
      .order('updated_at', { ascending: false })

    if (error) throw error

    const baseUrl = 'https://bdprompt.com'
    const today = new Date().toISOString().split('T')[0]

    // Static pages already in public/sitemap.xml (kept here for completeness)
    const staticUrls = [
      { loc: `${baseUrl}/`, priority: '1.0', changefreq: 'daily', lastmod: today },
      { loc: `${baseUrl}/explore`, priority: '0.9', changefreq: 'daily', lastmod: today },
      { loc: `${baseUrl}/prompts`, priority: '0.9', changefreq: 'daily', lastmod: today },
      { loc: `${baseUrl}/playground`, priority: '0.9', changefreq: 'daily', lastmod: today },
      { loc: `${baseUrl}/packs`, priority: '0.8', changefreq: 'weekly', lastmod: today },
      { loc: `${baseUrl}/blog`, priority: '0.8', changefreq: 'daily', lastmod: today },
    ]

    // Dynamic prompt pages
    const dynamicUrls = (prompts || []).map((prompt) => ({
      loc: prompt.slug
        ? `${baseUrl}/prompt/${prompt.slug}`
        : `${baseUrl}/prompt/${prompt.id}`,
      priority: '0.8',
      changefreq: 'weekly',
      lastmod: prompt.updated_at
        ? prompt.updated_at.split('T')[0]
        : prompt.created_at
        ? prompt.created_at.split('T')[0]
        : today,
    }))

    const allUrls = [...staticUrls, ...dynamicUrls]

    const urlEntries = allUrls
      .map(
        (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
      )
      .join('\n')

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`

    return new Response(sitemap, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600',
      },
    })
  } catch (error) {
    console.error('Sitemap generation error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
