import Link from 'next/link';
import { estilosBoton } from '@/components/ui/Boton';
import { Ficha, Peso, Progreso } from '@/components/ui/Dato';
import { obtenerPerfil } from '@/features/cuenta/db';
import { cargarBanco } from '@/features/preguntas/cargar';
import { MODOS, PISTAS, type Pista } from '@/features/preguntas/esquema';
import { publicadas } from '@/features/preguntas/filtrar';
import { NOMBRE_MODO, NOMBRE_PISTA } from '@/features/preguntas/nombres';
import { CANTIDAD } from '@/features/sesion/cantidad';
import {
  contarRespuestas,
  diasConRespuesta,
  sesionesAbiertas,
  ultimasRespuestas,
} from '@/features/sesion/db';
import { idsVencidas, obtenerTarjetas } from '@/features/srs/db';
import { rachaConRespiro } from '@/features/srs/racha';
import { State } from '@/features/srs/scheduler';
import { ahora } from '@/lib/reloj';
import { supabaseServidor, usuarioActual } from '@/lib/supabase/server';
import { descartarSesion } from './acciones';

export const metadata = { title: 'Inicio' };

export default async function Inicio({
  searchParams,
}: {
  searchParams: Promise<{ clave?: string }>;
}) {
  const { clave } = await searchParams;
  const usuario = (await usuarioActual())!;
  const db = await supabaseServidor();
  const [banco, perfil, vencidas, tarjetas, ultimas, total, abiertas, dias] = await Promise.all([
    cargarBanco(),
    obtenerPerfil(db, usuario.id),
    idsVencidas(db, usuario.id),
    obtenerTarjetas(db, usuario.id),
    ultimasRespuestas(db, usuario.id),
    contarRespuestas(db, usuario.id),
    sesionesAbiertas(db, usuario.id),
    diasConRespuesta(db, usuario.id),
  ]);
  const lista = publicadas(banco);
  const porId = new Map(lista.map((p) => [p.id, p]));
  const hoy = ahora();
  // Un día suelto sin práctica no rompe la racha (una vez por semana).
  const { dias: diasSeguidos, respiros } = rachaConRespiro(dias, hoy);

  const pistas = PISTAS.map((pista) => {
    const preguntas = lista.filter((p) => p.pista === pista);
    const vistas = preguntas.filter((p) => tarjetas.has(p.id)).length;
    const dominadas = preguntas.filter((p) => {
      const t = tarjetas.get(p.id);
      return t && t.state === State.Review && t.scheduled_days >= 21;
    }).length;
    return { pista, total: preguntas.length, vistas, dominadas };
  }).filter((x) => x.total > 0 && x.vistas > 0);

  const dominadasTotal = pistas.reduce((a, b) => a + b.dominadas, 0);
  const hora = hoy.getHours();
  const saludo = hora < 13 ? 'Buenos días' : hora < 20 ? 'Buenas tardes' : 'Buenas noches';
  const primeraVencida = vencidas.map((id) => porId.get(id)).find(Boolean);
  const arranque = primeraVencida?.modos[0] ?? 'flash';
  // Lo que toca, repartido por el modo en el que se repasa cada pregunta.
  const reparto = MODOS.map(
    (m) => [m, vencidas.filter((id) => porId.get(id)?.modos[0] === m).length] as const,
  ).filter(([, n]) => n > 0);

  return (
    <div className="pagina">
      <p className="rotulo">
        {hoy.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
      </p>
      <h1 className="display mt-1 text-[2.5rem] text-tinta">
        {saludo}
        {perfil.nombre ? `, ${perfil.nombre}` : ''}
      </h1>

      {clave === 'cambiada' ? (
        <p
          role="status"
          className="mt-5 rounded-r border border-ok/40 bg-ok-suave px-4 py-2.5 text-[0.9375rem] text-ok"
        >
          Contraseña cambiada. Ya estás dentro con la nueva.
        </p>
      ) : null}

      <div className="mt-8 grid items-start gap-8 xl:grid-cols-[minmax(0,1.45fr)_minmax(0,0.85fr)]">
        <div className="flex min-w-0 flex-col gap-8">
          {/* La esquina: qué toca ahora, con una sola acción. La cifra manda y el
              reparto por modos le da geometría. */}
          <section className="bloque py-6 pl-10 pr-6 sm:py-7 sm:pl-12 sm:pr-8">
            <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-5">
              <div className="min-w-[min(100%,20rem)] flex-1">
                <p className="rotulo">
                  {vencidas.length ? 'Toca repasar' : 'Sin repasos pendientes'}
                </p>
                {vencidas.length ? (
                  <p className="mt-1 text-[1.125rem] leading-snug">
                    <span className="tabular cartel mr-2 text-[3rem] leading-none text-tinta">
                      {vencidas.length}
                    </span>
                    {vencidas.length === 1 ? 'pregunta ha vuelto' : 'preguntas han vuelto'} a tocar.
                    Entran primero en la próxima sesión.
                  </p>
                ) : (
                  <p className="mt-1 max-w-[40ch] text-[1.125rem] leading-snug">
                    {total === 0
                      ? 'Empieza por una sesión de Tipo test: cinco minutos y sabes por dónde andas.'
                      : 'Nada vencido. Buen momento para abrir una pista nueva.'}
                  </p>
                )}
                {reparto.length ? (
                  <>
                    <div className="barra-crece mt-4 flex h-[18px] max-w-[30rem] gap-1" aria-hidden>
                      {reparto.map(([m, n]) => (
                        <span
                          key={m}
                          className={`m-${m} rounded-[5px] border-2 border-ink bg-[var(--c)]`}
                          style={{ flex: n }}
                        />
                      ))}
                    </div>
                    <ul className="mt-3 flex flex-wrap gap-2" aria-label="Por modo">
                      {reparto.map(([m, n]) => (
                        <li key={m} className={`chip-modo m-${m}`}>
                          {NOMBRE_MODO[m].nombre} <span className="tabular">{n}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : null}
                {primeraVencida ? (
                  <p className="mt-3 flex flex-wrap items-center gap-2 text-[0.875rem] text-tinta-2">
                    <Ficha>{NOMBRE_PISTA[primeraVencida.pista]}</Ficha>
                    <span className="line-clamp-1">
                      {primeraVencida.texto.es.replace(/`/g, '')}
                    </span>
                  </p>
                ) : null}
              </div>
              <Link
                href={`/practicar?modo=${arranque}`}
                className={estilosBoton('esquina', 'grande')}
              >
                {vencidas.length ? 'Repasar ahora' : 'Nueva sesión'}
              </Link>
            </div>
          </section>

          {/* Todas las sesiones a medias, no solo la última: lo respondido ya
              está guardado y cada una se retoma donde se dejó. Van en filas
              compactas debajo de lo que toca, para que varias no empujen la
              acción principal fuera de la pantalla. */}
          {abiertas.length ? (
            <section aria-labelledby="en-curso">
              <h2 id="en-curso" className="text-[1.125rem] font-semibold text-tinta">
                {abiertas.length === 1 ? 'Sesión en curso' : `${abiertas.length} sesiones en curso`}
              </h2>
              <ul className="tarjeta mt-3 divide-y divide-linea overflow-hidden">
                {abiertas.map((s) => {
                  const de = CANTIDAD[s.modo];
                  return (
                    <li key={s.id} className={`m-${s.modo} grid grid-cols-[5px_1fr]`}>
                      <span className="bg-[var(--c)]" aria-hidden />
                      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 px-5 py-3">
                        <div className="min-w-[min(100%,16rem)] flex-1">
                          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.9375rem] font-semibold text-tinta">
                            {NOMBRE_MODO[s.modo].nombre}
                            <Peso nivel={s.nivel} />
                            {s.pista ? <Ficha>{NOMBRE_PISTA[s.pista]}</Ficha> : null}
                          </p>
                          <p className="tabular mt-0.5 text-[0.8125rem] text-tinta-2">
                            {s.respondidas} de {de} · empezada el{' '}
                            {new Date(s.iniciada_en).toLocaleDateString('es-ES', {
                              weekday: 'long',
                              day: 'numeric',
                            })}
                          </p>
                        </div>
                        <div
                          className="h-1.5 w-24 overflow-hidden rounded-full bg-linea"
                          role="img"
                          aria-label={`${s.respondidas} de ${de} respondidas`}
                        >
                          <div
                            className="barra-crece h-full rounded-full bg-[var(--c)]"
                            style={{ width: `${Math.min(100, (s.respondidas / de) * 100)}%` }}
                          />
                        </div>
                        <div className="flex items-center gap-2">
                          <form action={descartarSesion}>
                            <input type="hidden" name="sesionId" value={s.id} />
                            <button
                              type="submit"
                              className={estilosBoton('sutil', 'pequeno')}
                              aria-label={`Descartar la sesión de ${NOMBRE_MODO[s.modo].nombre}`}
                            >
                              Descartar
                            </button>
                          </form>
                          <Link
                            href={`/practicar/${s.id}`}
                            className={estilosBoton('normal', 'pequeno')}
                          >
                            Continuar
                          </Link>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          ) : null}

          {ultimas.length ? (
            <section aria-labelledby="ultimos">
              <h2 id="ultimos" className="text-[1.125rem] font-semibold text-tinta">
                Últimos asaltos
              </h2>
              <ul className="mt-3 divide-y divide-linea border-y border-linea">
                {ultimas.map((r) => {
                  const p = porId.get(r.pregunta_id);
                  const canto =
                    r.puntuacion === null
                      ? 'bg-linea'
                      : r.puntuacion >= 7
                        ? 'bg-ok'
                        : r.puntuacion >= 4
                          ? 'bg-aviso'
                          : 'bg-mal';
                  return (
                    <li
                      key={r.id}
                      className="grid grid-cols-[3px_1fr_auto] items-center gap-4 py-3"
                    >
                      <span className={`h-9 w-[3px] rounded-[1px] ${canto}`} aria-hidden />
                      <span className="min-w-0">
                        {p ? (
                          <Link
                            href={`/pistas/${p.pista}#${p.id}`}
                            className="block truncate text-[0.9375rem] text-tinta underline decoration-linea-fuerte underline-offset-2 hover:decoration-tinta-3"
                          >
                            {p.texto.es.replace(/`/g, '')}
                          </Link>
                        ) : (
                          <span className="block truncate text-[0.9375rem] text-tinta">
                            {r.pregunta_id}
                          </span>
                        )}
                        <span className="block text-[0.8125rem] text-tinta-3">
                          {NOMBRE_MODO[r.modo].nombre} ·{' '}
                          {new Date(r.creada_en).toLocaleDateString('es-ES')}
                        </span>
                      </span>
                      <span className="tabular pr-1 font-mono text-[0.875rem] text-tinta-2">
                        {r.puntuacion ?? '·'}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </section>
          ) : null}
        </div>

        <aside className="flex min-w-0 flex-col gap-8">
          <section className="tarjeta grid grid-cols-2 gap-x-6 gap-y-6 px-6 py-6">
            {[
              {
                n: diasSeguidos,
                t:
                  diasSeguidos === 1
                    ? 'día seguido practicando'
                    : diasSeguidos === 0
                      ? 'días seguidos: hoy se empieza'
                      : 'días seguidos practicando',
                nota: respiros
                  ? 'Contando un día de respiro: se te escapó uno y no rompe la racha.'
                  : undefined,
              },
              { n: total, t: 'respuestas corregidas' },
              { n: tarjetas.size, t: `preguntas vistas de ${lista.length}` },
              { n: dominadasTotal, t: 'dominadas (vuelven en 3 semanas o más)' },
            ].map(({ n, t, nota }: { n: number; t: string; nota?: string }) => (
              <div key={t}>
                <p className="tabular display text-[2.25rem] leading-none text-tinta">{n}</p>
                <p className="mt-1.5 text-[0.875rem] leading-snug text-tinta-2">{t}</p>
                {nota ? (
                  <p className="mt-1 text-[0.75rem] leading-snug text-tinta-3">{nota}</p>
                ) : null}
              </div>
            ))}
          </section>

          {pistas.length ? (
            <section aria-labelledby="por-pista">
              <h2 id="por-pista" className="text-[1.125rem] font-semibold text-tinta">
                Tu estado por pista
              </h2>
              <p className="mt-0.5 text-[0.875rem] text-tinta-2">
                La barra clara es lo que has visto; la azul, lo que ya no vuelve en semanas.
              </p>
              <ul className="mt-3 divide-y divide-linea border-y border-linea">
                {pistas.map(({ pista, total: n, vistas, dominadas }) => (
                  <li key={pista}>
                    <Link
                      href={`/pistas/${pista}`}
                      className="grid grid-cols-[7.5rem_1fr_3.5rem] items-center gap-3 py-3 pr-2 transition-[background-color] duration-[160ms] ease-salida hover:bg-papel-2"
                    >
                      <span className="truncate text-[0.9375rem] text-tinta">
                        {NOMBRE_PISTA[pista as Pista]}
                      </span>
                      <Progreso
                        total={n}
                        vistas={vistas}
                        dominadas={dominadas}
                        etiqueta={NOMBRE_PISTA[pista as Pista]}
                      />
                      <span className="tabular text-right font-mono text-[0.75rem] text-tinta-3">
                        {vistas}/{n}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </aside>
      </div>
    </div>
  );
}
