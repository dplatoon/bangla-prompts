-- Create enum for audit actions
CREATE TYPE public.audit_action AS ENUM ('create', 'update', 'delete');

-- Create admin audit logs table
CREATE TABLE public.admin_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  action audit_action NOT NULL,
  table_name TEXT NOT NULL,
  record_id UUID NOT NULL,
  old_data JSONB,
  new_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for efficient querying
CREATE INDEX idx_admin_audit_logs_created_at ON public.admin_audit_logs(created_at DESC);
CREATE INDEX idx_admin_audit_logs_table_name ON public.admin_audit_logs(table_name);
CREATE INDEX idx_admin_audit_logs_user_id ON public.admin_audit_logs(user_id);

-- Enable RLS
ALTER TABLE public.admin_audit_logs ENABLE ROW LEVEL SECURITY;

-- Only admins can view audit logs
CREATE POLICY "Admins can view audit logs"
ON public.admin_audit_logs
FOR SELECT
USING (public.is_admin());

-- Audit logs cannot be updated (immutability)
CREATE POLICY "Audit logs cannot be updated"
ON public.admin_audit_logs
FOR UPDATE
USING (false);

-- Audit logs cannot be deleted (immutability)
CREATE POLICY "Audit logs cannot be deleted"
ON public.admin_audit_logs
FOR DELETE
USING (false);

-- Allow inserts from triggers (service role will handle this)
CREATE POLICY "System can insert audit logs"
ON public.admin_audit_logs
FOR INSERT
WITH CHECK (true);

-- Create function to log prompts changes
CREATE OR REPLACE FUNCTION public.log_prompts_changes()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _user_id UUID;
  _action audit_action;
BEGIN
  _user_id := auth.uid();
  
  IF TG_OP = 'INSERT' THEN
    _action := 'create';
    INSERT INTO public.admin_audit_logs (user_id, action, table_name, record_id, new_data)
    VALUES (_user_id, _action, 'prompts', NEW.id, to_jsonb(NEW));
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    _action := 'update';
    INSERT INTO public.admin_audit_logs (user_id, action, table_name, record_id, old_data, new_data)
    VALUES (_user_id, _action, 'prompts', NEW.id, to_jsonb(OLD), to_jsonb(NEW));
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    _action := 'delete';
    INSERT INTO public.admin_audit_logs (user_id, action, table_name, record_id, old_data)
    VALUES (_user_id, _action, 'prompts', OLD.id, to_jsonb(OLD));
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$;

-- Create function to log categories changes
CREATE OR REPLACE FUNCTION public.log_categories_changes()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _user_id UUID;
  _action audit_action;
BEGIN
  _user_id := auth.uid();
  
  IF TG_OP = 'INSERT' THEN
    _action := 'create';
    INSERT INTO public.admin_audit_logs (user_id, action, table_name, record_id, new_data)
    VALUES (_user_id, _action, 'categories', NEW.id, to_jsonb(NEW));
    RETURN NEW;
  ELSIF TG_OP = 'UPDATE' THEN
    _action := 'update';
    INSERT INTO public.admin_audit_logs (user_id, action, table_name, record_id, old_data, new_data)
    VALUES (_user_id, _action, 'categories', NEW.id, to_jsonb(OLD), to_jsonb(NEW));
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    _action := 'delete';
    INSERT INTO public.admin_audit_logs (user_id, action, table_name, record_id, old_data)
    VALUES (_user_id, _action, 'categories', OLD.id, to_jsonb(OLD));
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$;

-- Create triggers on prompts table
CREATE TRIGGER audit_prompts_changes
AFTER INSERT OR UPDATE OR DELETE ON public.prompts
FOR EACH ROW EXECUTE FUNCTION public.log_prompts_changes();

-- Create triggers on categories table
CREATE TRIGGER audit_categories_changes
AFTER INSERT OR UPDATE OR DELETE ON public.categories
FOR EACH ROW EXECUTE FUNCTION public.log_categories_changes();