import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { SEOHead } from "@/components/SEOHead";

type AIPlatform = "ChatGPT" | "Claude" | "Gemini";

interface YTPrompt {
  id: string;
  category: "Tech" | "Education" | "Vlog" | "Faceless" | "Marketing" | "News";
  title: string;
  titleBn: string;
  price: number; // 0 = free, BDT otherwise
  ai: AIPlatform[];
  uses: number;
  rating: number;
  prompt: string;
}

const PROMPTS: YTPrompt[] = [
  {
    id: "tech-review",
    category: "Tech",
    title: "Viral Tech Review Script",
    titleBn: "ভাইরাল টেক রিভিউ স্ক্রিপ্ট",
    price: 0,
    ai: ["ChatGPT", "Claude"],
    uses: 2340,
    rating: 4.9,
    prompt:
      "তুমি একজন অভিজ্ঞ বাংলাদেশি tech YouTuber। আমাকে [PRODUCT NAME]-এর জন্য একটি ৮-১০ মিনিটের viral YouTube review script লিখে দাও।\n\nStructure:\n1. Hook (০-১৫ সেকেন্ড): এমন একটি bold statement বা প্রশ্ন দিয়ে শুরু করো যা viewer-কে scroll করা থেকে আটকাবে\n2. Intro (১৫-৩০ সেকেন্ড): আজকে কী দেখানো হবে এবং কেন এটা important\n3. Unboxing / First Impression (১-২ মিনিট)\n4. Key Features [FEATURE 1], [FEATURE 2], [FEATURE 3] — pros ও cons সহ\n5. Real-life use case বাংলাদেশি context-এ\n6. Price বনাম alternative comparison\n7. Final verdict + CTA (subscribe, comment, like)\n\nটোন: বন্ধুসুলভ, honest, একটু humor সহ। বাংলা + English mix (Banglish নয়, proper Bangla)।",
  },
  {
    id: "edu-explainer",
    category: "Education",
    title: "Educational Explainer Script",
    titleBn: "শিক্ষামূলক এক্সপ্লেইনার স্ক্রিপ্ট",
    price: 0,
    ai: ["ChatGPT", "Gemini"],
    uses: 1890,
    rating: 4.8,
    prompt:
      "তুমি একজন বাংলা educational YouTuber। আমাকে [TOPIC]-এর উপর একটি ৫-৭ মিনিটের explainer video script লিখে দাও যা [TARGET AUDIENCE, যেমন: SSC/HSC students]-এর জন্য।\n\nStructure:\n1. Hook: একটি real-life problem বা প্রশ্ন\n2. Why this matters — bullet points\n3. Core concept — ছোট ছোট ৩-৪ টি section, প্রতিটি analogy সহ\n4. Common mistakes / misconceptions\n5. Quick recap (৩০ সেকেন্ড)\n6. Action step + CTA\n\nব্যবহার করো: simple বাংলা, daily life analogy, এবং প্রতিটি section-এর শেষে একটি pattern interrupt (visual cue / question)।",
  },
  {
    id: "vlog-story",
    category: "Vlog",
    title: "Vlog Story Script",
    titleBn: "ভ্লগ স্টোরি স্ক্রিপ্ট",
    price: 0,
    ai: ["ChatGPT", "Claude"],
    uses: 1650,
    rating: 4.8,
    prompt:
      "আমি একজন বাংলাদেশি vlogger। [LOCATION / EVENT]-এ আজকের দিনের জন্য একটি ৭-৮ মিনিটের storytelling vlog script লিখে দাও।\n\nStructure:\n1. Cold open — দিনের সবচেয়ে interesting মুহূর্তের ১০ সেকেন্ড teaser\n2. Intro — আজকে কোথায় যাচ্ছি, কেন\n3. Three story beats — beginning, middle, twist\n4. Emotional moment — viewer-এর সাথে personally connect\n5. Reflection — আজ কী শিখলাম\n6. Outro + CTA\n\nটোন: conversational, honest, একটু vulnerable। প্রতিটি scene-এ B-roll suggestion যোগ করো [B-ROLL: ...] format-এ।",
  },
  {
    id: "faceless-channel",
    category: "Faceless",
    title: "Faceless Channel Script",
    titleBn: "ফেসলেস চ্যানেল স্ক্রিপ্ট",
    price: 49,
    ai: ["ChatGPT"],
    uses: 3100,
    rating: 4.9,
    prompt:
      "[Premium prompt — purchase to unlock the full faceless channel script template with voice-over pacing, visual cue map, retention hooks every 30 seconds, and monetization-friendly structure.]",
  },
  {
    id: "product-review-affiliate",
    category: "Marketing",
    title: "Product Review Script (Affiliate)",
    titleBn: "প্রোডাক্ট রিভিউ স্ক্রিপ্ট (অ্যাফিলিয়েট)",
    price: 79,
    ai: ["ChatGPT", "Claude", "Gemini"],
    uses: 2780,
    rating: 4.9,
    prompt:
      "[Premium prompt — purchase to unlock the affiliate review template with FTC-safe disclosure, conversion-optimized CTA placement, comparison table generator, and link-stacking framework.]",
  },
  {
    id: "news-commentary",
    category: "News",
    title: "Trending News Commentary",
    titleBn: "ট্রেন্ডিং নিউজ কমেন্টারি",
    price: 0,
    ai: ["ChatGPT", "Gemini"],
    uses: 1420,
    rating: 4.7,
    prompt:
      "তুমি একজন বাংলাদেশি news commentary YouTuber। [NEWS TOPIC]-এর উপর একটি ৪-৬ মিনিটের balanced commentary script লিখে দাও।\n\nStructure:\n1. Hook — headline-এর একটি unexpected angle\n2. Background — ৩০-৪৫ সেকেন্ডে context\n3. Multiple perspectives — pro, con, neutral\n4. আমার নিজের take (clearly labeled as opinion)\n5. Viewer-দের কাছে প্রশ্ন — comment section-এ discussion শুরু করার জন্য\n6. Outro + subscribe CTA\n\nটোন: neutral, fact-based, sensational নয়। যেকোনো claim-এর সাথে source mention করো [SOURCE: ...] format-এ।",
  },
];

