import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, ExternalLink, Heart, Play, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PromptCardProps {
  id: string;
  title: string;
  titleBn?: string;
  description: string;
  descriptionBn?: string;
  category: string;
  tags: string[];
  price: number;
  rating: number;
  usageCount: number;
  author: string;
  language: 'bn' | 'en';
  onTryClick?: (id: string) => void;
  onCopyClick?: (id: string) => void;
}

export const PromptCard = ({
  id,
  title,
  titleBn,
  description,
  descriptionBn,
  category,
  tags,
  price,
  rating,
  usageCount,
  author,
  language,
  onTryClick,
  onCopyClick
}: PromptCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const { toast } = useToast();

  const displayTitle = language === 'bn' && titleBn ? titleBn : title;
  const displayDescription = language === 'bn' && descriptionBn ? descriptionBn : description;

  const handleCopy = () => {
    onCopyClick?.(id);
    toast({
      title: language === 'bn' ? 'কপি করা হয়েছে!' : 'Copied!',
      description: language === 'bn' ? 'প্রম্পট ক্লিপবোর্ডে কপি করা হয়েছে।' : 'Prompt copied to clipboard.',
    });
  };

  const handleTry = () => {
    onTryClick?.(id);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const text = {
    bn: {
      free: 'ফ্রি',
      tryNow: 'এখনই চেষ্টা করুন',
      copy: 'কপি করুন',
      by: 'লেখক:',
      uses: 'ব্যবহার'
    },
    en: {
      free: 'Free',
      tryNow: 'Try Now',
      copy: 'Copy',
      by: 'By',
      uses: 'uses'
    }
  };

  const currentText = text[language];

  return (
    <Card className="group hover:shadow-accent transition-smooth border-border/50 hover:border-primary/20 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-2 flex-1">
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className={`text-xs ${language === 'bn' ? 'font-bengali' : ''}`}>
                {category}
              </Badge>
              {price === 0 && (
                <Badge variant="outline" className={`text-accent border-accent ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {currentText.free}
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
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            className="ml-2 text-muted-foreground hover:text-accent shrink-0"
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current text-accent' : ''}`} />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className={`text-xs text-muted-foreground border-border/50 ${language === 'bn' ? 'font-bengali' : ''}`}>
              {tag}
            </Badge>
          ))}
          {tags.length > 3 && (
            <Badge variant="outline" className="text-xs text-muted-foreground border-border/50">
              +{tags.length - 3}
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
            {currentText.by} {author}
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