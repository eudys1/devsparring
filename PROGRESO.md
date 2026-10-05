# Progreso

Estado de las tareas largas, para retomar sin depender de la conversación.
Se actualiza al cerrar cada paso.

## Hecho el 29-09-2026

Commits de Eudys: `f2e232d` (rediseño, palpa, aviso de preguntas mal, latido),
`cee8ca6` (Tipo test y primera tanda), `01db915` (rúbricas de kata, research,
repaso relámpago).

Tercera tanda (sin commit todavía: lo hace Eudys). Detalle y porqués en
`docs/decisiones.md`, sección "29-09-2026 (tarde)".

- **Tipo test completo:** 178 preguntas con opciones (tandas de 36, 41 y 60).
- **Resúmenes:** 90 preguntas de Explicar con `resumen` para el repaso relámpago.
- **35 preguntas situadas** en vez de "¿Qué es X?", con la versión subida.
- **Pista de IA:** familia "Programar con agentes", 8 preguntas **en borrador**.
- **404 real, SEO y legal:** robots, sitemap, canonical, JSON-LD, imagen para
  compartir, noindex tras la sesión, privacidad y aviso legal.
- **Monaco en local** y **corrección en streaming** (deuda 1, 7 y 9).
- **Catálogo de skills:** el paquete de vídeo duplicado sale a
  `~/.claude/skills-archivo`.

Verificación de esta tanda: `pnpm verify`, `pnpm test:e2e` (con sesión),
`pnpm detector` y palpa. El resultado exacto va en el mensaje de cierre.

## Bloqueos (dependen de Eudys)

- **Revisar las 8 preguntas en borrador** de `contenido/pistas/ia/programar-con-agentes.json`
  y pasar a `publicada` las que valgan.
- **Aviso legal y privacidad:** el contacto es el canal de incidencias del
  repositorio. Decidir si se pone un correo y el nombre completo
  (`TITULAR` en `src/lib/sitio.ts`); para ejercer derechos de datos, un canal
  público no es lo ideal.
- **Supabase, URL de producción:** comprobar en el panel (Authentication → URL
  Configuration) que el Site URL es `https://devsparring.vercel.app` y que
  `https://devsparring.vercel.app/auth/confirmar` está en las redirecciones.
  `supabase/config.toml` ya la lista, pero la integración de GitHub aplica
  migraciones, no la configuración de auth.
- **Tipos de Supabase:** `npx supabase login` con la cuenta dueña y luego
  `pnpm tipos:supabase`. Después, pasar `<Database>` a los clientes y quitar
  los tipos a mano.
- **Borrar una cuenta:** la privacidad dice que se puede pedir y que se borra
  todo (las tablas tienen `on delete cascade`), pero hoy se hace a mano desde el
  panel de Supabase. Si se abre a más gente, merece un botón en Cuenta.

## Pendiente

- Calibrar FSRS cuando haya unos 1000 repasos (`docs/arquitectura.md`, deuda 2).
- Candidata a Tipo test propuesta y sin respuesta: `js-tipos-coercion-kata-suma`.
- Primer barrido (05-10-2026): PR #1 sin hallazgos y bien argumentada; el run
  salió en rojo solo por pasarse de turnos (50 de 40). Arreglado: tope 80,
  comandos de solo lectura permitidos, acciones a v5 y la fecha pasa a ser una
  etiqueta de git (sin hallazgos ya no hay PR). Para Eudys: cerrar la PR #1 sin
  fusionar, borrar su rama y crear una vez la etiqueta `barrido-2026-10-05`.
