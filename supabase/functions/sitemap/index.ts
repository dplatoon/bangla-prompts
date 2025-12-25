import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Content-Type': 'application/xml; charset=utf-8',
  'Cache-Control': 'public, max-age=3600, s-maxage=86400',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!
    const supabase = createClient(supabaseUrl, supabaseKey)

    console.log('Generating comprehensive sitemap...')

    // Fetch all published prompts with category info
    const { data: prompts, error: promptsError } = await supabase
      .from('prompts')
      .select('slug, updated_at, title_bn, title_en, category_id')
      .eq('is_published', true)
      .order('updated_at', { ascending: false })

    if (promptsError) {
      console.error('Error fetching prompts:', promptsError)
      throw promptsError
    }

    // Fetch all categories
    const { data: categories, error: categoriesError } = await supabase
      .from('categories')
      .select('slug, name_bn, name_en')

    if (categoriesError) {
      console.error('Error fetching categories:', categoriesError)
      throw categoriesError
    }

    console.log(`Found ${prompts?.length || 0} prompts and ${categories?.length || 0} categories`)

    const baseUrl = 'https://bdprompt.com'
    const today = new Date().toISOString().split('T')[0]

    // Static pages with their priorities and change frequencies
    const staticPages = [
      { url: '/', priority: '1.0', changefreq: 'daily', title: 'বাংলা AI প্রম্পট হাব - bdprompt.com' },
      { url: '/explore', priority: '0.9', changefreq: 'daily', title: 'সকল প্রম্পট এক্সপ্লোর করুন' },
      { url: '/playground', priority: '0.9', changefreq: 'daily', title: 'AI প্লেগ্রাউন্ড' },
      { url: '/prompt-packs', priority: '0.8', changefreq: 'weekly', title: 'প্রম্পট প্যাক কিনুন' },
      { url: '/product', priority: '0.8', changefreq: 'weekly', title: 'প্রোডাক্ট তথ্য' },
      { url: '/api', priority: '0.7', changefreq: 'weekly', title: 'API ডকুমেন্টেশন' },
      { url: '/community', priority: '0.8', changefreq: 'weekly', title: 'কমিউনিটি' },
      { url: '/blog', priority: '0.8', changefreq: 'daily', title: 'ব্লগ ও আর্টিকেল' },
      { url: '/shikkha', priority: '0.8', changefreq: 'weekly', title: 'AI শিক্ষা' },
      { url: '/kobita', priority: '0.8', changefreq: 'weekly', title: 'বাংলা কবিতা জেনারেটর' },
      { url: '/business', priority: '0.8', changefreq: 'weekly', title: 'ব্যবসায়িক সমাধান' },
      { url: '/resources', priority: '0.7', changefreq: 'weekly', title: 'রিসোর্স ও গাইড' },
      { url: '/become-creator', priority: '0.7', changefreq: 'monthly', title: 'ক্রিয়েটর হোন' },
      { url: '/support', priority: '0.5', changefreq: 'monthly', title: 'সাপোর্ট' },
      { url: '/legal', priority: '0.3', changefreq: 'yearly', title: 'আইনি তথ্য' },
      { url: '/privacy', priority: '0.3', changefreq: 'yearly', title: 'গোপনীয়তা নীতি' },
      { url: '/terms', priority: '0.3', changefreq: 'yearly', title: 'শর্তাবলী' },
      { url: '/cookies', priority: '0.3', changefreq: 'yearly', title: 'কুকি নীতি' },
      { url: '/dmca', priority: '0.3', changefreq: 'yearly', title: 'DMCA নীতি' },
      { url: '/guidelines', priority: '0.3', changefreq: 'yearly', title: 'নির্দেশিকা' },
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

    // Add static pages (skip homepage as it's already added)
    for (const page of staticPages.slice(1)) {
      sitemap += `
  <!-- ${page.title} -->
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    }

    // Add category pages with Bengali alternates
    if (categories && categories.length > 0) {
      sitemap += `

  <!-- Category Pages -->`
      for (const category of categories) {
        sitemap += `
  <url>
    <loc>${baseUrl}/explore?category=${category.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="bn" href="${baseUrl}/explore?category=${category.slug}" />
  </url>`
      }
    }

    // Add all prompt detail pages
    if (prompts && prompts.length > 0) {
      sitemap += `

  <!-- Dynamic Prompt Pages (${prompts.length} total) -->`
      for (const prompt of prompts) {
        const lastmod = prompt.updated_at ? prompt.updated_at.split('T')[0] : today
        const title = prompt.title_bn || prompt.title_en || prompt.slug
        sitemap += `
  <url>
    <loc>${baseUrl}/prompt/${prompt.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
    <xhtml:link rel="alternate" hreflang="bn" href="${baseUrl}/prompt/${prompt.slug}" />
  </url>`
      }
    }

    sitemap += `
</urlset>`

    console.log(`Sitemap generated successfully with ${staticPages.length + (categories?.length || 0) + (prompts?.length || 0)} URLs`)

    return new Response(sitemap, {
      headers: corsHeaders,
      status: 200,
    })
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
      {
        status: 200,
        headers: corsHeaders,
      }
    )
  }
})
