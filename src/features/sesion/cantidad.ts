import type { Modo } from '../preguntas/esquema';

// Preguntas por sesión según el modo: lo que cabe en 15-25 minutos.
export const CANTIDAD: Record<Modo, number> = {
  flash: 10,
  verbal: 4,
  kata: 2,
  review: 3,
  diseno: 2,
  star: 4,
};
