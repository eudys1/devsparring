// Aplica supabase/migrations/*.sql al Postgres de Supabase, en orden, una sola
// vez cada una (tabla public._migraciones). No hay Docker ni CLI local en esta
// máquina: se trabaja contra el proyecto remoto. La URL sale de .env.local
// (DATABASE_URL); la contraseña nunca pasa por el chat.
// Uso: pnpm db:migrar
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import pg from 'pg';

const raiz = path.resolve(import.meta.dirname, '..');
await cargarEnv(path.join(raiz, '.env.local'));

const url = process.env.DATABASE_URL;
if (!url) {
  console.error(
    'Falta DATABASE_URL en .env.local (Supabase > Database > Connection string, modo session).',
  );
  process.exit(1);
}

const cliente = new pg.Client({ connectionString: url, ssl: { rejectUnauthorized: false } });
await cliente.connect();
try {
  await cliente.query(
    'create table if not exists public._migraciones (nombre text primary key, aplicada_en timestamptz not null default now())',
  );
  const aplicadas = new Set(
    (await cliente.query('select nombre from public._migraciones')).rows.map((r) => r.nombre),
  );
  const dir = path.join(raiz, 'supabase', 'migrations');
  const ficheros = (await readdir(dir)).filter((f) => f.endsWith('.sql')).sort();
  let n = 0;
  for (const f of ficheros) {
    if (aplicadas.has(f)) continue;
    const sql = await readFile(path.join(dir, f), 'utf8');
    process.stdout.write(`Aplicando ${f}… `);
    await cliente.query('begin');
    try {
      await cliente.query(sql);
      await cliente.query('insert into public._migraciones (nombre) values ($1)', [f]);
      await cliente.query('commit');
      console.log('ok');
      n++;
    } catch (e) {
      await cliente.query('rollback');
      console.log('ERROR');
      throw e;
    }
  }
  console.log(n ? `${n} migraciones aplicadas.` : 'Nada que aplicar.');
} finally {
  await cliente.end();
}

async function cargarEnv(ruta) {
  let texto;
  try {
    texto = await readFile(ruta, 'utf8');
  } catch {
    return;
  }
  for (const linea of texto.split(/\r?\n/)) {
    const m = linea.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!m || linea.trim().startsWith('#')) continue;
    process.env[m[1]] ??= m[2].replace(/^["']|["']$/g, '');
  }
}
