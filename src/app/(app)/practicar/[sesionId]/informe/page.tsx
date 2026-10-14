import Link from 'next/link';
import { notFound } from 'next/navigation';
import { estilosBoton } from '@/components/ui/Boton';
import { cargarBanco } from '@/features/preguntas/cargar';
import { construirInforme, type NotaNum } from '@/features/sesion/informe';
import { InformeSesion } from '@/features/sesion/InformeSesion';
import { obtenerSesion, respuestasDeSesion } from '@/features/sesion/db';
import { supabaseServidor } from '@/lib/supabase/server';

export const metadata = { title: 'Informe de la sesión' };

// Al terminar una sesión se llega aquí, no a Inicio: qué tal fue y qué hacer
// ahora. Se rehace con lo guardado, así que también vale para sesiones retomadas.
export default async function InformeDeSesion({
  params,
}: {
  params: Promise<{ sesionId: string }>;
}) {
  const { sesionId } = await params;
  const db = await supabaseServidor();
  const [sesion, respuestas, banco] = await Promise.all([
    obtenerSesion(db, sesionId),
    respuestasDeSesion(db, sesionId),
    cargarBanco(),
  ]);
  if (!sesion) notFound();
  const porId = new Map(banco.map((p) => [p.id, p]));
  const filas = respuestas.flatMap((r) => {
    const p = porId.get(r.pregunta_id);
    if (!p || r.nota === null) return [];
    return [
      {
        id: p.id,
        texto: sesion.idioma === 'en' ? p.texto.en : p.texto.es,
        pista: p.pista,
        nota: r.nota as NotaNum,
        puntuacion: r.puntuacion,
        duracionMs: r.duracion_ms,
      },
    ];
  });
  const informe = construirInforme(
    filas.map((f) => ({
      preguntaId: f.id,
      pista: f.pista,
      nota: f.nota,
      duracionMs: f.duracionMs,
    })),
    sesion.nivel,
  );
  const otra = new URLSearchParams({ modo: sesion.modo });
  if (sesion.pista) otra.set('pista', sesion.pista);

  return (
    <InformeSesion
      informe={informe}
      filas={filas}
      nivel={sesion.nivel}
      titulo={
        informe.total === 0
          ? 'Sesión sin respuestas'
          : informe.acierto >= 85
            ? 'Muy buena sesión'
            : informe.acierto >= 50
              ? 'Sesión hecha'
              : 'Sesión dura, y de esas se aprende'
      }
      conEnlaces
      acciones={
        <>
          <Link href={`/practicar?${otra}`} className={estilosBoton('esquina')}>
            Otra sesión igual
          </Link>
          <Link href="/inicio" className={estilosBoton('normal')}>
            Ir a Inicio
          </Link>
        </>
      }
    />
  );
}
