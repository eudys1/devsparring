import { describe, expect, it } from 'vitest';
import { construirInforme, notaANum, type ItemInforme } from './informe';

const item = (pista: ItemInforme['pista'], nota: ItemInforme['nota']): ItemInforme => ({
  preguntaId: `${pista}-${Math.random()}`,
  pista,
  nota,
  duracionMs: 60_000,
});

describe('construirInforme', () => {
  it('cuenta bien, a medias y fallos, y el acierto da media a lo de a medias', () => {
    const r = construirInforme(
      [item('react', 3), item('react', 4), item('node', 2), item('node', 1)],
      'mid',
    );
    expect([r.total, r.bien, r.aMedias, r.fallos]).toEqual([4, 2, 1, 1]);
    expect(r.acierto).toBe(63); // (2 + 0,5) / 4
    expect(r.minutos).toBe(4);
  });

  it('señala la pista con más fallos si son al menos dos', () => {
    const r = construirInforme([item('node', 1), item('node', 2), item('react', 3)], 'mid');
    expect(r.porPista[0]).toEqual({ pista: 'node', total: 2, fallos: 2 });
    expect(r.recomendaciones).toContainEqual({ codigo: 'repasar_pista', pista: 'node', fallos: 2 });
  });

  it('propone bajar un escalón si casi todo falla, y subir si casi todo sale', () => {
    const mal = construirInforme([item('web', 1), item('web', 1), item('web', 1)], 'mid');
    expect(mal.recomendaciones).toContainEqual({ codigo: 'bajar_nivel', nivel: 'junior-mid' });
    const bien = construirInforme([item('web', 4), item('web', 3), item('web', 4)], 'mid');
    expect(bien.recomendaciones).toContainEqual({ codigo: 'subir_nivel', nivel: 'mid-senior' });
  });

  it('no propone subir de senior ni bajar de junior', () => {
    const r = construirInforme([item('web', 4), item('web', 4), item('web', 4)], 'senior');
    expect(r.recomendaciones.some((x) => x.codigo === 'subir_nivel')).toBe(false);
    const j = construirInforme([item('web', 1), item('web', 1), item('web', 1)], 'junior');
    expect(j.recomendaciones.some((x) => x.codigo === 'bajar_nivel')).toBe(false);
  });

  it('una sesión vacía no rompe', () => {
    const r = construirInforme([], 'mid');
    expect(r.total).toBe(0);
    expect(r.acierto).toBe(0);
  });
});

describe('notaANum', () => {
  it('traduce las notas del motor', () => {
    expect(['again', 'hard', 'good', 'easy'].map((n) => notaANum(n as 'good'))).toEqual([
      1, 2, 3, 4,
    ]);
  });
});
