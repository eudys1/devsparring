'use client';

// La mitad derecha del héroe: un bloque de azul tinta con una ronda que se
// juega sola. La pregunta se escribe, aparece una respuesta de ejemplo, el juez
// marca la tarjeta y cae el veredicto. El número grande es el asalto en curso
// de verdad (R1, R2, R3), no un adorno. La pregunta y las dimensiones son las
// reales del banco; la respuesta va rotulada como simulación.
import { useEffect, useState, useSyncExternalStore } from 'react';
import { Casillas } from '@/components/ui/Dato';
import { ConmutadorVara, useVara } from './Vara';

export type Guion = {
  pista: string;
  pregunta: string;
  respuesta: string;
  dimensiones: { nombre: string; valor: number }[];
  puntuacion: number;
  fallo: string;
};

type Fase = 'escribiendo' | 'respondiendo' | 'marcando' | 'veredicto';

const VELOCIDAD = 26; // ms por carácter

// Se llama useX porque la regla de los hooks lo exige. La preferencia del
// sistema se lee como fuente externa: así no hay setState dentro de un efecto
// ni desajuste entre el primer render y el navegador.
function useMovimientoReducido(): boolean {
  return useSyncExternalStore(
    (avisar) => {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      mq.addEventListener('change', avisar);
      return () => mq.removeEventListener('change', avisar);
    },
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => false,
  );
}

export function RondaViva({ guiones }: { guiones: Guion[] }) {
  const [indice, setIndice] = useState(0);
  const quieto = useMovimientoReducido();
  const n = indice % guiones.length;
  const g = guiones[n]!;

  return (
    <div className="bloque bloque-luna flex flex-col rounded-r2 px-5 pb-6 pt-5 sm:px-8 sm:pb-8 sm:pt-7">
      <div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-3">
        <div>
          <p className="rotulo">Simulación · pregunta real de {g.pista}</p>
          <p
            className="cartel mt-1 text-[clamp(5rem,14vw,10rem)] leading-[0.8] text-white [text-shadow:0_0_60px_rgb(255_255_255/0.25)]"
            aria-label={`Asalto ${n + 1} de ${guiones.length}`}
          >
            R{n + 1}
          </p>
        </div>
        <ConmutadorVara />
      </div>

      {/* La clave reinicia el asalto: cada uno monta su estado limpio */}
      <Asalto
        key={indice}
        g={g}
        quieto={quieto}
        onFin={() => setIndice((x) => (x + 1) % guiones.length)}
      />

      <div className="mt-auto flex gap-1.5 pt-4" aria-hidden>
        {guiones.map((x, i) => (
          <span
            key={`${x.pista}-${i}`}
            className={`h-0.5 flex-1 rounded-full ${i === n ? 'bg-white' : 'bg-white/25'}`}
          />
        ))}
      </div>
    </div>
  );
}

function Asalto({ g, quieto, onFin }: { g: Guion; quieto: boolean; onFin: () => void }) {
  const { vara } = useVara();
  const [fase, setFase] = useState<Fase>(quieto ? 'veredicto' : 'escribiendo');
  const [letras, setLetras] = useState(quieto ? g.pregunta.length : 0);

  useEffect(() => {
    if (quieto) return;
    const relojes: ReturnType<typeof setTimeout>[] = [];
    let i = 0;
    const escribir = setInterval(() => {
      i += 1;
      setLetras(i);
      if (i >= g.pregunta.length) {
        clearInterval(escribir);
        relojes.push(
          setTimeout(() => setFase('respondiendo'), 420),
          setTimeout(() => setFase('marcando'), 1500),
          setTimeout(() => setFase('veredicto'), 2600),
          setTimeout(onFin, 6400),
        );
      }
    }, VELOCIDAD);
    return () => {
      clearInterval(escribir);
      for (const t of relojes) clearTimeout(t);
    };
  }, [g.pregunta.length, onFin, quieto]);

  const marcando = fase === 'marcando' || fase === 'veredicto';
  // Con la vara de senior, la misma respuesta baja de nota: esa es la tesis.
  const puntuacion = vara === 'senior' ? Math.max(0, g.puntuacion - 3) : g.puntuacion;
  const tono = puntuacion >= 7 ? 'ok' : puntuacion >= 4 ? 'aviso' : 'mal';

  return (
    <div className="noche panel mt-5 min-h-[19rem] px-4 py-4 sm:px-5" aria-hidden>
      <p className="text-[1.0625rem] font-medium leading-snug text-[var(--noche-tinta)]">
        {g.pregunta.slice(0, letras)}
        {fase === 'escribiendo' ? <span className="cursor" /> : null}
      </p>

      <div
        className={`mt-4 border-l-2 border-[var(--noche-linea-2)] pl-3 transition-opacity duration-[260ms] ease-salida ${
          fase === 'escribiendo' ? 'opacity-30' : 'opacity-100'
        }`}
      >
        <span className="rotulo">Tu respuesta</span>
        <p className="mt-1 text-[0.875rem] leading-snug text-[var(--noche-tinta-2)]">
          {fase === 'escribiendo' ? 'Escribiendo…' : g.respuesta}
        </p>
      </div>

      <dl
        className={`mt-5 space-y-2 transition-opacity duration-[260ms] ease-salida ${
          marcando ? 'opacity-100' : 'opacity-30'
        }`}
      >
        {g.dimensiones.map((d) => {
          const valor = vara === 'senior' ? Math.max(0, d.valor - 1) : d.valor;
          return (
            <div key={d.nombre} className="grid grid-cols-[1fr_5.5rem_1.75rem] items-center gap-3">
              <dt className="text-[0.8125rem] text-[var(--noche-tinta-2)]">{d.nombre}</dt>
              <dd>
                <Casillas valor={marcando ? valor : 0} de={5} tono={tono} anima={marcando} />
              </dd>
              <dd className="tabular text-right font-mono text-[0.75rem] text-[var(--noche-tinta-2)]">
                {valor}/5
              </dd>
            </div>
          );
        })}
      </dl>

      <div
        className={`mt-5 flex items-end justify-between gap-4 border-t border-[var(--noche-linea)] pt-3.5 transition-opacity duration-[300ms] ease-salida ${
          fase === 'veredicto' ? 'opacity-100' : 'opacity-25'
        }`}
      >
        <p className="max-w-[30ch] text-[0.8125rem] leading-snug text-[var(--noche-tinta-2)]">
          <span className="font-semibold text-mal">Lo que faltó. </span>
          {g.fallo}
        </p>
        <p
          className={`tabular cartel text-[3rem] leading-none ${
            tono === 'ok' ? 'text-ok' : tono === 'aviso' ? 'text-aviso' : 'text-mal'
          }`}
        >
          {puntuacion}
          <span className="text-[1.125rem] text-[var(--noche-tinta-2)]">/10</span>
        </p>
      </div>
    </div>
  );
}
