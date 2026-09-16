# Arquitectura de Devsparring

Decisiones técnicas, sus porqués, lo descartado y la deuda. Fuente de cada
decisión: `docs/research/tecnologia-y-arquitectura.md` (verificado 14-09-2026)
salvo que se indique otra. Lo de producto está en `docs/decisiones.md`.

## Resumen en diez líneas

1. Next.js 16.3 (App Router, Turbopack, React 19.2), TypeScript estricto, pnpm, Node 22+.
2. Estructura híbrida: `app/` solo enruta; el código vive en `src/features/*` por
   funcionalidad; núcleo puro solo donde hay reglas testeables (SRS, rúbrica, runner).
3. El banco de preguntas vive en el repositorio como ficheros JSON validados con
   zod, no en la base de datos. Se revisa por pull request.
4. Supabase (auth + Postgres + RLS) guarda solo datos de usuario: sesiones,
   respuestas, estado de repaso, registro de entrevistas reales.
5. Editor Monaco cargado en cliente; el código del usuario corre en un Web Worker
   nuevo por ejecución, con `terminate()` a los 3 s y runner de asserts propio.
6. Corrección con la API de Claude (`claude-sonnet-5`), salida estructurada con un
   único schema estable, prompt caching, rúbrica explícita por nivel.
7. La clave de API del usuario vive solo en su navegador y viaja en cada petición;
   el servidor la usa y la tira. La del dueño va en variable de entorno.
8. Repetición espaciada con FSRS (`ts-fsrs`), nota derivada de la corrección con
   suelo `Hard` si fallan tests; se guarda la puntuación cruda y la versión de rúbrica.
9. Tests: Vitest en modo Node para la lógica pura (80 %), jsdom para pocos
   componentes, Playwright en Chromium contra el build de producción.
10. Barrido de preguntas: GitHub Actions semanal con puerta de 21 días, Claude
    Code con token de suscripción, salida siempre como pull request.

## Por qué no la estructura por capas de Dossicar y banco-ideas

Eudys pidió pensarla desde cero. La estructura `core / application /
infrastructure / ui` paga cuando hay muchas reglas de negocio que deben
sobrevivir a cambios de framework o de base de datos. En Devsparring las reglas
puras son tres y pequeñas: el planificador de repaso, el mapeo de rúbrica a nota
y el runner de tests. Todo lo demás es entrada y salida contra Supabase y
Anthropic, y ahí una capa de repositorios con mapeadores es coste sin retorno
para un desarrollador solo. Además, el RLS de Supabase es parte de las reglas,
no un detalle de infraestructura que convenga abstraer.

Lo que sí se conserva de aquel patrón: las reglas puras no importan framework,
red ni base de datos y tienen los tests; los casos de uso devuelven códigos
estables y la pantalla redacta la frase; configuración validada con zod y
fail-fast; ninguna ruta que llame a APIs externas sin sesión.

Referencias: documentación oficial "project structure" de Next 16.3 y
bulletproof-react (regla unidireccional, sin imports cruzados entre features,
sin barrel files).

## Estructura de carpetas

```
devsparring/
  contenido/                 # banco de preguntas, fuente de verdad, revisado por PR
    pistas/                  # una carpeta por pista (fundamentos, javascript, ...)
      <pista>/<familia>.json
    esquema.md               # explicación humana del formato
  src/
    app/                     # solo enrutado: layouts, page.tsx finos, route handlers
      (publico)/             # landing, login
      (app)/                 # todo lo autenticado
        hoy/                 # la sesión del día
        practicar/           # configurar sesión; [sesionId]/ es el motor (6 modos)
        pistas/              # catálogo y progreso por pista
        entrevistas/         # registro de entrevistas reales
        cuenta/              # perfil, clave de API, idioma
      api/correccion/route.ts
    features/
      preguntas/             # carga y validación del banco (zod), filtros, tipos
      sesion/                # componer una sesión, avanzar, guardar respuestas
      editor/                # Monaco, worker de ejecución, runner de asserts
      correccion/            # prompt, schema de salida, parseo, mapeo a nota, copiar prompt
      srs/                   # scheduler.ts puro (ts-fsrs) + tests
      cuenta/                # clave de API en navegador, preferencias
      entrevistas/           # registro de entrevistas reales
    components/              # Concha, Marca, Tema, Revelar; ui/: botón, campo, dato, markdown
    lib/                     # supabase/server.ts, supabase/client.ts, anthropic.ts, config.ts
    testing/                 # fixtures y mocks
  supabase/
    migrations/AAAAMMDDHHMMSS_asunto.sql
  scripts/                   # validar-contenido, revisar, detector-diseno, capturas
  e2e/                       # Playwright
  .github/workflows/         # ci.yml, barrido-preguntas.yml
  .claude/skills/barrido-preguntas/SKILL.md
  docs/
```

