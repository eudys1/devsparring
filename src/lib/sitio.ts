// Datos del sitio que necesitan las URLs absolutas (canonical, Open Graph,
// sitemap) y las páginas legales. En Vercel la URL de producción llega sola en
// VERCEL_PROJECT_PRODUCTION_URL; NEXT_PUBLIC_SITIO_URL manda si hay dominio propio.
function urlSitio(): string {
  if (process.env.NEXT_PUBLIC_SITIO_URL) return process.env.NEXT_PUBLIC_SITIO_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return 'http://localhost:3000';
}

export const URL_SITIO = urlSitio();

export const DESCRIPCION =
  'Entrena entrevistas técnicas de programación en español: teoría, código y conversación, corregido con la vara de tu nivel.';

// Titular del servicio para el aviso legal (LSSI art. 10). El repositorio es
// público, así que las incidencias de GitHub sirven de canal de contacto.
export const TITULAR = {
  nombre: 'Eudys',
  contacto: 'https://github.com/eudys1/devsparring/issues',
  repositorio: 'https://github.com/eudys1/devsparring',
};

// Rutas que exigen sesión. El proxy manda a entrar solo desde aquí; cualquier
// otra ruta desconocida llega a not-found con su 404, no a una redirección.
export const RUTAS_PRIVADAS = ['/hoy', '/practicar', '/pistas', '/cuenta', '/entrevistas'];

// Open Graph se hereda por sustitución, no por mezcla: una página que declara
// openGraph pierde lo del layout. Por eso cada una parte de esta base.
export const OPEN_GRAPH_BASE = {
  type: 'website' as const,
  siteName: 'Devsparring',
  locale: 'es_ES',
  images: [
    {
      url: '/opengraph-image',
      width: 1200,
      height: 630,
      alt: 'Devsparring: entrena entrevistas técnicas de programación en español',
    },
  ],
};
