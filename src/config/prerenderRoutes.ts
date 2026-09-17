// Routes to be pre-rendered at build time for SEO
// These routes will have static HTML generated during the build process

export const prerenderRoutes = [
  // Homepage
  '/',
  
  // Main explore pages
  '/explore',
  '/explore/business',
  '/explore/education',
  '/explore/content',
  '/explore/code',
  '/explore/image',
  '/explore/marketing',
  
  // Prompt category landing pages
  '/prompts',
  '/prompts/business',
  '/prompts/marketing',

  // Additional prompt cluster landing pages (audit fix — were falling back to homepage)
  '/prompts/seo-bangla',
  '/prompts/freelancing',
  '/prompts/students',
  '/prompts/coding',
  '/prompts/creative-art',
  '/prompts/youtube-growth',
  '/prompts/bangla-writing',
  '/prompts/productivity',
  
  // SEO landing pages
  '/shikkha',
  '/kobita',
  '/business',
  '/product',
  
  // Key content pages
  '/guide',
  '/playground',
  '/packs',
  '/api',
  '/resources',
  '/blog',
  '/blog/chatgpt-bangla-prompt',

  // Topic landing pages (audit fix — money pages were missing from prerender)
  '/youtube-script-prompts',
  '/image-generation-prompts',
  '/video-generation-prompts',
  '/facebook-post-prompts',
  '/ad-copy-prompts',
  '/ssc-exam-prompts',
  '/freelancer-prompts',
  
  // Community pages
  '/community',
  '/become-creator',
  '/guidelines',
  '/support',
  '/sitemap',
  
  // Legal/static pages
  '/legal',
  '/privacy',
  '/terms',
  '/cookies',
  '/dmca',
  
  // Auth pages (prerender for faster initial load)
  '/auth',

  // 404 — prerender so the host can serve it with a real 404 status
  '/404',
];

// Dynamic routes that need special handling
// These are fetched from the database at build time
export const dynamicRoutePatterns = {
  prompts: '/prompt/:slug',
  categories: '/explore/:category',
};

// Get total count for logging
export const getTotalRouteCount = () => prerenderRoutes.length;
