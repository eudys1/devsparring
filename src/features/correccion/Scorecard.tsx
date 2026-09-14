// La hoja de puntuación del entrevistador: la nota manda en la pantalla y se le
// da geometría (las tres dimensiones son barras que se comparan a ojo); el
// veredicto es el color del canto.
import type { Correccion } from './esquema-salida';

const DIMENSIONES: { clave: keyof Correccion['dimensiones']; nombre: string }[] = [
  { clave: 'correccion', nombre: 'Corrección técnica' },
  { clave: 'complejidad', nombre: 'Complejidad y trade-offs' },
  { clave: 'comunicacion', nombre: 'Comunicación' },
];

export function tonoPuntuacion(p: number): 'ok' | 'aviso' | 'mal' {
  return p >= 7 ? 'ok' : p >= 4 ? 'aviso' : 'mal';
}

export function Scorecard({ c, modelo }: { c: Correccion; modelo?: string }) {
  const tono = tonoPuntuacion(c.puntuacion);
  const canto =
    tono === 'ok' ? 'border-l-ok' : tono === 'aviso' ? 'border-l-aviso' : 'border-l-mal';
  const color = tono === 'ok' ? 'text-ok' : tono === 'aviso' ? 'text-aviso' : 'text-mal';
  return (
    <section
      className={`aparece rounded-r border border-linea border-l-4 bg-papel p-5 shadow-panel ${canto}`}
      aria-label="Corrección"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-tinta-3">
            Puntuación
          </p>
          <p className={`tabular font-display text-5xl font-semibold leading-none ${color}`}>
            {c.puntuacion}
            <span className="text-xl text-tinta-3">/10</span>
          </p>
        </div>
        <dl className="w-full max-w-[260px] space-y-1.5">
          {DIMENSIONES.map(({ clave, nombre }) => (
            <div
              key={clave}
              className="grid grid-cols-[1fr_auto] items-center gap-2 text-[0.75rem]"
            >
              <dt className="text-tinta-2">{nombre}</dt>
              <dd className="tabular font-mono text-tinta-3">{c.dimensiones[clave]}/5</dd>
              <dd className="col-span-2 h-1.5 rounded-[2px] bg-linea">
                <span
                  className="block h-1.5 rounded-[2px] bg-tinta-2"
                  style={{ width: `${(c.dimensiones[clave] / 5) * 100}%` }}
                />
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <h3 className="text-[0.8125rem] font-semibold text-ok">Aciertos</h3>
          <ul className="mt-1.5 space-y-1 text-[0.9375rem]">
            {c.aciertos.length ? (
              c.aciertos.map((a, i) => (
                <li key={i} className="border-l-2 border-ok/40 pl-2">
                  {a}
                </li>
              ))
            ) : (
              <li className="text-tinta-3">Ninguno destacable.</li>
            )}
          </ul>
        </div>
        <div>
          <h3 className="text-[0.8125rem] font-semibold text-mal">Fallos</h3>
          <ul className="mt-1.5 space-y-1 text-[0.9375rem]">
            {c.fallos.length ? (
              c.fallos.map((f, i) => (
                <li key={i} className="border-l-2 border-mal/40 pl-2">
                  {f}
                </li>
              ))
            ) : (
              <li className="text-tinta-3">Ninguno.</li>
            )}
          </ul>
        </div>
      </div>

      <div className="mt-5 rounded-r bg-papel-2 p-3.5">
        <h3 className="text-[0.8125rem] font-semibold">Lo que diría un candidato que aprueba</h3>
        <p className="mt-1 text-[0.9375rem] text-tinta-2">{c.respuestaQueAprueba}</p>
      </div>
      <p className="mt-4 text-[0.9375rem]">
        <span className="font-semibold text-brasa">Siguiente paso: </span>
        {c.siguientePaso}
      </p>
      {modelo ? (
        <p className="mt-3 font-mono text-[0.6875rem] text-tinta-3">
          Corregido por {modelo}. La IA orienta; el criterio final es tuyo.
        </p>
      ) : null}
    </section>
  );
}
