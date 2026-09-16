import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Marca } from '@/components/Marca';
import { Revelar } from '@/components/Revelar';
import { cargarBanco } from '@/features/preguntas/cargar';
import { MODOS, PISTAS, type Modo, type Pregunta } from '@/features/preguntas/esquema';
import { paraModo, publicadas } from '@/features/preguntas/filtrar';
import { NOMBRE_PISTA } from '@/features/preguntas/nombres';
import { elegirTesis } from '@/features/preguntas/tesis';
import { varas } from '@/features/preguntas/varas';
import { usuarioActual } from '@/lib/supabase/server';
import { CaraACara } from './CaraACara';
import { Cinta } from './Cinta';
import { Modos } from './Modos';
import { Mosaico, type Tesela } from './Mosaico';
import { RondaViva, type Guion } from './RondaViva';
import { ConmutadorVara, VaraProvider } from './Vara';

// Las respuestas de la ronda en directo son ejemplos escritos aquí y marcados
// como simulación en la propia tarjeta. La pregunta y las dimensiones son las
// mismas que usa el producto.
const GUIONES: Omit<Guion, 'pregunta' | 'pista'>[] = [
  {
    respuesta: 'Un índice es una estructura auxiliar que acelera las búsquedas por esa columna.',
    dimensiones: [
      { nombre: 'Corrección técnica', valor: 4 },
      { nombre: 'Complejidad y trade-offs', valor: 1 },
      { nombre: 'Comunicación', valor: 3 },
    ],
    puntuacion: 6,
    fallo: 'No dices qué le cuesta a las escrituras ni cuándo un índice estorba.',
  },
  {
    respuesta: 'Recorro la lista con un Set y voy guardando los que ya he visto.',
    dimensiones: [
      { nombre: 'Corrección técnica', valor: 4 },
      { nombre: 'Complejidad y trade-offs', valor: 2 },
      { nombre: 'Comunicación', valor: 4 },
    ],
    puntuacion: 7,
    fallo: 'Falta la complejidad y qué harías si los datos vienen de la base de datos.',
  },
  {
    respuesta: 'Lo memorizo con useMemo para que no se recalcule en cada render.',
    dimensiones: [
      { nombre: 'Corrección técnica', valor: 3 },
      { nombre: 'Complejidad y trade-offs', valor: 2 },
      { nombre: 'Comunicación', valor: 3 },
    ],
    puntuacion: 5,
    fallo: 'No dices cuándo memorizar es peor que no hacerlo, que es lo que te preguntan.',
  },
];

