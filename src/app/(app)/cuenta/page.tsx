import { obtenerPerfil } from '@/features/cuenta/db';
import { config } from '@/lib/config';
import { supabaseServidor, usuarioActual } from '@/lib/supabase/server';
import { ClaveApi } from './ClaveApi';
import { FormularioPerfil } from './FormularioPerfil';

export const metadata = { title: 'Cuenta' };

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
    <div className="mx-auto max-w-3xl">
      <p className="rotulo">{usuario.email}</p>
      <h1 className="display mt-1 text-[2.5rem] text-tinta">Cuenta</h1>
      <div className="mt-7 grid gap-6 md:grid-cols-2">
        <FormularioPerfil perfil={perfil} />
        <ClaveApi esDueno={esDueno} />
      </div>
    </div>
  );
}
