// Llamada desde el navegador al route handler de corrección. La clave viaja en
// el body por HTTPS, nunca en la URL.
import type { Correccion } from './esquema-salida';
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

export async function pedirCorreccion(p: PeticionCorreccion): Promise<RespuestaCorreccion> {
  const r = await fetch('/api/correccion', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(p),
  });
  const json = (await r.json().catch(() => null)) as
    | { ok: true; correccion: Correccion; modelo: string; versionRubrica: number }
    | { ok: false; codigo: string }
    | null;
  if (!json) return { ok: false, codigo: 'error_api', mensaje: MENSAJES.error_api ?? '' };
  if (json.ok) return json;
  return {
    ok: false,
    codigo: json.codigo,
    mensaje: MENSAJES[json.codigo] ?? MENSAJES.error_api ?? '',
  };
}
