-- Add explicit RESTRICTIVE policies to ensure purchase records are immutable
-- This prevents any UPDATE or DELETE operations on prompt_purchases

CREATE POLICY "Purchases cannot be updated"
ON public.prompt_purchases
FOR UPDATE
TO authenticated
USING (false);

CREATE POLICY "Purchases cannot be deleted"
ON public.prompt_purchases
FOR DELETE
TO authenticated
USING (false);