// La rúbrica senior se escribe "Lo anterior" + añadidos. Para mostrarla o
// enviarla a la IA se materializa por nivel: siempre la junior completa y, de
// los añadidos del senior, una parte que crece con el nivel. Los añadidos están
// escritos de lo más básico a lo más fino, así que se toman en orden.
import type { Nivel, Pregunta } from './esquema';

// Qué parte de los añadidos del senior se exige en cada nivel. Antes mid recibía
// la rúbrica senior entera; con los intermedios (13-10-2026) cada escalón pide
// un poco más que el anterior.
const PARTE: Record<Nivel, number> = {
  junior: 0,
  'junior-mid': 0.25,
  mid: 0.5,
  'mid-senior': 0.75,
  senior: 1,
};

export function anadidosSenior(p: Pick<Pregunta, 'rubrica'>): string[] {
  return p.rubrica.senior.filter((c) => !/^lo anterior\b/i.test(c.trim()));
}

export function rubricaParaNivel(p: Pick<Pregunta, 'rubrica'>, nivel: Nivel): string[] {
  const anadidos = anadidosSenior(p);
  return [...p.rubrica.junior, ...anadidos.slice(0, Math.ceil(anadidos.length * PARTE[nivel]))];
}
