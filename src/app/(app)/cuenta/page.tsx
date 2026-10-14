import { CerrarSesion } from '@/components/CerrarSesion';
import { PlegarCarril } from '@/components/PlegarCarril';
import { Tema } from '@/components/Tema';
import { obtenerPerfil } from '@/features/cuenta/db';
import { config } from '@/lib/config';
import { supabaseServidor, usuarioActual } from '@/lib/supabase/server';
import { BorrarDatos } from './BorrarDatos';
import { ClaveApi } from './ClaveApi';
import { FormularioPerfil } from './FormularioPerfil';

export const metadata = { title: 'Cuenta' };

// Todo lo de la cuenta en un sitio: el carril ya no repite correo, tema y salir.
export default async function Cuenta() {
  const usuario = (await usuarioActual())!;
  const db = await supabaseServidor();
  const perfil = await obtenerPerfil(db, usuario.id);
  const cfg = config();
  const esDueno =
    cfg.DEVSPARRING_OWNER_USER_ID !== undefined &&
    usuario.id === cfg.DEVSPARRING_OWNER_USER_ID &&
    !!cfg.DEVSPARRING_OWNER_ANTHROPIC_KEY;

  return (
    <div className="pagina">
      <p className="rotulo">{usuario.email}</p>
      <h1 className="display mt-1 text-[2.5rem] text-tinta">Cuenta</h1>
      <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <FormularioPerfil perfil={perfil} />
        <div className="grid gap-6">
          <ClaveApi esDueno={esDueno} />

          <section className="tarjeta px-6 py-6">
            <h2 className="text-[1.25rem] font-semibold text-tinta">Apariencia y sesión</h2>
            <div className="mt-4 divide-y divide-linea">
              <div className="flex items-center justify-between gap-4 py-3">
                <div>
                  <p className="text-[0.9375rem] text-tinta">Tema</p>
                  <p className="text-[0.8125rem] text-tinta-3">
                    Claro u oscuro, en este navegador.
                  </p>
                </div>
                <Tema variante="texto" />
              </div>
              <div className="hidden items-center justify-between gap-4 py-3 md:flex">
                <div>
                  <p className="text-[0.9375rem] text-tinta">Menú lateral</p>
                  <p className="text-[0.8125rem] text-tinta-3">
                    Ancho con nombres o compacto, solo iconos.
                  </p>
                </div>
                <span className="carril-en-papel">
                  <PlegarCarril />
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 py-3">
                <div>
                  <p className="text-[0.9375rem] text-tinta">Sesión</p>
                  <p className="text-[0.8125rem] text-tinta-3">
                    Sales de la cuenta en este navegador.
                  </p>
                </div>
                <CerrarSesion />
              </div>
            </div>
          </section>

          <BorrarDatos />
        </div>
      </div>
    </div>
  );
}
