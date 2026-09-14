'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { MODOS, NIVELES, PISTAS } from '@/features/preguntas/esquema';
import { crearSesion } from '@/features/sesion/db';
import { supabaseServidor, usuarioActual } from '@/lib/supabase/server';

const Datos = z.object({
  modo: z.enum(MODOS),
  nivel: z.enum(NIVELES),
  idioma: z.enum(['es', 'en']),
  pista: z.enum(PISTAS).optional(),
});

export async function empezarSesion(form: FormData): Promise<void> {
  const usuario = await usuarioActual();
  if (!usuario) redirect('/entrar');
  const pista = form.get('pista');
  const datos = Datos.parse({
    modo: form.get('modo'),
    nivel: form.get('nivel'),
    idioma: form.get('idioma'),
    pista: pista === '' || pista === null ? undefined : pista,
  });
  const db = await supabaseServidor();
  const r = await crearSesion(db, usuario.id, datos);
  if (!r.ok) redirect('/practicar?error=db');
  redirect(`/practicar/${r.id}`);
}
