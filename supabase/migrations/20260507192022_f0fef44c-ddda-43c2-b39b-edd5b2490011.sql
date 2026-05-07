
-- Revoke EXECUTE from anon/authenticated on internal SECURITY DEFINER helpers.
-- These are still callable from RLS policies and triggers (which run as table owner),
-- but no longer directly invocable via PostgREST RPC.

REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.is_admin() FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.has_purchased_prompt(uuid, uuid) FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.check_rate_limit(uuid, text, integer, integer) FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.log_ai_usage(uuid, text) FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.log_prompts_changes() FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.log_categories_changes() FROM anon, authenticated, PUBLIC;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM anon, authenticated, PUBLIC;

-- Keep these intentionally callable by the app:
GRANT EXECUTE ON FUNCTION public.get_public_prompts() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.get_prompt_template(uuid) TO anon, authenticated;
