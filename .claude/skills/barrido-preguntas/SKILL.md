---
name: barrido-preguntas
description: Busca temas de entrevista nuevos y preguntas obsoletas del banco de Devsparring y propone cambios en una pull request. Lo ejecuta el workflow barrido-preguntas.yml cada 3 semanas.
---

# Barrido de preguntas

Eres el mantenedor del banco de preguntas de Devsparring (`contenido/pistas/**/*.json`,
formato en `contenido/esquema.md`). Hoy es la fecha del sistema. La fecha del
último barrido llega en el prompt (`/barrido-preguntas desde AAAA-MM-DD`). Tu
salida es un resumen y, solo si cambias contenido, una pull request para que una
persona la revise. Nunca fusionas.

## Reglas que no se negocian

1. **Detectar, no copiar.** Propones "este tema nuevo no está cubierto" o "esta
   pregunta parece obsoleta por X", con enlaces. Si redactas una pregunta nueva,
   la escribes de cero a partir de lo aprendido, sin copiar texto de la fuente.
2. **Cada hallazgo lleva su URL y su fecha.** Sin fuente, se descarta.
3. **Nunca borres preguntas.** Lo obsoleto se marca `estado: "obsoleta"` con
   `motivoObsoleta` y se sube `version`. Lo nuevo entra como `estado: "borrador"`.
4. **El validador manda:** `node scripts/validar-contenido.mjs` en verde antes
   de abrir la PR.
5. LinkedIn y Glassdoor están fuera: sus condiciones prohíben la lectura automatizada.
6. **Preguntas de entrevista, no de examen.** Antes que "¿qué es X?", una
   situación real donde X importa ("tu listado tarda 4 s con 1 M de filas…").
   Orden de preferencia: comportamental, luego hipotética con datos concretos,
   luego definición (taxonomía de Jacob Kaplan-Moss, ver
   `docs/plan-estudio-y-banco.md`).
7. **Tipo test.** Una pregunta nueva de `tipo` `definicion` o `fundamento` con
   el modo `flash` lleva su bloque `test` según `contenido/esquema.md`: cuatro
   opciones, el porqué de cada una (también de las falsas) y, si la pregunta
   pide varias cosas, un `enunciado` concreto. Los distractores son errores
   que la gente comete de verdad. La correcta no es la más larga ni cae siempre
   en la misma letra. Si no hay buenos distractores, quita `flash` de `modos`
   en vez de rellenar.
8. **Resumen.** Si la primera frase de `respuestaModelo` no dice la idea en
   menos de 240 caracteres, añade `resumen` (ver `contenido/esquema.md`).
9. **Katas: rúbrica que se vea en el código.** Nada de "Explica…",
   "Comenta…" o "Menciona…": una kata se corrige solo por el código. Criterios
   como la estructura usada, la complejidad, los casos límite, no mutar la
   entrada o tipos sin `any` ni aserciones.

## Fuentes, en dos capas

- **Obsolescencia** (la más valiosa): RSS y blogs oficiales de Next.js
  (`nextjs.org/blog`), React (`react.dev/blog`), TypeScript
  (`devblogs.microsoft.com/typescript`), Supabase (`supabase.com/blog`), Node
  (`nodejs.org/en/blog`). Busca APIs renombradas, deprecadas o eliminadas que
  aparezcan en `texto`, `contexto` o `respuestaModelo` de alguna pregunta.
- **Novedad**: API de Hacker News (`hn.algolia.com/api/v1/search?query=...` con
  términos como "interview", "hiring", "technical interview 2026") y la API de
  GitHub sobre estos repositorios: `yangshun/tech-interview-handbook`,
  `sudheerj/javascript-interview-questions`, `sudheerj/reactjs-interview-questions`,
  `lydiahallie/javascript-questions`, `donnemartin/system-design-primer`.
  Mira commits desde la fecha del último barrido.

## Procedimiento

1. Toma la fecha del último barrido del prompt.
2. Recorre las fuentes de obsolescencia desde esa fecha. Para cada cambio
   relevante, busca en `contenido/` con Grep las preguntas afectadas.
3. Recorre las fuentes de novedad. Anota temas que no tengan familia en
   `contenido/` o que tengan menos de 3 preguntas.
4. Aplica cambios: marca obsoletas (con motivo y fuente), añade borradores
   (máximo 15 por barrido, con `origen: "generada-revisada"` y fuentes).
5. Escribe `barrido-resumen.md` en la raíz (no se commitea: el workflow lo
   copia al resumen del run). Lista cada hallazgo con enlace y fecha, separando
   "obsoletas" de "nuevas", y lo que revisaste y no cambió. Un barrido sin
   hallazgos también es información.
6. **Si no has cambiado nada en `contenido/`, termina aquí: sin rama, sin
   commit y sin PR.** El workflow apunta la fecha del barrido con una etiqueta.
7. Si hay cambios, ejecuta el validador y los tests de coherencia del banco
   (`pnpm exec vitest run src/features/preguntas/coherencia.test.ts`), que
   comprueban las reglas 7 y 9, y corrige hasta verde.
8. Crea una rama `barrido/AAAA-MM-DD`, haz commit solo de `contenido/` y abre
   la PR con `gh pr create`, con el contenido de `barrido-resumen.md` como cuerpo.
