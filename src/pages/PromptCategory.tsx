import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { 
  Search, Megaphone, Briefcase, GraduationCap, Code, 
  Mail, Palette, Youtube, PenTool, Clock, ChevronRight, ArrowLeft 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/SEOHead";
import { buildCategoryGraph } from "@/lib/bdprompt-schema";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CategoryPromptCard } from "@/components/CategoryPromptCard";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getCategoryBySlug, PROMPT_CATEGORIES } from "@/data/promptCategories";

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

const PromptCategory = () => {
  const [language, setLanguage] = useState<"bn" | "en">("bn");
  const { category: slug } = useParams<{ category: string }>();
  const category = slug ? getCategoryBySlug(slug) : undefined;

  // Redirect to 404 if category not found
  if (!category) {
    return <Navigate to="/404" replace />;
  }

  const IconComponent = iconMap[category.icon] || Search;

  const breadcrumbItems = [
    { label: "Prompts", labelBn: "প্রম্পট", href: "/prompts" },
    { label: category.title, labelBn: category.title, href: `/prompts/${category.slug}` },
  ];

  // Get related categories (excluding current)
  const relatedCategories = PROMPT_CATEGORIES
    .filter(c => c.slug !== category.slug)
    .slice(0, 3);

  const categoryGraph = buildCategoryGraph(
    category.slug,
    category.title,
    category.description,
    category.prompts.map((prompt, index) => ({
      slug: `${category.slug}-${index + 1}`,
      title: prompt.title,
      description: prompt.description ?? category.description,
      categorySlug: category.slug,
      categoryName: category.title,
      price: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }))
  );

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${category.title} | BdPrompt`}
        description={category.description}
        keywords={`${category.title}, ChatGPT prompts, AI prompts, বাংলা প্রম্পট, BD Prompt, ${category.slug}`}
        canonicalUrl={`https://bdprompt.com/prompts/${category.slug}`}
        graph={categoryGraph}
      />
      
      <Header language={language} onLanguageChange={setLanguage} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <Breadcrumbs items={breadcrumbItems} language="bn" className="mb-6" />
        
        {/* Back Button */}
        <Link to="/prompts" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          সব ক্যাটাগরি
        </Link>
        
        {/* Category Header */}
        <section className="mb-10">
          <div className="flex items-start gap-4 mb-4">
            <div className="p-4 rounded-2xl bg-primary/10 text-primary shrink-0">
              <IconComponent className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                {category.title}
              </h1>
              <p className="text-muted-foreground text-lg">
                {category.description}
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="text-sm">
            {category.prompts.length} টি প্রম্পট
          </Badge>
        </section>
        
        {/* Prompts Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {category.prompts.map((prompt, index) => (
            <CategoryPromptCard
              key={index}
              title={prompt.title}
              copyText={prompt.copyText}
              usage={prompt.usage}
            />
          ))}
        </section>
        
        {/* Explore Dynamic Prompts CTA */}
        <section className="border-t border-border pt-10 mb-12">
          <h2 className="text-xl font-bold text-foreground mb-3">
            🔍 ডাইনামিক লাইব্রেরিতে এক্সপ্লোর করুন
          </h2>
          <p className="text-sm text-muted-foreground mb-4">
            সার্চ, ফিল্টার এবং সর্ট করে আরও প্রম্পট খুঁজুন আমাদের সম্পূর্ণ লাইব্রেরি থেকে।
          </p>
          <div className="flex flex-wrap gap-2">
            <Link
              to="/explore"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              সব এক্সপ্লোর করুন
              <ChevronRight className="h-4 w-4" />
            </Link>
            <Link
              to="/explore/business"
              className="px-4 py-2 rounded-lg border border-border text-sm hover:border-primary hover:bg-primary/5 transition-colors"
            >
              ব্যবসা
            </Link>
            <Link
              to="/explore/education"
              className="px-4 py-2 rounded-lg border border-border text-sm hover:border-primary hover:bg-primary/5 transition-colors"
            >
              শিক্ষা
            </Link>
            <Link
              to="/explore/content"
              className="px-4 py-2 rounded-lg border border-border text-sm hover:border-primary hover:bg-primary/5 transition-colors"
            >
              কন্টেন্ট
            </Link>
          </div>
        </section>

        {/* Related Categories */}
        <section className="border-t border-border pt-12">
          <h2 className="text-xl font-bold text-foreground mb-6">
            🔗 আরও ক্যাটাগরি দেখুন
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedCategories.map((related) => {
              const RelatedIcon = iconMap[related.icon] || Search;
              return (
                <Link
                  key={related.slug}
                  to={`/prompts/${related.slug}`}
                  className="flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-accent/5 transition-all group"
                >
                  <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <RelatedIcon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate group-hover:text-primary transition-colors">
                      {related.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {related.prompts.length} প্রম্পট
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>
              );
            })}
          </div>
          
          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg">
              <Link to="/prompts" className="gap-2">
                সব ক্যাটাগরি দেখুন
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Additional SEO Links */}
        <section className="mt-8 border-t border-border pt-6 mb-8">
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/explore" className="text-sm text-primary hover:underline">🔍 এক্সপ্লোর</Link>
            <span className="text-muted-foreground">•</span>
            <Link to="/guide" className="text-sm text-primary hover:underline">📖 গাইড</Link>
            <span className="text-muted-foreground">•</span>
            <Link to="/playground" className="text-sm text-primary hover:underline">🧪 প্লেগ্রাউন্ড</Link>
            <span className="text-muted-foreground">•</span>
            <Link to="/blog" className="text-sm text-primary hover:underline">📝 ব্লগ</Link>
            <span className="text-muted-foreground">•</span>
            <Link to="/packs" className="text-sm text-primary hover:underline">📦 প্রম্পট প্যাক</Link>
            <span className="text-muted-foreground">•</span>
            <Link to="/sitemap" className="text-sm text-primary hover:underline">🗺️ সাইটম্যাপ</Link>
          </div>
        </section>
      </main>
      
      <Footer language={language} />
    </div>
  );
};

export default PromptCategory;
