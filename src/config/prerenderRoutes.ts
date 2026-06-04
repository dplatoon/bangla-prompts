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
  '/prompts/education',
  '/prompts/content',
  '/prompts/code',
  '/prompts/image',
  '/prompts/marketing',
  
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

  // Topic landing pages
  '/youtube-script-prompts',
  
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
];

// Dynamic routes that need special handling
// These are fetched from the database at build time
export const dynamicRoutePatterns = {
  prompts: '/prompt/:slug',
  categories: '/explore/:category',
};

// Get total count for logging
export const getTotalRouteCount = () => prerenderRoutes.length;
