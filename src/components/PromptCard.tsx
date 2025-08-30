import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, ExternalLink, Heart, Play, Star, Bookmark, BookmarkCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { savePromptToLocal, removePromptFromLocal, isPromptSaved, copyPromptToClipboard, type PromptData } from "@/data/mockPrompts";

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
  const [isSaved, setIsSaved] = useState(false);
  const { toast } = useToast();

  const {
    id,
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

  const displayTitle = language === 'bn' && titleBn ? titleBn : title;
  const displayDescription = language === 'bn' && descriptionBn ? descriptionBn : description;
  const displayCategory = language === 'bn' && categoryBn ? categoryBn : category;
  const displayTags = language === 'bn' && tagsBn ? tagsBn : tags;
  const displayAuthor = language === 'bn' && authorBn ? authorBn : author;

  useEffect(() => {
    setIsSaved(isPromptSaved(id));
  }, [id]);

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

  const handleSave = () => {
    if (isSaved) {
      removePromptFromLocal(id);
      setIsSaved(false);
      toast({
        title: language === 'bn' ? 'সংরক্ষণ বাতিল!' : 'Unsaved!',
        description: language === 'bn' ? 'প্রম্পট সংরক্ষিত তালিকা থেকে সরানো হয়েছে।' : 'Prompt removed from saved list.',
      });
    } else {
      savePromptToLocal(id);
      setIsSaved(true);
      toast({
        title: language === 'bn' ? 'সংরক্ষিত!' : 'Saved!',
        description: language === 'bn' ? 'প্রম্পট সংরক্ষিত তালিকায় যোগ করা হয়েছে।' : 'Prompt added to saved list.',
      });
    }
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
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <div className="flex items-center space-x-2 flex-wrap">
              <Badge variant="secondary" className={`text-xs ${language === 'bn' ? 'font-bengali' : ''}`}>
                {displayCategory}
              </Badge>
              {price === 0 ? (
                <Badge variant="outline" className={`text-accent border-accent ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {currentText.free}
                </Badge>
              ) : (
                <Badge variant="outline" className={`text-primary border-primary ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {currentText.taka}{price}
                </Badge>
              )}
            </div>
            
            <CardTitle className={`text-lg leading-tight group-hover:text-primary transition-colors ${language === 'bn' ? 'font-bengali text-bengali' : ''}`}>
              {displayTitle}
            </CardTitle>
            
            <CardDescription className={`text-sm line-clamp-2 ${language === 'bn' ? 'font-bengali text-bengali' : ''}`}>
              {displayDescription}
            </CardDescription>
          </div>
          
          <div className="flex space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSave}
              className="text-muted-foreground hover:text-primary shrink-0"
              title={isSaved ? currentText.saved : currentText.save}
            >
              {isSaved ? (
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

      <CardContent className="space-y-4">
        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {displayTags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className={`text-xs text-muted-foreground border-border/50 ${language === 'bn' ? 'font-bengali' : ''}`}>
              {tag}
            </Badge>
          ))}
          {displayTags.length > 3 && (
            <Badge variant="outline" className="text-xs text-muted-foreground border-border/50">
              +{displayTags.length - 3}
            </Badge>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 fill-accent text-accent" />
              <span>{rating.toFixed(1)}</span>
            </div>
            <span>{usageCount.toLocaleString()} {currentText.uses}</span>
          </div>
          <span className={language === 'bn' ? 'font-bengali' : ''}>
            {currentText.by} {displayAuthor}
          </span>
        </div>

        {/* Actions */}
        <div className="flex space-x-2">
          <Button 
            onClick={handleTry}
            className={`flex-1 group/btn ${language === 'bn' ? 'font-bengali' : ''}`}
            size="sm"
          >
            <Play className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
            {currentText.tryNow}
          </Button>
          
          <Button
            onClick={handleCopy}
            variant="outline"
            size="sm"
            className="px-3"
          >
            <Copy className="w-4 h-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="px-3"
          >
            <ExternalLink className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};