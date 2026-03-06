import { useState, useEffect, useRef, useCallback } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Copy, RotateCcw, Wand2, Loader2, Square, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { PromptTemplates, saveCustomTemplate } from "@/components/playground/PromptTemplates";
import { GenerationHistory, saveToHistory } from "@/components/playground/GenerationHistory";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const GENERATE_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-prompt`;

const Playground = () => {
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [model, setModel] = useState("gemini-2.5-flash");
  const [temperature, setTemperature] = useState([0.7]);
  const [maxTokens, setMaxTokens] = useState([1024]);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [templateName, setTemplateName] = useState("");
  const [templatesRefreshKey, setTemplatesRefreshKey] = useState(0);
  const { toast } = useToast();
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const savedLang = localStorage.getItem('bdprompt-language') as 'bn' | 'en' || 'bn';
    setLanguage(savedLang);
  }, []);

  const handleLanguageChange = (lang: 'bn' | 'en') => {
    setLanguage(lang);
    localStorage.setItem('bdprompt-language', lang);
  };

  const handleStop = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsGenerating(false);
    }
  }, []);

  const navigate = useNavigate();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: language === 'bn' ? "প্রম্পট প্রয়োজন" : "Prompt required",
        description: language === 'bn' ? "অনুগ্রহ করে একটি প্রম্পট লিখুন" : "Please enter a prompt",
        variant: "destructive"
      });
      return;
    }

    // Get user session for authentication
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.access_token) {
      toast({
        title: language === 'bn' ? "লগইন প্রয়োজন" : "Login required",
        description: language === 'bn' ? "AI জেনারেশন ব্যবহার করতে লগইন করুন" : "Please log in to use AI generation",
        variant: "destructive"
      });
      navigate('/auth');
      return;
    }

    // Cancel any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    abortControllerRef.current = new AbortController();
    setIsGenerating(true);
    setOutput("");

    try {
      const response = await fetch(GENERATE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          prompt: prompt,
          model: model,
          temperature: temperature[0],
          maxTokens: maxTokens[0],
          stream: true,
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Request failed with status ${response.status}`);
      }

      if (!response.body) {
        throw new Error("No response body");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let streamDone = false;
      let outputSoFar = "";

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        // Process line-by-line as data arrives
        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1); // handle CRLF
          if (line.startsWith(":") || line.trim() === "") continue; // SSE comments/keepalive
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              outputSoFar += content;
              setOutput(outputSoFar);
            }
          } catch {
            // Incomplete JSON split across chunks: put it back and wait for more data
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }

      // Final flush in case remaining buffered lines arrived without trailing newline
      if (textBuffer.trim()) {
        for (let raw of textBuffer.split("\n")) {
          if (!raw) continue;
          if (raw.endsWith("\r")) raw = raw.slice(0, -1);
          if (raw.startsWith(":") || raw.trim() === "") continue;
          if (!raw.startsWith("data: ")) continue;
          const jsonStr = raw.slice(6).trim();
          if (jsonStr === "[DONE]") continue;
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            if (content) {
              outputSoFar += content;
              setOutput(outputSoFar);
            }
          } catch { /* ignore partial leftovers */ }
        }
      }
      
      // Save to history on successful generation
      if (outputSoFar.trim()) {
        saveToHistory(prompt, outputSoFar, model);
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        // User cancelled - don't show error
        return;
      }
      if (import.meta.env.DEV) {
        console.error('Generation error:', error);
      }
      toast({
        title: language === 'bn' ? "ত্রুটি" : "Error",
        description: error?.message || (language === 'bn' ? "জেনারেশন ব্যর্থ হয়েছে" : "Generation failed"),
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
      abortControllerRef.current = null;
    }
  };

  const handleSelectTemplate = (templatePrompt: string) => {
    setPrompt(templatePrompt);
    toast({
      title: language === 'bn' ? "টেমপ্লেট লোড হয়েছে" : "Template loaded",
      description: language === 'bn' ? "প্রম্পট কাস্টমাইজ করুন" : "Customize the prompt as needed"
    });
  };

  const handleReuseFromHistory = (historyPrompt: string, historyOutput: string) => {
    setPrompt(historyPrompt);
    setOutput(historyOutput);
    toast({
      title: language === 'bn' ? "ইতিহাস থেকে লোড হয়েছে" : "Loaded from history",
    });
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
    handleStop();
    setPrompt("");
    setOutput("");
  };

  const handleSaveAsTemplate = () => {
    if (!prompt.trim()) {
      toast({
        title: language === 'bn' ? "প্রম্পট প্রয়োজন" : "Prompt required",
        description: language === 'bn' ? "সংরক্ষণ করতে প্রম্পট লিখুন" : "Enter a prompt to save",
        variant: "destructive"
      });
      return;
    }
    setSaveDialogOpen(true);
  };

  const handleConfirmSave = () => {
    if (!templateName.trim()) {
      toast({
        title: language === 'bn' ? "নাম প্রয়োজন" : "Name required",
        description: language === 'bn' ? "টেমপ্লেটের নাম দিন" : "Enter a name for the template",
        variant: "destructive"
      });
      return;
    }

    const saved = saveCustomTemplate(templateName.trim(), prompt);
    if (saved) {
      toast({
        title: language === 'bn' ? "সংরক্ষিত!" : "Saved!",
        description: language === 'bn' ? "টেমপ্লেট সংরক্ষণ করা হয়েছে" : "Template saved successfully"
      });
      setTemplatesRefreshKey((k) => k + 1);
      setSaveDialogOpen(false);
      setTemplateName("");
    } else {
      toast({
        title: language === 'bn' ? "ত্রুটি" : "Error",
        description: language === 'bn' ? "সংরক্ষণ ব্যর্থ হয়েছে" : "Failed to save template",
        variant: "destructive"
      });
    }
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
      stop: "থামুন",
      copy: "কপি",
      reset: "রিসেট",
      model: "মডেল",
      temperature: "টেম্পারেচার",
      maxTokens: "সর্বোচ্চ টোকেন",
      settings: "সেটিংস",
      saveTemplate: "সেভ করুন",
      saveDialogTitle: "টেমপ্লেট সংরক্ষণ করুন",
      saveDialogDesc: "এই প্রম্পটটি আপনার ব্যক্তিগত টেমপ্লেট হিসেবে সংরক্ষণ করুন",
      templateNameLabel: "টেমপ্লেটের নাম",
      templateNamePlaceholder: "যেমন: ব্লগ পোস্ট লেখা",
      cancel: "বাতিল",
      save: "সংরক্ষণ"
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
      stop: "Stop",
      copy: "Copy",
      reset: "Reset",
      model: "Model",
      temperature: "Temperature",
      maxTokens: "Max Tokens",
      settings: "Settings",
      saveTemplate: "Save",
      saveDialogTitle: "Save as Template",
      saveDialogDesc: "Save this prompt as a personal template for quick reuse",
      templateNameLabel: "Template Name",
      templateNamePlaceholder: "e.g., Blog Post Writer",
      cancel: "Cancel",
      save: "Save"
    }
  };

  const currentText = text[language];

  return (
    <>
      <SEOHead 
        title={language === 'bn' ? "প্লেগ্রাউন্ড | AI প্রম্পট টেস্ট করুন | BdPrompt" : "Playground | Test AI Prompts | BdPrompt"}
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
            {/* Settings & Templates Panel */}
            <div className="lg:col-span-1 space-y-4">
              {/* Settings Card */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className={`text-sm ${language === 'bn' ? 'font-bengali' : ''}`}>
                    {currentText.settings}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
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

              {/* Templates & History Tabs */}
              <Tabs defaultValue="templates" className="w-full">
                <TabsList className="w-full grid grid-cols-2">
                  <TabsTrigger value="templates" className={language === 'bn' ? 'font-bengali text-xs' : 'text-xs'}>
                    {language === 'bn' ? 'টেমপ্লেট' : 'Templates'}
                  </TabsTrigger>
                  <TabsTrigger value="history" className={language === 'bn' ? 'font-bengali text-xs' : 'text-xs'}>
                    {language === 'bn' ? 'ইতিহাস' : 'History'}
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="templates" className="mt-3">
                  <PromptTemplates language={language} onSelectTemplate={handleSelectTemplate} refreshKey={templatesRefreshKey} />
                </TabsContent>
                <TabsContent value="history" className="mt-3">
                  <GenerationHistory language={language} onReuse={handleReuseFromHistory} />
                </TabsContent>
              </Tabs>
            </div>

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
                    {isGenerating ? (
                      <Button 
                        onClick={handleStop}
                        variant="destructive"
                        className={language === 'bn' ? 'font-bengali' : ''}
                      >
                        <Square className="w-4 h-4 mr-2" />
                        {currentText.stop}
                      </Button>
                    ) : (
                      <Button 
                        onClick={handleGenerate} 
                        disabled={isGenerating}
                        className={language === 'bn' ? 'font-bengali' : ''}
                      >
                        <Wand2 className="w-4 h-4 mr-2" />
                        {currentText.generate}
                      </Button>
                    )}
                    <Button variant="outline" onClick={handleReset} className={language === 'bn' ? 'font-bengali' : ''}>
                      <RotateCcw className="w-4 h-4 mr-2" />
                      {currentText.reset}
                    </Button>
                    <Button variant="secondary" onClick={handleSaveAsTemplate} className={language === 'bn' ? 'font-bengali' : ''}>
                      <Save className="w-4 h-4 mr-2" />
                      {currentText.saveTemplate}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Output */}
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className={`flex items-center gap-2 ${language === 'bn' ? 'font-bengali' : ''}`}>
                    {currentText.outputLabel}
                    {isGenerating && <Loader2 className="w-4 h-4 animate-spin text-primary" />}
                  </CardTitle>
                  {output && !isGenerating && (
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

        {/* Save Template Dialog */}
        <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className={language === 'bn' ? 'font-bengali' : ''}>
                {currentText.saveDialogTitle}
              </DialogTitle>
              <DialogDescription className={language === 'bn' ? 'font-bengali' : ''}>
                {currentText.saveDialogDesc}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label className={`text-sm font-medium ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {currentText.templateNameLabel}
                </label>
                <Input
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  placeholder={currentText.templateNamePlaceholder}
                  className={language === 'bn' ? 'font-bengali' : ''}
                  onKeyDown={(e) => e.key === 'Enter' && handleConfirmSave()}
                />
              </div>
              <div className="bg-muted rounded-md p-3">
                <p className={`text-xs text-muted-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {language === 'bn' ? 'প্রম্পট প্রিভিউ:' : 'Prompt preview:'}
                </p>
                <p className={`text-sm mt-1 line-clamp-3 ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {prompt.slice(0, 150)}{prompt.length > 150 ? '...' : ''}
                </p>
              </div>
            </div>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button variant="outline" onClick={() => setSaveDialogOpen(false)} className={language === 'bn' ? 'font-bengali' : ''}>
                {currentText.cancel}
              </Button>
              <Button onClick={handleConfirmSave} className={language === 'bn' ? 'font-bengali' : ''}>
                {currentText.save}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default Playground;
