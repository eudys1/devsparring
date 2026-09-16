import type { NextConfig } from 'next';

// Cabeceras de seguridad básicas para toda respuesta. No hay CSP porque el
// editor Monaco se carga desde su CDN y una CSP a medias da falsa seguridad;
// lo que sí se cierra: embeber la app en un iframe ajeno, el sniffing de tipos
// y el envío del referer completo a terceros.
const cabeceras = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: '/(.*)', headers: cabeceras }];
  },
};

export default nextConfig;
