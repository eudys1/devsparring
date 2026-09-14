// Cliente de Supabase para Server Components, Server Actions y route handlers.
// Patrón oficial de @supabase/ssr con getAll/setAll. En Next 16 cookies() es async.
import 'server-only';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function supabaseServidor() {
  const almacen = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll: () => almacen.getAll(),
        setAll: (lista) => {
          try {
            for (const { name, value, options } of lista) almacen.set(name, value, options);
          } catch {
            // Desde un Server Component no se pueden escribir cookies; proxy.ts
            // ya refresca la sesión, así que ignorar aquí es seguro.
          }
        },
      },
    },
  );
}

// Identidad verificada del usuario con sesión. getClaims valida el JWT en local;
// nunca usar getSession() en servidor para decidir acceso.
export async function usuarioActual() {
  const supabase = await supabaseServidor();
  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims?.sub) return null;
  return { id: data.claims.sub as string, email: data.claims.email as string | undefined };
}
