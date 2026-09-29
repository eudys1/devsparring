'use client';

import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import { useSyncExternalStore } from 'react';
import { LLAVE_CARRIL as LLAVE } from './guiones';

// El carril se usa ancho (iconos y nombres) o compacto (solo iconos). Lo elige
// cada usuario y se recuerda en su navegador. El atributo va en <html> y lo
// escribe el guion de cabecera (guiones.ts) antes de pintar.
type Carril = 'ancho' | 'compacto';

const oyentes = new Set<() => void>();
function suscribir(o: () => void) {
  oyentes.add(o);
  return () => oyentes.delete(o);
}
function leer(): Carril {
  return document.documentElement.dataset.carril === 'compacto' ? 'compacto' : 'ancho';
}
function aplicar(c: Carril) {
  if (c === 'compacto') document.documentElement.dataset.carril = 'compacto';
  else delete document.documentElement.dataset.carril;
  try {
    localStorage.setItem(LLAVE, c);
  } catch {
    /* navegación privada: dura lo que la pestaña */
  }
  for (const o of oyentes) o();
}

export function PlegarCarril() {
  const actual = useSyncExternalStore(suscribir, leer, () => 'ancho' as Carril);
  const compacto = actual === 'compacto';
  const Icono = compacto ? PanelLeftOpen : PanelLeftClose;
  const etiqueta = compacto ? 'Ensanchar el menú' : 'Compactar el menú';
  return (
    <button
      type="button"
      aria-label={etiqueta}
      title={etiqueta}
      aria-pressed={compacto}
      onClick={() => aplicar(compacto ? 'ancho' : 'compacto')}
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-r text-[var(--carril-tinta-2)] transition-[background-color,color,transform] duration-[160ms] ease-salida hover:bg-[var(--esquina-suave)] hover:text-[var(--carril-tinta)] active:scale-[0.96]"
    >
      <Icono className="h-4 w-4" strokeWidth={1.75} aria-hidden />
    </button>
  );
}
