import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Hero, homepageQuickLinks } from "@/components/Hero";
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
import { getPageMetadata } from "@/config/pageMetadata";

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

  const currentSEO = getPageMetadata('/', language);
  const homeGraph = buildHomeGraph(
    getFaqData(language).map((item) => ({ q: item.question, a: item.answer })),
    {
      title: currentSEO.title,
      description: currentSEO.description,
      featuredPages: homepageQuickLinks.bn.map((link) => ({
        name: link.label,
        description: link.desc,
        url: `https://bdprompt.com${link.to}`,
      })),
    }
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
