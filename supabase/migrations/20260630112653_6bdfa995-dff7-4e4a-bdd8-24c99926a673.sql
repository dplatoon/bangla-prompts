DROP POLICY IF EXISTS "Users can log their own AI usage" ON public.ai_usage_logs;
CREATE POLICY "Block direct client inserts to AI usage logs"
ON public.ai_usage_logs
FOR INSERT
TO authenticated
WITH CHECK (false);