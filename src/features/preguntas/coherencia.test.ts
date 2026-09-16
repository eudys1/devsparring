// Test de coherencia del banco completo de contenido/pistas/**/*.json. No usa
// cargarBanco (server-only): lee disco directamente con node:fs, igual que
// scripts/validar-contenido.mjs. Cada aserción falla nombrando la pregunta
// concreta que incumple la regla, para que el error sea accionable sin bucear
// en el JSON. También escribe contenido/COBERTURA.md con la tabla modo × nivel
// y modo × pista, para ver de un vistazo qué combinaciones están vacías.
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { MODOS, NIVELES, PISTAS } from './esquema';

const RAIZ = path.join(process.cwd(), 'contenido', 'pistas');
const RUTA_COBERTURA = path.join(process.cwd(), 'contenido', 'COBERTURA.md');

const PREFIJOS: Record<string, string> = {
  fundamentos: 'fund-',
  javascript: 'js-',
  typescript: 'ts-',
  react: 'react-',
  nextjs: 'next-',
  web: 'web-',
  node: 'node-',
  datos: 'datos-',
  arquitectura: 'arq-',
  devops: 'devops-',
  ia: 'ia-',
  comportamental: 'comp-',
};

// Tipos mínimos para no depender del esquema zod (esto es justo lo que
// comprobamos: el banco en bruto, tal como lo lee la app antes de validar).
type FuenteRaw = { url?: string; fecha?: string; tipo?: string };
type CasoRaw = { nombre?: string; entrada?: unknown[]; esperado?: unknown; lanza?: string };
type KataRaw = {
  funcion?: string;
  codigoInicial?: string;
  casos?: CasoRaw[];
  tiempoMin?: number;
};
type PreguntaRaw = {
  id: string;
  pista: string;
  familia: string;
  tipo: string;
  modos: string[];
  nivelMinimo: string;
  texto: { es: string; en: string };
  contexto?: string;
  rubrica: { junior: string[]; senior: string[] };
  respuestaModelo: string;
  kata?: KataRaw;
  fuentes: FuenteRaw[];
  estado: string;
  __ruta: string;
};

function cargarTodo(): PreguntaRaw[] {
  const preguntas: PreguntaRaw[] = [];
  for (const pista of readdirSync(RAIZ, { withFileTypes: true })) {
    if (!pista.isDirectory()) continue;
    const dir = path.join(RAIZ, pista.name);
    for (const fichero of readdirSync(dir)) {
      if (!fichero.endsWith('.json')) continue;
      const ruta = path.join(dir, fichero);
      const rel = path.relative(RAIZ, ruta);
      const json = JSON.parse(readFileSync(ruta, 'utf8'));
      for (const p of json.preguntas) preguntas.push({ ...p, __ruta: rel });
    }
  }
  return preguntas;
}

const banco = cargarTodo();

// --- 1. ids únicos y con el prefijo correcto de su pista ---------------------
describe('1. ids', () => {
  it('son únicos en todo el banco', () => {
    const vistos = new Map<string, string>();
    const dups: string[] = [];
    for (const p of banco) {
      if (vistos.has(p.id)) {
        dups.push(`${p.id} (${p.__ruta} y ${vistos.get(p.id)})`);
      } else {
        vistos.set(p.id, p.__ruta);
      }
    }
    expect(dups, `ids duplicados:\n${dups.join('\n')}`).toEqual([]);
  });

  it('llevan el prefijo de su pista', () => {
    const malos = banco
      .filter((p) => !p.id.startsWith(PREFIJOS[p.pista] ?? ''))
      .map((p) => `${p.id}: pista ${p.pista} esperaba prefijo "${PREFIJOS[p.pista]}"`);
    expect(malos, `ids con prefijo incorrecto:\n${malos.join('\n')}`).toEqual([]);
  });
});

// --- 2. texto.es !== texto.en -------------------------------------------------
describe('2. texto.es y texto.en distintos', () => {
  it('ninguna pregunta repite el mismo texto en los dos idiomas', () => {
    const malos = banco
      .filter((p) => p.texto.es === p.texto.en)
      .map((p) => `${p.id}: "${p.texto.es}"`);
    expect(malos, `texto.es === texto.en en:\n${malos.join('\n')}`).toEqual([]);
  });
});

