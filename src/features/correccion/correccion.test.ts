import { describe, expect, it } from 'vitest';
import { JSON_SCHEMA_CORRECCION, parsearCorreccion } from './esquema-salida';
import { promptParaCopiar, promptUsuario, type EntradaCorreccion } from './prompt';
import { errorDelgado, sanitizar } from './sanitizar';

const entrada: EntradaCorreccion = {
  modo: 'verbal',
  nivel: 'senior',
  idioma: 'es',
  pregunta: { es: '¿Qué es un índice?', en: 'What is an index?' },
  rubrica: ['Define', 'Dice cuándo empeora'],
  respuestaModelo: 'Estructura auxiliar…',
  respuesta: 'Un índice acelera búsquedas.',
};

describe('parsearCorreccion', () => {
  const valida = {
    puntuacion: 7,
    dimensiones: { correccion: 4, complejidad: 3, comunicacion: 4 },
    aciertos: ['Define bien'],
    fallos: ['No habla de escrituras'],
    siguientePaso: 'Explica el coste en inserciones.',
    respuestaQueAprueba: 'Un índice…',
  };
  it('acepta una salida válida', () => {
    expect(parsearCorreccion(JSON.stringify(valida)).puntuacion).toBe(7);
  });
  it('rechaza valores fuera de rango aunque el schema de la API no los limite', () => {
    expect(() => parsearCorreccion(JSON.stringify({ ...valida, puntuacion: 11 }))).toThrow();
    expect(() =>
      parsearCorreccion(
        JSON.stringify({ ...valida, dimensiones: { ...valida.dimensiones, correccion: -1 } }),
      ),
    ).toThrow();
  });
  it('rechaza JSON malformado y campos que faltan', () => {
    expect(() => parsearCorreccion('{')).toThrow();
    const { respuestaQueAprueba: _omitido, ...sinCampo } = valida;
    void _omitido;
    expect(() => parsearCorreccion(JSON.stringify(sinCampo))).toThrow();
  });
  it('el JSON Schema enviado a la API pide exactamente los campos del tipo', () => {
    expect([...JSON_SCHEMA_CORRECCION.required].sort()).toEqual(Object.keys(valida).sort());
  });
});

describe('prompt', () => {
  it('pone la respuesta del candidato al final para que el prefijo se cachee', () => {
    const p = promptUsuario(entrada);
    expect(p.indexOf('## Rúbrica')).toBeLessThan(p.indexOf('## Respuesta del candidato'));
    expect(p.endsWith('Un índice acelera búsquedas.')).toBe(true);
  });
  it('usa la pregunta en inglés cuando el idioma es en', () => {
    expect(promptUsuario({ ...entrada, idioma: 'en' })).toContain('What is an index?');
  });
  it('incluye el resultado de tests cuando existe', () => {
    expect(promptUsuario({ ...entrada, resultadoTests: '2/3 ok' })).toContain('2/3 ok');
  });
  it('el prompt para copiar es autocontenido', () => {
    const p = promptParaCopiar(entrada);
    expect(p).toContain('entrevistador técnico');
    expect(p).toContain('Formato de tu corrección');
  });
});

describe('sanitizar', () => {
  it('redacta claves en cualquier nivel de anidamiento', () => {
    const s = sanitizar({ apiKey: 'sk-ant-1', datos: [{ authorization: 'x', ok: 1 }] });
    expect(s).toEqual({ apiKey: '[redactado]', datos: [{ authorization: '[redactado]', ok: 1 }] });
  });
  it('el cuerpo de la petición de corrección no contiene campos secretos sin redactar', () => {
    // Si se añade un campo secreto al cuerpo, hay que añadirlo a CAMPOS_SECRETOS.
    const cuerpo = { apiKey: 'sk', modelo: 'claude-sonnet-5', entrada };
    const texto = JSON.stringify(sanitizar(cuerpo));
    expect(texto).not.toContain('"sk"');
  });
  it('errorDelgado nunca reenvía el error original', () => {
    expect(errorDelgado({ status: 401, message: 'clave sk-ant-xxx' })).toEqual({
      codigo: 'clave_invalida',
      estado: 401,
    });
    expect(errorDelgado(new Error('boom'))).toEqual({ codigo: 'error_api', estado: undefined });
  });
});
