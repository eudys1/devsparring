// Destino del enlace de "¿Olvidaste tu contraseña?": canjea el código por una
// sesión temporal y lleva a elegir la contraseña nueva. Va aparte de
// /auth/confirmar porque con el código no se sabe de qué tipo era el enlace.
import { NextResponse, type NextRequest } from 'next/server';
import { supabaseServidor } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const codigo = searchParams.get('code');
  if (codigo) {
    const supabase = await supabaseServidor();
    const { error } = await supabase.auth.exchangeCodeForSession(codigo);
    if (!error) return NextResponse.redirect(`${origin}/nueva-clave`);
  }
  return NextResponse.redirect(`${origin}/entrar?error=enlace`);
}
