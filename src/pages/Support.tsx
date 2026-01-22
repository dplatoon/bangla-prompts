import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { HelpCircle, MessageCircle, Mail, Phone, Clock } from "lucide-react";

const Support = () => {
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');

  useEffect(() => {
    const savedLang = localStorage.getItem('bdprompt-language') as 'bn' | 'en' || 'bn';
    setLanguage(savedLang);
  }, []);

  const handleLanguageChange = (lang: 'bn' | 'en') => {
    setLanguage(lang);
    localStorage.setItem('bdprompt-language', lang);
  };

  const text = {
    bn: {
      title: "সাপোর্ট",
      subtitle: "আমরা আপনাকে সাহায্য করতে এখানে আছি",
      faq: "সচরাচর জিজ্ঞাসিত প্রশ্ন",
      contactUs: "যোগাযোগ করুন",
      sendMessage: "মেসেজ পাঠান",
      name: "নাম",
      email: "ইমেইল",
      subject: "বিষয়",
      message: "আপনার মেসেজ",
      submit: "জমা দিন",
      responseTime: "২৪ ঘণ্টার মধ্যে উত্তর দেওয়া হয়",
      faqItems: [
        {
          q: "প্রম্পট কিভাবে কপি করব?",
          a: "যেকোনো প্রম্পটের কপি বাটনে ক্লিক করুন। প্রম্পটটি আপনার ক্লিপবোর্ডে কপি হয়ে যাবে।"
        },
        {
          q: "পেমেন্ট কিভাবে করব?",
          a: "আমরা bKash, Nagad, এবং কার্ড পেমেন্ট গ্রহণ করি। চেকআউট পেজে আপনার পছন্দের পদ্ধতি বেছে নিন।"
        },
        {
          q: "রিফান্ড পলিসি কি?",
          a: "ক্রয়ের ৭ দিনের মধ্যে রিফান্ডের জন্য আবেদন করতে পারবেন যদি প্রম্পটটি বর্ণনা অনুযায়ী কাজ না করে।"
        },
        {
          q: "ক্রিয়েটর হতে চাইলে কি করব?",
          a: "Become Creator পেজে গিয়ে আবেদন ফর্ম পূরণ করুন। আমরা ২৪-৪৮ ঘণ্টার মধ্যে জানাব।"
        },
        {
          q: "API অ্যাক্সেস কিভাবে পাব?",
          a: "API পেজে গিয়ে API কী এর জন্য আবেদন করুন। Pro বা Enterprise প্যাকে API অ্যাক্সেস অন্তর্ভুক্ত।"
        }
      ]
    },
    en: {
      title: "Support",
      subtitle: "We're here to help you",
      faq: "Frequently Asked Questions",
      contactUs: "Contact Us",
      sendMessage: "Send a Message",
      name: "Name",
      email: "Email",
      subject: "Subject",
      message: "Your Message",
      submit: "Submit",
      responseTime: "We respond within 24 hours",
      faqItems: [
        {
          q: "How do I copy a prompt?",
          a: "Click the copy button on any prompt. The prompt will be copied to your clipboard."
        },
        {
          q: "How do I make a payment?",
          a: "We accept bKash, Nagad, and card payments. Choose your preferred method at checkout."
        },
        {
          q: "What is the refund policy?",
          a: "You can request a refund within 7 days of purchase if the prompt doesn't work as described."
        },
        {
          q: "How do I become a creator?",
          a: "Go to the Become Creator page and fill out the application form. We'll respond within 24-48 hours."
        },
        {
          q: "How do I get API access?",
          a: "Go to the API page and apply for an API key. Pro and Enterprise packs include API access."
        }
      ]
    }
  };

  const currentText = text[language];

  // Generate FAQ structured data for rich snippets
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": currentText.faqItems.map((item) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a
      }
    }))
  };

  return (
    <>
      <SEOHead 
        title={language === 'bn' ? "সাপোর্ট | bdprompt.com" : "Support | bdprompt.com"}
        description={language === 'bn' ? "bdprompt সাপোর্ট। প্রশ্ন আছে? আমাদের সাথে যোগাযোগ করুন।" : "bdprompt Support. Have questions? Contact us."}
        keywords={language === 'bn' ? "bdprompt সাপোর্ট, সাহায্য, যোগাযোগ, প্রশ্ন" : "bdprompt support, help, contact, FAQ"}
        canonicalUrl="https://bdprompt.com/support"
        ogImage="https://bdprompt.com/og-image.png"
        ogType="website"
        language={language}
        breadcrumbs={[
          { name: language === 'bn' ? 'হোম' : 'Home', url: 'https://bdprompt.com/' },
          { name: language === 'bn' ? 'সাপোর্ট' : 'Support', url: 'https://bdprompt.com/support' }
        ]}
        structuredData={faqStructuredData}
      />
      
      <div className="min-h-screen bg-background">
        <Header language={language} onLanguageChange={handleLanguageChange} />
        
        <main className="container mx-auto px-4 py-8">
          {/* Breadcrumbs */}
          <Breadcrumbs 
            items={[{ label: "Support", labelBn: "সাপোর্ট" }]} 
            language={language} 
            className="mb-6" 
          />
          
          {/* Header */}
          <header className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              <HelpCircle className="w-3 h-3 mr-1" />
              24/7 Support
            </Badge>
            <h1 className={`text-4xl lg:text-5xl font-bold text-foreground mb-4 ${language === 'bn' ? 'font-bengali' : ''}`}>
              {currentText.title}
            </h1>
            <p className={`text-xl text-muted-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
              {currentText.subtitle}
            </p>
          </header>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* FAQ */}
            <div>
              <h2 className={`text-2xl font-bold mb-6 ${language === 'bn' ? 'font-bengali' : ''}`}>
                {currentText.faq}
              </h2>
              <Accordion type="single" collapsible className="space-y-2">
                {currentText.faqItems.map((item, idx) => (
                  <AccordionItem key={idx} value={`item-${idx}`} className="border rounded-lg px-4">
                    <AccordionTrigger className={language === 'bn' ? 'font-bengali' : ''}>
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className={language === 'bn' ? 'font-bengali' : ''}>
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className={`text-2xl font-bold mb-6 ${language === 'bn' ? 'font-bengali' : ''}`}>
                {currentText.sendMessage}
              </h2>
              <Card>
                <CardContent className="pt-6">
                  <form className="space-y-4">
                    <div>
                      <label className={`text-sm font-medium ${language === 'bn' ? 'font-bengali' : ''}`}>
                        {currentText.name}
                      </label>
                      <Input className="mt-1" />
                    </div>
                    <div>
                      <label className={`text-sm font-medium ${language === 'bn' ? 'font-bengali' : ''}`}>
                        {currentText.email}
                      </label>
                      <Input type="email" className="mt-1" />
                    </div>
                    <div>
                      <label className={`text-sm font-medium ${language === 'bn' ? 'font-bengali' : ''}`}>
                        {currentText.subject}
                      </label>
                      <Input className="mt-1" />
                    </div>
                    <div>
                      <label className={`text-sm font-medium ${language === 'bn' ? 'font-bengali' : ''}`}>
                        {currentText.message}
                      </label>
                      <Textarea className="mt-1" rows={5} />
                    </div>
                    <Button className={`w-full ${language === 'bn' ? 'font-bengali' : ''}`}>
                      {currentText.submit}
                    </Button>
                    <p className={`text-sm text-center text-muted-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
                      <Clock className="w-4 h-4 inline mr-1" />
                      {currentText.responseTime}
                    </p>
                  </form>
                </CardContent>
              </Card>

              {/* Contact Info */}
              <div className="mt-8 space-y-4">
                <Card>
                  <CardContent className="flex items-center gap-4 py-4">
                    <Mail className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">support@bdprompt.com</p>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="flex items-center gap-4 py-4">
                    <MessageCircle className="w-5 h-5 text-primary" />
                    <div>
                      <p className="font-medium">Live Chat</p>
                      <p className={`text-sm text-muted-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
                        {language === 'bn' ? 'সকাল ৯টা - রাত ১০টা' : '9 AM - 10 PM'}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>

        <Footer language={language} />
      </div>
    </>
  );
};

export default Support;
