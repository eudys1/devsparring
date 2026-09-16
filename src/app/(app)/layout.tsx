import { redirect } from 'next/navigation';
import { Concha } from '@/components/Concha';
import { idsVencidas } from '@/features/srs/db';
import { supabaseServidor, usuarioActual } from '@/lib/supabase/server';

export default async function LayoutApp({ children }: { children: React.ReactNode }) {
  const usuario = await usuarioActual();
  if (!usuario) redirect('/entrar');
  const db = await supabaseServidor();
  const vencidas = await idsVencidas(db, usuario.id);
  return (
    <Concha email={usuario.email} porRepasar={vencidas.length}>
      {children}
    </Concha>
  );
}
