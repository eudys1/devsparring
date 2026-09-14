// Antes de loggear cualquier cosa que venga de una petición de corrección se
// pasa por aquí. Si alguien añade un campo secreto nuevo y no lo lista, el test
// de sanitizar.test.ts falla: es la clase de fallo que se rompe en silencio.
export const CAMPOS_SECRETOS = ['apiKey', 'api_key', 'authorization', 'x-api-key'] as const;

export function sanitizar<T>(valor: T): T {
  if (Array.isArray(valor)) return valor.map(sanitizar) as T;
  if (valor && typeof valor === 'object') {
    const salida: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(valor as Record<string, unknown>)) {
      salida[k] = (CAMPOS_SECRETOS as readonly string[]).includes(k) ? '[redactado]' : sanitizar(v);
    }
    return salida as T;
  }
  return valor;
}

// Mensaje delgado para el cliente: nunca reenviar el error del SDK, que puede
// incluir la petición completa.
export function errorDelgado(e: unknown): { codigo: string; estado?: number } {
  const estado = (e as { status?: number })?.status;
  if (estado === 401) return { codigo: 'clave_invalida', estado };
  if (estado === 429) return { codigo: 'limite_api', estado };
  if (estado === 529 || estado === 503) return { codigo: 'api_saturada', estado };
  return { codigo: 'error_api', estado };
}
