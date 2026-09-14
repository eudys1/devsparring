// Etiqueta de dato: nivel, tipo, estado. Codifica algo verdadero del contenido.
const TONOS = {
  neutro: 'border-linea text-tinta-2',
  junior: 'border-junior/40 text-junior',
  senior: 'border-senior/40 text-senior',
  ok: 'border-ok/40 text-ok',
  aviso: 'border-aviso/40 text-aviso',
  mal: 'border-mal/40 text-mal',
  brasa: 'border-brasa/40 text-brasa',
} as const;

export function Etiqueta({
  tono = 'neutro',
  children,
  className = '',
}: {
  tono?: keyof typeof TONOS;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-[3px] border px-1.5 py-0.5 font-mono text-[0.6875rem] uppercase tracking-[0.06em] ${TONOS[tono]} ${className}`}
    >
      {children}
    </span>
  );
}
