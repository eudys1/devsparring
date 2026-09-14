import Link from 'next/link';
import { cargarBanco } from '@/features/preguntas/cargar';
import { PISTAS } from '@/features/preguntas/esquema';
import { publicadas } from '@/features/preguntas/filtrar';
import { NOMBRE_PISTA } from '@/features/preguntas/nombres';
import { obtenerTarjetas } from '@/features/srs/db';
import { State } from '@/features/srs/scheduler';
import { ahora } from '@/lib/reloj';
import { supabaseServidor, usuarioActual } from '@/lib/supabase/server';

export const metadata = { title: 'Pistas' };

const DESCRIPCION: Record<string, string> = {
  fundamentos: 'POO, SOLID, patrones, testing, git, complejidad.',
  javascript: 'Closures, event loop, asincronía, prototipos, coerción.',
  typescript: 'Tipos, genéricos, narrowing, utility types.',
  react: 'Hooks, renderizado, estado, rendimiento, testing.',
  nextjs: 'App Router, server components, caché, despliegue.',
  web: 'HTTP, CSS, autenticación, seguridad, rendimiento.',
  node: 'Event loop en servidor, frameworks, errores, streams.',
  datos: 'SQL, índices, transacciones, ORMs, Supabase.',
  arquitectura: 'Monolito y servicios, escalado, APIs, diseño de sistemas.',
  devops: 'Docker, CI/CD, observabilidad, cloud.',
  ia: 'LLM, RAG, agentes, MCP, evals, seguridad, cómo usas la IA.',
  comportamental: 'STAR, screening de RRHH, preguntas en inglés.',
};

export default async function Pistas() {
  const usuario = (await usuarioActual())!;
  const db = await supabaseServidor();
  const [banco, tarjetas] = await Promise.all([cargarBanco(), obtenerTarjetas(db, usuario.id)]);
  const lista = publicadas(banco);
  const ahoraMs = ahora().getTime();

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-2xl font-semibold">Pistas</h1>
      <p className="mt-1 text-tinta-2">
        Cada pista es un tema de entrevista. Entra para ver sus preguntas y tu estado en cada una.
      </p>
      <ul className="mt-6 divide-y divide-linea rounded-r border border-linea bg-papel">
        {PISTAS.map((pista) => {
          const preguntas = lista.filter((p) => p.pista === pista);
          if (!preguntas.length) return null;
          const vistas = preguntas.filter((p) => tarjetas.has(p.id)).length;
          const vencidas = preguntas.filter(
            (p) => (tarjetas.get(p.id)?.due.getTime() ?? Infinity) <= ahoraMs,
          ).length;
          const dominadas = preguntas.filter((p) => {
            const t = tarjetas.get(p.id);
            return t && t.state === State.Review && t.scheduled_days >= 21;
          }).length;
          const familias = new Set(preguntas.map((p) => p.familia)).size;
          return (
            <li key={pista}>
              <Link
                href={`/pistas/${pista}`}
                className="grid gap-x-4 gap-y-1 px-4 py-3 hover:bg-papel-2 sm:grid-cols-[160px_1fr_auto] sm:items-center"
              >
                <span className="font-medium">{NOMBRE_PISTA[pista]}</span>
                <span className="text-[0.875rem] text-tinta-2">{DESCRIPCION[pista]}</span>
                <span className="tabular font-mono text-[0.75rem] text-tinta-3">
                  {preguntas.length} preg. · {familias} fam. · {vistas} vistas · {dominadas}{' '}
                  dominadas
                  {vencidas ? <span className="text-brasa"> · {vencidas} por repasar</span> : null}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
