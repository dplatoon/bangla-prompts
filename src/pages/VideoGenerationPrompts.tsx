import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";

type AITool = "Sora" | "Runway" | "Pika" | "CapCut AI" | "Kling" | "Luma";

type Category =
  | "All"
  | "Cinematic Shot"
  | "Product Video"
  | "Social Media Reel"
  | "Animation & Motion"
  | "YouTube Intro"
  | "Music Video";

interface VideoPrompt {
  id: string;
  category: Exclude<Category, "All">;
  title: string;
  titleBn: string;
  price: number;
  ai: AITool[];
  uses: number;
  rating: number;
  duration: string; // suggested clip length
  prompt: string;
}

const PROMPTS: VideoPrompt[] = [
  {
    id: "cinematic-dhaka",
    category: "Cinematic Shot",
    title: "Cinematic Dhaka City Shot",
    titleBn: "সিনেমাটিক ঢাকা শহর ভিডিও",
    price: 0,
    ai: ["Runway", "Sora", "Luma"],
    uses: 5670,
    rating: 4.9,
    duration: "5–10 sec",
    prompt: `Cinematic aerial drone shot slowly descending over a dense, vibrant cityscape at golden hour. The city is inspired by Dhaka, Bangladesh — thousands of colorful rickshaws and CNGs weaving through narrow streets lined with banyan trees, bustling markets with hanging garments, and modern glass towers rising in the background. Warm amber and orange light reflecting off rooftops and the winding river beyond. Cinematic color grade, anamorphic lens flare, 4K, film grain, slow motion 60fps.

Camera: Slow downward crane shot, slight rotation
Mood: Epic, warm, alive
Style: National Geographic documentary meets Bollywood opening sequence
Lighting: Golden hour — sun at 15 degrees, deep shadows
Duration: 8 seconds`,
  },
  {
    id: "product-hero-video",
    category: "Product Video",
    title: "Product Hero Shot — 360° Reveal",
    titleBn: "প্রোডাক্ট হিরো ভিডিও (৩৬০° reveal)",
    price: 0,
    ai: ["Runway", "Pika", "Kling"],
    uses: 7230,
    rating: 4.9,
    duration: "5–8 sec",
    prompt: `A premium [PRODUCT, e.g. leather wallet / perfume bottle / smartphone] slowly rotating 360 degrees on a sleek black reflective surface. Studio lighting with three rim lights creating a halo effect. Cinematic macro close-up revealing intricate textures and material quality. Subtle particle dust floating in the light beams. Deep black background gradually reveals a soft gradient. Product catches light dramatically as it turns. Logo or brand name fades in at the end.

Camera: Locked shot, product rotates
Lighting: High-key studio, rim lights, one colored accent light ([BRAND COLOR])
Style: Luxury product commercial — Apple / Louis Vuitton quality
Speed: Slow, deliberate — 1 full rotation in 6 seconds
Effects: Subtle light rays, bokeh background
Resolution: 4K, 60fps

💡 Runway Gen-3-এ সবচেয়ে ভালো result পাওয়া যায় এই ধরনের product shot-এ।`,
  },
  {
    id: "reel-food-video",
    category: "Social Media Reel",
    title: "Food Reel — Restaurant / Home Cook",
    titleBn: "ফুড রিল ভিডিও (রেস্তোরাঁ / ঘরের রান্না)",
    price: 0,
    ai: ["Pika", "Runway", "CapCut AI"],
    uses: 9140,
    rating: 4.9,
    duration: "3–6 sec",
    prompt: `Close-up slow-motion video of [FOOD ITEM, e.g. biryani being scooped / hilsa fish frying in mustard oil / fresh rasgolla being squeezed]. Steam rises dramatically as food is plated. Warm golden kitchen light, shallow depth of field. Droplets of oil or sauce fall in extreme slow motion (120fps). Rich, saturated food colors — deep saffron, caramelized browns, vibrant greens. The camera gently pushes in as the dish is revealed.

Camera: Extreme close-up macro, slow push-in
Lighting: Warm practical kitchen lighting + one soft fill light
Mood: Indulgent, appetite-triggering, ASMR-adjacent
Style: Tastemade / Bon Appétit food film
Speed: 120fps slow motion for the hero moment, normal speed for plating
Aspect ratio: 9:16 (Instagram/Facebook Reel, TikTok)
Duration: 5 seconds

Variation for Eid: Steaming korma being poured over white rice, surrounded by rose petals`,
  },
  {
    id: "fashion-reel-bd",
    category: "Social Media Reel",
    title: "Fashion Reel — BD Clothing Brand",
    titleBn: "ফ্যাশন রিল — বাংলাদেশি পোশাক",
    price: 0,
    ai: ["Runway", "Kling", "Pika"],
    uses: 6890,
    rating: 4.8,
    duration: "6–10 sec",
    prompt: `Stylish fashion reel of a [GENDER] model wearing [OUTFIT, e.g. modern panjabi in deep teal / printed saree with contemporary blouse] walking confidently through [LOCATION, e.g. old Dhaka's terracotta brick alley / rooftop garden in Gulshan]. Camera tracks alongside in smooth gimbal motion. Wind gently moves fabric. End frame: model turns to camera with a natural smile, outfit fully visible.

Camera: Tracking shot, smooth gimbal, slight Dutch angle on final frame
Lighting: Natural diffused daylight, golden reflector
Mood: Confident, aspirational, culturally rooted
Color grade: Warm film look — lifted shadows, teal & orange complementary
Transitions: Quick match cut between 2 looks
Aspect ratio: 9:16 (Reel) or 4:5 (Instagram Feed)
Duration: 8 seconds

Music sync note: Cut on beat drop — prompt CapCut AI to sync to audio`,
  },
  {
    id: "logo-animation-intro",
    category: "YouTube Intro",
    title: "YouTube Channel Logo Intro",
    titleBn: "YouTube চ্যানেল লোগো ইন্ট্রো",
    price: 0,
    ai: ["Pika", "Runway", "CapCut AI"],
    uses: 8430,
    rating: 4.8,
    duration: "3–5 sec",
    prompt: `Dynamic YouTube channel intro animation. [CHANNEL NAME] logo assembles from glowing particles that swirl and converge from all directions. Background: dark space or gradient [BRAND COLOR] to [SECONDARY COLOR]. Logo materializes with a bright flash and subtle shockwave ripple. Channel tagline fades in below logo. Cinematic sound design implied.

Style options (choose one):
A — Tech/Gaming: Electric blue particles, neon glow, digital glitch effect, dark background
B — Lifestyle/Vlog: Warm golden particles, bokeh bubbles, soft fade, cream background
C — Educational: Clean white particles on navy, geometric shapes, professional
D — Bangla/Cultural: Deep red and green particles (BD flag colors), traditional motif elements

Camera: Static, logo centered, particles come from frame edges
Duration: 4 seconds
Resolution: 1920x1080 (YouTube standard) or 1080x1080 (square)
Output: Loop-able for use as channel watermark

💡 CapCut AI-তে "Text to Video" feature ব্যবহার করে এই prompt দিলে সরাসরি intro তৈরি হবে।`,
  },
  {
    id: "nature-bd-landscape",
    category: "Cinematic Shot",
    title: "Bangladesh Nature — Cinematic B-Roll",
    titleBn: "বাংলাদেশের প্রকৃতি — সিনেমাটিক B-Roll",
    price: 0,
    ai: ["Sora", "Luma", "Runway"],
    uses: 4560,
    rating: 4.8,
    duration: "5–10 sec",
    prompt: `Breathtaking cinematic B-roll of [LOCATION, choose one]:

Option A — Sundarban:
Dense green mangrove forest reflected perfectly in still dark water. A small wooden boat drifts silently. Early morning mist. A kingfisher dives. Camera: Ultra-slow push through canopy.

Option B — Padma River:
Golden hour on a massive river — sunset colors exploding across water, silhouettes of fishermen casting nets from wooden boats. Camera: Wide angle to telephoto compression, 200mm zoom pull.

Option C — Tea Garden, Sylhet:
Rolling green hills of tea plantation, rows of low tea bushes stretching to horizon. A worker in colorful sari moves between rows. Drone overhead shot slowly rising to reveal full garden scale. Soft morning haze.

Option D — Cox's Bazar:
Longest natural sea beach at sunset, waves crashing in slow motion, couple walking as silhouettes. Aerial shot pulling back to reveal beach's full length.

Style: BBC Planet Earth quality, cinematic color grade
Camera movement: Smooth, deliberate, awe-inspiring
Duration: 8 seconds each`,
  },
  {
    id: "animation-explainer",
    category: "Animation & Motion",
    title: "2D Animated Explainer Clip",
    titleBn: "2D অ্যানিমেটেড এক্সপ্লেইনার ক্লিপ",
    price: 0,
    ai: ["Pika", "CapCut AI", "Runway"],
    uses: 3780,
    rating: 4.7,
    duration: "5–15 sec",
    prompt: `2D flat animation style explainer video clip showing [CONCEPT, e.g. "how mobile banking works in Bangladesh" / "steps to start a small business" / "how AI helps students study"]. Clean, modern flat design aesthetic with bold colors. Simple character — gender-neutral, South Asian features — performing the action. Key elements appear with smooth pop-in animation. Text labels in Bengali appear alongside visuals.

Animation style: Google Material Design meets WhiteBoard animation
Character: Flat vector, simple shapes, expressive
Color palette: [BRAND COLORS or suggest: Teal + Amber for BD feel]
Background: Clean white or soft gradient
Text: Bangla labels with clean sans-serif font
Motion: Smooth easing, no jarring cuts
Duration: 10 seconds (loop-able)

Scene breakdown (for 10 sec):
0-2s: Problem icon appears with sad expression
2-5s: Solution introduced with transformation animation
5-8s: Key benefit shown with check marks
8-10s: Logo/CTA appears

💡 CapCut AI-এর "AI Video Generator"-এ এই prompt paste করুন।`,
  },
  {
    id: "music-video-bd",
    category: "Music Video",
    title: "Bengali Music Video — Artistic Shot",
    titleBn: "বাংলা মিউজিক ভিডিও — আর্টিস্টিক শট",
    price: 0,
    ai: ["Runway", "Sora", "Kling"],
    uses: 5120,
    rating: 4.8,
    duration: "5–10 sec",
    prompt: `Cinematic music video shot for a Bengali [GENRE: folk / modern pop / Rabindra Sangeet] song. [SINGER DESCRIPTION, e.g. young male artist in white kurta] performing in [SETTING, e.g. open green field at sunset / traditional clay-walled village home / misty riverbank].

Visual poetry: camera drifts slowly around the artist, fabric and hair move in slow wind, warm golden light. Cut to wide establishing shot showing the full landscape. Emotional, evocative, rooted in Bengal's visual identity.

Camera techniques:
- Slow-motion close-up of expressive eyes and hands (120fps)
- Wide angle showing artist small against vast landscape
- Gentle orbit shot around subject
- Match cut: closeup hand → wide landscape

Color grade: Rich, filmic — warm highlights, cool shadows, lifted blacks
Mood: [Choose: Nostalgic / Romantic / Melancholic / Celebratory]
Reference: Inspired by Coke Studio Bangla visual style
Duration: 8 seconds
Aspect ratio: 16:9 (YouTube) or 9:16 (Reel version)`,
  },
  {
    id: "ecommerce-product-reel",
    category: "Product Video",
    title: "E-commerce Product Reel — Daraz / Facebook",
    titleBn: "ই-কমার্স প্রোডাক্ট রিল",
    price: 49,
    ai: ["Runway", "Pika", "Kling"],
    uses: 6340,
    rating: 4.9,
    duration: "8–15 sec",
    prompt:
      "[Premium prompt — purchase to unlock the full e-commerce product reel template: unboxing reveal shot, lifestyle usage shot, feature callout animation, price reveal motion graphic, and CTA end card — all in one 15-second prompt sequence optimized for Daraz, Facebook Shop, and Instagram Shopping.]",
  },
  {
    id: "talking-head-ai",
    category: "YouTube Intro",
    title: "AI Talking Head — Faceless Channel",
    titleBn: "AI Talking Head ভিডিও (Faceless Channel)",
    price: 0,
    ai: ["Runway", "Pika"],
    uses: 7890,
    rating: 4.8,
    duration: "10–30 sec",
    prompt: `Photorealistic AI-generated talking head presenter for a faceless YouTube channel. The presenter is a [DESCRIPTION, e.g. professional South Asian man in his 30s, wearing a navy blue collared shirt, neutral expression, friendly and trustworthy appearance]. Positioned center-frame against a clean [BACKGROUND: blurred modern office / gradient background / YouTube-style colored backdrop].

Lips sync naturally to voiceover. Head makes slight natural micro-movements — subtle nod, occasional blink. Professional news anchor posture.

Lighting: Softbox-style, even face lighting, slight key light from left
Background: Slightly blurred, depth of field
Camera: Medium close-up, chest to top of head
Stability: Perfectly stable, no camera movement
Duration: Can loop for extended use with voiceover

Tool-specific notes:
• Runway Gen-3: Use "Extend" to loop
• Pika: Use "Lip sync" feature with uploaded audio
• HeyGen (not AI video but best for talking head): Use avatar creation

⚠️ বাংলা voiceover সহ use করতে: ElevenLabs বা Murf.ai-তে বাংলা TTS generate করো।`,
  },
  {
    id: "capcut-transition-reel",
    category: "Social Media Reel",
    title: "CapCut AI Viral Transition Reel",
    titleBn: "CapCut AI ভাইরাল ট্রানজিশন রিল",
    price: 0,
    ai: ["CapCut AI"],
    uses: 12340,
    rating: 4.9,
    duration: "15–30 sec",
    prompt: `CapCut AI দিয়ে viral transition reel বানানোর জন্য এই prompt ব্যবহার করো:

CapCut AI Text Prompt:
"Create a smooth transition reel with [NUMBER] outfit/location changes. Each clip: 2 seconds. Transitions: [STYLE — whip pan / zoom in-out / spin / light flash]. Music sync: cut on beat. Color grade: [Moody cinematic / Bright summer / Dark dramatic]. Add text overlay: [CHANNEL NAME] at end."

Step-by-step CapCut-এ use করার পদ্ধতি:
১. CapCut খোলো → "AI Video" বা "Script to Video" select করো
২. এই prompt paste করো (English-এ)
৩. তোমার ক্লিপ বা ছবি upload করো
৪. AI automatically transitions ও timing set করবে
৫. Music library থেকে trending audio যোগ করো
৬. Export: 1080p, 30fps (Reel) বা 4K (YouTube)

Popular transition styles for BD content:
• Outfit change: পুরনো পোশাক → নতুন পোশাক (hand cover transition)
• Location reveal: Indoor → dramatic outdoor (zoom transition)
• Product before/after: Problem → solution (split screen)
• Food reveal: Ingredients → finished dish (whip pan)

💡 CapCut-এ "Auto Captions" চালু করো — Bengali captions automatic আসবে।`,
  },
  {
    id: "sora-viral-abstract",
    category: "Animation & Motion",
    title: "Abstract / Artistic Motion — Sora",
    titleBn: "অ্যাবস্ট্র্যাক্ট মোশন আর্ট",
    price: 79,
    ai: ["Sora", "Runway", "Luma"],
    uses: 3450,
    rating: 4.8,
    duration: "5–10 sec",
    prompt:
      "[Premium prompt — purchase to unlock 8 abstract motion art prompts: flowing liquid metal, particle galaxy formation, organic cell growth, geometric morphing, Bengali calligraphy coming alive, Bengali flag wave in wind, monsoon rain macro, and Eid light bokeh burst — all optimized for Sora, Runway, and Luma Dream Machine.]",
  },
];

