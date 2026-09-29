import Link from 'next/link';
import { Marca } from '@/components/Marca';

// Carcasa de privacidad y aviso legal: texto corrido a ~65 caracteres, sin
// adornos. Lo legal se lee, no se decora.
export function PaginaLegal({
  titulo,
  actualizada,
  children,
}: {
  titulo: string;
  actualizada: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-2xl px-5 py-8">
      <header className="mb-10 flex flex-wrap items-center justify-between gap-3 border-b border-linea pb-4">
        <Link href="/" className="w-max">
          <Marca />
        </Link>
        <nav aria-label="Legal" className="flex gap-5 text-[0.875rem]">
          <Link
            href="/privacidad"
            className="text-tinta-2 underline decoration-linea-fuerte underline-offset-4 hover:text-tinta"
          >
            Privacidad
          </Link>
          <Link
            href="/aviso-legal"
            className="text-tinta-2 underline decoration-linea-fuerte underline-offset-4 hover:text-tinta"
          >
            Aviso legal
          </Link>
        </nav>
      </header>
      <main id="contenido" className="legal">
        <h1 className="display text-[2.25rem] text-tinta">{titulo}</h1>
        <p className="mt-2 text-[0.875rem] text-tinta-2">Última actualización: {actualizada}</p>
        {children}
      </main>
    </div>
  );
}
