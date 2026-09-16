'use client';

// La vara es el estado compartido de la landing: la ronda en directo y el cara
// a cara se releen con los criterios del otro nivel. El conmutador no es una
// barra fija: vive dentro de cada pieza donde cambiar la vara cambia algo, así
// que siempre se ve qué está cambiando (tercera vuelta, docs/diseno.md).
import { createContext, useContext, useState } from 'react';

type Nivel = 'junior' | 'senior';
const Contexto = createContext<{ vara: Nivel; cambiar: (n: Nivel) => void }>({
  vara: 'junior',
  cambiar: () => {},
});

export function useVara() {
  return useContext(Contexto);
}

export function VaraProvider({ children }: { children: React.ReactNode }) {
  const [vara, cambiar] = useState<Nivel>('junior');
  return <Contexto.Provider value={{ vara, cambiar }}>{children}</Contexto.Provider>;
}

const PESOS: Record<Nivel, number> = { junior: 1, senior: 3 };

/**
 * Conmutador junior / senior. Hereda los colores de donde se pinta: sobre la
 * noche, el activo es el acento; dentro de un bloque, el activo es blanco
 * (las variables --esquina las redefine cada superficie en globals.css).
 */
export function ConmutadorVara({ etiqueta = 'Se juzga de' }: { etiqueta?: string }) {
  const { vara, cambiar } = useVara();
  return (
    <span
      role="group"
      aria-label={`${etiqueta}: junior o senior`}
      className="inline-flex shrink-0 items-center gap-0.5 rounded-full border border-current/20 bg-black/20 p-0.5"
    >
      <span className="hidden px-2.5 font-mono text-[0.625rem] uppercase tracking-[0.12em] opacity-70 sm:inline">
        {etiqueta}
      </span>
      {(['junior', 'senior'] as const).map((n) => {
        const activo = vara === n;
        return (
          <button
            key={n}
            type="button"
            onClick={() => cambiar(n)}
            aria-pressed={activo}
            className={`flex min-h-9 items-center gap-2 rounded-full px-3.5 text-[0.8125rem] transition-[transform,background-color,color,box-shadow] duration-[140ms] ease-salida active:scale-[0.97] ${
              activo
                ? 'brillo bg-esquina font-medium text-esquina-tinta'
                : 'opacity-75 hover:opacity-100'
            }`}
          >
            <span className="flex gap-[3px]" aria-hidden>
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className={`block h-2.5 w-[4px] rounded-[1px] ${
                    i < PESOS[n] ? 'bg-current' : 'bg-current/30'
                  }`}
                />
              ))}
            </span>
            {n === 'junior' ? 'Junior' : 'Senior'}
          </button>
        );
      })}
    </span>
  );
}
