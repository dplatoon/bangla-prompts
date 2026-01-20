import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Play, Loader2, Download, Wand2, Sparkles, LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { User } from "@supabase/supabase-js";

interface PlaygroundModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  promptData?: {
    id: string;
    title: string;
    titleBn?: string;
    content: string;
    contentBn?: string;
    variables?: string[];
  };
  language: 'bn' | 'en';
}

export const PlaygroundModal = ({ 
  open, 
  onOpenChange, 
  promptData,
  language 
}: PlaygroundModalProps) => {
  const [promptText, setPromptText] = useState(promptData?.content || "");
  const [variableValues, setVariableValues] = useState<Record<string, string>>({});
  const [output, setOutput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [suggestions, setSuggestions] = useState("");
  const [model, setModel] = useState("gpt-4o-mini");
  const [temperature, setTemperature] = useState([0.7]);
  const [maxTokens, setMaxTokens] = useState([500]);
  const [user, setUser] = useState<User | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const text = {
    bn: {
      title: 'AI প্লেগ্রাউন্ড',
      promptTemplate: 'প্রম্পট টেমপ্লেট',
      variables: 'ভেরিয়েবল',
      settings: 'সেটিংস',
      model: 'মডেল',
      temperature: 'তাপমাত্রা',
      maxTokens: 'সর্বোচ্চ টোকেন',
      output: 'আউটপুট',
      run: 'চালান',
      copy: 'কপি করুন',
      download: 'ডাউনলোড',
      generating: 'তৈরি করা হচ্ছে...',
      placeholder: 'এখানে আপনার প্রম্পট লিখুন বা পরিবর্তন করুন...',
      outputPlaceholder: 'আউটপুট এখানে দেখাবে...',
      copied: 'কপি করা হয়েছে!',
      downloaded: 'ডাউনলোড করা হয়েছে!',
      variablePlaceholder: 'এর জন্য মান লিখুন',
      getSuggestions: 'AI পরামর্শ পান',
      suggestions: 'AI পরামর্শ',
      gettingSuggestions: 'পরামর্শ তৈরি করা হচ্ছে...',
      loginRequired: 'AI ফিচার ব্যবহার করতে লগইন করুন',
      loginButton: 'লগইন করুন'
    },
    en: {
      title: 'AI Playground',
      promptTemplate: 'Prompt Template',
      variables: 'Variables',
      settings: 'Settings',
      model: 'Model',
      temperature: 'Temperature',
      maxTokens: 'Max Tokens',
      output: 'Output',
      run: 'Run',
      copy: 'Copy',
      download: 'Download',
      generating: 'Generating...',
      placeholder: 'Write or modify your prompt here...',
      outputPlaceholder: 'Output will appear here...',
      copied: 'Copied!',
      downloaded: 'Downloaded!',
      variablePlaceholder: 'Enter value for',
      getSuggestions: 'Get AI Suggestions',
      suggestions: 'AI Suggestions',
      gettingSuggestions: 'Getting suggestions...',
      loginRequired: 'Login to use AI features',
      loginButton: 'Login'
    }
  };

  const currentText = text[language];

  // Extract variables from prompt text (looking for {variable} pattern)
  const extractVariables = (text: string): string[] => {
    const matches = text.match(/\{([^}]+)\}/g);
    return matches ? [...new Set(matches.map(match => match.slice(1, -1)))] : [];
  };

  const variables = extractVariables(promptText);

  // Replace variables in prompt text
  const processedPrompt = variables.reduce((text, variable) => {
    const value = variableValues[variable] || `{${variable}}`;
    return text.replace(new RegExp(`\\{${variable}\\}`, 'g'), value);
  }, promptText);

  const handleLogin = () => {
    onOpenChange(false);
    navigate('/auth');
  };

  const handleGetSuggestions = async () => {
    if (!promptText.trim()) return;
    
    if (!user) {
      toast({
        title: language === 'bn' ? 'লগইন প্রয়োজন' : 'Login Required',
        description: language === 'bn' ? 'AI পরামর্শ পেতে অনুগ্রহ করে লগইন করুন।' : 'Please log in to get AI suggestions.',
        variant: "destructive",
      });
      return;
    }
    
    setIsSuggesting(true);
    setSuggestions("");
    
    try {
      const { data, error } = await supabase.functions.invoke('suggest-prompt', {
        body: { prompt: promptText, language }
      });
      
      if (error) throw error;
      setSuggestions(data.suggestions);
    } catch (error: any) {
      console.error('Suggestions error:', error);
      const isAuthError = error?.message?.includes('401') || error?.message?.includes('authentication');
      toast({
        title: language === 'bn' ? 'ত্রুটি' : 'Error',
        description: isAuthError 
          ? (language === 'bn' ? 'অনুগ্রহ করে লগইন করুন।' : 'Please log in to use this feature.')
          : (language === 'bn' ? 'পরামর্শ পাওয়া যায়নি। আবার চেষ্টা করুন।' : 'Failed to get suggestions. Please try again.'),
        variant: "destructive",
      });
    } finally {
      setIsSuggesting(false);
    }
  };

  const handleRun = async () => {
    if (!processedPrompt.trim()) return;
    
    if (!user) {
      toast({
        title: language === 'bn' ? 'লগইন প্রয়োজন' : 'Login Required',
        description: language === 'bn' ? 'প্রম্পট চালাতে অনুগ্রহ করে লগইন করুন।' : 'Please log in to run prompts.',
        variant: "destructive",
      });
      return;
    }
    
    setIsGenerating(true);
    setOutput("");
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-prompt', {
        body: { 
          prompt: processedPrompt,
          temperature: temperature[0],
          maxTokens: maxTokens[0]
        }
      });
      
      if (error) throw error;
      setOutput(data.output);
    } catch (error) {
      console.error('Generation error:', error);
      setOutput(language === 'bn' ? 'প্রতিক্রিয়া তৈরি করতে ত্রুটি হয়েছে। আবার চেষ্টা করুন।' : 'Error generating response. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyOutput = async () => {
    if (output) {
      await navigator.clipboard.writeText(output);
      toast({
        title: currentText.copied,
        description: language === 'bn' ? 'আউটপুট ক্লিপবোর্ডে কপি করা হয়েছে।' : 'Output copied to clipboard.',
      });
    }
  };

  const handleDownload = () => {
    if (output) {
      const element = document.createElement('a');
      const file = new Blob([output], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = 'ai-output.txt';
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      
      toast({
        title: currentText.downloaded,
        description: language === 'bn' ? 'আউটপুট টেক্সট ফাইল হিসেবে ডাউনলোড করা হয়েছে।' : 'Output downloaded as text file.',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] flex flex-col overflow-hidden">
        <DialogHeader>
          <DialogTitle className={`text-xl ${language === 'bn' ? 'font-bengali text-bengali' : ''}`}>
            <Wand2 className="w-5 h-5 inline mr-2 text-primary" />
            {currentText.title}
          </DialogTitle>
        </DialogHeader>

        {/* Login Banner for unauthenticated users */}
        {!user && (
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <LogIn className="w-5 h-5 text-primary" />
              <p className={`text-sm text-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
                {currentText.loginRequired}
              </p>
            </div>
            <Button 
              onClick={handleLogin}
              size="sm"
              className={language === 'bn' ? 'font-bengali' : ''}
            >
              <LogIn className="w-4 h-4 mr-2" />
              {currentText.loginButton}
            </Button>
          </div>
        )}

        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-0 overflow-hidden">
          {/* Left Panel - Input */}
          <div className="space-y-4 flex flex-col overflow-y-auto pr-2">
            {/* Prompt Template */}
            <Card className="flex-1 flex flex-col">
              <CardHeader className="pb-3">
                <CardTitle className={`text-sm font-medium ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {currentText.promptTemplate}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col space-y-3">
                <Textarea
                  value={promptText}
                  onChange={(e) => setPromptText(e.target.value)}
                  placeholder={currentText.placeholder}
                  className={`flex-1 min-h-32 resize-none ${language === 'bn' ? 'font-bengali' : ''}`}
                />
                <Button
                  onClick={handleGetSuggestions}
                  disabled={isSuggesting || !promptText.trim()}
                  variant="outline"
                  size="sm"
                  className={`w-full ${language === 'bn' ? 'font-bengali' : ''}`}
                >
                  {isSuggesting ? (
                    <>
                      <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                      {currentText.gettingSuggestions}
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3 h-3 mr-2" />
                      {currentText.getSuggestions}
                    </>
                  )}
                </Button>
                {suggestions && (
                  <div className="p-3 bg-primary/5 border border-primary/20 rounded-md">
                    <p className={`text-xs font-semibold mb-2 text-primary ${language === 'bn' ? 'font-bengali' : ''}`}>
                      {currentText.suggestions}
                    </p>
                    <p className={`text-xs text-muted-foreground whitespace-pre-wrap ${language === 'bn' ? 'font-bengali' : ''}`}>
                      {suggestions}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Variables */}
            {variables.length > 0 && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className={`text-sm font-medium ${language === 'bn' ? 'font-bengali' : ''}`}>
                    {currentText.variables}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {variables.map((variable) => (
                    <div key={variable} className="space-y-1">
                      <Label className={`text-xs text-muted-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
                        {variable}
                      </Label>
                      <Textarea
                        value={variableValues[variable] || ''}
                        onChange={(e) => setVariableValues(prev => ({
                          ...prev,
                          [variable]: e.target.value
                        }))}
                        placeholder={`${currentText.variablePlaceholder} ${variable}`}
                        className={`h-20 resize-none ${language === 'bn' ? 'font-bengali' : ''}`}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Settings */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className={`text-sm font-medium ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {currentText.settings}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className={`text-xs ${language === 'bn' ? 'font-bengali' : ''}`}>
                    {currentText.model}
                  </Label>
                  <Select value={model} onValueChange={setModel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-4o-mini">GPT-4o Mini</SelectItem>
                      <SelectItem value="gpt-4o">GPT-4o</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className={`text-xs flex justify-between ${language === 'bn' ? 'font-bengali' : ''}`}>
                    {currentText.temperature}
                    <span className="text-muted-foreground">{temperature[0]}</span>
                  </Label>
                  <Slider
                    value={temperature}
                    onValueChange={setTemperature}
                    max={2}
                    min={0}
                    step={0.1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label className={`text-xs flex justify-between ${language === 'bn' ? 'font-bengali' : ''}`}>
                    {currentText.maxTokens}
                    <span className="text-muted-foreground">{maxTokens[0]}</span>
                  </Label>
                  <Slider
                    value={maxTokens}
                    onValueChange={setMaxTokens}
                    max={2000}
                    min={50}
                    step={50}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Run Button */}
            <Button 
              onClick={handleRun}
              disabled={isGenerating || !processedPrompt.trim()}
              className={`w-full ${language === 'bn' ? 'font-bengali' : ''}`}
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {currentText.generating}
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  {currentText.run}
                </>
              )}
            </Button>
          </div>

          {/* Right Panel - Output */}
          <Card className="flex flex-col overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className={`text-sm font-medium ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {currentText.output}
                </CardTitle>
                {output && (
                  <div className="flex space-x-2">
                    <Button
                      onClick={handleCopyOutput}
                      variant="outline"
                      size="sm"
                      className="h-8 px-2"
                    >
                      <Copy className="w-3 h-3" />
                    </Button>
                    <Button
                      onClick={handleDownload}
                      variant="outline"
                      size="sm"
                      className="h-8 px-2"
                    >
                      <Download className="w-3 h-3" />
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col overflow-hidden">
              <div className="flex-1 p-4 bg-muted/30 rounded-md border min-h-32 overflow-y-auto">
                {isGenerating ? (
                  <div className="flex items-center justify-center h-full text-muted-foreground">
                    <div className="text-center space-y-2">
                      <Loader2 className="w-8 h-8 animate-spin mx-auto" />
                      <p className={language === 'bn' ? 'font-bengali' : ''}>
                        {currentText.generating}
                      </p>
                    </div>
                  </div>
                ) : output ? (
                  <pre className={`whitespace-pre-wrap text-sm ${language === 'bn' ? 'font-bengali' : ''}`}>
                    {output}
                  </pre>
                ) : (
                  <p className={`text-muted-foreground text-sm ${language === 'bn' ? 'font-bengali' : ''}`}>
                    {currentText.outputPlaceholder}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};
