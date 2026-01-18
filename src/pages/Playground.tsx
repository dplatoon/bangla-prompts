import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Copy, RotateCcw, Wand2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Playground = () => {
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [model, setModel] = useState("gemini-2.5-flash");
  const [temperature, setTemperature] = useState([0.7]);
  const [maxTokens, setMaxTokens] = useState([1024]);
  const { toast } = useToast();

  useEffect(() => {
    const savedLang = localStorage.getItem('bdprompt-language') as 'bn' | 'en' || 'bn';
    setLanguage(savedLang);
  }, []);

  const handleLanguageChange = (lang: 'bn' | 'en') => {
    setLanguage(lang);
    localStorage.setItem('bdprompt-language', lang);
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: language === 'bn' ? "প্রম্পট প্রয়োজন" : "Prompt required",
        description: language === 'bn' ? "অনুগ্রহ করে একটি প্রম্পট লিখুন" : "Please enter a prompt",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    setOutput("");

    try {
      const { data, error } = await supabase.functions.invoke('generate-prompt', {
        body: { 
          prompt: prompt,
          model: model,
          temperature: temperature[0],
          maxTokens: maxTokens[0]
        }
      });

      if (error) throw error;
      
      if (data.error) {
        toast({
          title: language === 'bn' ? "ত্রুটি" : "Error",
          description: data.error,
          variant: "destructive"
        });
        return;
      }
      
      setOutput(data.output || "Generation completed.");
    } catch (error: any) {
      console.error('Generation error:', error);
      toast({
        title: language === 'bn' ? "ত্রুটি" : "Error",
        description: error?.message || (language === 'bn' ? "জেনারেশন ব্যর্থ হয়েছে" : "Generation failed"),
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
      toast({
        title: language === 'bn' ? "কপি হয়েছে!" : "Copied!",
        description: language === 'bn' ? "আউটপুট কপি করা হয়েছে" : "Output copied to clipboard"
      });
    }
  };

  const handleReset = () => {
    setPrompt("");
    setOutput("");
  };

  const text = {
    bn: {
      title: "AI প্লেগ্রাউন্ড",
      subtitle: "আপনার প্রম্পট টেস্ট করুন এবং AI দিয়ে কন্টেন্ট জেনারেট করুন",
      promptLabel: "আপনার প্রম্পট",
      promptPlaceholder: "এখানে আপনার প্রম্পট লিখুন...",
      outputLabel: "AI আউটপুট",
      outputPlaceholder: "জেনারেট করা কন্টেন্ট এখানে দেখা যাবে...",
      generate: "জেনারেট করুন",
      generating: "জেনারেট হচ্ছে...",
      copy: "কপি",
      reset: "রিসেট",
      model: "মডেল",
      temperature: "টেম্পারেচার",
      maxTokens: "সর্বোচ্চ টোকেন",
      settings: "সেটিংস"
    },
    en: {
      title: "AI Playground",
      subtitle: "Test your prompts and generate content with AI",
      promptLabel: "Your Prompt",
      promptPlaceholder: "Write your prompt here...",
      outputLabel: "AI Output",
      outputPlaceholder: "Generated content will appear here...",
      generate: "Generate",
      generating: "Generating...",
      copy: "Copy",
      reset: "Reset",
      model: "Model",
      temperature: "Temperature",
      maxTokens: "Max Tokens",
      settings: "Settings"
    }
  };

  const currentText = text[language];

  return (
    <>
      <SEOHead 
        title={language === 'bn' ? "AI প্লেগ্রাউন্ড | bdprompt.com" : "AI Playground | bdprompt.com"}
        description={language === 'bn' ? "AI প্লেগ্রাউন্ডে আপনার প্রম্পট টেস্ট করুন। বাংলা ও ইংরেজিতে কন্টেন্ট জেনারেট করুন।" : "Test your prompts in the AI Playground. Generate content in Bengali and English."}
        canonicalUrl="https://bdprompt.com/playground"
        language={language}
      />
      
      <div className="min-h-screen bg-background">
        <Header language={language} onLanguageChange={handleLanguageChange} />
        
        <main className="container mx-auto px-4 py-8">
          {/* Breadcrumb Navigation */}
          <Breadcrumbs
            items={[
              { label: "AI Playground", labelBn: "AI প্লেগ্রাউন্ড", href: "/playground" }
            ]}
            language={language}
            className="mb-6"
          />

          {/* Page Header */}
          <header className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className={`text-sm font-medium text-primary ${language === 'bn' ? 'font-bengali' : ''}`}>
                Powered by Lovable AI
              </span>
            </div>
            <h1 className={`text-4xl lg:text-5xl font-bold text-foreground mb-4 ${language === 'bn' ? 'font-bengali' : ''}`}>
              {currentText.title}
            </h1>
            <p className={`text-xl text-muted-foreground max-w-2xl mx-auto ${language === 'bn' ? 'font-bengali' : ''}`}>
              {currentText.subtitle}
            </p>
          </header>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Settings Panel */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className={language === 'bn' ? 'font-bengali' : ''}>
                  {currentText.settings}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <label className={`text-sm font-medium ${language === 'bn' ? 'font-bengali' : ''}`}>
                    {currentText.model}
                  </label>
                  <Select value={model} onValueChange={setModel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gemini-2.5-flash">Gemini 2.5 Flash</SelectItem>
                      <SelectItem value="gemini-2.5-pro">Gemini 2.5 Pro</SelectItem>
                      <SelectItem value="gpt-4o-mini">GPT-4o Mini</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className={`text-sm font-medium ${language === 'bn' ? 'font-bengali' : ''}`}>
                    {currentText.temperature}: {temperature[0]}
                  </label>
                  <Slider
                    value={temperature}
                    onValueChange={setTemperature}
                    min={0}
                    max={1}
                    step={0.1}
                  />
                </div>

                <div className="space-y-2">
                  <label className={`text-sm font-medium ${language === 'bn' ? 'font-bengali' : ''}`}>
                    {currentText.maxTokens}: {maxTokens[0]}
                  </label>
                  <Slider
                    value={maxTokens}
                    onValueChange={setMaxTokens}
                    min={256}
                    max={4096}
                    step={256}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Main Playground Area */}
            <div className="lg:col-span-3 space-y-6">
              {/* Prompt Input */}
              <Card>
                <CardHeader>
                  <CardTitle className={language === 'bn' ? 'font-bengali' : ''}>
                    {currentText.promptLabel}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder={currentText.promptPlaceholder}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className={`min-h-[150px] ${language === 'bn' ? 'font-bengali' : ''}`}
                  />
                  <div className="flex gap-3 mt-4">
                    <Button 
                      onClick={handleGenerate} 
                      disabled={isGenerating}
                      className={language === 'bn' ? 'font-bengali' : ''}
                    >
                      {isGenerating ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          {currentText.generating}
                        </>
                      ) : (
                        <>
                          <Wand2 className="w-4 h-4 mr-2" />
                          {currentText.generate}
                        </>
                      )}
                    </Button>
                    <Button variant="outline" onClick={handleReset} className={language === 'bn' ? 'font-bengali' : ''}>
                      <RotateCcw className="w-4 h-4 mr-2" />
                      {currentText.reset}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Output */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className={language === 'bn' ? 'font-bengali' : ''}>
                    {currentText.outputLabel}
                  </CardTitle>
                  {output && (
                    <Button variant="ghost" size="sm" onClick={handleCopy}>
                      <Copy className="w-4 h-4 mr-2" />
                      {currentText.copy}
                    </Button>
                  )}
                </CardHeader>
                <CardContent>
                  <div className={`min-h-[200px] bg-muted/50 rounded-lg p-4 ${language === 'bn' ? 'font-bengali' : ''}`}>
                    {output ? (
                      <p className="whitespace-pre-wrap">{output}</p>
                    ) : (
                      <p className="text-muted-foreground">{currentText.outputPlaceholder}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>

        <Footer language={language} />
      </div>
    </>
  );
};

export default Playground;
