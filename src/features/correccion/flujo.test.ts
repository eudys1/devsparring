import { afterEach, describe, expect, it, vi } from 'vitest';
import { pedirCorreccion } from './cliente';
import type { Correccion } from './esquema-salida';
import { leerAvance, type Avance } from './parcial';

const CORRECCION: Correccion = {
  puntuacion: 7,
  dimensiones: { correccion: 4, complejidad: 3, comunicacion: 4 },
  aciertos: ['Define bien el concepto'],
  fallos: ['No da la complejidad'],
  siguientePaso: 'Repasa Big O',
  respuestaQueAprueba: 'Una respuesta completa.',
};

describe('leerAvance', () => {
  it('empieza sin nota ni tramo', () => {
    expect(leerAvance('')).toEqual({ tramo: 'empezando' });
  });

  it('no da la nota hasta que el número se cierra: "1" puede ser "10"', () => {
    expect(leerAvance('{"puntuacion": 1')).toEqual({ tramo: 'puntuacion' });
    expect(leerAvance('{"puntuacion": 10,')).toEqual({ tramo: 'puntuacion', puntuacion: 10 });
  });

  it('el tramo es la última clave que ha aparecido', () => {
    const texto = '{"puntuacion":7,"dimensiones":{"correccion":4},"aciertos":["a"],"fallos":["No';
    expect(leerAvance(texto)).toEqual({ tramo: 'fallos', puntuacion: 7 });
  });
});

function respuestaNdjson(trozos: string[]): Response {
  const codificador = new TextEncoder();
  const cuerpo = new ReadableStream<Uint8Array>({
    start(canal) {
      for (const t of trozos) canal.enqueue(codificador.encode(t));
      canal.close();
    },
  });
  return new Response(cuerpo, { headers: { 'content-type': 'application/x-ndjson' } });
}

const PETICION = {
  preguntaId: 'js-closures-01',
  modo: 'verbal' as const,
  nivel: 'mid' as const,
  idioma: 'es' as const,
  respuesta: 'Mi respuesta',
  modelo: 'estandar' as const,
};

describe('pedirCorreccion', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('lee el flujo aunque las líneas lleguen partidas y avisa del avance sin repetir', async () => {
    const lineas = [
      { t: 'delta', d: '{"puntuacion":' },
      { t: 'delta', d: '7,"dimensiones":{' },
      { t: 'delta', d: '"correccion":4' },
      { t: 'delta', d: '},"aciertos":["Define"]' },
      { t: 'fin', ok: true, correccion: CORRECCION, modelo: 'm', versionRubrica: 1 },
    ]
      .map((l) => `${JSON.stringify(l)}\n`)
      .join('');
    // Troceado a mitad de línea, como llega por la red.
    const trozos = [lineas.slice(0, 25), lineas.slice(25, 90), lineas.slice(90)];
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(respuestaNdjson(trozos)));

    const avances: Avance[] = [];
    const r = await pedirCorreccion(PETICION, (a) => avances.push(a));

    expect(r).toEqual({ ok: true, correccion: CORRECCION, modelo: 'm', versionRubrica: 1 });
    expect(avances).toEqual([
      { tramo: 'puntuacion' },
      { tramo: 'dimensiones', puntuacion: 7 },
      { tramo: 'aciertos', puntuacion: 7 },
    ]);
  });

  it('un error al final del flujo se traduce a su mensaje', async () => {
    const fin = `${JSON.stringify({ t: 'fin', ok: false, codigo: 'clave_invalida' })}\n`;
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(respuestaNdjson([fin])));
    const r = await pedirCorreccion(PETICION);
    expect(r).toMatchObject({ ok: false, codigo: 'clave_invalida' });
    expect(r.ok ? '' : r.mensaje).toMatch(/clave/);
  });

  it('los errores de antes de empezar siguen llegando como JSON', async () => {
    const json = new Response(JSON.stringify({ ok: false, codigo: 'sin_clave' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    });
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(json));
    expect(await pedirCorreccion(PETICION)).toMatchObject({ ok: false, codigo: 'sin_clave' });
  });

  it('un flujo cortado sin evento final es un error de la API', async () => {
    const delta = `${JSON.stringify({ t: 'delta', d: '{"puntuacion":' })}\n`;
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(respuestaNdjson([delta])));
    expect(await pedirCorreccion(PETICION)).toMatchObject({ ok: false, codigo: 'error_api' });
  });
});
