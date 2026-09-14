# Devsparring: research de tecnologia y arquitectura

- Fecha de la investigacion: 14 de septiembre de 2026
- Contexto: app web Next.js + TypeScript + Supabase para entrenar entrevistas tecnicas. Editor de codigo en navegador (JS/TS), correccion por IA (API de Claude), repeticion espaciada, workflow periodico en GitHub Actions.
- Restricciones: desarrollador unico, presupuesto minimo.
- Convencion: cada afirmacion lleva enlace y fecha de verificacion. Lo que no se ha leido directamente se marca "(resumen de busqueda, no leido)". Las hipotesis se marcan "hipotesis, no confirmado".

> ESTADO: completo. Nueve secciones, cada una con veredicto y evidencia, mas "Incertidumbres" y "Fuentes" al final.

### Resumen de veredictos

| # | Tema | Veredicto |
|---|---|---|
| 1 | Next.js | `next@16.3.x`, React 19.2+, Node 22.12+. Hibrido `app/` fino + vertical slices, con nucleo puro solo en `srs` y `correccion`. Sin capa clean/hexagonal global, sin barrel files, regla unidireccional con ESLint |
| 2 | Editor | Monaco via `@monaco-editor/react` con `dynamic(..., {ssr:false})`; TS diagnostics y transpilacion con su propio worker; ejecucion en Web Worker nuevo por run con `terminate()` a los 3 s; runner de asserts propio |
| 3 | SRS | FSRS con `ts-fsrs@5.x` (MIT, sin dependencias). Defaults salvo `request_retention` 0,85, `maximum_interval` 180 dias, `learning_steps` vacio, `enable_fuzz` true |
| 4 | Supabase y claves | `@supabase/ssr` con `getAll`/`setAll` y `getClaims()`; claves publishable/secret nuevas; RLS en todo. La clave de Anthropic vive **solo en el navegador** por defecto, Vault como opt-in, pgsodium nunca |
| 5 | API de Claude | `claude-sonnet-5` ($2/$10, precio definitivo) con `output_config.format` y prompt caching automatico. Opus 5 como toggle de calidad. No Haiku 4.5 (retirada anunciada), no Fable 5.1 |
| 6 | Voz | Texto primero, Web Speech API como mejora progresiva, Whisper local solo si hay demanda. Sin APIs de pago |
| 7 | Skills de diseno | `frontend-design` oficial + `web-design-guidelines` de Vercel + partes de impeccable **sin hooks ni binario**. Descartar taste-skill completa |
| 8 | Workflow | Cron semanal con puerta de 21 dias, `claude-code-action@v1` con `CLAUDE_CODE_OAUTH_TOKEN`, PR siempre revisado. Fuentes: HN API + GitHub API + RSS; Reddit opcional; LinkedIn y Glassdoor fuera |
| 9 | Testing | Vitest 5 en modo Node para la logica pura (80% de los tests), jsdom para pocos Client Components, Playwright 1.63 contra build de produccion para todo lo demas, incluido el helper `instant()` |

## 1. Next.js: version estable y estructura de proyecto

### 1.1 Version estable hoy (verificado 14-sep-2026)

