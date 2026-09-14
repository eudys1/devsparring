import Link from 'next/link';
import { Boton } from '@/components/ui/Boton';
import { Etiqueta } from '@/components/ui/Etiqueta';
import { obtenerPerfil } from '@/features/cuenta/db';
import { cargarBanco } from '@/features/preguntas/cargar';
import { PISTAS, type Pista } from '@/features/preguntas/esquema';
import { publicadas } from '@/features/preguntas/filtrar';
import { NOMBRE_MODO, NOMBRE_PISTA } from '@/features/preguntas/nombres';
import { contarRespuestas, ultimasRespuestas } from '@/features/sesion/db';
import { idsVencidas, obtenerTarjetas } from '@/features/srs/db';
import { State } from '@/features/srs/scheduler';
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

  const pistas = PISTAS.map((pista) => {
    const preguntas = lista.filter((p) => p.pista === pista);
    const vistas = preguntas.filter((p) => tarjetas.has(p.id)).length;
    const dominadas = preguntas.filter((p) => {
      const t = tarjetas.get(p.id);
      return t && t.state === State.Review && t.scheduled_days >= 21;
    }).length;
    return { pista, total: preguntas.length, vistas, dominadas };
  }).filter((x) => x.total > 0);

  const hora = new Date().getHours();
  const saludo = hora < 13 ? 'Buenos días' : hora < 20 ? 'Buenas tardes' : 'Buenas noches';

  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-tinta-3">
            {new Date().toLocaleDateString('es-ES', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
            })}
          </p>
          <h1 className="mt-1 text-2xl font-semibold">
            {saludo}
            {perfil.nombre ? `, ${perfil.nombre}` : ''}.
          </h1>
        </div>
        <Link href="/practicar">
          <Boton variante="brasa">Nueva sesión</Boton>
        </Link>
      </div>

      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        <Dato
          etiqueta="Pendientes de repaso"
          valor={vencidas.length}
          nota={vencidas.length ? 'van primero en la próxima sesión' : 'nada vencido hoy'}
          destacado={vencidas.length > 0}
        />
        <Dato etiqueta="Respuestas corregidas" valor={total} nota="en total" />
        <Dato
          etiqueta="Preguntas vistas"
          valor={tarjetas.size}
          nota={`de ${lista.length} en el banco`}
        />
      </section>

      {vencidas.length ? (
        <section className="mt-8 rounded-r border border-brasa/40 bg-brasa-suave/40 p-4">
          <h2 className="font-semibold">Toca repasar</h2>
          <ul className="mt-2 space-y-1 text-[0.9375rem]">
            {vencidas.slice(0, 5).map((id) => {
              const p = porId.get(id);
              return p ? (
                <li key={id} className="flex items-center gap-2">
                  <Etiqueta>{NOMBRE_PISTA[p.pista]}</Etiqueta>
                  <span className="truncate">{p.texto.es}</span>
                </li>
              ) : null;
            })}
          </ul>
          <Link
            href={`/practicar?modo=${porId.get(vencidas[0] ?? '')?.modos[0] ?? 'flash'}`}
            className="mt-3 inline-block"
          >
            <Boton variante="normal">Repasar ahora</Boton>
          </Link>
        </section>
      ) : null}

      <section className="mt-10">
        <h2 className="font-semibold">Pistas</h2>
        <p className="text-[0.875rem] text-tinta-2">
          Cada banda es una pista: lo vista se rellena, lo dominado se pinta en brasa.
        </p>
        <ul className="mt-3 divide-y divide-linea rounded-r border border-linea bg-papel">
          {pistas.map(({ pista, total, vistas, dominadas }) => (
            <li key={pista}>
              <Link
                href={`/pistas/${pista}`}
                className="grid grid-cols-[120px_1fr_56px] items-center gap-3 px-4 py-2.5 hover:bg-papel-2"
              >
                <span className="truncate text-[0.9375rem]">{NOMBRE_PISTA[pista as Pista]}</span>
                <span className="relative h-2.5 overflow-hidden rounded-[2px] bg-linea">
                  <span
                    className="absolute inset-y-0 left-0 bg-tinta-3/50"
                    style={{ width: `${(vistas / total) * 100}%` }}
                  />
                  <span
                    className="absolute inset-y-0 left-0 bg-brasa"
                    style={{ width: `${(dominadas / total) * 100}%` }}
                  />
                </span>
                <span className="tabular text-right font-mono text-[0.75rem] text-tinta-3">
                  {vistas}/{total}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {ultimas.length ? (
        <section className="mt-10">
          <h2 className="font-semibold">Últimas respuestas</h2>
          <ul className="mt-3 divide-y divide-linea rounded-r border border-linea bg-papel">
            {ultimas.map((r) => {
              const p = porId.get(r.pregunta_id);
              const tono =
                r.puntuacion === null
                  ? 'neutro'
                  : r.puntuacion >= 7
                    ? 'ok'
                    : r.puntuacion >= 4
                      ? 'aviso'
                      : 'mal';
              return (
                <li
                  key={r.id}
                  className="grid grid-cols-[3px_1fr_auto] items-center gap-3 py-2.5 pr-4"
                >
                  <span
                    className={`h-full w-[3px] ${tono === 'ok' ? 'bg-ok' : tono === 'aviso' ? 'bg-aviso' : tono === 'mal' ? 'bg-mal' : 'bg-linea'}`}
                    aria-hidden
                  />
                  <span className="min-w-0">
                    <span className="block truncate text-[0.9375rem]">
                      {p?.texto.es ?? r.pregunta_id}
                    </span>
                    <span className="block text-[0.75rem] text-tinta-3">
                      {NOMBRE_MODO[r.modo].nombre} ·{' '}
                      {new Date(r.creada_en).toLocaleDateString('es-ES')}
                    </span>
                  </span>
                  <span className="tabular font-mono text-[0.875rem]">{r.puntuacion ?? '·'}</span>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}
    </div>
  );
}

function Dato({
  etiqueta,
  valor,
  nota,
  destacado = false,
}: {
  etiqueta: string;
  valor: number;
  nota: string;
  destacado?: boolean;
}) {
  return (
    <div
      className={`rounded-r border bg-papel px-4 py-3 ${destacado ? 'border-brasa' : 'border-linea'}`}
    >
      <p className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-tinta-3">
        {etiqueta}
      </p>
      <p
        className={`tabular mt-1 font-display text-3xl font-semibold ${destacado ? 'text-brasa' : ''}`}
      >
        {valor}
      </p>
      <p className="text-[0.8125rem] text-tinta-2">{nota}</p>
    </div>
  );
}