Reglas de dependencia, aplicadas con ESLint (`import/no-restricted-paths`):
`app` puede importar de `features`, `components`, `lib`; `features` puede
importar de `components`, `lib` y de sí misma, nunca de otra feature ni de
`app`; `lib` y `components` no importan de `features`. Sin ficheros índice.

## El banco de preguntas

Vive en `contenido/` como JSON porque así lo revisa una persona por pull
request, tiene historial en git, el barrido automático lo edita como texto, y la
app lo carga sin base de datos. Con unas centenas de preguntas se carga entero en
memoria en el servidor y se filtra ahí. Si algún día crece a miles, se vuelca a
una tabla catálogo con ETL; el esquema ya lo permite.

Cada pregunta (esquema zod en `src/features/preguntas/esquema.ts`):

| Campo                              | Qué es                                                                                                          |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `id`                               | slug estable, nunca cambia (`js-closures-01`)                                                                   |
| `version`                          | entero; sube al cambiar texto o rúbrica                                                                         |
| `pista`, `familia`                 | clasificación de dos niveles                                                                                    |
| `tipo`                             | `definicion` · `fundamento` · `razonamiento` · `kata` · `review` · `diseno` · `comportamental`                  |
| `modos`                            | en qué modos puede aparecer (`flash`, `verbal`, `kata`, `review`, `diseno`, `star`)                             |
| `nivelMinimo`                      | `junior` · `mid` · `senior`                                                                                     |
| `frecuencia`                       | `alta` · `media` · `baja`                                                                                       |
| `texto.es`, `texto.en`             | la pregunta; el inglés es "así se preguntaría"                                                                  |
| `contexto`                         | markdown opcional (fragmento de código, escenario)                                                              |
| `rubrica.junior`, `rubrica.senior` | listas de criterios observables                                                                                 |
| `respuestaModelo`                  | markdown con lo que dice una respuesta que aprueba                                                              |
| `kata`                             | solo `tipo: kata`: `codigoInicial`, `tests` (casos `{nombre, entrada, esperado}` o código de test), `tiempoMin` |
| `fuentes`                          | lista de `{url, fecha, tipo: leida                                                                              | resumen}` |
| `origen`                           | `curada` · `generada-revisada` · `entrevista-real`                                                              |
| `estado`                           | `borrador` · `publicada` · `obsoleta` (con `motivo`)                                                            |

Transparencia: la interfaz muestra `origen` y las fuentes de cada pregunta
(lección de OpositaTest en `docs/research/competencia-features.md`).

## Datos de usuario en Supabase

Eje `user_id` directo, sin `accounts`: Devsparring no tiene equipos. Si aparecen
(una academia que compra plazas), se añade la capa entonces. RLS en todas las
tablas con `user_id = auth.uid()`.

- `perfiles`: rol objetivo, nivel por defecto, idioma, usuario dueño (flag).
- `sesiones`: modo, nivel, idioma, pista, inicio, fin.
- `respuestas`: sesión, pregunta (`id` + `version`), texto o código, resultado de
  tests, corrección completa (JSON del schema), puntuación, modelo, versión de
  rúbrica, duración.
