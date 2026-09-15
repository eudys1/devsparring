import 'server-only';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Nivel } from '../preguntas/esquema';
import { registrarErrorDb } from '@/lib/supabase/errores';

export type Perfil = {
  user_id: string;
  nombre: string | null;
  rol_objetivo: string;
  nivel_por_defecto: Nivel;
  idioma: 'es' | 'en';
};

export async function obtenerPerfil(db: SupabaseClient, userId: string): Promise<Perfil> {
  const { data } = await db.from('perfiles').select('*').eq('user_id', userId).maybeSingle();
  return (
    (data as Perfil | null) ?? {
      user_id: userId,
      nombre: null,
      rol_objetivo: 'fullstack',
      nivel_por_defecto: 'mid',
      idioma: 'es',
    }
  );
}

export async function actualizarPerfil(
  db: SupabaseClient,
  userId: string,
  cambios: Partial<Pick<Perfil, 'nombre' | 'rol_objetivo' | 'nivel_por_defecto' | 'idioma'>>,
): Promise<{ ok: boolean }> {
  const { error } = await db
    .from('perfiles')
    .upsert({ user_id: userId, ...cambios, actualizado_en: new Date().toISOString() });
  if (error) registrarErrorDb('actualizarPerfil', error);
  return { ok: !error };
}
