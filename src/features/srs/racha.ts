// La racha con respiro: un día suelto sin práctica no la rompe, como mucho una
// vez cada siete días contados. El día del respiro no suma. Es la válvula de
// escape de Duolingo (medida por ellos con un 4 % más de retorno, ver
// plan-estudio-y-banco.md, fase 2 bis) sin comprar nada ni castigar: a un
// adulto con trabajo se le escapa un día y no tiene por qué empezar de cero.
const RESPIRO_CADA = 7;

export function rachaConRespiro(
  diasOrdenados: string[],
  hoy: Date,
): { dias: number; respiros: number } {
  const dias = new Set(diasOrdenados);
  const clave = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const cursor = new Date(hoy);
  // Hoy todavía se puede practicar: si no hay nada hoy, se empieza por ayer.
  if (!dias.has(clave(cursor))) cursor.setDate(cursor.getDate() - 1);
  let n = 0;
  let respiros = 0;
  let ultimoRespiro = -Infinity;
  for (;;) {
    if (dias.has(clave(cursor))) {
      n += 1;
      cursor.setDate(cursor.getDate() - 1);
      continue;
    }
    // Un hueco de un solo día, con práctica justo antes y sin respiro reciente.
    const anterior = new Date(cursor);
    anterior.setDate(anterior.getDate() - 1);
    if (dias.has(clave(anterior)) && n - ultimoRespiro >= RESPIRO_CADA) {
      respiros += 1;
      ultimoRespiro = n;
      cursor.setDate(cursor.getDate() - 1);
      continue;
    }
    break;
  }
  return { dias: n, respiros };
}
