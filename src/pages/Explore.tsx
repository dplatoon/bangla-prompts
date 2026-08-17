import { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PromptCard } from "@/components/PromptCard";
import { PlaygroundModal } from "@/components/PlaygroundModal";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Grid3X3, List, Loader2, ChevronRight } from "lucide-react";
import { PROMPT_CATEGORIES } from "@/data/promptCategories";
import { usePrompts, useCategories, promptToPromptData } from "@/hooks/usePrompts";
import { useLazyLoad } from "@/hooks/useIntersectionObserver";
import { trackCategoryFiltered, trackSearchPerformed } from "@/utils/analytics";
import type { PromptData } from "@/data/mockPrompts";

// Generate ItemList structured data for SEO
const generateItemListSchema = (prompts: PromptData[], language: 'bn' | 'en') => {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": language === 'bn' ? "বাংলা AI প্রম্পট তালিকা" : "Bangla AI Prompts Collection",
    "description": language === 'bn' 
      ? "bdprompt.com-এ ৬০+ বাংলা AI প্রম্পট এক্সপ্লোর করুন"
      : "Explore 60+ Bangla AI prompts on bdprompt.com",
    "numberOfItems": prompts.length,
    "itemListElement": prompts.slice(0, 50).map((prompt, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "SoftwareApplication",
        "@id": `https://bdprompt.com/prompt/${prompt.id}`,
        "name": language === 'bn' ? prompt.titleBn : prompt.title,
        "description": language === 'bn' ? prompt.descriptionBn : prompt.description,
        "url": `https://bdprompt.com/prompt/${prompt.id}`,
        "applicationCategory": "ProductivityApplication",
        "offers": {
          "@type": "Offer",
          "price": prompt.price || 0,
          "priceCurrency": "BDT"
        },
        ...(prompt.rating > 0 && {
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": prompt.rating.toFixed(1),
            "ratingCount": 1
          }
        })
      }
    }))
  };
};

// Section heading component for SEO
interface SectionHeadingProps {
  title: string;
  titleBn: string;
  language: 'bn' | 'en';
  level?: 'h2' | 'h3';
}

const SectionHeading = ({ title, titleBn, language, level = 'h2' }: SectionHeadingProps) => {
  const Tag = level;
  const text = language === 'bn' ? titleBn : title;
  
  return (
    <Tag className={`text-xl sm:text-2xl font-bold text-foreground mb-4 ${language === 'bn' ? 'font-bengali' : ''}`}>
      {text}
    </Tag>
  );
};

// Prompt section component
interface PromptSectionProps {
  title: string;
  titleBn: string;
  prompts: PromptData[];
  viewMode: 'grid' | 'list';
  language: 'bn' | 'en';
  onTryPrompt: (prompt: PromptData) => void;
  level?: 'h2' | 'h3';
}

const PromptSection = ({ title, titleBn, prompts, viewMode, language, onTryPrompt, level = 'h2' }: PromptSectionProps) => {
  if (prompts.length === 0) return null;
  
  return (
    <section className="mb-10 sm:mb-12">
      <SectionHeading title={title} titleBn={titleBn} language={language} level={level} />
      <div className={viewMode === 'grid' 
        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" 
        : "space-y-4"
      }>
        {prompts.map((prompt) => (
          <PromptCard 
            key={prompt.id} 
            promptData={prompt} 
            language={language}
            onTryClick={() => onTryPrompt(prompt)}
          />
        ))}
      </div>
    </section>
  );
};

// Lazy-loaded prompt grid component
interface ExploreGridProps {
  prompts: PromptData[];
  viewMode: 'grid' | 'list';
  language: 'bn' | 'en';
  loading: boolean;
  noResultsText: string;
  onTryPrompt: (prompt: PromptData) => void;
  showSections?: boolean;
}

