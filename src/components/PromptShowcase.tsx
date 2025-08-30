import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PromptCard } from "./PromptCard";
import { PlaygroundModal } from "./PlaygroundModal";
import { mockPrompts, type PromptData } from "@/data/mockPrompts";
import { ArrowRight, Filter, TrendingUp } from "lucide-react";

interface PromptShowcaseProps {
  language: 'bn' | 'en';
}

export const PromptShowcase = ({ language }: PromptShowcaseProps) => {
  const [selectedPrompt, setSelectedPrompt] = useState<PromptData | null>(null);
  const [isPlaygroundOpen, setIsPlaygroundOpen] = useState(false);

  const handleTryPrompt = (promptData: PromptData) => {
    setSelectedPrompt(promptData);
    setIsPlaygroundOpen(true);
  };
  
  const [selectedCategory, setSelectedCategory] = useState('all');

  const text = {
    bn: {
      title: "জনপ্রিয় প্রম্পটস",
      subtitle: "কমিউনিটির পছন্দের প্রম্পট টেমপ্লেটগুলি দেখুন",
      categories: {
        all: "সব",
        content: "কন্টেন্ট",
        marketing: "মার্কেটিং", 
        code: "কোড",
        image: "ইমেজ"
      },
      viewAll: "সব প্রম্পট দেখুন",
      trending: "ট্রেন্ডিং"
    },
    en: {
      title: "Popular Prompts",
      subtitle: "Discover community favorite prompt templates",
      categories: {
        all: "All",
        content: "Content",
        marketing: "Marketing",
        code: "Code", 
        image: "Image"
      },
      viewAll: "View All Prompts",
      trending: "Trending"
    }
  };

  const currentText = text[language];

  // Use mock data
  const prompts = mockPrompts;

  const categories = Object.entries(currentText.categories);

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

        {/* Category Filter */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-card rounded-lg p-1 border border-border">
            {categories.map(([key, label]) => (
              <Button
                key={key}
                variant={selectedCategory === key ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedCategory(key)}
                className={`${language === 'bn' ? 'font-bengali' : ''} transition-all`}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>

        {/* Prompt Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prompts.map((prompt) => (
            <PromptCard
              key={prompt.id}
              promptData={prompt}
              language={language}
              onTryClick={handleTryPrompt}
            />
          ))}
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