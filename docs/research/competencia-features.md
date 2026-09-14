# Análisis de competencia: funciones diferenciadoras para Devsparring

Fecha de elaboración: 2026-09-14. Todas las fechas de verificación de fuentes se indican junto a cada afirmación.

Estado del documento: COMPLETO (todas las secciones rellenadas; ver "Incertidumbres" para los puntos de datos no verificados directamente en fuente oficial).

## Metodología

- Cada ficha se basa en la web propia del competidor (funciones y precios) más búsqueda de reseñas en Reddit, Product Hunt, G2, Trustpilot y Hacker News.
- Toda afirmación lleva enlace y fecha de verificación (formato: `[verificado YYYY-MM-DD]`).
- Cuando la fuente es un snippet de resultados de búsqueda y no la página completa leída, se marca `(resumen de búsqueda, no leído)`.
- Las hipótesis sin confirmar se marcan explícitamente `(hipótesis, no confirmado)`.

---

## 1. Fichas de competidores

### 1.1 LeetCode
- Qué hace: banco masivo de problemas de algoritmos/estructuras de datos con editor de código ejecutable multi-lenguaje, discusiones de la comunidad, "company-tagged problems", y modo "Interview Simulation".
- A quién va: candidatos a entrevistas técnicas de cualquier nivel, sobre todo para preparar rondas de algoritmos tipo FAANG.
- Precio (resumen de búsqueda, no leído; la web oficial devolvió 403 al intentar leerla directamente el 2026-09-14): Premium mensual 35 USD/mes, anual 159 USD/año (~13,25 USD/mes) [verificado 2026-09-14, vía resumen de búsqueda, fuentes: designgurus.io/blog/is-leetcode-premium-worth-it, codeswiftr.com/blog/leetcode-premium-worth-it-2026]. No se pudo confirmar directamente en leetcode.com/subscribe/ (bloqueado, HTTP 403).
- Idioma: interfaz en inglés (con algunas traducciones parciales de la comunidad); no hay versión nativa en español confirmada (hipótesis, no confirmado).
- Editor de código ejecutable: sí, multi-lenguaje, con runner y test cases.
- IA: no se confirmó una función de "entrevistador IA" propio en los resultados de búsqueda revisados; existe herramienta de "AI-powered hints" mencionada en blogs de terceros (resumen de búsqueda, no leído) pero no verificado en fuente oficial.
- Voz: no encontrado.
- Repetición espaciada: no tiene sistema propio de spaced repetition; depende de listas curadas (Blind 75, etc.) y de que el usuario repita manualmente.
- Mocks con humanos: sí, "Interview Simulation" cronometrado pero es contra el propio sistema, no contra humanos en vivo (no confirmado si hay peer mock).
- Banco de preguntas reales por empresa: sí, es su función estrella ("company-tagged problems", filtrar por Google/Amazon/Meta con frecuencia de aparición) [resumen de búsqueda, no leído, fuente: designgurus.io].
- Calibración por nivel: no un sistema explícito de nivel junior/senior; solo dificultad Easy/Medium/Hard por problema.
- Rutas de carrera: no confirmado; existen listas curadas (Blind 75, NeetCode 150 de terceros) pero no una "ruta de carrera" oficial de LeetCode.
- Función más alaborada por usuarios: filtrar problemas por empresa y ver frecuencia de aparición; un usuario lo llama "the best $150 you can spend" [resumen de búsqueda, no leído, fuente: teamblind.com/post/is-leetcode-premium-worth-it-aebdgmmb, verificado 2026-09-14].
- Queja más repetida: que el contenido "premium" se puede conseguir gratis en otros sitios (GeeksforGeeks, GitHub con soluciones) y que las preguntas de LeetCode cada vez reflejan menos lo que preguntan realmente las empresas porque estas escriben sus propias preguntas [resumen de búsqueda, no leído, fuente: teamblind.com, verificado 2026-09-14].

### 1.2 NeetCode
- Qué hace: plataforma creada por el youtuber Navdeep Singh (NeetCode); ofrece la lista curada gratuita "NeetCode 150/250" y una capa de pago "NeetCode Pro" con videoclases organizadas por tema (arrays, árboles, grafos, DP) junto a los problemas, "Versus Mode", y editor propio.
- A quién va: autodidactas que quieren estudiar algoritmos guiados por vídeo en vez de solo texto.
- Precio (resumen de búsqueda, no leído; intento de WebFetch a neetcode.io/pricing no devolvió contenido renderizado el 2026-09-14): NeetCode Pro ronda 119 USD/año y 297 USD acceso de por vida, sin plan mensual [resumen de búsqueda, no leído, fuente: dev.to/alex_hunter_44f4c9ed6671e/best-neetcode-pro-alternatives-in-2026, verificado 2026-09-14]. Los precios exactos no se confirmaron en la fuente oficial.
- Idioma: inglés; no se confirmó español.
- Editor de código ejecutable: sí, integrado.
- IA: no se encontró documentación oficial de funciones de IA (entrevistador, corrección) en los resultados revisados; no confirmado.
- Voz: no encontrado.
- Repetición espaciada: no confirmada como sistema explícito; la estructura es de lista curada progresiva, no SRS.
- Mocks con humanos: no encontrado (el "Versus Mode" es competitivo entre usuarios resolviendo problemas, no una entrevista simulada con persona).
- Banco de preguntas reales por empresa: no es el foco principal (a diferencia de LeetCode); no confirmado.
- Calibración por nivel: no confirmada explícitamente junior/senior.
- Rutas de carrera: la lista NeetCode 150/250 funciona como ruta curada de aprendizaje de algoritmos, pero no es una "ruta de carrera" profesional multi-rol.
- Función más alabada: los vídeos explican "cómo llegar" a la solución (el razonamiento), no solo el código final; calidad de vídeo "unmatched" según comunidades técnicas [resumen de búsqueda, no leído, fuente: educative.io/blog/blind-75-neetcode, verificado 2026-09-14].
- Queja más repetida: dificultad de retención, usuarios que "olvidan el material" después de estudiarlo (apunta a la ausencia de un sistema de repaso espaciado real) [resumen de búsqueda, no leído, verificado 2026-09-14].

### 1.3 Exercism
- Qué hace: 8.620 ejercicios en 83 lenguajes con mentoría humana voluntaria: mentores reales revisan las soluciones enviadas y dan feedback personalizado.
- A quién va: cualquier persona aprendiendo a programar o mejorando en un lenguaje, no específicamente enfocado a entrevistas técnicas.
- Precio: 100% gratis para siempre, financiado por la comunidad, sin tiers de pago [resumen de búsqueda, no leído, fuente: toolradar.com/tools/exercism, verificado 2026-09-14].
- Idioma: inglés; no confirmado español.
- Editor de código ejecutable: sí.
- IA: no es el mecanismo central (el diferencial es mentoría humana, no IA).
- Voz: no encontrado.
- Repetición espaciada: no encontrado.
- Mocks con humanos: no son "mock interviews" propiamente, pero sí revisión de código por humanos reales de forma asíncrona.
- Banco de preguntas reales por empresa: no, es genérico por lenguaje/concepto, no por empresa.
- Calibración por nivel: no un sistema explícito junior/senior.
- Rutas de carrera: no confirmado; tiene "tracks" por lenguaje, no rutas de carrera multi-rol.
- Función más alabada: conseguir revisión de programadores reales con experiencia, gratis, se describe como "increíblemente valioso" [resumen de búsqueda, no leído, fuente: saashub.com/exercism-reviews, verificado 2026-09-14].
- Queja más repetida: disponibilidad variable de mentores según lenguaje y horario, y ausencia de currículo estructurado o certificados útiles para avanzar profesionalmente [resumen de búsqueda, no leído, verificado 2026-09-14].

### 1.4 Codewars
- Qué hace: miles de "katas" creadas por la comunidad, calificadas de 8 kyu (principiante) a 1 kyu (experto); sistema de progresión de rango y honor.
- A quién va: programadores que quieren practicar de forma gamificada y competitiva contra un banco enorme creado por usuarios.
- Precio: tier gratis con acceso completo a la biblioteca de retos; hay planes de pago con valor limitado añadido sobre el gratis [resumen de búsqueda, no leído, fuente: justlearn.com/ai-tools/codewars, verificado 2026-09-14].
- Idioma: inglés (comunidad internacional).
- Editor de código ejecutable: sí.
- IA: no confirmado como función central.
- Voz: no encontrado.
- Repetición espaciada: no encontrado.
- Mocks con humanos: no; es práctica individual con feedback de la comunidad en comentarios, no mock interview.
- Banco de preguntas reales por empresa: no, katas creadas por la comunidad, no ligadas a preguntas reales de empresas.
- Calibración por nivel: sistema de rangos (kyu/dan) como proxy de nivel, pero no mapea a junior/senior de entrevista.
- Rutas de carrera: no.
- Función más alabada: la progresión de rango (kyu) como mecánica de gamificación que engancha para seguir practicando.
- Queja más repetida: la progresión de rango se siente injusta/confusa porque el honor ganado por completar una kata es constante mientras que el honor necesario para subir de nivel crece mucho, así que el "% de progreso" mostrado cae de golpe cada vez que subes de rango (p.ej. de 5% a 1,7% de repente) [resumen de búsqueda, no leído, fuente: docs.codewars.com/gamification/ranks, verificado 2026-09-14]. Relevante para Devsparring: cuidado al diseñar barras de progreso no lineales, generan sensación de retroceso/injusticia.

### 1.5 HackerRank (candidato)
- Qué hace: plataforma de assessments técnicos usada masivamente por empresas para filtrar candidatos (challenges, certificaciones de skills, CodePair colaborativo); para el lado "candidato" ofrece práctica gratuita y certificados.
- A quién va: dos audiencias, empresas que evalúan (de pago) y candidatos que practican/certifican gratis.
- Precio: para candidatos, retos y certificaciones son gratis [resumen de búsqueda, no leído, verificado 2026-09-14]. Para empresas: plan Starter ~165 USD/mes o 1.990 USD/año, Pro ~375-450 USD/mes o 4.490 USD/año, Enterprise a medida [resumen de búsqueda, no leído, fuentes: spendhound.com/marketplace/hackerrank-pricing, vendr.com/marketplace/hackerrank, verificado 2026-09-14; cifras entre fuentes no coinciden exactamente, tratar con cautela].
- Idioma: inglés principalmente.
- Editor de código ejecutable: sí, multi-lenguaje, es su producto base.
- IA: no confirmado un "entrevistador IA" propio orientado a candidatos en las fuentes revisadas.
- Voz: no encontrado.
- Repetición espaciada: no encontrado.
- Mocks con humanos: no es su enfoque (es una herramienta de assessment para reclutadores, no de mock interview entre pares).
- Banco de preguntas reales por empresa: tiene "prep kits" pero no está confirmado que etiquete preguntas por empresa real como LeetCode.
- Calibración por nivel: no confirmado un sistema junior/senior explícito para candidatos.
- Rutas de carrera: no confirmado.
- Función más alabada: certificaciones de skills gratuitas y compartibles, útiles como credential rápido.
- Queja más repetida: un usuario en foros técnicos calificó experiencias similares (CodeSignal) de "bullshit"; sobre HackerRank en particular se repiten menciones de bugs en la plataforma de examen y el título de hilo "Companies like HackerRank are destroying coding interviews", reflejando fricción con el formato de assessment automatizado como filtro [resumen de búsqueda, no leído, fuente: teamblind.com/company/Hackerrank, verificado 2026-09-14].

