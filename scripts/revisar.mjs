// El bucle de revisión autónomo: la cadena de verificación completa, en
// orden, antes de pedir feedback a nadie (humano o IA). Es la aplicación
// del principio "revisar antes de preguntar" de C:\dev\CLAUDE.md: build →
// capturas de página completa (escritorio/móvil, claro/oscuro) → detector
// mecánico de anti-patrones → format/lint/types/tests. Aquí van todos esos
// pasos en un solo comando para no tener que acordarse del orden ni de las
// variables de entorno que hacen falta.
//
// No para en el primer fallo (para ver TODO lo que está roto de una vez),
// salvo el build: sin build no hay servidor que capturar, así que si falla
// se salta el paso de capturas y se sigue con el resto. Sale con código 1
// si algún paso falló, con una tabla-resumen al final.
//
// Uso: pnpm revisar  (o: node scripts/revisar.mjs)
import { spawnSync } from 'node:child_process';
import path from 'node:path';

const RAIZ = path.resolve(import.meta.dirname, '..');

// El build y las capturas arrancan Next contra estas variables; en local ya
// están en .env.local, pero en una máquina limpia (o en CI) hacen falta
// valores de ejemplo, como hace ci.yml.
const ENV_SUPABASE = {
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://ejemplo.supabase.co',
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? 'sb_publishable_falsa',
};

/** @type {{nombre:string, ok:boolean|null, omitido?:string, duracionMs?:number}[]} */
const resultados = [];

function paso(nombre, comando, args, { env, omitirSi } = {}) {
  if (omitirSi) {
    console.log(`\n=== ${nombre} === (omitido: ${omitirSi})`);
    resultados.push({ nombre, ok: null, omitido: omitirSi });
    return false;
  }

  console.log(`\n=== ${nombre} ===`);
  console.log(`$ ${comando} ${args.join(' ')}`);
  const inicio = Date.now();
  const r = spawnSync(comando, args, {
    cwd: RAIZ,
    stdio: 'inherit',
    shell: true,
    env: env ? { ...process.env, ...env } : process.env,
  });
  const duracionMs = Date.now() - inicio;
  const ok = r.status === 0;
  resultados.push({ nombre, ok, duracionMs });
  console.log(`-> ${ok ? 'OK' : 'FALLÓ'} (${nombre}, ${(duracionMs / 1000).toFixed(1)}s)`);
  return ok;
}

paso('prettier', 'pnpm', ['exec', 'prettier', '--check', '.']);
paso('eslint', 'pnpm', ['exec', 'eslint', 'src', 'scripts']);
paso('typecheck', 'pnpm', ['exec', 'tsc', '--noEmit']);
paso('vitest', 'pnpm', ['exec', 'vitest', 'run']);
paso('contenido:validar', 'node', ['scripts/validar-contenido.mjs']);

const buildOk = paso('build', 'pnpm', ['build'], { env: ENV_SUPABASE });

paso('detector-diseno', 'node', ['scripts/detector-diseno.mjs']);

paso('capturas', 'node', ['scripts/capturas.mjs'], {
  env: ENV_SUPABASE,
  omitirSi: buildOk ? undefined : 'el build falló, sin build no hay servidor que capturar',
});

imprimirResumen();

function imprimirResumen() {
  console.log('\n\nResumen del bucle de revisión:');
  const anchoNombre = Math.max('Paso'.length, ...resultados.map((r) => r.nombre.length));
  const fila = (nombre, estado, duracion) =>
    `${nombre.padEnd(anchoNombre)}  ${estado.padEnd(8)}  ${duracion}`;
  const cabecera = fila('Paso', 'Estado', 'Duración');
  console.log(cabecera);
  console.log('-'.repeat(cabecera.length));
  for (const r of resultados) {
    const estado = r.omitido ? 'OMITIDO' : r.ok ? 'OK' : 'FALLÓ';
    const duracion = r.omitido ? `(${r.omitido})` : `${(r.duracionMs / 1000).toFixed(1)}s`;
    console.log(fila(r.nombre, estado, duracion));
  }

  const huboFallo = resultados.some((r) => r.ok === false);
  console.log(
    huboFallo ? '\nRESULTADO: FALLA — hay pasos en rojo arriba.' : '\nRESULTADO: TODO EN VERDE.',
  );
  process.exitCode = huboFallo ? 1 : 0;
}
