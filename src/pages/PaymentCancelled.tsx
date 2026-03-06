import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XCircle, ArrowLeft, RefreshCw, HelpCircle, BookOpen } from "lucide-react";

const PaymentCancelled = () => {
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');
  const navigate = useNavigate();
  
  const text = {
    bn: {
      title: "পেমেন্ট বাতিল হয়েছে",
      subtitle: "আপনার পেমেন্ট সম্পন্ন হয়নি",
      description: "চিন্তা করবেন না! আপনি পরে আবার চেষ্টা করতে পারবেন। আপনার কার্ড থেকে কোন টাকা কাটা হয়নি।",
      noCharge: "কোন চার্জ করা হয়নি",
      tryAgain: "আবার চেষ্টা করুন",
      browsePrompts: "প্রম্পট দেখুন",
      needHelp: "সাহায্য দরকার?",
      helpDescription: "পেমেন্টে সমস্যা হলে আমাদের সাথে যোগাযোগ করুন।",
      contactSupport: "সাপোর্টে যোগাযোগ করুন",
      commonReasons: "সাধারণ কারণসমূহ",
      reason1: "পেমেন্ট প্রসেসিং-এ সমস্যা",
      reason2: "ব্রাউজার রিফ্রেশ বা বন্ধ হয়ে গেছে",
      reason3: "কার্ড ডিক্লাইন হয়েছে",
    },
    en: {
      title: "Payment Cancelled",
      subtitle: "Your payment was not completed",
      description: "Don't worry! You can try again later. No money has been charged to your card.",
      noCharge: "No charges made",
      tryAgain: "Try Again",
      browsePrompts: "Browse Prompts",
      needHelp: "Need Help?",
      helpDescription: "If you're having trouble with payment, contact our support team.",
      contactSupport: "Contact Support",
      commonReasons: "Common Reasons",
      reason1: "Payment processing issue",
      reason2: "Browser was refreshed or closed",
      reason3: "Card was declined",
    }
  };

  const t = text[language];

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <SEOHead 
        title={language === 'bn' ? "পেমেন্ট বাতিল | BdPrompt" : "Payment Cancelled | BdPrompt"}
        description={language === 'bn' ? "আপনার পেমেন্ট বাতিল হয়েছে।" : "Your payment was cancelled."}
        canonicalUrl="https://bdprompt.com/payment-cancelled"
        ogImage="https://bdprompt.com/og-image.png"
        language={language}
      />
      <div className="min-h-screen bg-background">
        <Header language={language} onLanguageChange={setLanguage} />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Cancelled Icon */}
          <div className="mb-8 flex justify-center">
            <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center">
              <XCircle className="w-14 h-14 text-orange-600" />
            </div>
          </div>

          {/* Cancelled Message */}
          <h1 className={`text-3xl md:text-4xl font-bold text-foreground mb-4 ${language === 'bn' ? 'font-bengali' : ''}`}>
            {t.title}
          </h1>
          <p className={`text-xl text-muted-foreground mb-2 ${language === 'bn' ? 'font-bengali' : ''}`}>
            {t.subtitle}
          </p>
          <p className={`text-muted-foreground mb-8 ${language === 'bn' ? 'font-bengali' : ''}`}>
            {t.description}
          </p>

          {/* No Charge Card */}
          <Card className="mb-8 border-orange-200 bg-orange-50/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center gap-3 text-orange-700">
                <XCircle className="w-5 h-5" />
                <span className={`font-semibold ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {t.noCharge}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Common Reasons */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className={`text-lg font-semibold mb-4 ${language === 'bn' ? 'font-bengali' : ''}`}>
                {t.commonReasons}
              </h2>
              <ul className="space-y-2 text-left">
                <li className={`flex items-center gap-2 text-muted-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
                  <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full" />
                  {t.reason1}
                </li>
                <li className={`flex items-center gap-2 text-muted-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
                  <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full" />
                  {t.reason2}
                </li>
                <li className={`flex items-center gap-2 text-muted-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
                  <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full" />
                  {t.reason3}
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button 
              size="lg" 
              onClick={handleGoBack}
              className={`gap-2 ${language === 'bn' ? 'font-bengali' : ''}`}
            >
              <RefreshCw className="w-5 h-5" />
              {t.tryAgain}
            </Button>
            <Link to="/explore">
              <Button variant="outline" size="lg" className={`gap-2 ${language === 'bn' ? 'font-bengali' : ''}`}>
                <BookOpen className="w-5 h-5" />
                {t.browsePrompts}
              </Button>
            </Link>
          </div>

          {/* Help Section */}
          <Card className="bg-muted/30">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <HelpCircle className="w-5 h-5 text-primary" />
                <h3 className={`font-semibold ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {t.needHelp}
                </h3>
              </div>
              <p className={`text-muted-foreground text-sm mb-4 ${language === 'bn' ? 'font-bengali' : ''}`}>
                {t.helpDescription}
              </p>
              <Link to="/support">
                <Button variant="link" className={`gap-2 ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {t.contactSupport}
                  <ArrowLeft className="w-4 h-4 rotate-180" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>

        <Footer language={language} />
      </div>
    </>
  );
};

export default PaymentCancelled;
