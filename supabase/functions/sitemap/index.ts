import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/xml; charset=utf-8',
  'Cache-Control': 'public, max-age=3600, s-maxage=86400',
}

const URLS_PER_SITEMAP = 1000 // Maximum URLs per sitemap for better crawling

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  const url = new URL(req.url)
  const sitemapType = url.searchParams.get('type') || 'index'

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)
    const baseUrl = 'https://bdprompt.com'
    const today = new Date().toISOString().split('T')[0]

    console.log(`Generating sitemap: ${sitemapType}`)

    // Handle different sitemap types
    if (sitemapType === 'index') {
      return generateSitemapIndex(baseUrl, today, supabase)
    } else if (sitemapType === 'pages') {
      return generatePagesSitemap(baseUrl, today)
    } else if (sitemapType === 'categories') {
      return generateCategoriesSitemap(baseUrl, today, supabase)
    } else if (sitemapType.startsWith('prompts')) {
      const page = parseInt(sitemapType.replace('prompts-', '') || '1', 10)
      return generatePromptsSitemap(baseUrl, today, supabase, page)
    }

    // Default to index
    return generateSitemapIndex(baseUrl, today, supabase)
  } catch (error) {
    console.error('Sitemap generation error:', error)
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://bdprompt.com/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>`,
      { status: 200, headers: corsHeaders }
    )
  }
})

// Generate sitemap index that references all sub-sitemaps
async function generateSitemapIndex(baseUrl: string, today: string, supabase: any) {
  console.log('Generating sitemap index...')

  // Count total prompts to determine how many prompt sitemaps we need
  const { count: promptCount, error } = await supabase
    .from('prompts')
    .select('*', { count: 'exact', head: true })
    .eq('is_published', true)

  if (error) {
    console.error('Error counting prompts:', error)
  }

  const totalPrompts = promptCount || 0
  const promptSitemapCount = Math.ceil(totalPrompts / URLS_PER_SITEMAP)

  console.log(`Total prompts: ${totalPrompts}, Sitemap pages needed: ${promptSitemapCount}`)

  const functionUrl = `${Deno.env.get('SUPABASE_URL')}/functions/v1/sitemap`

  let sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  
  <!-- Static Pages Sitemap -->
  <sitemap>
    <loc>${functionUrl}?type=pages</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  
  <!-- Categories Sitemap -->
  <sitemap>
    <loc>${functionUrl}?type=categories</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
`

  // Add prompt sitemaps (paginated)
  for (let i = 1; i <= Math.max(1, promptSitemapCount); i++) {
    sitemapIndex += `
  <!-- Prompts Sitemap (Page ${i} of ${Math.max(1, promptSitemapCount)}) -->
  <sitemap>
    <loc>${functionUrl}?type=prompts-${i}</loc>
    <lastmod>${today}</lastmod>
  </sitemap>`
  }

  sitemapIndex += `
</sitemapindex>`

  console.log(`Sitemap index generated with ${2 + Math.max(1, promptSitemapCount)} sub-sitemaps`)

  return new Response(sitemapIndex, { headers: corsHeaders, status: 200 })
}

// Generate sitemap for static pages
function generatePagesSitemap(baseUrl: string, today: string) {
  console.log('Generating pages sitemap...')

const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/explore', priority: '0.9', changefreq: 'daily' },
    { url: '/playground', priority: '0.9', changefreq: 'daily' },
    { url: '/packs', priority: '0.8', changefreq: 'weekly' },
    { url: '/product', priority: '0.8', changefreq: 'weekly' },
    { url: '/api', priority: '0.7', changefreq: 'weekly' },
    { url: '/community', priority: '0.8', changefreq: 'weekly' },
    { url: '/blog', priority: '0.8', changefreq: 'daily' },
    { url: '/shikkha', priority: '0.8', changefreq: 'weekly' },
    { url: '/kobita', priority: '0.8', changefreq: 'weekly' },
    { url: '/business', priority: '0.8', changefreq: 'weekly' },
    { url: '/resources', priority: '0.7', changefreq: 'weekly' },
    { url: '/become-creator', priority: '0.7', changefreq: 'monthly' },
    { url: '/support', priority: '0.5', changefreq: 'monthly' },
    { url: '/legal', priority: '0.3', changefreq: 'yearly' },
    { url: '/privacy', priority: '0.3', changefreq: 'yearly' },
    { url: '/terms', priority: '0.3', changefreq: 'yearly' },
    { url: '/cookies', priority: '0.3', changefreq: 'yearly' },
    { url: '/dmca', priority: '0.3', changefreq: 'yearly' },
    { url: '/guidelines', priority: '0.3', changefreq: 'yearly' },
    // Prompt category pages
    { url: '/prompts', priority: '0.9', changefreq: 'daily' },
    { url: '/prompts/seo-bangla', priority: '0.8', changefreq: 'weekly' },
    { url: '/prompts/marketing', priority: '0.8', changefreq: 'weekly' },
    { url: '/prompts/freelancing', priority: '0.8', changefreq: 'weekly' },
    { url: '/prompts/students', priority: '0.8', changefreq: 'weekly' },
    { url: '/prompts/coding', priority: '0.8', changefreq: 'weekly' },
    { url: '/prompts/business', priority: '0.8', changefreq: 'weekly' },
    { url: '/prompts/creative-art', priority: '0.8', changefreq: 'weekly' },
    { url: '/prompts/youtube-growth', priority: '0.8', changefreq: 'weekly' },
    { url: '/prompts/bangla-writing', priority: '0.8', changefreq: 'weekly' },
    { url: '/prompts/productivity', priority: '0.8', changefreq: 'weekly' },
  ]

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

  <!-- Homepage with language alternatives -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="bn" href="${baseUrl}/" />
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/?lang=en" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/" />
    <image:image>
      <image:loc>${baseUrl}/og-image.png</image:loc>
      <image:title>bdprompt.com - বাংলা AI প্রম্পট হাব</image:title>
    </image:image>
  </url>
`

  for (const page of staticPages.slice(1)) {
    sitemap += `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <xhtml:link rel="alternate" hreflang="bn" href="${baseUrl}${page.url}" />
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}${page.url}?lang=en" />
  </url>`
  }

  sitemap += `
</urlset>`

  console.log(`Pages sitemap generated with ${staticPages.length} URLs`)

  return new Response(sitemap, { headers: corsHeaders, status: 200 })
}

