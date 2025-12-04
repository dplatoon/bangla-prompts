import { useState, useEffect, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PlaygroundModal } from "@/components/PlaygroundModal";
import { SEOHead, generatePromptStructuredData } from "@/components/SEOHead";
import { PromptCard } from "@/components/PromptCard";
import { 
  ArrowLeft, 
  Copy, 
  Heart, 
  Share2, 
  Star, 
  User, 
  Eye,
  MessageSquare,
  ChevronRight,
  Loader2
} from "lucide-react";
import { usePrompt, usePrompts, promptToPromptData } from "@/hooks/usePrompts";
import type { PromptData } from "@/data/mockPrompts";
import { useToast } from "@/hooks/use-toast";

const PromptDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');
  const [isSaved, setIsSaved] = useState(false);
  const [isPlaygroundOpen, setIsPlaygroundOpen] = useState(false);

  // Fetch prompt by slug (id in URL is actually slug)
  const { data: dbPrompt, isLoading, error } = usePrompt(id || '');
  const { data: allPrompts } = usePrompts();

  // Convert to PromptData format
  const prompt = useMemo(() => {
    if (!dbPrompt) return null;
    return promptToPromptData(dbPrompt);
  }, [dbPrompt]);

  // Get related prompts
  const relatedPrompts = useMemo(() => {
    if (!allPrompts || !dbPrompt) return [];
    return allPrompts
      .filter(p => p.id !== dbPrompt.id && p.category_id === dbPrompt.category_id)
      .slice(0, 3)
      .map(promptToPromptData);
  }, [allPrompts, dbPrompt]);

  useEffect(() => {
    const savedLang = localStorage.getItem('bdprompt-language') as 'bn' | 'en' || 'bn';
    setLanguage(savedLang);
  }, []);

  useEffect(() => {
    if (id) {
      const saved = localStorage.getItem('bdprompt-saved');
      const savedList = saved ? JSON.parse(saved) : [];
      setIsSaved(savedList.includes(id));
    }
  }, [id]);

  useEffect(() => {
    if (error) {
      navigate('/');
    }
  }, [error, navigate]);

  const handleLanguageChange = (lang: 'bn' | 'en') => {
    setLanguage(lang);
    localStorage.setItem('bdprompt-language', lang);
  };

  const handleCopy = async () => {
    if (!prompt) return;
    try {
      const content = language === 'bn' && prompt.contentBn ? prompt.contentBn : prompt.content;
      await navigator.clipboard.writeText(content);
      toast({
        title: language === 'bn' ? "কপি সম্পন্ন!" : "Copied!",
        description: language === 'bn' ? "প্রম্পট ক্লিপবোর্ডে কপি হয়েছে" : "Prompt copied to clipboard"
      });
    } catch (err) {
      toast({
        title: language === 'bn' ? "ত্রুটি!" : "Error!",
        description: language === 'bn' ? "কপি করতে ব্যর্থ" : "Failed to copy",
        variant: "destructive"
      });
    }
  };

  const handleSave = () => {
    if (!prompt) return;
    const saved = localStorage.getItem('bdprompt-saved');
    let savedList = saved ? JSON.parse(saved) : [];
    
    if (isSaved) {
      savedList = savedList.filter((savedId: string) => savedId !== prompt.id);
      setIsSaved(false);
      toast({
        title: language === 'bn' ? "সরানো হয়েছে" : "Removed",
        description: language === 'bn' ? "সেভ তালিকা থেকে সরানো হয়েছে" : "Removed from saved prompts"
      });
    } else {
      savedList.push(prompt.id);
      setIsSaved(true);
      toast({
        title: language === 'bn' ? "সেভ করা হয়েছে!" : "Saved!",
        description: language === 'bn' ? "প্রম্পট সেভ তালিকায় যোগ হয়েছে" : "Added to saved prompts"
      });
    }
    localStorage.setItem('bdprompt-saved', JSON.stringify(savedList));
  };

  const handleShare = () => {
    const url = window.location.href;
    const text = language === 'bn' 
      ? `${prompt?.titleBn || prompt?.title} - bdprompt.com এ দেখুন: ${url}`
      : `Check out "${prompt?.title}" on bdprompt.com: ${url}`;
    
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleTryRelated = (p: PromptData) => {
    navigate(`/prompt/${p.id}`);
  };

  const text = {
    bn: {
      back: "ফিরে যান",
      copy: "কপি করুন",
      save: "সেভ করুন",
      saved: "সেভ করা",
      share: "শেয়ার করুন",
      tryPlayground: "প্লেগ্রাউন্ডে চেষ্টা করুন",
      author: "লেখক",
      category: "বিভাগ",
      usageCount: "ব্যবহার",
      rating: "রেটিং",
      price: "মূল্য",
      free: "ফ্রি",
      variables: "ভেরিয়েবল",
      demoInput: "ডেমো ইনপুট",
      demoOutput: "ডেমো আউটপুট",
      relatedPrompts: "সম্পর্কিত প্রম্পট",
      tags: "ট্যাগ",
      loading: "লোড হচ্ছে...",
      notFound: "প্রম্পট পাওয়া যায়নি"
    },
    en: {
      back: "Go Back",
      copy: "Copy",
      save: "Save",
      saved: "Saved",
      share: "Share",
      tryPlayground: "Try in Playground",
      author: "Author",
      category: "Category",
      usageCount: "Usage",
      rating: "Rating",
      price: "Price",
      free: "Free",
      variables: "Variables",
      demoInput: "Demo Input",
      demoOutput: "Demo Output",
      relatedPrompts: "Related Prompts",
      tags: "Tags",
      loading: "Loading...",
      notFound: "Prompt not found"
    }
  };

  const currentText = text[language];

  // Generate SEO data
  const getSEOData = () => {
    if (!prompt) return null;
    
    const title = language === 'bn' && prompt.titleBn 
      ? `${prompt.titleBn} | bdprompt.com` 
      : `${prompt.title} | bdprompt.com`;
    
    const description = language === 'bn' && prompt.descriptionBn 
      ? prompt.descriptionBn 
      : prompt.description;
    
    const keywords = prompt.tags.concat(['bdprompt', 'AI prompt', 'বাংলা প্রম্পট']).join(', ');
    
    return { title, description, keywords };
  };

  const seoData = getSEOData();

  // Generate structured data
  const getStructuredData = () => {
    if (!prompt) return null;
    
    return generatePromptStructuredData({
      id: prompt.id,
      title: prompt.title,
      titleBn: prompt.titleBn,
      description: language === 'bn' && prompt.descriptionBn ? prompt.descriptionBn : prompt.description,
      category: prompt.category,
      author: prompt.author,
      rating: prompt.rating,
      ratingCount: prompt.usageCount,
      price: prompt.price,
      currency: 'BDT'
    });
  };

  // Generate breadcrumbs
  const getBreadcrumbs = () => {
    if (!prompt) return [];
    return [
      { name: language === 'bn' ? 'হোম' : 'Home', url: 'https://bdprompt.com/' },
      { name: language === 'bn' && prompt.categoryBn ? prompt.categoryBn : prompt.category, url: `https://bdprompt.com/category/${prompt.category.toLowerCase().replace(' ', '-')}` },
      { name: language === 'bn' && prompt.titleBn ? prompt.titleBn : prompt.title, url: `https://bdprompt.com/prompt/${id}` }
    ];
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header language={language} onLanguageChange={handleLanguageChange} />
        <div className="container mx-auto px-4 py-20 flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
        <Footer language={language} />
      </div>
    );
  }

  if (!prompt) {
    return (
      <div className="min-h-screen bg-background">
        <Header language={language} onLanguageChange={handleLanguageChange} />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className={`text-2xl font-bold ${language === 'bn' ? 'font-bengali' : ''}`}>
            {currentText.notFound}
          </h1>
          <Button onClick={() => navigate('/')} className="mt-4">
            {currentText.back}
          </Button>
        </div>
        <Footer language={language} />
      </div>
    );
  }

  return (
    <>
      {seoData && (
        <SEOHead 
          title={seoData.title}
          description={seoData.description}
          keywords={seoData.keywords}
          canonicalUrl={`https://bdprompt.com/prompt/${id}`}
          ogType="product"
          language={language}
          author={prompt.author}
          breadcrumbs={getBreadcrumbs()}
          structuredData={getStructuredData() || undefined}
        />
      )}
      
      <div className="min-h-screen bg-background" itemScope itemType="https://schema.org/Product">
        <Header language={language} onLanguageChange={handleLanguageChange} />
        
        <main className="container mx-auto px-4 py-8" role="main">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center space-x-2 text-sm text-muted-foreground" itemScope itemType="https://schema.org/BreadcrumbList">
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <Link to="/" className="hover:text-primary transition-colors" itemProp="item">
                  <span itemProp="name">{language === 'bn' ? 'হোম' : 'Home'}</span>
                </Link>
                <meta itemProp="position" content="1" />
              </li>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
                <span className={`${language === 'bn' ? 'font-bengali' : ''}`} itemProp="name">
                  {language === 'bn' && prompt.categoryBn ? prompt.categoryBn : prompt.category}
                </span>
                <meta itemProp="position" content="2" />
              </li>
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
              <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem" aria-current="page">
                <span className={`text-foreground ${language === 'bn' ? 'font-bengali' : ''}`} itemProp="name">
                  {language === 'bn' && prompt.titleBn ? prompt.titleBn : prompt.title}
                </span>
                <meta itemProp="position" content="3" />
              </li>
            </ol>
          </nav>

          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className={`mb-6 ${language === 'bn' ? 'font-bengali' : ''}`}
          >
            <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
            {currentText.back}
          </Button>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <article className="lg:col-span-2 space-y-6">
              {/* Header */}
              <header className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <h1 
                      className={`text-3xl lg:text-4xl font-bold text-foreground ${language === 'bn' ? 'font-bengali text-bengali' : ''}`}
                      itemProp="name"
                    >
                      {language === 'bn' && prompt.titleBn ? prompt.titleBn : prompt.title}
                    </h1>
                    <p 
                      className={`text-lg text-muted-foreground ${language === 'bn' ? 'font-bengali text-bangali' : ''}`}
                      itemProp="description"
                    >
                      {language === 'bn' && prompt.descriptionBn ? prompt.descriptionBn : prompt.description}
                    </p>
                  </div>
                
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline" onClick={handleSave}>
                      <Heart className={`w-4 h-4 ${isSaved ? 'fill-current text-red-500' : ''}`} />
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleShare}>
                      <Share2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1" itemProp="author" itemScope itemType="https://schema.org/Person">
                    <User className="w-4 h-4" aria-hidden="true" />
                    <span itemProp="name">{language === 'bn' && prompt.authorBn ? prompt.authorBn : prompt.author}</span>
                  </div>
                  <div className="flex items-center space-x-1" itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
                    <Star className="w-4 h-4 fill-current text-yellow-500" aria-hidden="true" />
                    <span itemProp="ratingValue">{prompt.rating.toFixed(1)}</span>
                    <meta itemProp="bestRating" content="5" />
                    <meta itemProp="ratingCount" content={String(prompt.usageCount)} />
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="w-4 h-4" aria-hidden="true" />
                    <span>{prompt.usageCount.toLocaleString()}</span>
                  </div>
                  <Badge variant="secondary" itemProp="category">
                    {language === 'bn' && prompt.categoryBn ? prompt.categoryBn : prompt.category}
                  </Badge>
                  <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
                    <Badge variant="outline">
                      <span itemProp="price" content={String(prompt.price)}>
                        {prompt.price === 0 ? currentText.free : `৳${prompt.price}`}
                      </span>
                    </Badge>
                    <meta itemProp="priceCurrency" content="BDT" />
                    <link itemProp="availability" href="https://schema.org/InStock" />
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {(language === 'bn' && prompt.tagsBn ? prompt.tagsBn : prompt.tags).map((tag, index) => (
                    <Badge key={index} variant="outline" className={language === 'bn' ? 'font-bengali' : ''}>
                      {tag}
                    </Badge>
                  ))}
                </div>
              </header>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                <Button onClick={handleCopy} className={language === 'bn' ? 'font-bengali' : ''}>
                  <Copy className="w-4 h-4 mr-2" />
                  {currentText.copy}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setIsPlaygroundOpen(true)}
                  className={language === 'bn' ? 'font-bengali' : ''}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  {currentText.tryPlayground}
                </Button>
              </div>

              <Separator />

              {/* Prompt Content */}
              <Card>
                <CardHeader>
                  <CardTitle className={language === 'bn' ? 'font-bengali' : ''}>
                    {language === 'bn' ? 'প্রম্পট টেমপ্লেট' : 'Prompt Template'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm whitespace-pre-wrap">
                    {language === 'bn' && prompt.contentBn ? prompt.contentBn : prompt.content}
                  </div>
                </CardContent>
              </Card>

              {/* Variables */}
              {prompt.variables && prompt.variables.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className={language === 'bn' ? 'font-bengali' : ''}>{currentText.variables}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {prompt.variables.map((variable, index) => (
                        <Badge key={index} variant="secondary" className="justify-center">
                          {`{${variable}}`}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Demo */}
              {prompt.demoInput && prompt.demoOutput && (
                <Card>
                  <CardHeader>
                    <CardTitle className={language === 'bn' ? 'font-bengali' : ''}>
                      {language === 'bn' ? 'ডেমো উদাহরণ' : 'Demo Example'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className={`font-medium mb-2 ${language === 'bn' ? 'font-bengali' : ''}`}>{currentText.demoInput}:</h4>
                      <div className="bg-muted/30 rounded-lg p-3 text-sm">
                        {prompt.demoInput}
                      </div>
                    </div>
                    <div>
                      <h4 className={`font-medium mb-2 ${language === 'bn' ? 'font-bengali' : ''}`}>{currentText.demoOutput}:</h4>
                      <div className="bg-muted/30 rounded-lg p-3 text-sm">
                        {prompt.demoOutput}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-3">
                    <Button 
                      className={`w-full ${language === 'bn' ? 'font-bengali' : ''}`}
                      onClick={() => setIsPlaygroundOpen(true)}
                    >
                      {currentText.tryPlayground}
                    </Button>
                    <Button 
                      variant="outline" 
                      className={`w-full ${language === 'bn' ? 'font-bengali' : ''}`}
                      onClick={handleCopy}
                    >
                      <Copy className="w-4 h-4 mr-2" />
                      {currentText.copy}
                    </Button>
                    <Button 
                      variant="outline" 
                      className={`w-full ${language === 'bn' ? 'font-bengali' : ''}`}
                      onClick={handleShare}
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      {currentText.share}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Related Prompts */}
              {relatedPrompts.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className={language === 'bn' ? 'font-bengali' : ''}>
                      {currentText.relatedPrompts}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {relatedPrompts.map((relatedPrompt) => (
                      <PromptCard 
                        key={relatedPrompt.id} 
                        promptData={relatedPrompt} 
                        language={language}
                        onTryClick={handleTryRelated}
                      />
                    ))}
                  </CardContent>
                </Card>
              )}
            </aside>
          </div>
        </main>

        <Footer language={language} />
        
        <PlaygroundModal
          open={isPlaygroundOpen}
          onOpenChange={setIsPlaygroundOpen}
          promptData={prompt}
          language={language}
        />
      </div>
    </>
  );
};

export default PromptDetail;