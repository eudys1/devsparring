'use server';

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { obtenerPerfil } from '@/features/cuenta/db';
import { MODOS, NIVELES, PISTAS } from '@/features/preguntas/esquema';
import { crearSesion } from '@/features/sesion/db';
import { supabaseServidor, usuarioActual } from '@/lib/supabase/server';

const Datos = z.object({
  modo: z.enum(MODOS),
  nivel: z.enum(NIVELES),
  idioma: z.enum(['es', 'en']),
  // 'stack': tu stack (o todas si no tienes); 'todas': todas; o una pista.
  pista: z.union([z.enum(PISTAS), z.literal('stack'), z.literal('todas')]),
});

export async function empezarSesion(form: FormData): Promise<void> {
  const usuario = await usuarioActual();
  if (!usuario) redirect('/entrar');
  const d = Datos.safeParse({
    modo: form.get('modo'),
    nivel: form.get('nivel'),
    idioma: form.get('idioma'),
    pista: form.get('pista') || 'stack',
  });
  // Solo llega aquí con un formulario manipulado: se vuelve a elegir.
  if (!d.success) redirect('/practicar?error=datos');
  const db = await supabaseServidor();
  const { pista, ...resto } = d.data;
  const foco = pista === 'stack' ? (await obtenerPerfil(db, usuario.id)).pistas_foco : [];
  const r = await crearSesion(db, usuario.id, {
    ...resto,
    pista: pista === 'stack' || pista === 'todas' ? undefined : pista,
    pistas: foco.length ? foco : undefined,
  });
  if (!r.ok) redirect('/practicar?error=db');
  redirect(`/practicar/${r.id}`);
}