const CATEGORIES: Category[] = [
  "All",
  "Cinematic Shot",
  "Product Video",
  "Social Media Reel",
  "Animation & Motion",
  "YouTube Intro",
  "Music Video",
];

const AI_TOOLS: AITool[] = ["Sora", "Runway", "Pika", "CapCut AI", "Kling", "Luma"];
const AI_FILTER = ["All AI", ...AI_TOOLS] as const;
type AIFilter = (typeof AI_FILTER)[number];

const formatNumber = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K` : String(n);

const TOOL_GUIDE = [
  { name: "Sora", badge: "OpenAI", free: false, price: "ChatGPT Pro", best: "Long-form, realistic scenes", icon: "🎬" },
  { name: "Runway Gen-3", badge: "Runway", free: false, price: "$15/mo", best: "Cinematic quality, best overall", icon: "🎥" },
  { name: "Pika 2.0", badge: "Pika Labs", free: true, price: "Free tier", best: "Quick clips, product shots", icon: "⚡" },
  { name: "CapCut AI", badge: "ByteDance", free: true, price: "Free", best: "Reels, transitions, captions", icon: "✂️" },
  { name: "Kling AI", badge: "Kuaishou", free: true, price: "Free tier", best: "Fashion, character motion", icon: "🌟" },
  { name: "Luma Dream Machine", badge: "Luma AI", free: true, price: "Free tier", best: "Nature, fluid motion", icon: "💫" },
];

const FAQS = [
  {
    q: "Sora কি বাংলাদেশ থেকে ব্যবহার করা যায়?",
    a: "হ্যাঁ — ChatGPT Pro subscription ($20/mo) থাকলে Sora ব্যবহার করা যায়। তবে বাংলাদেশ থেকে payment-এর জন্য আন্তর্জাতিক credit card বা PayPal লাগে। বিনামূল্যে বিকল্প: Pika 2.0, CapCut AI, Kling AI, এবং Luma Dream Machine-এ free tier আছে।",
  },
  {
    q: "AI video prompt কি বাংলায় লেখা যায়?",
    a: "বেশিরভাগ AI video tool — Runway, Sora, Pika — ইংরেজি prompt-এ সবচেয়ে ভালো কাজ করে কারণ তাদের training data ইংরেজিতে। তবে CapCut AI-এ বাংলা দিয়েও কিছু কাজ হয়। এই page-এর সব prompt ইংরেজিতে লেখা কিন্তু বাংলা instructions সহ — copy করে সরাসরি use করুন।",
  },
  {
    q: "Facebook Reel-এর জন্য কোন AI video tool সবচেয়ে ভালো?",
    a: "CapCut AI — সম্পূর্ণ বিনামূল্যে, 9:16 reel format support করে, auto-caption ও trending audio আছে। Pika 2.0 — short cinematic clip-এর জন্য ভালো। Kling AI — fashion ও lifestyle content-এর জন্য। তিনটিই বাংলাদেশ থেকে browser-এ use করা যায়।",
  },
  {
    q: "AI video তৈরিতে কত সময় লাগে?",
    a: "Pika ও Kling-এ ৩০-৯০ সেকেন্ড। Runway Gen-3-এ ৬০-১২০ সেকেন্ড। Sora-তে ২-৫ মিনিট (complex scene)। CapCut AI-তে সম্পূর্ণ reel তৈরিতে ৫-১০ মিনিট। Prompt যত detailed হবে, result তত ভালো হবে — কিন্তু সময় একটু বেশি লাগতে পারে।",
  },
  {
    q: "AI video কি commercial ব্যবহার করা যায়?",
    a: "নির্ভর করে tool-এর license-এ। Runway, Pika ও CapCut AI-এর paid plan-এ commercial use allowed। Free tier-এ সাধারণত personal use only। Sora-তে ChatGPT Pro subscribers commercial use করতে পারেন। যেকোনো commercial project-এর আগে tool-এর Terms of Service পড়ুন।",
  },
];

export default function VideoGenerationPrompts() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [selectedAI, setSelectedAI] = useState<AIFilter>("All AI");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return PROMPTS.filter((p) => {
      if (selectedCategory !== "All" && p.category !== selectedCategory) return false;
      if (selectedAI !== "All AI" && !p.ai.includes(selectedAI as AITool)) return false;
      if (
        q &&
        !p.title.toLowerCase().includes(q) &&
        !p.titleBn.toLowerCase().includes(q) &&
        !p.category.toLowerCase().includes(q) &&
        !p.duration.toLowerCase().includes(q)
      )
        return false;
      return true;
    });
  }, [selectedCategory, selectedAI, searchQuery]);

  const handleCopy = async (p: VideoPrompt) => {
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
        title="AI Video Generation Prompt বাংলা | Sora, Runway | BdPrompt"
        description="Sora, Runway, Pika, CapCut AI, Kling-এর জন্য বাংলা video generation prompt — cinematic shot, product reel, social media, music video, YouTube intro। বিনামূল্যে।"
        keywords="AI video generation prompt, Sora prompt বাংলা, Runway prompt, Pika video prompt, CapCut AI prompt বাংলা, video AI Bangladesh, AI video maker Bangla"
        canonicalUrl="https://bdprompt.com/video-generation-prompts"
        ogImage="https://bdprompt.com/og-image.png"
        ogType="website"
      />

      {/* NAV */}
      <nav className="bg-teal-900 text-white">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">BdPrompt</span>
            <span className="text-[10px] font-semibold bg-amber-400 text-teal-950 px-1.5 py-0.5 rounded">BETA</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <Link to="/explore" className="hover:text-amber-400 transition">Explore</Link>
            <Link to="/youtube-script-prompts" className="hover:text-amber-400 transition">YouTube</Link>
            <Link to="/image-generation-prompts" className="hover:text-amber-400 transition">Image AI</Link>
            <Link to="/packs" className="hover:text-amber-400 transition">Packs</Link>
          </div>
          <Link to="/auth" className="bg-amber-400 hover:bg-amber-500 text-teal-950 font-semibold text-sm px-4 py-2 rounded-lg transition">
            বিনামূল্যে শুরু করুন
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <header className="bg-gradient-to-br from-teal-900 via-purple-900 to-teal-900 text-white">
        <div className="max-w-5xl mx-auto px-4 py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-3 py-1.5 rounded-full text-xs mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-400" />
            </span>
            <span>১৭,০০০+ বাংলাদেশি creator এই prompts দিয়ে AI video বানাচ্ছেন</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-5">
            AI Video Generation-এর{" "}
            <span className="text-amber-400">বাংলা Prompt</span>
          </h1>
          <p className="text-base md:text-xl text-purple-100 max-w-3xl mx-auto mb-8">
            Sora, Runway, Pika, CapCut AI, Kling ও Luma-র জন্য ready-made prompt — cinematic shot,
            product reel, social media, music video, YouTube intro। সম্পূর্ণ বাংলা guide সহ।
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <a href="#prompts" className="bg-amber-400 hover:bg-amber-500 text-teal-950 font-bold px-6 py-3 rounded-lg transition">
              🎬 Prompts দেখুন ↓
            </a>
            <a href="#tools" className="border-2 border-white/40 hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-lg transition">
              কোন Tool ব্যবহার করবো?
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-purple-100">
            {["Sora", "Runway Gen-3", "Pika 2.0", "CapCut AI", "Kling AI", "Luma Dream Machine"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <span className="text-amber-400">✓</span>{t}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* STATS */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { v: "12+", l: "Video Prompts" },
            { v: "17K+", l: "Videos Created" },
            { v: "6", l: "AI Video Tools" },
            { v: "4.9★", l: "Rating" },
          ].map((s) => (
            <div key={s.l}>
              <div className="text-3xl md:text-4xl font-bold text-teal-900">{s.v}</div>
              <div className="text-sm text-gray-500 mt-1">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* TOOL GUIDE */}
      <section id="tools" className="max-w-6xl mx-auto px-4 pt-10">
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-5 mb-2">
          <p className="text-sm font-bold text-purple-900 mb-4">🛠️ কোন AI video tool কীসের জন্য ভালো:</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {TOOL_GUIDE.map((t) => (
              <div key={t.name} className="bg-white rounded-lg p-3 border border-purple-100">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-sm text-gray-900">{t.icon} {t.name}</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${t.free ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}`}>
                    {t.price}
                  </span>
                </div>
                <p className="text-xs text-gray-500">{t.best}</p>
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
            placeholder="Prompt খুঁজুন... (cinematic, reel, product, music video...)"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-teal-700 bg-white"
          />
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-3">
          {CATEGORIES.map((c) => {
            const active = selectedCategory === c;
            return (
              <button key={c} onClick={() => setSelectedCategory(c)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition border ${active ? "bg-teal-900 text-white border-teal-900" : "bg-white text-gray-700 border-gray-300 hover:border-teal-700"}`}>
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
              <button key={a} onClick={() => setSelectedAI(a)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition border ${active ? "bg-purple-600 text-white border-purple-600" : "bg-white text-gray-700 border-gray-300 hover:border-purple-400"}`}>
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
                <article key={p.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition p-5 flex flex-col">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs font-semibold bg-purple-50 text-purple-900 px-2 py-0.5 rounded">{p.category}</span>
                      {p.price === 0 ? (
                        <span className="text-xs font-semibold bg-green-100 text-green-800 px-2 py-0.5 rounded">Free</span>
                      ) : (
                        <span className="text-xs font-semibold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">৳{p.price}</span>
                      )}
                      <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-0.5 rounded">⏱ {p.duration}</span>
                    </div>
                    <div className="text-xs text-gray-500 text-right shrink-0">
                      <div>⭐ {p.rating}</div>
                      <div>{formatNumber(p.uses)} uses</div>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-gray-900 leading-snug">{p.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{p.titleBn}</p>

                  {/* AI chips */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {p.ai.map((a) => (
                      <span key={a} className="text-[11px] font-medium bg-purple-50 text-purple-800 px-2 py-0.5 rounded border border-purple-100">{a}</span>
                    ))}
                  </div>

                  {/* Prompt preview */}
                  <div className="relative mb-1">
                    <pre className={`bg-gray-900 text-gray-100 text-xs font-mono p-3 rounded-lg whitespace-pre-wrap overflow-hidden ${expanded ? "" : "max-h-32"}`}>
                      {p.prompt}
                    </pre>
                    {!expanded && (
                      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-gray-900 to-transparent rounded-b-lg pointer-events-none" />
                    )}
                  </div>
                  <button onClick={() => setExpandedId(expanded ? null : p.id)} className="mb-4 text-xs text-teal-800 font-semibold hover:underline text-left">
                    {expanded ? "সংক্ষেপে দেখুন ▲" : "পুরো prompt দেখুন ▼"}
                  </button>

                  {/* Actions */}
                  <div className="mt-auto flex gap-2">
                    <button
                      onClick={() => handleCopy(p)}
                      disabled={p.price > 0}
                      className={`flex-1 font-semibold text-sm py-2.5 rounded-lg transition ${p.price > 0 ? "bg-gray-100 text-gray-400 cursor-not-allowed" : copied ? "bg-green-600 text-white" : "bg-teal-900 hover:bg-teal-800 text-white"}`}>
                      {p.price > 0 ? "🔒 Premium" : copied ? "✅ Copied!" : "📋 Copy Prompt"}
                    </button>
                    <Link to="/playground" className="border border-teal-900 text-teal-900 hover:bg-teal-50 font-semibold text-sm px-4 py-2.5 rounded-lg transition">
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
          <h2 className="text-3xl md:text-4xl font-bold text-center text-teal-900 mb-12">কীভাবে ব্যবহার করবেন?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {[
              { n: "১", t: "Prompt Copy করুন", d: "Category ও AI tool অনুযায়ী filter করে prompt copy করুন।" },
              { n: "২", t: "[BRACKETS] Fill করুন", d: "[PRODUCT], [LOCATION] — এই অংশগুলো আপনার তথ্য দিয়ে replace করুন।" },
              { n: "৩", t: "AI Tool-এ Paste করুন", d: "Runway / Pika / CapCut AI খুলুন → Text prompt box-এ paste করুন।" },
              { n: "৪", t: "Generate & Download", d: "Generate ক্লিক করুন → ৩০-৯০ সেকেন্ডে ভিডিও তৈরি → Download করুন।" },
            ].map((s) => (
              <div key={s.n} className="bg-white rounded-xl p-6 shadow-sm text-center">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-amber-400 text-teal-950 font-bold text-xl flex items-center justify-center">{s.n}</div>
                <h3 className="font-bold text-base text-gray-900 mb-2">{s.t}</h3>
                <p className="text-sm text-gray-600">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-teal-900 mb-10">সাধারণ প্রশ্ন</h2>
        <div className="space-y-3">
          {FAQS.map((f) => (
            <details key={f.q} className="group bg-white rounded-lg shadow-sm p-4 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex justify-between items-center cursor-pointer font-semibold text-gray-900">
                {f.q}
                <span className="text-teal-700 group-open:rotate-180 transition shrink-0 ml-2">▼</span>
              </summary>
              <p className="mt-3 text-gray-600 text-sm leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      </section>

      {/* CROSS-LINKS */}
      <section className="bg-white border-t border-gray-100 py-10">
        <div className="max-w-5xl mx-auto px-4">
          <h3 className="text-lg font-bold text-gray-800 mb-5 text-center">আরও Prompt দেখুন</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "🖼️ Image Generation", href: "/image-generation-prompts" },
              { label: "🎬 YouTube Script", href: "/youtube-script-prompts" },
              { label: "📱 Facebook Post", href: "/facebook-post-prompts" },
              { label: "📢 Ad Copy", href: "/ad-copy-prompts" },
            ].map((link) => (
              <Link key={link.href} to={link.href} className="text-center border border-gray-200 rounded-lg py-3 px-4 text-sm font-medium text-gray-700 hover:border-teal-500 hover:text-teal-800 transition">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-teal-900 via-purple-900 to-teal-900 text-white">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-5">
            আজই আপনার প্রথম{" "}
            <span className="text-amber-400">AI Video</span> তৈরি করুন
          </h2>
          <p className="text-purple-100 max-w-2xl mx-auto mb-8">
            Prompt copy করুন → Runway বা Pika-তে paste করুন → ৬০ সেকেন্ডে professional video তৈরি।
            CapCut AI দিয়ে সম্পূর্ণ বিনামূল্যে।
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href="#prompts" className="bg-amber-400 hover:bg-amber-500 text-teal-950 font-bold px-6 py-3 rounded-lg transition">
              🎬 Prompt Copy করুন
            </a>
            <Link to="/image-generation-prompts" className="border-2 border-white/40 hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-lg transition">
              Image Prompts →
            </Link>
            <Link to="/packs" className="bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-lg transition">
              Premium Packs →
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
