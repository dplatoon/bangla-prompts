import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";

type AIPlatform = "Midjourney" | "DALL-E 3" | "Stable Diffusion" | "Firefly" | "Bing";

type Category =
  | "All"
  | "Portrait"
  | "Landscape"
  | "Product"
  | "BD Culture"
  | "Art & Illustration"
  | "Logo & Brand";

interface ImagePrompt {
  id: string;
  category: Exclude<Category, "All">;
  title: string;
  titleBn: string;
  price: number; // 0 = free
  ai: AIPlatform[];
  uses: number;
  rating: number;
  prompt: string;
  previewKeywords: string; // short visual hint shown under title
}

const PROMPTS: ImagePrompt[] = [
  {
    id: "midjourney-portrait-bn",
    category: "Portrait",
    title: "Cinematic Bangla Portrait",
    titleBn: "সিনেমাটিক বাংলাদেশি পোর্ট্রেট",
    price: 0,
    ai: ["Midjourney", "DALL-E 3"],
    uses: 4210,
    rating: 4.9,
    previewKeywords: "Golden hour · Cinematic · 8K",
    prompt:
      "A photorealistic portrait of a [GENDER, e.g. young Bangladeshi woman] wearing [OUTFIT, e.g. traditional red and gold saree], standing in [LOCATION, e.g. a mustard flower field in rural Bangladesh]. Golden hour lighting, soft bokeh background, cinematic color grading, shot on Sony A7IV with 85mm f/1.4 lens. Hyper-realistic skin texture, catchlights in eyes. –ar 2:3 –v 6 –stylize 750\n\n💡 Midjourney-এ /imagine command-এ paste করুন। DALL-E 3-এর জন্য শেষের parameters বাদ দিন।\n\n🔗 Prompt test করতে: text2pixel.com (বিনামূল্যে AI image generator)",
  },
  {
    id: "dalle-landscape-bd",
    category: "Landscape",
    title: "Bangladesh Landscape — DALL-E 3",
    titleBn: "বাংলাদেশের প্রাকৃতিক দৃশ্য",
    price: 0,
    ai: ["DALL-E 3", "Midjourney", "Bing"],
    uses: 3870,
    rating: 4.8,
    previewKeywords: "Padma River · Sundarban · Aerial",
    prompt:
      "Ultra-realistic aerial photograph of [LOCATION, e.g. the Sundarbans mangrove forest in Bangladesh] during [TIME, e.g. early morning fog]. The image shows intricate waterways weaving through dense green mangroves, soft golden light breaking through mist, reflection on the water surface. Shot from drone at 300 feet altitude. National Geographic style photography, 8K resolution, vivid colors, RAW format.\n\nAlternative BD locations to try:\n- শাপলা ফুলের বিল, নেত্রকোনা\n- কক্সবাজার সমুদ্র সৈকত সূর্যাস্ত\n- রাতারগুল জলাবন\n- পদ্মা নদীর চর\n\n🔗 এই prompt টি wordtoimage.com-এ বিনামূল্যে test করুন",
  },
  {
    id: "product-photo-daraz",
    category: "Product",
    title: "E-commerce Product Photo",
    titleBn: "ই-কমার্স প্রোডাক্ট ফটো (Daraz/Facebook)",
    price: 0,
    ai: ["DALL-E 3", "Stable Diffusion", "Firefly"],
    uses: 5130,
    rating: 4.9,
    previewKeywords: "White bg · Studio · Commercial",
    prompt:
      "Professional product photography of [PRODUCT NAME, e.g. handmade leather wallet] on a clean white background. Studio lighting setup with three-point lighting, soft shadows, no harsh reflections. The product is centered, slightly angled at 30 degrees to show depth. Add subtle gradient shadow beneath. Style: Daraz/Amazon product listing quality. 4K resolution, high detail, commercial photography.\n\nVariations:\n- Lifestyle shot: Same product being used by a person in a real environment\n- Flat lay: Product arranged with complementary accessories on wooden surface\n- Infographic style: Product with labeled feature callouts\n\n💡 বাংলাদেশি e-commerce seller-দের জন্য: text2pixel.com দিয়ে ফটো generate করে সরাসরি Daraz-এ upload করুন।",
  },
  {
    id: "bd-culture-art",
    category: "BD Culture",
    title: "Bangladeshi Cultural Art",
    titleBn: "বাংলাদেশি সাংস্কৃতিক আর্ট",
    price: 0,
    ai: ["Midjourney", "DALL-E 3", "Stable Diffusion"],
    uses: 2960,
    rating: 4.8,
    previewKeywords: "Rickshaw art · Folk · Vibrant",
    prompt:
      "A vibrant digital illustration in the style of traditional Bangladeshi [ART STYLE: rickshaw art / Nakshi Kantha / Jamdani pattern / folk art] depicting [SUBJECT, e.g. a village market scene with colorful stalls, boats on river, and women in saris]. Rich, saturated colors — red, green, gold, turquoise. Intricate pattern details. Style inspired by traditional Bengali folk artists. Suitable for poster print, wall art. Flat design with cultural motifs.\n\nSpecial occasions to try:\n- পহেলা বৈশাখ উৎসব দৃশ্য\n- ঈদুল ফিতর রাতের মেলা\n- নবান্ন উৎসব ধান কাটার দৃশ্য\n- স্বাধীনতা দিবস — লাল-সবুজ থিম\n\n🔗 Generate করুন: wordtoimage.com",
  },
  {
    id: "logo-brand-ai",
    category: "Logo & Brand",
    title: "Startup Logo Generator Prompt",
    titleBn: "স্টার্টআপ লোগো AI Prompt",
    price: 49,
    ai: ["Midjourney", "DALL-E 3", "Firefly"],
    uses: 3450,
    rating: 4.9,
    previewKeywords: "Minimal · Vector · Professional",
    prompt:
      "[Premium prompt — purchase to unlock the full startup logo generation template with brand color psychology, typography pairing, icon style guide, and 8 logo variation prompts for Midjourney, DALL-E 3, and Adobe Firefly.]",
  },
  {
    id: "sd-anime-bangla",
    category: "Art & Illustration",
    title: "Anime Character — Bangla Style",
    titleBn: "বাংলা অ্যানিমে ক্যারেক্টার",
    price: 0,
    ai: ["Stable Diffusion", "Midjourney"],
    uses: 4780,
    rating: 4.8,
    previewKeywords: "Anime · Bengali costume · Stylized",
    prompt:
      "High quality anime-style illustration of a [CHARACTER DESCRIPTION, e.g. teenage girl with long black hair wearing a modern take on traditional Bangladeshi panjabi dress in purple and gold]. Large expressive eyes, detailed clothing with Jamdani-inspired geometric patterns, soft watercolor background of a Dhaka cityscape at twilight. Style: Studio Ghibli + modern webtoon art. Detailed lineart, vibrant colors, professional illustration quality.\n\nCharacter ideas:\n- বাংলাদেশি সুপারহিরো — সবুজ ও লাল costume\n- ঐতিহাসিক নায়িকা — মুক্তিযুদ্ধের থিম\n- Modern Dhaka street fashion character\n\n💡 Stable Diffusion model: Use AnyMix or Anything V5 for best anime results.",
  },
  {
    id: "midjourney-interior",
    category: "Art & Illustration",
    title: "Interior Design Visualization",
    titleBn: "ইন্টেরিয়র ডিজাইন ভিজ্যুয়ালাইজেশন",
    price: 0,
    ai: ["Midjourney", "DALL-E 3", "Stable Diffusion"],
    uses: 2340,
    rating: 4.7,
    previewKeywords: "Modern · Bangladeshi home · 3D render",
    prompt:
      "Photorealistic 3D render of a [ROOM TYPE, e.g. modern Bangladeshi living room] interior design. Style: [STYLE, e.g. contemporary minimalist with traditional Bangladeshi accents — Nakshi Kantha cushions, bamboo shelving, terracotta accents]. Natural light flooding through large windows, [TIME OF DAY, e.g. afternoon]. Warm neutral color palette — cream, earth tones, and forest green. Architectural visualization quality, 4K, ultra-detailed.\n\nRoom types to try:\n- Dhaka apartment bedroom — space-saving design\n- Traditional baithak ghor with modern comfort\n- Small restaurant / café interior — Bangladeshi theme\n\n🔗 Interior design visualization: text2pixel.com",
  },
  {
    id: "stable-diffusion-fashion",
    category: "Portrait",
    title: "Fashion Photography Prompt",
    titleBn: "ফ্যাশন ফটোগ্রাফি Prompt",
    price: 79,
    ai: ["Midjourney", "Stable Diffusion", "DALL-E 3"],
    uses: 3120,
    rating: 4.9,
    previewKeywords: "High fashion · Editorial · Magazine",
    prompt:
      "[Premium prompt — purchase to unlock the full fashion photography prompt pack: 12 prompts covering editorial, street style, traditional wear, bridal, and commercial fashion — optimized for Midjourney v6, Stable Diffusion XL, and DALL-E 3.]",
  },
  {
    id: "firefly-product-bg",
    category: "Product",
    title: "AI Background Removal & Replacement",
    titleBn: "AI দিয়ে ব্যাকগ্রাউন্ড বদলান",
    price: 0,
    ai: ["Firefly", "DALL-E 3"],
    uses: 6200,
    rating: 4.9,
    previewKeywords: "Background swap · Studio · Natural",
    prompt:
      "Using Adobe Firefly Generative Fill / DALL-E 3 inpainting: Replace the background of a product/portrait image with [BACKGROUND DESCRIPTION].\n\nBackground options by use case:\n\n📦 E-commerce (Daraz/Shajgoj):\n\"Pure white seamless studio background, soft drop shadow, professional product photography\"\n\n🌿 Lifestyle:\n\"Lush green garden, soft bokeh, natural morning light, shallow depth of field\"\n\n🏙️ Urban BD:\n\"Dhaka cityscape at golden hour, Hatirjheel lake reflection, twinkling lights\"\n\n🎨 Creative:\n\"Abstract watercolor wash background, pastel colors, artistic editorial style\"\n\n💡 Tool recommendation: Adobe Firefly (free tier) → Generative Fill → mask the background → paste this description.\n🔗 Alternative free tool: wordtoimage.com এ background replace করুন",
  },
  {
    id: "bing-creator-social",
    category: "BD Culture",
    title: "Social Media Visual — Bangla",
    titleBn: "সোশ্যাল মিডিয়া ভিজ্যুয়াল (Facebook/Instagram)",
    price: 0,
    ai: ["Bing", "DALL-E 3", "Firefly"],
    uses: 5890,
    rating: 4.8,
    previewKeywords: "Facebook · Instagram · 1080px",
    prompt:
      "Design a professional social media graphic for [PLATFORM: Facebook/Instagram] for [PURPOSE].\n\nFor business posts:\n\"Create a 1:1 ratio social media post for a Bangladeshi [BUSINESS TYPE, e.g. clothing brand] featuring [PRODUCT]. Include space for text overlay. Style: modern, vibrant, professional. Color scheme: [BRAND COLORS]. Clean composition, eye-catching, scroll-stopping visual.\"\n\nFor Eid/festival posts:\n\"Create an Eid Mubarak social media graphic with Islamic geometric patterns, crescent moon and star motifs, gold and green color palette, bokeh light effects, space for Bangla text. Festive, elegant, suitable for Bangladeshi audience.\"\n\nFor personal brand:\n\"Professional headshot-style social media banner featuring [DESCRIPTION] with a clean gradient background, subtle professional overlay. LinkedIn/Facebook profile cover size 1584x396.\"\n\n🔗 Free generate: text2pixel.com | wordtoimage.com",
  },
];

