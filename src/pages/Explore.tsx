import { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import { Search, Filter, Grid3X3, List, Loader2 } from "lucide-react";
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
      ? "bdprompt.com-এ ৫০০+ বাংলা AI প্রম্পট এক্সপ্লোর করুন"
      : "Explore 500+ Bangla AI prompts on bdprompt.com",
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

// Lazy-loaded prompt grid component
interface ExploreGridProps {
  prompts: PromptData[];
  viewMode: 'grid' | 'list';
  language: 'bn' | 'en';
  loading: boolean;
  noResultsText: string;
  onTryPrompt: (prompt: PromptData) => void;
}

const ExploreGrid = ({ prompts, viewMode, language, loading, noResultsText, onTryPrompt }: ExploreGridProps) => {
  const { loadedCount, loaderRef, hasMore } = useLazyLoad(prompts.length, 9);
  const visiblePrompts = prompts.slice(0, loadedCount);

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
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');
  const [searchQuery, setSearchQuery] = useState("");
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
      subtitle: "৫০০+ বাংলা AI প্রম্পট থেকে আপনার পছন্দের প্রম্পট খুঁজুন",
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
      subtitle: "Find your perfect prompt from 500+ Bangla AI prompts",
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
  
  const seoTitle = selectedCategory !== "all" && currentCategoryLabel
    ? language === 'bn' 
      ? `${currentCategoryLabel} প্রম্পট | bdprompt.com`
      : `${currentCategoryLabel} Prompts | bdprompt.com`
    : language === 'bn' 
      ? "প্রম্পট এক্সপ্লোর করুন | bdprompt.com" 
      : "Explore Prompts | bdprompt.com";

  const seoDescription = selectedCategory !== "all" && currentCategoryLabel
    ? language === 'bn'
      ? `${currentCategoryLabel} ক্যাটাগরির AI প্রম্পট এক্সপ্লোর করুন। ChatGPT, Claude, Gemini-এর জন্য বাংলা প্রম্পট।`
      : `Explore ${currentCategoryLabel} AI prompts. Bengali prompts for ChatGPT, Claude, Gemini.`
    : language === 'bn' 
      ? "৫০০+ বাংলা AI প্রম্পট এক্সপ্লোর করুন। কন্টেন্ট, ইমেজ, কোড, মার্কেটিং প্রম্পট খুঁজুন।" 
      : "Explore 500+ Bangla AI prompts. Find content, image, code, and marketing prompts.";

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
          {/* Breadcrumb Navigation */}
          <Breadcrumbs
            items={[
              { label: "Explore", labelBn: "এক্সপ্লোর", href: "/explore" }
            ]}
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

          {/* Prompts Grid */}
          <ExploreGrid 
            prompts={filteredPrompts}
            viewMode={viewMode}
            language={language}
            loading={promptsLoading}
            noResultsText={currentText.noResults}
            onTryPrompt={handleTryPrompt}
          />
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