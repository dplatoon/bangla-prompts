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
          color: "bg-gradient-primary",
          href: "/playground"
        },
        {
          icon: Package,
          title: "প্রম্পট প্যাকস", 
          description: "বিশেষ ক্যাটেগরির জন্য কিউরেটেড প্রম্পট কালেকশন",
          action: "ব্রাউজ করুন",
          color: "bg-gradient-accent",
          href: "/packs"
        },
        {
          icon: Users,
          title: "ক্রিয়েটর প্রোগ্রাম",
          description: "আপনার প্রম্পট বিক্রি করুন এবং আয় করুন",
          action: "যোগদান করুন",
          color: "bg-primary",
          href: "/become-creator"
        },
        {
          icon: BookOpen,
          title: "রিসোর্স",
          description: "AI টুলস ও গাইডলাইন সম্পর্কে জানুন",
          action: "দেখুন",
          color: "bg-secondary",
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
          color: "bg-gradient-primary",
          href: "/playground"
        },
        {
          icon: Package,
          title: "Prompt Packs",
          description: "Curated prompt collections for specific categories",
          action: "Browse",
          color: "bg-gradient-accent",
          href: "/packs"
        },
        {
          icon: Users,
          title: "Creator Program", 
          description: "Sell your prompts and earn revenue",
          action: "Join Now",
          color: "bg-primary",
          href: "/become-creator"
        },
        {
          icon: BookOpen,
          title: "Resources",
          description: "AI tools and guidelines to get started",
          action: "View",
          color: "bg-secondary",
          href: "/resources"
        }
      ]
    }
  };

  const currentText = text[language];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className={`text-3xl lg:text-5xl font-bold text-foreground ${language === 'bn' ? 'font-bengali text-bengali' : ''}`}>
            {currentText.title}
          </h2>
          <p className={`text-xl text-muted-foreground max-w-2xl mx-auto ${language === 'bn' ? 'font-bengali text-bengali' : ''}`}>
            {currentText.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {currentText.features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Link key={index} to={feature.href} className="block">
                <Card className="group hover:shadow-accent transition-smooth border-border/50 hover:border-primary/20 bg-card/80 backdrop-blur-sm h-full">
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-primary`}>
                      <Icon className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <CardTitle className={`text-lg ${language === 'bn' ? 'font-bengali' : ''}`}>
                      {feature.title}
                    </CardTitle>
                    <CardDescription className={`text-sm ${language === 'bn' ? 'font-bengali text-bengali' : ''}`}>
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <Button 
                      variant="ghost" 
                      className={`w-full group/btn text-primary hover:bg-primary/5 ${language === 'bn' ? 'font-bengali' : ''}`}
                    >
                      {feature.action}
                      <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
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