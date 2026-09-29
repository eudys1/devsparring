import { ImageResponse } from 'next/og';

// La vista previa al compartir un enlace: el cielo de la marca, el titular y
// una tarjeta de Tipo test como las de la app. Colores de globals.css (tema claro).
export const alt = 'Devsparring: entrena entrevistas técnicas de programación en español';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const CIELO = '#d7eaff';
const TINTA = '#0f2140';
const TINTA_2 = '#3a4c6a';
const PUNTO = '#1d5bd0';
const OK = '#177a4a';

const OPCIONES = [
  ['A', 'El contenido del array'],
  ['B', 'Solo la variable, no el contenido'],
  ['C', 'Cada elemento por separado'],
  ['D', 'Nada, salvo en modo estricto'],
] as const;

export default function Imagen() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        background: CIELO,
        padding: '64px 72px',
        color: TINTA,
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', width: 560, paddingRight: 40 }}>
        <div style={{ display: 'flex', alignItems: 'center', fontSize: 34, fontWeight: 700 }}>
          Devsparring
          <div
            style={{ width: 12, height: 12, borderRadius: 6, background: PUNTO, marginLeft: 6 }}
          />
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 64,
            fontSize: 64,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: -1.5,
          }}
        >
          Entrena entrevistas técnicas en español
        </div>
        <div
          style={{ display: 'flex', marginTop: 28, fontSize: 28, color: TINTA_2, lineHeight: 1.35 }}
        >
          Teoría, código y conversación, corregido con la vara de tu nivel.
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          marginTop: 24,
          marginBottom: 24,
          background: '#ffffff',
          border: `3px solid ${TINTA}`,
          borderRadius: 16,
          boxShadow: `8px 8px 0 ${TINTA}`,
          padding: '32px 34px',
        }}
      >
        <div style={{ display: 'flex', fontSize: 20, color: PUNTO, fontWeight: 700 }}>
          TIPO TEST · JAVASCRIPT
        </div>
        <div
          style={{ display: 'flex', marginTop: 14, fontSize: 30, fontWeight: 700, lineHeight: 1.2 }}
        >
          ¿Qué protege const en un array?
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: 22 }}>
          {OPCIONES.map(([letra, texto]) => {
            const buena = letra === 'B';
            return (
              <div
                key={letra}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: 10,
                  padding: '10px 14px',
                  borderRadius: 9,
                  border: `2px solid ${buena ? OK : '#9fb3d1'}`,
                  background: buena ? '#d8f2e4' : '#ffffff',
                  fontSize: 24,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    width: 34,
                    fontWeight: 700,
                    color: buena ? OK : TINTA_2,
                  }}
                >
                  {letra}
                </div>
                {texto}
              </div>
            );
          })}
        </div>
      </div>
    </div>,
    size,
  );
}
