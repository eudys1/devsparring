-- Latido: una consulta mínima que hace el workflow latido-supabase.yml cada
-- tres días. Supabase pausa los proyectos gratuitos tras una semana sin
-- actividad (supabase.com/pricing, 29-09-2026) y con él se cayó el login.
-- Devuelve la hora del servidor: no lee ninguna tabla ni expone datos, así que
-- se puede llamar con la clave pública.
create or replace function public.latido()
returns timestamptz
language sql
stable
set search_path = ''
as $$
  select now();
$$;

revoke execute on function public.latido() from public;
grant execute on function public.latido() to anon, authenticated, service_role;
