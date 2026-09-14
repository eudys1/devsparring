import { redirect } from 'next/navigation';
import { Concha } from '@/components/Concha';
import { usuarioActual } from '@/lib/supabase/server';

export default async function LayoutApp({ children }: { children: React.ReactNode }) {
  const usuario = await usuarioActual();
  if (!usuario) redirect('/entrar');
  return <Concha email={usuario.email}>{children}</Concha>;
}
