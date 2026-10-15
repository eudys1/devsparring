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
  await page.screenshot({
    path: `capturas/app-${nombre}.png`,
    fullPage: true,
    animations: 'disabled',
  });
}

test('Inicio saluda, marca la pestaña activa y enseña la racha', async ({ page }) => {
  await page.goto('/inicio');
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/Buen/);
  await expect(page.getByRole('link', { name: 'Inicio' }).first()).toHaveAttribute(
    'aria-current',
    'page',
  );
  await expect(page.getByText(/días seguidos|día seguido/).first()).toBeVisible();
  await capturar(page, 'inicio');
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
  context,
}) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/practicar?modo=verbal&pista=typescript');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('A qué te enfrentas');
  await expect(page.getByRole('button', { name: 'Explicar', exact: false })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await capturar(page, 'practicar');
  // Sin decir el tema, la pista no se puede elegir; se deja como estaba.
  await page.getByTestId('sin-tema').check();
  await expect(page.getByLabel('Pista', { exact: true })).toBeDisabled();
  await page.getByTestId('sin-tema').uncheck();
  await page.getByRole('button', { name: 'Empezar' }).click();
  await expect(page.getByLabel(/Asalto 1 de/)).toBeVisible();
  // Las pistas se destapan de una en una, solo si se piden.
  await page.getByTestId('pista').click();
  await expect(page.getByText(/^Llevas 1 de \d+\./)).toBeVisible();
  await page.getByLabel('Tu explicación').fill('Respuesta de prueba del e2e.');
  // Sin clave, la respuesta se puede corregir fuera: el prompt lleva la rúbrica y la respuesta.
  await page.getByTestId('copiar').click();
  await expect(page.getByTestId('copiar')).toHaveText(/Copiado/);
  const prompt = await page.evaluate(() => navigator.clipboard.readText());
  expect(prompt).toContain('entrevistador técnico');
  expect(prompt).toContain('Respuesta de prueba del e2e.');
  await page.getByTestId('autoevaluar').click();
  await expect(page.getByRole('heading', { name: 'La respuesta que aprueba' })).toBeVisible();
  // Marcar un criterio propone la nota "A medias" y cuenta 1 de N.
  // La casilla de React Aria esconde el input dentro de su etiqueta: se pulsa
  // la etiqueta, como haría una persona.
  await page
    .locator('label')
    .filter({ has: page.getByRole('checkbox') })
    .first()
    .click();
  await expect(page.getByRole('checkbox').first()).toBeChecked();
  await expect(page.getByText(/^1 de \d+ criterios$/)).toBeVisible();
  await expect(page.getByRole('button', { name: /A medias/ })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await capturar(page, 'sesion-evaluando');
  await page.getByTestId('siguiente').click();
  await expect(page.getByLabel(/Asalto 2 de/)).toBeVisible();
  // Salir a medias: Inicio lista todas las sesiones a medias (los otros tests
  // dejan las suyas) y esta se retoma desde su propio enlace.
  const ruta = new URL(page.url()).pathname;
  await page.getByRole('link', { name: 'Salir y seguir luego' }).click();
  await expect(page).toHaveURL(/\/inicio/);
  await expect(page.getByRole('heading', { name: /en curso/ })).toBeVisible();
  await page.locator(`a[href="${ruta}"]`).click();
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

test('el repaso relámpago se hace sin escribir: girar, puntuarse y seguir', async ({ page }) => {
  await page.goto('/practicar?modo=verbal');
  await page.getByTestId('relampago').check();
  await page.getByRole('button', { name: 'Empezar' }).click();
  await expect(page.getByLabel(/Asalto 1 de/)).toBeVisible();
  await expect(page.getByLabel('Tu explicación')).toHaveCount(0);
  await page.keyboard.press(' ');
  await expect(page.getByText('La idea en una frase', { exact: true })).toBeVisible();
  await page.waitForTimeout(600); // el giro dura 520 ms: se captura girada
  await capturar(page, 'relampago');
  await page.keyboard.press('3');
  await page.keyboard.press('Enter');
  await expect(page.getByLabel(/Asalto 2 de/)).toBeVisible();
});

test('al terminar una sesión sale el informe con la barra y qué hacer ahora', async ({ page }) => {
  await page.goto('/practicar?modo=verbal');
  await page.getByTestId('relampago').check();
  await page.getByRole('button', { name: 'Empezar' }).click();
  // Relámpago con el teclado hasta la última: girar, puntuarse y seguir.
  for (let i = 1; ; i++) {
    const asalto = page.getByLabel(new RegExp(`Asalto ${i} de (\\d+)`));
    await expect(asalto).toBeVisible();
    const total = Number((await asalto.getAttribute('aria-label'))?.match(/de (\d+)/)?.[1]);
    // La cara de atrás siempre está en el DOM: se espera al giro de verdad. Con
    // los tests en paralelo, el primer espacio puede llegar antes de que la
    // página escuche el teclado, así que se reintenta.
    const volteo = page.locator('.volteo');
    await expect(async () => {
      if ((await volteo.getAttribute('data-lado')) !== 'atras') await page.keyboard.press(' ');
      await expect(volteo).toHaveAttribute('data-lado', 'atras', { timeout: 1000 });
    }).toPass();
    await page.keyboard.press(i % 2 ? '3' : '1');
    await page.keyboard.press('Enter');
    if (i >= total) break;
  }
  await expect(page).toHaveURL(/\/informe$/, { timeout: 15_000 });
  await expect(page.getByRole('heading', { name: 'Cómo ha ido' })).toBeVisible();
  await expect(page.getByRole('img', { name: /bien, \d+ a medias, \d+ falladas/ })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Qué hacer ahora' })).toBeVisible();
  await capturar(page, 'informe');
});

test('el historial lista las sesiones terminadas y abre su informe', async ({ page }) => {
  // La cuenta de pruebas ya tiene sesiones terminadas de pasadas anteriores.
  await page.goto('/historial');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Historial');
  await page.locator('a[href$="/informe"]').first().click();
  await expect(page).toHaveURL(/\/informe$/);
  await expect(page.getByRole('heading', { name: 'Cómo ha ido' })).toBeVisible();
  await capturar(page, 'historial');
});

test('una kata carga Monaco desde el propio dominio y ejecuta los tests', async ({ page }) => {
  // Monaco se sirve desde public/monaco: sin red al CDN el modo kata no cargaba.
  const aTerceros: string[] = [];
  page.on('request', (r) => {
    if (r.url().includes('cdn.jsdelivr.net')) aTerceros.push(r.url());
  });
  await page.goto('/practicar?modo=kata&pista=javascript');
  await page.getByRole('button', { name: 'Empezar' }).click();
  await expect(page.getByLabel(/Asalto 1 de/)).toBeVisible();
  await expect(page.locator('.monaco-editor').first()).toBeVisible({ timeout: 20_000 });
  await page.getByRole('button', { name: /Ejecutar tests/ }).click();
  await expect(page.getByLabel('Resultado de los tests')).toContainText(/tests pasan|Error/, {
    timeout: 20_000,
  });
  expect(aTerceros).toEqual([]);
  await capturar(page, 'kata');
});

test('al pasar a la siguiente kata el editor enseña su código, no el de la anterior', async ({
  page,
}) => {
  // Monaco guardaba el código con un nombre de fichero fijo y la segunda kata
  // salía con el código de la primera (15-10-2026).
  await page.goto('/practicar?modo=kata&pista=javascript');
  await page.getByRole('button', { name: 'Empezar' }).click();
  const lineas = page.locator('.monaco-editor .view-lines').first();
  await expect(lineas).toContainText('export function', { timeout: 20_000 });
  // Monaco pinta los espacios como espacios duros: sin normalizar, la
  // comparación nunca daba "igual" y el test pasaba con el fallo dentro.
  const codigo = async () => (await lineas.innerText()).replace(/\s+/g, ' ');
  const primera = await codigo();
  await page.getByTestId('autoevaluar').click();
  await page.getByRole('button', { name: /Fallé/ }).click();
  await page.getByTestId('siguiente').click();
  await expect(page.getByLabel(/Asalto 2 de/)).toBeVisible();
  await expect.poll(codigo, { timeout: 20_000 }).not.toBe(primera);
});
