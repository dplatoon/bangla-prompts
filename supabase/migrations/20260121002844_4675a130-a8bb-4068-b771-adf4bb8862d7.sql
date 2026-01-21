-- Fix: Protect paid prompt templates from direct table access
-- Issue: Users can bypass the prompts_public view and query prompts table directly

-- Step 1: Drop the current public SELECT policy that allows everyone to read all columns
DROP POLICY IF EXISTS "Published prompts are viewable by everyone" ON public.prompts;

-- Step 2: Create a new SELECT policy - only admins can read directly from prompts table
-- Regular users must use the prompts_public view which filters templates
CREATE POLICY "Only admins can directly read prompts"
ON public.prompts
FOR SELECT
USING (public.is_admin());

-- Step 3: Drop the existing security_invoker view
DROP VIEW IF EXISTS public.prompts_public;

-- Step 4: Create a SECURITY DEFINER function to safely expose prompts
-- This function can read from prompts table even though regular users can't directly
CREATE OR REPLACE FUNCTION public.get_public_prompts()
RETURNS TABLE (
  id uuid,
  category_id uuid,
  price numeric,
  is_free boolean,
  rating numeric,
  rating_count integer,
  copy_count integer,
  view_count integer,
  is_featured boolean,
  is_published boolean,
  created_at timestamptz,
  updated_at timestamptz,
  slug text,
  title_bn text,
  title_en text,
  description_bn text,
  description_en text,
  tags text[],
  use_case_bn text,
  use_case_en text,
  example_input text,
  example_output text,
  author_name text,
  author_avatar text,
  prompt_template text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    p.id,
    p.category_id,
    p.price,
    p.is_free,
    p.rating,
    p.rating_count,
    p.copy_count,
    p.view_count,
    p.is_featured,
    p.is_published,
    p.created_at,
    p.updated_at,
    p.slug,
    p.title_bn,
    p.title_en,
    p.description_bn,
    p.description_en,
    p.tags,
    p.use_case_bn,
    p.use_case_en,
    p.example_input,
    p.example_output,
    p.author_name,
    p.author_avatar,
    CASE 
      WHEN p.is_free = true THEN p.prompt_template
      WHEN public.has_purchased_prompt(auth.uid(), p.id) THEN p.prompt_template
      ELSE LEFT(p.prompt_template, 150) || '... [প্রিমিয়াম কন্টেন্ট - কিনুন দেখতে]'
    END as prompt_template
  FROM public.prompts p
  WHERE p.is_published = true
$$;

-- Step 5: Recreate the view using the security definer function
CREATE OR REPLACE VIEW public.prompts_public AS
SELECT * FROM public.get_public_prompts();

-- Step 6: Grant SELECT on the view to all users
GRANT SELECT ON public.prompts_public TO anon, authenticated;