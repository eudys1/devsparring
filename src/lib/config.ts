// Configuración validada con zod y fail-fast: si falta una variable, la app no
// arranca a medias. Las públicas van con NEXT_PUBLIC_. Solo servidor.
import 'server-only';
import { z } from 'zod';

const Esquema = z.object({
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().min(1),
  SUPABASE_SECRET_KEY: z.string().min(1).optional(),
  DEVSPARRING_OWNER_USER_ID: z.string().uuid().optional(),
  DEVSPARRING_OWNER_ANTHROPIC_KEY: z.string().startsWith('sk-ant-').optional(),
});

let cache: z.infer<typeof Esquema> | null = null;

export function config() {
  if (cache) return cache;
  const r = Esquema.safeParse(process.env);
  if (!r.success) {
    const faltan = r.error.issues.map((i) => i.path.join('.')).join(', ');
    throw new Error(`Configuración incompleta o inválida: ${faltan}. Ver .env.example.`);
  }
  cache = r.data;
  return cache;
}
