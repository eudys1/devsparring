// Acceso a sesiones y respuestas. Recibe el cliente de Supabase ya autenticado;
// el RLS garantiza que cada usuario solo toca lo suyo.
import 'server-only';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Modo, Nivel, Pista } from '../preguntas/esquema';
import { registrarErrorDb } from '@/lib/supabase/errores';

export type Sesion = {
  id: string;
  user_id: string;
  modo: Modo;
  nivel: Nivel;
  idioma: 'es' | 'en';
  pista: Pista | null;
  semilla: number;
  iniciada_en: string;
  terminada_en: string | null;
};

export type NuevaRespuesta = {
  sesionId: string;
  preguntaId: string;
  preguntaVersion: number;
  respuesta: string;
  resultadoTests?: unknown;
  correccion?: unknown;
  puntuacion?: number;
  modelo?: string;
  versionRubrica?: number;
  duracionMs?: number;
};

export async function crearSesion(
  db: SupabaseClient,
  userId: string,
  datos: { modo: Modo; nivel: Nivel; idioma: 'es' | 'en'; pista?: Pista },
): Promise<{ ok: true; id: string } | { ok: false; code: 'db' }> {
  const { data, error } = await db
    .from('sesiones')
    .insert({
      user_id: userId,
      modo: datos.modo,
      nivel: datos.nivel,
      idioma: datos.idioma,
      pista: datos.pista ?? null,
      semilla: Math.floor(Math.random() * 2 ** 31),
    })
    .select('id')
    .single();
  if (error || !data) {
    registrarErrorDb('crearSesion', error);
    return { ok: false, code: 'db' };
  }
  return { ok: true, id: data.id as string };
}

export async function obtenerSesion(db: SupabaseClient, id: string): Promise<Sesion | null> {
  const { data } = await db.from('sesiones').select('*').eq('id', id).maybeSingle();
  return (data as Sesion | null) ?? null;
}

export async function terminarSesion(db: SupabaseClient, id: string): Promise<void> {
  await db.from('sesiones').update({ terminada_en: new Date().toISOString() }).eq('id', id);
}

export async function guardarRespuesta(
  db: SupabaseClient,
  userId: string,
  r: NuevaRespuesta,
): Promise<{ ok: true; id: string } | { ok: false; code: 'db' }> {
  const { data, error } = await db
    .from('respuestas')
    .insert({
      user_id: userId,
      sesion_id: r.sesionId,
      pregunta_id: r.preguntaId,
      pregunta_version: r.preguntaVersion,
      respuesta: r.respuesta,
      resultado_tests: r.resultadoTests ?? null,
      correccion: r.correccion ?? null,
      puntuacion: r.puntuacion ?? null,
      modelo: r.modelo ?? null,
      version_rubrica: r.versionRubrica ?? null,
      duracion_ms: r.duracionMs ?? null,
    })
    .select('id')
    .single();
  if (error || !data) {
    registrarErrorDb('guardarRespuesta', error);
    return { ok: false, code: 'db' };
  }
  return { ok: true, id: data.id as string };
}

// Ids ya respondidos en una sesión, para retomarla donde se dejó.
export async function respondidasEnSesion(db: SupabaseClient, sesionId: string): Promise<string[]> {
  const { data } = await db.from('respuestas').select('pregunta_id').eq('sesion_id', sesionId);
  return ((data ?? []) as { pregunta_id: string }[]).map((x) => x.pregunta_id);
}

export type ResumenRespuesta = {
  id: string;
  pregunta_id: string;
  puntuacion: number | null;
  creada_en: string;
  modo: Modo;
};

export async function ultimasRespuestas(
  db: SupabaseClient,
  userId: string,
  n = 8,
): Promise<ResumenRespuesta[]> {
  const { data } = await db
    .from('respuestas')
    .select('id, pregunta_id, puntuacion, creada_en, sesiones(modo)')
    .eq('user_id', userId)
    .order('creada_en', { ascending: false })
    .limit(n);
  return (
    (data ?? []) as unknown as (Omit<ResumenRespuesta, 'modo'> & {
      sesiones: { modo: Modo } | null;
    })[]
  ).map((x) => ({
    id: x.id,
    pregunta_id: x.pregunta_id,
    puntuacion: x.puntuacion,
    creada_en: x.creada_en,
    modo: x.sesiones?.modo ?? 'flash',
  }));
}

export async function contarRespuestas(db: SupabaseClient, userId: string): Promise<number> {
  const { count } = await db
    .from('respuestas')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId);
  return count ?? 0;
}
