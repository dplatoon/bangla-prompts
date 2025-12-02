import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code, Zap, Shield, Globe, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const API = () => {
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const savedLang = localStorage.getItem('bdprompt-language') as 'bn' | 'en' || 'bn';
    setLanguage(savedLang);
  }, []);

  const handleLanguageChange = (lang: 'bn' | 'en') => {
    setLanguage(lang);
    localStorage.setItem('bdprompt-language', lang);
  };

  const copyToClipboard = async (code: string, id: string) => {
    await navigator.clipboard.writeText(code);
    setCopiedCode(id);
    toast({
      title: language === 'bn' ? "কপি হয়েছে!" : "Copied!",
    });
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const codeExamples = {
    curl: `curl -X GET "https://api.bdprompt.com/v1/prompts" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`,
    javascript: `const response = await fetch('https://api.bdprompt.com/v1/prompts', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const prompts = await response.json();
console.log(prompts);`,
    python: `import requests

headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
}

response = requests.get('https://api.bdprompt.com/v1/prompts', headers=headers)
prompts = response.json()
print(prompts)`
  };

  const text = {
    bn: {
      title: "API ডকুমেন্টেশন",
      subtitle: "bdprompt API দিয়ে আপনার অ্যাপ্লিকেশনে বাংলা AI প্রম্পট ইন্টিগ্রেট করুন",
      getApiKey: "API কী নিন",
      features: "ফিচারস",
      quickStart: "কুইক স্টার্ট",
      endpoints: "এন্ডপয়েন্টস",
      feature1Title: "RESTful API",
      feature1Desc: "সহজ এবং স্ট্যান্ডার্ড REST API",
      feature2Title: "দ্রুত রেসপন্স",
      feature2Desc: "গড় রেসপন্স টাইম < 100ms",
      feature3Title: "সিকিউর",
      feature3Desc: "SSL এনক্রিপশন ও API কী অথেনটিকেশন",
      feature4Title: "বাংলা সাপোর্ট",
      feature4Desc: "সম্পূর্ণ বাংলা ভাষা সমর্থন"
    },
    en: {
      title: "API Documentation",
      subtitle: "Integrate Bangla AI prompts into your application with bdprompt API",
      getApiKey: "Get API Key",
      features: "Features",
      quickStart: "Quick Start",
      endpoints: "Endpoints",
      feature1Title: "RESTful API",
      feature1Desc: "Simple and standard REST API",
      feature2Title: "Fast Response",
      feature2Desc: "Average response time < 100ms",
      feature3Title: "Secure",
      feature3Desc: "SSL encryption & API key authentication",
      feature4Title: "Bangla Support",
      feature4Desc: "Full Bengali language support"
    }
  };

  const currentText = text[language];

  return (
    <>
      <SEOHead 
        title={language === 'bn' ? "API ডকুমেন্টেশন | bdprompt.com" : "API Documentation | bdprompt.com"}
        description={language === 'bn' ? "bdprompt API দিয়ে আপনার অ্যাপে বাংলা AI প্রম্পট ইন্টিগ্রেট করুন। RESTful API, দ্রুত রেসপন্স, সম্পূর্ণ ডকুমেন্টেশন।" : "Integrate Bangla AI prompts with bdprompt API. RESTful API, fast response, complete documentation."}
        canonicalUrl="https://bdprompt.com/api"
        language={language}
      />
      
      <div className="min-h-screen bg-background">
        <Header language={language} onLanguageChange={handleLanguageChange} />
        
        <main className="container mx-auto px-4 py-16">
          {/* Hero */}
          <header className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              <Code className="w-3 h-3 mr-1" />
              v1.0
            </Badge>
            <h1 className={`text-4xl lg:text-5xl font-bold text-foreground mb-4 ${language === 'bn' ? 'font-bengali' : ''}`}>
              {currentText.title}
            </h1>
            <p className={`text-xl text-muted-foreground max-w-2xl mx-auto mb-8 ${language === 'bn' ? 'font-bengali' : ''}`}>
              {currentText.subtitle}
            </p>
            <Button size="lg" className={language === 'bn' ? 'font-bengali' : ''}>
              {currentText.getApiKey}
            </Button>
          </header>

          {/* Features */}
          <section className="mb-16">
            <h2 className={`text-2xl font-bold text-center mb-8 ${language === 'bn' ? 'font-bengali' : ''}`}>
              {currentText.features}
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { icon: Code, title: currentText.feature1Title, desc: currentText.feature1Desc },
                { icon: Zap, title: currentText.feature2Title, desc: currentText.feature2Desc },
                { icon: Shield, title: currentText.feature3Title, desc: currentText.feature3Desc },
                { icon: Globe, title: currentText.feature4Title, desc: currentText.feature4Desc }
              ].map((feature, idx) => (
                <Card key={idx}>
                  <CardContent className="pt-6 text-center">
                    <feature.icon className="w-10 h-10 text-primary mx-auto mb-4" />
                    <h3 className={`font-semibold mb-2 ${language === 'bn' ? 'font-bengali' : ''}`}>
                      {feature.title}
                    </h3>
                    <p className={`text-sm text-muted-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
                      {feature.desc}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Quick Start */}
          <section className="mb-16">
            <h2 className={`text-2xl font-bold mb-8 ${language === 'bn' ? 'font-bengali' : ''}`}>
              {currentText.quickStart}
            </h2>
            <Card>
              <CardHeader>
                <CardTitle>Get All Prompts</CardTitle>
                <CardDescription>GET /v1/prompts</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="curl">
                  <TabsList>
                    <TabsTrigger value="curl">cURL</TabsTrigger>
                    <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                    <TabsTrigger value="python">Python</TabsTrigger>
                  </TabsList>
                  {Object.entries(codeExamples).map(([lang, code]) => (
                    <TabsContent key={lang} value={lang}>
                      <div className="relative">
                        <pre className="bg-muted rounded-lg p-4 overflow-x-auto text-sm">
                          <code>{code}</code>
                        </pre>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute top-2 right-2"
                          onClick={() => copyToClipboard(code, lang)}
                        >
                          {copiedCode === lang ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </section>

          {/* Endpoints */}
          <section>
            <h2 className={`text-2xl font-bold mb-8 ${language === 'bn' ? 'font-bengali' : ''}`}>
              {currentText.endpoints}
            </h2>
            <div className="space-y-4">
              {[
                { method: 'GET', path: '/v1/prompts', desc: 'Get all prompts' },
                { method: 'GET', path: '/v1/prompts/:id', desc: 'Get prompt by ID' },
                { method: 'GET', path: '/v1/categories', desc: 'Get all categories' },
                { method: 'POST', path: '/v1/generate', desc: 'Generate content from prompt' }
              ].map((endpoint, idx) => (
                <Card key={idx}>
                  <CardContent className="flex items-center gap-4 py-4">
                    <Badge variant={endpoint.method === 'GET' ? 'secondary' : 'default'}>
                      {endpoint.method}
                    </Badge>
                    <code className="text-sm font-mono">{endpoint.path}</code>
                    <span className="text-muted-foreground text-sm ml-auto">{endpoint.desc}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </main>

        <Footer language={language} />
      </div>
    </>
  );
};

export default API;
