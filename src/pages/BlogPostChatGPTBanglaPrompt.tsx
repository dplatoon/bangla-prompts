import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { buildArticleGraph } from "@/lib/bdprompt-schema";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Clock, 
  User, 
  ArrowRight, 
  Copy, 
  CheckCircle,
  GraduationCap,
  Briefcase,
  Lightbulb,
  BookOpen,
  Code,
  PenTool,
  Share2
} from "lucide-react";
import { toast } from "sonner";

const BlogPostChatGPTBanglaPrompt = () => {
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);

  useEffect(() => {
    const savedLang = localStorage.getItem('bdprompt-language') as 'bn' | 'en' || 'bn';
    setLanguage(savedLang);
  }, []);

  const handleLanguageChange = (lang: 'bn' | 'en') => {
    setLanguage(lang);
    localStorage.setItem('bdprompt-language', lang);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPrompt(id);
    toast.success(language === 'bn' ? "প্রম্পট কপি হয়েছে!" : "Prompt copied!");
    setTimeout(() => setCopiedPrompt(null), 2000);
  };

  const content = {
    bn: {
      title: "ChatGPT বাংলা প্রম্পট: ছাত্র ও পেশাদারদের জন্য সেরা ২০+ প্রম্পট গাইড",
      subtitle: "বাংলায় ChatGPT ব্যবহার করে পড়াশোনা, কাজ ও সৃজনশীলতায় এগিয়ে যান",
      author: "BD Prompt টিম",
      date: "২৩ জানুয়ারি, ২০২৬",
      readTime: "১২ মিনিট পড়া",
      category: "গাইড",
      
      intro: `ChatGPT এখন বাংলাদেশে লাখ লাখ মানুষের দৈনন্দিন কাজের অংশ হয়ে উঠেছে। কিন্তু সঠিক প্রম্পট না জানলে এর পূর্ণ সুবিধা পাওয়া যায় না। এই গাইডে আমরা শেয়ার করছি ছাত্র ও পেশাদারদের জন্য সেরা বাংলা প্রম্পট যা আপনার পড়াশোনা, অফিসের কাজ এবং সৃজনশীল প্রজেক্টে সাহায্য করবে।`,
      
      whyBanglaTitle: "কেন বাংলায় প্রম্পট লেখা গুরুত্বপূর্ণ?",
      whyBanglaContent: `বাংলায় প্রম্পট লেখার বেশ কিছু সুবিধা আছে:
      
• **স্বাভাবিক চিন্তা**: মাতৃভাষায় চিন্তা করলে আরও সৃজনশীল আইডিয়া আসে
• **সঠিক প্রসঙ্গ**: বাংলাদেশের সংস্কৃতি ও প্রেক্ষাপট সঠিকভাবে বোঝানো যায়
• **দ্রুত আউটপুট**: ইংরেজিতে অনুবাদের ঝামেলা নেই
• **বেশি নির্ভুলতা**: স্থানীয় উদাহরণ ও রেফারেন্স সহজে দেওয়া যায়`,

      studentSectionTitle: "ছাত্রদের জন্য সেরা বাংলা প্রম্পট",
      studentSectionDesc: "পড়াশোনা, অ্যাসাইনমেন্ট ও পরীক্ষার প্রস্তুতির জন্য",
      
      professionalSectionTitle: "পেশাদারদের জন্য বাংলা প্রম্পট",
      professionalSectionDesc: "অফিসের কাজ, ব্যবসা ও ক্যারিয়ার ডেভেলপমেন্টের জন্য",
      
      creativeSectionTitle: "সৃজনশীল কাজের জন্য প্রম্পট",
      creativeSectionDesc: "কন্টেন্ট তৈরি, লেখালেখি ও সোশ্যাল মিডিয়ার জন্য",
      
      tipsTitle: "প্রম্পট লেখার সোনালী নিয়ম",
      tipsContent: [
        {
          title: "স্পষ্ট নির্দেশনা দিন",
          desc: "ChatGPT-কে বলুন আপনি ঠিক কী চান, কেন চান এবং কোন ফরম্যাটে চান।"
        },
        {
          title: "প্রসঙ্গ যোগ করুন",
          desc: "আপনার পরিস্থিতি, শ্রোতা এবং উদ্দেশ্য স্পষ্ট করুন।"
        },
        {
          title: "উদাহরণ দিন",
          desc: "আপনি কী ধরনের আউটপুট চান তার একটি উদাহরণ দিলে ভালো ফলাফল পাবেন।"
        },
        {
          title: "ধাপে ধাপে বলুন",
          desc: "বড় কাজ ছোট ছোট ধাপে ভাগ করে বলুন।"
        }
      ],
      
      ctaTitle: "আরও ৬০+ বাংলা প্রম্পট পেতে",
      ctaDesc: "BD Prompt-এ রেজিস্টার করুন এবং বিনামূল্যে বাংলা AI প্রম্পট ব্যবহার করুন।",
      ctaButton: "প্রম্পট এক্সপ্লোর করুন",
      
      relatedTitle: "সম্পর্কিত রিসোর্স",
      copyButton: "কপি করুন",
      copiedButton: "কপি হয়েছে!",
      sharePost: "শেয়ার করুন"
    },
    en: {
      title: "ChatGPT Bangla Prompts: Ultimate Guide for Students & Professionals",
      subtitle: "Master ChatGPT in Bengali for studies, work, and creativity",
      author: "BD Prompt Team",
      date: "January 23, 2026",
      readTime: "12 min read",
      category: "Guide",
      
      intro: `ChatGPT has become an essential tool for millions of people in Bangladesh. However, without knowing the right prompts, you can't leverage its full potential. In this guide, we share the best Bengali prompts for students and professionals to help with studies, office work, and creative projects.`,
      
      whyBanglaTitle: "Why Write Prompts in Bengali?",
      whyBanglaContent: `Writing prompts in Bengali has several advantages:
      
• **Natural Thinking**: Creative ideas flow better in your mother tongue
• **Correct Context**: Bangladeshi culture and context can be accurately conveyed
• **Faster Output**: No need for English translation
• **More Accuracy**: Local examples and references are easier to provide`,

      studentSectionTitle: "Best Bengali Prompts for Students",
      studentSectionDesc: "For studies, assignments, and exam preparation",
      
      professionalSectionTitle: "Bengali Prompts for Professionals",
      professionalSectionDesc: "For office work, business, and career development",
      
      creativeSectionTitle: "Prompts for Creative Work",
      creativeSectionDesc: "For content creation, writing, and social media",
      
      tipsTitle: "Golden Rules for Writing Prompts",
      tipsContent: [
        {
          title: "Give Clear Instructions",
          desc: "Tell ChatGPT exactly what you want, why you want it, and in what format."
        },
        {
          title: "Add Context",
          desc: "Clarify your situation, audience, and purpose."
        },
        {
          title: "Provide Examples",
          desc: "Giving an example of the output you want yields better results."
        },
        {
          title: "Break It Down",
          desc: "Divide big tasks into smaller steps."
        }
      ],
      
      ctaTitle: "Get 60+ More Bengali Prompts",
      ctaDesc: "Register on BD Prompt and use Bengali AI prompts for free.",
      ctaButton: "Explore Prompts",
      
      relatedTitle: "Related Resources",
      copyButton: "Copy",
      copiedButton: "Copied!",
      sharePost: "Share"
    }
  };

  const studentPrompts = [
    {
      id: "student-1",
      titleBn: "বিষয় সহজে বোঝার প্রম্পট",
      titleEn: "Topic Explanation Prompt",
      promptBn: `তুমি একজন বাংলাদেশি শিক্ষক। আমাকে [বিষয়ের নাম] বিষয়টি এমনভাবে বোঝাও যেন একজন ৮ম শ্রেণির ছাত্র সহজে বুঝতে পারে। বাস্তব জীবনের উদাহরণ দাও এবং বাংলাদেশের প্রেক্ষাপটে ব্যাখ্যা করো।`,
      promptEn: `You are a Bangladeshi teacher. Explain [topic name] to me in a way that an 8th-grade student can easily understand. Give real-life examples and explain in the context of Bangladesh.`,
      icon: BookOpen
    },
    {
      id: "student-2",
      titleBn: "অ্যাসাইনমেন্ট আউটলাইন",
      titleEn: "Assignment Outline",
      promptBn: `আমার [বিষয়] এর উপর একটি ২০০০ শব্দের অ্যাসাইনমেন্ট লিখতে হবে। একটি বিস্তারিত আউটলাইন তৈরি করো যাতে ভূমিকা, মূল অংশের ৫টি পয়েন্ট এবং উপসংহার থাকে। প্রতিটি পয়েন্টে কী লিখতে হবে তার সংক্ষিপ্ত ধারণা দাও।`,
      promptEn: `I need to write a 2000-word assignment on [topic]. Create a detailed outline including introduction, 5 main body points, and conclusion. Give a brief idea of what to write in each point.`,
      icon: GraduationCap
    },
    {
      id: "student-3",
      titleBn: "পরীক্ষার প্রস্তুতি প্রম্পট",
      titleEn: "Exam Preparation Prompt",
      promptBn: `আমি [বিষয়] এর জন্য প্রস্তুতি নিচ্ছি। এই বিষয়ের সবচেয়ে গুরুত্বপূর্ণ ১০টি প্রশ্ন তৈরি করো যা পরীক্ষায় আসতে পারে এবং প্রতিটি প্রশ্নের সংক্ষিপ্ত উত্তর দাও। বাংলাদেশের শিক্ষা বোর্ডের প্রশ্নপত্রের ধরন অনুসরণ করো।`,
      promptEn: `I'm preparing for [subject]. Create the 10 most important questions that might appear in the exam and give a brief answer to each. Follow the Bangladesh Education Board question paper format.`,
      icon: GraduationCap
    },
    {
      id: "student-4",
      titleBn: "গবেষণা সারসংক্ষেপ",
      titleEn: "Research Summary",
      promptBn: `এই আর্টিকেল/টেক্সটের মূল পয়েন্টগুলো বাংলায় সারসংক্ষেপ করো। ৫টি বুলেট পয়েন্টে প্রধান ধারণাগুলো তুলে ধরো এবং শেষে একটি সংক্ষিপ্ত উপসংহার দাও।

[আর্টিকেল পেস্ট করো]`,
      promptEn: `Summarize the main points of this article/text in Bengali. Present the main ideas in 5 bullet points and give a brief conclusion at the end.

[Paste article]`,
      icon: BookOpen
    }
  ];

  const professionalPrompts = [
    {
      id: "pro-1",
      titleBn: "প্রফেশনাল ইমেইল লেখা",
      titleEn: "Professional Email Writing",
      promptBn: `আমার বসের কাছে [বিষয়] নিয়ে একটি প্রফেশনাল ইমেইল লিখতে হবে। টোন হবে বিনয়ী কিন্তু আত্মবিশ্বাসী। ইমেইলে আমার অনুরোধ স্পষ্টভাবে বুঝিয়ে বলতে হবে এবং শেষে একটি কল-টু-অ্যাকশন থাকতে হবে। বাংলাদেশি অফিস কালচার অনুযায়ী লেখো।`,
      promptEn: `I need to write a professional email to my boss about [topic]. The tone should be polite but confident. The email should clearly explain my request and end with a call-to-action. Write according to Bangladeshi office culture.`,
      icon: Briefcase
    },
    {
      id: "pro-2",
      titleBn: "মিটিং মিনিটস তৈরি",
      titleEn: "Meeting Minutes Creation",
      promptBn: `এই মিটিং নোটস থেকে একটি ফরম্যাল মিটিং মিনিটস তৈরি করো। অংশগ্রহণকারীদের তালিকা, আলোচিত বিষয়, সিদ্ধান্ত এবং পরবর্তী কাজের তালিকা অন্তর্ভুক্ত করো।

[মিটিং নোটস পেস্ট করো]`,
      promptEn: `Create formal meeting minutes from these meeting notes. Include list of participants, topics discussed, decisions, and action items.

[Paste meeting notes]`,
      icon: Briefcase
    },
    {
      id: "pro-3",
      titleBn: "সিভি/রিজিউমে আপডেট",
      titleEn: "CV/Resume Update",
      promptBn: `আমি একজন [আপনার প্রফেশন] এবং [নতুন পজিশন] এর জন্য আবেদন করতে চাই। আমার বর্তমান সিভি রিভিউ করো এবং এই পজিশনের জন্য কীভাবে আরও আকর্ষণীয় করা যায় তার পরামর্শ দাও। ATS-ফ্রেন্ডলি কীওয়ার্ড সাজেস্ট করো।

[সিভি পেস্ট করো]`,
      promptEn: `I am a [your profession] and want to apply for [new position]. Review my current CV and suggest how to make it more attractive for this position. Suggest ATS-friendly keywords.

[Paste CV]`,
      icon: Briefcase
    },
    {
      id: "pro-4",
      titleBn: "প্রেজেন্টেশন স্ক্রিপ্ট",
      titleEn: "Presentation Script",
      promptBn: `[বিষয়] নিয়ে ১০ মিনিটের একটি প্রেজেন্টেশন স্ক্রিপ্ট লিখো। শ্রোতা হবে [টার্গেট অডিয়েন্স]। প্রতিটি স্লাইডের জন্য কী বলতে হবে এবং কোন ভিজুয়াল ব্যবহার করতে হবে তার পরামর্শ দাও।`,
      promptEn: `Write a 10-minute presentation script on [topic]. The audience will be [target audience]. Suggest what to say for each slide and what visuals to use.`,
      icon: Lightbulb
    }
  ];

  const creativePrompts = [
    {
      id: "creative-1",
      titleBn: "সোশ্যাল মিডিয়া পোস্ট",
      titleEn: "Social Media Post",
      promptBn: `আমার [ব্যবসা/ব্র্যান্ড] এর জন্য ফেসবুক পোস্ট লিখো। বিষয়: [বিষয়]। টার্গেট অডিয়েন্স বাংলাদেশি তরুণরা (১৮-৩৫ বছর)। পোস্টে ইমোজি ব্যবহার করো, ২-৩টি হ্যাশট্যাগ দাও এবং একটি আকর্ষণীয় CTA যোগ করো।`,
      promptEn: `Write a Facebook post for my [business/brand]. Topic: [topic]. Target audience is Bangladeshi youth (18-35 years). Use emojis, give 2-3 hashtags, and add an attractive CTA.`,
      icon: Share2
    },
    {
      id: "creative-2",
      titleBn: "ব্লগ পোস্ট আইডিয়া",
      titleEn: "Blog Post Ideas",
      promptBn: `[আপনার নিশ] বিষয়ে ১০টি ব্লগ পোস্ট আইডিয়া দাও যা বাংলাদেশি পাঠকদের আকৃষ্ট করবে। প্রতিটি আইডিয়ার জন্য একটি আকর্ষণীয় শিরোনাম এবং সংক্ষিপ্ত বিবরণ দাও। SEO-ফ্রেন্ডলি কীওয়ার্ড সাজেস্ট করো।`,
      promptEn: `Give 10 blog post ideas on [your niche] that will attract Bangladeshi readers. Give an attractive title and brief description for each idea. Suggest SEO-friendly keywords.`,
      icon: PenTool
    },
    {
      id: "creative-3",
      titleBn: "YouTube ভিডিও স্ক্রিপ্ট",
      titleEn: "YouTube Video Script",
      promptBn: `[বিষয়] নিয়ে ৮-১০ মিনিটের একটি YouTube ভিডিও স্ক্রিপ্ট লিখো। একটি হুক দিয়ে শুরু করো, মাঝে ৩-৫টি মূল পয়েন্ট এবং শেষে CTA দাও। বাংলাদেশি দর্শকদের জন্য কথ্য বাংলায় লেখো।`,
      promptEn: `Write an 8-10 minute YouTube video script on [topic]. Start with a hook, include 3-5 main points in the middle, and end with a CTA. Write in conversational Bengali for Bangladeshi viewers.`,
      icon: PenTool
    },
    {
      id: "creative-4",
      titleBn: "প্রোডাক্ট ডিসক্রিপশন",
      titleEn: "Product Description",
      promptBn: `আমার [প্রোডাক্ট নাম] এর জন্য একটি আকর্ষণীয় প্রোডাক্ট ডিসক্রিপশন লিখো। ফিচার: [ফিচার লিস্ট]। বেনিফিট-ফোকাসড লেখো, ইমোশনাল অ্যাপিল যোগ করো এবং বাংলাদেশি ক্রেতাদের জন্য প্রাসঙ্গিক করো।`,
      promptEn: `Write an attractive product description for my [product name]. Features: [feature list]. Write benefit-focused, add emotional appeal, and make it relevant for Bangladeshi buyers.`,
      icon: Code
    }
  ];

  const currentContent = content[language];

  const PromptCard = ({ prompt, language }: { prompt: typeof studentPrompts[0], language: 'bn' | 'en' }) => {
    const IconComponent = prompt.icon;
    const promptText = language === 'bn' ? prompt.promptBn : prompt.promptEn;
    const title = language === 'bn' ? prompt.titleBn : prompt.titleEn;
    
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <IconComponent className="w-5 h-5 text-primary" />
            </div>
            <h4 className={`font-semibold text-lg ${language === 'bn' ? 'font-bengali' : ''}`}>
              {title}
            </h4>
          </div>
          <div className="bg-muted/50 rounded-lg p-4 mb-4">
            <pre className={`whitespace-pre-wrap text-sm text-foreground/80 ${language === 'bn' ? 'font-bengali' : ''}`}>
              {promptText}
            </pre>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => copyToClipboard(promptText, prompt.id)}
            className="w-full"
          >
            {copiedPrompt === prompt.id ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                {currentContent.copiedButton}
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 mr-2" />
                {currentContent.copyButton}
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    );
  };

  const articleGraph = buildArticleGraph({
    path: "/blog/chatgpt-bangla-prompt",
    headline: currentContent.title,
    description: currentContent.intro.substring(0, 160),
    image: "https://bdprompt.com/og-image.png",
    datePublished: "2026-01-23",
    dateModified: "2026-08-22",
    section: "AI গাইড",
    keywords: ["ChatGPT বাংলা প্রম্পট", "বাংলা AI প্রম্পট", "ChatGPT Bangladesh", "AI prompts Bengali"],
    crumbs: [
      { name: "হোম", path: "/" },
      { name: "ব্লগ", path: "/blog" },
      { name: "ChatGPT বাংলা প্রম্পট", path: "/blog/chatgpt-bangla-prompt" },
    ],
  });

  const breadcrumbItems = [
    { label: "Blog", labelBn: "ব্লগ", href: "/blog" },
    { label: "ChatGPT Bangla Prompts", labelBn: "ChatGPT বাংলা প্রম্পট", href: "/blog/chatgpt-bangla-prompt" }
  ];

  const relatedLinks = [
    { href: "/prompts/students", labelBn: "ছাত্রদের জন্য প্রম্পট", labelEn: "Prompts for Students" },
    { href: "/prompts/business", labelBn: "ব্যবসায়িক প্রম্পট", labelEn: "Business Prompts" },
    { href: "/prompts/bangla-writing", labelBn: "বাংলা লেখার প্রম্পট", labelEn: "Bangla Writing Prompts" },
    { href: "/guide", labelBn: "প্রম্পট গাইড", labelEn: "Prompt Guide" }
  ];

  return (
    <>
      <SEOHead 
        title={currentContent.title}
        description={currentContent.intro.substring(0, 155)}
        canonicalUrl="https://bdprompt.com/blog/chatgpt-bangla-prompt"
        language={language}
        keywords="ChatGPT বাংলা প্রম্পট, বাংলা AI প্রম্পট, ChatGPT Bangladesh, AI prompts Bengali, ChatGPT tips Bangla, ছাত্রদের জন্য ChatGPT, প্রফেশনাল প্রম্পট"
        graph={articleGraph}
      />
      
      <div className="min-h-screen bg-background">
        <Header language={language} onLanguageChange={handleLanguageChange} />
        
        <main className="container mx-auto px-4 py-8 lg:py-16">
          {/* Breadcrumb */}
          <Breadcrumbs
            items={breadcrumbItems}
            language={language}
            className="mb-8"
          />

          <article className="max-w-4xl mx-auto">
            {/* Article Header */}
            <header className="mb-12">
              <Badge variant="secondary" className="mb-4">
                {currentContent.category}
              </Badge>
              <h1 className={`text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-6 leading-tight ${language === 'bn' ? 'font-bengali' : ''}`}>
                {currentContent.title}
              </h1>
              <p className={`text-xl text-muted-foreground mb-6 ${language === 'bn' ? 'font-bengali' : ''}`}>
                {currentContent.subtitle}
              </p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-b pb-6">
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {currentContent.author}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {currentContent.date}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {currentContent.readTime}
                </span>
              </div>
            </header>

            {/* Introduction */}
            <section className="prose prose-lg max-w-none mb-12">
              <p className={`text-lg text-foreground/90 leading-relaxed ${language === 'bn' ? 'font-bengali' : ''}`}>
                {currentContent.intro}
              </p>
            </section>

            {/* Why Bengali Prompts */}
            <section className="mb-12">
              <h2 className={`text-2xl lg:text-3xl font-bold text-foreground mb-4 ${language === 'bn' ? 'font-bengali' : ''}`}>
                {currentContent.whyBanglaTitle}
              </h2>
              <div className={`text-foreground/80 leading-relaxed whitespace-pre-line ${language === 'bn' ? 'font-bengali' : ''}`}>
                {currentContent.whyBanglaContent}
              </div>
            </section>

            {/* Student Prompts Section */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-2">
                <GraduationCap className="w-8 h-8 text-primary" />
                <h2 className={`text-2xl lg:text-3xl font-bold text-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {currentContent.studentSectionTitle}
                </h2>
              </div>
              <p className={`text-muted-foreground mb-6 ${language === 'bn' ? 'font-bengali' : ''}`}>
                {currentContent.studentSectionDesc}
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {studentPrompts.map((prompt) => (
                  <PromptCard key={prompt.id} prompt={prompt} language={language} />
                ))}
              </div>
            </section>

            {/* Professional Prompts Section */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-2">
                <Briefcase className="w-8 h-8 text-primary" />
                <h2 className={`text-2xl lg:text-3xl font-bold text-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {currentContent.professionalSectionTitle}
                </h2>
              </div>
              <p className={`text-muted-foreground mb-6 ${language === 'bn' ? 'font-bengali' : ''}`}>
                {currentContent.professionalSectionDesc}
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {professionalPrompts.map((prompt) => (
                  <PromptCard key={prompt.id} prompt={prompt} language={language} />
                ))}
              </div>
            </section>

            {/* Creative Prompts Section */}
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-2">
                <Lightbulb className="w-8 h-8 text-primary" />
                <h2 className={`text-2xl lg:text-3xl font-bold text-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {currentContent.creativeSectionTitle}
                </h2>
              </div>
              <p className={`text-muted-foreground mb-6 ${language === 'bn' ? 'font-bengali' : ''}`}>
                {currentContent.creativeSectionDesc}
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {creativePrompts.map((prompt) => (
                  <PromptCard key={prompt.id} prompt={prompt} language={language} />
                ))}
              </div>
            </section>

            {/* Tips Section */}
            <section className="mb-12 bg-muted/30 rounded-2xl p-8">
              <h2 className={`text-2xl lg:text-3xl font-bold text-foreground mb-6 ${language === 'bn' ? 'font-bengali' : ''}`}>
                {currentContent.tipsTitle}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {currentContent.tipsContent.map((tip, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <h4 className={`font-semibold text-foreground mb-1 ${language === 'bn' ? 'font-bengali' : ''}`}>
                        {tip.title}
                      </h4>
                      <p className={`text-muted-foreground text-sm ${language === 'bn' ? 'font-bengali' : ''}`}>
                        {tip.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA Section */}
            <section className="mb-12 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl p-8 text-center">
              <h2 className={`text-2xl lg:text-3xl font-bold text-foreground mb-4 ${language === 'bn' ? 'font-bengali' : ''}`}>
                {currentContent.ctaTitle}
              </h2>
              <p className={`text-muted-foreground mb-6 max-w-xl mx-auto ${language === 'bn' ? 'font-bengali' : ''}`}>
                {currentContent.ctaDesc}
              </p>
              <Button asChild size="lg">
                <Link to="/explore">
                  {currentContent.ctaButton}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </section>

            {/* Related Resources */}
            <section className="border-t pt-8">
              <h3 className={`text-xl font-bold text-foreground mb-4 ${language === 'bn' ? 'font-bengali' : ''}`}>
                {currentContent.relatedTitle}
              </h3>
              <div className="flex flex-wrap gap-3">
                {relatedLinks.map((link) => (
                  <Button key={link.href} variant="outline" asChild size="sm">
                    <Link to={link.href}>
                      {language === 'bn' ? link.labelBn : link.labelEn}
                    </Link>
                  </Button>
                ))}
              </div>
            </section>
          </article>
        </main>

        <Footer language={language} />
      </div>
    </>
  );
};

export default BlogPostChatGPTBanglaPrompt;
