# Plan: que Devsparring enseñe, no solo examine

Escrito el 19-09-2026. Existe para que este trabajo no dependa de una sesión
concreta: si algo se corta, se retoma por aquí. Las decisiones de producto
cerradas se copian a `docs/decisiones.md` cuando dejan de ser plan.

## De dónde sale

Eudys usó la app y señaló dos cosas de fondo:

1. **Escribir cansa.** Quería poder contestar eligiendo, o una mezcla de
   escribir y elegir. La primera respuesta fue descartarlo por la evidencia de
   que el recuerdo libre retiene más que el reconocimiento. Era un veto mal
   puesto: él había pedido mezclar, no sustituir.
2. **El banco huele a examen.** Medido el 19-09-2026 sobre 377 preguntas:

| Señal                          | Dato                  |
| ------------------------------ | --------------------- |
| Empiezan por "¿Qué es…?"       | 82 de 377             |
| Planteadas como situación real | 15 de 377             |
| Con material práctico adjunto  | 12 de 377             |
| Fuente más repetida            | github.com, 131 veces |

Además: `flash` es un subconjunto estricto de `verbal`. De las 377, 178 están
en los dos modos, 93 solo en verbal y **ninguna solo en flash**. El argumento
que se dio en su día para mantener los dos modos separados (bancos distintos)
era falso.

## Decidido por Eudys el 19-09-2026

- Unificar o rehacer Flash según lo que diga el research; si el nombre deja de
  encajar, se renombra.
- Añadir un modo de preguntas de selección que reutiliza las preguntas que ya
  hay. Nada de escribir preguntas nuevas solo para ese modo.
- Las opciones deben ser cortas.
- El research sobre otras apps se hace a fondo aunque cueste; sigue exigiendo
  fuente y fecha, porque sin eso no sería correcto.
- La ampliación del banco entra por pull request, como el barrido.
- La pista de IA debe incluir consejos y buenas prácticas de vibe coding.

## Fases

### Fase 0: research (HECHO, 19-09-2026)

Tres informes, cada uno con fuente y fecha en cada afirmación:

- `docs/research/aprendizaje-apps-estudio.md`: Anki, Duolingo, Quizlet,
  RemNote, Brainscape, Memrise.
- `docs/research/competencia-como-ensenan.md`: LeetCode, Exercism, Educative,
  interviewing.io, Pramp, AlgoExpert y compañía, más cómo son las preguntas de
  entrevista reales en 2025-2026 y los proyectos en español del mismo estilo.
- `docs/research/ciencia-del-aprendizaje.md`: la evidencia con citas.

Lo que dijeron, y que cambia el plan:

1. **La opción múltiple sí enseña, con una condición que no se negocia.** Con
   distractores plausibles (competitivos, no absurdos) la evidencia de que
   genera aprendizaje real es moderada-alta. Pero **sin feedback que explique
   por qué la opción elegida era falsa, el riesgo de que el usuario recuerde
   después el distractor como si fuera el dato correcto está documentado con
   evidencia alta**. El feedback reduce ese efecto, no lo elimina. El formato
   no es lo que hace seguro el modo, lo es el feedback posterior. Educative
   escribe la explicación debajo de CADA opción, no solo de la correcta; sin
   eso se pierde la mitad del valor.
2. **La causa del banco es peor de lo que se pensaba, y no es el idioma.** El
   repositorio español más popular del nicho, con unas 7.800 estrellas, tiene
   exactamente el mismo vicio de "¿qué es X?". El problema es del género
   entero, no de haber copiado listas en inglés. Además, Google (Laszlo Bock)
   publicó que las preguntas tipo trivia no predicen el desempeño real,
   mientras que las de comportamiento y las de muestra de trabajo sí.
3. **Hay un criterio de auditoría barato**: la taxonomía de Jacob Kaplan-Moss,
   comportamental por encima de hipotética y esta por encima de trivia. Sirve
   para etiquetar las 377 preguntas sin reescribir nada todavía y priorizar.
