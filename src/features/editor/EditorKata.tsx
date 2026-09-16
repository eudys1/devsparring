'use client';

// Monaco con TypeScript: el worker del propio editor da diagnósticos y la
// transpilación (getEmitOutput), así que no hace falta esbuild ni sucrase. El
// código transpilado corre en un Web Worker aparte (runner/ejecutar.ts).
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Monaco, OnMount } from '@monaco-editor/react';
import type { Caso, ResultadoEjecucion } from './runner/casos';
import { ejecutarEnWorker } from './runner/ejecutar';

const Editor = dynamic(() => import('@monaco-editor/react'), {
  ssr: false,
  loading: () => (
    <div className="h-[420px] animate-pulse rounded-r bg-papel-2" aria-label="Cargando editor" />
  ),
});

export type Props = {
  codigoInicial: string;
  funcion: string;
  casos: Caso[];
  congelarAleatorio: boolean;
  onCambio: (codigo: string) => void;
  onResultado: (r: ResultadoEjecucion) => void;
  deshabilitado?: boolean;
};

export function EditorKata({
  codigoInicial,
  funcion,
  casos,
  congelarAleatorio,
  onCambio,
  onResultado,
  deshabilitado,
}: Props) {
  const monacoRef = useRef<Monaco | null>(null);
  const editorRef = useRef<Parameters<OnMount>[0] | null>(null);
  const [ejecutando, setEjecutando] = useState(false);
  const [oscuro, setOscuro] = useState(false);

  useEffect(() => {
    const raiz = document.documentElement;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const calcular = () =>
      setOscuro(raiz.dataset.theme === 'dark' || (raiz.dataset.theme !== 'light' && mq.matches));
    calcular();
    mq.addEventListener('change', calcular);
    return () => mq.removeEventListener('change', calcular);
  }, []);

  const onMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;
    const ts = monaco.languages.typescript;
    ts.typescriptDefaults.setCompilerOptions({
      target: ts.ScriptTarget.ES2020,
      module: ts.ModuleKind.ESNext,
      strict: true,
      noEmit: false,
      lib: ['es2020'],
      allowNonTsExtensions: true,
    });
    ts.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false,
    });
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => void ejecutar());
  };

  const ejecutar = useCallback(async () => {
    const monaco = monacoRef.current;
    const editor = editorRef.current;
    const modelo = editor?.getModel();
    if (!monaco || !editor || !modelo || ejecutando) return;
    setEjecutando(true);
    try {
      const obtener = await monaco.languages.typescript.getTypeScriptWorker();
      const cliente = await obtener(modelo.uri);
      const uri = modelo.uri.toString();
      const [sintaxis, semantica] = await Promise.all([
        cliente.getSyntacticDiagnostics(uri),
        cliente.getSemanticDiagnostics(uri),
      ]);
      const errores = [...sintaxis, ...semantica].map((d) =>
        typeof d.messageText === 'string' ? d.messageText : d.messageText.messageText,
      );
      const salida = await cliente.getEmitOutput(uri);
      const js = (salida.outputFiles as { name: string; text: string }[]).find((f) =>
        f.name.endsWith('.js'),
      )?.text;
      if (!js) {
        onResultado({
          ok: false,
          casos: [],
          consola: [],
          error: 'No se pudo transpilar el código.',
        });
        return;
      }
      // Los errores de tipos no bloquean la ejecución (como en una entrevista
      // real con ts-node), pero se muestran: un senior los ve.
      const r = await ejecutarEnWorker({ codigoJs: js, funcion, casos, congelarAleatorio });
      if (errores.length)
        r.consola = [
          `[typescript] ${errores.length} aviso(s) de tipos:`,
          ...errores.map((e) => `  ${e}`),
          ...r.consola,
        ];
      onResultado(r);
    } finally {
      setEjecutando(false);
    }
  }, [casos, congelarAleatorio, ejecutando, funcion, onResultado]);

  return (
    <div className="overflow-hidden rounded-r border border-linea-fuerte shadow-[inset_0_2px_12px_rgb(0_0_0/0.35)]">
      <div className="flex items-center justify-between border-b border-linea bg-papel px-3 py-1.5 font-mono text-[0.75rem] text-tinta-3">
        <span>solucion.ts · TypeScript</span>
        <button
          type="button"
          onClick={() => void ejecutar()}
          disabled={ejecutando || deshabilitado}
          className="inline-flex min-h-8 items-center gap-1.5 rounded-[3px] border border-esquina/50 px-2.5 text-esquina transition-[transform,background-color] duration-[140ms] ease-salida hover:bg-esquina-suave active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50"
        >
          {ejecutando ? 'Ejecutando…' : 'Ejecutar tests'} <kbd className="opacity-70">Ctrl+↵</kbd>
        </button>
      </div>
      <Editor
        height="420px"
        defaultLanguage="typescript"
        path="solucion.ts"
        defaultValue={codigoInicial}
        theme={oscuro ? 'vs-dark' : 'vs'}
        onMount={onMount}
        onChange={(v) => onCambio(v ?? '')}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: 'var(--fuente-mono), ui-monospace, monospace',
          lineNumbersMinChars: 3,
          scrollBeyondLastLine: false,
          tabSize: 2,
          readOnly: deshabilitado,
          automaticLayout: true,
        }}
      />
    </div>
  );
}

export function ResultadoTests({ r }: { r: ResultadoEjecucion }) {
  const pasados = r.casos.filter((c) => c.ok).length;
  return (
    <section
      className="grid grid-cols-[3px_1fr] overflow-hidden tarjeta"
      aria-label="Resultado de los tests"
      aria-live="polite"
    >
      <span className={r.ok ? 'bg-ok' : 'bg-mal'} aria-hidden />
      <div className="p-3.5 font-mono text-[0.8125rem]">
        <p className={`font-medium ${r.ok ? 'text-ok' : 'text-mal'}`}>
          {r.error ? `Error: ${r.error}` : `${pasados}/${r.casos.length} tests pasan`}
        </p>
        <ul className="mt-2 space-y-1">
          {r.casos.map((c) => (
            <li key={c.nombre} className="grid grid-cols-[14px_1fr] gap-2">
              <span className={c.ok ? 'text-ok' : 'text-mal'} aria-hidden>
                {c.ok ? '✓' : '✗'}
              </span>
              <span>
                <span className={c.ok ? 'text-tinta-2' : 'text-tinta'}>{c.nombre}</span>
                {!c.ok ? (
                  <span className="block text-tinta-3">
                    esperado {c.esperado} · recibido {c.recibido}
                  </span>
                ) : null}
              </span>
            </li>
          ))}
        </ul>
        {r.consola.length ? (
          <pre className="scroll-fino mt-2 max-h-40 overflow-auto rounded-[3px] bg-codigo-fondo p-2 text-codigo-tinta">
            {r.consola.join('\n')}
          </pre>
        ) : null}
      </div>
    </section>
  );
}

export function textoResultado(r: ResultadoEjecucion): string {
  const cabecera = r.error
    ? `Error de ejecución: ${r.error}`
    : `${r.casos.filter((c) => c.ok).length}/${r.casos.length} tests pasan.`;
  const detalle = r.casos.map(
    (c) =>
      `${c.ok ? 'OK ' : 'FALLA'} ${c.nombre}${c.ok ? '' : ` (esperado ${c.esperado}, recibido ${c.recibido})`}`,
  );
  return [
    cabecera,
    ...detalle,
    ...(r.consola.length ? ['Consola:', ...r.consola.slice(0, 30)] : []),
  ].join('\n');
}
