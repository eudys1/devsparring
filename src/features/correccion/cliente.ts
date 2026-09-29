// Llamada desde el navegador al route handler de corrección. La clave viaja en
// el body por HTTPS, nunca en la URL.
import type { Correccion } from './esquema-salida';
import { leerAvance, type Avance } from './parcial';
import type { EntradaCorreccion } from './prompt';

export type PeticionCorreccion = {
  preguntaId: string;
  modo: EntradaCorreccion['modo'];
  nivel: EntradaCorreccion['nivel'];
  idioma: 'es' | 'en';
  respuesta: string;
  resultadoTests?: string;
  modelo: 'estandar' | 'exhaustivo';
  apiKey?: string;
};

export type RespuestaCorreccion =
  | { ok: true; correccion: Correccion; modelo: string; versionRubrica: number }
  | { ok: false; codigo: string; mensaje: string };

export const MENSAJES: Record<string, string> = {
  sin_clave: 'No hay clave de API. Añádela en Cuenta o usa "Copiar para corregir".',
  clave_invalida: 'La clave de API no es válida o ha caducado. Revísala en Cuenta.',
  formato_clave: 'Eso no parece una clave de Anthropic (empieza por sk-ant-).',
  limite_api: 'La API está limitando peticiones. Espera unos segundos y vuelve a intentarlo.',
  api_saturada: 'La API está saturada ahora mismo. Reintenta en un momento.',
  limite_usuario: 'Demasiadas correcciones seguidas. Espera un minuto.',
  salida_invalida: 'La corrección llegó con un formato inesperado. Reintenta.',
  pregunta_desconocida: 'La pregunta ya no está en el banco.',
  error_api: 'La API devolvió un error. Reintenta; si sigue, revisa tu clave.',
  sin_sesion: 'Tu sesión ha caducado. Vuelve a entrar.',
};

type Final =
  | { ok: true; correccion: Correccion; modelo: string; versionRubrica: number }
  | { ok: false; codigo: string };

function fallo(codigo: string): RespuestaCorreccion {
  return { ok: false, codigo, mensaje: MENSAJES[codigo] ?? MENSAJES.error_api ?? '' };
}

// La ruta responde en NDJSON mientras la IA escribe (ver route.ts); los errores
// de antes de empezar llegan como JSON normal con su código.
export async function pedirCorreccion(
  p: PeticionCorreccion,
  alAvanzar?: (a: Avance) => void,
): Promise<RespuestaCorreccion> {
  const r = await fetch('/api/correccion', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(p),
  }).catch(() => null);
  if (!r) return fallo('error_api');
  if (!r.headers.get('content-type')?.includes('ndjson') || !r.body) {
    const json = (await r.json().catch(() => null)) as Final | null;
    if (!json) return fallo('error_api');
    return json.ok ? json : fallo(json.codigo);
  }

  const lector = r.body.pipeThrough(new TextDecoderStream()).getReader();
  let pendiente = '';
  let texto = '';
  let ultimo = '';
  let final: Final | null = null;
  for (;;) {
    const { value, done } = await lector.read().catch(() => ({ value: undefined, done: true }));
    if (done) break;
    pendiente += value;
    const lineas = pendiente.split('\n');
    pendiente = lineas.pop() ?? '';
    for (const linea of lineas) {
      if (!linea) continue;
      const evento = JSON.parse(linea) as { t: 'delta'; d: string } | ({ t: 'fin' } & Final);
      if (evento.t === 'delta') {
        texto += evento.d;
        const avance = leerAvance(texto);
        // Solo se avisa cuando cambia algo visible, no en cada token.
        const clave = `${avance.tramo}:${avance.puntuacion ?? ''}`;
        if (clave !== ultimo) {
          ultimo = clave;
          alAvanzar?.(avance);
        }
      } else {
        final = evento;
      }
    }
  }
  if (!final) return fallo('error_api');
  return final.ok
    ? {
        ok: true,
        correccion: final.correccion,
        modelo: final.modelo,
        versionRubrica: final.versionRubrica,
      }
    : fallo(final.codigo);
}
