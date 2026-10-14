'use server';

import { revalidatePath } from 'next/cache';
import { borrarEntrevista, crearEntrevista } from '@/features/entrevistas/db';
import { lineas, NuevaEntrevista } from '@/features/entrevistas/esquema';
import { supabaseServidor, usuarioActual } from '@/lib/supabase/server';
import { deFormulario, validar, type ResultadoForm } from '@/lib/validacion';

export async function registrarEntrevista(
  _: ResultadoForm,
  form: FormData,
): Promise<ResultadoForm> {
  const usuario = await usuarioActual();
  if (!usuario) return { ok: false, error: 'Tu sesión ha caducado. Vuelve a entrar.' };
  const datos = deFormulario(form);
  const v = validar(NuevaEntrevista, { ...datos, preguntas: lineas(datos.preguntas ?? '') });
  if (!v.ok) return { ok: false, errores: v.errores };
  const db = await supabaseServidor();
  const r = await crearEntrevista(db, usuario.id, v.datos);
  if (!r.ok) return { ok: false, error: 'No se pudo guardar. Vuelve a probar en un momento.' };
  revalidatePath('/entrevistas');
  return { ok: true, aviso: 'Guardada.' };
}

export async function eliminarEntrevista(id: string): Promise<void> {
  const usuario = await usuarioActual();
  if (!usuario) return;
  const db = await supabaseServidor();
  await borrarEntrevista(db, id);
  revalidatePath('/entrevistas');
}
