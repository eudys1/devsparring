'use client';

// Las entradas del carril y de la barra inferior con la actual marcada. Vive
// aparte de la concha porque necesita la ruta del navegador (cliente) y la
// concha es un componente de servidor. Los iconos son funciones y por eso las
// entradas se definen aquí, no en la concha.
import { BookOpen, ClipboardList, Flame, Route, UserRound } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const GRUPOS = [
  {
    titulo: 'Entrenar',
    entradas: [
      { href: '/hoy', texto: 'Hoy', Icono: Flame },
      { href: '/practicar', texto: 'Practicar', Icono: BookOpen },
      { href: '/pistas', texto: 'Temario', Icono: Route },
    ],
  },
  {
    titulo: 'Lo tuyo',
    entradas: [
      { href: '/entrevistas', texto: 'Entrevistas', Icono: ClipboardList },
      { href: '/cuenta', texto: 'Cuenta', Icono: UserRound },
    ],
  },
];

export function NavEnlaces({
  porRepasar,
  variante,
}: {
  porRepasar: number;
  variante: 'carril' | 'barra';
}) {
  const ruta = usePathname();
  const activaEn = (href: string) => ruta === href || ruta.startsWith(`${href}/`);

  if (variante === 'barra') {
    return (
      <>
        {GRUPOS.flatMap((g) => g.entradas).map(({ href, texto, Icono }) => {
          const activa = activaEn(href);
          const aviso = href === '/practicar' && porRepasar > 0;
          return (
            <Link
              key={href}
              href={href}
              aria-current={activa ? 'page' : undefined}
              className={`flex min-h-[3.5rem] flex-col items-center justify-center gap-1 text-[0.6875rem] transition-colors duration-[140ms] ease-salida active:bg-white/10 ${
                activa ? 'text-white' : 'text-[var(--bloque-tinta-2)]'
              }`}
            >
              <span className="relative">
                <Icono className="h-5 w-5" strokeWidth={activa ? 2.25 : 1.75} aria-hidden />
                {aviso ? (
                  <span className="absolute -right-1.5 -top-1 h-2 w-2 rounded-full bg-white" />
                ) : null}
              </span>
              <span className={activa ? 'font-semibold' : ''}>{texto}</span>
              <span
                className={`h-0.5 w-6 rounded-full ${activa ? 'bg-white' : 'bg-transparent'}`}
                aria-hidden
              />
            </Link>
          );
        })}
      </>
    );
  }

  return (
    <>
      {GRUPOS.map((g) => (
        <div key={g.titulo}>
          <p className="rotulo mb-1.5 px-2.5">{g.titulo}</p>
          <ul className="flex flex-col gap-0.5">
            {g.entradas.map(({ href, texto, Icono }) => {
              const activa = activaEn(href);
              const aviso = href === '/practicar' && porRepasar > 0;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={activa ? 'page' : undefined}
                    className={`relative flex min-h-10 items-center gap-2.5 rounded-r px-2.5 text-[0.9375rem] transition-[background-color,color] duration-[160ms] ease-salida ${
                      activa
                        ? 'bg-white/15 font-semibold text-white'
                        : 'text-[var(--bloque-tinta-2)] hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    {activa ? (
                      <span
                        className="absolute inset-y-2 -left-3 w-[3px] rounded-r-full bg-white"
                        aria-hidden
                      />
                    ) : null}
                    <Icono className="h-4 w-4" strokeWidth={activa ? 2.25 : 1.75} aria-hidden />
                    {texto}
                    {aviso ? (
                      <span className="tabular ml-auto rounded-full bg-white px-1.5 py-px font-mono text-[0.6875rem] text-[var(--bloque)]">
                        {porRepasar}
                      </span>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </>
  );
}
