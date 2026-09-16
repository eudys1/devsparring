'use client';

import { Monitor, Moon, Sun } from 'lucide-react';
import { useSyncExternalStore } from 'react';

// El toggle del usuario manda sobre prefers-color-scheme. 'sistema' es un
// estado de verdad, no la ausencia de elección: por eso son tres opciones.
type Tema = 'claro' | 'oscuro' | 'sistema';
const LLAVE = 'devsparring.tema';

// Se ejecuta antes de pintar para que no haya un destello del tema contrario.
export const GUION_TEMA = `(function(){try{var t=localStorage.getItem('${LLAVE}');if(t==='claro')document.documentElement.dataset.theme='light';else if(t==='oscuro')document.documentElement.dataset.theme='dark';}catch(e){}})()`;

const oyentes = new Set<() => void>();
function suscribir(o: () => void) {
  oyentes.add(o);
  return () => oyentes.delete(o);
}
function leer(): Tema {
  try {
    const v = localStorage.getItem(LLAVE);
    return v === 'claro' || v === 'oscuro' ? v : 'sistema';
  } catch {
    return 'sistema';
  }
}
function aplicar(t: Tema) {
  const raiz = document.documentElement;
  if (t === 'sistema') delete raiz.dataset.theme;
  else raiz.dataset.theme = t === 'claro' ? 'light' : 'dark';
  try {
    if (t === 'sistema') localStorage.removeItem(LLAVE);
    else localStorage.setItem(LLAVE, t);
  } catch {
    /* navegación privada: el tema dura lo que la pestaña */
  }
  for (const o of oyentes) o();
}

const OPCIONES: { valor: Tema; icono: typeof Sun; nombre: string }[] = [
  { valor: 'claro', icono: Sun, nombre: 'Claro' },
  { valor: 'oscuro', icono: Moon, nombre: 'Oscuro' },
  { valor: 'sistema', icono: Monitor, nombre: 'Sistema' },
];

export function Tema({ className = '' }: { className?: string }) {
  const actual = useSyncExternalStore(suscribir, leer, () => 'sistema' as Tema);
  return (
    <div
      className={`inline-flex rounded-r border border-linea p-0.5 ${className}`}
      role="group"
      aria-label="Tema"
    >
      {OPCIONES.map(({ valor, icono: Icono, nombre }) => {
        const activo = actual === valor;
        return (
          <button
            key={valor}
            type="button"
            onClick={() => aplicar(valor)}
            aria-pressed={activo}
            title={nombre}
            className={`grid h-7 w-8 place-items-center rounded-[2px] transition-[transform,background-color,color] duration-[140ms] ease-salida active:scale-[0.94] ${
              activo ? 'bg-esquina text-esquina-tinta' : 'text-tinta-3 hover:text-tinta'
            }`}
          >
            <Icono className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
            <span className="sr-only">{nombre}</span>
          </button>
        );
      })}
    </div>
  );
}