- `tarjetas`: estado FSRS por (usuario, pregunta): `due`, `stability`,
  `difficulty`, `reps`, `lapses`, `state`, `last_review`.
- `repasos`: log de cada revisión: nota FSRS, puntuación cruda, versión de
  rúbrica, modelo, `elapsed_days`. Permite recalcular si cambia el mapeo.
- `entrevistas`: registro de entrevistas reales del usuario: empresa, rol, nivel,
  fecha, preguntas que le hicieron, notas. Es el dato más valioso del producto.

La clave de API **no** tiene tabla en el MVP. Opción futura: Supabase Vault
como opt-in explícito (nunca pgsodium; Supabase lo deprecará).

Migraciones con nombre `AAAAMMDDHHMMSS_asunto.sql` en `supabase/migrations/`,
aplicadas por la integración de GitHub de Supabase en cada push a `main`
(decisión de Eudys del 15-09-2026: "push y aplicado"). A mano: `npx supabase
link` y `npx supabase db push`. `supabase/config.toml` guarda la configuración
como código. Un SQL roto en `main` rompe producción sin pasar por nadie: las
migraciones se prueban antes en una rama y se revisan en la PR. No hay Docker
en la máquina, así que no hay Supabase local.

## Editor y ejecución de código

- `@monaco-editor/react` con `next/dynamic` y `ssr: false`, solo en la ruta de
  práctica. TypeScript con diagnósticos en el worker de Monaco, y transpilación
  con `getEmitOutput` del mismo worker (sin esbuild-wasm ni sucrase).
- Ejecución en Web Worker creado desde un blob por cada ejecución;
  `terminate()` a los 3 s; tope de 200 líneas de consola; `Math.random` y
  `Date.now` congelables cuando el ejercicio lo pida.
- Runner propio con `toBe`, `toEqual` (deep equal que trata `NaN`, `-0`, `Map`,
  `Set` y orden de claves) y `toThrow`. Es la pieza con más bugs latentes:
  tests unitarios exhaustivos.
- Riesgo abierto: Monaco con Turbopack. Se hace un spike de un día antes de
  escribir nada más del editor. Plan B: CodeMirror 6 + sucrase con diagnósticos
  más pobres.
- Móvil: Monaco es mediocre en pantalla pequeña. Los modos de texto funcionan
  bien en móvil; el modo kata avisa de que va mejor en escritorio.

## Corrección con IA

- Route handler `POST /api/correccion`, exige sesión, `force-dynamic`,
  rate limit por usuario, valida el formato `sk-ant-` antes de llamar.
- Cliente de Anthropic **por petición** con la clave que llega en el body; nunca
  un cliente global. Nunca se escribe la clave en base de datos, disco ni logs.
  Función `sanitize()` con test que falla si alguien añade un campo sin redactar.
- Modelo por defecto `claude-sonnet-5` (precio confirmado 2 $/10 $ por millón de
  tokens el 14-09-2026); `claude-opus-5` como opción "corrección exhaustiva".
  No Haiku 4.5 (retirada anunciada) ni Fable (coste y perfil agéntico).
- Salida estructurada con `output_config.format` y un único schema estable:
  `puntuacion` (enum 0..10), `dimensiones` (`correccion`, `complejidad`,
  `comunicacion`, enum 0..5), `aciertos[]`, `fallos[]`, `siguiente_paso`.
  El schema no admite `minimum`/`maximum`: se valida con zod después.
- Orden del prompt para cachear: sistema + rúbrica primero, respuesta del
  usuario al final. `thinking` adaptativo, esfuerzo medio, streaming.
- Modo gratuito: "Copiar para corregir" genera el mismo prompt (pregunta,
  rúbrica del nivel, respuesta, resultado de tests) para pegar en cualquier chat.