4. **Hay un modelo de estilo en español**: midudev/pruebas-tecnicas (CC0), que
   plantea contexto de producto y requisitos numerados. Se copia la forma de
   redactar el enunciado, no su formato de proyecto largo.

### Fase 1: Flash pasa a ser "Tipo test" (DECIDIDO)

**Flash deja de ser "escribir corto" y pasa a ser el modo de selección. Se
llama Tipo test.** Explicar se queda con todo lo escrito y ofrece dos tamaños
de sesión.

Por qué, en orden:

- Flash no aportaba nada: ninguna de sus 178 preguntas es exclusiva suya, todas
  están también en Explicar. Mantener los dos era mantener el mismo modo dos
  veces.
- La evidencia respalda la opción múltiple bien construida, así que el modo
  nuevo no es una concesión a la pereza.
- El recuerdo libre, que la evidencia sitúa como el núcleo, no se pierde: vive
  entero en Explicar. El usuario elige según el día, que era justo la mezcla
  que pidió.
- El nombre: "Tipo test" se entiende en español sin explicación y no se
  confunde con los tests automáticos del modo kata, cosa que sí pasaría con
  "Test" a secas.

**Condición de publicación, innegociable:** ninguna pregunta entra en Tipo test
sin el "por qué no vale" de cada distractor. Sin eso el modo enseña el error, y
eso está documentado. Si una pregunta no tiene buenos distractores, se queda
fuera del modo en vez de rellenarse con opciones absurdas.

Trabajo previsto:

- Campo nuevo en el esquema del banco con las opciones y, por cada opción
  incorrecta, una línea de por qué no vale, más el porqué de la correcta.
- Se generan una vez, se guardan en el JSON y las revisa Eudys por PR. No se
  generan al vuelo con la API: costaría dinero por sesión, sería lento y no
  sería reproducible.
- Solo para tipos `definicion` y `fundamento` con texto corto. Nunca katas,
  diseño ni comportamental.
- Cuatro opciones, una correcta, tope de longitud por opción.

### Fase 2: tarjetas y la idea en una frase

- **Campo `resumen`** en cada pregunta: una o dos líneas con la idea. Hoy la
  respuesta modelo ronda los 687 caracteres de media, que es demasiado para
  fijar nada. Matiz que trajo el research y que corrige la idea original: ese
  resumen **no vale como algo que leer**, porque el beneficio viene de
  evocarlo, no de su brevedad. Es la cara de atrás de una tarjeta que primero
  intentas recordar, nunca un texto de repaso pasivo.
- **Repaso relámpago**: ves la pregunta, la piensas, giras y te puntúas. Cero
  escritura. Es la respuesta directa a "me da pereza escribir".
- Posible después: "detectar el fallo", enseñar una respuesta con un error
  sutil y decir si pasaría.

Criterio de corrección que atraviesa todo esto: en una entrevista no se pide la
definición exacta, se pide demostrar que lo sabes. Lo que se puntúa es eso, no
la literalidad.

### Fase 2 bis: lo que trajo el research y no estaba previsto

- **Pistas graduales antes de la corrección** (de LeetCode): dos o tres niveles
  de pista antes de enseñar la solución, en vez de soltarla de golpe. Barato y
  conserva el esfuerzo de recordar, que es de donde viene el aprendizaje.
- **Fase sin etiqueta de tema** (de Educative): en una entrevista nadie te
  avisa de qué va la pregunta. Una ronda final donde no se dice la pista ni el
  tipo entrena el reconocimiento que hace falta de verdad.
- **El criterio del mentor de Exercism como instrucción del prompt**: el mentor
  no corrige, usa tu respuesta para destapar ideas, y el objetivo no es la
  solución óptima sino que aprendas algo. Se copia el criterio, no el mecanismo.
- **Válvula de escape para la racha** (de Duolingo, medido por ellos con un 4%
  más de retorno): poder salvar un día sin romperla. Encaja con la decisión de
  no castigar y no añade gamificación.

