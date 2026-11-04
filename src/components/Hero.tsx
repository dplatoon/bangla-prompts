import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Sparkles, Copy, Play, CheckCircle2, Search } from "lucide-react";
import { romanToBangla } from "@/utils/transliteration";
import { useToast } from "@/hooks/use-toast";
import { trackTransliterationUsed } from "@/utils/analytics";
import { promptCountLabel, promptCountLabelBn, categoryCountLabel, categoryCountLabelBn } from "@/config/siteStats";

interface HeroProps {
  language: 'bn' | 'en';
}

export const Hero = ({ language }: HeroProps) => {
  const [translitInput, setTranslitInput] = useState("");
  const [banglaOutput, setBanglaOutput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    navigate(q ? `/explore?q=${encodeURIComponent(q)}` : "/explore");
  };

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
      subhead: `Students, freelancers, writers ও businesses — ChatGPT, Claude এবং Gemini-এর জন্য ${promptCountLabelBn} ready-to-use বাংলা prompts, প্রায় সবগুলোই ফ্রি। সাইনআপ ছাড়াই এক ক্লিকে কপি করুন।`,
      exploreBtn: "প্রম্পট এক্সপ্লোর করুন",
      playgroundBtn: "প্লেগ্রাউন্ডে চেষ্টা করুন",
      searchPlaceholder: "প্রম্পট খুঁজুন...",
      searchLabel: "প্রম্পট সার্চ",
      searchBtn: "খুঁজুন",
      audienceLabel: "আপনি কে?",
      audiences: [
        { label: "শিক্ষার্থী", to: "/shikkha" },
        { label: "ফ্রিল্যান্সার", to: "/freelancer-prompts" },
        { label: "ব্যবসা", to: "/business" },
        { label: "কন্টেন্ট ক্রিয়েটর", to: "/explore/content" },
      ],
      featuredLabel: "জনপ্রিয় বিষয়",
      featured: [
        { label: "SSC পরীক্ষার প্রম্পট", desc: "পড়াশোনা ও প্রস্তুতি", to: "/ssc-exam-prompts" },
        { label: "ফ্রিল্যান্সার প্রম্পট", desc: "Fiverr ও Upwork-এর কাজের ধারায়", to: "/freelancer-prompts" },
        { label: "ChatGPT বাংলা গাইড", desc: "২০+ কপি-রেডি প্রম্পট টিপসসহ", to: "/blog/chatgpt-bangla-prompt" },
      ],
      tryPrompt: "এখনই চেষ্টা করুন",
      placeholder: "আপনার প্রম্পট লিখুন...",
      translitTitle: "লাইভ ট্রান্সলিটেরেশন",
      translitPlaceholder: "Roman bangla likhun...",
      translitOutput: "Roman Bangla টাইপ করুন এবং বাংলায় দেখুন",
      copied: "কপি হয়েছে!",
      copiedDesc: "বাংলা টেক্সট কপি হয়েছে",
      freeNote: "বেশিরভাগ প্রম্পট ফ্রি",
      signupNote: "একাউন্ট লাগবে না",
      stats: [
        { value: promptCountLabelBn, label: "প্রম্পট টেমপ্লেট" },
        { value: categoryCountLabelBn, label: "ক্যাটাগরি" },
        { value: "১০০%", label: "বাংলায় তৈরি" }
      ]
    },
    en: {
      headline: "Free Bangla AI Prompt Generator — Built for Bangladesh",
      subhead: `Students, freelancers, writers & businesses — ${promptCountLabel} ready-to-use Bangla prompts for ChatGPT, Claude & Gemini, nearly all free. One-click copy, no signup needed.`,
      exploreBtn: "Explore Prompts",
      playgroundBtn: "Try the Playground",
      searchPlaceholder: "Search prompts...",
      searchLabel: "Search prompts",
      searchBtn: "Search",
      audienceLabel: "Who are you?",
      audiences: [
        { label: "Student", to: "/shikkha" },
        { label: "Freelancer", to: "/freelancer-prompts" },
        { label: "Business", to: "/business" },
        { label: "Content Creator", to: "/explore/content" },
      ],
      featuredLabel: "Popular topics",
      featured: [
        { label: "SSC exam prompts", desc: "Study & exam preparation", to: "/ssc-exam-prompts" },
        { label: "Freelancer prompts", desc: "Built for Fiverr & Upwork work", to: "/freelancer-prompts" },
        { label: "ChatGPT Bangla guide", desc: "20+ copy-ready prompts with tips", to: "/blog/chatgpt-bangla-prompt" },
      ],
      tryPrompt: "Try Now",
      placeholder: "Write your prompt...",
      translitTitle: "Live Transliteration",
      translitPlaceholder: "Type in Roman Bangla...",
      translitOutput: "Type in Roman Bangla to see Bangla output",
      copied: "Copied!",
      copiedDesc: "Bangla text copied",
      freeNote: "Most prompts free",
      signupNote: "No signup needed",
      stats: [
        { value: promptCountLabel, label: "Prompt Templates" },
        { value: categoryCountLabel, label: "Categories" },
        { value: "100%", label: "Built in Bangla" }
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
                  {language === 'bn' ? 'নিয়মিত নতুন প্রম্পট যোগ হচ্ছে' : 'New prompts added regularly'}
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

            {/* Search — primary affordance */}
            <form onSubmit={handleSearchSubmit} role="search" className="flex flex-col sm:flex-row gap-3">
              <label htmlFor="hero-search" className="sr-only">{currentText.searchLabel}</label>
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" aria-hidden="true" />
                <Input
                  id="hero-search"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={currentText.searchPlaceholder}
                  className={`h-14 pl-12 rounded-xl text-base bg-card border-transparent shadow-lg ${language === 'bn' ? 'font-bengali' : ''}`}
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className={`h-14 px-8 rounded-xl font-semibold bg-accent text-accent-foreground hover:bg-accent/90 ${language === 'bn' ? 'font-bengali' : ''}`}
              >
                {currentText.searchBtn}
              </Button>
            </form>

            {/* Audience entry points */}
            <nav className="flex flex-wrap items-center gap-2" aria-label={currentText.audienceLabel}>
              <span className={`text-sm text-primary-foreground/60 mr-1 ${language === 'bn' ? 'font-bengali' : ''}`}>
                {currentText.audienceLabel}
              </span>
              {currentText.audiences.map((a) => (
                <Link
                  key={a.to}
                  to={a.to}
                  className={`text-sm px-3 py-1.5 rounded-full border border-primary-foreground/25 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 transition-colors ${language === 'bn' ? 'font-bengali' : ''}`}
                >
                  {a.label}
                </Link>
              ))}
            </nav>

            {/* Quick access to top 3 landing pages */}
            <nav className="grid grid-cols-1 sm:grid-cols-3 gap-3" aria-label={currentText.featuredLabel}>
              {currentText.featured.map((f) => (
                <Link
                  key={f.to}
                  to={f.to}
                  className={`group rounded-xl border border-primary-foreground/20 bg-primary-foreground/10 backdrop-blur-sm px-4 py-3 hover:bg-primary-foreground/20 hover:border-primary-foreground/35 transition-colors ${language === 'bn' ? 'font-bengali' : ''}`}
                >
                  <span className="flex items-center justify-between text-sm font-semibold text-primary-foreground">
                    {f.label}
                    <ArrowRight className="w-4 h-4 opacity-60 group-hover:translate-x-0.5 group-hover:opacity-100 transition-all" aria-hidden="true" />
                  </span>
                  <span className="block text-xs text-primary-foreground/65 mt-0.5">{f.desc}</span>
                </Link>
              ))}
            </nav>

            {/* CTAs */}
            <nav className="flex flex-col sm:flex-row gap-3 sm:gap-4" aria-label={language === 'bn' ? 'প্রধান অ্যাকশন' : 'Main actions'}>
              <Button size="lg" className={`group bg-primary-foreground text-primary hover:bg-primary-foreground/90 font-semibold text-base px-8 h-12 rounded-xl shadow-lg ${language === 'bn' ? 'font-bengali' : ''}`} asChild>
                <Link to="/explore">
                  {currentText.exploreBtn}
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" className={`border border-primary-foreground/30 bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 font-semibold text-base px-8 h-12 rounded-xl backdrop-blur-sm ${language === 'bn' ? 'font-bengali' : ''}`} asChild>
                <Link to="/playground">
                  {currentText.playgroundBtn}
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
                      aria-label={language === 'bn' ? 'বাংলা আউটপুট কপি করুন' : 'Copy Bangla output'}
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
                      aria-label={language === 'bn' ? 'উদাহরণ ট্রান্সলিটেরেশন চালান' : 'Play sample transliteration'}
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
                    {currentText.freeNote}
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                    {currentText.signupNote}
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