### 1.6 CodeSignal
- Qué hace: plataforma "AI-native skills platform" con tres productos: Hire (assessments/entrevistas IA para reclutadores), Learn (upskilling práctico individual con asistente "Cosmo"), Education (programas académicos). Tiene "Interview Practice" con más de 30 lenguajes y un modo que simula el entorno real de examen.
- A quién va: empresas (Hire) y desarrolladores individuales (Learn/Cosmo+).
- Precio: Learn gratis para individuos, Cosmo+ 24,99 USD/mes; Hire desde 79-99 USD/mes hasta 599 USD/mes, Pro a medida [resumen de búsqueda, no leído, fuentes: codesignal.com/pricing (snippet), testtrick.com/blogs/codesignal-pricing-plans, verificado 2026-09-14; cifras entre fuentes varían, no confirmado con lectura directa de la página oficial].
- Idioma: inglés.
- Editor de código ejecutable: sí.
- IA: sí, "Cosmo" como asistente/coach de IA en Learn, y "AI-powered interviews" en Hire para roles técnicos y no técnicos [resumen de búsqueda, no leído, verificado 2026-09-14]; no se detalla si Cosmo actúa como entrevistador de voz o solo chat de texto (no confirmado).
- Voz: no confirmado.
- Repetición espaciada: no encontrado.
- Mocks con humanos: no es el foco (es evaluación automatizada/IA, no mock con persona real).
- Banco de preguntas reales por empresa: no confirmado.
- Calibración por nivel: el "Practice Test" da una nota global de habilidad de código y resolución de problemas, pero no está confirmado que calibre explícitamente junior/senior.
- Rutas de carrera: no confirmado.
- Función más alabada: el entorno de práctica es "extremadamente similar" al que se usa en la entrevista real, por lo que no hay curva de aprendizaje de la herramienta el día de la entrevista [resumen de búsqueda, no leído, fuente snippet de reseñas AWS Marketplace, verificado 2026-09-14].
- Queja más repetida: hay "suerte" en qué problema te toca (los problemas se asignan de forma pseudo-aleatoria), falta de transparencia en el scoring, y no se pueden repasar las preguntas después como en LeetCode [resumen de búsqueda, no leído, verificado 2026-09-14].

### 1.7 AlgoExpert
- Qué hace: ~160 problemas curados de algoritmos con videoexplicación en dos partes (concepto + código), más el add-on SystemsExpert (system design) y mock interviews entre usuarios emparejados al azar.
- A quién va: candidatos que prefieren aprender por vídeo con curaduría estricta en vez de un banco enorme sin guía.
- Precio: AlgoExpert y SystemsExpert por separado 74 USD y 59 USD, o bundle completo ~99 USD/año; rango general 99-199 USD/año, solo anual, sin prueba gratis ni reembolsos [resumen de búsqueda, no leído, fuentes: dev.to/alex_hunter_44f4c9ed6671e/algoexpert-vs-algomonster, lodely.com/blog/algoexpert-pricing, verificado 2026-09-14].
- Idioma: inglés.
- Editor de código ejecutable: sí.
- IA: no tiene mock interview con IA; el mock interview es peer-to-peer con otro usuario humano aleatorio, a diferencia de alternativas como Pramp o LeetCopilot que sí usan IA [resumen de búsqueda, no leído, verificado 2026-09-14].
- Voz: no confirmado más allá del mock humano por videollamada.
- Repetición espaciada: no encontrado.
- Mocks con humanos: sí, con otro usuario de AlgoExpert emparejado al azar (o un amigo); la experiencia "varía mucho" según quién te toque [resumen de búsqueda, no leído, verificado 2026-09-14].
- Banco de preguntas reales por empresa: no es su fuerte, según reseñas necesita complementarse para prep específica de empresa.
- Calibración por nivel: no confirmado.
- Rutas de carrera: no confirmado explícitamente.
- Función más alabada: el contenido de system design (SystemsExpert), con "una docena de mock interviews de una hora de diseño de sistemas" descritas como muy útiles [resumen de búsqueda, no leído, fuente: prachub.com/resources/is-algoexpert-still-worth-it-in-2026, verificado 2026-09-14].
- Queja más repetida: que el contenido de algoritmos "no vale el precio" porque NeetCode es mejor y gratis, y que esencialmente reempaqueta soluciones de LeetCode con vídeo añadido; también se menciona software "buggy y poco pulido" [resumen de búsqueda, no leído, fuente: hilos de teamblind.com (is-algoexpert-worth-it), verificado 2026-09-14].

### 1.8 GreatFrontEnd
- Qué hace: plataforma especializada solo en frontend: 500+ preguntas con soluciones de ex-entrevistadores, workspace de código en navegador con tests automáticos, cubre UI coding, funciones JS, frontend system design, quizzes y DSA orientado a frontend; soporta JS/TS/React/Angular/Vue/Svelte/CSS/HTML.
- A quién va: desarrolladores frontend que buscan prep específica de su especialidad (no algoritmos genéricos).
- Precio: no se pudo extraer la cifra exacta de www.greatfrontend.com/interviews/pricing por WebSearch (el snippet no mostró números); descrito como "asequible comparado con bootcamps o coaches" [resumen de búsqueda, no leído, verificado 2026-09-14]. PENDIENTE de verificar cifra exacta con lectura directa.
- Idioma: inglés.
- Editor de código ejecutable: sí, workspace en navegador con tests automáticos para UI coding.
- IA: no confirmado como función central en los resultados revisados.
- Voz: no encontrado.
- Repetición espaciada: no encontrado.
- Mocks con humanos: no confirmado.
- Banco de preguntas reales por empresa: no es su ángulo (su curaduría es por tema/stack, no por empresa).
- Calibración por nivel: no confirmado explícitamente.
- Rutas de carrera: tiene "GFE 75" como lista curada de las 75 preguntas más importantes, seleccionadas por un panel de ingenieros frontend senior de big tech; funciona como ruta de estudio pero enfocada solo en frontend, no rutas multi-rol.
- Función más alabada: la combinación de preguntas reales de frontend con soluciones "expert-verified" y el playbook de frontend system design con 20+ preguntas resueltas y deep-dives de casos reales [resumen de búsqueda, no leído, verificado 2026-09-14].
- Queja más repetida: detalles de UX (indicadores de filtro poco visibles, delay al recargar lista tras limpiar búsqueda) y sensación de "overwhelm" con tanto contenido ya pagado [resumen de búsqueda, no leído, fuente: teamblind.com/post/bfedev-vs-greatfrontend, verificado 2026-09-14]. Son quejas menores de UX, no de fondo.

### 1.9 Hello Interview
- Qué hace: originalmente plataforma de mock interviews en vivo de system design con ingenieros reales; en 2026 pivotó a plataforma self-serve con cursos, "Guided Practice", banco grande de preguntas y un tutor de IA.
- Cambio importante confirmado: Hello Interview cerró su programa de mock interviews en vivo y mentoría el 31 de mayo de 2026, y ahora es autoservicio [resumen de búsqueda, no leído, fuente: officebook.dev/tools/hello-interview / algoengineer.com/blog/hello-interview-alternatives, verificado 2026-09-14]. Esto es una señal de que el modelo "mock 1:1 humano" puro puede no escalar como negocio.
- A quién va: candidatos preparando entrevistas de system design (mid a staff level).
- Precio: plan 1 mes 47 USD (antes 59), 1 año 79 USD (antes 99), de por vida 279 USD (antes 349); hay un tier gratis con un problema de Guided Practice [resumen de búsqueda, no leído, fuente: hellointerview.com/pricing citado por igotanoffer.com, verificado 2026-09-14].
- Idioma: inglés.
- Editor de código ejecutable: no es su foco (system design, no algoritmos); no confirmado.
- IA: sí, "AI tutor" como parte de la nueva propuesta self-serve tras cerrar los mocks humanos [resumen de búsqueda, no leído, verificado 2026-09-14]; no se detalla si es voz o texto.
- Voz: no confirmado en la oferta actual.
- Repetición espaciada: no encontrado.
- Mocks con humanos: ya NO los ofrece desde el 31 de mayo de 2026 (los tenía antes).
- Banco de preguntas reales por empresa: no confirmado explícitamente para system design (las preguntas de diseño de sistemas no suelen ser "por empresa" del mismo modo que algoritmos).
- Calibración por nivel: sí, valorado por dar "mejor estructura y expectativas claras por nivel de rol" comparado con otros recursos [resumen de búsqueda, no leído, fuente: hilo de teamblind.com, verificado 2026-09-14].
- Rutas de carrera: no confirmado.
- Función más alabada: estructura clara de qué se espera en cada nivel de entrevista de system design, mejor que Grokking para nivel medio según un usuario [resumen de búsqueda, no leído, fuente: teamblind.com/post/system-design-2026-grooking-vs-hello-interview, verificado 2026-09-14].
- Queja más repetida: experiencias negativas puntuales con mock interviewers poco preparados o feedback poco útil, y críticas de que parte del contenido "parece generado por ChatGPT" y no vale el dinero [resumen de búsqueda, no leído, fuente: teamblind.com/post/horrible-experience-in-hello-interview-mock-interview, verificado 2026-09-14].

### 1.10 interviewing.io
- Qué hace: mock interviews en vivo, anónimos (audio + chat, sin vídeo, para reducir sesgo), con ingenieros senior/staff actuales o exempleados de Google, Meta, Amazon, Microsoft, OpenAI. También ofrece sesiones específicas por empresa y coaching.
- A quién va: ingenieros con experiencia, cerca de la fecha real de su entrevista, que necesitan calibración de alguien que efectivamente contrata en esas empresas.
- Precio: sesión individual desde 179 USD; sesiones específicas de empresa 225-339 USD; paquete de coaching de 3 sesiones 2.000 USD (con descuentos de 200-700 USD en rebajas); hay "Pay Later" que difiere el pago hasta conseguir trabajo; y mocks entre pares gratis pero con disponibilidad limitada [resumen de búsqueda, no leído, fuentes: lodely.com/blog/interviewing-io-pricing, finalroundai.com/blog/interviewing-io-review-pros-cons, verificado 2026-09-14].
- Idioma: inglés.
- Editor de código ejecutable: sí, para las sesiones de coding en vivo.
- IA: no es su producto central (es mocks humanos), aunque la empresa (interviewing.io / de los creadores de TripleByte) ha explorado herramientas de IA en su blog; no confirmado como función de producto.
- Voz: sí, es voz en vivo (sin vídeo) entre candidato y entrevistador humano.
- Repetición espaciada: no encontrado.
- Mocks con humanos: sí, es su producto principal y diferenciador.
- Banco de preguntas reales por empresa: sesiones específicas por empresa con entrevistadores que trabajaron ahí.
- Calibración por nivel: implícita en la elección de entrevistador (junior/senior/staff) pero no automatizada.
- Rutas de carrera: no confirmado.
- Función más alabada: el anonimato (audio+chat sin vídeo) para reducir sesgo, y que los entrevistadores son ingenieros reales de esas empresas con feedback accionable; la empresa afirma que sus usuarios han recibido en conjunto más de 50.000 millones USD en ofertas [resumen de búsqueda, no leído, fuente: finalroundai.com/blog/what-is-interviewing-io, verificado 2026-09-14].
- Queja más repetida: el precio; la crítica dominante en Reddit/Blind es sobre el coste (179-300+ USD por sesión), no sobre la calidad [resumen de búsqueda, no leído, fuente: resumen de hilos en teamblind.com/company/interviewingio, verificado 2026-09-14].

