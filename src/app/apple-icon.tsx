import { ImageResponse } from 'next/og';

// El icono al guardar la web en la pantalla de inicio del móvil: la "D" de la
// marca con su punto, sobre el cielo. Colores de globals.css (tema claro).
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function Icono() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#d7eaff',
        color: '#0f2140',
        fontFamily: 'sans-serif',
        fontSize: 120,
        fontWeight: 800,
        letterSpacing: -4,
      }}
    >
      D
      <div
        style={{
          width: 26,
          height: 26,
          borderRadius: 13,
          background: '#1d5bd0',
          marginLeft: 4,
          marginTop: 62,
        }}
      />
    </div>,
    size,
  );
}
