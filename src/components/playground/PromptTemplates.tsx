import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Code, Languages, Briefcase, GraduationCap, Lightbulb, User, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Template {
  id: string;
  icon: React.ReactNode;
  titleBn: string;
  titleEn: string;
  descriptionBn: string;
  descriptionEn: string;
  prompt: string;
}

export interface CustomTemplate {
  id: string;
  name: string;
  prompt: string;
  createdAt: string;
}

const CUSTOM_TEMPLATES_KEY = "bdprompt-custom-templates";
const MAX_CUSTOM_TEMPLATES = 20;

export const getCustomTemplates = (): CustomTemplate[] => {
  try {
    const saved = localStorage.getItem(CUSTOM_TEMPLATES_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const saveCustomTemplate = (name: string, prompt: string): CustomTemplate | null => {
  try {
    const templates = getCustomTemplates();
    const newTemplate: CustomTemplate = {
      id: `custom-${Date.now()}`,
      name,
      prompt,
      createdAt: new Date().toISOString(),
    };
    const updated = [newTemplate, ...templates].slice(0, MAX_CUSTOM_TEMPLATES);
    localStorage.setItem(CUSTOM_TEMPLATES_KEY, JSON.stringify(updated));
    return newTemplate;
  } catch {
    return null;
  }
};

export const deleteCustomTemplate = (id: string): boolean => {
  try {
    const templates = getCustomTemplates();
    const updated = templates.filter((t) => t.id !== id);
    localStorage.setItem(CUSTOM_TEMPLATES_KEY, JSON.stringify(updated));
    return true;
  } catch {
    return false;
  }
};

const templates: Template[] = [
  {
    id: "blog",
    icon: <FileText className="w-4 h-4" />,
    titleBn: "ব্লগ লেখা",
    titleEn: "Blog Writing",
    descriptionBn: "SEO-ফ্রেন্ডলি ব্লগ পোস্ট তৈরি",
    descriptionEn: "Create SEO-friendly blog posts",
    prompt: `Write a comprehensive blog post about [TOPIC].

Requirements:
- Engaging introduction that hooks the reader
- At least 3 main sections with subheadings
- Include practical examples and tips
- SEO-optimized with relevant keywords
- Compelling conclusion with call-to-action
- Word count: approximately 1000 words

Topic: [Enter your topic here]`
  },
  {
    id: "code",
    icon: <Code className="w-4 h-4" />,
    titleBn: "কোড জেনারেশন",
    titleEn: "Code Generation",
    descriptionBn: "কোড লেখা এবং ব্যাখ্যা",
    descriptionEn: "Write and explain code",
    prompt: `Generate code for the following requirement:

Language/Framework: [Specify language, e.g., TypeScript, Python]
Task: [Describe what the code should do]

Requirements:
- Write clean, well-documented code
- Include comments explaining key logic
- Follow best practices for the language
- Handle edge cases appropriately
- Provide usage examples

Description: [Enter your requirement here]`
  },
  {
    id: "translation",
    icon: <Languages className="w-4 h-4" />,
    titleBn: "অনুবাদ",
    titleEn: "Translation",
    descriptionBn: "ভাষা অনুবাদ করুন",
    descriptionEn: "Translate between languages",
    prompt: `Translate the following text:

From: [Source language, e.g., Bengali]
To: [Target language, e.g., English]

Instructions:
- Maintain the original meaning and tone
- Keep cultural context when appropriate
- Preserve formatting and structure
- Provide natural, fluent translation

Text to translate:
[Enter your text here]`
  },
  {
    id: "business",
    icon: <Briefcase className="w-4 h-4" />,
    titleBn: "ব্যবসায়িক লেখা",
    titleEn: "Business Writing",
    descriptionBn: "পেশাদার ইমেইল এবং প্রস্তাব",
    descriptionEn: "Professional emails and proposals",
    prompt: `Create a professional business document:

Type: [Email / Proposal / Report / Presentation]
Purpose: [Describe the main objective]
Recipient: [Who is this for?]
Tone: [Formal / Semi-formal / Friendly professional]

Key points to include:
- [Point 1]
- [Point 2]
- [Point 3]

Additional context:
[Enter any additional details here]`
  },
  {
    id: "education",
    icon: <GraduationCap className="w-4 h-4" />,
    titleBn: "শিক্ষামূলক",
    titleEn: "Educational",
    descriptionBn: "শিক্ষামূলক কন্টেন্ট তৈরি",
    descriptionEn: "Create educational content",
    prompt: `Create educational content for the following topic:

Subject: [Enter subject area]
Topic: [Specific topic to explain]
Target Audience: [Beginners / Intermediate / Advanced]
Format: [Lesson / Quiz / Summary / Study guide]

Requirements:
- Clear and easy-to-understand explanations
- Use examples and analogies
- Include key takeaways
- Add practice questions if appropriate

Details:
[Enter any specific requirements here]`
  },
  {
    id: "creative",
    icon: <Lightbulb className="w-4 h-4" />,
    titleBn: "সৃজনশীল লেখা",
    titleEn: "Creative Writing",
    descriptionBn: "গল্প, কবিতা এবং সৃজনশীল কন্টেন্ট",
    descriptionEn: "Stories, poems, and creative content",
    prompt: `Create a creative piece:

Type: [Story / Poem / Script / Song lyrics]
Genre: [Romance / Mystery / Comedy / Drama / etc.]
Length: [Short / Medium / Long]
Mood: [Happy / Sad / Suspenseful / Inspiring]

Theme or concept:
[Describe the main idea or story premise]

Special elements to include:
[Any specific characters, settings, or elements you want]`
  }
];

interface PromptTemplatesProps {
  language: 'bn' | 'en';
  onSelectTemplate: (prompt: string) => void;
  refreshKey?: number;
}

export const PromptTemplates = ({ language, onSelectTemplate, refreshKey }: PromptTemplatesProps) => {
  const [customTemplates, setCustomTemplates] = useState<CustomTemplate[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    setCustomTemplates(getCustomTemplates());
  }, [refreshKey]);

  const handleDeleteCustom = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (deleteCustomTemplate(id)) {
      setCustomTemplates(getCustomTemplates());
      toast({
        title: language === 'bn' ? "মুছে ফেলা হয়েছে" : "Deleted",
        description: language === 'bn' ? "টেমপ্লেট মুছে ফেলা হয়েছে" : "Template deleted",
      });
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className={`text-sm ${language === 'bn' ? 'font-bengali' : ''}`}>
          {language === 'bn' ? 'টেমপ্লেট' : 'Templates'}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="preset" className="w-full">
          <TabsList className="w-full grid grid-cols-2 mx-4 mb-2" style={{ width: 'calc(100% - 2rem)' }}>
            <TabsTrigger value="preset" className="text-xs">
              {language === 'bn' ? 'প্রিসেট' : 'Preset'}
            </TabsTrigger>
            <TabsTrigger value="custom" className="text-xs">
              {language === 'bn' ? 'আমার' : 'My'} ({customTemplates.length})
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="preset" className="m-0">
            <ScrollArea className="h-[240px] px-4 pb-4">
              <div className="space-y-2">
                {templates.map((template) => (
                  <Button
                    key={template.id}
                    variant="ghost"
                    className="w-full justify-start h-auto py-3 px-3"
                    onClick={() => onSelectTemplate(template.prompt)}
                  >
                    <div className="flex items-start gap-3 text-left">
                      <div className="p-2 rounded-md bg-primary/10 text-primary shrink-0">
                        {template.icon}
                      </div>
                      <div className="min-w-0">
                        <p className={`font-medium text-sm ${language === 'bn' ? 'font-bengali' : ''}`}>
                          {language === 'bn' ? template.titleBn : template.titleEn}
                        </p>
                        <p className={`text-xs text-muted-foreground truncate ${language === 'bn' ? 'font-bengali' : ''}`}>
                          {language === 'bn' ? template.descriptionBn : template.descriptionEn}
                        </p>
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="custom" className="m-0">
            <ScrollArea className="h-[240px] px-4 pb-4">
              {customTemplates.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <User className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className={`text-sm ${language === 'bn' ? 'font-bengali' : ''}`}>
                    {language === 'bn' ? 'কোনো কাস্টম টেমপ্লেট নেই' : 'No custom templates yet'}
                  </p>
                  <p className={`text-xs mt-1 ${language === 'bn' ? 'font-bengali' : ''}`}>
                    {language === 'bn' ? '"সেভ করুন" বাটন দিয়ে সংরক্ষণ করুন' : 'Use "Save" button to save prompts'}
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {customTemplates.map((template) => (
                    <div
                      key={template.id}
                      className="group relative"
                    >
                      <Button
                        variant="ghost"
                        className="w-full justify-start h-auto py-3 px-3 pr-10"
                        onClick={() => onSelectTemplate(template.prompt)}
                      >
                        <div className="flex items-start gap-3 text-left">
                          <div className="p-2 rounded-md bg-secondary text-secondary-foreground shrink-0">
                            <User className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <p className={`font-medium text-sm truncate ${language === 'bn' ? 'font-bengali' : ''}`}>
                              {template.name}
                            </p>
                            <p className="text-xs text-muted-foreground truncate max-w-[150px]">
                              {template.prompt.slice(0, 50)}...
                            </p>
                          </div>
                        </div>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={(e) => handleDeleteCustom(template.id, e)}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
