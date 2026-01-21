import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search, Megaphone, Briefcase, GraduationCap, Code, 
  Mail, Palette, Youtube, PenTool, Clock, ChevronRight 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PROMPT_CATEGORIES } from "@/data/promptCategories";

// Icon mapping
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Search,
  Megaphone,
  Briefcase,
  GraduationCap,
  Code,
  Mail,
  Palette,
  Youtube,
  PenTool,
  Clock,
};

const Prompts = () => {
  const [language, setLanguage] = useState<"bn" | "en">("bn");

  const breadcrumbItems = [
    { label: "Prompts", labelBn: "প্রম্পট", href: "/prompts" },
  ];

  // TechArticle structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "AI প্রম্পট ক্যাটাগরি | BD Prompt",
    "description": "১০০+ প্রিমিয়াম ChatGPT ও AI প্রম্পট ক্যাটাগরি - SEO, মার্কেটিং, ফ্রিল্যান্সিং, কোডিং এবং আরও অনেক কিছু।",
    "url": "https://bdprompt.com/prompts",
    "publisher": {
      "@type": "Organization",
      "name": "BD Prompt",
      "logo": "https://bdprompt.com/favicon.jpg"
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": PROMPT_CATEGORIES.map((category, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": category.title,
        "url": `https://bdprompt.com/prompts/${category.slug}`
      }))
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="AI প্রম্পট ক্যাটাগরি | BD Prompt"
        description="১০০+ প্রিমিয়াম ChatGPT ও AI প্রম্পট ক্যাটাগরি - SEO, মার্কেটিং, ফ্রিল্যান্সিং, কোডিং এবং আরও অনেক কিছু। এক ক্লিকে কপি করুন!"
        keywords="AI prompts, ChatGPT prompts, বাংলা প্রম্পট, BD Prompt, SEO prompts, মার্কেটিং প্রম্পট"
        canonicalUrl="https://bdprompt.com/prompts"
        structuredData={structuredData}
      />
      
      <Header language={language} onLanguageChange={setLanguage} />
      
      <main className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbItems} language="bn" className="mb-4 sm:mb-6" />
        
        {/* Hero Section */}
        <section className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            🎯 AI প্রম্পট ক্যাটাগরি
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
            ১০০+ প্রিমিয়াম ChatGPT প্রম্পট বিভিন্ন ক্যাটাগরিতে সাজানো। 
            আপনার প্রয়োজন অনুযায়ী ক্যাটাগরি বেছে নিন এবং এক ক্লিকে প্রম্পট কপি করুন।
          </p>
        </section>
        
        {/* Categories Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {PROMPT_CATEGORIES.map((category) => {
            const IconComponent = iconMap[category.icon] || Search;
            
            return (
              <Link key={category.slug} to={`/prompts/${category.slug}`}>
                <Card className="h-full group hover:shadow-xl transition-all duration-300 border-border/50 hover:border-primary/50 cursor-pointer bg-card hover:bg-accent/5">
                  <CardHeader className="pb-2 sm:pb-3 p-4 sm:p-6">
                    <div className="flex items-start justify-between gap-2 sm:gap-3">
                      <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <IconComponent className="h-5 w-5 sm:h-6 sm:w-6" />
                      </div>
                      <Badge variant="secondary" className="shrink-0 text-[10px] sm:text-xs">
                        {category.prompts.length} প্রম্পট
                      </Badge>
                    </div>
                    <CardTitle className="text-base sm:text-lg font-bold text-foreground leading-tight mt-2 sm:mt-3 group-hover:text-primary transition-colors">
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <CardDescription className="text-muted-foreground line-clamp-2 sm:line-clamp-3 mb-3 sm:mb-4 text-xs sm:text-sm">
                      {category.description}
                    </CardDescription>
                    <div className="flex items-center text-primary font-medium text-xs sm:text-sm group-hover:gap-2 transition-all">
                      প্রম্পট দেখুন
                      <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </section>
        
        {/* CTA Section */}
        <section className="mt-12 sm:mt-16 text-center bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-3 sm:mb-4">
            🚀 সব প্রম্পট এক্সপ্লোর করুন
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 max-w-xl mx-auto px-2">
            আমাদের সম্পূর্ণ প্রম্পট লাইব্রেরি দেখুন - কন্টেন্ট, ইমেজ, কোড, মার্কেটিং সহ আরও অনেক কিছু।
          </p>
          <Link 
            to="/explore"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base hover:bg-primary/90 transition-colors"
          >
            সব প্রম্পট দেখুন
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </Link>
        </section>
      </main>
      
      <Footer language={language} />
    </div>
  );
};

export default Prompts;
