import Link from 'next/link';
import { Marca } from '@/components/Concha';
import { FormularioAcceso } from './FormularioAcceso';

export const metadata = { title: 'Entrar' };

export default async function Entrar({
  searchParams,
}: {
  searchParams: Promise<{ modo?: string; volver?: string }>;
}) {
  const { modo, volver } = await searchParams;
  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-5 py-10">
      <Link href="/" className="mb-8">
        <Marca grande />
      </Link>
      <FormularioAcceso registro={modo === 'registro'} volver={volver ?? '/hoy'} />
    </div>
  );
}
