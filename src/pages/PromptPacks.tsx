import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Package, Sparkles, Zap, Crown } from "lucide-react";

const PromptPacks = () => {
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');

  useEffect(() => {
    const savedLang = localStorage.getItem('bdprompt-language') as 'bn' | 'en' || 'bn';
    setLanguage(savedLang);
  }, []);

  const handleLanguageChange = (lang: 'bn' | 'en') => {
    setLanguage(lang);
    localStorage.setItem('bdprompt-language', lang);
  };

  const packs = {
    bn: [
      {
        id: 1,
        name: "স্টার্টার প্যাক",
        description: "নতুনদের জন্য আদর্শ - বেসিক প্রম্পট সংগ্রহ",
        price: 0,
        originalPrice: 0,
        prompts: 25,
        icon: Package,
        features: ["২৫টি বেসিক প্রম্পট", "কন্টেন্ট ক্যাটাগরি", "বাংলা ও ইংরেজি", "ফ্রি আপডেট"],
        popular: false
      },
      {
        id: 2,
        name: "প্রো প্যাক",
        description: "প্রফেশনালদের জন্য - সম্পূর্ণ প্রম্পট সংগ্রহ",
        price: 499,
        originalPrice: 999,
        prompts: 100,
        icon: Zap,
        features: ["১০০+ প্রিমিয়াম প্রম্পট", "সব ক্যাটাগরি অ্যাক্সেস", "এক্সক্লুসিভ টেমপ্লেট", "প্রায়োরিটি সাপোর্ট", "মাসিক নতুন প্রম্পট"],
        popular: true
      },
      {
        id: 3,
        name: "এন্টারপ্রাইজ প্যাক",
        description: "টিম ও ব্যবসার জন্য - আনলিমিটেড অ্যাক্সেস",
        price: 1999,
        originalPrice: 3999,
        prompts: 500,
        icon: Crown,
        features: ["৫০০+ প্রম্পট", "টিম অ্যাক্সেস", "কাস্টম প্রম্পট রিকোয়েস্ট", "API অ্যাক্সেস", "ডেডিকেটেড সাপোর্ট", "হোয়াইট লেবেল অপশন"],
        popular: false
      }
    ],
    en: [
      {
        id: 1,
        name: "Starter Pack",
        description: "Perfect for beginners - Basic prompt collection",
        price: 0,
        originalPrice: 0,
        prompts: 25,
        icon: Package,
        features: ["25 Basic Prompts", "Content Category", "Bengali & English", "Free Updates"],
        popular: false
      },
      {
        id: 2,
        name: "Pro Pack",
        description: "For professionals - Complete prompt collection",
        price: 499,
        originalPrice: 999,
        prompts: 100,
        icon: Zap,
        features: ["100+ Premium Prompts", "All Category Access", "Exclusive Templates", "Priority Support", "Monthly New Prompts"],
        popular: true
      },
      {
        id: 3,
        name: "Enterprise Pack",
        description: "For teams & businesses - Unlimited access",
        price: 1999,
        originalPrice: 3999,
        prompts: 500,
        icon: Crown,
        features: ["500+ Prompts", "Team Access", "Custom Prompt Requests", "API Access", "Dedicated Support", "White Label Option"],
        popular: false
      }
    ]
  };

  const currentPacks = packs[language];

  const text = {
    bn: {
      title: "প্রম্পট প্যাক",
      subtitle: "আপনার প্রয়োজন অনুযায়ী সেরা প্রম্পট প্যাক বেছে নিন",
      prompts: "টি প্রম্পট",
      getStarted: "শুরু করুন",
      popular: "জনপ্রিয়",
      free: "ফ্রি",
      save: "সেভ করুন"
    },
    en: {
      title: "Prompt Packs",
      subtitle: "Choose the best prompt pack according to your needs",
      prompts: "Prompts",
      getStarted: "Get Started",
      popular: "Popular",
      free: "Free",
      save: "Save"
    }
  };

  const currentText = text[language];

  return (
    <>
      <SEOHead 
        title={language === 'bn' ? "প্রম্পট প্যাক | bdprompt.com" : "Prompt Packs | bdprompt.com"}
        description={language === 'bn' ? "প্রিমিয়াম প্রম্পট প্যাক কিনুন। স্টার্টার, প্রো এবং এন্টারপ্রাইজ প্যাক উপলব্ধ।" : "Buy premium prompt packs. Starter, Pro, and Enterprise packs available."}
        canonicalUrl="https://bdprompt.com/packs"
        language={language}
      />
      
      <div className="min-h-screen bg-background">
        <Header language={language} onLanguageChange={handleLanguageChange} />
        
        <main className="container mx-auto px-4 py-16">
          {/* Breadcrumb Navigation */}
          <Breadcrumbs
            items={[
              { label: "Prompt Packs", labelBn: "প্রম্পট প্যাক", href: "/packs" }
            ]}
            language={language}
            className="mb-8"
          />

          {/* Page Header */}
          <header className="text-center mb-16">
            <h1 className={`text-4xl lg:text-5xl font-bold text-foreground mb-4 ${language === 'bn' ? 'font-bengali' : ''}`}>
              {currentText.title}
            </h1>
            <p className={`text-xl text-muted-foreground max-w-2xl mx-auto ${language === 'bn' ? 'font-bengali' : ''}`}>
              {currentText.subtitle}
            </p>
          </header>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {currentPacks.map((pack) => {
              const Icon = pack.icon;
              return (
                <Card 
                  key={pack.id} 
                  className={`relative ${pack.popular ? 'border-primary shadow-lg scale-105' : ''}`}
                >
                  {pack.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary">
                      <Sparkles className="w-3 h-3 mr-1" />
                      {currentText.popular}
                    </Badge>
                  )}
                  <CardHeader className="text-center">
                    <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle className={`text-2xl ${language === 'bn' ? 'font-bengali' : ''}`}>
                      {pack.name}
                    </CardTitle>
                    <CardDescription className={language === 'bn' ? 'font-bengali' : ''}>
                      {pack.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="mb-6">
                      {pack.price === 0 ? (
                        <span className={`text-4xl font-bold text-primary ${language === 'bn' ? 'font-bengali' : ''}`}>
                          {currentText.free}
                        </span>
                      ) : (
                        <div>
                          <span className="text-4xl font-bold text-primary">৳{pack.price}</span>
                          {pack.originalPrice > pack.price && (
                            <span className="text-lg text-muted-foreground line-through ml-2">
                              ৳{pack.originalPrice}
                            </span>
                          )}
                        </div>
                      )}
                      <p className={`text-sm text-muted-foreground mt-2 ${language === 'bn' ? 'font-bengali' : ''}`}>
                        {pack.prompts} {currentText.prompts}
                      </p>
                    </div>
                    <ul className="space-y-3 text-left">
                      {pack.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <Check className="w-4 h-4 text-primary flex-shrink-0" />
                          <span className={`text-sm ${language === 'bn' ? 'font-bengali' : ''}`}>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className={`w-full ${language === 'bn' ? 'font-bengali' : ''}`}
                      variant={pack.popular ? 'default' : 'outline'}
                    >
                      {currentText.getStarted}
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </main>

        <Footer language={language} />
      </div>
    </>
  );
};

export default PromptPacks;
