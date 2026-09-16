# Decisiones de producto y alcance

Registro de lo decidido por Eudys antes de escribir código. Cada entrada lleva fecha
y el porqué. Lo técnico (estructura, librerías) va en `arquitectura.md` cuando exista.

## 2026-09-14 · Qué es Devsparring

App web para entrenar entrevistas de programación, en español, tipo Duolingo pero
para adultos que buscan trabajo. Uso principal: Eudys (fullstack React, TypeScript,
Next.js, nivel mid/senior). Diseñada genérica desde el primer día para otros
perfiles tech (frontend, backend, y después QA, PO, scrum master, arquitecto,
engineering manager).

Nombre: **Devsparring** (antes Fogueo, renombrado el 14-09-2026 a petición de Eudys). Sparring: entrenar con quien te pega antes del combate real. Comprobado el 14-09-2026:
sin producto con ese nombre, sin paquete en npm, dominios .com/.dev/.app/.es sin
respuesta (no verificado que estén libres para comprar).

## Decisiones tomadas

| Tema                              | Decisión                                                                                                                                                                                      | Porqué                                                                    |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| A (solo prompt) o B (app)         | Las dos; B es la principal                                                                                                                                                                    | B sirve para seguir usando A y es portfolio                               |
| Editor de código                  | Integrado desde el inicio, ejecución JS/TS en navegador                                                                                                                                       | El stack de Eudys permite ejecutar sin servidor                           |
| Corrección con IA                 | Botón en la app con clave de API propia del usuario; además cuenta de Eudys con su clave ya integrada al iniciar sesión                                                                       | Sin coste para el dueño con usuarios ajenos; comodidad para el uso propio |
| Copiar prompt para corregir fuera | Se mantiene como opción gratuita                                                                                                                                                              | Cualquier usuario sin clave puede usar la app                             |
| Persistencia                      | Supabase desde el día 1 (cuentas, RLS)                                                                                                                                                        | Genérico desde el principio, mismo patrón que otros proyectos de dev      |
| Actualización del banco           | Workflow en GitHub Actions cada 3 semanas que propone altas y bajas en una pull request; nada entra sin revisión                                                                              | Las preguntas nuevas son poco frecuentes; el dueño revisa                 |
| Idioma                            | Español principal con términos técnicos en inglés; cada pregunta lleva "así se pregunta en inglés"; interruptor por sesión para entrevistar en inglés                                         | Así se habla en las entrevistas en España; no descartar inglés            |
| Nivel                             | Se elige por sesión, no fijo en el perfil; rúbrica junior y senior por pregunta                                                                                                               | El nivel real varía por tema                                              |
| Tipos de pregunta                 | Definición, fundamentos, razonamiento hablado, prueba técnica con editor, revisión de código, comportamental; pendiente ampliar tras analizar competencia                                     | Cubre teoría, técnica y lo nuevo de 2026                                  |
| Pista de IA                       | Una pista dedicada a IA para desarrolladores (conceptos y cómo se pregunta el uso de IA)                                                                                                      | Se pregunta en 2026 y alguien puede querer centrarse solo en eso          |
| Contenido                         | Eudys no escribe preguntas; el banco se construye con research y él actúa de tester                                                                                                           | Falta de tiempo                                                           |
| Fuentes del banco                 | Cualquier fuente pública fiable, citada con URL y fecha; sin scraper automático de LinkedIn ni Glassdoor en el pipeline (rompe sus condiciones y bloquean); lectura manual de esas páginas sí | Que el proyecto sea lo mejor posible sin construir sobre arena            |
| Estructura de código              | Se decide desde cero tras el research técnico, no se copia por inercia la de Dossicar y banco-ideas                                                                                           | Petición explícita: usar lo más correcto y legible hoy                    |
| Skills de diseño                  | Usar impeccable, taste-skill y emil-design-eng si siguen vigentes; prescindir de partes innecesarias (por ejemplo hooks); antes de instalar, comprobar que no estén obsoletas                 | Evitar repetir instalaciones sin criterio                                 |
| Repositorio                       | GitHub, público o privado indiferente; commits los hace Eudys                                                                                                                                 | Regla general de dev                                                      |

## Pendiente de decidir

- Estructura de carpetas definitiva (tras `docs/research/tecnologia-y-arquitectura.md`).
- Si las skills de diseño se instalan a nivel de usuario (`~/.claude/skills`) para
  reutilizarlas en todos los proyectos o solo en este.
- Entrada por voz en el modo "explica en voz alta" (depende de viabilidad técnica).
- Modelo de precios si algún día se abre a terceros.

## 2026-09-14 · Decisiones tomadas durante la construcción

