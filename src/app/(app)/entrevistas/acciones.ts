'use server';

import { revalidatePath } from 'next/cache';
import { borrarEntrevista, crearEntrevista, NuevaEntrevista } from '@/features/entrevistas/db';
import { supabaseServidor, usuarioActual } from '@/lib/supabase/server';

export async function registrarEntrevista(form: FormData): Promise<{ ok: boolean; code?: string }> {
  const usuario = await usuarioActual();
  if (!usuario) return { ok: false, code: 'sin_sesion' };
  const preguntas = String(form.get('preguntas') ?? '')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);
  const d = NuevaEntrevista.safeParse({
    empresa: form.get('empresa'),
    rol: form.get('rol') || undefined,
    nivel: form.get('nivel') || undefined,
    fecha: form.get('fecha'),
    formato: form.get('formato') || undefined,
    preguntas,
    notas: form.get('notas') || undefined,
    resultado: form.get('resultado') || undefined,
  });
  if (!d.success) return { ok: false, code: 'datos' };
  const db = await supabaseServidor();
  const r = await crearEntrevista(db, usuario.id, d.data);
  revalidatePath('/entrevistas');
  return r.ok ? { ok: true } : { ok: false, code: 'db' };
}

export async function eliminarEntrevista(id: string): Promise<void> {
  const usuario = await usuarioActual();
  if (!usuario) return;
  const db = await supabaseServidor();
  await borrarEntrevista(db, id);
  revalidatePath('/entrevistas');
}
