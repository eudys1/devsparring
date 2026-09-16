'use client';

import { useRouter } from 'next/navigation';
import { supabaseNavegador } from '@/lib/supabase/client';

export function CerrarSesion() {
  const router = useRouter();
  return (
    <button
      type="button"
      className="mt-1 inline-block text-[0.8125rem] text-tinta-2 underline decoration-current/40 underline-offset-4 transition-transform duration-[140ms] ease-salida hover:text-tinta active:scale-[0.97]"
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