const CATEGORIES = ["All", "Tech", "Education", "Vlog", "Faceless", "Marketing", "News"] as const;
const AIS = ["All AI", "ChatGPT", "Claude", "Gemini"] as const;

const FAQS = [
  {
    q: "এই prompts কি সত্যিই কাজ করে?",
    a: "হ্যাঁ। প্রতিটি prompt বাংলাদেশি YouTuber-দের সাথে test করে refine করা হয়েছে। ১,৮০০+ creator এগুলো প্রতিদিন ব্যবহার করছেন।",
  },
  {
    q: "বাংলা স্ক্রিপ্টের জন্য কোন AI সবচেয়ে ভালো?",
    a: "ChatGPT (GPT-4 / GPT-5) এবং Claude 3.5 Sonnet বাংলা script-এ সবচেয়ে natural output দেয়। Gemini fast এবং free, news/research-heavy script-এর জন্য ভালো।",
  },
  {
    q: "AI-এর output কি edit করা লাগবে?",
    a: "হ্যাঁ — যেকোনো AI script-কে আপনার নিজের voice-এ rewrite করুন, local references যোগ করুন এবং fact-check করুন। AI starting point, final script নয়।",
  },
  {
    q: "Faceless channel-এর জন্য কোন prompt best?",
    a: "\"Faceless Channel Script\" prompt-টি specifically voice-over এবং stock footage-based channel-এর জন্য optimize করা — retention hook প্রতি ৩০ সেকেন্ডে।",
  },
];

const formatNumber = (n: number) =>
  n >= 1000 ? `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K` : String(n);

