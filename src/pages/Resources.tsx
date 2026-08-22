import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ExternalLink, Sparkles, Bot, Image, Code, FileText } from "lucide-react";

const Resources = () => {
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');

  useEffect(() => {
    const savedLang = localStorage.getItem('bdprompt-language') as 'bn' | 'en';
    if (savedLang) setLanguage(savedLang);
  }, []);

  const handleLanguageChange = (lang: 'bn' | 'en') => {
    setLanguage(lang);
    localStorage.setItem('bdprompt-language', lang);
  };

  const seoContent = {
    bn: {
      title: "রিসোর্স | AI টুলস এবং গাইড | BdPrompt",
      description: "বাংলাদেশি ব্যবহারকারীদের জন্য সেরা AI টুলস এবং রিসোর্স। ChatGPT, Claude, Gemini, এবং আরও অনেক AI প্ল্যাটফর্মের গাইড ও টিপস।",
      keywords: "AI টুলস বাংলা, ChatGPT বাংলাদেশ, AI রিসোর্স, বাংলা AI গাইড, Gemini বাংলা, Claude AI"
    },
    en: {
      title: "Resources | AI Tools and Guides | BdPrompt",
      description: "Best AI tools and resources for Bangladeshi users. Guides and tips for ChatGPT, Claude, Gemini, and many more AI platforms.",
      keywords: "AI tools Bengali, ChatGPT Bangladesh, AI resources, Bengali AI guide, Gemini Bengali, Claude AI"
    }
  };

  const currentSEO = seoContent[language];

  const text = {
    bn: {
      title: "বাংলা ইউজারদের জন্য সেরা AI টুলস",
      subtitle: "বিনামূল্যে ও পেইড AI প্ল্যাটফর্মের সম্পূর্ণ গাইড",
      description: "বাংলাদেশ থেকে সহজে ব্যবহার করা যায় এমন AI টুলসের তালিকা এবং তাদের ব্যবহারবিধি।",
      categories: {
        chat: "চ্যাট AI",
        image: "ইমেজ জেনারেশন",
        code: "কোড অ্যাসিস্ট্যান্ট",
        writing: "লেখা সহায়ক"
      }
    },
    en: {
      title: "Best AI Tools for Bangla Users",
      subtitle: "Complete Guide to Free & Paid AI Platforms",
      description: "List of AI tools easily accessible from Bangladesh and how to use them.",
      categories: {
        chat: "Chat AI",
        image: "Image Generation",
        code: "Code Assistants",
        writing: "Writing Helpers"
      }
    }
  };

  const currentText = text[language];

  const aiTools = [
    {
      category: currentText.categories.chat,
      icon: Bot,
      tools: [
        {
          name: "ChatGPT",
          description: language === 'bn' ? "OpenAI এর জনপ্রিয় চ্যাট AI। বাংলায় কাজ করে।" : "OpenAI's popular chat AI. Works in Bengali.",
          url: "https://chat.openai.com",
          free: true,
          bdFriendly: true
        },
        {
          name: "Claude",
          description: language === 'bn' ? "Anthropic এর AI। দীর্ঘ কনটেক্সট বোঝে।" : "Anthropic's AI. Understands long context.",
          url: "https://claude.ai",
          free: true,
          bdFriendly: true
        },
        {
          name: "Google Gemini",
          description: language === 'bn' ? "Google এর AI। বাংলায় ভালো সাপোর্ট।" : "Google's AI. Good Bengali support.",
          url: "https://gemini.google.com",
          free: true,
          bdFriendly: true
        },
        {
          name: "bdprompt.com",
          description: language === 'bn' ? "বাংলা AI প্রম্পট প্ল্যাটফর্ম।" : "Bangla AI prompt platform.",
          url: "https://bdprompt.com",
          free: true,
          bdFriendly: true,
          featured: true
        }
      ]
    },
    {
      category: currentText.categories.image,
      icon: Image,
      tools: [
        {
          name: "DALL-E 3",
          description: language === 'bn' ? "ChatGPT এর মধ্যে ইমেজ জেনারেট।" : "Generate images within ChatGPT.",
          url: "https://chat.openai.com",
          free: false,
          bdFriendly: true
        },
        {
          name: "Midjourney",
          description: language === 'bn' ? "হাই কোয়ালিটি আর্ট জেনারেশন।" : "High quality art generation.",
          url: "https://midjourney.com",
          free: false,
          bdFriendly: true
        },
        {
          name: "Leonardo AI",
          description: language === 'bn' ? "ফ্রি ইমেজ জেনারেশন টুল।" : "Free image generation tool.",
          url: "https://leonardo.ai",
          free: true,
          bdFriendly: true
        }
      ]
    },
    {
      category: currentText.categories.code,
      icon: Code,
      tools: [
        {
          name: "GitHub Copilot",
          description: language === 'bn' ? "কোড অটো-কমপ্লিট এবং সাজেশন।" : "Code auto-complete and suggestions.",
          url: "https://github.com/features/copilot",
          free: false,
          bdFriendly: true
        },
        {
          name: "Cursor",
          description: language === 'bn' ? "AI-পাওয়ার্ড কোড এডিটর।" : "AI-powered code editor.",
          url: "https://cursor.com",
          free: true,
          bdFriendly: true
        },
        {
          name: "Replit AI",
          description: language === 'bn' ? "ব্রাউজারে কোডিং উইথ AI।" : "Browser coding with AI.",
          url: "https://replit.com",
          free: true,
          bdFriendly: true
        }
      ]
    },
    {
      category: currentText.categories.writing,
      icon: FileText,
      tools: [
        {
          name: "Grammarly",
          description: language === 'bn' ? "ইংরেজি গ্রামার ও রাইটিং চেক।" : "English grammar and writing check.",
          url: "https://grammarly.com",
          free: true,
          bdFriendly: true
        },
        {
          name: "Notion AI",
          description: language === 'bn' ? "নোট ও ডক তৈরি করতে AI।" : "AI for notes and docs.",
          url: "https://notion.so",
          free: false,
          bdFriendly: true
        },
        {
          name: "Copy.ai",
          description: language === 'bn' ? "মার্কেটিং কপি জেনারেট।" : "Generate marketing copy.",
          url: "https://copy.ai",
          free: true,
          bdFriendly: true
        }
      ]
    }
  ];

  return (
    <>
      <SEOHead
        title={currentSEO.title}
        description={currentSEO.description}
        keywords={currentSEO.keywords}
        language={language}
        canonicalUrl="https://bdprompt.com/resources"
      />
      <div className="min-h-screen bg-background">
        <Header language={language} onLanguageChange={handleLanguageChange} />
        
        <main className="pt-8 pb-16">
          <div className="container mx-auto px-4 mb-4">
            <Breadcrumbs 
              items={[{ label: 'Resources', labelBn: 'রিসোর্স' }]} 
              language={language}
            />
          </div>
          
          {/* Hero Section */}
          <section className="bg-gradient-hero py-16 lg:py-24">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <h1 className={`text-4xl lg:text-5xl font-bold text-primary-foreground mb-4 ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {currentText.title}
                </h1>
                <p className={`text-xl text-primary-foreground/90 mb-6 ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {currentText.subtitle}
                </p>
                <p className={`text-primary-foreground/80 max-w-2xl mx-auto ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {currentText.description}
                </p>
              </div>
            </div>
          </section>

          {/* Tools Grid */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="space-y-12">
                {aiTools.map((category, catIndex) => (
                  <div key={catIndex}>
                    <div className="flex items-center gap-3 mb-6">
                      <category.icon className="w-6 h-6 text-primary" />
                      <h2 className={`text-2xl font-bold text-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
                        {category.category}
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {category.tools.map((tool, toolIndex) => (
                        <a
                          key={toolIndex}
                          href={tool.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`group bg-card rounded-xl p-6 border transition-all hover:shadow-lg hover:border-primary/50 ${
                            tool.featured ? 'border-primary ring-2 ring-primary/20' : 'border-border/50'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                              {tool.name}
                            </h3>
                            <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                          <p className={`text-sm text-muted-foreground mb-4 ${language === 'bn' ? 'font-bengali' : ''}`}>
                            {tool.description}
                          </p>
                          <div className="flex items-center gap-2">
                            {tool.free && (
                              <span className={`text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full ${language === 'bn' ? 'font-bengali' : ''}`}>
                                {language === 'bn' ? 'ফ্রি' : 'Free'}
                              </span>
                            )}
                            {tool.bdFriendly && (
                              <span className={`text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full ${language === 'bn' ? 'font-bengali' : ''}`}>
                                {language === 'bn' ? 'বাংলাদেশ ফ্রেন্ডলি' : 'BD Friendly'}
                              </span>
                            )}
                            {tool.featured && (
                              <span className="flex items-center gap-1 text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                                <Sparkles className="w-3 h-3" />
                                {language === 'bn' ? 'ফিচার্ড' : 'Featured'}
                              </span>
                            )}
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer language={language} />
      </div>
    </>
  );
};

export default Resources;
