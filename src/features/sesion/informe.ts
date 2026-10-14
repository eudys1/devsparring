// El informe al terminar una sesión: qué tal fue, dónde fallaste y qué hacer
// ahora. Puro: lo usan la página de informe (con lo guardado en la base) y la
// demo (con lo que tiene en memoria). Devuelve códigos; la pantalla redacta.
import type { Nivel, Pista } from '../preguntas/esquema';
import { NIVELES } from '../preguntas/esquema';

// 1 fallé · 2 a medias · 3 bien · 4 fácil (la nota de repaso de FSRS).
export type NotaNum = 1 | 2 | 3 | 4;

export type ItemInforme = {
  preguntaId: string;
  pista: Pista;
  nota: NotaNum;
  puntuacion?: number | null;
  duracionMs?: number | null;
};

export type Recomendacion =
  | { codigo: 'repasar_pista'; pista: Pista; fallos: number }
  | { codigo: 'bajar_nivel'; nivel: Nivel }
  | { codigo: 'subir_nivel'; nivel: Nivel }
  | { codigo: 'mismo_nivel' }
  | { codigo: 'vuelven_pronto'; cuantas: number };

export type Informe = {
  total: number;
  bien: number;
  aMedias: number;
  fallos: number;
  /** De 0 a 100: bien cuenta entero, a medias la mitad. */
  acierto: number;
  minutos: number;
  porPista: { pista: Pista; total: number; fallos: number }[];
  recomendaciones: Recomendacion[];
};

export function construirInforme(items: ItemInforme[], nivel: Nivel): Informe {
  const total = items.length;
  const bien = items.filter((i) => i.nota >= 3).length;
  const aMedias = items.filter((i) => i.nota === 2).length;
  const fallos = items.filter((i) => i.nota === 1).length;
  const acierto = total ? Math.round(((bien + aMedias / 2) / total) * 100) : 0;
  const ms = items.reduce((a, i) => a + (i.duracionMs ?? 0), 0);

  const mapa = new Map<Pista, { total: number; fallos: number }>();
  for (const i of items) {
    const p = mapa.get(i.pista) ?? { total: 0, fallos: 0 };
    p.total++;
    if (i.nota <= 2) p.fallos++;
    mapa.set(i.pista, p);
  }
  const porPista = [...mapa.entries()]
    .map(([pista, v]) => ({ pista, ...v }))
    .sort((a, b) => b.fallos - a.fallos || b.total - a.total);

  const recomendaciones: Recomendacion[] = [];
  const peor = porPista[0];
  if (peor && peor.fallos >= 2) {
    recomendaciones.push({ codigo: 'repasar_pista', pista: peor.pista, fallos: peor.fallos });
  }
  const i = NIVELES.indexOf(nivel);
  if (total >= 3 && acierto < 40 && i > 0) {
    recomendaciones.push({ codigo: 'bajar_nivel', nivel: NIVELES[i - 1]! });
  } else if (total >= 3 && acierto >= 85 && i < NIVELES.length - 1) {
    recomendaciones.push({ codigo: 'subir_nivel', nivel: NIVELES[i + 1]! });
  } else if (total >= 3) {
    recomendaciones.push({ codigo: 'mismo_nivel' });
  }
  const pronto = fallos + aMedias;
  if (pronto > 0) recomendaciones.push({ codigo: 'vuelven_pronto', cuantas: pronto });

  return {
    total,
    bien,
    aMedias,
    fallos,
    acierto,
    minutos: Math.max(1, Math.round(ms / 60_000)),
    porPista,
    recomendaciones,
  };
}

/** La nota de repaso del motor ('again'…'easy') a su número. */
export function notaANum(nota: 'again' | 'hard' | 'good' | 'easy'): NotaNum {
  return ({ again: 1, hard: 2, good: 3, easy: 4 } as const)[nota];
}
