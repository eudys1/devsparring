// Solo Chromium y contra el build de producción: en dev Next desactiva el
// prefetch y los tests de navegación no dicen nada. Los minutos de CI se pagan.
import { existsSync } from 'node:fs';
import { defineConfig, devices } from '@playwright/test';

// Los e2e con sesion leen E2E_EMAIL y E2E_PASSWORD de .env.local; sin ellas se
// saltan (en CI no hay Supabase de verdad).
if (existsSync('.env.local')) process.loadEnvFile('.env.local');

const puerto = 3417;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  // Los ganchos de prueba son data-prueba: el texto de los botones cambia con
  // el diseño, los ganchos no.
  use: {
    testIdAttribute: 'data-prueba',
    baseURL: `http://localhost:${puerto}`,
    trace: 'on-first-retry',
  },
  projects: [
    // Las pantallas públicas, sin sesión.
    { name: 'chromium', use: { ...devices['Desktop Chrome'] }, testIgnore: /app.spec.ts/ },
    // Las pantallas con sesión: primero un paso que entra una vez y guarda
    // las cookies; luego los tests las reutilizan.
    { name: 'sesion', testMatch: /auth.setup.ts/ },
    {
      name: 'app',
      testMatch: /app.spec.ts/,
      dependencies: ['sesion'],
      use: { ...devices['Desktop Chrome'], storageState: 'test-results/sesion-e2e.json' },
    },
  ],
  webServer: {
    command: `pnpm start -p ${puerto}`,
    url: `http://localhost:${puerto}`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
