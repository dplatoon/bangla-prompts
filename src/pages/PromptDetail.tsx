import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PromptCard } from "@/components/PromptCard";
import { PlaygroundModal } from "@/components/PlaygroundModal";
import { 
  ArrowLeft, 
  Copy, 
  Heart, 
  Share2, 
  Star, 
  User, 
  Eye,
  MessageSquare
} from "lucide-react";
import { mockPrompts, type PromptData, copyPromptToClipboard, isPromptSaved, savePromptToLocal, removePromptFromLocal } from "@/data/mockPrompts";
import { useToast } from "@/hooks/use-toast";

const PromptDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');
  const [prompt, setPrompt] = useState<PromptData | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isPlaygroundOpen, setIsPlaygroundOpen] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem('bdprompt-language') as 'bn' | 'en' || 'bn';
    setLanguage(savedLang);
  }, []);

  useEffect(() => {
    if (id) {
      const foundPrompt = mockPrompts.find(p => p.id === id);
      if (foundPrompt) {
        setPrompt(foundPrompt);
        setIsSaved(isPromptSaved(id));
      } else {
        navigate('/');
      }
    }
  }, [id, navigate]);

  const handleLanguageChange = (lang: 'bn' | 'en') => {
    setLanguage(lang);
    localStorage.setItem('bdprompt-language', lang);
  };

  const handleCopy = async () => {
    if (!prompt) return;
    try {
      await copyPromptToClipboard(prompt, language);
      toast({
        title: language === 'bn' ? "কপি সম্পন্ন!" : "Copied!",
        description: language === 'bn' ? "প্রম্পট ক্লিপবোর্ডে কপি হয়েছে" : "Prompt copied to clipboard"
      });
    } catch (error) {
      toast({
        title: language === 'bn' ? "ত্রুটি!" : "Error!",
        description: language === 'bn' ? "কপি করতে ব্যর্থ" : "Failed to copy",
        variant: "destructive"
      });
    }
  };

  const handleSave = () => {
    if (!prompt) return;
    if (isSaved) {
      removePromptFromLocal(prompt.id);
      setIsSaved(false);
      toast({
        title: language === 'bn' ? "সরানো হয়েছে" : "Removed",
        description: language === 'bn' ? "সেভ তালিকা থেকে সরানো হয়েছে" : "Removed from saved prompts"
      });
    } else {
      savePromptToLocal(prompt.id);
      setIsSaved(true);
      toast({
        title: language === 'bn' ? "সেভ করা হয়েছে!" : "Saved!",
        description: language === 'bn' ? "প্রম্পট সেভ তালিকায় যোগ হয়েছে" : "Added to saved prompts"
      });
    }
  };

  const handleShare = () => {
    const url = window.location.href;
    const text = language === 'bn' 
      ? `${prompt?.titleBn || prompt?.title} - bdprompt.com এ দেখুন: ${url}`
      : `Check out "${prompt?.title}" on bdprompt.com: ${url}`;
    
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  const relatedPrompts = mockPrompts
    .filter(p => p.id !== prompt?.id && p.category === prompt?.category)
    .slice(0, 3);

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
      tags: "ট্যাগ"
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
      tags: "Tags"
    }
  };

  const currentText = text[language];

  if (!prompt) {
    return (
      <div className="min-h-screen bg-background">
        <Header language={language} onLanguageChange={handleLanguageChange} />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold">Loading...</h1>
        </div>
        <Footer language={language} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header language={language} onLanguageChange={handleLanguageChange} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className={`mb-6 ${language === 'bn' ? 'font-bengali' : ''}`}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {currentText.back}
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-2 flex-1">
                  <h1 className={`text-3xl lg:text-4xl font-bold text-foreground ${language === 'bn' ? 'font-bengali text-bengali' : ''}`}>
                    {language === 'bn' && prompt.titleBn ? prompt.titleBn : prompt.title}
                  </h1>
                  <p className={`text-lg text-muted-foreground ${language === 'bn' ? 'font-bengali text-bangali' : ''}`}>
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
                <div className="flex items-center space-x-1">
                  <User className="w-4 h-4" />
                  <span>{language === 'bn' && prompt.authorBn ? prompt.authorBn : prompt.author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-current text-yellow-500" />
                  <span>{prompt.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>{prompt.usageCount.toLocaleString()}</span>
                </div>
                <Badge variant="secondary">
                  {language === 'bn' && prompt.categoryBn ? prompt.categoryBn : prompt.category}
                </Badge>
                <Badge variant="outline">
                  {prompt.price === 0 ? currentText.free : `৳${prompt.price}`}
                </Badge>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {(language === 'bn' && prompt.tagsBn ? prompt.tagsBn : prompt.tags).map((tag, index) => (
                  <Badge key={index} variant="outline" className={language === 'bn' ? 'font-bengali' : ''}>
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

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
                <div className="bg-muted/50 rounded-lg p-4 font-mono text-sm">
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
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
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
                  <CardTitle className={language === 'bn' ? 'font-bengali' : ''}>{currentText.relatedPrompts}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {relatedPrompts.map((relatedPrompt) => (
                    <Link key={relatedPrompt.id} to={`/prompt/${relatedPrompt.id}`}>
                      <div className="border rounded-lg p-3 hover:bg-muted/50 transition-colors">
                        <h4 className={`font-medium text-sm mb-1 ${language === 'bn' ? 'font-bengali text-bengali' : ''}`}>
                          {language === 'bn' && relatedPrompt.titleBn ? relatedPrompt.titleBn : relatedPrompt.title}
                        </h4>
                        <p className="text-xs text-muted-foreground line-clamp-2">
                          {language === 'bn' && relatedPrompt.descriptionBn ? relatedPrompt.descriptionBn : relatedPrompt.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>
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
  );
};

export default PromptDetail;