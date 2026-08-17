import { Link } from "react-router-dom";
import { promptCountLabel, promptCountLabelBn, categoryCountLabel, categoryCountLabelBn } from "@/config/siteStats";

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
    color: "border-red-200 hover:border-red-400 bg-red-50",
  },
  {
    href: "/image-generation-prompts",
    emoji: "🖼️",
    titleBn: "Image Generation Prompt",
    titleEn: "Image Generation Prompts",
    descBn: "Midjourney, DALL-E 3, Stable Diffusion, Firefly",
    descEn: "Midjourney, DALL-E 3, Stable Diffusion & Adobe Firefly",
    color: "border-violet-200 hover:border-violet-400 bg-violet-50",
  },
  {
    href: "/video-generation-prompts",
    emoji: "🎥",
    titleBn: "Video Generation Prompt",
    titleEn: "Video Generation Prompts",
    descBn: "Sora, Runway, Pika, CapCut AI, Kling, Luma",
    descEn: "Sora, Runway, Pika, CapCut AI, Kling & Luma Dream Machine",
    color: "border-purple-200 hover:border-purple-400 bg-purple-50",
  },
  {
    href: "/facebook-post-prompts",
    emoji: "📱",
    titleBn: "Facebook Post Prompt",
    titleEn: "Facebook Post Prompts",
    descBn: "Viral post, business launch, engagement, ঈদ পোস্ট",
    descEn: "Viral posts, business launches, engagement & festival posts",
    color: "border-blue-200 hover:border-blue-400 bg-blue-50",
  },
  {
    href: "/ad-copy-prompts",
    emoji: "📢",
    titleBn: "Ad Copy Prompt",
    titleEn: "Ad Copy Prompts",
    descBn: "Facebook Ads, Google Ads, Daraz, WhatsApp, Email",
    descEn: "Facebook Ads, Google Ads, Daraz listings & WhatsApp campaigns",
    color: "border-orange-200 hover:border-orange-400 bg-orange-50",
  },
  {
    href: "/ssc-exam-prompts",
    emoji: "🎓",
    titleBn: "SSC ও HSC Exam Prompt",
    titleEn: "SSC & HSC Exam Prompts",
    descBn: "রচনা, অ্যাসাইনমেন্ট, MCQ, সৃজনশীল, পড়ার রুটিন",
    descEn: "Essays, assignments, MCQ practice, creative questions & study plans",
    color: "border-green-200 hover:border-green-400 bg-green-50",
  },
  {
    href: "/freelancer-prompts",
    emoji: "💼",
    titleBn: "Freelancer Prompt",
    titleEn: "Freelancer Prompts",
    descBn: "Fiverr গিগ, Upwork proposal, CV, cover letter, client message",
    descEn: "Fiverr gigs, Upwork proposals, CV, cover letters & client messages",
    color: "border-cyan-200 hover:border-cyan-400 bg-cyan-50",
  },
];

export const PromptCategoryLinks = ({ language }: PromptCategoryLinksProps) => {
  const isBn = language === "bn";

  return (
    <section className="py-16 lg:py-20 bg-muted/40">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-3">
            {isBn ? "সব ক্যাটাগরি" : "All Categories"}
          </span>
          <h2 className={`text-3xl lg:text-4xl font-bold text-foreground mb-3 ${isBn ? "font-bengali" : ""}`}>
            {isBn ? "যা খুঁজছেন তার Prompt এখানে" : "Find Prompts for Every Need"}
          </h2>
          <p className={`text-lg text-muted-foreground max-w-2xl mx-auto ${isBn ? "font-bengali" : ""}`}>
            {isBn
              ? `${categoryCountLabelBn}টি বিশেষ ক্যাটাগরিতে ${promptCountLabelBn} বাংলা AI prompt — ChatGPT, Claude ও Gemini-এর জন্য`
              : `${promptCountLabel} Bangla AI prompts across ${categoryCountLabel} categories — for ChatGPT, Claude & Gemini`}
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
              <div className="flex items-start mb-3">
                <span className="text-3xl" aria-hidden="true">{cat.emoji}</span>
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
          <div className="flex flex-col p-5 rounded-xl border-2 border-dashed border-border bg-card items-center justify-center text-center min-h-[160px]">
            <span className="text-3xl mb-2">✨</span>
            <p className={`text-sm font-semibold text-muted-foreground ${isBn ? "font-bengali" : ""}`}>
              {isBn ? "আরও আসছে..." : "More coming soon"}
            </p>
            <p className={`text-xs text-muted-foreground/70 mt-1 ${isBn ? "font-bengali" : ""}`}>
              {isBn ? "নিয়মিত নতুন prompt যোগ হচ্ছে" : "New prompts added regularly"}
            </p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10">
          <Link
            to="/explore"
            className={`inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-3 rounded-lg transition text-sm ${isBn ? "font-bengali" : ""}`}
          >
            {isBn ? `সব ${promptCountLabelBn} Prompt দেখুন` : `Browse all ${promptCountLabel} prompts`} →
          </Link>
        </div>
      </div>
    </section>
  );
};
