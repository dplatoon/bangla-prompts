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
    id,
    slug,
    title,
    titleBn,
    description,
    descriptionBn,
    category,
    categoryBn,
    tags,
    tagsBn,
    price,
    rating,
    usageCount,
    author,
    authorBn
  } = promptData;

  // Use slug for navigation, falling back to id if slug is not available
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
    } catch (error) {
      toast({
        title: language === 'bn' ? 'ত্রুটি!' : 'Error!',
        description: language === 'bn' ? 'কপি করতে সমস্যা হয়েছে।' : 'Failed to copy prompt.',
        variant: "destructive"
      });
    }
  };

  const handleTry = () => {
    onTryClick?.(promptData);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const text = {
    bn: {
      free: 'ফ্রি',
      tryNow: 'এখনই চেষ্টা করুন',
      copy: 'কপি করুন',
      save: 'সংরক্ষণ',
      saved: 'সংরক্ষিত',
      by: 'লেখক:',
      uses: 'ব্যবহার',
      taka: '৳'
    },
    en: {
      free: 'Free',
      tryNow: 'Try Now',
      copy: 'Copy',
      save: 'Save',
      saved: 'Saved',
      by: 'By',
      uses: 'uses',
      taka: '৳'
    }
  };

  const currentText = text[language];

  return (
    <Card className="group hover:shadow-accent transition-smooth border-border/50 hover:border-primary/20 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-2 sm:pb-3 p-3 sm:p-4">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1.5 sm:space-y-2 flex-1 min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <Badge variant="secondary" className={`text-[10px] sm:text-xs ${language === 'bn' ? 'font-bengali' : ''}`}>
                {displayCategory}
              </Badge>
              {price === 0 ? (
                <Badge variant="outline" className={`text-accent border-accent text-[10px] sm:text-xs ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {currentText.free}
                </Badge>
              ) : (
                <Badge variant="outline" className={`text-primary border-primary text-[10px] sm:text-xs ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {currentText.taka}{price}
                </Badge>
              )}
            </div>
            
            <CardTitle className={`text-sm sm:text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2 ${language === 'bn' ? 'font-bengali text-bengali' : ''}`}>
              {displayTitle}
            </CardTitle>
            
            <CardDescription className={`text-xs sm:text-sm line-clamp-2 ${language === 'bn' ? 'font-bengali text-bengali' : ''}`}>
              {displayDescription}
            </CardDescription>
          </div>
          
          <div className="flex space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleSave}
              disabled={isPending}
              className="text-muted-foreground hover:text-primary shrink-0"
              title={isSaved ? currentText.saved : currentText.save}
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
              onClick={handleLike}
              className="text-muted-foreground hover:text-accent shrink-0"
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current text-accent' : ''}`} />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 sm:space-y-4 p-3 sm:p-4 pt-0">
        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {displayTags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className={`text-[10px] sm:text-xs text-muted-foreground border-border/50 ${language === 'bn' ? 'font-bengali' : ''}`}>
              {tag}
            </Badge>
          ))}
          {displayTags.length > 3 && (
            <Badge variant="outline" className="text-[10px] sm:text-xs text-muted-foreground border-border/50">
              +{displayTags.length - 3}
            </Badge>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-[10px] sm:text-xs text-muted-foreground">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 fill-accent text-accent" />
              <span>{rating.toFixed(1)}</span>
            </div>
            <span>{usageCount.toLocaleString()} {currentText.uses}</span>
          </div>
          <span className={`truncate max-w-[100px] sm:max-w-none ${language === 'bn' ? 'font-bengali' : ''}`}>
            {currentText.by} {displayAuthor}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-1.5 sm:gap-2">
          <Button 
            onClick={handleTry}
            className={`flex-1 group/btn text-xs sm:text-sm h-8 sm:h-9 ${language === 'bn' ? 'font-bengali' : ''}`}
            size="sm"
          >
            <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 sm:mr-2 group-hover/btn:scale-110 transition-transform" />
            {currentText.tryNow}
          </Button>
          
          <Button
            onClick={handleCopy}
            variant="outline"
            size="sm"
            className="px-2 sm:px-3 h-8 sm:h-9"
          >
            <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </Button>
          
          <Link to={`/prompt/${navigationSlug}`}>
            <Button
              variant="ghost"
              size="sm"
              className="px-2 sm:px-3 h-8 sm:h-9"
            >
              <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};