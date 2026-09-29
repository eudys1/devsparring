// Concha de la app: un carril a la izquierda en escritorio, ancho o compacto a
// elección del usuario (PlegarCarril), y una barra inferior en móvil. Arriba la
// marca, en medio las secciones en dos grupos (entrenar y lo tuyo), abajo la
// ficha de quien está dentro con el tema y la salida.
import Link from 'next/link';
import { CerrarSesion } from './CerrarSesion';
import { Marca } from './Marca';
import { NavEnlaces } from './NavEnlaces';
import { PlegarCarril } from './PlegarCarril';
import { Tema } from './Tema';

export function Concha({
  children,
  email,
  porRepasar = 0,
}: {
  children: React.ReactNode;
  email?: string;
  porRepasar?: number;
}) {
  const inicial = (email ?? '?').slice(0, 1).toUpperCase();
  return (
    <div className="min-h-dvh md:grid md:grid-cols-[var(--ancho-carril)_1fr]">
      <aside className="carril hidden md:sticky md:top-0 md:flex md:h-dvh md:flex-col">
        <Link
          href="/hoy"
          aria-label="Devsparring"
          className="carril-cabeza mx-5 border-b border-[var(--carril-linea)] py-5"
        >
          <span className="solo-ancho">
            <Marca />
          </span>
          <span className="solo-compacto display text-[1.75rem] text-[var(--carril-tinta)]">
            D<span className="text-punto">.</span>
          </span>
        </Link>

        <nav className="flex flex-col gap-5 px-3 pt-5" aria-label="Principal">
          <NavEnlaces porRepasar={porRepasar} variante="carril" />
        </nav>

        <div className="mt-auto p-3">
          <div className="carril-cuenta rounded-r2 border border-[var(--carril-linea)] bg-papel-2 p-3">
            <div className="flex items-center gap-2.5">
              <span
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-ink bg-celeste font-mono text-[0.8125rem] font-medium text-sobre-modo"
                aria-hidden
              >
                {inicial}
              </span>
              <span className="solo-ancho min-w-0">
                <span className="rotulo block">Tu cuenta</span>
                <span
                  className="block truncate text-[0.8125rem] text-[var(--carril-tinta)]"
                  title={email}
                >
                  {email}
                </span>
              </span>
            </div>
            <div className="carril-acciones mt-3 flex items-center gap-2">
              <Tema />
              <CerrarSesion className="flex-1" />
              <PlegarCarril />
            </div>
          </div>
        </div>
      </aside>

      <div className="pb-[4.5rem] md:pb-0">
        <header className="carril flex items-center justify-between border-b border-[var(--carril-linea)] px-4 py-3 md:hidden">
          <Link href="/hoy" aria-label="Devsparring">
            <Marca />
          </Link>
          <div className="flex items-center gap-2">
            <Tema />
            <Link
              href="/cuenta"
              aria-label="Tu cuenta"
              className="grid h-9 w-9 place-items-center rounded-full border-2 border-ink bg-celeste font-mono text-[0.8125rem] font-medium text-sobre-modo"
            >
              {inicial}
            </Link>
          </div>
        </header>
        <main id="contenido" className="px-4 py-6 md:px-10 md:py-10">
          {children}
        </main>
      </div>

      <nav
        className="carril fixed inset-x-0 bottom-0 z-20 grid grid-cols-5 border-t border-[var(--carril-linea)] pb-[env(safe-area-inset-bottom)] md:hidden"
        aria-label="Principal, barra inferior"
      >
        <NavEnlaces porRepasar={porRepasar} variante="barra" />
      </nav>
    </div>
  );
}
