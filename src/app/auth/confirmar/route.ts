// Destino del enlace de confirmación de correo (y de recuperación) de Supabase.
import { NextResponse, type NextRequest } from 'next/server';
import { supabaseServidor } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const tokenHash = searchParams.get('token_hash');
  const tipo = searchParams.get('type');
  const codigo = searchParams.get('code');
  const supabase = await supabaseServidor();
  if (codigo) {
    const { error } = await supabase.auth.exchangeCodeForSession(codigo);
    if (!error) return NextResponse.redirect(`${origin}/hoy`);
  } else if (tokenHash && tipo) {
    const { error } = await supabase.auth.verifyOtp({
      token_hash: tokenHash,
      type: tipo as 'email' | 'signup' | 'recovery' | 'magiclink',
    });
    if (!error) return NextResponse.redirect(`${origin}/hoy`);
  }
  return NextResponse.redirect(`${origin}/entrar?error=enlace`);
}
