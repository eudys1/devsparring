import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';

// Los controles se ven como controles en reposo: fondo propio, borde de 1px con
// contraste suficiente y un cambio claro al enfocar. Nada depende solo del color.
const base =
  'w-full rounded-r border border-linea-fuerte bg-papel-2 px-3 text-[0.9375rem] text-tinta placeholder:text-tinta-3 transition-[border-color,background-color] duration-[160ms] ease-salida hover:border-tinta-3 focus:border-esquina disabled:opacity-50';

export function Rotulo({
  children,
  htmlFor,
  pista,
  obligatorio = false,
}: {
  children: React.ReactNode;
  htmlFor: string;
  pista?: string;
  // El asterisco es la convención que todo el mundo lee; el texto oculto es
  // para el lector de pantalla, que no lee asteriscos.
  obligatorio?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block">
      <span className="text-[0.8125rem] font-medium text-tinta">
        {children}
        {obligatorio ? (
          <>
            <span className="ml-0.5 text-mal" aria-hidden>
              *
            </span>
            <span className="sr-only"> (obligatorio)</span>
          </>
        ) : null}
      </span>
      {pista ? <span className="ml-2 text-[0.75rem] text-tinta-3">{pista}</span> : null}
    </label>
  );
}

/** Nota de pie de formulario: qué significa el asterisco. */
export function NotaObligatorio() {
  return (
    <p className="text-[0.75rem] text-tinta-3">
      <span className="text-mal" aria-hidden>
        *
      </span>{' '}
      obligatorio
    </p>
  );
}

export function Entrada({ className = '', ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${base} min-h-11 py-2 sm:min-h-10 ${className}`} />;
}

export function AreaTexto({
  className = '',
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${base} resize-y py-2.5 leading-relaxed ${className}`} />;
}

// Select nativo con chevron dibujado: sin flecha nadie sabe que se despliega.
export function Selector({ className = '', ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select
        {...props}
        className={`${base} min-h-11 appearance-none py-2 pr-9 sm:min-h-10 ${className}`}
      />
      <svg
        aria-hidden
        viewBox="0 0 16 16"
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-tinta-3"
      >
        <path d="M4 6.5l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.75" />
      </svg>
    </div>
  );
}
