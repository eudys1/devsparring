import { describe, expect, it } from 'vitest';
import { rachaConRespiro } from './racha';

describe('rachaConRespiro', () => {
  const hoy = new Date(2026, 8, 17, 12);
  it('un día suelto sin práctica no la rompe, pero no suma', () => {
    expect(rachaConRespiro(['2026-09-13', '2026-09-14', '2026-09-16'], hoy)).toEqual({
      dias: 3,
      respiros: 1,
    });
  });
  it('si ayer se te escapó, hoy la racha sigue viva hasta que practiques', () => {
    expect(rachaConRespiro(['2026-09-14', '2026-09-15'], hoy)).toEqual({ dias: 2, respiros: 1 });
  });
  it('dos días seguidos sin práctica la rompen', () => {
    expect(rachaConRespiro(['2026-09-12', '2026-09-13', '2026-09-16'], hoy)).toEqual({
      dias: 1,
      respiros: 0,
    });
  });
  it('solo un respiro cada siete días contados', () => {
    // 17 y 16 practicados, 15 no, 14 sí, 13 no, 12 sí: el segundo hueco llega
    // demasiado pronto y corta.
    expect(rachaConRespiro(['2026-09-12', '2026-09-14', '2026-09-16', '2026-09-17'], hoy)).toEqual({
      dias: 3,
      respiros: 1,
    });
  });
  it('sin práctica reciente es cero', () => {
    expect(rachaConRespiro([], hoy)).toEqual({ dias: 0, respiros: 0 });
    expect(rachaConRespiro(['2026-09-10'], hoy)).toEqual({ dias: 0, respiros: 0 });
  });
});
