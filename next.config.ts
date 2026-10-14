import type { NextConfig } from 'next';

// Cabeceras de seguridad básicas para toda respuesta. Sin CSP de momento: una
// a medias da falsa seguridad (Monaco ya se sirve en local, así que se puede
// añadir con calma). Lo que sí se cierra: embeber la app en un iframe ajeno, el sniffing de tipos
// y el envío del referer completo a terceros.
const cabeceras = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Hoy pasó a llamarse Inicio (13-10-2026): los marcadores viejos siguen valiendo.
  async redirects() {
    return [{ source: '/hoy', destination: '/inicio', permanent: true }];
  },
  async headers() {
    return [{ source: '/(.*)', headers: cabeceras }];
  },
};

export default nextConfig;
