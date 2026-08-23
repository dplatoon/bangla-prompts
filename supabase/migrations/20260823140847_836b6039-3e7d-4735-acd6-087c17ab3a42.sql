DROP POLICY IF EXISTS "Anyone can submit a creator application" ON public.creator_applications;

CREATE POLICY "Submit creator application for self or anonymously"
ON public.creator_applications
FOR INSERT
TO anon, authenticated
WITH CHECK ((user_id IS NULL) OR (user_id = auth.uid()));