# Formatos y procesos de entrevista técnica (2026): España y global

Investigación para Devsparring. Fecha de referencia: 14 de septiembre de 2026. Todas las
verificaciones de fuentes están fechadas en septiembre de 2026 salvo que se indique
lo contrario. Regla: cada afirmación lleva enlace y fecha de verificación; lo no
encontrado se dice explícitamente; las hipótesis van marcadas como tal.

> Estado: research completado para esta sesión (2026-09-14). Quedan puntos
> explícitamente no verificados — ver "Incertidumbres" al final, en particular
> el bloqueo total de acceso a Reddit y a Glassdoor con las herramientas
> disponibles en esta sesión.

## Índice

1. [Estructura típica del proceso por tipo de empresa](#1-estructura-típica-del-proceso-por-tipo-de-empresa)
   - 1.1 Consultoras españolas
   - 1.2 Empresas producto españolas
   - 1.3 Startups
   - 1.4 Grandes tech globales
2. [Formatos de entrevista y su prevalencia](#2-formatos-de-entrevista-y-su-prevalencia)
3. [Diferencias por nivel (junior/mid/senior/staff)](#3-diferencias-por-nivel)
4. [Otros roles (QA, PO, Scrum Master, Arquitecto, EM)](#4-otros-roles)
5. [Experiencias de primera mano en español](#5-experiencias-de-primera-mano-en-español)
6. [Uso de IA al programar: qué preguntan y cómo se evalúa](#6-uso-de-ia-al-programar)
7. [Incertidumbres](#incertidumbres)
8. [Fuentes](#fuentes)

---

## 1. Estructura típica del proceso por tipo de empresa

### 1.1 Consultoras españolas

**Nota metodológica importante**: intenté leer directamente las páginas de Glassdoor
(glassdoor.es y glassdoor.com) con WebFetch y con el navegador. Glassdoor bloquea el
acceso automatizado con un reto CAPTCHA de Cloudflare ("Verifique que es un ser
humano"). No completé el CAPTCHA (está prohibido por las reglas de esta sesión
bypassear detección de bots). Por tanto, todo lo atribuido a Glassdoor en esta
sección proviene de **resúmenes de búsqueda (snippets), no de la lectura directa de
la página** — se marca así en cada caso. Ver más detalle en "Incertidumbres".

**Accenture España** (resumen de búsqueda, no leído; verificado 2026-09-14):
proceso de 2 a 4 semanas: solicitud vía portal oficial, entrevista inicial de RRHH
(motivación y encaje cultural), y una o más entrevistas técnicas que evalúan
lenguajes, estructuras de datos, algoritmos y bases de datos, con casos prácticos
donde "el proceso de razonamiento claro a menudo pesa más que llegar a la solución
perfecta". Para roles con clientes internacionales se exige inglés alto.
Fuente: [Glassdoor - Programador Junior en Accenture](https://www.glassdoor.es/Entrevista/Accenture-Programador-Junior-Preguntas-de-entrevista-EI_IE4138.0,9_KO10,28.htm),
[club-mba.com sobre Accenture](https://www.club-mba.com/empleo/procesos-de-seleccion/accenture/).

**Capgemini España / Capgemini Engineering** (resumen de búsqueda, no leído;
verificado 2026-09-14): proceso típico de ~2 semanas con 4 pasos: (1) llamada de
RRHH sobre expectativas salariales y experiencia, (2) prueba técnica con ejercicios
de algoritmos, (3) entrevista técnica por videollamada con un ingeniero del equipo
que revisa la solución y pregunta sobre estructuras de datos, (4) entrevista con el
engineering manager sobre encaje cultural y proyectos. Valoración en Glassdoor:
66.3% de experiencias positivas, dificultad media 2.79/5 (IT Developer entre los
puestos más difíciles). Fuente: [Glassdoor - Software Developer en Capgemini Engineering](https://www.glassdoor.es/Entrevista/Capgemini-Engineering-Software-Developer-Preguntas-de-entrevista-EI_IE28187.0,21_KO22,40.htm).

**NTT DATA España, Programador Júnior** (resumen de búsqueda, no leído; verificado
2026-09-14): dificultad reportada 3/5 y 100% de experiencias positivas en la
muestra encontrada. El proceso descrito incluye una entrevista grupal por
videollamada con dinámicas de grupo evaluadas por RRHH, y preguntas básicas de
programación según el puesto además de preguntas sobre expectativas laborales y
salario. Tiempo medio hasta contratación reportado: 1 día (dato de Glassdoor, sin
verificar independientemente, llama la atención por lo corto). Salario medio
reportado: 16.000 EUR/año. Fuente: [Glassdoor - NTT DATA Programador Júnior](https://www.glassdoor.com/Interview/NTT-DATA-Programador-J%C3%BAnior-Interview-Questions-EI_IE7649.0,8_KO9,27.htm).

**Indra España, Desarrollador de Software** (resumen de búsqueda, no leído;
verificado 2026-09-14): proceso de 3 pasos descrito por la propia Indra: (1)
revisión de perfil, (2) primer contacto telefónico de 5-10 min, (3) entrevista
técnica con el equipo donde explican el proyecto y tareas diarias, seguida de una
conversación de habilidades blandas. Duración media de contratación: 19.31 días
(dato de Glassdoor). Salario medio reportado: 25.000 EUR/año. Fuente:
[Glassdoor - Indra Interview Experience](https://www.glassdoor.com/Interview/Indra-Interview-Questions-E9757.htm),
[Indra Group - oferta Desarrollador/a Junior Java](https://careers.indragroup.com/job/Madrid-Desarrolladora-Junior-Java-MD/978237755/).

**Softtek** (resumen de búsqueda, no leído; verificado 2026-09-14): proceso de 14 a
21 días con 4 a 6 etapas: postulación online, screening de RRHH, prueba técnica,
entrevista técnica (1h, con diseño de sistemas, code review y troubleshooting en
vivo), entrevista con cliente o panel, y oferta. Dificultad reportada en Glassdoor:
2.6/5, ~70% de experiencias positivas. El nivel de inglés es determinante porque el
cliente final puede rechazar al candidato si no fluye en inglés técnico. Fuente:
[Glassdoor - Softtek Interview Experience](https://www.glassdoor.com/Interview/Softtek-Interview-Questions-E108072.htm).

**Patrón común observado en las 5 consultoras** (con la salvedad de que son datos de
segunda mano vía snippets de búsqueda, no lectura directa): 3-4 fases, RRHH primero
y técnica después, duración típica 2-3 semanas, mucho peso en encaje con cliente
final y nivel de inglés, y menor uso de plataformas de test automatizado tipo
Codility/HackerRank comparado con big tech (aunque Capgemini y Softtek sí mencionan
pruebas técnicas con algoritmos).

### 1.2 Empresas producto españolas

Misma salvedad que en 1.1: contenido de Glassdoor es resumen de búsqueda, no
lectura directa, salvo que se indique lo contrario.

**Cabify, Software Engineer** (resumen de búsqueda, no leído; verificado
2026-09-14): proceso de 5 pasos: 1 screening de RRHH, 1 prueba técnica (take-home:
construir una REST API con requisitos deliberadamente ambiguos en testing y
documentación, "para ver tu forma habitual de trabajar"), y 3 entrevistas técnicas
encadenadas (revisión de la prueba, algoritmos, diseño de sistemas). Cada una de
las 3 entrevistas se divide en dos mitades: la primera evalúa soft skills con
preguntas conductuales tipo STAR, la segunda es técnica. Pregunta recurrente
citada: "qué pasa cuando escribes una URL en el navegador". Un candidato describe
el proceso como "bastante largo, con una prueba técnica que fácilmente puede llevar
días" para dejarla "production ready". Fuente:
[Glassdoor - Cabify Software Engineer Interview Questions](https://www.glassdoor.com/Interview/Cabify-Software-Engineer-Interview-Questions-EI_IE975202.0,6_KO7,24.htm).

**Glovo, Software/Backend Engineer** (resumen de búsqueda, no leído; verificado
2026-09-14): proceso de 4 pasos: preselección con reclutador, entrevista de
coding (algoritmos), entrevista comportamental, entrevista de arquitectura (system
design + application design). Preguntas de diseño de sistemas citadas: "Design a
Waze-like system", "Design a chat app", "Design a food delivery system like
Swiggy". Se evalúan trade-offs de sistemas distribuidos: teorema CAP, consistencia
eventual, patrones de comunicación asíncrona. Tiempo medio hasta contratación para
Senior Software Engineer: 29 días. Fuente:
[Glassdoor - Glovo Software Engineer](https://www.glassdoor.com/Interview/Glovo-Software-Engineer-Interview-Questions-EI_IE3424586.0,5_KO6,23.htm),
[Glassdoor - Glovo Backend Engineer](https://www.glassdoor.com/Interview/Glovo-Backend-Engineer-Interview-Questions-EI_IE3424586.0,5_KO6,22.htm).

**Wallapop** (resumen de búsqueda, no leído; verificado 2026-09-14): un candidato
describe: solicitud online, contacto del reclutador tras 6 semanas de espera,
llamada telefónica, y luego prueba técnica. 74% de experiencias positivas,
dificultad media 3.1/5. Proceso descrito como "algo lento pero con buena
comunicación". Fuente: [Glassdoor - Wallapop Interview Experience](https://www.glassdoor.com/Interview/Wallapop-Interview-Questions-E1099265.htm).

**Idealista.com** (resumen de búsqueda, no leído; verificado 2026-09-14): según una
experiencia de febrero de 2025 en Oviedo, el proceso fue: (1) entrevista de RRHH,
(2) entrevista técnica consistente en revisar un pull request real junto a dos
desarrolladores de la empresa, en formato de conversación técnica informal sobre
prácticas de código y cómo el candidato lo resolvería, (3) entrevista con
responsables de negocio. Es un formato de "code review" en vez de live coding
clásico. Fuente: [Glassdoor - Idealista.com Interview Experience](https://www.glassdoor.com/Interview/Idealista-com-Interview-Questions-E927735.htm).

**Factorial HR, Senior Software Engineer** (resumen de búsqueda, no leído;
verificado 2026-09-14): proceso largo (candidatos reportan hasta 2 meses en
total, con ~1 semana de espera entre cada etapa), estructura: entrevistas
conversacionales iniciales, prueba técnica, evaluación comportamental, y una
entrevista específica de producto/negocio (la empresa da peso explícito a esta
dimensión). Dificultad reportada: 3.2/5, 80% de experiencias positivas, media de
39 días hasta contratación para Senior SWE. Fuente:
[Glassdoor - Factorial Senior Software Engineer](https://www.glassdoor.com/Interview/Factorial-Senior-Software-Engineer-Interview-Questions-EI_IE1618672.0,9_KO10,34.htm).

**Typeform, Software Engineer (Barcelona)** — este sí se pudo leer de primera mano
(no es Glassdoor sino un agregador, jointaro.com; verificado 2026-09-14): 4 rondas
en total: (1) llamada inicial con reclutador, (2) ronda técnica de 1.5 horas
consistente en un caso de uso real: "crear una aplicación utilizando tecnología de
inteligencia artificial", descrita por el candidato como "un desafío significativo"
más allá de ejercicios memorísticos, (3) entrevista comportamental con liderazgo
(preguntas tipo "¿por qué Typeform?", "da un ejemplo de cuando tuviste que dar
feedback a un compañero"), (4) entrevista de producto sobre alineación con la
visión de negocio. Duración total del proceso: unas 3-4 semanas según distintos
candidatos. Fuente: [jointaro.com - Typeform SWE interview Barcelona](https://www.jointaro.com/interviews/companies/typeform/experiences/software-engineer-barcelona-may-1-2025-accepted-offer-positive-094e19e0/),
resumen adicional de [Glassdoor - Typeform Software Engineer](https://www.glassdoor.com/Interview/Typeform-Software-Engineer-Interview-Questions-EI_IE991912.0,8_KO9,26.htm)
(este último no leído, solo resumen de búsqueda).

**Patrón observado en producto españolas**: procesos más largos que las
consultoras (3-8 semanas), con más peso en diseño de sistemas y en evaluación de
producto/negocio, uso de pruebas take-home reales (Cabify, Typeform) en vez de solo
tests automatizados, y aparición ya en 2025 de ejercicios que piden usar IA
explícitamente (Typeform). Ver también sección 6.

### 1.3 Startups

No encontré para esta sesión relatos de primera mano de candidatos en startups
españolas concretas con el mismo nivel de detalle que para las empresas de
1.1 y 1.2 (Glassdoor tiene mucha menos huella para startups pequeñas, y no
pude completar los CAPTCHA de todas formas). Lo que sí se puede documentar:

**Patrón genérico citado para procesos IT en España** (resumen de búsqueda, no
leído directamente en una fuente primaria única, aparece repetido en varios
resultados de búsqueda; verificado 2026-09-14): 3 fases — screening de
RRHH/reclutador, prueba técnica (live coding o take-home), entrevista técnica
final y cultural fit. Un patrón de startup citado con algo más de detalle:
"code quiz and logic con tiempo limitado" seguido de una "entrevista técnica
(español/inglés): desafío técnico en el lenguaje de programación preferido" y
una "entrevista final con varias partes". La primera entrevista (screening)
"suele ser la más corta, no más de 20-30 minutos salvo que la conversación siga
de forma natural". Fuente: resultados agregados de búsqueda sin una URL única
identificable como origen primario — **tratar con cautela, es síntesis de
snippets, no una fuente citable con precisión**.

**alcaparra.co, "Entrevista técnica para desarrolladores junior: guía 2026"**
(leído directamente; verificado 2026-09-14): no es específico de startups ni
de España, pero es relevante para el research de Devsparring por su enfoque en
comunicación del razonamiento. Propone un framework de 5 pasos: clarificación
del enunciado, exposición del plan, verbalización del razonamiento, validación
con ejemplos, cierre y mejoras propuestas. Cita literal: *"el error no es no
saber la respuesta. Es quedarse en silencio mientras pensás"*. Afirma (sin
fuente propia citada) que Google, Amazon y Meta valoran "capacidad de
comunicar, iterar y pedir ayuda" en roles entry-level. Fuente:
[alcaparra.co - guía entrevista técnica junior](https://www.alcaparra.co/blog/guia-preparacion-entrevista-tecnica-desarrollador-junior).

**Contraste general con consultoras/producto/big tech**: por lo que sí se pudo
verificar (Hired: 4.2 fases promedio globalmente, ver sección 2; GetManfred:
mercado con más de 8.500 empresas tech activas en España en 2025, ver sección
2), la hipótesis razonable —**marcada explícitamente como hipótesis, no
confirmada con una fuente específica de startups españolas**— es que las
startups españolas tienden a procesos más cortos y con menos fases que las
consultoras o big tech, con mayor peso relativo de la prueba práctica/técnica
frente al test automatizado, dado el patrón ya confirmado en empresas producto
españolas de tamaño medio (Cabify, Typeform) que se parecen más a "startup
grande" que a consultora. No se pudo confirmar esta hipótesis con datos de
startups pequeñas (menos de 50 empleados) específicamente.

**Lo que no encontré**: ninguna fuente con nombre propio de una startup
española pequeña (pre-Serie B) describiendo su proceso de entrevista con
suficiente detalle y fecha reciente (2025-2026) — dato no encontrado, no se
rellenó con suposiciones.

### 1.4 Grandes tech globales

Nota: para estas cuatro empresas combino fuentes primarias (páginas oficiales,
declaraciones directas de VPs citadas por medios) con resúmenes de búsqueda de
sitios de preparación de entrevistas (marcados como tal). La página oficial de
Google sobre el proceso de contratación (`google.com/about/careers/.../how-we-hire`)
no cargó contenido detallado al leerla directamente (solo enlaces a subpáginas);
no se pudo verificar de primera mano el contenido de esas subpáginas por límite de
tiempo de esta sesión.

**Google, Software Engineer** (resumen de búsqueda, no leído directamente en las
páginas de preparación; verificado 2026-09-14): proceso de 5 fases: screening de
currículum, evaluación online, phone screen técnico, onsite loop (4-6 rondas) y
comité de contratación ("hiring committee"). Proceso completo: 6-8 semanas desde
el screening del reclutador hasta la oferta. La mayoría de candidatos hace 2-3
entrevistas de coding onsite de ~45 min cada una, con un entrevistador distinto
cada vez, tradicionalmente en pizarra o documento compartido sin autocompletado ni
ejecución de código. Fuentes (resumen de búsqueda, no leídas directamente):
[TechPrep - Google's Interview Process 2026](https://www.techprep.app/blog/google-interview-process),
[Levelop - Software Engineer Interview Process 2026](https://levelop.dev/blog/the-complete-software-engineer-interview-process-in-2026-what-to-expect-at-every).

**Google, piloto de entrevista con IA (mayo 2026)** — este dato sí está corroborado
por varias fuentes periodísticas independientes citando la misma declaración
directa, verificado 2026-09-14: Google anunció en mayo de 2026 un piloto que
sustituye una ronda de coding tradicional por una ronda de "code comprehension"
para roles junior y mid-level de SWE en equipos seleccionados de EE.UU.
(empezando por Google Cloud y la unidad de platforms and devices). Brian Ong, VP
de Reclutamiento de Google, declaró a Business Insider (citado por varios
medios): *"We're always evolving our interview processes to ensure we're
recruiting and hiring the best talent. As a part of that, we're rolling out a
pilot for software engineering interviews to be more reflective of how our teams
are operating in the AI era."* En la ronda de "code comprehension" (60 minutos, en
CoderPad con panel de explorador de archivos, editor de código y chat con
asistente de IA) los candidatos deben leer, depurar y optimizar código existente
en una base de código multi-archivo, usando Gemini como asistente de IA. Se
evalúa explícitamente: ingeniería de prompts, validación de resultados y
depuración ("AI fluency"). Para candidatos junior, una ronda técnica tradicional
se sustituye por desafíos de ingeniería abiertos. La transición completa se
estima en 12-18 meses. Fuentes:
[The HR Digest - Google embraces new era of hiring](https://www.thehrdigest.com/using-ai-assistants-during-job-interviews-google-embraces-a-new-era-of-hiring/),
[Kashmir Reader citando a Google's VP](https://kashmirreader.com/2026/05/17/were-evolving-our-interview-processes-to-recruit-best-talent-in-ai-era-googles-vp/),
[Entrepreneur - Google Is Testing a Transformative New Interview Rule](https://www.entrepreneur.com/business-news/google-is-testing-a-new-rule-transform-job-interviews).

**Meta, Software Engineer** (resumen de búsqueda, no leído directamente;
verificado 2026-09-14): recruiter screen de 20-30 min, evaluación online (OA)
sobre todo para E5+ administrada en **CodeSignal con video y micrófono
monitorizados** durante 90 minutos (un problema complejo dividido en 4 etapas
progresivas), luego phone screen técnico de 45 min (2 problemas estilo LeetCode,
fácil-medio, en CoderPad con ejecución de código desactivada). El onsite completo
incluye 1 ronda de coding tradicional, 1 ronda de **coding con IA habilitada**
(desde octubre de 2025 en piloto), 1 ronda de system/product design, y 1 ronda
comportamental. La ronda con IA dura 60 min en un entorno CoderPad especializado
con asistente de IA integrado; se estima probable su despliegue a todos los roles
de backend y ops en 2026. Tras el loop, candidatos fuertes pasan por "team
matching" antes de la oferta. Fuente:
[claveprep.com - Meta Interview Process 2026](https://claveprep.com/blog/meta-interview-process-2026-guide)
(no verificado de primera mano; sitio de preparación de pago, tratar con cautela
en cuanto a precisión de detalles como "90 minutos" y "4 etapas").

**Amazon, Software Development Engineer** — la sección de temas de entrevista sí
se leyó directamente en la página oficial de Amazon Jobs (verificado
2026-09-14): cita textual, *"Most technical interviews require you to perform
coding and system design white boarding exercises"* y *"An important part of our
hiring process for software development engineers (SDEs) is the completion of an
online assessment, which includes a coding test."* Los temas técnicos que se
evalúan incluyen lenguajes de programación, estructuras de datos, algoritmos,
diseño orientado a objetos, bases de datos, computación distribuida, sistemas
operativos, temas de Internet y Machine Learning/IA; la página aclara que *"Your
interviewers won't be evaluating your ability to memorize all of the details for
each of these topics."* También se evalúan los Leadership Principles mediante
preguntas conductuales. La página oficial no detalla número de fases ni
duraciones exactas. Fuente:
[Amazon Jobs - Software Development Interview Topics](https://www.amazon.jobs/content/en/how-we-hire/interview-prep/software-development-topics).
Complementando con resumen de búsqueda (no leído directamente; verificado
2026-09-14): recruiter screen de 15-30 min; OA de 90-120 min administrada en
**HackerRank** con 2 problemas estilo LeetCode medio-difícil, una sección de
"work simulation" con preguntas situacionales, y una encuesta de estilo de
trabajo ligada a los Leadership Principles; el onsite tiene 4-5 entrevistas de
~45 min (15 min de preguntas conductuales sobre 1-2 LPs + 30 min de coding en
vivo en editor compartido), cada entrevistador asignado a 2-3 LPs específicos
para evitar solapamiento. Fuente:
[TechPrep - Amazon's Interview Process 2026](https://www.techprep.app/blog/amazon-interview-process).

**Microsoft, Software Engineer** (resumen de búsqueda, no leído directamente;
verificado 2026-09-14): recruiter screen de ~30 min, OA de 90 min con 2 problemas
en **Codility**, interview loop de 4-5 rondas de ~60 min cada una (2-3 rondas de
coding, 1 de system design, 1 comportamental), y una ronda final "As Appropriate"
(AA) con un hiring manager senior o ingeniero nivel partner que hace la llamada
final de hire/no-hire, similar al "bar raiser" de Amazon. Proceso completo:
4-8 semanas. Fuerte énfasis en encaje cultural y colaboración, con entrevistas
comportamentales estructuradas en método STAR. Fuente:
[jobright.ai - The Ultimate Microsoft Interview Guide 2026](https://jobright.ai/blog/the-ultimate-microsoft-interview-guide-2026-from-process-breakdown-to-securing-the-offer/)
(no verificado de primera mano).

**Contraste con las consultoras y producto españolas**: la diferencia más clara es
la presencia sistemática de un test automatizado (OA) en plataformas dedicadas
(CodeSignal, HackerRank, Codility) en las 4 grandes tech, algo que solo aparece
mencionado explícitamente en 2 de las 5 consultoras españolas investigadas
(Capgemini, Softtek) y en ninguna de las empresas producto españolas
investigadas (que prefieren pruebas take-home o revisión de código real). El
número de fases es similar (4-6) pero la duración total del proceso tiende a ser
más corta en big tech (6-8 semanas) que en algunas producto españolas como
Factorial (hasta 2 meses reportados).

---

## 2. Formatos de entrevista y su prevalencia

### Datos cuantitativos encontrados

**Karat, "Engineering Interview Trends 2026"** (leído directamente; verificado
2026-09-14): compara EE.UU. vs China en cuatro formatos: entrevistas técnicas en
vivo (79% EE.UU. vs 87% China), permiso de usar IA en la entrevista (38% EE.UU. vs
68% China), tests automatizados de código (63% EE.UU. vs 49% China), proyectos
take-home (45% EE.UU. vs 20% China). El informe dice literalmente que "las
empresas chinas tienen casi el doble de probabilidades de permitir IA en
entrevistas en vivo". Pese a que 62% de las organizaciones aún prohíben IA en la
entrevista, se estima que más de la mitad de los candidatos la usan igualmente.
Karat lanzó en diciembre de 2025 "NextGen Interviews", un formato humano con
asistente de IA integrado dentro de la sesión de live coding. Fuente:
[Karat - Engineering Interview Trends 2026](https://karat.com/engineering-interview-trends-2026/).
No encontré en Karat datos específicos para España (solo EE.UU./China); no hay
dato de prevalencia por formato para España en esta fuente.

**Hired, "State of Software Engineers"** (resumen de búsqueda, no leído
directamente; verificado 2026-09-14): el ingeniero de software promedio pasa por
4.2 fases de entrevista antes de recibir oferta, frente a 3.1 en 2021. Los
proyectos take-home y ejercicios colaborativos son cada vez más comunes porque
"reflejan lo que hacen los ingenieros en el día a día". Fuente:
[underdog.io citando Hired](https://underdog.io/blog/reality-of-tech-interviews-2025).

**The Pragmatic Engineer, "The Reality of Tech Interviews in 2025"** (leído
directamente; verificado 2026-09-14): sin porcentajes de uso por formato, pero
datos cualitativos fuertes: la dificultad de las entrevistas de Data
Structures & Algorithms (DSA) ha subido, los problemas "Hard" de LeetCode se han
vuelto norma en vez de excepción, y ahora se exige manejo de errores, validación
de entrada y código limpio en los mismos límites de tiempo que antes. Las
entrevistas de system design ahora exigen conocimiento antes reservado a nivel
staff (geohashing, procesamiento de streams, windowing). El "team matching"
emergió como filtro adicional de facto tras pasar el loop técnico, con candidatos
esperando meses. Cita literal: "el desempeño que habría asegurado una oferta en
2021 podría no pasar ni el screening hoy". Fuente:
[Pragmatic Engineer - The Reality of Tech Interviews in 2025](https://newsletter.pragmaticengineer.com/p/the-reality-of-tech-interviews).

Una búsqueda relacionada (resumen de búsqueda, no leído; verificado 2026-09-14)
citando otra pieza de Pragmatic Engineer y una encuesta a 67 entrevistadores de
FAANG y startups: 58% ha retocado el tipo de preguntas algorítmicas que hace y
cerca de un tercio ha cambiado cómo las formula; la ronda comportamental ahora
ocupa 30-40% del tiempo total de entrevista en grandes tech, frente a 10-15% hace
cinco años. Las rondas presenciales subieron de 24% (2022) a 38% (2025) por
preocupación de trampas con IA en remoto. Fuente citada en el resumen: Pragmatic
Engineer / IEEE-USA InSight (no verificado de primera mano el artículo exacto).

**underdog.io, "The Reality of Tech Interviews 2025"** (leído directamente;
verificado 2026-09-14): 82% de las entrevistas ahora exige "implementaciones sin
fallos con manejo de errores" en los mismos límites de tiempo de antes. Sobre
detección de trampas con IA: "los entrevistadores de Amazon detectan al 50% de
los candidatos que usan herramientas de IA durante los tests" y plataformas como
CoderPad usan compartir pantalla en vivo para marcar el 20% de sospechas de
trampa. Un fundador citado estimó que "al menos 20% de los candidatos hacían
trampa obviamente en los tests de coding tradicionales". Downleveling: 63% de
candidatos senior reciben ofertas de nivel inferior al esperado, según datos de
Levels.fyi 2025 (cifra reportada por underdog.io, no verificada directamente en
Levels.fyi). Nota: estas cifras (50%, 20%, 63%) no traen metodología visible en
el artículo leído: se citan como afirmaciones del medio, no como dato
verificado con la fuente primaria. Fuente:
[underdog.io - The Reality of Tech Interviews 2025](https://underdog.io/blog/reality-of-tech-interviews-2025).

**Levels.fyi**: no encontré un informe/encuesta formal de Levels.fyi sobre
prevalencia de formatos de entrevista (2025-2026) más allá de su blog general
sobre procesos de FAANG y guías de preparación (LeetCode, HackerRank,
InterviewBit). No se pudo verificar el dato de "63% downleveling" directamente en
Levels.fyi (solo de segunda mano vía underdog.io). Fuente:
[Levels.fyi Blog](https://www.levels.fyi/blog/) (resumen de búsqueda, no leído en
profundidad).

**Stack Overflow Developer Survey 2025**: no aporta porcentajes directos sobre
formatos de entrevista, pero sí datos de contexto relevantes para cómo se evalúa
el uso de IA: 84% de encuestados usa o planea usar IA en su desarrollo (vs 76% el
año anterior), 51% de developers profesionales usa IA a diario. El sentimiento
favorable bajó de 70% (2024) a 60% (2025); 46% reporta desconfianza frente a 33%
que confía. La queja más citada (66%) es lidiar con "soluciones de IA que están
casi bien, pero no del todo". Fuente:
[Stack Overflow Developer Survey 2025 - AI](https://survey.stackoverflow.co/2025/ai)
(resumen de búsqueda de artículos que citan la encuesta, no la encuesta original
leída directamente; pendiente lectura directa de survey.stackoverflow.co/2025/ai).

**GetManfred / InfoJobs (España)**: no encontré en GetManfred ni InfoJobs una
cifra de prevalencia de formatos de entrevista específica de España equivalente a
la de Karat. GetManfred documenta el contexto del mercado (8.580 empresas tech
activas en España en 2025, +22% interanual, 108.000 empleos directos; frase
repetida en comunidades tech: "Nunca había sido tan difícil tener entrevistas")
pero no desglosa formatos. InfoJobs (con Esade) reporta 76.858 vacantes en
informática/telecomunicaciones en 2025 con 51 inscritos por vacante, y describe
de forma genérica un proceso de 3 fases: screening RRHH, prueba técnica
(live coding o take-home), entrevista técnica final y cultural fit — sin cifras
de prevalencia por formato. Ambos datos son resumen de búsqueda, no leídos
directamente. Fuentes:
[GetManfred - Estado del sector tech 2026 Q1](https://www.getmanfred.com/en/blog/que-esta-pasando-en-tech-en-2026-despidos-y-contrataciones),
[nosotros.infojobs.net - Estado del mercado laboral 2025](https://nosotros.infojobs.net/la-oferta-de-empleo-en-infojobs-se-estabiliza-en-2025-con-casi-25-millones-de-vacantes-mientras-aumenta-la-demanda-de-trabajo/).
Leí directamente [GetManfred - Buscar empleo en tecnología en 2026](https://www.getmanfred.com/en/blog/buscar-empleo-en-tecnologia-en-2026)
y no contiene datos de fases/formato de entrevista, solo estrategia de búsqueda de
empleo (incluye la recomendación de "usa IA para practicar respuestas a
entrevistas").

**Plataformas de test automatizado (Codility, HackerRank, CodeSignal)**: no
encontré cifras de cuota de mercado 2025-2026 verificables. Lo que sí se puede
afirmar con fuente: CodeSignal y HackerRank son "las dos plataformas de
evaluación técnica más preseleccionadas para contratar ingenieros" según fuentes
comparativas de la propia industria (dato de marketing, sesgado, tratar con
cautela); en julio de 2026, CodeSignal tenía calificación 4.5/5 sobre ~1.408
reseñas y HackerRank 4.6/5 sobre 545 reseñas (plataforma de reseñas no
especificada con claridad en el resumen). Fuente:
[selecthub.com / hiretruffle.com comparativas 2026](https://www.hiretruffle.com/compare/codesignal-vs-hackerrank)
(resumen de búsqueda, no leído directamente; fuentes con incentivo comercial,
tratar como poco fiables).

### Resumen de formatos por lo observado en secciones 1 y 3-6

Con los datos de las secciones anteriores (consultoras y producto españolas,
grandes tech) más lo anterior, el patrón que emerge (sin ser una estadística
formal, es una síntesis cualitativa del research, marcada como tal —
**hipótesis, no confirmado con una única fuente cuantitativa española**):

- **Screening de RRHH**: presente en prácticamente todos los procesos vistos
  (consultoras, producto, big tech).
- **Test automatizado (OA)**: muy presente en big tech (Meta vía CodeSignal,
  Amazon y Microsoft vía HackerRank/Codility) y en algunas consultoras
  (Capgemini, Softtek); menos citado en producto español, que tiende más a
  take-home o code review directo.
- **Live coding**: formato dominante en big tech (2-3 rondas en Google, 1-2 en
  Meta) y presente en producto español (Typeform, Cabify).
- **Take-home / prueba práctica**: muy presente en producto español (Cabify,
  Typeform) y mencionado como "en alza" por Hired a nivel global.
- **System design**: presente desde nivel senior en big tech y producto español
  (Glovo, Cabify); ausente o raro en los relatos de consultoras y en roles
  junior.
- **Code review / pair programming**: formato explícito en Idealista (revisar un
  PR real) y en Typeform (pair programming con "casos reales del producto").
- **Entrevista con IA permitida**: emergente en 2025-2026, con Meta y Typeform
  como ejemplos confirmados de primera mano (ver sección 6); Karat cuantifica
  38% EE.UU. / 68% China de organizaciones que la permiten.
- **Comportamental**: presente en todos los procesos vistos, y según los
  resúmenes de Pragmatic Engineer ha crecido en peso (30-40% del tiempo total
  en grandes tech).

---

## 3. Diferencias por nivel

### Frameworks de carrera públicos (lo que se espera de cada nivel, no la entrevista en sí)

**progression.fyi** (leído directamente; verificado 2026-09-14): repositorio con
75 frameworks de carrera públicos de empresas tech, cubriendo ingeniería, diseño,
producto, datos y operaciones. Patrón general que resume el sitio: junior se
centra en aprendizaje técnico y ejecución de tareas concretas; mid demuestra
ownership de sistemas y empieza a mentorizar; senior lidera iniciativas complejas
y guía a otros; staff escala su influencia más allá de su rol individual. Fuente:
[progression.fyi](https://www.progression.fyi/).

**Dropbox, "Engineering Career Framework"** (resumen de búsqueda, no leído
directamente en dropbox.tech; verificado 2026-09-14): escala IC1 a IC7 (Software
Engineer 1-4, Staff, Principal, Senior Principal). Define "extent of influence"
explícitamente por nivel, por ejemplo: IC1 "trabajo dentro del alcance de mi
equipo con guía específica de mi manager"; IC3 "trabajo principalmente con mi
equipo directo y partners multifuncionales impulsando colaboración entre
equipos"; IC5 "influencio cada vez más los roadmaps de otros equipos de Dropbox
para lograr objetivos de negocio"; IC7 "influencio la estrategia departamental y
de toda la compañía". Fuente pública:
[Dropbox Engineering Career Framework](https://dropbox.github.io/dbx-career-framework/),
[dropbox.tech - versión actualizada](https://dropbox.tech/culture/our-updated-engineering-career-framework).

**Rent the Runway, "Engineering Ladder" (2015)** (resumen de búsqueda, no leído
directamente; verificado 2026-09-14): estableció 4 pilares que influyeron en
muchos ladders posteriores: "Technical Skill", "Get Stuff Done", "Impact",
"Communication & Leadership" (evaluados con una escala inspirada en stats de
D&D: Dex/Str/Wis/Cha). Track de IC: Level 1 Engineer -> Senior Engineer -> Senior
Staff Engineer -> Principal Engineer. Fuente:
[progression.fyi/f/rent-the-runway](https://progression.fyi/f/rent-the-runway).

**CircleCI, "Engineering Competency Matrix"** — leído directamente el blog de
CircleCI (verificado 2026-09-14): escala de 6 niveles E1-E6 (Associate Engineer,
Engineer, Senior Engineer, Staff Engineer, Senior Staff Engineer, Principal
Engineer), dividida en "Execution Levels" (E1-E3, foco en ejecutar trabajo: E1
dentro de una tarea, E2 dentro de un epic/proyecto, E3 dentro del equipo) y
"Scaling Levels" (E4-E6, foco en generar apalancamiento guiando a otros: E4
dentro del equipo y con stakeholders de negocio del equipo, E5 a través de varios
equipos, E6 a través de toda la organización). El crecimiento se define por
"expansión de impacto" y por mostrar las habilidades "more frequently — from
frequently to usually to generally". CircleCI explícitamente no asume que todos
deban aspirar a management: "muchos ingenieros son felices centrándose en
crecer como ingenieros". Fuente:
[CircleCI blog - Why we re-designed our engineering career paths](https://circleci.com/blog/why-we-re-designed-our-engineering-career-paths-at-circleci/),
matriz completa en [progression.fyi/f/circle-ci](https://progression.fyi/f/circle-ci).

**Medium, "Engineering Interviews: Grading Rubric"**: no se pudo leer
directamente (medium.engineering devuelve 403 a herramientas automatizadas y
Medium exige login incluso vía navegador). El dato que sí aparece en resúmenes de
búsqueda de terceros que citan ese artículo (resumen de búsqueda, no leído
directamente; verificado 2026-09-14): Medium usa un mismo problema que se puede
explorar a nivel superficial o profundo según el candidato, donde se espera que
los ingenieros senior vean casos límite y profundicen en zonas difíciles mientras
los junior luchan con los aspectos más simples. Medium también es citado (ver
progression.fyi) por su herramienta "Snowflake" que visualiza "múltiples caminos
hacia la seniority" según las fortalezas de cada ingeniero, en vez de un único
camino lineal. Fuente indirecta: menciones de terceros al artículo de Medium
Engineering (no confirmado con la fuente primaria).

**GitLab handbook** (parcialmente leído: la página índice del framework no
mostró el contenido detallado al hacer fetch directo, solo navegación; el resto
es resumen de búsqueda, verificado 2026-09-14): niveles Intern, Associate,
Intermediate, Senior, Staff, Senior Staff, Principal, Distinguished, Fellow. Para
un intern/apprentice: "está aprendiendo la base de código, herramientas, flujo de
desarrollo, prácticas de testing y expectativas operativas de la organización",
con trabajo acotado y revisado de cerca; el éxito significa "aprender rápido,
hacer preguntas útiles, responder a feedback, comunicar progreso y completar
tareas de tamaño apropiado". Para senior: se espera "comunicar con claridad y
efectividad, tanto escrita como verbalmente, al asesorar, fijar expectativas o
sugerir mejoras" y "entregar trabajo incluso con requisitos poco claros dentro
del contexto de su equipo". Para staff: "opera a nivel de equipo, sirviendo como
líder técnico de uno o más dominios de responsabilidad de su equipo", tomando
"decisiones responsables y evaluando trade-offs que impactan el dominio de su
equipo". Fuente:
[GitLab Handbook - Engineering Career Framework](https://handbook.gitlab.com/handbook/engineering/careers/matrix/)
(índice, contenido detallado de cada subpágina no verificado de primera mano por
límite de tiempo de esta sesión).

### Cómo se traduce esto en la entrevista (misma pregunta, distinta vara)

Con los datos recogidos (mezcla de fuentes leídas y resúmenes de búsqueda,
verificado 2026-09-14):

- **Coding/algoritmos**: en la misma pregunta, se espera que un candidato senior
  contemple escenarios fuera del "happy path", hable de tests unitarios para esos
  escenarios, y adapte su solución a requisitos cambiantes; un junior puede
  aprobar resolviendo solo el caso simple. También se documenta que los
  entrevistadores a veces usan **la misma pregunta explorable a nivel superficial
  o profundo**: el senior debe encontrar los casos límite y profundizar, el
  junior "lucha con los aspectos más simples" (ver rúbrica de Medium arriba).
  Fuente (resumen de búsqueda, no leído directamente):
  [startupfundraising.com - Interview Rubrics](https://startupfundraising.com/interview-rubrics).
- **System design**: en nivel senior, la entrevista de diseño de sistemas
  "enfatiza la articulación de trade-offs por encima de que la solución concreta
  sea correcta"; se espera de un senior mayor exposición a estructuras de datos
  especializadas que de un junior. Fuente (resumen de búsqueda, no leído
  directamente): mismo artículo de startupfundraising.com citado arriba. Esto es
  coherente con lo hallado en Pragmatic Engineer (sección 2): el system design
  hoy exige en niveles no-staff conocimientos "antes reservados a nivel staff"
  (geohashing, stream processing, windowing) — es decir, la vara general ha
  subido para todos los niveles, no solo para staff.
- **Amazon "Bar Raiser"**: entrevistador entrenado y ajeno al equipo que
  contrata, con veto sobre la decisión final, cuyo objetivo es mantener el
  estándar de contratación constante entre niveles y evitar que la presión por
  cubrir una vacante baje la vara. Los "bar raisers" en entrenamiento hacen
  shadowing en "múltiples ciclos de entrevista" cubriendo distintos niveles de
  rol y de fortaleza del candidato antes de operar solos. Fuente (resumen de
  búsqueda, no leído directamente; verificado 2026-09-14):
  [pin.com - Interviewer Shadowing Guide 2026](https://www.pin.com/blog/interviewer-shadowing-guide/).

### Lo que no encontré

No encontré una rúbrica pública que muestre, para una **misma pregunta técnica
concreta**, una tabla de puntuación literal lado a lado para junior/mid/senior/
staff (por ejemplo "3/5 en este criterio para mid, 4/5 para senior en la misma
respuesta"). Lo que existe públicamente son frameworks de progresión de carrera
(qué se espera de cada nivel en el día a día) y descripciones generales de cómo
cambia la vara en la entrevista, pero no encontré el documento interno de
scorecard con puntuaciones diferenciadas por nivel de ninguna de las empresas
investigadas (es información que las empresas no suelen publicar). Esto se
marca explícitamente como no encontrado, no como hipótesis.

---

## 4. Otros roles

Todo lo de esta sección es resumen de búsqueda (snippets), no lectura directa de
las páginas originales, salvo que se indique lo contrario. Verificado
2026-09-14.

### QA / Tester

Glassdoor reporta 46.252 preguntas de entrevista registradas bajo "QA tester" en
18.260 empresas (cifra agregada, no específica de España). Proceso típico: (1)
entrevista de RRHH sobre aspectos personales, (2) entrevista técnica sobre las
herramientas del puesto. Preguntas comunes: experiencia previa y proyectos,
tecnologías y nivel en cada una, resolución de problemas técnicos, trabajo en
equipo, gestión de presión, buenas prácticas de desarrollo, control de versiones
(Git), metodologías ágiles (Scrum). Temas básicos citados: STLC (Software
Testing Life Cycle), gestión de bugs, herramientas como Jira, diferencia entre
testing manual y automatización. Fuente:
[Glassdoor - preguntas QA Tester](https://www.glassdoor.com.mx/Entrevista/qa-tester-preguntas-entrevistas-SRCH_KO0,9.htm).
No encontré una rúbrica específica de cómo cambia la evaluación de QA entre
junior y senior (por ejemplo, automatización vs. testing manual como corte de
nivel) — dato no encontrado, no asumido.

### Product Owner

Glassdoor registra 7.237 preguntas/informes de entrevista para "Product Owner".
Preguntas típicas citadas: identificar al público objetivo y a las partes
interesadas externas para el desarrollo del producto, "¿Cómo mantienes informado
al equipo acerca de la situación del mercado y los productos?". Ejemplo con
detalle de fases: en Typeform el proceso de PO incluye entrevista con el equipo,
entrevista con el manager del equipo, y entrevista con uno de los cofundadores.
Otras empresas con volumen de reseñas relevante: Revolut (126 preguntas
registradas, 102 opiniones), Semrush (5 preguntas, 6 opiniones). Fuente:
[Glassdoor - preguntas Product Owner](https://www.glassdoor.es/Entrevista/product-owner-preguntas-de-entrevista-SRCH_KO0,13.htm),
[Glassdoor - Product Owner en Typeform](https://www.glassdoor.es/Entrevista/Typeform-Product-Owner-Preguntas-de-entrevista-EI_IE991912.0,8_KO9,22.htm).

### Scrum Master

Glassdoor registra 3.462 preguntas/informes para "Scrum master". Preguntas
citadas: "What is agile?", ceremonias y pasos del sprint, qué ocurre en la
retrospectiva, working agreements, "Valores, Pilares y la Regla 3-5-3" (formato
citado tal cual en el snippet, sin más contexto verificado), conceptos de Jira,
diferencias entre Kanban y Scrum/Agile. Proceso típico citado: 3 rondas a lo
largo de 3 semanas, evaluando habilidades interpersonales; en una ronda
posterior a veces se pide al candidato trabajar con un equipo Scrum real de la
empresa para observar la interacción. Fuente:
[Glassdoor - preguntas Scrum Master](https://www.glassdoor.es/Entrevista/scrum-master-preguntas-de-entrevista-SRCH_KO0,12.htm).

### Arquitecto de software

No encontré páginas de Glassdoor con detalle de proceso específicamente para
"software architect" con tanto detalle de fases como en los otros roles. Lo que
sí se documenta de forma consistente en varias fuentes de preparación
(resumen de búsqueda, no leído directamente): la entrevista de diseño de sistemas
para roles de arquitecto es una conversación de 45-60 minutos donde se diseña un
sistema desde cero a partir de un prompt abierto (ejemplos citados: "Design
Instagram", "Design a rate limiter"). Para 2026 se documentan tres cambios: la
vara de aprobación es más alta, han entrado en el loop general de ingeniería
preguntas de infraestructura de IA/LLM, y los entrevistadores ahora puntúan
explícitamente coste y operación (no solo diseño funcional). Categorías de
preguntas de 2026 citadas: infraestructura de IA/LLM, sistemas distribuidos
clásicos, sistemas sociales/tiempo real, entrega de medios y contenido, data
pipelines, comercio y transacciones, y diseño de API/bajo nivel. Framework
mencionado para estructurar la respuesta: RESHADED (clarificar el problema,
reunir requisitos funcionales y no funcionales, definir el alcance del sistema,
antes de dibujar diagramas). Fuente:
[tryexponent.com - System Design Interview Guide 2026](https://www.tryexponent.com/blog/system-design-interview-guide).
No encontré ejemplos reales citados con nombre de empresa española para el rol
específico de "arquitecto de software" — dato no encontrado.

### Engineering Manager (EM)

(Resumen de búsqueda, no leído directamente): loop típico de 4-6 fases a lo
largo de 2-4 semanas: recruiter screen, ronda comportamental con el hiring
manager, sesión técnica de system design, panel de liderazgo
multifuncional, y a veces una conversación final con un VP o ejecutivo. Proceso
completo: 4-8 semanas. La ronda "técnica" de un EM no es una prueba de coding:
"nadie espera que hagas un whiteboard de un BST balanceado", sino que se
verifica que el candidato "pueda cuestionar con preguntas específicas e
informadas" el diseño propuesto. Expectativa 2025-2026 añadida: se evalúa
también cómo el candidato entiende que los workflows con IA afectan la entrega
de software, las decisiones de staffing y la estrategia técnica a largo plazo.
Fuente:
[IGotAnOffer - Engineering Manager Interview Prep](https://igotanoffer.com/blogs/tech/engineering-manager-interview-prep),
[KORE1 - Engineering Manager Interview Questions 2026](https://www.kore1.com/engineering-manager-interview-questions/).
No encontré ejemplos de primera mano de procesos de EM en empresas españolas
específicas (ni por Glassdoor ni por blogs) — dato no encontrado.

---

## 5. Experiencias de primera mano en español

### Limitación importante encontrada

**Reddit está bloqueado para las herramientas de esta sesión.** Tanto WebFetch
como el navegador de esta sesión reciben error al intentar acceder a
reddit.com ("Claude Code is unable to fetch from www.reddit.com" y "reddit.com
is not allowed due to safety restrictions"). Los intentos de WebSearch con
`site:reddit.com` para r/devsarg, r/programacion, r/spain, r/es, r/SpainJobs y
r/cscareerquestionsEU no devolvieron snippets de Reddit utilizables (el buscador
no indexó o no priorizó esos hilos para las consultas probadas el
2026-09-14). Por tanto, **no pude cumplir el punto 5 en lo referente a Reddit**:
esto se declara explícitamente como no encontrado/no accesible, no se rellena
con suposiciones. Sí encontré contenido relevante vía TeamBlind (foro
alternativo, no bloqueado) para r/cscareerquestionsEU-adjacent content sobre
Glovo (ver sección 1.2).

### Forocoches — sí accesible (vía navegador, no vía WebFetch directo que da 403)

**Hilo "La Entrevista Técnica - [+GUÍA] - [+Programadores]"** (leído
directamente completo, incluyendo respuestas de usuarios; verificado
2026-09-14): hilo iniciado el 20-nov-2020 por el usuario "73nko", con
respuestas hasta 2023, 180+ respuestas de apoyo. Contenido técnico central:
clasifica las entrevistas técnicas en España en dos ejes — por forma
(conversación vs. prueba técnica) y dentro de prueba técnica: ejercicio en casa,
pair programming, whiteboard (incluye system design). Aporta una variante en
español de STAR: **S.A.R. (Situation, Action, Result)** — "describes la
situación... después explicas la forma en la que lo resolviste... por último
expones el resultado de tus acciones y el aprendizaje". Para whiteboard
recomienda "Notación Húngara" (prefijos de tipo en nombres de variable) porque
"al no tener en este caso un IDE que nos autocomplete el código... es más
aceptable cometer pequeños bugs o typos". Para pruebas en casa: "no reinventes
la rueda", usa siempre tests, "sé ordenado con git", añade README. Ejemplo de
pregunta de system design citada: "¿Sabrías cómo diseñar Twitter?".

Cita literal de un usuario ("Vrael", 21-nov-2020) sobre transparencia: *"Las
empresas valoran que los devs sean transparentes con el tema de los tiempos, es
mejor decir estoy atascado en esto y necesito ayuda a no decir nada y que no
llegues a tiempo."*

Cita literal muy directa sobre remuneración de pruebas técnicas (usuario
"Trinchador", 30-mar-2023): *"pero todo esto te lo pagan o corre a cuenta del
aspirante? porque vamos, yo ya alucino con los requisitos de verdad"* — y la
respuesta del autor original (73nko, mismo día): *"¡Qué te van a pagar! Una
mierda te pagan! Como mucho un café cuando es presencial!! Algunas te hacen
perder hasta dos días de trabajo, entre ronda de entrevistas, conocer al
equipo, al CEO y a su puta madre! Pero es como está el mercado."* Esta última
cita retrata bien una queja recurrente en el foro: procesos largos, no
remunerados, con múltiples rondas.

Nota temporal: este hilo es de 2020-2023, no de 2025-2026. Es válido como
experiencia de primera mano en español pero no refleja necesariamente cambios
recientes (IA en la entrevista, etc.) — se marca la fecha para que quede claro
que puede estar desactualizado en detalles específicos aunque la estructura
general (conversación/prueba técnica/pair/whiteboard) siga vigente según el
resto del research.

Fuente: [Forocoches - La Entrevista Técnica GUÍA Programadores](https://forocoches.com/foro/showthread.php?t=8293415).
No pude leer otros 2 hilos de Forocoches encontrados en la búsqueda
("Ayuda entrevista técnica programador Java", "Busco hilo entrevistas de
trabajo programadores") porque devolvieron 403 con WebFetch directo; no se
reintentó por navegador por límite de tiempo de esta sesión — declarado como no
verificado, no como hallazgo.

### Blogs y newsletters españoles

**webreactiva.substack.com, "La siguiente saldrá mejor"** (Daniel Primo, leído
directamente; verificado 2026-09-14): comenta un artículo de Rob Heaton (más de
400 entrevistas realizadas) sobre técnicas de entrevista. Recomienda "repite la
pregunta que te han hecho con tus propias palabras", narrar en voz alta el
proceso de resolución "como hacen los streamers", y propone un portafolio web
personal como forma de generar confianza previa a la entrevista. No menciona
empresas ni procesos concretos españoles — es contenido de consejo general.
Fuente: [webreactiva.substack.com](https://webreactiva.substack.com/p/la-siguiente-saldra-mejor).

**alexertech.substack.com, "Los ejercicios más comunes en las entrevistas
técnicas"** (leído directamente; verificado 2026-09-14): describe 2 fases
típicas (entrevista con reclutador + coding challenge) y remarca que la
dificultad del coding challenge varía mucho, "desde un código sencillo que
verifique palíndromos, hasta árboles de búsqueda que posean optimizaciones,
APIs completas con sus pruebas desarrolladas". Para posiciones senior el tiempo
del ejercicio puede ir de 30 minutos a varios días. No menciona empresas
específicas. Fuente: [alexertech.substack.com](https://alexertech.substack.com/p/los-ejercicios-mas-comunes-en-las).

**leonardopoza.substack.com, "Pruebas técnicas, procesos de selección"** (leído
directamente; verificado 2026-09-14): taxonomía clara de 5 tipos de prueba
técnica usadas en procesos de selección: (1) katas cortas de 2-3h sin límite de
tiempo fijo y con libertad de lenguaje, (2) pruebas exhaustivas de dedicación
importante ("comunes en empresas prestigiosas"), (3) live coding monitorizado
en tiempo real (el autor lo desaprueba explícitamente por generar ansiedad),
(4) conversación técnica sobre un proyecto personal del candidato, (5) pair
programming colaborativo mostrando código real de la empresa — esta última es
la que el autor considera "perfecta". Cita del autor: *"toda prueba, siempre
tiene que ser respetuosa con la persona que la realice"*. Propone que la
corrección incluya defender la solución con el equipo técnico. Fuente:
[leonardopoza.substack.com](https://leonardopoza.substack.com/p/pruebas-tecnicas-procesos-seleccion).

**midudev**: no encontré en esta sesión un artículo o hilo específico de
midudev sobre formatos/procesos de entrevista técnica (su contenido público es
mayoritariamente sobre JavaScript/framework y no sobre procesos de
contratación) — dato no encontrado, no se buscó exhaustivamente por límite de
tiempo.

**Blog de Manfred/GetManfred**: cubierto en la sección 2 (contexto de mercado);
no se encontró contenido first-person de candidatos con citas literales, solo
datos agregados de mercado.

### TeamBlind (foro alternativo, sí accesible)

**Glovo, Backend Engineer, España** (leído directamente; verificado
2026-09-14): un usuario responde sobre el proceso: *"the coding round is on
the easier side, two easy HashMap problems"*, seguido de una ronda de system
design de ~90 minutos dividida entre high-level design (HLD) y low-level
design (LLD), con un ejemplo real citado: diseñar "a city bike rental
service", seguido de "a full UML domain class diagram for the LLD". Fuente:
[teamblind.com - Glovo interview process, Spain](https://www.teamblind.com/post/glovo-interview-process-xpgvaylr).

**Amazon España, SDE-2** (resumen de búsqueda de hilos de TeamBlind, no leído
directamente cada hilo completo; verificado 2026-09-14): un candidato reportó
pasar por OA, screening técnico y 4 rondas tradicionales de Algo, DS, HLD y LLD
para un puesto en España, aunque el puesto se cerró y la entrevista se canceló.
Otro candidato reportó "ghosting" tras aprobar la OA con Amazon España: el
reclutador programó 2 entrevistas, las reprogramó y luego dejó de responder.
Fuente: resultados de búsqueda con enlaces a hilos de
[teamblind.com](https://www.teamblind.com/) (títulos: "amazon interview
process cancelled", "impossible to be interviewed at big tech in europe") — no
leídos de primera mano en esta sesión, solo vistos como snippet de búsqueda.

---

## 6. Uso de IA al programar

### Empresas que exigen o permiten IA explícitamente en la entrevista (2025-2026)

**Canva** — fuente primaria leída directamente (blog oficial de ingeniería,
verificado 2026-09-14): en junio de 2025 Canva sustituyó su ronda tradicional
"Computer Science Fundamentals" por una nueva ronda llamada "AI-Assisted
Coding", obligatoria para candidatos de backend, frontend y machine learning.
Cita literal del título del post: *"Yes, you can use AI in our interviews. In
fact, we insist"*. Justificación citada: *"casi la mitad de nuestros
ingenieros frontend y backend son usuarios activos diarios de herramientas de
codificación asistida por IA"*, por lo que el proceso de selección "debe
reflejar la realidad laboral". Herramientas explícitamente permitidas: Copilot,
Cursor y Claude (el candidato usa "sus herramientas de IA preferidas"). Lo que
se evalúa, en preguntas literales del propio post: *"¿Entienden cuándo y cómo
aprovechar la IA de manera efectiva?"*, *"¿Pueden identificar y corregir
problemas en código generado por IA?"*, *"¿Pueden garantizar que las
soluciones asistidas por IA cumplan estándares de producción?"*. Se valoran
"preguntas aclaratorias reflexivas sobre requisitos" y usar la IA
"estratégicamente" manteniendo control general del problema. Ejemplo de
desafío real citado: "construir un sistema de control para despegues y
aterrizajes aeroportuarios", deliberadamente complejo para que no se resuelva
con un único prompt. Fuente:
[Canva Engineering Blog - Yes, you can use AI in our interviews](https://www.canva.dev/blog/engineering/yes-you-can-use-ai-in-our-interviews/).
Corroborado por prensa independiente:
[The Register - Canva now requires use of AI](https://www.theregister.com/2025/06/11/canva_coding_assistant_job_interviews/).

**Google**: ver detalle completo en sección 1.4. Resumen: piloto desde mayo de
2026 para roles junior/mid-level de SWE en EE.UU., ronda de "code
comprehension" de 60 min con Gemini como asistente, evaluando ingeniería de
prompts, validación de resultados y depuración.

**Meta**: ver detalle en sección 1.4. Ronda de coding con IA habilitada desde
octubre de 2025, piloto que se espera extender a roles de backend/ops en 2026.
Dato adicional (resumen de búsqueda, no leído directamente; verificado
2026-09-14): Meta ofrece al candidato elegir entre varios modelos de IA durante
la entrevista, incluyendo GPT, Claude Sonnet, Claude Haiku, Gemini y Llama, y
evalúa 4 criterios: resolución de problemas, calidad de código, verificación y
comunicación. Fuente:
[finalroundai.com - Companies That Allow AI During Interviews 2026](https://www.finalroundai.com/blog/companies-that-allow-ai-during-interviews)
(no verificado de primera mano en fuente oficial de Meta).

**Typeform**: ver detalle en sección 1.2. Confirmado de primera mano (vía
jointaro.com, candidato real): ronda técnica de 1.5h consistente en "crear una
aplicación utilizando tecnología de inteligencia artificial" como caso de uso
real de producto.

**Otras empresas citadas con IA permitida o exigida en al menos una ronda
técnica** (resumen de búsqueda, no leído directamente en fuente oficial de cada
una; verificado 2026-09-14): Shopify (Cursor o GitHub Copilot, en una ronda
donde el candidato construye una feature completa "from scratch" en su propio
IDE, evaluando decisiones arquitectónicas y verificación de código), Rippling
(IA permitida en rondas técnicas generales, herramienta no especificada),
Coinbase ("trata la fluidez con IA como señal positiva" en rondas técnicas),
Red Hat (permite IA con herramientas open-source en entrevistas técnicas).
Fuente:
[finalroundai.com - Companies That Allow AI During Interviews 2026](https://www.finalroundai.com/blog/companies-that-allow-ai-during-interviews).
Observación del propio artículo, relevante como patrón: *"None of them have
said 'use whatever you want, whenever you want'"* — es decir, todas las
políticas encontradas son específicas por ronda y herramienta, no un permiso
abierto.

### Empresas españolas y uso de IA en la entrevista

No encontré ninguna consultora ni empresa producto española (de las 11
investigadas en la sección 1) con una política pública y explícita equivalente
a la de Canva o Google sobre IA en la entrevista, **con la excepción de
Typeform** (ver arriba), que ya en 2025 pedía construir algo "usando IA" como
parte del ejercicio técnico. Para el resto (Cabify, Glovo, Wallapop, Idealista,
Factorial, Accenture, Capgemini, NTT Data, Indra, Softtek) no encontré mención
de política de IA en la entrevista en las fuentes revisadas — dato no
encontrado, no asumido. Tampoco encontré una normativa o recomendación
sectorial española específica sobre IA en procesos de selección más allá de la
obligación genérica del AI Act (desde agosto de 2026, las empresas necesitan
una política de uso de IA que declare qué herramientas están autorizadas, para
qué fines y con qué restricciones) citada de forma genérica por medios
españoles, sin relación directa con entrevistas de trabajo. Fuente (resumen de
búsqueda, no leído directamente): [adaptacion-rgpd.eu sobre AI Act](https://www.adaptacion-rgpd.eu/chatgpt-copilot-obliga-a-cumplir-el-ai-act/).

### Cómo se evalúa el uso de IA (síntesis transversal)

De todas las fuentes anteriores (Canva, Google, Meta, Karat — ver sección 2),
emerge un patrón consistente sobre qué se evalúa cuando se permite IA en la
entrevista, independientemente de la empresa:

1. **Ingeniería de prompts / uso estratégico**: si el candidato sabe pedir lo
   que necesita y en qué momento recurrir a la IA en vez de resolver a mano.
2. **Validación y detección de errores**: si el candidato identifica cuándo el
   código generado por la IA es incorrecto, inseguro o no óptimo, en vez de
   aceptarlo sin más.
3. **Control del problema**: si el candidato mantiene la propiedad de las
   decisiones de diseño y no delega el criterio técnico a la IA.
4. **Comunicación del razonamiento**: explicar en voz alta por qué se acepta,
   rechaza o modifica una sugerencia de la IA.
5. **Estándares de producción**: si el resultado final (asistido por IA)
   cumpliría los estándares de calidad esperados igualmente.

Esto es coherente con el cambio de enfoque que describe Karat (sección 2): "la
evaluación ha pasado de '¿puedes escribir código correcto de memoria?' a '¿puedes
trabajar con IA bajo presión, validar resultados, detectar errores en código
sugerido por la IA, y explicar el razonamiento detrás del enfoque elegido?'".

### Detección de trampas con IA cuando NO está permitida

Ver también sección 2: underdog.io (leído directamente) cita que "los
entrevistadores de Amazon detectan al 50% de los candidatos que usan
herramientas de IA durante los tests" y que plataformas como CoderPad usan
compartir pantalla en vivo para marcar ~20% de sospechas de trampa — cifras sin
metodología visible, tratar con cautela. Pragmatic Engineer (sección 2, leído
indirectamente vía resumen) documenta que las rondas presenciales subieron de
24% (2022) a 38% (2025) específicamente por la preocupación de hacer trampa con
IA en remoto.

---

## Incertidumbres

Lista explícita de lo que quedó sin verificar, y por qué.

1. **Glassdoor bloqueado por CAPTCHA.** No pude leer ninguna página de Glassdoor
   de primera mano: tanto WebFetch (HTTP 403) como el navegador (reto Cloudflare
   "Verifique que es un ser humano") fueron bloqueados, y no completé el
   CAPTCHA porque está prohibido por las reglas de esta sesión. Esto afecta a
   **todas** las citas de Glassdoor en secciones 1.1, 1.2, 1.4 y 4: son
   resúmenes generados por el buscador a partir del contenido indexado de esas
   páginas, no lectura directa. El buscador puede resumir mal, mezclar reseñas
   de distintas fechas/roles, o presentar datos desactualizados. Recomendación
   para quien continúe este research: usar una sesión de navegador con cookies
   de una cuenta de Glassdoor logueada, o pagar acceso a un servicio que
   indexe Glassdoor sin CAPTCHA.
2. **Reddit completamente inaccesible.** Tanto WebFetch como el navegador de
   esta sesión rechazan reddit.com y old.reddit.com por restricciones de
   seguridad de la propia herramienta (no es un bloqueo de Reddit, es un
   bloqueo del lado de las herramientas de esta sesión). No pude cumplir la
   parte del encargo que pedía extraer hilos de r/devsarg, r/programacion,
   r/spain, r/es, r/SpainJobs, r/cscareerquestionsEU. Recomendación: repetir
   esta búsqueda con una herramienta que sí tenga acceso a Reddit (la API
   oficial de Reddit, o una sesión de navegador sin esa restricción).
3. **Forocoches**: solo pude leer 1 de 3 hilos relevantes encontrados (los
   otros 2 dieron 403 con WebFetch directo y no reintenté por navegador por
   límite de tiempo). El hilo leído es de 2020-2023, no reciente.
4. **Medium Engineering, GitLab handbook (subpáginas), Google careers
   (subpáginas de "how-we-hire")**: bloqueados o sin contenido cargado al
   hacer fetch directo (Medium exige login incluso vía navegador; GitLab y
   Google devolvieron solo navegación sin el contenido de la subpágina). Lo
   citado de estas 3 fuentes es de segunda mano (snippets de búsqueda que citan
   esas páginas).
5. **Cifras sueltas sin metodología visible**: varias cifras concretas (63% de
   downleveling de Levels.fyi vía underdog.io, "Amazon detecta al 50% de
   tramposos con IA", "CoderPad marca 20% de sospechas") provienen de un único
   artículo de blog (underdog.io) sin que se pudiera verificar la fuente
   primaria ni la metodología. Se citan con la advertencia explícita de "sin
   metodología visible, tratar con cautela" en el cuerpo del documento.
6. **No hay dato específico de España para prevalencia de formatos.** La única
   fuente cuantitativa sólida sobre prevalencia de formatos (Karat) solo cubre
   EE.UU. y China. No encontré una encuesta equivalente para España con
   porcentajes de uso de cada formato (live coding %, take-home %, OA %, etc.).
   GetManfred e InfoJobs documentan el mercado laboral en general pero no
   desglosan formatos de entrevista.
7. **Startups españolas pequeñas (1.3)**: sin relatos de primera mano
   verificables de una startup española concreta de menos de 50 empleados.
8. **Sitios de preparación de pago citados sin verificación cruzada
   suficiente** (TechPrep, Levelop, claveprep.com, jobright.ai, finalroundai.com,
   etc.): son la fuente de mucho del detalle de Google/Meta/Microsoft/Amazon en
   la sección 1.4 y de la lista de empresas con IA permitida en la sección 6.
   Tienen incentivo comercial (venden preparación de entrevistas) y pueden
   exagerar o generalizar detalles específicos (ej. "90 minutos", "4 etapas
   progresivas" para la OA de Meta) que no se pudieron contrastar con una
   fuente oficial de la empresa. Se marcaron como "no verificado de primera
   mano" en cada caso, pero se recomienda tratarlos con más escepticismo que
   las fuentes primarias (declaraciones oficiales de Canva, Amazon, Google).
9. **Stack Overflow Developer Survey 2025**: no se leyó directamente
   survey.stackoverflow.co/2025/ai por límite de tiempo; los datos citados
   vienen de artículos de terceros que citan la encuesta.
10. **Rúbricas de puntuación diferenciadas por nivel para una misma pregunta**:
    confirmado como no encontrado (ver sección 3, "Lo que no encontré") — no es
    una incertidumbre de acceso sino una ausencia real de información pública
    de este tipo, según lo que se pudo verificar en esta sesión.
11. **midudev**: no se investigó en profundidad por límite de tiempo; puede
    existir contenido relevante no cubierto por las búsquedas realizadas.
12. **Consultoras**: solo se investigaron 5 de las nombradas explícitamente
    (Accenture, Capgemini, NTT Data, Indra, Softtek); todas con datos de
    segunda mano vía Glassdoor. Ninguna fuente oficial de la propia consultora
    sobre su proceso técnico fue leída directamente (solo la página de ofertas
    de Indra, que no detalla el proceso técnico en profundidad).

---

## Fuentes

Todas verificadas el 2026-09-14 salvo que se indique otra fecha en el cuerpo
del documento. "(L)" = leída directamente (WebFetch o navegador). "(B)" =
solo resumen de búsqueda / snippet, no leída directamente.

### Sección 1.1 — Consultoras españolas

- (B) [Glassdoor - Accenture Programador Junior](https://www.glassdoor.es/Entrevista/Accenture-Programador-Junior-Preguntas-de-entrevista-EI_IE4138.0,9_KO10,28.htm)
- (B) [club-mba.com - Proceso de selección en Accenture](https://www.club-mba.com/empleo/procesos-de-seleccion/accenture/)
- (B) [Glassdoor - Capgemini Engineering Software Developer](https://www.glassdoor.es/Entrevista/Capgemini-Engineering-Software-Developer-Preguntas-de-entrevista-EI_IE28187.0,21_KO22,40.htm)
- (B) [Glassdoor - NTT DATA Programador Júnior](https://www.glassdoor.com/Interview/NTT-DATA-Programador-J%C3%BAnior-Interview-Questions-EI_IE7649.0,8_KO9,27.htm)
- (B) [Glassdoor - Indra Interview Experience](https://www.glassdoor.com/Interview/Indra-Interview-Questions-E9757.htm)
- (L) [Indra Group - oferta Desarrollador/a Junior Java](https://careers.indragroup.com/job/Madrid-Desarrolladora-Junior-Java-MD/978237755/)
- (B) [Glassdoor - Softtek Interview Experience](https://www.glassdoor.com/Interview/Softtek-Interview-Questions-E108072.htm)

### Sección 1.2 — Empresas producto españolas

- (B) [Glassdoor - Cabify Software Engineer](https://www.glassdoor.com/Interview/Cabify-Software-Engineer-Interview-Questions-EI_IE975202.0,6_KO7,24.htm)
- (B) [Glassdoor - Glovo Software Engineer](https://www.glassdoor.com/Interview/Glovo-Software-Engineer-Interview-Questions-EI_IE3424586.0,5_KO6,23.htm)
- (B) [Glassdoor - Glovo Backend Engineer](https://www.glassdoor.com/Interview/Glovo-Backend-Engineer-Interview-Questions-EI_IE3424586.0,5_KO6,22.htm)
- (B) [Glassdoor - Wallapop Interview Experience](https://www.glassdoor.com/Interview/Wallapop-Interview-Questions-E1099265.htm)
- (B) [Glassdoor - Idealista.com Interview Experience](https://www.glassdoor.com/Interview/Idealista-com-Interview-Questions-E927735.htm)
- (B) [Glassdoor - Factorial Senior Software Engineer](https://www.glassdoor.com/Interview/Factorial-Senior-Software-Engineer-Interview-Questions-EI_IE1618672.0,9_KO10,34.htm)
- (L) [jointaro.com - Typeform SWE interview Barcelona](https://www.jointaro.com/interviews/companies/typeform/experiences/software-engineer-barcelona-may-1-2025-accepted-offer-positive-094e19e0/)
- (B) [Glassdoor - Typeform Software Engineer](https://www.glassdoor.com/Interview/Typeform-Software-Engineer-Interview-Questions-EI_IE991912.0,8_KO9,26.htm)

### Sección 1.3 — Startups

- (L) [alcaparra.co - guía entrevista técnica junior 2026](https://www.alcaparra.co/blog/guia-preparacion-entrevista-tecnica-desarrollador-junior)

### Sección 1.4 — Grandes tech

- (B) [TechPrep - Google's Interview Process 2026](https://www.techprep.app/blog/google-interview-process)
- (B) [Levelop - Software Engineer Interview Process 2026](https://levelop.dev/blog/the-complete-software-engineer-interview-process-in-2026-what-to-expect-at-every)
- (L) [The HR Digest - Google embraces new era of hiring](https://www.thehrdigest.com/using-ai-assistants-during-job-interviews-google-embraces-a-new-era-of-hiring/)
- (B) [Kashmir Reader - Google's VP on AI-era interviews](https://kashmirreader.com/2026/05/17/were-evolving-our-interview-processes-to-recruit-best-talent-in-ai-era-googles-vp/)
- (B) [Entrepreneur - Google Is Testing a Transformative New Interview Rule](https://www.entrepreneur.com/business-news/google-is-testing-a-new-rule-transform-job-interviews)
- (B) [claveprep.com - Meta Interview Process 2026](https://claveprep.com/blog/meta-interview-process-2026-guide)
- (L) [Amazon Jobs - Software Development Interview Topics](https://www.amazon.jobs/content/en/how-we-hire/interview-prep/software-development-topics)
- (B) [TechPrep - Amazon's Interview Process 2026](https://www.techprep.app/blog/amazon-interview-process)
- (B) [jobright.ai - The Ultimate Microsoft Interview Guide 2026](https://jobright.ai/blog/the-ultimate-microsoft-interview-guide-2026-from-process-breakdown-to-securing-the-offer/)
- (L, sin contenido útil) [Google Careers - how-we-hire/interview](https://www.google.com/about/careers/applications/how-we-hire/interview/)

### Sección 2 — Formatos y prevalencia

- (L) [Karat - Engineering Interview Trends 2026](https://karat.com/engineering-interview-trends-2026/)
- (B) [underdog.io citando Hired - State of Software Engineers](https://underdog.io/blog/reality-of-tech-interviews-2025)
- (L) [Pragmatic Engineer - The Reality of Tech Interviews in 2025](https://newsletter.pragmaticengineer.com/p/the-reality-of-tech-interviews)
- (L) [underdog.io - The Reality of Tech Interviews 2025](https://underdog.io/blog/reality-of-tech-interviews-2025)
- (B) [Levels.fyi Blog](https://www.levels.fyi/blog/)
- (B) [Stack Overflow Developer Survey 2025 - AI](https://survey.stackoverflow.co/2025/ai)
- (B) [GetManfred - Estado del sector tech 2026 Q1](https://www.getmanfred.com/en/blog/que-esta-pasando-en-tech-en-2026-despidos-y-contrataciones)
- (B) [nosotros.infojobs.net - Estado del mercado laboral 2025](https://nosotros.infojobs.net/la-oferta-de-empleo-en-infojobs-se-estabiliza-en-2025-con-casi-25-millones-de-vacantes-mientras-aumenta-la-demanda-de-trabajo/)
- (L, sin datos de entrevista) [GetManfred - Buscar empleo en tecnología en 2026](https://www.getmanfred.com/en/blog/buscar-empleo-en-tecnologia-en-2026)
- (B) [hiretruffle.com - CodeSignal vs HackerRank 2026](https://www.hiretruffle.com/compare/codesignal-vs-hackerrank)

### Sección 3 — Diferencias por nivel

- (L) [progression.fyi](https://www.progression.fyi/)
- (B) [Dropbox Engineering Career Framework](https://dropbox.github.io/dbx-career-framework/)
- (B) [dropbox.tech - versión actualizada del framework](https://dropbox.tech/culture/our-updated-engineering-career-framework)
- (B) [progression.fyi/f/rent-the-runway](https://progression.fyi/f/rent-the-runway)
- (L) [CircleCI blog - Why we re-designed our engineering career paths](https://circleci.com/blog/why-we-re-designed-our-engineering-career-paths-at-circleci/)
- (B) [progression.fyi/f/circle-ci](https://progression.fyi/f/circle-ci)
- (B) [startupfundraising.com - Interview Rubrics](https://startupfundraising.com/interview-rubrics)
- (L, parcial) [GitLab Handbook - Engineering Career Framework](https://handbook.gitlab.com/handbook/engineering/careers/matrix/)
- (B) [pin.com - Interviewer Shadowing Guide 2026](https://www.pin.com/blog/interviewer-shadowing-guide/)
- No accesible (403 / login): medium.engineering - Engineering Interviews Grading Rubric

### Sección 4 — Otros roles

- (B) [Glassdoor - preguntas QA Tester](https://www.glassdoor.com.mx/Entrevista/qa-tester-preguntas-entrevistas-SRCH_KO0,9.htm)
- (B) [Glassdoor - preguntas Product Owner](https://www.glassdoor.es/Entrevista/product-owner-preguntas-de-entrevista-SRCH_KO0,13.htm)
- (B) [Glassdoor - Product Owner en Typeform](https://www.glassdoor.es/Entrevista/Typeform-Product-Owner-Preguntas-de-entrevista-EI_IE991912.0,8_KO9,22.htm)
- (B) [Glassdoor - preguntas Scrum Master](https://www.glassdoor.es/Entrevista/scrum-master-preguntas-de-entrevista-SRCH_KO0,12.htm)
- (B) [tryexponent.com - System Design Interview Guide 2026](https://www.tryexponent.com/blog/system-design-interview-guide)
- (B) [IGotAnOffer - Engineering Manager Interview Prep](https://igotanoffer.com/blogs/tech/engineering-manager-interview-prep)
- (B) [KORE1 - Engineering Manager Interview Questions 2026](https://www.kore1.com/engineering-manager-interview-questions/)

### Sección 5 — Experiencias de primera mano en español

- (L) [Forocoches - La Entrevista Técnica GUÍA Programadores](https://forocoches.com/foro/showthread.php?t=8293415)
- (L) [webreactiva.substack.com - La siguiente saldrá mejor](https://webreactiva.substack.com/p/la-siguiente-saldra-mejor)
- (L) [alexertech.substack.com - Los ejercicios más comunes en las entrevistas técnicas](https://alexertech.substack.com/p/los-ejercicios-mas-comunes-en-las)
- (L) [leonardopoza.substack.com - Pruebas técnicas, procesos de selección](https://leonardopoza.substack.com/p/pruebas-tecnicas-procesos-seleccion)
- (L) [teamblind.com - Glovo interview process, Spain](https://www.teamblind.com/post/glovo-interview-process-xpgvaylr)
- (B) hilos de teamblind.com sobre Amazon España (títulos: "amazon interview process cancelled", "impossible to be interviewed at big tech in europe")
- No accesible: reddit.com (todas las subcomunidades pedidas), old.reddit.com
- No accesible (403): forocoches.com hilos "Ayuda entrevista técnica programador Java" (t=5612543), "Busco hilo entrevistas de trabajo programadores" (t=6782424)

### Sección 6 — Uso de IA

- (L) [Canva Engineering Blog - Yes, you can use AI in our interviews](https://www.canva.dev/blog/engineering/yes-you-can-use-ai-in-our-interviews/)
- (B) [The Register - Canva now requires use of AI](https://www.theregister.com/2025/06/11/canva_coding_assistant_job_interviews/)
- (B) [finalroundai.com - Companies That Allow AI During Interviews 2026](https://www.finalroundai.com/blog/companies-that-allow-ai-during-interviews)
- (B) [adaptacion-rgpd.eu - AI Act y ChatGPT/Copilot en empresas](https://www.adaptacion-rgpd.eu/chatgpt-copilot-obliga-a-cumplir-el-ai-act/)
