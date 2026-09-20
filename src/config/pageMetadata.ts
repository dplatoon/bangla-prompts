// Centralized SEO metadata configuration for all pages
// Each page should have unique title (50-60 chars) and description (140-155 chars)
// The homepage count is derived from the build-time prompt list (siteStats) so
// the title always matches the hero section instead of a hardcoded number.
import { promptCountLabel, promptCountLabelBn } from '@/config/siteStats';

export interface PageMetadata {
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  keywords?: string;
}

export const pageMetadata: Record<string, PageMetadata> = {
  '/': {
    title: `বাংলা AI প্রম্পট জেনারেটর | ${promptCountLabelBn} প্রম্পট | BdPrompt`,
    titleEn: `Bangla AI Prompt Generator | ${promptCountLabel} Prompts | BdPrompt`,
    description: `${promptCountLabelBn} বাংলা AI প্রম্পট ChatGPT, Claude, Gemini-এর জন্য। শিক্ষা, ব্যবসা, কন্টেন্ট, কবিতা এবং আরও অনেক কিছু।`,
    descriptionEn: `${promptCountLabel} Bangla AI prompts for ChatGPT, Claude, Gemini. Education, business, content, poetry and more.`,
    keywords: 'বাংলা AI প্রম্পট, Bangla prompts, ChatGPT বাংলা, AI prompts Bangladesh'
  },
  '/explore': {
    title: 'প্রম্পট এক্সপ্লোর করুন | 60+ বাংলা AI প্রম্পট | BdPrompt',
    titleEn: 'Explore Prompts | 60+ Bangla AI Prompts | BdPrompt',
    description: 'বিভিন্ন ক্যাটাগরিতে 60+ বাংলা AI প্রম্পট ব্রাউজ করুন — ব্যবসা, শিক্ষা, কন্টেন্ট, কোড, ইমেজ, মার্কেটিং। ChatGPT, Claude ও Gemini-এর জন্য বাংলায় প্রস্তুত।',
    descriptionEn: 'Browse 60+ Bangla AI prompts across categories. For ChatGPT, Claude, Gemini.',
    keywords: 'AI প্রম্পট এক্সপ্লোর, browse prompts, বাংলা প্রম্পট ক্যাটাগরি'
  },
  '/explore/business': {
    title: 'ব্যবসা প্রম্পট | বাংলা AI প্রম্পট | BdPrompt',
    titleEn: 'Business Prompts | Bangla AI Prompts | BdPrompt',
    description: 'ব্যবসার জন্য বাংলা AI প্রম্পট কালেকশন — মার্কেটিং, বিক্রয়, ইমেইল, প্রোডাক্ট বর্ণনা ও কাস্টমার সার্ভিস। ChatGPT ও Claude-এ কপি-পেস্ট করে ব্যবহার করুন।',
    descriptionEn: 'Business-related Bangla AI prompts. For marketing, sales, customer service and more.',
    keywords: 'ব্যবসা প্রম্পট, business AI prompts, মার্কেটিং প্রম্পট'
  },
  '/explore/education': {
    title: 'শিক্ষা প্রম্পট | বাংলা AI প্রম্পট | BdPrompt',
    titleEn: 'Education Prompts | Bangla AI Prompts | BdPrompt',
    description: 'ছাত্র-ছাত্রীদের জন্য বাংলা AI প্রম্পট — অ্যাসাইনমেন্ট, নোট, গবেষণা, প্রেজেন্টেশন ও পরীক্ষার প্রস্তুতি। ChatGPT ও Gemini-এ সরাসরি ব্যবহার করুন।',
    descriptionEn: 'Educational Bangla AI prompts. For studying, assignments, research and learning.',
    keywords: 'শিক্ষা প্রম্পট, education AI prompts, অ্যাসাইনমেন্ট প্রম্পট'
  },
  '/explore/content': {
    title: 'কন্টেন্ট প্রম্পট | বাংলা AI প্রম্পট | BdPrompt',
    titleEn: 'Content Prompts | Bangla AI Prompts | BdPrompt',
    description: 'কন্টেন্ট ক্রিয়েটরদের জন্য বাংলা AI প্রম্পট — ব্লগ পোস্ট, সোশ্যাল মিডিয়া ক্যাপশন, কপিরাইটিং, স্ক্রিপ্ট ও ইমেইল। ChatGPT-এ বাংলায় লিখুন দ্রুত।',
    descriptionEn: 'Bangla AI prompts for content creation. Blogs, social media, copywriting and more.',
    keywords: 'কন্টেন্ট প্রম্পট, content AI prompts, ব্লগ প্রম্পট'
  },
  '/explore/code': {
    title: 'কোড প্রম্পট | প্রোগ্রামিং AI প্রম্পট | BdPrompt',
    titleEn: 'Code Prompts | Programming AI Prompts | BdPrompt',
    description: 'ডেভেলপারদের জন্য বাংলা AI প্রম্পট — কোড লেখা, বাগ ফিক্স, কোড রিভিউ, অ্যালগরিদম ব্যাখ্যা ও ডকুমেন্টেশন। JavaScript, Python, React সব ভাষায় সাপোর্ট।',
    descriptionEn: 'Bangla AI prompts for programming and coding. Bug fixes, code review, algorithms.',
    keywords: 'কোড প্রম্পট, programming prompts, coding AI prompts'
  },
  '/explore/image': {
    title: 'ইমেজ প্রম্পট | AI আর্ট প্রম্পট | BdPrompt',
    titleEn: 'Image Prompts | AI Art Prompts | BdPrompt',
    description: 'DALL-E, Midjourney, Stable Diffusion ও Firefly-এর জন্য বাংলা ইমেজ প্রম্পট — পোর্ট্রেট, ল্যান্ডস্কেপ, প্রোডাক্ট ফটো ও বাংলাদেশি কালচার আর্ট।',
    descriptionEn: 'Bangla image generation prompts for DALL-E, Midjourney, Stable Diffusion.',
    keywords: 'ইমেজ প্রম্পট, Midjourney prompts, AI art prompts'
  },
  '/explore/marketing': {
    title: 'মার্কেটিং প্রম্পট | বাংলা AI প্রম্পট | BdPrompt',
    titleEn: 'Marketing Prompts | Bangla AI Prompts | BdPrompt',
    description: 'ডিজিটাল মার্কেটারদের জন্য বাংলা AI প্রম্পট — SEO কন্টেন্ট, Facebook Ads, Google Ads, ইমেইল ক্যাম্পেইন ও সোশ্যাল মিডিয়া প্ল্যান। ChatGPT-এ ব্যবহার করুন।',
    descriptionEn: 'Bangla AI prompts for digital marketing and advertising. SEO, ads, social media.',
    keywords: 'মার্কেটিং প্রম্পট, SEO prompts, digital marketing AI'
  },
  '/guide': {
    title: 'গাইড | BdPrompt ব্যবহার করুন | বাংলা AI প্রম্পট',
    titleEn: 'Guide | How to Use BdPrompt | Bangla AI Prompts',
    description: 'BdPrompt কীভাবে ব্যবহার করবেন তার স্টেপ-বাই-স্টেপ গাইড — প্রম্পট খুঁজে বের করা, কপি করা, ChatGPT-এ পেস্ট করা ও ভালো ফলাফল পাওয়ার প্রফেশনাল টিপস।',
    descriptionEn: 'Learn how to use BdPrompt. AI prompt writing guide and tips.',
    keywords: 'প্রম্পট গাইড, AI prompt guide, প্রম্পট লেখার টিপস'
  },
  '/playground': {
    title: 'প্লেগ্রাউন্ড | AI প্রম্পট টেস্ট করুন | BdPrompt',
    titleEn: 'Playground | Test AI Prompts | BdPrompt',
    description: 'AI প্লেগ্রাউন্ডে বাংলায় প্রম্পট টেস্ট করুন — ChatGPT, Claude ও Gemini-এর সাথে সরাসরি experiment করুন এবং রিয়েল-টাইমে বাংলা ও ইংরেজি আউটপুট দেখুন।',
    descriptionEn: 'Test AI prompts in real-time. Experiment with ChatGPT, Claude, Gemini.',
    keywords: 'AI প্লেগ্রাউন্ড, prompt testing, AI experiment'
  },
  '/packs': {
    title: 'প্রম্পট প্যাক | কিউরেটেড প্রম্পট কালেকশন | BdPrompt',
    titleEn: 'Prompt Packs | Curated Prompt Collections | BdPrompt',
    description: 'নির্দিষ্ট কাজের জন্য কিউরেটেড বাংলা AI প্রম্পট প্যাক — স্টার্টার, প্রো ও এন্টারপ্রাইজ কালেকশন। প্রফেশনাল ChatGPT প্রম্পট বান্ডেল, একবারে কিনুন।',
    descriptionEn: 'Curated prompt packs for specific categories. Professional AI prompt collections.',
    keywords: 'প্রম্পট প্যাক, prompt bundles, AI prompt collection'
  },
  '/prompts': {
    title: 'সব প্রম্পট ব্রাউজ করুন | বাংলা AI প্রম্পট | BdPrompt',
    titleEn: 'Browse All Prompts | Bangla AI Prompts | BdPrompt',
    description: 'BdPrompt-এ উপলব্ধ সকল বাংলা AI প্রম্পট ক্যাটাগরি অনুযায়ী ব্রাউজ করুন — ৬০+ ChatGPT, Claude ও Gemini প্রম্পট, ফ্রি এবং প্রিমিয়াম কালেকশন এক জায়গায়।',
    descriptionEn: 'Browse all Bangla AI prompts available on BdPrompt by category.',
    keywords: 'সব প্রম্পট, all prompts, বাংলা প্রম্পট তালিকা'
  },
  '/blog': {
    title: 'ব্লগ | AI টিপস এবং গাইড | BdPrompt',
    titleEn: 'Blog | AI Tips and Guides | BdPrompt',
    description: 'AI, প্রম্পট ইঞ্জিনিয়ারিং ও বাংলা কন্টেন্ট নিয়ে আর্টিকেল ও টিউটোরিয়াল — ChatGPT ব্যবহার, কেস স্টাডি এবং বাংলাদেশি ক্রিয়েটরদের জন্য বিস্তারিত গাইড।',
    descriptionEn: 'Articles and tutorials on AI, prompt engineering and Bangla content.',
    keywords: 'AI ব্লগ, প্রম্পট টিউটোরিয়াল, AI tips'
  },
  '/community': {
    title: 'কমিউনিটি | প্রম্পট শেয়ার করুন | BdPrompt',
    titleEn: 'Community | Share Prompts | BdPrompt',
    description: 'BdPrompt-এর বাংলা AI প্রম্পট ক্রিয়েটর কমিউনিটিতে যোগ দিন — Discord, Facebook ও Telegram-এ প্রম্পট শেয়ার করুন, শিখুন এবং অন্যদের সাথে কানেক্ট হোন।',
    descriptionEn: 'Join the BdPrompt community. Share prompts and learn with others.',
    keywords: 'AI কমিউনিটি, prompt sharing, বাংলা AI community'
  },
  '/become-creator': {
    title: 'ক্রিয়েটর হন | প্রম্পট বিক্রি করুন | BdPrompt',
    titleEn: 'Become a Creator | Sell Prompts | BdPrompt',
    description: 'BdPrompt ক্রিয়েটর প্রোগ্রামে যোগ দিন — আপনার বাংলা AI প্রম্পট বিক্রি করে আয় করুন। ৭০% কমিশন, সহজ পেআউট এবং বাংলাদেশের AI প্রম্পট কমিউনিটিতে অ্যাক্সেস।',
    descriptionEn: 'Join the BdPrompt creator program. Sell your prompts and earn.',
    keywords: 'প্রম্পট ক্রিয়েটর, sell prompts, prompt marketplace'
  },
  '/api': {
    title: 'API ডকুমেন্টেশন | ডেভেলপার | BdPrompt',
    titleEn: 'API Documentation | Developer | BdPrompt',
    description: 'BdPrompt API ব্যবহার করে আপনার অ্যাপ বা ওয়েবসাইটে বাংলা AI প্রম্পট ইন্টিগ্রেট করুন — REST endpoints, authentication এবং rate limit-সহ ডেভেলপার-বান্ধব ডকুমেন্টেশন।',
    descriptionEn: 'Integrate Bangla AI prompts into your app using BdPrompt API.',
    keywords: 'API, developer, prompt API, integration'
  },
  '/resources': {
    title: 'রিসোর্স | AI টুলস এবং গাইড | BdPrompt',
    titleEn: 'Resources | AI Tools and Guides | BdPrompt',
    description: 'AI টুলস, চিটশিট, প্রম্পট টেমপ্লেট ও গাইডলাইন — ChatGPT, Claude, Gemini ও Midjourney শেখার জন্য বাংলা রিসোর্স কালেকশন। শুরু করুন একদম শূন্য থেকে।',
    descriptionEn: 'AI tools, guidelines and resources to help start your AI journey.',
    keywords: 'AI রিসোর্স, AI tools, বাংলা AI guide'
  },
  '/support': {
    title: 'সাপোর্ট | সাহায্য কেন্দ্র | BdPrompt',
    titleEn: 'Support | Help Center | BdPrompt',
    description: 'BdPrompt সাপোর্ট ও হেল্প সেন্টার — অ্যাকাউন্ট, পেমেন্ট, প্রম্পট কপি ও টেকনিক্যাল সমস্যার সমাধান। ইমেইল, চ্যাট এবং FAQ-এর মাধ্যমে দ্রুত সহায়তা পান।',
    descriptionEn: 'BdPrompt support and help. Get answers to your questions and solve problems.',
    keywords: 'সাপোর্ট, help, FAQ, contact'
  },
  '/privacy': {
    title: 'প্রাইভেসি পলিসি | ডেটা সুরক্ষা | BdPrompt',
    titleEn: 'Privacy Policy | Data Protection | BdPrompt',
    description: 'BdPrompt-এর প্রাইভেসি পলিসি ও ডেটা সুরক্ষা নীতি — আমরা কী তথ্য সংগ্রহ করি, কীভাবে ব্যবহার ও সুরক্ষিত রাখি এবং আপনার অধিকার সম্পর্কে বিস্তারিত জানুন।',
    descriptionEn: 'Learn about BdPrompt privacy policy and data protection practices.',
    keywords: 'প্রাইভেসি, privacy policy, data protection'
  },
  '/terms': {
    title: 'টার্মস অফ সার্ভিস | ব্যবহারের শর্ত | BdPrompt',
    titleEn: 'Terms of Service | Usage Terms | BdPrompt',
    description: 'BdPrompt ব্যবহারের শর্তাবলী ও নিয়মকানুন — অ্যাকাউন্ট, লাইসেন্স, পেমেন্ট, রিফান্ড ও ব্যবহারকারীর দায়িত্ব সম্পর্কে সম্পূর্ণ আইনি তথ্য বিস্তারিতভাবে জানুন।',
    descriptionEn: 'Learn about BdPrompt terms of service and usage rules.',
    keywords: 'টার্মস, terms of service, usage rules'
  },
  '/cookies': {
    title: 'কুকি পলিসি | BdPrompt',
    titleEn: 'Cookie Policy | BdPrompt',
    description: 'BdPrompt কুকি পলিসি — আমরা কী কী কুকি ব্যবহার করি, কেন ব্যবহার করি এবং কীভাবে আপনি ব্রাউজারে কুকি বন্ধ বা নিয়ন্ত্রণ করতে পারেন সে সম্পর্কে বিস্তারিত।',
    descriptionEn: 'BdPrompt cookie policy. Learn how we use cookies.',
    keywords: 'কুকি, cookies, cookie policy'
  },
  '/guidelines': {
    title: 'গাইডলাইন | প্রম্পট সাবমিশন নিয়ম | BdPrompt',
    titleEn: 'Guidelines | Prompt Submission Rules | BdPrompt',
    description: 'BdPrompt-এ প্রম্পট সাবমিট করার গাইডলাইন — কোয়ালিটি স্ট্যান্ডার্ড, কমিউনিটি নিয়ম, নিষিদ্ধ কন্টেন্ট এবং প্রম্পট অ্যাপ্রুভ হওয়ার জন্য সেরা অনুশীলন।',
    descriptionEn: 'Guidelines for submitting prompts and community rules on BdPrompt.',
    keywords: 'গাইডলাইন, submission rules, community guidelines'
  },
  '/dmca': {
    title: 'DMCA | কপিরাইট নীতি | BdPrompt',
    titleEn: 'DMCA | Copyright Policy | BdPrompt',
    description: 'BdPrompt-এ কপিরাইট লঙ্ঘন রিপোর্ট করার DMCA প্রক্রিয়া — কীভাবে টেকডাউন নোটিশ পাঠাবেন, কী তথ্য দিতে হবে এবং কাউন্টার-নোটিশ প্রক্রিয়া সম্পর্কে জানুন।',
    descriptionEn: 'BdPrompt DMCA and copyright infringement reporting rules.',
    keywords: 'DMCA, copyright, কপিরাইট'
  },
  '/legal': {
    title: 'আইনি তথ্য | Legal | BdPrompt',
    titleEn: 'Legal Information | BdPrompt',
    description: 'BdPrompt-এর সমস্ত আইনি নথি এক জায়গায় — প্রাইভেসি পলিসি, টার্মস অফ সার্ভিস, কুকি পলিসি, DMCA ও কমিউনিটি গাইডলাইন। ব্যবহারের আগে বিস্তারিত পড়ুন।',
    descriptionEn: 'BdPrompt legal information, privacy, terms and other policies.',
    keywords: 'আইনি, legal, policies'
  },
  '/business': {
    title: 'ব্যবসা AI প্রম্পট | মার্কেটিং ও সেলস | BdPrompt',
    titleEn: 'Business AI Prompts | Marketing & Sales | BdPrompt',
    description: 'বাংলাদেশি ব্যবসার জন্য বাংলা AI প্রম্পট — মার্কেটিং, সেলস, ই-কমার্স, প্রোডাক্ট বর্ণনা ও কাস্টমার সাপোর্ট। ChatGPT দিয়ে সময় বাঁচান, বিক্রি বাড়ান।',
    descriptionEn: 'Bangla AI prompts for business. Marketing, sales, e-commerce and more.',
    keywords: 'ব্যবসা প্রম্পট, business prompts, মার্কেটিং AI'
  },
  '/product': {
    title: 'প্রোডাক্ট | BdPrompt ফিচার | বাংলা AI প্রম্পট',
    titleEn: 'Product | BdPrompt Features | Bangla AI Prompts',
    description: 'BdPrompt-এর ফিচার ও সুবিধা — ৬০+ বাংলা প্রম্পট লাইব্রেরি, প্লেগ্রাউন্ড, প্রম্পট প্যাক, ক্রিয়েটর টুলস ও API। বাংলাদেশের জন্য তৈরি বাংলা AI প্রম্পট প্ল্যাটফর্ম।',
    descriptionEn: 'Learn about BdPrompt features and benefits. Bangla AI prompt platform.',
    keywords: 'প্রোডাক্ট, features, বাংলা AI platform'
  },
  '/shikkha': {
    title: 'শিক্ষা প্রম্পট | পড়াশোনার AI সহায়তা | BdPrompt',
    titleEn: 'Education Prompts | Study AI Assistance | BdPrompt',
    description: 'স্কুল, কলেজ ও বিশ্ববিদ্যালয়ের শিক্ষার্থীদের জন্য বাংলা AI প্রম্পট — পড়াশোনা, রিসার্চ পেপার, অ্যাসাইনমেন্ট, নোট ও পরীক্ষার প্রস্তুতিতে দ্রুত সহায়তা।',
    descriptionEn: 'Bangla AI prompts for students. Studies, research and assignments.',
    keywords: 'শিক্ষা, education prompts, student AI'
  },
  '/kobita': {
    title: 'কবিতা প্রম্পট | সৃজনশীল লেখা AI | BdPrompt',
    titleEn: 'Poetry Prompts | Creative Writing AI | BdPrompt',
    description: 'কবিতা ও সৃজনশীল লেখার জন্য বাংলা AI প্রম্পট — কবিতা, গল্প, প্রবন্ধ, গান এবং চিত্রনাট্য লেখার জন্য ChatGPT ও Claude-এ ব্যবহারযোগ্য প্রম্পট কালেকশন।',
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
    description: 'ছাত্র, চাকরিজীবী ও ক্রিয়েটরদের জন্য ২০+ কপি-রেডি ChatGPT বাংলা প্রম্পট। পড়াশোনা, অফিস, ফ্রিল্যান্সিং ও কন্টেন্টের ব্যবহারিক টিপসসহ দেখুন।',
    descriptionEn: 'Explore 20+ copy-ready ChatGPT Bangla prompts for students, professionals and creators, with practical tips for study, work, freelancing and content.',
    keywords: 'ChatGPT বাংলা প্রম্পট, বাংলা AI প্রম্পট, ChatGPT Bangladesh, AI prompts Bengali, ছাত্রদের জন্য ChatGPT'
  },
  '/youtube-script-prompts': {
    title: 'YouTube Script বাংলা AI Prompt | Free ChatGPT Prompts | BdPrompt',
    titleEn: 'YouTube Script Bangla AI Prompts | Free ChatGPT Prompts | BdPrompt',
    description: 'বাংলাদেশি YouTuber-দের জন্য free বাংলা YouTube script AI prompts — tech, vlog, education, faceless চ্যানেলের জন্য ChatGPT, Claude, Gemini-তে কাজ করে।',
    descriptionEn: 'Free Bangla YouTube script AI prompts for Bangladeshi creators — tech, vlog, education, faceless channels. Works with ChatGPT, Claude, Gemini.',
    keywords: 'YouTube script prompt, বাংলা YouTube prompt, ChatGPT YouTube script, faceless channel prompt, Bangla YouTuber AI'
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
