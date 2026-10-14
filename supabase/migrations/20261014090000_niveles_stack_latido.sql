-- 14-10-2026: tres cambios pequeños que van juntos en un mismo push.

-- 1. Latido que lee una tabla de verdad. Con solo now() cada tres días Supabase
--    pausó el proyecto igualmente (13-10-2026). La lectura va dentro de la
--    función (security definer) porque el rol anónimo no tiene permiso sobre las
--    tablas, y así sigue sin exponer nada: solo devuelve la hora.
create or replace function public.latido()
returns timestamptz
language plpgsql
volatile
security definer
set search_path = ''
as $$
begin
  perform 1 from public.perfiles limit 1;
  return now();
end;
$$;

revoke execute on function public.latido() from public;
grant execute on function public.latido() to anon, authenticated, service_role;

-- 2. Niveles intermedios: junior, junior+, mid, mid+ y senior. Las preguntas del
--    banco siguen teniendo nivel mínimo junior, mid o senior; los intermedios son
--    niveles de práctica y de lo que apuntas en tus entrevistas.
alter table public.sesiones drop constraint if exists sesiones_nivel_check;
alter table public.sesiones add constraint sesiones_nivel_check
  check (nivel in ('junior', 'junior-mid', 'mid', 'mid-senior', 'senior'));

alter table public.perfiles drop constraint if exists perfiles_nivel_por_defecto_check;
alter table public.perfiles add constraint perfiles_nivel_por_defecto_check
  check (nivel_por_defecto in ('junior', 'junior-mid', 'mid', 'mid-senior', 'senior'));

alter table public.entrevistas drop constraint if exists entrevistas_nivel_check;
alter table public.entrevistas add constraint entrevistas_nivel_check
  check (nivel is null or nivel in ('junior', 'junior-mid', 'mid', 'mid-senior', 'senior'));

-- 3. Tu stack: las pistas en las que se centran las sesiones mezcladas. Vacío
--    es "todas", como hasta ahora.
alter table public.perfiles add column if not exists pistas_foco text[] not null default '{}';

-- 4. La sesión recuerda las pistas de tu stack con las que se eligieron sus
--    preguntas: al retomarla salen las mismas aunque cambies el stack después.
alter table public.sesiones add column if not exists pistas text[];