// --- 3. sin guion largo ni comillas tipográficas raras ------------------------
describe('3. tipografía', () => {
  const RARO = /[—“”‘’«»]/;

  it('no usa guion largo ni comillas tipográficas en texto, rúbrica, respuestaModelo ni contexto', () => {
    const malos: string[] = [];
    for (const p of banco) {
      const campos: Record<string, string | undefined> = {
        'texto.es': p.texto.es,
        'texto.en': p.texto.en,
        respuestaModelo: p.respuestaModelo,
        contexto: p.contexto,
      };
      for (const [campo, valor] of Object.entries(campos)) {
        if (typeof valor === 'string' && RARO.test(valor)) {
          malos.push(`${p.id}: ${campo} contiene "${valor.match(RARO)?.[0]}"`);
        }
      }
      for (const [nivel, lista] of [
        ['junior', p.rubrica.junior],
        ['senior', p.rubrica.senior],
      ] as const) {
        for (const criterio of lista) {
          if (RARO.test(criterio)) {
            malos.push(
              `${p.id}: rubrica.${nivel} contiene "${criterio.match(RARO)?.[0]}" en "${criterio}"`,
            );
          }
        }
      }
    }
    expect(malos, `tipografía inválida:\n${malos.join('\n')}`).toEqual([]);
  });
});

// --- 4. rúbrica ---------------------------------------------------------------
describe('4. rúbrica', () => {
  it('senior tiene al menos tantos criterios como junior', () => {
    const malos = banco
      .filter((p) => p.rubrica.senior.length < p.rubrica.junior.length)
      .map(
        (p) => `${p.id}: senior(${p.rubrica.senior.length}) < junior(${p.rubrica.junior.length})`,
      );
    expect(malos, `rúbrica senior más corta que junior:\n${malos.join('\n')}`).toEqual([]);
  });

  it('"Lo anterior" solo aparece como primer elemento de senior, una sola vez, y nunca en junior', () => {
    const malos: string[] = [];
    for (const p of banco) {
      const esLoAnterior = (c: string) => /^lo anterior\b/i.test(c.trim());
      if (p.rubrica.junior.some(esLoAnterior)) {
        malos.push(`${p.id}: "Lo anterior" aparece en rubrica.junior`);
      }
      const idxSenior = p.rubrica.senior
        .map((c, i) => (esLoAnterior(c) ? i : -1))
        .filter((i) => i >= 0);
      if (idxSenior.length > 1) {
        malos.push(`${p.id}: "Lo anterior" aparece ${idxSenior.length} veces en rubrica.senior`);
      } else if (idxSenior.length === 1 && idxSenior[0] !== 0) {
        malos.push(
          `${p.id}: "Lo anterior" no es el primer elemento de rubrica.senior (índice ${idxSenior[0]})`,
        );
      }
    }
    expect(malos, `"Lo anterior" mal colocado:\n${malos.join('\n')}`).toEqual([]);
  });

  it('no hay criterios duplicados dentro de la misma lista', () => {
    const malos: string[] = [];
    for (const p of banco) {
      for (const [nivel, lista] of [
        ['junior', p.rubrica.junior],
        ['senior', p.rubrica.senior],
      ] as const) {
        const vistos = new Set<string>();
        for (const c of lista) {
          if (vistos.has(c)) malos.push(`${p.id}: criterio duplicado en ${nivel}: "${c}"`);
          vistos.add(c);
        }
      }
    }
    expect(malos, `criterios duplicados:\n${malos.join('\n')}`).toEqual([]);
  });
});

// --- 5. contexto/kata según tipo ----------------------------------------------
// "review" necesita un fragmento de código real que revisar: contexto con
// bloque de código. "kata" necesita el bloque kata (ya lo exige el esquema
// zod, se repite aquí como red de seguridad sobre el JSON en bruto).
//
// No exigimos la implicación inversa "bloque de código en contexto => tipo
// review": hay preguntas de tipo "razonamiento" (p.ej. datos-orm-03,
// datos-sql-04) que necesitan mostrar un esquema Prisma o unas tablas SQL como
// contexto sin ser un ejercicio de "encuentra el bug" — la regla estricta en
// ambos sentidos penalizaría contenido correcto, así que aquí se relaja
// deliberadamente esa dirección.
describe('5. contexto y bloque kata según tipo', () => {
  it('review tiene contexto con un bloque de código', () => {
    const malos = banco
      .filter((p) => p.tipo === 'review' && !(p.contexto ?? '').includes('```'))
      .map((p) => p.id);
    expect(malos, `tipo review sin bloque de código en contexto:\n${malos.join('\n')}`).toEqual([]);
  });

  it('kata tiene bloque kata, y solo kata lo tiene', () => {
    const sinBloque = banco.filter((p) => p.tipo === 'kata' && !p.kata).map((p) => p.id);
    const conBloqueDeMas = banco
      .filter((p) => p.tipo !== 'kata' && p.kata)
      .map((p) => `${p.id} (tipo ${p.tipo})`);
    expect(sinBloque, `tipo kata sin bloque kata:\n${sinBloque.join('\n')}`).toEqual([]);
    expect(conBloqueDeMas, `bloque kata fuera de tipo kata:\n${conBloqueDeMas.join('\n')}`).toEqual(
      [],
    );
  });
});

