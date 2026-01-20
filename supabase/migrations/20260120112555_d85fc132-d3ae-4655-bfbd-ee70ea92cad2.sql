-- Create a secure view for prompts that conditionally exposes the prompt_template
-- based on whether the user has purchased the prompt or if it's free

CREATE OR REPLACE VIEW public.prompts_public
WITH (security_invoker = true) AS
SELECT 
  id,
  slug,
  title_bn,
  title_en,
  description_bn,
  description_en,
  category_id,
  tags,
  use_case_bn,
  use_case_en,
  example_input,
  example_output,
  author_name,
  author_avatar,
  price,
  is_free,
  rating,
  rating_count,
  copy_count,
  view_count,
  is_featured,
  is_published,
  created_at,
  updated_at,
  -- Conditionally expose prompt_template:
  -- - Full template for free prompts
  -- - Full template for purchased prompts (when user is authenticated)
  -- - Truncated preview for non-purchased premium prompts
  CASE 
    WHEN is_free = true THEN prompt_template
    WHEN auth.uid() IS NOT NULL AND public.has_purchased_prompt(auth.uid(), id) THEN prompt_template
    ELSE LEFT(prompt_template, 150) || '... [প্রিমিয়াম কন্টেন্ট - কিনুন দেখতে]'
  END as prompt_template
FROM public.prompts
WHERE is_published = true;

-- Grant SELECT permissions on the view to both authenticated and anonymous users
GRANT SELECT ON public.prompts_public TO authenticated, anon;

-- Add a comment explaining the view's purpose
COMMENT ON VIEW public.prompts_public IS 'Secure view for prompts that conditionally exposes prompt_template based on purchase status. Free prompts show full template, premium prompts show truncated preview unless purchased.';