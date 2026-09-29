// Refresca la sesión de Supabase en cada petición y protege las rutas de la app.
// En Next 16 esto es proxy.ts (antes middleware.ts) y corre en runtime Node.
import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { RUTAS_PRIVADAS } from '@/lib/sitio';

// Si Supabase no responde (proyecto pausado, red caída), auth-js reintenta con
// espera creciente y cada página tardaba 25 s en cargar. Con este tope se sigue
// como si no hubiera sesión: lo público se ve y lo privado manda a entrar, donde
// el formulario dice que no hay conexión.
const TOPE_MS = 3000;

async function reclamaciones(leer: () => Promise<{ data: { claims?: unknown } | null }>) {
  let reloj: ReturnType<typeof setTimeout> | undefined;
  const tope = new Promise<null>((resolver) => {
    reloj = setTimeout(() => resolver(null), TOPE_MS);
  });
  const lectura = leer()
    .then(({ data }) => data?.claims ?? null)
    .catch(() => null);
  try {
    return await Promise.race([lectura, tope]);
  } finally {
    clearTimeout(reloj);
  }
}

export async function proxy(request: NextRequest) {
  let respuesta = NextResponse.next({ request });
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (lista) => {
          for (const { name, value } of lista) request.cookies.set(name, value);
          respuesta = NextResponse.next({ request });
          for (const { name, value, options } of lista) respuesta.cookies.set(name, value, options);
        },
      },
    },
  );

  const claims = await reclamaciones(() => supabase.auth.getClaims());
  const ruta = request.nextUrl.pathname;
  const esPrivada = RUTAS_PRIVADAS.some((r) => ruta === r || ruta.startsWith(`${r}/`));
  if (!claims && esPrivada) {
    const url = request.nextUrl.clone();
    url.pathname = '/entrar';
    url.searchParams.set('volver', ruta);
    return NextResponse.redirect(url);
  }
  return respuesta;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|monaco/|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff2?)$).*)',
  ],
};
