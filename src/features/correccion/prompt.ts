// Construcción del prompt de corrección. Pura. El mismo texto sirve para la
// llamada a la API y para "Copiar para corregir" (pegar en cualquier chat).
// Orden pensado para prompt caching: lo estable (sistema, pregunta, rúbrica)
// primero; la respuesta del usuario, al final.
import type { Nivel } from '../preguntas/esquema';

export type EntradaCorreccion = {
  modo: 'flash' | 'verbal' | 'kata' | 'review' | 'diseno' | 'star';
  nivel: Nivel;
  idioma: 'es' | 'en';
  pregunta: { es: string; en: string };
  contexto?: string;
  rubrica: string[];
  respuestaModelo: string;
  respuesta: string;
  // Solo katas: resultado de los tests automáticos, ya formateado.
  resultadoTests?: string;
};

const NOMBRE_NIVEL: Record<Nivel, string> = {
  junior: 'junior (menos de 2 años)',
  mid: 'mid (2 a 5 años)',
  senior: 'senior (más de 5 años)',
};

const NOMBRE_MODO: Record<EntradaCorreccion['modo'], string> = {
  flash: 'respuesta corta de teoría',
  verbal: 'explicación hablada (transcrita o resumida por el candidato)',
  kata: 'ejercicio de código',
  review: 'revisión de código ajeno',
  diseno: 'diseño de sistemas',
  star: 'pregunta comportamental (formato STAR)',
};

export function promptSistema(): string {
  return [
    'Eres un entrevistador técnico con quince años contratando programadores en España y en empresas internacionales.',
    'Corriges respuestas de candidatos con una rúbrica explícita. Eres exigente, justo y concreto.',
    'Prohibido decir "muy bien" sin justificar. Cada acierto y cada fallo se nombra con precisión.',
    'Puntúas de 0 a 10 según cuántos criterios de la rúbrica cumple la respuesta y con qué calidad.',
    'Las tres dimensiones (0 a 5): corrección técnica, complejidad y trade-offs, comunicación y estructura.',
    'Si hay resultado de tests automáticos, manda sobre cualquier impresión: una solución que no pasa los tests no supera 6.',
    'El campo respuestaQueAprueba contiene lo que diría, en dos o tres frases, un candidato de ese nivel que aprueba; no repitas la respuesta modelo literalmente.',
    'Responde siempre en el idioma indicado. Términos técnicos en inglés tal como se usan en la industria.',
  ].join('\n');
}

export function promptUsuario(e: EntradaCorreccion): string {
  const idioma = e.idioma === 'en' ? 'inglés' : 'español';
  const partes = [
    `## Contexto`,
    `Modo: ${NOMBRE_MODO[e.modo]}. Nivel al que aplica el candidato: ${NOMBRE_NIVEL[e.nivel]}. Idioma de la corrección: ${idioma}.`,
    ``,
    `## Pregunta`,
    e.idioma === 'en' ? e.pregunta.en : e.pregunta.es,
  ];
  if (e.contexto) partes.push(``, `### Material de la pregunta`, e.contexto);
  partes.push(
    ``,
    `## Rúbrica para nivel ${e.nivel}`,
    ...e.rubrica.map((c, i) => `${i + 1}. ${c}`),
    ``,
    `## Referencia: qué dice una respuesta que aprueba`,
    e.respuestaModelo,
  );
  if (e.resultadoTests) partes.push(``, `## Resultado de los tests automáticos`, e.resultadoTests);
  partes.push(``, `## Respuesta del candidato`, e.respuesta.trim() || '(sin respuesta)');
  return partes.join('\n');
}

// Texto autocontenido para pegar en un chat cualquiera. Pide la misma
// estructura que el schema, pero en prosa: no hay salida estructurada fuera de la API.
export function promptParaCopiar(e: EntradaCorreccion): string {
  return [
    promptSistema(),
    '',
    promptUsuario(e),
    '',
    '## Formato de tu corrección',
    'Puntuación (0-10). Dimensiones: corrección, complejidad, comunicación (0-5 cada una).',
    'Aciertos (lista). Fallos (lista, concretos). Siguiente paso (una acción).',
    'Respuesta que aprueba (dos o tres frases).',
  ].join('\n');
}
