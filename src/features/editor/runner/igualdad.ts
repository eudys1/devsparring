// Comparación estructural para el runner de tests. Es la pieza con más bugs
// latentes del proyecto (NaN, -0, Map, Set, orden de claves), por eso vive sola
// y tiene tests exhaustivos. No usa nada del DOM: corre igual en worker y en Node.

export function iguales(a: unknown, b: unknown): boolean {
  if (Object.is(a, b)) return true;
  // Object.is distingue +0 de -0; para un ejercicio de entrevista 0 === -0 basta.
  if (typeof a === 'number' && typeof b === 'number') return a === b;
  if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) return false;

  if (Array.isArray(a) || Array.isArray(b)) {
    if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return false;
    return a.every((x, i) => iguales(x, b[i]));
  }
  if (a instanceof Date || b instanceof Date) {
    return a instanceof Date && b instanceof Date && a.getTime() === b.getTime();
  }
  if (a instanceof Map || b instanceof Map) {
    if (!(a instanceof Map) || !(b instanceof Map) || a.size !== b.size) return false;
    for (const [k, v] of a) {
      if (!b.has(k) || !iguales(v, b.get(k))) return false;
    }
    return true;
  }
  if (a instanceof Set || b instanceof Set) {
    if (!(a instanceof Set) || !(b instanceof Set) || a.size !== b.size) return false;
    // Sin orden: cada elemento de a debe tener un igual estructural en b.
    const restantes = [...b];
    for (const x of a) {
      const i = restantes.findIndex((y) => iguales(x, y));
      if (i === -1) return false;
      restantes.splice(i, 1);
    }
    return true;
  }
  if (Object.getPrototypeOf(a) !== Object.getPrototypeOf(b)) return false;

  const ka = Object.keys(a as object);
  const kb = Object.keys(b as object);
  if (ka.length !== kb.length) return false;
  const ra = a as Record<string, unknown>;
  const rb = b as Record<string, unknown>;
  return ka.every((k) => Object.hasOwn(rb, k) && iguales(ra[k], rb[k]));
}

// Representación legible y estable para mostrar "esperado / recibido".
export function mostrar(v: unknown): string {
  if (typeof v === 'string') return JSON.stringify(v);
  if (typeof v === 'number' || typeof v === 'boolean' || v === null) return String(v);
  if (v === undefined) return 'undefined';
  if (typeof v === 'bigint') return `${v}n`;
  if (typeof v === 'function') return `[función ${v.name || 'anónima'}]`;
  if (typeof v === 'symbol') return v.toString();
  if (v instanceof Date) return `Date(${v.toISOString()})`;
  if (v instanceof Map) return `Map(${mostrar([...v.entries()])})`;
  if (v instanceof Set) return `Set(${mostrar([...v])})`;
  if (v instanceof Error) return `${v.name}: ${v.message}`;
  if (Array.isArray(v)) return `[${v.map(mostrar).join(', ')}]`;
  const claves = Object.keys(v as object).sort();
  return `{${claves.map((k) => `${k}: ${mostrar((v as Record<string, unknown>)[k])}`).join(', ')}}`;
}
