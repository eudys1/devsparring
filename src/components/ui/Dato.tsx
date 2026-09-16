// Piezas que codifican un dato en la forma, no solo en el dígito. No importan
// nada de features/: las primitivas no conocen el dominio (docs/arquitectura.md).
type Nivel = 'junior' | 'mid' | 'senior';

const TONOS = {
  neutro: 'border-linea-fuerte text-tinta-2',
  esquina: 'border-esquina/50 text-esquina',
  ok: 'border-ok/45 text-ok',
  aviso: 'border-aviso/45 text-aviso',
  mal: 'border-mal/45 text-mal',
} as const;

export type Tono = keyof typeof TONOS;

/** Etiqueta de dato. Píldora pequeña en versalita monoespaciada. */
export function Ficha({
  tono = 'neutro',
  children,
  className = '',
}: {
  tono?: Tono;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 font-mono text-[0.6875rem] uppercase leading-[1.4] tracking-[0.07em] ${TONOS[tono]} ${className}`}
    >
      {children}
    </span>
  );
}

const PESO: Record<Nivel, { llenos: number; nombre: string }> = {
  junior: { llenos: 1, nombre: 'Junior' },
  mid: { llenos: 2, nombre: 'Mid' },
  senior: { llenos: 3, nombre: 'Senior' },
};

/**
 * Categoría de peso. El nivel se codifica en forma, no en color: el color es
 * el acento y no se reparte (docs/diseno.md).
 */
export function Peso({ nivel, conNombre = true }: { nivel: Nivel; conNombre?: boolean }) {
  const { llenos, nombre } = PESO[nivel];
  return (
    <span className="inline-flex items-center gap-1.5" title={`Nivel ${nombre.toLowerCase()}`}>
      <span className="flex gap-[3px]" aria-hidden>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`block h-3 w-[5px] rounded-[1px] ${i < llenos ? 'bg-tinta-2' : 'bg-linea'}`}
          />
        ))}
      </span>
      {conNombre ? (
        <span className="font-mono text-[0.6875rem] uppercase tracking-[0.07em] text-tinta-2">
          {nombre}
        </span>
      ) : (
        <span className="sr-only">{nombre}</span>
      )}
    </span>
  );
}

/**
 * Puntuación de una dimensión, marcada como en una tarjeta de juez: casillas
 * que se llenan. Se comparan superficies de un vistazo, no cifras.
 */
export function Casillas({
  valor,
  de,
  tono = 'neutro',
  anima = false,
}: {
  valor: number;
  de: number;
  tono?: Tono;
  anima?: boolean;
}) {
  const relleno =
    tono === 'ok'
      ? 'bg-ok'
      : tono === 'aviso'
        ? 'bg-aviso'
        : tono === 'mal'
          ? 'bg-mal'
          : 'bg-tinta';
  return (
    <span className="flex gap-[3px]" aria-hidden>
      {Array.from({ length: de }, (_, i) => (
        <span
          key={i}
          className={`block h-2.5 flex-1 rounded-[1px] ${i < valor ? relleno : 'bg-linea'} ${
            anima && i < valor ? 'casilla' : ''
          }`}
          style={anima && i < valor ? { animationDelay: `${i * 45}ms` } : undefined}
        />
      ))}
    </span>
  );
}

/** Barra de progreso de una pista: lo visto y, dentro, lo dominado. */
export function Progreso({
  total,
  vistas,
  dominadas,
  etiqueta,
}: {
  total: number;
  vistas: number;
  dominadas: number;
  etiqueta: string;
}) {
  const pct = (n: number) => `${total ? Math.round((n / total) * 100) : 0}%`;
  return (
    <span
      className="relative block h-2.5 overflow-hidden rounded-[1px] bg-linea"
      role="img"
      aria-label={`${etiqueta}: ${vistas} de ${total} vistas, ${dominadas} dominadas`}
    >
      <span className="absolute inset-y-0 left-0 bg-linea-fuerte" style={{ width: pct(vistas) }} />
      <span className="absolute inset-y-0 left-0 bg-esquina" style={{ width: pct(dominadas) }} />
    </span>
  );
}
