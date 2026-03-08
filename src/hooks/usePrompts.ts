import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import type { PromptData } from '@/data/mockPrompts';

export interface Category {
  id: string;
  slug: string;
  name_bn: string;
  name_en: string;
  description_bn: string | null;
  description_en: string | null;
  icon: string | null;
}

export interface Prompt {
  id: string;
  slug: string;
  title_bn: string;
  title_en: string;
  description_bn: string | null;
  description_en: string | null;
  prompt_template: string;
  category_id: string | null;
  tags: string[];
  use_case_bn: string | null;
  use_case_en: string | null;
  example_input: string | null;
  example_output: string | null;
  author_name: string | null;
  author_avatar: string | null;
  price: number;
  is_free: boolean;
  rating: number;
  rating_count: number;
  copy_count: number;
  view_count: number;
  is_featured: boolean;
  created_at: string;
  category?: Category;
}

export interface SavedPrompt {
  id: string;
  user_id: string;
  prompt_id: string;
  created_at: string;
  prompt?: Prompt;
}

// Convert database Prompt to PromptData format for components
export const promptToPromptData = (prompt: Prompt): PromptData => {
  const categoryNameEn = prompt.category?.name_en || 'General';
  const categoryNameBn = prompt.category?.name_bn || 'সাধারণ';
  
  // Extract variables from prompt template (e.g., {topic}, {tone})
  const variableRegex = /\{(\w+)\}/g;
  const variables: string[] = [];
  let match;
  while ((match = variableRegex.exec(prompt.prompt_template)) !== null) {
    if (!variables.includes(match[1])) {
      variables.push(match[1]);
    }
  }

  return {
    id: prompt.id,
    slug: prompt.slug,  // Add slug for URL navigation
    title: prompt.title_en,
    titleBn: prompt.title_bn,
    description: prompt.description_en || '',
    descriptionBn: prompt.description_bn || '',
    content: prompt.prompt_template,
    contentBn: prompt.prompt_template, // Using same template for both languages
    category: categoryNameEn,
    categoryBn: categoryNameBn,
    tags: prompt.tags || [],
    tagsBn: prompt.tags || [], // Can be extended to support Bengali tags
    price: prompt.price || 0,
    rating: prompt.rating || 0,
    usageCount: prompt.copy_count || 0,
    author: prompt.author_name || 'Anonymous',
    authorBn: prompt.author_name || 'বেনামী',
    variables: variables.length > 0 ? variables : undefined,
    demoInput: prompt.example_input || undefined,
    demoOutput: prompt.example_output || undefined,
  };
};

// Helper function to attach category to prompts
const attachCategories = async (prompts: any[]): Promise<Prompt[]> => {
  if (!prompts || prompts.length === 0) return [];
  
  // Get unique category IDs
  const categoryIds = [...new Set(prompts.map(p => p.category_id).filter(Boolean))];
  
  if (categoryIds.length === 0) {
    return prompts.map(p => ({ ...p, category: undefined })) as Prompt[];
  }
  
  // Fetch categories
  const { data: categories, error } = await supabase
    .from('categories')
    .select('*')
    .in('id', categoryIds);
  
  if (error) throw error;
  
  // Create category map
  const categoryMap = new Map(categories?.map(c => [c.id, c]) || []);
  
  // Attach categories to prompts
  return prompts.map(p => ({
    ...p,
    category: p.category_id ? categoryMap.get(p.category_id) : undefined
  })) as Prompt[];
};

// Fetch all categories
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name_en');
      
      if (error) throw error;
      return data as Category[];
    },
  });
};

// Fetch all prompts with optional filters
// Uses prompts_public view which conditionally exposes prompt_template based on purchase status
export const usePrompts = (options?: {
  categorySlug?: string;
  search?: string;
  isFeatured?: boolean;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ['prompts', options],
    queryFn: async () => {
      // Use the secure view that conditionally exposes prompt_template
      let query = supabase
        .from('prompts_public')
        .select('*');

      if (options?.categorySlug) {
        const { data: category } = await supabase
          .from('categories')
          .select('id')
          .eq('slug', options.categorySlug)
          .single();
        
        if (category) {
          query = query.eq('category_id', category.id);
        }
      }

      if (options?.search) {
        // Escape Postgres LIKE wildcards to prevent query logic flaws
        const escapedSearch = options.search.replace(/[%_\\]/g, '\\$&');
        query = query.or(`title_bn.ilike.%${escapedSearch}%,title_en.ilike.%${escapedSearch}%,description_bn.ilike.%${escapedSearch}%,description_en.ilike.%${escapedSearch}%`);
      }

      if (options?.isFeatured) {
        query = query.eq('is_featured', true);
      }

      if (options?.limit) {
        query = query.limit(options.limit);
      }

      const { data, error } = await query.order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Manually attach categories since view doesn't have FK relation
      return attachCategories(data || []);
    },
  });
};

