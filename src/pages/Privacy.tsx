import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";

const Privacy = () => {
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');
  useEffect(() => { const savedLang = localStorage.getItem('bdprompt-language') as 'bn' | 'en' || 'bn'; setLanguage(savedLang); }, []);
  const handleLanguageChange = (lang: 'bn' | 'en') => { setLanguage(lang); localStorage.setItem('bdprompt-language', lang); };

  return (
    <>
      <SEOHead title={language === 'bn' ? "প্রাইভেসি পলিসি | bdprompt.com" : "Privacy Policy | bdprompt.com"} canonicalUrl="https://bdprompt.com/privacy" language={language} />
      <div className="min-h-screen bg-background">
        <Header language={language} onLanguageChange={handleLanguageChange} />
        <main className="container mx-auto px-4 py-16 max-w-4xl prose prose-lg dark:prose-invert">
          <h1 className={language === 'bn' ? 'font-bengali' : ''}>{language === 'bn' ? 'প্রাইভেসি পলিসি' : 'Privacy Policy'}</h1>
          <p className={`text-muted-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>{language === 'bn' ? 'সর্বশেষ আপডেট: ১ ডিসেম্বর, ২০২৪' : 'Last updated: December 1, 2024'}</p>
          
          <h2>{language === 'bn' ? '১. তথ্য সংগ্রহ' : '1. Information Collection'}</h2>
          <p className={language === 'bn' ? 'font-bengali' : ''}>{language === 'bn' ? 'আমরা আপনার নাম, ইমেইল, এবং ব্যবহারের তথ্য সংগ্রহ করি সেবা উন্নত করতে।' : 'We collect your name, email, and usage data to improve our services.'}</p>
          
          <h2>{language === 'bn' ? '২. তথ্য ব্যবহার' : '2. Use of Information'}</h2>
          <p className={language === 'bn' ? 'font-bengali' : ''}>{language === 'bn' ? 'আপনার তথ্য শুধুমাত্র সেবা প্রদান, যোগাযোগ এবং উন্নতির জন্য ব্যবহার করা হয়।' : 'Your information is used only for service delivery, communication, and improvement.'}</p>
          
          <h2>{language === 'bn' ? '৩. তথ্য সুরক্ষা' : '3. Data Security'}</h2>
          <p className={language === 'bn' ? 'font-bengali' : ''}>{language === 'bn' ? 'আমরা SSL এনক্রিপশন এবং সুরক্ষিত সার্ভার ব্যবহার করি।' : 'We use SSL encryption and secure servers to protect your data.'}</p>
          
          <h2>{language === 'bn' ? '৪. যোগাযোগ' : '4. Contact'}</h2>
          <p className={language === 'bn' ? 'font-bengali' : ''}>{language === 'bn' ? 'প্রশ্ন থাকলে privacy@bdprompt.com এ যোগাযোগ করুন।' : 'For questions, contact privacy@bdprompt.com'}</p>
        </main>
        <Footer language={language} />
      </div>
    </>
  );
};
export default Privacy;