### Fase 2 ter: la landing tiene que explicar la app

Comprobado el 19-09-2026 sobre `src/app/(publico)/page.tsx`: la landing enseña
los seis modos con su muestra, la tesis de las dos varas, el tamaño del banco y
lo que el producto no hace. Pero **no explica cómo funciona**. Ni una sola
mención a la repetición espaciada, ni al recorrido de una sesión, ni a las
pestañas que tiene la app por dentro. La palabra Temario no aparece.

Lo que falta, en orden de importancia:

- **El recorrido, en cuatro pasos**: eliges modo y nivel, respondes, te corrigen
  contra la rúbrica de ese nivel, y la pregunta vuelve cuando toca. Hoy el
  visitante no sabe qué pasa después de responder.
- **Qué es la repetición espaciada y por qué vuelve una pregunta.** Es la mitad
  del valor del producto y no se nombra.
- **Qué hay dentro**, con las cinco pestañas: Hoy, Practicar, Temario,
  Entrevistas y Cuenta. Con una captura o una muestra de cada una.
- **Cómo funciona la corrección con IA**: con tu clave, que no se guarda, y que
  sin clave puedes autoevaluarte marcando criterios. Hoy se menciona de pasada
  en "lo que no hace" y no queda claro que se pueda usar sin clave.
- Cuando exista Tipo test, explicarlo también, porque cambia qué es el producto.

### Fase 3: pista de IA

Los conceptos ya están cubiertos (agentes, MCP, RAG, embeddings, evals,
seguridad, coste). Lo que falta es lo práctico de 2026: skills, subagentes,
trabajar con agentes de código, gestionar la ventana de contexto, evaluaciones
en integración continua y **consejos y buenas prácticas de vibe coding**.
Además, preguntas de IA repartidas dentro de otras pistas, porque en la
entrevista se pregunta mezclado.

### Fase 4: ampliación y saneamiento del banco

Entra por pull request. Dos tandas:

1. Reescribir las definiciones secas como situaciones.
2. Ampliar con preguntas nuevas.

Antes de generar nada, el listón se escribe en `contenido/esquema.md`:

- Entra si **un entrevistador real la haría**. Si solo la haría un profesor, no
  entra.
- Se prefiere plantearla como situación ("te llega un PR de 400 líneas…") antes
  que como definición suelta.
- Toda pregunta explica por qué se pregunta y, cuando se pueda, se ancla a un
  caso práctico aunque no sea un ejercicio.
- Las fuentes de listas de repositorio pesan menos que los relatos de
  entrevistas reales y las guías de entrevistadores.
- Cada pregunta se etiqueta con la taxonomía de Kaplan-Moss (comportamental,
  hipotética, trivia) y se reescriben primero las trivia puras. Es una
  auditoría barata que no obliga a tocar las 377 de golpe.
- El modelo de redacción es midudev/pruebas-tecnicas: contexto y requisitos
  numerados, adaptado a preguntas cortas.

Aviso de coste: esta fase necesita agentes. La lección del 14-09-2026 sigue
valiendo, con Sonnet, sin que ningún agente delegue y escribiendo de forma
incremental.

## Lo que se descarta, con motivo

- **Notificaciones y recordatorios**: choca con la decisión de gamificación del
  14-09-2026, público adulto y ya nervioso. Si Eudys cambia de idea, se revisa.
- **Completar huecos**: entrena literalidad, que es justo lo que la entrevista
  no pide.
- **Generar las opciones en tiempo real con la API**: coste por sesión, latencia
  y resultados distintos cada vez.
- **Modelos propios de dificultad tipo Half-Life Regression o IRT** (Duolingo,
  Quizlet): necesitan millones de respuestas. Con 377 preguntas y un usuario no
  hay datos; FSRS ya resuelve lo mismo re-optimizando por persona.
- **Ranking y comparación social tipo Codewars**: añade gamificación sin tocar
  la causa raíz, que es cómo está escrito el enunciado.
