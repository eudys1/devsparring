# Progreso

Estado de las tareas largas, para retomar sin depender de la conversación.
Se actualiza al cerrar cada paso.

## Hecho el 29-09-2026 (sin commit todavía: lo hace Eudys)

- **Rediseño "Cielo y noche con papel"** en toda la app y la portada. Decisiones
  en `docs/diseno.md` (cuarta vuelta) y `docs/decisiones.md`.
- **Arreglo de fondo:** el tema elegido no se recordaba al recargar. Los guiones
  de cabecera se exportaban desde un fichero de cliente; ahora viven en
  `src/components/guiones.ts`, con prueba e2e.
- **Palpa + axe** sobre la web pública: de 5 hallazgos graves a 0 (contraste,
  `<main>`, cabeceras duplicadas en la demo, ARIA en un `<p>`, tarjetas que se
  levantaban sin ser pulsables, desplegable sin señal).
- **"¿Está mal? Avísalo"** en la sesión y en el temario: abre un issue con la
  pregunta ya identificada. Con pruebas unitarias y e2e.
- **Supabase caído ya no cuelga la web**: el proxy espera como mucho 3 s (antes
  25 s por página) y el login dice que no hay conexión en vez de "fetch failed".
- `pnpm verify` en verde (83 tests), detector sin P0/P1, e2e públicos 7/7.

## Bloqueos (dependen de Eudys)

- **Supabase pausado**: el host del proyecto da NXDOMAIN. Reactivarlo desde el
  panel de Supabase. Hasta entonces fallan los e2e con sesión y no se pueden
  capturar Hoy, Temario, Cuenta ni Entrevistas reales.
- **Probar con tu clave** (punto 3 de la lista) necesita tu clave y Supabase.

## Pendiente de palpa (no bloquea; decidir con el despliegue)

Vista previa social (og:title, og:image), 404 de verdad para rutas
desconocidas (hoy el proxy redirige a /entrar), enlace a privacidad y aviso
legal, robots.txt, sitemap, canonical y JSON-LD.

## Pendiente general (lista de Eudys, en orden)

1. Commitear (Eudys).
2. Capturas con sesión en móvil y oscuro: cuando vuelva Supabase.
3. Probar con su clave: corrección con IA, kata con tests, Revisión, Diseño y STAR.
4. ~~Botón "esta pregunta está mal"~~ hecho.
5. ~~Landing que explique la app~~ hecho con "Cómo funciona" (pasos, pestañas y
   uso sin clave). Falta, si se quiere, una línea sobre la repetición espaciada
   con datos reales.
6. Modo Tipo test con explicación de cada opción falsa, revisión por PR.
7. Resumen de una frase y repaso relámpago.
8. Research: pistas graduales, ronda sin tema, criterio de mentor, salvar la racha.
9. Pista de IA 2026 y buenas prácticas de vibe coding.
10. Sanear y ampliar el banco por PR.
