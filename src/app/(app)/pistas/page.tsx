import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Progreso } from '@/components/ui/Dato';
import { cargarBanco } from '@/features/preguntas/cargar';
import { PISTAS, type Pista } from '@/features/preguntas/esquema';
import { publicadas } from '@/features/preguntas/filtrar';
import { NOMBRE_PISTA } from '@/features/preguntas/nombres';
import { obtenerTarjetas } from '@/features/srs/db';
import { State } from '@/features/srs/scheduler';
import { ahora } from '@/lib/reloj';
import { supabaseServidor, usuarioActual } from '@/lib/supabase/server';

export const metadata = { title: 'Temario' };

const DESCRIPCION: Record<Pista, string> = {
  fundamentos: 'POO, SOLID, patrones, testing, git, complejidad',
  javascript: 'Closures, event loop, asincronía, prototipos, coerción',
  typescript: 'Tipos, genéricos, narrowing, utility types',
  react: 'Hooks, renderizado, estado, rendimiento, testing',
  nextjs: 'App Router, server components, caché, despliegue',
  web: 'HTTP, CSS, autenticación, seguridad, rendimiento',
  node: 'Event loop en servidor, frameworks, errores, streams',
  dotnet: 'C#, ASP.NET Core, inyección de dependencias, EF Core',
  datos: 'SQL, índices, transacciones, ORMs, Supabase',
  arquitectura: 'Monolito y servicios, escalado, APIs, diseño de sistemas',
  devops: 'Docker, CI/CD, observabilidad, cloud',
  ia: 'LLM, RAG, agentes, MCP, evals, seguridad y cómo usas la IA',
  comportamental: 'STAR, screening de RRHH, preguntas en inglés',
};

export default async function Pistas() {
  const usuario = (await usuarioActual())!;
  const db = await supabaseServidor();
  const [banco, tarjetas] = await Promise.all([cargarBanco(), obtenerTarjetas(db, usuario.id)]);
  const lista = publicadas(banco);
  const ahoraMs = ahora().getTime();

  return (
    <div className="pagina">
      <p className="rotulo">Todo el banco, por temas</p>
      <h1 className="display mt-1 text-[2.5rem] text-tinta">Temario</h1>
      <p className="prosa mt-2 text-tinta-2">
        Una pista por tema. Entra en una para leer sus preguntas con la respuesta que aprueba y ver
        en qué estado tienes cada una.
      </p>

      <ul className="mt-7 divide-y divide-linea border-y border-linea">
        {PISTAS.map((pista) => {
          const preguntas = lista.filter((p) => p.pista === pista);
          if (!preguntas.length) return null;
          const vistas = preguntas.filter((p) => tarjetas.has(p.id)).length;
          const porRepasar = preguntas.filter(
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
                className="con-flecha grid gap-x-5 gap-y-2 py-4 pl-2 pr-2 transition-[background-color] duration-[160ms] ease-salida hover:bg-papel-2 sm:grid-cols-[14rem_1fr_11rem_1rem] sm:items-center"
              >
                <span>
                  <span className="block text-[1.0625rem] font-medium text-tinta">
                    {NOMBRE_PISTA[pista]}
                  </span>
                  <span className="tabular block font-mono text-[0.75rem] text-tinta-3">
                    {preguntas.length} preg. · {familias} familias
                  </span>
                </span>
                <span className="text-[0.875rem] text-tinta-2">{DESCRIPCION[pista]}</span>
                <span>
                  <Progreso
                    total={preguntas.length}
                    vistas={vistas}
                    dominadas={dominadas}
                    etiqueta={NOMBRE_PISTA[pista]}
                  />
                  <span className="tabular mt-1 block font-mono text-[0.75rem] text-tinta-3">
                    {vistas} vistas
                    {porRepasar ? (
                      <span className="text-punto"> · {porRepasar} por repasar</span>
                    ) : null}
                  </span>
                </span>
                <ChevronRight className="flecha hidden h-4 w-4 text-tinta-3 sm:block" aria-hidden />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
