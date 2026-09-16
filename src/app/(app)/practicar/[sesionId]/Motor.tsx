'use client';

// El motor de una sesión: un asalto por pregunta, con reloj, respuesta,
// corrección y nota de repaso. Diseñado como racha: al guardar salta solo al
// siguiente y todo se puede hacer con el teclado. Por eso el cambio de pregunta
// NO se anima: es una acción de teclado que se repite decenas de veces y
// animarla haría la app lenta (docs/diseno.md).
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Atajo, Boton, estilosBoton } from '@/components/ui/Boton';
import { AreaTexto } from '@/components/ui/Campo';
import { Ficha, Peso } from '@/components/ui/Dato';
import { enLinea, Markdown } from '@/components/ui/Markdown';
import { pedirCorreccion } from '@/features/correccion/cliente';
import type { Correccion } from '@/features/correccion/esquema-salida';
import { promptParaCopiar } from '@/features/correccion/prompt';
import { Scorecard } from '@/features/correccion/Scorecard';
import { leerClave, leerModelo } from '@/features/cuenta/clave';
import { EditorKata, ResultadoTests, textoResultado } from '@/features/editor/EditorKata';
import type { ResultadoEjecucion } from '@/features/editor/runner/casos';
import type { Modo, Nivel, Pregunta } from '@/features/preguntas/esquema';
import { NOMBRE_MODO, NOMBRE_PISTA, NOMBRE_TIPO } from '@/features/preguntas/nombres';
import { rubricaParaNivel } from '@/features/preguntas/rubrica';
import { notaDesdePuntuacion, type Nota } from '@/features/srs/scheduler';
import { cerrarSesion, guardarYRepasar } from './acciones';

type Sesion = { id: string; modo: Modo; nivel: Nivel; idioma: 'es' | 'en' };
type Fase = 'respondiendo' | 'corrigiendo' | 'evaluando' | 'guardando';

const NOTAS: { nota: Nota; texto: string; atajo: string }[] = [
  { nota: 'again', texto: 'Fallé', atajo: '1' },
  { nota: 'hard', texto: 'A medias', atajo: '2' },
  { nota: 'good', texto: 'Bien', atajo: '3' },
  { nota: 'easy', texto: 'Fácil', atajo: '4' },
];

