// Las pantallas con sesión, contra el Supabase de verdad y con la cuenta de
// pruebas que auth.setup.ts deja abierta (E2E_EMAIL / E2E_PASSWORD en
// .env.local). Sin esas variables se saltan: en CI no hay base de datos. Cada test deja una captura en capturas/
// para mirarla después, que es el mismo bucle que las pantallas públicas.
import { expect, test, type Page } from '@playwright/test';

const email = process.env.E2E_EMAIL;
const clave = process.env.E2E_PASSWORD;

test.skip(!email || !clave, 'Sin E2E_EMAIL y E2E_PASSWORD en .env.local');

async function capturar(page: Page, nombre: string) {
  if (process.env.CI) return;
  await page.screenshot({ path: `capturas/app-${nombre}.png`, fullPage: true });
}

test('Hoy saluda, marca la pestaña activa y enseña la racha', async ({ page }) => {
  await page.goto('/hoy');
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/Buen/);
  await expect(page.getByRole('link', { name: 'Hoy' }).first()).toHaveAttribute(
    'aria-current',
    'page',
  );
  await expect(page.getByText(/días seguidos|día seguido/).first()).toBeVisible();
  await capturar(page, 'hoy');
});

test('el temario abre una ficha con la respuesta que aprueba', async ({ page }) => {
  await page.goto('/pistas');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Temario');
  await page.goto('/pistas/typescript');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('TypeScript');
  // El <summary> es el primer hijo del <details>: nunca sale el "Detalles" del navegador.
  await expect(page.getByText('Detalles', { exact: true })).toHaveCount(0);
  const primera = page.locator('details').first();
  await primera.locator('summary').click();
  await expect(primera.getByText('La respuesta que aprueba')).toBeVisible();
  await expect(primera.getByText('Qué se exige de Senior')).toBeVisible();
  await capturar(page, 'temario');
});

test('una sesión se responde, se autoevalúa por criterios y se puede dejar a medias', async ({
  page,
}) => {
  await page.goto('/practicar?modo=flash&pista=typescript');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('A qué te enfrentas');
  await expect(page.getByRole('button', { name: 'Flash', exact: false })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await capturar(page, 'practicar');
  await page.getByRole('button', { name: 'Empezar' }).click();
  await expect(page.getByLabel(/Asalto 1 de/)).toBeVisible();
  await page.getByLabel('Tu respuesta').fill('Respuesta de prueba del e2e.');
  await page.getByTestId('autoevaluar').click();
  await expect(page.getByRole('heading', { name: 'La respuesta que aprueba' })).toBeVisible();
  // Marcar un criterio propone la nota "A medias" y cuenta 1 de N.
  await page.getByRole('checkbox').first().check();
  await expect(page.getByText(/^1 de \d+ criterios$/)).toBeVisible();
  await expect(page.getByRole('button', { name: /A medias/ })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await capturar(page, 'sesion-evaluando');
  await page.getByTestId('siguiente').click();
  await expect(page.getByLabel(/Asalto 2 de/)).toBeVisible();
  // Salir a medias: Hoy ofrece continuar.
  await page.getByRole('link', { name: 'Salir y seguir luego' }).click();
  await expect(page).toHaveURL(/\/hoy/);
  await expect(page.getByText('Sesión en curso')).toBeVisible();
  await page.getByRole('link', { name: 'Continuar' }).click();
  await expect(page.getByLabel(/Asalto 2 de/)).toBeVisible();
});

test('la cuenta nombra los modelos y el tema se cambia con un interruptor', async ({ page }) => {
  await page.goto('/cuenta');
  await expect(page.getByLabel('Modelo')).toContainText('Claude Sonnet 5');
  const interruptor = page.getByRole('switch', { name: /Cambiar a tema/ }).first();
  const antes = await interruptor.getAttribute('aria-checked');
  await interruptor.click();
  await expect(interruptor).toHaveAttribute('aria-checked', antes === 'true' ? 'false' : 'true');
  await interruptor.click();
  await capturar(page, 'cuenta');
});

test('una entrevista se apunta y se borra', async ({ page }) => {
  await page.goto('/entrevistas');
  await page.getByLabel(/Empresa/).fill('Empresa de prueba e2e');
  await page.getByLabel(/Qué te preguntaron/).fill('¿Qué es un closure?');
  await page.getByRole('button', { name: 'Guardar' }).click();
  await expect(page.getByText('Guardada.')).toBeVisible();
  await expect(page.getByText('Empresa de prueba e2e').first()).toBeVisible();
  await capturar(page, 'entrevistas');
  await page
    .getByRole('button', { name: /Borrar la entrevista de Empresa de prueba e2e/ })
    .first()
    .click();
  await page.getByRole('button', { name: 'Sí, borrar' }).click();
  await expect(page.getByText('Empresa de prueba e2e')).toHaveCount(0);
});
