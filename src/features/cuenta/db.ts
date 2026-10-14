import 'server-only';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Nivel, Pista } from '../preguntas/esquema';
import { registrarErrorDb } from '@/lib/supabase/errores';

export type Perfil = {
  user_id: string;
  nombre: string | null;
  rol_objetivo: string;
  nivel_por_defecto: Nivel;
  idioma: 'es' | 'en';
  // Tu stack: las pistas de las que salen las sesiones mezcladas. Vacío = todas.
  pistas_foco: Pista[];
};

export async function obtenerPerfil(db: SupabaseClient, userId: string): Promise<Perfil> {
  const { data } = await db.from('perfiles').select('*').eq('user_id', userId).maybeSingle();
  const p = data as (Omit<Perfil, 'pistas_foco'> & { pistas_foco?: Pista[] | null }) | null;
  return p
    ? { ...p, pistas_foco: p.pistas_foco ?? [] }
    : {
        user_id: userId,
        nombre: null,
        rol_objetivo: 'fullstack',
        nivel_por_defecto: 'mid',
        idioma: 'es',
        pistas_foco: [],
      };
}

export async function actualizarPerfil(
  db: SupabaseClient,
  userId: string,
  cambios: Partial<Omit<Perfil, 'user_id'>>,
): Promise<{ ok: boolean }> {
  const { error } = await db
    .from('perfiles')
    .upsert({ user_id: userId, ...cambios, actualizado_en: new Date().toISOString() });
  if (error) registrarErrorDb('actualizarPerfil', error);
  return { ok: !error };
}

/**
 * Borra la práctica del usuario: respuestas, repasos, el calendario de cada
 * pregunta (tarjetas) y las sesiones; con `entrevistas`, también su registro.
 * El perfil y la cuenta se quedan. Fila a fila con su user_id: el RLS ya
 * impide tocar lo de otro, y aquí no hay TRUNCATE ni CASCADE masivo.
 */
export async function borrarPractica(
  db: SupabaseClient,
  userId: string,
  opciones: { entrevistas: boolean },
): Promise<{ ok: boolean }> {
  const tablas = ['repasos', 'respuestas', 'tarjetas', 'sesiones'];
  if (opciones.entrevistas) tablas.push('entrevistas');
  for (const t of tablas) {
    const { error } = await db.from(t).delete().eq('user_id', userId);
    if (error) {
      registrarErrorDb(`borrarPractica:${t}`, error);
      return { ok: false };
    }
  }
  return { ok: true };
}
