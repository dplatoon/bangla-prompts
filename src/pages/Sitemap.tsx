import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Map, FileText, Compass, BookOpen, Users, Briefcase, GraduationCap, Code, Palette, TrendingUp } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const Sitemap = () => {
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');

  useEffect(() => {
    const saved = localStorage.getItem('bdprompt-language');
    if (saved === 'en' || saved === 'bn') setLanguage(saved);
  }, []);

  const handleLanguageChange = (lang: 'bn' | 'en') => {
    setLanguage(lang);
    localStorage.setItem('bdprompt-language', lang);
  };

  const seoContent = {
    bn: {
      title: 'সাইটম্যাপ | BdPrompt — সব পেজ ও ক্যাটাগরি',
      description: 'BdPrompt-এর সম্পূর্ণ সাইটম্যাপ। সকল পেজ, প্রম্পট ক্যাটাগরি এবং রিসোর্স খুঁজে পান।'
    },
    en: {
      title: 'Sitemap | BdPrompt — All Pages & Categories',
      description: 'Complete sitemap of BdPrompt. Find all pages, prompt categories, and resources.'
    }
  };

  const text = {
    bn: {
      title: 'সাইটম্যাপ',
      subtitle: 'BdPrompt-এর সকল পেজ ও সেকশন',
      mainPages: 'প্রধান পেজসমূহ',
      exploreCategories: 'এক্সপ্লোর ক্যাটাগরি',
      promptCategories: 'প্রম্পট ক্যাটাগরি (SEO)',
      community: 'কমিউনিটি ও রিসোর্স',
      legal: 'আইনি পেজসমূহ',
      tools: 'টুলস ও ফিচার'
    },
    en: {
      title: 'Sitemap',
      subtitle: 'All pages and sections of BdPrompt',
      mainPages: 'Main Pages',
      exploreCategories: 'Explore Categories',
      promptCategories: 'Prompt Categories (SEO)',
      community: 'Community & Resources',
      legal: 'Legal Pages',
      tools: 'Tools & Features'
    }
  };

  const currentText = text[language];
  const currentSeo = seoContent[language];

  const mainPages = [
    { path: '/', label: { bn: 'হোম', en: 'Home' }, icon: FileText },
    { path: '/explore', label: { bn: 'এক্সপ্লোর', en: 'Explore' }, icon: Compass },
    { path: '/playground', label: { bn: 'প্লেগ্রাউন্ড', en: 'Playground' }, icon: Code },
    { path: '/packs', label: { bn: 'প্রম্পট প্যাক', en: 'Prompt Packs' }, icon: Briefcase },
    { path: '/guide', label: { bn: 'গাইড', en: 'Guide' }, icon: BookOpen },
    { path: '/prompts', label: { bn: 'প্রম্পট লাইব্রেরি', en: 'Prompt Library' }, icon: FileText },
    { path: '/blog', label: { bn: 'ব্লগ', en: 'Blog' }, icon: FileText },
    { path: '/product', label: { bn: 'প্রোডাক্ট', en: 'Product' }, icon: Briefcase },
    { path: '/api', label: { bn: 'API', en: 'API' }, icon: Code },
    { path: '/auth', label: { bn: 'লগইন/সাইন আপ', en: 'Login/Sign Up' }, icon: Users }
  ];

  const exploreCategories = [
    { path: '/explore/business', label: { bn: 'ব্যবসা', en: 'Business' }, icon: Briefcase },
    { path: '/explore/education', label: { bn: 'শিক্ষা', en: 'Education' }, icon: GraduationCap },
    { path: '/explore/content', label: { bn: 'কন্টেন্ট', en: 'Content' }, icon: FileText },
    { path: '/explore/code', label: { bn: 'কোড', en: 'Code' }, icon: Code },
    { path: '/explore/image', label: { bn: 'ইমেজ', en: 'Image' }, icon: Palette },
    { path: '/explore/marketing', label: { bn: 'মার্কেটিং', en: 'Marketing' }, icon: TrendingUp }
  ];

  const promptCategories = [
    { path: '/prompts/seo-bangla', label: { bn: 'SEO বাংলা', en: 'SEO Bangla' } },
    { path: '/prompts/marketing', label: { bn: 'মার্কেটিং', en: 'Marketing' } },
    { path: '/prompts/freelancing', label: { bn: 'ফ্রিল্যান্সিং', en: 'Freelancing' } },
    { path: '/prompts/students', label: { bn: 'শিক্ষার্থী', en: 'Students' } },
    { path: '/prompts/coding', label: { bn: 'কোডিং', en: 'Coding' } },
    { path: '/prompts/business', label: { bn: 'ব্যবসা', en: 'Business' } },
    { path: '/prompts/creative-art', label: { bn: 'ক্রিয়েটিভ আর্ট', en: 'Creative Art' } },
    { path: '/prompts/youtube-growth', label: { bn: 'ইউটিউব গ্রোথ', en: 'YouTube Growth' } },
    { path: '/prompts/bangla-writing', label: { bn: 'বাংলা লেখালেখি', en: 'Bangla Writing' } },
    { path: '/prompts/productivity', label: { bn: 'প্রোডাক্টিভিটি', en: 'Productivity' } }
  ];

  const communityPages = [
    { path: '/community', label: { bn: 'কমিউনিটি', en: 'Community' }, icon: Users },
    { path: '/become-creator', label: { bn: 'ক্রিয়েটর হন', en: 'Become Creator' }, icon: Users },
    { path: '/resources', label: { bn: 'রিসোর্স', en: 'Resources' }, icon: BookOpen },
    { path: '/support', label: { bn: 'সাপোর্ট', en: 'Support' }, icon: Users },
    { path: '/shikkha', label: { bn: 'শিক্ষা', en: 'Shikkha (Education)' }, icon: GraduationCap },
    { path: '/kobita', label: { bn: 'কবিতা', en: 'Kobita (Poetry)' }, icon: FileText },
    { path: '/business', label: { bn: 'ব্যবসা', en: 'Business' }, icon: Briefcase }
  ];

  const legalPages = [
    { path: '/legal', label: { bn: 'আইনি তথ্য', en: 'Legal' } },
    { path: '/privacy', label: { bn: 'প্রাইভেসি পলিসি', en: 'Privacy Policy' } },
    { path: '/terms', label: { bn: 'শর্তাবলী', en: 'Terms of Service' } },
    { path: '/cookies', label: { bn: 'কুকি পলিসি', en: 'Cookie Policy' } },
    { path: '/dmca', label: { bn: 'DMCA', en: 'DMCA' } },
    { path: '/guidelines', label: { bn: 'গাইডলাইন', en: 'Guidelines' } }
  ];

  const breadcrumbsForSchema = [
    { name: language === 'bn' ? 'হোম' : 'Home', url: 'https://bdprompt.com/' },
    { name: language === 'bn' ? 'সাইটম্যাপ' : 'Sitemap', url: 'https://bdprompt.com/sitemap' }
  ];

  const breadcrumbsForVisual = [
    { label: language === 'bn' ? 'হোম' : 'Home', href: '/' },
    { label: language === 'bn' ? 'সাইটম্যাপ' : 'Sitemap', href: '/sitemap' }
  ];

  const SitemapSection = ({ 
    title, 
    items, 
    showIcons = false 
  }: { 
    title: string; 
    items: Array<{ path: string; label: { bn: string; en: string }; icon?: any }>; 
    showIcons?: boolean;
  }) => (
    <section className="mb-10">
      <h2 className="text-xl font-semibold text-foreground mb-4 pb-2 border-b border-border">
        {title}
      </h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.path}>
              <Link 
                to={item.path}
                className="flex items-center gap-2 p-3 rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
              >
                {showIcons && Icon && <Icon className="w-4 h-4 text-primary" />}
                <span className={language === 'bn' ? 'font-bengali' : ''}>
                  {item.label[language]}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );

  return (
    <>
      <SEOHead
        title={currentSeo.title}
        description={currentSeo.description}
        keywords="sitemap, সাইটম্যাপ, bdprompt pages, all pages"
      />
      
      <div className="min-h-screen bg-background">
        <Header language={language} onLanguageChange={handleLanguageChange} />
        
        <main className="container mx-auto px-4 py-8">
          <Breadcrumbs items={breadcrumbsForVisual} language={language} />
          
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Map className="w-8 h-8 text-primary" />
            </div>
            <h1 className={`text-3xl md:text-4xl font-bold text-foreground mb-3 ${language === 'bn' ? 'font-bengali' : ''}`}>
              {currentText.title}
            </h1>
            <p className={`text-lg text-muted-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
              {currentText.subtitle}
            </p>
          </div>

          {/* Sitemap Sections */}
          <div className="max-w-4xl mx-auto">
            <SitemapSection 
              title={currentText.mainPages} 
              items={mainPages} 
              showIcons={true} 
            />
            
            <SitemapSection 
              title={currentText.exploreCategories} 
              items={exploreCategories} 
              showIcons={true} 
            />
            
            <SitemapSection 
              title={currentText.promptCategories} 
              items={promptCategories} 
            />
            
            <SitemapSection 
              title={currentText.community} 
              items={communityPages} 
              showIcons={true} 
            />
            
            <SitemapSection 
              title={currentText.legal} 
              items={legalPages} 
            />
          </div>

          {/* XML Sitemap Link */}
          <div className="text-center mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-2">
              {language === 'bn' ? 'সার্চ ইঞ্জিনের জন্য XML সাইটম্যাপ:' : 'XML Sitemap for search engines:'}
            </p>
            <a 
              href="/sitemap.xml" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline font-mono text-sm"
            >
              /sitemap.xml
            </a>
          </div>
        </main>
        
        <Footer language={language} />
      </div>
    </>
  );
};

export default Sitemap;