### 1.11 Exponent (con Pramp)
- Qué hace: Exponent adquirió Pramp en 2021; en 2026 fusionó todo en su propia plataforma y rebrandeó como "Aced (formerly Exponent)". Combina mock interviews peer-to-peer gratis (con créditos mensuales limitados), cursos, guías en vídeo, banco de preguntas de Pramp, comunidad privada en Slack, y una capa de IA.
- A quién va: candidatos que quieren practicar gratis con otro humano en su mismo nivel, con opción de pagar por contenido estructurado y feedback de IA.
- Precio: suscripción 12 USD/mes facturado anual, o 79 USD/mes plan mensual; 5 sesiones peer gratis al mes sin suscripción [resumen de búsqueda, no leído, fuente: finalroundai.com/blog/pramp-review-pros-cons, verificado 2026-09-14].
- Idioma: inglés.
- Editor de código ejecutable: sí, entorno colaborativo de código integrado en las sesiones peer.
- IA: capa de "AI feedback" en acceso anticipado solo para suscriptores de pago, que complementa el feedback del peer con puntuación de corrección técnica y claridad de comunicación [resumen de búsqueda, no leído, verificado 2026-09-14].
- Voz: sí, en las sesiones peer en vivo (videollamada).
- Repetición espaciada: no encontrado.
- Mocks con humanos: sí, es el núcleo del producto (peer-to-peer, emparejamiento por disponibilidad y nivel de experiencia).
- Banco de preguntas reales por empresa: banco de preguntas de Pramp incluido en la suscripción; no confirmado que esté etiquetado por empresa real como LeetCode.
- Calibración por nivel: el emparejamiento considera nivel de experiencia, pero no hay evidencia de una rúbrica junior/senior automatizada.
- Rutas de carrera: tiene biblioteca de cursos estructurados (Exponent cubre PM, data science, ingeniería, etc.) que funciona como ruta por rol.
- Función más alabada: que las sesiones peer siguen siendo gratis y estructuradas con preguntas guía, ideal para practicar sin coste antes de pagar por mocks con expertos en otras plataformas.
- Queja más repetida: no-shows, aproximadamente 1 de cada 5 sesiones termina en un compañero que no se presenta, y ~20% de los compañeros se describen como "no preparados"; también hay quejas sobre el precio de la suscripción [resumen de búsqueda, no leído, fuente: resumen de hilos de Reddit/Blind citados en igotanoffer.com/en/advice/pramp-alternatives, verificado 2026-09-14].

### 1.12 Final Round AI
- Qué hace: dos productos distintos en uno: (a) "Interview Copilot" que escucha una entrevista real en vivo por transcripción y sugiere respuestas en pantalla en tiempo real; (b) "AI Mock Interview" para practicar, más "Career Coach" con 8 especialistas de IA (coding, system design, comportamental, producto, datos, negociación salarial, screening de reclutador) lanzado el 26 de junio de 2026.
- A quién va: candidatos que buscan asistencia en vivo durante la entrevista real (controvertido, ver abajo) y/o práctica de mock interview con IA.
- Precio: Mensual 150 USD, Trimestral ~83,33 USD/mes (~250 USD), Anual 25 USD/mes (300 USD por adelantado), Premium MAX 41,67 USD/mes (500 USD por adelantado); plan gratis con mocks ilimitados pero sin Copilot en vivo; garantía de devolución de 72h solo en compras Trimestral/Anual por primera vez, el plan mensual no es reembolsable [resumen de búsqueda, no leído, fuente: finalroundai.com/blog/final-round-ai-pricing, verificado 2026-09-14].
- Idioma: inglés (no confirmado español).
- Editor de código ejecutable: no confirmado como foco principal (el producto es conversacional/copiloto, no banco de katas).
- IA: es su producto central en dos modos, mock interview de práctica y copiloto en vivo durante la entrevista real.
- Voz: sí, transcripción en vivo por voz.
- Repetición espaciada: no encontrado.
- Mocks con humanos: no, son mocks con IA, no con humanos.
- Banco de preguntas reales por empresa: no confirmado como banco curado explícito.
- Calibración por nivel: no confirmado explícitamente junior/senior.
- Rutas de carrera: sí, "Career Coach" con especialistas de IA por área desde junio de 2026.
- Función más alabada: el modo de práctica de mock interview con IA se valora como "genuinamente bien reseñado" y "preparación ordinaria y sin controversia", a diferencia del copiloto en vivo [resumen de búsqueda, no leído, fuente: withsherlock.ai/blog/detect-and-prevent-final-round-ai, verificado 2026-09-14].
- Queja más repetida (importante para Devsparring, doble alerta): (1) usar el copiloto en vivo durante una entrevista real se trata ampliamente como trampa por los empleadores, con herramientas de detección creciendo específicamente contra esto, y usuarios reportan que el "Stealth Mode" del propio producto aparece visible en capturas de pantalla compartidas; (2) quejas de facturación: según datos de Trustpilot de marzo de 2026, los problemas de facturación representan una porción desproporcionada (~17%) de las reseñas de una estrella, con lenguaje de "estafa/fraude" sobre cobros y cancelaciones [resumen de búsqueda, no leído, fuentes: withsherlock.ai/blog/detect-and-prevent-final-round-ai, nl.trustpilot.com/review/finalroundai.com, verificado 2026-09-14].

### 1.13 DevInterview.AI
- Qué hace: mocks ilimitados con entrevistador de IA en vivo (voz) para coding, system design y comportamental; mocks de coding/comportamental de 30 min y de system design de 45 min; editor ejecutable para Python/Java/C++/JavaScript/C#, pizarra para diseño; se elige nivel (junior a staff/lead) y track; la IA hace preguntas de seguimiento y devuelve nota, veredicto tipo "hire/no hire" y sugerencias de mejora.
- A quién va: candidatos que quieren repetición ilimitada de práctica hablada con IA a bajo coste frente a mocks humanos.
- Precio: 24,99 USD/mes, 59,99 USD cada 3 meses, 119,99 USD/año; primera entrevista completa gratis sin tarjeta [resumen de búsqueda, no leído, fuente: devinterview.ai/pricing, verificado 2026-09-14].
- Idioma: inglés (no confirmado español).
- Editor de código ejecutable: sí, multi-lenguaje, más pizarra para diseño de sistemas.
- IA: sí, es el producto central; entrevistador de IA en vivo con seguimiento conversacional y rúbrica de nivel junior-staff/lead — es de los competidores más cercanos al concepto de Devsparring (IA entrevistadora con calibración de nivel + editor + system design).
- Voz: sí.
- Repetición espaciada: no confirmada.
- Mocks con humanos: no, todo es con IA.
- Banco de preguntas reales por empresa: no confirmado como banco curado por empresa.
- Calibración por nivel: sí, explícita (junior a staff/lead), con veredicto tipo hire/no-hire — muy similar a la rúbrica junior/senior que Devsparring plantea.
- Rutas de carrera: no confirmado.
- Función más alabada: para repetición y práctica hablada ilimitada, "la IA gana en repetición" a un coste muy inferior al de una sola sesión humana [resumen de búsqueda, no leído, fuente: devinterview.ai/compare, verificado 2026-09-14].
- Queja más repetida: no se encontró una queja específica citada con enlace directo en los resultados revisados; la propia fuente (comparativa) advierte que el feedback de IA debe usarse para poner a prueba estructura y comunicación, no como autoridad final sobre si el código o el diseño son correctos — una limitación reconocida del enfoque, no una queja de usuario citada textualmente (no confirmado con cita de usuario real).

### 1.14 PracHub
- Qué hace: plataforma-banco de preguntas reales recientes por empresa, rol y tema, con soluciones escritas detalladas ("content layer"), que se extiende a coaching de IA para comportamental, coding, system design, SQL, analytics, ML y producto. También publica un blog/knowledge hub muy activo comparando otras herramientas de la competencia (muchas de las fuentes usadas en este documento provienen de ahí, lo cual se trata con cautela por posible sesgo comercial).
- A quién va: ingenieros de software preparando entrevistas en empresas grandes ("FAANG y top-tier tech").
- Precio: no se encontró la tabla de precios propia exacta en los resultados revisados; se posiciona con "el mayor tier gratis" del mercado, con créditos de práctica mensuales gratis y acceso más amplio para miembros de pago [resumen de búsqueda, no leído, verificado 2026-09-14]. PENDIENTE de verificar cifras exactas.
- Idioma: inglés.
- Editor de código ejecutable: no confirmado explícitamente.
- IA: sí, coaching de IA con feedback personalizado y planes de mejora guiados, sobre todo en comportamental.
- Voz: no confirmado si el coaching comportamental es hablado o solo texto.
- Repetición espaciada: no confirmado.
- Mocks con humanos: no confirmado como producto propio (se posicionan como capa de contenido, no de mocks humanos).
- Banco de preguntas reales por empresa: sí, es su propuesta de valor central, con filtro por empresa/rol/tema y soluciones escritas en profundidad.
- Calibración por nivel: no confirmado explícitamente.
- Rutas de carrera: no confirmado.
- Función más alabada: ser "la fuente de verdad" de preguntas realmente preguntadas recientemente, con soluciones escritas detalladas, gratis en gran parte.
- Queja más repetida: no se encontró una queja de usuario citada textualmente con enlace en los resultados revisados (mucho del contenido indexado es autopromocional del propio PracHub comparándose con terceros); no confirmado.

### 1.15 Interview Warmup (Google)
- Estado (dato importante): Google Interview Warmup fue DISCONTINUADO en abril de 2026; el enlace antiguo grow.google/interview-warmup ahora redirige a un aviso que apunta a Gemini Live [resumen de búsqueda, no leído, fuente: skillora.ai/blog/interview-warmup-alternatives, finalroundai.com/blog/google-interview-warmup-discontinued-alternatives, verificado 2026-09-14].
- Qué hacía (histórico): herramienta gratuita de IA para ensayar preguntas comunes de entrevista hablando en voz alta, con transcripción speech-to-text y feedback sobre términos específicos del puesto usados, puntos clave cubiertos y muletillas ("filler words"); 100% gratis, sin cuenta necesaria; sets de preguntas por campo (UX design, analítica de datos, soporte IT, etc.).
- Idioma: no se confirmó el detalle de idiomas soportados en los resultados revisados.
- Reemplazos oficiales de Google: Gemini Live (práctica conversacional) y Career Dreamer (exploración de carrera); alternativas gratuitas señaladas por terceros: tier gratis de AceRound AI, Gemini Live, modo voz de ChatGPT, y Yoodli.
- Relevancia para Devsparring: confirma que incluso Google no sostuvo un producto gratuito standalone de práctica de voz para entrevistas a largo plazo (lo integró en Gemini Live, su asistente general) — dato a tener en cuenta sobre sostenibilidad de features de voz gratuitas aisladas (hipótesis: requieren monetización o integración en un producto más amplio, no confirmado el motivo exacto de la discontinuación).

