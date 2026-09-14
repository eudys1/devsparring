import { expect, test } from '@playwright/test';

test('la landing enseña el banco real y lleva a entrar', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('primera entrevista');
  // El contador viene del contenido real, nunca de un número fijo.
  const contador = page.locator('p.tabular').first();
  await expect(contador).toContainText(/\d+/);
  await page.getByRole('link', { name: 'Entrar' }).first().click();
  await expect(page).toHaveURL(/\/entrar/);
  await expect(page.getByLabel('Correo')).toBeVisible();
});

test('las rutas de la app sin sesión redirigen a entrar', async ({ page }) => {
  await page.goto('/hoy');
  await expect(page).toHaveURL(/\/entrar\?volver=%2Fhoy/);
});

test('la demo permite responder, autoevaluar y avanzar con el teclado', async ({ page }) => {
  await page.goto('/demo');
  await expect(page.getByText('1 de 3')).toBeVisible();
  await page.getByLabel('Tu respuesta').fill('Una función que recuerda el ámbito donde se creó.');
  await page.getByRole('button', { name: /autoevaluar/i }).click();
  await expect(page.getByRole('heading', { name: 'Respuesta que aprueba' })).toBeVisible();
  await page.keyboard.press('3');
  await page.keyboard.press('Enter');
  await expect(page.getByText('2 de 3')).toBeVisible();
});

test('la demo copia el prompt de corrección al portapapeles', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/demo');
  await page.getByLabel('Tu respuesta').fill('respuesta de prueba');
  await page.getByRole('button', { name: 'Copiar para corregir fuera' }).click();
  await expect(page.getByRole('button', { name: 'Copiado' })).toBeVisible();
  const texto = await page.evaluate(() => navigator.clipboard.readText());
  expect(texto).toContain('entrevistador técnico');
  expect(texto).toContain('respuesta de prueba');
});
