'use client';

// El motor de una sesión: una pregunta cada vez, reloj, respuesta, corrección
// (con clave propia o copiando el prompt), nota de repaso y siguiente. Diseñado
// como racha: al guardar salta solo a la siguiente pendiente; atajos de teclado.
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Boton } from '@/components/ui/Boton';
import { AreaTexto } from '@/components/ui/Campo';
import { Etiqueta } from '@/components/ui/Etiqueta';
import { enLinea, Markdown } from '@/components/ui/Markdown';
import { pedirCorreccion } from '@/features/correccion/cliente';
import type { Correccion } from '@/features/correccion/esquema-salida';
import { promptParaCopiar } from '@/features/correccion/prompt';
import { Scorecard } from '@/features/correccion/Scorecard';
import { leerClave, leerModelo } from '@/features/cuenta/clave';
import { EditorKata, ResultadoTests, textoResultado } from '@/features/editor/EditorKata';
import type { ResultadoEjecucion } from '@/features/editor/runner/casos';
import type { Modo, Nivel, Pregunta } from '@/features/preguntas/esquema';
import { NOMBRE_MODO, NOMBRE_NIVEL, NOMBRE_PISTA, NOMBRE_TIPO } from '@/features/preguntas/nombres';
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
  const [segundos, setSegundos] = useState(0);
  const inicio = useRef(0);
  const hechas = yaRespondidas.length + indice;
  const total = preguntas.length;
  const pregunta = pendientes[indice];
  const esKata = sesion.modo === 'kata';

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
      const enCampo =
        (e.target as HTMLElement)?.tagName === 'TEXTAREA' ||
        (e.target as HTMLElement)?.closest('.monaco-editor');
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
      <div className="mx-auto max-w-xl text-center">
        <h1 className="text-2xl font-semibold">Sesión completada</h1>
        <p className="mt-2 text-tinta-2">No quedan preguntas pendientes en esta sesión.</p>
        <Link href="/hoy" className="mt-4 inline-block">
          <Boton variante="brasa">Volver a Hoy</Boton>
        </Link>
      </div>
    );
  }

  const rubrica = rubricaParaNivel(pregunta, sesion.nivel);
  const tiempoLimite = pregunta.kata ? pregunta.kata.tiempoMin * 60 : null;
  const restante = tiempoLimite !== null ? tiempoLimite - segundos : null;

  return (
    <div className="mx-auto max-w-6xl">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-linea pb-3">
        <div className="flex items-center gap-2">
          <Etiqueta tono="brasa">{NOMBRE_MODO[sesion.modo].nombre}</Etiqueta>
          <Etiqueta
            tono={
              sesion.nivel === 'junior' ? 'junior' : sesion.nivel === 'senior' ? 'senior' : 'neutro'
            }
          >
            {NOMBRE_NIVEL[sesion.nivel]}
          </Etiqueta>
          <Etiqueta>{NOMBRE_PISTA[pregunta.pista]}</Etiqueta>
          <span className="ml-2 font-mono text-[0.75rem] text-tinta-3">
            {hechas + 1} de {total}
          </span>
        </div>
        <div
          className={`tabular font-mono text-[0.9375rem] ${restante !== null && restante < 0 ? 'text-mal' : restante !== null && restante < 120 ? 'text-brasa' : 'text-tinta-2'}`}
          aria-live="off"
        >
          {restante !== null ? formatear(restante) : formatear(segundos)}
        </div>
      </header>

      <div
        className={`mt-6 grid gap-6 ${esKata ? 'lg:grid-cols-[1.25fr_0.75fr]' : 'lg:grid-cols-[1.1fr_0.9fr]'}`}
      >
        <div className="aparece">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-tinta-3">
            {NOMBRE_TIPO[pregunta.tipo]}
          </p>
          <h1
            className="prosa mt-1 text-xl font-semibold leading-snug md:text-2xl"
            dangerouslySetInnerHTML={{
              __html: enLinea(sesion.idioma === 'en' ? pregunta.texto.en : pregunta.texto.es),
            }}
          />
          <p
            className="prosa mt-1 text-[0.875rem] text-tinta-3"
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
              <AreaTexto
                id="respuesta"
                aria-label="Tu respuesta"
                placeholder={
                  sesion.modo === 'verbal'
                    ? 'Explícalo en voz alta de verdad y escribe aquí lo esencial de lo que has dicho.'
                    : 'Tu respuesta…'
                }
                value={respuesta}
                onChange={(e) => setRespuesta(e.target.value)}
                disabled={fase !== 'respondiendo'}
                autoFocus
              />
            )}
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

          {fase === 'respondiendo' || fase === 'corrigiendo' ? (
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {puedeCorregir ? (
                <Boton
                  variante="brasa"
                  onClick={() => void corregir()}
                  disabled={fase === 'corrigiendo'}
                  atajo={esKata ? undefined : 'Ctrl+↵'}
                >
                  {fase === 'corrigiendo' ? 'Corrigiendo…' : 'Corregir con IA'}
                </Boton>
              ) : (
                <Boton variante="brasa" onClick={autoevaluar} atajo={esKata ? undefined : 'Ctrl+↵'}>
                  Ver respuesta modelo y autoevaluar
                </Boton>
              )}
              <Boton variante="normal" onClick={() => void copiarPrompt()}>
                {copiado ? 'Copiado' : 'Copiar para corregir fuera'}
              </Boton>
              {puedeCorregir ? (
                <Boton variante="sutil" onClick={autoevaluar}>
                  Sin IA: autoevaluar
                </Boton>
              ) : null}
            </div>
          ) : null}
        </div>

        <aside className="aparece-2 space-y-4">
          <section className="rounded-r border border-linea bg-papel p-4">
            <h2 className="text-[0.8125rem] font-semibold">
              Rúbrica {NOMBRE_NIVEL[sesion.nivel].toLowerCase()}
            </h2>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-[0.9375rem] text-tinta-2">
              {rubrica.map((c, i) => (
                <li key={i} className="prosa" dangerouslySetInnerHTML={{ __html: enLinea(c) }} />
              ))}
            </ol>
          </section>

          {fase === 'evaluando' || fase === 'guardando' ? (
            <>
              {correccion ? <Scorecard c={correccion.c} modelo={correccion.modelo} /> : null}
              <section className="aparece rounded-r border border-linea bg-papel p-4">
                <h2 className="text-[0.8125rem] font-semibold">Respuesta que aprueba</h2>
                <Markdown
                  texto={pregunta.respuestaModelo}
                  className="mt-2 text-[0.9375rem] text-tinta-2"
                />
              </section>
              <section className="aparece rounded-r border border-brasa/40 bg-papel p-4">
                <h2 className="text-[0.8125rem] font-semibold">
                  ¿Cómo te ha ido? Decide cuándo vuelve
                </h2>
                <div className="mt-2 grid grid-cols-4 gap-1.5">
                  {NOTAS.map((n) => (
                    <button
                      key={n.nota}
                      type="button"
                      onClick={() => setNota(n.nota)}
                      className={`rounded-r border px-2 py-2 text-[0.875rem] ${nota === n.nota ? 'border-brasa bg-brasa-suave text-tinta' : 'border-linea text-tinta-2 hover:border-linea-fuerte'}`}
                    >
                      <kbd className="mr-1 font-mono text-[0.6875rem] opacity-60">{n.atajo}</kbd>
                      {n.texto}
                    </button>
                  ))}
                </div>
                <Boton
                  variante="brasa"
                  className="mt-3 w-full justify-center"
                  onClick={() => void guardar()}
                  disabled={!nota || fase === 'guardando'}
                  atajo="↵"
                >
                  {fase === 'guardando'
                    ? 'Guardando…'
                    : indice + 1 >= pendientes.length
                      ? 'Guardar y terminar'
                      : 'Guardar y siguiente'}
                </Boton>
              </section>
            </>
          ) : null}

          <details className="text-[0.75rem] text-tinta-3">
            <summary className="cursor-pointer">Fuentes y origen de esta pregunta</summary>
            <ul className="mt-1 space-y-0.5">
              <li>
                Origen: {pregunta.origen}. Versión {pregunta.version}.
              </li>
              {pregunta.fuentes.map((f) => (
                <li key={f.url}>
                  <a
                    href={f.url}
                    target="_blank"
                    rel="noreferrer"
                    className="underline-offset-2 hover:underline"
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
