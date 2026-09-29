// La marca: la palabra en negrita cerrada y un punto azul, como el punto de
// tinta de una tarjeta de puntuación. No hay logotipo: el producto es texto y
// datos. Hereda la tinta de la superficie donde se pinta.
export function Marca({ tamano = 'normal' }: { tamano?: 'normal' | 'grande' }) {
  return (
    <span
      className={`display inline-block normal-case tracking-[-0.03em] text-tinta ${tamano === 'grande' ? 'text-[2rem]' : 'text-[1.375rem]'}`}
    >
      Devsparring
      <span className="text-punto">.</span>
    </span>
  );
}
