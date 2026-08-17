import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";

type AIPlatform = "ChatGPT" | "Claude" | "Gemini";

type Category =
  | "All"
  | "Facebook Ads"
  | "Google Ads"
  | "Daraz & E-commerce"
  | "YouTube Ads"
  | "SMS & WhatsApp"
  | "Email Marketing";

interface AdPrompt {
  id: string;
  category: Exclude<Category, "All">;
  title: string;
  titleBn: string;
  price: number;
  ai: AIPlatform[];
  uses: number;
  rating: number;
  metric: string; // e.g. "CTR 4.2% avg"
  prompt: string;
}

const PROMPTS: AdPrompt[] = [
  {
    id: "fb-ad-primary-text",
    category: "Facebook Ads",
    title: "Facebook Ad — Primary Text (Full Copy)",
    titleBn: "Facebook বিজ্ঞাপনের মূল লেখা",
    price: 0,
    ai: ["ChatGPT", "Claude", "Gemini"],
    uses: 9870,
    rating: 4.9,
    metric: "সবচেয়ে বেশি ব্যবহৃত",
    prompt: `তুমি একজন expert Facebook Ads copywriter যে বাংলাদেশি market-এ কাজ করেছে। আমার [PRODUCT/SERVICE]-এর জন্য একটি high-converting Facebook ad লিখে দাও।

Product/Service: [নাম ও সংক্ষিপ্ত বর্ণনা]
Target audience: [যেমন: ২৫-৪০ বছর বয়সী Dhaka-র working women / নতুন উদ্যোক্তা / গৃহিণী যারা online shop করেন]
Main benefit: [সবচেয়ে বড় সুবিধা, যেমন: দ্রুত ডেলিভারি, সেরা দাম, handmade quality]
Offer: [বিশেষ অফার, যেমন: ২০% ছাড়, ফ্রি ডেলিভারি, buy 2 get 1]
CTA goal: [কী করাতে চান: Website visit / DM করা / Order করা]

৩টি variation দাও:

Variation A — Pain-point hook:
• Hook (১ লাইন): audience-এর সমস্যা দিয়ে শুরু
• Body (২-৩ লাইন): সমস্যা → আপনার solution
• Offer + CTA

Variation B — Curiosity hook:
• Hook: একটি surprising fact বা প্রশ্ন
• Body: benefit-focused, social proof hint
• Offer + CTA

Variation C — Direct/Offer-first:
• Hook: সরাসরি offer announce
• Body: কেন এটা miss করা উচিত না
• Urgency + CTA

প্রতিটি variation:
- ১৫০ শব্দের মধ্যে
- বাংলায়, emoji সহ (৩-৫টি)
- "আজই", "এখনই", "সীমিত সময়" — urgency words
- Headline (40 characters): ২টি option

💡 A/B test করো — Variation A ও B একসাথে চালাও এবং ৩ দিন পরে কোনটায় বেশি result দেখো।`,
  },
  {
    id: "fb-ad-retargeting",
    category: "Facebook Ads",
    title: "Facebook Retargeting Ad Copy",
    titleBn: "Facebook রিটার্গেটিং বিজ্ঞাপন",
    price: 0,
    ai: ["ChatGPT", "Claude"],
    uses: 5340,
    rating: 4.8,
    metric: "Warm audience · High ROAS",
    prompt: `তুমি একজন performance marketing specialist। আমার website বা page-এ আগে এসেছে কিন্তু কেনেনি — এমন audience-এর জন্য retargeting ad copy লিখে দাও।

Product: [PRODUCT NAME]
Price: [PRICE] টাকা
Why they didn't buy (common objections):
- [ ] দাম বেশি মনে হয়েছে
- [ ] Trust করেনি
- [ ] ভুলে গেছে
- [ ] Shipping নিয়ে সন্দেহ ছিল

Retargeting copy — ৩টি approach:

1. Reminder + Incentive:
"[Product]-টা কি এখনো cart-এ আছে? 😊 আজকের জন্য বিশেষ [X]% ছাড় রাখলাম আপনার জন্য → [CTA]"

2. Social Proof + Trust:
"[X] জন customer ইতিমধ্যে [PRODUCT] নিয়েছেন এই মাসে। [SPECIFIC RESULT/REVIEW HINT] → [CTA]"

3. Scarcity/FOMO:
"[PRODUCT]-এর stock শেষ হতে চলেছে। আপনি দেখেছিলেন — এখনো available আছে কিনুন → [CTA]"

প্রতিটি:
- ৮০ শব্দের মধ্যে (retargeting = short)
- Personal feel — "আপনার জন্য" tone
- একটি clear CTA button text

Headline options: ৩টি (৪০ character max each)`,
  },
  {
    id: "google-search-ad",
    category: "Google Ads",
    title: "Google Search Ad — RSA Copy",
    titleBn: "Google সার্চ বিজ্ঞাপন (RSA)",
    price: 0,
    ai: ["ChatGPT", "Gemini"],
    uses: 4120,
    rating: 4.8,
    metric: "Quality Score optimize",
    prompt: `তুমি একজন Google Ads expert। আমার [BUSINESS]-এর জন্য Responsive Search Ad (RSA) copy লিখে দাও।

Business: [BUSINESS TYPE, যেমন: Dhaka-র interior design firm / online clothing store / accounting software]
Main keyword: [PRIMARY KEYWORD, যেমন: "interior design Dhaka" / "বাংলাদেশ অনলাইন শপ"]
Landing page goal: [Phone call / Form fill / Purchase]
USP (আপনার সুবিধা): [যেমন: 10 years experience, lowest price, same-day delivery]

Provide:

Headlines (15টি — max 30 characters each):
১. Keyword-focused: [keyword] সরাসরি ব্যবহার করো
২. Benefit-focused: সবচেয়ে বড় সুবিধা
৩. CTA-focused: action word সহ
৪. Social proof: number বা award
৫. Urgency: time-sensitive

Descriptions (4টি — max 90 characters each):
• Feature + benefit combination
• Trust signal + CTA
• Offer/promotion + CTA
• Problem + solution + CTA

Pin recommendations:
- Headline 1-এ কোনটা pin করবো
- Description 1-এ কোনটা best

Negative keywords to add: ৫টি suggestion

💡 RSA-তে সব 15 headline ও 4 description fill করো — Google নিজেই best combination test করবে।`,
  },
  {
    id: "daraz-product-listing",
    category: "Daraz & E-commerce",
    title: "Daraz Product Listing Copy",
    titleBn: "Daraz প্রোডাক্ট লিস্টিং কপি",
    price: 0,
    ai: ["ChatGPT", "Gemini", "Claude"],
    uses: 13450,
    rating: 4.9,
    metric: "SEO optimized · More clicks",
    prompt: `তুমি একজন Daraz SEO ও product listing expert। আমার product-এর জন্য একটি high-converting Daraz listing লিখে দাও।

Product details:
- Product name: [নাম]
- Category: [Daraz category]
- Key features: [৫টি main feature]
- Material/Specifications: [specs]
- Target buyer: [কে কিনবে]
- Price: [টাকা]
- Variations: [color/size etc.]

আমাকে দাও:

1. Product Title (120 characters max):
Format: [Brand] + [Product Type] + [Key Feature] + [Model/Spec] + [Benefit keyword]
৩টি title option দাও — SEO keyword-rich

2. Product Description (500 words):
• Opening: buyer-এর pain point → your solution
• Key features (bullet list, emoji সহ):
  ✅ Feature 1: benefit explain
  ✅ Feature 2: benefit explain
  (৫-৭টি feature)
• Who is this for: specific buyer persona
• How to use: সংক্ষিপ্ত instructions
• What's in the box: package contents
• Guarantee/warranty info
• Closing CTA: "এখনই Add to Cart করুন"

3. Search Tags/Keywords: ১৫টি Bangla ও English mix

4. Bullet Points (Daraz highlights): ৫টি, ৮০ char max each

💡 Daraz-এ বিক্রি বাড়ানোর tip: Title-এ "Free Delivery" বা "Authentic" শব্দ ব্যবহার করো যদি applicable হয়।`,
  },
  {
    id: "facebook-shop-product",
    category: "Daraz & E-commerce",
    title: "Facebook Shop / Page Product Post",
    titleBn: "Facebook Shop প্রোডাক্ট পোস্ট",
    price: 0,
    ai: ["ChatGPT", "Gemini", "Claude"],
    uses: 11230,
    rating: 4.9,
    metric: "DM বাড়ায় · Organic reach",
    prompt: `তুমি একজন বাংলাদেশি e-commerce copywriter। আমার Facebook page/shop-এর জন্য [PRODUCT]-এর একটি product post লিখে দাও।

Product: [PRODUCT NAME]
Price: [PRICE টাকা]
Key selling points: [৩টি main benefit]
Offer: [যদি থাকে: ছাড়, ফ্রি ডেলিভারি, combo deal]
Contact: [Inbox / WhatsApp নম্বর / Website link]
Delivery: [কোথায় deliver করা হয়]

Post format:

📦 [PRODUCT NAME]

Hook line: [একটি desire বা pain point দিয়ে শুরু]

✅ [Feature 1 + benefit]
✅ [Feature 2 + benefit]
✅ [Feature 3 + benefit]

💰 মূল্য: [PRICE টাকা] [আগের দাম যদি থাকে: ~~আগে ছিল X টাকা~~]
🚚 ডেলিভারি: [Dhaka / সারাদেশ] — [charge বা free]
📱 Order করতে: [contact info]

⚡ [Scarcity/urgency line: "Stock সীমিত" / "আজকের offer শুধু আজই"]

[৩-৫টি relevant hashtag: #বাংলাদেশ #OnlineShopping ইত্যাদি]

Additional:
- Comment reply template: যখন কেউ "price?" বা "available?" comment করে
- Story version: ১৫ word-এর মধ্যে story caption`,
  },
  {
    id: "youtube-skippable-ad",
    category: "YouTube Ads",
    title: "YouTube Skippable Ad Script",
    titleBn: "YouTube বিজ্ঞাপনের স্ক্রিপ্ট",
    price: 0,
    ai: ["ChatGPT", "Claude"],
    uses: 3780,
    rating: 4.8,
    metric: "Skip prevention · VTR boost",
    prompt: `তুমি একজন YouTube ad script writer। আমার [PRODUCT/SERVICE]-এর জন্য একটি ৩০-সেকেন্ডের skippable YouTube ad script লিখে দাও।

Product/Service: [নাম ও বর্ণনা]
Target audience: [বয়স, interest, location]
Goal: [Brand awareness / Website click / App install]
Budget mood: [High production / Simple talking head / Screen recording]

Script (৩০ সেকেন্ড = প্রায় ৭৫ শব্দ):

⏱️ 0-5 সেকেন্ড (Skip button আসার আগে — MOST IMPORTANT):
"[HOOK — এমন কিছু বলো বা দেখাও যা skip করতে মন চাইবে না]"
💡 Formula: Strong emotion / Surprising fact / Direct promise / Relatable problem

⏱️ 5-20 সেকেন্ড (Core message):
"[Product-এর সবচেয়ে compelling benefit — সংক্ষিপ্ত, visual-friendly]"
[Visual suggestion: কী দেখানো হবে screen-এ]

⏱️ 20-30 সেকেন্ড (CTA):
"[Clear action: Website-এ যান / App download করুন / এখনই order করুন]"
[On-screen text suggestion]

Also provide:
- Non-skippable bumper version (6 সেকেন্ড, 15 শব্দ)
- Thumbnail text suggestion
- Ad description (নিচে দেখায়): 100 characters`,
  },
  {
    id: "sms-whatsapp-campaign",
    category: "SMS & WhatsApp",
    title: "SMS / WhatsApp Broadcast Campaign",
    titleBn: "SMS ও WhatsApp মার্কেটিং মেসেজ",
    price: 0,
    ai: ["ChatGPT", "Gemini"],
    uses: 7890,
    rating: 4.8,
    metric: "98% open rate · Direct response",
    prompt: `তুমি একজন SMS/WhatsApp marketing expert। আমার [BUSINESS]-এর জন্য campaign messages লিখে দাও।

Business: [TYPE]
Campaign purpose: [যেমন: sale announce, new product, appointment reminder, festival offer]
Target: [Existing customers / New leads]
Offer: [OFFER details]
CTA: [Call / WhatsApp reply / Website]

দাও:

1. SMS Copy (160 characters max — carrier limit):
৩টি variation:
• Offer-focused: discount/deal সরাসরি
• Curiosity-focused: benefit hint করে
• Personal-focused: "আপনার জন্য বিশেষ"

2. WhatsApp Broadcast Message (longer, formatted):
[Greeting] 👋
[Personalized opener]
[Main offer/message — bullet points]
[Key details: price, date, validity]
[CTA: Reply "YES" / Click link / Call]
[Closing: warm, brand name]

3. WhatsApp Follow-up (যদি কেউ reply না করে, ২৪ ঘণ্টা পরে):
Short, friendly nudge — ৫০ শব্দের মধ্যে

4. Auto-reply template: যখন কেউ "interested" বা "price?" লেখে

Rules:
- বাংলায় লিখো, personal ও warm tone
- Sales pressure কম, value বেশি
- Opt-out line: "আর মেসেজ না পেতে STOP লিখুন"`,
  },
  {
    id: "email-marketing-campaign",
    category: "Email Marketing",
    title: "Email Marketing Campaign",
    titleBn: "ইমেইল মার্কেটিং ক্যাম্পেইন",
    price: 0,
    ai: ["ChatGPT", "Claude"],
    uses: 4560,
    rating: 4.8,
    metric: "Open rate + CTR optimize",
    prompt: `তুমি একজন email marketing copywriter। আমার [BUSINESS]-এর জন্য একটি complete email campaign লিখে দাও।

Business: [TYPE]
Email list: [Subscribers কারা: customers / leads / newsletter]
Campaign goal: [Product launch / Sale / Re-engagement / Newsletter]
Offer (যদি থাকে): [OFFER]

দাও:

Subject Line (৫টি option):
• Curiosity-based: প্রশ্ন বা incomplete statement
• Benefit-based: clear value proposition
• Urgency-based: time/stock limit
• Personal: "[নাম]" personalization hint বা "আপনার জন্য"
• Emoji-enhanced: একটি relevant emoji সহ

Preview Text (90 characters): subject-এর পরিপূরক

Email Body:
---
[Greeting]: [নাম] / "প্রিয় [CUSTOMER/SUBSCRIBER],"

Opening (২ বাক্য): Personal, relevant — not "I hope this email finds you well"

Main Content:
[Section 1: Hook/Problem]
[Section 2: Solution/Product]
[Section 3: Proof/Details]

CTA Button Text: ৩টি option (action-oriented, 5 words max)

Closing: warm, signed by real person name

P.S. line: (P.S. সবচেয়ে বেশি পড়া হয় — একটি bonus offer বা reminder)
---

Unsubscribe line ও footer suggestion`,
  },
  {
    id: "google-display-ad",
    category: "Google Ads",
    title: "Google Display Ad Copy",
    titleBn: "Google Display বিজ্ঞাপন",
    price: 49,
    ai: ["ChatGPT", "Gemini"],
    uses: 2890,
    rating: 4.7,
    metric: "Banner + Responsive Display",
    prompt:
      "[Premium prompt — purchase to unlock the full Google Display Ad copy pack: responsive display ad text (5 headlines + 5 descriptions), banner copy for 6 sizes, remarketing display copy, image recommendation guide, and audience targeting suggestions for Bangladesh market.]",
  },
  {
    id: "fb-ad-video-script",
    category: "Facebook Ads",
    title: "Facebook Video Ad Script",
    titleBn: "Facebook ভিডিও বিজ্ঞাপনের স্ক্রিপ্ট",
    price: 0,
    ai: ["ChatGPT", "Claude"],
    uses: 6120,
    rating: 4.9,
    metric: "Video ads = 3x more reach",
    prompt: `তুমি একজন Facebook video ad script writer। আমার [PRODUCT/SERVICE]-এর জন্য একটি ৬০-সেকেন্ডের Facebook video ad script লিখে দাও।

Product/Service: [নাম]
Video style: [Talking head / Product demo / Testimonial / Animation]
Budget: [Low / Medium / High production]
Goal: [Awareness / Conversions / App installs]

Script format:

🎬 SCENE 1 — Hook (0-3 সেকেন্ড):
[Visual]: কী দেখাবে
[Audio/Caption]: [HOOK LINE — মুখ বা text overlay]
💡 Facebook-এ ৮৫% মানুষ sound off-এ দেখে — caption MANDATORY

🎬 SCENE 2 — Problem (3-15 সেকেন্ড):
[Visual]: relatable problem situation
[Caption]: [PROBLEM STATEMENT]

🎬 SCENE 3 — Solution (15-40 সেকেন্ড):
[Visual]: product demo বা result
[Caption]: [KEY BENEFIT 1] + [KEY BENEFIT 2] + [KEY BENEFIT 3]

🎬 SCENE 4 — Social Proof (40-52 সেকেন্ড):
[Visual]: customer review / before-after / number
[Caption]: "[TESTIMONIAL SNIPPET বা STAT]"

🎬 SCENE 5 — CTA (52-60 সেকেন্ড):
[Visual]: product + contact info
[Caption]: "[OFFER] — [CTA ACTION] এখনই!"

Also provide:
- Thumbnail (static image) text overlay suggestion
- Ad copy (primary text) for this video: 100 words
- Hashtags: 3টি`,
  },
  {
    id: "whatsapp-sales-funnel",
    category: "SMS & WhatsApp",
    title: "WhatsApp Sales Conversation Script",
    titleBn: "WhatsApp সেলস কথোপকথন স্ক্রিপ্ট",
    price: 79,
    ai: ["ChatGPT", "Claude"],
    uses: 5670,
    rating: 4.9,
    metric: "DM → Sale conversion",
    prompt:
      "[Premium prompt — purchase to unlock the full WhatsApp sales script: 12-message conversation flow from first inquiry to closed sale, objection handling templates for price/trust/delivery concerns, follow-up sequences, and closing techniques optimized for Bangladeshi buyers.]",
  },
  {
    id: "email-subject-line-pack",
    category: "Email Marketing",
    title: "100 Email Subject Lines — BD Market",
    titleBn: "১০০টি Email Subject Line বাংলাদেশের জন্য",
    price: 49,
    ai: ["ChatGPT"],
    uses: 3210,
    rating: 4.8,
    metric: "40%+ open rate reported",
    prompt:
      "[Premium prompt — purchase to unlock 100 proven email subject line templates categorized by: Eid/festival campaigns, product launches, re-engagement, flash sales, newsletters, and B2B — all tested for Bangladeshi email audience open rates.]",
  },
];

