'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { supabaseNavegador } from '@/lib/supabase/client';

export function CerrarSesion({ className = '' }: { className?: string }) {
  const router = useRouter();
  return (
    <button
      type="button"
      className={`inline-flex min-h-9 items-center gap-2 rounded-r border border-linea-fuerte bg-papel-2 px-3 text-[0.8125rem] text-tinta-2 transition-[background-color,border-color,color,transform] duration-[160ms] ease-salida hover:border-tinta-3 hover:text-tinta active:scale-[0.96] ${className}`}
      onClick={async () => {
        await supabaseNavegador().auth.signOut();
        router.push('/');
        router.refresh();
      }}
    >
      <LogOut className="h-4 w-4" strokeWidth={1.75} aria-hidden />
      Salir
    </button>
  );
}