const ExploreGrid = ({ prompts, viewMode, language, loading, noResultsText, onTryPrompt, showSections = false }: ExploreGridProps) => {
  const { loadedCount, loaderRef, hasMore } = useLazyLoad(prompts.length, 12);
  const visiblePrompts = prompts.slice(0, loadedCount);

  // Categorize prompts for sections
  const popularPrompts = useMemo(() => 
    [...prompts].sort((a, b) => b.usageCount - a.usageCount).slice(0, 6), 
    [prompts]
  );
  
  const newestPrompts = useMemo(() => 
    [...prompts].sort((a, b) => new Date(b.id).getTime() - new Date(a.id).getTime()).slice(0, 6), 
    [prompts]
  );
  
  const topRatedPrompts = useMemo(() => 
    [...prompts].sort((a, b) => b.rating - a.rating).slice(0, 6), 
    [prompts]
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (prompts.length === 0) {
    return (
      <div className="text-center py-20">
        <p className={`text-xl text-muted-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
          {noResultsText}
        </p>
      </div>
    );
  }

  // Show sectioned view for "all" category with enough prompts
  if (showSections && prompts.length >= 12) {
    return (
      <div className="space-y-8">
        <PromptSection
          title="Popular Prompts"
          titleBn="জনপ্রিয় প্রম্পট"
          prompts={popularPrompts}
          viewMode={viewMode}
          language={language}
          onTryPrompt={onTryPrompt}
          level="h2"
        />
        
        <PromptSection
          title="Newest Prompts"
          titleBn="নতুন প্রম্পট"
          prompts={newestPrompts}
          viewMode={viewMode}
          language={language}
          onTryPrompt={onTryPrompt}
          level="h2"
        />
        
        <PromptSection
          title="Top Rated"
          titleBn="সর্বাধিক রেটিং"
          prompts={topRatedPrompts}
          viewMode={viewMode}
          language={language}
          onTryPrompt={onTryPrompt}
          level="h2"
        />
      </div>
    );
  }

  // Standard grid view
  return (
    <>
      <div className={viewMode === 'grid' 
        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6" 
        : "space-y-4"
      }>
        {visiblePrompts.map((prompt) => (
          <PromptCard 
            key={prompt.id} 
            promptData={prompt} 
            language={language}
            onTryClick={() => onTryPrompt(prompt)}
          />
        ))}
      </div>
      {/* Lazy load trigger */}
      {hasMore && (
        <div ref={loaderRef} className="flex justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      )}
    </>
  );
};

const Explore = () => {
  const { category: categorySlug } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') ?? "");
  const [selectedCategory, setSelectedCategory] = useState<string>(categorySlug || "all");
  const [sortBy, setSortBy] = useState<string>("popular");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedPrompt, setSelectedPrompt] = useState<PromptData | null>(null);
  const [isPlaygroundOpen, setIsPlaygroundOpen] = useState(false);

  const { data: prompts, isLoading: promptsLoading } = usePrompts();
  const { data: categories } = useCategories();

  // Sync URL param with state
  useEffect(() => {
    if (categorySlug) {
      setSelectedCategory(categorySlug);
    }
  }, [categorySlug]);

  // Sync ?q= search param (e.g. from the homepage hero search) into state
  useEffect(() => {
    const q = searchParams.get('q');
    if (q !== null) setSearchQuery(q);
  }, [searchParams]);

  useEffect(() => {
    const savedLang = localStorage.getItem('bdprompt-language') as 'bn' | 'en' || 'bn';
    setLanguage(savedLang);
  }, []);

  const handleLanguageChange = (lang: 'bn' | 'en') => {
    setLanguage(lang);
    localStorage.setItem('bdprompt-language', lang);
  };

  const handleTryPrompt = (prompt: PromptData) => {
    setSelectedPrompt(prompt);
    setIsPlaygroundOpen(true);
  };

  // Handle category change with URL update and analytics
  const handleCategoryChange = useCallback((value: string) => {
    setSelectedCategory(value);
    trackCategoryFiltered(value, language);
    
    // Update URL for clean paths
    if (value === "all") {
      navigate('/explore');
    } else {
      navigate(`/explore/${value}`);
    }
  }, [navigate, language]);

  // Track search with debounce (results count calculated separately to avoid circular dep)
  useEffect(() => {
    if (searchQuery.length >= 3 && prompts) {
      const timer = setTimeout(() => {
        const count = prompts.filter(p => 
          p.title_en.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.title_bn.includes(searchQuery)
        ).length;
        trackSearchPerformed(searchQuery, count, language);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [searchQuery, language, prompts]);

  // Convert and filter prompts
  const filteredPrompts = useMemo(() => {
    if (!prompts) return [];

    let filtered = prompts.map(promptToPromptData);
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.titleBn.includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.descriptionBn.includes(query) ||
        p.tags.some(t => t.toLowerCase().includes(query))
      );
    }
    
    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }
    
    // Sort
    switch (sortBy) {
      case "popular":
        filtered.sort((a, b) => b.usageCount - a.usageCount);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        // Already sorted by created_at from API
        break;
      case "free":
        filtered = filtered.filter(p => p.price === 0);
        break;
    }
    
    return filtered;
  }, [prompts, searchQuery, selectedCategory, sortBy]);

  const categoryList = useMemo(() => {
    if (!categories) return [];
    return categories.map(cat => ({
      value: cat.name_en.toLowerCase(),
      label: language === 'bn' ? cat.name_bn : cat.name_en
    }));
  }, [categories, language]);

  const text = {
    bn: {
      title: "প্রম্পট এক্সপ্লোর করুন",
      subtitle: "৬০+ বাংলা AI প্রম্পট থেকে আপনার পছন্দের প্রম্পট খুঁজুন",
      searchPlaceholder: "প্রম্পট খুঁজুন...",
      allCategories: "সব বিভাগ",
      sortBy: "সাজান",
      popular: "জনপ্রিয়",
      rating: "রেটিং",
      newest: "নতুন",
      free: "ফ্রি",
      results: "টি ফলাফল",
      noResults: "কোনো প্রম্পট পাওয়া যায়নি",
      loading: "লোড হচ্ছে..."
    },
    en: {
      title: "Explore Prompts",
      subtitle: "Find your perfect prompt from 60+ Bangla AI prompts",
      searchPlaceholder: "Search prompts...",
      allCategories: "All Categories",
      sortBy: "Sort by",
      popular: "Popular",
      rating: "Rating",
      newest: "Newest",
      free: "Free",
      results: "results",
      noResults: "No prompts found",
      loading: "Loading..."
    }
  };

  const currentText = text[language];

  // Generate ItemList schema for rich snippets
  const itemListSchema = useMemo(() => {
    return generateItemListSchema(filteredPrompts, language);
  }, [filteredPrompts, language]);

  // Generate canonical URL based on current category
  const canonicalUrl = selectedCategory === "all" 
    ? "https://bdprompt.com/explore" 
    : `https://bdprompt.com/explore/${selectedCategory}`;

  // Get current category label for SEO
  const currentCategoryLabel = categoryList.find(c => c.value === selectedCategory)?.label;
  const currentCategoryLabelBn = categories?.find(c => c.name_en.toLowerCase() === selectedCategory)?.name_bn;
  
  const seoTitle = selectedCategory !== "all" && currentCategoryLabel
    ? language === 'bn' 
      ? `${currentCategoryLabelBn || currentCategoryLabel} প্রম্পট | বাংলা AI প্রম্পট | BdPrompt`
      : `${currentCategoryLabel} Prompts | Bangla AI Prompts | BdPrompt`
    : language === 'bn' 
      ? "প্রম্পট এক্সপ্লোর করুন | 60+ বাংলা AI প্রম্পট | BdPrompt" 
      : "Explore Prompts | 60+ Bangla AI Prompts | BdPrompt";

  const seoDescription = selectedCategory !== "all" && currentCategoryLabel
    ? language === 'bn'
      ? `${currentCategoryLabelBn || currentCategoryLabel} ক্যাটাগরির বাংলা AI প্রম্পট এক্সপ্লোর করুন। ChatGPT, Claude, Gemini-এর জন্য।`
      : `Explore ${currentCategoryLabel} Bangla AI prompts. For ChatGPT, Claude, Gemini.`
    : language === 'bn' 
      ? "বিভিন্ন ক্যাটাগরিতে 60+ বাংলা AI প্রম্পট ব্রাউজ করুন। ChatGPT, Claude, Gemini-এর জন্য।" 
      : "Browse 60+ Bangla AI prompts across categories. For ChatGPT, Claude, Gemini.";

  // Build breadcrumb items dynamically based on current category
  const breadcrumbItems = useMemo(() => {
    const items = [{ label: "Explore", labelBn: "এক্সপ্লোর", href: "/explore" }];
    
    if (selectedCategory !== "all" && currentCategoryLabel) {
      items.push({
        label: currentCategoryLabel,
        labelBn: currentCategoryLabelBn || currentCategoryLabel,
        href: `/explore/${selectedCategory}`
      });
    }
    
    return items;
  }, [selectedCategory, currentCategoryLabel, currentCategoryLabelBn]);

  return (
    <>
      <SEOHead 
        title={seoTitle}
        description={seoDescription}
        canonicalUrl={canonicalUrl}
        language={language}
        structuredData={itemListSchema}
      />
      
      <div className="min-h-screen bg-background">
        <Header language={language} onLanguageChange={handleLanguageChange} />
        
        <main className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
          {/* Breadcrumb Navigation with Schema */}
          <Breadcrumbs
            items={breadcrumbItems}
            language={language}
            className="mb-4 sm:mb-6"
          />

          {/* Page Header */}
          <header className="text-center mb-8 sm:mb-12">
            <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4 ${language === 'bn' ? 'font-bengali' : ''}`}>
              {currentText.title}
            </h1>
            <p className={`text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-2 ${language === 'bn' ? 'font-bengali' : ''}`}>
              {currentText.subtitle}
            </p>
          </header>

          {/* Filters */}
          <div className="flex flex-col gap-3 sm:gap-4 mb-6 sm:mb-8">
            {/* Search - Full width on mobile */}
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
              <Input
                placeholder={currentText.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-9 sm:pl-10 text-sm sm:text-base ${language === 'bn' ? 'font-bengali' : ''}`}
              />
            </div>
            
            {/* Filter row - responsive grid */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                <SelectTrigger className={`w-full sm:w-48 text-sm ${language === 'bn' ? 'font-bengali' : ''}`}>
                  <Filter className="w-4 h-4 mr-2 shrink-0" />
                  <SelectValue placeholder={currentText.allCategories} />
                </SelectTrigger>
                <SelectContent className="bg-background border border-border z-50">
                  <SelectItem value="all">{currentText.allCategories}</SelectItem>
                  {categoryList.map(cat => (
                    <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <div className="flex gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className={`flex-1 sm:w-40 text-sm ${language === 'bn' ? 'font-bengali' : ''}`}>
                    <SelectValue placeholder={currentText.sortBy} />
                  </SelectTrigger>
                  <SelectContent className="bg-background border border-border z-50">
                    <SelectItem value="popular">{currentText.popular}</SelectItem>
                    <SelectItem value="rating">{currentText.rating}</SelectItem>
                    <SelectItem value="newest">{currentText.newest}</SelectItem>
                    <SelectItem value="free">{currentText.free}</SelectItem>
                  </SelectContent>
                </Select>
                
                {/* View mode - visible on all screens */}
                <div className="flex gap-1">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="icon"
                    className="h-9 w-9 sm:h-10 sm:w-10"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="icon"
                    className="h-9 w-9 sm:h-10 sm:w-10"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <Badge variant="secondary" className={language === 'bn' ? 'font-bengali' : ''}>
              {promptsLoading ? currentText.loading : `${filteredPrompts.length} ${currentText.results}`}
            </Badge>
          </div>

          {/* Prompts Grid with H2 sections for SEO */}
          <ExploreGrid 
            prompts={filteredPrompts}
            viewMode={viewMode}
            language={language}
            loading={promptsLoading}
            noResultsText={currentText.noResults}
            onTryPrompt={handleTryPrompt}
            showSections={selectedCategory === "all" && !searchQuery}
          />

          {/* Category Cross-Links for SEO */}
          {categories && categories.length > 0 && (
            <section className="mt-12 sm:mt-16 border-t border-border pt-8">
              <h2 className={`text-xl sm:text-2xl font-bold text-foreground mb-6 ${language === 'bn' ? 'font-bengali' : ''}`}>
                {language === 'bn' ? 'সব ক্যাটাগরি এক্সপ্লোর করুন' : 'Explore All Categories'}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                {categories.map(cat => (
                  <a 
                    key={cat.id}
                    href={`/explore/${cat.slug}`}
                    className={`block p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-colors text-center ${
                      selectedCategory === cat.slug ? 'border-primary bg-primary/10' : ''
                    }`}
                  >
                    <span className={`text-sm font-medium text-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
                      {language === 'bn' ? cat.name_bn : cat.name_en}
                    </span>
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* SEO Prompt Collections Cross-Links */}
          <section className="mt-10 sm:mt-12 border-t border-border pt-8">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
              {language === 'bn' ? '📚 কিউরেটেড প্রম্পট কালেকশন' : '📚 Curated Prompt Collections'}
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              {language === 'bn' 
                ? 'নির্দিষ্ট বিষয়ে বিশেষভাবে তৈরি করা প্রম্পট কালেকশন — এক ক্লিকে কপি করুন।'
                : 'Handcrafted prompt collections for specific topics — copy with one click.'}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {PROMPT_CATEGORIES.map(cat => (
                <a
                  key={cat.slug}
                  href={`/prompts/${cat.slug}`}
                  className="flex items-center justify-between p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-accent/5 transition-all group"
                >
                  <div className="min-w-0">
                    <p className="font-medium text-foreground text-sm truncate group-hover:text-primary transition-colors">
                      {cat.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {cat.prompts.length} টি প্রম্পট
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary shrink-0 ml-2 transition-colors" />
                </a>
              ))}
            </div>
          </section>

          {/* Additional cross-links */}
          <section className="mt-8 border-t border-border pt-6">
            <div className="flex flex-wrap gap-3">
              <a href="/guide" className="text-sm text-primary hover:underline">
                {language === 'bn' ? '📖 প্রম্পট গাইড পড়ুন' : '📖 Read Prompt Guide'}
              </a>
              <span className="text-muted-foreground">•</span>
              <a href="/playground" className="text-sm text-primary hover:underline">
                {language === 'bn' ? '🧪 প্লেগ্রাউন্ডে টেস্ট করুন' : '🧪 Test in Playground'}
              </a>
              <span className="text-muted-foreground">•</span>
              <a href="/packs" className="text-sm text-primary hover:underline">
                {language === 'bn' ? '📦 প্রম্পট প্যাক দেখুন' : '📦 View Prompt Packs'}
              </a>
              <span className="text-muted-foreground">•</span>
              <a href="/blog" className="text-sm text-primary hover:underline">
                {language === 'bn' ? '📝 ব্লগ পড়ুন' : '📝 Read Blog'}
              </a>
              <span className="text-muted-foreground">•</span>
              <a href="/prompts" className="text-sm text-primary hover:underline">
                {language === 'bn' ? '🎯 সব প্রম্পট ক্যাটাগরি' : '🎯 All Prompt Categories'}
              </a>
              <span className="text-muted-foreground">•</span>
              <a href="/become-creator" className="text-sm text-primary hover:underline">
                {language === 'bn' ? '✍️ ক্রিয়েটর হন' : '✍️ Become a Creator'}
              </a>
              <span className="text-muted-foreground">•</span>
              <a href="/sitemap" className="text-sm text-primary hover:underline">
                {language === 'bn' ? '🗺️ সাইটম্যাপ' : '🗺️ Sitemap'}
              </a>
            </div>
          </section>
        </main>

        <Footer language={language} />
        
        {selectedPrompt && (
          <PlaygroundModal
            open={isPlaygroundOpen}
            onOpenChange={setIsPlaygroundOpen}
            promptData={selectedPrompt}
            language={language}
          />
        )}
      </div>
    </>
  );
};

export default Explore;