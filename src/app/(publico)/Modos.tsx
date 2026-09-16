// Los seis modos con una muestra real de cada uno: no se cuenta lo que hace,
// se enseña. Cada muestra está construida con contenido del banco o con la
// misma pieza que usa la app (la tarjeta del juez, el editor, la rúbrica).
import { Casillas } from '@/components/ui/Dato';
import type { Modo } from '@/features/preguntas/esquema';
import { NOMBRE_MODO } from '@/features/preguntas/nombres';

type Muestra = { modo: Modo; ancho: string; cuerpo: React.ReactNode; explica: string };

function Linea({
  children,
  tono = 'normal',
}: {
  children: React.ReactNode;
  tono?: 'normal' | 'apagado' | 'ok' | 'mal';
}) {
  const c =
    tono === 'apagado'
      ? 'text-[var(--noche-tinta-2)]'
      : tono === 'ok'
        ? 'text-ok'
        : tono === 'mal'
          ? 'text-mal'
          : 'text-[var(--noche-tinta)]';
  return <span className={`block ${c}`}>{children}</span>;
}

export function Modos({ conteo }: { conteo: Record<Modo, number> }) {
  const muestras: Muestra[] = [
    {
      modo: 'flash',
      ancho: 'sm:col-span-2',
      explica: 'Diez preguntas cortas de teoría. Escribes, te puntúan, sigues.',
      cuerpo: (
        <div className="space-y-2 font-mono text-[0.75rem]">
          <Linea tono="apagado">¿Qué es un índice y cuándo empeora el rendimiento?</Linea>
          <div className="h-px bg-[var(--noche-linea)]" />
          <div className="grid grid-cols-[1fr_auto] items-center gap-3">
            <Linea tono="apagado">Corrección técnica</Linea>
            <span className="w-20">
              <Casillas valor={4} de={5} tono="ok" />
            </span>
          </div>
          <div className="grid grid-cols-[1fr_auto] items-center gap-3">
            <Linea tono="apagado">Complejidad</Linea>
            <span className="w-20">
              <Casillas valor={2} de={5} tono="aviso" />
            </span>
          </div>
        </div>
      ),
    },
    {
      modo: 'verbal',
      ancho: '',
      explica: 'Explicas en voz alta y te repreguntan donde bordeas la respuesta.',
      cuerpo: (
        <div className="space-y-1.5 font-mono text-[0.75rem]">
          <Linea tono="apagado">Tú: «uso índices para que vaya más rápido»</Linea>
          <Linea>Y en una tabla con muchas escrituras, ¿qué pasa?</Linea>
          <Linea tono="apagado">Tú: …</Linea>
        </div>
      ),
    },
    {
      modo: 'kata',
      ancho: 'sm:col-span-2',
      explica: 'Código con reloj en un editor de verdad, y tests que se ejecutan aquí.',
      cuerpo: (
        <pre className="overflow-hidden font-mono text-[0.75rem] leading-relaxed">
          <code>
            <Linea tono="apagado">export function duplicados(ids: number[]) {'{'}</Linea>
            <Linea tono="apagado"> const vistos = new Set&lt;number&gt;();</Linea>
            <Linea tono="apagado">{'}'}</Linea>
            <Linea tono="ok">✓ quita repetidos 3 ms</Linea>
            <Linea tono="mal">✗ lista vacía esperado [] recibido undefined</Linea>
          </code>
        </pre>
      ),
    },
    {
      modo: 'review',
      ancho: '',
      explica: 'Te dan código ajeno con fallos plantados. Encuéntralos y explícalos.',
      cuerpo: (
        <pre className="font-mono text-[0.75rem] leading-relaxed">
          <code>
            <Linea tono="apagado">{'const q = `SELECT * FROM u'}</Linea>
            <span className="-mx-2 block bg-mal/15 px-2 text-mal">
              {'  WHERE id = ${req.query.id}`'}
            </span>
            <Linea tono="apagado">{'db.query(q)'}</Linea>
          </code>
        </pre>
      ),
    },
    {
      modo: 'diseno',
      ancho: '',
      explica: 'Requisitos, trade-offs y números. Lo que de verdad separa niveles.',
      cuerpo: (
        <div className="space-y-2 font-mono text-[0.75rem]">
          <Linea tono="apagado">Diseña la paginación de un listado de 1 M de filas</Linea>
          <div className="flex flex-wrap gap-1.5">
            {['OFFSET', 'keyset', 'índice', 'cursor'].map((t) => (
              <span
                key={t}
                className="rounded-full border border-[var(--noche-linea)] px-2 py-0.5 text-[0.6875rem]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      ),
    },
    {
      modo: 'star',
      ancho: 'sm:col-span-2',
      explica: 'Conflicto, error grave, plazo imposible. Con la estructura que esperan.',
      cuerpo: (
        <ul className="space-y-1 font-mono text-[0.75rem]">
          {[
            ['S', 'Situación'],
            ['T', 'Tarea'],
            ['A', 'Acción'],
            ['R', 'Resultado'],
          ].map(([l, n]) => (
            <li key={l} className="grid grid-cols-[1.25rem_1fr] gap-2">
              <span className="text-esquina">{l}</span>
              <span className="text-[var(--noche-tinta-2)]">{n}</span>
            </li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
      {muestras.map(({ modo, ancho, cuerpo, explica }) => (
        <article key={modo} className={`ficha-modo panel flex flex-col p-4 ${ancho}`}>
          <header className="flex items-baseline justify-between gap-3">
            <h3 className="cartel text-[1.5rem] text-[var(--noche-tinta)]">
              {NOMBRE_MODO[modo].nombre}
            </h3>
            <span className="tabular shrink-0 font-mono text-[0.6875rem] text-[var(--noche-tinta-2)]">
              {conteo[modo]} preg · {NOMBRE_MODO[modo].minutos}
            </span>
          </header>
          <p className="mt-1.5 text-[0.875rem] leading-snug text-[var(--noche-tinta-2)]">
            {explica}
          </p>
          <div className="hundido mt-3.5 flex-1 rounded-r border border-[var(--noche-linea)] p-3">
            {cuerpo}
          </div>
        </article>
      ))}
    </div>
  );
}
