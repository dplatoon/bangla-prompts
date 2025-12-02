import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HeaderProps {
  language: 'bn' | 'en';
  onLanguageChange: (lang: 'bn' | 'en') => void;
}

export const Header = ({ language, onLanguageChange }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const text = {
    bn: {
      title: "bdprompt.com",
      subtitle: "বাংলা AI প্রম্পট হাব",
      explore: "এক্সপ্লোর",
      playground: "প্লেগ্রাউন্ড",
      packs: "প্যাকস",
      product: "প্রোডাক্ট",
      community: "কমিউনিটি",
      api: "API",
      becomeCreator: "ক্রিয়েটর হন",
      guidelines: "গাইডলাইন",
      support: "সাপোর্ট",
      blog: "ব্লগ",
      search: "প্রম্পট সার্চ করুন...",
    },
    en: {
      title: "bdprompt.com",
      subtitle: "Bangla AI Prompts Hub",
      explore: "Explore",
      playground: "Playground",
      packs: "Packs",
      product: "Product",
      community: "Community",
      api: "API",
      becomeCreator: "Become Creator",
      guidelines: "Guidelines",
      support: "Support",
      blog: "Blog",
      search: "Search prompts...",
    }
  };

  const currentText = text[language];

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition-opacity">
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
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <Link to="/explore">
              <Button variant="ghost" className={language === 'bn' ? 'font-bengali' : ''}>
                {currentText.explore}
              </Button>
            </Link>
            <Link to="/playground">
              <Button variant="ghost" className={language === 'bn' ? 'font-bengali' : ''}>
                {currentText.playground}
              </Button>
            </Link>
            <Link to="/packs">
              <Button variant="ghost" className={language === 'bn' ? 'font-bengali' : ''}>
                {currentText.packs}
              </Button>
            </Link>
            
            {/* Product Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className={language === 'bn' ? 'font-bengali' : ''}>
                  {currentText.product}
                  <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem asChild>
                  <Link to="/product" className={language === 'bn' ? 'font-bengali' : ''}>
                    {language === 'bn' ? 'ওভারভিউ' : 'Overview'}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/api" className={language === 'bn' ? 'font-bengali' : ''}>
                    {currentText.api}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Community Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className={language === 'bn' ? 'font-bengali' : ''}>
                  {currentText.community}
                  <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuItem asChild>
                  <Link to="/community" className={language === 'bn' ? 'font-bengali' : ''}>
                    {currentText.community}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/become-creator" className={language === 'bn' ? 'font-bengali' : ''}>
                    {currentText.becomeCreator}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/guidelines" className={language === 'bn' ? 'font-bengali' : ''}>
                    {currentText.guidelines}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/blog" className={language === 'bn' ? 'font-bengali' : ''}>
                    {currentText.blog}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>

          {/* Search & Language Toggle */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="hidden sm:flex relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder={currentText.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-10 w-48 lg:w-64 ${language === 'bn' ? 'font-bengali' : ''}`}
              />
            </form>

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
                EN
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 py-4 border-t border-border">
            <div className="flex flex-col space-y-2">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="relative mb-2">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder={currentText.search}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`pl-10 ${language === 'bn' ? 'font-bengali' : ''}`}
                />
              </form>
              
              <Link to="/explore" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className={`w-full justify-start ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {currentText.explore}
                </Button>
              </Link>
              <Link to="/playground" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className={`w-full justify-start ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {currentText.playground}
                </Button>
              </Link>
              <Link to="/packs" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className={`w-full justify-start ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {currentText.packs}
                </Button>
              </Link>
              <Link to="/product" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className={`w-full justify-start ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {currentText.product}
                </Button>
              </Link>
              <Link to="/api" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className={`w-full justify-start ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {currentText.api}
                </Button>
              </Link>
              <Link to="/community" onClick={() => setIsMenuOpen(false)}>
                <Button variant="ghost" className={`w-full justify-start ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {currentText.community}
                </Button>
              </Link>
              <Link to="/become-creator" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className={`w-full justify-start ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {currentText.becomeCreator}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
