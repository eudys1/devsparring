'use client';

import { useRouter } from 'next/navigation';
import { supabaseNavegador } from '@/lib/supabase/client';

export function CerrarSesion() {
  const router = useRouter();
  return (
    <button
      type="button"
      className="mt-1 text-tinta-2 underline-offset-2 hover:text-tinta hover:underline"
      onClick={async () => {
        await supabaseNavegador().auth.signOut();
        router.push('/');
        router.refresh();
      }}
    >
      Salir
    </button>
  );
}
