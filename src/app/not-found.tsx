import Link from 'next/link';
import { Marca } from '@/components/Marca';
import { estilosBoton } from '@/components/ui/Boton';

export default function NoEncontrado() {
  return (
    <div className="mx-auto flex min-h-dvh max-w-md flex-col justify-center px-5 py-16">
      <Link href="/" className="mb-8 w-max">
        <Marca tamano="grande" />
      </Link>
      <p className="rotulo">Error 404</p>
      <h1 className="display mt-1 text-[2.5rem] text-tinta">Esto no existe</h1>
      <p className="mt-2 text-tinta-2">La página que buscas no está o ya no está.</p>
      <div className="mt-6 flex flex-wrap gap-2">
        <Link href="/hoy" className={estilosBoton('esquina')}>
          Ir a Hoy
        </Link>
        <Link href="/" className={estilosBoton('normal')}>
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
