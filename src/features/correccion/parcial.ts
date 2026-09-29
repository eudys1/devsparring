// Lo que se puede decir de una corrección a medio llegar. El JSON sale en el
// orden del schema (puntuación, dimensiones, aciertos, fallos, siguiente paso,
// respuesta que aprueba), así que la nota llega en los primeros tokens y lo más
// largo al final: se enseña la nota enseguida y en qué parte va el resto.
export const TRAMOS = [
  'puntuacion',
  'dimensiones',
  'aciertos',
  'fallos',
  'siguientePaso',
  'respuestaQueAprueba',
] as const;
export type Tramo = 'empezando' | (typeof TRAMOS)[number];

export type Avance = { tramo: Tramo; puntuacion?: number };

export function leerAvance(texto: string): Avance {
  let tramo: Tramo = 'empezando';
  let posicion = -1;
  for (const t of TRAMOS) {
    const i = texto.lastIndexOf(`"${t}"`);
    if (i > posicion) {
      posicion = i;
      tramo = t;
    }
  }
  // Solo con el número cerrado: "1" podría ser el principio de "10".
  const nota = /"puntuacion"\s*:\s*(\d+)\s*[,}]/.exec(texto);
  return nota ? { tramo, puntuacion: Number(nota[1]) } : { tramo };
}

export const ETIQUETA_TRAMO: Record<Tramo, string> = {
  empezando: 'Leyendo tu respuesta',
  puntuacion: 'Poniendo la nota',
  dimensiones: 'Puntuando cada dimensión',
  aciertos: 'Anotando lo que está bien',
  fallos: 'Anotando lo que faltó',
  siguientePaso: 'Pensando tu siguiente paso',
  respuestaQueAprueba: 'Escribiendo la respuesta que aprueba',
};
