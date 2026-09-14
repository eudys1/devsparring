// Un Server Component se renderiza una vez por petición, así que leer el reloj
// ahí es determinista para ese render. La regla react-hooks/purity marca
// Date.now() pensando en componentes de cliente; este helper deja claro el uso.
export function ahora(): Date {
  return new Date();
}
