// Cada kata del banco trae su solución en código (kata.solucion), que se enseña
// al pedir la respuesta. Aquí se comprueba que de verdad aprueba: se transpila
// como lo hace el editor y se pasa por el mismo comparador de casos. Una
// solución que no pasa sus propios tests enseñaría algo falso.
import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import { describe, expect, it } from 'vitest';
import { ejecutarCasos, type Caso } from './casos';

type Kata = { funcion: string; casos: Caso[]; solucion?: string; congelarAleatorio?: boolean };
type P = { id: string; kata?: Kata };

const RAIZ = path.join(process.cwd(), 'contenido', 'pistas');
const katas: { id: string; kata: Kata }[] = [];
for (const pista of readdirSync(RAIZ)) {
  const dir = path.join(RAIZ, pista);
  for (const f of readdirSync(dir).filter((x) => x.endsWith('.json'))) {
    const { preguntas } = JSON.parse(readFileSync(path.join(dir, f), 'utf8')) as {
      preguntas: P[];
    };
    for (const p of preguntas) if (p.kata) katas.push({ id: p.id, kata: p.kata });
  }
}

function cargar(codigo: string, funcion: string): (...a: unknown[]) => unknown {
  const js = ts.transpileModule(codigo, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  const modulo = { exports: {} as Record<string, unknown> };
  new Function('module', 'exports', js)(modulo, modulo.exports);
  return modulo.exports[funcion] as (...a: unknown[]) => unknown;
}

describe('soluciones de las katas', () => {
  it('todas las katas traen su solución en código', () => {
    expect(katas.filter((k) => !k.kata.solucion).map((k) => k.id)).toEqual([]);
  });

  for (const { id, kata } of katas) {
    if (!kata.solucion) continue;
    it(`${id}: la solución pasa todos sus casos`, async () => {
      const fn = cargar(kata.solucion!, kata.funcion);
      expect(typeof fn, `${id} no exporta ${kata.funcion}`).toBe('function');
      const r = await ejecutarCasos(fn, kata.casos, () => 0);
      expect(r.filter((c) => !c.ok)).toEqual([]);
    });
  }
});
