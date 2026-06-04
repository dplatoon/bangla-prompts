import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";

type AIPlatform = "ChatGPT" | "Claude" | "Gemini";

type Category =
  | "All"
  | "Viral Post"
  | "Business & Product"
  | "Personal Brand"
  | "Engagement"
  | "Festival & Eid"
  | "Story & Caption";

interface FBPrompt {
  id: string;
  category: Exclude<Category, "All">;
  title: string;
  titleBn: string;
  price: number;
  ai: AIPlatform[];
  uses: number;
  rating: number;
  hook: string; // short tagline shown on card
  prompt: string;
}

const PROMPTS: FBPrompt[] = [
  {
    id: "viral-opinion-post",
    category: "Viral Post",
    title: "Viral Opinion / Controversial Hook",
    titleBn: "ভাইরাল মতামত পোস্ট",
    price: 0,
    ai: ["ChatGPT", "Claude", "Gemini"],
    uses: 8740,
    rating: 4.9,
    hook: "Scroll-stopping opinion → 500+ reactions",
    prompt: `তুমি একজন বাংলাদেশি Facebook viral content expert। আমাকে [TOPIC]-এর উপর একটি viral মতামত পোস্ট লিখে দাও।

Formula:
• Line 1 (Hook): একটি bold, slightly controversial statement যা মানুষকে থামাবে — "সত্যি কথা বলতে গেলে..." বা "অনেকে রাগ করবেন, তবু বলছি..."
• Lines 2-4: Statement-এর পক্ষে ২-৩টি concrete কারণ
• Lines 5-6: Counterargument স্বীকার করো — "অনেকে বলবেন..."
• Line 7: Strong closing — আপনার final stance
• CTA (শেষ): "আপনি কি একমত? Comment-এ জানান 👇"

Topic: [TOPIC, যেমন: বাংলাদেশে freelancing, শিক্ষা ব্যবস্থা, startup culture]
Tone: Direct, confident, relatable — lecture নয়
Length: ১৫০-২০০ words
Language: সহজ বাংলা, Facebook-এর audience-এর জন্য`,
  },
  {
    id: "viral-list-post",
    category: "Viral Post",
    title: "Viral List / Tips Post",
    titleBn: "ভাইরাল লিস্ট ও টিপস পোস্ট",
    price: 0,
    ai: ["ChatGPT", "Claude", "Gemini"],
    uses: 7230,
    rating: 4.9,
    hook: "Numbered lists = highest share rate",
    prompt: `তুমি একজন viral Bangla content writer। [TOPIC]-এর উপর একটি high-engagement list post লিখে দাও Facebook-এর জন্য।

Format:
• Hook (Line 1): "যা [TARGET AUDIENCE] জানলে জীবন সহজ হতো:" বা "[NUMBER]টি জিনিস যা কেউ বলে না:"
• List: ৫-৭টি item, প্রতিটি emoji দিয়ে শুরু, এক লাইনে পয়েন্ট + এক লাইনে brief explanation
• Pattern interrupt: list-এর মাঝে একটি unexpected item রাখো
• Closing: "কোনটা সবচেয়ে কাজে লাগবে? Number বলুন 👇"

Topic: [TOPIC]
Target audience: [AUDIENCE, যেমন: নতুন উদ্যোক্তা, বিশ্ববিদ্যালয় ছাত্র, গৃহিণী]
Tone: Helpful, practical, friendly
Emoji: হ্যাঁ — প্রতি point-এ একটি relevant emoji
Length: ১৮০-২৫০ words`,
  },
  {
    id: "product-launch-post",
    category: "Business & Product",
    title: "Product Launch Announcement",
    titleBn: "প্রোডাক্ট লঞ্চ পোস্ট",
    price: 0,
    ai: ["ChatGPT", "Claude", "Gemini"],
    uses: 5890,
    rating: 4.8,
    hook: "Launch day hype → clicks & DMs",
    prompt: `তুমি একজন বাংলাদেশি e-commerce copywriter। আমার [PRODUCT NAME]-এর Facebook launch post লিখে দাও।

Product details:
- Product: [PRODUCT NAME]
- Key benefit: [MAIN BENEFIT, যেমন: হাত থেকে তৈরি, একদিনে ডেলিভারি, ১ বছরের warranty]
- Price: [PRICE] টাকা
- Special offer: [OFFER, যেমন: প্রথম ৫০ জনের জন্য ২০% ছাড়]
- Link/Contact: [LINK বা "Inbox করুন"]

Post structure:
• Hook: একটি pain point বা desire দিয়ে শুরু (product name দিয়ে নয়)
• Problem → Solution: customer-এর সমস্যা → আপনার product কীভাবে solve করে
• Social proof: "ইতিমধ্যে [X] জন ব্যবহার করছেন" বা testimonial hint
• Offer + scarcity: limited time / limited stock
• Clear CTA: "এখনই order করুন 👇" / "Comment 'YES' করুন"

Tone: Excited কিন্তু trustworthy, pushy নয়
Language: সহজ বাংলা + relevant emoji`,
  },
  {
    id: "business-storytelling",
    category: "Business & Product",
    title: "Business Story / Origin Post",
    titleBn: "ব্যবসার গল্প পোস্ট",
    price: 0,
    ai: ["ChatGPT", "Claude"],
    uses: 4120,
    rating: 4.8,
    hook: "Story posts get 3x more reach than ads",
    prompt: `তুমি একজন brand storytelling expert। আমার ব্যবসার পেছনের গল্প Facebook-এ share করার জন্য একটি authentic post লিখে দাও।

আমার গল্পের details:
- ব্যবসার নাম: [BUSINESS NAME]
- কবে শুরু: [YEAR/MONTH]
- কেন শুরু করেছিলাম: [MOTIVATION, যেমন: চাকরি হারিয়ে, মা-কে সাহায্য করতে, একটি সমস্যা দেখে]
- সবচেয়ে কঠিন মুহূর্ত: [CHALLENGE]
- এখন কোথায়: [CURRENT STATE]

Story arc:
১. Hook — একটি emotional বা surprising statement
২. Setting — কখন, কোথায়, কী অবস্থায় ছিলাম
৩. The turning point — কী পরিবর্তন হলো
৪. The struggle — honest difficulty, relatable
৫. Where we are now — without bragging
৬. Why I'm sharing — connect with audience
৭. CTA — "আপনার গল্প কী? Share করুন 👇"

Tone: Honest, humble, inspiring — not a sales pitch
Length: ২৫০-৩৫০ words`,
  },
  {
    id: "personal-brand-thought-leader",
    category: "Personal Brand",
    title: "Thought Leadership Post",
    titleBn: "থট লিডারশিপ পোস্ট",
    price: 0,
    ai: ["ChatGPT", "Claude"],
    uses: 3870,
    rating: 4.8,
    hook: "Build authority → attract clients & followers",
    prompt: `তুমি একজন personal branding expert। [FIELD]-এ আমার expertise তুলে ধরে একটি thought leadership Facebook post লিখে দাও।

My background: [YOUR EXPERIENCE, যেমন: ৫ বছর digital marketing-এ, ১০০+ client serve করেছি]
Insight to share: [THE LESSON OR OBSERVATION]
Audience: [WHO FOLLOWS YOU, যেমন: নতুন উদ্যোক্তা, freelancer]

Structure:
• Opening: একটি counterintuitive insight দিয়ে শুরু — "[FIELD]-এ [X] বছর কাজ করে যা শিখলাম তা অনেককে চমকে দেয়..."
• The lesson: আপনার main point — simple, clear
• Evidence: একটি real example বা story (anonymized ok)
• Common mistake: "অনেকে ভুল করেন যখন..."
• The right way: আপনার recommendation
• Invitation: "আপনার experience কী? Comment করুন 👇"

Tone: Expert কিন্তু approachable, না arrogant
Use: প্রথম person ("আমি"), personal experience থেকে লিখুন
Length: ২০০-২৮০ words`,
  },
  {
    id: "engagement-question-post",
    category: "Engagement",
    title: "High-Engagement Question Post",
    titleBn: "হাই এনগেজমেন্ট প্রশ্ন পোস্ট",
    price: 0,
    ai: ["ChatGPT", "Gemini", "Claude"],
    uses: 9340,
    rating: 4.9,
    hook: "Questions get 400% more comments",
    prompt: `তুমি একজন Facebook community engagement specialist। [PAGE/GROUP TYPE]-এর জন্য ৫টি high-engagement প্রশ্ন post লিখে দাও।

Page/Group type: [TYPE, যেমন: উদ্যোক্তা গ্রুপ, রান্না পেজ, tech community]
Goal: Maximum comments, shares এবং reactions

প্রতিটি post-এর format:
• ১-২ লাইন context বা mini-story
• The question (bold, clear)
• ২-৩টি answer option দাও (এটা comment encourage করে)
• "আপনার উত্তর 👇" CTA

Question types to include:
1. "এটা হলে আপনি কী করতেন?" (scenario)
2. "কোনটা বেছে নেবেন?" (choice)
3. "আপনার প্রথমবার..." (nostalgia/story trigger)
4. "সত্যি কথা বলুন..." (honest opinion)
5. "[NUMBER] নম্বরে react করুন যদি..." (reaction bait — ethical)

Tone: Friendly, conversational, community feel
Language: সহজ বাংলা, সবার বোধগম্য`,
  },
  {
    id: "eid-festival-post",
    category: "Festival & Eid",
    title: "Eid / Festival Engagement Post",
    titleBn: "ঈদ ও উৎসব পোস্ট",
    price: 0,
    ai: ["ChatGPT", "Gemini", "Claude"],
    uses: 12400,
    rating: 4.9,
    hook: "Festival posts = peak reach moments",
    prompt: `তুমি একজন বাংলাদেশি social media content writer। [FESTIVAL: ঈদুল ফিতর / ঈদুল আযহা / পহেলা বৈশাখ / বিজয় দিবস]-এর জন্য ৩ ধরনের Facebook post লিখে দাও।

Festival: [FESTIVAL NAME]
Brand/Page name: [YOUR PAGE NAME]
Tone: [Warm & heartfelt / Funny & light / Professional & formal]

Post 1 — Greeting post (reach maximizer):
• Personal উষ্ণ শুভেচ্ছা — generic নয়, specific memory বা feeling সহ
• Audience-কে involve করো — "আপনাদের [festival] কেমন কাটছে?"
• Brand mention — subtle, last line-এ

Post 2 — Engagement hook:
• Festival-related question বা poll
• "এই [festival]-এ আপনার সবচেয়ে বড় ইচ্ছে কী?" / "কোন খাবার মিস করবেন না?"
• Comment করতে উৎসাহিত করুন

Post 3 — Business post (sales-friendly):
• Festival mood + product/service connect
• Special offer বা goodwill gesture
• Soft CTA — "আজকের দিনে একটু special করুন 🎁"

Language: আন্তরিক বাংলা, emoji সহ কিন্তু excessive নয়`,
  },
  {
    id: "facebook-story-caption",
    category: "Story & Caption",
    title: "Facebook Story + Caption Pack",
    titleBn: "Facebook Story ও ক্যাপশন প্যাক",
    price: 0,
    ai: ["ChatGPT", "Gemini"],
    uses: 6780,
    rating: 4.8,
    hook: "Story views → profile visits → followers",
    prompt: `তুমি একজন social media caption expert। আমার [PHOTO/VIDEO TYPE]-এর জন্য ৫টি আলাদা caption option লিখে দাও Facebook Story এবং post-এর জন্য।

Content type: [WHAT YOU'RE POSTING, যেমন: নতুন office-এর ছবি, product unboxing video, team photo, food photo]
Mood: [MOOD: happy / proud / grateful / excited / reflective]
Target: [WHO YOU WANT TO REACH]

Provide 5 variations:
1. Short & punchy (১ লাইন + emoji) — Story-এর জন্য
2. Question caption — engagement বাড়ানোর জন্য
3. Storytelling caption (৩-৪ লাইন) — emotional connect
4. Humorous caption — relatable & shareable
5. Motivational caption — inspire করার জন্য

প্রতিটিতে:
• Relevant emoji (১-৩টি, বেশি নয়)
• ৩-৫টি hashtag (Bangla + English mix)
• Optional: "tag করুন" বা "share করুন" CTA

Language: Casual বাংলা, যেন বন্ধুকে লিখছেন`,
  },
  {
    id: "facebook-ads-copy",
    category: "Business & Product",
    title: "Facebook Ad Copy (Paid Ads)",
    titleBn: "Facebook বিজ্ঞাপনের কপি",
    price: 49,
    ai: ["ChatGPT", "Claude"],
    uses: 4560,
    rating: 4.9,
    hook: "High CTR ad copy → lower CPM",
    prompt:
      "[Premium prompt — purchase to unlock the full Facebook Ads copywriting template with primary text, headline, description, 3 hook variations, A/B test versions, and retargeting copy — optimized for Bangladeshi market CPM and CTR.]",
  },
  {
    id: "group-growth-post",
    category: "Engagement",
    title: "Facebook Group Growth Post",
    titleBn: "Facebook গ্রুপ গ্রোথ পোস্ট",
    price: 0,
    ai: ["ChatGPT", "Claude", "Gemini"],
    uses: 3240,
    rating: 4.7,
    hook: "Welcome + rules + engagement in one",
    prompt: `তুমি একজন Facebook Group community manager। আমার গ্রুপের জন্য ৩ ধরনের post template লিখে দাও।

Group details:
- Group name: [GROUP NAME]
- Niche: [TOPIC, যেমন: বাংলাদেশি উদ্যোক্তা, রান্না শেখা, tech career]
- Members: [MEMBER COUNT]
- Goal: [GOAL: sell products / share knowledge / build community]

Template 1 — Welcome post (নতুন member-এর জন্য):
• Warm welcome + group-এর purpose
• "নিজের পরিচয় দিন" prompt
• Group rules — friendly tone-এ, list format

Template 2 — Weekly engagement post:
• সপ্তাহের শুরুতে group active করার post
• একটি question বা challenge
• Members-কে tag করার incentive

Template 3 — Value post (group-এর expertise share):
• [NICHE]-সম্পর্কিত একটি quick tip বা insight
• "এটা কি আপনার কাজে লেগেছে?" CTA
• Save করতে বা share করতে উৎসাহিত করুন

Tone: Community leader — helpful, inclusive, energetic`,
  },
  {
    id: "personal-brand-milestone",
    category: "Personal Brand",
    title: "Milestone Celebration Post",
    titleBn: "মাইলস্টোন সেলিব্রেশন পোস্ট",
    price: 0,
    ai: ["ChatGPT", "Claude", "Gemini"],
    uses: 5670,
    rating: 4.8,
    hook: "Turn achievements into audience trust",
    prompt: `তুমি একজন personal brand strategist। আমার [MILESTONE]-এর জন্য একটি authentic celebration post লিখে দাও যা brag না করে audience-কে involve করে।

Milestone: [ACHIEVEMENT, যেমন: ১০,০০০ followers, ১ বছর ব্যবসা, ১০০তম client, প্রথম ৫ লাখ টাকা revenue]
Journey duration: [TIME PERIOD]
Biggest challenge overcome: [CHALLENGE]
Who helped: [ACKNOWLEDGMENT]

Structure:
• Opening: milestone announce করো — কিন্তু gratitude দিয়ে শুরু, self-praise দিয়ে নয়
• The real story: "এক বছর আগে আমি..." — vulnerable, honest
• The turning point: কী পরিবর্তন করলো
• Thank you: audience, team, family — specific হও
• What's next: excitement share করো
• Give back: audience-কে একটি free value দাও (tip, resource)
• CTA: "এই journey-এ আপনিও ছিলেন — thank you 💚"

Tone: Grateful, grounded, inspiring
Length: ৩০০-৪০০ words
Important: Achievement-এর চেয়ে lesson বেশি — এটাই viral করে`,
  },
  {
    id: "viral-share-post",
    category: "Viral Post",
    title: "Ultra-Shareable Relatable Post",
    titleBn: "শেয়ারযোগ্য রিলেটেবল পোস্ট",
    price: 79,
    ai: ["ChatGPT", "Claude"],
    uses: 6890,
    rating: 4.9,
    hook: "Designed for 1000+ shares",
    prompt:
      "[Premium prompt — purchase to unlock the viral shareability formula: psychological trigger mapping, 5 relatable post templates for Bangladeshi audience (student, parent, employee, entrepreneur, homemaker), with shareability score checklist and optimal posting time guide.]",
  },
];

