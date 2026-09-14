import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Boton } from '@/components/ui/Boton';
import { Etiqueta } from '@/components/ui/Etiqueta';
import { cargarBanco } from '@/features/preguntas/cargar';
import { PISTAS, type Pista } from '@/features/preguntas/esquema';
import { publicadas } from '@/features/preguntas/filtrar';
import { NOMBRE_NIVEL, NOMBRE_PISTA, NOMBRE_TIPO } from '@/features/preguntas/nombres';
import { obtenerTarjetas } from '@/features/srs/db';
import { State } from '@/features/srs/scheduler';
import { ahora } from '@/lib/reloj';
import { supabaseServidor, usuarioActual } from '@/lib/supabase/server';

export default async function PaginaPista({ params }: { params: Promise<{ pista: string }> }) {
  const { pista } = await params;
  if (!(PISTAS as readonly string[]).includes(pista)) notFound();
  const usuario = (await usuarioActual())!;
  const db = await supabaseServidor();
  const [banco, tarjetas] = await Promise.all([cargarBanco(), obtenerTarjetas(db, usuario.id)]);
  const preguntas = publicadas(banco).filter((p) => p.pista === pista);
  const familias = [...new Set(preguntas.map((p) => p.familia))];
  const ahoraMs = ahora().getTime();

  return (
    <div className="mx-auto max-w-4xl">
      <p className="text-[0.8125rem] text-tinta-3">
        <Link href="/pistas" className="hover:underline">
          ‹ Pistas
        </Link>
      </p>
      <div className="mt-1 flex flex-wrap items-end justify-between gap-3">
        <h1 className="text-2xl font-semibold">{NOMBRE_PISTA[pista as Pista]}</h1>
        <Link href={`/practicar?modo=flash`}>
          <Boton variante="brasa">Practicar esta pista</Boton>
        </Link>
      </div>
      {familias.map((familia) => (
        <section key={familia} className="mt-7">
          <h2 className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-tinta-3">
            {familia.replace(/-/g, ' ')}
          </h2>
          <ul className="mt-2 divide-y divide-linea rounded-r border border-linea bg-papel">
            {preguntas
              .filter((p) => p.familia === familia)
              .map((p) => {
                const t = tarjetas.get(p.id);
                const estado = !t
                  ? 'nueva'
                  : t.due.getTime() <= ahoraMs
                    ? 'por repasar'
                    : t.state === State.Review && t.scheduled_days >= 21
                      ? 'dominada'
                      : 'vista';
                const tono =
                  estado === 'por repasar' ? 'brasa' : estado === 'dominada' ? 'ok' : 'neutro';
                return (
                  <li
                    key={p.id}
                    className="grid grid-cols-[1fr_auto] items-start gap-3 px-4 py-2.5"
                  >
                    <span>
                      <span className="block text-[0.9375rem]">{p.texto.es}</span>
                      <span className="mt-1 flex flex-wrap gap-1.5">
                        <Etiqueta
                          tono={
                            p.nivelMinimo === 'junior'
                              ? 'junior'
                              : p.nivelMinimo === 'senior'
                                ? 'senior'
                                : 'neutro'
                          }
                        >
                          {NOMBRE_NIVEL[p.nivelMinimo]}
                        </Etiqueta>
                        <Etiqueta>{NOMBRE_TIPO[p.tipo]}</Etiqueta>
                        <Etiqueta>{p.frecuencia}</Etiqueta>
                      </span>
                    </span>
                    <Etiqueta tono={tono}>{estado}</Etiqueta>
                  </li>
                );
              })}
          </ul>
        </section>
      ))}
    </div>
  );
}
