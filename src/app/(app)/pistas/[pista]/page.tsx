import Link from 'next/link';
import { notFound } from 'next/navigation';
import { estilosBoton } from '@/components/ui/Boton';
import { Ficha, Peso } from '@/components/ui/Dato';
import { enLinea, Markdown } from '@/components/ui/Markdown';
import { cargarBanco } from '@/features/preguntas/cargar';
import { NIVELES, PISTAS, type Pista } from '@/features/preguntas/esquema';
import { publicadas } from '@/features/preguntas/filtrar';
import { NOMBRE_NIVEL, NOMBRE_PISTA, NOMBRE_TIPO } from '@/features/preguntas/nombres';
import { rubricaParaNivel } from '@/features/preguntas/rubrica';
import { obtenerTarjetas } from '@/features/srs/db';
import { State } from '@/features/srs/scheduler';
import { ahora } from '@/lib/reloj';
import { supabaseServidor, usuarioActual } from '@/lib/supabase/server';

export async function generateMetadata({ params }: { params: Promise<{ pista: string }> }) {
  const { pista } = await params;
  const nombre = (PISTAS as readonly string[]).includes(pista)
    ? NOMBRE_PISTA[pista as Pista]
    : 'Temario';
  return { title: nombre };
}

// El estado de cada pregunta se codifica en el canto izquierdo de su ficha:
// gris (nueva o vista), azul (por repasar), verde (dominada).
const ESTADOS = {
  nueva: { texto: 'Nueva', tono: 'neutro', canto: 'border-l-linea' },
  vista: { texto: 'Vista', tono: 'neutro', canto: 'border-l-linea-fuerte' },
  repasar: { texto: 'Por repasar', tono: 'esquina', canto: 'border-l-esquina' },
  dominada: { texto: 'Dominada', tono: 'ok', canto: 'border-l-ok' },
} as const;

// El temario de una pista es material de estudio: cada pregunta es una ficha
// que se abre y enseña la respuesta que aprueba y qué se exige a cada nivel.
// Leer antes de practicar es el "ejemplo resuelto"; practicar después, sin
// mirar, es el recuerdo activo.
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
  const porNivel = NIVELES.map(
    (n) => [NOMBRE_NIVEL[n], preguntas.filter((p) => p.nivelMinimo === n).length] as const,
  );
  const numeroDe = new Map(preguntas.map((p, i) => [p.id, i + 1]));

  return (
    <div className="mx-auto max-w-4xl">
      <Link
        href="/pistas"
        className="text-[0.8125rem] text-tinta-3 underline decoration-linea-fuerte underline-offset-2 hover:text-tinta"
      >
        ‹ Temario
      </Link>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-3 border-b border-linea pb-4">
        <div>
          <h1 className="display text-[2.5rem] text-tinta">{NOMBRE_PISTA[pista as Pista]}</h1>
          <p className="tabular mt-1 flex flex-wrap gap-x-4 font-mono text-[0.75rem] text-tinta-3">
            <span>{preguntas.length} preguntas</span>
            <span>{familias.length} familias</span>
            {porNivel.map(([n, c]) => (
              <span key={n}>
                {c} {n.toLowerCase()}
              </span>
            ))}
          </p>
        </div>
        <Link href={`/practicar?pista=${pista}`} className={estilosBoton('esquina')}>
          Practicar esta pista
        </Link>
      </div>
      <p className="mt-3 text-[0.875rem] text-tinta-2">
        Abre cualquier ficha para leer la respuesta que aprueba y qué se exige a cada nivel.
        Estudiar antes vale; luego practica sin mirar, que es lo que se queda.
      </p>

      {familias.map((familia) => {
        const lista = preguntas.filter((p) => p.familia === familia);
        return (
          <section key={familia} className="mt-8">
            <h2 className="flex items-baseline justify-between gap-3 border-b border-linea pb-2">
              <span className="display text-[1.375rem] capitalize text-tinta">
                {familia.replace(/-/g, ' ')}
              </span>
              <span className="tabular font-mono text-[0.75rem] text-tinta-3">
                {lista.length} preguntas
              </span>
            </h2>
            <ul className="mt-3 space-y-2">
              {lista.map((p) => {
                const estado = estadoDe(p.id);
                const numero = numeroDe.get(p.id) ?? 0;
                return (
                  <li key={p.id} id={p.id} className="scroll-mt-6">
                    <details
                      className={`tarjeta group overflow-hidden border-l-4 ${ESTADOS[estado].canto}`}
                    >
                      <summary className="grid list-none grid-cols-[2.25rem_1fr] gap-x-3 px-3 py-3 transition-[background-color] duration-[160ms] ease-salida hover:bg-papel-2 marker:content-none sm:grid-cols-[2.25rem_1fr_auto] [&::-webkit-details-marker]:hidden">
                        <span className="tabular pt-0.5 font-mono text-[0.75rem] text-tinta-3">
                          {String(numero).padStart(2, '0')}
                        </span>
                        <span className="min-w-0">
                          <span
                            className="block text-[1rem] font-medium leading-snug text-tinta"
                            dangerouslySetInnerHTML={{ __html: enLinea(p.texto.es) }}
                          />
                          <span className="mt-2 flex flex-wrap items-center gap-2">
                            <Peso nivel={p.nivelMinimo} />
                            <Ficha>{NOMBRE_TIPO[p.tipo]}</Ficha>
                            {p.frecuencia === 'alta' ? (
                              <Ficha tono="esquina">Cae mucho</Ficha>
                            ) : null}
                            <span className="text-[0.75rem] text-tinta-3 group-open:hidden">
                              Ver la respuesta ›
                            </span>
                          </span>
                        </span>
                        <span className="col-start-2 mt-2 sm:col-start-3 sm:mt-0">
                          <Ficha tono={ESTADOS[estado].tono}>{ESTADOS[estado].texto}</Ficha>
                        </span>
                      </summary>
                      <div className="grid gap-5 border-t border-linea bg-papel-2 px-4 py-4 md:grid-cols-[1.2fr_0.8fr]">
                        <div>
                          <h3 className="rotulo">La respuesta que aprueba</h3>
                          <Markdown
                            texto={p.respuestaModelo}
                            className="mt-2 text-[0.9375rem] text-tinta-2"
                          />
                        </div>
                        <div className="space-y-4">
                          {(['junior', 'senior'] as const).map((n) => (
                            <div key={n}>
                              <h3 className="rotulo">Qué se exige de {NOMBRE_NIVEL[n]}</h3>
                              <ol className="mt-1.5 space-y-1">
                                {rubricaParaNivel(p, n).map((c, i) => (
                                  <li
                                    key={i}
                                    className="grid grid-cols-[1.25rem_1fr] gap-1 text-[0.8125rem] leading-snug text-tinta-2"
                                  >
                                    <span className="tabular font-mono text-[0.6875rem] text-tinta-3">
                                      {i + 1}.
                                    </span>
                                    <span
                                      className="prosa"
                                      dangerouslySetInnerHTML={{ __html: enLinea(c) }}
                                    />
                                  </li>
                                ))}
                              </ol>
                            </div>
                          ))}
                        </div>
                      </div>
                    </details>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
