// La marca: display condensada y un punto en el acento, como el punto de tinta
// de una tarjeta de puntuación. No hay logotipo: el producto es texto y datos.
// Hereda la tinta y el acento de la superficie donde se pinta (papel, noche o
// bloque), así que no necesita saber dónde está.
export function Marca({ tamano = 'normal' }: { tamano?: 'normal' | 'grande' }) {
  return (
    <span
      className={`display inline-block text-tinta ${tamano === 'grande' ? 'text-[2rem]' : 'text-[1.375rem]'}`}
    >
      Devsparring
      <span className="text-esquina">.</span>
    </span>
  );
}
