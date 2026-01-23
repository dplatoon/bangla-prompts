// Centralized SEO metadata configuration for all pages
// Each page should have unique title (50-60 chars) and description (140-155 chars)

export interface PageMetadata {
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  keywords?: string;
}

export const pageMetadata: Record<string, PageMetadata> = {
  '/': {
    title: 'বাংলা AI প্রম্পট জেনারেটর | 500+ প্রম্পট | BdPrompt',
    titleEn: 'Bangla AI Prompt Generator | 500+ Prompts | BdPrompt',
    description: '500+ বাংলা AI প্রম্পট ChatGPT, Claude, Gemini-এর জন্য। শিক্ষা, ব্যবসা, কন্টেন্ট, কবিতা এবং আরও অনেক কিছু।',
    descriptionEn: '500+ Bangla AI prompts for ChatGPT, Claude, Gemini. Education, business, content, poetry and more.',
    keywords: 'বাংলা AI প্রম্পট, Bangla prompts, ChatGPT বাংলা, AI prompts Bangladesh'
  },
  '/explore': {
    title: 'প্রম্পট এক্সপ্লোর করুন | 500+ বাংলা AI প্রম্পট | BdPrompt',
    titleEn: 'Explore Prompts | 500+ Bangla AI Prompts | BdPrompt',
    description: 'বিভিন্ন ক্যাটাগরিতে 500+ বাংলা AI প্রম্পট ব্রাউজ করুন। ChatGPT, Claude, Gemini-এর জন্য।',
    descriptionEn: 'Browse 500+ Bangla AI prompts across categories. For ChatGPT, Claude, Gemini.',
    keywords: 'AI প্রম্পট এক্সপ্লোর, browse prompts, বাংলা প্রম্পট ক্যাটাগরি'
  },
  '/explore/business': {
    title: 'ব্যবসা প্রম্পট | বাংলা AI প্রম্পট | BdPrompt',
    titleEn: 'Business Prompts | Bangla AI Prompts | BdPrompt',
    description: 'ব্যবসা সংক্রান্ত বাংলা AI প্রম্পট। মার্কেটিং, বিক্রয়, কাস্টমার সার্ভিস এবং আরও অনেক কিছুর জন্য।',
    descriptionEn: 'Business-related Bangla AI prompts. For marketing, sales, customer service and more.',
    keywords: 'ব্যবসা প্রম্পট, business AI prompts, মার্কেটিং প্রম্পট'
  },
  '/explore/education': {
    title: 'শিক্ষা প্রম্পট | বাংলা AI প্রম্পট | BdPrompt',
    titleEn: 'Education Prompts | Bangla AI Prompts | BdPrompt',
    description: 'শিক্ষামূলক বাংলা AI প্রম্পট। পড়াশোনা, অ্যাসাইনমেন্ট, গবেষণা এবং শিক্ষার জন্য।',
    descriptionEn: 'Educational Bangla AI prompts. For studying, assignments, research and learning.',
    keywords: 'শিক্ষা প্রম্পট, education AI prompts, অ্যাসাইনমেন্ট প্রম্পট'
  },
  '/explore/content': {
    title: 'কন্টেন্ট প্রম্পট | বাংলা AI প্রম্পট | BdPrompt',
    titleEn: 'Content Prompts | Bangla AI Prompts | BdPrompt',
    description: 'কন্টেন্ট তৈরির জন্য বাংলা AI প্রম্পট। ব্লগ, সোশ্যাল মিডিয়া, কপিরাইটিং এবং আরও অনেক কিছু।',
    descriptionEn: 'Bangla AI prompts for content creation. Blogs, social media, copywriting and more.',
    keywords: 'কন্টেন্ট প্রম্পট, content AI prompts, ব্লগ প্রম্পট'
  },
  '/explore/code': {
    title: 'কোড প্রম্পট | প্রোগ্রামিং AI প্রম্পট | BdPrompt',
    titleEn: 'Code Prompts | Programming AI Prompts | BdPrompt',
    description: 'প্রোগ্রামিং এবং কোডিং-এর জন্য বাংলা AI প্রম্পট। বাগ ফিক্স, কোড রিভিউ, অ্যালগরিদম।',
    descriptionEn: 'Bangla AI prompts for programming and coding. Bug fixes, code review, algorithms.',
    keywords: 'কোড প্রম্পট, programming prompts, coding AI prompts'
  },
  '/explore/image': {
    title: 'ইমেজ প্রম্পট | AI আর্ট প্রম্পট | BdPrompt',
    titleEn: 'Image Prompts | AI Art Prompts | BdPrompt',
    description: 'DALL-E, Midjourney, Stable Diffusion-এর জন্য বাংলা ইমেজ জেনারেশন প্রম্পট।',
    descriptionEn: 'Bangla image generation prompts for DALL-E, Midjourney, Stable Diffusion.',
    keywords: 'ইমেজ প্রম্পট, Midjourney prompts, AI art prompts'
  },
  '/explore/marketing': {
    title: 'মার্কেটিং প্রম্পট | বাংলা AI প্রম্পট | BdPrompt',
    titleEn: 'Marketing Prompts | Bangla AI Prompts | BdPrompt',
    description: 'ডিজিটাল মার্কেটিং এবং বিজ্ঞাপনের জন্য বাংলা AI প্রম্পট। SEO, বিজ্ঞাপন, সোশ্যাল মিডিয়া।',
    descriptionEn: 'Bangla AI prompts for digital marketing and advertising. SEO, ads, social media.',
    keywords: 'মার্কেটিং প্রম্পট, SEO prompts, digital marketing AI'
  },
  '/guide': {
    title: 'গাইড | BdPrompt ব্যবহার করুন | বাংলা AI প্রম্পট',
    titleEn: 'Guide | How to Use BdPrompt | Bangla AI Prompts',
    description: 'BdPrompt কীভাবে ব্যবহার করবেন তা শিখুন। AI প্রম্পট লেখার গাইড এবং টিপস।',
    descriptionEn: 'Learn how to use BdPrompt. AI prompt writing guide and tips.',
    keywords: 'প্রম্পট গাইড, AI prompt guide, প্রম্পট লেখার টিপস'
  },
  '/playground': {
    title: 'প্লেগ্রাউন্ড | AI প্রম্পট টেস্ট করুন | BdPrompt',
    titleEn: 'Playground | Test AI Prompts | BdPrompt',
    description: 'রিয়েল-টাইমে AI প্রম্পট টেস্ট করুন। ChatGPT, Claude, Gemini-এর সাথে পরীক্ষা করুন।',
    descriptionEn: 'Test AI prompts in real-time. Experiment with ChatGPT, Claude, Gemini.',
    keywords: 'AI প্লেগ্রাউন্ড, prompt testing, AI experiment'
  },
  '/packs': {
    title: 'প্রম্পট প্যাক | কিউরেটেড প্রম্পট কালেকশন | BdPrompt',
    titleEn: 'Prompt Packs | Curated Prompt Collections | BdPrompt',
    description: 'নির্দিষ্ট ক্যাটাগরির জন্য কিউরেটেড প্রম্পট প্যাক। প্রফেশনাল AI প্রম্পট কালেকশন।',
    descriptionEn: 'Curated prompt packs for specific categories. Professional AI prompt collections.',
    keywords: 'প্রম্পট প্যাক, prompt bundles, AI prompt collection'
  },
  '/prompts': {
    title: 'সব প্রম্পট ব্রাউজ করুন | বাংলা AI প্রম্পট | BdPrompt',
    titleEn: 'Browse All Prompts | Bangla AI Prompts | BdPrompt',
    description: 'BdPrompt-এ উপলব্ধ সকল বাংলা AI প্রম্পট ক্যাটাগরি অনুযায়ী ব্রাউজ করুন।',
    descriptionEn: 'Browse all Bangla AI prompts available on BdPrompt by category.',
    keywords: 'সব প্রম্পট, all prompts, বাংলা প্রম্পট তালিকা'
  },
  '/blog': {
    title: 'ব্লগ | AI টিপস এবং গাইড | BdPrompt',
    titleEn: 'Blog | AI Tips and Guides | BdPrompt',
    description: 'AI, প্রম্পট ইঞ্জিনিয়ারিং এবং বাংলা কন্টেন্ট নিয়ে আর্টিকেল এবং টিউটোরিয়াল।',
    descriptionEn: 'Articles and tutorials on AI, prompt engineering and Bangla content.',
    keywords: 'AI ব্লগ, প্রম্পট টিউটোরিয়াল, AI tips'
  },
  '/community': {
    title: 'কমিউনিটি | প্রম্পট শেয়ার করুন | BdPrompt',
    titleEn: 'Community | Share Prompts | BdPrompt',
    description: 'BdPrompt কমিউনিটিতে যোগ দিন। প্রম্পট শেয়ার করুন এবং অন্যদের সাথে শিখুন।',
    descriptionEn: 'Join the BdPrompt community. Share prompts and learn with others.',
    keywords: 'AI কমিউনিটি, prompt sharing, বাংলা AI community'
  },
  '/become-creator': {
    title: 'ক্রিয়েটর হন | প্রম্পট বিক্রি করুন | BdPrompt',
    titleEn: 'Become a Creator | Sell Prompts | BdPrompt',
    description: 'BdPrompt ক্রিয়েটর প্রোগ্রামে যোগ দিন। আপনার প্রম্পট বিক্রি করুন এবং আয় করুন।',
    descriptionEn: 'Join the BdPrompt creator program. Sell your prompts and earn.',
    keywords: 'প্রম্পট ক্রিয়েটর, sell prompts, prompt marketplace'
  },
  '/api': {
    title: 'API ডকুমেন্টেশন | ডেভেলপার | BdPrompt',
    titleEn: 'API Documentation | Developer | BdPrompt',
    description: 'BdPrompt API ব্যবহার করে আপনার অ্যাপে বাংলা AI প্রম্পট ইন্টিগ্রেট করুন।',
    descriptionEn: 'Integrate Bangla AI prompts into your app using BdPrompt API.',
    keywords: 'API, developer, prompt API, integration'
  },
  '/resources': {
    title: 'রিসোর্স | AI টুলস এবং গাইড | BdPrompt',
    titleEn: 'Resources | AI Tools and Guides | BdPrompt',
    description: 'AI টুলস, গাইডলাইন এবং রিসোর্স যা আপনার AI জার্নি শুরু করতে সাহায্য করবে।',
    descriptionEn: 'AI tools, guidelines and resources to help start your AI journey.',
    keywords: 'AI রিসোর্স, AI tools, বাংলা AI guide'
  },
  '/support': {
    title: 'সাপোর্ট | সাহায্য কেন্দ্র | BdPrompt',
    titleEn: 'Support | Help Center | BdPrompt',
    description: 'BdPrompt সাপোর্ট এবং সাহায্য। আপনার প্রশ্নের উত্তর পান এবং সমস্যা সমাধান করুন।',
    descriptionEn: 'BdPrompt support and help. Get answers to your questions and solve problems.',
    keywords: 'সাপোর্ট, help, FAQ, contact'
  },
  '/privacy': {
    title: 'প্রাইভেসি পলিসি | ডেটা সুরক্ষা | BdPrompt',
    titleEn: 'Privacy Policy | Data Protection | BdPrompt',
    description: 'BdPrompt-এর প্রাইভেসি পলিসি এবং ডেটা সুরক্ষা নীতি সম্পর্কে জানুন।',
    descriptionEn: 'Learn about BdPrompt privacy policy and data protection practices.',
    keywords: 'প্রাইভেসি, privacy policy, data protection'
  },
  '/terms': {
    title: 'টার্মস অফ সার্ভিস | ব্যবহারের শর্ত | BdPrompt',
    titleEn: 'Terms of Service | Usage Terms | BdPrompt',
    description: 'BdPrompt ব্যবহারের শর্তাবলী এবং নিয়মকানুন সম্পর্কে বিস্তারিত জানুন।',
    descriptionEn: 'Learn about BdPrompt terms of service and usage rules.',
    keywords: 'টার্মস, terms of service, usage rules'
  },
  '/cookies': {
    title: 'কুকি পলিসি | BdPrompt',
    titleEn: 'Cookie Policy | BdPrompt',
    description: 'BdPrompt কুকি পলিসি। আমরা কীভাবে কুকি ব্যবহার করি তা জানুন।',
    descriptionEn: 'BdPrompt cookie policy. Learn how we use cookies.',
    keywords: 'কুকি, cookies, cookie policy'
  },
  '/guidelines': {
    title: 'গাইডলাইন | প্রম্পট সাবমিশন নিয়ম | BdPrompt',
    titleEn: 'Guidelines | Prompt Submission Rules | BdPrompt',
    description: 'BdPrompt-এ প্রম্পট সাবমিট করার গাইডলাইন এবং কমিউনিটি নিয়ম।',
    descriptionEn: 'Guidelines for submitting prompts and community rules on BdPrompt.',
    keywords: 'গাইডলাইন, submission rules, community guidelines'
  },
  '/dmca': {
    title: 'DMCA | কপিরাইট নীতি | BdPrompt',
    titleEn: 'DMCA | Copyright Policy | BdPrompt',
    description: 'BdPrompt DMCA এবং কপিরাইট লঙ্ঘন রিপোর্ট করার নিয়ম।',
    descriptionEn: 'BdPrompt DMCA and copyright infringement reporting rules.',
    keywords: 'DMCA, copyright, কপিরাইট'
  },
  '/legal': {
    title: 'আইনি তথ্য | Legal | BdPrompt',
    titleEn: 'Legal Information | BdPrompt',
    description: 'BdPrompt-এর আইনি তথ্য, প্রাইভেসি, টার্মস এবং অন্যান্য নীতি।',
    descriptionEn: 'BdPrompt legal information, privacy, terms and other policies.',
    keywords: 'আইনি, legal, policies'
  },
  '/business': {
    title: 'ব্যবসা AI প্রম্পট | মার্কেটিং ও সেলস | BdPrompt',
    titleEn: 'Business AI Prompts | Marketing & Sales | BdPrompt',
    description: 'ব্যবসার জন্য বাংলা AI প্রম্পট। মার্কেটিং, সেলস, ই-কমার্স এবং আরও অনেক কিছু।',
    descriptionEn: 'Bangla AI prompts for business. Marketing, sales, e-commerce and more.',
    keywords: 'ব্যবসা প্রম্পট, business prompts, মার্কেটিং AI'
  },
  '/product': {
    title: 'প্রোডাক্ট | BdPrompt ফিচার | বাংলা AI প্রম্পট',
    titleEn: 'Product | BdPrompt Features | Bangla AI Prompts',
    description: 'BdPrompt-এর ফিচার এবং সুবিধা সম্পর্কে জানুন। বাংলা AI প্রম্পট প্ল্যাটফর্ম।',
    descriptionEn: 'Learn about BdPrompt features and benefits. Bangla AI prompt platform.',
    keywords: 'প্রোডাক্ট, features, বাংলা AI platform'
  },
  '/shikkha': {
    title: 'শিক্ষা প্রম্পট | পড়াশোনার AI সহায়তা | BdPrompt',
    titleEn: 'Education Prompts | Study AI Assistance | BdPrompt',
    description: 'শিক্ষার্থীদের জন্য বাংলা AI প্রম্পট। পড়াশোনা, গবেষণা এবং অ্যাসাইনমেন্ট।',
    descriptionEn: 'Bangla AI prompts for students. Studies, research and assignments.',
    keywords: 'শিক্ষা, education prompts, student AI'
  },
  '/kobita': {
    title: 'কবিতা প্রম্পট | সৃজনশীল লেখা AI | BdPrompt',
    titleEn: 'Poetry Prompts | Creative Writing AI | BdPrompt',
    description: 'কবিতা এবং সৃজনশীল লেখার জন্য বাংলা AI প্রম্পট। গল্প, প্রবন্ধ, কবিতা।',
    descriptionEn: 'Bangla AI prompts for poetry and creative writing. Stories, essays, poems.',
    keywords: 'কবিতা, poetry prompts, creative writing AI'
  },
  '/profile': {
    title: 'প্রোফাইল | আমার অ্যাকাউন্ট | BdPrompt',
    titleEn: 'Profile | My Account | BdPrompt',
    description: 'আপনার BdPrompt প্রোফাইল। সেভ করা প্রম্পট, ক্রয় এবং API ব্যবহার দেখুন।',
    descriptionEn: 'Your BdPrompt profile. View saved prompts, purchases and API usage.',
    keywords: 'প্রোফাইল, account, saved prompts'
  },
  '/auth': {
    title: 'লগইন / সাইন আপ | BdPrompt',
    titleEn: 'Login / Sign Up | BdPrompt',
    description: 'BdPrompt-এ লগইন করুন বা নতুন অ্যাকাউন্ট তৈরি করুন।',
    descriptionEn: 'Login to BdPrompt or create a new account.',
    keywords: 'লগইন, sign up, account'
  },
  '/admin': {
    title: 'অ্যাডমিন ড্যাশবোর্ড | BdPrompt',
    titleEn: 'Admin Dashboard | BdPrompt',
    description: 'BdPrompt অ্যাডমিন ড্যাশবোর্ড। প্রম্পট এবং ক্যাটাগরি ম্যানেজ করুন।',
    descriptionEn: 'BdPrompt admin dashboard. Manage prompts and categories.',
    keywords: 'admin, dashboard, management'
  },
  '/blog/chatgpt-bangla-prompt': {
    title: 'ChatGPT বাংলা প্রম্পট: ছাত্র ও পেশাদারদের জন্য সেরা ২০+ প্রম্পট গাইড | BdPrompt',
    titleEn: 'ChatGPT Bangla Prompts: Ultimate Guide for Students & Professionals | BdPrompt',
    description: 'বাংলায় ChatGPT ব্যবহার করে পড়াশোনা, কাজ ও সৃজনশীলতায় এগিয়ে যান। ছাত্র ও পেশাদারদের জন্য সেরা প্রম্পট কপি করুন।',
    descriptionEn: 'Master ChatGPT in Bengali for studies, work, and creativity. Copy the best prompts for students and professionals.',
    keywords: 'ChatGPT বাংলা প্রম্পট, বাংলা AI প্রম্পট, ChatGPT Bangladesh, AI prompts Bengali, ছাত্রদের জন্য ChatGPT'
  }
};

