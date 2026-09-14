import { useSyncExternalStore } from 'react';
// La clave de la API vive solo en este navegador. Nunca se envía a ningún sitio
// que no sea el route handler de corrección, y este la usa y la tira.
const CLAVE = 'devsparring.claveAnthropic';
const MODELO = 'devsparring.modeloCorreccion';

export type ModeloPreferido = 'estandar' | 'exhaustivo';

function almacen(): Storage | null {
  try {
    return typeof window === 'undefined' ? null : window.localStorage;
  } catch {
    return null;
  }
}

export function leerClave(): string | null {
  return almacen()?.getItem(CLAVE) ?? null;
}

export function guardarClave(clave: string): void {
  almacen()?.setItem(CLAVE, clave.trim());
}

export function olvidarClave(): void {
  almacen()?.removeItem(CLAVE);
}

export function leerModelo(): ModeloPreferido {
  const v = almacen()?.getItem(MODELO);
  return v === 'exhaustivo' ? 'exhaustivo' : 'estandar';
}

export function guardarModelo(m: ModeloPreferido): void {
  almacen()?.setItem(MODELO, m);
}

export function enmascarar(clave: string): string {
  return clave.length > 8 ? `${clave.slice(0, 7)}…${clave.slice(-4)}` : '…';
}

// Suscripción para componentes: useSyncExternalStore evita el desajuste de
// hidratación (en servidor no hay clave) y el setState dentro de un efecto.
const oyentes = new Set<() => void>();
function avisar() {
  for (const o of oyentes) o();
}
function suscribir(o: () => void) {
  oyentes.add(o);
  window.addEventListener('storage', o);
  return () => {
    oyentes.delete(o);
    window.removeEventListener('storage', o);
  };
}

export function useClaveGuardada(): string | null {
  return useSyncExternalStore(suscribir, leerClave, () => null);
}

export function useModeloPreferido(): ModeloPreferido {
  return useSyncExternalStore(suscribir, leerModelo, () => 'estandar');
}

export function guardarClaveYAvisar(clave: string): void {
  guardarClave(clave);
  avisar();
}
export function olvidarClaveYAvisar(): void {
  olvidarClave();
  avisar();
}
export function guardarModeloYAvisar(m: ModeloPreferido): void {
  guardarModelo(m);
  avisar();
}
