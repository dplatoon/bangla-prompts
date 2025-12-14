import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, ExternalLink, Loader2 } from "lucide-react";

interface ProfilePurchasesProps {
  language: 'bn' | 'en';
  userId: string;
}

export const ProfilePurchases = ({ language, userId }: ProfilePurchasesProps) => {
  const text = {
    bn: {
      title: "কেনাকাটার ইতিহাস",
      description: "আপনার কেনা সব প্রম্পট দেখুন",
      noPurchases: "আপনি এখনো কোনো প্রম্পট কেনেননি",
      explorePremium: "প্রিমিয়াম প্রম্পট দেখুন",
      view: "দেখুন",
      purchasedOn: "কেনা হয়েছে",
      totalSpent: "মোট খরচ",
    },
    en: {
      title: "Purchase History",
      description: "View all your purchased prompts",
      noPurchases: "You haven't purchased any prompts yet",
      explorePremium: "Explore Premium Prompts",
      view: "View",
      purchasedOn: "Purchased on",
      totalSpent: "Total Spent",
    }
  };

  const t = text[language];

  const { data: purchases, isLoading } = useQuery({
    queryKey: ['purchases', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('prompt_purchases')
        .select('*, prompts(id, title_bn, title_en, slug, categories(name_bn, name_en))')
        .eq('user_id', userId)
        .order('purchased_at', { ascending: false });
      if (error) throw error;
      return data;
    }
  });

  const totalSpent = purchases?.reduce((acc, p) => acc + (p.amount || 0), 0) || 0;

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Total Spent Card */}
      {purchases && purchases.length > 0 && (
        <Card className="bg-gradient-primary text-primary-foreground">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-primary-foreground/80 ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {t.totalSpent}
                </p>
                <p className="text-3xl font-bold">৳{totalSpent.toLocaleString()}</p>
              </div>
              <ShoppingBag className="w-10 h-10 text-primary-foreground/50" />
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${language === 'bn' ? 'font-bengali' : ''}`}>
            <ShoppingBag className="w-5 h-5 text-primary" />
            {t.title}
          </CardTitle>
          <CardDescription className={language === 'bn' ? 'font-bengali' : ''}>
            {t.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {purchases?.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingBag className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
              <p className={`text-muted-foreground mb-4 ${language === 'bn' ? 'font-bengali' : ''}`}>
                {t.noPurchases}
              </p>
              <Link to="/explore">
                <Button className={language === 'bn' ? 'font-bengali' : ''}>
                  {t.explorePremium}
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {purchases?.map((purchase) => {
                const purchaseDate = new Date(purchase.purchased_at).toLocaleDateString(
                  language === 'bn' ? 'bn-BD' : 'en-US',
                  { year: 'numeric', month: 'short', day: 'numeric' }
                );
                
                return (
                  <div 
                    key={purchase.id} 
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors gap-4"
                  >
                    <div className="flex-1">
                      <h3 className={`font-medium ${language === 'bn' ? 'font-bengali' : ''}`}>
                        {language === 'bn' ? purchase.prompts?.title_bn : purchase.prompts?.title_en}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <Badge variant="secondary" className="font-bengali text-xs">
                          {language === 'bn' ? purchase.prompts?.categories?.name_bn : purchase.prompts?.categories?.name_en}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {t.purchasedOn}: {purchaseDate}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="outline" className="text-lg font-bold">
                        ৳{purchase.amount}
                      </Badge>
                      <Link to={`/prompt/${purchase.prompts?.slug}`}>
                        <Button variant="outline" size="sm" className={language === 'bn' ? 'font-bengali' : ''}>
                          <ExternalLink className="w-4 h-4 mr-1" />
                          {t.view}
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
