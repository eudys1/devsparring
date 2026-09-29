// Un fallo del banco se apunta como issue en el repositorio, que es donde se
// revisa el contenido (por PR). Así no hace falta tabla ni cuenta: un enlace
// con el título y el cuerpo ya rellenos, y lo que falla queda con su id y su
// versión para encontrar la pregunta sin buscarla.
import type { Pregunta } from './esquema';

const REPO = 'https://github.com/eudys1/devsparring';

export function enlaceReportar(
  p: Pick<Pregunta, 'id' | 'version' | 'pista' | 'texto'>,
  donde: string,
): string {
  const cuerpo = [
    `**Pregunta:** ${p.texto.es}`,
    `**Id:** \`${p.id}\` (versión ${p.version}, pista ${p.pista})`,
    `**Dónde la vi:** ${donde}`,
    '',
    '**Qué está mal:**',
    '<!-- La respuesta, un criterio de la rúbrica, una fuente, el enunciado… -->',
    '',
    '**Cómo debería ser:**',
    '',
  ].join('\n');
  const q = new URLSearchParams({ title: `Pregunta mal: ${p.id}`, body: cuerpo });
  return `${REPO}/issues/new?${q.toString()}`;
}
