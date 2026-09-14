import { describe, expect, it } from 'vitest';
import { iguales, mostrar } from './igualdad';

describe('iguales', () => {
  it('primitivos', () => {
    expect(iguales(1, 1)).toBe(true);
    expect(iguales('a', 'a')).toBe(true);
    expect(iguales(1, '1')).toBe(false);
    expect(iguales(null, undefined)).toBe(false);
    expect(iguales(NaN, NaN)).toBe(true);
    expect(iguales(0, -0)).toBe(true);
  });
  it('arrays: orden y longitud importan', () => {
    expect(iguales([1, [2, 3]], [1, [2, 3]])).toBe(true);
    expect(iguales([1, 2], [2, 1])).toBe(false);
    expect(iguales([1], [1, undefined])).toBe(false);
    expect(iguales([], {})).toBe(false);
  });
  it('objetos: el orden de claves no importa, las claves sí', () => {
    expect(iguales({ a: 1, b: { c: 2 } }, { b: { c: 2 }, a: 1 })).toBe(true);
    expect(iguales({ a: 1 }, { a: 1, b: undefined })).toBe(false);
    expect(iguales({ a: undefined }, { b: undefined })).toBe(false);
  });
  it('Map con orden distinto y Set con objetos', () => {
    expect(
      iguales(
        new Map([
          ['x', 1],
          ['y', 2],
        ]),
        new Map([
          ['y', 2],
          ['x', 1],
        ]),
      ),
    ).toBe(true);
    expect(iguales(new Set([{ a: 1 }, 2]), new Set([2, { a: 1 }]))).toBe(true);
    expect(iguales(new Set([1, 2]), new Set([1, 3]))).toBe(false);
    expect(iguales(new Map(), new Set())).toBe(false);
  });
  it('fechas por instante y prototipos distintos', () => {
    expect(iguales(new Date(5), new Date(5))).toBe(true);
    expect(iguales(new Date(5), new Date(6))).toBe(false);
    class A {
      x = 1;
    }
    expect(iguales(new A(), { x: 1 })).toBe(false);
  });
});

describe('mostrar', () => {
  it('produce una representación estable', () => {
    expect(mostrar({ b: [1, 'x'], a: null })).toBe('{a: null, b: [1, "x"]}');
    expect(mostrar(new Map([['k', new Set([1])]]))).toBe('Map([["k", Set([1])]])');
    expect(mostrar(undefined)).toBe('undefined');
    expect(mostrar(NaN)).toBe('NaN');
  });
});
