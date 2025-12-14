import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AdminCategoriesTableProps {
  language: 'bn' | 'en';
}

export const AdminCategoriesTable = ({ language }: AdminCategoriesTableProps) => {
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const text = {
    bn: {
      title: "ক্যাটেগরি ম্যানেজমেন্ট",
      description: "সব ক্যাটেগরি দেখুন এবং ম্যানেজ করুন",
      addNew: "নতুন ক্যাটেগরি",
      nameBn: "বাংলা নাম",
      nameEn: "ইংরেজি নাম",
      slug: "স্লাগ",
      icon: "আইকন",
      actions: "অ্যাকশন",
      edit: "এডিট",
      delete: "ডিলিট",
      save: "সেভ করুন",
      cancel: "বাতিল",
      confirmDelete: "আপনি কি নিশ্চিত এই ক্যাটেগরি ডিলিট করতে চান?",
      noCategories: "কোনো ক্যাটেগরি পাওয়া যায়নি",
      promptCount: "প্রম্পট সংখ্যা",
    },
    en: {
      title: "Categories Management",
      description: "View and manage all categories",
      addNew: "Add New Category",
      nameBn: "Bengali Name",
      nameEn: "English Name",
      slug: "Slug",
      icon: "Icon",
      actions: "Actions",
      edit: "Edit",
      delete: "Delete",
      save: "Save",
      cancel: "Cancel",
      confirmDelete: "Are you sure you want to delete this category?",
      noCategories: "No categories found",
      promptCount: "Prompt Count",
    }
  };

  const t = text[language];

  const { data: categories, isLoading } = useQuery({
    queryKey: ['admin-categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name_en');
      if (error) throw error;
      return data;
    }
  });

  const { data: promptCounts } = useQuery({
    queryKey: ['category-prompt-counts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('prompts')
        .select('category_id');
      if (error) throw error;
      
      const counts: Record<string, number> = {};
      data.forEach(p => {
        if (p.category_id) {
          counts[p.category_id] = (counts[p.category_id] || 0) + 1;
        }
      });
      return counts;
    }
  });

  const updateMutation = useMutation({
    mutationFn: async (category: any) => {
      const { error } = await supabase
        .from('categories')
        .update(category)
        .eq('id', category.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
      setEditingCategory(null);
      toast({ title: language === 'bn' ? 'ক্যাটেগরি আপডেট হয়েছে' : 'Category updated' });
    },
    onError: () => {
      toast({ title: language === 'bn' ? 'আপডেট ব্যর্থ হয়েছে' : 'Update failed', variant: 'destructive' });
    }
  });

  const createMutation = useMutation({
    mutationFn: async (category: any) => {
      const { error } = await supabase.from('categories').insert(category);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
      setIsCreateOpen(false);
      toast({ title: language === 'bn' ? 'ক্যাটেগরি তৈরি হয়েছে' : 'Category created' });
    },
    onError: () => {
      toast({ title: language === 'bn' ? 'তৈরি ব্যর্থ হয়েছে' : 'Create failed', variant: 'destructive' });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('categories').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-categories'] });
      setIsDeleteOpen(false);
      setCategoryToDelete(null);
      toast({ title: language === 'bn' ? 'ক্যাটেগরি ডিলিট হয়েছে' : 'Category deleted' });
    },
    onError: () => {
      toast({ title: language === 'bn' ? 'ডিলিট ব্যর্থ হয়েছে' : 'Delete failed', variant: 'destructive' });
    }
  });

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
            <DialogContent>
              <CategoryForm 
                language={language}
                onSubmit={(data) => createMutation.mutate(data)}
                isLoading={createMutation.isPending}
                onCancel={() => setIsCreateOpen(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
          </div>
        ) : categories?.length === 0 ? (
          <p className={`text-center text-muted-foreground py-8 ${language === 'bn' ? 'font-bengali' : ''}`}>
            {t.noCategories}
          </p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className={language === 'bn' ? 'font-bengali' : ''}>{t.nameBn}</TableHead>
                  <TableHead className={language === 'bn' ? 'font-bengali' : ''}>{t.nameEn}</TableHead>
                  <TableHead className={language === 'bn' ? 'font-bengali' : ''}>{t.slug}</TableHead>
                  <TableHead className={language === 'bn' ? 'font-bengali' : ''}>{t.promptCount}</TableHead>
                  <TableHead className={language === 'bn' ? 'font-bengali' : ''}>{t.actions}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories?.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-bengali">{category.name_bn}</TableCell>
                    <TableCell>{category.name_en}</TableCell>
                    <TableCell className="text-muted-foreground">{category.slug}</TableCell>
                    <TableCell>{promptCounts?.[category.id] || 0}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={() => setEditingCategory(category)}>
                              <Pencil className="w-4 h-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <CategoryForm 
                              language={language}
                              initialData={category}
                              onSubmit={(data) => updateMutation.mutate({ ...data, id: category.id })}
                              isLoading={updateMutation.isPending}
                              onCancel={() => setEditingCategory(null)}
                            />
                          </DialogContent>
                        </Dialog>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => {
                            setCategoryToDelete(category);
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
                onClick={() => categoryToDelete && deleteMutation.mutate(categoryToDelete.id)}
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

interface CategoryFormProps {
  language: 'bn' | 'en';
  initialData?: any;
  onSubmit: (data: any) => void;
  isLoading: boolean;
  onCancel: () => void;
}

const CategoryForm = ({ language, initialData, onSubmit, isLoading, onCancel }: CategoryFormProps) => {
  const [formData, setFormData] = useState({
    name_bn: initialData?.name_bn || '',
    name_en: initialData?.name_en || '',
    slug: initialData?.slug || '',
    description_bn: initialData?.description_bn || '',
    description_en: initialData?.description_en || '',
    icon: initialData?.icon || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const text = {
    bn: {
      nameBn: "বাংলা নাম",
      nameEn: "ইংরেজি নাম",
      slug: "স্লাগ (URL)",
      descBn: "বাংলা বিবরণ",
      descEn: "ইংরেজি বিবরণ",
      icon: "আইকন (emoji বা icon name)",
      save: "সেভ করুন",
      cancel: "বাতিল",
    },
    en: {
      nameBn: "Bengali Name",
      nameEn: "English Name",
      slug: "Slug (URL)",
      descBn: "Bengali Description",
      descEn: "English Description",
      icon: "Icon (emoji or icon name)",
      save: "Save",
      cancel: "Cancel",
    }
  };

  const t = text[language];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <DialogHeader>
        <DialogTitle className={language === 'bn' ? 'font-bengali' : ''}>
          {initialData ? (language === 'bn' ? 'ক্যাটেগরি এডিট করুন' : 'Edit Category') : (language === 'bn' ? 'নতুন ক্যাটেগরি তৈরি করুন' : 'Create New Category')}
        </DialogTitle>
      </DialogHeader>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className={language === 'bn' ? 'font-bengali' : ''}>{t.nameBn}</Label>
          <Input
            value={formData.name_bn}
            onChange={(e) => setFormData({ ...formData, name_bn: e.target.value })}
            className="font-bengali"
            required
          />
        </div>
        <div className="space-y-2">
          <Label className={language === 'bn' ? 'font-bengali' : ''}>{t.nameEn}</Label>
          <Input
            value={formData.name_en}
            onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className={language === 'bn' ? 'font-bengali' : ''}>{t.slug}</Label>
          <Input
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            placeholder="category-slug"
            required
          />
        </div>
        <div className="space-y-2">
          <Label className={language === 'bn' ? 'font-bengali' : ''}>{t.icon}</Label>
          <Input
            value={formData.icon}
            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            placeholder="📚 or BookOpen"
          />
        </div>
      </div>

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
