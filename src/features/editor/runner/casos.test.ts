import { describe, expect, it } from 'vitest';
import { ejecutarCasos } from './casos';

const reloj = () => 0;

describe('ejecutarCasos', () => {
  it('marca ok cuando el resultado coincide estructuralmente', async () => {
    const dup = (xs: unknown) => [...new Set(xs as number[])];
    const r = await ejecutarCasos(
      dup as never,
      [
        { nombre: 'quita repetidos', entrada: [[1, 1, 2]], esperado: [1, 2] },
        { nombre: 'vacía', entrada: [[]], esperado: [] },
      ],
      reloj,
    );
    expect(r.map((x) => x.ok)).toEqual([true, true]);
  });

  it('muestra esperado y recibido cuando falla', async () => {
    const r = await ejecutarCasos(
      (() => 3) as never,
      [{ nombre: 'suma', entrada: [1, 1], esperado: 2 }],
      reloj,
    );
    expect(r[0]).toMatchObject({ ok: false, esperado: '2', recibido: '3' });
  });

  it('un caso que espera excepción aprueba si el mensaje la contiene', async () => {
    const fn = (x: unknown) => {
      if (typeof x !== 'number') throw new TypeError('entrada no numérica');
      return x;
    };
    const r = await ejecutarCasos(
      fn as never,
      [
        { nombre: 'rechaza texto', entrada: ['a'], lanza: 'no numérica' },
        { nombre: 'no debería lanzar', entrada: [1], lanza: 'algo' },
      ],
      reloj,
    );
    expect(r[0]?.ok).toBe(true);
    expect(r[1]).toMatchObject({ ok: false, recibido: '1' });
  });

  it('una excepción inesperada no aborta el resto de casos', async () => {
    const fn = (x: unknown) => {
      if (x === 0) throw new Error('boom');
      return x;
    };
    const r = await ejecutarCasos(
      fn as never,
      [
        { nombre: 'explota', entrada: [0], esperado: 0 },
        { nombre: 'sigue', entrada: [1], esperado: 1 },
      ],
      reloj,
    );
    expect(r[0]).toMatchObject({ ok: false, recibido: 'lanza Error: boom' });
    expect(r[1]?.ok).toBe(true);
  });

  it('la entrada se clona: mutar el argumento no afecta al siguiente caso', async () => {
    const entrada = [3, 1, 2];
    const ordena = (xs: unknown) => (xs as number[]).sort();
    const r = await ejecutarCasos(
      ordena as never,
      [
        { nombre: 'a', entrada: [entrada], esperado: [1, 2, 3] },
        { nombre: 'b', entrada: [entrada], esperado: [1, 2, 3] },
      ],
      reloj,
    );
    expect(r.every((x) => x.ok)).toBe(true);
    expect(entrada).toEqual([3, 1, 2]);
  });

  it('acepta funciones async', async () => {
    const fn = async (x: unknown) => (x as number) * 2;
    const r = await ejecutarCasos(
      fn as never,
      [{ nombre: 'x2', entrada: [2], esperado: 4 }],
      reloj,
    );
    expect(r[0]?.ok).toBe(true);
  });
});
