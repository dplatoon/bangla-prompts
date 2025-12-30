import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, CheckCircle, XCircle, AlertTriangle } from "lucide-react";

const Guidelines = () => {
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');

  useEffect(() => {
    const savedLang = localStorage.getItem('bdprompt-language') as 'bn' | 'en' || 'bn';
    setLanguage(savedLang);
  }, []);

  const handleLanguageChange = (lang: 'bn' | 'en') => {
    setLanguage(lang);
    localStorage.setItem('bdprompt-language', lang);
  };

  const text = {
    bn: {
      title: "প্রম্পট গাইডলাইন",
      subtitle: "উচ্চমানের প্রম্পট তৈরির জন্য নির্দেশিকা",
      qualityStandards: "গুণমান মান",
      dos: "করণীয়",
      donts: "বর্জনীয়",
      tips: "টিপস",
      dosItems: [
        "স্পষ্ট এবং বিস্তারিত প্রম্পট লিখুন",
        "ভেরিয়েবল প্লেসহোল্ডার ব্যবহার করুন {variable}",
        "ডেমো ইনপুট এবং আউটপুট দিন",
        "বাংলা এবং ইংরেজি দুটোই দিন",
        "প্রাসঙ্গিক ট্যাগ যোগ করুন",
        "সঠিক ক্যাটাগরি নির্বাচন করুন"
      ],
      dontsItems: [
        "অন্যের প্রম্পট কপি করবেন না",
        "অনুচিত বা আপত্তিকর কন্টেন্ট দেবেন না",
        "ভুল তথ্য বা বিভ্রান্তিকর প্রম্পট এড়িয়ে চলুন",
        "স্প্যাম বা ডুপ্লিকেট প্রম্পট জমা দেবেন না",
        "কপিরাইট লঙ্ঘন করবেন না"
      ],
      tipsItems: [
        "প্রম্পটে কনটেক্সট দিন - AI কে বলুন সে কি ভূমিকায়",
        "আউটপুট ফরম্যাট স্পষ্ট করুন",
        "জটিল কাজ ছোট ছোট ধাপে ভাগ করুন",
        "টোন এবং স্টাইল নির্দিষ্ট করুন",
        "উদাহরণ দিন যখন সম্ভব"
      ],
      reviewProcess: "রিভিউ প্রক্রিয়া",
      reviewSteps: [
        "প্রম্পট জমা দেওয়ার পর ২৪-৪৮ ঘণ্টার মধ্যে রিভিউ হয়",
        "গুণমান, মৌলিকতা এবং কার্যকারিতা যাচাই করা হয়",
        "অনুমোদিত হলে প্রকাশিত হয়",
        "প্রত্যাখ্যাত হলে কারণসহ জানানো হয়"
      ]
    },
    en: {
      title: "Prompt Guidelines",
      subtitle: "Guidelines for creating high-quality prompts",
      qualityStandards: "Quality Standards",
      dos: "Do's",
      donts: "Don'ts",
      tips: "Tips",
      dosItems: [
        "Write clear and detailed prompts",
        "Use variable placeholders {variable}",
        "Provide demo input and output",
        "Include both Bengali and English",
        "Add relevant tags",
        "Select the correct category"
      ],
      dontsItems: [
        "Don't copy others' prompts",
        "Don't include inappropriate content",
        "Avoid false or misleading prompts",
        "Don't submit spam or duplicates",
        "Don't violate copyright"
      ],
      tipsItems: [
        "Give context - tell AI what role to play",
        "Specify output format clearly",
        "Break complex tasks into smaller steps",
        "Specify tone and style",
        "Provide examples when possible"
      ],
      reviewProcess: "Review Process",
      reviewSteps: [
        "Prompts are reviewed within 24-48 hours",
        "Quality, originality, and functionality are checked",
        "Approved prompts are published",
        "Rejected prompts receive feedback"
      ]
    }
  };

  const currentText = text[language];

  return (
    <>
      <SEOHead 
        title={language === 'bn' ? "প্রম্পট গাইডলাইন | bdprompt.com" : "Prompt Guidelines | bdprompt.com"}
        description={language === 'bn' ? "bdprompt-এ প্রম্পট জমা দেওয়ার গাইডলাইন। উচ্চমানের প্রম্পট তৈরির নির্দেশিকা।" : "Guidelines for submitting prompts on bdprompt. Instructions for creating high-quality prompts."}
        canonicalUrl="https://bdprompt.com/guidelines"
        language={language}
      />
      
      <div className="min-h-screen bg-background">
        <Header language={language} onLanguageChange={handleLanguageChange} />
        
        <main className="container mx-auto px-4 py-16 max-w-4xl">
          <Breadcrumbs 
            items={[{ label: 'Guidelines', labelBn: 'গাইডলাইন' }]} 
            language={language} 
            className="mb-8"
          />
          
          {/* Header */}
          <header className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              <BookOpen className="w-3 h-3 mr-1" />
              {currentText.qualityStandards}
            </Badge>
            <h1 className={`text-4xl lg:text-5xl font-bold text-foreground mb-4 ${language === 'bn' ? 'font-bengali' : ''}`}>
              {currentText.title}
            </h1>
            <p className={`text-xl text-muted-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
              {currentText.subtitle}
            </p>
          </header>

          <div className="space-y-8">
            {/* Do's */}
            <Card>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 text-green-600 ${language === 'bn' ? 'font-bengali' : ''}`}>
                  <CheckCircle className="w-5 h-5" />
                  {currentText.dos}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {currentText.dosItems.map((item, idx) => (
                    <li key={idx} className={`flex items-start gap-3 ${language === 'bn' ? 'font-bengali' : ''}`}>
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Don'ts */}
            <Card>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 text-red-600 ${language === 'bn' ? 'font-bengali' : ''}`}>
                  <XCircle className="w-5 h-5" />
                  {currentText.donts}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {currentText.dontsItems.map((item, idx) => (
                    <li key={idx} className={`flex items-start gap-3 ${language === 'bn' ? 'font-bengali' : ''}`}>
                      <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle className={`flex items-center gap-2 text-primary ${language === 'bn' ? 'font-bengali' : ''}`}>
                  <AlertTriangle className="w-5 h-5" />
                  {currentText.tips}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {currentText.tipsItems.map((item, idx) => (
                    <li key={idx} className={`flex items-start gap-3 ${language === 'bn' ? 'font-bengali' : ''}`}>
                      <Badge variant="secondary" className="mt-0.5">{idx + 1}</Badge>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Review Process */}
            <Card>
              <CardHeader>
                <CardTitle className={language === 'bn' ? 'font-bengali' : ''}>
                  {currentText.reviewProcess}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {currentText.reviewSteps.map((step, idx) => (
                    <li key={idx} className={`flex items-start gap-3 ${language === 'bn' ? 'font-bengali' : ''}`}>
                      <Badge className="mt-0.5">{idx + 1}</Badge>
                      {step}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </main>

        <Footer language={language} />
      </div>
    </>
  );
};

export default Guidelines;