- **Forzar el ejemplo resuelto a quien ya domina el tema**: existe el efecto de
  reversión de la pericia, al experto le estorba.
- **Intercalar temas sin relación entre sí** esperando el beneficio que se ve
  en matemáticas: ese resultado no se extrapola.

## Cautelas que dejó el research

- El momento del feedback, inmediato o demorado, **no tiene respuesta única**:
  depende del contexto. No merece la pena optimizarlo a ciegas.
- El "microlearning para profesionales ocupados" tiene **poca evidencia de
  rigor**. Las sesiones cortas se mantienen porque encajan con el usuario, no
  porque estén demostradas.
- La ventaja de FSRS sobre SM-2 está medida **dentro de su propio sistema**, no
  por terceros independientes ni con estudiantes reales.
- Varias fuentes de apps comerciales (Quizlet, Brainscape, Memrise) bloquearon
  la lectura y quedaron marcadas como no verificadas de primera mano.

## Otros pendientes (anotados el 28-09-2026)

Fuera de las fases de arriba, pero igual de pendientes:

- **Botón "esta pregunta está mal"** en la sesión y en el temario, que guarde el
  aviso para revisarlo. El banco se generó sin revisión humana y Eudys es el
  tester: sin esto, lo que encuentra roto se pierde.
- **Probar de verdad lo que nunca se ha ejecutado entero**: la corrección con IA
  con clave real, el modo kata con sus tests, y los modos Revisión, Diseño y
  STAR. Los e2e solo cubren una sesión con autoevaluación.
- **El suelo básico del CLAUDE.md de dev**: pasar `palpa` (nunca se ha pasado
  sobre devsparring), revisar con axe como hace opos-pt, títulos y
  descripciones para SEO, y privacidad más aviso legal (LSSI art. 10) si se
  publica.
- **Capturas con sesión en móvil y en tema oscuro**: hoy solo hay de escritorio
  en claro.
- **Revisar la primera PR del barrido automático** cuando llegue.
- **Decidir el despliegue**: Vercel sí o no, abrirlo a más gente o no, y en ese
  caso un servidor de correo propio en Supabase (el integrado corta a dos
  correos por hora).
- **Deuda técnica**, sin prisa: tipos de Supabase generados con la CLI,
  streaming en la corrección, Monaco servido en local y calibrar el paso de
  puntuación a nota de repaso cuando haya datos reales.

### Croquis de rediseño con la mirada de opos-pt

Pedido por Eudys el 28-09-2026 como pendiente, no para ya: una tanda nueva de
croquis de devsparring teniendo en cuenta lo que le gusta, lo hablado en esta
conversación y el diseño de `C:\dev\opos-pt`. Fijarse en cómo está hecho, no
copiarlo.

Lo que opos-pt enseña y encaja aquí:

- **Un color por sección, definido en un solo sitio.** Devsparring tiene seis
  modos que hoy solo se distinguen por el nombre. La regla de "un solo acento"
  que se aplicó aquí era más estricta de lo que Eudys elige cuando decide él, y
  el CLAUDE.md de dev ya aclara que esa lista no es de prohibiciones.
- **Botones con relieve** que se levantan al pasar el ratón y se hunden al
  pulsar, solo en lo que se puede pulsar. Responde directamente a la queja de
  botones que no reaccionaban.
- **Sin saltos al volver a una pantalla**: lo último leído se pinta al momento y
  se actualiza por detrás (`useRecordado` en opos-pt).
- **Tarjetas que no engañan al clic**: lo que parece pulsable lo es.
- **Una portada con movimiento que cuenta el lema**, en vez de explicarlo en
  prosa.
- **Accesibilidad comprobada con axe**, no solo a ojo.

Lo que no se traslada tal cual: la paleta melocotón, Fredoka y el tono amable.
Opos-pt es para estudiar una oposición con calma; devsparring es para llegar
afilado a una entrevista técnica. Una de las direcciones de los croquis puede
explorar lo "cálido y táctil", pero no todas.