// Fetch single prompt by slug
// Uses prompts_public view which conditionally exposes prompt_template based on purchase status
export const usePrompt = (slug: string) => {
  return useQuery({
    queryKey: ['prompt', slug],
    queryFn: async () => {
      // Use the secure view that conditionally exposes prompt_template
      const { data, error } = await supabase
        .from('prompts_public')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();
      
      if (error) throw error;
      if (!data) return null;
      
      // Manually attach category since view doesn't have FK relation
      const prompts = await attachCategories([data]);
      return prompts[0] || null;
    },
    enabled: !!slug,
  });
};

// Fetch user's saved prompts
// Note: This still uses the prompts table directly, but saved prompts are already accessible
// to the user who saved them, and the view handles template exposure correctly
export const useSavedPrompts = () => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['savedPrompts', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      // First fetch saved prompt IDs
      const { data: savedData, error: savedError } = await supabase
        .from('saved_prompts')
        .select('id, user_id, prompt_id, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (savedError) throw savedError;
      if (!savedData || savedData.length === 0) return [];
      
      // Fetch prompts using the secure view
      const promptIds = savedData.map(s => s.prompt_id);
      const { data: promptsData, error: promptsError } = await supabase
        .from('prompts_public')
        .select('*')
        .in('id', promptIds);
      
      if (promptsError) throw promptsError;
      
      // Attach categories to prompts
      const promptsWithCategories = await attachCategories(promptsData || []);
      
      // Combine saved prompts with their prompt data
      const promptsMap = new Map(promptsWithCategories.map(p => [p.id, p]));
      return savedData.map(saved => ({
        ...saved,
        prompt: promptsMap.get(saved.prompt_id) as Prompt | undefined
      })) as SavedPrompt[];
    },
    enabled: !!user,
  });
};

// Check if prompt is saved
export const useIsPromptSaved = (promptId: string) => {
  const { user } = useAuth();
  
  return useQuery({
    queryKey: ['isPromptSaved', promptId, user?.id],
    queryFn: async () => {
      if (!user) return false;
      
      const { data, error } = await supabase
        .from('saved_prompts')
        .select('id')
        .eq('user_id', user.id)
        .eq('prompt_id', promptId)
        .maybeSingle();
      
      if (error) throw error;
      return !!data;
    },
    enabled: !!user && !!promptId,
  });
};

// Save/unsave prompt mutations
export const useSavePrompt = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async (promptId: string) => {
      if (!user) throw new Error('Must be logged in');
      
      const { error } = await supabase
        .from('saved_prompts')
        .insert({ user_id: user.id, prompt_id: promptId });
      
      if (error) throw error;
    },
    onSuccess: (_, promptId) => {
      queryClient.invalidateQueries({ queryKey: ['savedPrompts'] });
      queryClient.invalidateQueries({ queryKey: ['isPromptSaved', promptId] });
    },
  });
};

export const useUnsavePrompt = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  return useMutation({
    mutationFn: async (promptId: string) => {
      if (!user) throw new Error('Must be logged in');
      
      const { error } = await supabase
        .from('saved_prompts')
        .delete()
        .eq('user_id', user.id)
        .eq('prompt_id', promptId);
      
      if (error) throw error;
    },
    onSuccess: (_, promptId) => {
      queryClient.invalidateQueries({ queryKey: ['savedPrompts'] });
      queryClient.invalidateQueries({ queryKey: ['isPromptSaved', promptId] });
    },
  });
};

// Fetch related prompts by category (excluding current prompt)
// Uses prompts_public view which conditionally exposes prompt_template based on purchase status
export const useRelatedPrompts = (promptId: string, categoryId: string | null, limit: number = 4) => {
  return useQuery({
    queryKey: ['relatedPrompts', promptId, categoryId, limit],
    queryFn: async () => {
      if (!categoryId) return [];
      
      // Use the secure view that conditionally exposes prompt_template
      const { data, error } = await supabase
        .from('prompts_public')
        .select('*')
        .eq('category_id', categoryId)
        .neq('id', promptId)
        .order('rating', { ascending: false })
        .limit(limit);
      
      if (error) throw error;
      
      // Manually attach categories since view doesn't have FK relation
      return attachCategories(data || []);
    },
    enabled: !!promptId && !!categoryId,
  });
};

// Increment copy count (no-op for now, can be tracked server-side later)
export const useIncrementCopyCount = () => {
  return useMutation({
    mutationFn: async (_promptId: string) => {
      // Copy tracking can be implemented server-side
      return Promise.resolve();
    },
  });
};
