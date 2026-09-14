// Ejecuta los casos de prueba de una kata contra la función del usuario. Pura:
// recibe la función ya evaluada y los casos, devuelve resultados serializables.
// Corre dentro del Web Worker (ver worker.ts) y también en Node para los tests.
import { iguales, mostrar } from './igualdad';

export type Caso = {
  nombre: string;
  entrada: unknown[];
  esperado?: unknown;
  lanza?: string;
};

export type ResultadoCaso = {
  nombre: string;
  ok: boolean;
  esperado: string;
  recibido: string;
  ms: number;
};

export type ResultadoEjecucion = {
  ok: boolean;
  casos: ResultadoCaso[];
  consola: string[];
  error?: string;
};

export const MAX_LINEAS_CONSOLA = 200;

export async function ejecutarCasos(
  fn: (...args: unknown[]) => unknown,
  casos: Caso[],
  reloj: () => number = () => Date.now(),
): Promise<ResultadoCaso[]> {
  const resultados: ResultadoCaso[] = [];
  for (const caso of casos) {
    const inicio = reloj();
    let recibido: unknown;
    let lanzo: unknown = undefined;
    let ok = false;
    try {
      // Cada caso recibe copias de la entrada para que una función que muta no
      // contamine el siguiente caso ni el enunciado.
      recibido = await fn(...structuredClone(caso.entrada));
      ok = caso.lanza === undefined && iguales(recibido, caso.esperado);
    } catch (e) {
      lanzo = e;
      const mensaje = e instanceof Error ? e.message : String(e);
      ok = caso.lanza !== undefined && mensaje.includes(caso.lanza);
    }
    resultados.push({
      nombre: caso.nombre,
      ok,
      esperado: caso.lanza !== undefined ? `lanza "${caso.lanza}"` : mostrar(caso.esperado),
      recibido: lanzo !== undefined ? `lanza ${mostrar(lanzo)}` : mostrar(recibido),
      ms: reloj() - inicio,
    });
  }
  return resultados;
}
