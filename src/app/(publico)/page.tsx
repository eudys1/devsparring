import { ArrowRight, BookOpen, ClipboardList, Flame, Route, UserRound } from 'lucide-react';
import Link from 'next/link';
import { Marca } from '@/components/Marca';
import { Revelar } from '@/components/Revelar';
import { Casillas } from '@/components/ui/Dato';
import { cargarBanco } from '@/features/preguntas/cargar';
import { MODOS, PISTAS, type Modo, type Pregunta } from '@/features/preguntas/esquema';
import { paraModo, publicadas } from '@/features/preguntas/filtrar';
import { NOMBRE_MODO, NOMBRE_PISTA } from '@/features/preguntas/nombres';
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

  // Muestra de Tipo test: la primera pregunta con opciones cortas, que caben
  // en la ficha sin cortarse.
  const conTest = lista.find((p) => p.test && p.test.opciones.every((o) => o.texto.length <= 34));
  const muestraTest = conTest?.test
    ? { enunciado: conTest.test.enunciado ?? conTest.texto.es, test: conTest.test }
    : undefined;

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

  const titulo2 = 'cartel mt-2 text-[clamp(1.9rem,4.2vw,3rem)] text-tinta';
  const cabecera = 'flex flex-wrap items-end justify-between gap-4 border-b border-linea pb-6';

  return (
    <VaraProvider>
      <main className="overflow-x-clip">
        {/* ── El cartel: el titular a la izquierda y el mazo a la derecha ─── */}
        <div className="mx-auto max-w-[82rem] px-4 sm:px-6">
          <header className="flex items-center justify-between gap-4 py-4 sm:py-5">
            <Link href="/" aria-label="Devsparring, inicio">
              <Marca />
            </Link>
            <nav
              className="flex items-center gap-4 text-[0.875rem] text-tinta-2 sm:gap-6"
              aria-label="Secciones"
            >
              <a href="#como" className="hidden hover:text-tinta md:inline">
                Cómo funciona
              </a>
              <a href="#modos" className="hidden hover:text-tinta md:inline">
                Modos
              </a>
              <a href="#banco" className="hidden hover:text-tinta md:inline">
                El banco
              </a>
              <Link href="/demo" className="font-medium text-punto hover:text-tinta">
                Ver la demo
              </Link>
              <Link
                href={enlaceEntrar}
                className="boton boton-sec inline-flex min-h-9 items-center px-4 text-[0.875rem] font-semibold"
              >
                {usuario ? 'Seguir' : 'Entrar'}
              </Link>
            </nav>
          </header>

          <section
            id="contenido"
            className="grid items-center gap-10 pb-14 pt-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:pb-20 lg:pt-10"
            aria-label="Presentación"
          >
            <div>
              <span className="inline-flex w-max items-center gap-2 rounded-[6px] border-2 border-ink bg-papel px-2.5 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-tinta shadow-[var(--dura)]">
                <span className="h-1.5 w-1.5 rounded-full bg-punto" />
                {lista.length} preguntas · {porPista.length} pistas · español
              </span>

              <h1 className="cartel mt-7 text-[clamp(2.6rem,6.2vw,4.75rem)] text-tinta">
                <span className="barrido block">Que la primera</span>
                <span className="barrido barrido-2 block">entrevista dura</span>
                <span className="barrido barrido-3 block">
                  <span className="pegatina">no sea</span> la de verdad
                </span>
              </h1>

              <p className="mt-7 max-w-[50ch] text-[1.0625rem] leading-relaxed text-tinta-2">
                Ya no te preguntan solo teoría. Te hacen escribir código con reloj, revisar código
                ajeno y defender decisiones delante de alguien. Aquí entrenas las cuatro cosas, y te
                juzgan con la vara de tu nivel.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/demo"
                  className="boton boton-pri group inline-flex min-h-12 items-center gap-2.5 px-5 text-[1rem] font-semibold"
                >
                  Probar sin cuenta
                  <ArrowRight
                    className="h-4 w-4 transition-transform duration-[160ms] ease-salida group-hover:translate-x-0.5"
                    strokeWidth={2.25}
                    aria-hidden
                  />
                </Link>
                <Link
                  href="/entrar?modo=registro"
                  className="boton boton-sec inline-flex min-h-12 items-center px-5 text-[1rem] font-semibold"
                >
                  Crear cuenta
                </Link>
              </div>
            </div>

            <RondaViva guiones={guiones} />
          </section>
        </div>

        <Cinta textos={cinta} />

        {/* ── Asalto 01: cómo funciona, el recorrido y lo que hay dentro ──── */}
        <Revelar
          as="section"
          className="mx-auto max-w-[82rem] scroll-mt-6 px-4 py-16 sm:px-6 sm:py-20"
        >
          <div id="como" className={cabecera}>
            <div>
              <span className="rotulo">Asalto 01</span>
              <h2 className={titulo2}>Cómo funciona una sesión</h2>
            </div>
            <p className="max-w-[44ch] text-[0.9375rem] text-tinta-2">
              Cuatro pasos que se repiten. Lo que fallas vuelve antes y lo que dominas, más tarde.
            </p>
          </div>

          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <li className="tarjeta flex flex-col gap-2.5 p-5">
              <Paso n={1} />
              <h3 className="text-[1.0625rem] font-bold text-tinta">Eliges modo y nivel</h3>
              <p className="text-[0.9375rem] leading-snug text-tinta-2">
                Seis modos y una vara: junior, mid o senior. La vara cambia lo que se te exige.
              </p>
              <p className="mt-auto flex flex-wrap gap-1.5 pt-2">
                {(['flash', 'verbal', 'kata'] as const).map((m) => (
                  <span key={m} className={`chip-modo m-${m}`}>
                    {NOMBRE_MODO[m].nombre}
                  </span>
                ))}
              </p>
            </li>
            <li className="tarjeta flex flex-col gap-2.5 p-5">
              <Paso n={2} />
              <h3 className="text-[1.0625rem] font-bold text-tinta">Respondes a tu manera</h3>
              <p className="text-[0.9375rem] leading-snug text-tinta-2">
                Según el modo, escribes una respuesta corta o desarrollada, programas con tests que
                se ejecutan o buscas lo que falla en código ajeno.
              </p>
            </li>
            <li className="tarjeta flex flex-col gap-2.5 p-5">
              <Paso n={3} />
              <h3 className="text-[1.0625rem] font-bold text-tinta">Te corrigen con tu vara</h3>
              <p className="text-[0.9375rem] leading-snug text-tinta-2">
                Contra la rúbrica de tu nivel. Con IA y tu propia clave, o marcando tú los criterios
                que cubriste.
              </p>
              <dl className="mt-auto grid gap-1.5 pt-2 text-[0.8125rem] text-tinta-2">
                {(
                  [
                    ['Corrección', 4],
                    ['Trade-offs', 2],
                  ] as const
                ).map(([t, v]) => (
                  <div key={t} className="grid grid-cols-[6rem_1fr_2rem] items-center gap-2">
                    <dt>{t}</dt>
                    <dd>
                      <Casillas valor={v} de={5} tono="aviso" />
                    </dd>
                    <dd className="tabular text-right font-mono text-[0.75rem]">{v}/5</dd>
                  </div>
                ))}
              </dl>
            </li>
            <li className="tarjeta flex flex-col gap-2.5 p-5">
              <Paso n={4} />
              <h3 className="text-[1.0625rem] font-bold text-tinta">Vuelve cuando toca</h3>
              <p className="text-[0.9375rem] leading-snug text-tinta-2">
                Repetición espaciada: cada acierto aleja la próxima vez que te la pregunta.
              </p>
              <p
                role="img"
                className="mt-auto flex items-center justify-between pt-3 font-mono text-[0.6875rem] text-tinta-3"
                aria-label="Un ejemplo: vuelve hoy y luego en 1, 3, 8 y 21 días"
              >
                {['hoy', '1 d', '3 d', '8 d', '21 d'].map((t) => (
                  <span key={t} className="flex flex-col items-center gap-1.5" aria-hidden>
                    <span className="h-3 w-3 rounded-full border-2 border-ink bg-celeste" />
                    {t}
                  </span>
                ))}
              </p>
            </li>
          </ol>

          <h3 className="display mt-12 text-[1.5rem] text-tinta">Qué hay dentro</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {[
              { Icono: Flame, t: 'Hoy', d: 'Lo que toca repasar, tu racha y cómo vas por pista.' },
              {
                Icono: BookOpen,
                t: 'Practicar',
                d: 'Eliges modo, nivel y pista, y empiezas una sesión.',
              },
              {
                Icono: Route,
                t: 'Temario',
                d: 'Todas las preguntas por tema, con su respuesta y lo que se exige a cada nivel.',
              },
              {
                Icono: ClipboardList,
                t: 'Entrevistas',
                d: 'Apuntas lo que te preguntaron en entrevistas reales.',
              },
              {
                Icono: UserRound,
                t: 'Cuenta',
                d: 'Tu clave de API, el modelo que corrige y tu perfil.',
              },
            ].map(({ Icono, t, d }) => (
              <li key={t} className="tarjeta flex flex-col gap-2 p-4">
                <span
                  className="grid h-9 w-9 place-items-center rounded-[8px] border-2 border-ink bg-papel-2 text-tinta"
                  aria-hidden
                >
                  <Icono className="h-4 w-4" strokeWidth={2} />
                </span>
                <span className="text-[1rem] font-bold text-tinta">{t}</span>
                <span className="text-[0.875rem] leading-snug text-tinta-2">{d}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 border-t border-linea pt-4 text-[0.9375rem] text-tinta-2">
            <span className="font-semibold text-tinta">¿Sin clave de API?</span> También funciona:
            ves la respuesta que aprueba y marcas tú lo que cubriste.
          </p>
        </Revelar>

        {/* ── Asalto 02: los modos ──────────────────────────────────────── */}
        <Revelar
          as="section"
          className="mx-auto max-w-[82rem] scroll-mt-6 px-4 py-16 sm:px-6 sm:py-20"
        >
          <div id="modos" className={cabecera}>
            <div>
              <span className="rotulo">Asalto 02</span>
              <h2 className={titulo2}>
                Seis modos,
                <br />
                cuatro entrevistas
              </h2>
            </div>
            <p className="max-w-[42ch] text-[0.9375rem] text-tinta-2">
              Cada modo entrena una parte distinta del proceso. Esto es lo que ves de verdad en cada
              uno, con las preguntas que hay hoy en el banco.
            </p>
          </div>
          <div className="mt-8">
            <Modos conteo={conteo} test={muestraTest} />
          </div>
        </Revelar>

        {/* ── Asalto 03: la vara ────────────────────────────────────────── */}
        <Revelar as="section" className="mx-auto max-w-[82rem] px-4 py-16 sm:px-6 sm:py-20">
          <div id="vara" className={`${cabecera} gap-x-8 gap-y-5`}>
            <div>
              <span className="rotulo">Asalto 03</span>
              <h2 className={titulo2}>
                La misma pregunta,
                <br />
                dos varas
              </h2>
            </div>
            <div className="flex flex-col items-start gap-3">
              <ConmutadorVara etiqueta="Júzgala de" />
              <p className="max-w-[42ch] text-[0.9375rem] text-tinta-2">
                Cambia la vara y la pregunta se relee con los criterios del otro nivel. Es lo que
                hace el producto con tus respuestas.
              </p>
            </div>
          </div>

          <div className="mt-8">
            <CaraACara preguntas={tesis} />
          </div>

          <dl className="tarjeta mt-8 grid overflow-hidden sm:grid-cols-2 lg:grid-cols-4">
            {[
              { t: 'Criterios de media', j: v.criteriosJunior, s: v.criteriosSenior, u: '' },
              { t: 'Piden complejidad', j: 0, s: v.complejidad, u: '%' },
              { t: 'Piden cómo lo probarías', j: 0, s: v.pruebas, u: '%' },
              { t: 'Piden cómo escala', j: 0, s: v.escala, u: '%' },
            ].map(({ t, j, s, u }) => (
              <div
                key={t}
                className="border-b border-linea px-5 py-5 last:border-0 sm:border-r lg:border-b-0"
              >
                <dt className="text-[0.8125rem] text-tinta-2">{t}</dt>
                <dd className="mt-2 flex items-baseline gap-3">
                  <span className="tabular display text-[1.5rem] text-tinta-3">
                    {j}
                    {u}
                  </span>
                  <span className="text-tinta-3">/</span>
                  <span className="tabular display text-[2.5rem] text-punto">
                    {s}
                    {u}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-[0.8125rem] text-tinta-3">
            Junior a la izquierda, senior a la derecha. Medido sobre el banco entero.
          </p>
        </Revelar>

        {/* ── Asalto 04: el banco, una muestra y las cifras ─────────────── */}
        <Revelar as="section" className="mx-auto max-w-[82rem] px-4 py-16 sm:px-6 sm:py-20">
          <div id="banco" className={cabecera}>
            <div>
              <span className="rotulo">Asalto 04</span>
              <h2 className={titulo2}>El banco entero</h2>
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
                    <span className="tabular display block text-[2.5rem] text-punto">{n}</span>
                    <span className="mt-1 block text-[0.75rem] text-tinta-2">{t}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="mt-8">
            <Mosaico teselas={teselas} porPista={porPista} total={lista.length} />
          </div>
        </Revelar>

        {/* ── Asalto 05: lo que no hace ─────────────────────────────────── */}
        <Revelar as="section" className="mx-auto max-w-[82rem] px-4 py-16 sm:px-6 sm:py-20">
          <div className="border-b border-linea pb-6">
            <span className="rotulo">Asalto 05</span>
            <h2 className={titulo2}>Lo que no hace</h2>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
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
                <h3 className="text-[1.125rem] font-bold text-tinta">{t}</h3>
                <p className="mt-2 text-[0.9375rem] leading-snug text-tinta-2">{d}</p>
              </div>
            ))}
          </div>
        </Revelar>

        {/* ── Cierre: el bloque, a lo grande ────────────────────────────── */}
        <Revelar as="section" className="mx-auto max-w-[82rem] px-4 pb-16 sm:px-6 sm:pb-20">
          <div className="bloque py-10 pl-10 pr-6 sm:py-14 sm:pl-14 sm:pr-10">
            <div className="flex flex-wrap items-end justify-between gap-8">
              <h2 className="cartel text-[clamp(2.1rem,5.5vw,3.75rem)] text-tinta">
                Cinco minutos
                <br />y sabes por dónde andas
              </h2>
              <Link
                href="/demo"
                className="boton boton-pri group inline-flex min-h-14 items-center gap-2.5 px-6 text-[1.0625rem] font-semibold"
              >
                Probar sin cuenta
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-[160ms] ease-salida group-hover:translate-x-0.5"
                  strokeWidth={2.25}
                  aria-hidden
                />
              </Link>
            </div>
          </div>

          <footer className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-linea pt-6 font-mono text-[0.6875rem] uppercase tracking-[0.1em] text-tinta-2">
            <Marca />
            <p>Proyecto personal de Eudys · Licencia MIT</p>
          </footer>
        </Revelar>
      </main>
    </VaraProvider>
  );
}

// El número de paso: una ficha de tinta con la cifra, que es lo que ordena el recorrido.
function Paso({ n }: { n: number }) {
  return (
    <span className="display grid h-11 w-11 place-items-center rounded-[10px] border-2 border-ink bg-esquina text-[1.375rem] text-esquina-tinta">
      {n}
    </span>
  );
}
