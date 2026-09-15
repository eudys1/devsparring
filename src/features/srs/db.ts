// Persistencia del estado FSRS y del log de repasos. La lógica está en scheduler.ts.
import 'server-only';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Card, RecordLogItem } from 'ts-fsrs';
import { State } from 'ts-fsrs';
import { registrarErrorDb } from '@/lib/supabase/errores';

export type FilaTarjeta = {
  pregunta_id: string;
  due: string;
  stability: number;
  difficulty: number;
  elapsed_days: number;
  scheduled_days: number;
  learning_steps: number;
  reps: number;
  lapses: number;
  state: number;
  last_review: string | null;
};

export function filaATarjeta(f: FilaTarjeta): Card {
  return {
    due: new Date(f.due),
    stability: f.stability,
    difficulty: f.difficulty,
    elapsed_days: f.elapsed_days,
    scheduled_days: f.scheduled_days,
    learning_steps: f.learning_steps,
    reps: f.reps,
    lapses: f.lapses,
    state: f.state as State,
    last_review: f.last_review ? new Date(f.last_review) : undefined,
  };
}

export async function obtenerTarjeta(
  db: SupabaseClient,
  userId: string,
  preguntaId: string,
): Promise<Card | null> {
  const { data } = await db
    .from('tarjetas')
    .select('*')
    .eq('user_id', userId)
    .eq('pregunta_id', preguntaId)
    .maybeSingle();
  return data ? filaATarjeta(data as FilaTarjeta) : null;
}

export async function obtenerTarjetas(
  db: SupabaseClient,
  userId: string,
): Promise<Map<string, Card>> {
  const { data } = await db.from('tarjetas').select('*').eq('user_id', userId);
  const m = new Map<string, Card>();
  for (const f of (data ?? []) as FilaTarjeta[]) m.set(f.pregunta_id, filaATarjeta(f));
  return m;
}

export async function idsVencidas(
  db: SupabaseClient,
  userId: string,
  ahora = new Date(),
): Promise<string[]> {
  const { data } = await db
    .from('tarjetas')
    .select('pregunta_id')
    .eq('user_id', userId)
    .lte('due', ahora.toISOString())
    .order('due', { ascending: true });
  return ((data ?? []) as { pregunta_id: string }[]).map((x) => x.pregunta_id);
}

export async function guardarRepaso(
  db: SupabaseClient,
  userId: string,
  preguntaId: string,
  resultado: RecordLogItem,
  extras: { respuestaId?: string; puntuacion?: number; versionRubrica?: number; modelo?: string },
): Promise<{ ok: boolean }> {
  const c = resultado.card;
  const { error: e1 } = await db.from('tarjetas').upsert({
    user_id: userId,
    pregunta_id: preguntaId,
    due: c.due.toISOString(),
    stability: c.stability,
    difficulty: c.difficulty,
    elapsed_days: c.elapsed_days,
    scheduled_days: c.scheduled_days,
    learning_steps: c.learning_steps,
    reps: c.reps,
    lapses: c.lapses,
    state: c.state,
    last_review: c.last_review ? c.last_review.toISOString() : null,
    actualizada_en: new Date().toISOString(),
  });
  const { error: e2 } = await db.from('repasos').insert({
    user_id: userId,
    pregunta_id: preguntaId,
    respuesta_id: extras.respuestaId ?? null,
    nota: resultado.log.rating,
    puntuacion: extras.puntuacion ?? null,
    version_rubrica: extras.versionRubrica ?? null,
    modelo: extras.modelo ?? null,
    elapsed_days: resultado.log.elapsed_days,
    state: resultado.log.state,
    repasada_en: resultado.log.review.toISOString(),
  });
  if (e1) registrarErrorDb('guardarRepaso.tarjetas', e1);
  if (e2) registrarErrorDb('guardarRepaso.repasos', e2);
  return { ok: !e1 && !e2 };
}
