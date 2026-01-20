import { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { 
  Search, Megaphone, Briefcase, GraduationCap, Code, 
  Mail, Palette, Youtube, PenTool, Clock, ChevronRight, ArrowLeft 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SEOHead } from "@/components/SEOHead";
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
  const { slug } = useParams<{ slug: string }>();
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

  // Article structured data with publisher info
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": category.title,
    "description": category.description,
    "url": `https://bdprompt.com/prompts/${category.slug}`,
    "datePublished": "2026-01-20",
    "dateModified": "2026-01-20",
    "author": {
      "@type": "Organization",
      "name": "BD Prompt"
    },
    "publisher": {
      "@type": "Organization",
      "name": "BD Prompt",
      "logo": {
        "@type": "ImageObject",
        "url": "https://bdprompt.com/favicon.jpg"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://bdprompt.com/prompts/${category.slug}`
    },
    "about": {
      "@type": "ItemList",
      "numberOfItems": category.prompts.length,
      "itemListElement": category.prompts.map((prompt, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": prompt.title
      }))
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title={`${category.title} | BD Prompt`}
        description={category.description}
        keywords={`${category.title}, ChatGPT prompts, AI prompts, বাংলা প্রম্পট, BD Prompt, ${category.slug}`}
        canonicalUrl={`https://bdprompt.com/prompts/${category.slug}`}
        structuredData={structuredData}
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
      </main>
      
      <Footer language={language} />
    </div>
  );
};

export default PromptCategory;
