import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Pencil, Trash2, Search, Eye, EyeOff, Star, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AdminPromptsTableProps {
  language: 'bn' | 'en';
}

export const AdminPromptsTable = ({ language }: AdminPromptsTableProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [editingPrompt, setEditingPrompt] = useState<any>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [promptToDelete, setPromptToDelete] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const text = {
    bn: {
      title: "প্রম্পট ম্যানেজমেন্ট",
      description: "সব প্রম্পট দেখুন, এডিট করুন এবং ম্যানেজ করুন",
      search: "প্রম্পট খুঁজুন...",
      addNew: "নতুন প্রম্পট",
      titleBn: "বাংলা শিরোনাম",
      titleEn: "ইংরেজি শিরোনাম",
      slug: "স্লাগ",
      category: "ক্যাটেগরি",
      isFree: "ফ্রি",
      isPublished: "পাবলিশড",
      isFeatured: "ফিচার্ড",
      price: "মূল্য",
      template: "টেমপ্লেট",
      actions: "অ্যাকশন",
      edit: "এডিট",
      delete: "ডিলিট",
      save: "সেভ করুন",
      cancel: "বাতিল",
      confirmDelete: "আপনি কি নিশ্চিত এই প্রম্পটটি ডিলিট করতে চান?",
      noPrompts: "কোনো প্রম্পট পাওয়া যায়নি",
      views: "ভিউ",
      copies: "কপি",
    },
    en: {
      title: "Prompts Management",
      description: "View, edit, and manage all prompts",
      search: "Search prompts...",
      addNew: "Add New Prompt",
      titleBn: "Bengali Title",
      titleEn: "English Title",
      slug: "Slug",
      category: "Category",
      isFree: "Free",
      isPublished: "Published",
      isFeatured: "Featured",
      price: "Price",
      template: "Template",
      actions: "Actions",
      edit: "Edit",
      delete: "Delete",
      save: "Save",
      cancel: "Cancel",
      confirmDelete: "Are you sure you want to delete this prompt?",
      noPrompts: "No prompts found",
      views: "Views",
      copies: "Copies",
    }
  };

  const t = text[language];

  const { data: prompts, isLoading } = useQuery({
    queryKey: ['admin-prompts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('prompts')
        .select('*, categories(name_bn, name_en)')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    }
  });

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name_en');
      if (error) throw error;
      return data;
    }
  });

  const updateMutation = useMutation({
    mutationFn: async (prompt: any) => {
      const { error } = await supabase
        .from('prompts')
        .update(prompt)
        .eq('id', prompt.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-prompts'] });
      setEditingPrompt(null);
      toast({ title: language === 'bn' ? 'প্রম্পট আপডেট হয়েছে' : 'Prompt updated' });
    },
    onError: () => {
      toast({ title: language === 'bn' ? 'আপডেট ব্যর্থ হয়েছে' : 'Update failed', variant: 'destructive' });
    }
  });

  const createMutation = useMutation({
    mutationFn: async (prompt: any) => {
      const { error } = await supabase.from('prompts').insert(prompt);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-prompts'] });
      setIsCreateOpen(false);
      toast({ title: language === 'bn' ? 'প্রম্পট তৈরি হয়েছে' : 'Prompt created' });
    },
    onError: () => {
      toast({ title: language === 'bn' ? 'তৈরি ব্যর্থ হয়েছে' : 'Create failed', variant: 'destructive' });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('prompts').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-prompts'] });
      setIsDeleteOpen(false);
      setPromptToDelete(null);
      toast({ title: language === 'bn' ? 'প্রম্পট ডিলিট হয়েছে' : 'Prompt deleted' });
    },
    onError: () => {
      toast({ title: language === 'bn' ? 'ডিলিট ব্যর্থ হয়েছে' : 'Delete failed', variant: 'destructive' });
    }
  });

  const filteredPrompts = prompts?.filter(p => 
    p.title_bn?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.title_en?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className={language === 'bn' ? 'font-bengali' : ''}>{t.title}</CardTitle>
            <CardDescription className={language === 'bn' ? 'font-bengali' : ''}>{t.description}</CardDescription>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className={language === 'bn' ? 'font-bengali' : ''}>
                <Plus className="w-4 h-4 mr-2" />
                {t.addNew}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <PromptForm 
                language={language} 
                categories={categories || []}
                onSubmit={(data) => createMutation.mutate(data)}
                isLoading={createMutation.isPending}
                onCancel={() => setIsCreateOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder={t.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`pl-10 ${language === 'bn' ? 'font-bengali' : ''}`}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : filteredPrompts?.length === 0 ? (
          <p className={`text-center text-muted-foreground py-8 ${language === 'bn' ? 'font-bengali' : ''}`}>
            {t.noPrompts}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className={language === 'bn' ? 'font-bengali' : ''}>{t.titleBn}</TableHead>
                  <TableHead className={language === 'bn' ? 'font-bengali' : ''}>{t.category}</TableHead>
                  <TableHead className={language === 'bn' ? 'font-bengali' : ''}>{t.isPublished}</TableHead>
                  <TableHead className={language === 'bn' ? 'font-bengali' : ''}>{t.isFree}</TableHead>
                  <TableHead className={language === 'bn' ? 'font-bengali' : ''}>{t.views}</TableHead>
                  <TableHead className={language === 'bn' ? 'font-bengali' : ''}>{t.actions}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPrompts?.map((prompt) => (
                  <TableRow key={prompt.id}>
                    <TableCell className={`max-w-[200px] truncate font-bengali`}>
                      {prompt.title_bn}
                      {prompt.is_featured && (
                        <Star className="w-3 h-3 inline ml-1 text-accent fill-accent" />
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="font-bengali">
                        {language === 'bn' ? prompt.categories?.name_bn : prompt.categories?.name_en}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {prompt.is_published ? (
                        <Eye className="w-4 h-4 text-primary" />
                      ) : (
                        <EyeOff className="w-4 h-4 text-muted-foreground" />
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={prompt.is_free ? 'default' : 'outline'}>
                        {prompt.is_free ? (language === 'bn' ? 'ফ্রি' : 'Free') : `৳${prompt.price}`}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {prompt.view_count || 0}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={() => setEditingPrompt(prompt)}>
                              <Pencil className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                            <PromptForm 
                              language={language} 
                              categories={categories || []}
                              initialData={prompt}
                              onSubmit={(data) => updateMutation.mutate({ ...data, id: prompt.id })}
                              isLoading={updateMutation.isPending}
                              onCancel={() => setEditingPrompt(null)}
                            />
                          </DialogContent>
                        </Dialog>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => {
                            setPromptToDelete(prompt);
                            setIsDeleteOpen(true);
                          }}
                        >
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className={language === 'bn' ? 'font-bengali' : ''}>
                {language === 'bn' ? 'ডিলিট নিশ্চিত করুন' : 'Confirm Delete'}
              </DialogTitle>
              <DialogDescription className={language === 'bn' ? 'font-bengali' : ''}>
                {t.confirmDelete}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteOpen(false)} className={language === 'bn' ? 'font-bengali' : ''}>
                {t.cancel}
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => promptToDelete && deleteMutation.mutate(promptToDelete.id)}
                disabled={deleteMutation.isPending}
                className={language === 'bn' ? 'font-bengali' : ''}
              >
                {deleteMutation.isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {t.delete}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

interface PromptFormProps {
  language: 'bn' | 'en';
  categories: any[];
  initialData?: any;
  onSubmit: (data: any) => void;
  isLoading: boolean;
  onCancel: () => void;
}

const PromptForm = ({ language, categories, initialData, onSubmit, isLoading, onCancel }: PromptFormProps) => {
  const [formData, setFormData] = useState({
    title_bn: initialData?.title_bn || '',
    title_en: initialData?.title_en || '',
    slug: initialData?.slug || '',
    description_bn: initialData?.description_bn || '',
    description_en: initialData?.description_en || '',
    prompt_template: initialData?.prompt_template || '',
    category_id: initialData?.category_id || '',
    is_free: initialData?.is_free ?? true,
    is_published: initialData?.is_published ?? true,
    is_featured: initialData?.is_featured ?? false,
    price: initialData?.price || 0,
    example_input: initialData?.example_input || '',
    example_output: initialData?.example_output || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const text = {
    bn: {
      titleBn: "বাংলা শিরোনাম",
      titleEn: "ইংরেজি শিরোনাম",
      slug: "স্লাগ (URL)",
      descBn: "বাংলা বিবরণ",
      descEn: "ইংরেজি বিবরণ",
      template: "প্রম্পট টেমপ্লেট",
      category: "ক্যাটেগরি",
      isFree: "ফ্রি প্রম্পট",
      isPublished: "পাবলিশড",
      isFeatured: "ফিচার্ড",
      price: "মূল্য (৳)",
      exampleInput: "উদাহরণ ইনপুট",
      exampleOutput: "উদাহরণ আউটপুট",
      save: "সেভ করুন",
      cancel: "বাতিল",
      selectCategory: "ক্যাটেগরি সিলেক্ট করুন",
    },
    en: {
      titleBn: "Bengali Title",
      titleEn: "English Title",
      slug: "Slug (URL)",
      descBn: "Bengali Description",
      descEn: "English Description",
      template: "Prompt Template",
      category: "Category",
      isFree: "Free Prompt",
      isPublished: "Published",
      isFeatured: "Featured",
      price: "Price (৳)",
      exampleInput: "Example Input",
      exampleOutput: "Example Output",
      save: "Save",
      cancel: "Cancel",
      selectCategory: "Select Category",
    }
  };

  const t = text[language];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <DialogHeader>
        <DialogTitle className={language === 'bn' ? 'font-bengali' : ''}>
          {initialData ? (language === 'bn' ? 'প্রম্পট এডিট করুন' : 'Edit Prompt') : (language === 'bn' ? 'নতুন প্রম্পট তৈরি করুন' : 'Create New Prompt')}
        </DialogTitle>
      </DialogHeader>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className={language === 'bn' ? 'font-bengali' : ''}>{t.titleBn}</Label>
          <Input
            value={formData.title_bn}
            onChange={(e) => setFormData({ ...formData, title_bn: e.target.value })}
            className="font-bengali"
            required
          />
        </div>
        <div className="space-y-2">
          <Label className={language === 'bn' ? 'font-bengali' : ''}>{t.titleEn}</Label>
          <Input
            value={formData.title_en}
            onChange={(e) => setFormData({ ...formData, title_en: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label className={language === 'bn' ? 'font-bengali' : ''}>{t.slug}</Label>
        <Input
          value={formData.slug}
          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
          placeholder="example-prompt-slug"
          required
        />
      </div>

      <div className="space-y-2">
        <Label className={language === 'bn' ? 'font-bengali' : ''}>{t.category}</Label>
        <Select
          value={formData.category_id}
          onValueChange={(value) => setFormData({ ...formData, category_id: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder={t.selectCategory} />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id} className="font-bengali">
                {language === 'bn' ? cat.name_bn : cat.name_en}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className={language === 'bn' ? 'font-bengali' : ''}>{t.template}</Label>
        <Textarea
          value={formData.prompt_template}
          onChange={(e) => setFormData({ ...formData, prompt_template: e.target.value })}
          rows={4}
          className="font-bengali"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className={language === 'bn' ? 'font-bengali' : ''}>{t.descBn}</Label>
          <Textarea
            value={formData.description_bn}
            onChange={(e) => setFormData({ ...formData, description_bn: e.target.value })}
            rows={2}
            className="font-bengali"
          />
        </div>
        <div className="space-y-2">
          <Label className={language === 'bn' ? 'font-bengali' : ''}>{t.descEn}</Label>
          <Textarea
            value={formData.description_en}
            onChange={(e) => setFormData({ ...formData, description_en: e.target.value })}
            rows={2}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-6">
        <div className="flex items-center gap-2">
          <Switch
            checked={formData.is_free}
            onCheckedChange={(checked) => setFormData({ ...formData, is_free: checked })}
          />
          <Label className={language === 'bn' ? 'font-bengali' : ''}>{t.isFree}</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            checked={formData.is_published}
            onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
          />
          <Label className={language === 'bn' ? 'font-bengali' : ''}>{t.isPublished}</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            checked={formData.is_featured}
            onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
          />
          <Label className={language === 'bn' ? 'font-bengali' : ''}>{t.isFeatured}</Label>
        </div>
      </div>

      {!formData.is_free && (
        <div className="space-y-2">
          <Label className={language === 'bn' ? 'font-bengali' : ''}>{t.price}</Label>
          <Input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
            min={0}
          />
        </div>
      )}

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel} className={language === 'bn' ? 'font-bengali' : ''}>
          {t.cancel}
        </Button>
        <Button type="submit" disabled={isLoading} className={language === 'bn' ? 'font-bengali' : ''}>
          {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {t.save}
        </Button>
      </DialogFooter>
    </form>
  );
};
