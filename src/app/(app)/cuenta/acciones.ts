'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { actualizarPerfil, borrarPractica } from '@/features/cuenta/db';
import { EsquemaBorrar, EsquemaBorrarCuenta, EsquemaPerfil } from '@/features/cuenta/perfil';
import { registrarErrorDb } from '@/lib/supabase/errores';
import { supabaseServidor, usuarioActual } from '@/lib/supabase/server';
import { deFormulario, validar, type ResultadoForm } from '@/lib/validacion';

export async function guardarPerfil(_: ResultadoForm, form: FormData): Promise<ResultadoForm> {
  const usuario = await usuarioActual();
  if (!usuario) return { ok: false, error: 'Tu sesión ha caducado. Vuelve a entrar.' };
  const v = validar(EsquemaPerfil, {
    ...deFormulario(form),
    // Las casillas llegan repetidas con el mismo nombre: getAll las junta.
    pistas_foco: form.getAll('pistas_foco').map(String),
  });
  if (!v.ok) return { ok: false, errores: v.errores };
  const db = await supabaseServidor();
  const r = await actualizarPerfil(db, usuario.id, {
    ...v.datos,
    nombre: v.datos.nombre || null,
  });
  if (!r.ok) return { ok: false, error: 'No se pudo guardar. Vuelve a probar en un momento.' };
  revalidatePath('/cuenta');
  revalidatePath('/inicio');
  revalidatePath('/practicar');
  return { ok: true, aviso: 'Guardado.' };
}

export async function borrarDatos(_: ResultadoForm, form: FormData): Promise<ResultadoForm> {
  const usuario = await usuarioActual();
  if (!usuario) return { ok: false, error: 'Tu sesión ha caducado. Vuelve a entrar.' };
  const v = validar(EsquemaBorrar, deFormulario(form));
  if (!v.ok) return { ok: false, errores: v.errores };
  const db = await supabaseServidor();
  const r = await borrarPractica(db, usuario.id, { entrevistas: v.datos.entrevistas === 'si' });
  if (!r.ok)
    return {
      ok: false,
      error: 'No se pudo borrar todo. Lo que se borró ya no vuelve; prueba otra vez para el resto.',
    };
  revalidatePath('/', 'layout');
  return { ok: true, aviso: 'Datos borrados. Empiezas de cero.' };
}

export async function borrarCuenta(_: ResultadoForm, form: FormData): Promise<ResultadoForm> {
  const usuario = await usuarioActual();
  if (!usuario) return { ok: false, error: 'Tu sesión ha caducado. Vuelve a entrar.' };
  const v = validar(EsquemaBorrarCuenta, deFormulario(form));
  if (!v.ok) return { ok: false, errores: v.errores };
  if (v.datos.confirmacion.toLowerCase() !== (usuario.email ?? '').toLowerCase()) {
    return {
      ok: false,
      errores: { confirmacion: 'No coincide con el correo de tu cuenta. Escríbelo tal cual.' },
    };
  }
  const db = await supabaseServidor();
  // La función solo borra al usuario de la sesión (migración 20261015090000).
  const { error } = await db.rpc('borrar_mi_cuenta');
  if (error) {
    registrarErrorDb('borrarCuenta', error);
    return { ok: false, error: 'No se pudo borrar la cuenta. Vuelve a probar en un momento.' };
  }
  // El usuario ya no existe: se limpian las cookies de esta sesión y fuera.
  await db.auth.signOut({ scope: 'local' }).catch(() => undefined);
  redirect('/entrar?cuenta=borrada');
}
