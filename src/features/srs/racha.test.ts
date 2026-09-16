import { describe, expect, it } from 'vitest';
import { racha } from './racha';

describe('racha', () => {
  const hoy = new Date(2026, 8, 17, 12);
  it('cuenta los días seguidos hasta hoy', () => {
    expect(racha(['2026-09-15', '2026-09-16', '2026-09-17'], hoy)).toBe(3);
  });
  it('sigue viva si hoy aún no has practicado pero ayer sí', () => {
    expect(racha(['2026-09-15', '2026-09-16'], hoy)).toBe(2);
  });
  it('se rompe con un día en blanco', () => {
    expect(racha(['2026-09-13', '2026-09-14', '2026-09-16'], hoy)).toBe(1);
  });
  it('es cero sin práctica reciente', () => {
    expect(racha(['2026-09-10'], hoy)).toBe(0);
    expect(racha([], hoy)).toBe(0);
  });
});
