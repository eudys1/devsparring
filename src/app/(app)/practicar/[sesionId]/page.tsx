import { notFound } from 'next/navigation';
import { cargarBanco } from '@/features/preguntas/cargar';
import { seleccionar } from '@/features/preguntas/filtrar';
import { obtenerSesion, respondidasEnSesion } from '@/features/sesion/db';
import { idsVencidas } from '@/features/srs/db';
import { config } from '@/lib/config';
import { supabaseServidor, usuarioActual } from '@/lib/supabase/server';
import { Motor } from './Motor';

const CANTIDAD: Record<string, number> = {
  flash: 10,
  verbal: 4,
  kata: 2,
  review: 3,
  diseno: 2,
  star: 4,
};

export default async function PaginaSesion({ params }: { params: Promise<{ sesionId: string }> }) {
  const { sesionId } = await params;
  const usuario = (await usuarioActual())!;
  const db = await supabaseServidor();
  const sesion = await obtenerSesion(db, sesionId);
  if (!sesion) notFound();

  const [banco, vencidas, respondidas] = await Promise.all([
    cargarBanco(),
    idsVencidas(db, usuario.id),
    respondidasEnSesion(db, sesionId),
  ]);
  const preguntas = seleccionar(banco, {
    modo: sesion.modo,
    nivel: sesion.nivel,
    pista: sesion.pista ?? undefined,
    cantidad: CANTIDAD[sesion.modo] ?? 5,
    semilla: sesion.semilla,
    prioritarias: vencidas,
  });
  const cfg = config();
  const esDueno =
    cfg.DEVSPARRING_OWNER_USER_ID !== undefined &&
    usuario.id === cfg.DEVSPARRING_OWNER_USER_ID &&
    !!cfg.DEVSPARRING_OWNER_ANTHROPIC_KEY;

  return (
    <Motor
      sesion={{ id: sesion.id, modo: sesion.modo, nivel: sesion.nivel, idioma: sesion.idioma }}
      preguntas={preguntas}
      yaRespondidas={respondidas}
      esDueno={esDueno}
    />
  );
}
