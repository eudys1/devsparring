// Código que corre DENTRO del Web Worker. Se empaqueta como módulo aparte y se
// crea un worker nuevo por ejecución desde ejecutar.ts. No toca el DOM ni el
// almacenamiento del origen: el aislamiento del worker es la barrera de
// seguridad (docs/arquitectura.md, "Editor y ejecución de código").
import { ejecutarCasos, MAX_LINEAS_CONSOLA, type Caso, type ResultadoEjecucion } from './casos';

export type MensajeEntrada = {
  // JavaScript ya transpilado (módulo ES con la función exportada).
  codigoJs: string;
  funcion: string;
  casos: Caso[];
  congelarAleatorio: boolean;
};

const consola: string[] = [];
let truncada = false;

function capturar(nivel: string) {
  return (...args: unknown[]) => {
    if (consola.length >= MAX_LINEAS_CONSOLA) {
      truncada = true;
      return;
    }
    const texto = args.map((a) => (typeof a === 'string' ? a : safeJson(a))).join(' ');
    consola.push(nivel === 'log' ? texto : `[${nivel}] ${texto}`);
  };
}

function safeJson(v: unknown): string {
  try {
    return JSON.stringify(v) ?? String(v);
  } catch {
    return String(v);
  }
}

self.onmessage = async (ev: MessageEvent<MensajeEntrada>) => {
  const { codigoJs, funcion, casos, congelarAleatorio } = ev.data;
  const c = self.console as unknown as Record<string, unknown>;
  for (const nivel of ['log', 'info', 'warn', 'error', 'debug']) c[nivel] = capturar(nivel);

  if (congelarAleatorio) {
    // Determinismo: la IA corrige sobre una salida reproducible.
    let semilla = 123456789;
    Math.random = () => {
      semilla = (semilla * 1103515245 + 12345) & 0x7fffffff;
      return semilla / 0x80000000;
    };
    Date.now = () => 1_757_836_800_000; // 2025-09-14T08:00:00Z, fijo.
  }

  const respuesta: ResultadoEjecucion = { ok: false, casos: [], consola };
  try {
    const url = URL.createObjectURL(new Blob([codigoJs], { type: 'text/javascript' }));
    const mod = (await import(/* webpackIgnore: true */ url)) as Record<string, unknown>;
    URL.revokeObjectURL(url);
    const fn = mod[funcion];
    if (typeof fn !== 'function') {
      respuesta.error = `No se encontró la función exportada "${funcion}". Recuerda exportarla.`;
    } else {
      respuesta.casos = await ejecutarCasos(fn as (...a: unknown[]) => unknown, casos, () =>
        performance.now(),
      );
      respuesta.ok = respuesta.casos.every((x) => x.ok);
    }
  } catch (e) {
    respuesta.error = e instanceof Error ? `${e.name}: ${e.message}` : String(e);
  }
  if (truncada) consola.push(`… salida truncada a ${MAX_LINEAS_CONSOLA} líneas`);
  self.postMessage(respuesta);
};
