'use server';

// Composición: guarda la respuesta (feature sesion) y actualiza el repaso
// espaciado (feature srs). Las features no se conocen entre sí; app/ las junta.
import { z } from 'zod';
import { Correccion } from '@/features/correccion/esquema-salida';
import { guardarRespuesta, terminarSesion } from '@/features/sesion/db';
import { guardarRepaso, obtenerTarjeta } from '@/features/srs/db';
import { repasar, tarjetaNueva, type Nota } from '@/features/srs/scheduler';
import { supabaseServidor, usuarioActual } from '@/lib/supabase/server';

const Datos = z.object({
  sesionId: z.string().uuid(),
  preguntaId: z.string().min(1),
  preguntaVersion: z.number().int().positive(),
  respuesta: z.string().max(20_000),
  resultadoTests: z.unknown().optional(),
  correccion: Correccion.optional(),
  modelo: z.string().optional(),
  versionRubrica: z.number().int().optional(),
  duracionMs: z.number().int().nonnegative().optional(),
  nota: z.enum(['again', 'hard', 'good', 'easy']),
});
export type DatosGuardar = z.infer<typeof Datos>;

export async function guardarYRepasar(
  entrada: DatosGuardar,
): Promise<{ ok: true } | { ok: false; code: string }> {
  const usuario = await usuarioActual();
  if (!usuario) return { ok: false, code: 'sin_sesion' };
  const d = Datos.safeParse(entrada);
  if (!d.success) return { ok: false, code: 'datos' };
  const db = await supabaseServidor();

  const r = await guardarRespuesta(db, usuario.id, {
    sesionId: d.data.sesionId,
    preguntaId: d.data.preguntaId,
    preguntaVersion: d.data.preguntaVersion,
    respuesta: d.data.respuesta,
    resultadoTests: d.data.resultadoTests,
    correccion: d.data.correccion,
    puntuacion: d.data.correccion?.puntuacion,
    modelo: d.data.modelo,
    versionRubrica: d.data.versionRubrica,
    duracionMs: d.data.duracionMs,
  });
  if (!r.ok) return { ok: false, code: 'db' };

  const ahora = new Date();
  const tarjeta = (await obtenerTarjeta(db, usuario.id, d.data.preguntaId)) ?? tarjetaNueva(ahora);
  const resultado = repasar(tarjeta, d.data.nota as Nota, ahora);
  const g = await guardarRepaso(db, usuario.id, d.data.preguntaId, resultado, {
    respuestaId: r.id,
    puntuacion: d.data.correccion?.puntuacion,
    versionRubrica: d.data.versionRubrica,
    modelo: d.data.modelo,
  });
  return g.ok ? { ok: true } : { ok: false, code: 'db' };
}

export async function cerrarSesion(sesionId: string): Promise<void> {
  const usuario = await usuarioActual();
  if (!usuario) return;
  const db = await supabaseServidor();
  await terminarSesion(db, sesionId);
}
