import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SITE_URL = 'https://bdprompt.com'

const STATIC_PAGES = [
  { loc: '/', priority: '1.0', changefreq: 'daily' },
  { loc: '/explore', priority: '0.9', changefreq: 'daily' },
  { loc: '/prompts', priority: '0.9', changefreq: 'daily' },
  { loc: '/playground', priority: '0.9', changefreq: 'daily' },
  { loc: '/guide', priority: '0.9', changefreq: 'weekly' },
  { loc: '/packs', priority: '0.8', changefreq: 'weekly' },
  { loc: '/product', priority: '0.8', changefreq: 'monthly' },
  { loc: '/shikkha', priority: '0.8', changefreq: 'weekly' },
  { loc: '/kobita', priority: '0.8', changefreq: 'weekly' },
  { loc: '/business', priority: '0.8', changefreq: 'weekly' },
  { loc: '/blog', priority: '0.8', changefreq: 'daily' },
  { loc: '/explore/business', priority: '0.8', changefreq: 'daily' },
  { loc: '/explore/code', priority: '0.8', changefreq: 'daily' },
  { loc: '/explore/content', priority: '0.8', changefreq: 'daily' },
  { loc: '/explore/education', priority: '0.8', changefreq: 'daily' },
  { loc: '/explore/image', priority: '0.8', changefreq: 'daily' },
  { loc: '/explore/marketing', priority: '0.8', changefreq: 'daily' },
  { loc: '/prompts/seo-bangla', priority: '0.8', changefreq: 'weekly' },
  { loc: '/prompts/marketing', priority: '0.8', changefreq: 'weekly' },
  { loc: '/prompts/freelancing', priority: '0.8', changefreq: 'weekly' },
  { loc: '/prompts/students', priority: '0.8', changefreq: 'weekly' },
  { loc: '/prompts/coding', priority: '0.8', changefreq: 'weekly' },
  { loc: '/prompts/business', priority: '0.8', changefreq: 'weekly' },
  { loc: '/prompts/creative-art', priority: '0.8', changefreq: 'weekly' },
  { loc: '/prompts/youtube-growth', priority: '0.8', changefreq: 'weekly' },
  { loc: '/prompts/bangla-writing', priority: '0.8', changefreq: 'weekly' },
  { loc: '/prompts/productivity', priority: '0.8', changefreq: 'weekly' },
  { loc: '/community', priority: '0.7', changefreq: 'weekly' },
  { loc: '/become-creator', priority: '0.7', changefreq: 'monthly' },
  { loc: '/blog/chatgpt-bangla-prompt', priority: '0.7', changefreq: 'monthly' },
  { loc: '/support', priority: '0.5', changefreq: 'monthly' },
  { loc: '/sitemap', priority: '0.5', changefreq: 'weekly' },
  { loc: '/legal', priority: '0.3', changefreq: 'yearly' },
  { loc: '/privacy', priority: '0.3', changefreq: 'yearly' },
  { loc: '/terms', priority: '0.3', changefreq: 'yearly' },
  { loc: '/cookies', priority: '0.3', changefreq: 'yearly' },
  { loc: '/dmca', priority: '0.3', changefreq: 'yearly' },
  { loc: '/guidelines', priority: '0.3', changefreq: 'yearly' },
]

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

function xmlUrl(loc: string, lastmod: string, changefreq: string, priority: string) {
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS })

  try {
    const url = new URL(req.url)
    const type = url.searchParams.get('type') || 'index'
    const today = new Date().toISOString().split('T')[0]

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    // --- INDEX SITEMAP (lists sub-sitemaps) ---
    if (type === 'index') {
      // Count total prompts for pagination
      const { count } = await supabase
        .from('prompts')
        .select('id', { count: 'exact', head: true })
        .eq('is_published', true)

      const totalPages = Math.ceil((count || 0) / 200)
      const sitemapEntries = [
        `  <sitemap><loc>${SITE_URL}/sitemap-pages.xml</loc><lastmod>${today}</lastmod></sitemap>`,
        `  <sitemap><loc>${SITE_URL}/sitemap-categories.xml</loc><lastmod>${today}</lastmod></sitemap>`,
      ]
      for (let i = 1; i <= Math.max(totalPages, 1); i++) {
        sitemapEntries.push(
          `  <sitemap><loc>${SITE_URL}/sitemap-prompts-${i}.xml</loc><lastmod>${today}</lastmod></sitemap>`
        )
      }

      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries.join('\n')}
</sitemapindex>`

      return new Response(xml, {
        headers: { ...CORS, 'Content-Type': 'application/xml', 'Cache-Control': 'public, max-age=3600' },
      })
    }

    // --- PAGES SITEMAP (static) ---
    if (type === 'pages') {
      const entries = STATIC_PAGES.map((p) =>
        xmlUrl(`${SITE_URL}${p.loc}`, today, p.changefreq, p.priority)
      ).join('\n')

      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>`

      return new Response(xml, {
        headers: { ...CORS, 'Content-Type': 'application/xml', 'Cache-Control': 'public, max-age=86400' },
      })
    }

    // --- CATEGORIES SITEMAP ---
    if (type === 'categories') {
      const { data: cats } = await supabase.from('categories').select('slug, created_at')
      const entries = (cats || []).map((c) =>
        xmlUrl(`${SITE_URL}/explore/${c.slug}`, c.created_at?.split('T')[0] || today, 'daily', '0.8')
      ).join('\n')

      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>`

      return new Response(xml, {
        headers: { ...CORS, 'Content-Type': 'application/xml', 'Cache-Control': 'public, max-age=86400' },
      })
    }

    // --- PROMPTS SITEMAP (paginated, 200 per page) ---
    if (type.startsWith('prompts-')) {
      const page = parseInt(type.replace('prompts-', '')) || 1
      const pageSize = 200
      const from = (page - 1) * pageSize
      const to = from + pageSize - 1

      const { data: prompts } = await supabase
        .from('prompts')
        .select('id, slug, updated_at')
        .eq('is_published', true)
        .order('updated_at', { ascending: false })
        .range(from, to)

      const entries = (prompts || []).map((p) => {
        const loc = p.slug
          ? `${SITE_URL}/prompt/${p.slug}`
          : `${SITE_URL}/prompt/${p.id}`
        const lastmod = p.updated_at?.split('T')[0] || today
        return xmlUrl(loc, lastmod, 'weekly', '0.8')
      }).join('\n')

      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>`

      return new Response(xml, {
        headers: { ...CORS, 'Content-Type': 'application/xml', 'Cache-Control': 'public, max-age=3600' },
      })
    }

    return new Response('Unknown sitemap type', { status: 400 })
  } catch (err) {
    console.error('Sitemap error:', err)
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...CORS, 'Content-Type': 'application/json' },
    })
  }
})
