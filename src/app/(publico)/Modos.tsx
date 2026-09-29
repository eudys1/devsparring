// Los seis modos con una muestra real de cada uno: no se cuenta lo que hace,
// se enseña. Cada muestra está construida con contenido del banco o con la
// misma pieza que usa la app (la tarjeta del juez, el editor, la rúbrica).
import { enLinea } from '@/components/ui/Markdown';
import type { Modo, Test } from '@/features/preguntas/esquema';
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
      ? 'text-[var(--tinta-2)]'
      : tono === 'ok'
        ? 'text-ok'
        : tono === 'mal'
          ? 'text-mal'
          : 'text-[var(--tinta)]';
  return <span className={`block ${c}`}>{children}</span>;
}

// La muestra de Tipo test es una pregunta real del banco con sus opciones: se
// enseña respondida con un fallo, que es donde el modo aporta (el porqué).
export function Modos({
  conteo,
  test,
}: {
  conteo: Record<Modo, number>;
  test?: { enunciado: string; test: Test };
}) {
  const fallo = test ? (test.test.correcta + 1) % 4 : 0;
  const muestras: Muestra[] = [
    {
      modo: 'flash',
      ancho: 'sm:col-span-2',
      explica: 'Cuatro opciones, y al responder ves por qué vale o no cada una, no solo la tuya.',
      cuerpo: test ? (
        <div className="space-y-1.5 text-[0.8125rem]">
          <p
            className="prosa font-medium text-[var(--tinta)]"
            dangerouslySetInnerHTML={{ __html: enLinea(test.enunciado) }}
          />
          <ol className="grid gap-1 sm:grid-cols-2">
            {test.test.opciones.map((o, i) => (
              <li
                key={i}
                className={`flex items-center gap-2 rounded-[7px] border-2 px-2 py-1 ${
                  i === test.test.correcta
                    ? 'border-ok bg-ok-suave'
                    : i === fallo
                      ? 'border-mal bg-mal-suave'
                      : 'border-[var(--linea)]'
                }`}
              >
                <span className="font-mono text-[0.6875rem] font-semibold">{'ABCD'[i]}</span>
                <span className="prosa" dangerouslySetInnerHTML={{ __html: enLinea(o.texto) }} />
              </li>
            ))}
          </ol>
          <p className="text-[0.75rem] text-[var(--tinta-2)]">
            <span className="font-semibold text-mal">Por qué no la {'ABCD'[fallo]}: </span>
            <span
              className="prosa"
              dangerouslySetInnerHTML={{ __html: enLinea(test.test.opciones[fallo]?.porque ?? '') }}
            />
          </p>
        </div>
      ) : (
        <Linea tono="apagado">Pronto, con opciones revisadas.</Linea>
      ),
    },
    {
      modo: 'verbal',
      ancho: '',
      explica:
        'Razonamiento con respuesta desarrollada, y la repregunta donde bordeas la respuesta.',
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
                className="rounded-[6px] border border-[var(--linea)] px-2 py-0.5 text-[0.6875rem]"
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
              <span className="text-punto">{l}</span>
              <span className="text-[var(--tinta-2)]">{n}</span>
            </li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
      {muestras.map(({ modo, ancho, cuerpo, explica }) => (
        <article
          key={modo}
          className={`panel franja-modo m-${modo} flex flex-col overflow-hidden p-4 ${ancho}`}
        >
          <header className="flex items-baseline justify-between gap-3">
            <h3 className="display text-[1.375rem] text-[var(--tinta)]">
              {NOMBRE_MODO[modo].nombre}
            </h3>
            <span className="tabular shrink-0 font-mono text-[0.6875rem] text-[var(--tinta-2)]">
              {conteo[modo]} preg · {NOMBRE_MODO[modo].minutos}
            </span>
          </header>
          <p className="mt-1.5 text-[0.875rem] leading-snug text-[var(--tinta-2)]">{explica}</p>
          <div className="hundido mt-3.5 flex-1 rounded-r border border-[var(--linea)] p-3">
            {cuerpo}
          </div>
        </article>
      ))}
    </div>
  );
}
