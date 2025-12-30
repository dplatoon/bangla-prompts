import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";

const Blog = () => {
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');

  useEffect(() => {
    const savedLang = localStorage.getItem('bdprompt-language') as 'bn' | 'en' || 'bn';
    setLanguage(savedLang);
  }, []);

  const handleLanguageChange = (lang: 'bn' | 'en') => {
    setLanguage(lang);
    localStorage.setItem('bdprompt-language', lang);
  };

  const posts = {
    bn: [
      {
        id: 1,
        title: "ChatGPT-তে বাংলা প্রম্পট ব্যবহারের সেরা টিপস",
        excerpt: "ChatGPT-তে বাংলায় কার্যকর প্রম্পট লেখার জন্য কিছু গুরুত্বপূর্ণ টিপস শিখুন যা আপনার আউটপুট মানের উন্নতি করবে।",
        category: "টিউটোরিয়াল",
        author: "রাহুল শর্মা",
        date: "২৮ নভেম্বর, ২০২৪",
        readTime: "৫ মিনিট"
      },
      {
        id: 2,
        title: "AI দিয়ে বাংলা কন্টেন্ট মার্কেটিং: একটি সম্পূর্ণ গাইড",
        excerpt: "AI টুলস ব্যবহার করে আপনার বাংলা কন্টেন্ট মার্কেটিং স্ট্র্যাটেজি কিভাবে উন্নত করবেন তা জানুন।",
        category: "মার্কেটিং",
        author: "প্রিয়া দাস",
        date: "২৫ নভেম্বর, ২০২৪",
        readTime: "৮ মিনিট"
      },
      {
        id: 3,
        title: "২০২৪ সালে AI প্রম্পট ইঞ্জিনিয়ারিং: যা জানা দরকার",
        excerpt: "প্রম্পট ইঞ্জিনিয়ারিং এর মৌলিক ধারণা থেকে শুরু করে অ্যাডভান্সড টেকনিক পর্যন্ত সব কিছু।",
        category: "এডুকেশন",
        author: "আহমেদ খান",
        date: "২০ নভেম্বর, ২০২৪",
        readTime: "১০ মিনিট"
      },
      {
        id: 4,
        title: "Midjourney-তে বাংলা আর্ট প্রম্পট তৈরির কৌশল",
        excerpt: "Midjourney ব্যবহার করে সুন্দর বাংলা থিমড আর্টওয়ার্ক তৈরি করার প্রম্পট টেকনিক শিখুন।",
        category: "ইমেজ জেনারেশন",
        author: "ফাতেমা বেগম",
        date: "১৫ নভেম্বর, ২০২৪",
        readTime: "৬ মিনিট"
      }
    ],
    en: [
      {
        id: 1,
        title: "Best Tips for Using Bengali Prompts in ChatGPT",
        excerpt: "Learn important tips for writing effective Bengali prompts in ChatGPT that will improve your output quality.",
        category: "Tutorial",
        author: "Rahul Sharma",
        date: "November 28, 2024",
        readTime: "5 min"
      },
      {
        id: 2,
        title: "Bangla Content Marketing with AI: A Complete Guide",
        excerpt: "Learn how to improve your Bengali content marketing strategy using AI tools.",
        category: "Marketing",
        author: "Priya Das",
        date: "November 25, 2024",
        readTime: "8 min"
      },
      {
        id: 3,
        title: "AI Prompt Engineering in 2024: What You Need to Know",
        excerpt: "From basic concepts to advanced techniques in prompt engineering.",
        category: "Education",
        author: "Ahmed Khan",
        date: "November 20, 2024",
        readTime: "10 min"
      },
      {
        id: 4,
        title: "Creating Bengali Art Prompts for Midjourney",
        excerpt: "Learn prompt techniques for creating beautiful Bengali-themed artwork using Midjourney.",
        category: "Image Generation",
        author: "Fatema Begum",
        date: "November 15, 2024",
        readTime: "6 min"
      }
    ]
  };

  const currentPosts = posts[language];

  const text = {
    bn: {
      title: "ব্লগ",
      subtitle: "AI, প্রম্পট ইঞ্জিনিয়ারিং এবং বাংলা কন্টেন্ট নিয়ে আর্টিকেল",
      readMore: "আরও পড়ুন",
      featured: "ফিচার্ড"
    },
    en: {
      title: "Blog",
      subtitle: "Articles about AI, prompt engineering, and Bengali content",
      readMore: "Read More",
      featured: "Featured"
    }
  };

  const currentText = text[language];

  return (
    <>
      <SEOHead 
        title={language === 'bn' ? "ব্লগ | bdprompt.com" : "Blog | bdprompt.com"}
        description={language === 'bn' ? "AI, প্রম্পট ইঞ্জিনিয়ারিং এবং বাংলা কন্টেন্ট নিয়ে আর্টিকেল পড়ুন।" : "Read articles about AI, prompt engineering, and Bengali content."}
        canonicalUrl="https://bdprompt.com/blog"
        language={language}
      />
      
      <div className="min-h-screen bg-background">
        <Header language={language} onLanguageChange={handleLanguageChange} />
        
        <main className="container mx-auto px-4 py-16">
          {/* Breadcrumb Navigation */}
          <Breadcrumbs
            items={[
              { label: "Blog", labelBn: "ব্লগ", href: "/blog" }
            ]}
            language={language}
            className="mb-8"
          />

          {/* Header */}
          <header className="text-center mb-16">
            <h1 className={`text-4xl lg:text-5xl font-bold text-foreground mb-4 ${language === 'bn' ? 'font-bengali' : ''}`}>
              {currentText.title}
            </h1>
            <p className={`text-xl text-muted-foreground max-w-2xl mx-auto ${language === 'bn' ? 'font-bengali' : ''}`}>
              {currentText.subtitle}
            </p>
          </header>

          {/* Featured Post */}
          <Card className="mb-12 overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="bg-gradient-hero h-64 md:h-auto"></div>
              <div className="p-8">
                <Badge className="mb-4">{currentText.featured}</Badge>
                <h2 className={`text-2xl font-bold mb-4 ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {currentPosts[0].title}
                </h2>
                <p className={`text-muted-foreground mb-4 ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {currentPosts[0].excerpt}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {currentPosts[0].author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {currentPosts[0].date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {currentPosts[0].readTime}
                  </span>
                </div>
                <Link to="#" className={`text-primary font-medium inline-flex items-center gap-1 hover:gap-2 transition-all ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {currentText.readMore}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </Card>

          {/* Blog Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentPosts.slice(1).map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20"></div>
                <CardHeader>
                  <Badge variant="secondary" className="w-fit mb-2">
                    {post.category}
                  </Badge>
                  <CardTitle className={`line-clamp-2 ${language === 'bn' ? 'font-bengali' : ''}`}>
                    {post.title}
                  </CardTitle>
                  <CardDescription className={`line-clamp-2 ${language === 'bn' ? 'font-bengali' : ''}`}>
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {post.readTime}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>

        <Footer language={language} />
      </div>
    </>
  );
};

export default Blog;