const CATEGORIES: Category[] = [
  "All",
  "Facebook Ads",
  "Google Ads",
  "Daraz & E-commerce",
  "YouTube Ads",
  "SMS & WhatsApp",
  "Email Marketing",
];

const AIS: AIPlatform[] = ["ChatGPT", "Claude", "Gemini"];
const AI_FILTER = ["All AI", ...AIS] as const;
type AIFilter = (typeof AI_FILTER)[number];

const formatNumber = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K` : String(n);

const PLATFORMS = [
  { name: "Facebook Ads", icon: "📘", stat: "বাংলাদেশে ৪.৫ কোটি+ user" },
  { name: "Google Ads", icon: "🔍", stat: "Intent-based, high conversion" },
  { name: "Daraz", icon: "📦", stat: "৫ লাখ+ seller platform" },
  { name: "WhatsApp", icon: "💬", stat: "98% message open rate" },
  { name: "YouTube Ads", icon: "▶️", stat: "BD-তে দ্রুত বাড়ছে" },
  { name: "Email", icon: "📧", stat: "B2B-তে সবচেয়ে কার্যকর" },
];

const FAQS = [
  {
    q: "Facebook বিজ্ঞাপনের জন্য বাংলা না ইংরেজি কপি ভালো?",
    a: "বাংলাদেশে B2C (general consumer) target করলে বাংলায় লেখা ad-এ CTR গড়ে ৩০-৫০% বেশি হয় কারণ audience নিজের ভাষায় দ্রুত connect করে। B2B বা educated professional target হলে Banglish (বাংলা + English mix) ভালো কাজ করে। এই page-এর সব prompt বাংলায় ad লেখার জন্য optimize করা।",
  },
  {
    q: "ChatGPT দিয়ে লেখা ad কি Facebook approve করে?",
    a: "হ্যাঁ — AI দিয়ে লেখা ad Facebook reject করে না। Facebook reject করে misleading claim, adult content, বা policy violation। AI-র output review করে সত্য তথ্য নিশ্চিত করুন এবং অতিরিক্ত promise এড়িয়ে চলুন।",
  },
  {
    q: "Daraz listing-এ AI prompt কীভাবে বেশি বিক্রি বাড়ায়?",
    a: "Daraz-এর search algorithm keyword-based। AI prompt দিয়ে লেখা listing-এ সঠিক keywords, buyer-friendly language এবং feature-benefit format থাকে যা (১) search-এ ওপরে আসে, (২) buyer পড়লে trust বাড়ে, (৩) Add to Cart rate বাড়ে। আমাদের Daraz prompt ব্যবহার করে ৮০% seller ১ সপ্তাহের মধ্যে পার্থক্য দেখেছেন।",
  },
  {
    q: "WhatsApp broadcast কি spam হয়?",
    a: "WhatsApp Business app দিয়ে broadcast করলে spam হয় না কারণ শুধু যারা আপনার number save করেছেন তারাই পাবেন। তবে opt-in list তৈরি করুন (যারা message পেতে agree করেছে) এবং প্রতি message-এ unsubscribe option রাখুন — এটা trust বাড়ায়।",
  },
  {
    q: "Google Ads-এর জন্য বাংলা keyword কি কাজ করে?",
    a: "হ্যাঁ — বিশেষত local service business-এর জন্য। 'Dhaka interior design', 'AC servicing Dhaka', 'বাংলাদেশ online shop' — এই ধরনের keyword-এ CPC অনেক কম এবং intent বেশি। Google Ads-এ English ও Bangla দুটো keyword set রাখুন।",
  },
];

export default function AdCopyPrompts() {
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
        !p.metric.toLowerCase().includes(q)
      )
        return false;
      return true;
    });
  }, [selectedCategory, selectedAI, searchQuery]);

  const handleCopy = async (p: AdPrompt) => {
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
        title="Facebook Ad Copy AI Prompt বাংলা | Google Ads | BdPrompt"
        description="বাংলাদেশি ব্যবসার জন্য AI বিজ্ঞাপন লেখার prompt — Facebook Ads, Google Ads, Daraz listing, YouTube ad, WhatsApp campaign। বিনামূল্যে।"
        keywords="Facebook বিজ্ঞাপন লেখার AI prompt, Google Ads prompt বাংলা, Daraz product listing prompt, WhatsApp marketing prompt, ad copy AI Bangladesh, ChatGPT বিজ্ঞাপন"
        canonicalUrl="https://bdprompt.com/ad-copy-prompts"
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
            <Link to="/facebook-post-prompts" className="hover:text-amber-400 transition">Facebook</Link>
            <Link to="/image-generation-prompts" className="hover:text-amber-400 transition">Image AI</Link>
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
      <header className="bg-gradient-to-br from-teal-900 via-orange-900 to-teal-900 text-white">
        <div className="max-w-5xl mx-auto px-4 py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-3 py-1.5 rounded-full text-xs mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-400" />
            </span>
            <span>২৮,০০০+ বাংলাদেশি ব্যবসায়ী এই prompts দিয়ে ad লিখছেন</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-5">
            AI দিয়ে বিজ্ঞাপন লিখুন{" "}
            <span className="text-amber-400">বাংলায়</span>
          </h1>
          <p className="text-base md:text-xl text-orange-100 max-w-3xl mx-auto mb-8">
            Facebook Ads, Google Ads, Daraz listing, YouTube ad, WhatsApp campaign — সব ধরনের
            বিজ্ঞাপন ChatGPT, Claude ও Gemini দিয়ে বাংলায় লিখুন। ৩ মিনিটে professional copy।
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <a
              href="#prompts"
              className="bg-amber-400 hover:bg-amber-500 text-teal-950 font-bold px-6 py-3 rounded-lg transition"
            >
              📢 Prompts দেখুন ↓
            </a>
            <Link
              to="/playground"
              className="border-2 border-white/40 hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              Playground-এ Test করুন
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-orange-100">
            {[
              "Facebook Ads copy",
              "Google RSA",
              "Daraz listing",
              "WhatsApp broadcast",
              "YouTube ad script",
            ].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <span className="text-amber-400">✓</span>
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
            { v: "12+", l: "Ad Copy Prompts" },
            { v: "28K+", l: "Ads Written" },
            { v: "6", l: "Ad Platforms" },
            { v: "4.9★", l: "Rating" },
          ].map((s) => (
            <div key={s.l}>
              <div className="text-3xl md:text-4xl font-bold text-teal-900">{s.v}</div>
              <div className="text-sm text-gray-500 mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PLATFORM GRID */}
      <section className="max-w-6xl mx-auto px-4 pt-10">
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 mb-2">
          <p className="text-sm font-bold text-orange-900 mb-4">
            📊 সব platform-এর জন্য prompt আছে:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {PLATFORMS.map((p) => (
              <button
                key={p.name}
                onClick={() => setSelectedCategory(p.name as Category)}
                className="flex items-center gap-3 bg-white rounded-lg p-3 border border-orange-100 hover:border-orange-400 hover:shadow-sm transition text-left"
              >
                <span className="text-2xl">{p.icon}</span>
                <div>
                  <div className="font-bold text-sm text-gray-900">{p.name}</div>
                  <div className="text-xs text-gray-500">{p.stat}</div>
                </div>
              </button>
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
            placeholder="Prompt খুঁজুন... (Facebook, Daraz, WhatsApp, Google...)"
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
                    ? "bg-orange-500 text-white border-orange-500"
                    : "bg-white text-gray-700 border-gray-300 hover:border-orange-400"
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
                      <span className="text-xs font-semibold bg-orange-50 text-orange-900 px-2 py-0.5 rounded">
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
                  <p className="text-xs text-orange-600 font-medium mb-3">{p.metric}</p>

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

      {/* FAQ */}
      <section className="bg-orange-50 py-16">
        <div className="max-w-3xl mx-auto px-4">
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
        </div>
      </section>

      {/* CROSS-LINKS */}
      <section className="bg-white border-t border-gray-100 py-10">
        <div className="max-w-5xl mx-auto px-4">
          <h3 className="text-lg font-bold text-gray-800 mb-5 text-center">আরও Prompt দেখুন</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "📱 Facebook Post", href: "/facebook-post-prompts" },
              { label: "🎬 YouTube Script", href: "/youtube-script-prompts" },
              { label: "🖼️ Image Generation", href: "/image-generation-prompts" },
              { label: "🎓 SSC Exam", href: "/ssc-exam-prompts" },
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
      <section className="bg-gradient-to-br from-teal-900 via-orange-900 to-teal-900 text-white">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-5">
            আজই আপনার পরবর্তী{" "}
            <span className="text-amber-400">বিজ্ঞাপন</span> লিখুন AI দিয়ে
          </h2>
          <p className="text-orange-100 max-w-2xl mx-auto mb-8">
            Prompt copy করুন → ChatGPT-তে paste করুন → ৩ মিনিটে professional বাংলা ad copy।
            কোনো copywriter ভাড়া করার দরকার নেই।
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#prompts"
              className="bg-amber-400 hover:bg-amber-500 text-teal-950 font-bold px-6 py-3 rounded-lg transition"
            >
              📋 Prompt Copy করুন
            </a>
            <Link
              to="/packs"
              className="border-2 border-white/40 hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              Premium Ad Pack →
            </Link>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-teal-950 text-teal-200 text-sm">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-2 justify-between items-center">
          <p>© {new Date().getFullYear()} BdPrompt by Start BD — বাংলা Free AI Prompt Generator</p>
          <p>Made with 💚 in Bangladesh</p>
        </div>
      </footer>
    </div>
  );
}