// Generate sitemap for categories
async function generateCategoriesSitemap(baseUrl: string, today: string, supabase: any) {
  console.log('Generating categories sitemap...')

  const { data: categories, error } = await supabase
    .from('categories')
    .select('slug, name_bn, name_en')

  if (error) {
    console.error('Error fetching categories:', error)
    throw error
  }

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
`

  if (categories && categories.length > 0) {
    for (const category of categories) {
      // Use clean URL paths instead of query parameters
      const categorySlug = category.slug.toLowerCase()
      sitemap += `
  <url>
    <loc>${baseUrl}/explore/${encodeURIComponent(categorySlug)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="bn" href="${baseUrl}/explore/${encodeURIComponent(categorySlug)}" />
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/explore/${encodeURIComponent(categorySlug)}?lang=en" />
  </url>`
    }
  }

  sitemap += `
</urlset>`

  console.log(`Categories sitemap generated with ${categories?.length || 0} URLs`)

  return new Response(sitemap, { headers: corsHeaders, status: 200 })
}

// Generate paginated sitemap for prompts
async function generatePromptsSitemap(baseUrl: string, today: string, supabase: any, page: number) {
  console.log(`Generating prompts sitemap page ${page}...`)

  const offset = (page - 1) * URLS_PER_SITEMAP

  const { data: prompts, error } = await supabase
    .from('prompts')
    .select('slug, updated_at, title_bn, title_en')
    .eq('is_published', true)
    .order('updated_at', { ascending: false })
    .range(offset, offset + URLS_PER_SITEMAP - 1)

  if (error) {
    console.error('Error fetching prompts:', error)
    throw error
  }

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
`

  if (prompts && prompts.length > 0) {
    for (const prompt of prompts) {
      const lastmod = prompt.updated_at ? prompt.updated_at.split('T')[0] : today
      sitemap += `
  <url>
    <loc>${baseUrl}/prompt/${encodeURIComponent(prompt.slug)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
    <xhtml:link rel="alternate" hreflang="bn" href="${baseUrl}/prompt/${encodeURIComponent(prompt.slug)}" />
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/prompt/${encodeURIComponent(prompt.slug)}?lang=en" />
  </url>`
    }
  }

  sitemap += `
</urlset>`

  console.log(`Prompts sitemap page ${page} generated with ${prompts?.length || 0} URLs`)

  return new Response(sitemap, { headers: corsHeaders, status: 200 })
}