export default function YoutubeScriptPrompts() {
  const [selectedCategory, setSelectedCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const [selectedAI, setSelectedAI] = useState<(typeof AIS)[number]>("All AI");
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
        !p.category.toLowerCase().includes(q)
      )
        return false;
      return true;
    });
  }, [selectedCategory, selectedAI, searchQuery]);

  const handleCopy = async (p: YTPrompt) => {
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
      <SEOHead />

      {/* NAV */}
      <nav className="bg-teal-900 text-white">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-bold">BdPrompt</span>
            <span className="text-[10px] font-semibold bg-amber-400 text-teal-950 px-1.5 py-0.5 rounded">BETA</span>
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <Link to="/explore" className="hover:text-amber-400">Explore</Link>
            <Link to="/prompts" className="hover:text-amber-400">Prompts</Link>
            <Link to="/guide" className="hover:text-amber-400">Guide</Link>
            <Link to="/packs" className="hover:text-amber-400">Packs</Link>
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
      <header className="bg-gradient-to-br from-teal-900 via-teal-800 to-teal-900 text-white">
        <div className="max-w-5xl mx-auto px-4 py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-3 py-1.5 rounded-full text-xs mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
            </span>
            <span>১,৮৯০+ বাংলাদেশি YouTuber ব্যবহার করছেন</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-5">
            YouTube Script লেখার <span className="text-amber-400">বাংলা AI Prompt</span>
          </h1>
          <p className="text-base md:text-xl text-teal-100 max-w-3xl mx-auto mb-8">
            Tech review, vlog, educational, faceless চ্যানেলের জন্য সম্পূর্ণ বিনামূল্যে বাংলা YouTube script prompt —
            ChatGPT, Claude এবং Gemini-এর সাথে কাজ করে।
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            <a
              href="#prompts"
              className="bg-amber-400 hover:bg-amber-500 text-teal-950 font-bold px-6 py-3 rounded-lg transition"
            >
              Prompts দেখুন ↓
            </a>
            <Link
              to="/playground"
              className="border-2 border-white/40 hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              Playground-এ Try করুন
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-teal-100">
            {[
              "১০০% বিনামূল্যে",
              "Sign-up লাগে না",
              "ChatGPT / Claude / Gemini",
              "প্রতিদিন নতুন prompt",
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
            { v: "6+", l: "Prompts" },
            { v: "13K+", l: "Copies" },
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

      {/* PROMPTS */}
      <section id="prompts" className="max-w-6xl mx-auto px-4 py-12">
        {/* Search */}
        <div className="mb-5">
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Prompt খুঁজুন... (বাংলা বা English)"
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
          {AIS.map((a) => {
            const active = selectedAI === a;
            return (
              <button
                key={a}
                onClick={() => setSelectedAI(a)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition border ${
                  active
                    ? "bg-amber-400 text-teal-950 border-amber-400"
                    : "bg-white text-gray-700 border-gray-300 hover:border-amber-400"
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
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs font-semibold bg-teal-50 text-teal-900 px-2 py-0.5 rounded">
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
                  <p className="text-sm text-gray-600 mb-3">{p.titleBn}</p>

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

                  <div className="relative mb-4">
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
                    <button
                      onClick={() => setExpandedId(expanded ? null : p.id)}
                      className="mt-2 text-xs text-teal-800 font-semibold hover:underline"
                    >
                      {expanded ? "সংক্ষেপে দেখুন ▲" : "পুরো prompt দেখুন ▼"}
                    </button>
                  </div>

                  <div className="mt-auto flex gap-2">
                    <button
                      onClick={() => handleCopy(p)}
                      className={`flex-1 font-semibold text-sm py-2.5 rounded-lg transition ${
                        copied
                          ? "bg-green-600 text-white"
                          : "bg-teal-900 hover:bg-teal-800 text-white"
                      }`}
                    >
                      {copied ? "✅ Copied!" : "📋 Copy Prompt"}
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
              { n: "১", t: "Prompt বেছে নিন", d: "আপনার চ্যানেল টাইপ অনুযায়ী filter করে সঠিক prompt-টি খুঁজে নিন।" },
              { n: "২", t: "Copy করুন", d: "এক ক্লিকে prompt clipboard-এ copy করে নিন।" },
              { n: "৩", t: "AI-তে Paste করুন", d: "ChatGPT/Claude/Gemini-তে paste করে [BRACKETS]-এর জায়গায় আপনার তথ্য বসান।" },
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
                <span className="text-teal-700 group-open:rotate-180 transition">▼</span>
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
      <section className="bg-teal-900 text-white">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-5">
            আজই আপনার পরবর্তী <span className="text-amber-400">Viral YouTube Video</span> তৈরি করুন
          </h2>
          <p className="text-teal-100 max-w-2xl mx-auto mb-8">
            ১,০০০+ বাংলাদেশি creator এই prompt-গুলো ব্যবহার করে তাদের চ্যানেল grow করছেন। আপনিও আজই শুরু করুন।
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#prompts"
              className="bg-amber-400 hover:bg-amber-500 text-teal-950 font-bold px-6 py-3 rounded-lg transition"
            >
              📋 Free Prompt Copy করুন
            </a>
            <Link
              to="/packs"
              className="border-2 border-white/40 hover:bg-white/10 text-white font-semibold px-6 py-3 rounded-lg transition"
            >
              Premium Packs দেখুন
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