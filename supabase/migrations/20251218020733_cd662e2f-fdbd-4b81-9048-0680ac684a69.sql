-- Add indexes on prompts table for performance optimization
CREATE INDEX IF NOT EXISTS idx_prompts_slug ON public.prompts(slug);
CREATE INDEX IF NOT EXISTS idx_prompts_category_id ON public.prompts(category_id);
CREATE INDEX IF NOT EXISTS idx_prompts_is_published ON public.prompts(is_published);
CREATE INDEX IF NOT EXISTS idx_prompts_is_featured ON public.prompts(is_featured);
CREATE INDEX IF NOT EXISTS idx_prompts_created_at ON public.prompts(created_at DESC);