### 1.16 Yoodli
- Qué hace: coach de IA de comunicación/voz con roleplays realistas (ventas, entrevistas, presentaciones); analiza muletillas, ritmo (palabras por minuto), contacto visual (si hay webcam) y variedad de vocabulario; en 2026 añadió escenarios de coaching personalizados (subir tus propias preguntas o pegar una oferta de trabajo, y la IA genera preguntas específicas del puesto para practicar).
- A quién va: no es exclusivo de entrevistas técnicas; cubre ventas, presentaciones y comunicación corporativa en general, con un subconjunto para entrevistas.
- Precio (2026): Free (5 roleplays de por vida, no por mes), Pro 8 USD/mes facturado anual, Advanced 20 USD/mes facturado anual, Enterprise a medida; facturación anual ahorra 40% [resumen de búsqueda, no leído, fuente: finalroundai.com/blog/yoodli-pricing, verificado 2026-09-14].
- Idioma: no se confirmó soporte de español en los resultados revisados (no confirmado).
- Editor de código ejecutable: no, no es su dominio (comunicación, no código).
- IA: sí, es el producto central (roleplay conversacional con IA y analítica de voz).
- Voz: sí, es su función principal.
- Repetición espaciada: no encontrado.
- Mocks con humanos: no, todo con IA.
- Banco de preguntas reales por empresa: no es su enfoque; genera preguntas a partir de una oferta de trabajo pegada por el usuario, no de un banco curado por empresa real.
- Calibración por nivel: no confirmado explícitamente junior/senior.
- Rutas de carrera: no confirmado.
- Función más alabada: reducción medible de muletillas ("filler words") en 5-10 sesiones gracias a feedback inmediato y específico [resumen de búsqueda, no leído, fuente: makerstack.co/reviews/yoodli-review, verificado 2026-09-14].
- Queja más repetida: precio alto para uso individual (el salto a 20 USD/mes se considera caro para preparar solo entrevistas), tier gratis muy limitado (5 sesiones totales, no mensuales), y que muchas de las funciones más potentes están pensadas para equipos de ventas/formación corporativa, no para un candidato individual, por lo que se paga por funciones que no se necesitan [resumen de búsqueda, no leído, fuente: finalroundai.com/blog/yoodli-review-pros-cons, verificado 2026-09-14].

### 1.17 interviewkit.dev (y proyectos open source españoles similares)
- Qué hace: app open source (repositorio `github.com/albertsp/interviewkit`) para preparar entrevistas técnicas de desarrollo web con IA y flashcards personalizadas. El simulador deja elegir rol (Frontend/Backend), tecnología y nivel; la IA genera 5 preguntas de código adaptadas (no definiciones teóricas genéricas); cada respuesta se evalúa con IA con explicación de qué salió bien, qué falló y cuál es la solución correcta; cada pregunta se convierte en una tarjeta de estudio (Q&A) con concepto, definición, ejemplo de código y casos de uso [resumen de búsqueda, no leído, fuente: github.com/albertsp/interviewkit, verificado 2026-09-14].
- Stack técnico: backend en Python/Flask, frontend en Node.js/Next.js (según instrucciones de instalación del repo).
- A quién va: desarrolladores hispanohablantes, proyecto personal/comunitario, no una empresa con modelo de precio.
- Precio: gratis/open source (no es un producto comercial con pricing).
- Idioma: español (es el hallazgo más directo de un competidor en español con simulador de IA + flashcards).
- Editor de código ejecutable: no confirmado si el simulador incluye ejecución real de código o solo evaluación textual de la respuesta (no confirmado).
- IA: sí, para generar preguntas adaptadas a rol/tecnología/nivel y para evaluar respuestas.
- Voz: no confirmado (parece basado en texto).
- Repetición espaciada: no confirmado un algoritmo SRS explícito; usa tarjetas de repaso pero no está claro si programa la repetición en el tiempo.
- Mocks con humanos: no.
- Banco de preguntas reales por empresa: no, son generadas por IA, no un banco curado de preguntas reales de empresas.
- Calibración por nivel: sí, el usuario elige nivel al generar preguntas.
- Rutas de carrera: no confirmado.
- Otro proyecto español relacionado encontrado: "EntrevistadorInteligente" (github.com/EntrevistadorInteligente), descrito como proyecto open source que usa IA para simular entrevistas técnicas y dar feedback detallado a candidatos hispanohablantes [resumen de búsqueda, no leído, verificado 2026-09-14]. No se pudo profundizar más en sus funciones exactas ni precio (es gratis/open source por naturaleza) por límite de tiempo de esta investigación.
- Función más alabada / queja más repetida: no se encontraron reseñas de usuarios (Reddit/G2/Trustpilot) para estos proyectos; son proyectos pequeños/personales sin comunidad de reseñas visible en buscadores — dato en sí mismo relevante: confirma que el hueco de "IA entrevistadora en español" está prácticamente vacío de competidores con tracción visible, más allá de proyectos personales en GitHub.

### 1.18 Huru
- Qué hace: app de coaching de entrevistas con IA orientada a candidatos y estudiantes; más de 20.000 preguntas preparadas, entrevistas personalizadas, feedback instantáneo, grabación de vídeo de tus respuestas para revisar; genera mocks directamente a partir de una oferta de trabajo importada (integración con bolsas de empleo como LinkedIn).
- A quién va: candidatos en general (no específicamente developers), incluye estudiantes.
- Precio: 24,99 USD/mes; prueba gratis con sesión de 5 preguntas [resumen de búsqueda, no leído, fuente: theofferinbox.com/huru-ai-review, verificado 2026-09-14].
- Idioma: soporte multilingüe mencionado explícitamente como punto fuerte (no se confirmó si incluye español específicamente) [resumen de búsqueda, no leído, verificado 2026-09-14].
- Editor de código ejecutable: no confirmado, no parece ser su foco (es más comunicación/comportamental que coding).
- IA: sí, es el producto central; incluye análisis de tono vocal y coaching de muletillas.
- Voz: sí.
- Repetición espaciada: no encontrado.
- Mocks con humanos: no.
- Banco de preguntas reales por empresa: no exactamente "por empresa", pero sí genera preguntas específicas a partir de la oferta de trabajo real importada.
- Calibración por nivel: no confirmado explícitamente.
- Rutas de carrera: no confirmado.
- Función más alabada: integración fluida con bolsas de empleo (importar la oferta y generar el mock al instante), feedback de IA inmediato y soporte multilingüe [resumen de búsqueda, no leído, fuente: theofferinbox.com/huru-ai-review, verificado 2026-09-14].
- Queja más repetida: la relación precio/valor solo se justifica con uso intensivo (10+ sesiones); con 1-2 sesiones el precio no compensa [resumen de búsqueda, no leído, verificado 2026-09-14].

### 1.19 Firecode
- Qué hace: banco de 1.500+ problemas reales preguntados en Google, Amazon, Meta, Apple, entre otros, servidos según empresa objetivo, nivel y rendimiento del usuario, con un "motor de aprendizaje potenciado por SM2" (el mismo algoritmo base que usaba Anki antes de FSRS) que programa el repaso en intervalos "científicamente óptimos" para retener las soluciones. Eslogan explícito de "22 min/día" para perfiles ocupados.
- A quién va: ingenieros ocupados que quieren máxima eficiencia de retención con poco tiempo diario.
- Precio: no se encontró la cifra exacta de suscripción en los resultados revisados; ofrece prueba gratuita de 14 días con acceso completo [resumen de búsqueda, no leído, fuente: firecode.io/faq, verificado 2026-09-14]. PENDIENTE de verificar precio exacto.
- Idioma: inglés; 13 lenguajes de programación soportados.
- Editor de código ejecutable: sí.
- IA: no confirmado como diferencial (el diferencial declarado es el algoritmo de repetición espaciada tipo SM2, no IA generativa).
- Voz: no encontrado.
- Repetición espaciada: SÍ, es su diferenciador central y el precedente más directo y relevante para la función de "repetición espaciada de fallos" que Devsparring ya planea implementar — confirma que aplicar SRS a katas de entrevistas técnicas (no solo a idiomas/flashcards) ya es una estrategia validada en el mercado.
- Mocks con humanos: no.
- Banco de preguntas reales por empresa: sí, servido según empresa objetivo.
- Calibración por nivel: sí, personaliza por nivel de habilidad del usuario.
- Rutas de carrera: no confirmado.
- Función más alabada: la eficiencia declarada, estadística de usuario mediano de 173 problemas resueltos en 22 min/día de práctica con un aumento salarial mediano reportado de 127.000 USD [resumen de búsqueda, no leído, fuente propia de firecode.io, tratar con cautela por ser cifra de marketing propia sin auditoría independiente, verificado 2026-09-14].
- Queja más repetida: no se encontró una queja de usuario citada con enlace directo en los resultados revisados; no confirmado.

### 1.20 AceRound
- Qué hace: dos modos, (a) "copiloto" en tiempo real durante la entrevista real con "dual-device stealth" (las respuestas se aíslan en el móvil del candidato para que no aparezcan en la pantalla compartida con el entrevistador) y (b) mocks de IA con entrevistadores específicos por industria más analítica post-entrevista de dicción y uso de palabras clave.
- A quién va: candidatos que quieren asistencia durante la entrevista real (controvertido, ver abajo) y/o práctica de mock con IA.
- Precio: cifras inconsistentes entre fuentes: una fuente indica plan semanal 14,90 USD, mensual 29,90 USD, paquete de 240 minutos de créditos 19,90 USD, todos como pago único (no suscripción recurrente); otra fuente indica 24,90 USD/semana, 49,90 USD/mes o pase de temporada de 90 días a 99 USD; 30 minutos gratis de crédito de asistente en tiempo real sin tarjeta [resumen de búsqueda, no leído, fuentes: interviewsidekick.com/blog/aceround-review, aceround.app/blog, verificado 2026-09-14; cifras contradictorias entre fuentes, no confirmado el precio exacto vigente].
- Idioma: soporta 10+ idiomas, con sugerencias de respuesta en el idioma preferido del candidato, pensado explícitamente para no nativos de inglés — punto relevante porque es de los pocos competidores que declara soporte multilenguaje amplio (no confirmado si español está incluido específicamente).
- Editor de código ejecutable: no confirmado.
- IA: sí, es el producto central en sus dos modos.
- Voz: sí.
- Repetición espaciada: no encontrado.
- Mocks con humanos: no.
- Banco de preguntas reales por empresa: no confirmado como banco curado; su comunicación menciona "análisis de algoritmos de scoring de big tech" que una fuente señala como "marketing que no se puede verificar" [resumen de búsqueda, no leído, fuente: interviewsidekick.com/blog/aceround-review, verificado 2026-09-14].
- Calibración por nivel: no confirmado explícitamente.
- Rutas de carrera: no confirmado.
- Función más alabada: soporte multilenguaje amplio (10+ idiomas) para reducir la carga cognitiva de responder bajo presión en un segundo idioma.
- Queja más repetida (alerta importante, igual que Final Round AI en 1.12): el producto es "no probado"/sin trayectoria larga, la prueba gratis es escasa (30 min), el plan semanal es mala relación calidad-precio si entrevistas con frecuencia, y la función de formato STAR para preguntas comportamentales es inconsistente y "no siempre produce una situación limpia en la práctica" [resumen de búsqueda, no leído, fuente: interviewsidekick.com/blog/aceround-review, verificado 2026-09-14]. El modo "copiloto en vivo con stealth" plantea el mismo riesgo ético/de detección de trampa que Final Round AI (ver 1.12 y sección 4).

