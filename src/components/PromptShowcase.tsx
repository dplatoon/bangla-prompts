import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PromptCard } from "./PromptCard";
import { PlaygroundModal } from "./PlaygroundModal";
import { mockPrompts, type PromptData } from "@/data/mockPrompts";
import { ArrowRight, Filter, TrendingUp, Search } from "lucide-react";

interface PromptShowcaseProps {
  language: 'bn' | 'en';
}

export const PromptShowcase = ({ language }: PromptShowcaseProps) => {
  const [selectedPrompt, setSelectedPrompt] = useState<PromptData | null>(null);
  const [isPlaygroundOpen, setIsPlaygroundOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const handleTryPrompt = (promptData: PromptData) => {
    setSelectedPrompt(promptData);
    setIsPlaygroundOpen(true);
  };
  

  const text = {
    bn: {
      title: "জনপ্রিয় প্রম্পটস",
      subtitle: "কমিউনিটির পছন্দের প্রম্পট টেমপ্লেটগুলি দেখুন",
      categories: {
        all: "সব",
        "Content Writing": "কন্টেন্ট রাইটিং",
        "Social Media": "সোশ্যাল মিডিয়া",
        "E-commerce": "ই-কমার্স",
        "Email Marketing": "ইমেইল মার্কেটিং",
        "Creative Writing": "সৃজনশীল লেখা",
        "Technical Writing": "প্রযুক্তিগত লেখা"
      },
      sortOptions: {
        popular: "জনপ্রিয়তা",
        rating: "রেটিং",
        newest: "সর্বশেষ",
        price: "মূল্য"
      },
      searchPlaceholder: "প্রম্পট খুঁজুন...",
      viewAll: "সব প্রম্পট দেখুন",
      trending: "ট্রেন্ডিং",
      sortBy: "সাজান"
    },
    en: {
      title: "Popular Prompts",
      subtitle: "Discover community favorite prompt templates",
      categories: {
        all: "All",
        "Content Writing": "Content Writing",
        "Social Media": "Social Media",
        "E-commerce": "E-commerce",
        "Email Marketing": "Email Marketing",
        "Creative Writing": "Creative Writing",
        "Technical Writing": "Technical Writing"
      },
      sortOptions: {
        popular: "Popular",
        rating: "Rating",
        newest: "Newest",
        price: "Price"
      },
      searchPlaceholder: "Search prompts...",
      viewAll: "View All Prompts",
      trending: "Trending",
      sortBy: "Sort by"
    }
  };

  const currentText = text[language];

  // Filter and sort prompts
  const filteredAndSortedPrompts = mockPrompts
    .filter(prompt => {
      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = !searchQuery || 
        prompt.title.toLowerCase().includes(searchLower) ||
        (prompt.titleBn && prompt.titleBn.toLowerCase().includes(searchLower)) ||
        prompt.description.toLowerCase().includes(searchLower) ||
        (prompt.descriptionBn && prompt.descriptionBn.toLowerCase().includes(searchLower)) ||
        prompt.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
        (prompt.tagsBn && prompt.tagsBn.some(tag => tag.toLowerCase().includes(searchLower)));

      // Category filter
      const matchesCategory = selectedCategory === 'all' || prompt.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'newest':
          return parseInt(b.id) - parseInt(a.id); // Assuming higher ID = newer
        case 'price':
          return a.price - b.price;
        case 'popular':
        default:
          return b.usageCount - a.usageCount;
      }
    });

  const categories = Object.entries(currentText.categories);
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
          {/* Search Bar */}
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

          {/* Category Filter and Sort */}
          <div className="flex flex-col lg:flex-row justify-center items-center gap-4">
            {/* Category Pills */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map(([key, label]) => (
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

            {/* Sort Dropdown */}
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
        <div className="text-center mb-6">
          <p className={`text-muted-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
            {language === 'bn' 
              ? `${filteredAndSortedPrompts.length}টি প্রম্পট পাওয়া গেছে`
              : `${filteredAndSortedPrompts.length} prompts found`
            }
          </p>
        </div>

        {/* Prompt Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedPrompts.length > 0 ? (
            filteredAndSortedPrompts.map((prompt) => (
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
                {language === 'bn' 
                  ? 'কোনো প্রম্পট পাওয়া যায়নি। অন্য কিছু খুঁজে দেখুন।'
                  : 'No prompts found. Try different search terms.'
                }
              </p>
            </div>
          )}
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