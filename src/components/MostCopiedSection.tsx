import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PromptCard } from "./PromptCard";
import { PlaygroundModal } from "./PlaygroundModal";
import { usePrompts, promptToPromptData } from "@/hooks/usePrompts";
import type { PromptData } from "@/data/mockPrompts";
import { Copy, ArrowRight, Loader2 } from "lucide-react";

interface MostCopiedSectionProps {
  language: 'bn' | 'en';
}

export const MostCopiedSection = ({ language }: MostCopiedSectionProps) => {
  const [selectedPrompt, setSelectedPrompt] = useState<PromptData | null>(null);
  const [isPlaygroundOpen, setIsPlaygroundOpen] = useState(false);

  const { data: prompts, isLoading } = usePrompts({ limit: 50 });

  const handleTryPrompt = (promptData: PromptData) => {
    setSelectedPrompt(promptData);
    setIsPlaygroundOpen(true);
  };

  const text = {
    bn: {
      title: "সবচেয়ে বেশি কপি হয়েছে",
      subtitle: "ইউজাররা এই প্রম্পটগুলো সবচেয়ে বেশি ব্যবহার করেছেন",
      badge: "টপ কপিড",
      viewAll: "সব প্রম্পট দেখুন",
      copies: "কপি"
    },
    en: {
      title: "Most Copied Prompts",
      subtitle: "These prompts are the most used by our community",
      badge: "Top Copied",
      viewAll: "View All Prompts",
      copies: "copies"
    }
  };

  const currentText = text[language];

  // Get top 6 prompts by copy count
  const mostCopiedPrompts = useMemo(() => {
    if (!prompts) return [];
    
    return prompts
      .map(promptToPromptData)
      .sort((a, b) => b.usageCount - a.usageCount)
      .slice(0, 6);
  }, [prompts]);

  if (isLoading) {
    return (
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </section>
    );
  }

  if (mostCopiedPrompts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-background" aria-labelledby="most-copied-heading">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-10">
          <div className="inline-flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full">
            <Copy className="w-4 h-4 text-primary" />
            <span className={`text-sm font-medium text-primary ${language === 'bn' ? 'font-bengali' : ''}`}>
              {currentText.badge}
            </span>
          </div>
          
          <h2 
            id="most-copied-heading"
            className={`text-3xl lg:text-4xl font-bold text-foreground ${language === 'bn' ? 'font-bengali' : ''}`}
          >
            {currentText.title}
          </h2>
          <p className={`text-lg text-muted-foreground max-w-2xl mx-auto ${language === 'bn' ? 'font-bengali' : ''}`}>
            {currentText.subtitle}
          </p>
        </div>

        {/* Prompts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mostCopiedPrompts.map((prompt, index) => (
            <div key={prompt.id} className="relative">
              {/* Rank Badge */}
              <div className="absolute -top-2 -left-2 z-10 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                #{index + 1}
              </div>
              <PromptCard
                promptData={prompt}
                language={language}
                onTryClick={handleTryPrompt}
              />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-10">
          <Button size="lg" variant="outline" className={`group ${language === 'bn' ? 'font-bengali' : ''}`} asChild>
            <Link to="/explore">
              {currentText.viewAll}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
