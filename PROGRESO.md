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

## Hecho el 14-10-2026: lista grande de Eudys

Sin commit todavía (lo hace Eudys). Porqués en `docs/decisiones.md`, sección
"14-10-2026". **Antes de probar en producción, la migración
`20261014090000_niveles_stack_latido.sql` tiene que estar aplicada** (sale
sola con el push a `main`): sin ella fallan guardar el perfil con stack, las
sesiones de nivel intermedio y el latido.

1. ~~Espacios y anchos~~: `--ancho-contenido` (88rem) y la clase `.pagina`.
2. ~~Campos con React Aria~~, ver/ocultar contraseña, zod compartido.
3. ~~Entrar y crear cuenta~~ como formularios normales, con recuperar contraseña.
4. ~~"Hoy" pasa a "Inicio"~~; todas las sesiones a medias.
5. ~~Cinco niveles~~.
6. ~~Cuenta~~: carril sin repetir, borrar datos con confirmación, tu stack.
7. ~~Informe~~ al terminar una sesión y la demo.
8. ~~Repaso relámpago~~ con la pregunta en la tarjeta.
9. ~~Katas con solución en código~~ (23, comprobadas por test).
10. ~~Revisión de código~~: 7 preguntas reescritas con uno o dos fallos.
11. ~~Pista .NET~~: 13 preguntas publicadas (C#, ASP.NET Core, EF Core).
12. ~~Animaciones~~: entrada en cascada, barras que crecen, tarjetas que se
    levantan sin prometer clic, flecha que avanza, el acierto que se estampa.

Verificación: `pnpm verify` (246 tests), `pnpm test:e2e` (18, con sesión),
capturas revisadas y palpa (un HIGH falso: la ronda de la portada cambia sola).

## Bloqueos (dependen de Eudys)

- **Revisar las 8 preguntas en borrador** de `contenido/pistas/ia/programar-con-agentes.json`
  y pasar a `publicada` las que valgan.
- **Aviso legal y privacidad:** el contacto es el canal de incidencias del
  repositorio. Decidir si se pone un correo y el nombre completo
  (`TITULAR` en `src/lib/sitio.ts`); para ejercer derechos de datos, un canal
  público no es lo ideal.
- **Revisar las 13 preguntas de .NET** (`contenido/pistas/dotnet/`): entran
  publicadas con fuentes leídas, como decidimos el 14-09; se revisan usándolas.
- **Supabase, URL de producción:** comprobar en el panel (Authentication → URL
  Configuration) que el Site URL es `https://devsparring.vercel.app` y que
  `https://devsparring.vercel.app/auth/confirmar` y `/auth/recuperar` están en las
  redirecciones (la segunda es nueva: recuperar contraseña).
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
  comandos de solo lectura permitidos, acciones a v5, y el barrido pasa a ser
  mensual (día 1) y sin estado: sin hallazgos no hay PR. La PR #1 está cerrada,
  su rama y la etiqueta provisional, borradas.
