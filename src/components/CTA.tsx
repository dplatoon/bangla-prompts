import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Users, Zap } from "lucide-react";
import { promptCountLabel, promptCountLabelBn } from "@/config/siteStats";

interface CTAProps {
  language: 'bn' | 'en';
}

export const CTA = ({ language }: CTAProps) => {
  const text = {
    bn: {
      title: "আপনিও ক্রিয়েটর হয়ে উঠুন",
      subtitle: "আপনার প্রম্পট বিক্রি করুন এবং কমিউনিটিকে সাহায্য করুন",
      benefits: [
        "প্রতি বিক্রয়ে ৭০% কমিশন পান",
        "আপনার প্রোফাইল বিল্ড করুন",
        "বিশ্বব্যাপী অডিয়েন্স পান"
      ],
      joinButton: "ক্রিয়েটর হিসেবে যোগ দিন",
      stats: {
        creators: promptCountLabelBn,
        creatorsLabel: "পাবলিশড প্রম্পট",
        revenue: "৭০%",
        revenueLabel: "ক্রিয়েটর কমিশন"
      }
    },
    en: {
      title: "Become a Creator Today",
      subtitle: "Sell your prompts and help the community grow",
      benefits: [
        "Earn 70% commission per sale",
        "Build your profile & reputation", 
        "Reach global audience"
      ],
      joinButton: "Join as Creator",
      stats: {
        creators: promptCountLabel,
        creatorsLabel: "Published Prompts",
        revenue: "70%",
        revenueLabel: "Creator Commission"
      }
    }
  };

  const currentText = text[language];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <Card className="bg-gradient-hero border-0 overflow-hidden shadow-accent">
          <CardContent className="p-0">
            <div className="grid lg:grid-cols-2 items-center">
              {/* Content */}
              <div className="p-8 lg:p-12 space-y-8">
                <div className="space-y-4">
                  <h2 className={`text-3xl lg:text-4xl font-bold text-primary-foreground ${language === 'bn' ? 'font-bengali text-bengali' : ''}`}>
                    {currentText.title}
                  </h2>
                  <p className={`text-xl text-primary-foreground/80 ${language === 'bn' ? 'font-bengali text-bengali' : ''}`}>
                    {currentText.subtitle}
                  </p>
                </div>

                {/* Benefits */}
                <ul className="space-y-3">
                  {currentText.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <div className="w-6 h-6 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                        <Zap className="w-3 h-3 text-primary-foreground" />
                      </div>
                      <span className={`text-primary-foreground/90 ${language === 'bn' ? 'font-bengali text-bengali' : ''}`}>
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button 
                  size="lg" 
                  variant="secondary"
                  className={`group ${language === 'bn' ? 'font-bengali' : ''}`}
                >
                  <Users className="mr-2 w-5 h-5" />
                  {currentText.joinButton}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

              {/* Stats */}
              <div className="p-8 lg:p-12 bg-primary-foreground/5 backdrop-blur-sm">
                <div className="grid grid-cols-1 gap-8">
                  <div className="text-center lg:text-left">
                    <div className={`text-4xl lg:text-5xl font-bold text-primary-foreground mb-2 ${language === 'bn' ? 'font-bengali' : ''}`}>
                      {currentText.stats.creators}
                    </div>
                    <div className={`text-primary-foreground/70 ${language === 'bn' ? 'font-bengali' : ''}`}>
                      {currentText.stats.creatorsLabel}
                    </div>
                  </div>
                  
                  <div className="text-center lg:text-left">
                    <div className={`text-4xl lg:text-5xl font-bold text-primary-foreground mb-2 ${language === 'bn' ? 'font-bengali' : ''}`}>
                      {currentText.stats.revenue}
                    </div>
                    <div className={`text-primary-foreground/70 ${language === 'bn' ? 'font-bengali' : ''}`}>
                      {currentText.stats.revenueLabel}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};