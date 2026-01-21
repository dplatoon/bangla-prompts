import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

/**
 * useAdmin Hook
 * 
 * SECURITY NOTE: This hook provides client-side admin status checking for UX purposes only.
 * The actual security boundary is enforced at the database level through Row Level Security (RLS) policies.
 * 
 * - All admin operations (INSERT, UPDATE, DELETE on prompts/categories/roles) are protected by 
 *   RLS policies that call the is_admin() database function.
 * - A malicious user could potentially modify client code to see the admin UI, but they CANNOT 
 *   perform any admin actions because the database will reject unauthorized operations.
 * - This client-side check exists solely to provide a better user experience by preventing 
 *   accidental navigation to admin pages for non-admin users.
 * 
 * DO NOT rely on this hook for security - it is for UX convenience only.
 */
export const useAdmin = () => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminRole = async () => {
      if (!user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase.rpc('is_admin');
        if (error) {
          // Log errors only in development to prevent information leakage in production
          if (import.meta.env.DEV) {
            console.error('Error checking admin status:', error);
          }
          setIsAdmin(false);
        } else {
          setIsAdmin(data === true);
        }
      } catch (err) {
        // Log errors only in development to prevent information leakage in production
        if (import.meta.env.DEV) {
          console.error('Error checking admin role:', err);
        }
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdminRole();
  }, [user]);

  return { isAdmin, loading };
};
