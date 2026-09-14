import { describe, expect, it } from 'vitest';
import { barajar, paraNivel, seleccionar } from './filtrar';
import type { Pregunta } from './esquema';

const base: Omit<Pregunta, 'id' | 'nivelMinimo' | 'modos' | 'estado'> = {
  version: 1,
  pista: 'javascript',
  familia: 'closures',
  tipo: 'definicion',
  frecuencia: 'alta',
  texto: { es: '¿Qué es un closure?', en: 'What is a closure?' },
  rubrica: { junior: ['Define'], senior: ['Define', 'Ejemplo'] },
  respuestaModelo: 'Una función que recuerda su ámbito.',
  etiquetas: [],
  fuentes: [{ url: 'https://example.com', fecha: '2026-09-14', tipo: 'leida' }],
  origen: 'curada',
};

const p = (id: string, nivel: Pregunta['nivelMinimo'], modos: Pregunta['modos'] = ['flash']) =>
  ({ ...base, id, nivelMinimo: nivel, modos, estado: 'publicada' }) as Pregunta;

describe('paraNivel', () => {
  it('a junior solo le llegan preguntas junior; a senior, todas', () => {
    const lista = [p('a', 'junior'), p('b', 'mid'), p('c', 'senior')];
    expect(paraNivel(lista, 'junior').map((x) => x.id)).toEqual(['a']);
    expect(paraNivel(lista, 'senior').map((x) => x.id)).toEqual(['a', 'b', 'c']);
  });
});

describe('barajar', () => {
  it('es determinista con la misma semilla y no pierde elementos', () => {
    const items = [1, 2, 3, 4, 5, 6, 7, 8];
    const a = barajar(items, 42);
    const b = barajar(items, 42);
    expect(a).toEqual(b);
    expect([...a].sort()).toEqual([...items].sort());
    expect(barajar(items, 7)).not.toEqual(a);
  });
});

describe('seleccionar', () => {
  it('pone primero las prioritarias, descarta borradores y respeta la cantidad', () => {
    const lista = [
      p('a', 'junior'),
      p('b', 'junior'),
      { ...p('c', 'junior'), estado: 'borrador' } as Pregunta,
      p('d', 'junior', ['verbal']),
      p('e', 'junior'),
    ];
    const sel = seleccionar(lista, {
      modo: 'flash',
      nivel: 'mid',
      cantidad: 2,
      semilla: 1,
      prioritarias: ['e'],
    });
    expect(sel).toHaveLength(2);
    expect(sel[0]?.id).toBe('e');
    expect(sel.map((x) => x.id)).not.toContain('c');
    expect(sel.map((x) => x.id)).not.toContain('d');
  });
});
