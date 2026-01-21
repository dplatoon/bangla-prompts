import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { PromptCard } from "@/components/PromptCard";
import { usePrompts, promptToPromptData } from "@/hooks/usePrompts";
import { Loader2, GraduationCap, BookOpen, Brain, Target } from "lucide-react";

const Shikkha = () => {
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

  // Filter education-related prompts
  const educationPrompts = prompts?.filter(p => 
    p.tags?.some(tag => 
      ['education', 'শিক্ষা', 'study', 'পড়াশোনা', 'student', 'ছাত্র', 'ssc', 'hsc', 'university'].includes(tag.toLowerCase())
    )
  ) || [];

  const seoContent = {
    bn: {
      title: "শিক্ষার জন্য বাংলা AI প্রম্পট — SSC, HSC, বিশ্ববিদ্যালয় | bdprompt.com",
      description: "SSC, HSC বা বিশ্ববিদ্যালয়ের ছাত্রদের জন্য বাংলা AI প্রম্পট। ChatGPT দিয়ে পড়াশোনা সহজ করুন! নোট তৈরি, পরীক্ষার প্রস্তুতি, রিসার্চ সব কিছুর জন্য প্রম্পট।",
      keywords: "শিক্ষা AI প্রম্পট, SSC প্রম্পট, HSC ChatGPT, বাংলা স্টাডি প্রম্পট, ছাত্রদের জন্য AI, বিশ্ববিদ্যালয় প্রম্পট"
    },
    en: {
      title: "Bangla AI Prompts for Education — SSC, HSC, University | bdprompt.com",
      description: "Bangla AI prompts for SSC, HSC, and university students. Make studying easier with ChatGPT! Prompts for notes, exam prep, and research.",
      keywords: "education AI prompts, SSC prompts, HSC ChatGPT, Bangla study prompts, AI for students, university prompts"
    }
  };

  const currentSEO = seoContent[language];

  const text = {
    bn: {
      title: "শিক্ষার জন্য বাংলা AI প্রম্পট",
      subtitle: "SSC, HSC বা বিশ্ববিদ্যালয়ের ছাত্রদের জন্য বাংলা AI প্রম্পট",
      description: "ChatGPT, Claude, এবং Gemini দিয়ে পড়াশোনা সহজ করুন। নোট তৈরি, পরীক্ষার প্রস্তুতি, প্রশ্ন অনুশীলন, এবং রিসার্চের জন্য বিশেষভাবে ডিজাইন করা প্রম্পট।",
      features: [
        { icon: GraduationCap, title: "SSC ও HSC", desc: "বোর্ড পরীক্ষার জন্য প্রম্পট" },
        { icon: BookOpen, title: "নোট তৈরি", desc: "বিষয়ভিত্তিক নোট জেনারেট" },
        { icon: Brain, title: "কনসেপ্ট বোঝা", desc: "জটিল বিষয় সহজ করুন" },
        { icon: Target, title: "পরীক্ষার প্রস্তুতি", desc: "প্র্যাকটিস প্রশ্ন ও উত্তর" }
      ],
      promptsTitle: "শিক্ষামূলক প্রম্পট",
      noPrompts: "শিক্ষামূলক প্রম্পট শীঘ্রই আসছে..."
    },
    en: {
      title: "Bangla AI Prompts for Education",
      subtitle: "AI Prompts for SSC, HSC, and University Students",
      description: "Make studying easier with ChatGPT, Claude, and Gemini. Specially designed prompts for note-taking, exam prep, practice questions, and research.",
      features: [
        { icon: GraduationCap, title: "SSC & HSC", desc: "Prompts for board exams" },
        { icon: BookOpen, title: "Note Making", desc: "Generate subject notes" },
        { icon: Brain, title: "Understanding Concepts", desc: "Simplify complex topics" },
        { icon: Target, title: "Exam Prep", desc: "Practice Q&A" }
      ],
      promptsTitle: "Education Prompts",
      noPrompts: "Education prompts coming soon..."
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
        canonicalUrl="https://bdprompt.com/shikkha"
        breadcrumbs={[
          { name: language === 'bn' ? 'হোম' : 'Home', url: 'https://bdprompt.com/' },
          { name: language === 'bn' ? 'শিক্ষা' : 'Education', url: 'https://bdprompt.com/shikkha' }
        ]}
      />
      <div className="min-h-screen bg-background">
        <Header language={language} onLanguageChange={handleLanguageChange} />
        
        <main className="pt-8 pb-16">
          {/* Hero Section */}
          <section className="bg-gradient-hero py-16 lg:py-24">
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
                    <feature.icon className="w-10 h-10 text-primary mx-auto mb-3" />
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
              ) : educationPrompts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {educationPrompts.map((prompt) => (
                    <PromptCard
                      key={prompt.id}
                      promptData={promptToPromptData(prompt)}
                      language={language}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <GraduationCap className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
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

export default Shikkha;
