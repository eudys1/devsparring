// Capturas de página completa de las pantallas públicas en escritorio y
// móvil, claro y oscuro. Sirven para el bucle de revisión: se miran como
// abogado del diablo antes de pedir feedback (ver scripts/revisar.mjs).
// Salida en capturas/, fuera de git. Requiere un build reciente (pnpm build)
// con las variables NEXT_PUBLIC_SUPABASE_* definidas (valen las de ejemplo
// de ci.yml).
//
// Deterministas a propósito: reloj del navegador fijado (Date/timers, no lo
// que ya se renderizó en el servidor), imágenes diferidas forzadas a cargar,
// fuentes esperadas con document.fonts.ready y el overlay de desarrollo de
// Next oculto (nextjs-portal).
//
// Uso:
//   node scripts/capturas.mjs                          # flujo por defecto
//   node scripts/capturas.mjs 3420                      # puerto propio
//   node scripts/capturas.mjs --rutas /,/entrar,/demo   # rutas sueltas
//
// Sin --rutas repite el flujo con nombre fijo de siempre: landing, entrar y
// demo en sus dos estados (respondiendo/evaluando), con la interacción que
// hace falta para llegar a cada uno. Con --rutas, en vez de eso hace una
// captura simple de página completa por cada ruta de la lista (útil para
// revisar una pantalla suelta sin levantar todo el flujo del demo).
import { spawn, execSync } from 'node:child_process';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { chromium, selectors } from '@playwright/test';

const argv = process.argv.slice(2);
let rutasArg;
let puertoArg;
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a === '--rutas') rutasArg = argv[++i];
  else if (a.startsWith('--rutas=')) rutasArg = a.slice('--rutas='.length);
  else if (/^\d+$/.test(a)) puertoArg = a;
}
const rutasPersonalizadas = rutasArg
  ? rutasArg
      .split(',')
      .map((r) => r.trim())
      .filter(Boolean)
  : null;

const puerto = Number(puertoArg ?? 3419);
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

// Mismo gancho de prueba que los e2e: data-prueba, no data-testid.
selectors.setTestIdAttribute('data-prueba');
const navegador = await chromium.launch();
const vistas = [
  { nombre: 'escritorio', viewport: { width: 1360, height: 900 } },
  { nombre: 'movil', viewport: { width: 390, height: 844 }, mobile: true },
];
const temas = ['light', 'dark'];

// Fecha fija para que dos pasadas del bucle den el mismo pixel. Solo afecta
// a Date()/timers del NAVEGADOR (page.clock): lo que un Server Component ya
// calculó con la hora real de la máquina antes de mandar el HTML no cambia.
const FECHA_FIJA = new Date('2026-01-15T10:00:00');

// La interfaz puede estar cambiando bajo los pies de este script (otro
// proceso rediseñando src/ a la vez): un selector que dejó de existir no
// debe tumbar toda la pasada ni dejar el servidor huérfano. Cada combinación
// de vista/tema (y, con --rutas, cada ruta) se aísla en su propio try, se
// avisa por consola y se sigue con la siguiente.
const errores = [];

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
      await ctx.addInitScript(ocultarOverlayNext);
      const page = await ctx.newPage();
      await page.clock.setFixedTime(FECHA_FIJA);

      const foto = async (nombre) => {
        await prepararCaptura(page);
        return page.screenshot({
          path: path.join(salida, `${nombre}-${vista.nombre}-${tema}.png`),
          fullPage: true,
        });
      };

      try {
        if (rutasPersonalizadas) {
          for (const ruta of rutasPersonalizadas) {
            try {
              await page.goto(`http://localhost:${puerto}${ruta}`);
              await foto(nombreDeRuta(ruta));
            } catch (err) {
              avisar(`ruta ${ruta} (${vista.nombre}/${tema})`, err);
            }
          }
        } else {
          try {
            await page.goto(`http://localhost:${puerto}/`);
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
            await page.getByTestId('autoevaluar').click();
            await page.getByRole('heading', { name: 'La respuesta que aprueba' }).waitFor();
            await page.keyboard.press('3');
            await foto('demo-evaluando');
          } catch (err) {
            avisar(`flujo por defecto (${vista.nombre}/${tema})`, err);
          }
        }
      } finally {
        await ctx.close();
      }
    }
  }
  if (errores.length > 0) {
    console.log(`Capturas en ${salida} — ${errores.length} fallo(s), ver avisos arriba.`);
    process.exitCode = 1;
  } else {
    console.log(`Capturas en ${salida}`);
  }
} finally {
  await navegador.close();
  await matar(servidor, puerto);
}

