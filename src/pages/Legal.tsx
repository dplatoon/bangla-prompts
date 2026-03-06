import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Shield, Cookie, AlertTriangle } from "lucide-react";

const Legal = () => {
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');
  useEffect(() => {
    const savedLang = localStorage.getItem('bdprompt-language') as 'bn' | 'en' || 'bn';
    setLanguage(savedLang);
  }, []);
  const handleLanguageChange = (lang: 'bn' | 'en') => {
    setLanguage(lang);
    localStorage.setItem('bdprompt-language', lang);
  };

  const pages = [
    { icon: Shield, title: language === 'bn' ? 'প্রাইভেসি পলিসি' : 'Privacy Policy', desc: language === 'bn' ? 'আপনার ডেটা কিভাবে সুরক্ষিত রাখি' : 'How we protect your data', link: '/privacy' },
    { icon: FileText, title: language === 'bn' ? 'সেবার শর্তাবলী' : 'Terms of Service', desc: language === 'bn' ? 'আমাদের সেবা ব্যবহারের নিয়মাবলী' : 'Rules for using our service', link: '/terms' },
    { icon: Cookie, title: language === 'bn' ? 'কুকি পলিসি' : 'Cookie Policy', desc: language === 'bn' ? 'কুকি ব্যবহার সম্পর্কে তথ্য' : 'Information about cookie usage', link: '/cookies' },
    { icon: AlertTriangle, title: 'DMCA', desc: language === 'bn' ? 'কপিরাইট লঙ্ঘন রিপোর্ট' : 'Copyright infringement reports', link: '/dmca' }
  ];

  return (
    <>
      <SEOHead title={language === 'bn' ? "আইনি তথ্য | Legal | BdPrompt" : "Legal Information | BdPrompt"} canonicalUrl="https://bdprompt.com/legal" language={language} />
      <div className="min-h-screen bg-background">
        <Header language={language} onLanguageChange={handleLanguageChange} />
        <main className="container mx-auto px-4 py-16 max-w-4xl">
          <Breadcrumbs 
            items={[{ label: 'Legal', labelBn: 'আইনি' }]} 
            language={language} 
            className="mb-8"
          />
          <h1 className={`text-4xl font-bold text-center mb-12 ${language === 'bn' ? 'font-bengali' : ''}`}>{language === 'bn' ? 'আইনি তথ্য' : 'Legal Information'}</h1>
          <div className="grid md:grid-cols-2 gap-6">
            {pages.map((page, idx) => (
              <Link key={idx} to={page.link}>
                <Card className="hover:shadow-lg transition-shadow h-full">
                  <CardHeader>
                    <page.icon className="w-8 h-8 text-primary mb-2" />
                    <CardTitle className={language === 'bn' ? 'font-bengali' : ''}>{page.title}</CardTitle>
                    <CardDescription className={language === 'bn' ? 'font-bengali' : ''}>{page.desc}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </main>
        <Footer language={language} />
      </div>
    </>
  );
};
export default Legal;
