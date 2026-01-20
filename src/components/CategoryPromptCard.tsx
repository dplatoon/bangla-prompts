import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface CategoryPromptCardProps {
  title: string;
  copyText: string;
  usage: string;
}

export const CategoryPromptCard = ({ title, copyText, usage }: CategoryPromptCardProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      toast({
        title: "কপি হয়েছে! ✓",
        description: "প্রম্পটটি ক্লিপবোর্ডে কপি করা হয়েছে।",
      });
      
      // Track copy event if analytics available
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'prompt_copied', {
          event_category: 'engagement',
          event_label: title,
        });
      }
      
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "কপি করতে সমস্যা হয়েছে",
        description: "অনুগ্রহ করে আবার চেষ্টা করুন।",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30 bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold text-foreground leading-tight">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Copy Text in Code Block Style */}
        <div className="bg-muted/50 rounded-lg p-4 border border-border/50">
          <pre className="text-sm text-muted-foreground whitespace-pre-wrap font-mono leading-relaxed max-h-40 overflow-y-auto">
            {copyText}
          </pre>
        </div>
        
        {/* Usage in Italic */}
        <p className="text-sm text-muted-foreground italic border-l-2 border-primary/30 pl-3">
          💡 {usage}
        </p>
        
        {/* Copy Button */}
        <Button
          onClick={handleCopy}
          className="w-full gap-2 font-semibold"
          variant={copied ? "outline" : "default"}
          size="lg"
        >
          {copied ? (
            <>
              <Check className="h-5 w-5 text-green-500" />
              কপি হয়েছে!
            </>
          ) : (
            <>
              <Copy className="h-5 w-5" />
              কপি করুন
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