### 1.21 Otros relevantes en 2026 (IA entrevistadora por voz / español)

- **OnlineCV.es — Simulador de entrevistas**: herramienta española (dentro de un producto más amplio de creación de CVs) que usa IA para practicar entrevistas conductuales y técnicas, con feedback personalizado al instante; 100% online sin instalación; practica en español, inglés y otros idiomas; afirma no almacenar respuestas ni datos de la simulación (privacidad); más de 3.900 opiniones verificadas en Sitejabber con 82% de recomendación [resumen de búsqueda, no leído, fuentes: onlinecv.es/simulador-entrevistas-trabajo, opinionesespana.es/servicios/online-cv-opiniones, verificado 2026-09-14]. No se encontró precio específico del simulador en los resultados revisados (probablemente incluido en la suscripción general de creación de CV, no confirmado). Es genérico (cualquier profesión), no especializado en programación/código.
- **AceRound (contenido en español/LatAm)**: tiene blog y presumiblemente producto localizado a es-419, con contenido específico de "preguntas de entrevista técnica para programadores... guía con IA para LatAm" — indica que al menos un competidor de IA para entrevistas técnicas ya apunta activamente al mercado hispanohablante, aunque el producto core parece seguir centrado en inglés [resumen de búsqueda, no leído, fuente: aceround.app/es-419/blog, verificado 2026-09-14].
- **Final Round AI (página /es/)**: tiene una versión en español de su landing ("Practica Entrevistas con IA"), señal de intención de expansión a mercado hispanohablante, pero no confirmado si el producto completo (Copilot, Career Coach) está traducido o solo el marketing [resumen de búsqueda, no leído, fuente: finalroundai.com/es/ai-mock-interview, verificado 2026-09-14].
- **Startups españolas de voz IA (no específicas de entrevistas)**: Vocali (reconocimiento de voz en español con dialectos regionales, 96% precisión declarada) y Orga AI (Valencia, conversacional voz+visión) se mencionan como parte del ecosistema de IA de voz español, pero no son productos de entrevistas técnicas — se listan como posible referencia de proveedores de tecnología de voz en español, no como competidores directos [resumen de búsqueda, no leído, fuente: javadex.es/blog/startups-ia-espanolas-mejores-rompiendo-2026, verificado 2026-09-14].
- **Preppable, Interview Drills, mockinterviews.dev, DarkInterview, GothamLoop, Screna AI, Chill Interview, FastPrep, LintCode**: mencionados de pasada en el knowledge hub de PracHub como parte del ecosistema de mock interview con IA en 2026 (Interview Drills: "voice-scored behavioral practice" a 39 USD/mes; GothamLoop: 199 USD/mes; DarkInterview: ~69 USD/mes), pero no se profundizó en cada uno por límite de tiempo de esta investigación — quedan como PENDIENTE si se requiere un mapeo más exhaustivo [resumen de búsqueda, no leído, fuente: prachub.com/resources, verificado 2026-09-14].
- Conclusión de este apartado: no se encontró ningún competidor con tracción de mercado visible (reseñas, comunidad) que combine IA entrevistadora por voz + español nativo + enfoque específico en programación. Los más cercanos son proyectos personales de GitHub (sección 1.17) sin reseñas públicas, y herramientas generalistas (OnlineCV) sin especialización técnica. Esto refuerza el hueco identificado en la sección 5.

---

## 2. Mecánicas de producto de referencia (no compiten directo)

### 2.1 Duolingo
- Mecánicas clave (resumen de búsqueda, no leído en todos los casos, verificado 2026-09-14):
  - Racha (streak): avanza al completar una lección antes de la medianoche personal; se apoya en aversión a la pérdida (loss aversion): la gente se motiva más por no perder progreso que por ganar recompensas [duolingo.deconstructoroffun.com/mechanics/streaks].
  - Ligas: liga semanal con otros 29 usuarios, usa competencia social para evitar que rompas la racha [strivecloud.io].
  - XP / Score: en 2026 Duolingo pasó de un modelo puro de XP a un sistema de "Score" que prioriza el progreso real en el camino de aprendizaje sobre el "farmeo" de XP repitiendo lecciones fáciles ya superadas [orizon.co, verificado 2026-09-14]. Dato relevante para Devsparring: el propio Duolingo detectó que el XP puro incentivaba mal comportamiento (repetir lo fácil en vez de avanzar) y lo corrigió.
  - Vidas (hearts): no se encontró detalle específico de 2026 en los resultados revisados; no confirmado su estado actual.
  - Repaso de errores: las sesiones de práctica usan repetición espaciada para reforzar material ya visto [migaku.com/blog/spanish/duolingo-spanish-review].
  - Notificaciones: estrategia de "guilt marketing", mensajes de culpabilidad ligera ("Don't let Duo down!") y el icono de la app (el búho) cambia a una expresión "arrugada y sombría" para captar atención cuando no se ha completado la lección [tinomwadeyi.substack.com/p/how-duolingo-perfected-the-art-of, verificado 2026-09-14].
  - Impacto reportado: la combinación de rachas, ligas y feedback con IA se asocia (fuente con interés comercial, tratar con cautela) a un aumento interanual del 36% en usuarios activos diarios y una reducción de churn a un mínimo histórico del 28% en mercados occidentales [orizon.co, resumen de búsqueda, no leído, verificado 2026-09-14; cifra de una fuente de marketing, no auditada de forma independiente].
- Queja de usuarios: presión psicológica de las rachas, gente que borra la app tras perder rachas de 400+ días para escapar de la presión, resentimiento hacia los recordatorios tipo "keep going" [savannahkopp.substack.com/p/kill-your-streaks, verificado 2026-09-14].
- Ver sección 6 para el análisis de qué mecánicas de Duolingo funcionan o no en adultos preparando entrevistas.

### 2.2 Anki
- Qué hace: app de flashcards con repetición espaciada, algoritmo abierto, código abierto, mazos compartidos por la comunidad (idiomas, medicina, historia, derecho), soporta texto/imagen/audio/vídeo en cada tarjeta.
- Algoritmo: SM-2 (Piotr Wozniak, 1987) por defecto; desde finales de 2023 integró FSRS (scheduler de machine learning de Junyao Ye y colegas) como opt-in, que típicamente reduce el número de repasos entre 20-30% manteniendo la misma retención; todos los parámetros de scheduling son ajustables por el usuario [resumen de búsqueda, no leído, fuentes: mindomax.com, laxuai.com, verificado 2026-09-14].
- Mazos compartidos: biblioteca comunitaria enorme, ecosistema de add-ons, da a "power users" control casi ilimitado.
- Precio: gratis en Mac/Windows/Linux/Android; app de iOS 24,99 USD de pago único; sincronización AnkiWeb gratis en todas las plataformas; sin suscripción [resumen de búsqueda, no leído, verificado 2026-09-14].
- Relevancia para Devsparring: el algoritmo FSRS (mejora medible sobre SM-2) y el concepto de "mazos compartidos" por la comunidad son ideas directamente aplicables al sistema de repetición espaciada de fallos que Devsparring ya planea. No se encontraron reseñas negativas específicas de Reddit/G2/Trustpilot en esta búsqueda (Anki es percibida mayormente como herramienta neutra/utilitaria, no una app de consumo con quejas de marketing); no confirmado, se recomendaría una búsqueda adicional dedicada si se necesita evidencia de quejas.

### 2.3 Brilliant
- Qué hace: plataforma STEM (matemáticas, ciencia, ciencias de la computación, datos) con lecciones interactivas "learn by doing": en vez de ver una clase y memorizar, se manipula el concepto paso a paso hasta que "hace clic"; tiene tutor de IA adaptativo y lecciones tipo puzzle.
- Precio (2026): Premium ~20 USD/mes facturado anual (~240 USD/año), ~30 USD/mes mes a mes, ~40 USD/mes plan familiar de 6 asientos; tier gratis con una lección diaria [resumen de búsqueda, no leído, fuente: e-student.org/brilliant-org-review, verificado 2026-09-14].
- Opiniones: elogios genuinos por el aprendizaje interactivo y el tutor de IA adaptativo; quejas repetidas en Reddit/Trustpilot/BBB sobre que el pricing empuja hacia planes largos aunque el uso no sea constante, y renovaciones automáticas con avisos mínimos [resumen de búsqueda, no leído, fuente: nibble-app.com/blog/is-brilliant-worth-it, verificado 2026-09-14].
- Relevancia para Devsparring: el patrón "learn by doing" interactivo (manipular el concepto, no solo leerlo) es aplicable al modo teoría flash; la queja de renovación automática con avisos mínimos es una señal de qué evitar en el modelo de precios (ver sección 4 y 7).

### 2.4 OpositaTest
- Qué hace: banco de preguntas curado manualmente por expertos (no generado por IA) para oposiciones en España, 303.000 preguntas redactadas por profesionales, actualizadas a diario cuando cambia la legislación; también cursos integrales con temario y tutor.
- A quién va: opositores españoles.
- Precio (2026, verificado 2026-09-14): 15,99 EUR/mes mensual, 11,99 EUR/mes semestral (71,94 EUR), 7,99 EUR/mes anual (95,88 EUR); cursos integrales desde 295 EUR/año [fuente: blog.opositatest.com/cuanto-cuesta-opositatest-precio-test-oposiciones, resumen de búsqueda, no leído].
- Qué presumen: curaduría humana experta (explícitamente "no IA generativa") y actualización diaria ante cambios legislativos, como argumento de fiabilidad frente a contenido generado automáticamente.
- Opiniones: mejor valorado en Trustpilot por facilidad de uso e interfaz cómoda y visual; queja repetida sobre atención al cliente lenta, dificultad de contacto telefónico y algunos fallos de plataforma [resumen de búsqueda, no leído, fuente: oposicionesactualidad.es/articulos/opositatest-opiniones.html, verificado 2026-09-14].
- Flujo de conversión: registro gratis, test demo por oposición sin tarjeta, luego suscripción para test por temas, simulacros y repaso de preguntas falladas — modelo de freemium con repaso de fallos como función de pago, directamente relevante para el modelo de precios de Devsparring.
- Relevancia para Devsparring: es el comparable más cercano en español (mercado España, modelo de suscripción, repaso de fallos como gancho de pago) aunque compite en oposiciones, no en entrevistas técnicas; confirma que un precio de referencia en España para un producto de banco de preguntas + repaso está en el rango de 8-16 EUR/mes.

