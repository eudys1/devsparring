// El informe al terminar: el acierto dibujado como una barra partida en bien,
// a medias y fallé (comparas superficies, no solo el número), qué hacer ahora y
// cada pregunta con su resultado. Lo usan la página de informe y la demo.
import Link from 'next/link';
import type { ReactNode } from 'react';
import { enLinea } from '@/components/ui/Markdown';
import type { Nivel, Pista } from '../preguntas/esquema';
import { NOMBRE_NIVEL, NOMBRE_PISTA } from '../preguntas/nombres';
import type { Informe, NotaNum, Recomendacion } from './informe';

const NOTA: Record<NotaNum, { texto: string; canto: string }> = {
  1: { texto: 'Fallé', canto: 'bg-mal' },
  2: { texto: 'A medias', canto: 'bg-aviso' },
  3: { texto: 'Bien', canto: 'bg-ok' },
  4: { texto: 'Fácil', canto: 'bg-ok' },
};

function frase(r: Recomendacion): string {
  switch (r.codigo) {
    case 'repasar_pista':
      return `Repasa ${NOMBRE_PISTA[r.pista]}: ahí se te escaparon ${r.fallos}. Abre su temario y lee las respuestas que aprueban antes de la próxima sesión.`;
    case 'bajar_nivel':
      return `Esta vara ha sido alta. Prueba una sesión a nivel ${NOMBRE_NIVEL[r.nivel].nombre} para asentar la base y vuelve a subir.`;
    case 'subir_nivel':
      return `Te ha salido casi todo. La próxima, a nivel ${NOMBRE_NIVEL[r.nivel].nombre}: te pedirán un criterio más por pregunta.`;
    case 'mismo_nivel':
      return 'Buen nivel para seguir: repite este mismo nivel hasta que te salga casi todo.';
    case 'vuelven_pronto':
      return `${r.cuantas === 1 ? 'La que no salió vuelve' : `Las ${r.cuantas} que no salieron vuelven`} en uno o dos días; las que salieron bien tardarán más. Así se fija.`;
  }
}

export type FilaInforme = {
  id: string;
  texto: string;
  pista: Pista;
  nota: NotaNum;
  puntuacion?: number | null;
};

export function InformeSesion({
  informe,
  filas,
  nivel,
  titulo,
  conEnlaces,
  acciones,
}: {
  informe: Informe;
  filas: FilaInforme[];
  nivel: Nivel;
  titulo: string;
  /** En la demo no hay temario al que enlazar: no hay cuenta. */
  conEnlaces: boolean;
  acciones: ReactNode;
}) {
  const { total, bien, aMedias, fallos, acierto } = informe;
  const ancho = (n: number) => `${total ? (n / total) * 100 : 0}%`;
  return (
    <div className="pagina">
      <p className="rotulo">Fin de la sesión · {NOMBRE_NIVEL[nivel].nombre}</p>
      <h1 className="display mt-1 text-[2.5rem] text-tinta">{titulo}</h1>

      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        <section className="bloque py-6 pl-10 pr-6" aria-labelledby="resumen-informe">
          <h2 id="resumen-informe" className="rotulo">
            Cómo ha ido
          </h2>
          <p className="mt-2 flex flex-wrap items-baseline gap-x-3">
            <span className="estampa tabular cartel text-[3.5rem] leading-none text-tinta">
              {acierto}%
            </span>
            <span className="text-[1.0625rem] text-tinta-2">
              de acierto en {total} {total === 1 ? 'pregunta' : 'preguntas'} · {informe.minutos} min
            </span>
          </p>
          {/* La forma manda: la barra se lee antes que las cifras */}
          <div
            className="barra-crece mt-5 flex h-5 max-w-xl gap-1"
            role="img"
            aria-label={`${bien} bien, ${aMedias} a medias, ${fallos} falladas`}
          >
            {bien ? (
              <span
                className="rounded-[5px] border-2 border-ink bg-ok"
                style={{ width: ancho(bien) }}
              />
            ) : null}
            {aMedias ? (
              <span
                className="rounded-[5px] border-2 border-ink bg-aviso"
                style={{ width: ancho(aMedias) }}
              />
            ) : null}
            {fallos ? (
              <span
                className="rounded-[5px] border-2 border-ink bg-mal"
                style={{ width: ancho(fallos) }}
              />
            ) : null}
          </div>
          <ul className="tabular mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[0.875rem] text-tinta-2">
            <li>
              <span className="mr-1.5 inline-block h-2.5 w-2.5 rounded-full bg-ok" aria-hidden />
              {bien} bien
            </li>
            <li>
              <span className="mr-1.5 inline-block h-2.5 w-2.5 rounded-full bg-aviso" aria-hidden />
              {aMedias} a medias
            </li>
            <li>
              <span className="mr-1.5 inline-block h-2.5 w-2.5 rounded-full bg-mal" aria-hidden />
              {fallos} falladas
            </li>
          </ul>
        </section>

        <section className="tarjeta px-6 py-6" aria-labelledby="ahora-informe">
          <h2 id="ahora-informe" className="text-[1.25rem] font-semibold text-tinta">
            Qué hacer ahora
          </h2>
          <ul className="mt-3 space-y-3">
            {informe.recomendaciones.map((r) => (
              <li
                key={r.codigo}
                className="grid grid-cols-[4px_1fr] gap-3 text-[0.9375rem] leading-snug text-tinta-2"
              >
                <span className="rounded-full bg-punto" aria-hidden />
                <span>{frase(r)}</span>
              </li>
            ))}
            {informe.recomendaciones.length === 0 ? (
              <li className="text-[0.9375rem] text-tinta-2">
                Sesión corta: haz otra para tener una idea más fiable de dónde estás.
              </li>
            ) : null}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">{acciones}</div>
        </section>
      </div>

      <section className="mt-10" aria-labelledby="preguntas-informe">
        <h2 id="preguntas-informe" className="text-[1.25rem] font-semibold text-tinta">
          Pregunta a pregunta
        </h2>
        <ul className="mt-3 divide-y divide-linea border-y border-linea">
          {filas.map((f) => (
            <li key={f.id} className="grid grid-cols-[4px_1fr_auto] items-center gap-4 py-3.5">
              <span className={`h-9 w-1 rounded-[1px] ${NOTA[f.nota].canto}`} aria-hidden />
              <span className="min-w-0">
                {conEnlaces ? (
                  <Link
                    href={`/pistas/${f.pista}#${f.id}`}
                    className="prosa block text-[0.9375rem] text-tinta underline decoration-linea-fuerte underline-offset-2 hover:decoration-tinta-3"
                    dangerouslySetInnerHTML={{ __html: enLinea(f.texto) }}
                  />
                ) : (
                  <span
                    className="prosa block text-[0.9375rem] text-tinta"
                    dangerouslySetInnerHTML={{ __html: enLinea(f.texto) }}
                  />
                )}
                <span className="block text-[0.8125rem] text-tinta-3">{NOMBRE_PISTA[f.pista]}</span>
              </span>
              <span className="text-right text-[0.875rem] text-tinta-2">
                {NOTA[f.nota].texto}
                {f.puntuacion != null ? (
                  <span className="tabular block font-mono text-[0.75rem] text-tinta-3">
                    IA {f.puntuacion}/10
                  </span>
                ) : null}
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
