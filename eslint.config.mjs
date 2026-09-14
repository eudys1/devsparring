import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

// Reglas de dependencia entre carpetas (docs/arquitectura.md): las features no
// se importan entre sí ni tocan app/; lib/ y components/ no conocen features/.
// Sin ficheros índice: los barrels rompen el tree shaking con Turbopack.
const sinImportsCruzados = (patrones) => ({
  'no-restricted-imports': [
    'error',
    {
      patterns: patrones.map((p) => ({ group: [p.group], message: p.message })),
    },
  ],
});

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts', 'capturas/**']),
  {
    files: ['src/features/**/*.{ts,tsx}'],
    rules: sinImportsCruzados([
      { group: '@/app/*', message: 'Una feature no importa de app/.' },
      {
        group: '@/features/*',
        message: 'Una feature no importa de otra feature. Comparte por components/ o lib/.',
      },
    ]),
  },
  {
    files: ['src/lib/**/*.{ts,tsx}', 'src/components/**/*.{ts,tsx}'],
    rules: sinImportsCruzados([
      { group: '@/features/*', message: 'lib/ y components/ no conocen features/.' },
      { group: '@/app/*', message: 'lib/ y components/ no conocen app/.' },
    ]),
  },
  // Dentro de una feature se importa con rutas relativas ('./', '../'); la ruta
  // absoluta '@/features/...' queda reservada para app/, que es quien compone.
]);

export default eslintConfig;
