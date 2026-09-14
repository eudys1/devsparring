'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { actualizarPerfil } from '@/features/cuenta/db';
import { supabaseServidor, usuarioActual } from '@/lib/supabase/server';

const Datos = z.object({
  nombre: z.string().trim().max(80).optional(),
  rol_objetivo: z.string().trim().min(1).max(80),
  nivel_por_defecto: z.enum(['junior', 'mid', 'senior']),
  idioma: z.enum(['es', 'en']),
});

export async function guardarPerfil(form: FormData): Promise<{ ok: boolean }> {
  const usuario = await usuarioActual();
  if (!usuario) return { ok: false };
  const d = Datos.safeParse({
    nombre: form.get('nombre') || undefined,
    rol_objetivo: form.get('rol_objetivo'),
    nivel_por_defecto: form.get('nivel_por_defecto'),
    idioma: form.get('idioma'),
  });
  if (!d.success) return { ok: false };
  const db = await supabaseServidor();
  const r = await actualizarPerfil(db, usuario.id, { ...d.data, nombre: d.data.nombre ?? null });
  revalidatePath('/cuenta');
  revalidatePath('/hoy');
  return r;
}
