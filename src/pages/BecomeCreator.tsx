import { useState, useEffect } from "react";
import { promptCountLabel, promptCountLabelBn } from "@/config/siteStats";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { PenTool, DollarSign, Users, TrendingUp, Check, ArrowRight } from "lucide-react";

const BecomeCreator = () => {
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const savedLang = localStorage.getItem('bdprompt-language') as 'bn' | 'en' || 'bn';
    setLanguage(savedLang);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setSubmitting(true);
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const { error } = await supabase.from('creator_applications').insert({
        user_id: sessionData.session?.user.id ?? null,
        name: String(data.get('name') ?? '').trim(),
        email: String(data.get('email') ?? '').trim(),
        expertise: String(data.get('expertise') ?? '').trim() || null,
        portfolio: String(data.get('portfolio') ?? '').trim() || null,
        why_join: String(data.get('whyJoin') ?? '').trim() || null,
      });
      if (error) throw error;
      form.reset();
      setSubmitted(true);
    } catch {
      toast({
        variant: 'destructive',
        title: language === 'bn' ? 'জমা দেওয়া যায়নি' : 'Could not submit',
        description: language === 'bn'
          ? 'আবার চেষ্টা করুন বা পরে ফিরে আসুন।'
          : 'Please try again in a moment.',
      });
    } finally {
      setSubmitting(false);
    }
  };


  const handleLanguageChange = (lang: 'bn' | 'en') => {
    setLanguage(lang);
    localStorage.setItem('bdprompt-language', lang);
  };

  const text = {
    bn: {
      title: "ক্রিয়েটর হন",
      subtitle: "আপনার প্রম্পট শেয়ার করুন এবং আয় করুন",
      benefits: "সুবিধাসমূহ",
      benefit1: "প্রতিটি বিক্রয়ে ৭০% কমিশন",
      benefit2: "BdPrompt-এর অডিয়েন্সের কাছে পৌঁছান",
      benefit3: "ফ্রি মার্কেটিং ও প্রমোশন",
      benefit4: "মাসিক পেমেন্ট (bKash/Nagad)",
      howItWorks: "কিভাবে কাজ করে",
      step1: "অ্যাকাউন্ট তৈরি করুন",
      step2: "প্রম্পট সাবমিট করুন",
      step3: "রিভিউয়ের জন্য অপেক্ষা করুন",
      step4: "বিক্রয় শুরু করুন",
      applyNow: "এখনই আবেদন করুন",
      name: "নাম",
      email: "ইমেইল",
      expertise: "আপনার দক্ষতা",
      portfolio: "পোর্টফোলিও/লিংক",
      whyJoin: "কেন যোগ দিতে চান",
      submit: "আবেদন জমা দিন",
      stats: {
        creators: "৭০%",
        creatorsLabel: "প্রতি বিক্রয়ে কমিশন",
        earned: "মাসিক",
        earnedLabel: "পেমেন্ট (bKash/Nagad)",
        prompts: promptCountLabelBn,
        promptsLabel: "পাবলিশড প্রম্পট"
      }
    },
    en: {
      title: "Become a Creator",
      subtitle: "Share your prompts and earn money",
      benefits: "Benefits",
      benefit1: "70% commission on every sale",
      benefit2: "Reach the BdPrompt audience",
      benefit3: "Free marketing & promotion",
      benefit4: "Monthly payments (bKash/Nagad)",
      howItWorks: "How It Works",
      step1: "Create an account",
      step2: "Submit your prompts",
      step3: "Wait for review",
      step4: "Start selling",
      applyNow: "Apply Now",
      name: "Name",
      email: "Email",
      expertise: "Your Expertise",
      portfolio: "Portfolio/Links",
      whyJoin: "Why do you want to join",
      submit: "Submit Application",
      stats: {
        creators: "70%",
        creatorsLabel: "Commission Per Sale",
        earned: "Monthly",
        earnedLabel: "Payouts (bKash/Nagad)",
        prompts: promptCountLabel,
        promptsLabel: "Published Prompts"
      }
    }
  };

  const currentText = text[language];

  return (
    <>
      <SEOHead 
        title={language === 'bn' ? "ক্রিয়েটর হন | প্রম্পট বিক্রি করুন | BdPrompt" : "Become a Creator | Sell Prompts | BdPrompt"}
        description={language === 'bn' ? "bdprompt-এ প্রম্পট ক্রিয়েটর হন। আপনার প্রম্পট বিক্রি করে আয় করুন। ৭০% কমিশন।" : "Become a prompt creator on bdprompt. Sell your prompts and earn money. 70% commission."}
        keywords={language === 'bn' ? "প্রম্পট ক্রিয়েটর, আয় করুন, AI প্রম্পট বিক্রি" : "prompt creator, earn money, sell AI prompts"}
        canonicalUrl="https://bdprompt.com/become-creator"
        ogImage="https://bdprompt.com/og-image.png"
        ogType="website"
        language={language}
      />
      
      <div className="min-h-screen bg-background">
        <Header language={language} onLanguageChange={handleLanguageChange} />
        
        <main className="container mx-auto px-4 py-8">
          {/* Breadcrumbs */}
          <Breadcrumbs 
            items={[{ label: "Become Creator", labelBn: "ক্রিয়েটর হন" }]} 
            language={language} 
            className="mb-6" 
          />
          
          {/* Hero */}
          <header className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              <PenTool className="w-3 h-3 mr-1" />
              Creator Program
            </Badge>
            <h1 className={`text-4xl lg:text-5xl font-bold text-foreground mb-4 ${language === 'bn' ? 'font-bengali' : ''}`}>
              {currentText.title}
            </h1>
            <p className={`text-xl text-muted-foreground max-w-2xl mx-auto ${language === 'bn' ? 'font-bengali' : ''}`}>
              {currentText.subtitle}
            </p>
          </header>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto mb-16">
            {[
              { icon: Users, value: currentText.stats.creators, label: currentText.stats.creatorsLabel },
              { icon: DollarSign, value: currentText.stats.earned, label: currentText.stats.earnedLabel },
              { icon: TrendingUp, value: currentText.stats.prompts, label: currentText.stats.promptsLabel }
            ].map((stat, idx) => (
              <Card key={idx} className="text-center">
                <CardContent className="pt-6">
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                  <div className={`text-2xl font-bold text-primary ${language === 'bn' ? 'font-bengali' : ''}`}>
                    {stat.value}
                  </div>
                  <div className={`text-sm text-muted-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Benefits & How it works */}
            <div className="space-y-8">
              {/* Benefits */}
              <Card>
                <CardHeader>
                  <CardTitle className={language === 'bn' ? 'font-bengali' : ''}>
                    {currentText.benefits}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[currentText.benefit1, currentText.benefit2, currentText.benefit3, currentText.benefit4].map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className={language === 'bn' ? 'font-bengali' : ''}>{benefit}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* How it works */}
              <Card>
                <CardHeader>
                  <CardTitle className={language === 'bn' ? 'font-bengali' : ''}>
                    {currentText.howItWorks}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[currentText.step1, currentText.step2, currentText.step3, currentText.step4].map((step, idx) => (
                    <div key={idx} className="flex items-center gap-4">
                      <Badge className="w-8 h-8 rounded-full p-0 justify-center">
                        {idx + 1}
                      </Badge>
                      <span className={language === 'bn' ? 'font-bengali' : ''}>{step}</span>
                      {idx < 3 && <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto" />}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Application Form */}
            <Card>
              <CardHeader>
                <CardTitle className={language === 'bn' ? 'font-bengali' : ''}>
                  {currentText.applyNow}
                </CardTitle>
                <CardDescription className={language === 'bn' ? 'font-bengali' : ''}>
                  {language === 'bn' ? 'নিচের ফর্ম পূরণ করুন' : 'Fill out the form below'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {submitted ? (
                  <div
                    role="status"
                    className={`rounded-lg border border-primary/30 bg-primary/5 p-6 text-center ${language === 'bn' ? 'font-bengali' : ''}`}
                  >
                    <Check className="mx-auto mb-3 h-8 w-8 text-primary" aria-hidden="true" />
                    <p className="font-medium">
                      {language === 'bn'
                        ? 'আপনার আবেদন জমা হয়েছে! আমরা শীঘ্রই ইমেইলে যোগাযোগ করব।'
                        : 'Your application was submitted! We will reach out by email soon.'}
                    </p>
                  </div>
                ) : (
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="creator-name" className={`text-sm font-medium ${language === 'bn' ? 'font-bengali' : ''}`}>
                      {currentText.name}
                    </label>
                    <Input id="creator-name" name="name" required maxLength={120} className="mt-1" placeholder={language === 'bn' ? 'আপনার নাম' : 'Your name'} />
                  </div>
                  <div>
                    <label htmlFor="creator-email" className={`text-sm font-medium ${language === 'bn' ? 'font-bengali' : ''}`}>
                      {currentText.email}
                    </label>
                    <Input id="creator-email" name="email" type="email" required maxLength={200} className="mt-1" placeholder="email@example.com" />
                  </div>
                  <div>
                    <label htmlFor="creator-expertise" className={`text-sm font-medium ${language === 'bn' ? 'font-bengali' : ''}`}>
                      {currentText.expertise}
                    </label>
                    <Input id="creator-expertise" name="expertise" maxLength={300} className="mt-1" placeholder={language === 'bn' ? 'যেমন: কন্টেন্ট, মার্কেটিং, কোড' : 'e.g., Content, Marketing, Code'} />
                  </div>
                  <div>
                    <label htmlFor="creator-portfolio" className={`text-sm font-medium ${language === 'bn' ? 'font-bengali' : ''}`}>
                      {currentText.portfolio}
                    </label>
                    <Input id="creator-portfolio" name="portfolio" maxLength={500} className="mt-1" placeholder="https://" />
                  </div>
                  <div>
                    <label htmlFor="creator-why" className={`text-sm font-medium ${language === 'bn' ? 'font-bengali' : ''}`}>
                      {currentText.whyJoin}
                    </label>
                    <Textarea id="creator-why" name="whyJoin" maxLength={2000} className="mt-1" rows={4} />
                  </div>
                  <Button type="submit" disabled={submitting} className={`w-full ${language === 'bn' ? 'font-bengali' : ''}`}>
                    {submitting
                      ? (language === 'bn' ? 'জমা হচ্ছে…' : 'Submitting…')
                      : currentText.submit}
                  </Button>
                </form>
                )}
              </CardContent>
            </Card>

          </div>
        </main>

        <Footer language={language} />
      </div>
    </>
  );
};

export default BecomeCreator;
