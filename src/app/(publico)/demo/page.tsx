import Link from 'next/link';
import { Motor } from '@/app/(app)/practicar/[sesionId]/Motor';
import { Marca } from '@/components/Marca';
import { Tema } from '@/components/Tema';
import { estilosBoton } from '@/components/ui/Boton';
import { cargarBanco } from '@/features/preguntas/cargar';
import { paraModo, paraNivel, publicadas, seleccionar } from '@/features/preguntas/filtrar';

export const metadata = { title: 'Demo' };

// Prueba sin cuenta: tres preguntas reales del banco, autoevaluación y prompt
// para copiar. No guarda nada. Es el "producto real, no maqueta" de la landing.
export default async function Demo() {
  const banco = publicadas(await cargarBanco());
  const candidatas = paraNivel(paraModo(banco, 'flash'), 'mid').filter(
    (p) => p.pista === 'javascript' || p.pista === 'fundamentos',
  );
  const preguntas = seleccionar(candidatas, {
    modo: 'flash',
    nivel: 'mid',
    cantidad: 3,
    semilla: 7,
  });

  return (
    <div className="mx-auto max-w-6xl px-4 py-5 md:px-6">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-linea pb-4">
        <Link href="/">
          <Marca />
        </Link>
        <div className="flex items-center gap-2.5">
          <span className="hidden text-[0.875rem] text-tinta-2 sm:inline">
            Demo sin cuenta: no se guarda nada.
          </span>
          <Tema className="hidden sm:inline-flex" />
          <Link href="/entrar?modo=registro" className={estilosBoton('normal')}>
            Crear cuenta
          </Link>
        </div>
      </header>
      <div id="contenido">
        <Motor
          sesion={{ id: 'demo', modo: 'flash', nivel: 'mid', idioma: 'es' }}
          preguntas={preguntas}
          yaRespondidas={[]}
          esDueno={false}
          demo
        />
      </div>
    </div>
  );
}
