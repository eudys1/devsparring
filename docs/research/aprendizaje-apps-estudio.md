# Cómo consiguen las apps de estudio e idiomas que la gente retenga

Fecha de consulta: 19-09-2026 (todas las URLs de este informe se verificaron
en esa fecha salvo que se indique otra cosa).

Qué se buscaba: para cada app, (1) qué mecánicas concretas usa, (2) cómo
funciona esa mecánica por dentro (con detalle para poder copiarla), y (3)
en qué se apoya la propia app para decir que funciona (paper citado, estudio
propio, blog de investigación, documentación técnica) — distinguiendo
siempre lo que dice la empresa de lo que dice un estudio independiente.

Aplicación al contexto de Devsparring: banco de 377 preguntas de entrevista
técnica, FSRS (ts-fsrs) para repetición espaciada, corrección con IA contra
rúbrica junior/mid/senior, seis modos de práctica, usuario adulto profesional
con poco tiempo y ya nervioso por la búsqueda de trabajo. El proyecto ya
descartó ligas, vidas y notificaciones de culpa (ver `docs/decisiones.md`).

## Índice

- [Anki](#anki)
- [Duolingo](#duolingo)
- [Quizlet](#quizlet)
- [RemNote](#remnote)
- [Brainscape](#brainscape)
- [Memrise](#memrise)
- [Otra app relevante](#otra-app-relevante)
- [Tabla final](#tabla-final)
- [Lo que no se encontró](#lo-que-no-se-encontró)

## Anki

### 1. Mecánicas concretas

- Tarjeta de dos caras (pregunta/respuesta) revisada en sesiones; tras ver la
  respuesta el usuario se autoevalúa con uno de 4 botones: **Again / Hard /
  Good / Easy**. No hay corrección automática de una respuesta escrita: es
  autoevaluación honesta ("recuerdo/no recuerdo").
  Fuente: [Anki FAQs — What spaced repetition algorithm does Anki use](https://faqs.ankiweb.net/what-spaced-repetition-algorithm) (consultado 19-09-2026).
- El propio botón pulsado decide cuándo vuelve a aparecer la tarjeta: no hay
  "elegir qué mostrar" por relevancia semántica, es puramente temporal (cola
  de vencidas por fecha).
- Desde Anki 23.10 (2023) el usuario puede activar **FSRS** (Free Spaced
  Repetition Scheduler) en vez del scheduler clásico basado en SM-2; FSRS ya
  es el modo recomendado/por defecto en versiones recientes.
  Fuente: [Anki FAQs — What spaced repetition algorithm does Anki use](https://faqs.ankiweb.net/what-spaced-repetition-algorithm) (19-09-2026).

### 2. Cómo funciona por dentro

**Scheduler clásico (SM-2, adaptado por Anki):**
- Cada tarjeta guarda un *ease factor* (empieza en 250%) y un intervalo.
- **Again**: reinicia el intervalo a los pasos de aprendizaje y baja el ease
  20 puntos.
- **Hard**: intervalo × 1.2 y ease −15 puntos.
- **Good**: intervalo × ease actual (el ease no cambia).
- **Easy**: intervalo × ease + bonus, y ease +15 puntos.
- Diferencias del Anki respecto al SM-2 original de Piotr Wozniak: pasos de
  aprendizaje configurables (el original fijaba 1 y 6 días), solo 4 botones
  en vez de 6 (un único "fallo" en vez de 3 niveles), bonus por responder
  tarde pero acertar, y protección de ease (fallos repetidos en fase de
  aprendizaje no siguen bajando el ease, para evitar el "low interval hell").
  Fuente: [Anki FAQs — What spaced repetition algorithm does Anki use](https://faqs.ankiweb.net/what-spaced-repetition-algorithm) (19-09-2026).

**FSRS:** modela cada tarjeta con tres variables — Dificultad, Estabilidad y
Retrievability (probabilidad de recuerdo en este momento), el modelo "DSR".
D y S solo cambian al repasar la tarjeta; R cambia cada día según cuánto
tiempo ha pasado. El usuario fija una **retención deseada** (por defecto 90%,
rango permitido 0.70-0.99) y FSRS calcula el intervalo exacto en el que la
probabilidad de recuerdo caerá justo a ese umbral, en vez de multiplicar por
un factor fijo. Tiene 19 (según versión, hasta 21 en FSRS-6) parámetros
entrenables por usuario: Anki puede re-optimizarlos analizando el historial
de repasos de cada persona con machine learning, así el algoritmo se adapta
a cómo olvida cada usuario en vez de asumir que todos olvidan igual.
Fuentes: [ABC of FSRS (wiki fsrs4anki)](https://github.com/open-spaced-repetition/fsrs4anki/wiki/ABC-of-FSRS) y
[The optimal retention (wiki fsrs4anki)](https://github.com/open-spaced-repetition/fsrs4anki/wiki/The-optimal-retention) (19-09-2026).

Para elegir la retención "óptima", FSRS simula el estudio a distintos niveles
de retención y busca (con el método de Brent) el punto que minimiza la razón
carga-de-estudio/conocimiento-retenido: subir la retención implica repasar
más a menudo (más carga); bajarla implica olvidar y tener que re-aprender
(también más carga). Fuente: [The optimal retention (wiki fsrs4anki)](https://github.com/open-spaced-repetition/fsrs4anki/wiki/The-optimal-retention) (19-09-2026).

### 3. En qué se apoyan para decir que funciona

- Los parámetros por defecto de FSRS están entrenados sobre un dataset propio
  de código abierto de **~727 millones de repasos de 10.000 usuarios** de
  Anki (dataset "anki-revlogs-10k" / FSRS-Anki-20k). Fuente: resumen de
  búsqueda sobre la wiki de fsrs4anki y benchmark de open-spaced-repetition
  (no verificado línea a línea contra el README completo del dataset:
  declarado explícitamente como basado en resumen de búsqueda) (19-09-2026).
- FSRS cita como base académica dos papers **de los mismos autores/entorno**
  (no son evaluaciones independientes de FSRS, son la investigación previa
  sobre la que se construyó):
  - Ye, J., Su, J., Cao, Y. (2022). *A Stochastic Shortest Path Algorithm for
    Optimizing Spaced Repetition Scheduling*. Proceedings of the 28th ACM
    SIGKDD Conference (KDD 2022), pp. 4381-4390. DOI:
    [10.1145/3534678.3539081](https://dl.acm.org/doi/10.1145/3534678.3539081).
    Este paper reporta una mejora del 12.6% frente al estado del arte previo
    y fue desplegado en la app de idiomas MaiMemo con millones de usuarios
    (dato de la propia MaiMemo/autores, no de un tercero independiente).
  - *Optimizing Spaced Repetition Schedule by Capturing the Dynamics of
    Memory* (IEEE TKDE) — citado en la wiki de FSRS como base del modelo
    DSR; título y venue verificados por búsqueda, no se abrió el PDF
    completo (declarado).
  Fuente de la atribución: [ABC of FSRS (wiki fsrs4anki)](https://github.com/open-spaced-repetition/fsrs4anki/wiki/ABC-of-FSRS) (19-09-2026).
- Comparativa cuantitativa FSRS vs SM-2: el repositorio
  [open-spaced-repetition/srs-benchmark](https://github.com/open-spaced-repetition/srs-benchmark)
  (mantenido por el mismo equipo/comunidad que desarrolla FSRS, por tanto
  **no es un tercero independiente**) evalúa FSRS v1 a v6 contra SM-2 sobre
  9.999 usuarios y 349.923.850 repasos, con métricas Log Loss, AUC y un RMSE
  por bins; concluye que FSRS reduce repasos necesarios para la misma
  retención frente a SM-2. No se encontró una réplica de este benchmark
  hecha por un laboratorio o autor sin relación con el proyecto FSRS.
  Fuente: [srs-benchmark README](https://github.com/open-spaced-repetition/srs-benchmark) (19-09-2026).

## Duolingo

### 1. Mecánicas concretas

- Ejercicios cortos de varios tipos (traducir, elegir opción, emparejar,
  hablar, escuchar) agrupados en lecciones dentro de una unidad; corrección
  automática inmediata acierto/fallo.
- **Birdbrain**: motor interno que estima, para cada usuario y cada concepto
  gramatical/palabra, la probabilidad de acertar un ejercicio dado, y elige
  qué ejercicios mostrar en la siguiente lección para mantener una
  dificultad "Goldilocks" (ni trivial ni imposible).
  Fuente: [Duolingo Blog — Learning how to help you learn: Introducing Birdbrain!](https://blog.duolingo.com/learning-how-to-help-you-learn-introducing-birdbrain) (19-09-2026).
- Repetición espaciada de vocabulario vía un modelo de "vida media" (half-life)
  por palabra/lexema, no por tarjeta física.
- Capa de enganche: rachas (streaks) diarias, "Streak Freeze"/comodines,
  ligas semanales, XP y notificaciones — Devsparring ya descartó ligas,
  vidas y culpa, así que se documenta para saber qué se está dejando fuera
  a propósito.

### 2. Cómo funciona por dentro

**Half-Life Regression (HLR):** modelo publicado en el paper de investigación
propio de Duolingo (ver fuentes). La probabilidad de recordar una palabra en
el instante t es `p = 2^(-Δ/h)`, donde Δ es el tiempo desde el último repaso
(en días) y h es la "media vida" estimada de esa palabra en la memoria del
alumno. h se predice con un modelo entrenado (regresión log-lineal) sobre
features como número de repasos, aciertos/fallos previos, dificultad
intrínseca del lexema (frecuencia en inglés, categoría gramatical) y tiempo
transcurrido; cada lexema lleva etiqueta de parte del gramatical y de rango
de frecuencia. El sistema recalcula h tras cada interacción y decide cuándo
reintroducir la palabra según cuándo p cruza un umbral.
Fuente: Settles, B. & Meeder, B. (2016). *A Trainable Spaced Repetition Model
for Language Learning*. ACL 2016, pp. 1848-1858.
[PDF oficial de Duolingo Research](https://research.duolingo.com/papers/settles.acl16.pdf) (19-09-2026).

**Birdbrain:** tras cada ejercicio completado por cualquier usuario, el
modelo actualiza dos estimaciones a la vez, con una formulación de tipo
Item Response Theory (IRT) — probabilidad de acierto en función de
dificultad del ítem y habilidad del alumno: (a) la dificultad del ejercicio
concreto y (b) la habilidad del alumno en el concepto subyacente. El
"Session Generator" usa esas dos señales para elegir, de entre todos los
ejercicios posibles, cuáles tienen la dificultad justa para ese alumno en
ese momento. Escala citada por la empresa: 1.250 millones de ejercicios al
día, calibrando la dificultad en 14 ms por ejercicio (dato de terceros/
prensa, no de una publicación técnica propia con esa cifra exacta — se
declara como no verificado de primera mano).
Fuente principal: [Duolingo Blog — Introducing Birdbrain](https://blog.duolingo.com/learning-how-to-help-you-learn-introducing-birdbrain) (19-09-2026).
Cifra de escala (1.250M ejercicios/día, 14ms), basada en resumen de
búsqueda sobre un artículo de terceros (tomdaccord.com / MIT Sloan), NO
verificada contra una fuente primaria de Duolingo (19-09-2026).

**Rachas:** contador de días consecutivos con al menos una lección
completada; comodines como "Streak Freeze" y "Weekend Amulet" permiten
saltarse un día sin perder la racha. Duolingo prueba estos mecanismos con
A/B tests internos (ver más abajo).

### 3. En qué se apoyan para decir que funciona

- **HLR (repetición espaciada)** — paper propio, revisado por pares (ACL
  2016): reporta una reducción del error de predicción de recuerdo de
  ~35% frente a SM-2 y ~17% frente a Leitner, evaluado sobre datos de
  producción de Duolingo (del orden de 13.000 usuarios/millones de repasos
  de flashcards). Es investigación de la propia empresa, publicada con
  revisión académica externa (ACL), por lo que tiene más peso que un simple
  post de blog, pero los datos son de su propia plataforma.
  Fuente: [Settles & Meeder, ACL 2016 (PDF)](https://research.duolingo.com/papers/settles.acl16.pdf) (19-09-2026); código y datos
  públicos en [github.com/duolingo/halflife-regression](https://github.com/duolingo/halflife-regression).
- **Birdbrain** — la propia empresa afirma en su blog que "A/B testing
  showed that using information from Birdbrain... has consistently helped
  our learners learn more" y que los usuarios completan más lecciones y
  vuelven más a menudo; no publican el tamaño del efecto ni el paper
  académico correspondiente en ese post, es una afirmación de la empresa
  sin cifra. Fuente: [Duolingo Blog — Introducing Birdbrain](https://blog.duolingo.com/learning-how-to-help-you-learn-introducing-birdbrain) (19-09-2026).
- **Rachas / streak wagers / Weekend Amulet** — resultados de A/B test
  propios publicados en su blog: la apuesta de racha ("Streak Wager") dio
  "aumentos estadísticamente significativos" en retención D1/D7/D14, con
  +14% en retención a 7 días; el "Weekend Amulet" dio +4% de probabilidad de
  volver a la semana siguiente y −5% de probabilidad de perder la racha.
  Son datos propios de la empresa (no hay paper académico ni auditoría
  externa citada), pero sí cuantificados y con metodología de A/B test
  declarada. Fuente: [Duolingo Blog — How Streaks keep Duolingo learners committed](https://blog.duolingo.com/how-streaks-keep-duolingo-learners-committed-to-their-language-goals/) (19-09-2026).
- Cifras de churn/retención agregada (churn del 47% al 28%, DAU de 5M a 40M+,
  etc.) que circulan en artículos de terceros (StriveCloud, Propel, vmobify)
  **no están verificadas contra una fuente primaria de Duolingo** en esta
  pasada de research: se descartan como fuente para este informe porque no
  cumplen la regla de "fuente propia de la empresa o estudio independiente
  citable", son análisis de marketing de terceros sin cita primaria clara.

## Quizlet

### 1. Mecánicas concretas

- El modo **Learn** no es solo la tarjeta clásica: varía el tipo de
  pregunta (flashcard, verdadero/falso, opción múltiple, escrita) y la
  dificultad según cómo va el usuario, en vez de repetir siempre el mismo
  formato.
  Fuente: [Introducing the new Quizlet Learn (Quizlet blog)](https://quizlet.com/blog/introducing-the-new-quizlet-learn) — verificado por resumen de búsqueda, no se abrió la página completa (403 al hacer fetch directo) (19-09-2026, declarado no verificado de primera mano).
- La repetición espaciada de "Long-Term Learning" **se activa sola en sets
  de 100+ términos**; no hay botones tipo Again/Hard/Good visibles para el
  usuario en ese modo: el sistema infiere la dificultad de cada término
  observando aciertos/fallos y tiempo de respuesta, no pidiendo una
  autoevaluación explícita de confianza en cada tarjeta.
  Fuente: resumen de búsqueda sobre [The Science Behind Spaced Repetition Learning (Quizlet)](https://quizlet.com/content/science-behind-spaced-repetition) (fetch directo bloqueado con 403; declarado no verificado de primera mano) (19-09-2026).
- Selección de qué mostrar: prioriza los términos con menor probabilidad
  predicha de recuerdo en ese momento.

### 2. Cómo funciona por dentro

Según el post técnico propio de Quizlet (blog de ingeniería, autor Shane
Mooney, 2017): entrenaron un modelo de **regresión logística** sobre más de
un millón de respuestas de usuarios reales para predecir la probabilidad de
que un alumno recuerde un término concreto en el instante actual. Eligieron
regresión logística en vez de un modelo más sofisticado a propósito, porque
da una ecuación simple e interpretable que se puede convertir directamente
en un módulo JavaScript para la web y compilar en las apps iOS/Android (el
modelo corre en el cliente, no solo en el servidor). Las features usadas
incluyen corrección/fallo previo, tiempo transcurrido desde la última
respuesta y tipo de pregunta. El AUROC reportado del modelo es **0.815**.
Con la probabilidad de recuerdo estimada por término, el sistema muestra
primero los términos con menor probabilidad.
Fuente: [Spaced Repetition for All: Cognitive Science Meets Big Data in a Procrastinating World, Shane Mooney, Tech @ Quizlet (Medium, 2017)](https://medium.com/tech-quizlet/spaced-repetition-for-all-cognitive-science-meets-big-data-in-a-procrastinating-world-59e4d2c8ede1) —
fetch directo bloqueado (403 en Medium y en la versión espejo de quizlet.com/blog);
contenido reconstruido a partir de varios resúmenes de búsqueda coincidentes
sobre la misma fuente primaria, declarado explícitamente como **no leído de
primera mano completo** (19-09-2026).

### 3. En qué se apoyan para decir que funciona

- **Fuente propia**: el post de ingeniería de Quizlet (Shane Mooney, 2017)
  citado arriba es la propia justificación técnica de la empresa; no cita
  papers académicos externos por nombre en los resúmenes disponibles (no se
  pudo confirmar si el post original cita a Ebbinghaus/Pavlik/Bjork porque
  el fetch fue bloqueado).
- **Estudio independiente**: meta-análisis revisado por pares publicado en
  *Frontiers in Psychology* (2024), *"Quantifying cognitive and affective
  impacts of Quizlet on learning outcomes: a systematic review and
  comprehensive meta-analysis"*. Analizó 23 estudios (de un pool inicial de
  94) que comparaban Quizlet con métodos de estudio tradicionales.
  Resultados: efecto moderado en logro de vocabulario (Hedges' g = 0.62,
  21 estudios), efecto moderado en retención de vocabulario (g = 0.74, 5
  estudios) y efecto pequeño en actitud del alumno (g = 0.37, 2 estudios).
  Conclusión de los autores: Quizlet mejora el aprendizaje y la retención de
  vocabulario, con efecto pequeño positivo en actitud.
  Fuente: [Frontiers in Psychology, 10.3389/fpsyg.2024.1349835](https://www.frontiersin.org/journals/psychology/articles/10.3389/fpsyg.2024.1349835/full) (19-09-2026).
  Este es un estudio académico independiente (no financiado ni escrito por
  Quizlet, según lo que declara el propio artículo), a diferencia del resto
  de fuentes de esta sección.

## RemNote

### 1. Mecánicas concretas

- Mecánica diferencial frente al resto: las tarjetas nacen **dentro de las
  notas** (outline jerárquico tipo Roam/Logseq), no en un mazo separado.
  Escribiendo con cierta sintaxis dentro de una nota se generan tarjetas
  automáticamente:
  - `::` define un **Concepto** (con su definición) y `;;` añade un
    **Descriptor** (propiedad/atributo del concepto) — el par
    Concepto/Descriptor genera automáticamente tarjetas en ambas
    direcciones (concepto→propiedad y propiedad→concepto).
  - `>>` o `==` en un bullet crea una tarjeta "Basic" pregunta→respuesta
    (todo lo anterior al marcador es el frente, lo posterior el reverso).
  - `{{texto}}` o seleccionar texto y pulsar `{` crea una tarjeta Cloze
    (hueco relleno).
  - Existe generación asistida por IA de tarjetas a partir del texto de la
    nota (multiple choice, cloze, concepto/descriptor).
  Fuentes: [Concept Descriptor (RemNote)](https://www.remnote.com/feature/concept-descriptor), [Creating Concept/Descriptor Flashcards (Help Center)](https://help.remnote.com/en/articles/6751778-creating-concept-descriptor-flashcards) (19-09-2026).
- Repaso con **FSRS** (mismo algoritmo que Anki, ver sección Anki) como
  scheduler por defecto desde cierta versión, con opción de importar el
  historial de repaso de Anki y seguir desde donde estaba.
  Fuente: [The FSRS Spaced Repetition Algorithm (RemNote Help Center)](https://help.remnote.com/en/articles/9124137-the-fsrs-spaced-repetition-algorithm) (19-09-2026).
- El propio producto incluye una guía de "ciencia del aprendizaje" dentro de
  su web de marketing (active recall, forgetting curve, práctica
  distribuida) como argumento de venta explícito.

### 2. Cómo funciona por dentro

RemNote usa FSRS igual que Anki (ver detalle del modelo DSR en la sección
Anki), con matices propios: 17 "weights" combinados en un único vector de
parámetros (frente a los 19-21 de la versión genérica de fsrs4anki, según la
propia documentación de RemNote), pasos de aprendizaje y re-aprendizaje
configurables por separado, y un "New Card Forgot Interval" (tiempo antes de
volver a mostrar una tarjeta nueva que se ha fallado). Incluye un
optimizador que recalcula los parámetros analizando el historial de repaso
de cada usuario, y recomienda un mínimo de 1.000 repasos antes de
optimizar. RemNote describe FSRS como "aritmética simple" para calcular
intervalos y dificultad por tarjeta, aunque el proceso de derivar los
parámetros es más complejo que en SM-2.
Fuente: [The FSRS Spaced Repetition Algorithm (RemNote Help Center)](https://help.remnote.com/en/articles/9124137-the-fsrs-spaced-repetition-algorithm) (19-09-2026).

La generación de tarjetas desde el Concept/Descriptor Framework es la pieza
copiable más específica de RemNote: en vez de que el usuario redacte
pregunta y respuesta a mano, estructura el conocimiento como pares
concepto-atributo y el sistema deriva las tarjetas de esa estructura, en
ambas direcciones, sin trabajo adicional.

### 3. En qué se apoyan para decir que funciona

- **FSRS**: RemNote reporta "20-30% fewer reviews to achieve the same level
  of knowledge retention" frente a SM-2. La propia página de ayuda de
  RemNote **no cita ningún paper peer-reviewed**, solo enlaza a la wiki de
  código abierto de fsrs4anki (la misma base de evidencia descrita en la
  sección Anki de este informe: dataset propio de ~727M repasos y los dos
  papers de Ye et al.). Fuente: [The FSRS Spaced Repetition Algorithm (RemNote Help Center)](https://help.remnote.com/en/articles/9124137-the-fsrs-spaced-repetition-algorithm) (19-09-2026).
- **Ciencia del aprendizaje en general**: la página de marketing
  `remnote.com/learning` cita, con autor y año pero sin título completo ni
  venue: Ebbinghaus (1885) para la curva del olvido, Roediger & Karpicke
  (2006) para el "testing effect" (práctica de recuperación vs. releer) y
  Yang et al. (2021) para una estadística de "70% de la información nueva
  se olvida en 24h sin repaso". Son estudios académicos independientes de
  RemNote en su origen (Roediger & Karpicke es un trabajo real y muy citado
  en psicología cognitiva), pero **RemNote los usa como argumento de
  marketing sin dar la referencia completa** en esa página; no se pudo
  verificar el título exacto ni el journal de Yang et al. (2021) en esta
  pasada. Fuente: [The Science of Effective Learning (RemNote)](https://www.remnote.com/learning) (19-09-2026), declarado con cita incompleta en origen.

## Brainscape

### 1. Mecánicas concretas

- **Confidence-Based Repetition (CBR)**: tras intentar responder de memoria
  y ver la respuesta, el usuario se autoevalúa en una escala de **1 a 5**
  (no 4 botones como Anki, ni verdadero/falso): 1 = no lo sabía en absoluto,
  5 = lo sé perfectamente. Esa puntuación decide directamente cuándo vuelve
  la tarjeta: los 1 vuelven casi enseguida, los 5 casi no vuelven.
  Fuente: [What Is Confidence-Based Repetition (Brainscape Academy)](https://www.brainscape.com/academy/confidence-based-repetition-definition/) (19-09-2026).
- Combina dos procesos cognitivos explícitos y nombrados por la propia
  empresa: **active recall** (intentar responder antes de ver la solución)
  y **metacognición** (juzgar la propia confianza), presentado como su
  ventaja diferencial sobre "el Leitner de toda la vida".

### 2. Cómo funciona por dentro

El intervalo hasta la próxima aparición de una tarjeta no depende solo de la
última puntuación 1-5: Brainscape declara que combina (i) cuántos mazos o
clases tiene el usuario activos en la sesión de estudio, (ii) el patrón de
estudio previo del usuario, (iii) el tiempo transcurrido desde la última vez
que se estudió esa tarjeta concreta, y (iv) cuántas tarjetas hay ya
acumuladas en cada uno de los "cubos" de confianza 1-5. Es decir, la cola de
repaso se recalcula mezclando la posición de la tarjeta en su propio cubo de
confianza con la carga total de tarjetas pendientes en otros cubos, no solo
un intervalo card-by-card como SM-2/FSRS.
Fuente: [How does Brainscape's spaced repetition algorithm work? (Brainscape Help Center)](https://brainscape.zendesk.com/hc/en-us/articles/13103043051149-How-does-Brainscape-s-spaced-repetition-algorithm-work-i-e-Confidence-Based-Repetition) (19-09-2026).

No se encontró una fórmula matemática publicada (a diferencia de SM-2/FSRS/
HLR, que sí publican su ecuación exacta): Brainscape describe el
comportamiento cualitativo del algoritmo pero no la implementación interna
línea a línea; se declara como límite de esta investigación.

### 3. En qué se apoyan para decir que funciona

- Existe un documento propio, *"Brainscape's 'Confidence-Based Repetition'
  Methodology"* de Andrew Cohen (fundador de Brainscape), indexado en
  Semantic Scholar como white paper — no se pudo verificar si tuvo revisión
  por pares independiente ni acceder a su contenido completo (el fetch
  devolvió la página vacía). Se declara explícitamente como **fuente propia
  de la empresa, de estatus de revisión no confirmado**.
  Fuente: [Semantic Scholar — Brainscape's Confidence-Based Repetition Methodology, Cohen](https://www.semanticscholar.org/paper/Brainscape-%E2%80%99-s-%E2%80%9C-Confidence-Based-Repetition-%E2%80%9D-Cohen/4b183677d1ea0cff0ca240c184ae599c6551157d) (19-09-2026, contenido no accesible).
- Brainscape Academy (contenido de marketing/blog propio) apoya su discurso
  citando una lista extensa de estudios académicos **de terceros
  independientes**, con autor y año: Ebbinghaus (1885, 1913) sobre la curva
  del olvido; Cepeda et al. (2006), revisión de más de 800 estudios de
  repetición espaciada, "96% de los experimentos muestran mejoras
  estadísticamente significativas" al espaciar vs. estudiar todo junto;
  Karpicke (2012) y Karpicke & Blunt (2011) sobre superioridad de la
  recuperación activa frente al repaso pasivo; Son & Metcalfe (2005) sobre
  precisión de la autoevaluación; Pavlik & Anderson (2005) sobre efecto de
  espaciado en vocabulario; Roediger III & Butler (2011) sobre el papel de
  la práctica de recuperación; Bahrick & Phelps (1987) sobre retención a
  muy largo plazo de vocabulario de español; Bloom (1984) sobre tutoría
  1 a 1 ("2 desviaciones estándar" de mejora); Miller (1956) sobre capacidad
  de memoria de trabajo. Son estudios académicos reales y bien conocidos en
  la literatura, pero **Brainscape los usa para argumentar en general a
  favor de active recall/espaciado**, no como evidencia específica de que su
  algoritmo CBR concreto (la escala 1-5 y la mezcla de cubos) supere a
  otros. No se encontró un estudio independiente que compare CBR
  directamente contra SM-2 o FSRS.
  Fuente: [The Complete Cognitive Science Behind Brainscape (Brainscape Academy)](https://www.brainscape.com/academy/brainscape-cognitive-science/) (19-09-2026).

## Memrise

### 1. Mecánicas concretas

- Repetición espaciada clásica con **intervalos fijos en escalera** (no
  algoritmo adaptativo tipo SM-2/FSRS por tarjeta): si aciertas, la palabra
  sube al siguiente escalón de la escalera; si fallas, vuelve al primer
  escalón. Fuente: resumen de búsqueda sobre [How does the spaced repetition system work? (Memrise Help Center)](https://memrisebeta.zendesk.com/hc/en-us/articles/24998764126097-How-does-the-spaced-repetition-system-work) — fetch directo bloqueado con 403, declarado no verificado de primera mano (19-09-2026).
- **Mems**: mnemotecnias visuales creadas por otros usuarios (una imagen o
  asociación graciosa/memorable ligada a una palabra concreta) que se
  muestran junto a la tarjeta para ayudar a fijarla. Es la seña de
  identidad histórica de Memrise, retirada en algún momento y devuelta a la
  app en febrero de 2026 según su propio blog de producto.
  Fuente: resumen de búsqueda sobre "February Product Roundup" (memrise.com/blog) (19-09-2026, no verificado de primera mano).
- Vídeos de hablantes nativos reales pronunciando la palabra/frase (en vez
  de solo texto o voz sintética), para dar contexto cultural y de
  pronunciación real.
- Capa de enganche con gamificación: puntos, clasificaciones, grupos de
  estudio.

### 2. Cómo funciona por dentro

Según resúmenes de búsqueda sobre la documentación de ayuda de Memrise (no
verificado de primera mano, fetch bloqueado con 403), la escalera de
intervalos tras un acierto sigue aproximadamente esta secuencia: **4 horas
→ 12 horas → 24 horas → 6 días → 12 días → 48 días → 96 días → 6 meses**.
Un fallo en cualquier repaso devuelve el ítem al primer escalón (4 horas),
no a un escalón intermedio como en algunos sistemas Leitner. No se encontró
documentación técnica propia (a nivel de blog de ingeniería o paper) que
explique cómo se ajusta esa escalera por dificultad individual del ítem o
del usuario más allá de "acierto avanza / fallo reinicia"; se declara como
límite de esta investigación.

Los "mems" no son un mecanismo algorítmico de repetición sino una capa de
codificación (encoding): el fundador Ed Cooke es Grand Master of Memory
(campeón de memorización competitiva) y co-fundó Memrise con el
neurocientífico Greg Detre explícitamente para aplicar técnicas de
mnemotecnia (asociación de imágenes, humor, absurdo) a la adquisición de
vocabulario, en vez de depender solo del espaciado temporal.
Fuente: [Ed Cooke (author) — Wikipedia](https://en.wikipedia.org/wiki/Ed_Cooke_(author)) (19-09-2026).

### 3. En qué se apoyan para decir que funciona

- No se encontró en memrise.com una página propia de "ciencia"/investigación
  equivalente a la de RemNote o Brainscape Academy que liste papers citados
  explícitamente por Memrise como empresa (búsqueda específica sin
  resultado claro); se declara como "no encontrado".
- La justificación que sí aparece repetida en fuentes sobre la empresa es
  biográfica/de fundador: Memrise se presenta como "fundada por
  neurocientíficos de Oxford/Princeton para construir una app de idiomas
  sobre cómo funciona realmente la memoria", apoyándose en la reputación de
  Ed Cooke como Grand Master of Memory, no en un estudio publicado y
  citable con metodología propia. Fuente: resumen de búsqueda sobre "About
  us" (memrise.com) y perfil de Ed Cooke en Wikipedia (19-09-2026).
- Único dato cuantitativo encontrado sobre eficacia es de un **estudio
  académico de terceros, pequeño**: tras una intervención de 4 semanas con
  Memrise, "el 90% de los participantes aumentó su rendimiento" en un
  post-test (revista Academy Publication / estudio sobre estudiantes de
  instituto usando Memrise). Es un estudio independiente pero de tamaño y
  alcance no verificados en esta pasada (no se abrió el PDF completo para
  confirmar n, diseño y significancia estadística); se declara como dato
  débil, no como prueba sólida. Fuente: [Measuring the Effectiveness of Using "Memrise" on High School students (academypublication.com, PDF)](https://www.academypublication.com/issues2/tpls/vol08/12/25.pdf) (19-09-2026, resumen de búsqueda, no leído completo).
- Se buscó explícitamente un paper o blog técnico de Memrise sobre su propio
  algoritmo de espaciado (equivalente al de Quizlet o Duolingo) y **no se
  encontró**: a diferencia de Anki/Duolingo/Quizlet/RemNote, Memrise no
  parece publicar su metodología de scheduling con el mismo nivel de
  detalle técnico abierto.

## Otra app relevante: SuperMemo

Se añade porque es el origen de toda la familia (SM-2 es la base de Anki;
FSRS se compara constantemente contra "SM-17"/SM-18 en la propia
documentación de Anki) y porque su creador, Piotr Wozniak, lleva desde 1985
publicando su propia investigación sobre olvido y espaciado, el caso de
research propio más largo y mejor documentado de todo este informe.

### 1. Mecánicas concretas

- Tarjeta pregunta/respuesta con autoevaluación en escala de grado (0-5,
  heredera directa de la que copiaron Anki/RemNote con 4 botones).
- A partir de SM-17 (2016) el algoritmo asume que **la dificultad de un
  ítem no es constante**: puede cambiar drásticamente por "anchoring"
  (nuevo contexto mnemotécnico que se asocia al ítem) o por interferencia
  con otros ítems parecidos — algo que ni SM-2 ni FSRS modelan de la misma
  forma. Fuente: [Algorithm SM-18 (supermemo.guru)](https://supermemo.guru/wiki/Algorithm_SM-18) (19-09-2026).

### 2. Cómo funciona por dentro

El **modelo de dos componentes** (introducido en el paper de 1994/1995, ver
abajo) es el fundamento teórico de todo SM-17/SM-18/SM-19: separa
**Retrievability** (R, probabilidad de recordar el ítem ahora mismo) de
**Stability** (S, cuánto dura una memoria sin repasar antes de que R caiga).
Es el mismo par conceptual que luego adoptó FSRS (con una tercera variable,
Difficulty, añadida explícitamente). Secuencia de cálculo de SM-18: calcular
el intervalo de arranque con la "primera curva de olvido" → programar el
repaso → recalcular la dificultad del ítem → reestimar R y S a partir de
"tres fuentes de información" (no detalladas en la wiki pública) → calcular
el siguiente intervalo óptimo con la "curva de estabilización". No se
encontró la fórmula matemática exacta ni la matriz de valores completa en
las páginas públicas de supermemo.guru: SuperMemo mantiene buena parte del
algoritmo comercial sin publicar (a diferencia de FSRS, que es código
abierto); se declara como límite de esta investigación.
Fuente: [Algorithm SM-18 (supermemo.guru)](https://supermemo.guru/wiki/Algorithm_SM-18), [Two component model of memory (supermemo.guru)](https://supermemo.guru/wiki/Two_component_model_of_memory) (19-09-2026).

### 3. En qué se apoyan para decir que funciona

- Es el único caso de este informe con **paper propio revisado por pares en
  revista científica**, y no uno sino dos, ambos en *Acta Neurobiologiae
  Experimentalis*:
  - Wozniak, P.A. & Gorzelańczyk, E.J. (1994). *Optimization of repetition
    spacing in the practice of learning*. Acta Neurobiologiae
    Experimentalis, 54, 59-62.
  - Wozniak, P.A., Gorzelańczyk, E.J. & Murakowski, J.A. (1995). *Two
    components of long-term memory*. Acta Neurobiologiae Experimentalis,
    55, 301-305.
  Fuentes: listado de publicaciones citado en resumen de búsqueda sobre
  [super-memory.com/english/publicat.htm](http://super-memory.com/english/publicat.htm) y
  [Two components of long-term memory (1995) (supermemo.guru)](https://supermemo.guru/wiki/Two_components_of_long-term_memory_(1995)) (19-09-2026); no se abrió el PDF original de la revista para
  verificar el texto completo, solo metadatos de la cita (declarado).
- La curva de olvido con decaimiento exponencial negativo fue "probada" por
  Wozniak y colaboradores analizando **80.399 casos de repetición**
  (dato propio, de su software, no un ensayo clínico controlado por
  terceros). Fuente: resumen de búsqueda sobre [The forgetting curve and repetitions (SuperMemo blog)](https://www.supermemo.com/en/blog/forgetting-curve-and-repetitions) (19-09-2026).
- A diferencia de FSRS (que sí publica benchmarks públicos comparando contra
  SM-2, ver sección Anki), no se encontró un benchmark público reciente y
  detallado de SM-17/SM-18 contra SM-2 o FSRS publicado por SuperMemo
  mismo con metodología abierta; la comparación "FSRS está a la altura de
  SM-17" que aparece en la documentación de Anki es una afirmación de la
  comunidad FSRS, no de SuperMemo. Se declara como "no encontrado" un
  benchmark propio de SuperMemo equivalente al de open-spaced-repetition.

## Tabla final

| Mecánica | Qué la sostiene | ¿Aplica a Devsparring? | Por qué sí / por qué no |
|---|---|---|---|
| Autoevaluación 1-a-N tras intentar recordar (Again/Hard/Good/Easy de Anki; 1-5 de Brainscape) | Modelo DSR (Anki/RemNote), CBR (Brainscape); ambos son mecanismos operativos, no un paper único | Sí, ya encaja | La corrección con IA de Devsparring contra rúbrica junior/mid/senior **ya es** una autoevaluación más rica que un botón (da feedback textual, no solo un grado); se puede además pedir al usuario un grado de confianza pre-respuesta para calibrar metacognición, con coste casi nulo |
| FSRS (modelo DSR: Dificultad/Estabilidad/Retrievability, retención deseada objetivo) | Papers Ye et al. (KDD 2022, IEEE TKDE) + dataset abierto de ~727M repasos + benchmark propio del equipo FSRS (no independiente) | Ya implementado (ts-fsrs) | Es la pieza que Devsparring ya usa; este research confirma que sigue siendo el estado del arte citado también por RemNote, y que la "retención deseada" configurable (90% por defecto) es una palanca directa para el usuario nervioso con poco tiempo: bajarla reduce carga de repasos a costa de recordar algo menos |
| Half-Life Regression / predicción de recuerdo con ML entrenado en datos propios (Duolingo, Quizlet) | Paper ACL 2016 (Duolingo, revisado por pares) y post técnico propio con AUROC 0.815 (Quizlet, no revisado por pares) | No, de momento | Exige un volumen de datos de uso propio (millones de respuestas) del que Devsparring no dispone con 377 preguntas y una base de usuarios pequeña; FSRS ya resuelve el mismo problema sin necesitar ese volumen porque se re-optimiza por usuario individual |
| Dificultad adaptativa "Goldilocks" con IRT (Birdbrain de Duolingo) | Afirmación propia de empresa vía A/B test, sin cifra publicada | Parcialmente aplicable, no prioritario | Devsparring podría estimar por nivel (junior/mid/senior) qué preguntas fallan más para calibrar la dificultad percibida entre modos, pero el volumen de usuarios de un proyecto solo hace poco viable entrenar un modelo IRT propio; la rúbrica por nivel ya cumple una función parecida de forma manual y barata |
| Rachas (streak) sin vidas/ligas/culpa | A/B tests propios de Duolingo (Streak Wager +14% D7, Weekend Amulet +4% retorno) | Ya implementado, con matiz | Devsparring ya tiene racha de días sin castigos (decisión del 17-09-2026, `docs/decisiones.md`); el hallazgo de Duolingo (dar una "válvula de escape" como el Weekend Amulet aumenta el retorno, no lo reduce) sugiere valorar algo así de barato: permitir "guardar" un día sin rachas rotas de forma explícita y sin fricción, no un comodín que haya que comprar o ganar |
| Generación de tarjetas desde estructura de notas (Concept/Descriptor de RemNote) | Sin paper propio; es una decisión de producto, no un hallazgo de investigación | No aplica | Devsparring no es una herramienta de toma de notas: el banco de 377 preguntas ya viene curado y revisado por PR; no hay notas de usuario de las que derivar tarjetas |
| Ligas, clasificaciones, comparación social | Sin paper específico citado por las propias apps; efecto motivador ampliamente asumido en la industria | No, descartado explícitamente | Devsparring ya decidió no usarlas (decisión de gamificación, `docs/decisiones.md`, 14-09-2026): público adulto profesional en búsqueda de empleo, para quien compararse socialmente añade ansiedad en vez de motivación |
| Práctica de recuperación activa (recordar en voz alta / escribir) por encima de opción múltiple | Roediger & Karpicke (2006, independiente, citado también por Brainscape y RemNote) | Ya implementado | Devsparring ya descartó opción múltiple citando el mismo estudio (`docs/decisiones.md`); este research confirma con fuentes adicionales (Karpicke 2012, Karpicke & Blunt 2011) que la decisión está bien fundamentada en literatura independiente, no solo en marketing de una app |
| Vídeos de hablantes nativos / contenido multimedia rico (Memrise) | Sin evidencia cuantitativa sólida encontrada (solo un estudio pequeño, 4 semanas) | No aplica | Devsparring entrena código y conceptos técnicos, no pronunciación ni cultura de idioma; no hay equivalente razonable |
| Mnemotecnias visuales de usuario ("mems" de Memrise) | Reputación del fundador (Grand Master of Memory), sin estudio propio publicado | No, no encaja | El contenido técnico de entrevistas (algoritmos, sistemas) no se presta bien a asociaciones de imágenes absurdas de la misma forma que vocabulario de idioma; coste de moderación de contenido generado por usuarios no justificado para el tamaño del proyecto |

## Lo que no se encontró

- Un blog de ingeniería o paper técnico de **Memrise** que explique su
  algoritmo de espaciado con el mismo nivel de detalle que Anki, Duolingo,
  Quizlet o RemNote: no se encontró (búsqueda en inglés, 19-09-2026).
- El contenido completo del post técnico de Quizlet (Shane Mooney, 2017) y
  de la página `quizlet.com/content/science-behind-spaced-repetition`: ambos
  fetches directos devolvieron 403; solo se pudo reconstruir a partir de
  resúmenes de motor de búsqueda, declarado en cada cita.
- El contenido completo del documento de Andrew Cohen sobre "Confidence-
  Based Repetition" de Brainscape (indexado en Semantic Scholar): la página
  cargó vacía; no se pudo confirmar si tuvo revisión por pares.
- Una fórmula matemática exacta y pública del algoritmo SM-17/SM-18 de
  SuperMemo (a diferencia de FSRS, que es código abierto): SuperMemo no
  publica el detalle completo de su implementación comercial.
- Un benchmark independiente (hecho por alguien sin relación con el proyecto
  FSRS) que compare FSRS contra SM-2 o SM-17/18: todos los benchmarks
  encontrados están mantenidos por el mismo entorno open-spaced-repetition
  que desarrolla FSRS.
- Cifras oficiales y primarias de Duolingo sobre escala de Birdbrain
  (1.250 millones de ejercicios/día, 14 ms de cálculo): solo aparecen en
  artículos de terceros (MIT Sloan Review, blogs), no en una fuente primaria
  de Duolingo con esa cifra exacta.
- Título completo, journal y metodología del estudio "Yang et al. (2021)"
  que cita RemNote en su página de marketing de ciencia del aprendizaje:
  solo aparece como autor+año sin referencia completa.
- Cifras agregadas de churn/DAU de Duolingo (47%→28% de churn, 5M→40M+ DAU)
  verificadas contra una fuente primaria de la empresa: los artículos que
  las citan son de terceros (StriveCloud, Propel, vmobify), no informes o
  blog oficiales de Duolingo; se excluyeron del cuerpo del informe por esa
  razón.
- Un estudio independiente y de tamaño grande (no financiado ni escrito por
  la propia empresa) sobre la eficacia específica de Memrise: solo se
  encontró un estudio pequeño de 4 semanas con resultado positivo (90% de
  participantes mejoró), sin poder verificar diseño, n exacto ni
  significancia estadística en esta pasada.

## Lo que no se encontró

(pendiente)
