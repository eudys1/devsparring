// Concha de la app: el carril es un bloque de azul tinta en escritorio y una
// barra inferior en móvil. Arriba la marca, en medio las secciones en dos
// grupos (entrenar y lo tuyo), abajo la ficha de quien está dentro con el tema
// y la salida. La entrada activa la marca NavEnlaces con la ruta actual.
import Link from 'next/link';
import { CerrarSesion } from './CerrarSesion';
import { Marca } from './Marca';
import { NavEnlaces } from './NavEnlaces';
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
    <div className="min-h-dvh md:grid md:grid-cols-[248px_1fr]">
      <aside className="bloque hidden md:sticky md:top-0 md:flex md:h-dvh md:flex-col">
        <Link href="/hoy" className="mx-5 border-b border-[var(--bloque-linea)] py-5">
          <Marca />
        </Link>

        <nav className="flex flex-col gap-5 px-3 pt-5" aria-label="Principal">
          <NavEnlaces porRepasar={porRepasar} variante="carril" />
        </nav>

        <div className="mt-auto p-3">
          <div className="rounded-r2 bg-black/25 p-3 shadow-[inset_0_1px_0_rgb(255_255_255/0.08)]">
            <div className="flex items-center gap-2.5">
              <span
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-white/15 font-mono text-[0.8125rem] font-medium text-white"
                aria-hidden
              >
                {inicial}
              </span>
              <span className="min-w-0">
                <span className="rotulo block">Tu cuenta</span>
                <span
                  className="block truncate text-[0.8125rem] text-[var(--bloque-tinta)]"
                  title={email}
                >
                  {email}
                </span>
              </span>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <Tema />
              <CerrarSesion className="flex-1" />
            </div>
          </div>
        </div>
      </aside>

      <div className="pb-[4.5rem] md:pb-0">
        <header className="bloque flex items-center justify-between px-4 py-3 md:hidden">
          <Link href="/hoy">
            <Marca />
          </Link>
          <div className="flex items-center gap-2">
            <Tema />
            <Link
              href="/cuenta"
              aria-label="Tu cuenta"
              className="grid h-9 w-9 place-items-center rounded-full bg-white/15 font-mono text-[0.8125rem] font-medium text-white"
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
        className="bloque fixed inset-x-0 bottom-0 z-20 grid grid-cols-5 border-t border-[var(--bloque-linea)] pb-[env(safe-area-inset-bottom)] md:hidden"
        aria-label="Principal"
      >
        <NavEnlaces porRepasar={porRepasar} variante="barra" />
      </nav>
    </div>
  );
}
