-- Drop the overly permissive INSERT policy
DROP POLICY IF EXISTS "System can insert audit logs" ON public.admin_audit_logs;

-- Create a more restrictive INSERT policy that only allows inserts from authenticated sessions
-- The triggers use SECURITY DEFINER which bypasses RLS, so this policy won't block them
-- But it will prevent any direct client-side inserts
CREATE POLICY "No direct inserts allowed"
ON public.admin_audit_logs
FOR INSERT
WITH CHECK (false);