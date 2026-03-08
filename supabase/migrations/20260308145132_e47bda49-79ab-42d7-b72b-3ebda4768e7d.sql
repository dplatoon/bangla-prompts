
-- Add statement_timeout to all database functions for resource protection

CREATE OR REPLACE FUNCTION public.check_rate_limit(_user_id uuid, _function_name text, _max_requests integer, _window_minutes integer)
 RETURNS boolean
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
 SET statement_timeout = '5s'
AS $function$
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
$function$;

CREATE OR REPLACE FUNCTION public.log_ai_usage(_user_id uuid, _function_name text)
 RETURNS void
 LANGUAGE sql
 SECURITY DEFINER
 SET search_path TO 'public'
 SET statement_timeout = '5s'
AS $function$
  INSERT INTO public.ai_usage_logs (user_id, function_name)
  VALUES (_user_id, _function_name);
$function$;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
 SET statement_timeout = '5s'
AS $function$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$function$;

CREATE OR REPLACE FUNCTION public.is_admin()
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
 SET statement_timeout = '5s'
AS $function$
  SELECT public.has_role(auth.uid(), 'admin')
$function$;

CREATE OR REPLACE FUNCTION public.has_purchased_prompt(_user_id uuid, _prompt_id uuid)
 RETURNS boolean
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
 SET statement_timeout = '5s'
AS $function$
  SELECT EXISTS (
    SELECT 1
    FROM public.prompt_purchases
    WHERE user_id = _user_id
      AND prompt_id = _prompt_id
  )
$function$;

CREATE OR REPLACE FUNCTION public.get_prompt_template(_prompt_id uuid)
 RETURNS text
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
 SET statement_timeout = '5s'
AS $function$
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
  
  IF _prompt.is_free = true THEN
    RETURN _prompt.prompt_template;
  END IF;
  
  IF _user_id IS NOT NULL AND public.has_purchased_prompt(_user_id, _prompt_id) THEN
    RETURN _prompt.prompt_template;
  END IF;
  
  RETURN LEFT(_prompt.prompt_template, 150) || '... [প্রিমিয়াম কন্টেন্ট - কিনুন দেখতে]';
END;
$function$;

CREATE OR REPLACE FUNCTION public.get_public_prompts()
 RETURNS TABLE(id uuid, category_id uuid, price numeric, is_free boolean, rating numeric, rating_count integer, copy_count integer, view_count integer, is_featured boolean, is_published boolean, created_at timestamp with time zone, updated_at timestamp with time zone, slug text, title_bn text, title_en text, description_bn text, description_en text, tags text[], use_case_bn text, use_case_en text, example_input text, example_output text, author_name text, author_avatar text, prompt_template text)
 LANGUAGE sql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
 SET statement_timeout = '5s'
AS $function$
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
$function$;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO 'public'
 SET statement_timeout = '5s'
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.log_prompts_changes()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
 SET statement_timeout = '5s'
AS $function$
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
$function$;

CREATE OR REPLACE FUNCTION public.log_categories_changes()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
 SET statement_timeout = '5s'
AS $function$
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
$function$;
