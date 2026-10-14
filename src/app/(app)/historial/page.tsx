import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { estilosBoton } from '@/components/ui/Boton';
import { Ficha, Peso } from '@/components/ui/Dato';
import { cargarBanco } from '@/features/preguntas/cargar';
import { NOMBRE_MODO, NOMBRE_PISTA } from '@/features/preguntas/nombres';
import { sesionesTerminadas } from '@/features/sesion/db';
import { construirInforme } from '@/features/sesion/informe';
import { supabaseServidor, usuarioActual } from '@/lib/supabase/server';

export const metadata = { title: 'Historial' };

// Cada sesión terminada con su informe. No se guarda un informe aparte: se
// rehace con las respuestas guardadas, así que nunca se desfasa.
export default async function Historial() {
  const usuario = (await usuarioActual())!;
  const db = await supabaseServidor();
  const [sesiones, banco] = await Promise.all([sesionesTerminadas(db, usuario.id), cargarBanco()]);
  const pistaDe = new Map(banco.map((p) => [p.id, p.pista]));
  const filas = sesiones
    .map((s) => ({
      s,
      informe: construirInforme(
        s.notas.flatMap((n) => {
          const pista = pistaDe.get(n.pregunta_id);
          return pista ? [{ preguntaId: n.pregunta_id, pista, nota: n.nota }] : [];
        }),
        s.nivel,
      ),
    }))
    .filter((f) => f.informe.total > 0);

  return (
    <div className="pagina">
      <p className="rotulo">Tus sesiones</p>
      <h1 className="display mt-1 text-[2.5rem] text-tinta">Historial</h1>
      <p className="prosa mt-2 text-tinta-2">
        Cada sesión que terminas, con su informe. Entra en una para ver qué fallaste y qué te tocaba
        hacer después.
      </p>

      {filas.length === 0 ? (
        <div className="tarjeta mt-7 flex flex-wrap items-center justify-between gap-4 px-6 py-5">
          <p className="max-w-[48ch] text-[0.9375rem] text-tinta-2">
            Todavía no has terminado ninguna sesión. Cuando acabes la primera, su informe se queda
            aquí.
          </p>
          <Link href="/practicar" className={estilosBoton('esquina')}>
            Empezar una sesión
          </Link>
        </div>
      ) : (
        <ul className="mt-7 divide-y divide-linea border-y border-linea">
          {filas.map(({ s, informe }) => {
            const ancho = (n: number) => `${(n / informe.total) * 100}%`;
            return (
              <li key={s.id}>
                <Link
                  href={`/practicar/${s.id}/informe`}
                  className="con-flecha grid items-center gap-x-5 gap-y-2 py-4 pl-2 pr-2 transition-[background-color] duration-[160ms] ease-salida hover:bg-papel-2 sm:grid-cols-[8.5rem_1fr_12rem_3.5rem_1rem]"
                >
                  <span className="tabular text-[0.875rem] text-tinta-2">
                    {new Date(s.terminada_en ?? s.iniciada_en).toLocaleDateString('es-ES', {
                      weekday: 'short',
                      day: 'numeric',
                      month: 'short',
                    })}
                  </span>
                  <span className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1">
                    <span className={`chip-modo m-${s.modo}`}>{NOMBRE_MODO[s.modo].nombre}</span>
                    <Peso nivel={s.nivel} />
                    {s.pista ? <Ficha>{NOMBRE_PISTA[s.pista]}</Ficha> : null}
                    <span className="text-[0.8125rem] text-tinta-3">
                      {informe.total} {informe.total === 1 ? 'pregunta' : 'preguntas'}
                    </span>
                  </span>
                  {/* El resultado en la forma: la misma barra partida del informe */}
                  <span
                    className="flex h-3.5 gap-0.5"
                    role="img"
                    aria-label={`${informe.bien} bien, ${informe.aMedias} a medias, ${informe.fallos} falladas`}
                  >
                    {informe.bien ? (
                      <span
                        className="rounded-[3px] bg-ok"
                        style={{ width: ancho(informe.bien) }}
                      />
                    ) : null}
                    {informe.aMedias ? (
                      <span
                        className="rounded-[3px] bg-aviso"
                        style={{ width: ancho(informe.aMedias) }}
                      />
                    ) : null}
                    {informe.fallos ? (
                      <span
                        className="rounded-[3px] bg-mal"
                        style={{ width: ancho(informe.fallos) }}
                      />
                    ) : null}
                  </span>
                  <span className="tabular font-mono text-[0.875rem] text-tinta sm:text-right">
                    {informe.acierto}%
                  </span>
                  <ChevronRight
                    className="flecha hidden h-4 w-4 text-tinta-3 sm:block"
                    aria-hidden
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
