import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const Terms = () => {
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');
  useEffect(() => { const savedLang = localStorage.getItem('bdprompt-language') as 'bn' | 'en' || 'bn'; setLanguage(savedLang); }, []);
  const handleLanguageChange = (lang: 'bn' | 'en') => { setLanguage(lang); localStorage.setItem('bdprompt-language', lang); };

  return (
    <>
      <SEOHead title={language === 'bn' ? "টার্মস অফ সার্ভিস | ব্যবহারের শর্ত | BdPrompt" : "Terms of Service | Usage Terms | BdPrompt"} canonicalUrl="https://bdprompt.com/terms" language={language} />
      <div className="min-h-screen bg-background">
        <Header language={language} onLanguageChange={handleLanguageChange} />
        <main className="container mx-auto px-4 py-16 max-w-4xl prose prose-lg dark:prose-invert">
          <Breadcrumbs 
            items={[
              { label: 'Legal', labelBn: 'আইনি', href: '/legal' },
              { label: 'Terms of Service', labelBn: 'সেবার শর্তাবলী' }
            ]} 
            language={language} 
            className="mb-8 not-prose"
          />
          <h1 className={language === 'bn' ? 'font-bengali' : ''}>{language === 'bn' ? 'সেবার শর্তাবলী' : 'Terms of Service'}</h1>
          <p className={`text-muted-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>{language === 'bn' ? 'সর্বশেষ আপডেট: ১ ডিসেম্বর, ২০২৪' : 'Last updated: December 1, 2024'}</p>
          
          <h2>{language === 'bn' ? '১. সেবা গ্রহণযোগ্যতা' : '1. Acceptance'}</h2>
          <p className={language === 'bn' ? 'font-bengali' : ''}>{language === 'bn' ? 'bdprompt.com ব্যবহার করে আপনি এই শর্তাবলী মেনে নিচ্ছেন।' : 'By using bdprompt.com, you agree to these terms.'}</p>
          
          <h2>{language === 'bn' ? '২. ব্যবহারের নিয়ম' : '2. Usage Rules'}</h2>
          <p className={language === 'bn' ? 'font-bengali' : ''}>{language === 'bn' ? 'প্রম্পট শুধুমাত্র বৈধ উদ্দেশ্যে ব্যবহার করুন। অবৈধ বা ক্ষতিকর কাজে ব্যবহার নিষিদ্ধ।' : 'Use prompts only for legal purposes. Illegal or harmful use is prohibited.'}</p>
          
          <h2>{language === 'bn' ? '৩. মেধাস্বত্ব' : '3. Intellectual Property'}</h2>
          <p className={language === 'bn' ? 'font-bengali' : ''}>{language === 'bn' ? 'প্রম্পটের মেধাস্বত্ব ক্রিয়েটরদের। ক্রয় করলে ব্যবহারের অধিকার পাবেন।' : 'Prompt IP belongs to creators. Purchase grants usage rights.'}</p>
          
          <h2>{language === 'bn' ? '৪. রিফান্ড' : '4. Refunds'}</h2>
          <p className={language === 'bn' ? 'font-bengali' : ''}>{language === 'bn' ? 'ক্রয়ের ৭ দিনের মধ্যে রিফান্ডের জন্য আবেদন করতে পারবেন।' : 'You can request a refund within 7 days of purchase.'}</p>
        </main>
        <Footer language={language} />
      </div>
    </>
  );
};
export default Terms;
