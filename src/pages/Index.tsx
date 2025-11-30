import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { FeatureGrid } from "@/components/FeatureGrid";
import { PromptShowcase } from "@/components/PromptShowcase";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { ChatAssistant } from "@/components/ChatAssistant";

const Index = () => {
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');

  // Auto-detect language based on user location (simplified)
  useEffect(() => {
    // Check localStorage first
    const savedLang = localStorage.getItem('bdprompt-language') as 'bn' | 'en';
    if (savedLang) {
      setLanguage(savedLang);
      return;
    }

    // In a real app, you'd use IP geolocation or browser language
    // For now, defaulting to Bengali for BD users
    const browserLang = navigator.language;
    if (browserLang.includes('bn') || browserLang.includes('BD')) {
      setLanguage('bn');
    } else {
      setLanguage('en');
    }
  }, []);

  const handleLanguageChange = (lang: 'bn' | 'en') => {
    setLanguage(lang);
    localStorage.setItem('bdprompt-language', lang);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header language={language} onLanguageChange={handleLanguageChange} />
      <main>
        <Hero language={language} />
        <FeatureGrid language={language} />
        <PromptShowcase language={language} />
        <CTA language={language} />
      </main>
      <Footer language={language} />
      <ChatAssistant />
    </div>
  );
};

export default Index;
