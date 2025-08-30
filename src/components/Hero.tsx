import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Sparkles, Copy, Play } from "lucide-react";
import { romanToBangla } from "@/utils/transliteration";
import { useToast } from "@/hooks/use-toast";

interface HeroProps {
  language: 'bn' | 'en';
}

export const Hero = ({ language }: HeroProps) => {
  const [translitInput, setTranslitInput] = useState("");
  const [banglaOutput, setBanglaOutput] = useState("");
  const { toast } = useToast();

  const handleTranslitChange = (value: string) => {
    setTranslitInput(value);
    setBanglaOutput(romanToBangla(value));
  };

  const text = {
    bn: {
      headline: "বাংলায় তৈরি AI প্রম্পট — কপি করুন, টিউন করুন, ফল পান।",
      subhead: "Blog, marketing, image prompts ও কোড সহ ৫০+ প্রম্পট দিয়ে শুরু করুন।",
      exploreBtn: "প্রম্পট এক্সপ্লোর করুন",
      submitBtn: "প্রম্পট জমা দিন",
      tryPrompt: "এখনই চেষ্টা করুন",
      placeholder: "আপনার প্রম্পট লিখুন...",
      stats: {
        prompts: "৫০০+",
        promptsLabel: "প্রম্পট টেমপ্লেট",
        users: "১০k+",
        usersLabel: "সক্রিয় ব্যবহারকারী",
        copies: "৫০k+",
        copiesLabel: "কপি করা হয়েছে"
      }
    },
    en: {
      headline: "AI Prompts Crafted in Bangla — Copy, Tune, Get Results.",
      subhead: "Start with 50+ prompts including blog, marketing, image prompts & code.",
      exploreBtn: "Explore Prompts",
      submitBtn: "Submit Prompt",
      tryPrompt: "Try Now",
      placeholder: "Write your prompt...",
      stats: {
        prompts: "500+",
        promptsLabel: "Prompt Templates",
        users: "10k+",
        usersLabel: "Active Users",
        copies: "50k+",
        copiesLabel: "Times Copied"
      }
    }
  };

  const currentText = text[language];

  return (
    <section className="relative overflow-hidden bg-gradient-hero py-20 lg:py-32">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container relative mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-accent-light px-4 py-2 rounded-full">
                <Sparkles className="w-4 h-4 text-accent" />
                <span className={`text-sm font-medium text-accent-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {language === 'bn' ? 'নতুন প্রম্পট যোগ হচ্ছে প্রতিদিন' : 'New prompts added daily'}
                </span>
              </div>
              
              <h1 className={`text-4xl lg:text-6xl font-bold text-primary-foreground leading-tight ${language === 'bn' ? 'font-bengali text-bengali' : ''}`}>
                {currentText.headline}
              </h1>
              
              <p className={`text-xl text-primary-foreground/80 max-w-2xl ${language === 'bn' ? 'font-bengali text-bengali' : ''}`}>
                {currentText.subhead}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" variant="secondary" className={`group ${language === 'bn' ? 'font-bengali' : ''}`}>
                {currentText.exploreBtn}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className={`border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 ${language === 'bn' ? 'font-bengali' : ''}`}>
                {currentText.submitBtn}
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              {Object.entries(currentText.stats).reduce((acc, [key, value], index) => {
                if (index % 2 === 0) {
                  const labelKey = currentText.stats[`${key}Label` as keyof typeof currentText.stats];
                  acc.push(
                    <div key={key} className="text-center lg:text-left">
                      <div className={`text-2xl lg:text-3xl font-bold text-primary-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
                        {value}
                      </div>
                      <div className={`text-sm text-primary-foreground/70 ${language === 'bn' ? 'font-bengali' : ''}`}>
                        {labelKey}
                      </div>
                    </div>
                  );
                }
                return acc;
              }, [] as JSX.Element[])}
            </div>
          </div>

          {/* Right Content - Live Demo */}
          <div className="lg:pl-8">
            <div className="bg-card/95 backdrop-blur-sm rounded-2xl shadow-elegant p-6 border border-border/20">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className={`font-semibold text-card-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
                    {language === 'bn' ? 'লাইভ ট্রান্সলিটেরেশন' : 'Live Transliteration'}
                  </h3>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={async () => {
                        if (banglaOutput) {
                          await navigator.clipboard.writeText(banglaOutput);
                          toast({
                            title: language === 'bn' ? "কপি হয়েছে!" : "Copied!",
                            description: language === 'bn' ? "বাংলা টেক্সট কপি হয়েছে" : "Bangla text copied"
                          });
                        }
                      }}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      onClick={() => {
                        setTranslitInput("ami bangla likhte pari");
                        setBanglaOutput(romanToBangla("ami bangla likhte pari"));
                      }}
                    >
                      <Play className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Input
                    placeholder={language === 'bn' ? 'Roman bangla likhun...' : 'Type in Roman Bangla...'}
                    value={translitInput}
                    onChange={(e) => handleTranslitChange(e.target.value)}
                    className="border-border/50 focus:border-primary"
                  />
                  
                  <div className="bg-muted/50 rounded-lg p-4 min-h-[60px] border border-border/30">
                    <p className={`text-sm font-bengali text-bengali ${banglaOutput ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {banglaOutput || 
                        (language === 'bn' ? 'Roman Bangla টাইপ করুন এবং বাংলায় দেখুন' : 'Type in Roman Bangla to see Bengali output')
                      }
                    </p>
                  </div>
                  
                  <Button className={`w-full ${language === 'bn' ? 'font-bengali' : ''}`} variant="outline">
                    {currentText.tryPrompt}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};