// Valida todo contenido/pistas/**/*.json contra el esquema zod y comprueba ids
// únicos y coherencia pista/familia con la ruta. Es la puerta de entrada del
// banco: lo corre CI y lo corre el barrido antes de abrir una pull request.
// Uso: pnpm contenido:validar
// Node 24 ejecuta TypeScript con sintaxis borrable sin flags, por eso importa el .ts.
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { FicheroPreguntas } from '../src/features/preguntas/esquema.ts';

const RAIZ = path.resolve(import.meta.dirname, '..', 'contenido', 'pistas');

const errores = [];
const ids = new Map();
let total = 0;
let publicadas = 0;

for (const pista of await readdir(RAIZ, { withFileTypes: true })) {
  if (!pista.isDirectory()) continue;
  const dir = path.join(RAIZ, pista.name);
  for (const fichero of await readdir(dir)) {
    if (!fichero.endsWith('.json')) continue;
    const ruta = path.join(dir, fichero);
    const rel = path.relative(RAIZ, ruta);
    let json;
    try {
      json = JSON.parse(await readFile(ruta, 'utf8'));
    } catch (e) {
      errores.push(`${rel}: JSON inválido (${e.message})`);
      continue;
    }
    const r = FicheroPreguntas.safeParse(json);
    if (!r.success) {
      for (const issue of r.error.issues)
        errores.push(`${rel}: ${issue.path.join('.')}: ${issue.message}`);
      continue;
    }
    if (r.data.pista !== pista.name)
      errores.push(`${rel}: pista "${r.data.pista}" no coincide con la carpeta`);
    if (`${r.data.familia}.json` !== fichero)
      errores.push(`${rel}: familia "${r.data.familia}" no coincide con el nombre del fichero`);
    for (const p of r.data.preguntas) {
      total++;
      if (p.estado === 'publicada') publicadas++;
      if (p.pista !== r.data.pista || p.familia !== r.data.familia)
        errores.push(`${rel}: ${p.id} tiene pista/familia distinta a la del fichero`);
      if (!p.id.startsWith(prefijo(p.pista)))
        errores.push(`${rel}: ${p.id} debería empezar por "${prefijo(p.pista)}"`);
      if (ids.has(p.id)) errores.push(`${rel}: id duplicado ${p.id} (también en ${ids.get(p.id)})`);
      ids.set(p.id, rel);
    }
  }
}

function prefijo(pista) {
  return (
    {
      fundamentos: 'fund-',
      javascript: 'js-',
      typescript: 'ts-',
      react: 'react-',
      nextjs: 'next-',
      web: 'web-',
      node: 'node-',
      datos: 'datos-',
      arquitectura: 'arq-',
      devops: 'devops-',
      ia: 'ia-',
      comportamental: 'comp-',
    }[pista] ?? ''
  );
}

if (errores.length) {
  console.error(`Contenido inválido (${errores.length} problemas):`);
  for (const e of errores) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(
  `Contenido válido: ${total} preguntas (${publicadas} publicadas) en ${ids.size ? new Set([...ids.values()]).size : 0} ficheros.`,
);