- Límites legales (doc de Anthropic, leída 14-09-2026): cada usuario final debe
  usar su propia clave; el dueño solo puede usar la suya para su cuenta; jamás
  "inicia sesión con tu cuenta de Claude". Ofrecer corrección incluida en una
  suscripción propia exigiría hablar con Anthropic antes.

## Repetición espaciada

`ts-fsrs` (MIT, sin dependencias) en `src/features/srs/scheduler.ts`, función
pura con tests. Parámetros: `request_retention` 0,85, `maximum_interval` 180
días, `learning_steps` vacío, `enable_fuzz` activado; sin optimizar pesos por
usuario. Nota derivada de la corrección: 0-3 `Again`, 4-6 `Hard`, 7-8 `Good`,
9-10 `Easy` (hipótesis de producto, a calibrar). Si fallan tests automáticos, el
techo es `Hard`. El usuario puede corregir la nota propuesta. Se guarda siempre
la puntuación cruda, la versión de rúbrica y el modelo.

## Voz

Escalón 0 (MVP): el modo "explica en voz alta" funciona con temporizador y un
cuadro de texto; el usuario habla de verdad y luego escribe lo esencial.
Escalón 1: botón de micrófono con Web Speech API si el navegador la tiene,
texto editable antes de enviar, aviso de que el audio puede salir al fabricante
del navegador. Escalón 2 (solo con demanda): Whisper local vía transformers.js.
Nunca APIs de voz de pago.

## Testing y verificación

Cadena obligatoria, en orden: `pnpm format && pnpm lint && pnpm typecheck &&
pnpm test && pnpm build`, más `pnpm test:e2e` antes de dar por cerrada una
pantalla. Vitest con dos proyectos (node y jsdom). Playwright solo Chromium,
contra `next build` + `next start`. Tres proyectos de Playwright: `chromium` (las
pantallas públicas), `sesion` (un paso que entra una vez con la cuenta de pruebas
`E2E_EMAIL` / `E2E_PASSWORD` de `.env.local`, la crea si no existe y guarda las
cookies) y `app` (Hoy, Temario, una sesión entera, Cuenta y Entrevistas con esas
cookies, dejando capturas en `capturas/app-*.png`). Sin esas variables los tests
con sesión se saltan, que es lo que pasa en CI. Lección del 17-09-2026: cinco tests
entrando a la vez disparan el límite de intentos de Supabase; por eso se entra una
sola vez. No se testean Server Components async con Vitest.

## Skills de diseño (decisión, 14-09-2026)

Manda el listón de `C:\dev\CLAUDE.md`. Sobre él:

- Bajo demanda, copiadas como ficheros: `critique`, `audit` y `polish` de
  impeccable (Apache-2.0), **sin hooks ni binario**.
- Bajo demanda cuando haya movimiento: `animate` y `review-animations` de
  emilkowalski/skills.
- Descartada `taste-skill`: sus reglas útiles ya están en el listón de dev y su
  estética audaz choca con una interfaz que lleva un editor dentro.
- Sin skill de Next.js: `next dev` mantiene un `AGENTS.md` con los docs de la
  versión instalada.
  Antes de instalar cualquiera se comprueba fecha de último commit e issues.

## Barrido de preguntas

Workflow `barrido-preguntas.yml`: cron `17 6 * * 1` con puerta de 21 días en
`.github/last-question-sweep`, `workflow_dispatch`, `claude-code-action@v1` con
`CLAUDE_CODE_OAUTH_TOKEN`, prompt en `.claude/skills/barrido-preguntas/SKILL.md`,
`--max-turns 40`, timeout 30 min. Fuentes: Hacker News API, GitHub API sobre repos
de preguntas, RSS de blogs oficiales (Next, TypeScript, React, Supabase). Reglas:
detectar y proponer, no copiar texto; cada hallazgo con enlace y fecha; nunca
auto-merge. Excluidos LinkedIn y Glassdoor por sus condiciones.

## Descartado, con motivo

