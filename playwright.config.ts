// Solo Chromium y contra el build de producción: en dev Next desactiva el
// prefetch y los tests de navegación no dicen nada. Los minutos de CI se pagan.
import { defineConfig, devices } from '@playwright/test';

const puerto = 3417;

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: `http://localhost:${puerto}`,
    trace: 'on-first-retry',
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: `pnpm start -p ${puerto}`,
    url: `http://localhost:${puerto}`,
    reuseExistingServer: !process.env.CI,
    timeout: 60_000,
  },
});
