'use server';

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { terminarSesion } from '@/features/sesion/db';
import { supabaseServidor, usuarioActual } from '@/lib/supabase/server';

// Descartar una sesión a medias: lo respondido se queda (cuenta para el repaso);
// solo deja de aparecer como "en curso".
export async function descartarSesion(form: FormData): Promise<void> {
  const usuario = await usuarioActual();
  const id = z.string().uuid().safeParse(form.get('sesionId'));
  if (!usuario || !id.success) return;
  const db = await supabaseServidor();
  await terminarSesion(db, id.data);
  revalidatePath('/inicio');
}
