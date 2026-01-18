import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { History, Trash2, RotateCcw } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface HistoryItem {
  id: string;
  prompt: string;
  output: string;
  model: string;
  timestamp: number;
}

const HISTORY_STORAGE_KEY = 'bdprompt-playground-history';
const MAX_HISTORY_ITEMS = 20;

export const getHistory = (): HistoryItem[] => {
  try {
    const stored = localStorage.getItem(HISTORY_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const saveToHistory = (prompt: string, output: string, model: string) => {
  const history = getHistory();
  const newItem: HistoryItem = {
    id: Date.now().toString(),
    prompt,
    output,
    model,
    timestamp: Date.now()
  };
  
  const updatedHistory = [newItem, ...history].slice(0, MAX_HISTORY_ITEMS);
  localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(updatedHistory));
  
  // Dispatch custom event to notify components
  window.dispatchEvent(new CustomEvent('history-updated'));
};

export const clearHistory = () => {
  localStorage.removeItem(HISTORY_STORAGE_KEY);
  window.dispatchEvent(new CustomEvent('history-updated'));
};

interface GenerationHistoryProps {
  language: 'bn' | 'en';
  onReuse: (prompt: string, output: string) => void;
}

export const GenerationHistory = ({ language, onReuse }: GenerationHistoryProps) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    setHistory(getHistory());
    
    const handleUpdate = () => {
      setHistory(getHistory());
    };
    
    window.addEventListener('history-updated', handleUpdate);
    return () => window.removeEventListener('history-updated', handleUpdate);
  }, []);

  const handleClearHistory = () => {
    clearHistory();
  };

  const truncate = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  if (history.length === 0) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className={`text-sm flex items-center gap-2 ${language === 'bn' ? 'font-bengali' : ''}`}>
            <History className="w-4 h-4" />
            {language === 'bn' ? 'ইতিহাস' : 'History'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className={`text-sm text-muted-foreground text-center py-8 ${language === 'bn' ? 'font-bengali' : ''}`}>
            {language === 'bn' ? 'এখনো কোনো জেনারেশন নেই' : 'No generations yet'}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className={`text-sm flex items-center gap-2 ${language === 'bn' ? 'font-bengali' : ''}`}>
            <History className="w-4 h-4" />
            {language === 'bn' ? 'ইতিহাস' : 'History'}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearHistory}
            className="h-7 px-2 text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[280px] px-4 pb-4">
          <div className="space-y-2">
            {history.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors cursor-pointer group"
                onClick={() => onReuse(item.prompt, item.output)}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className={`text-sm font-medium truncate ${language === 'bn' ? 'font-bengali' : ''}`}>
                      {truncate(item.prompt, 50)}
                    </p>
                    <p className={`text-xs text-muted-foreground mt-1 line-clamp-2 ${language === 'bn' ? 'font-bengali' : ''}`}>
                      {truncate(item.output, 80)}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-primary/10 text-primary">
                        {item.model}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {formatDistanceToNow(item.timestamp, { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      onReuse(item.prompt, item.output);
                    }}
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
