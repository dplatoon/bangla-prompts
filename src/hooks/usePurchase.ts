import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

export const usePurchase = (promptId: string, language: 'bn' | 'en' = 'bn') => {
  const { user, session } = useAuth();
  const { toast } = useToast();
  const [hasPurchased, setHasPurchased] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Check if user has purchased this prompt
  useEffect(() => {
    const checkPurchase = async () => {
      if (!user || !promptId) {
        setHasPurchased(false);
        setIsLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('prompt_purchases')
          .select('id')
          .eq('user_id', user.id)
          .eq('prompt_id', promptId)
          .maybeSingle();

        if (error) {
          console.error('Error checking purchase:', error);
        }
        
        setHasPurchased(!!data);
      } catch (err) {
        console.error('Purchase check failed:', err);
      } finally {
        setIsLoading(false);
      }
    };

    checkPurchase();
  }, [user, promptId]);

  // Handle URL params for purchase status
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const purchaseStatus = urlParams.get('purchase');
    
    if (purchaseStatus === 'success') {
      toast({
        title: language === 'bn' ? "পেমেন্ট সম্পন্ন!" : "Payment Successful!",
        description: language === 'bn' 
          ? "আপনি এখন এই প্রম্পটের সম্পূর্ণ টেমপ্লেট দেখতে পারবেন।"
          : "You now have full access to this prompt template.",
      });
      setHasPurchased(true);
      // Clean up URL
      window.history.replaceState({}, '', window.location.pathname);
    } else if (purchaseStatus === 'cancelled') {
      toast({
        title: language === 'bn' ? "পেমেন্ট বাতিল" : "Payment Cancelled",
        description: language === 'bn' 
          ? "পেমেন্ট বাতিল করা হয়েছে। আপনি পরে আবার চেষ্টা করতে পারেন।"
          : "Payment was cancelled. You can try again later.",
        variant: "destructive",
      });
      // Clean up URL
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [toast, language]);

  const initiateCheckout = useCallback(async () => {
    if (!user || !session) {
      toast({
        title: language === 'bn' ? "লগইন করুন" : "Login Required",
        description: language === 'bn' 
          ? "প্রম্পট কিনতে আগে লগইন করুন।"
          : "Please login to purchase this prompt.",
        variant: "destructive",
      });
      return;
    }

    setIsCheckingOut(true);

    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          promptId,
          successUrl: `${window.location.origin}/payment-success`,
          cancelUrl: `${window.location.origin}/payment-cancelled`,
        },
      });

      if (error) {
        throw error;
      }

      if (data?.url) {
        // Defense-in-depth: Validate URL is from Stripe before redirecting
        try {
          const checkoutUrl = new URL(data.url);
          if (checkoutUrl.hostname === 'checkout.stripe.com' && checkoutUrl.protocol === 'https:') {
            window.location.href = data.url;
          } else {
            throw new Error('Invalid checkout URL domain');
          }
        } catch (urlError) {
          console.error('URL validation failed:', urlError);
          toast({
            title: language === 'bn' ? "ত্রুটি" : "Error",
            description: language === 'bn' ? "অবৈধ চেকআউট URL" : "Invalid checkout URL",
            variant: "destructive",
          });
        }
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (err) {
      console.error('Checkout failed:', err);
      toast({
        title: language === 'bn' ? "ত্রুটি" : "Error",
        description: language === 'bn' 
          ? "চেকআউট শুরু করতে ব্যর্থ। আবার চেষ্টা করুন।"
          : "Failed to start checkout. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsCheckingOut(false);
    }
  }, [user, session, promptId, toast, language]);

  return {
    hasPurchased,
    isLoading,
    isCheckingOut,
    initiateCheckout,
    isAuthenticated: !!user,
  };
};
