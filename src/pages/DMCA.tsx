import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const DMCA = () => {
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');
  useEffect(() => { const savedLang = localStorage.getItem('bdprompt-language') as 'bn' | 'en' || 'bn'; setLanguage(savedLang); }, []);
  const handleLanguageChange = (lang: 'bn' | 'en') => { setLanguage(lang); localStorage.setItem('bdprompt-language', lang); };

  return (
    <>
      <SEOHead title="DMCA | bdprompt.com" canonicalUrl="https://bdprompt.com/dmca" language={language} />
      <div className="min-h-screen bg-background">
        <Header language={language} onLanguageChange={handleLanguageChange} />
        <main className="container mx-auto px-4 py-16 max-w-4xl prose prose-lg dark:prose-invert">
          <Breadcrumbs 
            items={[
              { label: 'Legal', labelBn: 'আইনি', href: '/legal' },
              { label: 'DMCA', labelBn: 'DMCA' }
            ]} 
            language={language} 
            className="mb-8 not-prose"
          />
          <h1>DMCA Policy</h1>
          
          <h2>{language === 'bn' ? 'কপিরাইট লঙ্ঘন রিপোর্ট' : 'Copyright Infringement Reports'}</h2>
          <p className={language === 'bn' ? 'font-bengali' : ''}>{language === 'bn' ? 'আপনার কপিরাইটযুক্ত কন্টেন্ট অনুমতি ছাড়া ব্যবহার হলে আমাদের জানান।' : 'If your copyrighted content is used without permission, please notify us.'}</p>
          
          <h2>{language === 'bn' ? 'রিপোর্ট করতে' : 'To File a Report'}</h2>
          <p className={language === 'bn' ? 'font-bengali' : ''}>{language === 'bn' ? 'dmca@bdprompt.com এ ইমেইল করুন নিম্নলিখিত তথ্যসহ:' : 'Email dmca@bdprompt.com with:'}</p>
          <ul className={language === 'bn' ? 'font-bengali' : ''}>
            <li>{language === 'bn' ? 'আপনার যোগাযোগের তথ্য' : 'Your contact information'}</li>
            <li>{language === 'bn' ? 'লঙ্ঘিত কন্টেন্টের বিবরণ' : 'Description of infringed content'}</li>
            <li>{language === 'bn' ? 'লঙ্ঘনকারী কন্টেন্টের URL' : 'URL of infringing content'}</li>
            <li>{language === 'bn' ? 'মালিকানার প্রমাণ' : 'Proof of ownership'}</li>
          </ul>
          
          <h2>{language === 'bn' ? 'প্রতিক্রিয়া সময়' : 'Response Time'}</h2>
          <p className={language === 'bn' ? 'font-bengali' : ''}>{language === 'bn' ? 'আমরা ৪৮ ঘণ্টার মধ্যে সব বৈধ অভিযোগ পর্যালোচনা করি।' : 'We review all valid claims within 48 hours.'}</p>
        </main>
        <Footer language={language} />
      </div>
    </>
  );
};
export default DMCA;
