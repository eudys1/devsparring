'use server';

// Entrar, crear cuenta, recuperar y cambiar la contraseña, en el servidor: el
// mismo esquema zod que valida el formulario en el navegador se vuelve a pasar
// aquí, porque el servidor nunca se fía de lo que llega. Supabase pone la
// cookie de sesión desde la propia acción.
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  codigoDeAuth,
  EsquemaEntrar,
  EsquemaNuevaClave,
  EsquemaOlvido,
  EsquemaRegistro,
  MENSAJE_ACCESO,
} from '@/features/cuenta/acceso';
import { URL_SITIO } from '@/lib/sitio';
import { supabaseServidor } from '@/lib/supabase/server';
import { deFormulario, validar, type ResultadoForm } from '@/lib/validacion';

export type EstadoAcceso = ResultadoForm & { email?: string };

// Solo rutas propias: "//otro.com" o "https://…" serían una redirección abierta.
function destinoSeguro(volver: string | undefined): string {
  return volver && /^\/(?!\/)/.test(volver) ? volver : '/inicio';
}

async function origen(): Promise<string> {
  const h = await headers();
  return h.get('origin') ?? URL_SITIO;
}

export async function entrar(_: EstadoAcceso, form: FormData): Promise<EstadoAcceso> {
  const datos = deFormulario(form);
  const v = validar(EsquemaEntrar, datos);
  if (!v.ok) return { ok: false, errores: v.errores };
  const supabase = await supabaseServidor();
  const { error } = await supabase.auth.signInWithPassword({
    email: v.datos.email,
    password: v.datos.clave,
  });
  if (error) {
    const codigo = codigoDeAuth(error.message);
    // Las credenciales se señalan en la contraseña: es lo que hay que reescribir.
    return codigo === 'credenciales'
      ? { ok: false, errores: { clave: MENSAJE_ACCESO.credenciales } }
      : { ok: false, error: MENSAJE_ACCESO[codigo] };
  }
  redirect(destinoSeguro(datos.volver));
}

export async function registrar(_: EstadoAcceso, form: FormData): Promise<EstadoAcceso> {
  const datos = deFormulario(form);
  const v = validar(EsquemaRegistro, datos);
  if (!v.ok) return { ok: false, errores: v.errores };
  const supabase = await supabaseServidor();
  const { data, error } = await supabase.auth.signUp({
    email: v.datos.email,
    password: v.datos.clave,
    options: { emailRedirectTo: `${await origen()}/auth/confirmar` },
  });
  if (error) {
    const codigo = codigoDeAuth(error.message);
    if (codigo === 'ya_existe') return { ok: false, errores: { email: MENSAJE_ACCESO.ya_existe } };
    if (codigo === 'clave_debil')
      return { ok: false, errores: { clave: MENSAJE_ACCESO.clave_debil } };
    return { ok: false, error: MENSAJE_ACCESO[codigo] };
  }
  // Con la confirmación de correo activada, Supabase no da error si el correo ya
  // tiene cuenta: devuelve un usuario sin identidades. Se dice tal cual, como en
  // cualquier web, en vez de fingir que se ha enviado un correo.
  if (data.user && data.user.identities?.length === 0) {
    return { ok: false, errores: { email: MENSAJE_ACCESO.ya_existe } };
  }
  if (data.session) redirect(destinoSeguro(datos.volver));
  return { ok: true, aviso: 'confirmar', email: v.datos.email };
}

export async function recuperar(_: EstadoAcceso, form: FormData): Promise<EstadoAcceso> {
  const v = validar(EsquemaOlvido, deFormulario(form));
  if (!v.ok) return { ok: false, errores: v.errores };
  const supabase = await supabaseServidor();
  const { error } = await supabase.auth.resetPasswordForEmail(v.datos.email, {
    redirectTo: `${await origen()}/auth/recuperar`,
  });
  if (error && codigoDeAuth(error.message) === 'limite') {
    return { ok: false, error: MENSAJE_ACCESO.limite };
  }
  // Mismo mensaje haya cuenta o no: recuperar no debe revelar qué correos existen.
  return { ok: true, aviso: 'enviado', email: v.datos.email };
}

export async function cambiarClave(_: EstadoAcceso, form: FormData): Promise<EstadoAcceso> {
  const v = validar(EsquemaNuevaClave, deFormulario(form));
  if (!v.ok) return { ok: false, errores: v.errores };
  const supabase = await supabaseServidor();
  const { error } = await supabase.auth.updateUser({ password: v.datos.clave });
  if (error) {
    const codigo = codigoDeAuth(error.message);
    if (codigo === 'clave_debil')
      return { ok: false, errores: { clave: MENSAJE_ACCESO.clave_debil } };
    if (/same.*password|different from the old/i.test(error.message))
      return { ok: false, errores: { clave: 'Esa es la contraseña que ya tenías: elige otra.' } };
    return {
      ok: false,
      error: 'El enlace ha caducado o ya se usó. Pide otro desde «¿Olvidaste tu contraseña?».',
    };
  }
  redirect('/inicio?clave=cambiada');
}
