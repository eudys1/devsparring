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
      <h1 className="text-2xl font-semibold">Cuenta</h1>
      <p className="mt-1 text-[0.875rem] text-tinta-3">{usuario.email}</p>
      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <FormularioPerfil perfil={perfil} />
        <ClaveApi esDueno={esDueno} />
      </div>
    </div>
  );
}
