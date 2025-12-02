import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { FeatureGrid } from "@/components/FeatureGrid";
import { PromptShowcase } from "@/components/PromptShowcase";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { ChatAssistant } from "@/components/ChatAssistant";
import { SEOHead } from "@/components/SEOHead";

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

  const seoContent = {
    bn: {
      title: "bdprompt.com — সবচেয়ে বড় বাংলা AI প্রম্পট হাব | ৫০০+ প্রম্পট",
      description: "বাংলা প্রম্পট টেমপ্লেট — কন্টেন্ট, ইমেজ, কোড, মার্কেটিং। ৫০০+ AI প্রম্পট এক ক্লিকে কপি করে ChatGPT, Claude, Gemini-তে প্রয়োগ করুন। বাংলাদেশের #১ AI প্রম্পট প্ল্যাটফর্ম।",
      keywords: "বাংলা AI প্রম্পট, Bangla prompts, ChatGPT বাংলা, AI prompts Bangladesh, প্রম্পট টেমপ্লেট, বাংলা কন্টেন্ট, AI কন্টেন্ট রাইটিং"
    },
    en: {
      title: "bdprompt.com — Largest Bangla AI Prompt Hub | 500+ Prompts",
      description: "Bangla prompt templates — content, image, code, marketing. Copy 500+ AI prompts with one click and use in ChatGPT, Claude, Gemini. Bangladesh's #1 AI prompt platform.",
      keywords: "Bangla AI prompts, Bengali prompts, ChatGPT Bengali, AI prompts Bangladesh, prompt templates, Bangla content writing"
    }
  };

  const currentSEO = seoContent[language];

  return (
    <>
      <SEOHead 
        title={currentSEO.title}
        description={currentSEO.description}
        keywords={currentSEO.keywords}
        language={language}
        canonicalUrl="https://bdprompt.com/"
        ogImage="https://bdprompt.com/og-image.png"
      />
      <div className="min-h-screen bg-background">
        <Header language={language} onLanguageChange={handleLanguageChange} />
        <main role="main" id="main-content">
          <Hero language={language} />
          <FeatureGrid language={language} />
          <PromptShowcase language={language} />
          <CTA language={language} />
        </main>
        <Footer language={language} />
        <ChatAssistant />
      </div>
    </>
  );
};

export default Index;
