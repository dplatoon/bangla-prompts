export interface PromptData {
  id: string;
  title: string;
  titleBn: string;
  description: string;
  descriptionBn: string;
  content: string;
  contentBn: string;
  category: string;
  categoryBn: string;
  tags: string[];
  tagsBn: string[];
  price: number;
  rating: number;
  usageCount: number;
  author: string;
  authorBn: string;
  variables?: string[];
  demoInput?: string;
  demoOutput?: string;
}

export const mockPrompts: PromptData[] = [
  {
    id: "1",
    title: "Blog Post Writer",
    titleBn: "ব্লগ পোস্ট লেখক",
    description: "Generate engaging blog posts on any topic with SEO optimization",
    descriptionBn: "যেকোনো বিষয়ে আকর্ষণীয় ব্লগ পোস্ট তৈরি করুন SEO অপটিমাইজেশনসহ",
    content: "Write a comprehensive blog post about {topic}. The post should be {tone} in tone, approximately {wordCount} words long, and optimized for SEO. Include relevant headings, bullet points, and a compelling conclusion. Target audience: {audience}.",
    contentBn: "{topic} সম্পর্কে একটি বিস্তৃত ব্লগ পোস্ট লিখুন। পোস্টটি {tone} টোনে হবে, প্রায় {wordCount} শব্দ দীর্ঘ, এবং SEO এর জন্য অপটিমাইজড। প্রাসঙ্গিক শিরোনাম, বুলেট পয়েন্ট এবং একটি আকর্ষণীয় উপসংহার অন্তর্ভুক্ত করুন। টার্গেট অডিয়েন্স: {audience}।",
    category: "Content Writing",
    categoryBn: "কন্টেন্ট রাইটিং",
    tags: ["blog", "SEO", "content", "writing"],
    tagsBn: ["ব্লগ", "এসইও", "কন্টেন্ট", "লেখালেখি"],
    price: 0,
    rating: 4.8,
    usageCount: 1250,
    author: "Rahul Sharma",
    authorBn: "রাহুল শর্মা",
    variables: ["topic", "tone", "wordCount", "audience"],
    demoInput: "Digital Marketing, Professional, 800, Small business owners",
    demoOutput: "A comprehensive guide to digital marketing strategies for small businesses..."
  },
  {
    id: "2",
    title: "Social Media Caption Generator",
    titleBn: "সোশ্যাল মিডিয়া ক্যাপশন জেনারেটর",
    description: "Create catchy captions for Instagram, Facebook, and LinkedIn posts",
    descriptionBn: "ইনস্টাগ্রাম, ফেসবুক এবং লিংকডইন পোস্টের জন্য আকর্ষণীয় ক্যাপশন তৈরি করুন",
    content: "Create 3 engaging social media captions for {platform} about {subject}. The captions should be {style} and include relevant hashtags. Target audience: {demographic}. Each caption should have a different approach - one emotional, one informative, and one call-to-action focused.",
    contentBn: "{platform} এর জন্য {subject} সম্পর্কে ৩টি আকর্ষণীয় সোশ্যাল মিডিয়া ক্যাপশন তৈরি করুন। ক্যাপশনগুলি {style} হবে এবং প্রাসঙ্গিক হ্যাশট্যাগ অন্তর্ভুক্ত করবে। টার্গেট অডিয়েন্স: {demographic}। প্রতিটি ক্যাপশনের আলাদা পদ্ধতি থাকবে - একটি আবেগপ্রবণ, একটি তথ্যবহুল, এবং একটি কল-টু-অ্যাকশন কেন্দ্রিক।",
    category: "Social Media",
    categoryBn: "সোশ্যাল মিডিয়া",
    tags: ["social", "captions", "hashtags", "engagement"],
    tagsBn: ["সোশ্যাল", "ক্যাপশন", "হ্যাশট্যাগ", "এনগেজমেন্ট"],
    price: 0,
    rating: 4.6,
    usageCount: 890,
    author: "Priya Das",
    authorBn: "প্রিয়া দাস",
    variables: ["platform", "subject", "style", "demographic"]
  },
  {
    id: "3",
    title: "Product Description Writer",
    titleBn: "পণ্যের বিবরণ লেখক",
    description: "Write compelling product descriptions that convert browsers into buyers",
    descriptionBn: "আকর্ষণীয় পণ্যের বিবরণ লিখুন যা ব্রাউজারদের ক্রেতায় রূপান্তরিত করে",
    content: "Write a compelling product description for {productName}. Highlight the key features: {features}. Target market: {targetMarket}. Price point: {priceRange}. The description should be persuasive, benefit-focused, and include a strong call-to-action. Maximum 150 words.",
    contentBn: "{productName} এর জন্য একটি আকর্ষণীয় পণ্যের বিবরণ লিখুন। মূল বৈশিষ্ট্যগুলি তুলে ধরুন: {features}। টার্গেট মার্কেট: {targetMarket}। মূল্য পরিসীমা: {priceRange}। বিবরণটি প্ররোচনামূলক, সুবিধা-কেন্দ্রিক হবে এবং একটি শক্তিশালী কল-টু-অ্যাকশন অন্তর্ভুক্ত করবে। সর্বোচ্চ ১৫০ শব্দ।",
    category: "E-commerce",
    categoryBn: "ই-কমার্স",
    tags: ["product", "description", "sales", "conversion"],
    tagsBn: ["পণ্য", "বিবরণ", "বিক্রয়", "রূপান্তর"],
    price: 5,
    rating: 4.9,
    usageCount: 750,
    author: "Ahmed Khan",
    authorBn: "আহমেদ খান",
    variables: ["productName", "features", "targetMarket", "priceRange"]
  },
  {
    id: "4",
    title: "Email Marketing Template",
    titleBn: "ইমেইল মার্কেটিং টেমপ্লেট",
    description: "Create high-converting email campaigns for any business",
    descriptionBn: "যেকোনো ব্যবসার জন্য উচ্চ রূপান্তরকারী ইমেইল ক্যাম্পেইন তৈরি করুন",
    content: "Create an email marketing campaign for {businessType} promoting {offer}. Campaign goal: {goal}. Target audience: {audience}. Include subject line suggestions, email body with personalization, and clear call-to-action. Tone should be {tone}.",
    contentBn: "{businessType} এর জন্য {offer} প্রচার করে একটি ইমেইল মার্কেটিং ক্যাম্পেইন তৈরি করুন। ক্যাম্পেইনের লক্ষ্য: {goal}। টার্গেট অডিয়েন্স: {audience}। সাবজেক্ট লাইনের পরামর্শ, ব্যক্তিগতকরণসহ ইমেইল বডি এবং স্পষ্ট কল-টু-অ্যাকশন অন্তর্ভুক্ত করুন। টোন হবে {tone}।",
    category: "Email Marketing",
    categoryBn: "ইমেইল মার্কেটিং",
    tags: ["email", "marketing", "campaigns", "conversion"],
    tagsBn: ["ইমেইল", "মার্কেটিং", "ক্যাম্পেইন", "রূপান্তর"],
    price: 10,
    rating: 4.7,
    usageCount: 620,
    author: "Fatema Begum",
    authorBn: "ফাতেমা বেগম",
    variables: ["businessType", "offer", "goal", "audience", "tone"]
  },
  {
    id: "5",
    title: "Creative Story Generator",
    titleBn: "সৃজনশীল গল্প জেনারেটর",
    description: "Generate imaginative stories for any genre or audience",
    descriptionBn: "যেকোনো ধারা বা দর্শকের জন্য কল্পনাপ্রসূত গল্প তৈরি করুন",
    content: "Write a creative story in the {genre} genre. Setting: {setting}. Main character: {character}. Conflict: {conflict}. Target length: {length} words. The story should have a clear beginning, middle, and end with engaging dialogue and vivid descriptions.",
    contentBn: "{genre} ধারায় একটি সৃজনশীল গল্প লিখুন। পরিবেশ: {setting}। প্রধান চরিত্র: {character}। দ্বন্দ্ব: {conflict}। টার্গেট দৈর্ঘ্য: {length} শব্দ। গল্পটিতে স্পষ্ট শুরু, মধ্য এবং শেষ থাকবে আকর্ষণীয় সংলাপ এবং প্রাণবন্ত বর্ণনাসহ।",
    category: "Creative Writing",
    categoryBn: "সৃজনশীল লেখা",
    tags: ["story", "creative", "fiction", "narrative"],
    tagsBn: ["গল্প", "সৃজনশীল", "কল্পকাহিনী", "বর্ণনা"],
    price: 0,
    rating: 4.4,
    usageCount: 340,
    author: "Ravi Mehta",
    authorBn: "রবি মেহতা",
    variables: ["genre", "setting", "character", "conflict", "length"]
  },
  {
    id: "6",
    title: "Technical Documentation",
    titleBn: "প্রযুক্তিগত ডকুমেন্টেশন",
    description: "Create clear and comprehensive technical documentation",
    descriptionBn: "স্পষ্ট এবং বিস্তৃত প্রযুক্তিগত ডকুমেন্টেশন তৈরি করুন",
    content: "Create technical documentation for {product}. Include: overview, key features, installation guide, usage examples, and troubleshooting section. Target audience: {techLevel}. Format: {format}. Include code snippets where relevant.",
    contentBn: "{product} এর জন্য প্রযুক্তিগত ডকুমেন্টেশন তৈরি করুন। অন্তর্ভুক্ত করুন: ওভারভিউ, মূল বৈশিষ্ট্য, ইনস্টলেশন গাইড, ব্যবহারের উদাহরণ এবং সমস্যা সমাধান বিভাগ। টার্গেট অডিয়েন্স: {techLevel}। ফরম্যাট: {format}। প্রাসঙ্গিক জায়গায় কোড স্নিপেট অন্তর্ভুক্ত করুন।",
    category: "Technical Writing",
    categoryBn: "প্রযুক্তিগত লেখা",
    tags: ["documentation", "technical", "guide", "API"],
    tagsBn: ["ডকুমেন্টেশন", "প্রযুক্তিগত", "গাইড", "এপিআই"],
    price: 15,
    rating: 4.8,
    usageCount: 280,
    author: "Sarah Wilson",
    authorBn: "সারাহ উইলসন",
    variables: ["product", "techLevel", "format"]
  }
];

// Local storage utilities
export const savePromptToLocal = (promptId: string) => {
  const saved = getSavedPrompts();
  if (!saved.includes(promptId)) {
    saved.push(promptId);
    localStorage.setItem('bdprompt-saved', JSON.stringify(saved));
  }
};

export const removePromptFromLocal = (promptId: string) => {
  const saved = getSavedPrompts();
  const filtered = saved.filter(id => id !== promptId);
  localStorage.setItem('bdprompt-saved', JSON.stringify(filtered));
};

export const getSavedPrompts = (): string[] => {
  const saved = localStorage.getItem('bdprompt-saved');
  return saved ? JSON.parse(saved) : [];
};

export const isPromptSaved = (promptId: string): boolean => {
  return getSavedPrompts().includes(promptId);
};

export const copyPromptToClipboard = async (prompt: PromptData, language: 'bn' | 'en' = 'en'): Promise<void> => {
  const content = language === 'bn' && prompt.contentBn ? prompt.contentBn : prompt.content;
  await navigator.clipboard.writeText(content);
};