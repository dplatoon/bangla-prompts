import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  BookOpen, 
  Target, 
  Lightbulb, 
  CheckCircle, 
  ArrowRight, 
  Copy, 
  Sparkles,
  GraduationCap,
  Briefcase,
  Code,
  Palette,
  Youtube,
  FileText,
  Zap,
  Search,
  TrendingUp,
  MessageSquare,
  ExternalLink,
  Play
} from "lucide-react";
import { PROMPT_CATEGORIES } from "@/data/promptCategories";
import { useToast } from "@/hooks/use-toast";

const Guide = () => {
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');
  const { toast } = useToast();

  const breadcrumbItems = [
    { label: 'Guide', labelBn: 'গাইড' }
  ];

  // Get featured prompts from different categories for internal linking
  const getFeaturedPrompts = () => {
    const featured: Array<{
      categorySlug: string;
      categoryTitle: string;
      promptIndex: number;
      prompt: { title: string; copyText: string; usage: string };
    }> = [];
    
    // Pick 1-2 prompts from each category
    PROMPT_CATEGORIES.forEach((category) => {
      if (category.prompts.length > 0) {
        featured.push({
          categorySlug: category.slug,
          categoryTitle: category.title,
          promptIndex: 0,
          prompt: category.prompts[0]
        });
        if (category.prompts.length > 1) {
          featured.push({
            categorySlug: category.slug,
            categoryTitle: category.title,
            promptIndex: 1,
            prompt: category.prompts[1]
          });
        }
      }
    });
    
    return featured.slice(0, 12); // Limit to 12 featured prompts
  };

  const featuredPrompts = getFeaturedPrompts();

  const handleCopyPrompt = (promptText: string, promptTitle: string) => {
    navigator.clipboard.writeText(promptText);
    toast({
      title: language === 'bn' ? "কপি হয়েছে!" : "Copied!",
      description: language === 'bn' ? `"${promptTitle}" প্রম্পট কপি করা হয়েছে।` : `"${promptTitle}" prompt copied.`,
    });
  };

  const content = {
    bn: {
      title: "প্রম্পট ইঞ্জিনিয়ারিং গাইড ২০২৬",
      subtitle: "ChatGPT, Claude, Gemini - বাংলায় সম্পূর্ণ গাইড",
      description: "AI প্রম্পট লেখার কৌশল শিখুন এবং আপনার কাজে AI-এর সর্বোচ্চ সুবিধা নিন",
      whatIsTitle: "প্রম্পট ইঞ্জিনিয়ারিং কী?",
      whatIsDescription: "প্রম্পট ইঞ্জিনিয়ারিং হলো AI মডেলগুলোকে সঠিকভাবে নির্দেশনা দেওয়ার কৌশল। সঠিক প্রম্পট দিলে AI থেকে আরও ভালো, সঠিক এবং কার্যকর উত্তর পাওয়া যায়।",
      whyImportant: "কেন এটি গুরুত্বপূর্ণ?",
      whyImportantPoints: [
        "সময় বাঁচায় - ভালো প্রম্পট = কম রিভিশন",
        "মানসম্মত আউটপুট - প্রথমবারেই সঠিক ফলাফল",
        "বহুমুখী ব্যবহার - যেকোনো কাজে AI সাহায্য নিন",
        "প্রতিযোগিতামূলক সুবিধা - AI দক্ষতা এখন অপরিহার্য"
      ],
      coreMethodTitle: "CORE মেথড",
      coreMethodSubtitle: "চারটি ধাপে নিখুঁত প্রম্পট লিখুন",
      coreSteps: [
        {
          letter: "C",
          title: "Context (প্রসঙ্গ)",
          description: "AI-কে পরিস্থিতি সম্পর্কে বলুন। আপনি কে, কী করছেন, কোন পরিস্থিতিতে আছেন।",
          example: "আমি একজন বাংলাদেশি ফ্রিল্যান্সার যিনি আন্তর্জাতিক ক্লায়েন্টদের সাথে কাজ করেন..."
        },
        {
          letter: "O",
          title: "Objective (উদ্দেশ্য)",
          description: "আপনি AI থেকে ঠিক কী চান তা স্পষ্টভাবে বলুন। অস্পষ্টতা এড়িয়ে চলুন।",
          example: "আমার জন্য একটি পেশাদার ইমেইল টেমপ্লেট তৈরি করুন যা..."
        },
        {
          letter: "R",
          title: "Refinements (বিস্তারিত)",
          description: "অতিরিক্ত নির্দেশনা দিন - টোন, ফরম্যাট, দৈর্ঘ্য, স্টাইল ইত্যাদি।",
          example: "টোন হবে পেশাদার কিন্তু বন্ধুত্বপূর্ণ, ২০০ শব্দের মধ্যে, বুলেট পয়েন্ট সহ..."
        },
        {
          letter: "E",
          title: "Examples (উদাহরণ)",
          description: "সম্ভব হলে উদাহরণ দিন। AI উদাহরণ থেকে শিখে ভালো আউটপুট দেয়।",
          example: "এরকম স্টাইলে লিখুন: 'Dear [Name], I hope this email finds you well...'"
        }
      ],
      categoriesTitle: "ক্যাটাগরি অনুযায়ী প্রম্পট",
      categoriesSubtitle: "আপনার প্রয়োজন অনুযায়ী প্রম্পট খুঁজুন",
      viewCategory: "দেখুন",
      faqTitle: "সাধারণ প্রশ্নোত্তর",
      faqs: [
        {
          question: "প্রম্পট ইঞ্জিনিয়ারিং শিখতে কতদিন লাগে?",
          answer: "বেসিক ধারণা ১-২ দিনেই শেখা যায়। কিন্তু দক্ষ হতে নিয়মিত অনুশীলন দরকার। আমাদের প্রম্পট কপি করে ব্যবহার শুরু করুন এবং ধীরে ধীরে নিজে তৈরি করতে শিখুন।"
        },
        {
          question: "কোন AI মডেল সবচেয়ে ভালো?",
          answer: "প্রতিটি মডেলের নিজস্ব শক্তি আছে। ChatGPT সাধারণ কাজে ভালো, Claude দীর্ঘ টেক্সটে দক্ষ, Gemini রিসার্চে শক্তিশালী। আপনার কাজ অনুযায়ী বেছে নিন।"
        },
        {
          question: "বাংলায় প্রম্পট দিলে কি ভালো কাজ করে?",
          answer: "হ্যাঁ! আধুনিক AI মডেলগুলো বাংলা বোঝে এবং বাংলায় উত্তর দিতে পারে। তবে কিছু টেকনিক্যাল বিষয়ে ইংরেজি প্রম্পট ভালো কাজ করতে পারে।"
        },
        {
          question: "ফ্রিল্যান্সিংয়ে AI কীভাবে সাহায্য করে?",
          answer: "প্রপোজাল লেখা, ক্লায়েন্ট কমিউনিকেশন, কনটেন্ট ক্রিয়েশন, কোড রিভিউ - প্রায় সব কাজেই AI সাহায্য করতে পারে। আমাদের ফ্রিল্যান্সিং ক্যাটাগরি দেখুন।"
        },
        {
          question: "প্রম্পট কপি করে কি সরাসরি ব্যবহার করা যায়?",
          answer: "অবশ্যই! আমাদের সব প্রম্পট তৈরি করা হয়েছে সরাসরি ব্যবহারের জন্য। শুধু [ ] ব্র্যাকেটের ভিতরের অংশ আপনার তথ্য দিয়ে পূরণ করুন।"
        }
      ],
      ctaTitle: "এখনই শুরু করুন",
      ctaDescription: "৬০+ রেডি-টু-ইউজ প্রম্পট কপি করুন এক ক্লিকে",
      ctaButton: "প্রম্পট এক্সপ্লোর করুন",
      ctaSecondary: "প্লেগ্রাউন্ডে যান",
      tipsTitle: "প্রো টিপস",
      tips: [
        {
          icon: Target,
          title: "নির্দিষ্ট হোন",
          description: "অস্পষ্ট প্রম্পট = অস্পষ্ট উত্তর। যত স্পষ্ট, তত ভালো ফলাফল।"
        },
        {
          icon: MessageSquare,
          title: "ফলো-আপ করুন",
          description: "প্রথম উত্তর পছন্দ না হলে রিফাইন করতে বলুন।"
        },
        {
          icon: Lightbulb,
          title: "রোল অ্যাসাইন করুন",
          description: "'তুমি একজন এক্সপার্ট...' - এভাবে শুরু করলে ভালো কাজ হয়।"
        },
        {
          icon: CheckCircle,
          title: "ফরম্যাট বলে দিন",
          description: "বুলেট পয়েন্ট, টেবিল, প্যারাগ্রাফ - যেটা চান বলে দিন।"
        }
      ]
    },
    en: {
      title: "Prompt Engineering Guide 2026",
      subtitle: "Complete Guide for ChatGPT, Claude, Gemini in Bengali",
      description: "Learn AI prompt writing techniques and maximize AI benefits in your work",
      whatIsTitle: "What is Prompt Engineering?",
      whatIsDescription: "Prompt engineering is the technique of giving proper instructions to AI models. With the right prompts, you can get better, accurate, and more effective responses from AI.",
      whyImportant: "Why is it Important?",
      whyImportantPoints: [
        "Saves time - Good prompts = Less revisions",
        "Quality output - Correct results on first try",
        "Versatile usage - Use AI for any task",
        "Competitive advantage - AI skills are now essential"
      ],
      coreMethodTitle: "CORE Method",
      coreMethodSubtitle: "Write perfect prompts in four steps",
      coreSteps: [
        {
          letter: "C",
          title: "Context",
          description: "Tell AI about the situation. Who you are, what you're doing, what situation you're in.",
          example: "I am a Bangladeshi freelancer working with international clients..."
        },
        {
          letter: "O",
          title: "Objective",
          description: "Clearly state what you want from AI. Avoid ambiguity.",
          example: "Create a professional email template for me that..."
        },
        {
          letter: "R",
          title: "Refinements",
          description: "Give additional instructions - tone, format, length, style, etc.",
          example: "Tone should be professional but friendly, within 200 words, with bullet points..."
        },
        {
          letter: "E",
          title: "Examples",
          description: "If possible, provide examples. AI learns from examples and gives better output.",
          example: "Write in this style: 'Dear [Name], I hope this email finds you well...'"
        }
      ],
      categoriesTitle: "Prompts by Category",
      categoriesSubtitle: "Find prompts according to your needs",
      viewCategory: "View",
      faqTitle: "Frequently Asked Questions",
      faqs: [
        {
          question: "How long does it take to learn prompt engineering?",
          answer: "Basic concepts can be learned in 1-2 days. But becoming skilled requires regular practice. Start by copying our prompts and gradually learn to create your own."
        },
        {
          question: "Which AI model is the best?",
          answer: "Each model has its strengths. ChatGPT is good for general tasks, Claude is skilled at long texts, Gemini is powerful for research. Choose based on your work."
        },
        {
          question: "Do prompts work well in Bangla?",
          answer: "Yes! Modern AI models understand Bangla and can respond in Bangla. However, English prompts may work better for some technical topics."
        },
        {
          question: "How does AI help in freelancing?",
          answer: "Proposal writing, client communication, content creation, code review - AI can help with almost everything. Check our freelancing category."
        },
        {
          question: "Can copied prompts be used directly?",
          answer: "Absolutely! All our prompts are designed for direct use. Just fill in the parts inside [ ] brackets with your information."
        }
      ],
      ctaTitle: "Get Started Now",
      ctaDescription: "Copy 60+ ready-to-use prompts with one click",
      ctaButton: "Explore Prompts",
      ctaSecondary: "Go to Playground",
      tipsTitle: "Pro Tips",
      tips: [
        {
          icon: Target,
          title: "Be Specific",
          description: "Vague prompt = Vague answer. The clearer, the better results."
        },
        {
          icon: MessageSquare,
          title: "Follow Up",
          description: "If the first answer isn't satisfactory, ask to refine."
        },
        {
          icon: Lightbulb,
          title: "Assign a Role",
          description: "'You are an expert...' - Starting like this works well."
        },
        {
          icon: CheckCircle,
          title: "Specify Format",
          description: "Bullet points, tables, paragraphs - tell what you want."
        }
      ]
    }
  };

  const t = content[language];

  const categoryIcons: Record<string, React.ElementType> = {
    'seo-bangla': Search,
    'marketing': TrendingUp,
    'freelancing': Briefcase,
    'students': GraduationCap,
    'coding': Code,
    'business': Briefcase,
    'creative-art': Palette,
    'youtube-growth': Youtube,
    'bangla-writing': FileText,
    'productivity': Zap
  };

  // Generate FAQ structured data
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": t.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  // Generate HowTo structured data for CORE Method
  const howToStructuredData = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": language === 'bn' ? "কীভাবে নিখুঁত AI প্রম্পট লিখবেন" : "How to Write Perfect AI Prompts",
    "description": language === 'bn' 
      ? "CORE মেথড ব্যবহার করে ChatGPT, Claude এবং অন্যান্য AI-এর জন্য কার্যকর প্রম্পট লিখুন।"
      : "Write effective prompts for ChatGPT, Claude and other AI using the CORE Method.",
    "step": t.coreSteps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.title,
      "text": step.description,
      "itemListElement": {
        "@type": "HowToDirection",
        "text": step.example
      }
    }))
  };

  // Combine structured data as object for SEOHead
  const combinedStructuredData = {
    "@context": "https://schema.org",
    "@graph": [faqStructuredData, howToStructuredData]
  };

  return (
    <>
      <SEOHead 
        title={language === 'bn' 
          ? "প্রম্পট ইঞ্জিনিয়ারিং গাইড ২০২৬ | ChatGPT বাংলা টিউটোরিয়াল | BdPrompt"
          : "Prompt Engineering Guide 2026 | ChatGPT Bengali Tutorial | BdPrompt"}
        description={language === 'bn'
          ? "ChatGPT, Claude, Gemini-এর জন্য বাংলায় সম্পূর্ণ প্রম্পট ইঞ্জিনিয়ারিং গাইড। CORE মেথড শিখুন এবং ৬০+ রেডি প্রম্পট ব্যবহার করুন।"
          : "Complete prompt engineering guide in Bengali for ChatGPT, Claude, Gemini. Learn CORE Method and use 60+ ready prompts."}
        keywords={language === 'bn'
          ? "প্রম্পট ইঞ্জিনিয়ারিং, ChatGPT বাংলা, AI গাইড, CORE মেথড, বাংলা AI প্রম্পট, Claude বাংলা"
          : "prompt engineering, ChatGPT Bengali, AI guide, CORE Method, Bangla AI prompts, Claude Bengali"}
        canonicalUrl="https://bdprompt.com/guide"
        language={language}
        structuredData={combinedStructuredData}
      />
      <div className="min-h-screen bg-background">
        <Header language={language} onLanguageChange={setLanguage} />
        
        <main className="container mx-auto px-4 py-8">
          <Breadcrumbs items={breadcrumbItems} language={language} className="mb-8" />

          {/* Hero Section */}
          <section className="text-center mb-16">
            <Badge className="mb-4" variant="secondary">
              <BookOpen className="w-4 h-4 mr-2" />
              {language === 'bn' ? 'সম্পূর্ণ গাইড' : 'Complete Guide'}
            </Badge>
            <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${language === 'bn' ? 'font-bengali' : ''}`}>
              {t.title}
            </h1>
            <p className={`text-xl text-muted-foreground mb-4 ${language === 'bn' ? 'font-bengali' : ''}`}>
              {t.subtitle}
            </p>
            <p className={`text-lg text-muted-foreground max-w-2xl mx-auto ${language === 'bn' ? 'font-bengali' : ''}`}>
              {t.description}
            </p>
          </section>

          {/* What is Prompt Engineering */}
          <section className="mb-16">
            <Card className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10">
                <CardTitle className={`text-2xl ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {t.whatIsTitle}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className={`text-lg mb-6 ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {t.whatIsDescription}
                </p>
                <div className="bg-muted rounded-lg p-6">
                  <h3 className={`font-semibold mb-4 ${language === 'bn' ? 'font-bengali' : ''}`}>
                    {t.whyImportant}
                  </h3>
                  <ul className="space-y-3">
                    {t.whyImportantPoints.map((point, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className={language === 'bn' ? 'font-bengali' : ''}>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </section>

          {/* CORE Method */}
          <section className="mb-16">
            <div className="text-center mb-8">
              <Badge className="mb-4" variant="default">
                <Sparkles className="w-4 h-4 mr-2" />
                {language === 'bn' ? 'মূল কৌশল' : 'Core Technique'}
              </Badge>
              <h2 className={`text-3xl font-bold mb-2 ${language === 'bn' ? 'font-bengali' : ''}`}>
                {t.coreMethodTitle}
              </h2>
              <p className={`text-muted-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
                {t.coreMethodSubtitle}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {t.coreSteps.map((step, index) => (
                <Card key={index} className="relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-16 h-16 bg-primary/10 flex items-center justify-center">
                    <span className="text-3xl font-bold text-primary">{step.letter}</span>
                  </div>
                  <CardHeader className="pl-20">
                    <CardTitle className={language === 'bn' ? 'font-bengali' : ''}>
                      {step.title}
                    </CardTitle>
                    <CardDescription className={language === 'bn' ? 'font-bengali' : ''}>
                      {step.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pl-20">
                    <div className="bg-muted rounded-lg p-4 text-sm">
                      <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                        <Copy className="w-4 h-4" />
                        <span>{language === 'bn' ? 'উদাহরণ:' : 'Example:'}</span>
                      </div>
                      <p className={`italic ${language === 'bn' ? 'font-bengali' : ''}`}>
                        "{step.example}"
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Pro Tips */}
          <section className="mb-16">
            <h2 className={`text-2xl font-bold text-center mb-8 ${language === 'bn' ? 'font-bengali' : ''}`}>
              {t.tipsTitle}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {t.tips.map((tip, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <tip.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className={`font-semibold mb-2 ${language === 'bn' ? 'font-bengali' : ''}`}>
                      {tip.title}
                    </h3>
                    <p className={`text-sm text-muted-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
                      {tip.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Featured Prompts with Try This Prompt CTAs */}
          <section className="mb-16">
            <div className="text-center mb-8">
              <Badge className="mb-4" variant="default">
                <Play className="w-4 h-4 mr-2" />
                {language === 'bn' ? 'ট্রাই করুন' : 'Try Now'}
              </Badge>
              <h2 className={`text-3xl font-bold mb-2 ${language === 'bn' ? 'font-bengali' : ''}`}>
                {language === 'bn' ? 'জনপ্রিয় প্রম্পট সমূহ' : 'Popular Prompts'}
              </h2>
              <p className={`text-muted-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
                {language === 'bn' 
                  ? 'এই প্রম্পটগুলো এখনই কপি করে ChatGPT বা Claude-এ ব্যবহার করুন' 
                  : 'Copy these prompts and use them in ChatGPT or Claude right now'}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuredPrompts.map((item, index) => (
                <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <Link 
                          to={`/prompts/${item.categorySlug}`}
                          className="text-xs text-primary hover:underline inline-flex items-center gap-1 mb-1"
                        >
                          <ExternalLink className="w-3 h-3" />
                          {language === 'bn' ? 'ক্যাটাগরি দেখুন' : 'View Category'}
                        </Link>
                        <CardTitle className="text-base">{item.prompt.title}</CardTitle>
                      </div>
                    </div>
                    <CardDescription className={`text-xs line-clamp-2 ${language === 'bn' ? 'font-bengali' : ''}`}>
                      {item.prompt.usage}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="bg-muted rounded-lg p-3 mb-4 max-h-24 overflow-hidden relative">
                      <p className="text-xs text-muted-foreground font-mono line-clamp-3">
                        {item.prompt.copyText.slice(0, 150)}...
                      </p>
                      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-muted to-transparent" />
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="default"
                        className={`flex-1 ${language === 'bn' ? 'font-bengali' : ''}`}
                        onClick={() => handleCopyPrompt(item.prompt.copyText, item.prompt.title)}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        {language === 'bn' ? 'কপি করুন' : 'Copy'}
                      </Button>
                      <Link to={`/prompts/${item.categorySlug}`}>
                        <Button 
                          size="sm" 
                          variant="outline"
                          className={language === 'bn' ? 'font-bengali' : ''}
                        >
                          <Play className="w-4 h-4 mr-1" />
                          {language === 'bn' ? 'আরো দেখুন' : 'See More'}
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Link to="/explore">
                <Button size="lg" variant="outline" className={language === 'bn' ? 'font-bengali' : ''}>
                  {language === 'bn' ? 'সব প্রম্পট দেখুন' : 'View All Prompts'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </section>

          {/* Categories */}
          <section className="mb-16">
            <div className="text-center mb-8">
              <h2 className={`text-3xl font-bold mb-2 ${language === 'bn' ? 'font-bengali' : ''}`}>
                {t.categoriesTitle}
              </h2>
              <p className={`text-muted-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
                {t.categoriesSubtitle}
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {PROMPT_CATEGORIES.map((category) => {
                const IconComponent = categoryIcons[category.slug] || FileText;
                return (
                  <Link key={category.slug} to={`/prompts/${category.slug}`}>
                    <Card className="h-full hover:border-primary transition-colors cursor-pointer group">
                      <CardContent className="pt-6 text-center">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                          <IconComponent className="w-5 h-5 text-primary" />
                        </div>
                        <h3 className={`font-medium mb-1 ${language === 'bn' ? 'font-bengali' : ''}`}>
                          {category.title}
                        </h3>
                        <Badge variant="secondary" className="text-xs">
                          {category.prompts.length} {language === 'bn' ? 'প্রম্পট' : 'prompts'}
                        </Badge>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </section>

          {/* FAQ */}
          <section className="mb-16">
            <h2 className={`text-2xl font-bold text-center mb-8 ${language === 'bn' ? 'font-bengali' : ''}`}>
              {t.faqTitle}
            </h2>
            <Card>
              <CardContent className="pt-6">
                <Accordion type="single" collapsible className="w-full">
                  {t.faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`faq-${index}`}>
                      <AccordionTrigger className={language === 'bn' ? 'font-bengali text-left' : 'text-left'}>
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className={language === 'bn' ? 'font-bengali' : ''}>
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </section>

          {/* CTA */}
          <section className="text-center py-12 px-6 bg-gradient-to-r from-primary/10 via-accent/5 to-primary/10 rounded-2xl">
            <h2 className={`text-3xl font-bold mb-4 ${language === 'bn' ? 'font-bengali' : ''}`}>
              {t.ctaTitle}
            </h2>
            <p className={`text-lg text-muted-foreground mb-8 ${language === 'bn' ? 'font-bengali' : ''}`}>
              {t.ctaDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/explore">
                <Button size="lg" className={language === 'bn' ? 'font-bengali' : ''}>
                  {t.ctaButton}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/playground">
                <Button size="lg" variant="outline" className={language === 'bn' ? 'font-bengali' : ''}>
                  {t.ctaSecondary}
                </Button>
              </Link>
            </div>
          </section>
        </main>

        <Footer language={language} />
      </div>
    </>
  );
};

export default Guide;
