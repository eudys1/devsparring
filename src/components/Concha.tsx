// Concha de la app autenticada: carril lateral en escritorio, barra inferior en
// móvil. El carril lista lo que se hace, no cómo está construido.
import Link from 'next/link';
import { BookOpen, ClipboardList, Flame, Route, UserRound } from 'lucide-react';
import { CerrarSesion } from './CerrarSesion';

const ENTRADAS = [
  { href: '/hoy', texto: 'Hoy', Icono: Flame },
  { href: '/practicar', texto: 'Practicar', Icono: BookOpen },
  { href: '/pistas', texto: 'Pistas', Icono: Route },
  { href: '/entrevistas', texto: 'Entrevistas', Icono: ClipboardList },
  { href: '/cuenta', texto: 'Cuenta', Icono: UserRound },
];

export function Concha({ children, email }: { children: React.ReactNode; email?: string }) {
  return (
    <div className="min-h-dvh md:grid md:grid-cols-[212px_1fr]">
      <aside className="hidden border-r border-linea bg-papel md:flex md:flex-col">
        <Link href="/hoy" className="flex items-center gap-2 px-5 pb-4 pt-5">
          <Marca />
        </Link>
        <nav className="flex flex-col gap-0.5 px-2.5" aria-label="Principal">
          {ENTRADAS.map(({ href, texto, Icono }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-2.5 rounded-r px-2.5 py-2 text-[0.9375rem] text-tinta-2 hover:bg-papel-2 hover:text-tinta"
            >
              <Icono className="h-4 w-4" aria-hidden />
              {texto}
            </Link>
          ))}
        </nav>
        <div className="mt-auto border-t border-linea px-5 py-4 text-[0.8125rem] text-tinta-3">
          <p className="truncate" title={email}>
            {email}
          </p>
          <CerrarSesion />
        </div>
      </aside>
      <div className="pb-20 md:pb-0">
        <header className="flex items-center justify-between border-b border-linea bg-papel px-4 py-3 md:hidden">
          <Link href="/hoy">
            <Marca />
          </Link>
        </header>
        <main className="px-4 py-6 md:px-8 md:py-8">{children}</main>
      </div>
      <nav
        className="fixed inset-x-0 bottom-0 grid grid-cols-5 border-t border-linea bg-papel md:hidden"
        aria-label="Principal"
      >
        {ENTRADAS.map(({ href, texto, Icono }) => (
          <Link
            key={href}
            href={href}
            className="flex flex-col items-center gap-1 py-2 text-[0.6875rem] text-tinta-2"
          >
            <Icono className="h-5 w-5" aria-hidden />
            {texto}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export function Marca({ grande = false }: { grande?: boolean }) {
  return (
    <span
      className={`font-display font-semibold tracking-tight text-tinta ${grande ? 'text-3xl' : 'text-xl'}`}
      style={{ fontVariationSettings: '"wdth" 88' }}
    >
      Devsparring<span className="text-brasa">.</span>
    </span>
  );
}