- Clean/hexagonal global: coste sin retorno a este tamaño.
- CodeMirror 6: su integración de TypeScript está archivada desde 2025.
- iframe como sandbox: comparte hilo; un bucle infinito congela la app.
- SM-2: FSRS es mejor con evidencia y no cuesta más.
- pgsodium / cifrado transparente de columna: Supabase lo desaconseja por escrito.
- Batch API para corregir en vivo: el usuario esperaría.
- APIs de voz de pago: rompen el presupuesto mínimo.
- Copiloto para usar durante entrevistas reales: es trampa y daña la reputación.
- Ligas, vidas y notificaciones de culpa: público adulto y ya ansioso.

## Deuda y riesgos abiertos (por lo que más duele)

1. Spike Monaco + Turbopack: **resuelto el 14-09-2026**. `@monaco-editor/react`
   4.7.0 con `next/dynamic` compila con `next build` (Turbopack) y renderiza con
   resaltado en el build de producción de Next 16.3.5. Monaco se carga desde el
   CDN del loader por defecto; si algún día hace falta servirlo en local, se
   configura `loader.config({ paths })`.
2. Mapeo puntuación → nota FSRS sin datos reales.
3. Sin acceso automatizable a Reddit ni Glassdoor: las experiencias en español
   se recogen a mano y con el registro de entrevistas del usuario.
4. Sin datos agregados de cómo son las entrevistas en España; hipótesis de
   formato clásico con retraso frente a EE. UU.
5. Voz depende del navegador; Firefox sin soporte.
6. Tipos de Supabase escritos a mano en cada `db.ts` (sin generar desde el
   esquema). Cuando el esquema se estabilice, generar tipos con la CLI.
7. La corrección no hace streaming: el usuario espera unos segundos con un
   estado de carga. Añadir streaming si la espera molesta.
8. Las pantallas autenticadas no se han revisado visualmente contra un
   Supabase real: el bucle de capturas cubre landing, entrar y demo.
9. El modo kata usa el worker de Monaco para transpilar; si Monaco no carga
   (sin red al CDN), el modo kata no funciona. Servirlo en local es una línea de
   configuración del loader.

## Diseño y bucle de revisión (15-09-2026)

La dirección de diseño vive en `docs/diseno.md` (metáfora de la tarjeta del
juez, un acento, tipografía, movimiento y accesibilidad). Se sostiene con dos
piezas automáticas, no con buena voluntad:

- `scripts/detector-diseno.mjs` comprueba mecánicamente el listón de
  `C:\dev\CLAUDE.md`: fuentes vetadas, colores fuera de los tokens,
  `transition: all`, eases con rebote, botones sin estado de pulsación, `100vh`,
  emojis como iconos, titulares con degradado, `outline: none` sin foco visible,
  oyentes de scroll y más. Sale con error si hay P0 o P1.
- `scripts/revisar.mjs` encadena formato, lint, tipos, tests, validación del
  contenido, build, detector y capturas, y resume en una tabla qué pasó y qué no.

Las capturas se toman con Playwright en escritorio y móvil, en claro y oscuro,
con el reloj fijado. El panel del navegador integrado no sirve para capturar
tras hacer scroll.

Los ganchos de prueba son `data-prueba` (configurado en `playwright.config.ts` y
en el script de capturas). El texto de los botones cambia con el diseño; los
ganchos no.

### Coherencia del banco

`src/features/preguntas/coherencia.test.ts` protege el contenido: ids y
prefijos, español distinto del inglés, sin guion largo, rúbricas bien formadas,
katas ejecutables (función exportada, casos serializables y con la misma
aridad), fuentes con fecha no futura, casi duplicados y, sobre todo, cobertura:
cada combinación de modo y nivel que la interfaz ofrece tiene preguntas. El
informe de cobertura se regenera en `contenido/COBERTURA.md` en cada pasada (fuera
de git: es un artefacto, no fuente).

La pantalla de nueva sesión usa `disponibilidad()` para no ofrecer nunca una
combinación vacía: antes se podía elegir un modo y una pista sin preguntas en
común y empezar una sesión de cero asaltos.
