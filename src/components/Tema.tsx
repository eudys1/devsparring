'use client';

import { Moon, Sun } from 'lucide-react';
import { useSyncExternalStore } from 'react';

// Dos temas y un interruptor. Sin opción "sistema": la primera vez se arranca
// con lo que prefiera el sistema y, en cuanto el usuario toca el interruptor,
// manda él. La preferencia se guarda en el navegador.
type Tema = 'claro' | 'oscuro';
const LLAVE = 'devsparring.tema';

// Se ejecuta antes de pintar para que no haya un destello del tema contrario.
export const GUION_TEMA = `(function(){try{var t=localStorage.getItem('${LLAVE}');if(t==='claro')document.documentElement.dataset.theme='light';else if(t==='oscuro')document.documentElement.dataset.theme='dark';}catch(e){}})()`;

const oyentes = new Set<() => void>();
function suscribir(o: () => void) {
  oyentes.add(o);
  const mq = window.matchMedia('(prefers-color-scheme: dark)');
  mq.addEventListener('change', o);
  return () => {
    oyentes.delete(o);
    mq.removeEventListener('change', o);
  };
}
function leer(): Tema {
  try {
    const v = localStorage.getItem(LLAVE);
    if (v === 'claro' || v === 'oscuro') return v;
  } catch {
    /* navegación privada */
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'oscuro' : 'claro';
}
function aplicar(t: Tema) {
  document.documentElement.dataset.theme = t === 'claro' ? 'light' : 'dark';
  try {
    localStorage.setItem(LLAVE, t);
  } catch {
    /* navegación privada: el tema dura lo que la pestaña */
  }
  for (const o of oyentes) o();
}

/**
 * Botón de tema. `icono` es un botón cuadrado con el icono del tema al que
 * cambiarías (para carriles y cabeceras); `texto` lleva además la palabra.
 */
export function Tema({
  className = '',
  variante = 'icono',
}: {
  className?: string;
  variante?: 'icono' | 'texto';
}) {
  // En el servidor no se sabe el tema: se pinta "claro" y se corrige al hidratar
  // sin destello porque el guion de arriba ya ha puesto el atributo.
  const actual = useSyncExternalStore(suscribir, leer, () => 'claro' as Tema);
  const oscuro = actual === 'oscuro';
  const Icono = oscuro ? Sun : Moon;
  const etiqueta = oscuro ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro';
  return (
    <button
      type="button"
      role="switch"
      aria-checked={oscuro}
      aria-label={etiqueta}
      title={etiqueta}
      onClick={() => aplicar(oscuro ? 'claro' : 'oscuro')}
      className={`inline-flex min-h-9 items-center justify-center gap-2 rounded-r border border-linea-fuerte bg-papel-2 text-[0.8125rem] text-tinta-2 transition-[background-color,border-color,color,transform] duration-[160ms] ease-salida hover:border-tinta-3 hover:text-tinta active:scale-[0.96] ${
        variante === 'icono' ? 'w-9' : 'px-3'
      } ${className}`}
    >
      <Icono className="h-4 w-4" strokeWidth={1.75} aria-hidden />
      {variante === 'texto' ? (oscuro ? 'Tema claro' : 'Tema oscuro') : null}
    </button>
  );
}
