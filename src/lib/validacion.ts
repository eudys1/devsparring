// Puente entre zod y los formularios: el mismo esquema valida en el navegador
// (antes de enviar) y en el servidor (en la Server Action, que nunca se fía del
// cliente). Los errores salen como { campo: mensaje }, que es lo que pinta
// <Form validationErrors> de React Aria junto a cada campo.
import type { z } from 'zod';

export type ErroresCampo = Record<string, string>;

export type ResultadoForm<T = undefined> =
  { ok: true; datos?: T; aviso?: string } | { ok: false; errores?: ErroresCampo; error?: string };

export function erroresDe(e: z.ZodError): ErroresCampo {
  const salida: ErroresCampo = {};
  for (const i of e.issues) {
    const campo = String(i.path[0] ?? '_');
    // El primer error de cada campo es el que se enseña: uno a la vez se entiende.
    if (!(campo in salida)) salida[campo] = i.message;
  }
  return salida;
}

/** Lee un FormData como objeto de texto plano (las casillas sin marcar no vienen). */
export function deFormulario(form: FormData): Record<string, string> {
  const o: Record<string, string> = {};
  for (const [k, v] of form.entries()) if (typeof v === 'string') o[k] = v;
  return o;
}

export function validar<S extends z.ZodType>(
  esquema: S,
  datos: unknown,
): { ok: true; datos: z.infer<S> } | { ok: false; errores: ErroresCampo } {
  const r = esquema.safeParse(datos);
  return r.success ? { ok: true, datos: r.data } : { ok: false, errores: erroresDe(r.error) };
}

/** Valida un solo valor con su esquema y devuelve el primer mensaje, o null. */
export function errorDe(esquema: z.ZodType, valor: unknown): string | null {
  const r = esquema.safeParse(valor);
  return r.success ? null : (r.error.issues[0]?.message ?? 'Revisa este campo.');
}
