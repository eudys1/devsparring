-- 15-10-2026: borrar tu cuenta desde la app, sin pedirlo por un canal aparte.
-- La privacidad promete que se puede y hasta hoy se hacía a mano en el panel.
--
-- La función borra solo al usuario de la sesión (auth.uid()), así que no hace
-- falta tener la clave de servicio en el servidor. Todas las tablas cuelgan de
-- auth.users con on delete cascade (migración base): se va todo con él.
create or replace function public.borrar_mi_cuenta()
returns void
language plpgsql
volatile
security definer
set search_path = ''
as $$
begin
  if auth.uid() is null then
    raise exception 'Sin sesión no se puede borrar ninguna cuenta';
  end if;
  delete from auth.users where id = auth.uid();
end;
$$;

revoke execute on function public.borrar_mi_cuenta() from public, anon;
grant execute on function public.borrar_mi_cuenta() to authenticated;
