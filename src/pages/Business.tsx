import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PromptCard } from "@/components/PromptCard";
import { usePrompts, promptToPromptData } from "@/hooks/usePrompts";
import { Loader2, TrendingUp, MessageSquare, ShoppingBag, Users } from "lucide-react";

const Business = () => {
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

  // Filter business prompts
  const businessPrompts = prompts?.filter(p => 
    p.tags?.some(tag => 
      ['business', 'ব্যবসা', 'marketing', 'মার্কেটিং', 'ecommerce', 'ইকমার্স', 'sales', 'বিক্রয়'].includes(tag.toLowerCase())
    )
  ) || [];

  const seoContent = {
    bn: {
      title: "বাংলা ব্যবসায়িক AI প্রম্পট — মার্কেটিং, চ্যাটবট, কাস্টমার সাপোর্ট | bdprompt.com",
      description: "বাংলাদেশি ব্যবসার জন্য AI প্রম্পট: ফেসবুক মেসেঞ্জার বট, মার্কেটিং কপি, লোকাল কনটেন্ট! ই-কমার্স, সোশ্যাল মিডিয়া, এবং কাস্টমার সার্ভিসের জন্য।",
      keywords: "ব্যবসায়িক AI প্রম্পট, মার্কেটিং প্রম্পট বাংলা, ফেসবুক মার্কেটিং, মেসেঞ্জার বট, বাংলাদেশ ই-কমার্স, ChatGPT ব্যবসা"
    },
    en: {
      title: "Bengali Business AI Prompts — Marketing, Chatbot, Customer Support | bdprompt.com",
      description: "AI prompts for Bangladeshi businesses: Facebook Messenger bots, marketing copy, local content! For e-commerce, social media, and customer service.",
      keywords: "business AI prompts, Bengali marketing prompts, Facebook marketing, Messenger bot, Bangladesh ecommerce, ChatGPT business"
    }
  };

  const currentSEO = seoContent[language];

  const text = {
    bn: {
      title: "বাংলা ব্যবসায়িক AI প্রম্পট",
      subtitle: "মার্কেটিং, চ্যাটবট, কাস্টমার সাপোর্টের জন্য প্রম্পট",
      description: "বাংলাদেশি ব্যবসার জন্য AI প্রম্পট। ফেসবুক পোস্ট, মেসেঞ্জার বট স্ক্রিপ্ট, প্রোডাক্ট ডেসক্রিপশন, কাস্টমার সাপোর্ট রেসপন্স এবং মার্কেটিং ক্যাম্পেইন তৈরি করুন।",
      features: [
        { icon: TrendingUp, title: "মার্কেটিং", desc: "সোশ্যাল মিডিয়া কন্টেন্ট" },
        { icon: MessageSquare, title: "চ্যাটবট", desc: "মেসেঞ্জার বট স্ক্রিপ্ট" },
        { icon: ShoppingBag, title: "ই-কমার্স", desc: "প্রোডাক্ট ডেসক্রিপশন" },
        { icon: Users, title: "কাস্টমার সার্ভিস", desc: "সাপোর্ট রেসপন্স" }
      ],
      promptsTitle: "ব্যবসায়িক প্রম্পট",
      noPrompts: "ব্যবসায়িক প্রম্পট শীঘ্রই আসছে..."
    },
    en: {
      title: "Bengali Business AI Prompts",
      subtitle: "Prompts for Marketing, Chatbots, Customer Support",
      description: "AI prompts for Bangladeshi businesses. Create Facebook posts, Messenger bot scripts, product descriptions, customer support responses, and marketing campaigns.",
      features: [
        { icon: TrendingUp, title: "Marketing", desc: "Social media content" },
        { icon: MessageSquare, title: "Chatbots", desc: "Messenger bot scripts" },
        { icon: ShoppingBag, title: "E-commerce", desc: "Product descriptions" },
        { icon: Users, title: "Customer Service", desc: "Support responses" }
      ],
      promptsTitle: "Business Prompts",
      noPrompts: "Business prompts coming soon..."
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
        canonicalUrl="https://bdprompt.com/business"
        breadcrumbs={[
          { name: language === 'bn' ? 'হোম' : 'Home', url: 'https://bdprompt.com/' },
          { name: language === 'bn' ? 'ব্যবসা' : 'Business', url: 'https://bdprompt.com/business' }
        ]}
      />
      <div className="min-h-screen bg-background">
        <Header language={language} onLanguageChange={handleLanguageChange} />
        
        <main className="pt-8 pb-16">
          <div className="container mx-auto px-4 mb-4">
            <Breadcrumbs 
              items={[{ label: 'Business', labelBn: 'ব্যবসা' }]} 
              language={language}
            />
          </div>
          
          {/* Hero Section */}
          <section className="bg-gradient-to-br from-emerald-900 via-primary to-teal-800 py-16 lg:py-24">
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
                    <feature.icon className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
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
              ) : businessPrompts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {businessPrompts.map((prompt) => (
                    <PromptCard
                      key={prompt.id}
                      promptData={promptToPromptData(prompt)}
                      language={language}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <TrendingUp className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
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

export default Business;
