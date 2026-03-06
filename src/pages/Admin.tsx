import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { useAuth } from "@/hooks/useAuth";
import { useAdmin } from "@/hooks/useAdmin";
import { AdminPromptsTable } from "@/components/admin/AdminPromptsTable";
import { AdminCategoriesTable } from "@/components/admin/AdminCategoriesTable";
import { AdminAnalytics } from "@/components/admin/AdminAnalytics";
import { AdminAuditLogs } from "@/components/admin/AdminAuditLogs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, FileText, FolderOpen, BarChart3, History, Loader2 } from "lucide-react";

const Admin = () => {
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, loading: adminLoading } = useAdmin();

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [authLoading, user, navigate]);

  useEffect(() => {
    if (!adminLoading && user && !isAdmin) {
      navigate('/');
    }
  }, [adminLoading, isAdmin, user, navigate]);

  const text = {
    bn: {
      title: "অ্যাডমিন ড্যাশবোর্ড",
      subtitle: "প্রম্পট, ক্যাটেগরি এবং সাইট ম্যানেজ করুন",
      prompts: "প্রম্পট",
      categories: "ক্যাটেগরি",
      analytics: "অ্যানালিটিক্স",
      auditLogs: "অডিট লগ",
      loading: "লোড হচ্ছে...",
      unauthorized: "আপনার অ্যাডমিন অ্যাক্সেস নেই",
    },
    en: {
      title: "Admin Dashboard",
      subtitle: "Manage prompts, categories, and site analytics",
      prompts: "Prompts",
      categories: "Categories",
      analytics: "Analytics",
      auditLogs: "Audit Logs",
      loading: "Loading...",
      unauthorized: "You don't have admin access",
    }
  };

  const t = text[language];

  if (authLoading || adminLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <p className={`text-muted-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
            {t.loading}
          </p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <>
      <SEOHead 
        title="Admin Dashboard | BdPrompt"
        description="Manage prompts, categories, and site analytics."
        canonicalUrl="https://bdprompt.com/admin"
        ogImage="https://bdprompt.com/og-image.png"
        language={language}
      />
      <div className="min-h-screen bg-background">
        <Header language={language} onLanguageChange={setLanguage} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-gradient-primary rounded-lg">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <h1 className={`text-3xl font-bold text-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
              {t.title}
            </h1>
          </div>
          <p className={`text-muted-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
            {t.subtitle}
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="prompts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-[500px]">
            <TabsTrigger value="prompts" className={`flex items-center gap-2 ${language === 'bn' ? 'font-bengali' : ''}`}>
              <FileText className="w-4 h-4" />
              {t.prompts}
            </TabsTrigger>
            <TabsTrigger value="categories" className={`flex items-center gap-2 ${language === 'bn' ? 'font-bengali' : ''}`}>
              <FolderOpen className="w-4 h-4" />
              {t.categories}
            </TabsTrigger>
            <TabsTrigger value="analytics" className={`flex items-center gap-2 ${language === 'bn' ? 'font-bengali' : ''}`}>
              <BarChart3 className="w-4 h-4" />
              {t.analytics}
            </TabsTrigger>
            <TabsTrigger value="audit" className={`flex items-center gap-2 ${language === 'bn' ? 'font-bengali' : ''}`}>
              <History className="w-4 h-4" />
              {t.auditLogs}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="prompts">
            <AdminPromptsTable language={language} />
          </TabsContent>

          <TabsContent value="categories">
            <AdminCategoriesTable language={language} />
          </TabsContent>

          <TabsContent value="analytics">
            <AdminAnalytics language={language} />
          </TabsContent>

          <TabsContent value="audit">
            <AdminAuditLogs language={language} />
          </TabsContent>
        </Tabs>
      </main>

        <Footer language={language} />
      </div>
    </>
  );
};

export default Admin;
