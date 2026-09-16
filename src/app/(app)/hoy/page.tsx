import Link from 'next/link';
import { estilosBoton } from '@/components/ui/Boton';
import { Ficha, Progreso } from '@/components/ui/Dato';
import { obtenerPerfil } from '@/features/cuenta/db';
import { cargarBanco } from '@/features/preguntas/cargar';
import { PISTAS, type Pista } from '@/features/preguntas/esquema';
import { publicadas } from '@/features/preguntas/filtrar';
import { NOMBRE_MODO, NOMBRE_PISTA } from '@/features/preguntas/nombres';
import { contarRespuestas, ultimasRespuestas } from '@/features/sesion/db';
import { idsVencidas, obtenerTarjetas } from '@/features/srs/db';
import { State } from '@/features/srs/scheduler';
import { ahora } from '@/lib/reloj';
import { supabaseServidor, usuarioActual } from '@/lib/supabase/server';

export const metadata = { title: 'Hoy' };

export default async function Hoy() {
  const usuario = (await usuarioActual())!;
  const db = await supabaseServidor();
  const [banco, perfil, vencidas, tarjetas, ultimas, total] = await Promise.all([
    cargarBanco(),
    obtenerPerfil(db, usuario.id),
    idsVencidas(db, usuario.id),
    obtenerTarjetas(db, usuario.id),
    ultimasRespuestas(db, usuario.id),
    contarRespuestas(db, usuario.id),
  ]);
  const lista = publicadas(banco);
  const porId = new Map(lista.map((p) => [p.id, p]));
  const hoy = ahora();

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

  return (
    <div className="mx-auto max-w-4xl">
      <p className="rotulo">
        {hoy.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
      </p>
      <h1 className="display mt-1 text-[2.5rem] text-tinta">
        {saludo}
        {perfil.nombre ? `, ${perfil.nombre}` : ''}
      </h1>

      {/* La esquina: qué toca ahora, con una sola acción. Es el bloque de la
          app: la cifra que manda tiene geometría, no solo dígito. */}
      <section className="bloque bloque-luna mt-6 rounded-r2 px-5 py-5 sm:px-7 sm:py-6">
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-4">
          <div className="min-w-0 flex-1">
            <p className="rotulo">{vencidas.length ? 'Toca repasar' : 'Sin repasos pendientes'}</p>
            {vencidas.length ? (
              <p className="tabular cartel mt-1 text-[clamp(3.5rem,9vw,6rem)] leading-[0.85] text-white">
                {vencidas.length}
                <span className="ml-3 text-[1rem] font-normal normal-case tracking-normal text-[var(--bloque-tinta-2)]">
                  {vencidas.length === 1 ? 'pregunta ha vuelto' : 'preguntas han vuelto'} a tocar
                </span>
              </p>
            ) : (
              <p className="mt-1 max-w-[40ch] text-[1.125rem] leading-snug">
                {total === 0
                  ? 'Empieza por una sesión de teoría rápida: cinco minutos y sabes por dónde andas.'
                  : 'Nada vencido. Buen momento para abrir una pista nueva.'}
              </p>
            )}
            {primeraVencida ? (
              <p className="mt-3 flex flex-wrap items-center gap-2 text-[0.875rem] text-[var(--bloque-tinta-2)]">
                <Ficha>{NOMBRE_PISTA[primeraVencida.pista]}</Ficha>
                <span className="line-clamp-1">{primeraVencida.texto.es}</span>
              </p>
            ) : null}
          </div>
          <Link
            href={`/practicar?modo=${arranque}`}
            className={`${estilosBoton('esquina', 'grande')} shadow-[0_12px_30px_-12px_rgb(0_0_0/0.6)]`}
          >
            {vencidas.length ? 'Repasar ahora' : 'Nueva sesión'}
          </Link>
        </div>
      </section>

      <section className="mt-8 grid grid-cols-3 gap-4 border-y border-linea py-4">
        {[
          { n: total, t: 'respuestas corregidas' },
          { n: tarjetas.size, t: `preguntas vistas de ${lista.length}` },
          { n: dominadasTotal, t: 'dominadas (vuelven en 3 semanas o más)' },
        ].map(({ n, t }) => (
          <div key={t}>
            <p className="tabular display text-[2.25rem] leading-none text-tinta">{n}</p>
            <p className="mt-1 text-[0.8125rem] leading-snug text-tinta-2">{t}</p>
          </div>
        ))}
      </section>

      {pistas.length ? (
        <section className="mt-8">
          <h2 className="text-[1.0625rem] font-semibold text-tinta">Tu estado por pista</h2>
          <p className="text-[0.875rem] text-tinta-2">
            La barra clara es lo que has visto; la azul, lo que ya no vuelve en semanas.
          </p>
          <ul className="mt-3 divide-y divide-linea border-y border-linea">
            {pistas.map(({ pista, total: n, vistas, dominadas }) => (
              <li key={pista}>
                <Link
                  href={`/pistas/${pista}`}
                  className="grid grid-cols-[8rem_1fr_3.5rem] items-center gap-3 py-2.5 pr-2 transition-[background-color] duration-[160ms] ease-salida hover:bg-papel-2"
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

      {ultimas.length ? (
        <section className="mt-8">
          <h2 className="text-[1.0625rem] font-semibold text-tinta">Últimos asaltos</h2>
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
                <li key={r.id} className="grid grid-cols-[3px_1fr_auto] items-center gap-3 py-2.5">
                  <span className={`h-8 w-[3px] rounded-[1px] ${canto}`} aria-hidden />
                  <span className="min-w-0">
                    <span className="block truncate text-[0.9375rem] text-tinta">
                      {p?.texto.es ?? r.pregunta_id}
                    </span>
                    <span className="block text-[0.75rem] text-tinta-3">
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
  );
}
