// Paso previo de los e2e con sesión: entra UNA vez con la cuenta de pruebas
// (la crea si no existe) y guarda las cookies en un fichero que el proyecto
// "app" reutiliza. Cinco tests entrando a la vez disparaban el límite de
// intentos de Supabase. Sin E2E_EMAIL se escribe un estado vacío y los tests
// con sesión se saltan solos.
import { mkdirSync, writeFileSync } from 'node:fs';
import { expect, test as setup } from '@playwright/test';
import { createClient } from '@supabase/supabase-js';

export const ESTADO_SESION = 'test-results/sesion-e2e.json';

const email = process.env.E2E_EMAIL;
const clave = process.env.E2E_PASSWORD;

setup('entrar con la cuenta de pruebas', async ({ page }) => {
  mkdirSync('test-results', { recursive: true });
  if (!email || !clave) {
    writeFileSync(ESTADO_SESION, JSON.stringify({ cookies: [], origins: [] }));
    return;
  }
  // La cuenta se crea por la API de administración, no por el formulario: el
  // registro por interfaz manda un correo y el SMTP integrado de Supabase corta
  // a los dos por hora. Si ya existe, el error se ignora.
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secreto = process.env.SUPABASE_SECRET_KEY;
  if (url && secreto) {
    const admin = createClient(url, secreto, { auth: { persistSession: false } });
    const { error } = await admin.auth.admin.createUser({
      email,
      password: clave,
      email_confirm: true,
    });
    if (error && !/already|registered|exists/i.test(error.message)) throw error;
  }
  await page.goto('/entrar');
  await page.getByLabel(/Correo/).fill(email);
  await page.getByLabel(/Contraseña/).fill(clave);
  await page.getByRole('button', { name: 'Entrar' }).click();
  // Solo el aviso del formulario: la página tiene otro role=alert vacío (anunciador de rutas).
  const aviso = page.locator('form').getByRole('alert');
  await Promise.race([
    page.waitForURL(/\/hoy/),
    aviso.waitFor({ state: 'visible' }).catch(() => undefined),
  ]);
  if (!page.url().includes('/hoy')) {
    const texto = (await aviso.textContent()) ?? '';
    // Sin cuenta todavía: se crea. Las confirmaciones de correo están
    // desactivadas, así que entra directamente.
    if (/incorrectos/.test(texto)) {
      await page.getByRole('button', { name: 'Crear una cuenta' }).click();
      await page.getByRole('button', { name: 'Crear cuenta' }).click();
    } else {
      throw new Error(`No se pudo entrar con la cuenta de pruebas: ${texto}`);
    }
  }
  await expect(page).toHaveURL(/\/hoy/, { timeout: 15_000 });
  await page.context().storageState({ path: ESTADO_SESION });
});
