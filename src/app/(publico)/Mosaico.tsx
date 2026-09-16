'use client';

// Una muestra del banco: unas decenas de teselas, no las 377. Unas pocas van
// abiertas y enseñan la pregunta; el resto son cuadros que se leen al pasar por
// encima. La intensidad dice el nivel mínimo. Al lado, el bloque con las cifras
// reales por pista, que es lo que de verdad mide el banco.
import { useState } from 'react';
import { Peso } from '@/components/ui/Dato';

export type Tesela = {
  id: string;
  pista: string;
  nivel: 'junior' | 'mid' | 'senior';
  texto: string;
  abierta?: boolean;
};

const TONO: Record<Tesela['nivel'], string> = {
  junior: 'bg-esquina/30',
  mid: 'bg-esquina/60',
  senior: 'brillo bg-esquina',
};

export function Mosaico({
  teselas,
  porPista,
  total,
}: {
  teselas: Tesela[];
  porPista: [string, number][];
  total: number;
}) {
  const [activa, setActiva] = useState<Tesela | null>(null);

  return (
    <div className="grid gap-3 lg:grid-cols-[1.6fr_1fr]">
      <div className="panel p-4 sm:p-5">
        <div
          className="teselas flex flex-wrap gap-1.5"
          onMouseLeave={() => setActiva(null)}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setActiva(null);
          }}
        >
          {teselas.map((t, i) =>
            t.abierta ? (
              <article
                key={t.id}
                style={{ animationDelay: `${Math.min(i * 12, 400)}ms` }}
                className="noche flex min-h-24 basis-full flex-col justify-between rounded-r border border-[var(--noche-linea-2)] bg-[var(--noche)] p-3 sm:basis-[calc(50%-0.1875rem)] lg:basis-[calc(33.333%-0.25rem)]"
              >
                <p className="text-[0.8125rem] leading-snug text-[var(--noche-tinta)]">{t.texto}</p>
                <p className="mt-2 flex items-center justify-between gap-2">
                  <span className="rotulo">{t.pista}</span>
                  <Peso nivel={t.nivel} conNombre={false} />
                </p>
              </article>
            ) : (
              <button
                key={t.id}
                type="button"
                style={{ animationDelay: `${Math.min(i * 12, 400)}ms` }}
                onMouseEnter={() => setActiva(t)}
                onFocus={() => setActiva(t)}
                onClick={() => setActiva(t)}
                aria-label={`${t.pista}: ${t.texto}`}
                className={`block h-5 w-5 rounded-[3px] transition-transform duration-[140ms] ease-salida active:scale-[0.9] [@media(hover:hover)]:hover:scale-[1.35] ${TONO[t.nivel]}`}
              />
            ),
          )}
        </div>

        <p
          className="mt-4 min-h-[2.75rem] border-t border-[var(--noche-linea)] pt-3 text-[0.875rem] leading-snug text-[var(--noche-tinta-2)]"
          aria-live="polite"
        >
          {activa ? (
            <>
              <span className="rotulo mr-2">{activa.pista}</span>
              {activa.texto}
            </>
          ) : (
            <>
              Una muestra de {teselas.length} de las {total} preguntas. Cuanto más encendido el
              cuadro, más alto el nivel al que se pregunta. Pasa por encima para leer cualquiera.
            </>
          )}
        </p>
      </div>

      <dl className="bloque rounded-r2 px-5 py-4 sm:px-6 sm:py-5">
        {porPista.map(([nombre, n]) => (
          <div
            key={nombre}
            className="flex items-baseline justify-between gap-3 border-b border-current/15 py-2 last:border-0"
          >
            <dt className="text-[0.9375rem]">{nombre}</dt>
            <dd className="tabular cartel text-[1.5rem] leading-none">{n}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
