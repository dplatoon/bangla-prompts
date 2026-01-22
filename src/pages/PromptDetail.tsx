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
import { SocialShareButtons } from "@/components/SocialShareButtons";
import { 
  ArrowLeft, 
  Copy, 
  Bookmark,
  BookmarkCheck,
  Share2, 
  Star, 
  User, 
  Eye,
  MessageSquare,
  ChevronRight,
  Loader2,
  Lock,
  CreditCard
} from "lucide-react";
import { usePrompt, useRelatedPrompts, promptToPromptData } from "@/hooks/usePrompts";
import { useSavePrompt } from "@/hooks/useSavePrompt";
import { usePurchase } from "@/hooks/usePurchase";
import type { PromptData } from "@/data/mockPrompts";
import { useToast } from "@/hooks/use-toast";
import { trackPromptViewed, trackPromptCopied, trackPlaygroundUsed } from "@/utils/analytics";

const PromptDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');
  const [isPlaygroundOpen, setIsPlaygroundOpen] = useState(false);

  // Fetch prompt by slug (id in URL is actually slug)
  const { data: dbPrompt, isLoading, error } = usePrompt(id || '');
  
  // Fetch related prompts from the same category
  const { data: relatedPromptsData } = useRelatedPrompts(
    dbPrompt?.id || '',
    dbPrompt?.category_id || null,
    6
  );
  
  // Use the save hook with the actual database prompt ID
  const { isSaved, isPending: isSavePending, toggleSave } = useSavePrompt(
    dbPrompt?.id || '', 
    language
  );

  // Use the purchase hook
  const { 
    hasPurchased, 
    isLoading: isPurchaseLoading, 
    isCheckingOut, 
    initiateCheckout,
    isAuthenticated 
  } = usePurchase(dbPrompt?.id || '', language);

  // Check if prompt is premium (not free and has price)
  const isPremium = dbPrompt && !dbPrompt.is_free && (dbPrompt.price || 0) > 0;
  const canAccessFullContent = !isPremium || hasPurchased;

  // Convert to PromptData format
  const prompt = useMemo(() => {
    if (!dbPrompt) return null;
    return promptToPromptData(dbPrompt);
  }, [dbPrompt]);

  // Convert related prompts to PromptData format
  const relatedPrompts = useMemo(() => {
    if (!relatedPromptsData) return [];
    return relatedPromptsData.map(promptToPromptData);
  }, [relatedPromptsData]);

  useEffect(() => {
    const savedLang = localStorage.getItem('bdprompt-language') as 'bn' | 'en' || 'bn';
    setLanguage(savedLang);
  }, []);

  // Track prompt view on load
  useEffect(() => {
    if (prompt && dbPrompt) {
      trackPromptViewed(dbPrompt.id, prompt.category, language);
    }
  }, [prompt?.id, language]);

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
    if (!prompt || !dbPrompt) return;
    try {
      const content = language === 'bn' && prompt.contentBn ? prompt.contentBn : prompt.content;
      await navigator.clipboard.writeText(content);
      trackPromptCopied(dbPrompt.id, prompt.category, language);
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

  const handleOpenPlayground = () => {
    if (dbPrompt) {
      trackPlaygroundUsed(dbPrompt.id);
    }
    setIsPlaygroundOpen(true);
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
    // Use slug for navigation, falling back to id if slug is not available
    navigate(`/prompt/${p.slug || p.id}`);
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
      notFound: "প্রম্পট পাওয়া যায়নি",
      buyNow: "এখনই কিনুন",
      premium: "প্রিমিয়াম",
      purchased: "কেনা হয়েছে",
      loginToBuy: "কিনতে লগইন করুন",
      processing: "প্রসেসিং..."
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
      notFound: "Prompt not found",
      buyNow: "Buy Now",
      premium: "Premium",
      purchased: "Purchased",
      loginToBuy: "Login to Buy",
      processing: "Processing..."
    }
  };

  const currentText = text[language];

  // Generate dynamic OG image URL
  const getOgImageUrl = () => {
    if (!prompt) return "https://bdprompt.com/og-image.png";
    
    const params = new URLSearchParams({
      title: prompt.title,
      titleBn: prompt.titleBn || '',
      category: prompt.category,
      author: prompt.author,
      price: String(prompt.price || 0),
      rating: String(prompt.rating || 4.5)
    });
    
    return `https://oduvbhiggycaasssfdny.supabase.co/functions/v1/og-image?${params.toString()}`;
  };

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
    
    const ogImage = getOgImageUrl();
    
    return { title, description, keywords, ogImage };
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
          ogImage={seoData.ogImage}
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
                    <Button size="sm" variant="outline" onClick={toggleSave} disabled={isSavePending}>
                      {isSavePending ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : isSaved ? (
                        <BookmarkCheck className="w-4 h-4 text-primary" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </Button>
                    <SocialShareButtons
                      url={`https://bdprompt.com/prompt/${id}`}
                      title={language === 'bn' && prompt.titleBn ? prompt.titleBn : prompt.title}
                      description={language === 'bn' && prompt.descriptionBn ? prompt.descriptionBn : prompt.description}
                      language={language}
                    />
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
                {/* Show Buy button for premium prompts not yet purchased */}
                {isPremium && !hasPurchased && (
                  <Button 
                    onClick={isAuthenticated ? initiateCheckout : () => navigate('/auth')}
                    disabled={isCheckingOut || isPurchaseLoading}
                    className={`bg-gradient-to-r from-primary to-accent hover:opacity-90 ${language === 'bn' ? 'font-bengali' : ''}`}
                  >
                    {isCheckingOut ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        {currentText.processing}
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4 mr-2" />
                        {isAuthenticated ? `${currentText.buyNow} - ৳${dbPrompt?.price}` : currentText.loginToBuy}
                      </>
                    )}
                  </Button>
                )}
                
                {/* Show Purchased badge if already bought */}
                {isPremium && hasPurchased && (
                  <Badge variant="secondary" className={`px-4 py-2 ${language === 'bn' ? 'font-bengali' : ''}`}>
                    ✓ {currentText.purchased}
                  </Badge>
                )}
                
                {/* Copy button - only enable if user can access content */}
                <Button 
                  onClick={handleCopy} 
                  disabled={!canAccessFullContent}
                  className={language === 'bn' ? 'font-bengali' : ''}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  {currentText.copy}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={handleOpenPlayground}
                  disabled={!canAccessFullContent}
                  className={language === 'bn' ? 'font-bengali' : ''}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  {currentText.tryPlayground}
                </Button>
              </div>

              <Separator />

              {/* Prompt Content */}
              <Card className={!canAccessFullContent ? 'relative overflow-hidden' : ''}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${language === 'bn' ? 'font-bengali' : ''}`}>
                    {language === 'bn' ? 'প্রম্পট টেমপ্লেট' : 'Prompt Template'}
                    {isPremium && !hasPurchased && (
                      <Badge variant="destructive" className="ml-2">
                        <Lock className="w-3 h-3 mr-1" />
                        {currentText.premium}
                      </Badge>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={`bg-muted/50 rounded-lg p-4 font-mono text-sm whitespace-pre-wrap ${!canAccessFullContent ? 'blur-sm select-none' : ''}`}>
                    {language === 'bn' && prompt.contentBn ? prompt.contentBn : prompt.content}
                  </div>
                  {!canAccessFullContent && (
                    <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                      <div className="text-center space-y-4 p-6">
                        <Lock className="w-12 h-12 mx-auto text-muted-foreground" />
                        <p className={`text-lg font-medium ${language === 'bn' ? 'font-bengali' : ''}`}>
                          {language === 'bn' ? 'এই প্রম্পটের সম্পূর্ণ টেমপ্লেট দেখতে কিনুন' : 'Purchase to unlock full template'}
                        </p>
                        <Button 
                          onClick={isAuthenticated ? initiateCheckout : () => navigate('/auth')}
                          disabled={isCheckingOut}
                          size="lg"
                        >
                          {isCheckingOut ? (
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          ) : (
                            <CreditCard className="w-4 h-4 mr-2" />
                          )}
                          {isAuthenticated ? `${currentText.buyNow} - ৳${dbPrompt?.price}` : currentText.loginToBuy}
                        </Button>
                      </div>
                    </div>
                  )}
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
                      onClick={handleOpenPlayground}
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

            </aside>
          </div>

          {/* Related Prompts Section - Full Width with Enhanced SEO */}
          {relatedPrompts.length > 0 && (
            <section className="mt-12 pt-8 border-t border-border" aria-labelledby="related-prompts-heading">
              {/* Section Header with H2 */}
              <div className="mb-8">
                <h2 
                  id="related-prompts-heading"
                  className={`text-2xl sm:text-3xl font-bold text-foreground mb-2 ${language === 'bn' ? 'font-bengali' : ''}`}
                >
                  {currentText.relatedPrompts}
                </h2>
                <p className={`text-muted-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {language === 'bn' 
                    ? `${prompt.categoryBn || prompt.category} বিভাগের আরও প্রম্পট` 
                    : `More prompts from ${prompt.category} category`}
                </p>
              </div>

              {/* Prompt Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {relatedPrompts.map((relatedPrompt) => (
                  <PromptCard 
                    key={relatedPrompt.id} 
                    promptData={relatedPrompt} 
                    language={language}
                    onTryClick={handleTryRelated}
                  />
                ))}
              </div>

              {/* Category Cross-Link CTA */}
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 p-6 bg-muted/50 rounded-lg">
                <p className={`text-center sm:text-left ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {language === 'bn' 
                    ? `আরও ${prompt.categoryBn || prompt.category} প্রম্পট দেখুন` 
                    : `Explore more ${prompt.category} prompts`}
                </p>
                <Link 
                  to={`/explore?category=${prompt.category.toLowerCase().replace(/\s+/g, '-')}`}
                  className="inline-flex"
                >
                  <Button variant="default" className={language === 'bn' ? 'font-bengali' : ''}>
                    {language === 'bn' ? `সব ${prompt.categoryBn || prompt.category} প্রম্পট` : `All ${prompt.category} Prompts`}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>

              {/* Additional Internal Links for SEO */}
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                <Link 
                  to="/explore" 
                  className={`text-sm text-muted-foreground hover:text-primary transition-colors ${language === 'bn' ? 'font-bengali' : ''}`}
                >
                  {language === 'bn' ? 'সব প্রম্পট এক্সপ্লোর করুন' : 'Explore All Prompts'}
                </Link>
                <span className="text-muted-foreground">•</span>
                <Link 
                  to="/prompts" 
                  className={`text-sm text-muted-foreground hover:text-primary transition-colors ${language === 'bn' ? 'font-bengali' : ''}`}
                >
                  {language === 'bn' ? 'ক্যাটাগরি দেখুন' : 'Browse Categories'}
                </Link>
                <span className="text-muted-foreground">•</span>
                <Link 
                  to="/guide" 
                  className={`text-sm text-muted-foreground hover:text-primary transition-colors ${language === 'bn' ? 'font-bengali' : ''}`}
                >
                  {language === 'bn' ? 'প্রম্পট গাইড' : 'Prompt Guide'}
                </Link>
              </div>
            </section>
          )}
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