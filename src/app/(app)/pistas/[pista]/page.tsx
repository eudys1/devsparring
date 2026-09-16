import Link from 'next/link';
import { notFound } from 'next/navigation';
import { estilosBoton } from '@/components/ui/Boton';
import { Ficha, Peso } from '@/components/ui/Dato';
import { cargarBanco } from '@/features/preguntas/cargar';
import { PISTAS, type Pista } from '@/features/preguntas/esquema';
import { publicadas } from '@/features/preguntas/filtrar';
import { NOMBRE_PISTA, NOMBRE_TIPO } from '@/features/preguntas/nombres';
import { obtenerTarjetas } from '@/features/srs/db';
import { State } from '@/features/srs/scheduler';
import { ahora } from '@/lib/reloj';
import { supabaseServidor, usuarioActual } from '@/lib/supabase/server';

export async function generateMetadata({ params }: { params: Promise<{ pista: string }> }) {
  const { pista } = await params;
  const nombre = (PISTAS as readonly string[]).includes(pista)
    ? NOMBRE_PISTA[pista as Pista]
    : 'Pista';
  return { title: nombre };
}

const ESTADOS = {
  nueva: { texto: 'Nueva', tono: 'neutro' },
  vista: { texto: 'Vista', tono: 'neutro' },
  repasar: { texto: 'Por repasar', tono: 'esquina' },
  dominada: { texto: 'Dominada', tono: 'ok' },
} as const;

export default async function PaginaPista({ params }: { params: Promise<{ pista: string }> }) {
  const { pista } = await params;
  if (!(PISTAS as readonly string[]).includes(pista)) notFound();
  const usuario = (await usuarioActual())!;
  const db = await supabaseServidor();
  const [banco, tarjetas] = await Promise.all([cargarBanco(), obtenerTarjetas(db, usuario.id)]);
  const preguntas = publicadas(banco).filter((p) => p.pista === pista);
  const familias = [...new Set(preguntas.map((p) => p.familia))].sort();
  const ahoraMs = ahora().getTime();

  const estadoDe = (id: string): keyof typeof ESTADOS => {
    const t = tarjetas.get(id);
    if (!t) return 'nueva';
    if (t.due.getTime() <= ahoraMs) return 'repasar';
    if (t.state === State.Review && t.scheduled_days >= 21) return 'dominada';
    return 'vista';
  };

  return (
    <div className="mx-auto max-w-4xl">
      <Link
        href="/pistas"
        className="text-[0.8125rem] text-tinta-3 underline decoration-linea-fuerte underline-offset-2 hover:text-tinta"
      >
        ‹ Todas las pistas
      </Link>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-3 border-b border-linea pb-4">
        <div>
          <h1 className="display text-[2.5rem] text-tinta">{NOMBRE_PISTA[pista as Pista]}</h1>
          <p className="tabular font-mono text-[0.75rem] text-tinta-3">
            {preguntas.length} preguntas · {familias.length} familias
          </p>
        </div>
        <Link href="/practicar" className={estilosBoton('esquina')}>
          Practicar esta pista
        </Link>
      </div>

      {familias.map((familia) => (
        <section key={familia} className="mt-7">
          <h2 className="rotulo">{familia.replace(/-/g, ' ')}</h2>
          <ul className="mt-2 divide-y divide-linea border-y border-linea">
            {preguntas
              .filter((p) => p.familia === familia)
              .map((p) => {
                const estado = estadoDe(p.id);
                return (
                  <li key={p.id} className="grid grid-cols-[1fr_auto] items-start gap-4 py-3">
                    <span className="min-w-0">
                      <span className="block text-[0.9375rem] text-tinta">{p.texto.es}</span>
                      <span className="mt-1.5 flex flex-wrap items-center gap-2">
                        <Peso nivel={p.nivelMinimo} />
                        <Ficha>{NOMBRE_TIPO[p.tipo]}</Ficha>
                        {p.frecuencia === 'alta' ? <Ficha tono="esquina">Cae mucho</Ficha> : null}
                      </span>
                    </span>
                    <Ficha tono={ESTADOS[estado].tono}>{ESTADOS[estado].texto}</Ficha>
                  </li>
                );
              })}
          </ul>
        </section>
      ))}
    </div>
  );
}
