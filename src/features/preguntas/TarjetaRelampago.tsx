'use client';

// La tarjeta del repaso relámpago: delante, la pregunta; detrás, la idea en una
// frase. Antes la pregunta iba encima y la tarjeta solo decía "piénsala", que
// no aportaba nada (13-10-2026). Se gira con el botón de la propia tarjeta o con
// la barra espaciadora (el motor escucha el teclado). Las dos de detrás son el
// mazo, solo asoman. Las dos caras comparten celda de rejilla: la tarjeta mide
// lo que mida la más larga y nada se corta.
import { RotateCcw } from 'lucide-react';
import { Atajo, Boton } from '@/components/ui/Boton';
import { enLinea } from '@/components/ui/Markdown';

export function TarjetaRelampago({
  pregunta,
  otraLengua,
  idea,
  girada,
  onGirar,
}: {
  /** La pregunta en el idioma de la sesión (markdown en línea). */
  pregunta: string;
  /** La misma pregunta en el otro idioma, en pequeño. */
  otraLengua?: string;
  idea: string;
  girada: boolean;
  onGirar: () => void;
}) {
  return (
    <div className="relative pb-3 pr-2 [perspective:1600px]">
      <div
        aria-hidden
        className="tarjeta franja-modo m-kata mazo-carta absolute inset-0 left-3 top-3"
        style={{ '--r': '-1.5deg' } as React.CSSProperties}
      />
      <div
        aria-hidden
        className="tarjeta franja-modo m-review mazo-carta absolute inset-0 left-1.5 top-1.5"
        style={{ '--r': '1deg' } as React.CSSProperties}
      />
      <div className="volteo relative grid" data-lado={girada ? 'atras' : 'frente'}>
        <div className="cara tarjeta franja-modo m-verbal flex min-h-64 flex-col gap-3 px-6 py-6 [grid-area:1/1] sm:px-8 sm:py-7">
          <p className="rotulo">Piénsala y dila en una frase</p>
          <h1
            className="prosa text-[1.375rem] font-semibold leading-snug text-tinta md:text-[1.625rem]"
            dangerouslySetInnerHTML={{ __html: enLinea(pregunta) }}
          />
          {otraLengua ? (
            <p
              className="prosa text-[0.875rem] text-tinta-3"
              dangerouslySetInnerHTML={{ __html: enLinea(otraLengua) }}
            />
          ) : null}
          <div className="mt-auto flex flex-wrap items-end justify-between gap-3 pt-4">
            <p className="max-w-[34ch] text-[0.8125rem] text-tinta-3">
              Sin mirar nada: recordar cuesta, y ese esfuerzo es lo que la fija.
            </p>
            {!girada ? (
              <Boton variante="esquina" tamano="grande" data-prueba="girar" onClick={onGirar}>
                <RotateCcw className="h-4 w-4" strokeWidth={2} aria-hidden />
                Girar
                <Atajo>espacio</Atajo>
              </Boton>
            ) : null}
          </div>
        </div>
        <div className="cara cara-atras tarjeta franja-modo m-verbal flex min-h-64 flex-col gap-3 px-6 py-6 [grid-area:1/1] sm:px-8 sm:py-7">
          <p className="rotulo">La idea en una frase</p>
          <p
            className="prosa text-[1.25rem] font-medium leading-snug text-tinta md:text-[1.375rem]"
            dangerouslySetInnerHTML={{ __html: enLinea(idea) }}
          />
          <p className="mt-auto pt-4 text-[0.8125rem] text-tinta-3">
            ¿Era esto lo que ibas a decir? Puntúate con 1, 2, 3 o 4.
          </p>
        </div>
      </div>
      {/* La cara de atrás también se anuncia al lector de pantalla al girar */}
      <p className="sr-only" aria-live="polite">
        {girada ? `La idea en una frase: ${idea.replace(/`/g, '')}` : ''}
      </p>
    </div>
  );
}
