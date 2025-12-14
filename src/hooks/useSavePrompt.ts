import { useState, useEffect, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

export const useSavePrompt = (promptId: string, language: 'bn' | 'en' = 'bn') => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [localSaved, setLocalSaved] = useState(false);

  // Check localStorage for guests
  useEffect(() => {
    if (!user && promptId) {
      const saved = localStorage.getItem('bdprompt-saved');
      const savedList = saved ? JSON.parse(saved) : [];
      setLocalSaved(savedList.includes(promptId));
    }
  }, [promptId, user]);

  // Query saved status from database for authenticated users
  const { data: dbSaved, isLoading } = useQuery({
    queryKey: ['saved-prompt', promptId, user?.id],
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
    enabled: !!user && !!promptId
  });

  const isSaved = user ? dbSaved : localSaved;

  // Save mutation for database
  const saveMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error('Not authenticated');
      const { error } = await supabase
        .from('saved_prompts')
        .insert({ user_id: user.id, prompt_id: promptId });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['saved-prompt', promptId, user?.id] });
      queryClient.invalidateQueries({ queryKey: ['saved-prompts', user?.id] });
      toast({
        title: language === 'bn' ? 'সেভ করা হয়েছে!' : 'Saved!',
        description: language === 'bn' ? 'প্রম্পট আপনার তালিকায় যোগ হয়েছে' : 'Prompt added to your list'
      });
    },
    onError: () => {
      toast({
        title: language === 'bn' ? 'ত্রুটি!' : 'Error!',
        description: language === 'bn' ? 'সেভ করতে ব্যর্থ হয়েছে' : 'Failed to save',
        variant: 'destructive'
      });
    }
  });

  // Unsave mutation for database
  const unsaveMutation = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error('Not authenticated');
      const { error } = await supabase
        .from('saved_prompts')
        .delete()
        .eq('user_id', user.id)
        .eq('prompt_id', promptId);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['saved-prompt', promptId, user?.id] });
      queryClient.invalidateQueries({ queryKey: ['saved-prompts', user?.id] });
      toast({
        title: language === 'bn' ? 'সরানো হয়েছে' : 'Removed',
        description: language === 'bn' ? 'প্রম্পট তালিকা থেকে সরানো হয়েছে' : 'Prompt removed from your list'
      });
    },
    onError: () => {
      toast({
        title: language === 'bn' ? 'ত্রুটি!' : 'Error!',
        description: language === 'bn' ? 'সরাতে ব্যর্থ হয়েছে' : 'Failed to remove',
        variant: 'destructive'
      });
    }
  });

  const toggleSave = useCallback(() => {
    if (user) {
      // Authenticated: use database
      if (isSaved) {
        unsaveMutation.mutate();
      } else {
        saveMutation.mutate();
      }
    } else {
      // Guest: use localStorage
      const saved = localStorage.getItem('bdprompt-saved');
      let savedList = saved ? JSON.parse(saved) : [];
      
      if (localSaved) {
        savedList = savedList.filter((id: string) => id !== promptId);
        setLocalSaved(false);
        toast({
          title: language === 'bn' ? 'সরানো হয়েছে' : 'Removed',
          description: language === 'bn' ? 'প্রম্পট তালিকা থেকে সরানো হয়েছে' : 'Prompt removed from your list'
        });
      } else {
        savedList.push(promptId);
        setLocalSaved(true);
        toast({
          title: language === 'bn' ? 'সেভ করা হয়েছে!' : 'Saved!',
          description: language === 'bn' ? 'লগইন করলে সব ডিভাইসে সিঙ্ক হবে' : 'Login to sync across devices'
        });
      }
      localStorage.setItem('bdprompt-saved', JSON.stringify(savedList));
    }
  }, [user, isSaved, localSaved, promptId, language, saveMutation, unsaveMutation, toast]);

  return {
    isSaved: isSaved || false,
    isLoading: user ? isLoading : false,
    isPending: saveMutation.isPending || unsaveMutation.isPending,
    toggleSave
  };
};
