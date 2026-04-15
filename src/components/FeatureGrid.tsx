import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Zap, Package, Users, BookOpen } from "lucide-react";

interface FeatureGridProps {
  language: 'bn' | 'en';
}

export const FeatureGrid = ({ language }: FeatureGridProps) => {
  const text = {
    bn: {
      title: "আপনার AI যাত্রা শুরু করুন",
      subtitle: "প্রতিটি প্রয়োজনের জন্য তৈরি টুলস ও রিসোর্স",
      features: [
        {
          icon: Zap,
          title: "প্লেগ্রাউন্ড",
          description: "প্রম্পট টেস্ট করুন এবং রিয়েল-টাইমে ফলাফল দেখুন",
          action: "এখনই চেষ্টা করুন",
          iconBg: "bg-primary text-primary-foreground",
          href: "/playground"
        },
        {
          icon: Package,
          title: "প্রম্পট প্যাকস", 
          description: "বিশেষ ক্যাটেগরির জন্য কিউরেটেড প্রম্পট কালেকশন",
          action: "ব্রাউজ করুন",
          iconBg: "bg-accent text-accent-foreground",
          href: "/packs"
        },
        {
          icon: Users,
          title: "ক্রিয়েটর প্রোগ্রাম",
          description: "আপনার প্রম্পট বিক্রি করুন এবং আয় করুন",
          action: "যোগদান করুন",
          iconBg: "bg-primary text-primary-foreground",
          href: "/become-creator"
        },
        {
          icon: BookOpen,
          title: "রিসোর্স",
          description: "AI টুলস ও গাইডলাইন সম্পর্কে জানুন",
          action: "দেখুন",
          iconBg: "bg-secondary text-secondary-foreground",
          href: "/resources"
        }
      ]
    },
    en: {
      title: "Start Your AI Journey", 
      subtitle: "Tools and resources crafted for every need",
      features: [
        {
          icon: Zap,
          title: "Playground",
          description: "Test prompts and see results in real-time",
          action: "Try Now",
          iconBg: "bg-primary text-primary-foreground",
          href: "/playground"
        },
        {
          icon: Package,
          title: "Prompt Packs",
          description: "Curated prompt collections for specific categories",
          action: "Browse",
          iconBg: "bg-accent text-accent-foreground",
          href: "/packs"
        },
        {
          icon: Users,
          title: "Creator Program", 
          description: "Sell your prompts and earn revenue",
          action: "Join Now",
          iconBg: "bg-primary text-primary-foreground",
          href: "/become-creator"
        },
        {
          icon: BookOpen,
          title: "Resources",
          description: "AI tools and guidelines to get started",
          action: "View",
          iconBg: "bg-secondary text-secondary-foreground",
          href: "/resources"
        }
      ]
    }
  };

  const currentText = text[language];

  return (
    <section className="py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-3 mb-14">
          <h2 className={`text-3xl lg:text-4xl font-bold text-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
            {currentText.title}
          </h2>
          <p className={`text-lg text-muted-foreground max-w-2xl mx-auto ${language === 'bn' ? 'font-bengali' : ''}`}>
            {currentText.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {currentText.features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Link key={index} to={feature.href} className="block group">
                <Card className="h-full border-border/40 hover:border-primary/30 bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="text-center pb-3">
                    <div className={`w-14 h-14 ${feature.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <CardTitle className={`text-lg ${language === 'bn' ? 'font-bengali' : ''}`}>
                      {feature.title}
                    </CardTitle>
                    <CardDescription className={`text-sm leading-relaxed ${language === 'bn' ? 'font-bengali' : ''}`}>
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className={`flex items-center justify-center text-sm font-medium text-primary group-hover:gap-2 transition-all ${language === 'bn' ? 'font-bengali' : ''}`}>
                      {feature.action}
                      <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
