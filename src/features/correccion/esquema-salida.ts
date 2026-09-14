// Salida estructurada de la corrección. Un único schema estable para todas las
// preguntas: Claude compila la gramática una vez y la cachea 24 h. El JSON
// Schema de la API no admite minimum/maximum, por eso los enteros van como enum
// y se revalidan aquí con zod (docs/research/tecnologia-y-arquitectura.md, 5.4).
import { z } from 'zod';

const entero = (max: number) => z.number().int().min(0).max(max);

export const Correccion = z.object({
  puntuacion: entero(10),
  dimensiones: z.object({
    correccion: entero(5),
    complejidad: entero(5),
    comunicacion: entero(5),
  }),
  aciertos: z.array(z.string()),
  fallos: z.array(z.string()),
  siguientePaso: z.string(),
  // Qué diría un candidato que aprueba: lo que más valoran los usuarios de
  // NeetCode es ver el razonamiento, no solo la nota.
  respuestaQueAprueba: z.string(),
});
export type Correccion = z.infer<typeof Correccion>;

export const VERSION_RUBRICA = 1;

const enumEnteros = (max: number) => ({
  type: 'integer',
  enum: Array.from({ length: max + 1 }, (_, i) => i),
});

// Lo que se envía a la API en output_config.format. Mantener alineado con `Correccion`.
export const JSON_SCHEMA_CORRECCION = {
  type: 'object',
  additionalProperties: false,
  required: [
    'puntuacion',
    'dimensiones',
    'aciertos',
    'fallos',
    'siguientePaso',
    'respuestaQueAprueba',
  ],
  properties: {
    puntuacion: enumEnteros(10),
    dimensiones: {
      type: 'object',
      additionalProperties: false,
      required: ['correccion', 'complejidad', 'comunicacion'],
      properties: {
        correccion: enumEnteros(5),
        complejidad: enumEnteros(5),
        comunicacion: enumEnteros(5),
      },
    },
    aciertos: { type: 'array', items: { type: 'string' } },
    fallos: { type: 'array', items: { type: 'string' } },
    siguientePaso: { type: 'string' },
    respuestaQueAprueba: { type: 'string' },
  },
} as const;

export function parsearCorreccion(texto: string): Correccion {
  return Correccion.parse(JSON.parse(texto));
}
