import { describe, expect, it } from 'vitest';
import { ideaEnUnaFrase } from './idea';

describe('ideaEnUnaFrase', () => {
  it('usa el resumen revisado cuando existe', () => {
    expect(
      ideaEnUnaFrase({ resumen: 'La idea corta.', respuestaModelo: 'Otra cosa. Y más.' }),
    ).toBe('La idea corta.');
  });

  it('si no, toma la primera frase de la respuesta modelo', () => {
    expect(
      ideaEnUnaFrase({
        respuestaModelo:
          'Un closure es una función que recuerda el ámbito donde se creó. Sirve para estado privado.',
      }),
    ).toBe('Un closure es una función que recuerda el ámbito donde se creó.');
  });

  it('no corta en los puntos de un bloque de código en línea', () => {
    expect(
      ideaEnUnaFrase({
        respuestaModelo:
          'Se usa `Array.prototype.slice` para copiar una porción sin tocar el array original. Además…',
      }),
    ).toBe('Se usa `Array.prototype.slice` para copiar una porción sin tocar el array original.');
  });

  it('junta la frase siguiente si la primera es demasiado corta para decir algo', () => {
    expect(
      ideaEnUnaFrase({
        respuestaModelo: 'Depende. El índice acelera lecturas y encarece escrituras. Fin.',
      }),
    ).toBe('Depende. El índice acelera lecturas y encarece escrituras.');
  });

  it('recorta con puntos suspensivos una frase larguísima, sin partir palabras', () => {
    const larga = `${'palabra '.repeat(60)}final.`;
    const idea = ideaEnUnaFrase({ respuestaModelo: larga });
    expect(idea.length).toBeLessThanOrEqual(240);
    expect(idea.endsWith('palabra…')).toBe(true);
  });
});
