import { describe, expect, it } from 'vitest';
import { NIVELES } from './esquema';
import { rubricaParaNivel } from './rubrica';

const p = {
  rubrica: {
    junior: ['Define', 'Ejemplo'],
    senior: ['Lo anterior', 'Complejidad', 'Escala', 'Alternativas', 'Pruebas'],
  },
};

describe('rubricaParaNivel', () => {
  it('junior recibe solo la junior', () => {
    expect(rubricaParaNivel(p, 'junior')).toEqual(['Define', 'Ejemplo']);
  });
  it('senior recibe la junior más todos los añadidos, sin "Lo anterior"', () => {
    expect(rubricaParaNivel(p, 'senior')).toEqual([
      'Define',
      'Ejemplo',
      'Complejidad',
      'Escala',
      'Alternativas',
      'Pruebas',
    ]);
  });
  it('los niveles intermedios piden una parte creciente de los añadidos, en orden', () => {
    expect(rubricaParaNivel(p, 'junior-mid')).toEqual(['Define', 'Ejemplo', 'Complejidad']);
    expect(rubricaParaNivel(p, 'mid')).toEqual(['Define', 'Ejemplo', 'Complejidad', 'Escala']);
    expect(rubricaParaNivel(p, 'mid-senior')).toEqual([
      'Define',
      'Ejemplo',
      'Complejidad',
      'Escala',
      'Alternativas',
    ]);
  });
  it('cada nivel exige al menos lo mismo que el anterior', () => {
    const largos = NIVELES.map((n) => rubricaParaNivel(p, n).length);
    expect(largos).toEqual([...largos].sort((a, b) => a - b));
  });
  it('tolera una senior sin la muletilla', () => {
    expect(rubricaParaNivel({ rubrica: { junior: ['A'], senior: ['B'] } }, 'senior')).toEqual([
      'A',
      'B',
    ]);
  });
});