const CATEGORIES: Category[] = [
  "All",
  "Portrait",
  "Landscape",
  "Product",
  "BD Culture",
  "Art & Illustration",
  "Logo & Brand",
];

const AIS: AIPlatform[] = ["Midjourney", "DALL-E 3", "Stable Diffusion", "Firefly", "Bing"];
const AI_FILTER = ["All AI", ...AIS] as const;
type AIFilter = (typeof AI_FILTER)[number];

const formatNumber = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K` : String(n);

const TOOL_LINKS = [
  {
    name: "Text2Pixel",
    url: "https://text2pixel.com",
    desc: "Free AI Image Generator — Text থেকে stunning image তৈরি করুন সেকেন্ডে",
    badge: "Free",
    color: "bg-violet-50 border-violet-200 text-violet-900",
    badgeColor: "bg-violet-100 text-violet-800",
  },
  {
    name: "WordToImage",
    url: "https://wordtoimage.com",
    desc: "Free AI Image Generator — যেকোনো বর্ণনা থেকে image তৈরি করুন",
    badge: "Free",
    color: "bg-blue-50 border-blue-200 text-blue-900",
    badgeColor: "bg-blue-100 text-blue-800",
  },
];

const FAQS = [
  {
    q: "Midjourney আর DALL-E 3-এর মধ্যে কোনটা ভালো?",
    a: "Midjourney artistic quality এবং photorealism-এ এগিয়ে — portrait, landscape এবং creative art-এর জন্য সেরা। DALL-E 3 text understanding ভালো, instruction follow করে নিখুঁতভাবে, এবং ChatGPT-এর সাথে integrated — business use এবং e-commerce-এর জন্য সুবিধাজনক। বাংলাদেশে বিনামূল্যে শুরু করতে text2pixel.com বা wordtoimage.com ব্যবহার করুন।",
  },
  {
    q: "Stable Diffusion কি বিনামূল্যে ব্যবহার করা যায়?",
    a: "হ্যাঁ। Stable Diffusion open-source এবং locally চালানো যায়। Automatic1111 বা ComfyUI দিয়ে নিজের PC-তে unlimited image generate করুন। অনলাইনে বিনামূল্যে: Hugging Face Spaces। Cloud-এ: Stability AI-এর free tier আছে।",
  },
  {
    q: "Daraz বা Facebook shop-এর জন্য কোন prompt সবচেয়ে কার্যকর?",
    a: "\"E-commerce Product Photo\" prompt-টি সরাসরি Daraz listing-এর জন্য optimize করা। White background, studio lighting, professional quality — এই তিনটি element যেকোনো product photo-কে trustworthy করে। text2pixel.com-এ এই prompt test করুন।",
  },
  {
    q: "[BRACKETS] দিয়ে কী বোঝায়?",
    a: "প্রতিটি prompt-এ [এভাবে] লেখা অংশগুলো আপনাকে নিজের তথ্য দিয়ে replace করতে হবে। যেমন [PRODUCT NAME]-এর জায়গায় লিখুন 'handmade leather wallet'। বাকি সব text যেমন আছে তেমন রাখুন।",
  },
  {
    q: "বাংলাদেশি cultural theme-এর image তৈরি করতে কী use করবো?",
    a: "\"Bangladeshi Cultural Art\" prompt-টি বিশেষভাবে BD culture-এর জন্য — rickshaw art, Nakshi Kantha, Jamdani pattern সহ। Midjourney v6 এই ধরনের cultural-specific image-এ সবচেয়ে ভালো result দেয়। wordtoimage.com-এও try করতে পারেন।",
  },
];

export default function ImageGenerationPrompts() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [selectedAI, setSelectedAI] = useState<AIFilter>("All AI");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return PROMPTS.filter((p) => {
      if (selectedCategory !== "All" && p.category !== selectedCategory) return false;
      if (selectedAI !== "All AI" && !p.ai.includes(selectedAI as AIPlatform)) return false;
      if (
        q &&
        !p.title.toLowerCase().includes(q) &&
        !p.titleBn.toLowerCase().includes(q) &&
        !p.category.toLowerCase().includes(q) &&
        !p.previewKeywords.toLowerCase().includes(q)
      )
        return false;
      return true;
    });
  }, [selectedCategory, selectedAI, searchQuery]);

  const handleCopy = async (p: ImagePrompt) => {
    try {
      await navigator.clipboard.writeText(p.prompt);
      setCopiedId(p.id);
      setTimeout(() => setCopiedId((c) => (c === p.id ? null : c)), 2000);
    } catch {
      // noop
    }
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="min-h-screen bg-gray-50 font-bengali">
      <SEOHead
        title="Image Generation AI Prompt বাংলা | Midjourney | BdPrompt"
        description="Midjourney, DALL-E 3, Stable Diffusion, Firefly-র জন্য বাংলা AI image prompt — portrait, landscape, product photo, BD culture art। বিনামূল্যে।"
        keywords="Midjourney prompt বাংলা, DALL-E 3 prompt, Stable Diffusion prompt Bangla, AI image prompt Bangladesh, image generate AI prompt বাংলাদেশ, text2pixel, wordtoimage"
        canonicalUrl="https://bdprompt.com/image-generation-prompts"
        ogImage="https://bdprompt.com/og-image.png"
        ogType="website"
      />

      {/* NAV */}
      <nav className="bg-teal-900 text-white">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">BdPrompt</span>
            <span className="text-[10px] font-semibold bg-amber-400 text-teal-950 px-1.5 py-0.5 rounded">
              BETA
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <Link to="/explore" className="hover:text-amber-400 transition">Explore</Link>
            <Link to="/prompts" className="hover:text-amber-400 transition">Prompts</Link>
            <Link to="/youtube-script-prompts" className="hover:text-amber-400 transition">YouTube</Link>
            <Link to="/packs" className="hover:text-amber-400 transition">Packs</Link>
          </div>
          <Link
            to="/auth"
            className="bg-amber-400 hover:bg-amber-500 text-teal-950 font-semibold text-sm px-4 py-2 rounded-lg transition"
          >
            বিনামূল্যে শুরু করুন
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <header className="bg-gradient-to-br from-teal-900 via-teal-800 to-violet-900 text-white">
        <div className="max-w-5xl mx-auto px-4 py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-3 py-1.5 rounded-full text-xs mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-400" />
            </span>
            <span>২৩,০০০+ image বাংলাদেশি creators এই prompts দিয়ে তৈরি করেছেন</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-5">
            AI Image Generation-এর{" "}
            <span className="text-amber-400">বাংলা Prompt</span>
          </h1>
          <p className="text-base md:text-xl text-teal-100 max-w-3xl mx-auto mb-8">
            Midjourney, DALL-E 3, Stable Diffusion, Firefly — যেকোনো AI image tool-এর জন্য
            ready-made বাংলা prompt। Portrait, landscape, product photo, BD cultural art — সব।
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <a
              href="#prompts"
              className="bg-amber-400 hover:bg-amber-500 text-teal-950 font-bold px-6 py-3 rounded-lg transition"
            >
              🎨 Prompts দেখুন ↓
            </a>
            <a
              href="https://text2pixel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white/40 hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              Free-তে Image বানান →
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-teal-100">
            {[
              "১০০% বিনামূল্যে",
              "Midjourney v6 + DALL-E 3",
              "Stable Diffusion + Firefly",
              "বাংলাদেশি context",
            ].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <span className="text-green-400">✓</span>
                {t}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* STATS */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { v: "10+", l: "Image Prompts" },
            { v: "23K+", l: "Images Generated" },
            { v: "4.9★", l: "Rating" },
            { v: "5", l: "AI Tools" },
          ].map((s) => (
            <div key={s.l}>
              <div className="text-3xl md:text-4xl font-bold text-teal-900">{s.v}</div>
              <div className="text-sm text-gray-500 mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FREE TOOL BANNER */}
      <section className="max-w-6xl mx-auto px-4 pt-10">
        <div className="bg-gradient-to-r from-violet-50 to-blue-50 border border-violet-200 rounded-xl p-5 mb-2">
          <p className="text-sm font-semibold text-violet-900 mb-3">
            🚀 এই prompts বিনামূল্যে test করুন — কোনো account ছাড়া:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {TOOL_LINKS.map((tool) => (
              <a
                key={tool.name}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 border rounded-lg p-3 hover:shadow-sm transition ${tool.color}`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-bold text-sm">{tool.name}.com</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${tool.badgeColor}`}>
                      {tool.badge}
                    </span>
                  </div>
                  <p className="text-xs opacity-80">{tool.desc}</p>
                </div>
                <span className="text-lg shrink-0">→</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* PROMPTS */}
      <section id="prompts" className="max-w-6xl mx-auto px-4 py-10">
        {/* Search */}
        <div className="mb-5">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Prompt খুঁজুন... (portrait, landscape, product, BD culture...)"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-teal-700 bg-white"
          />
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-3">
          {CATEGORIES.map((c) => {
            const active = selectedCategory === c;
            return (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition border ${
                  active
                    ? "bg-teal-900 text-white border-teal-900"
                    : "bg-white text-gray-700 border-gray-300 hover:border-teal-700"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>

        {/* AI pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {AI_FILTER.map((a) => {
            const active = selectedAI === a;
            return (
              <button
                key={a}
                onClick={() => setSelectedAI(a)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition border ${
                  active
                    ? "bg-violet-600 text-white border-violet-600"
                    : "bg-white text-gray-700 border-gray-300 hover:border-violet-400"
                }`}
              >
                {a}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <div className="text-5xl mb-3" aria-hidden>🔍</div>
            <p>কোনো prompt পাওয়া যায়নি</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((p) => {
              const expanded = expandedId === p.id;
              const copied = copiedId === p.id;
              return (
                <article
                  key={p.id}
                  className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-5 flex flex-col"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs font-semibold bg-violet-50 text-violet-900 px-2 py-0.5 rounded">
                        {p.category}
                      </span>
                      {p.price === 0 ? (
                        <span className="text-xs font-semibold bg-green-100 text-green-800 px-2 py-0.5 rounded">
                          Free
                        </span>
                      ) : (
                        <span className="text-xs font-semibold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                          ৳{p.price}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 text-right shrink-0">
                      <div>⭐ {p.rating}</div>
                      <div>{formatNumber(p.uses)} uses</div>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 leading-snug">{p.title}</h3>
                  <p className="text-sm text-gray-600 mb-1">{p.titleBn}</p>
                  <p className="text-xs text-gray-400 mb-3 italic">{p.previewKeywords}</p>

                  {/* AI chips */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {p.ai.map((a) => (
                      <span
                        key={a}
                        className="text-[11px] font-medium bg-gray-100 text-gray-700 px-2 py-0.5 rounded"
                      >
                        {a}
                      </span>
                    ))}
                  </div>

                  {/* Prompt preview */}
                  <div className="relative mb-1">
                    <pre
                      className={`bg-gray-900 text-gray-100 text-xs font-mono p-3 rounded-lg whitespace-pre-wrap overflow-hidden ${
                        expanded ? "" : "max-h-32"
                      }`}
                    >
                      {p.prompt}
                    </pre>
                    {!expanded && (
                      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-gray-900 to-transparent rounded-b-lg pointer-events-none" />
                    )}
                  </div>
                  <button
                    onClick={() => setExpandedId(expanded ? null : p.id)}
                    className="mb-4 text-xs text-teal-800 font-semibold hover:underline text-left"
                  >
                    {expanded ? "সংক্ষেপে দেখুন ▲" : "পুরো prompt দেখুন ▼"}
                  </button>

                  {/* Actions */}
                  <div className="mt-auto flex gap-2">
                    <button
                      onClick={() => handleCopy(p)}
                      disabled={p.price > 0}
                      className={`flex-1 font-semibold text-sm py-2.5 rounded-lg transition ${
                        p.price > 0
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : copied
                          ? "bg-green-600 text-white"
                          : "bg-teal-900 hover:bg-teal-800 text-white"
                      }`}
                    >
                      {p.price > 0 ? "🔒 Premium" : copied ? "✅ Copied!" : "📋 Copy Prompt"}
                    </button>
                    <a
                      href="https://text2pixel.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-violet-500 text-violet-700 hover:bg-violet-50 font-semibold text-sm px-4 py-2.5 rounded-lg transition whitespace-nowrap"
                    >
                      Try Free →
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* AI TOOLS COMPARISON */}
      <section className="bg-white border-y border-gray-200 py-14">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-teal-900 mb-3">
            কোন AI Image Tool আপনার জন্য?
          </h2>
          <p className="text-center text-gray-500 text-sm mb-10">
            নিচের comparison দেখে বেছে নিন — এবং prompts test করুন{" "}
            <a href="https://text2pixel.com" target="_blank" rel="noopener noreferrer" className="text-violet-600 hover:underline font-semibold">
              text2pixel.com
            </a>{" "}
            বা{" "}
            <a href="https://wordtoimage.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">
              wordtoimage.com
            </a>
            -এ
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-teal-900 text-white">
                  <th className="text-left px-4 py-3 rounded-tl-lg">Tool</th>
                  <th className="px-4 py-3">Best For</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Bangla Text?</th>
                  <th className="px-4 py-3 rounded-tr-lg">Rating</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { tool: "Midjourney v6", best: "Art, portrait, creative", price: "$10/mo", bangla: "❌", rating: "⭐⭐⭐⭐⭐" },
                  { tool: "DALL-E 3", best: "E-commerce, precise instruction", price: "ChatGPT Plus", bangla: "✅ ভালো", rating: "⭐⭐⭐⭐⭐" },
                  { tool: "Stable Diffusion", best: "Unlimited local, custom model", price: "Free", bangla: "⚠️ Limited", rating: "⭐⭐⭐⭐" },
                  { tool: "Adobe Firefly", best: "Commercial safe, background swap", price: "Free tier", bangla: "✅ আছে", rating: "⭐⭐⭐⭐" },
                  { tool: "Text2Pixel ✨", best: "বাংলাদেশে সবচেয়ে সহজ", price: "Free", bangla: "✅ সেরা", rating: "⭐⭐⭐⭐⭐" },
                  { tool: "WordToImage ✨", best: "Text থেকে instant image", price: "Free", bangla: "✅ আছে", rating: "⭐⭐⭐⭐⭐" },
                ].map((row, i) => (
                  <tr
                    key={row.tool}
                    className={`border-b border-gray-100 ${i % 2 === 0 ? "bg-gray-50" : "bg-white"} ${
                      row.tool.includes("✨") ? "font-semibold" : ""
                    }`}
                  >
                    <td className="px-4 py-3 text-gray-900">{row.tool}</td>
                    <td className="px-4 py-3 text-center text-gray-600">{row.best}</td>
                    <td className="px-4 py-3 text-center">
                      <span className={row.price === "Free" ? "text-green-700 font-semibold" : "text-gray-600"}>
                        {row.price}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">{row.bangla}</td>
                    <td className="px-4 py-3 text-center">{row.rating}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* HOW TO USE */}
      <section className="bg-teal-50">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-teal-900 mb-12">
            কীভাবে ব্যবহার করবেন?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {[
              { n: "১", t: "Prompt বেছে নিন", d: "Category ও AI tool অনুযায়ী filter করে আপনার কাজের prompt খুঁজুন।" },
              { n: "২", t: "Copy করুন", d: "📋 Copy Prompt বাটনে ক্লিক করুন — এক সেকেন্ডে clipboard-এ যাবে।" },
              { n: "৩", t: "[BRACKETS] পূরণ করুন", d: "[PRODUCT NAME], [LOCATION] এই অংশগুলো আপনার নিজের তথ্য দিয়ে replace করুন।" },
              { n: "৪", t: "Generate করুন", d: "text2pixel.com বা wordtoimage.com-এ paste করুন — বিনামূল্যে image তৈরি হবে।" },
            ].map((s) => (
              <div key={s.n} className="bg-white rounded-xl p-6 shadow-sm text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-amber-400 text-teal-950 font-bold text-xl flex items-center justify-center">
                  {s.n}
                </div>
                <h3 className="font-bold text-base text-gray-900 mb-2">{s.t}</h3>
                <p className="text-sm text-gray-600">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-teal-900 mb-10">
          সাধারণ প্রশ্ন
        </h2>
        <div className="space-y-3">
          {FAQS.map((f) => (
            <details
              key={f.q}
              className="group bg-white rounded-lg shadow-sm p-4 [&_summary::-webkit-details-marker]:hidden"
            >
              <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                {f.q}
                <span className="text-teal-700 group-open:rotate-180 transition shrink-0 ml-2">▼</span>
              </summary>
              <p className="mt-3 text-gray-600 text-sm leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
      </section>

      {/* BOTTOM CTA */}
      <section className="bg-gradient-to-br from-teal-900 via-teal-800 to-violet-900 text-white">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-5">
            আজই আপনার প্রথম{" "}
            <span className="text-amber-400">AI Image</span> তৈরি করুন
          </h2>
          <p className="text-teal-100 max-w-2xl mx-auto mb-8">
            Prompt copy করুন → text2pixel.com বা wordtoimage.com-এ paste করুন → ৫ সেকেন্ডে stunning
            image তৈরি হবে। সম্পূর্ণ বিনামূল্যে।
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#prompts"
              className="bg-amber-400 hover:bg-amber-500 text-teal-950 font-bold px-6 py-3 rounded-lg transition"
            >
              🎨 Prompts দেখুন
            </a>
            <a
              href="https://text2pixel.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-violet-600 hover:bg-violet-500 text-white font-bold px-6 py-3 rounded-lg transition"
            >
              text2pixel.com →
            </a>
            <a
              href="https://wordtoimage.com"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white/40 hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              wordtoimage.com →
            </a>
          </div>
        </div>
      </section>

      {/* CROSS-LINK TO OTHER PROMPT PAGES */}
      <section className="bg-white border-t border-gray-100 py-10">
        <div className="max-w-5xl mx-auto px-4">
          <h3 className="text-lg font-bold text-gray-800 mb-5 text-center">আরও Prompt দেখুন</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "🎬 YouTube Script", href: "/youtube-script-prompts" },
              { label: "📢 Facebook Post", href: "/explore/content" },
              { label: "💼 Business", href: "/explore/business" },
              { label: "🎓 Education", href: "/explore/education" },
            ].map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-center border border-gray-200 rounded-lg py-3 px-4 text-sm font-medium text-gray-700 hover:border-teal-500 hover:text-teal-800 transition"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-teal-950 text-teal-200 text-sm">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-2 justify-between items-center">
          <p>© 2026 BdPrompt by Start BD — বাংলাদেশের #১ Free AI Prompt Generator</p>
          <div className="flex gap-4">
            <a href="https://text2pixel.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              text2pixel.com
            </a>
            <span>·</span>
            <a href="https://wordtoimage.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
              wordtoimage.com
            </a>
            <span>·</span>
            <Link to="/" className="hover:text-white transition">bdprompt.com</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
