import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PromptCard } from "@/components/PromptCard";
import { ArrowRight, Filter, TrendingUp } from "lucide-react";

interface PromptShowcaseProps {
  language: 'bn' | 'en';
}

export const PromptShowcase = ({ language }: PromptShowcaseProps) => {
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

  // Sample prompt data
  const samplePrompts = [
    {
      id: "1",
      title: "Blog Post Writer",
      titleBn: "ব্লগ পোস্ট রাইটার",
      description: "Create engaging blog posts on any topic with proper structure",
      descriptionBn: "যেকোনো বিষয়ে আকর্ষণীয় ব্লগ পোস্ট লিখুন সঠিক গঠনের সাথে",
      category: language === 'bn' ? 'কন্টেন্ট' : 'Content',
      tags: ["blog", "writing", "SEO"],
      price: 0,
      rating: 4.8,
      usageCount: 1240,
      author: "Rashid Ahmed"
    },
    {
      id: "2", 
      title: "Social Media Caption Generator",
      titleBn: "সোশ্যাল মিডিয়া ক্যাপশন জেনারেটর",
      description: "Generate catchy captions for Facebook, Instagram and Twitter",
      descriptionBn: "ফেসবুক, ইনস্টাগ্রাম ও টুইটারের জন্য আকর্ষণীয় ক্যাপশন তৈরি করুন",
      category: language === 'bn' ? 'মার্কেটিং' : 'Marketing',
      tags: ["social", "marketing", "engagement"],
      price: 5,
      rating: 4.6,
      usageCount: 890,
      author: "Fatima Khan"
    },
    {
      id: "3",
      title: "React Component Builder", 
      titleBn: "রিয়্যাক্ট কম্পোনেন্ট বিল্ডার",
      description: "Generate React components with TypeScript and best practices",
      descriptionBn: "টাইপস্ক্রিপ্ট ও বেস্ট প্র্যাকটিস সহ রিয়্যাক্ট কম্পোনেন্ট তৈরি করুন",
      category: language === 'bn' ? 'কোড' : 'Code',
      tags: ["react", "typescript", "frontend"],
      price: 10,
      rating: 4.9,
      usageCount: 567,
      author: "Shakib Hassan"
    },
    {
      id: "4",
      title: "DALL-E Image Prompt Creator",
      titleBn: "DALL-E ইমেজ প্রম্পট ক্রিয়েটর", 
      description: "Create detailed prompts for AI image generation",
      descriptionBn: "AI ইমেজ জেনারেশনের জন্য বিস্তারিত প্রম্পট তৈরি করুন",
      category: language === 'bn' ? 'ইমেজ' : 'Image',
      tags: ["dall-e", "midjourney", "art"],
      price: 0,
      rating: 4.7,
      usageCount: 2150,
      author: "Nadia Rahman"
    }
  ];

  const categories = Object.entries(currentText.categories);

  const handleCopy = (id: string) => {
    console.log(`Copying prompt ${id}`);
  };

  const handleTry = (id: string) => {
    console.log(`Trying prompt ${id}`);
  };

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
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {samplePrompts.map((prompt) => (
            <PromptCard
              key={prompt.id}
              {...prompt}
              language={language}
              onCopyClick={handleCopy}
              onTryClick={handleTry}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button size="lg" variant="outline" className={`group ${language === 'bn' ? 'font-bengali' : ''}`}>
            {currentText.viewAll}
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  );
};