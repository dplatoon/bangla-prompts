import { Facebook, Twitter, Linkedin, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SocialShareButtonsProps {
  url: string;
  title: string;
  description?: string;
  language?: 'bn' | 'en';
  variant?: 'inline' | 'dropdown';
  size?: 'sm' | 'default';
}

export const SocialShareButtons = ({
  url,
  title,
  description = '',
  language = 'bn',
  variant = 'dropdown',
  size = 'sm'
}: SocialShareButtonsProps) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20-%20${encodedUrl}`
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400');
  };

  const text = {
    bn: {
      share: "শেয়ার করুন",
      facebook: "ফেসবুকে শেয়ার",
      twitter: "টুইটারে শেয়ার",
      linkedin: "লিংকডইনে শেয়ার",
      whatsapp: "হোয়াটসঅ্যাপে শেয়ার"
    },
    en: {
      share: "Share",
      facebook: "Share on Facebook",
      twitter: "Share on Twitter",
      linkedin: "Share on LinkedIn",
      whatsapp: "Share on WhatsApp"
    }
  };

  const currentText = text[language];

  if (variant === 'inline') {
    return (
      <div className="flex items-center gap-2">
        <Button
          size={size}
          variant="outline"
          onClick={() => handleShare('facebook')}
          className="text-[#1877F2] hover:bg-[#1877F2]/10"
          aria-label={currentText.facebook}
        >
          <Facebook className="w-4 h-4" />
        </Button>
        <Button
          size={size}
          variant="outline"
          onClick={() => handleShare('twitter')}
          className="text-[#1DA1F2] hover:bg-[#1DA1F2]/10"
          aria-label={currentText.twitter}
        >
          <Twitter className="w-4 h-4" />
        </Button>
        <Button
          size={size}
          variant="outline"
          onClick={() => handleShare('linkedin')}
          className="text-[#0A66C2] hover:bg-[#0A66C2]/10"
          aria-label={currentText.linkedin}
        >
          <Linkedin className="w-4 h-4" />
        </Button>
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={size} variant="outline" aria-label={currentText.share}>
          <Share2 className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem 
          onClick={() => handleShare('facebook')}
          className={`cursor-pointer ${language === 'bn' ? 'font-bengali' : ''}`}
        >
          <Facebook className="w-4 h-4 mr-2 text-[#1877F2]" />
          {currentText.facebook}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleShare('twitter')}
          className={`cursor-pointer ${language === 'bn' ? 'font-bengali' : ''}`}
        >
          <Twitter className="w-4 h-4 mr-2 text-[#1DA1F2]" />
          {currentText.twitter}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleShare('linkedin')}
          className={`cursor-pointer ${language === 'bn' ? 'font-bengali' : ''}`}
        >
          <Linkedin className="w-4 h-4 mr-2 text-[#0A66C2]" />
          {currentText.linkedin}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => handleShare('whatsapp')}
          className={`cursor-pointer ${language === 'bn' ? 'font-bengali' : ''}`}
        >
          <span className="w-4 h-4 mr-2 text-[#25D366]">📱</span>
          {currentText.whatsapp}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
