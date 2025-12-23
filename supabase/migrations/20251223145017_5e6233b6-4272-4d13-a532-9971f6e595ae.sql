-- Add restrictive policies to make AI usage logs immutable
-- This prevents users from deleting/updating their usage logs to bypass rate limits

CREATE POLICY "AI usage logs cannot be updated"
ON public.ai_usage_logs
FOR UPDATE
TO authenticated
USING (false);

CREATE POLICY "AI usage logs cannot be deleted"
ON public.ai_usage_logs
FOR DELETE
TO authenticated
USING (false);