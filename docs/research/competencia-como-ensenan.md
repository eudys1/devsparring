# Cómo enseñan (y no solo examinan) las plataformas del nicho

Fecha de la investigación: 19-09-2026.

**Objetivo**: Devsparring tiene 377 preguntas cuyo problema es que suenan a
EXAMEN ("¿que es X?") y no a ENTREVISTA REAL. Este informe mira que hacen las
plataformas del mismo nicho (banco de preguntas + practica de entrevistas
tecnicas) para que la gente APRENDA en vez de solo examinarse, y como son de
verdad las preguntas de entrevista tecnica en 2025-2026, para poder imitar el
estilo. Todas las afirmaciones llevan URL y fecha de consulta; lo que no se
encontro se dice explicitamente en la seccion final.

**Metodo**: busqueda web (WebSearch) y lectura de paginas concretas
(WebFetch) sobre cada plataforma y sobre relatos de entrevistas reales.
Cuando una caracterizacion viene solo del resumen de busqueda y no de leer la
pagina completa, se declara. Glassdoor y Reddit bloquean lectura automatizada
(403 / captcha conocidos de antemano, ver CLAUDE.md del proyecto); si ocurre,
se anota aqui y se busca la info por otra via, sin insistir.

## Indice

1. [LeetCode](#leetcode)
2. [Exercism](#exercism)
3. [Educative](#educative)
4. [interviewing.io](#interviewingio)
5. [Pramp](#pramp)
6. [AlgoExpert](#algoexpert)
7. [Codewars](#codewars)
8. [HackerRank](#hackerrank)
9. [Otras plataformas relevantes](#otras-plataformas-relevantes)
10. [Repositorios y guias en espanol](#repositorios-y-guias-en-espanol)
11. [Como son las preguntas de entrevista tecnica de verdad (2025-2026)](#como-son-las-preguntas-de-entrevista-tecnica-de-verdad-2025-2026)
12. [Tabla final: que copiar y que no para Devsparring](#tabla-final-que-copiar-y-que-no-para-devsparring)
13. [Lo que no se encontro](#lo-que-no-se-encontro)

---

## LeetCode

**Nota de metodo**: `leetcode.com/faq/` devolvio 403 a la lectura automatizada
(bloqueo de bots), asi que esta seccion se basa en resumenes de busqueda web
(WebSearch) sobre articulos de terceros y repos de GitHub, no en lectura
directa de primera mano de las paginas de LeetCode. Declarado segun la regla
de research-citado.

**1. Como presenta un ejercicio**: enunciado de problema (a menudo con una
envoltura de "historia" minima, ej. "Given an array of integers nums...")
mas firma de funcion, restricciones y casos de ejemplo con
entrada/salida. No es una pregunta de definicion tipo examen ("que es X"),
es un problema a resolver con codigo que se ejecuta contra tests ocultos.
Fuente: caracterizacion agregada de multiples articulos, ver enlaces abajo
(consultado 19-09-2026, via resumen de busqueda, no verificado leyendo
leetcode.com directamente por el bloqueo 403).

**2. Que hace despues de fallar**: sistema de pistas progresivas (2-3 hints
que dan un empujon conceptual antes de la solucion completa), una pestana de
"Editorial" con la solucion oficial explicada, y una pestana de "Discussion"
con soluciones y explicaciones de otros usuarios. La recomendacion de la
comunidad (no de LeetCode oficialmente) es intentar con un timer de ~20
minutos antes de mirar pistas, y si se mira la solucion, cerrarla e
implementarla de memoria, y reintentar el mismo problema 2-3 dias despues
para comprobar si el patron se quedo. Fuente:
[Addicted to Hints? How to Solve LeetCode Without Help](https://dev.to/alex_hunter_44f4c9ed6671e/addicted-to-hints-how-to-solve-leetcode-without-help-2fpd)
(consultado 19-09-2026, via resumen de busqueda).

**3. Opcion multiple**: LeetCode es fundamentalmente un editor de codigo con
tests, no un banco de preguntas de opcion multiple. No se encontro evidencia
de que use MCQ como formato principal (si existe algo tipo quiz en secciones
"Explore" no aparecio en la busqueda). Marcado como "no encontrado" para el
detalle de opciones incorrectas y feedback de MCQ.

**4. De donde salen las preguntas**: la funcionalidad Premium de "company
tags" es la pieza mas relevante: no son preguntas filtradas de una entrevista
real, sino que son etiquetas crowdsourced. Cuando alguien entrevista en una
empresa, reporta voluntariamente que preguntas le hicieron, y LeetCode agrega
esos reportes en una etiqueta ("Asked at Google", con ventana de recencia:
ultimos 6 meses, 1 ano, 2 anos, y una barra de frecuencia). Es una senal
probabilistica que decae con el tiempo: una pregunta usada hace dos anos
puede haberse retirado porque demasiados candidatos llegaron con la
respuesta memorizada. Fuente (via resumen de busqueda, no verificado
leyendo leetcode.com):
[LeetCode Premium Company Tags: Most People Use Them Wrong](https://dev.to/alex_hunter_44f4c9ed6671e/leetcode-premium-company-tags-most-people-use-them-wrong-1blg)
(consultado 19-09-2026). Por otro lado, se estima (fuente de calidad no
verificada, posible blog generado con ayuda de IA:
[LeetCode vs Real Interview Questions](https://prachub.com/resources/leetcode-vs-real-interview-questions-what-gets-asked-2026),
consultado 19-09-2026) que en empresas FAANG un 60-80% de los problemas de
DSA en entrevista son "estilo LeetCode" o problemas exactos, con Amazon y
Microsoft repitiendo problemas exactos con mas frecuencia, Google prefiriendo
variantes, y Meta en un punto intermedio (problemas estilo LeetCode con
modificaciones). Esta cifra no se pudo verificar contra una fuente primaria
y se marca como dato de baja confianza.

**5. Por que dicen que funciona su metodo**: no se encontro una declaracion
oficial de LeetCode (blog corporativo o pagina "about") sobre la pedagogia
detras de pistas/editorial/discussion; lo que hay en la busqueda son
recomendaciones de terceros sobre como USAR bien la plataforma (practica
espaciada, timer de 20 min, no leer la solucion sin intentarlo antes), no
una afirmacion de LeetCode mismo. Marcado como "no encontrado" en fuente
oficial.

Fuentes de esta seccion (todas via resumen de busqueda, consultado
19-09-2026):
- https://dev.to/alex_hunter_44f4c9ed6671e/addicted-to-hints-how-to-solve-leetcode-without-help-2fpd
- https://dev.to/alex_hunter_44f4c9ed6671e/leetcode-premium-company-tags-most-people-use-them-wrong-1blg
- https://prachub.com/resources/leetcode-vs-real-interview-questions-what-gets-asked-2026 (calidad no verificada)
- https://leetcode.com/faq/ (403 al intentar leer directamente)

---

## Exercism

**Nota de metodo**: `exercism.org` bloqueo la lectura directa (403) en varias
URLs (`/about`, `/docs/using/editions/research`); esta seccion combina
resumenes de busqueda con una lectura directa exitosa de un fichero en
GitHub (`exercism/docs`), que si es accesible. Se declara en cada punto.

**1. Como presenta un ejercicio**: Exercism NO es principalmente una
plataforma de preparacion de entrevistas, es una plataforma de aprendizaje de
lenguajes. Tiene dos tipos de ejercicio: "Concept Exercises" (ensenan un
concepto concreto del lenguaje, con un `introduction.md` explicativo antes de
programar) y "Practice Exercises" (un problema a resolver con tests, estilo
mas parecido a un kata). Fuente:
[Concept Exercises](https://exercism.org/docs/building/tracks/concept-exercises)
y [Practice Exercises](https://exercism.org/docs/building/tracks/practice-exercises)
(via resumen de busqueda, consultado 19-09-2026). Un dato explicito
encontrado: Exercism se posiciona como alternativa a "otras plataformas de
practica online centradas solo en preparacion de entrevistas", es decir, se
diferencia deliberadamente de LeetCode/HackerRank. Fuente (via resumen de
busqueda): resultado de busqueda sobre "not interview prep", 19-09-2026.

**2. Que hace despues de fallar (o de acertar)**: el mecanismo central es
mentoria HUMANA voluntaria, no automatica: el estudiante pide "Request
mentoring" y un mentor voluntario da feedback sobre su solucion concreta. La
regla explicita para los mentores es que "el trabajo de un mentor no es
'corregir' (mark) la tarea, es usar la solucion del estudiante como base para
destapar ideas que no conoce o con las que lucha"; el objetivo NO es que el
estudiante llegue a la solucion optima, es que APRENDA algo nuevo. Ademas
existe el "exemplar": una solucion de referencia que el mentor conoce, pero
que solo debe usar para guiar al nivel de conceptos que el estudiante ya ha
visto en su itinerario (no abrumar con conceptos futuros). Fuente:
[Guide to being mentored](https://exercism.org/docs/using/feedback/guide-to-being-mentored)
y [Choosing a solution to mentor](https://exercism.org/docs/mentoring/choosing-a-solution)
(via resumen de busqueda, consultado 19-09-2026). Ademas del mentor humano,
tras enviar una solucion el estudiante puede "aprender escuchando" (feedback
recibido), "aprender leyendo codigo" (ver soluciones de otros) y "aprender
compartiendo" (dar feedback a otros). Fuente:
[opensource.com, A Tour of Exercism / Improve your programming skills with Exercism](https://opensource.com/article/17/1/exercism-learning-programming)
(via resumen de busqueda, consultado 19-09-2026). Tambien existen los
"Approaches": documentos que muestran distintas formas validas de resolver el
MISMO ejercicio (idiomaticas o no), con codigo de ejemplo corto (maximo 8
lineas en la guia de estilo), explicacion y comparacion de ventajas y
desventajas entre enfoques. Fuente (lectura directa del fichero fuente,
19-09-2026):
[exercism/docs — building/tracks/approaches.md](https://github.com/exercism/docs/blob/main/building/tracks/approaches.md).

**3. Opcion multiple**: no se encontro evidencia de que Exercism use
preguntas de opcion multiple como mecanica central; su unidad es siempre
"escribe codigo, pasa tests, recibe feedback humano o de approaches". Marcado
como "no encontrado".

**4. De donde salen las preguntas**: los ejercicios los escribe y mantiene la
COMUNIDAD (miles de voluntarios y mantenedores por lenguaje), no se derivan
de entrevistas reales de empresas ni de reportes de candidatos. Es coherente
con su posicionamiento: ensenar el lenguaje y sus buenas practicas, no
simular una entrevista de una empresa concreta. Fuente (via resumen de
busqueda, consultado 19-09-2026):
[opensource.com, entrevista a Katrina Owen (fundadora)](https://opensource.com/article/17/1/interview-katrina-owen-founder-exercism).

**5. Por que dicen que funciona su metodo**: su tesis explicita es "learning
by doing" mas mentoria: programar en un lenguaje nuevo con ejercicios cortos
da "una alta fluidez incluso con poca pericia", lo que libera al alumno de la
carga cognitiva de la sintaxis para centrarse en arquitectura y buenas
practicas. En 2019 lanzaron "Exercism Research", una iniciativa para estudiar
con sus propios datos como aprende la gente (no se pudo leer el contenido
directo por el bloqueo 403, asi que no hay detalle de que encontraron, solo
que existe la iniciativa). Fuente (via resumen de busqueda, consultado
19-09-2026): [About Exercism](https://exercism.org/about).

Fuentes de esta seccion:
- https://exercism.org/docs/building/tracks/concept-exercises (resumen)
- https://exercism.org/docs/building/tracks/practice-exercises (resumen)
- https://exercism.org/docs/using/feedback/guide-to-being-mentored (resumen)
- https://exercism.org/docs/mentoring/choosing-a-solution (resumen)
- https://opensource.com/article/17/1/exercism-learning-programming (resumen)
- https://github.com/exercism/docs/blob/main/building/tracks/approaches.md (lectura directa)
- https://opensource.com/article/17/1/interview-katrina-owen-founder-exercism (resumen)
- https://exercism.org/about (resumen; 403 en lectura directa)
- https://exercism.org/docs/using/editions/research (403, no se pudo leer)

---

## Educative

**Nota de metodo**: seccion basada en resumenes de busqueda (WebSearch), no
se leyo ninguna pagina de educative.io de primera mano.

**1. Como presenta un ejercicio**: Educative es cursos interactivos basados
en TEXTO (no video), con "widgets" incrustados: widgets de codigo (editor
ejecutable en 30+ lenguajes), widgets de ejercicio y quizzes, y widgets de
medios. Su curso insignia de entrevistas, "Grokking the Coding Interview:
Patterns for Coding Questions", organiza los problemas por PATRON (two
pointers, sliding window, etc.) en vez de por problema suelto: cada modulo
introduce el patron y cuando se aplica, y luego una serie de problemas
ordenados por dificultad, cada uno con enunciado, pistas y una solucion
explicada paso a paso (enfoque, codigo en varios lenguajes, complejidad).
Fuente (via resumen de busqueda, consultado 19-09-2026): paginas de curso en
educative.io, agregadas en la respuesta de busqueda.

**2. Que hace despues de fallar / al terminar el patron**: al final del
temario de patrones hay una seccion "Challenge Yourself" con problemas SIN
la etiqueta del patron, para forzar al alumno a reconocer por si mismo que
tecnica aplica, "igual que en una entrevista real" (frase explicita
encontrada en el resumen). Es decir, retiran el andamiaje (scaffolding) al
final a proposito. Fuente: idem anterior.

**3. Opcion multiple**: Educative si usa MCQ como widget nativo de sus
cursos ("Quiz widget"), con tipos de pregunta MCQ, rellenar-hueco y
verdadero/falso. El dato mas util: el widget deja a quien escribe el curso
anadir una "Explanation" (explicacion) DEBAJO DE CADA OPCION, no solo de la
correcta, para poder explicar por que una opcion concreta es correcta o
incorrecta. No se encontro el numero tipico de opciones (3, 4, 5) en la
busqueda. Fuente (via resumen de busqueda, consultado 19-09-2026):
paginas de ayuda de autor de educative.io citadas en el resultado de
busqueda.

**4. De donde salen las preguntas**: no se encontro una declaracion de
Educative sobre metodologia de sourcing (encuestas a candidatos, acuerdos
con empresas, etc.); los cursos de patrones parecen curados por autores
(muchos ex-ingenieros de grandes empresas) mas que por reportes agregados de
entrevistas reales. Marcado como "no encontrado" con precision.

**5. Por que dicen que funciona su metodo**: la justificacion explicita
encontrada es que el formato texto+codigo interactivo "ahorra tiempo y
permite revision rapida" frente al video, porque el alumno no tiene que
pausar/rebobinar, y que ensenar por PATRONES (no por problema aislado) es lo
que transfiere a problemas nuevos en una entrevista real, porque lo que se
evalua es "reconocer la senal" que distingue un patron de otro. Fuente (via
resumen de busqueda, consultado 19-09-2026): pagina de marketing de
educative.io y articulo de terceros sobre Grokking the Coding Interview.

Fuentes de esta seccion (todas via resumen de busqueda, consultado
19-09-2026):
- https://www.educative.io/m/coding-interview-patterns
- https://dglearning.substack.com/p/what-is-grokking-the-coding-interview
- https://www.educative.io/courses/author-guide/qAkxV39X3OD
- https://www.educative.io/courses/faq/educative-authors-faq

---

## interviewing.io

**Nota de metodo**: seccion basada en resumenes de busqueda mas una lectura
directa exitosa de un articulo del blog oficial (WebFetch).

**1. Como presenta un ejercicio**: no es un banco de preguntas escritas, es
una ENTREVISTA EN VIVO, por voz, anonima (ni el candidato ni el
entrevistador se identifican: sin nombre, sin acento perceptible como pista
de origen, sin CV a la vista), con un ingeniero real Senior/Staff/Principal
de empresas como Google, Facebook, Twitter o startups. La sesion dura
45-60 minutos: un problema, preguntas de seguimiento, presion real y los
silencios incomodos de pensar en voz alta. Cubre coding/algoritmos, system
design, comportamental y hasta nivel staff o roles de ML. Fuente (via
resumen de busqueda, consultado 19-09-2026): pagina principal de
interviewing.io y su blog de salida de beta.

**2. Que hace despues de fallar**: feedback ESCRITO de una persona real mas
la GRABACION de la sesion anotada por el entrevistador, para poder volver
exactamente al momento donde la explicacion del candidato se rompio. Si el
candidato rinde bien en la practica, puede saltarse cribas (resume screen,
llamadas de reclutador) e ir directo a la entrevista tecnica con empresas
asociadas ("fast-track"). Fuente (via resumen de busqueda, consultado
19-09-2026).

**3. Opcion multiple**: no aplica; el formato es conversacion en vivo, no
preguntas escritas de opcion multiple. "No encontrado" / no aplicable.

**4. De donde salen las preguntas**: aqui esta el dato mas fuerte de esta
plataforma. Llevan publicando en su blog, desde 2014, ANALISIS DE DATOS
PROPIOS sobre miles de entrevistas reales grabadas en su plataforma: por
ejemplo "Lessons from 3,000 technical interviews" (que universidad no
predice el resultado) y "What do the best interviewers have in common? We
looked at thousands of real interviews to find out." Es decir, no
"inventan" preguntas realistas, las DERIVAN de grabar entrevistas
reales con ingenieros de empresas reales y analizar que funciona. Fuente
(via resumen de busqueda, consultado 19-09-2026):
[Lessons from 3,000 technical interviews](https://interviewing.io/blog/lessons-from-3000-technical-interviews),
[What do the best interviewers have in common?](https://interviewing.io/blog/best-technical-interviews-common).

**5. Por que dicen que funciona su metodo**: el articulo
["We have the best technical interviewers. Steal what we do."](https://interviewing.io/blog/we-have-the-best-technical-interviewers-heres-how-we-do-it)
(leido directamente, consultado 19-09-2026) da su tesis explicita, citada
literalmente (menos de 15 palabras): la calidad de una entrevista depende
mas del entrevistador que de la pregunta, porque "una pregunta terrible en
manos de un entrevistador habil puede convertirse en excelente, pero una
gran pregunta formulada por un entrevistador desconectado siempre sera
mala" (traducido del ingles, parafraseado, no cita literal en el idioma
original disponible). Los mejores entrevistadores tratan la sesion como un
ejercicio COLABORATIVO ("ser inteligentes juntos"), se implican de verdad
(la diferencia entre un entrevistador enganchado y uno desconectado se nota
al momento) y guian sin dejar caer al candidato "en un agujero peligroso"
sin asistencia. El articulo NO da ejemplos concretos de preguntas bien o
mal formuladas (declarado explicitamente tras la lectura directa).

Fuentes de esta seccion:
- https://interviewing.io/blog/we-have-the-best-technical-interviewers-heres-how-we-do-it (lectura directa, 19-09-2026)
- https://interviewing.io/blog/lessons-from-3000-technical-interviews (resumen, 19-09-2026)
- https://interviewing.io/blog/best-technical-interviews-common (resumen, 19-09-2026)
- https://interviewing.io/blog/lessons-from-a-years-worth-of-hiring-data (resumen, 19-09-2026)
- https://interviewing.io/blog/interviewing-io-is-out-of-beta-anonymous-technical-interview-practice-for-all (resumen, 19-09-2026)

---

## Pramp

**Nota de metodo**: seccion basada en resumenes de busqueda, no se leyo
directamente pramp.com.

**1. Como presenta un ejercicio**: como interviewing.io, no es un banco de
texto sino una entrevista en vivo, pero aqui entre DOS IGUALES (peers), no
con un entrevistador senior contratado. El emparejamiento es anonimo y
considera background, disponibilidad, objetivos, experiencia, formacion,
lenguaje preferido y tema elegido (coding, estructuras de datos y
algoritmos, system design, comportamental). Fuente (via resumen de
busqueda, consultado 19-09-2026).

**2. Que hace despues de fallar**: la sesion dura 60 minutos: una persona
hace de entrevistador los primeros 30-40 minutos con un problema real (de un
banco que aporta Pramp al entrevistador), luego se intercambian los roles.
Al terminar, cada quien rellena un formulario de feedback sobre el otro; ese
feedback se acumula en el perfil de quien lo recibe. El incentivo economico
esta ligado a la calidad del feedback dado: el acceso es gratis con 5
creditos de entrevista al mes, y se ganan creditos extra dando feedback de
buena calidad (puntuado por quien lo recibe por encima de un umbral). Fuente
(via resumen de busqueda, consultado 19-09-2026).

**3. Opcion multiple**: no aplica, formato de conversacion en vivo con
codigo compartido, no preguntas escritas de opcion multiple.

**4. De donde salen las preguntas**: el candidato que hace de entrevistador
usa un problema DE LA PLATAFORMA (no lo inventa el peer), pero no se
encontro el detalle de como Pramp cura o valida ese banco de problemas
contra entrevistas reales. Marcado como "no encontrado" en detalle.

**5. Por que dicen que funciona su metodo**: no se encontro una declaracion
propia de Pramp sobre por que "peer a peer" funciona pedagogicamente (a
diferencia de interviewing.io, que si publica investigacion propia). La
logica implicita que aparece en resenas de terceros es que HACER de
entrevistador tambien entrena (obliga a evaluar codigo ajeno con
criterio), pero es una inferencia de terceros, no una cita de Pramp.
Marcado como "no encontrado" en fuente primaria.

Fuentes de esta seccion (via resumen de busqueda, consultado 19-09-2026):
- https://www.pramp.com/faq
- https://dev.to/lico/mock-interview-platform-pramp-review-h7a
- https://www.finalroundai.com/blog/what-is-pramp

---

## AlgoExpert

**Nota de metodo**: seccion basada en resumenes de busqueda, no se leyo
directamente algoexpert.io.

**1. Como presenta un ejercicio**: banco cerrado y curado de unos 190+
problemas de estructuras de datos y algoritmos, elegidos (segun su propio
marketing) para "reflejar lo que preguntan realmente las empresas top" y
cubrir "las variaciones mas comunes" de esos problemas. El enunciado es
igual de "problema a resolver" que LeetCode (no historia/situacion), la
diferencia esta en el curado y en lo que viene DESPUES.

**2. Que hace despues de fallar (o para aprender el problema)**: cada
problema trae un video en DOS PARTES: primero una explicacion conceptual
(la intuicion, como abordarlo, implementarlo, optimizarlo y analizar su
complejidad) SIN codigo, y despues un recorrido completo de la
implementacion en codigo. Ademas trae soluciones escritas en 9 lenguajes.
Tambien ofrecen 4 "assessments" pensados para simular un dia real de
entrevistas encadenadas, y entrevistas simuladas entre usuarios sobre un
espacio de trabajo compartido (parecido a Pramp pero dentro de AlgoExpert).
Fuente (via resumen de busqueda, consultado 19-09-2026).

**3. Opcion multiple**: no se encontro evidencia de MCQ como formato
relevante en AlgoExpert. "No encontrado".

**4. De donde salen las preguntas**: el marketing de la propia plataforma
dice que las preguntas "reflejan lo que preguntan realmente las empresas
top", pero en la busqueda no aparecio el metodo concreto (encuestas a
candidatos, entrevistadores contratados, etc.) mas alla de esa afirmacion
de marketing sin evidencia citada. Marcado como afirmacion de marketing no
verificada con fuente primaria propia.

**5. Por que dicen que funciona su metodo**: no se encontro una declaracion
pedagogica propia mas alla de "curado por gente que ha trabajado en FAANG"
(afirmacion recurrente en resenas de terceros, no confirmada con fuente
primaria de AlgoExpert). Marcado como "no encontrado" con precision.

Fuentes de esta seccion (via resumen de busqueda, consultado 19-09-2026):
- https://www.algoexpert.io/product
- https://coddy.tech/vs/algoexpert
- https://learntocodewith.me/reviews/algoexpert/

---

## Codewars

**Nota de metodo**: seccion basada en resumenes de busqueda, no se leyo
directamente codewars.com.

**1. Como presenta un ejercicio**: los ejercicios se llaman "kata" (termino
tomado de artes marciales: repeticion deliberada para ganar maestria), con
dificultad medida en un sistema de rangos Kyu/Dan (8 niveles cada uno,
Kyu de dificil a facil subiendo, Dan tras dominar todos los Kyu, como en
artes marciales). Cada kata es un problema de codigo con tests, escrito y
publicado por la COMUNIDAD (cualquiera puede ser autor). Fuente (via
resumen de busqueda, consultado 19-09-2026).

**2. Que hace despues de fallar / al resolver**: al pasar todos los tests,
antes de nada se invita a hacer "cleanup" del propio codigo para dejarlo
"listo para code review" (paso explicito de refinar antes de comparar).
Despues se accede a la pagina de SOLUCIONES de otros usuarios, marcadas por
la comunidad como "best practice" o simplemente mas claras/cortas/rapidas;
tambien se puede comentar la propia kata para dejar feedback a futuros
resolutores. El aprendizaje central de Codewars es justamente ESTE: no
tanto resolver, sino comparar tu solucion contra decenas de soluciones
ajenas para ver otros enfoques, funciones que no conocias o trade-offs.
Fuente (via resumen de busqueda, consultado 19-09-2026).

**3. Opcion multiple**: no se encontro evidencia de MCQ en Codewars; el
formato es siempre codigo + tests. "No encontrado".

**4. De donde salen las preguntas**: kata escritas por la comunidad (no
derivadas de entrevistas reales reportadas); Codewars es explicitamente una
plataforma de "maestria mediante practica y mentoria de otros
desarrolladores" (segun su propio eslogan), no una plataforma de
simulacion de entrevista de una empresa concreta. Fuente (via resumen de
busqueda, consultado 19-09-2026): pagina principal codewars.com.

**5. Por que dicen que funciona su metodo**: la logica implicita (no una
cita textual con fuente propia encontrada) es la gamificacion mas la
comparacion social: subir de rango, ver como otros resolvieron el mismo
problema y dar/recibir feedback en comentarios. No se encontro una
declaracion de investigacion propia (a diferencia de interviewing.io).
Marcado como "no encontrado" en fuente primaria de evidencia.

Fuentes de esta seccion (via resumen de busqueda, consultado 19-09-2026):
- https://www.codewars.com/
- https://docs.codewars.com/gamification/ranks/
- https://docs.codewars.com/getting-started/kata-solved/
- https://docs.codewars.com/getting-started/solutions/

---

## HackerRank

**Nota de metodo**: seccion basada en resumenes de busqueda mas una lectura
directa de un articulo de soporte oficial (WebFetch).

**1. Como presenta un ejercicio**: HackerRank es sobre todo una herramienta
de CRIBA para empresas (no una plataforma de aprendizaje personal como las
anteriores). El formato tipico de un "assessment" es un test cronometrado de
90-120 minutos que mezcla 2-3 problemas de algoritmos/estructuras de datos
de dificultad media-alta, un bloque de preguntas de OPCION MULTIPLE de
fundamentos de informatica, y a veces una seccion de matematicas
cuantitativas. Las preguntas se adaptan al rol (un test de frontend incluye
preguntas sobre frameworks de frontend). Tambien existen "Certified
Assessments": tests pre-construidos y estandarizados por rol, gestionados
por HackerRank, que cualquier empresa que contrate ese rol puede reutilizar
tal cual. Fuente (via resumen de busqueda, consultado 19-09-2026).

**2. Que hace despues de fallar**: en el contexto de una CRIBA de empresa,
HackerRank no esta pensado para que el candidato aprenda del fallo durante
el test (es una evaluacion, no una practica); el feedback formativo llega
via su libreria de practica separada (practice.hackerrank.com), donde si
hay discusion de la comunidad y editoriales, de forma similar a LeetCode. La
pagina de soporte oficial sobre preguntas de opcion multiple, leida
directamente, NO especifica que feedback ve el candidato al elegir una
opcion incorrecta durante una evaluacion real (solo dice que el sistema
puntua automaticamente contra una clave de respuesta). Fuente (lectura
directa, consultado 19-09-2026):
[Multiple Choice Questions — HackerRank Knowledge Base](https://support.hackerrank.com/articles/2513748038-multiple-choice-questions).

**3. Opcion multiple (dato mas util de esta plataforma)**: por defecto el
sistema ofrece 4 OPCIONES, ampliables a mas con un minimo de 2 respuestas
requeridas. Existe un tipo especifico "Respuestas Multiples Correctas"
donde mas de una opcion es correcta a la vez; en ese caso la puntuacion
total se reparte a partes iguales entre las respuestas correctas
(credito parcial si el candidato marca solo alguna de ellas). No hay dato
sobre como se disenan las opciones incorrectas (distractores) mas alla de
que existen. Fuente (lectura directa, consultado 19-09-2026): idem enlace
anterior.

**4. De donde salen las preguntas**: mezcla de banco propio de HackerRank
(incluyendo los "Certified Assessments" estandarizados por rol) y preguntas
que cada empresa cliente escribe o adapta a su propio stack tecnologico para
sus tests personalizados. No se encontro que HackerRank publique
investigacion propia sobre que preguntas se parecen mas a una entrevista
real (a diferencia de interviewing.io). Marcado como "no encontrado" en esa
pieza concreta.

**5. Por que dicen que funciona su metodo**: el propio blog de HackerRank
("HR's guide to testing real-world development skills") defiende las
"simulaciones de trabajo" (job simulations) frente a los puzzles abstractos:
tareas basadas en un repositorio real que reflejan un entorno de produccion,
dando a quien contrata una senal directa de como rendira el candidato "desde
el primer dia", en contraste con puzzles de algoritmos descontextualizados.
Fuente (via resumen de busqueda, consultado 19-09-2026):
[HR's guide to testing real world development skills](https://www.hackerrank.com/writing/hrs-guide-to-testing-real-world-development-skills-no-coding-required).

Fuentes de esta seccion:
- https://support.hackerrank.com/articles/2513748038-multiple-choice-questions (lectura directa, 19-09-2026)
- https://www.hackerrank.com/writing/hrs-guide-to-testing-real-world-development-skills-no-coding-required (resumen, 19-09-2026)
- https://support.hackerrank.com/articles/2354192461-question-types-in-hackerrank-tests (resumen, 19-09-2026)
- https://www.intervyo.co.uk/assessments/hackerrank (resumen, 19-09-2026)

---

## Otras plataformas relevantes

### NeetCode

**Nota de metodo**: via resumen de busqueda, no se leyo neetcode.io
directamente.

NeetCode es sobre todo un roadmap curado (150-300 problemas organizados por
patron) con VIDEOS explicativos gratuitos en YouTube: cada video empieza por
la fuerza bruta, explica POR QUE es ineficiente, y construye hacia la
solucion optima, con diagramas visuales y recorrido de codigo (5-20 min por
video). El dato mas interesante para Devsparring: varias fuentes de terceros
coinciden en que "el 90% del valor esta en el contenido gratuito" (YouTube +
la lista NeetCode 150), y que las funciones de pago (seguimiento de
progreso, preguntas etiquetadas por empresa, acceso a Discord) son un
anadido, no el nucleo. Es decir, lo que ENSENA de verdad es la explicacion
del razonamiento (por que la fuerza bruta falla, que decision clave lleva al
patron optimo), no el enunciado en si. Fuente (via resumen de busqueda,
consultado 19-09-2026):
[What is NeetCode, really?](https://medium.com/@codegrey/what-is-neetcode-really-3ae931e52e89),
[Best NeetCode Pro Alternatives in 2026](https://dev.to/alex_hunter_44f4c9ed6671e/best-neetcode-pro-alternatives-in-2026-free-paid-options-compared-134n).

### Otras no investigadas en profundidad

Aparecieron en las busquedas pero no se investigaron a fondo por alcance
(tiempo/presupuesto de esta tarea): InterviewBit, GeeksforGeeks, Karat,
CoderPad, Exponent/Aced (`tryexponent.com`, mock interviews con IA y
humanos), DesignGurus (dueno actual de "Grokking the Coding Interview" fuera
de Educative). Se anota su existencia para una posible ampliacion futura,
sin afirmaciones sobre como funcionan por no haberlas verificado.

---

## Repositorios y guias en espanol

**Por que importa esta seccion**: Devsparring es una app en espanol primero,
y su banco actual de 377 preguntas viene sobre todo de listas en ingles
(tipo LeetCode/HackerRank), lo que segun la hipotesis de partida explicaria
que suene a examen. Esta seccion comprueba si el material en espanol tiene
el mismo problema o si alguien ya lo resolvio mejor. Punto de partida dado
por el usuario: `holasoymalva/Guia-para-Entrevistas-Laborales-de-Programacion`;
se amplio la busqueda a mas repos y guias en espanol (GitHub, blogs).

**Nota de metodo**: para los repos de GitHub se leyeron ficheros README
directamente (via WebFetch y `curl` a `raw.githubusercontent.com` y a la
API de GitHub para metadatos: estrellas, fecha del ultimo push, licencia),
osea son lecturas de primera mano, no resumenes de busqueda. Se indica en
cada caso. Fecha de consulta: 19-09-2026 para todo lo de esta seccion.

### holasoymalva/Guia-para-Entrevistas-Laborales-de-Programacion (el punto de partida)

- **URL**: https://github.com/holasoymalva/Guia-para-Entrevistas-Laborales-de-Programacion
- **Metadatos** (lectura directa via API de GitHub, 19-09-2026): 116
  estrellas, licencia MIT, ultimo push 2026-07-21 (vivo, hace 2 meses).
- **Como esta organizado**: 5 bloques -- Fundamentos (Git, HTML/CSS,
  JavaScript, POO, Algoritmos, Diseno de Sistemas), Stacks (Node.js, React),
  Pruebas Tecnicas (desafios de logica, de sistemas, de frontend UI),
  Simulacros de Entrevistas y Contribuciones. Cada tema es un `readme.md`
  con indice enlazado y preguntas resueltas en el mismo fichero.
- **Estilo de las preguntas**: mayoritariamente definicion de examen,
  formato "¿Que es X?". Ejemplos literales tal como aparecen en el indice de
  `fundamentos/javascript/readme.md` (leido directamente, 19-09-2026):
  "¿Cuáles son los distintos tipos de datos en JavaScript?",
  "¿Cuál es la diferencia entre los operadores `==` y `===`?",
  "¿Qué son las Closures en JavaScript?". Sin embargo, el bloque de diseno
  de sistemas (`fundamentos/systems-design/readme.md`) mezcla definiciones
  con preguntas mas situacionales: "¿Cómo diseñarías un sistema tipo URL
  Shortener como bit.ly?", "¿Cómo diseñarías un sistema de chat en tiempo
  real?" -- formuladas como encargo practico, no como definicion.
- **Respuestas modelo**: si, y de bastante calidad -- explicacion en prosa
  mas tabla comparativa o snippet de codigo ejecutable por cada pregunta
  (ver ejemplo de `==` vs `===` con tabla y codigo). Longitud media (varios
  parrafos cortos + codigo), no una linea suelta.
- **Fuentes**: no cita fuentes externas por pregunta (ni de donde salio la
  pregunta ni de donde salio la respuesta). Confirmado leyendo directamente
  varios ficheros.
- **Veredicto**: mismo problema que el banco actual de Devsparring en la
  mayoria de temas (definicion de examen), con la excepcion parcial del
  bloque de diseno de sistemas.

### midudev/preguntas-entrevista-react

- **URL**: https://github.com/midudev/preguntas-entrevista-react
- **Metadatos** (lectura directa, 19-09-2026): 7828 estrellas, licencia
  MIT, ultimo push 2026-09-17 (hace 2 dias -- el repo mas vivo y con mas
  trazabilidad social de todos los encontrados en espanol). Autor: midudev,
  creador de contenido y streamer espanol muy conocido en la comunidad
  hispanohablante de desarrollo (Twitch `twitch.tv/midudev`, Discord propio).
- **Como esta organizado**: un unico README largo, con indice por nivel
  (Principiante / Intermedio / Avanzado) sobre preguntas de React.
- **Estilo de las preguntas**: casi puramente definicion de examen. Ejemplos
  literales (leidos directamente del README, 19-09-2026): "¿Qué es React?",
  "¿Qué son las props en React?", "¿Cuál es la diferencia entre `useEffect`
  y `useLayoutEffect`?". Es, literalmente, el mismo patron "¿Que es X?" que
  Devsparring quiere dejar de usar -- y es el repo de preguntas EN ESPANOL
  mas popular y mas activo que aparecio en toda la busqueda. Dato relevante:
  el problema de fondo (sonar a examen) no es exclusivo de las listas en
  ingles heredadas; el material espanol de referencia de la comunidad tiene
  el MISMO patron.
- **Respuestas modelo**: si, de calidad notable -- varios parrafos de
  explicacion en prosa, contexto historico (ej. "Fue creada en 2011 por
  Jordan Walke..." para "¿Qué es React?"), y una lista de "Enlaces de
  interes" (curso propio, documentacion oficial, video de Facebook de 2013)
  al final de cada respuesta. Longitud media-alta.
- **Fuentes**: no cita de donde salio la PREGUNTA (no hay senal de que venga
  de entrevistas reales reportadas); los "enlaces de interes" documentan la
  RESPUESTA, no el origen de la pregunta.
- **Veredicto**: prueba clara de que "en espanol hay algo mejor planteado"
  NO se cumple de forma automatica -- el repo mas popular y vivo en espanol
  tiene exactamente el vicio que Devsparring quiere corregir. Lo unico que
  hace mejor que el banco actual de Devsparring es la calidad/extension de
  la respuesta y los enlaces de ampliacion, no el enunciado de la pregunta.

### midudev/pruebas-tecnicas (el mejor ejemplo encontrado en espanol)

- **URL**: https://github.com/midudev/pruebas-tecnicas
- **Metadatos** (lectura directa, 19-09-2026): 799 estrellas, licencia
  CC0-1.0 (dominio publico, la mas reutilizable de todo lo encontrado),
  ultimo push 2024-04-09 (mas de 2 anos sin actividad, no esta muerto de
  raiz pero tampoco vivo).
- **Como esta organizado**: una carpeta `pruebas/` con una prueba tecnica
  completa por subcarpeta (ej. `01-reading-list`); cada una se resuelve de
  verdad y la comunidad sube sus soluciones en una subcarpeta con su
  usuario de GitHub.
- **Estilo de las preguntas -- el contraejemplo que buscabamos**: NO es
  una pregunta suelta, es un encargo de producto con contexto de negocio,
  requisitos funcionales numerados y pistas de calidad de codigo. Cita
  literal de la prueba `01-reading-list` (leida directamente, 19-09-2026):
  "Somos un sello editorial de libros multinacional. Queremos ofrecer a
  nuestro público una forma de ver nuestro catálogo y poder guardar los
  libros que les interesan en una lista de lectura." Y el propio fichero
  declara su trazabilidad a una entrevista real: "Prueba basada en esta
  prueba real para Juniors" (enlaza a un mensaje de Discord privado, no
  verificable publicamente, pero la intencion de sourcing es explicita:
  parten de una prueba que de verdad se uso). Esto es justo el patron
  "situacion real" que se pide para Devsparring, no "¿que es X?".
- **Que hace despues de fallar/acertar**: al ser un repo de retos abiertos,
  no hay correccion automatica ni pistas graduales -- el aprendizaje viene
  de comparar tu solucion contra las de otros participantes en sus
  subcarpetas (parecido en espiritu a Codewars, pero con retos de producto
  completos en vez de katas de algoritmo).
- **Respuestas modelo**: no aporta una "solucion oficial", el valor esta en
  el enunciado + las soluciones de la comunidad.
- **Fuentes**: cita explicitamente que la prueba nace de una prueba tecnica
  real reportada en su comunidad de Discord (no verificable de forma
  publica e independiente, se declara asi).
- **Veredicto**: es la prueba mas fuerte encontrada en espanol de que SI es
  posible imitar el estilo de entrevista real (contexto de negocio +
  requisitos + codigo, no definicion), pero el repo lleva mas de 2 anos sin
  nuevas pruebas.

### DevCaress/guia-entrevistas-de-programacion

- **URL**: https://github.com/DevCaress/guia-entrevistas-de-programacion
- **Metadatos** (lectura directa, 19-09-2026): 8125 estrellas (la cifra mas
  alta de toda la busqueda en espanol), licencia MIT, ultimo push
  2026-08-09 (vivo, hace poco mas de un mes). El numero de estrellas tan
  alto probablemente se explica porque midudev promociono este repo
  concreto en sus redes (se encontro una publicacion suya en Threads
  enlazandolo: "¡Guía para entrevistas técnicas de programación! ...", 19-09-2026,
  https://www.threads.com/@midu.dev/post/C-SeEwXNxx-), aunque la cuenta
  `DevCaress` es distinta de `midudev` en GitHub.
- **Como esta organizado**: NO es un banco de preguntas propio, es un
  INDICE/lista curada de enlaces externos por tema (patrones de diseno,
  algoritmos y estructuras de datos, arquitectura, bases de datos,
  "preguntas frecuentes" por lenguaje/stack), publicado ahora como sitio
  estatico Astro. Categoria distinta a las anteriores: es una "awesome
  list", no contenido propio.
- **Estilo de las preguntas**: no aplica directamente -- remite a otros
  recursos (repos de GitHub, articulos de Medium, LeetCode, HackerRank,
  FreeCodeCamp) en vez de traer preguntas integradas.
- **Respuestas modelo**: no incluye ninguna, depende enteramente de lo
  enlazado.
- **Fuentes**: si cita, de forma amplia y por enlace, marcando algunas como
  "(recomendado)" (ej. enlace a fullstack.cafe).
- **Veredicto**: util como mapa de recursos, no como banco de preguntas en
  si; no aporta evidencia directa sobre estilo de pregunta porque no tiene
  preguntas propias.

### fforres/preguntas-y-respuestas-entrevistas-frontend

- **URL**: https://github.com/fforres/preguntas-y-respuestas-entrevistas-frontend
- **Metadatos** (lectura directa, 19-09-2026): 322 estrellas, licencia
  "Other" (sin SPDX reconocido, revisar el fichero de licencia antes de
  reutilizar nada), ultimo push 2018-01-12 (casi 8 anos sin actividad,
  claramente parado).
- **Como esta organizado**: es una TRADUCCION/adaptacion al espanol del
  conocido repo ingles `h5bp/Front-end-Developer-Interview-Questions`, con
  carpetas por tema (`js/`, con `README.md` de preguntas y otro de
  respuestas separado por anclas).
- **Estilo de las preguntas**: mixto, y notablemente mejor que la media
  encontrada. Citas literales del indice de `js/README.md` (leido
  directamente, 19-09-2026): "¿Por qué este snippet no funciona como una
  función autoejecutable, si tiene el paréntesis al final? ¿Cómo debería
  ser?" (con el snippet de codigo roto incluido), "¿Qué opiniones tienes de
  AMD versus CommonJS?" (pregunta de opinion/trade-off, no definicion) y
  "¿En qué difieren las siguientes expresiones?" (con 3 variantes de codigo
  a comparar). Conviven con preguntas puramente definicionales ("¿Qué es un
  closure?").
- **Respuestas modelo**: las mejores encontradas en espanol en cuanto a
  profundidad -- la respuesta a "Explica la delegación de eventos" incluye
  explicacion conceptual, DOS ejemplos de codigo HTML+JS progresivos,
  enlaces a demos en vivo (JSBin) e imagen ilustrativa. Longitud alta.
- **Fuentes**: cita puntualmente enlaces externos dentro de alguna
  respuesta (ej. Stack Overflow para "objeto host vs nativo"), pero no de
  forma sistematica en todas las preguntas.
- **Veredicto**: el mejor ejemplo encontrado de pregunta con CODIGO REAL A
  DEBUGGEAR o A COMPARAR en vez de definicion suelta, aunque el repo esta
  parado desde 2018.

### Villanuevand/frontend-preguntas-y-respuestas

- **URL**: https://github.com/Villanuevand/frontend-preguntas-y-respuestas
- **Metadatos** (lectura directa, 19-09-2026): 26 estrellas, licencia MIT,
  ultimo push 2023-10-08. Declarado explicitamente en su descripcion como
  "Obtenido desde https://github.com/h5bp/Front-end-Developer-Interview-Questions"
  -- es decir, tambien deriva del mismo repo ingles que fforres, pero con
  una seccion propia de "Preguntas generales" mas conversacional.
- **Estilo de las preguntas**: la seccion "Preguntas generales" es la mas
  parecida a una entrevista real de TODO lo encontrado en espanol, con
  preguntas reflexivas/situacionales en vez de definiciones. Citas
  literales (leidas directamente, 19-09-2026): "¿Podría describir algún
  problema técnico que haya resuelto recientemente?" y "Si tuviera cinco
  hojas de estilo distintas, ¿cómo las integraría a su página web?". El
  resto de secciones (HTML, CSS, JS especificas) vuelve al patron de
  definicion.
- **Respuestas modelo**: si, redactadas en primera persona (el autor
  responde como si fuera el candidato en la entrevista, ej. "He usado GIT y
  Subversion (SVN)..."), de longitud corta a media.
- **Fuentes**: no cita fuente de las preguntas mas alla de declarar el
  origen del repo entero (h5bp).
- **Veredicto**: la seccion "Preguntas generales" es el mejor ejemplo
  encontrado de pregunta REFLEXIVA/situacional en espanol fuera del ambito
  puramente tecnico (mas parecida a la parte "comportamental" de una
  entrevista real que a un examen de conocimientos).

### thamaragerigr/Preguntas-de-Entrevista

- **URL**: https://github.com/thamaragerigr/Preguntas-de-Entrevista
- **Metadatos** (lectura directa, 19-09-2026): 31 estrellas, licencia MIT,
  ultimo push 2020-08-30 (parado hace mas de 5 anos).
- **Como esta organizado**: carpetas por tema (JavaScript, Generales, HTML,
  Ejercicios de codigo), pensado explicitamente para el perfil "Junior
  Front-End Developer" (asi lo dice la propia autora en la descripcion).
- **Estilo de las preguntas**: definicion de examen. Cita literal (leida
  directamente de `JavaScript/PreguntasJavaScript.md`, 19-09-2026): "¿Qué
  significa 'event delegation'?" y "¿Cómo funciona el 'this'?".
- **Respuestas modelo**: si, con listas, snippets de codigo y una nota de
  aviso destacada (ej. "⛔ Se le añade un event listener al padre para los
  elementos que serán añadidos después de que la página carge"). Longitud
  media.
- **Fuentes**: SI cita fuente externa por pregunta -- cada respuesta termina
  con un enlace a un articulo (ej. un post de Medium sobre event
  delegation), a diferencia de la mayoria de los otros repos revisados.
- **Veredicto**: estilo de examen, pero es de los pocos que SI referencia de
  donde vino la explicacion (no la pregunta en si).

### Guias en espanol que NO son repos de GitHub

Se revisaron tambien articulos/guias web (no repos) sobre entrevista tecnica
en espanol: Tokio School
([https://www.tokioschool.com/noticias/entrevista-tecnica/](https://www.tokioschool.com/noticias/entrevista-tecnica/),
leido directamente, 19-09-2026) y otras paginas de blogs de academias
(Coderslink, Grupo Apok, Epitech) que aparecieron en la busqueda pero no se
leyeron de primera mano por alcance. El articulo de Tokio School, leido
directamente, NO trae ninguna pregunta literal de ejemplo -- solo categorias
genericas ("preguntas sobre algoritmos y estructuras de datos", "problemas
de logica y razonamiento", "preguntas sobre diseno de sistemas") sin cita de
fuente ni estudio. Veredicto: contenido de marketing de academia, sin valor
como banco de preguntas ni como evidencia de metodo.

### Conclusion de esta seccion (respuesta directa a la pregunta del coordinador)

El problema de sonar a examen NO es exclusivo del material en ingles: el
repositorio de preguntas en espanol mas popular y mas vivo de todos
(`midudev/preguntas-entrevista-react`, ~7800 estrellas, actualizado hace 2
dias) tiene el mismo patron "¿Que es X?" que el banco actual de Devsparring,
solo que con respuestas mas largas y con enlaces de ampliacion. El unico
material en espanol que rompe de verdad el molde es
`midudev/pruebas-tecnicas` (retos de producto completos, con contexto de
negocio y trazabilidad declarada a una prueba real), pero es una carpeta de
retos de codificacion completos (no preguntas cortas tipo flashcard) y lleva
mas de 2 anos sin nuevas pruebas; y la seccion "Preguntas generales" de
`Villanuevand/frontend-preguntas-y-respuestas`, que es conversacional/
reflexiva en vez de definicion, pero muy pequena. Ningun repo en espanol usa
opcion multiple. La licencia mas reutilizable de las revisadas es CC0
(`midudev/pruebas-tecnicas`); la mayoria son MIT.

---

## Como son las preguntas de entrevista tecnica de verdad (2025-2026)

**Nota de metodo**: mezcla de lectura directa (WebFetch a articulos
concretos) y resumenes de busqueda; se indica en cada punto. Fecha de
consulta: 19-09-2026.

### La tesis de fondo, con el dato mas fuerte que se encontro

Google (a traves de su VP de RRHH Laszlo Bock) hizo publico un estudio
propio comparando decenas de miles de puntuaciones de entrevista contra el
desempeno real de los candidatos contratados, y encontro "cero relacion"
entre acertar los acertijos/brainteasers clasicos y rendir bien en el
puesto; su frase, ampliamente citada, es que los brainteasers "no predicen
nada" y sirven sobre todo "para que el entrevistador se sienta listo"
(traduccion; frases originales en ingles: "they don't predict anything" y
"serve primarily to make the interviewer feel smart"). A partir de ese
estudio, Google prioriza dos formatos: el "work sample test" (el mejor
predictor) y la entrevista ESTRUCTURADA con rubrica consistente por
competencia (el segundo mejor predictor). Fuente (via resumen de busqueda
sobre declaraciones de Bock, consultado 19-09-2026, no se leyo el libro
"Work Rules!" ni el paper original de re:Work de primera mano):
[Google Admits Impossible Interview Brainteasers Were A 'Waste of Time'](https://thenextweb.com/news/google-reveals-that-its-seemingly-impossible-interview-brainteasers-are-a-complete-waste-of-time).

### Taxonomia util: comportamiento > hipotetica > trivia

La fuente mas clara y mejor argumentada encontrada sobre COMO formular una
pregunta es el articulo de Jacob Kaplan-Moss (co-creador de Django, con
experiencia contratando ingenieros) leido directamente (WebFetch, consultado
19-09-2026): [Types of Interview Questions](https://jacobian.org/2021/mar/1/types-of-interview-questions/).
Propone 3 categorias:

1. **Comportamental**: pide contar una situacion real pasada y como actuo
   el candidato ante ella (ej. un desacuerdo con un companero de equipo). El
   autor la llama el "estandar de oro" porque es la que mas correlaciona con
   el desempeno real, ya que revela acciones reales en vez de respuestas
   idealizadas.
2. **Hipotetica**: pregunta por un comportamiento futuro posible ante un
   escenario concreto, ej. (cita literal, menos de 15 palabras):
   *"if you were starting a new project today, what technology stack would
   you choose?"*. Es menos fiable que la comportamental, pero util cuando no
   hay experiencia pasada que preguntar; el autor recomienda combinarla con
   una pregunta comportamental para validar la respuesta.
3. **Trivia**: cualquier pregunta con una unica respuesta "correcta" (ej.
   version de TLS, diferencias de SQL, modulos estandar de Python). Veredicto
   del autor, cita literal (menos de 15 palabras): *"Trivia make poor
   interview questions; don't use them"*. Este es el formato que mas se
   parece a "¿que es X?" y es justo el que el propio autor desaconseja.

Esta taxonomia es directamente aplicable a Devsparring: buena parte del
banco actual (377 preguntas) cae en la categoria "trivia" segun esta
clasificacion.

### Lo que reportan quienes entrevistan de verdad, con ejemplos concretos

- **Robert Heaton**, entrevistador con mas de 400 entrevistas de codigo en
  10 anos, en su guia
  [How to pass a coding interview with me](https://robertheaton.com/interview/)
  (leido directamente, consultado 19-09-2026), no evalua si el candidato
  "sabe la definicion", evalua METODO: pide reformular el enunciado con sus
  propias palabras antes de empezar, valora que se ejecute el codigo con
  frecuencia en vez de escribir 30-40 minutos sin probar nada, y espera que
  el candidato depure con HIPOTESIS explicitas en voz alta -- cita literal
  de ejemplo de como deberia sonar esa hipotesis (menos de 15 palabras):
  *"My hypothesis is that I'm not filtering the list correctly"*. Prioriza
  claridad y comunicacion sobre una solucion perfecta.
- **Tendencia 2026 hacia codigo real, no puzzles abstractos** (via resumen
  de busqueda, consultado 19-09-2026, sin verificar cada dato de primera
  mano en la fuente original de cada empresa): en Reddit se usan formatos de
  "escenario con restricciones que evolucionan" en vez de un problema
  autocontenido de una sola respuesta correcta; Google anadio una ronda
  donde se entrega al candidato un codebase real multi-fichero para leer
  codigo, encontrar bugs, implementar una funcionalidad y optimizar
  rendimiento; y varias guias de entrevistador (CodeSignal) recomiendan
  tomar "una funcion o servicio real del proyecto con complejidad
  significativa" en vez de trivia. Tambien se menciona como formato en
  auge la depuracion guiada: se pide al candidato narrar "que sospechaba,
  que descarto y que finalmente revelo la causa raiz" de un bug. Fuente:
  resultados de busqueda agregados sobre entrevistas 2026 (varios blogs de
  terceros, calidad variable, no verificados de primera mano salvo donde se
  indica lo contrario).

### Ejemplos concretos de formulacion "situacion real" vs "examen" (sintesis propia a partir de las fuentes anteriores)

Para que sirva de plantilla de estilo a la hora de reescribir preguntas de
Devsparring, esta es la comparacion, construida a partir de los patrones
encontrados en las fuentes citadas arriba (no es una cita textual de ningun
banco de preguntas, es una sintesis del PATRON observado):

| Estilo examen (lo que Devsparring quiere dejar atras) | Estilo situacion real (lo que las fuentes anteriores recomiendan) |
|---|---|
| "¿Que es una closure?" | "Tienes esta funcion que deberia recordar un contador entre llamadas pero se resetea siempre a 0. Aqui esta el codigo, ¿por que pasa y como lo arreglarias?" (formato "bug a depurar", ver Heaton y CodeSignal) |
| "¿Que es el Virtual DOM?" | "Un companero dice que la app va lenta porque 'React no usa Virtual DOM'. ¿Es cierto? ¿Que comprobarias primero?" (formato hipotesis a validar, ver Kaplan-Moss) |
| "¿Que es CAP Theorem?" | "Vamos a montar un sistema de lista de lectura compartido entre pestanas sin backend [contexto real, ver midudev/pruebas-tecnicas]. ¿Que trade-off asumes si prefieres consistencia sobre disponibilidad aqui?" |

### Espana: lo que se encontro y lo que no

Se busco especificamente contenido espanol con relatos de entrevistas
reales o guias de entrevistador. Resultado: se encontraron sobre todo
articulos de blogs de academias (Tokio School, KeepCoding, CodersLink, The
Bridge, Epitech, Grupo Apok) con CONSEJOS GENERALES de preparacion, pero
NINGUNO de los leidos de primera mano (Tokio School, KeepCoding) incluye un
ejemplo LITERAL de pregunta real de entrevista ni cita una fuente
primaria/estudio propio. El articulo de Velneo
([10 preguntas que hacen los buenos desarrolladores en las entrevistas de
trabajo](https://velneo.com/blog/10-preguntas-hacen-los-buenos-desarrolladores-las-entrevistas-trabajo/),
leido directamente, 19-09-2026) resulto ser sobre preguntas que el
CANDIDATO deberia hacer AL ENTREVISTADOR (ej. "¿Qué herramientas de software
se usan en la empresa?"), no preguntas que le hacen a el; es opinion del
autor sin fuente citada. No se encontro un equivalente espanol de Robert
Heaton o Jacob Kaplan-Moss (alguien que entreviste de forma habitual y
publique su metodo con ejemplos concretos). Glassdoor y Reddit, que suelen
concentrar relatos de primera mano de candidatos espanoles, no se
consultaron por el bloqueo de lectura automatizada conocido de antemano
(403/captcha, ver CLAUDE.md del proyecto): no se intento saltarlo. Marcado
como hueco real en la investigacion, ver seccion final.

---

## Tabla final: que copiar y que no para Devsparring

| Practica vista | Copiar / no copiar | Por que |
|---|---|---|
| Formular la pregunta como situacion con contexto de negocio, no como "¿Que es X?" (midudev/pruebas-tecnicas; taxonomia de Jacob Kaplan-Moss) | **Copiar**, es el cambio central pedido. Reescribir el enunciado de las 377 preguntas hacia "aqui tienes un contexto/codigo/bug, resuelvelo o razonalo" en vez de pedir una definicion suelta. | Es la causa raiz identificada del problema ("suena a examen"); ademas Google encontro que los formatos tipo trivia no predicen desempeno real (Laszlo Bock), mientras que comportamental/work-sample si. |
| Pistas progresivas antes de la solucion completa (LeetCode) | **Copiar, adaptado**: 2-3 niveles de pista antes de mostrar la correccion de la IA, en vez de dar la respuesta de golpe. | Preserva la agencia del usuario y el esfuerzo de recuperacion (retrieval practice), en vez de convertir el fallo en un simple "leer la respuesta". |
| Ensenar por PATRON, no por problema suelto, con una fase final sin la etiqueta del patron ("Challenge Yourself" de Educative/Grokking) | **Copiar** en los modos de practica de Devsparring: agrupar preguntas relacionadas por concepto/patron, y anadir una fase de repaso donde no se diga a que tema pertenece la pregunta, para forzar reconocimiento como en una entrevista real. | Es lo que transfiere a problemas nuevos, que es justo el objetivo de la repeticion espaciada (FSRS) que ya usa Devsparring. |
| Feedback explicativo pregunta a pregunta en preguntas cerradas, no solo en la opcion correcta (Educative: explicacion bajo CADA opcion) | **Copiar** si Devsparring usa o anade opcion multiple: escribir el "por que no vale" de cada distractor, no solo el "por que si" de la correcta. | El aprendizaje de un MCQ viene tanto de los distractores como del acierto (retrieval + discriminacion); un distractor sin explicacion desaprovecha la mitad del valor pedagogico. |
| Retirar el andamiaje al final (Educative "Challenge Yourself") | **Copiar** como ultima fase de un tema en el modo de repaso. | Simula la ausencia de pistas de una entrevista real, que es precisamente lo que Devsparring quiere entrenar. |
| Feedback de un HUMANO real sobre tu solucion concreta (Exercism, mentor voluntario; interviewing.io, ingeniero senior) | **No copiar tal cual** (Devsparring corrige con IA contra rubrica, no tiene red de mentores humanos), pero SI copiar el ESPIRITU: el mentor de Exercism no "corrige", usa la solucion para "destapar ideas", y el objetivo no es la solucion optima sino que el usuario aprenda algo nuevo -- aplicable como instruccion de prompt para la correccion con IA. | Sin red de mentores no se puede replicar el mecanismo, pero si el CRITERIO con el que se da feedback. |
| Anonimato total del entrevistador/candidato (interviewing.io) | **No aplica**: Devsparring no es una entrevista entre personas, es practica individual contra IA. | Fuera de alcance del producto. |
| Investigacion propia publicada sobre que hace buena una entrevista (interviewing.io: miles de entrevistas grabadas analizadas) | **No se puede copiar el mecanismo** (Devsparring no graba entrevistas reales de terceros), pero si usar sus HALLAZGOS ya publicados (la calidad depende mas de la formulacion que de la pregunta en si) como criterio de estilo al escribir preguntas nuevas. | Devsparring no tiene ni el volumen de datos ni el modelo de negocio para generar ese tipo de investigacion propia. |
| Kata con ranking Kyu/Dan y comparacion social de soluciones (Codewars) | **No priorizar**: anade gamificacion pero no ataca el problema real (el enunciado sigue pudiendo ser de examen); Devsparring ya tiene FSRS como mecanismo de progreso. | Riesgo de anadir complejidad sin resolver la causa raiz identificada. |
| Reparto de credito parcial en MCQ de respuesta multiple (HackerRank) | **No copiar de entrada**: anade complejidad de puntuacion sin evidencia de que mejore el aprendizaje; mas relevante para CRIBA de empresas que para practica personal. | Devsparring no criba candidatos para una empresa, entrena a una persona. |
| "Company tags" crowdsourced sobre que preguntan empresas concretas (LeetCode Premium) | **No copiar**: Devsparring no tiene la escala de usuarios para crowdsourcear reportes fiables por empresa, y el dato es probabilistico/decae rapido segun la propia investigacion. | Requiere una base de usuarios activos reportando que Devsparring no tiene. |
| Reto de producto completo con contexto de negocio y trazabilidad a una prueba real (midudev/pruebas-tecnicas) | **Copiar la FORMA de escribir el enunciado** (contexto + requisitos numerados), no el formato de "proyecto abierto de 1 semana" que usa ese repo, porque Devsparring es de sesiones cortas. | Es el mejor ejemplo encontrado en espanol de "situacion real" y es directamente adaptable a preguntas individuales mas cortas. |
| Taxonomia comportamental > hipotetica > trivia (Jacob Kaplan-Moss) | **Copiar como criterio editorial** al revisar el banco: marcar cada pregunta existente segun esta taxonomia y priorizar reescribir primero las "trivia" puras. | Da un criterio objetivo y barato de auditoria para las 377 preguntas actuales sin tener que reescribir todo de golpe. |

---

## Lo que no se encontro

- No se encontro una declaracion PRIMARIA y verificada de LeetCode
  (`leetcode.com/faq/`) sobre su propia metodologia; la pagina devolvio 403
  a la lectura automatizada y todo lo reportado sobre LeetCode viene de
  fuentes de terceros (declarado en su seccion).
- No se pudo leer `exercism.org/about` ni
  `exercism.org/docs/using/editions/research` directamente (403); no se sabe
  que encontro en concreto la iniciativa "Exercism Research" mas alla de que
  existe.
- No se encontro el numero tipico de opciones en los quiz de Educative (3,
  4, 5), solo que el widget admite explicacion por opcion.
- No se encontro evidencia de que AlgoExpert, Codewars o Exercism usen
  preguntas de opcion multiple en absoluto.
- No se encontro el metodo concreto de sourcing de preguntas de AlgoExpert
  (mas alla de marketing propio no verificado con fuente primaria) ni de
  Pramp (como cura o valida su banco de problemas de entrevistador).
- No se encontro una declaracion propia de Pramp o Codewars sobre POR QUE
  funciona pedagogicamente su formato (a diferencia de interviewing.io, que
  si publica investigacion propia).
- HackerRank: la pagina de soporte oficial leida directamente no especifica
  que feedback ve el candidato al fallar una pregunta de opcion multiple
  durante una evaluacion real, ni como disenan los distractores incorrectos.
- No se investigaron a fondo (solo se registro su existencia) InterviewBit,
  GeeksforGeeks, Karat, CoderPad, Exponent/Aced y DesignGurus por limite de
  alcance de esta tarea.
- No se encontro un equivalente espanol de Robert Heaton o Jacob
  Kaplan-Moss: alguien que entreviste de forma habitual en Espana o
  Latinoamerica y publique su metodo con ejemplos concretos de preguntas
  reales y el razonamiento detras. Los articulos espanoles encontrados
  (Tokio School, KeepCoding, CodersLink, Velneo) son contenido de
  marketing/preparacion sin preguntas literales ni fuente primaria.
- Glassdoor y Reddit no se consultaron por el bloqueo de lectura
  automatizada conocido de antemano (403/captcha); no se intento saltar el
  bloqueo, tal y como pide la regla del proyecto. Es probable que ahi vivan
  relatos de primera mano (tambien en espanol) que esta investigacion no
  pudo capturar.
- No se pudo verificar de primera mano el libro "Work Rules!" de Laszlo
  Bock ni el paper original de Google re:Work sobre validez predictiva de
  entrevistas; la cita se tomo de cobertura periodistica de terceros sobre
  las declaraciones de Bock.
- El articulo de Medium "Reddit Coding Interview Questions vs. LeetCode"
  devolvio 403 a la lectura directa; lo reportado sobre el formato de
  entrevista de Reddit viene solo del resumen de busqueda, no de una
  lectura de primera mano.
- No se encontro (fuera del ejemplo de midudev/pruebas-tecnicas) ningun
  repositorio o guia en espanol que use explicitamente el formato "reto de
  producto completo con contexto de negocio" de forma sistematica y activa
  hoy (19-09-2026); el ejemplo encontrado lleva mas de 2 anos sin nuevas
  pruebas.
