import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { FeatureGrid } from "@/components/FeatureGrid";
import { PromptShowcase } from "@/components/PromptShowcase";
import { MostCopiedSection } from "@/components/MostCopiedSection";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";
import { ChatAssistant } from "@/components/ChatAssistant";
import { SEOHead } from "@/components/SEOHead";
import { buildHomeGraph } from "@/lib/bdprompt-schema";
import { FAQ, getFaqData } from "@/components/FAQ";
import { PWAStatus } from "@/components/PWAStatus";
import { PromptCategoryLinks } from "@/components/PromptCategoryLinks";
import { promptCountLabel, promptCountLabelBn } from "@/config/siteStats";

const Index = () => {
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');

  // Auto-detect language based on user preference, but stay Bengali during
  // prerender so search engines always see the default Bangla content.
  useEffect(() => {
    // Prerender bots (Puppeteer/headless) should keep the bn default.
    if ((navigator as Navigator & { webdriver?: boolean }).webdriver) return;

    const savedLang = localStorage.getItem('bdprompt-language') as 'bn' | 'en';
    if (savedLang) {
      setLanguage(savedLang);
      return;
    }

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

  // Counts are derived from the build-time prompt list (siteStats) so the meta
  // title always matches the hero section — no hardcoded numbers to drift.
  const seoContent = {
    bn: {
      title: `বাংলা AI প্রম্পট — ${promptCountLabelBn} ChatGPT ও Claude প্রম্পট | BdPrompt`,
      description: `বাংলায় AI prompt তৈরি করুন — সম্পূর্ণ বিনামূল্যে। Students, freelancers ও businesses-এর জন্য ${promptCountLabelBn} ready prompts। ChatGPT, Claude ও Gemini সাপোর্টেড।`,
      keywords: "বাংলা AI প্রম্পট, Bangla prompts, ChatGPT বাংলা, শিক্ষা প্রম্পট, ফ্রিল্যান্সিং প্রম্পট, ব্যবসা প্রম্পট, AI prompts Bangladesh"
    },
    en: {
      title: `Bangla AI Prompt Generator — ${promptCountLabel} ChatGPT Prompts | BdPrompt`,
      description: `Generate free Bangla AI prompts for ChatGPT, Claude & Gemini. ${promptCountLabel} ready-to-use prompts for students, freelancers & businesses. No signup needed.`,
      keywords: "Bangla AI prompts, education prompts Bangla, freelancer AI prompts, ChatGPT Bangla, AI prompts Bangladesh, business prompts, content prompts"
    }
  };

  const currentSEO = seoContent[language];
  const homeGraph = buildHomeGraph(
    getFaqData(language).map((item) => ({ q: item.question, a: item.answer }))
  ) as unknown as Record<string, unknown>;

  return (
    <>
      <SEOHead 
        title={currentSEO.title}
        description={currentSEO.description}
        keywords={currentSEO.keywords}
        language={language}
        canonicalUrl="https://bdprompt.com/"
        ogImage="https://bdprompt.com/og-image.png"
        graph={homeGraph}
      />
      <div className="min-h-screen bg-background">
        <Header language={language} onLanguageChange={handleLanguageChange} />
        <main role="main" id="main-content">
          <Hero language={language} />
          <FeatureGrid language={language} />
          <PromptCategoryLinks language={language} />
          <MostCopiedSection language={language} />
          <PromptShowcase language={language} />
          <FAQ language={language} />
          <CTA language={language} />
        </main>
        <Footer language={language} />
        <ChatAssistant />
        <PWAStatus language={language} />
      </div>
    </>
  );
};

export default Index;
