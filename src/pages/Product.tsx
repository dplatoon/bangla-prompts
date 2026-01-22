import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Zap, Globe, Shield, Code, Users, ArrowRight } from "lucide-react";

const Product = () => {
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');
  useEffect(() => { const savedLang = localStorage.getItem('bdprompt-language') as 'bn' | 'en' || 'bn'; setLanguage(savedLang); }, []);
  const handleLanguageChange = (lang: 'bn' | 'en') => { setLanguage(lang); localStorage.setItem('bdprompt-language', lang); };

  const features = [
    { icon: Sparkles, title: language === 'bn' ? '৫০০+ প্রম্পট' : '500+ Prompts', desc: language === 'bn' ? 'বাংলায় তৈরি প্রিমিয়াম প্রম্পট' : 'Premium prompts in Bengali' },
    { icon: Zap, title: language === 'bn' ? 'এক ক্লিকে কপি' : 'One-Click Copy', desc: language === 'bn' ? 'সহজে কপি ও ব্যবহার করুন' : 'Easy copy and use' },
    { icon: Globe, title: language === 'bn' ? 'দ্বিভাষিক' : 'Bilingual', desc: language === 'bn' ? 'বাংলা ও ইংরেজি সাপোর্ট' : 'Bengali & English support' },
    { icon: Shield, title: language === 'bn' ? 'প্লেগ্রাউন্ড' : 'Playground', desc: language === 'bn' ? 'AI দিয়ে টেস্ট করুন' : 'Test with AI' },
    { icon: Code, title: 'API', desc: language === 'bn' ? 'ডেভেলপারদের জন্য' : 'For developers' },
    { icon: Users, title: language === 'bn' ? 'কমিউনিটি' : 'Community', desc: language === 'bn' ? '১০,০০০+ সদস্য' : '10,000+ members' }
  ];

  return (
    <>
      <SEOHead 
        title={language === 'bn' ? "প্রোডাক্ট | bdprompt.com" : "Product | bdprompt.com"} 
        canonicalUrl="https://bdprompt.com/product" 
        language={language}
        breadcrumbs={[
          { name: language === 'bn' ? 'হোম' : 'Home', url: 'https://bdprompt.com/' },
          { name: language === 'bn' ? 'প্রোডাক্ট' : 'Product', url: 'https://bdprompt.com/product' }
        ]}
      />
      <div className="min-h-screen bg-background">
        <Header language={language} onLanguageChange={handleLanguageChange} />
        <main className="container mx-auto px-4 py-8">
          {/* Breadcrumbs */}
          <Breadcrumbs 
            items={[{ label: "Product", labelBn: "প্রোডাক্ট" }]} 
            language={language} 
            className="mb-6" 
          />
          
          <header className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">bdprompt.com</Badge>
            <h1 className={`text-4xl lg:text-5xl font-bold mb-4 ${language === 'bn' ? 'font-bengali' : ''}`}>
              {language === 'bn' ? 'বাংলাদেশের #১ AI প্রম্পট প্ল্যাটফর্ম' : "Bangladesh's #1 AI Prompt Platform"}
            </h1>
            <p className={`text-xl text-muted-foreground max-w-2xl mx-auto mb-8 ${language === 'bn' ? 'font-bengali' : ''}`}>
              {language === 'bn' ? 'বাংলায় AI প্রম্পট খুঁজুন, ব্যবহার করুন এবং তৈরি করুন' : 'Find, use, and create AI prompts in Bengali'}
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/explore"><Button size="lg" className={language === 'bn' ? 'font-bengali' : ''}>{language === 'bn' ? 'এক্সপ্লোর করুন' : 'Explore'}<ArrowRight className="w-4 h-4 ml-2" /></Button></Link>
              <Link to="/playground"><Button size="lg" variant="outline" className={language === 'bn' ? 'font-bengali' : ''}>{language === 'bn' ? 'প্লেগ্রাউন্ড' : 'Playground'}</Button></Link>
            </div>
          </header>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((f, idx) => (
              <Card key={idx}><CardContent className="pt-6 text-center">
                <f.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className={`font-semibold mb-2 ${language === 'bn' ? 'font-bengali' : ''}`}>{f.title}</h3>
                <p className={`text-sm text-muted-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>{f.desc}</p>
              </CardContent></Card>
            ))}
          </div>
        </main>
        <Footer language={language} />
      </div>
    </>
  );
};
export default Product;
