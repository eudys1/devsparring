// Elige, del banco real, las preguntas que mejor demuestran la tesis del
// producto: la misma pregunta con dos varas. Determinista, para que la landing
// no cambie en cada recarga y las capturas sean comparables.
import type { Pregunta } from './esquema';
import { rubricaParaNivel } from './rubrica';

export type Tesis = {
  id: string;
  pista: Pregunta['pista'];
  texto: string;
  junior: string[];
  senior: string[];
  extras: number;
};

export function elegirTesis(preguntas: Pregunta[], cuantas = 3): Tesis[] {
  const candidatas = preguntas
    .filter((p) => p.estado === 'publicada')
    .filter((p) => !p.contexto && p.texto.es.length < 130)
    .filter((p) => p.tipo === 'definicion' || p.tipo === 'fundamento' || p.tipo === 'razonamiento')
    .map((p) => {
      const junior = rubricaParaNivel(p, 'junior');
      const senior = rubricaParaNivel(p, 'senior');
      return { p, junior, senior, extras: senior.length - junior.length };
    })
    // Dos o tres criterios de más: suficiente para que se vea el salto, no tanto
    // como para que la lista no quepa en el héroe.
    .filter((x) => x.extras >= 2 && x.extras <= 3 && x.senior.length <= 6)
    .filter((x) => x.junior.every((c) => c.length < 110) && x.senior.every((c) => c.length < 110));

  const orden: Pregunta['pista'][] = [
    'javascript',
    'datos',
    'react',
    'fundamentos',
    'arquitectura',
  ];
  const elegidas: typeof candidatas = [];
  for (const pista of orden) {
    const c = candidatas
      .filter((x) => x.p.pista === pista && !elegidas.includes(x))
      .sort((a, b) => a.p.id.localeCompare(b.p.id))[0];
    if (c) elegidas.push(c);
    if (elegidas.length >= cuantas) break;
  }
  for (const c of candidatas.sort((a, b) => a.p.id.localeCompare(b.p.id))) {
    if (elegidas.length >= cuantas) break;
    if (!elegidas.includes(c)) elegidas.push(c);
  }

  return elegidas.slice(0, cuantas).map(({ p, junior, senior, extras }) => ({
    id: p.id,
    pista: p.pista,
    texto: p.texto.es,
    junior,
    senior,
    extras,
  }));
}
