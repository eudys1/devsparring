-- Permisos para los roles de la Data API. El proyecto se creó con "Automatically
-- expose new tables" desactivado (recomendación de Supabase), así que cada tabla
-- necesita sus grants explícitos; el RLS sigue decidiendo qué filas ve cada uno.
grant usage on schema public to anon, authenticated, service_role;

grant select, insert, update, delete on all tables in schema public to authenticated, service_role;
grant usage, select on all sequences in schema public to authenticated, service_role;

-- Tablas que se creen en el futuro heredan los mismos permisos.
alter default privileges in schema public grant select, insert, update, delete on tables to authenticated, service_role;
alter default privileges in schema public grant usage, select on sequences to authenticated, service_role;
