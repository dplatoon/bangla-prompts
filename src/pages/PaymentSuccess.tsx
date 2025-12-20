import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, BookOpen, ShoppingBag } from "lucide-react";

const PaymentSuccess = () => {
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');
  const [searchParams] = useSearchParams();
  
  const text = {
    bn: {
      title: "পেমেন্ট সফল!",
      subtitle: "আপনার কেনাকাটা সম্পন্ন হয়েছে",
      description: "ধন্যবাদ! আপনি এখন আপনার কেনা প্রম্পটের সম্পূর্ণ টেমপ্লেট দেখতে পারবেন।",
      orderConfirmed: "অর্ডার নিশ্চিত করা হয়েছে",
      viewPurchases: "আমার কেনাকাটা দেখুন",
      browseMore: "আরো প্রম্পট দেখুন",
      whatNext: "এখন কি করবেন?",
      accessPrompt: "আপনার কেনা প্রম্পট এখন আপনার প্রোফাইলে দেখতে পারবেন।",
      copyUse: "প্রম্পটটি কপি করুন এবং আপনার পছন্দের AI টুলে ব্যবহার করুন।",
    },
    en: {
      title: "Payment Successful!",
      subtitle: "Your purchase is complete",
      description: "Thank you! You now have full access to your purchased prompt template.",
      orderConfirmed: "Order Confirmed",
      viewPurchases: "View My Purchases",
      browseMore: "Browse More Prompts",
      whatNext: "What's Next?",
      accessPrompt: "You can now access your purchased prompt from your profile.",
      copyUse: "Copy the prompt and use it with your favorite AI tool.",
    }
  };

  const t = text[language];

  return (
    <div className="min-h-screen bg-background">
      <Header language={language} onLanguageChange={setLanguage} />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8 flex justify-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center animate-pulse">
              <CheckCircle className="w-14 h-14 text-green-600" />
            </div>
          </div>

          {/* Success Message */}
          <h1 className={`text-3xl md:text-4xl font-bold text-foreground mb-4 ${language === 'bn' ? 'font-bengali' : ''}`}>
            {t.title}
          </h1>
          <p className={`text-xl text-muted-foreground mb-2 ${language === 'bn' ? 'font-bengali' : ''}`}>
            {t.subtitle}
          </p>
          <p className={`text-muted-foreground mb-8 ${language === 'bn' ? 'font-bengali' : ''}`}>
            {t.description}
          </p>

          {/* Order Confirmation Card */}
          <Card className="mb-8 border-green-200 bg-green-50/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-center gap-3 text-green-700">
                <CheckCircle className="w-5 h-5" />
                <span className={`font-semibold ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {t.orderConfirmed}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* What's Next Section */}
          <Card className="mb-8">
            <CardContent className="pt-6">
              <h2 className={`text-lg font-semibold mb-4 ${language === 'bn' ? 'font-bengali' : ''}`}>
                {t.whatNext}
              </h2>
              <div className="space-y-3 text-left">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-sm font-bold">1</span>
                  </div>
                  <p className={`text-muted-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
                    {t.accessPrompt}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-primary text-sm font-bold">2</span>
                  </div>
                  <p className={`text-muted-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
                    {t.copyUse}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/profile">
              <Button size="lg" className={`gap-2 ${language === 'bn' ? 'font-bengali' : ''}`}>
                <ShoppingBag className="w-5 h-5" />
                {t.viewPurchases}
              </Button>
            </Link>
            <Link to="/explore">
              <Button variant="outline" size="lg" className={`gap-2 ${language === 'bn' ? 'font-bengali' : ''}`}>
                <BookOpen className="w-5 h-5" />
                {t.browseMore}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer language={language} />
    </div>
  );
};

export default PaymentSuccess;
