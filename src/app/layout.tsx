import type { Metadata } from 'next';
import { Big_Shoulders, IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google';
import { GUION_TEMA } from '@/components/Tema';
import './globals.css';

// Display condensada de cartel para titulares y cifras; Plex Sans y Plex Mono
// son hermanas, así que el conjunto es una familia. Ver docs/diseno.md.
const display = Big_Shoulders({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--fuente-display',
  display: 'swap',
});
const texto = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--fuente-texto',
  display: 'swap',
});
const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--fuente-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: { default: 'Devsparring', template: '%s · Devsparring' },
  description:
    'Entrena entrevistas técnicas de programación en español: teoría, código y conversación, corregido con la vara de tu nivel.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      className={`${display.variable} ${texto.variable} ${mono.variable}`}
      // El guion del tema escribe data-theme antes de que React hidrate.
      suppressHydrationWarning
    >
      <head>
        {/* Antes de pintar, para que no haya destello del tema contrario */}
        <script dangerouslySetInnerHTML={{ __html: GUION_TEMA }} />
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
