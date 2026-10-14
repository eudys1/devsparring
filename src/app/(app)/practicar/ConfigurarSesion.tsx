'use client';

// Elegir sesión es elegir una combinación de modo, nivel y pista. La pantalla
// nunca deja elegir una combinación vacía: la cuenta se recalcula al vuelo y lo
// que no tiene preguntas se deshabilita con su motivo, en vez de dejarte
// empezar una sesión de cero preguntas.
import { Boxes, Check, Code, GitPullRequest, MessageSquareText, Users, Zap } from 'lucide-react';
import { useState } from 'react';
import { Boton } from '@/components/ui/Boton';
import { Casilla, Selector } from '@/components/ui/Campo';
import { Peso } from '@/components/ui/Dato';
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
import {
  guardarRelampago,
  guardarSinTema,
  useRelampago,
  useSinTema,
} from '@/features/sesion/preferencias';

const ICONO: Record<Modo, typeof Zap> = {
  flash: Zap,
  verbal: MessageSquareText,
  kata: Code,
  review: GitPullRequest,
  diseno: Boxes,
  star: Users,
};

// 'stack' es "lo de siempre": tu stack si tienes uno, todas si no. 'todas' fuerza todas.
type Eleccion = 'stack' | 'todas' | Pista;

export function ConfigurarSesion({
  disponibilidad,
  inicial,
  vencidasPorPista,
  foco,
  accion,
}: {
  disponibilidad: Disponibilidad;
  inicial: { modo: Modo; nivel: Nivel; idioma: 'es' | 'en'; pista?: Pista };
  vencidasPorPista: Partial<Record<Pista, number>>;
  /** Tu stack (Cuenta): las pistas de las sesiones mezcladas. Vacío = todas. */
  foco: Pista[];
  accion: (form: FormData) => void;
}) {
  const [modo, setModo] = useState<Modo>(inicial.modo);
  const [nivel, setNivel] = useState<Nivel>(inicial.nivel);
  const [elegida, setElegida] = useState<Eleccion>(inicial.pista ?? 'stack');
  // Sin decir el tema, la sesión mezcla pistas: elegir una delataría el tema.
  const sinTema = useSinTema();
  const eleccion: Eleccion =
    sinTema && elegida !== 'stack' && elegida !== 'todas' ? 'stack' : elegida;
  const relampago = useRelampago();

  const delNivel = disponibilidad[modo][nivel];
  const deStack = foco.reduce((a, p) => a + (delNivel.pistas[p] ?? 0), 0);
  const disponibles =
    eleccion === 'todas' || (eleccion === 'stack' && foco.length === 0)
      ? delNivel.total
      : eleccion === 'stack'
        ? deStack
        : (delNivel.pistas[eleccion] ?? 0);
  const pistasPosibles = PISTAS.filter((p) => (delNivel.pistas[p] ?? 0) > 0);
  const totalVencidas = Object.values(vencidasPorPista).reduce((a, b) => a + (b ?? 0), 0);

  const opciones = [
    foco.length
      ? {
          id: 'stack',
          texto: `Tu stack (${deStack})`,
          detalle: foco.map((p) => NOMBRE_PISTA[p]).join(', '),
        }
      : { id: 'stack', texto: `Todas las pistas (${delNivel.total})` },
    ...(foco.length ? [{ id: 'todas', texto: `Todas las pistas (${delNivel.total})` }] : []),
    ...pistasPosibles.map((p) => ({
      id: p,
      texto: `${NOMBRE_PISTA[p]} (${delNivel.pistas[p]})`,
      detalle: vencidasPorPista[p] ? `${vencidasPorPista[p]} por repasar` : undefined,
    })),
  ];

  return (
    <form action={accion} className="mt-8">
      <input type="hidden" name="modo" value={modo} />
      <input type="hidden" name="nivel" value={nivel} />
      <input type="hidden" name="pista" value={eleccion} />

      <fieldset>
        <legend className="rotulo mb-3">Modo</legend>
        {/* Cada modo es una tarjeta con la franja de su color; la elegida se
            levanta y se rodea de ese color. */}
        <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
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
                  className={`tarjeta ficha-modo m-${m} relative flex h-full w-full cursor-pointer flex-col items-start gap-1.5 overflow-hidden px-5 pb-5 pt-8 text-left disabled:pointer-events-none disabled:opacity-40 ${
                    activo
                      ? '-translate-y-1.5 shadow-[0_0_0_3px_var(--c),var(--sombra-tarjeta)]'
                      : ''
                  }`}
                >
                  <span className="absolute inset-x-0 top-0 h-3 bg-[var(--c)]" aria-hidden />
                  <span className="flex w-full items-start justify-between">
                    <span
                      className="grid h-10 w-10 place-items-center rounded-[8px] border-2 border-ink bg-[var(--c)] text-sobre-modo"
                      aria-hidden
                    >
                      <Icono className="h-[18px] w-[18px]" strokeWidth={2} />
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
                  <span className="text-[0.9375rem] leading-snug text-tinta-2">
                    {NOMBRE_MODO[m].frase}
                  </span>
                  <span className="tabular mt-auto pt-3 font-mono text-[0.75rem] text-tinta-3">
                    {NOMBRE_MODO[m].minutos} · {vacio ? 'sin preguntas' : `${n} preg.`}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
        {modo === 'verbal' ? (
          <Casilla
            data-prueba="relampago"
            className="mt-5 max-w-2xl"
            marcada={relampago}
            onCambio={guardarRelampago}
          >
            <span className="font-medium text-tinta">Relámpago, sin escribir.</span> La tarjeta te
            enseña la pregunta; la piensas, la giras y ves la idea en una frase. Luego te puntúas.
          </Casilla>
        ) : null}
      </fieldset>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,0.7fr)]">
        <fieldset className="min-w-0">
          <legend className="mb-1.5 text-[0.875rem] font-medium text-tinta">
            Nivel al que aplicas
          </legend>
          <div className="grid grid-cols-5 rounded-r border-2 border-ink bg-papel-2 p-0.5 shadow-[var(--dura)]">
            {NIVELES.map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setNivel(n)}
                aria-pressed={nivel === n}
                title={NOMBRE_NIVEL[n].detalle}
                className={`flex min-h-11 cursor-pointer flex-col items-center justify-center gap-1 rounded-[6px] px-1 text-[0.8125rem] transition-[transform,background-color,color] duration-[140ms] ease-salida active:scale-[0.97] sm:flex-row sm:gap-1.5 sm:text-[0.875rem] ${
                  nivel === n
                    ? 'bg-esquina text-esquina-tinta'
                    : 'text-tinta-2 hover:bg-papel hover:text-tinta'
                }`}
              >
                <Peso nivel={n} conNombre={false} />
                {NOMBRE_NIVEL[n].nombre}
              </button>
            ))}
          </div>
          <p className="mt-1.5 text-[0.8125rem] text-tinta-3">{NOMBRE_NIVEL[nivel].detalle}.</p>
        </fieldset>

        <div className="flex flex-col gap-3">
          <Selector
            etiqueta="Pista"
            valor={eleccion}
            onCambio={(v) => setElegida(v as Eleccion)}
            deshabilitado={sinTema}
            opciones={opciones}
          />
          <Casilla data-prueba="sin-tema" marcada={sinTema} onCambio={guardarSinTema}>
            <span className="font-medium text-tinta">Sin decir el tema.</span> Mezcla pistas y no te
            dice de qué va cada pregunta hasta que respondes, como en una entrevista.
          </Casilla>
        </div>

        <Selector
          etiqueta="Idioma"
          nombre="idioma"
          valorInicial={inicial.idioma}
          opciones={[
            { id: 'es', texto: 'Español' },
            { id: 'en', texto: 'Inglés' },
          ]}
        />
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4 border-t border-linea pt-6">
        <Boton type="submit" variante="esquina" tamano="grande" disabled={disponibles === 0}>
          Empezar
        </Boton>
        <p className="text-[0.9375rem] text-tinta-2" aria-live="polite">
          {disponibles === 0 ? (
            <span className="text-aviso">
              {eleccion !== 'stack' && eleccion !== 'todas'
                ? 'Esa pista no tiene preguntas de este modo y nivel. Prueba con otra o con todas.'
                : eleccion === 'stack' && foco.length
                  ? 'Tu stack no tiene preguntas de este modo y nivel. Elige «Todas las pistas».'
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
