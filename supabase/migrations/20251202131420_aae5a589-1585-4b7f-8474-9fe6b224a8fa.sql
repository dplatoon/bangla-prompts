-- Create categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name_bn TEXT NOT NULL,
  name_en TEXT NOT NULL,
  description_bn TEXT,
  description_en TEXT,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create prompts table
CREATE TABLE public.prompts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title_bn TEXT NOT NULL,
  title_en TEXT NOT NULL,
  description_bn TEXT,
  description_en TEXT,
  prompt_template TEXT NOT NULL,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  tags TEXT[] DEFAULT '{}',
  use_case_bn TEXT,
  use_case_en TEXT,
  example_input TEXT,
  example_output TEXT,
  author_name TEXT,
  author_avatar TEXT,
  price DECIMAL(10,2) DEFAULT 0,
  is_free BOOLEAN DEFAULT true,
  rating DECIMAL(3,2) DEFAULT 0,
  rating_count INTEGER DEFAULT 0,
  copy_count INTEGER DEFAULT 0,
  view_count INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create saved prompts table (user favorites)
CREATE TABLE public.saved_prompts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  prompt_id UUID NOT NULL REFERENCES public.prompts(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, prompt_id)
);

-- Enable RLS
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_prompts ENABLE ROW LEVEL SECURITY;

-- Categories: publicly readable
CREATE POLICY "Categories are viewable by everyone" 
ON public.categories FOR SELECT 
USING (true);

-- Prompts: publicly readable (published ones)
CREATE POLICY "Published prompts are viewable by everyone" 
ON public.prompts FOR SELECT 
USING (is_published = true);

-- Saved prompts: users can only see their own
CREATE POLICY "Users can view their saved prompts" 
ON public.saved_prompts FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can save prompts" 
ON public.saved_prompts FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unsave prompts" 
ON public.saved_prompts FOR DELETE 
TO authenticated
USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX idx_prompts_category ON public.prompts(category_id);
CREATE INDEX idx_prompts_slug ON public.prompts(slug);
CREATE INDEX idx_prompts_is_featured ON public.prompts(is_featured) WHERE is_featured = true;
CREATE INDEX idx_prompts_is_published ON public.prompts(is_published) WHERE is_published = true;
CREATE INDEX idx_saved_prompts_user ON public.saved_prompts(user_id);
CREATE INDEX idx_saved_prompts_prompt ON public.saved_prompts(prompt_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for prompts
CREATE TRIGGER update_prompts_updated_at
BEFORE UPDATE ON public.prompts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default categories
INSERT INTO public.categories (slug, name_bn, name_en, description_bn, description_en, icon) VALUES
('content', 'কন্টেন্ট', 'Content', 'ব্লগ, আর্টিকেল, এবং সোশ্যাল মিডিয়া কন্টেন্ট', 'Blog, article, and social media content', 'FileText'),
('image', 'ইমেজ', 'Image', 'AI ইমেজ জেনারেশন প্রম্পট', 'AI image generation prompts', 'Image'),
('code', 'কোড', 'Code', 'প্রোগ্রামিং এবং ডেভেলপমেন্ট প্রম্পট', 'Programming and development prompts', 'Code'),
('marketing', 'মার্কেটিং', 'Marketing', 'বিজ্ঞাপন এবং মার্কেটিং কপি', 'Advertising and marketing copy', 'Megaphone'),
('education', 'শিক্ষা', 'Education', 'শিক্ষামূলক কন্টেন্ট এবং টিউটোরিয়াল', 'Educational content and tutorials', 'GraduationCap'),
('business', 'ব্যবসা', 'Business', 'ব্যবসায়িক ডকুমেন্ট এবং কমিউনিকেশন', 'Business documents and communication', 'Briefcase');