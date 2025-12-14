import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { ProfileSavedPrompts } from "@/components/profile/ProfileSavedPrompts";
import { ProfilePurchases } from "@/components/profile/ProfilePurchases";
import { ProfileApiUsage } from "@/components/profile/ProfileApiUsage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Bookmark, ShoppingBag, Activity, Loader2, Mail, Calendar } from "lucide-react";

const Profile = () => {
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [loading, user, navigate]);

  const text = {
    bn: {
      title: "আমার প্রোফাইল",
      savedPrompts: "সেভ করা প্রম্পট",
      purchases: "কেনাকাটা",
      apiUsage: "API ব্যবহার",
      loading: "লোড হচ্ছে...",
      memberSince: "সদস্য হয়েছেন",
      email: "ইমেইল",
      exploreMore: "আরো প্রম্পট দেখুন",
    },
    en: {
      title: "My Profile",
      savedPrompts: "Saved Prompts",
      purchases: "Purchases",
      apiUsage: "API Usage",
      loading: "Loading...",
      memberSince: "Member since",
      email: "Email",
      exploreMore: "Explore More Prompts",
    }
  };

  const t = text[language];

  if (loading) {
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

  if (!user) {
    return null;
  }

  const memberSince = new Date(user.created_at).toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="min-h-screen bg-background">
      <Header language={language} onLanguageChange={setLanguage} />
      
      <main className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-primary-foreground" />
              </div>
              <div className="text-center sm:text-left flex-1">
                <h1 className={`text-2xl font-bold text-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {t.title}
                </h1>
                <div className="mt-2 space-y-1">
                  <p className="flex items-center justify-center sm:justify-start gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4" />
                    {user.email}
                  </p>
                  <p className={`flex items-center justify-center sm:justify-start gap-2 text-muted-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
                    <Calendar className="w-4 h-4" />
                    {t.memberSince}: {memberSince}
                  </p>
                </div>
              </div>
              <Link to="/explore">
                <Button variant="outline" className={language === 'bn' ? 'font-bengali' : ''}>
                  {t.exploreMore}
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="saved" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[500px]">
            <TabsTrigger value="saved" className={`flex items-center gap-2 ${language === 'bn' ? 'font-bengali' : ''}`}>
              <Bookmark className="w-4 h-4" />
              <span className="hidden sm:inline">{t.savedPrompts}</span>
            </TabsTrigger>
            <TabsTrigger value="purchases" className={`flex items-center gap-2 ${language === 'bn' ? 'font-bengali' : ''}`}>
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">{t.purchases}</span>
            </TabsTrigger>
            <TabsTrigger value="usage" className={`flex items-center gap-2 ${language === 'bn' ? 'font-bengali' : ''}`}>
              <Activity className="w-4 h-4" />
              <span className="hidden sm:inline">{t.apiUsage}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="saved">
            <ProfileSavedPrompts language={language} userId={user.id} />
          </TabsContent>

          <TabsContent value="purchases">
            <ProfilePurchases language={language} userId={user.id} />
          </TabsContent>

          <TabsContent value="usage">
            <ProfileApiUsage language={language} userId={user.id} />
          </TabsContent>
        </Tabs>
      </main>

      <Footer language={language} />
    </div>
  );
};

export default Profile;
