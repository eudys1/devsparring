// La tarjeta del juez: la nota manda en la pantalla y las tres dimensiones se
// comparan como superficies, no como cifras. El canto izquierdo dice el
// veredicto sin depender solo del color (el número está al lado).
import { Casillas } from '@/components/ui/Dato';
import type { Correccion } from './esquema-salida';

const DIMENSIONES: { clave: keyof Correccion['dimensiones']; nombre: string }[] = [
  { clave: 'correccion', nombre: 'Corrección técnica' },
  { clave: 'complejidad', nombre: 'Complejidad y trade-offs' },
  { clave: 'comunicacion', nombre: 'Comunicación' },
];

export function tonoPuntuacion(p: number): 'ok' | 'aviso' | 'mal' {
  return p >= 7 ? 'ok' : p >= 4 ? 'aviso' : 'mal';
}

const VEREDICTO: Record<'ok' | 'aviso' | 'mal', string> = {
  ok: 'Pasarías',
  aviso: 'Justo',
  mal: 'No pasarías',
};

export function Scorecard({ c, modelo }: { c: Correccion; modelo?: string }) {
  const tono = tonoPuntuacion(c.puntuacion);
  const canto = tono === 'ok' ? 'bg-ok' : tono === 'aviso' ? 'bg-aviso' : 'bg-mal';
  const texto = tono === 'ok' ? 'text-ok' : tono === 'aviso' ? 'text-aviso' : 'text-mal';

  return (
    <section
      aria-label="Tarjeta de puntuación"
      aria-live="polite"
      className="grid grid-cols-[3px_1fr] overflow-hidden tarjeta"
    >
      <span className={canto} aria-hidden />
      <div>
        <div className="flex items-end justify-between gap-4 border-b border-linea px-4 py-3">
          <div>
            <p className="rotulo">Veredicto</p>
            <p className={`display text-[1.5rem] ${texto}`}>{VEREDICTO[tono]}</p>
          </div>
          <p className={`tabular display text-[3rem] leading-none ${texto}`}>
            {c.puntuacion}
            <span className="text-[1.25rem] text-tinta-3">/10</span>
          </p>
        </div>

        <dl className="space-y-2.5 border-b border-linea px-4 py-3.5">
          {DIMENSIONES.map(({ clave, nombre }) => (
            <div key={clave} className="grid grid-cols-[1fr_5.5rem_1.75rem] items-center gap-3">
              <dt className="text-[0.8125rem] text-tinta-2">{nombre}</dt>
              <dd className="col-start-2">
                <Casillas valor={c.dimensiones[clave]} de={5} tono={tono} anima />
              </dd>
              <dd className="tabular text-right font-mono text-[0.75rem] text-tinta-3">
                {c.dimensiones[clave]}/5
              </dd>
            </div>
          ))}
        </dl>

        <div className="grid gap-x-6 gap-y-4 px-4 py-4 sm:grid-cols-2">
          <div>
            <h3 className="rotulo text-ok">Aciertos</h3>
            <ul className="mt-2 space-y-1.5 text-[0.875rem] text-tinta">
              {c.aciertos.length ? (
                c.aciertos.map((a, i) => (
                  <li key={i} className="border-l-2 border-ok/50 pl-2.5">
                    {a}
                  </li>
                ))
              ) : (
                <li className="text-tinta-3">Ninguno destacable.</li>
              )}
            </ul>
          </div>
          <div>
            <h3 className="rotulo text-mal">Fallos</h3>
            <ul className="mt-2 space-y-1.5 text-[0.875rem] text-tinta">
              {c.fallos.length ? (
                c.fallos.map((f, i) => (
                  <li key={i} className="border-l-2 border-mal/50 pl-2.5">
                    {f}
                  </li>
                ))
              ) : (
                <li className="text-tinta-3">Ninguno.</li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-linea bg-papel-2 px-4 py-3.5">
          <h3 className="rotulo">Lo que diría quien aprueba</h3>
          <p className="mt-1.5 text-[0.875rem] text-tinta-2">{c.respuestaQueAprueba}</p>
          <p className="mt-3 text-[0.9375rem] text-tinta">
            <span className="font-semibold text-esquina">Siguiente paso. </span>
            {c.siguientePaso}
          </p>
        </div>

        {modelo ? (
          <p className="border-t border-linea px-4 py-2 font-mono text-[0.6875rem] text-tinta-3">
            Corregido por {modelo}. Orienta; el criterio final es tuyo.
          </p>
        ) : null}
      </div>
    </section>
  );
}
