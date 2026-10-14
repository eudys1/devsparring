// Reglas de entrar, crear cuenta y recuperar la contraseña. Puras: las usa el
// formulario en el navegador y la Server Action en el servidor, así los dos
// dicen lo mismo con las mismas palabras.
import { z } from 'zod';

export const MINIMO_CLAVE = 8;

export const correo = z
  .string()
  .trim()
  .min(1, 'Falta el correo.')
  .max(254, 'Ese correo es demasiado largo.')
  .email('Ese correo no es válido: revisa que tenga @ y un dominio (nombre@dominio.com).');

export const claveNueva = z
  .string()
  .min(MINIMO_CLAVE, `La contraseña necesita al menos ${MINIMO_CLAVE} caracteres.`)
  .max(72, 'Como mucho 72 caracteres.')
  // Una frase o letras y números: lo que impide es "aaaaaaaa" o "12345678".
  .refine((c) => /[a-zA-ZñÑ]/.test(c) && /[^a-zA-ZñÑ]/.test(c), {
    message: 'Mezcla letras con al menos un número o un símbolo.',
  });

export const EsquemaEntrar = z.object({
  email: correo,
  clave: z.string().min(1, 'Falta la contraseña.'),
});

export const EsquemaRegistro = z
  .object({ email: correo, clave: claveNueva, repetir: z.string() })
  .refine((d) => d.clave === d.repetir, {
    path: ['repetir'],
    message: 'Las dos contraseñas no coinciden.',
  });

export const EsquemaOlvido = z.object({ email: correo });

export const EsquemaNuevaClave = z
  .object({ clave: claveNueva, repetir: z.string() })
  .refine((d) => d.clave === d.repetir, {
    path: ['repetir'],
    message: 'Las dos contraseñas no coinciden.',
  });

export type CodigoAcceso =
  'credenciales' | 'ya_existe' | 'sin_confirmar' | 'limite' | 'red' | 'clave_debil' | 'otro';

/** Lo que devuelve Supabase Auth, traducido a un código estable. */
export function codigoDeAuth(mensaje: string): CodigoAcceso {
  if (/invalid login credentials/i.test(mensaje)) return 'credenciales';
  if (/already (registered|been registered)|user already exists/i.test(mensaje)) return 'ya_existe';
  if (/email not confirmed/i.test(mensaje)) return 'sin_confirmar';
  if (/rate limit|too many/i.test(mensaje)) return 'limite';
  if (/fetch|network|connection|timeout/i.test(mensaje)) return 'red';
  if (/password/i.test(mensaje)) return 'clave_debil';
  return 'otro';
}

/** El código, dicho para la persona: qué pasó y qué hacer. */
export const MENSAJE_ACCESO: Record<CodigoAcceso, string> = {
  credenciales: 'Correo o contraseña incorrectos. Revisa los dos o recupera la contraseña.',
  ya_existe: 'Ya hay una cuenta con este correo. Entra con tu contraseña o recupérala.',
  sin_confirmar: 'Te falta confirmar el correo: abre el enlace que te enviamos al registrarte.',
  limite: 'Demasiados intentos seguidos. Espera un minuto y vuelve a probar.',
  red: 'No hay conexión con el servidor de cuentas. Comprueba tu conexión y prueba en unos minutos.',
  clave_debil: `Esa contraseña no vale: usa al menos ${MINIMO_CLAVE} caracteres mezclando letras y números.`,
  otro: 'No se pudo completar. Vuelve a probar en un momento.',
};
