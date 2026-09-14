import Link from 'next/link';
import { Marca } from '@/components/Concha';
import { Boton } from '@/components/ui/Boton';
import { cargarBanco } from '@/features/preguntas/cargar';
import { paraModo, publicadas } from '@/features/preguntas/filtrar';
import { Motor } from '@/app/(app)/practicar/[sesionId]/Motor';

export const metadata = { title: 'Demo' };

// Prueba sin cuenta: tres preguntas reales del banco, autoevaluación y prompt
// para copiar. No guarda nada. Es el "producto real > maqueta" de la landing.
export default async function Demo() {
  const banco = publicadas(await cargarBanco());
  const flash = paraModo(banco, 'flash')
    .filter((p) => p.pista === 'javascript' || p.pista === 'fundamentos')
    .slice(0, 3);
  return (
    <div className="mx-auto max-w-6xl px-5 py-6">
      <header className="mb-6 flex items-center justify-between border-b border-linea pb-4">
        <Link href="/">
          <Marca />
        </Link>
        <div className="flex items-center gap-3 text-[0.875rem] text-tinta-2">
          <span className="hidden sm:inline">Demo sin cuenta: no se guarda nada.</span>
          <Link href="/entrar?modo=registro">
            <Boton variante="normal">Crear cuenta</Boton>
          </Link>
        </div>
      </header>
      <Motor
        sesion={{ id: 'demo', modo: 'flash', nivel: 'mid', idioma: 'es' }}
        preguntas={flash}
        yaRespondidas={[]}
        esDueno={false}
        demo
      />
    </div>
  );
}
