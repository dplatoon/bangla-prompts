import { Link } from "react-router-dom";

interface PromptCategoryLinksProps {
  language: "bn" | "en";
}

const CATEGORIES = [
  {
    href: "/youtube-script-prompts",
    emoji: "🎬",
    titleBn: "YouTube Script Prompt",
    titleEn: "YouTube Script Prompts",
    descBn: "Tech review, vlog, educational, faceless channel",
    descEn: "Tech review, vlog, educational & faceless channel scripts",
    badge: "4k–8k/mo",
    color: "border-red-200 hover:border-red-400 bg-red-50",
    badgeColor: "bg-red-100 text-red-800",
  },
  {
    href: "/image-generation-prompts",
    emoji: "🖼️",
    titleBn: "Image Generation Prompt",
    titleEn: "Image Generation Prompts",
    descBn: "Midjourney, DALL-E 3, Stable Diffusion, Firefly",
    descEn: "Midjourney, DALL-E 3, Stable Diffusion & Adobe Firefly",
    badge: "6k–12k/mo",
    color: "border-violet-200 hover:border-violet-400 bg-violet-50",
    badgeColor: "bg-violet-100 text-violet-800",
  },
  {
    href: "/video-generation-prompts",
    emoji: "🎥",
    titleBn: "Video Generation Prompt",
    titleEn: "Video Generation Prompts",
    descBn: "Sora, Runway, Pika, CapCut AI, Kling, Luma",
    descEn: "Sora, Runway, Pika, CapCut AI, Kling & Luma Dream Machine",
    badge: "2k–5k/mo",
    color: "border-purple-200 hover:border-purple-400 bg-purple-50",
    badgeColor: "bg-purple-100 text-purple-800",
  },
  {
    href: "/facebook-post-prompts",
    emoji: "📱",
    titleBn: "Facebook Post Prompt",
    titleEn: "Facebook Post Prompts",
    descBn: "Viral post, business launch, engagement, ঈদ পোস্ট",
    descEn: "Viral posts, business launches, engagement & festival posts",
    badge: "5k–10k/mo",
    color: "border-blue-200 hover:border-blue-400 bg-blue-50",
    badgeColor: "bg-blue-100 text-blue-800",
  },
  {
    href: "/ad-copy-prompts",
    emoji: "📢",
    titleBn: "Ad Copy Prompt",
    titleEn: "Ad Copy Prompts",
    descBn: "Facebook Ads, Google Ads, Daraz, WhatsApp, Email",
    descEn: "Facebook Ads, Google Ads, Daraz listings & WhatsApp campaigns",
    badge: "3k–7k/mo",
    color: "border-orange-200 hover:border-orange-400 bg-orange-50",
    badgeColor: "bg-orange-100 text-orange-800",
  },
  {
    href: "/ssc-exam-prompts",
    emoji: "🎓",
    titleBn: "SSC ও HSC Exam Prompt",
    titleEn: "SSC & HSC Exam Prompts",
    descBn: "রচনা, অ্যাসাইনমেন্ট, MCQ, সৃজনশীল, পড়ার রুটিন",
    descEn: "Essays, assignments, MCQ practice, creative questions & study plans",
    badge: "14k–28k/mo",
    color: "border-green-200 hover:border-green-400 bg-green-50",
    badgeColor: "bg-green-100 text-green-800",
  },
  {
    href: "/freelancer-prompts",
    emoji: "💼",
    titleBn: "Freelancer Prompt",
    titleEn: "Freelancer Prompts",
    descBn: "Fiverr গিগ, Upwork proposal, CV, cover letter, client message",
    descEn: "Fiverr gigs, Upwork proposals, CV, cover letters & client messages",
    badge: "3k–6k/mo",
    color: "border-cyan-200 hover:border-cyan-400 bg-cyan-50",
    badgeColor: "bg-cyan-100 text-cyan-800",
  },
];

export const PromptCategoryLinks = ({ language }: PromptCategoryLinksProps) => {
  const isBn = language === "bn";

  return (
    <section className="py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-teal-100 text-teal-800 text-xs font-semibold px-3 py-1 rounded-full mb-3">
            {isBn ? "সব ক্যাটাগরি" : "All Categories"}
          </span>
          <h2 className={`text-3xl lg:text-4xl font-bold text-gray-900 mb-3 ${isBn ? "font-bengali" : ""}`}>
            {isBn ? "যা খুঁজছেন তার Prompt এখানে" : "Find Prompts for Every Need"}
          </h2>
          <p className={`text-lg text-gray-500 max-w-2xl mx-auto ${isBn ? "font-bengali" : ""}`}>
            {isBn
              ? "৭টি বিশেষ ক্যাটাগরিতে ৮০+ বাংলা AI prompt — ChatGPT, Claude ও Gemini-এর জন্য"
              : "80+ Bangla AI prompts across 7 categories — for ChatGPT, Claude & Gemini"}
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.href}
              to={cat.href}
              className={`group flex flex-col p-5 rounded-xl border-2 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 ${cat.color}`}
            >
              {/* Top row */}
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl">{cat.emoji}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${cat.badgeColor}`}>
                  {cat.badge}
                </span>
              </div>

              {/* Title */}
              <h3 className={`font-bold text-gray-900 text-base mb-1 leading-snug ${isBn ? "font-bengali" : ""}`}>
                {isBn ? cat.titleBn : cat.titleEn}
              </h3>

              {/* Description */}
              <p className={`text-xs text-gray-600 leading-relaxed flex-1 ${isBn ? "font-bengali" : ""}`}>
                {isBn ? cat.descBn : cat.descEn}
              </p>

              {/* CTA */}
              <div className={`mt-4 text-xs font-semibold text-teal-700 group-hover:text-teal-900 flex items-center gap-1 transition-colors ${isBn ? "font-bengali" : ""}`}>
                {isBn ? "দেখুন" : "Browse"} <span className="group-hover:translate-x-0.5 transition-transform inline-block">→</span>
              </div>
            </Link>
          ))}

          {/* "More coming" placeholder card */}
          <div className="flex flex-col p-5 rounded-xl border-2 border-dashed border-gray-300 bg-white items-center justify-center text-center min-h-[160px]">
            <span className="text-3xl mb-2">✨</span>
            <p className={`text-sm font-semibold text-gray-500 ${isBn ? "font-bengali" : ""}`}>
              {isBn ? "আরও আসছে..." : "More coming soon"}
            </p>
            <p className={`text-xs text-gray-400 mt-1 ${isBn ? "font-bengali" : ""}`}>
              {isBn ? "প্রতিদিন নতুন prompt যোগ হচ্ছে" : "New prompts added daily"}
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10">
          <Link
            to="/explore"
            className={`inline-flex items-center gap-2 bg-teal-900 hover:bg-teal-800 text-white font-semibold px-6 py-3 rounded-lg transition text-sm ${isBn ? "font-bengali" : ""}`}
          >
            {isBn ? "সব ৫০০+ Prompt দেখুন" : "Browse All 500+ Prompts"} →
          </Link>
        </div>
      </div>
    </section>
  );
};
