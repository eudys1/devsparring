-- Devsparring: esquema base de datos de usuario. El banco de preguntas NO vive aquí
-- (está en contenido/ del repositorio); estas tablas solo referencian ids.
-- Eje user_id directo: no hay equipos. RLS en todas las tablas por pertenencia.

create extension if not exists pgcrypto;

-- Perfil: preferencias y flag de dueño (cuya clave de Anthropic vive en env).
create table if not exists public.perfiles (
  user_id uuid primary key references auth.users (id) on delete cascade,
  nombre text,
  rol_objetivo text not null default 'fullstack',
  nivel_por_defecto text not null default 'mid' check (nivel_por_defecto in ('junior', 'mid', 'senior')),
  idioma text not null default 'es' check (idioma in ('es', 'en')),
  creado_en timestamptz not null default now(),
  actualizado_en timestamptz not null default now()
);

-- Una sesión de práctica: un modo, un nivel, una pista opcional.
create table if not exists public.sesiones (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  modo text not null check (modo in ('flash', 'verbal', 'kata', 'review', 'diseno', 'star')),
  nivel text not null check (nivel in ('junior', 'mid', 'senior')),
  idioma text not null default 'es' check (idioma in ('es', 'en')),
  pista text,
  semilla integer not null,
  iniciada_en timestamptz not null default now(),
  terminada_en timestamptz
);
create index if not exists sesiones_user_idx on public.sesiones (user_id, iniciada_en desc);

-- Cada respuesta a una pregunta dentro de una sesión, con su corrección completa.
create table if not exists public.respuestas (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  sesion_id uuid not null references public.sesiones (id) on delete cascade,
  pregunta_id text not null,
  pregunta_version integer not null,
  respuesta text not null,
  resultado_tests jsonb,
  correccion jsonb,
  puntuacion smallint check (puntuacion between 0 and 10),
  modelo text,
  version_rubrica integer,
  duracion_ms integer,
  creada_en timestamptz not null default now()
);
create index if not exists respuestas_user_pregunta_idx on public.respuestas (user_id, pregunta_id, creada_en desc);

-- Estado FSRS por (usuario, pregunta). Campos con los nombres de ts-fsrs.
create table if not exists public.tarjetas (
  user_id uuid not null references auth.users (id) on delete cascade,
  pregunta_id text not null,
  due timestamptz not null,
  stability double precision not null,
  difficulty double precision not null,
  elapsed_days integer not null default 0,
  scheduled_days integer not null default 0,
  learning_steps integer not null default 0,
  reps integer not null default 0,
  lapses integer not null default 0,
  state smallint not null default 0,
  last_review timestamptz,
  actualizada_en timestamptz not null default now(),
  primary key (user_id, pregunta_id)
);
create index if not exists tarjetas_due_idx on public.tarjetas (user_id, due);

-- Log de cada repaso: permite recalcular si cambia el mapeo puntuación→nota.
create table if not exists public.repasos (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  pregunta_id text not null,
  respuesta_id uuid references public.respuestas (id) on delete set null,
  nota smallint not null check (nota between 1 and 4),
  puntuacion smallint check (puntuacion between 0 and 10),
  version_rubrica integer,
  modelo text,
  elapsed_days integer not null default 0,
  state smallint not null,
  repasada_en timestamptz not null default now()
);
create index if not exists repasos_user_idx on public.repasos (user_id, repasada_en desc);

-- Entrevistas reales del usuario: el dato más valioso del producto.
create table if not exists public.entrevistas (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  empresa text not null,
  rol text,
  nivel text check (nivel in ('junior', 'mid', 'senior')),
  fecha date not null default current_date,
  formato text,
  preguntas text[] not null default '{}',
  notas text,
  resultado text,
  creada_en timestamptz not null default now()
);
create index if not exists entrevistas_user_idx on public.entrevistas (user_id, fecha desc);

-- RLS: cada usuario solo ve y escribe lo suyo.
alter table public.perfiles enable row level security;
alter table public.sesiones enable row level security;
alter table public.respuestas enable row level security;
alter table public.tarjetas enable row level security;
alter table public.repasos enable row level security;
alter table public.entrevistas enable row level security;

do $$
declare t text;
begin
  foreach t in array array['perfiles', 'sesiones', 'respuestas', 'tarjetas', 'repasos', 'entrevistas'] loop
    execute format('drop policy if exists "propio_%s" on public.%I', t, t);
    execute format(
      'create policy "propio_%s" on public.%I for all to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()))',
      t, t
    );
  end loop;
end $$;

-- Perfil automático al registrarse.
create or replace function public.crear_perfil()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.perfiles (user_id) values (new.id) on conflict do nothing;
  return new;
end $$;

drop trigger if exists al_crear_usuario on auth.users;
create trigger al_crear_usuario after insert on auth.users
  for each row execute function public.crear_perfil();
