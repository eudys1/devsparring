// Concha de la app: el carril es un bloque de azul tinta en escritorio y una
// barra inferior en móvil. Es la masa de color que separa la navegación de la
// sesión en curso, con la entrada activa recortada en el color del papel.
import { BookOpen, ClipboardList, Flame, Route, UserRound } from 'lucide-react';
import Link from 'next/link';
import { CerrarSesion } from './CerrarSesion';
import { Marca } from './Marca';
import { Tema } from './Tema';

const ENTRADAS = [
  { href: '/hoy', texto: 'Hoy', Icono: Flame },
  { href: '/practicar', texto: 'Practicar', Icono: BookOpen },
  { href: '/pistas', texto: 'Pistas', Icono: Route },
  { href: '/entrevistas', texto: 'Entrevistas', Icono: ClipboardList },
  { href: '/cuenta', texto: 'Cuenta', Icono: UserRound },
];

export function Concha({
  children,
  email,
  porRepasar = 0,
}: {
  children: React.ReactNode;
  email?: string;
  porRepasar?: number;
}) {
  return (
    <div className="min-h-dvh md:grid md:grid-cols-[232px_1fr]">
      <aside className="bloque hidden md:sticky md:top-0 md:flex md:h-dvh md:flex-col">
        <Link href="/hoy" className="px-5 pb-6 pt-6">
          <Marca />
        </Link>

        <nav className="flex flex-col gap-0.5 px-3" aria-label="Principal">
          {ENTRADAS.map(({ href, texto, Icono }) => (
            <Link
              key={href}
              href={href}
              className="flex min-h-10 items-center gap-2.5 rounded-r px-2.5 text-[0.9375rem] text-[var(--bloque-tinta-2)] transition-[background-color,color] duration-[160ms] ease-salida hover:bg-white/10 hover:text-white"
            >
              <Icono className="h-4 w-4" strokeWidth={1.75} aria-hidden />
              {texto}
              {href === '/practicar' && porRepasar > 0 ? (
                <span className="tabular ml-auto rounded-full bg-white px-1.5 py-px font-mono text-[0.6875rem] text-[var(--bloque)]">
                  {porRepasar}
                </span>
              ) : null}
            </Link>
          ))}
        </nav>

        <div className="mt-auto border-t border-[var(--bloque-linea)] px-5 py-4">
          <Tema className="mb-3" />
          <p className="truncate text-[0.8125rem] text-[var(--bloque-tinta-2)]" title={email}>
            {email}
          </p>
          <CerrarSesion />
        </div>
      </aside>

      <div className="pb-[4.5rem] md:pb-0">
        <header className="bloque flex items-center justify-between px-4 py-3 md:hidden">
          <Link href="/hoy">
            <Marca />
          </Link>
          <Tema />
        </header>
        <main id="contenido" className="px-4 py-6 md:px-10 md:py-10">
          {children}
        </main>
      </div>

      <nav
        className="bloque fixed inset-x-0 bottom-0 z-20 grid grid-cols-5 border-t border-[var(--bloque-linea)] pb-[env(safe-area-inset-bottom)] md:hidden"
        aria-label="Principal"
      >
        {ENTRADAS.map(({ href, texto, Icono }) => (
          <Link
            key={href}
            href={href}
            className="flex min-h-[3.5rem] flex-col items-center justify-center gap-1 text-[0.6875rem] text-[var(--bloque-tinta-2)] active:bg-white/10"
          >
            <span className="relative">
              <Icono className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              {href === '/practicar' && porRepasar > 0 ? (
                <span className="absolute -right-1.5 -top-1 h-2 w-2 rounded-full bg-white" />
              ) : null}
            </span>
            {texto}
          </Link>
        ))}
      </nav>
    </div>
  );
}