- **Next.js 16.3** es la linea estable. El post de release esta fechado el **3 de agosto de 2026** ([nextjs.org/blog/next-16-3](https://nextjs.org/blog/next-16-3), leido 14-sep-2026).
- Los parches posteriores son **16.3.3** (security release del 25-ago-2026, junto con 15.5.24) segun el indice del blog ([nextjs.org/blog](https://nextjs.org/blog), leido 14-sep-2026). La pagina de docs "project structure" declara `version: 16.3.5` con `lastUpdated: 2026-07-21`, asi que en la practica el parche vigente al escribir esto es **16.3.5** ([nextjs.org/docs/app/getting-started/project-structure](https://nextjs.org/docs/app/getting-started/project-structure), leido 14-sep-2026).
- Existe un **programa formal de security releases** desde el 13-jul-2026, con avisos previos ("Upcoming Next.js August Security Release", 20-ago-2026). Relevante: conviene suscribirse y no quedarse en una minor vieja (resumen del indice del blog, leido 14-sep-2026).

Veredicto de version: **empezar en `next@16.3.x` con React 19.2+ y Node.js 20.9+ minimo**. Es greenfield, no hay coste de migracion.

### 1.2 Cambios de 2025-2026 que afectan a Devsparring

Fuente principal: [nextjs.org/blog/next-16](https://nextjs.org/blog/next-16) (21-oct-2025) y [nextjs.org/blog/next-16-3](https://nextjs.org/blog/next-16-3) (3-ago-2026), ambos leidos 14-sep-2026.

**Caching (el cambio conceptual mas grande).**
- Next.js 16 introduce **Cache Components** con la directiva `"use cache"`. El caching pasa a ser **opt-in explicito**: "All dynamic code in any page, layout, or API route is executed at request time by default". Se activa con `cacheComponents: true` en `next.config.ts`.
- `experimental.ppr` y `export const experimental_ppr` **fueron eliminados**; PPR se absorbe en Cache Components. `experimental.dynamicIO` se renombro a `cacheComponents`.
- `revalidateTag(tag)` con un solo argumento esta **deprecado**: ahora pide un perfil `cacheLife` como segundo argumento (`revalidateTag('preguntas', 'max')`).
- Nuevas APIs solo para Server Actions: **`updateTag()`** (semantica read-your-writes, se ve el cambio en la misma request) y **`refresh()`** (refresca solo datos no cacheados).
- Implicacion para Devsparring: el banco de preguntas y los mazos son contenido con lectura muy repetida y escritura rara, buen candidato a `"use cache"` con tags por mazo. El progreso del usuario (SRS) es datos por usuario que no se deben cachear: se leen en request time. Cuando el usuario responde una tarjeta, la Server Action debe usar `updateTag()` y no `revalidateTag()`, porque hace falta ver el nuevo estado inmediatamente.

**Turbopack.**
- Estable y **bundler por defecto** desde Next 16; 2-5x builds mas rapidos, hasta 10x Fast Refresh. Escape hatch: `next dev --webpack` / `next build --webpack`.
- En 16.3, **disk caching y memory eviction activados por defecto**: hasta 90% menos RAM en `next dev` y builds repetidos mucho mas rapidos (5.5x en un caso de Vercel). Esto importa con presupuesto minimo: menos minutos de CI en GitHub Actions.

**TypeScript.**
- Next 16 exige **TypeScript >= 5.1**.
- Next 16.3 permite usar **TypeScript 7** (el port nativo, ~10x mas rapido) para el type check de `next build` con solo `pnpm add -D typescript@^7`. El blog de Next dice que TS 7 se publico "last month" respecto a agosto 2026 ([devblogs.microsoft.com/typescript/announcing-typescript-7-0/](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/), citado desde el blog de Next; la pagina de Microsoft no la he leido directamente, **(resumen de busqueda, no leido)**).

**React 19.x.**
- El App Router de Next 16 usa el canary de React con features de **React 19.2**: `ViewTransition`, `useEffectEvent()`, `<Activity/>`.
- `<Activity/>` es directamente util en Devsparring: permite mantener montado el editor de codigo (con su estado y el worker) mientras se muestra otra vista, en lugar de desmontarlo y recrear Monaco. **Hipotesis, no confirmado**: no he verificado que `<Activity/>` juegue bien con Monaco concretamente.
- **React Compiler**: soporte estable via `reactCompiler: true` (no activado por defecto). En 16.3 hay un port en Rust experimental (`experimental.turbopackRustReactCompiler`) que evita Babel y recorta 34-46% el tiempo hasta pagina lista en apps grandes.

**Breaking changes que hay que tener en la cabeza desde el dia 1** (de la tabla del post de Next 16):
- `params` y `searchParams` son **async**: `await params`.
- `cookies()`, `headers()`, `draftMode()` son **async**: `await cookies()`. Esto afecta directamente al patron de Supabase con `@supabase/ssr` (ver seccion 4).
- `middleware.ts` se renombra a **`proxy.ts`** (funcion exportada `proxy`, runtime Node.js). `middleware.ts` sigue existiendo para Edge pero esta deprecado y se eliminara.
- **`next lint` eliminado**: `next build` ya no hace lint. Hay que invocar ESLint (flat config) o Biome directamente. Codemod: `npx @next/codemod@canary next-lint-to-eslint-cli .`.
- `serverRuntimeConfig` y `publicRuntimeConfig` eliminados: solo variables de entorno.
- Defaults de `next/image` cambiados (`qualities` pasa a `[75]`, `minimumCacheTTL` a 4 horas, `images.domains` deprecado en favor de `remotePatterns`).
- Rutas paralelas exigen `default.js` explicito o el build falla.

**Cosas de 16.3 aprovechables en Devsparring.**
- **`catchError` de `next/error`**: error boundary personalizado que no interfiere con `notFound`/`redirect` y da un `retry()` que puede reintentar Server Components. Ideal para el panel de correccion por IA, que puede fallar por rate limit o clave invalida y debe ofrecer "reintentar".
- **Root params** (`import { lang } from 'next/root-params'`): si Devsparring tiene i18n con `[lang]`, evita prop drilling.
- **Helper `instant()` de `@next/playwright`**: test de Playwright que asegura que una navegacion sigue siendo instantanea. Barato de adoptar y protege la sensacion de la app (ver seccion 9).
- **`import.meta.glob`** nativo en Turbopack: util si el banco de preguntas se versiona como ficheros markdown/JSON en el repo en lugar de estar solo en Supabase. Da HMR sobre esos ficheros.
- **Instant Insights / Navigation Inspector** en DevTools: diagnostico gratis de navegaciones lentas.
- **AGENTS.md versionado**: `next dev` escribe y mantiene un bloque `AGENTS.md` apuntando a los docs de la version instalada en `node_modules`. Vercel dice que por eso **retiran sus Skills antiguas** ([github.com/vercel-labs/next-skills](https://github.com/vercel-labs/next-skills), mencionado en el post; repo no leido, **(resumen de busqueda, no leido)**). Relevante para el punto 7: no hace falta una skill de Next.js.

### 1.3 Estructura de proyecto: las tres opciones

**(a) Capas tipo clean/hexagonal** (`core` puro, `application`, `infrastructure`, `ui`).
- Nadie oficial lo recomienda para una app de este tamano. La documentacion de Next dice literalmente que **Next.js es "unopinionated"** sobre organizacion y ofrece tres ejemplos: ficheros fuera de `app`, ficheros en carpetas top-level dentro de `app`, y **split por feature o ruta**. Cierra con: "The simplest takeaway is to choose a strategy that works for you and your team and be consistent across the project" ([docs project-structure](https://nextjs.org/docs/app/getting-started/project-structure), leido 14-sep-2026).
- Coste real para un dev solo: mucho boilerplate de puertos/adapters y mapeo entre tipos de dominio y tipos de Supabase. El beneficio (cambiar de base de datos) es improbable en Devsparring.

**(b) Vertical slices / feature folders (bulletproof-react).**
- Repo: [github.com/alan2207/bulletproof-react](https://github.com/alan2207/bulletproof-react). Metadatos via GitHub API (leido 14-sep-2026): **35.835 estrellas, licencia MIT, 41 issues abiertas, no archivado, ultimo push 14-may-2026**. Sigue vivo pero con ritmo lento.
- Estructura que propone ([docs/project-structure.md](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md), leido 14-sep-2026): `src/app`, `assets`, `components`, `config`, `features`, `hooks`, `lib`, `stores`, `testing`, `types`, `utils`; y dentro de cada `src/features/<nombre>/` solo las subcarpetas necesarias (`api`, `components`, `hooks`, `stores`, `types`, `utils`).
- Reglas fuertes que si merecen copiarse:
  - **Codebase unidireccional**: "The code should flow in one direction, from shared parts of the code to the application (shared -> features -> app)".
  - **No importar entre features**: "It might not be a good idea to import across the features"; se componen en la capa de aplicacion.
  - **Contra los barrel files** (`index.ts` que reexporta): "can cause issues for Vite to do tree shaking and can lead to performance issues". Imports directos.
  - **Enforcement con ESLint** `import/no-restricted-paths`.

**(c) Hibrido** (lo que hace la mayoria de apps Next reales): `app/` solo para routing (route groups, layouts, `page.tsx` finos), `src/features/<feature>/` para la logica de cada vertical, y un nucleo de dominio muy pequeno y puro dentro de la feature que lo necesita, no como capa global.
- Robin Wieruch ([robinwieruch.de/react-folder-structure](https://www.robinwieruch.de/react-folder-structure/), articulo actualizado 5-may-2026, leido 14-sep-2026) describe una **progresion** de 8 etapas (fichero unico -> carpetas por componente -> carpetas tecnicas -> feature folders -> dominios -> packages -> monorepo) y dice explicitamente que para proyectos pequenos la carpeta por componente "is in my opinion the way to go". Es decir: escalar la estructura cuando duela, no antes.
- La busqueda tambien devuelve guias 2026 que empujan Feature-Sliced Design y "screaming architecture" ([profy.dev/article/react-folder-structure](https://profy.dev/article/react-folder-structure), [reacthandbook.dev/project-standards](https://reacthandbook.dev/project-standards), y articulos de Medium de 2026) con un consejo recurrente para dev solo: no dedicar mas de unos minutos a disenar la estructura definitiva **(resumen de busqueda, no leido)**.

### 1.4 Veredicto para Devsparring

**Hibrido (c), sesgado a vertical slices, con un nucleo de dominio minusculo y puro solo donde hay reglas testeables.**

Estructura concreta propuesta:

```
src/
  app/                        # solo routing: route groups, layouts, page.tsx finos, route handlers
    (marketing)/
    (app)/
      practicar/[sesionId]/
      mazos/
    api/
      correccion/route.ts     # llamada a Anthropic (ver seccion 4 y 5)
  features/
    preguntas/                # banco de preguntas: api/, components/, types/
    editor/                   # Monaco + worker de ejecucion + runner de tests
    correccion/               # prompt, rubrica, parseo de la salida estructurada
    srs/                      # repeticion espaciada
      scheduler.ts            # PURO: sin fetch, sin Supabase, sin React -> test unitario
      scheduler.test.ts
    sesion/
    cuenta/                   # gestion de la clave de API del usuario
  components/ui/              # primitivas compartidas
  lib/                        # clientes preconfigurados: supabase/server.ts, supabase/client.ts, anthropic.ts
  config/                     # env validado (zod), constantes
  testing/                    # helpers, fixtures, mocks de Supabase
  types/
```

Razones:
1. **Las reglas de negocio de Devsparring son pocas pero muy testeables**: el scheduler de repeticion espaciada y el parseo/validacion de la rubrica de correccion. Esas dos piezas se escriben como **funciones puras** (entra estado + grado, sale nuevo estado) dentro de su feature. Eso da el 90% del valor de clean architecture (tests rapidos, sin mocks, sin I/O) con el 5% del coste. No hace falta una capa `core/` global ni interfaces de repositorio.
2. **Todo lo demas es I/O contra Supabase y contra Anthropic**, y ahi la "inversion de dependencias" no compra nada: Supabase ya es el modelo de datos y el RLS es parte de las reglas de negocio, no un detalle de infraestructura que se pueda abstraer sin perder seguridad.
3. **`app/` fino** evita que el routing se convierta en el sitio donde vive la logica, que es el fallo tipico del App Router. Route groups `(marketing)` y `(app)` separan layouts publico y autenticado.
4. **Regla unidireccional y prohibicion de imports cruzados entre features** con `eslint-plugin-import` / `import/no-restricted-paths`, como manda bulletproof-react. Para un dev solo esto es lo que evita que en 6 meses todo dependa de todo.
5. **Sin barrel files**, tambien siguiendo bulletproof-react, y ademas porque con Turbopack los barrels perjudican el tree shaking y los tiempos de compilacion.

Lo que **descarto**: una capa `infrastructure/` con repositorios que envuelvan el cliente de Supabase, y mapeadores dominio<->DB. Con un solo desarrollador, presupuesto minimo y un dominio de este tamano, eso es coste puro. Si algun dia hace falta, extraer un repositorio desde una feature ya aislada es refactor mecanico.

## 2. Editor de codigo embebido y ejecucion de TS en el navegador

### 2.1 Estado de los dos candidatos (verificado 14-sep-2026)

| | Monaco | CodeMirror 6 |
|---|---|---|
| Version npm hoy | `monaco-editor@0.56.0` | `@codemirror/view@6.43.11` (paquetes independientes) |
| Licencia | MIT | MIT |
| Repo | [github.com/microsoft/monaco-editor](https://github.com/microsoft/monaco-editor): 46.735 estrellas, ultimo push **13-sep-2026**, **859 issues abiertas**, no archivado | [codemirror/dev](https://github.com/codemirror/dev): 7.818 estrellas, **archivado el 15-abr-2026 en GitHub**; 12 issues abiertas al archivar |
| Ultima release | v0.56.0 publicada **20-jul-2026** (incluye fixes de contraste WCAG 2 AA y el find widget no tabbable cuando esta oculto) | linea 6.x, activa |
| Tamano paquete npm sin comprimir | **97.911.464 bytes / 1.909 ficheros** (incluye todos los lenguajes y varios builds) | `@codemirror/view` 1.253.700 bytes; se instala solo lo que se usa |
| Wrapper React | `@monaco-editor/react@4.7.0`, MIT, 152.819 bytes, peer `react ^16.8 \|\| ^17 \|\| ^18 \|\| ^19`. Repo [suren-atoyan/monaco-react](https://github.com/suren-atoyan/monaco-react): 4.741 estrellas, ultimo push **20-abr-2026**, 22 issues abiertas | no hay wrapper oficial; se monta con `useEffect` sobre un div, o `@uiw/react-codemirror` (no verificado) |

Fuentes de los metadatos: GitHub API y registry.npmjs.org consultados el 14-sep-2026.

**Aviso importante sobre CodeMirror.** El repo de GitHub esta archivado y la home oficial dice literalmente: "It is being developed on [code.haverbeke.berlin](https://code.haverbeke.berlin/codemirror/dev)" ([codemirror.net](https://codemirror.net/), leido 14-sep-2026). Confirmado directamente en el Forgejo de Marijn Haverbeke: ultimo commit **16-abr-2026** ("Make CI badge smaller"), y un commit del 15-abr-2026 "Remove github links" ([code.haverbeke.berlin/codemirror/dev](https://code.haverbeke.berlin/codemirror/dev), leido 14-sep-2026). **No es abandono, es mudanza**, pero tiene consecuencias practicas: menos descubribilidad, issues y PRs fuera del flujo de GitHub, y herramientas tipo Dependabot/GitHub Advisories con menos senal. **Hipotesis, no confirmado**: no he verificado si los paquetes `@codemirror/*` siguen publicandose en npm con la misma cadencia despues de abril de 2026; `@codemirror/view` esta en 6.43.11 pero el registry no me devolvio la fecha de publicacion.

### 2.2 Soporte de TypeScript con diagnostics en cliente

**Monaco: viene de serie.** Monaco embebe el compilador de TypeScript en un web worker dedicado (`ts.worker`). El modelo es cliente-worker: adapters en el main thread implementan los providers de Monaco y hablan con un `TypeScriptWorker`. Se configura con `monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({...})` (opciones: `noSemanticValidation`, `noSyntaxValidation`, `noSuggestionDiagnostics`, `diagnosticCodesToIgnore`, `onlyVisible`) y se accede al worker con `monaco.languages.typescript.getTypeScriptWorker()`, que expone `getSemanticDiagnostics(uri)` y `getEmitOutput(uri)` ([microsoft.github.io/monaco-editor/typedoc/interfaces/languages.typescript.DiagnosticsOptions.html](https://microsoft.github.io/monaco-editor/typedoc/interfaces/languages.typescript.DiagnosticsOptions.html) y [deepwiki: TypeScript Language Services](https://deepwiki.com/microsoft/monaco-editor/3.2-typescript-language-services)) **(resumen de busqueda, no leido en detalle)**.
- Consecuencia clave para Devsparring: **con Monaco se obtienen diagnostics de TS y transpilacion con el mismo worker, sin anadir esbuild-wasm ni sucrase**. `getEmitOutput()` devuelve el JS ya emitido.

**CodeMirror 6: hay que montarlo a mano.** La opcion establecida es `@valtown/codemirror-ts` sobre `@typescript/vfs` (crea un entorno TS virtual en el navegador con `createDefaultMapFromCDN` + `createSystem` + `createVirtualTypeScriptEnvironment`) y `@codemirror/lint` para pintar los diagnostics.
- **Problema serio**: el repo [val-town/codemirror-ts](https://github.com/val-town/codemirror-ts) esta **archivado**, ultimo push **18-sep-2025**, 243 estrellas, licencia ISC (GitHub API, 14-sep-2026). La version en npm es 2.3.1, 209.107 bytes. Es decir: la mejor ruta CodeMirror+TS esta sin mantenimiento desde hace casi un ano.
- Alternativa mas nueva: `lsp-client` de CodeMirror con tsserver parcheado en web workers, presentado en el foro oficial ([discuss.codemirror.net](https://discuss.codemirror.net/t/show-and-tell-codemirror-lsp-client-with-patched-ts-language-server-running-in-web-workers/9337)) **(resumen de busqueda, no leido)**. Es trabajo de integracion no trivial.

### 2.3 Tamano de bundle: los numeros reales

- Replit midio Monaco en **51,17 MB de bundle (5,01 MB parsed + gzipped)** frente a CodeMirror 6 con extensiones y paquetes de lenguaje en **8,23 MB (1,26 MB parsed + gzipped)** ([replit.com/blog/codemirror](https://replit.com/blog/codemirror), publicado 9-mar-2022, actualizado 5-oct-2023, leido 14-sep-2026). Son cifras de 2022 pero el orden de magnitud sigue siendo el correcto.
- Matiz que casi nadie menciona: **si necesitas diagnostics de TypeScript, la comparacion cambia**. El compilador de TypeScript pesa varios MB vengas de donde vengas. Con CodeMirror + `@typescript/vfs` tambien acabas cargando `typescript` y los `.d.ts` de las lib (normalmente desde un CDN). La ventaja de tamano de CodeMirror se estrecha mucho en cuanto quieres el mismo nivel de servicio de lenguaje. Lo que si se mantiene es que **en CodeMirror ese coste es diferido y opcional** (puedes cargar el worker de TS solo cuando el usuario abre un ejercicio de TS), mientras que en Monaco el editor base ya es pesado.
- Mitigacion practica con Monaco: `@monaco-editor/react` carga Monaco desde CDN por defecto via `@monaco-editor/loader`, asi que no entra en el bundle de Next; y se puede restringir a los lenguajes que hagan falta con configuracion propia si se auto-hostea.

### 2.4 Compatibilidad con Next App Router

- **Patron obligado para Monaco**: `dynamic(() => import('...'), { ssr: false })`. Monaco toca `window`/`self` en import time y revienta en SSR ([swyx.io/how-to-add-monaco-editor-to-a-next-js-app-ha3](https://www.swyx.io/how-to-add-monaco-editor-to-a-next-js-app-ha3), y la doc de integracion de `monaco-loader`) **(resumen de busqueda, no leido)**.
- Ojo: en App Router, `next/dynamic` con `ssr: false` **solo se permite dentro de un Client Component** (`'use client'`). Es un detalle que rompe a mucha gente.
- Hay historial de friccion concreta entre Monaco y Turbopack: issue [vercel/next.js#72613 "Truly dynamic imports with Turbopack, i.e. support for Monaco editor"](https://github.com/vercel/next.js/issues/72613) **(resumen de busqueda, no leido; no he verificado si esta cerrado en sep-2026)**. Dado que **Turbopack es el bundler por defecto desde Next 16**, esto es un riesgo real que hay que probar en un spike de un dia antes de comprometerse.
- CodeMirror 6 no tiene ese problema: es ESM limpio, sin workers obligatorios, y se monta en un `useEffect`. Sigue necesitando ser Client Component, pero no pelea con el bundler.

### 2.5 Accesibilidad y movil

- CodeMirror lo pone como feature de portada: "Works well with screen readers and keyboard-only users" y "Use the platform's native selection and editing features on phones" ([codemirror.net](https://codemirror.net/), leido 14-sep-2026).
- Replit abandono Monaco precisamente porque **no funcionaba en movil** y les obligaba a mantener Ace en paralelo para moviles, con features duplicadas ([replit.com/blog/codemirror](https://replit.com/blog/codemirror), leido 14-sep-2026).
- Monaco esta mejorando accesibilidad: la release 0.56.0 (20-jul-2026) incluye fixes de contraste WCAG 2 AA y hace el find widget no tabbable cuando esta oculto (GitHub releases, leido 14-sep-2026). Pero movil sigue siendo su punto debil.
- Resumenes de comparativas 2026 coinciden: Monaco algo mejor en accesibilidad de teclado out-of-the-box, CodeMirror claramente mejor en movil ([pistack.xyz 22-ago-2026](https://www.pistack.xyz/posts/2026-08-22-browser-code-editors-monaco-codemirror-ace-comparison/), [pkgpulse.com](https://www.pkgpulse.com/guides/monaco-editor-vs-codemirror-6-vs-sandpack-in-browser-2026)) **(resumen de busqueda, no leido)**.

### 2.6 Que usan los productos del sector

- **CoderPad usa Monaco**, y lo justifica por familiaridad del candidato: "Monaco is the code editor that powers Microsoft's Visual Studio Code (VSCode), which is by far the most popular IDE choice. Now, it powers our editor too" ([coderpad.io/blog/product-updates/introducing-coderpad-monaco/](https://coderpad.io/blog/product-updates/introducing-coderpad-monaco/), publicado 2-mar-2022, leido 14-sep-2026).
- **CodeSignal usa Monaco** con `monaco-languageclient` contra language servers reales para autocompletado en 25+ lenguajes ([codesignal.com/blog/how-we-support-autocompletion/](https://codesignal.com/blog/how-we-support-autocompletion/)) **(resumen de busqueda, no leido)**.
- **Sourcegraph migro de Monaco a CodeMirror** ([sourcegraph.com/blog/migrating-monaco-codemirror](https://sourcegraph.com/blog/migrating-monaco-codemirror)); no pude leer el articulo, el servidor devolvio **HTTP 403** el 14-sep-2026. **(no leido, bloqueado)**.
- **Replit migro a CodeMirror** (ver arriba, leido).

Patron: **los productos de entrevista tecnica eligen Monaco** (familiaridad con VS Code del candidato), **los IDE de uso general y los productos con movil eligen CodeMirror** (peso y touch).

### 2.7 Ejecutar TypeScript en el navegador

Tres opciones para pasar de TS a JS ejecutable:

1. **`ts.transpileModule()` del paquete `typescript`**. Solo quita tipos, no hace type check, compila fichero a fichero de forma aislada. Es lo que ya hace por dentro el worker de Monaco. Si usas Monaco, **ya lo tienes** via `getEmitOutput()`. Si no, cargar `typescript` completo cuesta varios MB.
2. **`esbuild-wasm`**: `esbuild-wasm@0.28.2`, MIT, **14.532.821 bytes sin comprimir** (registry.npmjs.org, 14-sep-2026). Muy rapido una vez inicializado pero el `.wasm` es pesado y hay un coste de `initialize()` ([zaynetro.com/post/2023-bundling-ts-in-browser](https://www.zaynetro.com/post/2023-bundling-ts-in-browser) apunta ~10MB) **(resumen de busqueda, no leido)**. Merece la pena solo si ademas necesitas **bundling** de varios modulos, no solo stripping de tipos.
3. **`sucrase@3.35.1`**, MIT, **1.137.073 bytes sin comprimir** (registry.npmjs.org, 14-sep-2026). Es la opcion mas ligera con diferencia. Hace stripping de tipos y transformaciones JSX/ESM, no type check. Si el editor es CodeMirror y no quieres cargar el compilador de TS solo para ejecutar, sucrase es la respuesta. Aviso: su ultima version publicada es 3.35.1 y el proyecto lleva tiempo estable/quieto **(no he verificado la fecha de publicacion)**.

Ninguno de los tres hace type checking. **Para Devsparring eso es una decision de producto, no tecnica**: en una entrevista real el candidato no tiene un type checker gritandole. Sugerencia: diagnostics visibles (subrayado) pero **sin bloquear la ejecucion**, que es exactamente el comportamiento de Monaco por defecto.

### 2.8 Sandboxing del codigo del usuario

**Veredicto: Web Worker, no iframe.** Razones documentadas:

- Un Web Worker esta aislado del contexto de ejecucion por construccion: sin DOM, sin `window` del host, sin cookies ni `localStorage` del origen accesibles de la misma forma.
- Un iframe **comparte el hilo de la pagina**: un bucle infinito del usuario congela la UI entera. Es una denegacion de servicio trivial.
- El Worker se crea desde un **blob URL** generado a partir del string de codigo, lo que da un "eval seguro".
- Formsort documenta exactamente esta migracion de iframe a Web Worker y las razones ("Iframes may fail to load, and for security reasons it is very hard to detect when they do") ([formsort.com/article/sandboxed-code-in-browsers/](https://formsort.com/article/sandboxed-code-in-browsers/), publicado 6-jun-2022, leido 14-sep-2026). Nota honesta: **ese articulo no explica como manejar timeouts ni bucles infinitos**.

**Timeout: el Worker es la unica opcion que lo resuelve de verdad.** Patron concreto:

```
// main thread
const worker = new Worker(URL.createObjectURL(new Blob([runnerSource], {type:'text/javascript'})));
const timer = setTimeout(() => { worker.terminate(); reject(new Error('Timeout: 3000 ms')); }, 3000);
worker.onmessage = (e) => { clearTimeout(timer); worker.terminate(); resolve(e.data); };
worker.onerror = (e) => { clearTimeout(timer); worker.terminate(); reject(e); };
```

`worker.terminate()` mata el hilo aunque este en un `while(true)`. Con iframe no hay equivalente fiable. Recomendaciones adicionales:
- Timeout agresivo (2-5 s) y **limite de salida de consola** (por ejemplo 200 lineas) para que un `for(;;) console.log()` no reviente la memoria del main thread por acumulacion de mensajes.
- Un **worker nuevo por ejecucion**, nunca reutilizar: evita que el estado de una ejecucion contamine la siguiente.
- Defensa en profundidad opcional: servir el runner desde un **origen distinto** (subdominio) con su propio CSP, para que ni siquiera comparta origen con la app. Es coste extra de despliegue; **hipotesis, no confirmado** que haga falta para Devsparring, donde el codigo malicioso seria del propio usuario contra si mismo.
- Lo que el Worker **no** protege: consumo de CPU/bateria durante el timeout, y `postMessage` flooding. Lo que si protege: acceso al DOM, a la sesion de Supabase en `localStorage`/cookies, y a la clave de API del usuario si esta en el navegador (ver seccion 4).

### 2.9 Correr tests tipo assert en el navegador

No hace falta un framework. Lo mas simple y robusto para Devsparring:

1. **Runner propio dentro del worker.** El worker recibe `{ userCode, testCode }`, evalua el codigo del usuario, y luego ejecuta un array de casos. Un `expect` minimo (unas 40 lineas: `toBe`, `toEqual` con deep equal, `toThrow`) cubre el 95% de los ejercicios de entrevista y no anade ni un KB de dependencia. Cada test devuelve `{ nombre, ok, esperado, recibido, ms }` por `postMessage`.
2. **Comparacion estructural**: hace falta un deep equal propio que trate bien `NaN`, `-0`, `Map`/`Set` y orden de claves. Es la parte que mas bugs da.
3. **Determinismo**: congelar `Math.random` y `Date.now` dentro del worker si el ejercicio lo pide, para que el resultado sea reproducible y la IA pueda corregir sobre un output estable.
4. **Alternativas descartadas**: cargar Vitest o Jest en el navegador es desproporcionado (asumen Node y un sistema de ficheros). `chai` o `expect` sueltos son posibles pero anaden peso para poca ganancia.

### 2.10 Veredicto de la seccion 2

**Monaco (`@monaco-editor/react`), cargado con `dynamic(..., { ssr: false })` desde un Client Component, con el worker de TypeScript activado y diagnostics no bloqueantes. Ejecucion en un Web Worker nuevo por run con `terminate()` a los 3 segundos y un runner de asserts propio.**

Por que Monaco y no CodeMirror, pese a que CodeMirror pesa menos:
1. **El producto es entrenar entrevistas tecnicas**. CoderPad y CodeSignal usan Monaco por la misma razon: el candidato reconoce VS Code y no pierde tiempo peleando con el editor. La fidelidad al escenario real es el valor de Devsparring.
2. **TypeScript con diagnostics sale gratis y mantenido**. La ruta CodeMirror+TS depende de `@valtown/codemirror-ts`, que esta archivado desde septiembre de 2025. Para un desarrollador solo, adoptar una dependencia critica sin mantenimiento es el peor trato posible.
3. **Un solo worker sirve para dos cosas**: diagnostics y transpilacion (`getEmitOutput`). No hace falta anadir esbuild-wasm (14,5 MB) ni sucrase.
4. **Monaco esta claramente vivo**: push del 13-sep-2026, release 0.56.0 en julio de 2026, con mejoras de accesibilidad.
5. El coste de bundle se mitiga cargando Monaco desde CDN via `@monaco-editor/loader` (comportamiento por defecto de `@monaco-editor/react`), y cargando el editor solo en la ruta `/practicar`.

Lo que hay que aceptar y mitigar:
- **Movil sera mediocre.** Mitigacion honesta: en pantallas pequenas ofrecer el modo "explica en voz alta" (seccion 6) y las preguntas conceptuales, y avisar de que los ejercicios de codigo van mejor en escritorio. Intentar que Monaco sea bueno en movil es tirar el tiempo.
- **Riesgo Turbopack.** Accion concreta: **spike de un dia** que monte `@monaco-editor/react` en un Next 16.3 con Turbopack por defecto, en dev y en `next build`, antes de escribir nada mas del editor. Si falla, plan B inmediato: CodeMirror 6 + sucrase, aceptando diagnostics mas pobres.
- **`@monaco-editor/react` tiene ultimo push en abril de 2026** y un solo mantenedor. Es un wrapper fino (152 KB) y se puede reemplazar por integracion manual en un dia si hiciera falta. Riesgo bajo y acotado.

## 3. Repeticion espaciada: SM-2 vs FSRS

### 3.1 Evidencia de la comparacion

- El benchmark oficial ([github.com/open-spaced-repetition/srs-benchmark](https://github.com/open-spaced-repetition/srs-benchmark), leido 14-sep-2026) evalua **~349,9 millones de reviews de 9.999 usuarios de Anki** (sin same-day reviews) y **~519,3 millones de 10.000 usuarios** (con same-day). Metricas: log loss, RMSE(bins), AUC.
- Resultados del benchmark (leidos 14-sep-2026): el mejor modelo absoluto es **RWKV-Instant** (log loss 0,2773; RMSE 0,02502; AUC 0,8329), pero el propio repo advierte que "RWKV and RMSE-BINS-EXPLOIT do not use TimeSeriesSplit", es decir no son comparables limpiamente. Las variantes **FSRS-7** estan en el tramo alto: `FSRS-7 recency` log loss 0,3370 / RMSE 0,0593 / AUC 0,7220; `FSRS-7` log loss 0,3401 / RMSE 0,0634 / AUC 0,7167.
- Superioridad frente a SM-2: **FSRS-6 (con recency weighting) tiene un 99,6% de superioridad sobre Anki SM-2**, es decir para el 99,6% de los usuarios el log loss es menor con FSRS-6 ([expertium.github.io/Benchmark.html](https://expertium.github.io/Benchmark.html), leido 14-sep-2026).
- **Caveat honesto que el propio benchmark declara**: "There is no way to have a truly fair, no caveats, comparison between FSRS and SM-2", porque SM-2 no fue disenado para predecir probabilidades y hubo que ponerle encima "a not-so-rigorous interval-to-probability converter". Asi que el margen exacto no es de fiar; la direccion si.
- Las cifras de "20-30% menos reviews para la misma retencion" circulan en multiples articulos de 2026 ([antiagent.io/blog/fsrs-vs-sm-2](https://www.antiagent.io/blog/fsrs-vs-sm-2), [smartrecallai.com](https://smartrecallai.com/blog/sm2-vs-fsrs-vs-leitner-vs-anki-2026)) pero **son secundarias y no las he podido trazar a una medicion primaria**; las trato como orden de magnitud, no como dato **(resumen de busqueda, no leido)**.

Nota importante: **el benchmark ya habla de FSRS-7**, mientras que la libreria TypeScript que vamos a usar implementa **FSRS v6**. Diferencia de calidad predictiva pequena frente a SM-2; irrelevante para el tamano de Devsparring.

### 3.2 ts-fsrs: licencia, mantenimiento y uso

Verificado 14-sep-2026 (GitHub API y registry.npmjs.org):

- Repo: [github.com/open-spaced-repetition/ts-fsrs](https://github.com/open-spaced-repetition/ts-fsrs). **791 estrellas, 72 forks, 17 issues abiertas, licencia MIT, no archivado.**
- **Ultimo push: 14-sep-2026** (hoy mismo). Ultima release **v5.4.2 publicada el 1-sep-2026** (fix: clip de parametros tras migracion, PR #486). **Mantenimiento activo y reciente, sin dudas.**
- npm: `ts-fsrs@5.4.2`, MIT, **706.415 bytes sin comprimir, cero dependencias de runtime**. Escrito en TypeScript, publica ESM, CommonJS y UMD.
- Requiere **Node.js >= 20.0.0** (Node 16 y 18 ya no soportados). Compatible con el minimo de Next 16 (Node 20.9+).
- Implementa **FSRS v6**.
- API: `scheduler.repeat(card, date)` devuelve las cuatro salidas posibles antes de que el usuario responda (util para pintar "manana / 3 dias / 1 semana / 2 semanas" en los botones), y `scheduler.next(card, date, rating)` aplica la nota elegida. Devuelve `{ card, log }`.
- Parametros configurables: `request_retention`, `maximum_interval`, `w` (los 21 pesos), `enable_fuzz`, `learning_steps`.
- Paquete companero `@open-spaced-repetition/binding` para entrenamiento de parametros y conversion CSV.
(Todo lo anterior del [README de ts-fsrs](https://github.com/open-spaced-repetition/ts-fsrs), leido 14-sep-2026; el README no declara la licencia en el cuerpo, pero GitHub y npm reportan MIT.)

**Ventaja decisiva para Devsparring: cero dependencias y TypeScript puro.** El scheduler puede vivir en `src/features/srs/scheduler.ts` como funcion pura, sin I/O, y correr identico en el servidor (Server Action) y en tests de Vitest. No hay que portar nada ni llamar a un servicio.

### 3.3 Parametros para preguntas de entrevista (no vocabulario)

Los defaults de FSRS estan ajustados sobre colecciones de Anki dominadas por vocabulario: miles de tarjetas, item atomico, recall binario, horizonte infinito. **Devsparring es lo contrario en las cuatro dimensiones**, y eso cambia los parametros.

Referencias de base (todas **(resumen de busqueda, no leido)** salvo lo indicado):
- `desired_retention` por defecto **0,9**; rango permitido **0,70 a 0,97**; se advierte de no pasar de 0,97 porque la carga se dispara ([faqs.ankiweb.net/frequently-asked-questions-about-fsrs.html](https://faqs.ankiweb.net/frequently-asked-questions-about-fsrs.html), [fsrs4anki tutorial](https://github.com/open-spaced-repetition/fsrs4anki/blob/main/docs/tutorial.md)).
- Los parametros por defecto son **21 pesos** y la guia oficial dice que si no dominas la optimizacion, es mejor no tocarlos.
- Sobre la retencion optima, el wiki oficial ([The optimal retention](https://github.com/open-spaced-repetition/fsrs4anki/wiki/The-optimal-retention), **leido** 14-sep-2026) **no da un numero recomendado**: solo demuestra que existe un optimo matematico calculable con el metodo de Brent, y que "the real graphs vary among different learners". Desde Anki 24.04 la metrica que se minimiza es la **ratio carga/conocimiento ganado**, no el conocimiento total.
- Minimo de reviews para optimizar parametros: Anki 24.06+ no exige minimo; 24.04 exigia 400; versiones anteriores 1.000. La guia practica que circula es **~1.000 reviews y unos cientos de cards** antes de que optimizar mejore a los defaults; por debajo se ajusta ruido ([forums.ankiweb.net/t/how-many-reviews-for-accurate-optimization/53320](https://forums.ankiweb.net/t/how-many-reviews-for-accurate-optimization/53320), [issue ankitects/anki#3094](https://github.com/ankitects/anki/issues/3094)) **(resumen de busqueda, no leido)**.

**Recomendacion concreta para Devsparring:**

| Parametro | Valor propuesto | Razon |
|---|---|---|
| `w` (21 pesos) | **defaults de FSRS v6, sin tocar** | Devsparring no tendra 1.000 reviews por usuario en meses. Optimizar antes es ajustar ruido, y la guia oficial lo dice. |
| `request_retention` | **0,85** (y configurable por el usuario entre 0,80 y 0,95) | El coste de olvidar una pregunta de entrevista es bajo (se relee y se entiende, no se memoriza una palabra nueva) y el coste de repasar es alto (cada review son 5-15 minutos, no 5 segundos). Con sesiones caras, bajar la retencion es la palanca correcta. 0,9 genera demasiada carga diaria para tarjetas de este coste. |
| `maximum_interval` | **180 dias** (no los 36.500 por defecto) | Devsparring tiene **horizonte finito**: alguien se prepara para entrevistas durante semanas o meses. Un intervalo de 2 anos es inutil. Ademas el contenido tecnico caduca (de ahi el workflow de la seccion 8): una respuesta correcta hace 3 anos puede estar obsoleta. |
| `learning_steps` | **vacio o un solo paso muy corto** | Los pasos de aprendizaje de Anki (1 min, 10 min) existen para memorizar un item atomico. Repetir la misma pregunta de diseno de sistemas a los 10 minutos no ensena nada: el usuario recuerda literalmente su respuesta anterior. Mejor que el primer intervalo real sea de 1-2 dias. |
| `enable_fuzz` | **true** | Evita que todo lo aprendido el mismo dia vuelva el mismo dia y creando picos de carga. Barato y solo aporta. |

### 3.4 El problema real: de que la nota (rating)

Esta es la parte donde Devsparring tiene que pensar, y donde el research publico no ayuda porque todo asume autoevaluacion del usuario.

FSRS necesita un `Rating` en {Again, Hard, Good, Easy}. Opciones:

- **(A) El usuario se autoevalua.** Es lo que hace Anki. Barato, pero en entrevistas es poco fiable: la gente sobrestima su respuesta hablada.
- **(B) La nota sale de la correccion por IA.** La rubrica devuelve una puntuacion (por ejemplo 0-10 o por dimensiones: correccion, complejidad, comunicacion) y se mapea a Rating. Esto es lo que hace unica a Devsparring.
- **(C) Hibrido: la IA propone, el usuario puede corregir.**

**Recomendacion: (C).** Mapeo propuesto (hipotesis de producto, a calibrar con datos reales; **hipotesis, no confirmado**):

```
puntuacion 0-10 de la rubrica -> Rating
  0-3  -> Again
  4-6  -> Hard
  7-8  -> Good
  9-10 -> Easy
```

Con dos salvaguardas:
1. **Si hay tests automaticos que fallan, el suelo es `Hard` como maximo** (no puedes puntuar "Good" un ejercicio que no pasa los tests), independientemente de lo que diga la IA.
2. **Guardar siempre la puntuacion cruda y la version del prompt/rubrica en el review log**, no solo el Rating. Si manana cambias el mapeo o el modelo de IA, puedes recalcular el historico. Sin esto, cambiar la rubrica corrompe el scheduling de forma irreversible.

Consecuencia de diseno de datos: el review log de Devsparring debe guardar `{ card_id, rating, rubric_score, rubric_version, model_id, reviewed_at, elapsed_days, state }`. `ts-fsrs` ya devuelve un `log` que es casi eso; solo hay que anadir los campos propios.

### 3.5 Veredicto de la seccion 3

**FSRS via `ts-fsrs@5.x`, MIT, cero dependencias, mantenido activamente. Se descarta SM-2.**

Razones:
1. La evidencia empirica es abrumadora en direccion (99,6% de superioridad sobre SM-2 en log loss), aunque el margen exacto tenga caveats reconocidos por los propios autores.
2. **No hay coste de adopcion**: es una funcion pura en TypeScript sin dependencias. Implementar SM-2 a mano seria mas trabajo que instalar ts-fsrs, no menos.
3. El scheduler vive en `src/features/srs/scheduler.ts` con tests unitarios de Vitest. Encaja exactamente con el veredicto de arquitectura de la seccion 1.
4. Los defaults se usan tal cual salvo **cuatro ajustes justificados**: `request_retention` 0,85, `maximum_interval` 180 dias, `learning_steps` vacio, `enable_fuzz` true. No se optimizan los 21 pesos.
5. Lo que **no** se hace: entrenar parametros por usuario. No hay volumen para eso y la guia oficial advierte de ajustar ruido. Si algun dia hay miles de reviews, `@open-spaced-repetition/binding` es el camino.

## 4. Supabase + Next en 2026 y custodia de la API key del usuario

### 4.1 El patron oficial con `@supabase/ssr` (verificado 14-sep-2026)

Fuente: [supabase.com/docs/guides/auth/server-side/nextjs](https://supabase.com/docs/guides/auth/server-side/nextjs), leido 14-sep-2026.

Paquetes: `npm install @supabase/supabase-js @supabase/ssr`. Variables:
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
```

**Cambio de 2026 que hay que saber: las claves.** La doc ya usa `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, no la vieja `ANON_KEY`. Supabase esta migrando a claves `sb_publishable_...` (sustituye a `anon`) y `sb_secret_...` (sustituye a `service_role`), y **deprecara las claves legacy a finales de 2026**; los proyectos nuevos ya no traen `anon`/`service_role` ([supabase.com/docs/guides/getting-started/migrating-to-new-api-keys](https://supabase.com/docs/guides/getting-started/migrating-to-new-api-keys), [changelog #29260](https://supabase.com/changelog/29260-upcoming-changes-to-supabase-api-keys)) **(resumen de busqueda, no leido)**. Devsparring es nuevo: **empezar directamente con publishable/secret**.

**Dos clientes, no uno.**

```ts
// src/lib/supabase/client.ts  -> Client Components
import { createBrowserClient } from '@supabase/ssr'
export const createClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  )
```

```ts
// src/lib/supabase/server.ts  -> Server Components, Server Actions, route handlers
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const createClient = async () => {
  const cookieStore = await cookies()            // OJO: await, obligatorio en Next 16
  return createServerClient(url, publishableKey, {
    cookies: {
      getAll() { return cookieStore.getAll() },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options))
        } catch { /* Server Components no pueden escribir cookies */ }
      },
    },
  })
}
```

Notas de la doc, textuales o casi:
- La interfaz de cookies es **`getAll` / `setAll`**, no el viejo `get`/`set`/`remove`.
- El `try/catch` vacio en `setAll` es intencionado: desde un Server Component no se pueden escribir cookies, y el refresco de token lo hace el proxy.
- `createBrowserClient` es **singleton**: llamarlo repetidamente devuelve la misma instancia. En servidor hay que reconstruir el cliente **por request** para leer las cookies actuales.
- Nombre de cookie por defecto: `sb-<project_ref>-auth-token`.
- El `setAll` recibe cache headers "that must apply to HTTP responses to prevent CDN caching of user sessions". Importante con Next 16: no cachear nada que dependa de la sesion.

**Refresco de sesion en el borde.** La doc sigue mostrando `middleware.ts` con `await supabase.auth.getClaims()`. Pero **Next 16 renombro `middleware.ts` a `proxy.ts`** y deprecó el nombre antiguo (seccion 1). Para Devsparring: crear `proxy.ts` con `export default function proxy(request: NextRequest)` y el mismo cuerpo. **Hipotesis, no confirmado**: la doc de Supabase todavia no esta actualizada a `proxy.ts`; funciona igual porque es el mismo contrato de request/response.

**Avisos de seguridad que la doc marca como criticos (citas):**
- "Always use `supabase.auth.getClaims()` to protect pages and user data." Valida la firma del JWT localmente y es seguro para autorizacion en servidor. **Este es el cambio de 2026**: antes se recomendaba `getUser()` para todo.
- "Never trust `supabase.auth.getSession()` inside server code such as Proxy. It isn't guaranteed to revalidate the Auth token."
- "Use `getUser` when you need an up-to-date user record from the Auth server." Es decir: `getClaims()` para autorizar (rapido, local), `getUser()` solo cuando hace falta el registro fresco (red).

### 4.2 RLS y patron servidor vs cliente para Devsparring

- **RLS en todas las tablas, sin excepcion.** Las claves publishable/anon van al navegador por diseno; la unica barrera real es RLS. Supabase lo repite: la publishable key "carries the same low privileges as the anon key, so your Row Level Security policies behave the same" (migracion de claves, **resumen de busqueda, no leido**).
- Politicas concretas: `user_id = auth.uid()` en `reviews`, `cards`, `sesiones`, `user_settings`. El banco de `preguntas` es lectura publica (`select` para `authenticated` o incluso `anon`) y escritura solo por el dueno.
- **La secret key (`sb_secret_...`) solo en el servidor y solo donde haga falta**, por ejemplo en el job de GitHub Actions que inserta preguntas nuevas. Nunca en un Client Component ni en una variable `NEXT_PUBLIC_*`.
- Lectura de datos del usuario: en Server Components con el cliente de servidor, para no exponer queries ni depender del cliente. Mutaciones: Server Actions. El cliente de navegador se reserva para realtime y para flujos de auth.

### 4.3 El problema central: donde vive la clave de API de Anthropic del usuario

Tres opciones, con lo que dice cada fuente.

**Opcion A: nunca guardarla en servidor, solo en el navegador** (`localStorage` o IndexedDB, y se envia en cada request al route handler, o incluso se llama a Anthropic directo desde el navegador).
- Pro: Devsparring nunca custodia un secreto ajeno. Si la base de datos se filtra, no hay nada que filtrar. Es la postura de minimo riesgo legal y reputacional.
- Pro: cero coste de infraestructura de cifrado.
- Contra: **la clave se pierde al cambiar de navegador o limpiar datos**. Mala experiencia.
- Contra grave: si se llama a Anthropic **directamente desde el navegador**, la clave queda expuesta a cualquier XSS y ademas hay que lidiar con CORS. Y recordar la seccion 2: el codigo del usuario corre en un Web Worker; aunque el worker no ve `localStorage` del host, un XSS en la app si.
- Nota: Anthropic dice explicitamente que al usar herramientas de terceros "you are giving the developer of that tool access to your Claude Console account" y que solo se confie en herramientas con reputacion probada ([support.claude.com/en/articles/9767949](https://support.claude.com/en/articles/9767949-api-key-best-practices-keeping-your-keys-safe-and-secure), leido 14-sep-2026). Esto empuja hacia A por honestidad con el usuario.

**Opcion B: Supabase Vault.**
- Que es, segun la doc: "a Postgres extension and accompanying Supabase UI that makes it safe and easy to store encrypted secrets". Usa **AEAD basado en libsodium**: los datos van cifrados y **firmados** ("it is also signed so that it cannot be forged"), y la firma incorpora otras columnas de la fila como associated data, "preventing attackers from moving encrypted values between rows undetected" ([supabase.com/docs/guides/database/vault](https://supabase.com/docs/guides/database/vault), leido 14-sep-2026).
- Los secretos viven cifrados en `vault.secrets` y se leen por la vista `vault.decrypted_secrets`. **Van cifrados tambien en los backups y en el stream de replicacion.**
- Lo mas importante: "the encryption key is never stored in the database alongside the encrypted data". Supabase guarda la clave raiz del proyecto en sus sistemas, fuera de la base.
- Caveats que la propia doc senala:
  - Hay que "protect access to this view with the appropriate SQL privilege settings", porque quien acceda a `vault.decrypted_secrets` ve los secretos en claro. **No hay RLS por usuario que te salve gratis aqui: hay que disenarlo.**
  - Migracion manual con `pg_dump`/`pg_restore` a un proyecto nuevo **no puede descifrar** los secretos sin copiar la clave raiz original. Riesgo real de perder todas las claves de los usuarios en una migracion mal hecha.
- La API es `vault.create_secret()` y consultar la vista descifrada.

**Opcion C: cifrado en columna con pgsodium.**
- **Descartada por Supabase.** Cita textual de la doc: "Supabase **does not recommend** the usage of pgsodium as it will be deprecated", y sobre Transparent Column Encryption y Server Key Management: "We do not recommend using either on the Supabase platform due to their high level of operational complexity and misconfiguration risk". La recomendacion explicita es: "**Use Supabase Vault instead**" ([supabase.com/docs/guides/database/extensions/pgsodium](https://supabase.com/docs/guides/database/extensions/pgsodium), leido 14-sep-2026).
- Buena noticia: "Vault and pgsodium are **separate** extensions. Vault doesn't depend on pgsodium and **is not** affected by this deprecation."

**Opcion D (no estaba en el enunciado, pero es la que usa la industria): cifrado en la app con AES-256-GCM y la clave maestra en variables de entorno o un KMS, fuera de la base de datos.**
- Es lo que recomiendan las guias de BYOK de 2026: AES-256-GCM con nonce unico por cifrado, nunca reutilizar nonce con la misma clave, y la clave de cifrado viviendo fuera de la base ([dev.to/c9dn/how-to-let-users-bring-their-own-openai-or-anthropic-api-keys](https://dev.to/c9dn/how-to-let-users-bring-their-own-openai-or-anthropic-api-keys-without-storing-them-in-plaintext-12m), [tokenmix.ai](https://tokenmix.ai/blog/anthropic-api-key-generate-secure-rotate-2026)) **(resumen de busqueda, no leido)**. El argumento que dan: "API provider keys are live, spendable credentials" y si la base se filtra el atacante no obtiene hashes, obtiene dinero gastable.
- En Node esto son 20 lineas con `node:crypto` (`createCipheriv('aes-256-gcm', ...)`), la master key en una env var del hosting, y en la tabla solo `{ ciphertext, iv, authTag }`.

### 4.4 Veredicto de la custodia de la clave

**Recomendacion: A por defecto, con B (Vault) como opt-in explicito. Nunca C.**

Concretamente:

1. **Modo por defecto (y unico en el MVP): la clave vive solo en el navegador del usuario.** Se guarda en `localStorage` bajo una key propia, y se envia en el body de la request al route handler `POST /api/correccion` en cada correccion. El servidor **la usa y la tira**: nunca la escribe en base de datos, nunca en disco, nunca en un log.
   - Copy honesto en la UI: "Tu clave se guarda solo en este navegador. Si cambias de dispositivo tendras que volver a pegarla. Devsparring no la almacena en sus servidores."
   - Esto convierte un problema de seguridad en una feature de confianza, que para un producto nuevo de un desarrollador desconocido vale mas que la comodidad.
2. **Opt-in "recordar mi clave en la nube": Supabase Vault.** Solo si el usuario lo pide explicitamente, con un aviso claro. Implementacion:
   - Una tabla `user_api_keys(user_id uuid primary key, vault_secret_id uuid)` con RLS `user_id = auth.uid()`.
   - El secreto se crea con `vault.create_secret()` desde una **Postgres function `security definer`** que solo la puede invocar el propio usuario y que **nunca devuelve el secreto al cliente**.
   - La lectura del secreto la hace **solo** el route handler de correccion, con la secret key del servidor, a traves de otra funcion `security definer` que comprueba `auth.uid()`. `vault.decrypted_secrets` **no se expone nunca** a `authenticated` ni a `anon`.
   - Aceptar el caveat de migracion: documentar que una migracion de proyecto Supabase requiere copiar la root key o hacer que todos los usuarios vuelvan a introducir su clave.
3. **Nunca pgsodium / Transparent Column Encryption.** Supabase lo dice por escrito.
4. **Opcion D como alternativa si Vault estorba.** Si en algun momento Vault resulta incomodo (por ejemplo por el acoplamiento a la root key del proyecto), cifrar en la app con AES-256-GCM y la master key en una env var es equivalente en garantias practicas y mas portable. **Hipotesis, no confirmado**: no he encontrado una comparativa oficial de Supabase entre Vault y cifrado en la app.
5. **La clave del dueno (para su propia cuenta) va en una env var del servidor**, no en Vault y no en la base. Es el caso trivial.

### 4.5 Llamar a la API de Anthropic desde un route handler sin filtrar la clave

Reglas concretas, cada una con su razon:

1. **La clave viaja en el body de un POST sobre HTTPS, nunca en la URL ni en query params.** Los query strings acaban en logs de acceso de cualquier proxy o CDN.
2. **Se pasa como header `x-api-key` a Anthropic** (o `apiKey` al constructor del SDK `@anthropic-ai/sdk`), creando **una instancia de cliente por request**. No cachear un cliente global con la clave de un usuario: en un runtime serverless reutilizado eso mezcla usuarios.
3. **No loggear nunca el objeto request completo.** El riesgo real no es tu `console.log`, son:
   - Los **error reporters**. Sentry, por ejemplo, captura request bodies por defecto en algunas integraciones. Hay que configurar scrubbing explicito del campo `apiKey` antes de enviar nada.
   - Los **logs de Vercel / del hosting**: cualquier `console.error(err)` donde `err` sea un error del SDK de Anthropic puede incluir la request. Hay que capturar y re-lanzar un error propio y delgado: `throw new Error('anthropic_error:' + err.status)`.
   - Los **traces de OpenTelemetry** si se usa `instrumentation.ts` de Next.
4. **Redactar en el limite**: una funcion `sanitize(body)` que borre `apiKey` antes de cualquier logging, y un test unitario que lo verifique. Es la clase de cosa que se rompe en silencio seis meses despues.
5. **Nunca devolver la clave al cliente en ninguna respuesta**, ni siquiera enmascarada con mas de los ultimos 4 caracteres.
6. **Nunca pasarla a un Client Component como prop ni a un Server Component serializado**: acabaria en el payload RSC que va por el cable.
7. **`export const dynamic = 'force-dynamic'`** (o simplemente no usar `"use cache"`) en el route handler de correccion. Con Next 16 el default ya es dinamico, pero conviene ser explicito: una respuesta de correccion cacheada y servida a otro usuario seria una fuga.
8. **Rate limiting propio por usuario** en el route handler, aunque la clave sea del usuario: protege de que un bug en el cliente dispare 500 requests y le queme el credito a alguien.
9. **Validar el formato de la clave antes de usarla** (`sk-ant-...`) y devolver un error claro, para no generar tráfico y errores innecesarios.
10. **Rotacion**: Anthropic recomienda rotar cada ~90 dias y usar claves separadas por entorno (support article leido 14-sep-2026). En la UI de Devsparring: un boton "olvidar mi clave" y un recordatorio.

### 4.6 Hallazgo legal relevante y no obvio

Los terminos de Anthropic **empujan exactamente al modelo que Devsparring ya planea**. Cita textual de la doc de Claude Code ([code.claude.com/docs/en/legal-and-compliance](https://code.claude.com/docs/en/legal-and-compliance), leido 14-sep-2026):

> "Customers may not pay for, resell, or intermediate Claude usage on their end users' behalf. Each end user must authenticate with their own Anthropic API key, Claude subscription plan credentials, or 3P inference provider credential"

Y sobre OAuth:

> "OAuth authentication is intended exclusively for purchasers of Claude Free, Pro, Max, Team, and Enterprise subscription plans and is designed to support ordinary use of Claude Code and other native Anthropic applications."

> "Anthropic does not permit third-party developers to offer Claude.ai login into their own applications, or to route requests through Free, Pro, or Max plan credentials on behalf of their users."

Y el carve-out que **si** permite lo del dueno:

> "This does not restrict how customers provision and manage their own API keys or third-party inference provider credentials ... provided the resulting usage is billed to the key owner under their agreement with Anthropic ... and is not resold or intermediated as described above."

Consecuencias para Devsparring, directas:
- **El modelo "clave del usuario" no es una concesion tecnica, es lo que exigen los terminos.** Bien elegido.
- **La clave del dueno solo puede usarse para la cuenta del dueno.** Si algun dia Devsparring quiere ofrecer correccion incluida en una suscripcion propia, eso es "pay for / intermediate Claude usage on their end users' behalf" y hay que hablar con Anthropic (`contact sales`) antes. Esto es un limite de modelo de negocio, no de codigo.
- **Nunca implementar "inicia sesion con tu cuenta de Claude"** ni almacenar tokens de sesion de claude.ai: esta prohibido explicitamente.
- Nota: los Commercial Terms generales ([anthropic.com/legal/commercial-terms](https://www.anthropic.com/legal/commercial-terms), leido 14-sep-2026) contienen la clausula de no reventa ("resell the Services except as expressly approved by Anthropic") pero **no** encontre en ellos la clausula especifica de "each end user must authenticate with their own key"; esa esta en la pagina de legal-and-compliance de Claude Code. Lo digo porque importa saber que la fuente exacta es esa y no los Commercial Terms.

## 5. API de Claude: modelos, precios y eleccion para correccion con rubrica

Nota: `docs.anthropic.com` y `docs.claude.com` **redirigen (302) a `platform.claude.com/docs/...`** desde el 14-sep-2026. Los enlaces canonicos son los de `platform.claude.com`.

### 5.1 Modelos disponibles hoy

Fuente: [platform.claude.com/docs/en/about-claude/models/overview](https://platform.claude.com/docs/en/about-claude/models/overview), **leido 14-sep-2026**.

| Modelo | ID | Contexto | Max output | Latencia | Thinking | Effort por defecto | Corte de conocimiento fiable | Retirada no antes de |
|---|---|---|---|---|---|---|---|---|
| Claude Fable 5.1 | `claude-fable-5-1` | 1M | 128K | Lenta | Adaptive (siempre on) | `high` | jun-2026 | 1-sep-2027 |
| Claude Opus 5 | `claude-opus-5` | 1M | 128K | Moderada | Adaptive | `high` | may-2026 | 24-jul-2027 |
| Claude Sonnet 5 | `claude-sonnet-5` | 1M | 128K | Rapida | Adaptive | `high` | ene-2026 | 30-jun-2027 |
| Claude Haiku 4.5 | `claude-haiku-4-5` (snapshot `claude-haiku-4-5-20251001`) | 200K | 64K | La mas rapida | Extended (`budget_tokens`) | No soporta `effort` | feb-2025 | 15-oct-2026 |

Legacy todavia servidos: Fable 5, Opus 4.8, Opus 4.7, Opus 4.6, Opus 4.5, Sonnet 4.6, Sonnet 4.5.

La doc recomienda: "start with Claude Opus 5 for most workloads", y Fable 5.1 solo "for demanding reasoning and long-horizon agentic work, or when your evals on Claude Opus 5 at higher effort still fall short".

**Aviso importante para Devsparring: `claude-haiku-4-5` tiene fecha de retirada no antes del 15-oct-2026, es decir dentro de un mes.** Aunque "no antes de" no significa "ese dia", es el unico modelo del lineup con horizonte corto. No construir sobre Haiku 4.5 sin un plan de migracion.

**Tokenizer**: "Claude 4.7 and later models ... use a newer tokenizer ... This tokenizer produces approximately 30% more tokens for the same text" (pagina de pricing). Es decir, comparar precios por MTok entre Sonnet 4.6 y Opus 5 sin corregir por tokenizer sobrestima el ahorro del modelo nuevo. Sonnet 5 usa el tokenizer nuevo (es posterior a 4.7); Sonnet 4.6 y anteriores el viejo.

### 5.2 Precios por millon de tokens

Fuente: [platform.claude.com/docs/en/about-claude/pricing](https://platform.claude.com/docs/en/about-claude/pricing), **leido 14-sep-2026**. Todo en USD.

| Modelo | Input base | Cache write 5m | Cache write 1h | Cache hit | Output |
|---|---|---|---|---|---|
| Claude Fable 5.1 | $10 | $12,50 | $20 | **$0,25** (0,025x) | $50 |
| Claude Fable 5 | $10 | $12,50 | $20 | $1 | $50 |
| Claude Opus 5 | $5 | $6,25 | $10 | $0,50 | $25 |
| Claude Opus 4.8 / 4.7 / 4.6 / 4.5 | $5 | $6,25 | $10 | $0,50 | $25 |
| **Claude Sonnet 5** | **$2** | $2,50 | $4 | **$0,20** | **$10** |
| Claude Sonnet 4.6 / 4.5 | $3 | $3,75 | $6 | $0,30 | $15 |
| Claude Haiku 4.5 | $1 | $1,25 | $2 | $0,10 | $5 |

**Nota con fecha, textual de la pagina de pricing (leida 14-sep-2026):**
> "The $2/$10 per million input/output token pricing for Claude Sonnet 5, announced at launch as introductory pricing through August 31, 2026, is now the standard price. The previously scheduled increase to $3/$15 per million input/output tokens on September 1, 2026 will not occur."

Es decir: **Sonnet 5 a $2/$10 es precio definitivo, no promocional.** Esto es el dato mas importante de toda la seccion para el presupuesto de Devsparring.

Otros hechos de precio:
- **Batch API: 50% de descuento** en input y output. Sonnet 5 en batch: $1 / $5 por MTok.
- **Long context sin recargo**: "Claude 4.6 and later models ... include the full 1M token context window at standard pricing. (A 900k-token request is billed at the same per-token rate as a 9k-token request.)"
- **`inference_geo: "us"` aplica multiplicador 1,1x** sobre todo (input, output, cache). El default `global` es precio estandar. Para Devsparring: no tocar `inference_geo`.
- **Fast mode** (research preview, solo Opus 5 y Opus 4.8): $10 / $50 por MTok. No aplica a Devsparring.
- **Tool use anade tokens de system prompt**: Opus 5 con `tool_choice: auto` anade 286 tokens; Sonnet 5, 354 tokens. Pequeno pero medible si se llama millones de veces.
- **Web search** (si Devsparring lo usara para el workflow de la seccion 8): **$10 por 1.000 busquedas** mas tokens. **Web fetch: sin coste adicional**, solo tokens del contenido.
- **Code execution** es gratis cuando se usa junto a `web_search_20260209` o `web_fetch_20260209`; en solitario se factura por tiempo con **1.550 horas gratis al mes** por organizacion y $0,05/hora despues.

### 5.3 Limites (rate limits)

Fuente: [platform.claude.com/docs/en/api/rate-limits](https://platform.claude.com/docs/en/api/rate-limits), **leido 14-sep-2026**.

- Dos tipos: **spend limits** (tope mensual de gasto) y **rate limits** (RPM / ITPM / OTPM por modelo).
- Topes de gasto mensual: **Start $500, Build $1.000, Scale $200.000**. Custom sin tope.
- Al llegar al tope del tier: **HTTP 429 con `error.details.error_code = "enforced_spend_limit_reached"` y SIN header `retry-after`**. Los retries automaticos del SDK **fallan** hasta el 1 del mes siguiente a las 00:00 UTC. Hay que detectar ese `error_code` y mostrar un mensaje distinto.
- Si tu pones tu propio spend limit por debajo del tier, el error es **HTTP 400 `invalid_request_error`**, no 429. Dos rutas de error distintas que hay que manejar.
- Rate limits en **Start tier** (el que tendra Devsparring y tendran casi todos sus usuarios): Opus 5, Sonnet 5 y Haiku 4.5 comparten forma: **1.000 RPM, 2.000.000 ITPM, 400.000 OTPM** (cada uno con su bucket propio). Fable 5.x es mas restrictivo: 500.000 ITPM / 100.000 OTPM.
- **Build tier**: Opus 5 / Sonnet 5 / Haiku 4.5 pasan a 5.000 RPM, 5M ITPM, 1M OTPM.
- Hay un tier **Evaluation** por debajo de Start para organizaciones nuevas, con limites mas bajos "while account history is established". Relevante: **un usuario que acaba de crear su cuenta de Anthropic para usar Devsparring tendra limites bajos**, y hay que explicarselo en la UI en lugar de mostrar un error crudo.
- **ITPM es cache-aware**: `cache_read_input_tokens` **no** cuenta hacia el limite en casi todos los modelos (la excepcion es Haiku 3.5, retirado). Solo cuentan `input_tokens` + `cache_creation_input_tokens`. Prompt caching sube el throughput efectivo, no solo baja el coste.
- `max_tokens` **no** cuenta hacia OTPM: "there is no rate limit downside to setting a higher `max_tokens` value".
- Headers utiles: `retry-after`, `anthropic-ratelimit-{requests,input-tokens,output-tokens}-{limit,remaining,reset}`. Para Devsparring: leer `anthropic-ratelimit-input-tokens-remaining` y avisar al usuario antes de que se estrelle.
- Aviso de "acceleration limits": un pico brusco de uso puede dar 429 aunque no superes el limite nominal. "ramp up your traffic gradually".

### 5.4 Structured outputs

Fuente: [platform.claude.com/docs/en/build-with-claude/structured-outputs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs), **leido 14-sep-2026**.

- Forma de la request: **`output_config.format` con `{ "type": "json_schema", "schema": {...} }`**. El parametro viejo `output_format` esta deprecado.
- **Ya no hace falta beta header**: "The `structured-outputs-2025-11-13` beta header is no longer needed", aunque se sigue aceptando durante una transicion.
- Funciona por **constrained decoding** con gramatica compilada. La primera request tiene latencia extra por compilar la gramatica; **las gramaticas se cachean 24 horas**, y cambiar el schema invalida la cache. Implicacion practica: **no generar el schema dinamicamente por pregunta**. Un schema estable = latencia estable.
- Soportado en `claude-opus-5`, `claude-sonnet-5`, `claude-haiku-4-5-20251001`, la familia 4.6/4.7/4.8 y Fable/Mythos.
- **Limitaciones del JSON Schema que afectan a la rubrica de Devsparring, directamente:**
  - **No soporta constraints numericos (`minimum`, `maximum`).** No se puede pedir "puntuacion entre 0 y 10". Solucion: usar **`enum` de enteros** (`"enum": [0,1,2,...,10]`) o validar en la app con zod despues.
  - No soporta `minLength`/`maxLength` de strings. El "maximo 3 frases de feedback" hay que pedirlo en el prompt, no en el schema.
  - No soporta schemas recursivos ni `$ref` externos.
  - `additionalProperties` solo puede valer `false`.
  - `minItems` en arrays solo acepta 0 o 1.
- **`strict: true` en tool definitions es una cosa distinta**: valida los parametros con los que Claude llama a una tool. La tabla de la doc lo resume: JSON outputs controla "what Claude says", strict tool use controla "how Claude calls functions". Para Devsparring interesa el primero.

Schema propuesto para la correccion de Devsparring (estable, un solo schema para todas las preguntas):

```json
{
  "type": "object",
  "additionalProperties": false,
  "required": ["puntuacion", "dimensiones", "aciertos", "fallos", "siguiente_paso"],
  "properties": {
    "puntuacion": { "type": "integer", "enum": [0,1,2,3,4,5,6,7,8,9,10] },
    "dimensiones": {
      "type": "object",
      "additionalProperties": false,
      "required": ["correccion", "complejidad", "comunicacion"],
      "properties": {
        "correccion":   { "type": "integer", "enum": [0,1,2,3,4,5] },
        "complejidad":  { "type": "integer", "enum": [0,1,2,3,4,5] },
        "comunicacion": { "type": "integer", "enum": [0,1,2,3,4,5] }
      }
    },
    "aciertos":       { "type": "array", "items": { "type": "string" } },
    "fallos":         { "type": "array", "items": { "type": "string" } },
    "siguiente_paso": { "type": "string" }
  }
}
```

### 5.5 Prompt caching

Fuente: [platform.claude.com/docs/en/build-with-claude/prompt-caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching), **leido 14-sep-2026**.

- Dos formas: **caching automatico** (un `cache_control: {type:"ephemeral"}` al nivel superior de la request; el sistema coloca el breakpoint en el ultimo bloque cacheable) y **breakpoints explicitos** por bloque. La doc recomienda empezar por el automatico.
- **Minimo de tokens cacheables, por modelo** (dato decisivo para Devsparring):
  - Fable 5.1 / Mythos 5.1 / **Opus 5** / Fable 5 / Mythos 5: **512 tokens**
  - Opus 4.8, **Sonnet 5**, Sonnet 4.6, Sonnet 4.5: **1.024 tokens**
  - Opus 4.7: 2.048
  - Opus 4.6 / 4.5 y **Haiku 4.5: 4.096 tokens**
  - Por debajo del minimo **no se cachea, sin error**. Se detecta porque `cache_creation_input_tokens` y `cache_read_input_tokens` son ambos 0.
- TTL: **5 minutos por defecto**, y se refresca gratis cada vez que se lee. **1 hora** opcional con `{"cache_control":{"type":"ephemeral","ttl":"1h"}}` a 2x el precio de input.
- El tiempo de generacion de la respuesta cuenta contra el TTL: si una respuesta tarda 4 minutos en streamear, la siguiente request tiene ~1 minuto de margen con TTL de 5m.
- **Hasta 4 breakpoints** por request. Los breakpoints no cuestan por si mismos.
- Jerarquia de invalidacion: `tools` -> `system` -> `messages`. Cambiar las tool definitions invalida todo. Cambiar el system prompt invalida system y messages.
- Cacheable: tool definitions, system, mensajes de texto, imagenes y documentos en turnos de usuario, tool_use y tool_result, bloques de thinking de turnos previos.
- El error clasico que la doc senala: poner el breakpoint sobre contenido que cambia (un timestamp). El breakpoint va en el **ultimo bloque estable**.

### 5.6 Coste real de una correccion en Devsparring

Estimacion con numeros propios (**hipotesis, no confirmado**: los tamanos son mi estimacion, no medidos; el calculo si usa los precios verificados arriba).

Supuestos por correccion: system prompt + rubrica + enunciado de la pregunta = **3.000 tokens estables**; respuesta del usuario + codigo + salida de los tests = **1.000 tokens variables**; salida de la IA = **1.000 tokens**.

| Modelo | Sin caching | Con cache hit de los 3.000 estables |
|---|---|---|
| Haiku 4.5 | 4.000x$1 + 1.000x$5 = **$0,009** | no cachea: el prefijo estable son 3.000 tokens y el minimo de Haiku 4.5 son 4.096 |
| **Sonnet 5** | 4.000x$2 + 1.000x$10 = **$0,018** | 3.000x$0,20 + 1.000x$2 + 1.000x$10 = **$0,0126** |
| Opus 5 | 4.000x$5 + 1.000x$25 = **$0,045** | 3.000x$0,50 + 1.000x$5 + 1.000x$25 = **$0,0315** |

Lectura: **100 correcciones cuestan $1,26 con Sonnet 5 y caching**; 1.000 correcciones, $12,60. Con Opus 5, $31,50. La diferencia absoluta es pequena en volumen bajo, y como la paga el usuario con su propia clave, **el coste no es la restriccion principal: la calidad de la nota si**.

Detalle que decide entre Haiku y Sonnet: **el minimo de caching de Haiku 4.5 son 4.096 tokens**, que el prompt de Devsparring probablemente no alcance, mientras que **Sonnet 5 cachea desde 1.024**. Asi que la ventaja nominal de precio de Haiku (1x vs 2x) se come en cuanto Sonnet puede cachear y Haiku no.

### 5.7 Veredicto de la seccion 5

**Modelo por defecto para corregir con rubrica: `claude-sonnet-5`.** Con:
- `output_config.format` con el schema JSON estable de 5.4 (un solo schema, nunca generado por pregunta).
- Prompt caching **automatico** (`cache_control: {type:"ephemeral"}`) con el system prompt y la rubrica **primero** y la respuesta del usuario **al final**, para que el prefijo cacheado sea estable. TTL de 5 minutos: una sesion de practica encadena varias correcciones en pocos minutos, asi que habra hits.
- `thinking: {type: "adaptive"}` y `output_config.effort: "medium"` como punto de partida. Razon: corregir con una rubrica explicita no es un problema de razonamiento de frontera; la rubrica hace el trabajo pesado. Subir a `high` solo si los evals lo piden.
- `max_tokens` holgado (no penaliza OTPM) y **streaming** para que el usuario vea el feedback aparecer.

Por que Sonnet 5 y no los otros:
1. **Precio confirmado y definitivo de $2/$10**, con nota fechada de que la subida a $3/$15 del 1-sep-2026 **no ocurrira**. Es 2,5x mas barato que Opus 5 en input y output.
2. **Cachea desde 1.024 tokens**, frente a los 4.096 de Haiku 4.5. Con el prompt de Devsparring eso invierte la comparacion de coste.
3. **Haiku 4.5 tiene retirada anunciada no antes del 15-oct-2026**, un mes desde hoy. No es base para construir.
4. **Contexto de 1M y 128K de output**, de sobra para pegar enunciado, codigo, tests y transcripcion de voz (seccion 6).
5. Opus 5 se reserva como **modelo opcional de calidad**: un toggle "correccion exhaustiva" para el usuario que quiera pagarlo, o para preguntas de diseno de sistemas donde el razonamiento importa mas. Coste: $0,0315 por correccion con caching. Mismo codigo, solo cambia el `model`.

Lo que **no** hacer:
- No usar **Fable 5.1** para esto. Cuesta $10/$50, su rate limit en Start tier es la mitad (500K ITPM / 100K OTPM), no acepta `tool_choice` forzado, y su valor esta en trabajo agentico de largo horizonte. Corregir una respuesta con rubrica no es eso.
- No usar **Batch API** para la correccion interactiva: el 50% de descuento no compensa que el usuario espere. Si tiene sentido para el workflow de la seccion 8, que es asincrono.
- No activar `inference_geo: "us"`: 1,1x sobre todo, sin beneficio para Devsparring.

**Aviso de deriva**: los ids de modelo actuales **no llevan sufijo de fecha** (`claude-sonnet-5`, no `claude-sonnet-5-2026xxxx`); la doc aclara que "Every Claude model ID is a pinned snapshot, including the dateless IDs used from the 4.6 generation on". La excepcion del lineup actual es Haiku 4.5, cuyo snapshot es `claude-haiku-4-5-20251001` con alias `claude-haiku-4-5`.

## 6. Entrada por voz para el modo "explica en voz alta"

### 6.0 Restriccion previa que condiciona todo

**Claude no acepta audio como entrada.** La pagina de modelos dice: "All current models support **text and image input**, text output, multilingual capabilities, vision, and tool use" ([platform.claude.com/docs/en/about-claude/models/overview](https://platform.claude.com/docs/en/about-claude/models/overview), leido 14-sep-2026). No hay audio en esa lista.

Consecuencia: **hay que transcribir a texto antes de llamar a Claude, sin excepcion.** No existe el atajo de mandar el audio y que la IA lo corrija.

### 6.1 Web Speech API (`SpeechRecognition`)

Fuente: [developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition), leido 14-sep-2026.

- MDN la clasifica como **"Limited availability"** y dice textualmente: "This feature is not Baseline because it does not work in some of the most widely-used browsers."
- **Soporte por navegador** (de busqueda, [testmuai.com](https://www.testmuai.com/learning-hub/speech-recognition-api-browser-support/) y el wiki de Mozilla) **(resumen de busqueda, no leido)**:
  - **Chrome, Edge, Opera**: soporte completo.
  - **Safari**: desde 14.1 en macOS y 14.5 en iOS/iPadOS, con prefijo `webkitSpeechRecognition`.
  - **Firefox**: implementado **pero desactivado por defecto** tras el flag `dom.webspeech.recognition.enable` desde Firefox 22. Mozilla nunca lo ha activado para usuarios finales. **Firefox sigue siendo el gran agujero en 2026.**
- **Privacidad, cita de MDN**: "On some browsers, like Chrome, using Speech Recognition on a web page involves a server-based recognition engine. Your audio is sent to a web service for recognition processing, so it won't work offline." Es decir, por defecto **el audio del usuario sale del dispositivo hacia Google o Apple**, no hacia Devsparring. Hay que decirlo en la UI.
- **Novedad relevante: reconocimiento on-device.** MDN documenta tres piezas nuevas:
  - `SpeechRecognition.processLocally` (booleano): exige que el reconocimiento se haga localmente en el dispositivo.
  - `SpeechRecognition.install()` (estatico): instala los language packs necesarios para reconocimiento on-device.
  - `SpeechRecognition.available()` (estatico): comprueba si unos idiomas estan disponibles.
  Esto resuelve el problema de privacidad **donde este soportado**. **No he podido verificar en que navegadores y versiones estan disponibles estas tres APIs**: la tabla de compatibilidad de MDN no vino en el fetch. **Lo digo como carencia, no como hipotesis.**
- **Coste: cero.** Es API de navegador.
- Limitaciones practicas conocidas: sesiones que se cortan por silencio, resultados intermedios que cambian, precision variable con vocabulario tecnico en ingles dentro de una frase en espanol (el caso exacto de Devsparring: "el algoritmo es O de n log n usando un heap"). **Hipotesis, no confirmado**: esperaria precision mediocre con terminos tecnicos mezclados, y merece una prueba real antes de comprometerse.

### 6.2 Whisper en el navegador via transformers.js

- Paquete: **`@huggingface/transformers@4.2.0`**, licencia **Apache-2.0**, **9.536.375 bytes** sin comprimir el paquete npm, con `onnxruntime-web` como dependencia (registry.npmjs.org, leido 14-sep-2026). Repo: [github.com/huggingface/transformers.js](https://github.com/huggingface/transformers.js).
- Tamanos de modelo (de busqueda, **(resumen de busqueda, no leido)**): **whisper-base ~200 MB**, **whisper-small.en ~240 MB**, y "both run in real time on modern hardware with WebGPU". Con cuantizacion (`dtype: "q8"` o `"q4"`) baja bastante.
- Diferencia de rendimiento WebGPU vs WASM: los benchmarks citados hablan de un factor ~10x en generacion de tokens. **Sin WebGPU la experiencia sera mala.**
- Pros: **privacidad total** (el audio no sale del dispositivo), funciona offline tras la primera descarga, coste cero por minuto, funciona **tambien en Firefox** (a diferencia de Web Speech API).
- Contras honestos para Devsparring:
  - **200+ MB de descarga la primera vez.** Para una app de entrenamiento de entrevistas eso es una barrera de entrada brutal. Se puede cachear en el Cache API / IndexedDB, pero el primer uso duele.
  - **Consumo de memoria y bateria**: las referencias hablan de ~1-1,5 GB de VRAM para Whisper + un LLM pequeno; solo Whisper sera menos, pero sigue siendo significativo.
  - **Movil**: combinado con lo de la seccion 2 (Monaco malo en movil), montar Whisper en un movil de gama media es poco realista.
  - **Complejidad**: worker propio, gestion de descarga, progreso, fallback. Para un desarrollador solo es una feature de varios dias, no de una tarde.

### 6.3 APIs de pago

Precios de busqueda (**(resumen de busqueda, no leido)**, ninguna pagina de pricing leida directamente; verificar antes de comprometerse):
- **Deepgram Nova-3**: ~$0,0043/min batch, ~$0,0077/min streaming ([deepgram.com/pricing](https://deepgram.com/pricing)).
- **AssemblyAI**: desde ~$0,0025/min, y una referencia a Universal-2 a ~$0,15/hora ([assemblyai.com/blog/speech-to-text-api-pricing](https://www.assemblyai.com/blog/speech-to-text-api-pricing)).
- **OpenAI Whisper API**: $0,006/min. `gpt-4o-transcribe` es mucho mas caro (~$0,06/min de audio de entrada).
- Advertencia recurrente en las comparativas: con add-ons activados (diarizacion, puntuacion avanzada, etc.) el coste efectivo puede ser 2-4x el precio base anunciado.

Traducido a Devsparring: una respuesta hablada de **2 minutos** cuesta ~**$0,009** con Deepgram batch o ~$0,012 con Whisper API. Es decir, **del mismo orden que la propia correccion con Sonnet 5 ($0,0126)**. No es despreciable, pero tampoco es el problema.

**El problema real es quien paga.** Devsparring esta disenado para que el usuario pague su IA con su clave de Anthropic. Si Devsparring introduce un STT de pago, **Devsparring paga**, y eso rompe el modelo de presupuesto minimo. Opciones: pedir tambien una clave de Deepgram al usuario (friccion inaceptable), o comer el coste (no compatible con "presupuesto minimo").

### 6.4 Veredicto de la seccion 6

**Estrategia de tres escalones, en este orden:**

1. **Escalon 0, el que se implementa primero: texto.** El modo "explica en voz alta" arranca con un textarea y un temporizador. El usuario habla en voz alta **de verdad** (eso es el ejercicio) y luego escribe un resumen de lo que dijo, o simplemente sus notas. La correccion se hace sobre eso.
   - Suena a trampa, pero no lo es: el valor del ejercicio "explica en voz alta" es **forzar la articulacion**, y un temporizador con una pregunta abierta ya lo consigue. La transcripcion literal es un lujo.
   - Coste de implementacion: horas. Coste de operacion: cero. Funciona en todos los navegadores, tambien en movil.
2. **Escalon 1: Web Speech API como mejora progresiva.** Si `window.SpeechRecognition || window.webkitSpeechRecognition` existe, mostrar un boton de microfono que rellena el textarea; el usuario puede corregir el texto antes de enviar. Si no existe (Firefox), no se muestra el boton y no pasa nada.
   - Coste: cero euros, un dia de trabajo.
   - Cubre Chrome, Edge, Opera y Safari, que es la gran mayoria del trafico de escritorio.
   - **Obligatorio**: aviso en la UI de que el navegador puede enviar el audio a un servicio del fabricante. Y si `SpeechRecognition.available()` y `processLocally` estan disponibles, intentar primero el modo local. **Hay que verificar el soporte real de esas APIs antes de depender de ellas.**
   - El usuario **siempre** ve y puede editar el texto antes de que se envie a Claude. Esto convierte la precision mediocre del reconocimiento en un problema menor.
3. **Escalon 2, solo si hay demanda medida: Whisper via transformers.js, opt-in explicito.** Un boton "usar transcripcion local de alta precision (descarga ~200 MB una vez)". Solo en escritorio, solo con WebGPU disponible.
   - Es la opcion correcta en privacidad y coste marginal, y la unica que da Firefox.
   - No se construye en el MVP: 200 MB de descarga para una feature que nadie ha pedido todavia es la definicion de coste prematuro.

**Se descartan las APIs de pago** (Deepgram, AssemblyAI, OpenAI) para el MVP, por una razon de modelo de negocio y no tecnica: Devsparring no puede costear un coste por minuto de usuario con presupuesto minimo, y pedir una segunda clave de API al usuario es friccion que mata la feature. Reconsiderar solo si Devsparring llega a tener ingresos propios.

**Viabilidad global: alta para el escalon 1, baja para depender solo de voz.** El error a evitar es hacer que el modo "explica en voz alta" **requiera** reconocimiento de voz. Debe funcionar sin microfono desde el dia 1.

## 7. Skills de diseno para agentes (impeccable, taste-skill, emilkowalski/skill)

Todos los metadatos de esta seccion vienen de la **GitHub API consultada el 14-sep-2026**.

### 7.1 `pbakaus/impeccable`

| Campo | Valor |
|---|---|
| URL | [github.com/pbakaus/impeccable](https://github.com/pbakaus/impeccable) |
| Descripcion | "The design language that makes your AI harness better at design." |
| Estrellas | **68.009** |
| Forks | 4.165 |
| Creado | 16-nov-2025 |
| Ultimo push | **14-sep-2026 17:15 UTC** (hoy) |
| Issues abiertas | 29 |
| Licencia | **Apache-2.0** |
| Archivado | No |

**Mantenida activamente y de forma muy visible.** Crecio de 0 a 68k estrellas en 10 meses.

**Que instala exactamente** ([README](https://github.com/pbakaus/impeccable/blob/main/README.md), leido 14-sep-2026), con `npx impeccable install`:
- **Un binario**: "a self-contained Impeccable engine binary" que se descarga a `~/.impeccable/bin/` o viaja con el launcher. **Esto es lo mas importante de toda la seccion: no es solo un fichero de instrucciones, es software ejecutable de terceros en tu maquina.**
- **Una skill** con un comando `/impeccable` y **23 subcomandos**: `craft`, `init`, `document`, `extract`, `shape`, `critique`, `audit`, `polish`, `bolder`, `quieter`, `distill`, `harden`, `onboard`, `animate`, `colorize`, `typeset`, `layout`, `delight`, `overdrive`, `clarify`, `adapt`, `optimize`, `live`.
- **Hooks nativos del proveedor** que ejecutan deteccion de diseno al editar ficheros de UI (solo en Claude Code, GitHub Copilot, Codex, Cursor y Grok Build).
- **Un subagente** productor de assets, solo dentro del payload de la skill de Codex.
- Soporta unos 17 harnesses (Claude Code, Cursor, Copilot, Gemini CLI, Codex CLI, OpenCode, Kiro, Trae, Antigravity, etc.).

**Opt-outs documentados**: `--no-hooks` en el install salta la instalacion de hooks. El "live mode" ejecuta opcionalmente `scripts["impeccable:manual-edit-validate"]` **con los permisos del usuario**, y el propio README dice "review before use". El live mode no puede inyectar en sitios HTTPS ya desplegados.

### 7.2 `Leonxlnx/taste-skill`

| Campo | Valor |
|---|---|
| URL | [github.com/Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) |
| Descripcion | "Taste-Skill - gives your AI good taste. stops the AI from generating boring, generic slop" |
| Estrellas | **87.089** (mas que impeccable) |
| Forks | 5.936 |
| Creado | 19-feb-2026 |
| Ultimo push | **24-ago-2026** |
| Issues abiertas | 66 |
| Licencia | **MIT** |
| Archivado | No |

**Mantenida, pero con tres semanas sin push al 14-sep-2026 y 66 issues abiertas**, que es bastante para un repo de ficheros markdown.

**Que instala exactamente** ([README](https://github.com/Leonxlnx/taste-skill/blob/main/README.md), leido 14-sep-2026):
- `npx skills add https://github.com/Leonxlnx/taste-skill`, o una sola con `--skill "design-taste-frontend"`.
- **Solo ficheros de instrucciones portables en formato `SKILL.md`.** Textual del README: **no instala hooks, ni subagentes, ni binarios, ni slash commands.**
- Contiene skills de implementacion (11 variantes de diseno frontend, incluida una v2 experimental) y skills de generacion de imagenes (moodboards para web, apps moviles, brand kits).
- Se pueden **pegar a mano** en la conversacion en lugar de usar el CLI.
- Caveat de version: **la v2 experimental es ya la por defecto**; quien dependiera del comportamiento v1 debe instalar `design-taste-frontend-v1` explicitamente. Es decir, **hubo un cambio de comportamiento sin cambio de nombre**.
- El README aclara que "Taste Skill has no official token, coin, or crypto project". Que haya que aclararlo dice algo del entorno.

### 7.3 `emilkowalski/skill` (el repo real es `emilkowalski/skills`)

| Campo | Valor |
|---|---|
| URL | [github.com/emilkowalski/skills](https://github.com/emilkowalski/skills) (la URL `emilkowalski/skill` redirige aqui) |
| Descripcion | "Skills for Designers and Engineers." |
| Estrellas | **37.677** |
| Forks | 2.126 |
| Creado | 16-mar-2026 |
| Ultimo push | **21-ago-2026** |
| Issues abiertas | **1** |
| Licencia | **MIT** |
| Archivado | No |

**Que contiene** ([README](https://github.com/emilkowalski/skills), leido 14-sep-2026): 11 skills, muy sesgadas a **animacion**:
`emil-design-eng` (la principal), `animate`, `animate-expo`, `review-animations`, `improve-animations`, `find-animation-opportunities`, `animation-vocabulary`, `apple-design`, `write-swift`, `pick-ui-library`, `ask-sonner`.

Install: `npx skills@latest add emilkowalski/skills`.

**Carencia honesta: el README no especifica si la instalacion crea hooks, agentes o comandos**, ni declara harnesses soportados ni la licencia en el cuerpo (GitHub reporta MIT). Por el formato y por ser el autor de Sonner y Vaul, **hipotesis, no confirmado**: son ficheros `SKILL.md` puros sin binarios, como taste-skill. No lo he verificado leyendo el arbol del repo.

Contexto de autoridad: Emil Kowalski es autor de Sonner y Vaul, dos librerias de UI muy usadas. **Para animacion y "detalle" es la fuente mas creible de las tres.** 1 sola issue abierta sugiere un repo cuidado, no abandonado.

### 7.4 Alternativas de 2026, incluida la oficial

Consulta del directorio [skills.sh/topic/design](https://www.skills.sh/topic/design) (leido 14-sep-2026; **la pagina no publica contadores de instalacion**). Orden en que las lista:

1. **`frontend-design` (anthropics/skills)** - "Comprehensive frontend design patterns and visual polish guidance"
2. **`web-design-guidelines` (vercel-labs/agent-skills)** - "Vercel's Web Interface Guidelines covering spacing, typography, interaction, and accessibility"
3. `vercel-composition-patterns` (vercel-labs/agent-skills)
4. `ui-ux-pro-max` (nextlevelbuilder)
5. `sleek-design-mobile-apps`
6. `canvas-design` (anthropics/skills)
7-12. Seis skills sueltas de **impeccable** (`polish`, `critique`, `bolder`, `delight`, `distill`, `quieter`) listadas **individualmente**, lo que confirma que se pueden adoptar por partes sin instalar el binario
13. `extract-design-system`
14-15. `design-taste-frontend` y `high-end-visual-design` (taste-skill)
16. `emil-design-eng` (emilkowalski)

El repo oficial [anthropics/skills](https://github.com/anthropics/skills) tiene **176.282 estrellas** y push el **10-sep-2026** (GitHub API, 14-sep-2026); no declara licencia en los metadatos y tiene 1.232 issues abiertas.

**Que dice la skill oficial `frontend-design`** ([SKILL.md en anthropics/claude-code](https://github.com/anthropics/claude-code/blob/main/plugins/frontend-design/skills/frontend-design/SKILL.md), leido 14-sep-2026): tipografia como portadora de personalidad (una o dos familias elegidas a conciencia), longitud de linea por debajo de 80 caracteres, mas line-height para cuerpo en serif, movimiento escaso y con proposito, "structure should encode information, not decorate". Y **una lista explicita de defaults de IA a evitar**: fondo crema con acentos terracota, casi-negro con acentos verde acido, layouts de periodico con hairlines, el "SaaS-card kit" de tarjetas redondeadas identicas, y chrome de plantilla tipo "ALL-CAPS eyebrows" y labels con tracking. Tambien desaconseja resaltar una sola palabra en los titulares, labels en mayusculas innecesarios, secuencias numeradas sin secuencia real y animaciones de hover dispersas.

### 7.5 Opiniones de usuarios y evidencia critica

Esta es la parte que cambia el veredicto, y hay que leerla antes de instalar nada.

- **Kyle Redelinghuys, "Best Claude Code Skills: Which Ones Are Actually Worth Installing"** ([ksred.com](https://www.ksred.com/best-claude-code-skills-which-ones-are-actually-worth-installing/), publicado **10-ago-2026**, leido 14-sep-2026). Metodologia: uso personal durante semanas comparando contra Claude Code vanilla, cruzado con un analisis mas amplio de Mikhail Shcheglov que **probo 47 skills de una coleccion popular y reviso 200+ skills en varios repos**. Resultados citados:
  - De esas 47, **"forty of them made the output worse"**.
  - Tesis central, textual: **"most publicly available skills don't just fail to help, they actively hurt, adding tokens, adding latency and injecting constraints"**.
  - Conclusion sobre categorias: las skills de **verificacion** son las que mas impacto medible tienen en la calidad, **no** las de diseno ni las de productividad, "that fill the top of every ranking".
  - **Honestidad requerida: este articulo no da resultados especificos para impeccable, taste-skill ni frontend-design.** Las menciona en la categoria "situational". No puedo afirmar que impeccable empeore el output; puedo afirmar que la mayoria de skills publicas lo hacen.
- **Ruoqi Jin, "The Best-Regarded Frontend-Design Skills for AI Coding Agents"** ([ruoqijin.com](https://ruoqijin.com/blog/frontend-design-skills-ai-agents), publicado **26-jun-2026**, leido 14-sep-2026). Ranking: (1) `frontend-design` de Anthropic como "the agreed baseline", (2) impeccable, (3) taste-skill, (4) `web-design-guidelines` de Vercel como "quality gate auditing code against 100 rules". Cita una opinion de usuario sobre impeccable: "This is the only set of agent skills I ever found use in."
  - Criticas que recoge: el bloqueo de fuentes es **"a band-aid for a training-data problem, not a design philosophy"**; las skills de estetica audaz **chocan con herramientas internas que necesitan consistencia**.
  - **Dato de seguridad que hay que tomarse en serio: "36.82% of scanned skills had flaws; 13.4% had critical issues".** No pude rastrear el estudio primario de donde sale, asi que lo trato como senal, no como hecho **(la cifra viene de este articulo, no del estudio original)**.
  - **No menciona a emilkowalski en absoluto.**
- Comparativas secundarias ([composio.dev/content/top-design-skills](https://composio.dev/content/top-design-skills), [aitoolnet.com/compare/impeccable-vs-taste-skill](https://www.aitoolnet.com/compare/impeccable-vs-taste-skill)) coinciden en la caracterizacion: **impeccable es la mas "product/UX serious"** y corre en dos modos (brand y product); **taste-skill es la mas "art-directed" y agresiva**, con una reescritura en 2026 de reglas mas estrictas **(resumen de busqueda, no leido)**.

### 7.6 Veredicto de la seccion 7

Contexto que manda: Devsparring lo hace **un desarrollador solo**, con presupuesto minimo, y su valor no esta en el aspecto visual sino en la calidad de las preguntas y de la correccion. Toda skill de diseno se paga en **tokens en cada turno** y en restricciones sobre el output.

**Usar:**

1. **`frontend-design` de `anthropics/skills`. Esta es la eleccion por defecto y puede que la unica necesaria.** Razones: es oficial, es la baseline que el ecosistema reconoce, no instala binarios ni hooks, su contenido es concreto y accionable (la lista de anti-patrones es directamente util), y no hay riesgo de supply chain. Coste en tokens: bajo.
2. **`web-design-guidelines` de `vercel-labs/agent-skills`, como gate de calidad y accesibilidad.** Encaja bien con Devsparring porque cubre spacing, tipografia, interaccion y **accesibilidad**, que importa de verdad en una app con editor de codigo y modo teclado. Se invoca al final, no en cada turno.
3. **De `emilkowalski/skills`, solo `animate` y `review-animations`, y solo cuando toque animacion.** Es la fuente mas creible en movimiento (autor de Sonner/Vaul), es MIT, tiene 1 issue abierta, y no hay nada en Devsparring que justifique animaciones complejas mas alla de transiciones de sesion y feedback de correccion. **Descartar `write-swift`, `animate-expo`, `ask-sonner` y `apple-design`**: Devsparring es web, no iOS, y no usa Sonner necesariamente.

**Usar por partes, nunca completa:**

4. **De `impeccable`: las skills individuales `critique`, `audit` y `polish`, tomadas desde el directorio (skills.sh las lista sueltas) o copiadas a mano del repo, que es Apache-2.0.** Se usan **a demanda** ("critica esta pantalla") y no de forma pasiva.
   - **Explicitamente SIN hooks** (`--no-hooks` si se instala via `npx impeccable install`), y preferiblemente **sin el instalador**, para no meter un binario de terceros en `~/.impeccable/bin/`. Un dev solo no tiene banda para auditar eso, y el propio README avisa de que el live mode ejecuta scripts con permisos del usuario.
   - Razon para no instalar el paquete completo: 23 subcomandos + hooks que se disparan en cada edicion de UI es exactamente el perfil de "adding tokens, adding latency and injecting constraints" que describe el articulo de ksred. Impeccable puede ser buena y aun asi ser demasiada para este proyecto.

**Descartar:**

5. **`taste-skill` completa.** Razonamiento, no prejuicio: (a) su valor declarado es estetica audaz y art direction, y Devsparring necesita **una UI sobria y legible con un editor de codigo dentro**, no una landing con personalidad; (b) la v2 se convirtio en default cambiando el comportamiento sin cambiar el nombre, que es una senal de inestabilidad para algo de lo que dependes en cada turno; (c) 66 issues abiertas para un repo de markdown; (d) la critica de que las skills de estetica audaz chocan con interfaces que necesitan consistencia aplica literalmente a Devsparring. Si algun dia hace falta una landing con caracter, se usa `high-end-visual-design` **para esa pagina y nada mas**.
6. **Cualquier skill que instale un binario o hooks globales.** Con 36,82% de skills escaneadas con fallos segun la fuente citada (senal, no dato firme), y con un solo desarrollador sin capacidad de auditoria, la politica correcta es: **ficheros de instrucciones si, codigo ejecutable no.**
7. **No hace falta ninguna skill de Next.js.** Vercel **retiro sus Skills** precisamente porque desde Next 16.3 `next dev` escribe y mantiene un bloque `AGENTS.md` que apunta a los docs versionados en `node_modules` (ver seccion 1, fuente: blog de Next 16.3 leido 14-sep-2026).

**Regla general que se deriva de la evidencia**: instalar una skill de diseno **de forma pasiva y permanente** es un coste en cada turno; invocarla **a demanda** es casi gratis. Por tanto: baseline oficial siempre activa, todo lo demas bajo demanda.

## 8. Workflow periodico en GitHub Actions y fuentes monitorizables

### 8.1 La parte de GitHub Actions

Fuente: [docs.github.com: Events that trigger workflows](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows), leido 14-sep-2026.

Hechos que condicionan el diseno, citas textuales:
- "The shortest interval you can run scheduled workflows is once every 5 minutes."
- "The `schedule` event **can be delayed** during periods of high loads of GitHub Actions workflow runs. High load times include the start of every hour." Es decir, **no cronometres nada**; elige una hora rara (por ejemplo `17 6 * * 1`, no `0 9`).
- "In a public repository, scheduled workflows are **automatically disabled when no repository activity has occurred in 60 days**."
- "Scheduled workflows run on the latest commit on the **default branch**" y "Scheduled workflows will only run on the default branch." Consecuencia: el workflow debe estar mergeado en `main`, no se puede probar el schedule desde una rama.

**Problema concreto: cron no sabe expresar "cada 3 semanas".** El cron POSIX de 5 campos no tiene concepto de "cada N semanas": `*/3` en el campo de dia de semana no hace eso. Las opciones reales:

- **(Recomendada) Cron semanal + puerta de fecha en el propio job.** Se ejecuta cada lunes, y el primer step aborta si no han pasado 21 dias desde la ultima ejecucion efectiva. El estado se guarda en un fichero versionado, por ejemplo `.github/last-question-sweep`, que el propio PR actualiza. Ventajas: determinista, auditable en git, y **si un run se salta por carga de GitHub el siguiente lunes lo recupera**.
  ```yaml
  on:
    schedule:
      - cron: "17 6 * * 1"     # lunes, minuto raro para evitar el pico de la hora en punto
    workflow_dispatch:          # imprescindible para probar a mano
  ```
- Alternativa mas burda: `cron: "17 6 1,22 * *"` (dias 1 y 22 de cada mes), que da ~3 semanas de media pero con deriva. Mas simple, menos correcto.
- **Incluir siempre `workflow_dispatch`**: sin eso, probar el workflow implica esperar al lunes.
- **Sobre los 60 dias de inactividad**: con una cadencia de 3 semanas el repo tendra PRs y commits de forma natural, asi que no deberia dispararse. **Hipotesis, no confirmado**: no se si una ejecucion programada cuenta por si misma como "repository activity" a efectos de ese contador. Mitigacion barata: el workflow deja un commit o un PR aunque no encuentre nada (por ejemplo, actualizar el fichero de fecha).

### 8.2 Autenticacion con token OAuth de suscripcion

Fuente: [code.claude.com/docs/en/github-actions](https://code.claude.com/docs/en/github-actions), leido 14-sep-2026. Esto esta documentado y soportado oficialmente:

- Action oficial: **`anthropics/claude-code-action@v1`**.
- Dos secretos posibles: `ANTHROPIC_API_KEY` (clave de la Console) o **`CLAUDE_CODE_OAUTH_TOKEN`**, descrito como "an OAuth token that authenticates with your Claude subscription, available on **Pro, Max, Team, and Enterprise** plans. Generate one by running **`claude setup-token`** locally."
- En el workflow se pasa como input `claude_code_oauth_token: ${{ secrets.CLAUDE_CODE_OAUTH_TOKEN }}` en lugar de `anthropic_api_key`.
- **Frase clave para el presupuesto**: "If you authenticate with an OAuth token, runs use your **Claude subscription** instead of API billing." Es decir, **el workflow de Devsparring no consume credito de API**, solo minutos de GitHub Actions.
- Aviso de la propia doc para organizaciones: "For a secret shared across repositories, authenticate with an API key ... rather than an OAuth token, since an OAuth token is **tied to the subscription of the person who ran `claude setup-token`**." Para un desarrollador solo esto es justo lo que se quiere.
- Compatibilidad legal: la seccion 7 de legal-and-compliance dice que OAuth es "for purchasers of ... subscription plans and is designed to support **ordinary use** of Claude Code". El workflow de Devsparring es el propio dueno automatizando su propio repo, no ofreciendo acceso a terceros, asi que encaja. **Cuidado con el limite**: "Advertised usage limits for Pro and Max plans assume **ordinary, individual usage**". Un workflow cada 3 semanas es ordinario; uno cada hora con 50 turnos no lo seria. **Hipotesis, no confirmado**: no hay un umbral publicado.

**Modo automation y quien dispara el run.** Detalle que rompe workflows programados y esta documentado:
- Al pasar un `prompt`, la action entra en **automation mode** y no espera un `@claude`.
- La action hace **dos comprobaciones sobre el actor que dispara**: acceso de escritura (los eventos `schedule` **se saltan** esta comprobacion, porque no hay autor) y **"human actor"**, que **si** aplica a los runs programados: "This check also applies to scheduled runs, which GitHub attributes to a repository user, usually the one who last changed the workflow's `cron` schedule. If that user is a bot, list it in `allowed_bots`."
- En automation mode, **por defecto los resultados van al log del run, no a un comentario**. Para que Claude abra un PR hay que darle las tools y los permisos.
- Tools: con un prompt de texto plano, "Claude has no shell or GitHub API access until you grant the tools the prompt needs", via `--allowedTools` en `claude_args` o reglas `permissions.allow` en el input `settings`. **Si se invoca una skill, la skill puede traer sus propias `allowed-tools` en el frontmatter.**
- Permisos del job para abrir PRs: la GitHub App usa **Contents: read/write, Issues: read/write, Pull requests: read/write**. En el job: `contents: write`, `pull-requests: write`, `issues: write`, `id-token: write` (necesario para la auth por defecto de la App) y `actions: read`.
- **Trampa documentada**: "GitHub doesn't trigger workflows on commits made with the default `GITHUB_TOKEN`". Si el PR de Devsparring debe disparar CI (los tests de Vitest), **no pasar `github_token: ${{ secrets.GITHUB_TOKEN }}`**, dejar que la action se autentique como la Claude GitHub App, o usar un token de App propia.
- Control de coste: `--max-turns` en `claude_args`, timeout a nivel de workflow, y `concurrency` para no solapar runs.

**Esqueleto propuesto** (a validar en un spike):

```yaml
name: Barrido de preguntas
on:
  schedule:
    - cron: "17 6 * * 1"
  workflow_dispatch:
concurrency:
  group: barrido-preguntas
  cancel-in-progress: false
jobs:
  barrido:
    runs-on: ubuntu-latest
    timeout-minutes: 30
    permissions:
      contents: write
      pull-requests: write
      issues: write
      id-token: write
      actions: read
    steps:
      - uses: actions/checkout@v6
      - name: Puerta de 21 dias
        id: gate
        run: |
          # sale con 'skip=true' si no han pasado 21 dias desde .github/last-question-sweep
      - if: steps.gate.outputs.skip != 'true'
        uses: anthropics/claude-code-action@v1
        with:
          claude_code_oauth_token: ${{ secrets.CLAUDE_CODE_OAUTH_TOKEN }}
          prompt: "/barrido-preguntas"      # skill en .claude/skills/ del repo
          claude_args: |
            --max-turns 40
            --model claude-sonnet-5
```

Nota de diseno importante: **meter el prompt en una skill versionada en `.claude/skills/barrido-preguntas/SKILL.md`**, no en el YAML. Asi el prompt se revisa en PRs, se itera, y la skill puede declarar sus `allowed-tools`.

### 8.3 Fuentes monitorizables de forma legal y estable

Ordenadas de mejor a peor para Devsparring.

**A. Hacker News API (Firebase). La mejor de todas.**
- [github.com/HackerNews/API](https://github.com/HackerNews/API), leido 14-sep-2026. Base: `https://hacker-news.firebaseio.com/v0/`.
- **Sin autenticacion, sin API key**, y textual: **"There is currently no rate limit."**
- Licencia del repo de docs: **MIT**.
- Endpoints utiles: `/item/<id>.json`, `/topstories`, `/newstories`, `/beststories` (hasta 500 cada uno), `/askstories`, `/showstories` (hasta 200), `/maxitem`, `/updates`.
- Limitacion real: **no hay busqueda**. Para "encuentra hilos sobre preguntas de entrevistas de JS" hace falta la API de **Algolia para HN** (`hn.algolia.com/api/v1/search`). El README **no la menciona**; no la he verificado en esta sesion. **(no verificado)**
- Veredicto: **usar. Es la fuente con mejor relacion valor/friccion.** Los hilos "Ask HN" y los de contratacion son oro para detectar que preguntan las empresas hoy.

**B. GitHub API (repos de preguntas de entrevista).**
- Limites ([docs.github.com: rate limits for the REST API](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api), leido 14-sep-2026): **60 req/hora sin autenticar**, **5.000 req/hora con personal access token**, **5.000/hora minimo con installation token de GitHub App**, y **`GITHUB_TOKEN` en Actions: 1.000 req/hora por repositorio**. Limites secundarios: max 100 requests concurrentes y no mas de 900 puntos por minuto en REST. Los endpoints de busqueda tienen limites mas restrictivos.
- Para Devsparring: con `GITHUB_TOKEN` del propio workflow, 1.000 req/hora es de sobra para vigilar 20-30 repos.
- Que vigilar: commits recientes y releases de repos de preguntas (tipo `sudheerj/javascript-interview-questions`, `lydiahallie/javascript-questions`, `yangshun/tech-interview-handbook`), y los issues donde la gente reporta que una respuesta esta obsoleta. **Eso ultimo es la senal mas valiosa para "preguntas obsoletas"**: si un repo tiene un issue abierto diciendo "esta respuesta sobre `var` ya no aplica", Devsparring tiene la misma pregunta desactualizada.
- Legal: repos publicos, y **hay que respetar la licencia de cada repo**. Muchos de estos estan en MIT o CC-BY; algunos no declaran licencia, y en ese caso **no se puede copiar el texto**, solo usarlo como senal para escribir una pregunta propia. Este es un punto que hay que codificar en el prompt de la skill: **detectar, no copiar**.
- Veredicto: **usar, con regla explicita de no copiar texto sin licencia compatible.**

**C. RSS de blogs y newsletters.**
- Sin terminos que lo prohiban: un feed RSS **existe para ser leido por maquinas**. Es la fuente mas limpia legalmente que hay.
- Estable: si el feed cambia de URL, falla ruidosamente y se arregla.
- Que suscribir para Devsparring: el blog de Next.js (que ya hemos visto que publica con fecha), el blog de TypeScript (devblogs de Microsoft), el de React, el changelog de Supabase, y newsletters de frontend. Para "preguntas obsoletas" esto es lo mas directo: **si Next 16 elimino `next lint` y hace `params` async, cualquier pregunta de Devsparring sobre eso esta obsoleta**, y el feed te lo dice.
- Veredicto: **usar. Es la fuente principal para detectar obsolescencia**, mientras HN y GitHub son las fuentes para detectar novedad.

**D. Stack Overflow / Stack Exchange API.**
- Limites (de busqueda, **(resumen de busqueda, no leido)**; `api.stackexchange.com` no era accesible desde aqui el 14-sep-2026): version actual **2.3**; **300 queries/24h por IP sin API key**, **10.000 queries/dia por par (key, IP)** con key registrada en Stack Apps, y un techo de **30 req/s por IP** ([kevinmontrose.com](https://kevinmontrose.com/2012/03/22/stack-exchange-api-v2-0-throttling/), [rollout.com](https://rollout.com/integration-guides/stack-exchange/api-essentials)).
- **Licencia del contenido: CC BY-SA.** Esto es lo importante: se puede reutilizar **con atribucion y compartiendo igual**. Para Devsparring significa que **no se puede meter texto de Stack Overflow en el banco de preguntas sin atribuir y sin licenciar igual el banco**. Como senal (que temas se preguntan, que respuestas cambian) es perfectamente usable.
- Veredicto: **usar solo como senal**, con 300 queries/dia sin key para empezar. No copiar texto.

**E. API de Reddit. Usable pero con friccion real, y con un riesgo de acceso.**
- **No pude leer las fuentes primarias**: `redditinc.com/policies/data-api-terms`, `support.reddithelp.com` y `reddit.com/wiki/api` **devolvieron 403 o fueron inaccesibles desde este entorno el 14-sep-2026**. Todo lo que sigue es **(resumen de busqueda, no leido)** y hay que verificarlo antes de escribir codigo.
- Limites que reportan las fuentes secundarias: **100 QPM por client ID con OAuth**, **10 QPM sin OAuth**, y el limite de 100 QPM medido como media sobre una ventana de 10 minutos ([socialcrawl.dev](https://www.socialcrawl.dev/blog/reddit-data-api-2026), [painpointmap.com](https://www.painpointmap.com/blog/reddit-api-rate-limits-guide)).
- **Gratis para uso no comercial** (proyectos personales, bots, herramientas de moderacion, investigacion academica) dentro de esos limites. **Comercial requiere aprobacion y acuerdo de pago**, con cifras citadas de **$0,24 por 1.000 llamadas** y tramos que empiezan en el orden de $12.000/mes ([prowlo.com/blog/reddit-data-api](https://prowlo.com/blog/reddit-data-api), [octolens.com/blog/reddit-api-pricing](https://octolens.com/blog/reddit-api-pricing)).
- **Riesgo nuevo y grave**: varias fuentes coinciden en que la "Responsible Builder Policy" **cerro el registro self-service de apps a finales de 2025**: cada nuevo OAuth client, gratis o de pago, pasa por **aprobacion manual por ticket**, con cola lenta y posibilidad de rechazo silencioso ([socialcrawl.dev](https://www.socialcrawl.dev/blog/reddit-data-api-2026), [replydaddy.com](https://replydaddy.com/blog/reddit-api-pre-approval-2025-personal-projects-crackdown)) **(resumen de busqueda, no leido)**. Si esto es cierto, **Devsparring puede no conseguir acceso, o tardar semanas**.
- **Restriccion de ML/IA**: las Data API Terms no conceden derecho a usar User Content para entrenar modelos de ML o IA sin permiso expreso de los titulares. **Matiz importante para Devsparring: leer hilos para que Claude detecte temas no es "entrenar un modelo"**, pero es una zona que conviene no pisar mas de lo necesario, y desde luego **no se puede volcar contenido de Reddit al banco de preguntas**.
- **Nunca scrapear Reddit como fallback.** Si no hay acceso a la API, no hay Reddit.
- Veredicto: **fuente opcional, de segunda fase.** Si sale gratis y aprobada, r/ExperiencedDevs, r/cscareerquestions y r/reactjs son utiles. Si no, **no bloquea el proyecto**: HN + GitHub + RSS cubren el 90%.

### 8.4 Lo que NO se puede scrapear, con la fuente

**LinkedIn: prohibido explicitamente.** [linkedin.com/legal/user-agreement](https://www.linkedin.com/legal/user-agreement), **efectivo el 3-nov-2025**, **leido 14-sep-2026**. Citas textuales de la seccion 8.2 (Don'ts):
- 8.2(2): "Develop, support or use software, devices, scripts, robots or any other means or processes (such as crawlers, browser plugins and add-ons or any other technology) **to scrape or copy the Services, including profiles and other data from the Services**"
- 8.2(4): "**Copy, use, display or distribute any information (including content) obtained from the Services**, whether directly or through third parties (such as search tools or data aggregators or brokers), **without the consent of the content owner**"
- 8.2(13): "Use bots or other unauthorized automated methods to access the Services..."

Esto cubre tambien los agregadores: **no vale usar un tercero que scrapee LinkedIn por ti**, porque 8.2(4) menciona expresamente "data aggregators or brokers". Veredicto: **LinkedIn queda fuera, sin matices.**

**Glassdoor: prohibido, pero no pude leer la fuente primaria.** `glassdoor.com/about/terms.htm` y `glassdoor.com/about/terms/` devolvieron **HTTP 403** el 14-sep-2026, asi que **no he verificado el texto directamente**. Las fuentes secundarias citan clausulas como: prohibicion de introducir "software or automated agents to the services, or access the services so as to produce multiple accounts, generate automated messages, or **to scrape, strip, or mine data from the services without our express written permission**", y "You may not use any robot, spider, scraper, data mining tools, data gathering and extraction tools, or other automated means to access the Services for any purpose without our express written permission" ([liveproxies.io](https://liveproxies.io/blog/how-to-scrape-glassdoor), [theirstack.com](https://theirstack.com/en/blog/how-to-scrape-glassdoor-jobs)) **(resumen de busqueda, no leido; la fuente primaria bloqueada)**. Ademas se reporta que Glassdoor ha litigado contra scrapers.
- Veredicto: **Glassdoor queda fuera.** La direccion es inequivoca aunque la cita no sea de primera mano. Si algun dia hiciera falta, la accion correcta es leer `glassdoor.com/about/terms/` desde un navegador normal y pedir permiso por escrito, no scrapear.

**Otros que hay que asumir fuera por la misma logica** (no verificado uno a uno): cualquier sitio de preguntas de entrevista con login o paywall (LeetCode, HackerRank, Pramp, Interviewing.io). Si hay control de acceso tecnico, saltarselo es otra categoria de problema.

### 8.5 Veredicto de la seccion 8

**Workflow: cron semanal `17 6 * * 1` con puerta de 21 dias en un fichero versionado, `workflow_dispatch` para pruebas, `anthropics/claude-code-action@v1` con `CLAUDE_CODE_OAUTH_TOKEN` de la suscripcion del dueno, prompt en una skill versionada, `--max-turns 40`, timeout de 30 minutos, y salida siempre como pull request para revision humana.**

**Fuentes, en dos capas:**
- **Capa "novedad"**: Hacker News API (sin key, sin rate limit) + GitHub API con `GITHUB_TOKEN` (1.000 req/h) sobre una lista curada de repos de preguntas.
- **Capa "obsolescencia"**: RSS de blogs oficiales (Next.js, TypeScript, React, Supabase). Esta es la capa que de verdad detecta preguntas caducadas, y es la mas barata y limpia de todas.
- **Opcional, fase 2**: Stack Exchange API como senal (nunca copiando texto, CC BY-SA) y Reddit **solo si consigue aprobacion de app**, que en 2026 no esta garantizado.
- **Excluidas por terminos**: LinkedIn (fuente primaria leida y citada) y Glassdoor (direccion clara, fuente primaria bloqueada).

**Tres reglas que deben estar escritas en la skill del workflow**, porque son las que evitan problemas:
1. **Detectar, no copiar.** La salida del workflow es "esta pregunta parece obsoleta por X" o "hay un tema nuevo Y que no cubrimos", con enlaces. La redaccion de la pregunta se escribe de cero.
2. **Cada hallazgo lleva su enlace y su fecha.** Sin fuente, el hallazgo se descarta.
3. **El PR nunca se auto-mergea.** Un workflow que modifica el banco de preguntas sin revision es un vector de contaminacion del producto.

## 9. Testing: Vitest y Playwright con Next App Router

### 9.1 Versiones actuales (verificado 14-sep-2026, registry.npmjs.org)

| Paquete | Version | Licencia | Node requerido |
|---|---|---|---|
| `vitest` | **5.0.0** | MIT | **`^22.12.0 \|\| ^24.0.0 \|\| >=26.0.0`** |
| `@playwright/test` | **1.63.0** | Apache-2.0 | Node >= 20 |

**Restriccion combinada que hay que resolver el dia 1: Next 16 pide Node >= 20.9, pero Vitest 5 pide Node >= 22.12.** Por tanto **Devsparring debe correr en Node 22.12+ o 24 LTS**, tanto en local como en el CI. Si el runner de GitHub Actions usa Node 20, Vitest 5 no arranca. Concretar con `actions/setup-node` y un `.nvmrc`.

### 9.2 Patron oficial con Vitest

Fuente: [nextjs.org/docs/app/guides/testing/vitest](https://nextjs.org/docs/app/guides/testing/vitest), **`version: 16.3.5`, `lastUpdated: 2026-08-25`**, leido 14-sep-2026.

Instalacion (TypeScript):
```
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/dom vite-tsconfig-paths
```

`vitest.config.mts`:
```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: { environment: 'jsdom' },
})
```

**La limitacion que define toda la estrategia de tests, cita textual de la doc:**
> "Since `async` Server Components are new to the React ecosystem, Vitest currently does not support them. While you can still run **unit tests** for synchronous Server and Client Components, we recommend using **E2E tests** for `async` components."

Es decir, en septiembre de 2026 **esto sigue sin resolverse**. No es un detalle: en una app de App Router, **casi todas las paginas que leen datos son Server Components async**, y por tanto **no son testeables con Vitest**.

Otros detalles de la doc:
- `vitest` en `package.json` corre en **modo watch por defecto**. Para CI hay que usar `vitest run`.
- Los tests pueden ir en `__tests__/` o **colocados dentro de `app`** (la doc lo dice explicitamente).
- Hay un ejemplo oficial: `npx create-next-app@latest --example with-vitest`.

### 9.3 Patron oficial con Playwright

Fuente: [nextjs.org/docs/app/guides/testing/playwright](https://nextjs.org/docs/app/guides/testing/playwright), **`version: 16.3.5`, `lastUpdated: 2026-08-25`**, leido 14-sep-2026.

- Setup: `npm init playwright`, que genera `playwright.config.ts`.
- **Recomendacion explicita de correr contra el build de produccion**: "We recommend running your tests against your production code to more closely resemble how your application will behave." Flujo: `npm run build` + `npm run start`, y `npx playwright test` en otra terminal.
- Alternativa: la feature **`webServer`** de Playwright, que arranca el servidor y espera a que responda. Para CI esto es lo practico.
- `baseURL: "http://localhost:3000"` en la config permite `page.goto("/")`.
- Por defecto corre en **Chromium, Firefox y WebKit**. En CI corre headless; `npx playwright install-deps` instala dependencias del sistema.

**Ademas, y esto no esta en la guia de testing sino en el release de 16.3**: existe el helper **`instant()` de `@next/playwright`** (seccion 1), que permite afirmar que una navegacion sigue siendo instantanea:
```ts
import { instant } from '@next/playwright'
await instant(page, async () => {
  await page.click('a[href="/practicar/siguiente"]')
  await expect(page.locator('h1')).toContainText('...')
})
```
El test falla si la UI que antes aparecia al instante deja de hacerlo, por cualquier causa (un `cookies()` anadido en un layout compartido, un `<Suspense>` movido en un refactor). Para Devsparring, que vive de que pasar a la siguiente tarjeta se sienta inmediato, esto es barato y valioso.

### 9.4 Veredicto y patron concreto para Devsparring

La consecuencia de "Vitest no soporta Server Components async" **no es escribir menos tests: es estructurar el codigo para que lo importante sea testeable sin React**. Que es exactamente el veredicto de arquitectura de la seccion 1.

**Piramide propuesta, de abajo arriba:**

**1. Vitest en modo Node (sin jsdom) para la logica pura. Es donde va el 80% de los tests.**
```ts
// vitest.config.mts con dos projects
test: {
  projects: [
    { test: { name: 'node', environment: 'node', include: ['src/**/*.test.ts'] } },
    { test: { name: 'dom',  environment: 'jsdom', include: ['src/**/*.test.tsx'],
               setupFiles: ['./src/testing/setup.ts'] } },
  ],
}
```
Que se testea aqui, y es lo que de verdad protege a Devsparring:
- `src/features/srs/scheduler.ts`: dado un estado de tarjeta y un rating, el nuevo estado. Casos de borde: primera review, lapso tras un intervalo largo, `maximum_interval` respetado, fuzz desactivado para determinismo.
- **El mapeo de puntuacion de rubrica a `Rating`** (seccion 3.4), incluida la salvaguarda de "tests fallando implica maximo `Hard`".
- **El parseo y validacion de la salida de Claude** contra el schema (seccion 5.4), incluidos los casos de salida malformada y de campos fuera de rango (recordar: el schema de la API **no** puede imponer `minimum`/`maximum`, asi que esta validacion es obligatoria, no opcional).
- **El deep equal del runner de asserts** del editor (seccion 2.9): `NaN`, `-0`, `Map`, `Set`, orden de claves. Es la pieza con mas bugs latentes de todo el proyecto.
- **El `sanitize()` que borra la clave de API antes de loggear** (seccion 4.5). Un test que falla si alguien anade un campo nuevo sin sanitizarlo.
- Estos tests **no tocan Supabase, no tocan Anthropic, no tocan React**. Corren en milisegundos.

**2. Vitest + jsdom + React Testing Library, solo para Client Components con logica de interaccion.** Sinceramente, pocos: el panel de feedback, los botones de rating, el formulario de la clave de API. No testear Monaco con jsdom: es una perdida de tiempo garantizada (workers, canvas, medicion de layout).

**3. Playwright para todo lo que sea un flujo real.** Aqui es donde se testea lo que Vitest no puede:
- Login con Supabase y acceso a una ruta protegida (valida el `proxy.ts` y el RLS a la vez).
- El flujo completo de practicar: abrir ejercicio, escribir codigo, ejecutar, ver tests pasar. **Esto es un test de integracion del Web Worker que ninguna otra herramienta cubre.**
- El flujo de correccion con una respuesta de la API de Anthropic **mockeada a nivel de red** con `page.route('**/api/correccion', ...)`. Nunca pegarle a la API real en CI: cuesta dinero y es no determinista.
- Un test de `instant()` sobre la navegacion entre tarjetas.
- Correr contra **el build de produccion** con `webServer`, como recomienda la doc. Motivo especifico de Devsparring: **en dev Next desactiva el prefetch**, asi que los tests de navegacion solo tienen sentido contra `next build` + `next start`.

**4. Lo que NO se hace:** tests de Server Components async. No se puede con Vitest y montar una infraestructura para intentarlo es coste puro. Su comportamiento se cubre en Playwright.

**Setup de CI mínimo y barato** (importante con presupuesto minimo: los minutos de GitHub Actions se pagan):
- Job 1, en cada push: `vitest run` (segundos, casi gratis).
- Job 2, solo en PRs a `main`: `next build` + Playwright **solo en Chromium**. Los tres navegadores triplican los minutos por un beneficio marginal en una app de escritorio. Firefox y WebKit se anaden si aparecen bugs especificos.
- Cachear `~/.cache/ms-playwright` y aprovechar el **filesystem cache de Turbopack**, que en 16.3 esta activado por defecto y da builds repetidos hasta 5,5x mas rapidos (seccion 1). Menos minutos de CI, menos factura.

## Incertidumbres

Lo que no se ha podido verificar, ordenado por riesgo para el proyecto.

### Riesgo alto (bloquea o cambia decisiones)

1. **Monaco + Turbopack en Next 16.3.** El issue [vercel/next.js#72613](https://github.com/vercel/next.js/issues/72613) ("Truly dynamic imports with Turbopack, i.e. support for Monaco editor") existe, pero **no he verificado si esta cerrado**. Turbopack es el bundler por defecto desde Next 16. **Accion: spike de un dia antes de escribir el editor.** Si falla, plan B es CodeMirror 6 + sucrase.
2. **Acceso a la API de Reddit en 2026.** No pude leer ninguna fuente primaria (`redditinc.com/policies/data-api-terms`, `support.reddithelp.com`, `reddit.com/wiki/api` todos inaccesibles o 403 desde este entorno el 14-sep-2026). Las fuentes secundarias coinciden en que el registro self-service cerro a finales de 2025 y todo pasa por aprobacion manual. **Si eso es cierto, Reddit puede ser inaccesible.** Mitigacion ya incorporada: el workflow de la seccion 8 no depende de Reddit.
3. **Terminos de Glassdoor.** `glassdoor.com/about/terms.htm` y `/about/terms/` devolvieron **HTTP 403**. La prohibicion de scraping esta citada solo desde fuentes secundarias. La direccion es inequivoca, pero **la cita no es de primera mano**. Accion si algun dia importa: leerlos en un navegador y pedir permiso por escrito.
4. **`SpeechRecognition.processLocally`, `.install()` y `.available()`**: MDN las documenta, pero **la tabla de compatibilidad no vino en el fetch**, asi que no se en que navegadores y versiones estan disponibles. No depender de ellas sin comprobarlo.
5. **Cadencia de publicacion de `@codemirror/*` en npm tras la salida de GitHub (abril 2026).** `@codemirror/view` esta en 6.43.11 pero el registry no me devolvio fecha de publicacion. Solo importa si se ejecuta el plan B del punto 1.

### Riesgo medio

6. **`<Activity/>` de React 19.2 con Monaco.** La idea de mantener el editor montado con su worker mientras se muestra otra vista es atractiva pero **no verificada**.
7. **El mapeo puntuacion-de-rubrica a `Rating` de FSRS** es una hipotesis de producto sin datos. Hay que calibrarlo con reviews reales. La salvaguarda de guardar la puntuacion cruda y la version de la rubrica existe precisamente para poder recalcular.
8. **Los valores propuestos de FSRS** (`request_retention` 0,85, `maximum_interval` 180 dias, `learning_steps` vacio) son razonados pero **no validados empiricamente para preguntas de entrevista**. El wiki oficial de FSRS explicitamente **no da un numero recomendado de retencion** y dice que los graficos varian entre aprendices.
9. **Si una ejecucion programada de GitHub Actions cuenta como "repository activity"** a efectos de los 60 dias que desactivan el schedule en repos publicos. Mitigacion ya incorporada: el workflow deja un commit siempre.
10. **Donde esta el umbral de "ordinary, individual usage"** para un token OAuth de suscripcion en CI. La doc lo dice pero no lo cuantifica. Un run cada 3 semanas es claramente ordinario; no se donde esta la linea.
11. **El dato de seguridad de skills** ("36,82% con fallos, 13,4% criticos") viene de un articulo de junio de 2026, **no del estudio primario**, que no localice. Lo trato como senal.
12. **El estudio de Mikhail Shcheglov** (47 skills probadas, 40 empeoraron el output) lo conozco **solo a traves del articulo de ksred.com**. No lei el original ni su metodologia.

### Riesgo bajo / carencias reconocidas

13. **`emilkowalski/skills`**: el README **no declara** si la instalacion crea hooks, agentes o comandos, ni los harnesses soportados, ni la licencia en el cuerpo. No verifique el arbol del repo.
14. **El articulo de Sourcegraph sobre migrar de Monaco a CodeMirror** devolvio **HTTP 403**; no pude leer sus numeros.
15. **La API de Algolia para Hacker News** (`hn.algolia.com/api/v1/search`) no esta mencionada en el README oficial de la API de HN y **no la verifique**. Importa porque la API de Firebase **no tiene busqueda**.
16. **Limites de la Stack Exchange API** (300/dia sin key, 10.000/dia con key, 30 req/s): `api.stackexchange.com` no era accesible desde aqui; los numeros vienen de fuentes secundarias, una de ellas de 2012.
17. **TypeScript 7**: el anuncio oficial de Microsoft lo conozco solo a traves del blog de Next.js 16.3. No lei `devblogs.microsoft.com`.
18. **`sucrase@3.35.1`**: no verifique su fecha de publicacion ni el estado real de mantenimiento del proyecto.
19. **Precios de STT de pago** (Deepgram, AssemblyAI, OpenAI): **ninguna pagina de pricing leida directamente**, todo de resumenes de busqueda. Verificar antes de comprometerse.
20. **La doc de Supabase sigue mostrando `middleware.ts`**, no `proxy.ts`. Asumo que funciona igual porque el contrato de request/response no cambia, pero **no lo he probado**.
21. **Comparacion oficial Supabase Vault vs cifrado en la aplicacion**: no existe, o no la encontre.

---

## Fuentes

Todas consultadas el **14 de septiembre de 2026**. "(leido)" = pagina obtenida y leida; "(busqueda)" = solo resumen de resultados de busqueda; "(bloqueado)" = el servidor rechazo la peticion.

### Next.js y estructura de proyecto
- [nextjs.org/blog](https://nextjs.org/blog) (leido) - indice de releases y security releases
- [nextjs.org/blog/next-16](https://nextjs.org/blog/next-16) (leido) - 21-oct-2025, Cache Components, Turbopack, breaking changes
- [nextjs.org/blog/next-16-3](https://nextjs.org/blog/next-16-3) (leido) - 3-ago-2026, Instant Navigations, TS 7, `catchError`, root params, helper `instant()`
- [nextjs.org/docs/app/getting-started/project-structure](https://nextjs.org/docs/app/getting-started/project-structure) (leido) - v16.3.5, lastUpdated 2026-07-21
- [github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md) (leido)
- GitHub API `repos/alan2207/bulletproof-react` (leido) - 35.835 estrellas, MIT, push 14-may-2026
- [robinwieruch.de/react-folder-structure](https://www.robinwieruch.de/react-folder-structure/) (leido) - actualizado 5-may-2026
- [profy.dev/article/react-folder-structure](https://profy.dev/article/react-folder-structure), [reacthandbook.dev/project-standards](https://reacthandbook.dev/project-standards) (busqueda)

### Editor y ejecucion de codigo
- GitHub API `repos/microsoft/monaco-editor` (leido) - 46.735 estrellas, push 13-sep-2026, 859 issues
- GitHub API `repos/microsoft/monaco-editor/releases/latest` (leido) - v0.56.0, 20-jul-2026
- GitHub API `repos/suren-atoyan/monaco-react` (leido) - 4.741 estrellas, push 20-abr-2026
- GitHub API `repos/codemirror/dev` (leido) - **archivado 15-abr-2026**
- [codemirror.net](https://codemirror.net/) (leido) - "It is being developed on code.haverbeke.berlin"
- [code.haverbeke.berlin/codemirror/dev](https://code.haverbeke.berlin/codemirror/dev) (leido) - ultimo commit 16-abr-2026, Forgejo
- GitHub API `repos/val-town/codemirror-ts` (leido) - **archivado**, push 18-sep-2025, ISC
- npm `monaco-editor@0.56.0`, `@monaco-editor/react@4.7.0`, `@codemirror/view@6.43.11`, `@valtown/codemirror-ts@2.3.1`, `esbuild-wasm@0.28.2`, `sucrase@3.35.1` (leido, registry.npmjs.org)
- [replit.com/blog/codemirror](https://replit.com/blog/codemirror) (leido) - 9-mar-2022, act. 5-oct-2023; Monaco 51,17 MB / 5,01 MB gzip vs CodeMirror 8,23 MB / 1,26 MB
- [coderpad.io/blog/product-updates/introducing-coderpad-monaco](https://coderpad.io/blog/product-updates/introducing-coderpad-monaco/) (leido) - 2-mar-2022
- [sourcegraph.com/blog/migrating-monaco-codemirror](https://sourcegraph.com/blog/migrating-monaco-codemirror) (**bloqueado**, HTTP 403)
- [formsort.com/article/sandboxed-code-in-browsers](https://formsort.com/article/sandboxed-code-in-browsers/) (leido) - 6-jun-2022, iframe vs Web Worker
- [microsoft.github.io/monaco-editor/typedoc/.../DiagnosticsOptions](https://microsoft.github.io/monaco-editor/typedoc/interfaces/languages.typescript.DiagnosticsOptions.html), [deepwiki: TypeScript Language Services](https://deepwiki.com/microsoft/monaco-editor/3.2-typescript-language-services) (busqueda)
- [codesignal.com/blog/how-we-support-autocompletion](https://codesignal.com/blog/how-we-support-autocompletion/), [pistack.xyz 22-ago-2026](https://www.pistack.xyz/posts/2026-08-22-browser-code-editors-monaco-codemirror-ace-comparison/), [swyx.io](https://www.swyx.io/how-to-add-monaco-editor-to-a-next-js-app-ha3), [zaynetro.com](https://www.zaynetro.com/post/2023-bundling-ts-in-browser) (busqueda)
- [github.com/vercel/next.js/issues/72613](https://github.com/vercel/next.js/issues/72613) (busqueda, estado no verificado)

### Repeticion espaciada
- [github.com/open-spaced-repetition/srs-benchmark](https://github.com/open-spaced-repetition/srs-benchmark) (leido) - ~349,9M reviews / 9.999 usuarios; FSRS-7 y RWKV
- [expertium.github.io/Benchmark.html](https://expertium.github.io/Benchmark.html) (leido) - 99,6% de superioridad de FSRS-6 sobre SM-2; caveat de la conversion interval-to-probability
- GitHub API `repos/open-spaced-repetition/ts-fsrs` y su `releases/latest` (leido) - 791 estrellas, MIT, push 14-sep-2026, v5.4.2 del 1-sep-2026
- npm `ts-fsrs@5.4.2` (leido) - 706.415 bytes, sin dependencias de runtime
- [github.com/open-spaced-repetition/ts-fsrs README](https://github.com/open-spaced-repetition/ts-fsrs) (leido) - FSRS v6, Node >= 20
- [fsrs4anki wiki: The optimal retention](https://github.com/open-spaced-repetition/fsrs4anki/wiki/The-optimal-retention) (leido) - no da numero recomendado
- [faqs.ankiweb.net](https://faqs.ankiweb.net/frequently-asked-questions-about-fsrs.html), [fsrs4anki tutorial](https://github.com/open-spaced-repetition/fsrs4anki/blob/main/docs/tutorial.md), [forums.ankiweb.net #53320](https://forums.ankiweb.net/t/how-many-reviews-for-accurate-optimization/53320), [ankitects/anki#3094](https://github.com/ankitects/anki/issues/3094) (busqueda)

### Supabase
- [supabase.com/docs/guides/auth/server-side/nextjs](https://supabase.com/docs/guides/auth/server-side/nextjs) (leido) - `@supabase/ssr`, `getAll`/`setAll`, `getClaims()`
- [supabase.com/docs/guides/database/vault](https://supabase.com/docs/guides/database/vault) (leido) - AEAD libsodium, clave raiz fuera de la base, caveat de `pg_dump`
- [supabase.com/docs/guides/database/extensions/pgsodium](https://supabase.com/docs/guides/database/extensions/pgsodium) (leido) - "does not recommend", "Use Supabase Vault instead"
- [supabase.com/docs/guides/getting-started/migrating-to-new-api-keys](https://supabase.com/docs/guides/getting-started/migrating-to-new-api-keys), [changelog 29260](https://supabase.com/changelog/29260-upcoming-changes-to-supabase-api-keys) (busqueda)
- [dev.to: BYOK sin plaintext](https://dev.to/c9dn/how-to-let-users-bring-their-own-openai-or-anthropic-api-keys-without-storing-them-in-plaintext-12m), [tokenmix.ai](https://tokenmix.ai/blog/anthropic-api-key-generate-secure-rotate-2026) (busqueda)

### API de Claude y terminos
- [platform.claude.com/docs/en/about-claude/pricing](https://platform.claude.com/docs/en/about-claude/pricing) (leido) - tabla completa; nota fechada de Sonnet 5 a $2/$10 definitivo
- [platform.claude.com/docs/en/about-claude/models/overview](https://platform.claude.com/docs/en/about-claude/models/overview) (leido) - ids, contexto, retiradas, solo texto e imagen de entrada
- [platform.claude.com/docs/en/build-with-claude/structured-outputs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs) (leido) - `output_config.format`, sin beta header, limitaciones de JSON Schema
- [platform.claude.com/docs/en/build-with-claude/prompt-caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching) (leido) - minimos por modelo, TTL, 4 breakpoints
- [platform.claude.com/docs/en/api/rate-limits](https://platform.claude.com/docs/en/api/rate-limits) (leido) - tiers, spend caps, ITPM cache-aware, headers
- [code.claude.com/docs/en/legal-and-compliance](https://code.claude.com/docs/en/legal-and-compliance) (leido) - "may not pay for, resell, or intermediate Claude usage on their end users' behalf"; OAuth solo para suscriptores
- [anthropic.com/legal/commercial-terms](https://www.anthropic.com/legal/commercial-terms) (leido) - clausula de no reventa
- [support.claude.com/en/articles/9767949](https://support.claude.com/en/articles/9767949-api-key-best-practices-keeping-your-keys-safe-and-secure) (leido) - buenas practicas de claves, rotacion 90 dias
- [code.claude.com/docs/en/github-actions](https://code.claude.com/docs/en/github-actions) (leido) - `claude-code-action@v1`, `CLAUDE_CODE_OAUTH_TOKEN`, automation mode, cron

### Voz
- [developer.mozilla.org/.../SpeechRecognition](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition) (leido) - "not Baseline"; `processLocally`, `install()`, `available()`
- npm `@huggingface/transformers@4.2.0` (leido) - Apache-2.0, 9,5 MB
- [testmuai.com](https://www.testmuai.com/learning-hub/speech-recognition-api-browser-support/), [wiki.mozilla.org Web Speech API](https://wiki.mozilla.org/Web_Speech_API_-_Speech_Recognition), [deepgram.com/pricing](https://deepgram.com/pricing), [assemblyai.com/blog/speech-to-text-api-pricing](https://www.assemblyai.com/blog/speech-to-text-api-pricing), [futureagi.com](https://futureagi.com/blog/speech-to-text-apis-in-2026-benchmarks-pricing-developer-s-decision-guide/) (busqueda)

### Skills de diseno
- GitHub API `repos/pbakaus/impeccable` (leido) - 68.009 estrellas, Apache-2.0, push 14-sep-2026
- [README de impeccable](https://github.com/pbakaus/impeccable/blob/main/README.md) (leido) - binario, hooks, 23 subcomandos, `--no-hooks`
- GitHub API `repos/Leonxlnx/taste-skill` (leido) - 87.089 estrellas, MIT, push 24-ago-2026, 66 issues
- [README de taste-skill](https://github.com/Leonxlnx/taste-skill/blob/main/README.md) (leido) - solo `SKILL.md`, sin hooks ni binarios
- GitHub API `repos/emilkowalski/skills` (leido) - 37.677 estrellas, MIT, push 21-ago-2026, 1 issue
- [README de emilkowalski/skills](https://github.com/emilkowalski/skills) (leido) - 11 skills, mayoria de animacion
- GitHub API `repos/anthropics/skills` (leido) - 176.282 estrellas, push 10-sep-2026
- [SKILL.md de frontend-design oficial](https://github.com/anthropics/claude-code/blob/main/plugins/frontend-design/skills/frontend-design/SKILL.md) (leido) - anti-patrones concretos
- [skills.sh/topic/design](https://www.skills.sh/topic/design) (leido) - listado, sin contadores de instalacion
- [ksred.com: Best Claude Code Skills](https://www.ksred.com/best-claude-code-skills-which-ones-are-actually-worth-installing/) (leido) - 10-ago-2026, "forty of them made the output worse"
- [ruoqijin.com: Best-Regarded Frontend-Design Skills](https://ruoqijin.com/blog/frontend-design-skills-ai-agents) (leido) - 26-jun-2026, ranking y criticas
- [composio.dev/content/top-design-skills](https://composio.dev/content/top-design-skills), [aitoolnet.com/compare/impeccable-vs-taste-skill](https://www.aitoolnet.com/compare/impeccable-vs-taste-skill) (busqueda)

### GitHub Actions y fuentes de datos
- [docs.github.com: Events that trigger workflows](https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows) (leido) - 5 min minimo, delays, 60 dias, solo default branch
- [docs.github.com: Rate limits for the REST API](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api) (leido) - 60 / 5.000 / 1.000 req/h
- [github.com/HackerNews/API](https://github.com/HackerNews/API) (leido) - sin auth, "no rate limit", MIT
- [linkedin.com/legal/user-agreement](https://www.linkedin.com/legal/user-agreement) (leido) - efectivo 3-nov-2025, secciones 8.2(2), 8.2(4), 8.2(13)
- `redditinc.com/policies/data-api-terms`, `support.reddithelp.com/.../Reddit-Data-API-Wiki`, `reddit.com/wiki/api` (**bloqueados / inaccesibles**)
- `glassdoor.com/about/terms.htm` y `/about/terms/` (**bloqueados**, HTTP 403)
- `api.stackexchange.com/docs` (**inaccesible**)
- [socialcrawl.dev/blog/reddit-data-api-2026](https://www.socialcrawl.dev/blog/reddit-data-api-2026), [prowlo.com/blog/reddit-data-api](https://prowlo.com/blog/reddit-data-api), [painpointmap.com](https://www.painpointmap.com/blog/reddit-api-rate-limits-guide), [replydaddy.com](https://replydaddy.com/blog/reddit-api-pre-approval-2025-personal-projects-crackdown), [liveproxies.io](https://liveproxies.io/blog/how-to-scrape-glassdoor), [kevinmontrose.com](https://kevinmontrose.com/2012/03/22/stack-exchange-api-v2-0-throttling/) (busqueda)

### Testing
- npm `vitest@5.0.0` y `@playwright/test@1.63.0` (leido)
- [nextjs.org/docs/app/guides/testing/vitest](https://nextjs.org/docs/app/guides/testing/vitest) (leido) - v16.3.5, lastUpdated 2026-08-25; Server Components async no soportados
- [nextjs.org/docs/app/guides/testing/playwright](https://nextjs.org/docs/app/guides/testing/playwright) (leido) - v16.3.5, lastUpdated 2026-08-25; correr contra build de produccion