---

## 3. Funciones que Devsparring debería copiar o adaptar (priorizada)

Nota: esta sección se redactó tras analizar las 10 herramientas más relevantes (LeetCode, NeetCode, HackerRank, CodeSignal, AlgoExpert, GreatFrontEnd, Hello Interview, interviewing.io, Exponent/Pramp, Final Round AI); se revisa y amplía al final con el resto de competidores y las mecánicas de Duolingo/Anki/Brilliant/OpositaTest.

1. **Filtrado de preguntas por empresa real y frecuencia de aparición** (LeetCode). Es, según reseñas, "the strongest feature" y la razón principal para pagar [teamblind.com, verificado 2026-09-14]. Devsparring podría adaptarlo a nivel más modesto: etiquetar katas/preguntas por tipo de empresa (startup/scaleup/big tech en España) en vez de empresa individual, dado el volumen menor de contenido en español.

2. **Vídeo/explicación del razonamiento, no solo la solución final** (NeetCode). Usuarios valoran que explique "cómo llegar" a la solución antes que el código [educative.io, verificado 2026-09-14]. Para el modo teoría flash y kata de Devsparring, la corrección de IA debería mostrar el proceso de pensamiento esperado, no solo si el resultado es correcto.

3. **Certificaciones/credenciales gratuitas y compartibles** (HackerRank). Es la función más citada positivamente para el lado candidato, bajo coste de producir y con valor percibido alto como "credential rápido".

4. **Entorno de práctica idéntico al de la entrevista real** (CodeSignal). Reduce fricción el día D porque no hay curva de aprendizaje de la herramienta [reseñas AWS Marketplace, verificado 2026-09-14]. Aplica directo al modo kata con editor integrado de Devsparring: debe imitar editores reales (VS Code-like, ejecución real), no un textarea simulado.

5. **Anonimato en mocks con humanos (audio, sin vídeo)** (interviewing.io). Reduce sesgo y presión, citado como su función estrella. Si Devsparring introduce mocks humanos en el futuro, considerar un modo de solo audio anónimo como opción.

6. **Mocks peer-to-peer gratuitos como entrada, con IA de refuerzo** (Exponent/Pramp). El modelo "gratis con créditos + feedback de IA de pago" es un buen ángulo de monetización progresiva, aunque con el riesgo de no-shows (~20% según reportes, ver sección 4).

7. **Práctica de mock interview con IA, separada del uso durante la entrevista real** (Final Round AI). La parte de práctica con IA es "genuinamente bien reseñada"; Devsparring ya está en esa línea con su entrevistadora IA de voz para el modo "explicar en voz alta", lo cual coincide con el hueco identificado en la sección 5.

8. **Calibración explícita de expectativas por nivel de rol** (Hello Interview). Valorado por dar "mejor estructura y expectativas claras por nivel" que competidores [teamblind.com, verificado 2026-09-14]. Encaja directamente con la rúbrica junior/senior que Devsparring ya plantea: hacerla visible y explicada, no solo una nota final.

9. **Especialización profunda por stack/rol en vez de banco genérico** (GreatFrontEnd). Un banco enfocado (solo frontend) permite preguntas y rúbricas más específicas que un banco genérico de algoritmos. Aplica a las rutas de carrera de Devsparring: profundizar por stack (backend Java, frontend React, data, etc.) en español, un hueco que ningún competidor cubre bien en español (ver sección 5).

10. **Algoritmo de repetición espaciada moderno (FSRS) en vez de SM-2 clásico** (Anki). FSRS reduce entre 20-30% el número de repasos necesarios manteniendo la misma retención [mindomax.com, laxuai.com, verificado 2026-09-14]. Firecode ya usa un motor "SM2-boosted" para katas de entrevistas (sección 1.19); Devsparring debería evaluar FSRS en vez de SM-2 puro para su repetición espaciada de fallos, ya que es una mejora medible y relativamente reciente.

11. **Mazos/contenido compartido por la comunidad** (Anki, Codewars). Da profundidad de contenido sin que el equipo tenga que producir todo internamente. Aplicable a un banco de preguntas en español donde el volumen de contenido nativo será, al principio, más pequeño que el de LeetCode en inglés.

12. **Aprendizaje interactivo "learn by doing" en vez de solo vídeo o texto** (Brilliant). Para el modo teoría flash, manipular el concepto paso a paso en vez de solo leer/ver encaja con la evidencia académica de la sección 6 de que el feedback en tiempo real y el contenido modular funcionan bien en adultos.

13. **Curaduría experta humana explícita como argumento de confianza frente a "todo generado por IA"** (OpositaTest, que presume explícitamente "no IA generativa" en su banco). Para Devsparring, que sí usará IA para generar y corregir, la lección no es evitar la IA sino ser transparente sobre qué está curado/verificado por humanos y qué es generado, para construir confianza en un dominio (entrevistas técnicas) donde un error de contenido tiene coste real para el usuario.

14. **Flujo de conversión freemium con demo sin fricción antes de pedir tarjeta** (OpositaTest: registro gratis, test demo sin tarjeta, luego suscripción; también DevInterview.AI: primera entrevista completa gratis sin tarjeta). Patrón de conversión validado en varios competidores, aplicable directamente al onboarding de Devsparring.

15. **Especialista de IA entrevistador con calibración explícita de nivel y veredicto tipo hire/no-hire** (DevInterview.AI, sección 1.13). Es el competidor individual más parecido al núcleo de Devsparring (IA entrevistadora + editor + nivel), solo que en inglés y sin los otros cinco modos ni repetición espaciada ni español — confirma que el concepto funciona y tiene demanda, y marca el hueco de la sección 5.

## 4. Qué evitar

1. **Copiloto de IA para usar en vivo durante la entrevista real ("cheating" asistido)**. Final Round AI y AceRound lo ofrecen, y ambos casos muestran el mismo patrón de riesgo: se trata ampliamente como trampa por los empleadores, hay herramientas de detección creciendo específicamente contra esto, y hay reportes de que el "stealth mode" falla y se ve en pantalla compartida [withsherlock.ai/blog/detect-and-prevent-final-round-ai, interviewsidekick.com/blog/aceround-review, verificado 2026-09-14]. Devsparring debe mantenerse estrictamente en el terreno de la práctica/simulación, nunca en asistencia durante una entrevista real con un empleador — es tanto un riesgo reputacional como ético.

2. **Facturación confusa con renovación automática y cancelación difícil**. Es la queja más citada de Final Round AI (~17% de reseñas de 1 estrella en Trustpilot por temas de facturación, lenguaje de "estafa/fraude") y también aparece en Brilliant ("renovaciones automáticas con avisos mínimos") [nl.trustpilot.com/review/finalroundai.com, nibble-app.com/blog/is-brilliant-worth-it, verificado 2026-09-14]. Devsparring debería tener cancelación de un clic y avisos claros antes de renovar.

3. **Mocks peer-to-peer sin red de seguridad frente a no-shows**. En Pramp, ~1 de cada 5 sesiones termina en no-show, y ~20% de los compañeros se describen como no preparados [igotanoffer.com/en/advice/pramp-alternatives, verificado 2026-09-14]. Si Devsparring añade mocks humanos/peer en el futuro, necesita mecanismos de reputación, penalización por no-show y opción de sustituir rápido por IA cuando el humano falla.

4. **Scoring opaco y percepción de "suerte" en la evaluación**. Queja repetida de CodeSignal: no transparencia en el sistema de puntuación y sensación de que el problema asignado es aleatorio [resumen de reseñas AWS Marketplace, verificado 2026-09-14]. La rúbrica junior/senior de Devsparring debe ser visible y explicada al usuario, no una caja negra.

5. **Barras de progreso no lineales que generan sensación de retroceso**. Codewars: el honor requerido para subir de rango crece mucho más rápido que el honor ganado por kata, así que el "% de progreso" cae de golpe al subir de nivel, lo que genera confusión/frustración documentada [docs.codewars.com/gamification/ranks, verificado 2026-09-14].

6. **Contenido percibido como "reempaquetado" sin valor añadido real**. Queja repetida contra AlgoExpert ("plagiarizing LeetCode solutions... not worth it") [hilos de teamblind.com, verificado 2026-09-14]. Si Devsparring usa IA para generar contenido, debe evitar que se perciba como genérico o reciclado de fuentes gratuitas conocidas.

7. **Funciones clave escondidas detrás de "contacta con ventas" / precio a medida**. Queja implícita en CodeSignal Hire (Pro a medida) y HackerRank Enterprise: frustra a usuarios individuales que no son empresas. Devsparring, con público individual, debería evitar escalones de precio opacos.

8. **Prometer mocks 1:1 con humanos como pilar del producto sin plan de escalabilidad**. Hello Interview cerró su programa de mock interviews en vivo y mentoría el 31 de mayo de 2026 y pivotó a autoservicio con IA [officebook.dev/tools/hello-interview, verificado 2026-09-14]. Es una señal de mercado de que el modelo "mock humano 1:1" puro es difícil de sostener como negocio a escala; si Devsparring lo ofrece, mejor como complemento opcional de pago, no como la promesa central del producto.

9. **Notificaciones de culpa ("guilt marketing") y gamificación social competitiva pública para un público ya ansioso**. Ver el análisis detallado en la sección 6: es un patrón de Duolingo con quejas documentadas de presión psicológica, y el público de Devsparring (gente buscando trabajo, posiblemente en paro) es más vulnerable a esa ansiedad que alguien aprendiendo un idioma por ocio (hipótesis razonada a partir de la evidencia de la sección 6, no confirmado con estudio específico de este dominio).

10. **IA como autoridad final e infalible sobre corrección técnica**. La propia reseña de DevInterview.AI advierte que su feedback de IA debe usarse para poner a prueba estructura y comunicación, no como veredicto final sobre si el código o el diseño son correctos [devinterview.ai/compare, verificado 2026-09-14]. Devsparring debería comunicar honestamente los límites de su corrección por IA, especialmente en preguntas de diseño de sistemas donde no hay una única respuesta correcta.

## 5. Hueco real: qué combinación no hace nadie

Combinación que Devsparring propone: seis modos (teoría flash, explicar en voz alta con IA entrevistadora, kata cronometrada con editor integrado, revisión de código ajeno, diseño de sistemas, comportamental STAR) + corrección por IA con rúbrica junior/senior + repetición espaciada de fallos + rutas de carrera, todo en español.

Análisis honesto pieza por pieza, comparando contra lo encontrado:

