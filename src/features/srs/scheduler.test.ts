import { describe, expect, it } from 'vitest';
import { estaVencida, notaDesdePuntuacion, repasar, State, tarjetaNueva } from './scheduler';

const T0 = new Date('2026-09-14T10:00:00Z');
const dias = (n: number) => new Date(T0.getTime() + n * 86_400_000);

describe('notaDesdePuntuacion', () => {
  it('mapea los tramos 0-3, 4-6, 7-8, 9-10', () => {
    expect(notaDesdePuntuacion(0)).toBe('again');
    expect(notaDesdePuntuacion(3)).toBe('again');
    expect(notaDesdePuntuacion(4)).toBe('hard');
    expect(notaDesdePuntuacion(6)).toBe('hard');
    expect(notaDesdePuntuacion(7)).toBe('good');
    expect(notaDesdePuntuacion(8)).toBe('good');
    expect(notaDesdePuntuacion(9)).toBe('easy');
    expect(notaDesdePuntuacion(10)).toBe('easy');
  });
  it('acota valores fuera de rango y redondea', () => {
    expect(notaDesdePuntuacion(-5)).toBe('again');
    expect(notaDesdePuntuacion(99)).toBe('easy');
    expect(notaDesdePuntuacion(6.6)).toBe('good');
  });
  it('con tests fallidos el techo es hard', () => {
    expect(notaDesdePuntuacion(10, true)).toBe('hard');
    expect(notaDesdePuntuacion(7, true)).toBe('hard');
    expect(notaDesdePuntuacion(2, true)).toBe('again');
  });
});

describe('repasar', () => {
  it('una tarjeta nueva respondida bien pasa a review con vencimiento futuro', () => {
    const { card, log } = repasar(tarjetaNueva(T0), 'good', T0);
    expect(card.state).toBe(State.Review);
    expect(card.reps).toBe(1);
    expect(card.due.getTime()).toBeGreaterThan(T0.getTime());
    expect(log.rating).toBe(3);
  });

  it('easy da un intervalo mayor que good, y good mayor que hard', () => {
    const nueva = tarjetaNueva(T0);
    const facil = repasar(nueva, 'easy', T0).card.scheduled_days;
    const bien = repasar(nueva, 'good', T0).card.scheduled_days;
    const dificil = repasar(nueva, 'hard', T0).card.scheduled_days;
    expect(facil).toBeGreaterThan(bien);
    expect(bien).toBeGreaterThanOrEqual(dificil);
  });

  it('nunca supera el intervalo máximo de 180 días', () => {
    let tarjeta = tarjetaNueva(T0);
    let ahora = T0;
    for (let i = 0; i < 15; i++) {
      tarjeta = repasar(tarjeta, 'easy', ahora).card;
      ahora = tarjeta.due;
    }
    expect(tarjeta.scheduled_days).toBeLessThanOrEqual(180);
  });

  it('un again tras un intervalo largo cuenta como lapso', () => {
    const primera = repasar(tarjetaNueva(T0), 'good', T0).card;
    const tarde = dias(primera.scheduled_days + 30);
    expect(estaVencida(primera, tarde)).toBe(true);
    const { card } = repasar(primera, 'again', tarde);
    expect(card.lapses).toBe(1);
    expect(card.due.getTime()).toBeGreaterThanOrEqual(tarde.getTime());
  });

  it('estaVencida compara con el instante dado', () => {
    const t = tarjetaNueva(T0);
    expect(estaVencida(t, T0)).toBe(true);
    const { card } = repasar(t, 'good', T0);
    expect(estaVencida(card, T0)).toBe(false);
    expect(estaVencida(card, dias(400))).toBe(true);
  });
});