const sinCodigo = (t: string) => t.replace(/`/g, '');

// Una muestra del banco para el mosaico: unas pocas por pista, en orden estable
// para que la landing no cambie en cada recarga, y una abierta por cada una de
// las pistas grandes con una pregunta corta que se lea entera en una tarjeta.
function muestraDelBanco(lista: Pregunta[]): Tesela[] {
  const POR_PISTA = 5;
  const ABIERTAS = 6;
  const porPista = new Map<string, Pregunta[]>();
  for (const p of [...lista].sort((a, b) => a.id.localeCompare(b.id))) {
    porPista.set(p.pista, [...(porPista.get(p.pista) ?? []), p]);
  }
  const pistasPorTamano = [...porPista.entries()].sort((a, b) => b[1].length - a[1].length);
  const abiertas = new Set(
    pistasPorTamano
      .map(([, ps]) => ps.find((p) => !p.contexto && p.texto.es.length <= 90)?.id)
      .filter((id): id is string => !!id)
      .slice(0, ABIERTAS),
  );
  const teselas: Tesela[] = [];
  for (const [, ps] of pistasPorTamano) {
    const abierta = ps.find((p) => abiertas.has(p.id));
    const resto = ps.filter((p) => p !== abierta).slice(0, POR_PISTA);
    for (const p of abierta ? [abierta, ...resto] : resto) {
      teselas.push({
        id: p.id,
        pista: NOMBRE_PISTA[p.pista],
        nivel: p.nivelMinimo,
        texto: sinCodigo(p.texto.es),
        abierta: abiertas.has(p.id),
      });
    }
  }
  return teselas;
}

export default async function Landing() {
  const [banco, usuario] = await Promise.all([cargarBanco(), usuarioActual()]);
  const lista = publicadas(banco);
  const tesis = elegirTesis(lista, 1);
  const v = varas(lista);
  const katas = lista.filter((p) => p.tipo === 'kata').length;
  const fuentes = new Set(lista.flatMap((p) => p.fuentes.map((f) => new URL(f.url).hostname))).size;
  const conteo = Object.fromEntries(MODOS.map((m) => [m, paraModo(lista, m).length])) as Record<
    Modo,
    number
  >;

  // La ronda en directo usa preguntas cortas y reales, una por guion.
  const cortas = lista.filter((p) => !p.contexto && p.texto.es.length < 92);
  const guiones: Guion[] = GUIONES.map((g, i) => {
    const p = cortas[Math.floor((cortas.length / GUIONES.length) * i)] ?? cortas[i]!;
    return { ...g, pregunta: sinCodigo(p.texto.es), pista: NOMBRE_PISTA[p.pista] };
  });

  const teselas = muestraDelBanco(lista);
  const porPista = PISTAS.map(
    (p) => [NOMBRE_PISTA[p], lista.filter((q) => q.pista === p).length] as [string, number],
  )
    .filter(([, n]) => n > 0)
    .sort((a, b) => b[1] - a[1]);

  const cinta = PISTAS.flatMap((pista) =>
    lista
      .filter((p) => p.pista === pista && p.texto.es.length < 72 && !p.contexto)
      .slice(0, 2)
      .map((p) => sinCodigo(p.texto.es)),
  ).slice(0, 22);

  const enlaceEntrar = usuario ? '/hoy' : '/entrar';

  return (
    <VaraProvider>
      <div className="grano noche">
        {/* ── El cartel: la noche con su foco, y el bloque a la derecha ──── */}
        <div className="foco relative">
          <div className="reticula reticula-fundido pointer-events-none absolute inset-0 -z-10" />
          <div className="mx-auto max-w-[82rem] px-4 sm:px-6">
            <header className="flex items-center justify-between gap-4 py-4 sm:py-5">
              <Link href="/" aria-label="Devsparring, inicio">
                <Marca />
              </Link>
              <nav
                className="flex items-center gap-4 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-[var(--noche-tinta-2)] sm:gap-6"
                aria-label="Secciones"
              >
                <a href="#modos" className="hidden hover:text-[var(--noche-tinta)] md:inline">
                  Modos
                </a>
                <a href="#banco" className="hidden hover:text-[var(--noche-tinta)] md:inline">
                  El banco
                </a>
                <a href="#vara" className="hidden hover:text-[var(--noche-tinta)] md:inline">
                  Cómo juzga
                </a>
                <Link href="/demo" className="text-esquina hover:text-[var(--noche-tinta)]">
                  Ver la demo
                </Link>
                <Link
                  href={enlaceEntrar}
                  className="boton-borde inline-flex min-h-9 items-center rounded-full px-4 transition-transform duration-[140ms] ease-salida hover:bg-[var(--noche-2)] active:scale-[0.97]"
                >
                  {usuario ? 'Seguir' : 'Entrar'}
                </Link>
              </nav>
            </header>

            <section
              id="contenido"
              className="grid items-stretch gap-8 pb-14 pt-6 lg:grid-cols-2 lg:gap-10 lg:pb-20 lg:pt-10"
              aria-label="Presentación"
            >
              <div className="flex flex-col justify-end">
                <span className="inline-flex w-max items-center gap-2 rounded-full border border-[var(--noche-linea-2)] px-3 py-1 font-mono text-[0.625rem] uppercase tracking-[0.12em] text-[var(--noche-tinta-2)]">
                  <span className="brillo h-1.5 w-1.5 rounded-full bg-esquina" />
                  {lista.length} preguntas · {porPista.length} pistas · español · 2026
                </span>

                <h1 className="cartel mt-6 text-[clamp(3rem,8.5vw,6rem)] text-[var(--noche-tinta)]">
                  <span className="barrido block">Que la primera</span>
                  <span className="barrido barrido-2 block">entrevista dura</span>
                  <span className="barrido barrido-3 block">
                    <span className="brillo-texto text-esquina">no sea</span> la de verdad
                  </span>
                </h1>

                <p className="mt-6 max-w-[50ch] text-[1.0625rem] leading-relaxed text-[var(--noche-tinta-2)]">
                  Ya no te preguntan solo teoría. Te hacen escribir código con reloj, revisar código
                  ajeno y defender decisiones delante de alguien. Aquí entrenas las cuatro cosas, y
                  te juzgan con la vara de tu nivel.
                </p>

                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link
                    href="/demo"
                    className="boton-luz group inline-flex min-h-12 items-center gap-3 rounded-full pl-5 pr-2 text-[1rem] font-medium transition-transform duration-[140ms] ease-salida active:scale-[0.97]"
                  >
                    Probar sin cuenta
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-black/25 transition-transform duration-[160ms] ease-salida group-hover:translate-x-0.5">
                      <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
                    </span>
                  </Link>
                  <Link
                    href="/entrar?modo=registro"
                    className="boton-borde inline-flex min-h-12 items-center rounded-full px-5 text-[1rem] transition-[transform,background-color] duration-[140ms] ease-salida hover:bg-[var(--noche-2)] active:scale-[0.97]"
                  >
                    Crear cuenta
                  </Link>
                </div>
              </div>

              <RondaViva guiones={guiones} />
            </section>
          </div>

          <Cinta textos={cinta} />
        </div>

        {/* ── Asalto 01: los modos ──────────────────────────────────────── */}
        <Revelar
          as="section"
          className="mx-auto max-w-[82rem] scroll-mt-6 px-4 py-16 sm:px-6 sm:py-20"
        >
          <div
            id="modos"
            className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--noche-linea)] pb-6"
          >
            <div>
              <span className="rotulo">Asalto 01</span>
              <h2 className="cartel mt-2 text-[clamp(2rem,5vw,3.5rem)] text-[var(--noche-tinta)]">
                Seis modos,
                <br />
                cuatro entrevistas
              </h2>
            </div>
            <p className="max-w-[42ch] text-[0.9375rem] text-[var(--noche-tinta-2)]">
              Cada modo entrena una parte distinta del proceso. Esto es lo que ves de verdad en cada
              uno, con las preguntas que hay hoy en el banco.
            </p>
          </div>
          <div className="mt-8">
            <Modos conteo={conteo} />
          </div>
        </Revelar>

        {/* ── Asalto 02: la vara ────────────────────────────────────────── */}
        <Revelar as="section" className="mx-auto max-w-[82rem] px-4 py-16 sm:px-6 sm:py-20">
          <div
            id="vara"
            className="flex flex-wrap items-end justify-between gap-x-8 gap-y-5 border-b border-[var(--noche-linea)] pb-6"
          >
            <div>
              <span className="rotulo">Asalto 02</span>
              <h2 className="cartel mt-2 text-[clamp(2rem,5vw,3.5rem)] text-[var(--noche-tinta)]">
                La misma pregunta,
                <br />
                dos varas
              </h2>
            </div>
            <div className="flex flex-col items-start gap-3">
              <ConmutadorVara etiqueta="Júzgala de" />
              <p className="max-w-[42ch] text-[0.9375rem] text-[var(--noche-tinta-2)]">
                Cambia la vara y la pregunta se relee con los criterios del otro nivel. Es lo que
                hace el producto con tus respuestas.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <CaraACara preguntas={tesis} />
          </div>

          <dl className="mt-8 grid gap-px overflow-hidden rounded-r2 border border-[var(--noche-linea)] bg-[var(--noche-linea)] sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: 'Criterios de media', j: v.criteriosJunior, s: v.criteriosSenior, u: '' },
              { t: 'Piden complejidad', j: 0, s: v.complejidad, u: '%' },
              { t: 'Piden cómo lo probarías', j: 0, s: v.pruebas, u: '%' },
              { t: 'Piden cómo escala', j: 0, s: v.escala, u: '%' },
            ].map(({ t, j, s, u }) => (
              <div key={t} className="bg-[var(--noche-2)] px-4 py-5">
                <dt className="text-[0.8125rem] text-[var(--noche-tinta-2)]">{t}</dt>
                <dd className="mt-2 flex items-baseline gap-3">
                  <span className="tabular cartel text-[1.5rem] text-[var(--noche-tinta-3)]">
                    {j}
                    {u}
                  </span>
                  <span className="text-[var(--noche-tinta-3)]">/</span>
                  <span className="tabular cartel brillo-texto text-[2.5rem] text-esquina">
                    {s}
                    {u}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-[0.8125rem] text-[var(--noche-tinta-3)]">
            Junior a la izquierda, senior a la derecha. Medido sobre el banco entero.
          </p>
        </Revelar>

        {/* ── Asalto 03: el banco, una muestra y las cifras ─────────────── */}
        <Revelar as="section" className="mx-auto max-w-[82rem] px-4 py-16 sm:px-6 sm:py-20">
          <div
            id="banco"
            className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--noche-linea)] pb-6"
          >
            <div>
              <span className="rotulo">Asalto 03</span>
              <h2 className="cartel mt-2 text-[clamp(2rem,5vw,3.5rem)] text-[var(--noche-tinta)]">
                El banco entero
              </h2>
            </div>
            <dl className="flex flex-wrap gap-x-8 gap-y-3">
              {[
                { n: lista.length, t: 'preguntas' },
                { n: katas, t: 'katas con tests' },
                { n: fuentes, t: 'fuentes citadas' },
              ].map(({ n, t }) => (
                <div key={t}>
                  <dt className="sr-only">{t}</dt>
                  <dd>
                    <span className="tabular cartel brillo-texto block text-[2.5rem] leading-none text-esquina">
                      {n}
                    </span>
                    <span className="mt-1 block text-[0.75rem] text-[var(--noche-tinta-2)]">
                      {t}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="mt-8">
            <Mosaico teselas={teselas} porPista={porPista} total={lista.length} />
          </div>
        </Revelar>

        {/* ── Asalto 04: lo que no hace ─────────────────────────────────── */}
        <Revelar as="section" className="mx-auto max-w-[82rem] px-4 py-16 sm:px-6 sm:py-20">
          <div className="border-b border-[var(--noche-linea)] pb-6">
            <span className="rotulo">Asalto 04</span>
            <h2 className="cartel mt-2 text-[clamp(2rem,5vw,3.5rem)] text-[var(--noche-tinta)]">
              Lo que no hace
            </h2>
          </div>
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {[
              {
                t: 'No te sopla en la entrevista',
                d: 'Hay productos que se ponen encima de la videollamada. Es trampa, se detecta y se nota. Aquí se entrena antes, no se copia durante.',
              },
              {
                t: 'No guarda tu clave',
                d: 'La clave de la API vive en tu navegador y viaja solo para pedir la corrección. Nunca se escribe en la base de datos ni en un registro.',
              },
              {
                t: 'No te dice que todo está bien',
                d: 'Se puntúa contra una rúbrica visible y se nombra lo que faltó. Si los tests no pasan, no hay nota alta por mucho que suene bien.',
              },
            ].map(({ t, d }) => (
              <div key={t} className="panel px-5 py-6">
                <h3 className="text-[1.125rem] font-semibold text-[var(--noche-tinta)]">{t}</h3>
                <p className="mt-2 text-[0.9375rem] leading-snug text-[var(--noche-tinta-2)]">
                  {d}
                </p>
              </div>
            ))}
          </div>
        </Revelar>

        {/* ── Cierre: el bloque otra vez, a lo grande ───────────────────── */}
        <Revelar as="section" className="mx-auto max-w-[82rem] px-4 pb-16 sm:px-6 sm:pb-20">
          <div className="bloque bloque-luna rounded-r2 px-6 py-10 sm:px-10 sm:py-14">
            <div className="flex flex-wrap items-end justify-between gap-8">
              <h2 className="cartel text-[clamp(2.5rem,7vw,5rem)]">
                Cinco minutos
                <br />y sabes por dónde andas
              </h2>
              <Link
                href="/demo"
                className="group inline-flex min-h-14 items-center gap-3 rounded-full bg-white pl-6 pr-2.5 text-[1.0625rem] font-medium text-[var(--bloque)] transition-transform duration-[140ms] ease-salida active:scale-[0.97]"
              >
                Probar sin cuenta
                <span className="grid h-10 w-10 place-items-center rounded-full bg-[var(--bloque)]/15 transition-transform duration-[160ms] ease-salida group-hover:translate-x-0.5">
                  <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
                </span>
              </Link>
            </div>
          </div>

          <footer className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--noche-linea)] pt-6 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-[var(--noche-tinta-2)]">
            <Marca />
            <p>Proyecto personal de Eudys · Licencia MIT</p>
          </footer>
        </Revelar>
      </div>
    </VaraProvider>
  );
}
