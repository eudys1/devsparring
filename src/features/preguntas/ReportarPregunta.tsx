// El enlace "¿Está mal?" que acompaña a una pregunta en la sesión y en el
// temario. Abre el issue en otra pestaña para no perder la sesión.
import { Flag } from 'lucide-react';
import type { Pregunta } from './esquema';
import { enlaceReportar } from './reportar';

export function ReportarPregunta({
  pregunta,
  donde,
  className = '',
}: {
  pregunta: Pick<Pregunta, 'id' | 'version' | 'pista' | 'texto'>;
  donde: string;
  className?: string;
}) {
  return (
    <a
      href={enlaceReportar(pregunta, donde)}
      target="_blank"
      rel="noopener noreferrer"
      data-prueba="reportar-pregunta"
      className={`inline-flex min-h-8 items-center gap-1.5 rounded-r px-2 text-[0.8125rem] text-tinta-2 underline decoration-linea-fuerte underline-offset-2 transition-colors duration-[160ms] ease-salida hover:text-tinta hover:decoration-tinta ${className}`}
    >
      <Flag className="h-3.5 w-3.5" strokeWidth={2} aria-hidden />
      ¿Está mal? Avísalo
      <span className="sr-only"> (abre GitHub en otra pestaña)</span>
    </a>
  );
}
