// Carga del banco desde contenido/pistas/**/*.json. Solo en servidor: lee disco,
// valida con zod y cachea en memoria del proceso. Con unas centenas de preguntas
// el banco entero cabe sin problema; si crece a miles, se vuelca a Supabase.
import 'server-only';
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { FicheroPreguntas, type Pregunta } from './esquema';

const RAIZ = path.join(process.cwd(), 'contenido', 'pistas');

let cache: Promise<Pregunta[]> | null = null;

async function leerTodo(): Promise<Pregunta[]> {
  const pistas = await readdir(RAIZ, { withFileTypes: true });
  const preguntas: Pregunta[] = [];
  const vistos = new Set<string>();
  for (const pista of pistas) {
    if (!pista.isDirectory()) continue;
    const dir = path.join(RAIZ, pista.name);
    for (const fichero of await readdir(dir)) {
      if (!fichero.endsWith('.json')) continue;
      const ruta = path.join(dir, fichero);
      const parsed = FicheroPreguntas.safeParse(JSON.parse(await readFile(ruta, 'utf8')));
      if (!parsed.success) {
        throw new Error(`Contenido inválido en ${ruta}: ${parsed.error.message}`);
      }
      for (const p of parsed.data.preguntas) {
        if (vistos.has(p.id)) throw new Error(`Id duplicado en el banco: ${p.id} (${ruta})`);
        vistos.add(p.id);
        preguntas.push(p);
      }
    }
  }
  return preguntas;
}

export function cargarBanco(): Promise<Pregunta[]> {
  // En desarrollo se relee en cada petición para ver cambios de contenido sin reiniciar.
  if (process.env.NODE_ENV !== 'production') return leerTodo();
  cache ??= leerTodo();
  return cache;
}

export async function cargarPregunta(id: string): Promise<Pregunta | undefined> {
  return (await cargarBanco()).find((p) => p.id === id);
}
