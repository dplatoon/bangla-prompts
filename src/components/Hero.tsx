import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Sparkles, Copy, Play } from "lucide-react";
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

  // Semantic HTML structure for SEO

  const handleTranslitChange = (value: string) => {
    setTranslitInput(value);
    setBanglaOutput(romanToBangla(value));
    
    // Track transliteration usage when input reaches meaningful length
    if (value.length === 10) {
      trackTransliterationUsed(value.length);
    }
  };

  const text = {
    bn: {
      headline: "বাংলা AI প্রম্পট জেনারেটর — শিক্ষার্থী, লেখক, ব্যবসায়ীদের জন্য",
      subhead: "শিক্ষা, কবিতা, ব্যবসা, মার্কেটিং — ৬০+ প্রম্পট দিয়ে ChatGPT, Claude, Gemini ব্যবহার করুন।",
      exploreBtn: "প্রম্পট এক্সপ্লোর করুন",
      submitBtn: "প্রম্পট জমা দিন",
      tryPrompt: "এখনই চেষ্টা করুন",
      placeholder: "আপনার প্রম্পট লিখুন...",
      stats: {
        prompts: "৬০+",
        promptsLabel: "প্রম্পট টেমপ্লেট",
        users: "১k+",
        usersLabel: "সক্রিয় ব্যবহারকারী",
        copies: "৫k+",
        copiesLabel: "কপি করা হয়েছে"
      }
    },
    en: {
      headline: "Bengali AI Prompt Generator — For Students, Writers, Businesses",
      subhead: "Education, poetry, business, marketing — use 60+ prompts with ChatGPT, Claude, Gemini.",
      exploreBtn: "Explore Prompts",
      submitBtn: "Submit Prompt",
      tryPrompt: "Try Now",
      placeholder: "Write your prompt...",
      stats: {
        prompts: "60+",
        promptsLabel: "Prompt Templates",
        users: "1k+",
        usersLabel: "Active Users",
        copies: "5k+",
        copiesLabel: "Times Copied"
      }
    }
  };

  const currentText = text[language];

  return (
    <section 
      className="relative overflow-hidden bg-gradient-hero py-20 lg:py-32"
      aria-labelledby="hero-heading"
      itemScope 
      itemType="https://schema.org/WebPageElement"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" aria-hidden="true"></div>
      
      <div className="container relative mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <header className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-accent-light px-4 py-2 rounded-full" role="status">
                <Sparkles className="w-4 h-4 text-accent" aria-hidden="true" />
                <span className={`text-sm font-medium text-accent-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {language === 'bn' ? 'নতুন প্রম্পট যোগ হচ্ছে প্রতিদিন' : 'New prompts added daily'}
                </span>
              </div>
              
              <h1 
                id="hero-heading"
                className={`text-4xl lg:text-6xl font-bold text-primary-foreground leading-tight ${language === 'bn' ? 'font-bengali text-bengali' : ''}`}
                itemProp="headline"
              >
                {currentText.headline}
              </h1>
              
              <p 
                className={`text-xl text-primary-foreground/80 max-w-2xl ${language === 'bn' ? 'font-bengali text-bengali' : ''}`}
                itemProp="description"
              >
                {currentText.subhead}
              </p>
            </div>

            {/* CTAs */}
            <nav className="flex flex-col sm:flex-row gap-4" aria-label={language === 'bn' ? 'প্রধান অ্যাকশন' : 'Main actions'}>
              <Button size="lg" variant="secondary" className={`group ${language === 'bn' ? 'font-bengali' : ''}`} asChild>
                <Link to="/explore">
                  {currentText.exploreBtn}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className={`border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 ${language === 'bn' ? 'font-bengali' : ''}`} asChild>
                <Link to="/become-creator">
                  {currentText.submitBtn}
                </Link>
              </Button>
            </nav>

            {/* Stats */}
            <aside className="grid grid-cols-3 gap-6 pt-8" aria-label={language === 'bn' ? 'পরিসংখ্যান' : 'Statistics'}>
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
            </aside>
          </header>

          {/* Right Content - Live Demo */}
          <aside className="lg:pl-8" aria-label={language === 'bn' ? 'ট্রান্সলিটেরেশন টুল' : 'Transliteration Tool'}>
            <article className="bg-card/95 backdrop-blur-sm rounded-2xl shadow-elegant p-6 border border-border/20">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className={`font-semibold text-card-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
                    {language === 'bn' ? 'লাইভ ট্রান্সলিটেরেশন' : 'Live Transliteration'}
                  </h2>
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
                  <label htmlFor="translit-input" className="sr-only">
                    {language === 'bn' ? 'Roman Bangla ইনপুট' : 'Roman Bangla Input'}
                  </label>
                  <Input
                    id="translit-input"
                    placeholder={language === 'bn' ? 'Roman bangla likhun...' : 'Type in Roman Bangla...'}
                    value={translitInput}
                    onChange={(e) => handleTranslitChange(e.target.value)}
                    className="border-border/50 focus:border-primary"
                    aria-describedby="translit-output"
                  />
                  
                  <div 
                    id="translit-output"
                    className="bg-muted/50 rounded-lg p-4 min-h-[60px] border border-border/30"
                    role="region"
                    aria-live="polite"
                    aria-label={language === 'bn' ? 'বাংলা আউটপুট' : 'Bengali Output'}
                  >
                    <p className={`text-sm font-bengali text-bengali ${banglaOutput ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {banglaOutput || 
                        (language === 'bn' ? 'Roman Bangla টাইপ করুন এবং বাংলায় দেখুন' : 'Type in Roman Bangla to see Bengali output')
                      }
                    </p>
                  </div>
                  
                  <Button className={`w-full ${language === 'bn' ? 'font-bengali' : ''}`} variant="outline" asChild>
                    <Link to="/playground">
                      {currentText.tryPrompt}
                    </Link>
                  </Button>
                </div>
              </div>
            </article>
          </aside>
        </div>
      </div>
    </section>
  );
};