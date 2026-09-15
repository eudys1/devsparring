import 'server-only';
import type { SupabaseClient } from '@supabase/supabase-js';
import { z } from 'zod';
import { registrarErrorDb } from '@/lib/supabase/errores';

export const NuevaEntrevista = z.object({
  empresa: z.string().trim().min(1).max(120),
  rol: z.string().trim().max(120).optional(),
  nivel: z.enum(['junior', 'mid', 'senior']).optional(),
  fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  formato: z.string().trim().max(200).optional(),
  preguntas: z.array(z.string().trim().min(1).max(500)).max(50),
  notas: z.string().trim().max(4000).optional(),
  resultado: z.string().trim().max(120).optional(),
});
export type NuevaEntrevista = z.infer<typeof NuevaEntrevista>;

export type Entrevista = NuevaEntrevista & { id: string; creada_en: string };

export async function listarEntrevistas(db: SupabaseClient, userId: string): Promise<Entrevista[]> {
  const { data } = await db
    .from('entrevistas')
    .select('*')
    .eq('user_id', userId)
    .order('fecha', { ascending: false });
  return (data ?? []) as Entrevista[];
}

export async function crearEntrevista(
  db: SupabaseClient,
  userId: string,
  e: NuevaEntrevista,
): Promise<{ ok: boolean }> {
  const { error } = await db.from('entrevistas').insert({ user_id: userId, ...e });
  if (error) registrarErrorDb('crearEntrevista', error);
  return { ok: !error };
}

export async function borrarEntrevista(db: SupabaseClient, id: string): Promise<{ ok: boolean }> {
  const { error } = await db.from('entrevistas').delete().eq('id', id);
  return { ok: !error };
}