// --- helpers -----------------------------------------------------------

function nombreDeRuta(ruta) {
  const limpio = ruta.replace(/^\/+/, '').replace(/\/+$/, '');
  return limpio ? limpio.replace(/\//g, '-') : 'index';
}

function avisar(contexto, err) {
  errores.push(contexto);
  console.error(`Aviso: no se pudo capturar ${contexto}: ${err.message}`);
}

// Se registra con addInitScript: corre antes que cualquier script de la
// página, en cada navegación, así que también tapa el overlay si aparece
// mientras se navega dentro del flujo (p. ej. tras el login del demo).
function ocultarOverlayNext() {
  const aplicar = () => {
    const estilo = document.createElement('style');
    estilo.textContent = 'nextjs-portal{display:none!important}';
    (document.head ?? document.documentElement).appendChild(estilo);
  };
  if (document.head) aplicar();
  else document.addEventListener('DOMContentLoaded', aplicar);
}

async function prepararCaptura(page) {
  await page.waitForLoadState('networkidle');
  await page.evaluate(() => document.fonts.ready);
  await forzarImagenesDiferidas(page);
  await page.waitForTimeout(500); // deja asentar transiciones CSS de entrada
}

// next/image y <img loading="lazy"> no cargan lo que nunca entró en
// viewport; para una captura de página completa hace falta forzarlas antes
// de disparar el screenshot (que sí recorre toda la página, pero no espera
// a que cada imagen lazy termine de descargar).
async function forzarImagenesDiferidas(page) {
  await page.evaluate(async () => {
    document.querySelectorAll('img[loading="lazy"]').forEach((img) => {
      img.loading = 'eager';
    });
    const altura = document.body.scrollHeight;
    const paso = window.innerHeight || 800;
    for (let y = 0; y < altura; y += paso) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 30));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 30));
  });
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

// pnpm bajo shell:true no deja un árbol de proceso fiable en Windows: el
// taskkill por PID a veces no llega al "next start" real y el servidor
// queda huérfano, escuchando el puerto (comprobado a mano tras un fallo del
// flujo del demo). Lección ya escrita en C:\dev\CLAUDE.md: "matar por
// puerto, no por nombre". Se mata lo que de verdad esté escuchando el
// puerto y, además, el árbol por si acaso.
async function matar(proc, puerto) {
  if (process.platform !== 'win32') {
    proc.kill('SIGTERM');
    return;
  }
  matarPorPuerto(puerto);
  try {
    execSync(`taskkill /PID ${proc.pid} /T /F`, { stdio: 'ignore' });
  } catch {
    // ya no existe o no se pudo por PID: matarPorPuerto es la red de seguridad
  }
}

function matarPorPuerto(puerto) {
  let salida;
  try {
    salida = execSync(`netstat -ano | findstr :${puerto}`, { encoding: 'utf8' });
  } catch {
    return; // findstr sale con código != 0 si no hay nada escuchando: no hay nada que matar
  }
  const pids = new Set();
  for (const linea of salida.split('\n')) {
    const m = linea.match(/LISTENING\s+(\d+)/);
    if (m) pids.add(m[1]);
  }
  for (const pid of pids) {
    try {
      execSync(`taskkill /PID ${pid} /F`, { stdio: 'ignore' });
    } catch {
      // ya no existe: seguir con el resto
    }
  }
}
