import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const Cookies = () => {
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');
  useEffect(() => { const savedLang = localStorage.getItem('bdprompt-language') as 'bn' | 'en' || 'bn'; setLanguage(savedLang); }, []);
  const handleLanguageChange = (lang: 'bn' | 'en') => { setLanguage(lang); localStorage.setItem('bdprompt-language', lang); };

  return (
    <>
      <SEOHead title={language === 'bn' ? "কুকি পলিসি | bdprompt.com" : "Cookie Policy | bdprompt.com"} canonicalUrl="https://bdprompt.com/cookies" language={language} />
      <div className="min-h-screen bg-background">
        <Header language={language} onLanguageChange={handleLanguageChange} />
        <main className="container mx-auto px-4 py-16 max-w-4xl prose prose-lg dark:prose-invert">
          <Breadcrumbs 
            items={[
              { label: 'Legal', labelBn: 'আইনি', href: '/legal' },
              { label: 'Cookie Policy', labelBn: 'কুকি পলিসি' }
            ]} 
            language={language} 
            className="mb-8 not-prose"
          />
          <h1 className={language === 'bn' ? 'font-bengali' : ''}>{language === 'bn' ? 'কুকি পলিসি' : 'Cookie Policy'}</h1>
          
          <h2>{language === 'bn' ? 'কুকি কি?' : 'What are Cookies?'}</h2>
          <p className={language === 'bn' ? 'font-bengali' : ''}>{language === 'bn' ? 'কুকি হল ছোট টেক্সট ফাইল যা আপনার ব্রাউজারে সংরক্ষিত হয়।' : 'Cookies are small text files stored in your browser.'}</p>
          
          <h2>{language === 'bn' ? 'আমরা যে কুকি ব্যবহার করি' : 'Cookies We Use'}</h2>
          <ul className={language === 'bn' ? 'font-bengali' : ''}>
            <li>{language === 'bn' ? 'প্রয়োজনীয় কুকি: সাইট কার্যকারিতার জন্য' : 'Essential: For site functionality'}</li>
            <li>{language === 'bn' ? 'অ্যানালিটিক্স: ব্যবহার বিশ্লেষণের জন্য' : 'Analytics: For usage analysis'}</li>
            <li>{language === 'bn' ? 'পছন্দ: আপনার সেটিংস মনে রাখতে' : 'Preferences: To remember your settings'}</li>
          </ul>
          
          <h2>{language === 'bn' ? 'কুকি ম্যানেজ করুন' : 'Manage Cookies'}</h2>
          <p className={language === 'bn' ? 'font-bengali' : ''}>{language === 'bn' ? 'আপনার ব্রাউজার সেটিংস থেকে কুকি নিয়ন্ত্রণ করতে পারবেন।' : 'You can control cookies from your browser settings.'}</p>
        </main>
        <Footer language={language} />
      </div>
    </>
  );
};
export default Cookies;
