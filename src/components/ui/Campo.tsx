import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react';

const base =
  'w-full rounded-r border border-linea-fuerte bg-papel-2 px-3 py-2 text-[0.9375rem] text-tinta placeholder:text-tinta-3 focus:border-tinta-3 focus:outline-none focus-visible:outline-2 focus-visible:outline-brasa';

export function Rotulo({ children, htmlFor }: { children: React.ReactNode; htmlFor: string }) {
  return (
    <label htmlFor={htmlFor} className="mb-1 block text-[0.8125rem] font-medium text-tinta-2">
      {children}
    </label>
  );
}

export function Entrada(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${base} ${props.className ?? ''}`} />;
}

export function AreaTexto(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={`${base} min-h-40 resize-y leading-relaxed ${props.className ?? ''}`}
    />
  );
}

// Select nativo con chevron dibujado: sin flecha nadie sabe que es un desplegable.
export function Selector(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="relative">
      <select {...props} className={`${base} appearance-none pr-9 ${props.className ?? ''}`} />
      <svg
        aria-hidden
        viewBox="0 0 16 16"
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-tinta-3"
      >
        <path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.75" />
      </svg>
    </div>
  );
}
