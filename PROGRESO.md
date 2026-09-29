# Progreso

Estado de las tareas largas, para retomar sin depender de la conversación.
Se actualiza al cerrar cada paso.

## Hecho el 29-09-2026

Primer commit (`f2e232d`): rediseño "Cielo y noche con papel", palpa pública en
verde, "¿Está mal? Avísalo", tope de espera a Supabase y latido.

Segunda tanda (sin commit todavía: lo hace Eudys):

- **Punto 2, palpa con sesión** sobre Hoy, Practicar, Temario, Cuenta y
  Entrevistas, y capturas con sesión en escritorio y móvil, claro y oscuro
  (`pnpm capturas:app`, script nuevo).
- **Punto 3, lo que nunca se había usado entero:** la corrección con IA
  responde y valida el esquema en Explicar, Kata, Revisión, Diseño y STAR
  (probado contra la API con la clave del dueño). Los tests de kata se ejecutan
  en el navegador y pintan esperado/recibido. Falta que Eudys pruebe el botón de
  corregir con IA desde su cuenta, que usa la misma ruta.
- Arreglos que salieron de ahí: la columna de criterios de las katas se quedaba
  en 100 px; los avisos de tipos se cortaban; "Últimos asaltos" enseñaba las
  comillas de código; las familias del temario salían sin tilde (ahora tienen
  nombre en `nombres.ts` y un test obliga a dárselo a las nuevas); nombres de
  navegación duplicados.

## Bloqueos (dependen de Eudys)

- **Latido de Supabase:** la migración `20260929120000_latido.sql` no se aplicó
  porque el proyecto seguía pausado al hacer push. Commit vacío para disparar la
  integración, añadir los secretos `SUPABASE_URL` y `SUPABASE_PUBLISHABLE_KEY` y
  relanzar el workflow.

## Pendiente de palpa (decidir con el despliegue)

Vista previa social (og:title, og:image), 404 de verdad para rutas
desconocidas (hoy el proxy redirige a /entrar), privacidad y aviso legal,
robots.txt, sitemap, canonical y JSON-LD. Sospechoso sin confirmar: palpa con
sesión vio un error al pulsar "Empezar"; a mano funciona. Probablemente palpa
comparte el token de refresco entre pestañas y Supabase revoca la sesión.

## Pendiente general (lista de Eudys, en orden)

1. ~~Commitear~~ (Eudys, a cada tanda).
2. ~~Palpa, axe y capturas con sesión~~ hecho.
3. ~~Probar corrección con IA, kata, Revisión, Diseño y STAR~~ hecho salvo el
   botón desde la cuenta de Eudys.
4. ~~Botón "esta pregunta está mal"~~ hecho.
5. ~~Landing que explique la app~~ hecho con "Cómo funciona".
6. ~~Modo Tipo test~~ en marcha: código, esquema, tests de coherencia, demo y portada.
   Primera tanda de 41 preguntas con opciones (junior y mid, siete pistas), para
   revisar por PR. Quedan 137 candidatas para tandas siguientes (IA, Next.js,
   DevOps, Arquitectura y el resto de JavaScript y Fundamentos).
7. Resumen de una frase y repaso relámpago.
8. Research: pistas graduales, ronda sin tema, criterio de mentor, salvar la racha.
9. Pista de IA 2026 y buenas prácticas de vibe coding.
10. Sanear y ampliar el banco por PR. **Lo primero:** las 23 katas tienen en su
    rúbrica criterios de "Explica…"/"Menciona…", pero las katas se corrigen solo
    por el código: esos criterios no se pueden cumplir y bajan la nota.
