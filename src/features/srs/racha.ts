// La racha: días seguidos con práctica, contando hoy o ayer como último día
// (si hoy aún no has practicado, la racha de ayer sigue viva). Pura, con test.
export function racha(diasOrdenados: string[], hoy: Date): number {
  const dias = new Set(diasOrdenados);
  const cursor = new Date(hoy);
  const clave = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  if (!dias.has(clave(cursor))) cursor.setDate(cursor.getDate() - 1);
  let n = 0;
  while (dias.has(clave(cursor))) {
    n += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return n;
}
