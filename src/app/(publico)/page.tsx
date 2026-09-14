import Link from 'next/link';
import { Marca } from '@/components/Concha';
import { Boton } from '@/components/ui/Boton';
import { cargarBanco } from '@/features/preguntas/cargar';
import { publicadas } from '@/features/preguntas/filtrar';
import { PISTAS } from '@/features/preguntas/esquema';
import { NOMBRE_PISTA } from '@/features/preguntas/nombres';
import { usuarioActual } from '@/lib/supabase/server';

// La landing enseña datos vivos: el banco real, contado en el servidor.
export default async function Landing() {
  const [banco, usuario] = await Promise.all([cargarBanco(), usuarioActual()]);
  const lista = publicadas(banco);
  const porPista = PISTAS.map((p) => ({
    pista: p,
    n: lista.filter((q) => q.pista === p).length,
  })).filter((x) => x.n > 0);
  const max = Math.max(1, ...porPista.map((x) => x.n));
  const katas = lista.filter((q) => q.tipo === 'kata').length;

  return (
    <div className="mx-auto max-w-5xl px-5 py-8 md:py-14">
      <header className="flex items-center justify-between">
        <Marca grande />
        <nav className="flex gap-2">
          {usuario ? (
            <Link href="/hoy">
              <Boton variante="brasa">Entrar a entrenar</Boton>
            </Link>
          ) : (
            <Link href="/entrar">
              <Boton variante="normal">Entrar</Boton>
            </Link>
          )}
        </nav>
      </header>

      <section className="mt-14 grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-end">
        <div>
          <h1
            className="font-display text-[2.6rem] font-semibold leading-[1.02] md:text-[3.6rem]"
            style={{ fontVariationSettings: '"wdth" 90' }}
          >
            Que la primera entrevista dura no sea la de verdad.
          </h1>
          <p className="prosa mt-5 text-lg text-tinta-2">
            Teoría hablada, katas con editor, revisión de código ajeno, diseño y preguntas de
            comportamiento. Todo en español, corregido con una rúbrica distinta para junior y para
            senior, y lo que falles vuelve cuando toca.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href={usuario ? '/practicar' : '/entrar'}>
              <Boton variante="brasa">Empezar una sesión</Boton>
            </Link>
            <Link href="/entrar?modo=registro">
              <Boton variante="normal">Crear cuenta</Boton>
            </Link>
          </div>
          <p className="mt-4 text-[0.8125rem] text-tinta-3">
            La corrección usa tu propia clave de la API de Claude, que vive solo en tu navegador.
            Sin clave, copias el prompt y corriges en el chat que quieras.
          </p>
        </div>

        <div className="rounded-r border border-linea bg-papel p-5 shadow-panel">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-tinta-3">
            Banco de preguntas · ahora mismo
          </p>
          <p className="tabular mt-1 font-display text-4xl font-semibold">
            {lista.length}
            <span className="ml-2 text-base font-normal text-tinta-2">
              preguntas, {katas} katas
            </span>
          </p>
          <ul className="mt-4 space-y-1.5">
            {porPista.map(({ pista, n }) => (
              <li
                key={pista}
                className="grid grid-cols-[118px_1fr_32px] items-center gap-2 text-[0.8125rem]"
              >
                <span className="truncate text-tinta-2">{NOMBRE_PISTA[pista]}</span>
                <span className="h-2 rounded-[2px] bg-linea">
                  <span
                    className="block h-2 rounded-[2px] bg-brasa"
                    style={{ width: `${Math.round((n / max) * 100)}%` }}
                  />
                </span>
                <span className="tabular text-right font-mono text-tinta-3">{n}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-16 grid gap-6 border-t border-linea pt-10 md:grid-cols-3">
        <div>
          <h2 className="text-lg font-semibold">Seis modos, cuatro entrevistas</h2>
          <p className="mt-2 text-tinta-2">
            En 2026 te van a hacer teoría hablada, código con reloj, revisión de código ajeno con o
            sin IA, y preguntas de situación. Cada modo entrena una.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold">La misma pregunta, dos varas</h2>
          <p className="mt-2 text-tinta-2">
            Cada pregunta trae una rúbrica junior y otra senior, visibles. Sabes qué te faltó para
            el nivel al que aplicas, no una nota de caja negra.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Tus entrevistas reales</h2>
          <p className="mt-2 text-tinta-2">
            Después de cada entrevista apuntas qué te preguntaron. Es el dato que nadie más tiene y
            alimenta lo que practicas.
          </p>
        </div>
      </section>
    </div>
  );
}
