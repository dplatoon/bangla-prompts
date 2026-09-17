import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PromptCard } from "./PromptCard";
import { PlaygroundModal } from "./PlaygroundModal";
import { usePrompts, useCategories, promptToPromptData } from "@/hooks/usePrompts";
import { Skeleton } from "@/components/ui/skeleton";
import { useLazyLoad } from "@/hooks/useIntersectionObserver";
import type { PromptData } from "@/data/mockPrompts";
import { TrendingUp, Search, Loader2, ArrowRight } from "lucide-react";

interface PromptShowcaseProps {
  language: 'bn' | 'en';
}

export const PromptShowcase = ({ language }: PromptShowcaseProps) => {
  const [selectedPrompt, setSelectedPrompt] = useState<PromptData | null>(null);
  const [isPlaygroundOpen, setIsPlaygroundOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const { data: prompts, isLoading: promptsLoading, isError: promptsError, refetch } = usePrompts();
  const { data: categories } = useCategories();

  const handleTryPrompt = (promptData: PromptData) => {
    setSelectedPrompt(promptData);
    setIsPlaygroundOpen(true);
  };

  const text = {
    bn: {
      title: "জনপ্রিয় প্রম্পটস",
      subtitle: "কমিউনিটির পছন্দের প্রম্পট টেমপ্লেটগুলি দেখুন",
      all: "সব",
      sortOptions: {
        popular: "জনপ্রিয়তা",
        rating: "রেটিং",
        newest: "সর্বশেষ",
        price: "মূল্য"
      },
      searchPlaceholder: "প্রম্পট খুঁজুন...",
      viewAll: "সব প্রম্পট দেখুন",
      trending: "ট্রেন্ডিং",
      sortBy: "সাজান",
      loading: "লোড হচ্ছে...",
      noResults: "কোনো প্রম্পট পাওয়া যায়নি। অন্য কিছু খুঁজে দেখুন।",
      resultsFound: "টি প্রম্পট পাওয়া গেছে",
      tryPlayground: "প্লেগ্রাউন্ডে যান",
      errorTitle: "প্রম্পট লোড করা যায়নি",
      errorBody: "ইন্টারনেট সংযোগ চেক করে আবার চেষ্টা করুন।",
      retry: "পুনরায় চেষ্টা করুন"
    },
    en: {
      title: "Popular Prompts",
      subtitle: "Discover community favorite prompt templates",
      all: "All",
      sortOptions: {
        popular: "Popular",
        rating: "Rating",
        newest: "Newest",
        price: "Price"
      },
      searchPlaceholder: "Search prompts...",
      viewAll: "View All Prompts",
      trending: "Trending",
      sortBy: "Sort by",
      loading: "Loading...",
      noResults: "No prompts found. Try different search terms.",
      resultsFound: "prompts found",
      tryPlayground: "Go to Playground",
      errorTitle: "Couldn't load prompts",
      errorBody: "Check your connection and try again.",
      retry: "Try again"
    }
  };

  const currentText = text[language];

  // Convert prompts to PromptData format and apply filters
  const filteredAndSortedPrompts = useMemo(() => {
    if (!prompts) return [];

    const promptDataList = prompts.map(promptToPromptData);

    return promptDataList
      .filter(prompt => {
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch = !searchQuery || 
          prompt.title.toLowerCase().includes(searchLower) ||
          prompt.titleBn.toLowerCase().includes(searchLower) ||
          prompt.description.toLowerCase().includes(searchLower) ||
          prompt.descriptionBn.toLowerCase().includes(searchLower) ||
          prompt.tags.some(tag => tag.toLowerCase().includes(searchLower));

        const matchesCategory = selectedCategory === 'all' || 
          prompt.category.toLowerCase() === selectedCategory.toLowerCase();
        
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case 'rating':
            return b.rating - a.rating;
          case 'newest':
            return 0; // Already sorted by created_at from API
          case 'price':
            return a.price - b.price;
          case 'popular':
          default:
            return b.usageCount - a.usageCount;
        }
      });
  }, [prompts, searchQuery, selectedCategory, sortBy]);

  // Lazy load prompts in batches for better performance
  const { loadedCount, loaderRef, hasMore } = useLazyLoad(
    filteredAndSortedPrompts.length,
    6
  );
  const visiblePrompts = filteredAndSortedPrompts.slice(0, loadedCount);

  const categoryOptions = useMemo(() => {
    const options: [string, string][] = [['all', currentText.all]];
    if (categories) {
      categories.forEach(cat => {
        options.push([cat.name_en, language === 'bn' ? cat.name_bn : cat.name_en]);
      });
    }
    return options;
  }, [categories, language, currentText.all]);

  const sortOptions = Object.entries(currentText.sortOptions);

  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center space-x-2 bg-accent-light px-4 py-2 rounded-full">
            <TrendingUp className="w-4 h-4 text-accent" />
            <span className={`text-sm font-medium text-accent-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
              {currentText.trending}
            </span>
          </div>
          
          <h2 className={`text-3xl lg:text-5xl font-bold text-foreground ${language === 'bn' ? 'font-bengali text-bengali' : ''}`}>
            {currentText.title}
          </h2>
          <p className={`text-xl text-muted-foreground max-w-2xl mx-auto ${language === 'bn' ? 'font-bengali text-bengali' : ''}`}>
            {currentText.subtitle}
          </p>
        </div>

        {/* Search and Filters */}
        <div className="space-y-6 mb-12">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder={currentText.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-10 ${language === 'bn' ? 'font-bengali' : ''}`}
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-center items-center gap-4">
            <div className="flex flex-wrap justify-center gap-2">
              {categoryOptions.map(([key, label]) => (
                <Button
                  key={key}
                  variant={selectedCategory === key ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(key)}
                  className={`${language === 'bn' ? 'font-bengali' : ''} transition-all`}
                >
                  {label}
                </Button>
              ))}
            </div>

            <div className="flex items-center space-x-2">
              <span className={`text-sm text-muted-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
                {currentText.sortBy}:
              </span>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map(([key, label]) => (
                    <SelectItem key={key} value={key} className={language === 'bn' ? 'font-bengali' : ''}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results Info */}
        {!promptsError && (
          <div className="text-center mb-6">
            <p className={`text-muted-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
              {promptsLoading ? currentText.loading : `${filteredAndSortedPrompts.length} ${currentText.resultsFound}`}
            </p>
          </div>
        )}

        {/* Prompt Grid */}
        {promptsError ? (
          <div className="max-w-md mx-auto text-center border border-border rounded-xl p-8 space-y-3">
            <h3 className={`text-lg font-semibold text-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
              {currentText.errorTitle}
            </h3>
            <p className={`text-muted-foreground ${language === 'bn' ? 'font-bengali text-bengali' : ''}`}>
              {currentText.errorBody}
            </p>
            <Button onClick={() => refetch()} className={language === 'bn' ? 'font-bengali' : ''}>
              {currentText.retry}
            </Button>
          </div>
        ) : promptsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="border border-border rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-5 w-12" />
                </div>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-16" />
                </div>
                <Skeleton className="h-10 w-full" />
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visiblePrompts.length > 0 ? (
                visiblePrompts.map((prompt) => (
                  <PromptCard
                    key={prompt.id}
                    promptData={prompt}
                    language={language}
                    onTryClick={handleTryPrompt}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className={`text-muted-foreground text-lg ${language === 'bn' ? 'font-bengali' : ''}`}>
                    {currentText.noResults}
                  </p>
                </div>
              )}
            </div>
            {/* Lazy load trigger */}
            {hasMore && (
              <div ref={loaderRef} className="flex justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
              </div>
            )}
          </>
        )}

        {/* View All & Playground Links */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-12">
          <Button size="lg" className={`group ${language === 'bn' ? 'font-bengali' : ''}`} asChild>
            <Link to="/explore">
              {currentText.viewAll}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className={language === 'bn' ? 'font-bengali' : ''} asChild>
            <Link to="/playground">
              {currentText.tryPlayground}
            </Link>
          </Button>
        </div>
      </div>

      <PlaygroundModal
        open={isPlaygroundOpen}
        onOpenChange={setIsPlaygroundOpen}
        promptData={selectedPrompt || undefined}
        language={language}
      />
    </section>
  );
};