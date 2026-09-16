// Reglas puras de selección sobre el banco. Sin I/O: reciben la lista y devuelven listas.
import { MODOS, NIVELES, type Modo, type Nivel, type Pista, type Pregunta } from './esquema';

const ORDEN_NIVEL: Record<Nivel, number> = { junior: 0, mid: 1, senior: 2 };

export function publicadas(preguntas: Pregunta[]): Pregunta[] {
  return preguntas.filter((p) => p.estado === 'publicada');
}

// Una pregunta sirve para un nivel si su nivel mínimo no lo supera: a un senior
// se le pueden hacer preguntas de junior (con la rúbrica senior), no al revés.
export function paraNivel(preguntas: Pregunta[], nivel: Nivel): Pregunta[] {
  return preguntas.filter((p) => ORDEN_NIVEL[p.nivelMinimo] <= ORDEN_NIVEL[nivel]);
}

export function paraModo(preguntas: Pregunta[], modo: Modo): Pregunta[] {
  return preguntas.filter((p) => p.modos.includes(modo));
}

export function dePista(preguntas: Pregunta[], pista: Pista): Pregunta[] {
  return preguntas.filter((p) => p.pista === pista);
}

// Baraja determinista con semilla: la misma sesión reproduce el mismo orden y
// los tests no dependen de Math.random.
export function barajar<T>(items: T[], semilla: number): T[] {
  const copia = [...items];
  let estado = semilla >>> 0 || 1;
  const siguiente = () => {
    // xorshift32: suficiente para barajar, sin dependencias.
    estado ^= estado << 13;
    estado ^= estado >>> 17;
    estado ^= estado << 5;
    return (estado >>> 0) / 0x100000000;
  };
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(siguiente() * (i + 1));
    const a = copia[i] as T;
    copia[i] = copia[j] as T;
    copia[j] = a;
  }
  return copia;
}

export type CriteriosSesion = {
  modo: Modo;
  nivel: Nivel;
  pista?: Pista;
  cantidad: number;
  semilla: number;
  // Ids que deben ir primero (por ejemplo, las que el repaso espaciado marca como vencidas).
  prioritarias?: string[];
};

export function seleccionar(preguntas: Pregunta[], c: CriteriosSesion): Pregunta[] {
  let candidatas = paraModo(paraNivel(publicadas(preguntas), c.nivel), c.modo);
  if (c.pista) candidatas = dePista(candidatas, c.pista);
  const prioridad = new Set(c.prioritarias ?? []);
  const primero = candidatas.filter((p) => prioridad.has(p.id));
  const resto = barajar(
    candidatas.filter((p) => !prioridad.has(p.id)),
    c.semilla,
  );
  return [...primero, ...resto].slice(0, c.cantidad);
}

/**
 * Cuántas preguntas hay para cada combinación de modo, nivel y pista. La
 * pantalla de nueva sesión la usa para no ofrecer combinaciones vacías: elegir
 * "kata" y una pista sin katas daba una sesión de cero preguntas.
 */
export type Disponibilidad = Record<
  Modo,
  Record<Nivel, { total: number; pistas: Partial<Record<Pista, number>> }>
>;

export function disponibilidad(preguntas: Pregunta[]): Disponibilidad {
  const publicadasLista = publicadas(preguntas);
  const salida = {} as Disponibilidad;
  for (const modo of MODOS) {
    const delModo = paraModo(publicadasLista, modo);
    salida[modo] = {} as Disponibilidad[Modo];
    for (const nivel of NIVELES) {
      const delNivel = paraNivel(delModo, nivel);
      const pistas: Partial<Record<Pista, number>> = {};
      for (const p of delNivel) pistas[p.pista] = (pistas[p.pista] ?? 0) + 1;
      salida[modo][nivel] = { total: delNivel.length, pistas };
    }
  }
  return salida;
}
