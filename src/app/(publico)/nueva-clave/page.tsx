import type { Metadata } from 'next';
import Link from 'next/link';
import { Marca } from '@/components/Marca';
import { usuarioActual } from '@/lib/supabase/server';
import { FormularioNuevaClave } from './FormularioNuevaClave';

export const metadata: Metadata = {
  title: 'Contraseña nueva',
  robots: { index: false, follow: false },
};

// Se llega desde el enlace del correo de recuperación (/auth/recuperar), que ya
// ha abierto una sesión. Sin ella, el enlace caducó o se abrió en otro navegador.
export default async function NuevaClave() {
  const usuario = await usuarioActual();
  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-5 py-10">
      <Link href="/" className="mb-7 inline-block w-max">
        <Marca tamano="grande" />
      </Link>
      <main id="contenido">
        {usuario ? (
          <FormularioNuevaClave email={usuario.email} />
        ) : (
          <div className="tarjeta px-6 py-6">
            <h1 className="display text-[1.75rem] text-tinta">El enlace ya no vale</h1>
            <p className="mt-2 text-tinta-2">
              Caducó, ya se usó o lo abriste en otro navegador. Pide uno nuevo y ábrelo en este.
            </p>
            <Link
              href="/entrar?modo=olvido"
              className="mt-5 inline-block text-[0.875rem] text-tinta-2 underline decoration-linea-fuerte underline-offset-2 hover:text-tinta"
            >
              Pedir otro enlace
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