| Tema                     | Decisión                                                                                                                               | Porqué                                                                                   |
| ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Banco inicial            | Generado por agentes a partir de los seis informes de research, con fuentes y `origen` en cada pregunta, publicado sin revisión previa | Eudys no escribe preguntas: revisa usándolas como tester. Lo que falle se corrige por PR |
| Nombre de la app         | Devsparring                                                                                                                            | Sin colisiones el 14-09-2026                                                             |
| Demo pública             | `/demo`: tres preguntas reales, autoevaluación y copiar prompt, sin cuenta ni guardado                                                 | Lección de OpositaTest y DevInterview.AI: probar sin fricción antes de pedir nada        |
| Rúbrica visible          | Para mid y senior se muestra la junior completa más los añadidos                                                                       | Sin eso "Lo anterior" no tiene sentido en pantalla                                       |
| Voz                      | Escalón 0: texto. El modo "en voz alta" pide hablar de verdad y escribir lo esencial                                                   | Funciona en todo navegador; micrófono como mejora futura                                 |
| Móvil                    | Los modos de texto funcionan; el modo kata avisa de que va mejor en escritorio                                                         | Monaco es mediocre en pantalla pequeña                                                   |
| Límites legales de la IA | Solo clave propia del usuario o la del dueño para su cuenta; jamás "entra con tu cuenta de Claude"                                     | Términos de Anthropic leídos el 14-09-2026 (ver arquitectura)                            |
| Gamificación             | Sin ligas, vidas ni notificaciones de culpa; sí sesiones cortas, repaso espaciado y progreso visible                                   | Público adulto y ya ansioso (research de competencia)                                    |

## 2026-09-17 · Segunda ronda de pruebas de Eudys

| Tema                       | Decisión                                                                                                                                                                                                                                                                                                         | Porqué                                                                                                                                                          |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Flash y Explicar           | El modo verbal pasa a llamarse Explicar y se escribe, como antes: respuesta desarrollada a preguntas de razonamiento, y al terminar se enseña la repregunta que haría un senior. La autoevaluación sin IA es de seleccionar: marcas qué criterios de la rúbrica has cubierto y la nota de repaso se propone sola | Eudys probó un modo de hablar sin escribir y lo rechazó: para hablar solo no hace falta la app; quería contestar escribiendo o seleccionando                    |
| Katas                      | Se corrige solo el código; el prompt lo dice y la pantalla también, con aviso de que la IA puede equivocarse                                                                                                                                                                                                     | En una entrevista con editor no se pide prosa                                                                                                                   |
| Salir y continuar          | Enlace "Salir y seguir luego" en cada sesión; Hoy ofrece continuar la última sesión abierta de las últimas 24 h                                                                                                                                                                                                  | Cada asalto ya se guardaba; faltaba decirlo y poder volver                                                                                                      |
| Tema                       | Interruptor claro/oscuro; la opción "sistema" desaparece (arranca con el sistema y luego manda el usuario)                                                                                                                                                                                                       | Tres opciones para una preferencia binaria sobraban                                                                                                             |
| Catálogo                   | Cada pregunta de una pista se abre y enseña la respuesta que aprueba y las rúbricas junior y senior; Hoy enlaza a la pregunta desde los últimos asaltos                                                                                                                                                          | Estudiar antes de practicar (ejemplo resuelto) y poder consultar tras fallar                                                                                    |
| Racha                      | Días seguidos con práctica, visible en Hoy; sin vidas, ligas ni notificaciones                                                                                                                                                                                                                                   | Motivación barata y honesta; la de Duolingo sin su culpa                                                                                                        |
| Opciones frente a escribir | No se implementa (todavía). Elegir entre opciones entrena reconocimiento; la entrevista exige recuerdo libre. Posible calentamiento futuro: "¿cuál de estas cuatro respuestas aprueba?" antes de escribir                                                                                                        | Testing effect: el recuerdo libre retiene más que el reconocimiento (Roediger y Karpicke, 2006; Dunlosky et al., 2013, de memoria, sin verificar hoy en la web) |

### Qué técnicas de estudio ya usa la app y qué falta

Lo que la investigación en aprendizaje da por más eficaz (Dunlosky et al.,
2013, "Improving Students' Learning With Effective Learning Techniques";
Roediger y Karpicke, 2006, sobre el efecto de la evocación; Bjork sobre las
"dificultades deseables"; citados de memoria el 17-09-2026, sin verificar hoy)
son dos cosas: **practicar recordando** (no releer) y **espaciar** las
repeticiones. Devsparring ya está construida sobre las dos: cada asalto es
recuerdo libre y FSRS decide cuándo vuelve cada pregunta. Lo que se añade o
se refuerza a partir de esta ronda:

- **Feedback inmediato y concreto**: la respuesta que aprueba y "lo que faltó"
  se ven al momento; ahora también la repregunta en voz alta.
- **Ejemplo resuelto antes de practicar**: el catálogo abre cada pregunta con
  su respuesta y rúbricas. Leer primero y practicar después sin mirar.
- **Intercalado**: las sesiones mezclan pistas salvo que se elija una; se
  mantiene.
- **Hábito**: racha de días en Hoy, sin castigos.
- **Descartado por ahora**: tarjetas de completar huecos y test de opciones
  (entrenan reconocimiento, no recuerdo); notificaciones (público adulto, ya
  ansioso; ver decisión de gamificación del 14-09-2026).
