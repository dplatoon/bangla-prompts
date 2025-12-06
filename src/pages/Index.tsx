import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { FeatureGrid } from "@/components/FeatureGrid";
import { PromptShowcase } from "@/components/PromptShowcase";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { ChatAssistant } from "@/components/ChatAssistant";
import { SEOHead } from "@/components/SEOHead";
import { FAQ } from "@/components/FAQ";

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
      title: "BdPrompt — #1 AI Prompt Generator in Bengali (বাংলা) | ৫০০+ প্রম্পট",
      description: "Generate powerful AI prompts in Bengali for students, writers, businesses & creators. 100% free. Made for Bangladesh & global Bengali speakers. ৫০০+ প্রম্পট এক ক্লিকে কপি করুন।",
      keywords: "বাংলা AI প্রম্পট, Bangla prompts, ChatGPT বাংলা, AI prompts Bangladesh, প্রম্পট টেমপ্লেট, বাংলা কন্টেন্ট, AI কন্টেন্ট রাইটিং, SSC প্রম্পট, HSC ChatGPT"
    },
    en: {
      title: "BdPrompt — #1 AI Prompt Generator in Bengali | 500+ Prompts",
      description: "Generate powerful AI prompts in Bengali for students, writers, businesses & creators. 100% free. Made for Bangladesh & global Bengali speakers.",
      keywords: "Bangla AI prompts, Bengali prompts, ChatGPT Bengali, AI prompts Bangladesh, prompt templates, Bangla content writing, SSC prompts, HSC ChatGPT"
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
          <FAQ language={language} />
          <CTA language={language} />
        </main>
        <Footer language={language} />
        <ChatAssistant />
      </div>
    </>
  );
};

export default Index;
