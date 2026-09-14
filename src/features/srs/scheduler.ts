// Repetición espaciada con FSRS (ts-fsrs). Función pura: entra el estado de la
// tarjeta y la nota, sale el nuevo estado y el log. Sin fetch, sin Supabase,
// sin React. Parámetros justificados en docs/arquitectura.md.
import {
  createEmptyCard,
  fsrs,
  generatorParameters,
  Rating,
  State,
  type Card,
  type Grade,
  type RecordLogItem,
} from 'ts-fsrs';

export const PARAMETROS = generatorParameters({
  // Para entrevistas conviene un 85 %: menos repasos, y el coste de olvidar un
  // 15 % lo cubre la práctica en otros modos.
  request_retention: 0.85,
  // Nadie prepara una entrevista a más de seis meses vista.
  maximum_interval: 180,
  // Sin pasos de aprendizaje: cada pregunta ya se responde "en serio" con corrección.
  learning_steps: [],
  relearning_steps: [],
  enable_fuzz: true,
});

const planificador = fsrs(PARAMETROS);

export type Nota = 'again' | 'hard' | 'good' | 'easy';

const GRADO: Record<Nota, Grade> = {
  again: Rating.Again,
  hard: Rating.Hard,
  good: Rating.Good,
  easy: Rating.Easy,
};

export function tarjetaNueva(ahora: Date = new Date()): Card {
  return createEmptyCard(ahora);
}

export function repasar(tarjeta: Card, nota: Nota, ahora: Date = new Date()): RecordLogItem {
  return planificador.next(tarjeta, ahora, GRADO[nota]);
}

export function estaVencida(tarjeta: Card, ahora: Date = new Date()): boolean {
  return tarjeta.due.getTime() <= ahora.getTime();
}

// Mapeo de la puntuación de la rúbrica (0-10) a nota FSRS. Hipótesis de producto
// a calibrar con datos reales; por eso se guarda siempre la puntuación cruda.
// Si fallan tests automáticos, el techo es 'hard': no se puntúa "bien" lo que no pasa.
export function notaDesdePuntuacion(puntuacion: number, testsFallidos = false): Nota {
  const p = Math.max(0, Math.min(10, Math.round(puntuacion)));
  let nota: Nota;
  if (p <= 3) nota = 'again';
  else if (p <= 6) nota = 'hard';
  else if (p <= 8) nota = 'good';
  else nota = 'easy';
  if (testsFallidos && (nota === 'good' || nota === 'easy')) return 'hard';
  return nota;
}

export { State };
export type { Card };
