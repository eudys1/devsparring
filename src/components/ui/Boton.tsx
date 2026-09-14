import type { ButtonHTMLAttributes } from 'react';

type Variante = 'brasa' | 'normal' | 'sutil';

const CLASES: Record<Variante, string> = {
  brasa: 'bg-brasa text-brasa-tinta border-brasa hover:brightness-95 active:scale-[0.98]',
  normal: 'bg-papel-2 text-tinta border-linea-fuerte hover:border-tinta-3 active:scale-[0.98]',
  sutil: 'bg-transparent text-tinta-2 border-transparent hover:bg-papel-2 hover:text-tinta',
};

export function Boton({
  variante = 'normal',
  className = '',
  atajo,
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & { variante?: Variante; atajo?: string }) {
  return (
    <button
      className={`inline-flex items-center gap-2 rounded-r border px-3.5 py-2 text-[0.9375rem] font-medium leading-none transition-[transform,filter,border-color,background-color] duration-150 disabled:cursor-not-allowed disabled:opacity-50 ${CLASES[variante]} ${className}`}
      {...rest}
    >
      {children}
      {atajo ? (
        <kbd className="ml-1 rounded-[3px] border border-current/30 px-1 font-mono text-[0.6875rem] opacity-70">
          {atajo}
        </kbd>
      ) : null}
    </button>
  );
}
