import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, ExternalLink, Heart, Play, Star, Bookmark, BookmarkCheck, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSavePrompt } from "@/hooks/useSavePrompt";
import { copyPromptToClipboard, type PromptData } from "@/data/mockPrompts";

interface PromptCardProps {
  promptData: PromptData;
  language: 'bn' | 'en';
  onTryClick?: (promptData: PromptData) => void;
}

export const PromptCard = ({
  promptData,
  language,
  onTryClick
}: PromptCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const { toast } = useToast();
  const { isSaved, isPending, toggleSave } = useSavePrompt(promptData.id, language);

  const {
    id, slug, title, titleBn, description, descriptionBn,
    category, categoryBn, tags, tagsBn, price, rating,
    usageCount, author, authorBn
  } = promptData;

  const navigationSlug = slug || id;
  const displayTitle = language === 'bn' && titleBn ? titleBn : title;
  const displayDescription = language === 'bn' && descriptionBn ? descriptionBn : description;
  const displayCategory = language === 'bn' && categoryBn ? categoryBn : category;
  const displayTags = language === 'bn' && tagsBn ? tagsBn : tags;
  const displayAuthor = language === 'bn' && authorBn ? authorBn : author;

  const handleCopy = async () => {
    try {
      await copyPromptToClipboard(promptData, language);
      toast({
        title: language === 'bn' ? 'কপি করা হয়েছে!' : 'Copied!',
        description: language === 'bn' ? 'প্রম্পট ক্লিপবোর্ডে কপি করা হয়েছে।' : 'Prompt copied to clipboard.',
      });
    } catch {
      toast({
        title: language === 'bn' ? 'ত্রুটি!' : 'Error!',
        description: language === 'bn' ? 'কপি করতে সমস্যা হয়েছে।' : 'Failed to copy prompt.',
        variant: "destructive"
      });
    }
  };

  const text = {
    bn: { free: 'ফ্রি', tryNow: 'চেষ্টা করুন', copy: 'কপি', save: 'সংরক্ষণ', saved: 'সংরক্ষিত', by: '', uses: 'ব্যবহার', taka: '৳' },
    en: { free: 'Free', tryNow: 'Try Now', copy: 'Copy', save: 'Save', saved: 'Saved', by: '', uses: 'uses', taka: '৳' }
  };
  const currentText = text[language];

  return (
    <Card className="group border-border/40 hover:border-primary/25 bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 overflow-hidden">
      <CardHeader className="pb-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-2 flex-1 min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <Badge variant="secondary" className={`text-xs font-medium ${language === 'bn' ? 'font-bengali' : ''}`}>
                {displayCategory}
              </Badge>
              {price === 0 ? (
                <Badge className="text-xs bg-accent/15 text-accent-foreground border-accent/30 hover:bg-accent/20">
                  {currentText.free}
                </Badge>
              ) : (
                <Badge variant="outline" className="text-xs text-primary border-primary/30">
                  {currentText.taka}{price}
                </Badge>
              )}
            </div>
            
            <CardTitle className={`text-base leading-snug group-hover:text-primary transition-colors line-clamp-2 ${language === 'bn' ? 'font-bengali' : ''}`}>
              {displayTitle}
            </CardTitle>
            
            <CardDescription className={`text-sm line-clamp-2 leading-relaxed ${language === 'bn' ? 'font-bengali' : ''}`}>
              {displayDescription}
            </CardDescription>
          </div>
          
          <div className="flex flex-col gap-0.5">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSave}
              disabled={isPending}
              className="h-8 w-8 p-0 rounded-lg text-muted-foreground hover:text-primary"
              title={isSaved ? currentText.saved : currentText.save}
              aria-label={isSaved ? currentText.saved : currentText.save}
              aria-pressed={isSaved}
            >
              {isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : isSaved ? (
                <BookmarkCheck className="w-4 h-4 text-primary" />
              ) : (
                <Bookmark className="w-4 h-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsLiked(!isLiked)}
              className="h-8 w-8 p-0 rounded-lg text-muted-foreground hover:text-accent"
              aria-label={language === 'bn' ? 'লাইক' : 'Like'}
              aria-pressed={isLiked}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current text-accent' : ''}`} />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 p-4 pt-0">
        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {displayTags.slice(0, 3).map((tag, index) => (
            <span key={index} className={`inline-block text-[11px] px-2 py-0.5 rounded-md bg-muted text-muted-foreground ${language === 'bn' ? 'font-bengali' : ''}`}>
              {tag}
            </span>
          ))}
          {displayTags.length > 3 && (
            <span className="inline-block text-[11px] px-2 py-0.5 rounded-md bg-muted text-muted-foreground">
              +{displayTags.length - 3}
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-3">
            {rating > 0 && (
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                <span className="font-medium">{rating.toFixed(1)}</span>
              </div>
            )}
            {usageCount > 0 && (
              <span>{usageCount.toLocaleString()} {currentText.uses}</span>
            )}
          </div>
          <span className={`truncate max-w-[120px] ${language === 'bn' ? 'font-bengali' : ''}`}>
            {displayAuthor}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-1">
          <Button 
            onClick={() => onTryClick?.(promptData)}
            className={`flex-1 text-sm h-9 rounded-lg font-medium ${language === 'bn' ? 'font-bengali' : ''}`}
            size="sm"
          >
            <Play className="w-4 h-4 mr-1.5" />
            {currentText.tryNow}
          </Button>
          
          <Button
            onClick={handleCopy}
            variant="outline"
            size="sm"
            className="px-3 h-9 rounded-lg"
            title={currentText.copy}
            aria-label={`${currentText.copy} — ${displayTitle}`}
          >
            <Copy className="w-4 h-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="px-3 h-9 rounded-lg"
            asChild
          >
            <Link
              to={`/prompt/${navigationSlug}`}
              aria-label={`${language === 'bn' ? 'প্রম্পট বিস্তারিত দেখুন' : 'View prompt details'} — ${displayTitle}`}
            >
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
              <span className="sr-only">
                {language === 'bn' ? 'প্রম্পট বিস্তারিত দেখুন' : 'View prompt details'}
              </span>
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
