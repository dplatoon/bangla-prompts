import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Sparkles, Copy, Play, CheckCircle2 } from "lucide-react";
import { romanToBangla } from "@/utils/transliteration";
import { useToast } from "@/hooks/use-toast";
import { trackTransliterationUsed } from "@/utils/analytics";

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
    if (value.length === 10) {
      trackTransliterationUsed(value.length);
    }
  };

  const text = {
    bn: {
      headline: "বাংলায় AI Prompt তৈরি করুন — সম্পূর্ণ বিনামূল্যে",
      subhead: "Students, freelancers, writers ও businesses — ChatGPT, Claude এবং Gemini-এর জন্য ৫০০+ ready-to-use বাংলা prompts। এক ক্লিকে কপি করুন, কোনো signup লাগবে না।",
      exploreBtn: "প্রম্পট এক্সপ্লোর করুন",
      submitBtn: "প্রম্পট জমা দিন",
      tryPrompt: "এখনই চেষ্টা করুন",
      placeholder: "আপনার প্রম্পট লিখুন...",
      translitTitle: "লাইভ ট্রান্সলিটেরেশন",
      translitPlaceholder: "Roman bangla likhun...",
      translitOutput: "Roman Bangla টাইপ করুন এবং বাংলায় দেখুন",
      copied: "কপি হয়েছে!",
      copiedDesc: "বাংলা টেক্সট কপি হয়েছে",
      stats: [
        { value: "৬০+", label: "প্রম্পট টেমপ্লেট" },
        { value: "১k+", label: "সক্রিয় ব্যবহারকারী" },
        { value: "৫k+", label: "কপি করা হয়েছে" }
      ]
    },
    en: {
      headline: "Free Bangla AI Prompt Generator — Built for Bangladesh",
      subhead: "Students, freelancers, writers & businesses — 500+ ready-to-use Bangla prompts for ChatGPT, Claude & Gemini. One-click copy, no signup needed.",
      exploreBtn: "Explore Prompts",
      submitBtn: "Submit Prompt",
      tryPrompt: "Try Now",
      placeholder: "Write your prompt...",
      translitTitle: "Live Transliteration",
      translitPlaceholder: "Type in Roman Bangla...",
      translitOutput: "Type in Roman Bangla to see Bangla output",
      copied: "Copied!",
      copiedDesc: "Bangla text copied",
      stats: [
        { value: "60+", label: "Prompt Templates" },
        { value: "1k+", label: "Active Users" },
        { value: "5k+", label: "Times Copied" }
      ]
    }
  };

  const currentText = text[language];

  return (
    <section 
      className="relative overflow-hidden bg-gradient-hero py-16 sm:py-20 lg:py-28"
      aria-labelledby="hero-heading"
      itemScope 
      itemType="https://schema.org/WebPageElement"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" aria-hidden="true"></div>
      {/* Decorative blurs */}
      <div className="absolute top-20 -left-32 w-64 h-64 bg-accent/20 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-primary-foreground/5 rounded-full blur-3xl" aria-hidden="true" />
      
      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Content */}
          <header className="space-y-8">
            <div className="space-y-5">
              <div className="inline-flex items-center space-x-2 bg-primary-foreground/15 backdrop-blur-sm px-4 py-2 rounded-full border border-primary-foreground/10" role="status">
                <Sparkles className="w-4 h-4 text-accent" aria-hidden="true" />
                <span className={`text-sm font-medium text-primary-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {language === 'bn' ? 'নতুন প্রম্পট যোগ হচ্ছে প্রতিদিন' : 'New prompts added daily'}
                </span>
              </div>
              
              <h1 
                id="hero-heading"
                className={`text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-6xl font-extrabold text-primary-foreground leading-[1.15] tracking-tight ${language === 'bn' ? 'font-bengali' : ''}`}
                itemProp="headline"
              >
                {currentText.headline}
              </h1>
              
              <p 
                className={`text-lg lg:text-xl text-primary-foreground/80 max-w-xl leading-relaxed ${language === 'bn' ? 'font-bengali' : ''}`}
                itemProp="description"
              >
                {currentText.subhead}
              </p>
            </div>

            {/* CTAs */}
            <nav className="flex flex-col sm:flex-row gap-3 sm:gap-4" aria-label={language === 'bn' ? 'প্রধান অ্যাকশন' : 'Main actions'}>
              <Button size="lg" className={`group bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold text-base px-8 h-12 rounded-xl shadow-lg ${language === 'bn' ? 'font-bengali' : ''}`} asChild>
                <Link to="/explore">
                  {currentText.exploreBtn}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" className={`border border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 font-semibold text-base px-8 h-12 rounded-xl backdrop-blur-sm ${language === 'bn' ? 'font-bengali' : ''}`} asChild>
                <Link to="/become-creator">
                  {currentText.submitBtn}
                </Link>
              </Button>
            </nav>

            {/* Stats */}
            <div className="flex gap-8 sm:gap-12 pt-4" aria-label={language === 'bn' ? 'পরিসংখ্যান' : 'Statistics'}>
              {currentText.stats.map((stat, index) => (
                <div key={index} className="text-left">
                  <div className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
                    {stat.value}
                  </div>
                  <div className={`text-sm text-primary-foreground/60 mt-1 ${language === 'bn' ? 'font-bengali' : ''}`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </header>

          {/* Right Content - Live Demo */}
          <aside className="lg:pl-4 mt-4 lg:mt-0" aria-label={language === 'bn' ? 'ট্রান্সলিটেরেশন টুল' : 'Transliteration Tool'}>
            <article className="bg-card/95 backdrop-blur-md rounded-2xl shadow-2xl p-6 sm:p-8 border border-border/30 ring-1 ring-primary-foreground/5">
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-primary" />
                    </div>
                    <h2 className={`font-semibold text-lg text-card-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
                      {currentText.translitTitle}
                    </h2>
                  </div>
                  <div className="flex space-x-1">
                    <Button 
                      size="sm" 
                      variant="ghost"
                      className="h-8 w-8 p-0 rounded-lg hover:bg-primary/10"
                      onClick={async () => {
                        if (banglaOutput) {
                          await navigator.clipboard.writeText(banglaOutput);
                          toast({
                            title: currentText.copied,
                            description: currentText.copiedDesc
                          });
                        }
                      }}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost"
                      className="h-8 w-8 p-0 rounded-lg hover:bg-primary/10"
                      onClick={() => {
                        setTranslitInput("ami bangla likhte pari");
                        setBanglaOutput(romanToBangla("ami bangla likhte pari"));
                      }}
                    >
                      <Play className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <label htmlFor="translit-input" className="sr-only">
                    {language === 'bn' ? 'Roman Bangla ইনপুট' : 'Roman Bangla Input'}
                  </label>
                  <Input
                    id="translit-input"
                    placeholder={currentText.translitPlaceholder}
                    value={translitInput}
                    onChange={(e) => handleTranslitChange(e.target.value)}
                    className="border-border/50 focus:border-primary h-12 rounded-xl text-base"
                    aria-describedby="translit-output"
                  />
                  
                  <div 
                    id="translit-output"
                    className="bg-muted/50 rounded-xl p-5 min-h-[72px] border border-border/30"
                    role="region"
                    aria-live="polite"
                    aria-label={language === 'bn' ? 'বাংলা আউটপুট' : 'Bangla Output'}
                  >
                    <p className={`text-base font-bengali text-bengali ${banglaOutput ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {banglaOutput || currentText.translitOutput}
                    </p>
                  </div>
                  
                  <Button className={`w-full h-11 rounded-xl font-semibold ${language === 'bn' ? 'font-bengali' : ''}`} variant="default" asChild>
                    <Link to="/playground">
                      {currentText.tryPrompt}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </div>

                {/* Trust indicators */}
                <div className="flex items-center gap-4 pt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                    {language === 'bn' ? '১০০% ফ্রি' : '100% Free'}
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                    {language === 'bn' ? 'একাউন্ট লাগবে না' : 'No signup needed'}
                  </span>
                </div>
              </div>
            </article>
          </aside>
        </div>
      </div>
    </section>
  );
};
