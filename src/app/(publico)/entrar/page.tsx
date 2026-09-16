import Link from 'next/link';
import { Marca } from '@/components/Marca';
import { FormularioAcceso } from './FormularioAcceso';

export const metadata = { title: 'Entrar' };

export default async function Entrar({
  searchParams,
}: {
  searchParams: Promise<{ modo?: string; volver?: string; error?: string }>;
}) {
  const { modo, volver, error } = await searchParams;
  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-5 py-10">
      <Link href="/" className="mb-7 inline-block w-max">
        <Marca tamano="grande" />
      </Link>
      <div id="contenido">
        {error === 'enlace' ? (
          <p
            role="alert"
            className="mb-4 rounded-r border border-aviso/40 bg-aviso-suave px-3 py-2 text-[0.875rem] text-aviso"
          >
            Ese enlace ya no vale. Pide otro entrando con tu correo.
          </p>
        ) : null}
        <FormularioAcceso registro={modo === 'registro'} volver={volver ?? '/hoy'} />
      </div>
    </div>
  );
}
