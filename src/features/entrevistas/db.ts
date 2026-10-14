import 'server-only';
import type { SupabaseClient } from '@supabase/supabase-js';
import { registrarErrorDb } from '@/lib/supabase/errores';
import type { NuevaEntrevista } from './esquema';

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