// --- 6. katas ------------------------------------------------------------------
describe('6. katas', () => {
  const katas = banco.filter((p): p is PreguntaRaw & { kata: KataRaw } => Boolean(p.kata));

  it('kata.funcion aparece exportada en kata.codigoInicial', () => {
    const malos: string[] = [];
    for (const p of katas) {
      const nombre = p.kata.funcion ?? '';
      const re = new RegExp(`export\\s+(function|const)\\s+${nombre}\\b`);
      if (!re.test(p.kata.codigoInicial ?? '')) {
        malos.push(
          `${p.id}: "${nombre}" no aparece como "export function ${nombre}" ni "export const ${nombre}" en codigoInicial`,
        );
      }
    }
    expect(malos, `función no exportada:\n${malos.join('\n')}`).toEqual([]);
  });

  it('todos los casos de una kata tienen la misma cantidad de argumentos en entrada', () => {
    const malos: string[] = [];
    for (const p of katas) {
      const cuentas = new Set((p.kata.casos ?? []).map((c) => (c.entrada ?? []).length));
      if (cuentas.size > 1) {
        malos.push(
          `${p.id}: cantidades de argumentos distintas entre casos: ${[...cuentas].join(', ')}`,
        );
      }
    }
    expect(malos, `número de argumentos inconsistente:\n${malos.join('\n')}`).toEqual([]);
  });

  it('entrada y esperado son serializables en JSON y no contienen undefined', () => {
    const malos: string[] = [];
    for (const p of katas) {
      for (const c of p.kata.casos ?? []) {
        const tieneUndefined = (valor: unknown): boolean => {
          if (valor === undefined) return true;
          if (Array.isArray(valor)) return valor.some(tieneUndefined);
          if (valor !== null && typeof valor === 'object') {
            return Object.values(valor).some(tieneUndefined);
          }
          return false;
        };
        let serializable = true;
        try {
          const ida = JSON.stringify(c.entrada);
          const vuelta = JSON.parse(ida ?? 'null');
          if (JSON.stringify(vuelta) !== ida) serializable = false;
        } catch {
          serializable = false;
        }
        if (tieneUndefined(c.entrada) || tieneUndefined(c.esperado)) {
          malos.push(`${p.id}: caso "${c.nombre}" contiene undefined`);
        } else if (!serializable) {
          malos.push(`${p.id}: caso "${c.nombre}" no es serializable en JSON`);
        }
      }
    }
    expect(malos, `casos no serializables o con undefined:\n${malos.join('\n')}`).toEqual([]);
  });

  it('al menos 3 casos por kata', () => {
    const malos = katas
      .filter((p) => (p.kata.casos ?? []).length < 3)
      .map((p) => `${p.id}: ${p.kata.casos?.length ?? 0} casos`);
    expect(malos, `menos de 3 casos:\n${malos.join('\n')}`).toEqual([]);
  });

  it('tiempoMin entre 5 y 60', () => {
    const malos = katas
      .filter(
        (p) =>
          !(
            typeof p.kata.tiempoMin === 'number' &&
            p.kata.tiempoMin >= 5 &&
            p.kata.tiempoMin <= 60
          ),
      )
      .map((p) => `${p.id}: tiempoMin ${p.kata.tiempoMin}`);
    expect(malos, `tiempoMin fuera de rango:\n${malos.join('\n')}`).toEqual([]);
  });
});

// --- 7. fuentes ------------------------------------------------------------------
describe('7. fuentes', () => {
  const hoy = new Date().toISOString().slice(0, 10);

  it('al menos una fuente, con url válida', () => {
    const malos: string[] = [];
    for (const p of banco) {
      if (!p.fuentes || p.fuentes.length === 0) {
        malos.push(`${p.id}: sin fuentes`);
        continue;
      }
      for (const f of p.fuentes) {
        try {
          new URL(f.url ?? '');
        } catch {
          malos.push(`${p.id}: url inválida "${f.url}"`);
        }
      }
    }
    expect(malos, `fuentes inválidas:\n${malos.join('\n')}`).toEqual([]);
  });

  it('fecha en formato AAAA-MM-DD y no posterior a hoy', () => {
    const malos: string[] = [];
    for (const p of banco) {
      for (const f of p.fuentes ?? []) {
        if (!/^\d{4}-\d{2}-\d{2}$/.test(f.fecha ?? '')) {
          malos.push(`${p.id}: fecha con formato inválido "${f.fecha}"`);
        } else if ((f.fecha as string) > hoy) {
          malos.push(`${p.id}: fecha futura "${f.fecha}" (hoy es ${hoy})`);
        }
      }
    }
    expect(malos, `fechas inválidas:\n${malos.join('\n')}`).toEqual([]);
  });
});

