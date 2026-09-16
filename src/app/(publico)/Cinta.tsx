'use client';

// Cinta de datos: las preguntas que hay ahora mismo en el banco pasando en
// bucle, como el marcador de una retransmisión. Movimiento constante, así que
// lineal e infinito; se para al pasar el ratón para poder leer una.
export function Cinta({ textos }: { textos: string[] }) {
  // Dos copias seguidas para que el bucle no tenga costura.
  const tira = [...textos, ...textos];
  return (
    <div
      className="cinta relative overflow-hidden border-y border-[var(--noche-linea)] py-2.5"
      aria-hidden
    >
      <div className="cinta-pista flex w-max gap-8">
        {tira.map((t, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-8 font-mono text-[0.8125rem] text-[var(--noche-tinta-2)]"
          >
            <span className="h-1 w-1 rounded-full bg-esquina" />
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
