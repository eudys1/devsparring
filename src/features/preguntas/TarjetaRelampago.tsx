'use client';

// La tarjeta del repaso relámpago: delante, la invitación a pensar la respuesta;
// detrás, la idea en una frase. Se gira con el botón o con la barra espaciadora
// (el motor escucha el teclado). Las dos de detrás son el mazo, solo asoman.
import { RotateCcw } from 'lucide-react';
import { Atajo, Boton } from '@/components/ui/Boton';
import { enLinea } from '@/components/ui/Markdown';

export function TarjetaRelampago({
  idea,
  girada,
  onGirar,
}: {
  idea: string;
  girada: boolean;
  onGirar: () => void;
}) {
  return (
    <div>
      <div className="relative h-60 [perspective:1400px] sm:h-52">
        <div
          aria-hidden
          className="tarjeta franja-modo m-kata mazo-carta absolute inset-x-3 bottom-0 top-3"
          style={{ '--r': '-2.5deg' } as React.CSSProperties}
        />
        <div
          aria-hidden
          className="tarjeta franja-modo m-review mazo-carta absolute inset-x-1.5 bottom-1 top-1.5"
          style={{ '--r': '1.5deg' } as React.CSSProperties}
        />
        <div className="volteo absolute inset-0 bottom-3" data-lado={girada ? 'atras' : 'frente'}>
          <div className="cara tarjeta franja-modo m-verbal absolute inset-0 flex flex-col gap-2 overflow-hidden px-5 py-4">
            <p className="rotulo">Piénsala antes de girar</p>
            <p className="text-[1.125rem] font-semibold leading-snug text-tinta">
              ¿Qué dirías en una frase? Dilo en voz baja, sin mirar nada.
            </p>
            <p className="mt-auto text-[0.8125rem] text-tinta-3">
              Recordar cuesta; ese esfuerzo es lo que la fija.
            </p>
          </div>
          <div className="cara cara-atras tarjeta franja-modo m-verbal absolute inset-0 flex flex-col gap-2 overflow-hidden px-5 py-4">
            <p className="rotulo">La idea en una frase</p>
            <p
              className="prosa text-[1.0625rem] font-medium leading-snug text-tinta"
              dangerouslySetInnerHTML={{ __html: enLinea(idea) }}
            />
          </div>
        </div>
      </div>
      {/* La cara de atrás también se anuncia al lector de pantalla al girar */}
      <p className="sr-only" aria-live="polite">
        {girada ? `La idea en una frase: ${idea.replace(/`/g, '')}` : ''}
      </p>
      {!girada ? (
        <Boton
          variante="esquina"
          tamano="grande"
          data-prueba="girar"
          className="mt-3"
          onClick={onGirar}
        >
          <RotateCcw className="h-4 w-4" strokeWidth={2} aria-hidden />
          Girar
          <Atajo>espacio</Atajo>
        </Boton>
      ) : null}
    </div>
  );
}
