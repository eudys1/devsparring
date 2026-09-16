import type { ButtonHTMLAttributes } from 'react';

// Un enlace que parece botón NO lleva un <button> dentro: eso anida dos
// elementos interactivos y rompe el teclado. Por eso las clases se exportan
// aparte y <Link> las usa directamente.
type Variante = 'esquina' | 'normal' | 'sutil' | 'peligro';
type Tamano = 'normal' | 'grande' | 'pequeno';

const VARIANTES: Record<Variante, string> = {
  esquina:
    'bg-esquina text-esquina-tinta border-esquina shadow-[inset_0_1px_0_rgb(255_255_255/0.25)] hover:brightness-110 dark:hover:brightness-95',
  normal: 'bg-papel-2 text-tinta border-linea-fuerte hover:border-tinta-3 hover:bg-papel',
  sutil: 'bg-transparent text-tinta-2 border-transparent hover:bg-papel-2 hover:text-tinta',
  peligro: 'bg-transparent text-mal border-mal/40 hover:bg-mal-suave',
};

const TAMANOS: Record<Tamano, string> = {
  pequeno: 'min-h-9 px-3 text-[0.8125rem] gap-1.5',
  normal: 'min-h-11 px-4 text-[0.9375rem] gap-2 sm:min-h-10',
  grande: 'min-h-12 px-5 text-base gap-2.5',
};

export function estilosBoton(variante: Variante = 'normal', tamano: Tamano = 'normal'): string {
  return [
    'inline-flex select-none items-center justify-center rounded-r border font-medium leading-none',
    // Solo transform y opacidad, y solo las propiedades que cambian.
    'transition-[transform,background-color,border-color,filter] duration-[140ms] ease-salida',
    'active:scale-[0.97] disabled:pointer-events-none disabled:opacity-45',
    VARIANTES[variante],
    TAMANOS[tamano],
  ].join(' ');
}

export function Boton({
  variante = 'normal',
  tamano = 'normal',
  atajo,
  className = '',
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variante?: Variante;
  tamano?: Tamano;
  atajo?: string;
}) {
  return (
    <button type="button" className={`${estilosBoton(variante, tamano)} ${className}`} {...rest}>
      {children}
      {atajo ? <Atajo>{atajo}</Atajo> : null}
    </button>
  );
}

// La tecla se dibuja como tecla: el usuario intensivo aprende los atajos leyendo.
export function Atajo({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="ml-1 rounded-[3px] border border-current/35 px-1 py-px font-mono text-[0.6875rem] font-normal opacity-75">
      {children}
    </kbd>
  );
}