// --- 8. respuestaModelo ----------------------------------------------------------
describe('8. respuestaModelo', () => {
  it('tiene al menos 80 caracteres', () => {
    const malos = banco
      .filter((p) => (p.respuestaModelo ?? '').length < 80)
      .map((p) => `${p.id}: ${p.respuestaModelo?.length ?? 0} caracteres`);
    expect(malos, `respuestaModelo demasiado corta:\n${malos.join('\n')}`).toEqual([]);
  });
});

// --- 9. casi duplicados -----------------------------------------------------------
function normaliza(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

describe('9. textos casi duplicados', () => {
  it('no hay dos preguntas distintas con el mismo texto.es normalizado', () => {
    const vistos = new Map<string, string>();
    const malos: string[] = [];
    for (const p of banco) {
      const n = normaliza(p.texto.es);
      if (vistos.has(n) && vistos.get(n) !== p.id) {
        malos.push(`${p.id} es casi duplicado de ${vistos.get(n)}: "${p.texto.es}"`);
      } else {
        vistos.set(n, p.id);
      }
    }
    expect(malos, `casi duplicados en texto.es:\n${malos.join('\n')}`).toEqual([]);
  });

  it('no hay dos preguntas distintas con el mismo texto.en normalizado', () => {
    const vistos = new Map<string, string>();
    const malos: string[] = [];
    for (const p of banco) {
      const n = normaliza(p.texto.en);
      if (vistos.has(n) && vistos.get(n) !== p.id) {
        malos.push(`${p.id} es casi duplicado de ${vistos.get(n)}: "${p.texto.en}"`);
      } else {
        vistos.set(n, p.id);
      }
    }
    expect(malos, `casi duplicados en texto.en:\n${malos.join('\n')}`).toEqual([]);
  });
});

// --- 10. cobertura modo × nivel (× pista para el informe) -------------------------
const ORDEN_NIVEL: Record<string, number> = { junior: 0, mid: 1, senior: 2 };

function paraNivel(lista: PreguntaRaw[], nivel: string): PreguntaRaw[] {
  return lista.filter((p) => (ORDEN_NIVEL[p.nivelMinimo] ?? 0) <= (ORDEN_NIVEL[nivel] ?? 0));
}

function cuenta(lista: PreguntaRaw[], modo: string, nivel: string): number {
  return paraNivel(lista, nivel).filter((p) => p.modos.includes(modo)).length;
}

function escribirCobertura(publicadas: PreguntaRaw[]): void {
  const filas: string[] = [];
  filas.push('# Cobertura del banco de preguntas');
  filas.push('');
  filas.push(
    `Generado automáticamente por \`src/features/preguntas/coherencia.test.ts\` en cada ejecución de \`pnpm test\`. No editar a mano.`,
  );
  filas.push('');
  filas.push(`Total de preguntas publicadas: ${publicadas.length}.`);
  filas.push('');

  filas.push('## Modo × nivel');
  filas.push('');
  filas.push(`| Modo | ${NIVELES.join(' | ')} |`);
  filas.push(`| --- | ${NIVELES.map(() => '---').join(' | ')} |`);
  for (const modo of MODOS) {
    const fila = NIVELES.map((nivel) => {
      const n = cuenta(publicadas, modo, nivel);
      return n < 4 ? `**${n}**` : String(n);
    });
    filas.push(`| ${modo} | ${fila.join(' | ')} |`);
  }
  filas.push('');
  filas.push(
    'Los valores en negrita están por debajo del mínimo de 4 preguntas que exige la interfaz.',
  );
  filas.push('');

  filas.push('## Modo × pista (nivel senior, el más amplio)');
  filas.push('');
  filas.push(`| Pista | ${MODOS.join(' | ')} |`);
  filas.push(`| --- | ${MODOS.map(() => '---').join(' | ')} |`);
  for (const pista of PISTAS) {
    const dePista = paraNivel(
      publicadas.filter((p) => p.pista === pista),
      'senior',
    );
    const fila = MODOS.map((modo) => dePista.filter((p) => p.modos.includes(modo)).length);
    filas.push(`| ${pista} | ${fila.join(' | ')} |`);
  }
  filas.push('');

  writeFileSync(RUTA_COBERTURA, `${filas.join('\n')}\n`, 'utf8');
}

describe('10. cobertura modo × nivel', () => {
  const publicadas = banco.filter((p) => p.estado === 'publicada');

  // Se escribe siempre, pase o falle el resto: es un informe, no una aserción.
  escribirCobertura(publicadas);

  for (const modo of MODOS) {
    for (const nivel of NIVELES) {
      it(`${modo} × ${nivel} tiene al menos 4 preguntas`, () => {
        const n = cuenta(publicadas, modo, nivel);
        expect(
          n,
          `${modo} × ${nivel}: solo ${n} preguntas publicadas (mínimo 4)`,
        ).toBeGreaterThanOrEqual(4);
      });
    }
  }
});
