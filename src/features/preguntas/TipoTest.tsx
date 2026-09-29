'use client';

// Tipo test: eliges una de cuatro y al momento ves por qué vale o no CADA una,
// también las que no elegiste. Sin eso el modo enseñaría el error
// (plan-estudio-y-banco.md, fase 1). Se responde con el ratón o con A-D / 1-4;
// el motor escucha el teclado.
import { enLinea } from '@/components/ui/Markdown';
import type { Test } from './esquema';

const LETRAS = ['A', 'B', 'C', 'D'] as const;

export function TipoTest({
  test,
  elegida,
  onElegir,
}: {
  test: Test;
  elegida: number | null;
  onElegir: (i: number) => void;
}) {
  const respondida = elegida !== null;
  return (
    <div>
      <p className="rotulo mb-2">
        {respondida ? 'Por qué vale o no cada una' : 'Elige una · A a D'}
      </p>
      <ol className="grid gap-2.5">
        {test.opciones.map((o, i) => {
          const correcta = i === test.correcta;
          const estado = !respondida ? 'libre' : correcta ? 'ok' : i === elegida ? 'mal' : 'resto';
          const contenido = (
            <>
              <span
                className={`grid h-7 w-7 shrink-0 place-items-center rounded-[7px] border-2 font-mono text-[0.8125rem] font-semibold ${
                  estado === 'ok'
                    ? 'border-ok bg-ok text-papel'
                    : estado === 'mal'
                      ? 'border-mal bg-mal text-papel'
                      : 'border-current'
                }`}
                aria-hidden
              >
                {LETRAS[i]}
              </span>
              <span className="min-w-0 pt-0.5">
                <span
                  className="prosa block text-[0.9375rem] font-medium leading-snug text-tinta"
                  dangerouslySetInnerHTML={{ __html: enLinea(o.texto) }}
                />
                {respondida ? (
                  <span className="mt-1 block text-[0.875rem] leading-snug text-tinta-2">
                    {correcta ? <strong className="text-ok">Correcta. </strong> : null}
                    <span
                      className="prosa"
                      dangerouslySetInnerHTML={{ __html: enLinea(o.porque) }}
                    />
                  </span>
                ) : null}
              </span>
            </>
          );
          const base =
            'flex w-full items-start gap-3 rounded-[10px] border-2 px-3.5 py-3 text-left';
          return (
            <li key={i}>
              {respondida ? (
                <div
                  data-prueba={`opcion-${i}`}
                  data-estado={estado}
                  className={`${base} ${
                    estado === 'ok'
                      ? 'border-ok bg-ok-suave'
                      : estado === 'mal'
                        ? 'border-mal bg-mal-suave'
                        : 'border-linea-fuerte bg-papel-2'
                  }`}
                >
                  <span className="sr-only">
                    {correcta ? 'Correcta: ' : i === elegida ? 'Tu elección, incorrecta: ' : ''}
                  </span>
                  {contenido}
                </div>
              ) : (
                <button
                  type="button"
                  data-prueba={`opcion-${i}`}
                  onClick={() => onElegir(i)}
                  className={`${base} border-ink bg-papel-2 text-tinta shadow-[var(--dura)] transition-[transform,box-shadow] duration-[140ms] ease-salida active:translate-x-[3px] active:translate-y-[3px] active:shadow-none [@media(hover:hover)]:hover:-translate-x-px [@media(hover:hover)]:hover:-translate-y-px [@media(hover:hover)]:hover:shadow-[var(--dura-h)]`}
                >
                  {contenido}
                </button>
              )}
            </li>
          );
        })}
      </ol>
      <p className="mt-3 min-h-6 text-[0.9375rem] font-semibold text-tinta" aria-live="polite">
        {!respondida
          ? ''
          : elegida === test.correcta
            ? 'Correcto. Lee también por qué fallan las otras.'
            : `Elegiste la ${LETRAS[elegida]}. La correcta es la ${LETRAS[test.correcta]}.`}
      </p>
    </div>
  );
}
