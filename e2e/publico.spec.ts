import { expect, test } from '@playwright/test';

test('la landing enseña el banco real y lleva a entrar', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Que la primera');
  // Las cifras del banco salen del contenido, nunca de un número escrito a mano.
  await expect(page.getByText('katas con tests').first()).toBeVisible();
  await expect(page.getByText(/fuentes citadas/).first()).toBeVisible();
  // El mosaico pinta una tesela por pregunta publicada del banco.
  await expect(page.getByText(/preguntas/).first()).toBeVisible();
  await page
    .getByRole('link', { name: /Entrar/ })
    .first()
    .click();
  await expect(page).toHaveURL(/\/entrar/);
  await expect(page.getByLabel('Correo')).toBeVisible();
});

test('las rutas de la app sin sesión redirigen a entrar', async ({ page }) => {
  await page.goto('/hoy');
  await expect(page).toHaveURL(/\/entrar\?volver=%2Fhoy/);
});

test('la demo permite responder, autoevaluar y avanzar con el teclado', async ({ page }) => {
  await page.goto('/demo');
  await expect(page.getByLabel(/Asalto 1 de 3/)).toBeVisible();
  await page.getByLabel('Tu respuesta').fill('Una función que recuerda el ámbito donde se creó.');
  await page.getByTestId('autoevaluar').click();
  await expect(page.getByRole('heading', { name: 'La respuesta que aprueba' })).toBeVisible();
  await page.keyboard.press('3');
  await page.keyboard.press('Enter');
  await expect(page.getByLabel(/Asalto 2 de 3/)).toBeVisible();
});

test('la demo copia el prompt de corrección al portapapeles', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/demo');
  await page.getByLabel('Tu respuesta').fill('respuesta de prueba');
  await page.getByTestId('copiar').click();
  await expect(page.getByTestId('copiar')).toHaveText(/Copiado/);
  const texto = await page.evaluate(() => navigator.clipboard.readText());
  expect(texto).toContain('entrevistador técnico');
  expect(texto).toContain('respuesta de prueba');
});

test('la sesión no ofrece combinaciones sin preguntas', async ({ page }) => {
  // La pantalla de nueva sesión exige sesión; se comprueba la regla pura en
  // vitest y aquí solo que la demo arranca con preguntas de verdad.
  await page.goto('/demo');
  await expect(page.getByRole('heading', { level: 1 })).not.toBeEmpty();
});