export function Motor({
  sesion,
  preguntas,
  yaRespondidas,
  esDueno,
  demo = false,
}: {
  sesion: Sesion;
  preguntas: Pregunta[];
  yaRespondidas: string[];
  esDueno: boolean;
  // Demo pública: sin cuenta, sin guardar, sin corrección por API.
  demo?: boolean;
}) {
  const router = useRouter();
  const pendientes = useMemo(
    () => preguntas.filter((p) => !yaRespondidas.includes(p.id)),
    [preguntas, yaRespondidas],
  );
  const [indice, setIndice] = useState(0);
  const [fase, setFase] = useState<Fase>('respondiendo');
  const [respuesta, setRespuesta] = useState('');
  const [correccion, setCorreccion] = useState<{
    c: Correccion;
    modelo: string;
    versionRubrica: number;
  } | null>(null);
  const [tests, setTests] = useState<ResultadoEjecucion | null>(null);
  const [nota, setNota] = useState<Nota | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiado, setCopiado] = useState(false);
  // Autoevaluación sin IA: marcar qué criterios de la rúbrica has cubierto.
  const [cubiertos, setCubiertos] = useState<number[]>([]);
  const [segundos, setSegundos] = useState(0);
  const inicio = useRef(0);
  const hechas = yaRespondidas.length + indice;
  const total = preguntas.length;
  const pregunta = pendientes[indice];
  const esKata = sesion.modo === 'kata';
  // Explicar: respuesta desarrollada; al terminar se enseña además la repregunta.
  const esVerbal = sesion.modo === 'verbal';

  useEffect(() => {
    inicio.current = Date.now();
    const t = setInterval(
      () => setSegundos(Math.floor((Date.now() - inicio.current) / 1000)),
      1000,
    );
    return () => clearInterval(t);
  }, [indice]);

  const puedeCorregir = !demo && (esDueno || !!leerClave());

  const corregir = useCallback(async () => {
    if (!pregunta || fase !== 'respondiendo') return;
    if (!respuesta.trim() && !esKata) return setError('Escribe algo antes de corregir.');
    setError(null);
    setFase('corrigiendo');
    const r = await pedirCorreccion({
      preguntaId: pregunta.id,
      modo: sesion.modo,
      nivel: sesion.nivel,
      idioma: sesion.idioma,
      respuesta,
      resultadoTests: tests ? textoResultado(tests) : undefined,
      modelo: leerModelo(),
      apiKey: leerClave() ?? undefined,
    });
    if (!r.ok) {
      setError(r.mensaje);
      setFase('respondiendo');
      return;
    }
    setCorreccion({ c: r.correccion, modelo: r.modelo, versionRubrica: r.versionRubrica });
    setNota(notaDesdePuntuacion(r.correccion.puntuacion, tests ? !tests.ok : false));
    setFase('evaluando');
  }, [esKata, fase, pregunta, respuesta, sesion, tests]);

  const autoevaluar = useCallback(() => {
    if (fase !== 'respondiendo') return;
    setError(null);
    setNota(tests ? (tests.ok ? 'good' : 'hard') : null);
    setFase('evaluando');
  }, [fase, tests]);

  const copiarPrompt = useCallback(async () => {
    if (!pregunta) return;
    const texto = promptParaCopiar({
      modo: sesion.modo,
      nivel: sesion.nivel,
      idioma: sesion.idioma,
      pregunta: pregunta.texto,
      contexto: pregunta.contexto,
      rubrica: rubricaParaNivel(pregunta, sesion.nivel),
      respuestaModelo: pregunta.respuestaModelo,
      respuesta,
      resultadoTests: tests ? textoResultado(tests) : undefined,
    });
    await navigator.clipboard.writeText(texto);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  }, [pregunta, respuesta, sesion, tests]);

  const guardar = useCallback(async () => {
    if (!pregunta || !nota || fase !== 'evaluando') return;
    setFase('guardando');
    const r = demo
      ? { ok: true as const }
      : await guardarYRepasar({
          sesionId: sesion.id,
          preguntaId: pregunta.id,
          preguntaVersion: pregunta.version,
          respuesta,
          resultadoTests: tests ?? undefined,
          correccion: correccion?.c,
          modelo: correccion?.modelo,
          versionRubrica: correccion?.versionRubrica,
          duracionMs: Date.now() - inicio.current,
          nota,
        });
    if (!r.ok) {
      setError('No se pudo guardar. Reintenta.');
      setFase('evaluando');
      return;
    }
    if (indice + 1 >= pendientes.length) {
      if (demo) {
        router.push('/entrar?modo=registro');
        return;
      }
      await cerrarSesion(sesion.id);
      router.push('/hoy');
      router.refresh();
      return;
    }
    setIndice(indice + 1);
    setRespuesta('');
    setCorreccion(null);
    setTests(null);
    setNota(null);
    setCubiertos([]);
    setError(null);
    setSegundos(0);
    setFase('respondiendo');
  }, [
    correccion,
    demo,
    fase,
    indice,
    nota,
    pendientes.length,
    pregunta,
    respuesta,
    router,
    sesion.id,
    tests,
  ]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const destino = e.target as HTMLElement | null;
      const enCampo =
        destino?.tagName === 'TEXTAREA' ||
        destino?.tagName === 'INPUT' ||
        !!destino?.closest('.monaco-editor');
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey) && fase === 'respondiendo' && !esKata) {
        e.preventDefault();
        void (puedeCorregir ? corregir() : autoevaluar());
      }
      if (fase === 'evaluando' && !enCampo) {
        const n = NOTAS.find((x) => x.atajo === e.key);
        if (n) setNota(n.nota);
        if (e.key === 'Enter') void guardar();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [autoevaluar, corregir, esKata, fase, guardar, puedeCorregir]);

  if (!pregunta) {
    return (
      <div className="mx-auto max-w-xl py-16 text-center">
        <p className="rotulo">Fin de la sesión</p>
        <h1 className="display mt-2 text-[2.5rem] text-tinta">No quedan asaltos</h1>
        <p className="mt-2 text-tinta-2">Has respondido todas las preguntas de esta sesión.</p>
        <Link href="/hoy" className={`${estilosBoton('esquina')} mt-5`}>
          Volver a Hoy
        </Link>
      </div>
    );
  }

  const rubrica = rubricaParaNivel(pregunta, sesion.nivel);
  // Al marcar criterios, la nota de repaso se propone sola: nada, fallé; menos
  // de la mitad, a medias; casi todo, bien; todo, fácil. Se puede cambiar.
  const marcar = (i: number) => {
    const nuevos = cubiertos.includes(i) ? cubiertos.filter((x) => x !== i) : [...cubiertos, i];
    setCubiertos(nuevos);
    const r = nuevos.length / rubrica.length;
    setNota(nuevos.length === 0 ? 'again' : r < 0.5 ? 'hard' : r < 1 ? 'good' : 'easy');
  };
  // La repregunta del modo en voz alta: lo primero que solo se le exige al
  // senior, que es justo donde un entrevistador aprieta cuando bordeas la respuesta.
  const repregunta = esVerbal
    ? rubricaParaNivel(pregunta, 'senior').find(
        (c) => !rubricaParaNivel(pregunta, 'junior').includes(c),
      )
    : undefined;
  const tiempoLimite = pregunta.kata ? pregunta.kata.tiempoMin * 60 : null;
  const restante = tiempoLimite !== null ? tiempoLimite - segundos : null;
  const evaluando = fase === 'evaluando' || fase === 'guardando';
  const autoevaluacion = evaluando && !correccion;

  return (
    <div className="mx-auto max-w-6xl">
      {/*
        Marcador de la velada: el asalto y el reloj mandan, como en la pantalla
        de una retransmisión. Es la única pieza de noche dentro de la app, y por
        eso separa "estoy en una sesión" de "estoy mirando la app".
      */}
      <header className="noche panel overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-3.5 md:px-5">
          <div className="flex items-baseline gap-4">
            <span className="tabular cartel text-[2.25rem] leading-none text-[var(--noche-tinta)]">
              R{hechas + 1}
              <span className="text-[1.125rem] text-[var(--noche-tinta-2)]">/{total}</span>
            </span>
            <span className="flex items-center gap-3">
              <span className="text-[0.9375rem] text-[var(--noche-tinta-2)]">
                {NOMBRE_MODO[sesion.modo].nombre}
              </span>
              <Peso nivel={sesion.nivel} />
            </span>
          </div>
          <span
            className={`tabular font-mono text-[1.75rem] leading-none ${
              restante !== null && restante < 0
                ? 'text-mal'
                : restante !== null && restante < 120
                  ? 'text-aviso'
                  : 'text-[var(--noche-tinta)]'
            }`}
          >
            {restante !== null ? formatear(restante) : formatear(segundos)}
          </span>
        </div>
        {/* Cada asalto de la sesión: hecho, en curso o pendiente */}
        <ol
          className="flex gap-0.5 px-4 pb-3 md:px-5"
          aria-label={`Asalto ${hechas + 1} de ${total}`}
        >
          {Array.from({ length: total }, (_, i) => {
            const estado = i < hechas ? 'hecho' : i === hechas ? 'actual' : 'pendiente';
            return (
              <li
                key={i}
                className={`h-1.5 flex-1 ${
                  estado === 'actual'
                    ? 'bg-esquina'
                    : estado === 'hecho'
                      ? 'bg-[var(--noche-tinta-2)]'
                      : 'bg-[var(--noche-linea)]'
                }`}
              />
            );
          })}
        </ol>
      </header>
      <p className="mt-2 flex items-center justify-between gap-3 text-[0.8125rem] text-tinta-3">
        <span>
          {demo ? 'Demo: no se guarda nada.' : 'Cada asalto se guarda al pasar al siguiente.'}
        </span>
        <Link
          href={demo ? '/' : '/hoy'}
          className="underline decoration-linea-fuerte underline-offset-2 hover:text-tinta"
        >
          {demo ? 'Salir de la demo' : 'Salir y seguir luego'}
        </Link>
      </p>

      <div
        className={`mt-6 grid gap-6 ${esKata ? 'xl:grid-cols-[1.3fr_0.7fr]' : 'lg:grid-cols-[1.1fr_0.9fr]'}`}
      >
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Ficha>{NOMBRE_PISTA[pregunta.pista]}</Ficha>
            <Ficha>{NOMBRE_TIPO[pregunta.tipo]}</Ficha>
            {pregunta.frecuencia === 'alta' ? <Ficha tono="esquina">Cae mucho</Ficha> : null}
          </div>
          <h1
            className="prosa mt-3 text-[1.375rem] font-semibold leading-snug text-tinta md:text-[1.625rem]"
            dangerouslySetInnerHTML={{
              __html: enLinea(sesion.idioma === 'en' ? pregunta.texto.en : pregunta.texto.es),
            }}
          />
          <p
            className="prosa mt-1.5 text-[0.875rem] text-tinta-3"
            dangerouslySetInnerHTML={{
              __html: enLinea(
                sesion.idioma === 'en'
                  ? `En español: ${pregunta.texto.es}`
                  : `En inglés: ${pregunta.texto.en}`,
              ),
            }}
          />
          {pregunta.contexto ? (
            <Markdown texto={pregunta.contexto} className="mt-4 text-[0.9375rem]" />
          ) : null}

          <div className="mt-5">
            {esKata && pregunta.kata ? (
              <EditorKata
                codigoInicial={pregunta.kata.codigoInicial}
                funcion={pregunta.kata.funcion}
                casos={pregunta.kata.casos}
                congelarAleatorio={pregunta.kata.congelarAleatorio}
                onCambio={setRespuesta}
                onResultado={setTests}
                deshabilitado={fase !== 'respondiendo'}
              />
            ) : (
              <>
                <label htmlFor="respuesta" className="rotulo mb-1.5 block">
                  {esVerbal ? 'Tu explicación' : 'Tu respuesta'}
                </label>
                <AreaTexto
                  id="respuesta"
                  className={esVerbal ? 'min-h-56' : 'min-h-44'}
                  placeholder={
                    esVerbal
                      ? 'Desarróllala como se la contarías al entrevistador: qué, por qué y qué pasaría si…'
                      : 'Escribe tu respuesta…'
                  }
                  value={respuesta}
                  onChange={(e) => setRespuesta(e.target.value)}
                  disabled={fase !== 'respondiendo'}
                  autoFocus
                />
              </>
            )}
            {esKata ? (
              <p className="mt-2 text-[0.8125rem] text-tinta-3">
                Se corrige solo el código: nombres, casos borde, complejidad. No hace falta explicar
                nada. La corrección con IA orienta y puede equivocarse.
              </p>
            ) : null}
          </div>

          {tests ? (
            <div className="mt-3">
              <ResultadoTests r={tests} />
            </div>
          ) : null}

          {error ? (
            <p
              role="alert"
              className="mt-3 rounded-r border border-mal/40 bg-mal-suave px-3 py-2 text-[0.875rem] text-mal"
            >
              {error}
            </p>
          ) : null}

          {evaluando ? (
            <section className="mt-5 grid grid-cols-[3px_1fr] overflow-hidden tarjeta">
              <span className="bg-esquina" aria-hidden />
              <div className="px-4 py-3.5">
                <h2 className="rotulo">La respuesta que aprueba</h2>
                <Markdown
                  texto={pregunta.respuestaModelo}
                  className="mt-2 text-[0.9375rem] text-tinta-2"
                />
                {repregunta ? (
                  <div className="mt-4 border-t border-linea pt-3">
                    <h2 className="rotulo text-esquina">Te repreguntarían</h2>
                    <p
                      className="prosa mt-1.5 text-[0.9375rem] text-tinta"
                      dangerouslySetInnerHTML={{ __html: enLinea(repregunta) }}
                    />
                    <p className="mt-1 text-[0.8125rem] text-tinta-3">
                      Es lo que te preguntaría un entrevistador senior a continuación. Piénsala
                      antes de puntuarte.
                    </p>
                  </div>
                ) : null}
              </div>
            </section>
          ) : null}

          {!evaluando ? (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {puedeCorregir ? (
                <Boton
                  variante="esquina"
                  data-prueba="corregir"
                  onClick={() => void corregir()}
                  disabled={fase === 'corrigiendo'}
                  atajo={esKata ? undefined : 'Ctrl+↵'}
                >
                  {fase === 'corrigiendo' ? 'Corrigiendo…' : 'Corregir con IA'}
                </Boton>
              ) : (
                <Boton
                  variante="esquina"
                  data-prueba="autoevaluar"
                  onClick={autoevaluar}
                  atajo={esKata ? undefined : 'Ctrl+↵'}
                >
                  Ver la respuesta que aprueba
                </Boton>
              )}
              <Boton variante="normal" data-prueba="copiar" onClick={() => void copiarPrompt()}>
                {copiado ? 'Copiado' : 'Copiar para corregir fuera'}
              </Boton>
              {puedeCorregir ? (
                <Boton variante="sutil" onClick={autoevaluar}>
                  Sin IA
                </Boton>
              ) : null}
            </div>
          ) : null}
        </div>

        <aside className="space-y-4">
          <section className={`tarjeta px-4 py-3.5 ${autoevaluacion ? 'border-esquina/40' : ''}`}>
            <h2 className="rotulo">
              {autoevaluacion
                ? 'Marca lo que has cubierto'
                : `Qué te van a exigir de ${sesion.nivel}`}
            </h2>
            {autoevaluacion ? (
              <p className="mt-0.5 text-[0.8125rem] text-tinta-3">
                Compara con la respuesta que aprueba y sé honesto: de esto sale la nota de repaso.
              </p>
            ) : null}
            <ol className="mt-2.5 space-y-2">
              {rubrica.map((c, i) =>
                autoevaluacion ? (
                  <li key={i}>
                    <label className="grid cursor-pointer grid-cols-[1.25rem_1fr] items-start gap-2 text-[0.875rem] leading-snug text-tinta-2 has-[:checked]:text-tinta">
                      <input
                        type="checkbox"
                        className="mt-0.5 h-4 w-4 accent-[var(--esquina)]"
                        checked={cubiertos.includes(i)}
                        onChange={() => marcar(i)}
                      />
                      <span className="prosa" dangerouslySetInnerHTML={{ __html: enLinea(c) }} />
                    </label>
                  </li>
                ) : (
                  <li
                    key={i}
                    className="grid grid-cols-[1.25rem_1fr] gap-1 text-[0.875rem] leading-snug text-tinta-2"
                  >
                    <span className="tabular font-mono text-[0.75rem] text-tinta-3">{i + 1}.</span>
                    <span className="prosa" dangerouslySetInnerHTML={{ __html: enLinea(c) }} />
                  </li>
                ),
              )}
            </ol>
            {autoevaluacion ? (
              <p className="tabular mt-2.5 border-t border-linea pt-2 font-mono text-[0.75rem] text-tinta-3">
                {cubiertos.length} de {rubrica.length} criterios
              </p>
            ) : null}
          </section>

          {evaluando ? (
            <>
              {correccion ? <Scorecard c={correccion.c} modelo={correccion.modelo} /> : null}

              <section className="rounded-r border border-esquina/40 bg-papel px-4 py-3.5">
                <h2 className="text-[0.875rem] font-semibold text-tinta">
                  ¿Cómo ha ido? Decides cuándo vuelve
                </h2>
                <p className="mt-0.5 text-[0.8125rem] text-tinta-3">
                  {correccion
                    ? `La IA propone "${NOTAS.find((n) => n.nota === nota)?.texto.toLowerCase()}". Cámbialo si no estás de acuerdo.`
                    : cubiertos.length
                      ? `Con ${cubiertos.length} de ${rubrica.length} criterios, propongo "${NOTAS.find((n) => n.nota === nota)?.texto.toLowerCase()}". Cámbialo si no estás de acuerdo.`
                      : 'Marca arriba los criterios que has cubierto, o elige directamente.'}
                </p>
                <div className="mt-2.5 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
                  {NOTAS.map((n) => (
                    <button
                      key={n.nota}
                      type="button"
                      onClick={() => setNota(n.nota)}
                      aria-pressed={nota === n.nota}
                      className={`flex min-h-11 items-center justify-center gap-1.5 rounded-r border text-[0.875rem] transition-[transform,background-color,border-color,color] duration-[140ms] ease-salida active:scale-[0.97] ${
                        nota === n.nota
                          ? 'border-esquina bg-esquina text-esquina-tinta'
                          : 'border-linea-fuerte text-tinta-2 hover:border-tinta-3 hover:text-tinta'
                      }`}
                    >
                      <span className="font-mono text-[0.6875rem] opacity-70">{n.atajo}</span>
                      {n.texto}
                    </button>
                  ))}
                </div>
                <Boton
                  variante="esquina"
                  data-prueba="siguiente"
                  className="mt-3 w-full"
                  onClick={() => void guardar()}
                  disabled={!nota || fase === 'guardando'}
                >
                  {fase === 'guardando'
                    ? 'Guardando…'
                    : indice + 1 >= pendientes.length
                      ? 'Terminar sesión'
                      : 'Siguiente asalto'}
                  <Atajo>↵</Atajo>
                </Boton>
              </section>
            </>
          ) : null}

          <details className="group tarjeta px-4 py-2.5">
            <summary className="cursor-pointer list-none text-[0.75rem] text-tinta-3 marker:content-none">
              De dónde sale esta pregunta
            </summary>
            <ul className="mt-2 space-y-1 text-[0.75rem] text-tinta-3">
              <li>
                Origen: {pregunta.origen.replace('-', ' ')}. Versión {pregunta.version}.
              </li>
              {pregunta.fuentes.map((f) => (
                <li key={f.url}>
                  <a
                    href={f.url}
                    target="_blank"
                    rel="noreferrer"
                    className="underline decoration-linea-fuerte underline-offset-2 hover:text-tinta"
                  >
                    {new URL(f.url).hostname}
                  </a>{' '}
                  · {f.fecha} · {f.tipo === 'leida' ? 'leída' : 'resumen'}
                </li>
              ))}
            </ul>
          </details>
        </aside>
      </div>
    </div>
  );
}

function formatear(s: number): string {
  const neg = s < 0;
  const a = Math.abs(s);
  return `${neg ? '-' : ''}${String(Math.floor(a / 60)).padStart(2, '0')}:${String(a % 60).padStart(2, '0')}`;
}
