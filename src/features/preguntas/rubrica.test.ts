import { describe, expect, it } from 'vitest';
import { rubricaParaNivel } from './rubrica';

const p = {
  rubrica: { junior: ['Define', 'Ejemplo'], senior: ['Lo anterior', 'Complejidad', 'Escala'] },
};

describe('rubricaParaNivel', () => {
  it('junior recibe solo la junior', () => {
    expect(rubricaParaNivel(p, 'junior')).toEqual(['Define', 'Ejemplo']);
  });
  it('mid y senior reciben la junior más los añadidos sin "Lo anterior"', () => {
    expect(rubricaParaNivel(p, 'senior')).toEqual(['Define', 'Ejemplo', 'Complejidad', 'Escala']);
    expect(rubricaParaNivel(p, 'mid')).toEqual(rubricaParaNivel(p, 'senior'));
  });
  it('tolera una senior sin la muletilla', () => {
    expect(rubricaParaNivel({ rubrica: { junior: ['A'], senior: ['B'] } }, 'senior')).toEqual([
      'A',
      'B',
    ]);
  });
});
