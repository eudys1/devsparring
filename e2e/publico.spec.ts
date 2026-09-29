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

test('una ruta que no existe da 404, no una redirección a entrar', async ({ page }) => {
  const respuesta = await page.goto('/no-existe-esta-ruta');
  expect(respuesta?.status()).toBe(404);
  await expect(page).toHaveURL(/\/no-existe-esta-ruta$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Esto no existe');
});

test('privacidad y aviso legal se enlazan desde la portada y se leen sin sesión', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByRole('link', { name: 'Privacidad' }).click();
  await expect(page).toHaveURL(/\/privacidad$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Privacidad');
  await page.getByRole('link', { name: 'Aviso legal' }).click();
  await expect(page).toHaveURL(/\/aviso-legal$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Aviso legal');
});

test('robots, sitemap y vista previa social están servidos', async ({ page, request }) => {
  const robots = await (await request.get('/robots.txt')).text();
  expect(robots).toContain('Disallow: /hoy');
  expect(robots).toContain('Sitemap:');
  const sitemap = await (await request.get('/sitemap.xml')).text();
  expect(sitemap).toContain('/privacidad');
  await page.goto('/');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /^https?:\/\//);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    'content',
    /opengraph-image/,
  );
  const imagen = await request.get('/opengraph-image');
  expect(imagen.headers()['content-type']).toContain('image/png');
});

test('la demo es un Tipo test: se elige con el teclado, se explica cada opción y se avanza', async ({
  page,
}) => {
  await page.goto('/demo');
  await expect(page.getByLabel(/Asalto 1 de 3/)).toBeVisible();
  await page.keyboard.press('b');
  // Al responder, las cuatro opciones dicen si valen o no, no solo la elegida.
  for (const i of [0, 1, 2, 3]) {
    await expect(page.getByTestId(`opcion-${i}`)).toHaveAttribute('data-estado', /ok|mal|resto/);
  }
  await expect(page.locator('[data-estado="ok"]')).toHaveCount(1);
  await expect(
    page.getByText(/^(Correcto\.|Elegiste la B\. La correcta es la [ACD]\.)/),
  ).toBeVisible();
  // La nota de repaso se propone sola: bien si aciertas, fallé si no.
  await expect(page.getByRole('button', { name: /Bien|Fallé/, pressed: true })).toBeVisible();
  await page.keyboard.press('Enter');
  await expect(page.getByLabel(/Asalto 2 de 3/)).toBeVisible();
});

test('la sesión no ofrece combinaciones sin preguntas', async ({ page }) => {
  // La pantalla de nueva sesión exige sesión; se comprueba la regla pura en
  // vitest y aquí solo que la demo arranca con preguntas de verdad.
  await page.goto('/demo');
  await expect(page.getByRole('heading', { level: 1 })).not.toBeEmpty();
});

test('el tema y el carril elegidos se aplican antes de pintar al recargar', async ({ page }) => {
  // El guion de cabecera tiene que llegar como texto al HTML: si se exporta
  // desde un fichero de cliente, el servidor pinta un error y se pierde la
  // preferencia hasta que hidrata (29-09-2026).
  await page.addInitScript(() => {
    localStorage.setItem('devsparring.tema', 'oscuro');
    localStorage.setItem('devsparring.carril', 'compacto');
  });
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('html')).toHaveAttribute('data-carril', 'compacto');
});

test('cada pregunta de la demo se puede reportar como issue del repositorio', async ({ page }) => {
  await page.goto('/demo');
  const enlace = page.getByTestId('reportar-pregunta');
  await expect(enlace).toHaveAttribute('target', '_blank');
  await expect(enlace).toHaveAttribute(
    'href',
    /^https:\/\/github\.com\/eudys1\/devsparring\/issues\/new\?title=Pregunta\+mal%3A\+/,
  );
});
