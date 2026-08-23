CREATE TABLE public.creator_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 120),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 200),
  expertise text CHECK (char_length(expertise) <= 300),
  portfolio text CHECK (char_length(portfolio) <= 500),
  why_join text CHECK (char_length(why_join) <= 2000),
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.creator_applications TO anon;
GRANT INSERT, SELECT ON public.creator_applications TO authenticated;
GRANT ALL ON public.creator_applications TO service_role;

ALTER TABLE public.creator_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a creator application"
ON public.creator_applications FOR INSERT TO anon, authenticated
WITH CHECK (true);

CREATE POLICY "Users can view their own applications"
ON public.creator_applications FOR SELECT TO authenticated
USING (user_id IS NOT NULL AND user_id = auth.uid());

CREATE POLICY "Admins can view all applications"
ON public.creator_applications FOR SELECT TO authenticated
USING (public.has_role(auth.uid(), 'admin'));