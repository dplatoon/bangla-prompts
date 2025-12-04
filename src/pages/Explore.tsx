import { useState, useEffect, useMemo } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PromptCard } from "@/components/PromptCard";
import { PlaygroundModal } from "@/components/PlaygroundModal";
import { SEOHead } from "@/components/SEOHead";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Grid3X3, List, Loader2 } from "lucide-react";
import { usePrompts, useCategories, promptToPromptData } from "@/hooks/usePrompts";
import type { PromptData } from "@/data/mockPrompts";

const Explore = () => {
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("popular");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedPrompt, setSelectedPrompt] = useState<PromptData | null>(null);
  const [isPlaygroundOpen, setIsPlaygroundOpen] = useState(false);

  const { data: prompts, isLoading: promptsLoading } = usePrompts();
  const { data: categories } = useCategories();

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

  return (
    <>
      <SEOHead 
        title={language === 'bn' ? "প্রম্পট এক্সপ্লোর করুন | bdprompt.com" : "Explore Prompts | bdprompt.com"}
        description={language === 'bn' ? "৫০০+ বাংলা AI প্রম্পট এক্সপ্লোর করুন। কন্টেন্ট, ইমেজ, কোড, মার্কেটিং প্রম্পট খুঁজুন।" : "Explore 500+ Bangla AI prompts. Find content, image, code, and marketing prompts."}
        canonicalUrl="https://bdprompt.com/explore"
        language={language}
      />
      
      <div className="min-h-screen bg-background">
        <Header language={language} onLanguageChange={handleLanguageChange} />
        
        <main className="container mx-auto px-4 py-8">
          {/* Page Header */}
          <header className="text-center mb-12">
            <h1 className={`text-4xl lg:text-5xl font-bold text-foreground mb-4 ${language === 'bn' ? 'font-bengali' : ''}`}>
              {currentText.title}
            </h1>
            <p className={`text-xl text-muted-foreground max-w-2xl mx-auto ${language === 'bn' ? 'font-bengali' : ''}`}>
              {currentText.subtitle}
            </p>
          </header>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder={currentText.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-10 ${language === 'bn' ? 'font-bengali' : ''}`}
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className={`w-full md:w-48 ${language === 'bn' ? 'font-bengali' : ''}`}>
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder={currentText.allCategories} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{currentText.allCategories}</SelectItem>
                {categoryList.map(cat => (
                  <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className={`w-full md:w-40 ${language === 'bn' ? 'font-bengali' : ''}`}>
                <SelectValue placeholder={currentText.sortBy} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="popular">{currentText.popular}</SelectItem>
                <SelectItem value="rating">{currentText.rating}</SelectItem>
                <SelectItem value="newest">{currentText.newest}</SelectItem>
                <SelectItem value="free">{currentText.free}</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <Badge variant="secondary" className={language === 'bn' ? 'font-bengali' : ''}>
              {promptsLoading ? currentText.loading : `${filteredPrompts.length} ${currentText.results}`}
            </Badge>
          </div>

          {/* Prompts Grid */}
          {promptsLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : filteredPrompts.length > 0 ? (
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
              : "space-y-4"
            }>
              {filteredPrompts.map((prompt) => (
                <PromptCard 
                  key={prompt.id} 
                  promptData={prompt} 
                  language={language}
                  onTryClick={() => handleTryPrompt(prompt)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className={`text-xl text-muted-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
                {currentText.noResults}
              </p>
            </div>
          )}
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