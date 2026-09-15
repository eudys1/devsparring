# Devsparring

App web para entrenar entrevistas técnicas de programación, en español, tipo
Duolingo para adultos. Next.js 16.3 + TypeScript + Supabase, editor Monaco con
ejecución en el navegador, corrección con la API de Claude y repetición
espaciada. Usuario principal: Eudys (fullstack React/TS/Next, mid/senior).
Diseñada genérica para otros perfiles tech.

@AGENTS.md

## Dónde está cada cosa

- `docs/decisiones.md`: decisiones de producto con fecha y porqué. Leer primero.
- `docs/arquitectura.md`: decisiones técnicas, estructura, datos, descartes, deuda.
- `docs/research/`: seis informes con fuentes y fechas (formatos de entrevista,
  bancos de preguntas, IA y comportamental, competencia, tecnología).
- `contenido/`: el banco de preguntas en JSON, fuente de verdad, revisado por PR.
- `src/app/`: solo enrutado. `src/features/*`: el código por funcionalidad.
  `src/lib/`: clientes (Supabase, Anthropic, config). Sin ficheros índice.
- `supabase/migrations/`: SQL con nombre `AAAAMMDDHHMMSS_asunto.sql`. Las aplica la
  integración de GitHub de Supabase en cada push a `main`; a mano, `npx supabase db push`.
  `supabase/config.toml` es la configuración como código (auth, redirecciones).
- `scripts/`: validar contenido, capturas. Cabecera con el porqué.

## Comandos

```bash
pnpm dev                 # desarrollo (Turbopack)
pnpm verify              # format:check + lint + typecheck + test + build, en orden
pnpm test:e2e            # Playwright, Chromium, contra el build de producción
pnpm contenido:validar   # valida contenido/ contra el esquema zod
```

Nada está terminado hasta que `pnpm verify` está en verde, y se dice tal cual si
algo falló.

## Reglas del proyecto

- Los commits los hace Eudys. Claude entrega el mensaje.
- Español en conversación, textos de interfaz y comentarios (el porqué, no el
  qué). Términos técnicos en inglés tal como se usan en la industria. Sin guion largo.
- La clave de API de un usuario nunca se escribe en base de datos, disco ni
  logs. Ver `docs/arquitectura.md`, sección "Corrección con IA".
- Toda pregunta del banco lleva fuentes con URL y fecha y un `origen`. Nada entra
  en `contenido/` sin revisión humana.
- Nunca un copiloto para usar durante entrevistas reales. Solo práctica.
- Diseño: manda el listón de `C:\dev\CLAUDE.md`. Skills de diseño solo bajo
  demanda y sin hooks.

## Trampas que ya costaron tiempo

- Un fan-out de seis agentes de research que a su vez lanzaron subagentes agotó
  el límite de sesión en minutos (14-09-2026). Regla: prohibir a los agentes
  delegar, usar Sonnet para research de contenido, y que escriban su fichero de
  forma incremental para no perder trabajo.
- Glassdoor y Reddit bloquean la lectura automatizada (403 y captcha). Las
  experiencias en español se recogen a mano o con el registro de entrevistas.
- Next 16: `params`, `cookies()` y `headers()` son async; `middleware.ts` es
  ahora `proxy.ts`; `next lint` no existe, se invoca ESLint directamente.
