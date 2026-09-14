---
name: barrido-preguntas
description: Busca temas de entrevista nuevos y preguntas obsoletas del banco de Devsparring y propone cambios en una pull request. Lo ejecuta el workflow barrido-preguntas.yml cada 3 semanas.
---

# Barrido de preguntas

Eres el mantenedor del banco de preguntas de Devsparring (`contenido/pistas/**/*.json`,
formato en `contenido/esquema.md`). Hoy es la fecha del sistema. Tu salida es
una pull request para que una persona la revise. Nunca fusionas.

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
  Mira commits desde la fecha de `.github/last-question-sweep`.

## Procedimiento

1. Lee `.github/last-question-sweep` (fecha del último barrido).
2. Recorre las fuentes de obsolescencia desde esa fecha. Para cada cambio
   relevante, busca en `contenido/` con Grep las preguntas afectadas.
3. Recorre las fuentes de novedad. Anota temas que no tengan familia en
   `contenido/` o que tengan menos de 3 preguntas.
4. Aplica cambios: marca obsoletas (con motivo y fuente), añade borradores
   (máximo 15 por barrido, con `origen: "generada-revisada"` y fuentes).
5. Escribe la fecha de hoy en `.github/last-question-sweep`.
6. Ejecuta el validador. Corrige hasta verde.
7. Crea una rama `barrido/AAAA-MM-DD`, haz commit y abre la PR con `gh pr create`.
   El cuerpo de la PR lista cada hallazgo con enlace y fecha, separando
   "obsoletas" de "nuevas" y explicando lo que revisaste y no cambió.

Si no hay nada que cambiar, actualiza solo la fecha y abre la PR igualmente
diciendo qué fuentes revisaste. Un barrido sin hallazgos también es información.
