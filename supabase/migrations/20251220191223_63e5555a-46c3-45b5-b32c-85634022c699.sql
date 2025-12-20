-- Add indexes for better query performance on prompts table
CREATE INDEX IF NOT EXISTS idx_prompts_slug ON public.prompts(slug);
CREATE INDEX IF NOT EXISTS idx_prompts_category_id ON public.prompts(category_id);
CREATE INDEX IF NOT EXISTS idx_prompts_is_published ON public.prompts(is_published);
CREATE INDEX IF NOT EXISTS idx_prompts_is_featured ON public.prompts(is_featured);

-- Composite index for common query patterns
CREATE INDEX IF NOT EXISTS idx_prompts_published_featured ON public.prompts(is_published, is_featured) WHERE is_published = true;