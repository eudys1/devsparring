import type { MetadataRoute } from 'next';
import { URL_SITIO } from '@/lib/sitio';

// Solo lo público y con contenido propio; la app vive tras la sesión.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: URL_SITIO, changeFrequency: 'weekly', priority: 1 },
    { url: `${URL_SITIO}/demo`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${URL_SITIO}/privacidad`, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${URL_SITIO}/aviso-legal`, changeFrequency: 'yearly', priority: 0.2 },
  ];
}
