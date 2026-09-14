// Capturas de página completa de las pantallas públicas (landing, entrar, demo
// en sus dos estados) en escritorio y móvil, claro y oscuro. Sirven para el
// bucle de revisión: se miran antes de pedir feedback. Salida en capturas/,
// fuera de git. Requiere un build reciente (pnpm build) con las variables
// NEXT_PUBLIC_SUPABASE_* definidas (valen las de ejemplo de ci.yml).
// Uso: node scripts/capturas.mjs [puerto]
import { spawn } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from '@playwright/test';

const puerto = Number(process.argv[2] ?? 3419);
const raiz = path.resolve(import.meta.dirname, '..');
const salida = path.join(raiz, 'capturas');
await mkdir(salida, { recursive: true });

const servidor = spawn('pnpm', ['start', '-p', String(puerto)], {
  cwd: raiz,
  shell: true,
  stdio: 'ignore',
  env: {
    ...process.env,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'https://ejemplo.supabase.co',
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? 'sb_publishable_falsa',
  },
});
await esperar(`http://localhost:${puerto}/`);

const navegador = await chromium.launch();
const vistas = [
  { nombre: 'escritorio', viewport: { width: 1360, height: 900 } },
  { nombre: 'movil', viewport: { width: 390, height: 844 }, mobile: true },
];
const temas = ['light', 'dark'];

try {
  for (const vista of vistas) {
    for (const tema of temas) {
      const ctx = await navegador.newContext({
        viewport: vista.viewport,
        deviceScaleFactor: 2,
        isMobile: vista.mobile ?? false,
        colorScheme: tema,
        locale: 'es-ES',
      });
      const page = await ctx.newPage();
      const foto = async (nombre) => {
        await page.waitForTimeout(700);
        return page.screenshot({
          path: path.join(salida, `${nombre}-${vista.nombre}-${tema}.png`),
          fullPage: true,
        });
      };

      await page.goto(`http://localhost:${puerto}/`);
      await page.waitForLoadState('networkidle');
      await foto('landing');

      await page.goto(`http://localhost:${puerto}/entrar`);
      await foto('entrar');

      await page.goto(`http://localhost:${puerto}/demo`);
      await page
        .getByLabel('Tu respuesta')
        .fill(
          'Una función que recuerda el ámbito léxico donde se creó, aunque se ejecute fuera de él. La uso para estado privado y callbacks.',
        );
      await foto('demo-respondiendo');
      await page.getByRole('button', { name: /autoevaluar/i }).click();
      await page.getByRole('heading', { name: 'Respuesta que aprueba' }).waitFor();
      await page.keyboard.press('3');
      await foto('demo-evaluando');
      await ctx.close();
    }
  }
  console.log(`Capturas en ${salida}`);
} finally {
  await navegador.close();
  matar(servidor);
}

async function esperar(url, intentos = 60) {
  for (let i = 0; i < intentos; i++) {
    try {
      const r = await fetch(url);
      if (r.ok || r.status === 307) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(`El servidor no respondió en ${url}`);
}

function matar(proc) {
  // En Windows, matar el árbol por PID; en el resto, la señal basta.
  if (process.platform === 'win32')
    spawn('taskkill', ['/PID', String(proc.pid), '/T', '/F'], { stdio: 'ignore' });
  else proc.kill('SIGTERM');
}