- **IA entrevistadora por voz + calibración de nivel junior/senior**: existe en DevInterview.AI (inglés) — es la coincidencia más cercana encontrada a este componente concreto, con nivel junior a staff/lead y veredicto tipo hire/no-hire [devinterview.ai/pricing, verificado 2026-09-14]. Yoodli también hace IA por voz pero no es técnico ni calibra por nivel de entrevista de programación.
- **Editor de código ejecutable integrado en kata cronometrada**: lo tiene casi todo el mundo (LeetCode, NeetCode, HackerRank, CodeSignal, AlgoExpert, GreatFrontEnd, Firecode). No es diferenciador por sí solo.
- **Repetición espaciada de fallos aplicada a katas de entrevistas técnicas**: Firecode ya lo hace con un motor tipo SM2 [firecode.io/faq, verificado 2026-09-14]. No es una idea nueva; si Devsparring la implementa, no puede reclamarla como exclusiva, aunque sí es rara entre los competidores (casi ningún otro la tiene).
- **Todo en español, nativo, no traducido**: interviewkit.dev y EntrevistadorInteligente (proyectos GitHub personales, sección 1.17) y OnlineCV.es (simulador genérico, sección 1.21) son los únicos hallazgos en español. Ninguno combina código ejecutable + voz + spaced repetition + rutas de carrera. AceRound y Final Round AI tienen presencia de marketing en español/LatAm pero no está confirmado que el producto completo esté localizado.
- **Seis modos distintos en un solo producto**: no se encontró ningún competidor que cubra los seis modos (teoría flash, voz con IA, kata, revisión de código ajeno, system design, STAR comportamental) de forma integrada. Lo habitual es especialización: LeetCode/NeetCode/Firecode = solo kata; Hello Interview/AlgoExpert SystemsExpert = solo system design; interviewing.io/Exponent = mocks humanos generalistas; Yoodli/Huru/DevInterview.AI = voz/comportamental; GreatFrontEnd = solo frontend. "Revisión de código ajeno" como modo explícito de entrenamiment no se encontró en ningún competidor analizado (posible hueco adicional, no confirmado exhaustivamente: podría existir en herramientas de code review para empresas no orientadas a candidatos, fuera del alcance de esta búsqueda).
- **Rutas de carrera multi-rol explícitas**: Exponent tiene cursos por rol (PM, data science, ingeniería) y GreatFrontEnd es una "ruta" implícita solo de frontend, pero no se encontró un competidor con rutas de carrera explícitas que crucen los seis modos de práctica.
- **Gamificación tipo Duolingo (racha, XP, ligas) aplicada específicamente a preparación de entrevistas técnicas**: no se encontró ningún competidor que use mecánicas de gamificación al estilo Duolingo de forma sistemática; la mayoría usa progreso simple (% completado, rango kyu en Codewars) sin racha/liga/vidas.

**Conclusión honesta**: ningún competidor analizado replica la combinación completa. Las piezas individuales existen dispersas (voz+nivel en DevInterview.AI, spaced repetition en Firecode, español en proyectos pequeños de GitHub, gamificación tipo Duolingo en ningún competidor de este nicho). El hueco real no es "inventar una función nueva que nadie tiene", sino la integración: ser el único producto en español que junta entrevistador de IA por voz + banco de katas con editor + repaso espaciado de fallos + rúbrica junior/senior transparente + rutas de carrera + los seis modos, con una capa de gamificación adaptada (ver sección 6) al público adulto ansioso de búsqueda de empleo. Esta conclusión es una síntesis razonada de la evidencia recogida, no una garantía de que no exista un competidor no encontrado en esta búsqueda (limitación reconocida en "Incertidumbres").

## 6. Gamificación estilo Duolingo en adultos que preparan entrevistas: qué funciona y qué no

Evidencia académica encontrada (verificado 2026-09-14):
- Una revisión sistemática sobre gamificación en aprendizaje online de adultos concluye que es efectiva "cuando se integra funcionalmente con storytelling, feedback en tiempo real y contenido modular", con efecto medio-alto en engagement cuando está bien aplicada [ResearchGate, "Gamification in Online Adult Learning: A Systematic Literature Review", resumen de búsqueda, no leído, verificado 2026-09-14]. Pero el mismo cuerpo de investigación admite que "no es posible determinar de forma definitiva la efectividad de la gamificación en educación de adultos" porque varía mucho según diseño, duración y el resultado psicológico buscado.
- Un estudio sobre inmersión y ansiedad en educación gamificada encuentra una relación en forma de U invertida entre inmersión y ansiedad: la inmersión moderada estabiliza la experiencia emocional, pero la inmersión excesiva genera tensión psicológica; concluye que el aprendizaje gamificado efectivo depende también de dar oportunidades de recuperación, no solo de activar motivación [PMC12913498, "From immersion to burnout: anxiety mechanisms...", resumen de búsqueda, no leído, verificado 2026-09-14].
- Dos razones documentadas por las que a los alumnos les disgusta la gamificación: que no aporta utilidad adicional real, y que puede causar ansiedad o envidia (comparación social) [mismo cuerpo de fuentes, resumen de búsqueda, no leído, verificado 2026-09-14].
- Un artículo específico sobre gamificación por edad ("Age-Aware Gamification Mechanics for Multimedia Learning Environments", arxiv 2512.15630) sugiere explícitamente que un único diseño de gamificación no sirve para todas las edades ("one size doesn't fit all"), lo que respalda diseñar mecánicas distintas para adultos profesionales que para niños/adolescentes (no leído en detalle, solo título y resumen de búsqueda, verificado 2026-09-14).

### Qué SÍ parece transferible a adultos preparando entrevistas técnicas
- Lecciones cortas y de baja fricción para empezar (5 minutos) — reduce la barrera de "hoy no tengo tiempo", encaja con la evidencia de que feedback en tiempo real y contenido modular funcionan en adultos.
- Repaso de errores con repetición espaciada — no es un mecanismo "lúdico" per se, es pedagógicamente sólido (Anki, FSRS) y no depende de infantilizar al usuario.
- Progreso visible / racha MODERADA con opción de "congelar" o recuperar — el problema no es la racha en sí, es la ansiedad de perderla sin salida; ofrecer recuperación reduce el lado negativo de la aversión a la pérdida sin eliminar el efecto motivador (hipótesis basada en la evidencia de inmersión moderada = menos ansiedad, no confirmado específicamente para este dominio).

### Qué NO parece transferible o es de riesgo alto para un producto de entrevistas técnicas
- Notificaciones de "guilt marketing" (tipo búho triste de Duolingo) — funciona para hábito de idioma casual, pero un público profesional buscando trabajo ya suele tener ansiedad asociada (proceso de entrevistas, posible desempleo); sumar culpabilidad artificial puede ser contraproducente (hipótesis, no confirmado directamente por estudio específico de este dominio, pero consistente con la evidencia de que la ansiedad excesiva empeora el aprendizaje).
- Ligas/competencia social pública contra desconocidos — tiene sentido para aprender un idioma por diversión; en un contexto de búsqueda de empleo (a menudo cargado emocionalmente, con comparación salarial/de nivel ya presente) el riesgo de "envidia" y ansiedad por comparación documentado en la literatura es más alto (hipótesis, no confirmado específicamente, pero coherente con la evidencia citada).
- XP puro sin relación con progreso real — el propio Duolingo tuvo que corregir esto en 2026 pasando a un sistema de "Score" para evitar que el usuario "farmee" XP repitiendo contenido fácil en vez de avanzar; para Devsparring, cualquier sistema de puntos debe atarse a progreso real (dominio de temas nuevos, reducción de fallos) y no a repetir katas fáciles.

### Conclusión de esta sección
La evidencia académica es mixta pero converge en: gamificación funciona en adultos si aporta utilidad real (feedback, modularidad) y si evita la ansiedad por inmersión excesiva o comparación social. Para un producto que ya trata con la ansiedad inherente de la búsqueda de empleo, lo prudente es adoptar el lado "utilitario" de Duolingo (repaso espaciado, sesiones cortas, progreso visible) y evitar o suavizar el lado "manipulador" (culpa, competencia social pública, XP vacío).

## 7. Modelos de precio observados y qué pagaría un desarrollador español

### Modelos de precio observados en la competencia (todos resumen de búsqueda, no leído directamente en la fuente oficial salvo que se indique lo contrario; verificado 2026-09-14)

| Competidor | Modelo | Precio aproximado |
|---|---|---|
| LeetCode | Suscripción mensual/anual | 35 USD/mes o 159 USD/año |
| NeetCode Pro | Anual o de por vida, sin mensual | 119 USD/año o 297 USD de por vida |
| HackerRank (candidato) | Gratis para candidatos; empresas pagan | Gratis (candidato) |
| CodeSignal | Freemium + suscripción + empresa a medida | Learn gratis, Cosmo+ 24,99 USD/mes; Hire 79-99 hasta 599 USD/mes |
| AlgoExpert | Anual único, sin reembolso | 99-199 USD/año |
| GreatFrontEnd | No confirmado con cifra exacta | No confirmado |
| Hello Interview | Mensual/anual/de por vida | 47-79-279 USD |
| interviewing.io | Pago por sesión + paquete coaching | 179-339 USD/sesión; 2.000 USD paquete de 3 |
| Exponent (Pramp) | Freemium con créditos + suscripción | 5 sesiones peer gratis/mes; 12-79 USD/mes suscripción |
| Final Round AI | Suscripción con varios plazos | 25-150 USD/mes según plazo |
| Exercism | 100% gratis | 0 |
| Codewars | Freemium | Gratis con valor añadido limitado de pago |
| DevInterview.AI | Suscripción | 24,99-119,99 USD (mes/trimestre/año) |
| Yoodli | Freemium (5 sesiones de por vida) + suscripción | 8-20 USD/mes |
| Huru | Suscripción | 24,99 USD/mes |
| Firecode | Suscripción con prueba gratis 14 días | No confirmado el precio exacto |
| AceRound | Pago único por periodo (no recurrente según una fuente) | 14,90-99 USD según plan |
| Anki | Gratis (excepto iOS) | 0 (24,99 USD pago único solo iOS) |
| Brilliant | Suscripción mensual/anual/familiar | 20-40 USD/mes según plan |
| OpositaTest (España, referencia local) | Suscripción mensual/semestral/anual | 7,99-15,99 EUR/mes |

### Patrones observados
- El precio "por sesión" (interviewing.io, 179-339 USD) es el modelo más caro y se justifica solo cuando hay un humano experto en vivo.
- El modelo "anual único sin mensual" (NeetCode, AlgoExpert) es común en productos de contenido curado que no necesitan soporte continuo intensivo.
- El freemium con créditos limitados (Pramp, Yoodli, Codewars, PracHub) es el patrón dominante para productos con componente de IA o humano que tiene coste marginal por uso.
- El único comparable directo en euros y mercado español (OpositaTest) se sitúa en 8-16 EUR/mes, sensiblemente por debajo de los precios en USD de la competencia anglosajona (que rondan 20-35 USD/mes en sus tiers de entrada, cuando existen).

