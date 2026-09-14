// Lado del hilo principal: crea un worker nuevo por ejecución, le pasa el código
// ya transpilado y mata el hilo si no responde a tiempo. Un bucle infinito del
// usuario no puede congelar la interfaz porque terminate() lo corta.
import type { Caso, ResultadoEjecucion } from './casos';
import type { MensajeEntrada } from './worker';

export const TIMEOUT_MS = 3000;

export type OpcionesEjecucion = {
  codigoJs: string;
  funcion: string;
  casos: Caso[];
  congelarAleatorio?: boolean;
  timeoutMs?: number;
};

export function ejecutarEnWorker(o: OpcionesEjecucion): Promise<ResultadoEjecucion> {
  return new Promise((resolve) => {
    const worker = new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' });
    const timeout = o.timeoutMs ?? TIMEOUT_MS;
    const timer = setTimeout(() => {
      worker.terminate();
      resolve({
        ok: false,
        casos: [],
        consola: [],
        error: `Tiempo agotado (${timeout} ms). ¿Un bucle que no termina?`,
      });
    }, timeout);
    worker.onmessage = (ev: MessageEvent<ResultadoEjecucion>) => {
      clearTimeout(timer);
      worker.terminate();
      resolve(ev.data);
    };
    worker.onerror = (ev) => {
      clearTimeout(timer);
      worker.terminate();
      resolve({ ok: false, casos: [], consola: [], error: ev.message || 'Error en el worker' });
    };
    const mensaje: MensajeEntrada = {
      codigoJs: o.codigoJs,
      funcion: o.funcion,
      casos: o.casos,
      congelarAleatorio: o.congelarAleatorio ?? false,
    };
    worker.postMessage(mensaje);
  });
}
