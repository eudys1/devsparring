// Errores de escritura en Supabase: se registran con código y mensaje, nunca con
// los datos de la fila, y el caso de uso devuelve un código estable a la pantalla.
import 'server-only';

type ErrorPostgrest = {
  code?: string;
  message?: string;
  details?: string | null;
  hint?: string | null;
} | null;

export function registrarErrorDb(donde: string, error: ErrorPostgrest): void {
  if (!error) return;
  console.error(
    JSON.stringify({
      evento: 'db_error',
      donde,
      codigo: error.code,
      mensaje: error.message,
      pista: error.hint ?? undefined,
    }),
  );
}
