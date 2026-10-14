// Reglas del perfil y del borrado de datos. Puras: el formulario valida con
// ellas antes de enviar y la Server Action vuelve a validar con las mismas.
import { z } from 'zod';
import { NIVELES, PISTAS } from '../preguntas/esquema';

export const EsquemaPerfil = z.object({
  nombre: z.string().trim().max(60, 'El nombre puede tener como mucho 60 caracteres.'),
  rol_objetivo: z
    .string()
    .trim()
    .min(2, 'Escribe el puesto al que aplicas, por ejemplo «Fullstack .NET y React».')
    .max(80, 'Como mucho 80 caracteres.'),
  nivel_por_defecto: z.enum(NIVELES, { message: 'Elige un nivel de la lista.' }),
  idioma: z.enum(['es', 'en'], { message: 'Elige español o inglés.' }),
  pistas_foco: z.array(z.enum(PISTAS)).max(PISTAS.length),
});
export type DatosPerfil = z.infer<typeof EsquemaPerfil>;

// Escribir la palabra evita borrar por un clic de más. Se comprueba también en
// el servidor: la confirmación no puede depender solo del navegador.
export const PALABRA_BORRAR = 'BORRAR';

export const EsquemaBorrar = z.object({
  confirmacion: z
    .string()
    .trim()
    .refine((v) => v.toUpperCase() === PALABRA_BORRAR, {
      message: `Escribe ${PALABRA_BORRAR} para confirmar.`,
    }),
  entrevistas: z.enum(['si', 'no']).default('no'),
});
