import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { PromptCard } from "@/components/PromptCard";
import { usePrompts, promptToPromptData } from "@/hooks/usePrompts";
import { Loader2, Feather, BookOpen, Pen, Heart } from "lucide-react";

const Kobita = () => {
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');
  const { data: prompts, isLoading } = usePrompts();

  useEffect(() => {
    const savedLang = localStorage.getItem('bdprompt-language') as 'bn' | 'en';
    if (savedLang) setLanguage(savedLang);
  }, []);

  const handleLanguageChange = (lang: 'bn' | 'en') => {
    setLanguage(lang);
    localStorage.setItem('bdprompt-language', lang);
  };

  // Filter creative writing prompts
  const creativePrompts = prompts?.filter(p => 
    p.tags?.some(tag => 
      ['poetry', 'কবিতা', 'creative', 'সৃজনশীল', 'story', 'গল্প', 'writing', 'লেখা', 'literature', 'সাহিত্য'].includes(tag.toLowerCase())
    )
  ) || [];

  const seoContent = {
    bn: {
      title: "বাংলা কবিতা ও গল্প লেখার AI প্রম্পট | bdprompt.com",
      description: "রবীন্দ্রনাথ বা জীবনানন্দের মতো কবিতা লেখার জন্য AI প্রম্পট। বাংলা সাহিত্য সৃষ্টি করুন! কবিতা, গল্প, উপন্যাস, এবং সৃজনশীল লেখার জন্য প্রম্পট।",
      keywords: "বাংলা কবিতা AI, গল্প লেখার প্রম্পট, সৃজনশীল লেখা, বাংলা সাহিত্য AI, কবিতা জেনারেটর, ChatGPT কবিতা"
    },
    en: {
      title: "Bengali Poetry & Story Writing AI Prompts | bdprompt.com",
      description: "AI prompts to write poetry like Rabindranath or Jibanananda. Create Bengali literature! Prompts for poetry, stories, novels, and creative writing.",
      keywords: "Bengali poetry AI, story writing prompts, creative writing, Bengali literature AI, poetry generator, ChatGPT poetry"
    }
  };

  const currentSEO = seoContent[language];

  const text = {
    bn: {
      title: "বাংলা কবিতা ও গল্প লেখার AI প্রম্পট",
      subtitle: "রবীন্দ্রনাথ বা জীবনানন্দের মতো কবিতা লেখার জন্য AI প্রম্পট",
      description: "বাংলা সাহিত্য সৃষ্টি করুন! AI এর সাহায্যে কবিতা, ছোটগল্প, উপন্যাস, এবং সৃজনশীল লেখা তৈরি করুন। ঈদ, পহেলা বৈশাখ, দুর্গাপূজার থিমে লেখা।",
      features: [
        { icon: Feather, title: "কবিতা", desc: "ছন্দ ও মুক্তছন্দ" },
        { icon: BookOpen, title: "গল্প", desc: "ছোটগল্প ও উপন্যাস" },
        { icon: Pen, title: "প্রবন্ধ", desc: "সৃজনশীল প্রবন্ধ" },
        { icon: Heart, title: "ভাব-প্রকাশ", desc: "আবেগময় লেখা" }
      ],
      promptsTitle: "সৃজনশীল লেখার প্রম্পট",
      noPrompts: "সৃজনশীল প্রম্পট শীঘ্রই আসছে..."
    },
    en: {
      title: "Bengali Poetry & Story Writing AI Prompts",
      subtitle: "AI Prompts to Write Poetry Like Rabindranath or Jibanananda",
      description: "Create Bengali literature! Generate poetry, short stories, novels, and creative writing with AI. Themes for Eid, Pohela Boishakh, Durga Puja.",
      features: [
        { icon: Feather, title: "Poetry", desc: "Rhymed & free verse" },
        { icon: BookOpen, title: "Stories", desc: "Short stories & novels" },
        { icon: Pen, title: "Essays", desc: "Creative essays" },
        { icon: Heart, title: "Expression", desc: "Emotional writing" }
      ],
      promptsTitle: "Creative Writing Prompts",
      noPrompts: "Creative prompts coming soon..."
    }
  };

  const currentText = text[language];

  return (
    <>
      <SEOHead
        title={currentSEO.title}
        description={currentSEO.description}
        keywords={currentSEO.keywords}
        language={language}
        canonicalUrl="https://bdprompt.com/kobita"
        breadcrumbs={[
          { name: language === 'bn' ? 'হোম' : 'Home', url: 'https://bdprompt.com/' },
          { name: language === 'bn' ? 'কবিতা ও গল্প' : 'Poetry & Stories', url: 'https://bdprompt.com/kobita' }
        ]}
      />
      <div className="min-h-screen bg-background">
        <Header language={language} onLanguageChange={handleLanguageChange} />
        
        <main className="pt-8 pb-16">
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-purple-900 via-primary to-purple-800 py-16 lg:py-24">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className={`text-4xl lg:text-5xl font-bold text-primary-foreground mb-4 ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {currentText.title}
                </h1>
                <p className={`text-xl text-primary-foreground/90 mb-6 ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {currentText.subtitle}
                </p>
                <p className={`text-primary-foreground/80 max-w-2xl mx-auto ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {currentText.description}
                </p>
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="py-12 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {currentText.features.map((feature, index) => (
                  <div key={index} className="bg-card rounded-xl p-6 text-center border border-border/50">
                    <feature.icon className="w-10 h-10 text-purple-600 mx-auto mb-3" />
                    <h3 className={`font-semibold text-foreground mb-1 ${language === 'bn' ? 'font-bengali' : ''}`}>
                      {feature.title}
                    </h3>
                    <p className={`text-sm text-muted-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Prompts Grid */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <h2 className={`text-2xl lg:text-3xl font-bold text-foreground mb-8 ${language === 'bn' ? 'font-bengali' : ''}`}>
                {currentText.promptsTitle}
              </h2>

              {isLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : creativePrompts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {creativePrompts.map((prompt) => (
                    <PromptCard
                      key={prompt.id}
                      promptData={promptToPromptData(prompt)}
                      language={language}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Feather className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className={`text-muted-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
                    {currentText.noPrompts}
                  </p>
                </div>
              )}
            </div>
          </section>
        </main>

        <Footer language={language} />
      </div>
    </>
  );
};

export default Kobita;
