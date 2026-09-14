// Dos proyectos: la lógica pura corre en Node (rápido, sin DOM) y los pocos
// componentes con interacción corren en jsdom. Los Server Components async no
// se testean aquí: van a Playwright (ver docs/arquitectura.md, "Testing").
// En Vitest 5 los proyectos inline heredan plugins y alias de este fichero.
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': path.resolve(import.meta.dirname, 'src') } },
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: 'node',
          environment: 'node',
          include: ['src/**/*.test.ts', 'scripts/**/*.test.mjs'],
        },
      },
      {
        extends: true,
        test: {
          name: 'dom',
          environment: 'jsdom',
          include: ['src/**/*.test.tsx'],
          setupFiles: ['./src/testing/setup.ts'],
        },
      },
    ],
  },
});
