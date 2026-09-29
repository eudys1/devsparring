'use client';

// Elegir sesión es elegir una combinación de modo, nivel y pista. La pantalla
// nunca deja elegir una combinación vacía: la cuenta se recalcula al vuelo y lo
// que no tiene preguntas se deshabilita con su motivo, en vez de dejarte
// empezar una sesión de cero preguntas.
import { Boxes, Check, Code, GitPullRequest, MessageSquareText, Users, Zap } from 'lucide-react';
import { useState } from 'react';
import { Boton } from '@/components/ui/Boton';
import { Peso } from '@/components/ui/Dato';
import { Rotulo, Selector } from '@/components/ui/Campo';
import {
  MODOS,
  NIVELES,
  PISTAS,
  type Modo,
  type Nivel,
  type Pista,
} from '@/features/preguntas/esquema';
import type { Disponibilidad } from '@/features/preguntas/filtrar';
import { NOMBRE_MODO, NOMBRE_NIVEL, NOMBRE_PISTA } from '@/features/preguntas/nombres';

const ICONO: Record<Modo, typeof Zap> = {
  flash: Zap,
  verbal: MessageSquareText,
  kata: Code,
  review: GitPullRequest,
  diseno: Boxes,
  star: Users,
};

export function ConfigurarSesion({
  disponibilidad,
  inicial,
  vencidasPorPista,
  accion,
}: {
  disponibilidad: Disponibilidad;
  inicial: { modo: Modo; nivel: Nivel; idioma: 'es' | 'en'; pista?: Pista };
  vencidasPorPista: Partial<Record<Pista, number>>;
  accion: (form: FormData) => void;
}) {
  const [modo, setModo] = useState<Modo>(inicial.modo);
  const [nivel, setNivel] = useState<Nivel>(inicial.nivel);
  const [pista, setPista] = useState<Pista | ''>(inicial.pista ?? '');

  const delNivel = disponibilidad[modo][nivel];
  const disponibles = pista ? (delNivel.pistas[pista] ?? 0) : delNivel.total;
  const pistasPosibles = PISTAS.filter((p) => (delNivel.pistas[p] ?? 0) > 0);
  const pistaImposible = pista !== '' && disponibles === 0;
  const totalVencidas = Object.values(vencidasPorPista).reduce((a, b) => a + (b ?? 0), 0);

  return (
    <form action={accion} className="mt-7">
      <input type="hidden" name="modo" value={modo} />
      <input type="hidden" name="nivel" value={nivel} />
      <input type="hidden" name="pista" value={pista} />

      <fieldset>
        <legend className="rotulo mb-2">Modo</legend>
        {/* Cada modo es una tarjeta con la franja de su color; la elegida se
            levanta y se rodea de ese color. */}
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {MODOS.map((m) => {
            const n = disponibilidad[m][nivel].total;
            const activo = modo === m;
            const vacio = n === 0;
            const Icono = ICONO[m];
            return (
              <li key={m}>
                <button
                  type="button"
                  onClick={() => setModo(m)}
                  disabled={vacio}
                  aria-pressed={activo}
                  className={`tarjeta ficha-modo m-${m} relative flex h-full w-full flex-col items-start gap-1 overflow-hidden px-4 pb-4 pt-7 text-left disabled:pointer-events-none disabled:opacity-40 ${
                    activo
                      ? '-translate-y-1.5 shadow-[0_0_0_3px_var(--c),var(--sombra-tarjeta)]'
                      : ''
                  }`}
                >
                  <span className="absolute inset-x-0 top-0 h-3 bg-[var(--c)]" aria-hidden />
                  <span className="flex w-full items-start justify-between">
                    <span
                      className="grid h-9 w-9 place-items-center rounded-[8px] border-2 border-ink bg-[var(--c)] text-sobre-modo"
                      aria-hidden
                    >
                      <Icono className="h-4 w-4" strokeWidth={2} />
                    </span>
                    {activo ? (
                      <span
                        className="grid h-7 w-7 place-items-center rounded-full border-2 border-ink bg-[var(--c)] text-sobre-modo"
                        aria-hidden
                      >
                        <Check className="h-4 w-4" strokeWidth={2.5} />
                      </span>
                    ) : null}
                  </span>
                  <span className="display mt-2 text-[1.5rem] text-tinta">
                    {NOMBRE_MODO[m].nombre}
                  </span>
                  <span className="text-[0.875rem] leading-snug text-tinta-2">
                    {NOMBRE_MODO[m].frase}
                  </span>
                  <span className="tabular mt-auto pt-2 font-mono text-[0.75rem] text-tinta-3">
                    {NOMBRE_MODO[m].minutos} · {vacio ? 'sin preguntas' : `${n} preg.`}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </fieldset>

      <div className="mt-6 grid gap-5 sm:grid-cols-3">
        <fieldset>
          <legend className="mb-1.5 text-[0.8125rem] font-medium text-tinta">
            Nivel al que aplicas
          </legend>
          <div className="flex rounded-r border-2 border-ink bg-papel-2 p-0.5 shadow-[var(--dura)]">
            {NIVELES.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setNivel(n)}
                aria-pressed={nivel === n}
                className={`flex min-h-10 flex-1 items-center justify-center gap-1.5 rounded-[6px] text-[0.875rem] transition-[transform,background-color,color] duration-[140ms] ease-salida active:scale-[0.97] ${
                  nivel === n
                    ? 'bg-esquina text-esquina-tinta'
                    : 'text-tinta-2 hover:bg-papel hover:text-tinta'
                }`}
              >
                <Peso nivel={n} conNombre={false} />
                {NOMBRE_NIVEL[n]}
              </button>
            ))}
          </div>
        </fieldset>

        <div>
          <Rotulo htmlFor="pista">Pista</Rotulo>
          <Selector
            id="pista"
            value={pista}
            onChange={(e) => setPista(e.target.value as Pista | '')}
          >
            <option value="">Todas ({delNivel.total})</option>
            {pistasPosibles.map((p) => (
              <option key={p} value={p}>
                {NOMBRE_PISTA[p]} ({delNivel.pistas[p]})
                {vencidasPorPista[p] ? ` · ${vencidasPorPista[p]} por repasar` : ''}
              </option>
            ))}
          </Selector>
        </div>

        <div>
          <Rotulo htmlFor="idioma">Idioma de la entrevista</Rotulo>
          <Selector id="idioma" name="idioma" defaultValue={inicial.idioma}>
            <option value="es">Español</option>
            <option value="en">Inglés</option>
          </Selector>
        </div>
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-4 border-t border-linea pt-5">
        <Boton type="submit" variante="esquina" tamano="grande" disabled={disponibles === 0}>
          Empezar
        </Boton>
        <p className="text-[0.875rem] text-tinta-2" aria-live="polite">
          {disponibles === 0 ? (
            <span className="text-aviso">
              {pistaImposible
                ? 'Esa pista no tiene preguntas de este modo y nivel. Prueba con otra o con "Todas".'
                : 'Este modo todavía no tiene preguntas para este nivel.'}
            </span>
          ) : (
            <>
              <span className="tabular font-semibold text-tinta">{disponibles}</span> preguntas
              disponibles
              {totalVencidas > 0 ? (
                <>
                  {' '}
                  · <span className="tabular">{totalVencidas}</span> pendientes de repaso van
                  primero
                </>
              ) : null}
            </>
          )}
        </p>
      </div>
    </form>
  );
}
