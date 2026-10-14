// Reglas de una entrevista apuntada. Puras: el formulario y la Server Action
// validan con el mismo esquema y dicen lo mismo.
import { z } from 'zod';
import { NIVELES } from '../preguntas/esquema';

const opcional = (max: number, que: string) =>
  z
    .string()
    .trim()
    .max(max, `${que}: como mucho ${max} caracteres.`)
    .optional()
    .transform((v) => v || undefined);

export const NuevaEntrevista = z.object({
  empresa: z
    .string()
    .trim()
    .min(1, 'Falta la empresa: es lo único, con la fecha, que hace falta.')
    .max(120, 'La empresa: como mucho 120 caracteres.'),
  rol: opcional(120, 'El puesto'),
  // "sin" es la opción "Sin indicar" del desplegable.
  nivel: z
    .enum([...NIVELES, 'sin'], { message: 'Elige un nivel de la lista.' })
    .optional()
    .transform((v) => (v === 'sin' ? undefined : v)),
  fecha: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Falta la fecha o no es válida (día, mes y año).')
    .refine((f) => !Number.isNaN(Date.parse(f)), 'Esa fecha no existe.'),
  formato: opcional(200, 'El formato'),
  preguntas: z
    .array(z.string().trim().min(1).max(500, 'Cada pregunta: como mucho 500 caracteres.'))
    .max(50, 'Como mucho 50 preguntas por entrevista.'),
  notas: opcional(4000, 'Las notas'),
  resultado: opcional(120, 'El resultado'),
});
export type NuevaEntrevista = z.infer<typeof NuevaEntrevista>;

/** Las preguntas se escriben una por línea; las líneas vacías no cuentan. */
export function lineas(texto: string): string[] {
  return texto
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
}
