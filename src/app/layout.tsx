import type { Metadata } from 'next';
import { JetBrains_Mono, Onest } from 'next/font/google';
import { GUIONES_CABECERA } from '@/components/guiones';
import { DESCRIPCION, OPEN_GRAPH_BASE, URL_SITIO } from '@/lib/sitio';
import './globals.css';

// Onest para todo, del texto corrido a las cifras grandes (en negrita cerrada);
// JetBrains Mono para los datos: reloj, asalto, puntuaciones. Ver docs/diseno.md.
const texto = Onest({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--fuente-texto',
  display: 'swap',
});
const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--fuente-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(URL_SITIO),
  title: { default: 'Devsparring', template: '%s · Devsparring' },
  description: DESCRIPCION,
  openGraph: { ...OPEN_GRAPH_BASE, description: DESCRIPCION },
  twitter: { card: 'summary_large_image', images: OPEN_GRAPH_BASE.images },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${texto.variable} ${mono.variable}`}
      // Los guiones de cabecera escriben data-theme y data-carril antes de hidratar.
      suppressHydrationWarning
    >
      <head>
        {/* Antes de pintar, para que no haya destello del tema contrario */}
        <script dangerouslySetInnerHTML={{ __html: GUIONES_CABECERA }} />
      </head>
      <body>
        <a href="#contenido" className="saltar">
          Saltar al contenido
        </a>
        {children}
      </body>
    </html>
  );
}
