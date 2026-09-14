// La rúbrica senior se escribe "Lo anterior" + añadidos. Para mostrarla o
// enviarla a la IA se materializa: mid y senior reciben la junior completa
// seguida de los añadidos, sin la muletilla.
import type { Nivel, Pregunta } from './esquema';

export function rubricaParaNivel(p: Pick<Pregunta, 'rubrica'>, nivel: Nivel): string[] {
  if (nivel === 'junior') return p.rubrica.junior;
  const anadidos = p.rubrica.senior.filter((c) => !/^lo anterior\b/i.test(c.trim()));
  return [...p.rubrica.junior, ...anadidos];
}
