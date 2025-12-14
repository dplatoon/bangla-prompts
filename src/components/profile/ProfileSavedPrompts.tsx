import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bookmark, ExternalLink, Trash2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProfileSavedPromptsProps {
  language: 'bn' | 'en';
  userId: string;
}

export const ProfileSavedPrompts = ({ language, userId }: ProfileSavedPromptsProps) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const text = {
    bn: {
      title: "সেভ করা প্রম্পট",
      description: "আপনার সেভ করা সব প্রম্পট দেখুন",
      noSaved: "আপনি এখনো কোনো প্রম্পট সেভ করেননি",
      explore: "প্রম্পট এক্সপ্লোর করুন",
      view: "দেখুন",
      remove: "সরান",
      free: "ফ্রি",
    },
    en: {
      title: "Saved Prompts",
      description: "View all your saved prompts",
      noSaved: "You haven't saved any prompts yet",
      explore: "Explore Prompts",
      view: "View",
      remove: "Remove",
      free: "Free",
    }
  };

  const t = text[language];

  const { data: savedPrompts, isLoading } = useQuery({
    queryKey: ['saved-prompts', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('saved_prompts')
        .select('*, prompts(id, title_bn, title_en, slug, is_free, price, categories(name_bn, name_en))')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    }
  });

  const removeMutation = useMutation({
    mutationFn: async (savedPromptId: string) => {
      const { error } = await supabase
        .from('saved_prompts')
        .delete()
        .eq('id', savedPromptId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['saved-prompts', userId] });
      toast({ title: language === 'bn' ? 'প্রম্পট সরানো হয়েছে' : 'Prompt removed' });
    },
    onError: () => {
      toast({ title: language === 'bn' ? 'সরাতে ব্যর্থ হয়েছে' : 'Failed to remove', variant: 'destructive' });
    }
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className={`flex items-center gap-2 ${language === 'bn' ? 'font-bengali' : ''}`}>
          <Bookmark className="w-5 h-5 text-primary" />
          {t.title}
        </CardTitle>
        <CardDescription className={language === 'bn' ? 'font-bengali' : ''}>
          {t.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {savedPrompts?.length === 0 ? (
          <div className="text-center py-8">
            <Bookmark className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
            <p className={`text-muted-foreground mb-4 ${language === 'bn' ? 'font-bengali' : ''}`}>
              {t.noSaved}
            </p>
            <Link to="/explore">
              <Button className={language === 'bn' ? 'font-bengali' : ''}>
                {t.explore}
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {savedPrompts?.map((saved) => (
              <div 
                key={saved.id} 
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors gap-4"
              >
                <div className="flex-1">
                  <h3 className={`font-medium ${language === 'bn' ? 'font-bengali' : ''}`}>
                    {language === 'bn' ? saved.prompts?.title_bn : saved.prompts?.title_en}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="font-bengali text-xs">
                      {language === 'bn' ? saved.prompts?.categories?.name_bn : saved.prompts?.categories?.name_en}
                    </Badge>
                    <Badge variant={saved.prompts?.is_free ? 'default' : 'outline'} className="text-xs">
                      {saved.prompts?.is_free ? t.free : `৳${saved.prompts?.price}`}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link to={`/prompt/${saved.prompts?.slug}`}>
                    <Button variant="outline" size="sm" className={language === 'bn' ? 'font-bengali' : ''}>
                      <ExternalLink className="w-4 h-4 mr-1" />
                      {t.view}
                    </Button>
                  </Link>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => removeMutation.mutate(saved.id)}
                    disabled={removeMutation.isPending}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
