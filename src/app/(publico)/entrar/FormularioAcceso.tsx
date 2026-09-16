'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Boton } from '@/components/ui/Boton';
import { Entrada, Rotulo } from '@/components/ui/Campo';
import { supabaseNavegador } from '@/lib/supabase/client';

export function FormularioAcceso({ registro, volver }: { registro: boolean; volver: string }) {
  const router = useRouter();
  const [modo, setModo] = useState<'entrar' | 'registro'>(registro ? 'registro' : 'entrar');
  const [email, setEmail] = useState('');
  const [clave, setClave] = useState('');
  const [estado, setEstado] = useState<'quieto' | 'enviando' | 'confirmar'>('quieto');
  const [error, setError] = useState<string | null>(null);

  async function enviar(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setEstado('enviando');
    const supabase = supabaseNavegador();
    if (modo === 'registro') {
      const { data, error } = await supabase.auth.signUp({
        email,
        password: clave,
        options: { emailRedirectTo: `${location.origin}/auth/confirmar` },
      });
      if (error) return fallo(error.message);
      if (!data.session) return setEstado('confirmar');
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password: clave });
      if (error) return fallo(error.message);
    }
    router.push(volver.startsWith('/') ? volver : '/hoy');
    router.refresh();
  }

  function fallo(mensaje: string) {
    setEstado('quieto');
    setError(traducir(mensaje));
  }

  if (estado === 'confirmar') {
    return (
      <div className="tarjeta px-5 py-5">
        <h1 className="display text-[1.75rem] text-tinta">Revisa tu correo</h1>
        <p className="mt-2 text-tinta-2">
          Te hemos enviado un enlace a <strong className="text-tinta">{email}</strong>. Al abrirlo
          entras directamente.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={enviar} className="tarjeta px-5 py-5">
      <h1 className="display text-[1.75rem] text-tinta">
        {modo === 'registro' ? 'Crear cuenta' : 'Entrar'}
      </h1>
      <p className="mt-1 text-[0.875rem] text-tinta-2">
        {modo === 'registro'
          ? 'Correo y contraseña. La clave de la API se añade después y se queda en tu navegador.'
          : 'Con tu correo y tu contraseña.'}
      </p>

      <div className="mt-5 space-y-4">
        <div>
          <Rotulo htmlFor="email">Correo</Rotulo>
          <Entrada
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <Rotulo htmlFor="clave" pista={modo === 'registro' ? 'mínimo 8 caracteres' : undefined}>
            Contraseña
          </Rotulo>
          <Entrada
            id="clave"
            type="password"
            autoComplete={modo === 'registro' ? 'new-password' : 'current-password'}
            required
            minLength={8}
            value={clave}
            onChange={(e) => setClave(e.target.value)}
          />
        </div>
      </div>

      {error ? (
        <p
          role="alert"
          className="mt-4 rounded-r border border-mal/40 bg-mal-suave px-3 py-2 text-[0.875rem] text-mal"
        >
          {error}
        </p>
      ) : null}

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <Boton type="submit" variante="esquina" tamano="grande" disabled={estado === 'enviando'}>
          {estado === 'enviando' ? 'Un momento…' : modo === 'registro' ? 'Crear cuenta' : 'Entrar'}
        </Boton>
        <button
          type="button"
          className="inline-block text-[0.875rem] text-tinta-2 underline decoration-linea-fuerte underline-offset-2 transition-transform duration-[140ms] ease-salida hover:text-tinta active:scale-[0.97]"
          onClick={() => setModo(modo === 'registro' ? 'entrar' : 'registro')}
        >
          {modo === 'registro' ? 'Ya tengo cuenta' : 'Crear una cuenta'}
        </button>
      </div>
    </form>
  );
}

function traducir(m: string): string {
  if (/invalid login credentials/i.test(m)) return 'Correo o contraseña incorrectos.';
  if (/already registered/i.test(m)) return 'Ese correo ya tiene cuenta. Entra con tu contraseña.';
  if (/password/i.test(m)) return 'La contraseña necesita al menos 8 caracteres.';
  if (/rate limit/i.test(m)) return 'Demasiados intentos. Espera un minuto y vuelve a probar.';
  return `No se pudo completar: ${m}`;
}
