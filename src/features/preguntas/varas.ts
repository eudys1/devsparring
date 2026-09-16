// La ficha técnica de las dos varas, calculada del banco real: cuánto más se
// le exige a un senior en la misma pregunta. Son datos, no eslóganes, y salen
// del contenido, así que la landing no puede quedarse vieja.
import type { Pregunta } from './esquema';
import { rubricaParaNivel } from './rubrica';

export type Varas = {
  preguntas: number;
  criteriosJunior: number;
  criteriosSenior: number;
  complejidad: number;
  pruebas: number;
  escala: number;
};

const CUENTA = [
  { clave: 'complejidad', re: /complejidad|coste|o\(|big o|rendimiento/i },
  { clave: 'pruebas', re: /\bprueb|\btest|casos borde|edge case/i },
  { clave: 'escala', re: /escal|volumen|millon|crece|carga/i },
] as const;

export function varas(preguntas: Pregunta[]): Varas {
  const publicadas = preguntas.filter((p) => p.estado === 'publicada');
  let junior = 0;
  let senior = 0;
  const extra: Record<string, number> = { complejidad: 0, pruebas: 0, escala: 0 };

  for (const p of publicadas) {
    const j = rubricaParaNivel(p, 'junior');
    const s = rubricaParaNivel(p, 'senior');
    junior += j.length;
    senior += s.length;
    const anadidos = s.slice(j.length).join(' ');
    for (const { clave, re } of CUENTA) if (re.test(anadidos)) extra[clave]! += 1;
  }

  const n = Math.max(1, publicadas.length);
  const pct = (x: number) => Math.round((x / n) * 100);
  return {
    preguntas: publicadas.length,
    criteriosJunior: Math.round((junior / n) * 10) / 10,
    criteriosSenior: Math.round((senior / n) * 10) / 10,
    complejidad: pct(extra.complejidad!),
    pruebas: pct(extra.pruebas!),
    escala: pct(extra.escala!),
  };
}
