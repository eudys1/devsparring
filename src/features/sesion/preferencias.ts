// Preferencias de práctica de este navegador (no de la cuenta): se recuerdan en
// localStorage y las leen componentes de cliente. Cada una es un interruptor.
import { useSyncExternalStore } from 'react';

function interruptor(llave: string) {
  const oyentes = new Set<() => void>();
  const leer = () => {
    try {
      return localStorage.getItem(llave) === '1';
    } catch {
      return false;
    }
  };
  const guardar = (activo: boolean) => {
    try {
      if (activo) localStorage.setItem(llave, '1');
      else localStorage.removeItem(llave);
    } catch {
      /* navegación privada: dura lo que la pestaña */
    }
    for (const o of oyentes) o();
  };
  const useInterruptor = () =>
    useSyncExternalStore(
      (o) => {
        oyentes.add(o);
        return () => oyentes.delete(o);
      },
      leer,
      () => false,
    );
  return { guardar, useInterruptor };
}

// "Sin decir el tema": en una entrevista nadie te avisa de qué va la pregunta
// (Educative, plan-estudio-y-banco.md, fase 2 bis). La sesión mezcla pistas y no
// enseña la pista ni el tipo hasta que respondes.
const sinTema = interruptor('devsparring.sinTema');
export const guardarSinTema = sinTema.guardar;
export const useSinTema = sinTema.useInterruptor;

// Repaso relámpago: Explicar sin escribir. Ves la pregunta, la piensas, giras la
// tarjeta y te puntúas (plan-estudio-y-banco.md, fase 2).
const relampago = interruptor('devsparring.relampago');
export const guardarRelampago = relampago.guardar;
export const useRelampago = relampago.useInterruptor;