// Helper to get metadata for a given path with language support
export const getPageMetadata = (pathname: string, language: 'bn' | 'en' = 'bn'): PageMetadata => {
  // Try exact match first
  let metadata = pageMetadata[pathname];
  
  // If no exact match, try to match dynamic routes
  if (!metadata) {
    // Handle /prompt/:id routes
    if (pathname.startsWith('/prompt/')) {
      return {
        title: language === 'bn' ? 'প্রম্পট বিস্তারিত | BdPrompt' : 'Prompt Details | BdPrompt',
        description: language === 'bn' 
          ? 'এই AI প্রম্পটের বিস্তারিত দেখুন এবং কপি করে ব্যবহার করুন।'
          : 'View details of this AI prompt and copy to use.',
        keywords: 'prompt, AI prompt, বাংলা প্রম্পট'
      };
    }
    
    // Handle /prompts/:category routes
    if (pathname.startsWith('/prompts/')) {
      const category = pathname.split('/')[2];
      return {
        title: language === 'bn' 
          ? `${category} প্রম্পট | বাংলা AI প্রম্পট | BdPrompt`
          : `${category} Prompts | Bangla AI Prompts | BdPrompt`,
        description: language === 'bn'
          ? `${category} ক্যাটাগরির বাংলা AI প্রম্পট ব্রাউজ করুন।`
          : `Browse Bangla AI prompts in ${category} category.`,
        keywords: `${category}, AI prompts, বাংলা প্রম্পট`
      };
    }
  }
  
  // Return matched metadata with language-specific fields
  if (metadata) {
    return {
      title: language === 'en' && metadata.titleEn ? metadata.titleEn : metadata.title,
      description: language === 'en' && metadata.descriptionEn ? metadata.descriptionEn : metadata.description,
      keywords: metadata.keywords
    };
  }
  
  // Default fallback
  return {
    title: language === 'bn' 
      ? 'BdPrompt — বাংলা AI প্রম্পট জেনারেটর'
      : 'BdPrompt — Bangla AI Prompt Generator',
    description: language === 'bn'
      ? 'বাংলা AI প্রম্পট হাব — আপনার সৃজনশীলতার সঙ্গী'
      : 'Bangla AI Prompt Hub — Your creativity companion',
    keywords: 'বাংলা AI প্রম্পট, Bangla prompts, ChatGPT বাংলা'
  };
};
