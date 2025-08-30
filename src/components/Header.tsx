import { useState } from "react";
import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  language: 'bn' | 'en';
  onLanguageChange: (lang: 'bn' | 'en') => void;
}

export const Header = ({ language, onLanguageChange }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const text = {
    bn: {
      title: "bdprompt.com",
      subtitle: "বাংলা AI প্রম্পট হাব",
      explore: "প্রম্পট এক্সপ্লোর করুন",
      submit: "প্রম্পট জমা দিন",
      playground: "প্লেগ্রাউন্ড",
      search: "প্রম্পট সার্চ করুন...",
    },
    en: {
      title: "bdprompt.com",
      subtitle: "Bangla AI Prompts Hub",
      explore: "Explore Prompts",
      submit: "Submit Prompt",
      playground: "Playground",
      search: "Search prompts...",
    }
  };

  const currentText = text[language];

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">B</span>
            </div>
            <div>
              <h1 className={`font-bold text-lg text-primary ${language === 'bn' ? 'font-bengali' : ''}`}>
                {currentText.title}
              </h1>
              <p className={`text-xs text-muted-foreground ${language === 'bn' ? 'font-bengali text-bengali' : ''}`}>
                {currentText.subtitle}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Button variant="ghost" className={language === 'bn' ? 'font-bengali' : ''}>
              {currentText.explore}
            </Button>
            <Button variant="ghost" className={language === 'bn' ? 'font-bengali' : ''}>
              {currentText.playground}
            </Button>
            <Button variant="outline" className={language === 'bn' ? 'font-bengali' : ''}>
              {currentText.submit}
            </Button>
          </nav>

          {/* Search & Language Toggle */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="hidden sm:flex relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder={currentText.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-10 w-64 ${language === 'bn' ? 'font-bengali' : ''}`}
              />
            </div>

            {/* Language Toggle */}
            <div className="flex bg-muted rounded-lg p-1">
              <Button
                variant={language === 'bn' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onLanguageChange('bn')}
                className="font-bengali text-xs"
              >
                বাংলা
              </Button>
              <Button
                variant={language === 'en' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onLanguageChange('en')}
                className="text-xs"
              >
                English
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-border">
            <div className="flex flex-col space-y-3">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder={currentText.search}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`pl-10 ${language === 'bn' ? 'font-bengali' : ''}`}
                />
              </div>
              
              <Button variant="ghost" className={`justify-start ${language === 'bn' ? 'font-bengali' : ''}`}>
                {currentText.explore}
              </Button>
              <Button variant="ghost" className={`justify-start ${language === 'bn' ? 'font-bengali' : ''}`}>
                {currentText.playground}
              </Button>
              <Button variant="outline" className={`justify-start ${language === 'bn' ? 'font-bengali' : ''}`}>
                {currentText.submit}
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};