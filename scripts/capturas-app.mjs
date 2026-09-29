// Capturas de las pantallas con sesión (Hoy, Practicar, Temario, Cuenta y
// Entrevistas) en escritorio y móvil, claro y oscuro. Complementa a
// capturas.mjs, que solo cubre lo público. En móvil van a página completa; en
// escritorio, la primera pantalla. Salida en capturas/, fuera de git.
//
// Requiere un servidor levantado con un build reciente y la sesión de la
// cuenta de pruebas que deja el e2e (pnpm test:e2e crea
// test-results/sesion-e2e.json).
//
// Uso:
//   pnpm start -p 3456            # en otra terminal
//   node scripts/capturas-app.mjs http://localhost:3456
import { mkdir } from 'node:fs/promises';
import { chromium } from '@playwright/test';

const base = process.argv[2] ?? 'http://localhost:3456';
const salida = 'capturas';
const rutas = ['/hoy', '/practicar', '/pistas', '/pistas/typescript', '/cuenta', '/entrevistas'];

await mkdir(salida, { recursive: true });
const navegador = await chromium.launch();
for (const tema of ['light', 'dark']) {
  for (const [tamano, viewport] of [
    ['escritorio', { width: 1440, height: 900 }],
    ['movil', { width: 390, height: 844 }],
  ]) {
    const contexto = await navegador.newContext({
      viewport,
      colorScheme: tema,
      storageState: 'test-results/sesion-e2e.json',
    });
    const pagina = await contexto.newPage();
    for (const ruta of rutas) {
      await pagina.goto(base + ruta);
      await pagina.addStyleTag({ content: 'nextjs-portal{display:none}' });
      await pagina.evaluate(() => document.fonts.ready);
      const nombre = ruta.slice(1).replace(/\W+/g, '-');
      await pagina.screenshot({
        path: `${salida}/app-${nombre}-${tamano}-${tema}.png`,
        fullPage: tamano === 'movil',
      });
    }
    await contexto.close();
  }
}
await navegador.close();
console.log(`Capturas con sesión en ${salida}/`);
