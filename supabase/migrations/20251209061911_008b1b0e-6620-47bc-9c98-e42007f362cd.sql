-- Create prompt_purchases table to track user purchases
CREATE TABLE public.prompt_purchases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    prompt_id UUID REFERENCES public.prompts(id) ON DELETE CASCADE NOT NULL,
    amount NUMERIC NOT NULL DEFAULT 0,
    purchased_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, prompt_id)
);

-- Enable RLS
ALTER TABLE public.prompt_purchases ENABLE ROW LEVEL SECURITY;

-- Users can view their own purchases
CREATE POLICY "Users can view their own purchases"
ON public.prompt_purchases
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Users can insert their own purchases (for payment processing)
CREATE POLICY "Users can create their own purchases"
ON public.prompt_purchases
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Create a security definer function to check if user has purchased a prompt
CREATE OR REPLACE FUNCTION public.has_purchased_prompt(_user_id UUID, _prompt_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.prompt_purchases
    WHERE user_id = _user_id
      AND prompt_id = _prompt_id
  )
$$;

-- Create a function to get prompt content (full or preview based on purchase status)
CREATE OR REPLACE FUNCTION public.get_prompt_template(_prompt_id UUID)
RETURNS TEXT
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _prompt RECORD;
  _user_id UUID;
BEGIN
  _user_id := auth.uid();
  
  SELECT is_free, prompt_template INTO _prompt
  FROM public.prompts
  WHERE id = _prompt_id AND is_published = true;
  
  IF NOT FOUND THEN
    RETURN NULL;
  END IF;
  
  -- If free prompt, return full template
  IF _prompt.is_free = true THEN
    RETURN _prompt.prompt_template;
  END IF;
  
  -- If user is logged in and has purchased, return full template
  IF _user_id IS NOT NULL AND public.has_purchased_prompt(_user_id, _prompt_id) THEN
    RETURN _prompt.prompt_template;
  END IF;
  
  -- Otherwise return truncated preview (first 150 chars + ellipsis)
  RETURN LEFT(_prompt.prompt_template, 150) || '... [প্রিমিয়াম কন্টেন্ট - কিনুন দেখতে]';
END;
$$;

-- Create rate limiting table for AI usage
CREATE TABLE public.ai_usage_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL,
    function_name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.ai_usage_logs ENABLE ROW LEVEL SECURITY;

-- Only authenticated users can insert their own logs
CREATE POLICY "Users can log their own AI usage"
ON public.ai_usage_logs
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Create index for efficient rate limit queries
CREATE INDEX idx_ai_usage_logs_user_time ON public.ai_usage_logs (user_id, function_name, created_at DESC);

-- Function to check rate limit (returns true if within limit)
CREATE OR REPLACE FUNCTION public.check_rate_limit(_user_id UUID, _function_name TEXT, _max_requests INTEGER, _window_minutes INTEGER)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _count INTEGER;
BEGIN
  SELECT COUNT(*) INTO _count
  FROM public.ai_usage_logs
  WHERE user_id = _user_id
    AND function_name = _function_name
    AND created_at > (now() - (_window_minutes || ' minutes')::INTERVAL);
  
  RETURN _count < _max_requests;
END;
$$;

-- Function to log AI usage
CREATE OR REPLACE FUNCTION public.log_ai_usage(_user_id UUID, _function_name TEXT)
RETURNS VOID
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  INSERT INTO public.ai_usage_logs (user_id, function_name)
  VALUES (_user_id, _function_name);
$$;