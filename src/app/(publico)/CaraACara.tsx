'use client';

// Cara a cara: la misma pregunta con las dos varas enfrentadas. La columna que
// juzga ahora es un bloque de azul tinta; la otra, un panel apagado. Lo que
// solo se le exige al senior se enciende con un barrido en vez de aparecer de
// golpe. El conmutador está en la cabecera de la sección, no en una barra fija.
import { enLinea } from '@/components/ui/Markdown';
import type { Tesis } from '@/features/preguntas/tesis';
import { useVara } from './Vara';

export function CaraACara({ preguntas }: { preguntas: Tesis[] }) {
  const { vara } = useVara();
  const p = preguntas[0];
  if (!p) return null;

  return (
    <div>
      <p
        className="text-[1.0625rem] font-medium leading-snug text-[var(--noche-tinta)] sm:text-[1.25rem]"
        dangerouslySetInnerHTML={{ __html: enLinea(p.texto) }}
      />
      <div className="mt-5 grid gap-3 md:grid-cols-2 md:items-start">
        {(['junior', 'senior'] as const).map((n) => {
          const activa = vara === n;
          const criterios = n === 'junior' ? p.junior : p.senior;
          return (
            <section
              key={n}
              aria-current={activa ? 'true' : undefined}
              className={`rounded-r2 px-5 py-6 transition-[opacity,transform] duration-[260ms] ease-salida sm:px-7 sm:py-7 ${
                activa ? 'bloque' : 'panel opacity-60'
              }`}
            >
              <header className="flex items-baseline justify-between gap-3">
                <h3 className="cartel text-[clamp(2rem,5vw,3rem)]">
                  {n === 'junior' ? 'Junior' : 'Senior'}
                </h3>
                <span className="tabular font-mono text-[0.75rem] opacity-70">
                  {criterios.length} criterios
                </span>
              </header>

              <ol className="mt-4 divide-y divide-current/10">
                {criterios.map((c, i) => {
                  const soloSenior = n === 'senior' && i >= p.junior.length;
                  return (
                    <li
                      key={i}
                      className="grid grid-cols-[1.5rem_1fr] gap-2 py-2 text-[0.9375rem] leading-snug"
                    >
                      <span
                        className={`tabular font-mono text-[0.75rem] ${
                          soloSenior ? 'font-medium' : 'opacity-50'
                        }`}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={`${soloSenior ? '' : 'opacity-80'} ${
                          activa && soloSenior ? 'barrido' : ''
                        }`}
                        dangerouslySetInnerHTML={{ __html: enLinea(c) }}
                      />
                    </li>
                  );
                })}
              </ol>

              <p className="mt-5 border-t border-current/15 pt-4 text-[0.8125rem] opacity-80">
                {n === 'senior'
                  ? 'Del tercero en adelante es lo que solo se le exige al senior. Misma pregunta, misma respuesta, otra nota.'
                  : 'Con esto apruebas de junior. Con lo mismo, de senior te quedas corto.'}
              </p>
            </section>
          );
        })}
      </div>
    </div>
  );
}
