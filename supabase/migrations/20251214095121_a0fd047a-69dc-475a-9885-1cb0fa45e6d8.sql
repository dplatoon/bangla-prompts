-- Add SELECT policy so users can view their own AI usage logs
CREATE POLICY "Users can view their own AI usage logs"
ON public.ai_usage_logs
FOR SELECT
USING (auth.uid() = user_id);