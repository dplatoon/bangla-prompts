DROP POLICY "Users can create their own purchases" ON public.prompt_purchases;
CREATE POLICY "No direct client inserts for purchases"
ON public.prompt_purchases FOR INSERT
WITH CHECK (false);