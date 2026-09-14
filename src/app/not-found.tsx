import Link from 'next/link';
import { Boton } from '@/components/ui/Boton';

export default function NoEncontrado() {
  return (
    <div className="mx-auto max-w-md px-5 py-20 text-center">
      <h1 className="text-2xl font-semibold">Esto no existe</h1>
      <p className="mt-2 text-tinta-2">La página que buscas no está o ya no está.</p>
      <Link href="/hoy" className="mt-5 inline-block">
        <Boton variante="normal">Ir a Hoy</Boton>
      </Link>
    </div>
  );
}
