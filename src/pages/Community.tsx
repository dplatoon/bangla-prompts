import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { promptCountLabel, promptCountLabelBn, categoryCountLabel, categoryCountLabelBn } from "@/config/siteStats";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Community = () => {
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
      title: "কমিউনিটি",
      subtitle: "বাংলা AI প্রম্পট ক্রিয়েটরদের কমিউনিটিতে যোগ দিন",
      stats: {
        members: promptCountLabelBn,
        membersLabel: "পাবলিশড প্রম্পট",
        prompts: categoryCountLabelBn,
        promptsLabel: "ক্যাটাগরি",
        discussions: "৭০%",
        discussionsLabel: "ক্রিয়েটর কমিশন"
      },
      joinDiscord: "Discord এ যোগ দিন",
      joinFacebook: "Facebook গ্রুপে যোগ দিন",
      joinTelegram: "Telegram এ যোগ দিন",
      communityGuidelines: "কমিউনিটি গাইডলাইন",
      guidelines: [
        "সম্মানজনক আচরণ করুন",
        "অন্যদের প্রম্পট কপি করবেন না",
        "সহায়ক ফিডব্যাক দিন",
        "স্প্যাম বা বিজ্ঞাপন করবেন না"
      ]
    },
    en: {
      title: "Community",
      subtitle: "Join the Bangla AI prompt creator community",
      stats: {
        members: promptCountLabel,
        membersLabel: "Published Prompts",
        prompts: categoryCountLabel,
        promptsLabel: "Categories",
        discussions: "70%",
        discussionsLabel: "Creator Commission"
      },
      joinDiscord: "Join Discord",
      joinFacebook: "Join Facebook Group",
      joinTelegram: "Join Telegram",
      communityGuidelines: "Community Guidelines",
      guidelines: [
        "Be respectful to others",
        "Don't copy others' prompts",
        "Provide helpful feedback",
        "No spam or advertisements"
      ]
    }
  };

  const currentText = text[language];

  return (
    <>
      <SEOHead 
        title={language === 'bn' ? "কমিউনিটি | প্রম্পট শেয়ার করুন | BdPrompt" : "Community | Share Prompts | BdPrompt"}
        description={language === 'bn' ? "BdPrompt-এর AI প্রম্পট ক্রিয়েটর কমিউনিটি। Discord, Facebook, Telegram এ যোগ দিন।" : "Join the BdPrompt AI prompt creator community on Discord, Facebook and Telegram."}
        keywords={language === 'bn' ? "bdprompt কমিউনিটি, AI প্রম্পট ক্রিয়েটর, বাংলাদেশ AI" : "bdprompt community, AI prompt creators, Bangladesh AI"}
        canonicalUrl="https://bdprompt.com/community"
        ogImage="https://bdprompt.com/og-image.png"
        ogType="website"
        language={language}
      />
      
      <div className="min-h-screen bg-background">
        <Header language={language} onLanguageChange={handleLanguageChange} />
        
        <main className="container mx-auto px-4 py-8">
          {/* Breadcrumbs */}
          <Breadcrumbs 
            items={[{ label: "Community", labelBn: "কমিউনিটি" }]} 
            language={language} 
            className="mb-6" 
          />
          
          {/* Hero */}
          <header className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
              <Users className="w-5 h-5 text-primary" />
              <span className={`text-sm font-medium text-primary ${language === 'bn' ? 'font-bengali' : ''}`}>
                {currentText.stats.members} {currentText.stats.membersLabel}
              </span>
            </div>
            <h1 className={`text-4xl lg:text-5xl font-bold text-foreground mb-4 ${language === 'bn' ? 'font-bengali' : ''}`}>
              {currentText.title}
            </h1>
            <p className={`text-xl text-muted-foreground max-w-2xl mx-auto ${language === 'bn' ? 'font-bengali' : ''}`}>
              {currentText.subtitle}
            </p>
          </header>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-16">
            {Object.entries(currentText.stats).filter(([k]) => !k.includes('Label')).map(([key, value]) => (
              <Card key={key} className="text-center">
                <CardContent className="pt-6">
                  <div className={`text-3xl font-bold text-primary ${language === 'bn' ? 'font-bengali' : ''}`}>
                    {value}
                  </div>
                  <div className={`text-sm text-muted-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
                    {currentText.stats[`${key}Label` as keyof typeof currentText.stats]}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Join Community */}
            <section>
              <h2 className={`text-2xl font-bold mb-6 ${language === 'bn' ? 'font-bengali' : ''}`}>
                {language === 'bn' ? 'কমিউনিটিতে যোগ দিন' : 'Join the Community'}
              </h2>
              <div className="space-y-4">
                <Button className={`w-full justify-start ${language === 'bn' ? 'font-bengali' : ''}`} variant="outline">
                  <MessageSquare className="w-5 h-5 mr-3" />
                  {currentText.joinDiscord}
                  <ExternalLink className="w-4 h-4 ml-auto" />
                </Button>
                <Button className={`w-full justify-start ${language === 'bn' ? 'font-bengali' : ''}`} variant="outline">
                  <Users className="w-5 h-5 mr-3" />
                  {currentText.joinFacebook}
                  <ExternalLink className="w-4 h-4 ml-auto" />
                </Button>
                <Button className={`w-full justify-start ${language === 'bn' ? 'font-bengali' : ''}`} variant="outline">
                  <MessageSquare className="w-5 h-5 mr-3" />
                  {currentText.joinTelegram}
                  <ExternalLink className="w-4 h-4 ml-auto" />
                </Button>
              </div>

              {/* Guidelines */}
              <Card className="mt-8">
                <CardHeader>
                  <CardTitle className={language === 'bn' ? 'font-bengali' : ''}>
                    {currentText.communityGuidelines}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {currentText.guidelines.map((guideline, idx) => (
                      <li key={idx} className={`flex items-center gap-2 text-sm ${language === 'bn' ? 'font-bengali' : ''}`}>
                        <Badge variant="secondary" className="w-6 h-6 rounded-full p-0 justify-center">
                          {idx + 1}
                        </Badge>
                        {guideline}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </section>

            {/* Creator program CTA — no fabricated contributor stats */}
            <section>
              <h2 className={`text-2xl font-bold mb-6 ${language === 'bn' ? 'font-bengali' : ''}`}>
                {language === 'bn' ? 'নিজের প্রম্পট পাবলিশ করুন' : 'Publish Your Own Prompts'}
              </h2>
              <Card>
                <CardContent className="py-8 text-center">
                  <Sparkles className="w-10 h-10 text-primary mx-auto mb-4" />
                  <p className={`text-muted-foreground mb-6 ${language === 'bn' ? 'font-bengali' : ''}`}>
                    {language === 'bn'
                      ? 'আপনার বাংলা প্রম্পট শেয়ার করুন এবং ক্রিয়েটর কমিশনে আয় করুন।'
                      : 'Share your Bangla prompts and earn through the creator commission.'}
                  </p>
                  <Button asChild className={language === 'bn' ? 'font-bengali' : ''}>
                    <Link to="/become-creator">
                      {language === 'bn' ? 'ক্রিয়েটর হন' : 'Become a Creator'}
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </section>
          </div>
        </main>

        <Footer language={language} />
      </div>
    </>
  );
};

export default Community;