### Qué pagaría un desarrollador español (evidencia indirecta, no encuesta directa)
- No se encontró una encuesta específica de "cuánto pagan los desarrolladores españoles por formación/suscripciones de preparación de entrevistas" en esta búsqueda; lo que sigue es una inferencia razonada a partir de datos de salario y de precios de referencia en España, marcada explícitamente como estimación.
- Salario medio de desarrollador de software en España en 2026: ~31.869 EUR/año según Indeed (junio 2026); ~29.800 EUR según Jobted; nivel mid (2-5 años) 30.000-48.000 EUR; senior (5+ años) 48.000-80.000 EUR [es.indeed.com/career/desarrollador-de-software/salaries, keepcoding.io/blog/cuanto-cobra-un-programador-espana, verificado 2026-09-14].
- Referencia de precio de cursos online generales en España: un curso específico de 15-30 EUR es la franja de entrada, y 150-250 EUR para formatos con acompañamiento/seminario [resumen de búsqueda, no leído, verificado 2026-09-14].
- OpositaTest, el comparable más cercano en español (banco de preguntas + repaso de fallos + suscripción), cobra 8-16 EUR/mes según plazo.
- Estimación (hipótesis, no confirmado por encuesta directa): un desarrollador español dispuesto a pagar por una app de preparación de entrevistas técnicas probablemente acepte un rango de 8-20 EUR/mes en modalidad de suscripción continua, similar al rango de OpositaTest y al tier de entrada de Yoodli (8 USD/mes) y NeetCode Pro prorrateado (119 USD/año ≈ 10 USD/mes), pero probablemente resista precios tipo LeetCode Premium mensual (35 USD/mes) o Final Round AI mensual (150 USD/mes) sin comprometerse antes a un plan anual con descuento. Un modelo anual con fuerte descuento (al estilo NeetCode/AlgoExpert) parece más alineado con el patrón de gasto observado en el mercado español que un mensual caro sin compromiso.

---

## Incertidumbres

- Casi todas las cifras de precio de este documento provienen de resúmenes de búsqueda (blogs de terceros, comparativas SEO, sitios agregadores) y no de lectura directa de la página oficial de precios, porque varios sitios objetivo (leetcode.com/subscribe, neetcode.io/pricing) bloquearon el acceso directo (HTTP 403 o contenido no renderizado) al intentar leerlos con la herramienta de fetch el 2026-09-14. Recomendado: verificar manualmente antes de usar estas cifras en un documento de decisión de producto o pricing definitivo.
- Varias cifras de precio se contradicen entre fuentes de terceros para el mismo competidor (CodeSignal, HackerRank, AceRound): se reportan ambas versiones con la fuente de cada una, pero no se pudo resolver la discrepancia sin acceso a la página oficial.
- No se pudo confirmar con precisión el soporte de idioma español en varios competidores angloparlantes (NeetCode, AlgoExpert, GreatFrontEnd, Hello Interview, Firecode, DevInterview.AI, Huru) más allá de menciones genéricas de "soporte multilingüe" en algunos casos (Huru, AceRound); no se probó directamente cambiando el idioma de la interfaz.
- Las citas de usuarios (Reddit/Blind/Trustpilot/G2) se obtuvieron en su mayoría vía snippets de resultados de búsqueda que ya resumen o parafrasean el hilo original, no mediante lectura directa del hilo completo; se marcó "(resumen de búsqueda, no leído)" en cada caso pero el matiz exacto de cada cita podría perderse en la paráfrasis del motor de búsqueda.
- No se profundizó en varios competidores mencionados de pasada en el ecosistema de PracHub (Preppable, Interview Drills, mockinterviews.dev, DarkInterview, GothamLoop, Screna AI, Chill Interview, FastPrep, LintCode) por límite de tiempo/alcance de esta investigación; quedan solo mencionados en la sección 1.21.
- No se encontró un estudio académico específico sobre gamificación aplicada exactamente al dominio "adultos preparando entrevistas técnicas de programación"; la sección 6 se apoya en estudios de gamificación en adultos en general y en un caso de educación en salud (burnout), extrapolando al dominio de Devsparring de forma razonada pero no directamente probada para este caso concreto — marcado como "hipótesis, no confirmado" donde corresponde.
- La cifra de "36% de aumento interanual en usuarios activos diarios" y "churn del 28%" de Duolingo proviene de una fuente de marketing/blog (orizon.co), no de un informe financiero auditado de Duolingo Inc.; tratar con cautela.
- No se verificó de forma independiente la afirmación de firecode.io sobre "127.000 USD de aumento salarial mediano" de sus usuarios; es una cifra propia de marketing sin fuente de auditoría externa.
- No se encontró una encuesta directa sobre disposición a pagar de desarrolladores españoles específicamente por herramientas de preparación de entrevistas técnicas; la sección 7 usa inferencia razonada a partir de salarios y precios de referencia comparables (OpositaTest, cursos online generales), explícitamente marcada como estimación.
- El precio exacto vigente de GreatFrontEnd y de Firecode no se pudo confirmar con una cifra concreta en los resultados de búsqueda revisados.

## Fuentes

Nota: la mayoría de enlaces se citan también en línea junto a cada afirmación en las secciones 1, 2, 6 y 7. Aquí se listan agrupados por tema para referencia rápida. Todos verificados 2026-09-14 salvo que se indique otra fecha.

### LeetCode
- https://www.designgurus.io/blog/is-leetcode-premium-worth-it
- https://codeswiftr.com/blog/leetcode-premium-worth-it-2026/
- https://www.teamblind.com/post/is-leetcode-premium-worth-it-aebdgmmb

### NeetCode
- https://dev.to/alex_hunter_44f4c9ed6671e/best-neetcode-pro-alternatives-in-2026-free-paid-options-compared-134n
- https://www.educative.io/blog/blind-75-neetcode

### HackerRank
- https://www.spendhound.com/marketplace/hackerrank-pricing
- https://www.vendr.com/marketplace/hackerrank
- https://www.teamblind.com/company/Hackerrank/posts/hackerrank-interview

### CodeSignal
- https://codesignal.com/pricing/
- https://www.testtrick.com/blogs/codesignal-pricing-plans
- https://aws.amazon.com/marketplace/reviews/reviews-list/prodview-po26wk2urui7k

### AlgoExpert
- https://dev.to/alex_hunter_44f4c9ed6671e/algoexpert-vs-algomonster-dont-buy-the-wrong-one-2026-4pjn
- https://www.lodely.com/blog/algoexpert-pricing
- https://prachub.com/resources/is-algoexpert-still-worth-it-in-2026-honest-review-better-alternatives
- https://www.teamblind.com/post/is-algoexpert-worth-it-erxxvhyq

### GreatFrontEnd
- https://www.greatfrontend.com/interviews/pricing
- https://rasleen0209.medium.com/greatfrontend-com-a-comprehensive-review-for-frontend-interview-prep-cac07c74a4b0
- https://www.teamblind.com/post/bfedev-vs-greatfrontend-d26gwbp4

### Hello Interview
- https://www.hellointerview.com/pricing
- https://officebook.dev/tools/hello-interview/
- https://algoengineer.com/blog/hello-interview-alternatives
- https://www.teamblind.com/post/horrible-experience-in-hello-interview-mock-interview-g4o10kqp

### interviewing.io
- https://www.lodely.com/blog/interviewing-io-pricing
- https://www.finalroundai.com/blog/interviewing-io-review-pros-cons
- https://www.finalroundai.com/blog/what-is-interviewing-io

### Exponent / Pramp
- https://www.finalroundai.com/blog/pramp-review-pros-cons
- https://igotanoffer.com/en/advice/pramp-alternatives
- https://www.finalroundai.com/blog/what-is-pramp

### Final Round AI
- https://www.finalroundai.com/blog/final-round-ai-pricing
- https://www.withsherlock.ai/blog/detect-and-prevent-final-round-ai
- https://nl.trustpilot.com/review/finalroundai.com

### Exercism
- https://toolradar.com/tools/exercism
- https://www.saashub.com/exercism-reviews

### Codewars
- https://justlearn.com/ai-tools/codewars/
- https://docs.codewars.com/gamification/ranks/

### DevInterview.AI
- https://devinterview.ai/pricing
- https://devinterview.ai/compare

### PracHub
- https://prachub.com/resources/7-best-ai-mock-interview-platforms-in-2026-ranked-by-real-engineers

### Google Interview Warmup
- https://skillora.ai/blog/interview-warmup-alternatives
- https://www.finalroundai.com/blog/google-interview-warmup-discontinued-alternatives

### Yoodli
- https://www.finalroundai.com/blog/yoodli-pricing
- https://www.finalroundai.com/blog/yoodli-review-pros-cons
- https://makerstack.co/reviews/yoodli-review/

### interviewkit.dev y proyectos españoles
- https://github.com/albertsp/interviewkit
- https://github.com/EntrevistadorInteligente/

### Huru
- https://www.theofferinbox.com/huru-ai-review/
- https://www.finalroundai.com/blog/huru-review-pros-cons

### Firecode
- https://firecode.io/faq
- https://firecode.io/best/spaced-repetition-coding-interview-prep

### AceRound
- https://interviewsidekick.com/blog/aceround-review
- https://www.aceround.app/blog/aceround-vs-final-round-ai/
- https://www.aceround.app/es-419/blog/preguntas-entrevista-tecnica-programador/

### Otros en español
- https://www.onlinecv.es/simulador-entrevistas-trabajo/
- https://opinionesespana.es/servicios/online-cv-opiniones
- https://www.finalroundai.com/es/ai-mock-interview
- https://www.javadex.es/blog/startups-ia-espanolas-mejores-rompiendo-2026

### Duolingo y gamificación
- https://duolingo.deconstructoroffun.com/mechanics/streaks
- https://www.strivecloud.io/blog/gamification-examples-boost-user-retention-duolingo
- https://www.orizon.co/blog/duolingos-gamification-secrets
- https://tinomwadeyi.substack.com/p/how-duolingo-perfected-the-art-of
- https://savannahkopp.substack.com/p/kill-your-streaks
- https://www.researchgate.net/publication/393588108_Gamification_in_Online_Adult_Learning_A_Systematic_Literature_Review
- https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12913498/ ("From immersion to burnout: anxiety mechanisms and pathways to motivational exhaustion in gamified health education")
- https://arxiv.org/pdf/2512.15630 ("One Size Doesn't Fit All: Age-Aware Gamification Mechanics for Multimedia Learning Environments")

### Anki
- https://www.mindomax.com/best-spaced-repetition-apps-2026-anki-alternatives
- https://laxuai.com/blog/best-spaced-repetition-apps-2026

### Brilliant
- https://e-student.org/brilliant-org-review/
- https://nibble-app.com/blog/is-brilliant-worth-it

### OpositaTest
- https://blog.opositatest.com/cuanto-cuesta-opositatest-precio-test-oposiciones/
- https://oposicionesactualidad.es/articulos/opositatest-opiniones.html

### Salarios y precios de referencia en España
- https://es.indeed.com/career/desarrollador-de-software/salaries
- https://keepcoding.io/blog/cuanto-cobra-un-programador-espana/
