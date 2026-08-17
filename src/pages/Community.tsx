import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users, MessageSquare, Heart, Award, ExternalLink } from "lucide-react";

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

  const topContributors = [
    { name: "রাহুল শর্মা", prompts: 45, likes: 1250 },
    { name: "প্রিয়া দাস", prompts: 38, likes: 980 },
    { name: "আহমেদ খান", prompts: 32, likes: 875 },
    { name: "ফাতেমা বেগম", prompts: 28, likes: 720 },
    { name: "রবি মেহতা", prompts: 25, likes: 650 }
  ];

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
      topContributors: "শীর্ষ অবদানকারী",
      prompts: "টি প্রম্পট",
      likes: "লাইক",
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
      topContributors: "Top Contributors",
      prompts: "prompts",
      likes: "likes",
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
        description={language === 'bn' ? "বাংলাদেশের সবচেয়ে বড় AI প্রম্পট ক্রিয়েটর কমিউনিটি। Discord, Facebook, Telegram এ যোগ দিন।" : "Bangladesh's largest AI prompt creator community. Join Discord, Facebook, Telegram."}
        keywords={language === 'bn' ? "bdprompt কমিউনিটি, AI প্রম্পট ক্রিয়েটর, বাংলাদেশ AI" : "bdprompt community, AI prompt creators, Bangladesh AI"}
        canonicalUrl="https://bdprompt.com/community"
        ogImage="https://bdprompt.com/og-image.png"
        ogType="website"
        language={language}
        breadcrumbs={[
          { name: language === 'bn' ? 'হোম' : 'Home', url: 'https://bdprompt.com/' },
          { name: language === 'bn' ? 'কমিউনিটি' : 'Community', url: 'https://bdprompt.com/community' }
        ]}
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

            {/* Top Contributors */}
            <section>
              <h2 className={`text-2xl font-bold mb-6 ${language === 'bn' ? 'font-bengali' : ''}`}>
                {currentText.topContributors}
              </h2>
              <div className="space-y-4">
                {topContributors.map((contributor, idx) => (
                  <Card key={idx}>
                    <CardContent className="flex items-center gap-4 py-4">
                      <Badge variant="outline" className="w-8 h-8 rounded-full p-0 justify-center font-bold">
                        {idx + 1}
                      </Badge>
                      <Avatar>
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {contributor.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className={`font-medium ${language === 'bn' ? 'font-bengali' : ''}`}>
                          {contributor.name}
                        </p>
                        <p className={`text-sm text-muted-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
                          {contributor.prompts} {currentText.prompts}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Heart className="w-4 h-4" />
                        <span className="text-sm">{contributor.likes}</span>
                      </div>
                      {idx === 0 && <Award className="w-5 h-5 text-yellow-500" />}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        </main>

        <Footer language={language} />
      </div>
    </>
  );
};

export default Community;
