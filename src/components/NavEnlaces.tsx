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
              className={`flex min-h-[3.5rem] flex-col items-center justify-center gap-1 text-[0.6875rem] transition-colors duration-[140ms] ease-salida active:bg-[var(--esquina-suave)] ${
                activa ? 'font-semibold text-[var(--carril-tinta)]' : 'text-[var(--carril-tinta-2)]'
              }`}
            >
              <span
                className={`relative grid h-7 w-11 place-items-center rounded-[8px] ${
                  activa ? 'bg-[var(--carril-activo)] text-[var(--carril-activo-tinta)]' : ''
                }`}
              >
                <Icono className="h-5 w-5" strokeWidth={activa ? 2.25 : 1.75} aria-hidden />
                {aviso ? (
                  <span className="absolute right-1 top-0 h-2 w-2 rounded-full border border-[var(--carril)] bg-punto" />
                ) : null}
              </span>
              <span>{texto}</span>
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
          <p className="solo-ancho rotulo mb-1.5 px-2.5">{g.titulo}</p>
          <ul className="flex flex-col gap-1">
            {g.entradas.map(({ href, texto, Icono }) => {
              const activa = activaEn(href);
              const aviso = href === '/practicar' && porRepasar > 0;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={activa ? 'page' : undefined}
                    title={texto}
                    className={`enlace-carril relative flex min-h-10 items-center gap-2.5 rounded-r px-2.5 text-[0.9375rem] transition-[background-color,color] duration-[160ms] ease-salida ${
                      activa
                        ? 'bg-[var(--carril-activo)] font-semibold text-[var(--carril-activo-tinta)]'
                        : 'text-[var(--carril-tinta-2)] hover:bg-[var(--esquina-suave)] hover:text-[var(--carril-tinta)]'
                    }`}
                  >
                    <Icono
                      className="h-4 w-4 shrink-0"
                      strokeWidth={activa ? 2.25 : 1.75}
                      aria-hidden
                    />
                    <span className="enlace-texto">{texto}</span>
                    {aviso ? (
                      <span className="enlace-aviso tabular ml-auto rounded-full bg-[var(--carril-tinta)] px-1.5 py-px font-mono text-[0.6875rem] text-[var(--carril)]">
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