const CATEGORIES: Category[] = [
  "All",
  "Viral Post",
  "Business & Product",
  "Personal Brand",
  "Engagement",
  "Festival & Eid",
  "Story & Caption",
];

const AIS: AIPlatform[] = ["ChatGPT", "Claude", "Gemini"];
const AI_FILTER = ["All AI", ...AIS] as const;
type AIFilter = (typeof AI_FILTER)[number];

const formatNumber = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K` : String(n);

const TIPS = [
  { emoji: "⏰", tip: "সেরা সময়", detail: "সন্ধ্যা ৭টা–রাত ১০টা এবং সকাল ৮টা–১০টা" },
  { emoji: "📏", tip: "আদর্শ দৈর্ঘ্য", detail: "১৫০–৩০০ words — বেশি হলে reach কমে" },
  { emoji: "❓", tip: "CTA সবসময়", detail: "শেষে প্রশ্ন রাখুন — comments = reach boost" },
  { emoji: "🖼️", tip: "ছবি ছাড়া", detail: "Text-only post-এ অনেক সময় বেশি reach হয়" },
];

const FAQS = [
  {
    q: "Facebook-এ বাংলা post কি ইংরেজির চেয়ে বেশি reach পায়?",
    a: "বাংলাদেশি audience-এর কাছে হ্যাঁ — বাংলা post-এ engagement rate গড়ে ২-৩ গুণ বেশি কারণ মানুষ নিজের ভাষায় comment করতে স্বাচ্ছন্দ্য বোধ করে। তবে mixed (বাংলা + কিছু English term) সবচেয়ে ভালো কাজ করে।",
  },
  {
    q: "AI দিয়ে লেখা Facebook post কি Facebook detect করে?",
    a: "না — Facebook এখনো AI-written text detect করে না। তবে AI-র output সরাসরি post না করে নিজের voice-এ একটু edit করুন। Personal experience, local reference এবং emoji যোগ করলে post অনেক বেশি authentic দেখায়।",
  },
  {
    q: "কোন AI Facebook post লেখায় সবচেয়ে ভালো?",
    a: "ChatGPT GPT-4 — সবচেয়ে versatile, যেকোনো tone ধরতে পারে। Claude — emotional storytelling এবং personal brand post-এ বিশেষ ভালো। Gemini — quick, factual এবং list post-এর জন্য fast।",
  },
  {
    q: "Viral post কি formula দিয়ে লেখা যায়?",
    a: "হ্যাঁ। বেশিরভাগ viral Bangla Facebook post-এ তিনটি element থাকে: (১) Relatable hook — প্রথম লাইনেই মানুষ নিজেকে দেখতে পায়, (২) Emotional trigger — হাসি, nostalgia, বা 'এটা আমারই কথা' feeling, (৩) Simple CTA — comment করতে বললে algorithm reach বাড়ায়।",
  },
  {
    q: "[BRACKETS] অংশগুলো কীভাবে fill করবো?",
    a: "Prompt copy করার পর AI-তে paste করুন এবং [এভাবে] লেখা অংশগুলো আপনার নিজের তথ্য দিয়ে replace করুন। যেমন [TOPIC]-এর জায়গায় লিখুন 'বাংলাদেশে freelancing' — তারপর AI বাকিটা লিখে দেবে।",
  },
];

export default function FacebookPostPrompts() {
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
        !p.hook.toLowerCase().includes(q)
      )
        return false;
      return true;
    });
  }, [selectedCategory, selectedAI, searchQuery]);

  const handleCopy = async (p: FBPrompt) => {
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
        title="Facebook Viral Post AI Prompt বাংলা | ChatGPT Facebook পোস্ট | BdPrompt"
        description="বাংলাদেশের জন্য Facebook viral post, business post, engagement post-এর AI prompt — ChatGPT, Claude, Gemini দিয়ে বাংলায় লিখুন। ১০০% বিনামূল্যে।"
        keywords="Facebook viral post AI prompt, Facebook বিজ্ঞাপন লেখার AI prompt, ChatGPT Facebook post বাংলা, বাংলা Facebook post prompt, Facebook engagement prompt Bangladesh"
        canonicalUrl="https://bdprompt.com/facebook-post-prompts"
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
            <Link to="/image-generation-prompts" className="hover:text-amber-400 transition">Image AI</Link>
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
      <header className="bg-gradient-to-br from-teal-900 via-blue-900 to-teal-900 text-white">
        <div className="max-w-5xl mx-auto px-4 py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-3 py-1.5 rounded-full text-xs mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-400" />
            </span>
            <span>৩৪,০০০+ বাংলাদেশি Facebook creator এই prompts ব্যবহার করছেন</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-5">
            Facebook Viral Post-এর{" "}
            <span className="text-amber-400">বাংলা AI Prompt</span>
          </h1>
          <p className="text-base md:text-xl text-blue-100 max-w-3xl mx-auto mb-8">
            Viral post, business launch, engagement, ঈদ পোস্ট, personal brand — সব ধরনের Facebook
            post ChatGPT, Claude ও Gemini দিয়ে বাংলায় লিখুন। সম্পূর্ণ বিনামূল্যে।
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <a
              href="#prompts"
              className="bg-amber-400 hover:bg-amber-500 text-teal-950 font-bold px-6 py-3 rounded-lg transition"
            >
              📱 Prompts দেখুন ↓
            </a>
            <Link
              to="/playground"
              className="border-2 border-white/40 hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              Playground-এ Try করুন
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-blue-100">
            {[
              "১০০% বিনামূল্যে",
              "Sign-up লাগে না",
              "১২টি prompt template",
              "বাংলাদেশি audience-এর জন্য",
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
            { v: "12+", l: "FB Post Prompts" },
            { v: "34K+", l: "Posts Generated" },
            { v: "4.9★", l: "Rating" },
            { v: "3", l: "AI Platforms" },
          ].map((s) => (
            <div key={s.l}>
              <div className="text-3xl md:text-4xl font-bold text-teal-900">{s.v}</div>
              <div className="text-sm text-gray-500 mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* QUICK TIPS BANNER */}
      <section className="max-w-6xl mx-auto px-4 pt-10">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-2">
          <p className="text-sm font-bold text-blue-900 mb-4">
            📊 বাংলাদেশি Facebook-এ viral হওয়ার ৪টি নিয়ম:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {TIPS.map((tip) => (
              <div key={tip.tip} className="bg-white rounded-lg p-3 border border-blue-100">
                <div className="text-xl mb-1">{tip.emoji}</div>
                <div className="text-xs font-bold text-blue-900">{tip.tip}</div>
                <div className="text-xs text-gray-600 mt-0.5">{tip.detail}</div>
              </div>
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
            placeholder="Prompt খুঁজুন... (viral, business, ঈদ, engagement...)"
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
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 border-gray-300 hover:border-blue-400"
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
                      <span className="text-xs font-semibold bg-blue-50 text-blue-900 px-2 py-0.5 rounded">
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
                  <p className="text-xs text-blue-600 font-medium mb-3 italic">{p.hook}</p>

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
                    <Link
                      to="/playground"
                      className="border border-teal-900 text-teal-900 hover:bg-teal-50 font-semibold text-sm px-4 py-2.5 rounded-lg transition"
                    >
                      Try →
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* HOW TO USE */}
      <section className="bg-teal-50">
        <div className="max-w-5xl mx-auto px-4 py-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-teal-900 mb-12">
            কীভাবে ব্যবহার করবেন?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                n: "১",
                t: "Prompt বেছে নিন",
                d: "Category filter করুন — Viral Post, Business, Engagement, Festival — আপনার দরকার অনুযায়ী।",
              },
              {
                n: "২",
                t: "Copy → AI-তে Paste",
                d: "📋 Copy করুন → ChatGPT/Claude/Gemini-এ paste করুন → [BRACKETS] আপনার তথ্য দিয়ে fill করুন।",
              },
              {
                n: "৩",
                t: "Edit করে Post করুন",
                d: "AI-র output-এ নিজের কথা, local reference ও emoji যোগ করুন — তারপর Facebook-এ post করুন।",
              },
            ].map((s) => (
              <div key={s.n} className="bg-white rounded-xl p-6 shadow-sm text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-amber-400 text-teal-950 font-bold text-xl flex items-center justify-center">
                  {s.n}
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">{s.t}</h3>
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
                <span className="text-teal-700 group-open:rotate-180 transition shrink-0 ml-2">
                  ▼
                </span>
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

      {/* CROSS-LINKS */}
      <section className="bg-white border-t border-gray-100 py-10">
        <div className="max-w-5xl mx-auto px-4">
          <h3 className="text-lg font-bold text-gray-800 mb-5 text-center">আরও Prompt দেখুন</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "🎬 YouTube Script", href: "/youtube-script-prompts" },
              { label: "🖼️ Image Generation", href: "/image-generation-prompts" },
              { label: "💼 Business Prompts", href: "/explore/business" },
              { label: "📦 Prompt Packs", href: "/packs" },
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

      {/* BOTTOM CTA */}
      <section className="bg-gradient-to-br from-teal-900 via-blue-900 to-teal-900 text-white">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-5">
            আজই আপনার পরবর্তী{" "}
            <span className="text-amber-400">Viral Facebook Post</span> লিখুন
          </h2>
          <p className="text-blue-100 max-w-2xl mx-auto mb-8">
            Prompt copy করুন → ChatGPT/Claude-এ paste করুন → ৩০ সেকেন্ডে professional বাংলা
            Facebook post তৈরি। সম্পূর্ণ বিনামূল্যে।
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#prompts"
              className="bg-amber-400 hover:bg-amber-500 text-teal-950 font-bold px-6 py-3 rounded-lg transition"
            >
              📋 Prompt Copy করুন
            </a>
            <Link
              to="/playground"
              className="border-2 border-white/40 hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              Playground-এ Test করুন
            </Link>
            <Link
              to="/packs"
              className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              Premium Packs →
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-teal-950 text-teal-200 text-sm">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-2 justify-between items-center">
          <p>© 2026 BdPrompt by Start BD — বাংলাদেশের #১ Free AI Prompt Generator</p>
          <p>Made with 💚 in Bangladesh</p>
        </div>
      </footer>
    </div>
  );
}
