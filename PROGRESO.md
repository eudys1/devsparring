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
"14-10-2026". La migración `20261014090000_niveles_stack_latido.sql` ya está en producción:
la aplicó el workflow `migraciones-supabase.yml`, que desde el 14-10-2026 aplica
cada migración nueva con el push a `main`. Las URL de auth de Supabase ya están
puestas en el panel.

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

## Hecho el 15-10-2026

- **Historial** (`/historial`): cada sesión terminada con su informe, enlazado
  desde el carril, Inicio y el propio informe.
- **Lenguaje llano:** regla en `contenido/esquema.md` (la sigue el barrido) y en
  el prompt de corrección; las 23 explicaciones de kata reescritas.
- **Publicadas** las 8 preguntas de "Programar con agentes".
- **Borrar la cuenta** desde Cuenta, con la función `borrar_mi_cuenta()`
  (migración `20261015090000`, sale con el push).
- **Tipos de Supabase:** el workflow de migraciones los regenera y abre una PR
  si cambian.
- Palpa: icono para la pantalla de inicio, texto de 14 px en móvil, canonical
  en `/entrar`.

## Hecho el 16-10-2026

- **Banco entero en lenguaje llano:** 306 preguntas reescritas (pregunta,
  respuesta, resumen y enunciado del Tipo test) con la regla de
  `contenido/esquema.md`; versión subida en cada una. Sin tocar: la rúbrica
  (la usa la corrección), las opciones del Tipo test, .NET y "Programar con
  agentes" (ya estaban en ese tono), Comportamental (ya conversacional) y la
  familia "En inglés" (responde en inglés a propósito).
- **Arreglado el editor de katas:** la segunda kata enseñaba el código de la
  primera porque Monaco guardaba el código con un nombre de fichero fijo. Ahora
  cada kata de cada sesión tiene el suyo; un e2e lo comprueba y falla sin el
  arreglo.

## Bloqueos (dependen de Eudys)

- **Aviso legal y privacidad:** el contacto es el canal de incidencias del
  repositorio. Decidir si se pone un correo y el nombre completo
  (`TITULAR` en `src/lib/sitio.ts`); para ejercer derechos de datos, un canal
  público no es lo ideal.
- **Revisar las 13 preguntas de .NET** (`contenido/pistas/dotnet/`): entran
  publicadas con fuentes leídas, como decidimos el 14-09; se revisan usándolas.

## Pendiente

- Cuando llegue la primera PR de tipos de Supabase: fusionarla y pasar
  `<Database>` a los clientes, quitando los tipos escritos a mano en cada `db.ts`.

- Calibrar FSRS cuando haya unos 1000 repasos (`docs/arquitectura.md`, deuda 2).
- Candidata a Tipo test propuesta y sin respuesta: `js-tipos-coercion-kata-suma`.
- Primer barrido (05-10-2026): PR #1 sin hallazgos y bien argumentada; el run
  salió en rojo solo por pasarse de turnos (50 de 40). Arreglado: tope 80,
  comandos de solo lectura permitidos, acciones a v5, y el barrido pasa a ser
  mensual (día 1) y sin estado: sin hallazgos no hay PR. La PR #1 está cerrada,
  su rama y la etiqueta provisional, borradas.
