# Banco de preguntas: Fundamentos, JavaScript y TypeScript

Investigacion para Devsparring. Fecha de referencia: 2026-09-14.
Metodologia: research-citado (toda afirmacion con fuente y fecha; lo no verificado se marca).

ESTADO: COMPLETO (primera version). Ver seccion D (Incertidumbres) para lo que quedo sin verificar de primera mano.

Resumen numerico: tabla de fuentes con 16 repos de GitHub + Glassdoor + foros + blogs (seccion A); banco de 120 preguntas (30 fundamentos F1-F30, 50 JavaScript J1-J50, 25 TypeScript T1-T25, 15 razonamiento R1-R15, seccion B); 10 katas con casos de prueba (seccion C).

## A) Tabla de fuentes: licencia y veredicto de reutilizacion

| Fuente | URL | Licencia | Estrellas | Ultimo commit | Veredicto reutilizacion | Verificado |
|---|---|---|---|---|---|---|
| sudheerj/javascript-interview-questions | https://github.com/sudheerj/javascript-interview-questions | Sin fichero LICENSE en la raiz (verificado listando el repo el 2026-09-14); por tanto, copyright por defecto, "todos los derechos reservados", NO se puede reutilizar el texto de las preguntas sin permiso del autor | 27.6k (via WebFetch 2026-09-14) | Ultimo commit visible: 2026-08-20, commit automatico "[auto] regenerate table of contents" (via WebFetch commits/master, 2026-09-14) | NO reutilizar contenido textual directamente; se puede usar como referencia de que temas/preguntas son populares (inspiracion, no copia) | Si (WebFetch directo) |
| lydiahallie/javascript-questions | https://github.com/lydiahallie/javascript-questions | MIT License (confirmado leyendo LICENSE, 2026-09-14) | No confirmado con cifra exacta (resumen de busqueda, no leido: "miles de estrellas") | No verificado | MIT permite reutilizar y adaptar el contenido citando autoria; valido para producto comercial | Licencia si; estrellas/fecha no |
| yangshun/tech-interview-handbook | https://github.com/yangshun/tech-interview-handbook | MIT License (confirmado leyendo LICENSE, copyright "2017-Present Yangshun Tay", 2026-09-14) | 142.6k (via WebFetch 2026-09-14) | No verificado (no visible en pagina) | MIT permite reutilizar contenido de codigo del repo; ojo: el contenido de texto/guia puede estar bajo licencia distinta a la del codigo (no verificado en detalle, revisar por seccion) | Licencia y estrellas si; fecha no |
| h5bp/Front-end-Developer-Interview-Questions | https://github.com/h5bp/Front-end-Developer-Interview-Questions | MIT License (confirmado leyendo LICENSE.md, 2012-2023, 2026-09-14) | No confirmado con cifra exacta (resumen de busqueda: ~84k, no leido de primera mano) | No verificado | MIT permite reutilizar el banco de preguntas (es literalmente un listado de preguntas) citando fuente | Licencia si; estrellas/fecha no |
| DopplerHQ/awesome-interview-questions | https://github.com/DopplerHQ/awesome-interview-questions | CC0 1.0 Universal / dominio publico (via WebFetch, badge del repo, 2026-09-14) | 84.5k (via WebFetch 2026-09-14) | Repo ARCHIVADO por el propietario el 2024-07-29 (via WebFetch 2026-09-14); es una lista curada de enlaces a otras listas, no contiene preguntas propias | CC0 permite total reutilizacion; pero el valor real es como directorio de enlaces (curacion), no como banco de preguntas en si | Si (WebFetch directo) |
| typescript-cheatsheets/react (react-typescript-cheatsheet) | https://github.com/typescript-cheatsheets/react | MIT (via WebFetch 2026-09-14) | 47.1k (via WebFetch 2026-09-14) | No verificado (1071 commits totales, sin fecha exacta visible) | MIT permite reutilizar ejemplos de tipos/patrones TS+React citando fuente; es cheatsheet de patrones, no banco de preguntas de entrevista | Licencia y estrellas si; fecha no |
| fforres/preguntas-y-respuestas-entrevistas-frontend | https://github.com/fforres/preguntas-y-respuestas-entrevistas-frontend | Creative Commons Attribution-NonCommercial-ShareAlike 4.0 (CC BY-NC-SA 4.0) (via WebFetch 2026-09-14) | 323 (via WebFetch 2026-09-14) | No verificado | La licencia es NoComercial: NO se puede reutilizar el contenido en un producto comercial (Devsparring) sin permiso explicito del autor, aunque se cite la fuente. Solo sirve como referencia/inspiracion de temas, no para copiar texto | Si (WebFetch directo) |
| AGutierrezR/javascript-preguntas-entrevista | https://github.com/AGutierrezR/javascript-preguntas-entrevista | No se ve licencia declarada (via WebFetch 2026-09-14) | 20 (via WebFetch 2026-09-14) | No verificado | Sin licencia explicita = todos los derechos reservados por defecto; NO reutilizar texto, solo como pista de temas | Si (WebFetch directo, parcial) |
| midudev/preguntas-entrevista-react | https://github.com/midudev/preguntas-entrevista-react | No verificado aun (pendiente de leer LICENSE) | No verificado | No verificado | Pendiente de verificar | No (solo hallado via WebSearch, resumen de busqueda, no leido) |
| holasoymalva/Guia-para-Entrevistas-Laborales-de-Programacion | https://github.com/holasoymalva/Guia-para-Entrevistas-Laborales-de-Programacion | MIT (via WebFetch 2026-09-14) | 116 (via WebFetch 2026-09-14) | No verificado (150 commits totales, sin fecha) | MIT permite reutilizar citando fuente; cubre Git, HTML/CSS, JS, POO, algoritmos, system design en espanol | Si (WebFetch directo) |

## B) Banco de preguntas

Formato por pregunta:
- ES / EN
- Tipo: definicion | fundamento | razonamiento | kata | review | comportamental
- Nivel minimo: junior | mid | senior
- Frecuencia estimada: alta/media/baja (numero de fuentes que la citan)
- Fuente + fecha
- (mid/senior) que dice una respuesta que aprueba

### B.1 Fundamentos (POO, SOLID, patrones, clean code, testing, git, complejidad, FP, concurrencia)

**F1. Programacion orientada a objetos: los 4 pilares**
- ES: Explica los cuatro pilares de la programacion orientada a objetos (encapsulamiento, abstraccion, herencia, polimorfismo) con un ejemplo.
- EN: Explain the four pillars of object-oriented programming (encapsulation, abstraction, inheritance, polymorphism) with an example.
- Tipo: definicion | Nivel: junior | Frecuencia: alta (citada en multiples cursos/guias de entrevista, p. ej. holasoymalva/Guia-para-Entrevistas-Laborales-de-Programacion, seccion POO, via WebFetch 2026-09-14; tambien es tema recurrente en glassdoor segun resumen de busqueda)
- Fuente: https://github.com/holasoymalva/Guia-para-Entrevistas-Laborales-de-Programacion (leido 2026-09-14)

**F2. SOLID: Single Responsibility Principle**
- ES: ¿Que es el Principio de Responsabilidad Unica (SRP) y como identificas cuando una clase lo viola?
- EN: What is the Single Responsibility Principle and how do you identify when a class violates it?
- Tipo: fundamento | Nivel: mid | Frecuencia: alta (adaface.com cita 135 preguntas sobre SOLID, resumen de busqueda 2026-09-14, no leido de primera mano; ejemplo de ReportGenerator/Invoice recurrente en varios blogs)
- Fuente: https://www.adaface.com/blog/solid-principles-interview-questions/ (resumen de busqueda, no leido, 2026-09-14)
- Que aprueba: da una definicion correcta ("una clase debe tener una sola razon para cambiar"), aporta un ejemplo propio (no solo el de libro) de una clase que mezcla, por ejemplo, logica de negocio y persistencia o formato de salida, y explica como separarla en dos clases sin sobre-ingenieria.

**F3. SOLID: Open/Closed Principle**
- ES: ¿Que significa que una clase este "abierta a extension pero cerrada a modificacion"? Da un ejemplo con y sin el principio aplicado.
- EN: What does it mean for a class to be "open for extension but closed for modification"? Give an example with and without the principle applied.
- Tipo: fundamento | Nivel: mid | Frecuencia: media (parte del mismo bloque SOLID citado en adaface.com y wecreateproblems.com, resumenes de busqueda, no leidos, 2026-09-14)
- Fuente: https://www.wecreateproblems.com/interview-questions/solid-principles-interview-questions (resumen de busqueda, no leido, 2026-09-14)
- Que aprueba: identifica que anadir un "if/switch por tipo" que crece con cada caso nuevo es la senal de violacion, y propone una solucion via polimorfismo, interfaces o patron Strategy en vez de seguir anadiendo condicionales.

**F4. SOLID: Liskov Substitution Principle**
- ES: ¿Que es el Principio de Sustitucion de Liskov? Pon un ejemplo clasico de violacion (por ejemplo Cuadrado/Rectangulo).
- EN: What is the Liskov Substitution Principle? Give a classic example of a violation (e.g. Square/Rectangle).
- Tipo: fundamento | Nivel: mid | Frecuencia: media (mismo bloque SOLID; el ejemplo Square/Rectangle aparece de forma recurrente en multiples guias, resumen de busqueda, no leido de primera mano en fuente unica)
- Fuente: https://in.indeed.com/career-advice/interviewing/solid-principles-interview-questions (resumen de busqueda, no leido, 2026-09-14)
- Que aprueba: explica que una subclase debe poder sustituir a su clase base sin romper el comportamiento esperado por quien la consume, y detecta que forzar invariantes distintas (p. ej. Square que ignora el segundo lado) rompe el contrato.

**F5. SOLID: Interface Segregation Principle**
- ES: ¿Que problema resuelve el Principio de Segregacion de Interfaces? ¿Como se aplica en TypeScript?
- EN: What problem does the Interface Segregation Principle solve? How would you apply it in TypeScript?
- Tipo: fundamento | Nivel: mid | Frecuencia: media (mismo bloque SOLID, resumen de busqueda, no leido de primera mano)
- Fuente: https://climbtheladder.com/solid-design-principles-interview-questions/ (resumen de busqueda, no leido, 2026-09-14)
- Que aprueba: explica que es mejor tener varias interfaces pequenas y especificas que una interfaz grande que obliga a implementar metodos que no se usan, y da un ejemplo con `interface` de TypeScript dividida en dos.

**F6. SOLID: Dependency Inversion Principle**
- ES: ¿Que es la Inversion de Dependencias y en que se diferencia de la Inyeccion de Dependencias?
- EN: What is Dependency Inversion and how does it differ from Dependency Injection?
- Tipo: fundamento | Nivel: senior | Frecuencia: media (mismo bloque SOLID; distincion DI vs DIP es un matiz que aparece en varias fuentes, resumen de busqueda, no leido de primera mano)
- Fuente: https://www.adaface.com/blog/solid-principles-interview-questions/ (resumen de busqueda, no leido, 2026-09-14)
- Que aprueba: distingue que la Inversion de Dependencias es el principio (depender de abstracciones, no de implementaciones concretas) y la Inyeccion de Dependencias es una tecnica para lograrlo; aporta un ejemplo de un servicio que recibe una interfaz de repositorio en vez de instanciar una clase concreta.

**F7. Patrones de diseño mas preguntados: Singleton**
- ES: ¿Que es el patron Singleton, cuando lo usarias y que problemas trae (testing, estado global)?
- EN: What is the Singleton pattern, when would you use it, and what problems does it cause (testing, global state)?
- Tipo: fundamento | Nivel: mid | Frecuencia: alta (patron citado en sudheerj/javascript-interview-questions, seccion de patrones, via WebFetch TOC 2026-09-14, y en multiples cursos)
- Fuente: https://github.com/sudheerj/javascript-interview-questions (leido parcialmente 2026-09-14)
- Que aprueba: reconoce el trade-off entre conveniencia (una unica instancia global) y el riesgo de acoplar codigo a un estado compartido dificil de testear/mockear; menciona alternativas como inyeccion de dependencias.

**F8. Patrones de diseño mas preguntados: Factory, Observer, Strategy**
- ES: Explica el patron Factory, el patron Observer y el patron Strategy, y da un caso de uso real de cada uno en una app web.
- EN: Explain the Factory pattern, the Observer pattern and the Strategy pattern, and give a real use case for each in a web app.
- Tipo: fundamento | Nivel: mid | Frecuencia: alta (patrones mas mencionados en guias de entrevista frontend/fullstack, resumen de busqueda general, no una fuente unica leida de primera mano)
- Fuente: https://www.adaface.com/blog/solid-principles-interview-questions/ y contenido general de patrones citado en multiples repos de la tabla A (resumen de busqueda, no leido en detalle, 2026-09-14)
- Que aprueba: liga Observer con event listeners/pub-sub (p. ej. como funciona un `EventEmitter` o RxJS), Factory con la creacion de objetos sin exponer la logica de instanciacion, y Strategy con sustituir algoritmos (p. ej. distintas estrategias de validacion o de calculo de precio) sin tocar el cliente que los usa.

**F9. Clean code: nombres y funciones**
- ES: ¿Que hace que una funcion este "limpia"? Da 3 reglas practicas que sigues al nombrar variables y funciones.
- EN: What makes a function "clean"? Give 3 practical rules you follow when naming variables and functions.
- Tipo: fundamento | Nivel: junior | Frecuencia: media (tema recurrente en guias generales de entrevista fullstack; resumen de busqueda, no leido de primera mano en una fuente concreta)
- Fuente: https://coderslink.com/talento/blog/preguntas-esenciales-en-una-entrevista-de-programador/ (resumen de busqueda, no leido, 2026-09-14)

**F10. DRY, KISS, YAGNI**
- ES: ¿Que significan DRY, KISS e YAGNI? ¿Puedes dar un ejemplo de cuando aplicar DRY demasiado pronto es contraproducente?
- EN: What do DRY, KISS and YAGNI mean? Can you give an example of when applying DRY too early backfires?
- Tipo: fundamento | Nivel: mid | Frecuencia: media (principios citados de forma recurrente en guias de clean code para entrevistas, resumen general, no fuente unica leida)
- Fuente: https://coderslink.com/talento/blog/preguntas-esenciales-en-una-entrevista-de-programador/ (resumen de busqueda, no leido, 2026-09-14)
- Que aprueba: menciona el riesgo de "abstraccion prematura" (crear una capa generica antes de tener 2-3 casos reales que la justifiquen), citando la heuristica de "regla de tres" o similar.

**F11. Acoplamiento y cohesion**
- ES: ¿Que es el acoplamiento y la cohesion en el diseño de software? ¿Como los medirias o detectarias en una revision de codigo?
- EN: What are coupling and cohesion in software design? How would you measure or spot them in a code review?
- Tipo: fundamento | Nivel: mid | Frecuencia: media (concepto base ligado a SOLID, citado junto a SRP en varias guias; resumen de busqueda, no leido de primera mano)
- Fuente: https://www.adaface.com/blog/solid-principles-interview-questions/ (resumen de busqueda, no leido, 2026-09-14)
- Que aprueba: define bajo acoplamiento (modulos que dependen poco entre si) y alta cohesion (un modulo hace una cosa coherente) como objetivos gemelos, y da una senal de alarma concreta (por ejemplo, cambiar un modulo obliga a tocar muchos otros = alto acoplamiento).

**F12. Testing: piramide de tests**
- ES: Explica la piramide de testing (unitarios, integracion, e2e). ¿Por que se recomienda tener mas unitarios que e2e?
- EN: Explain the testing pyramid (unit, integration, e2e). Why is it recommended to have more unit tests than e2e tests?
- Tipo: fundamento | Nivel: mid | Frecuencia: alta (tema citado en descripciones de entrevistas reales de Glassdoor: "test-driven development, unit-testing, continuous integration" aparece repetidamente segun resumen de busqueda de glassdoor.com, 2026-09-14, no leido de primera mano por bloqueo 403 al WebFetch)
- Fuente: https://www.glassdoor.com/Interview/frontend-javascript-developer-interview-questions-SRCH_KO0,29.htm (resumen de busqueda, no leido de primera mano por bloqueo de acceso, 2026-09-14)
- Que aprueba: justifica la piramide por velocidad y coste (los unitarios son rapidos y baratos de mantener, los e2e son lentos y fragiles) y no solo la recita de memoria; menciona que un e2e roto es mas dificil de depurar por su alcance amplio.

**F13. Testing: TDD**
- ES: ¿Que es TDD (red-green-refactor)? ¿Lo usas siempre o solo en ciertos casos? Justifica.
- EN: What is TDD (red-green-refactor)? Do you always use it, or only in certain cases? Justify.
- Tipo: comportamental | Nivel: mid | Frecuencia: media (mencionado junto a "test-driven development" en listados de temas de entrevistas de Glassdoor, resumen de busqueda, no leido de primera mano, 2026-09-14)
- Fuente: https://www.glassdoor.com/Interview/frontend-javascript-developer-interview-questions-SRCH_KO0,29.htm (resumen de busqueda, no leido de primera mano, 2026-09-14)
- Que aprueba: describe el ciclo escribir test que falla -> hacerlo pasar con el minimo codigo -> refactorizar, y da un criterio realista de cuando NO usarlo (por ejemplo, exploracion de UI o prototipos donde el diseño aun cambia mucho).

**F14. Testing: mocks, stubs y spies**
- ES: ¿Cual es la diferencia entre un mock, un stub y un spy? Da un ejemplo de cuando usarias cada uno.
- EN: What is the difference between a mock, a stub and a spy? Give an example of when you'd use each.
- Tipo: definicion | Nivel: mid | Frecuencia: media (tema tipico de entrevista tecnica de testing en JS, citado de forma generica en multiples guias; sin fuente unica leida de primera mano)
- Fuente: resumen de busqueda general, sin URL unica verificada de primera mano, 2026-09-14 (hipotesis: alta frecuencia real, no confirmado con conteo de fuentes)

**F15. Git: rebase vs merge**
- ES: ¿Cual es la diferencia entre `git merge` y `git rebase`? ¿Cuando usarias cada uno en un equipo?
- EN: What is the difference between `git merge` and `git rebase`? When would you use each on a team?
- Tipo: fundamento | Nivel: junior | Frecuencia: alta (pregunta recurrente segun multiples fuentes: dev.to/m_midas "12 Interview Questions - Git", Atlassian git tutorial, frontendinterviewquestions.com; resumen de busqueda, no leido de primera mano en ninguna, 2026-09-14)
- Fuente: https://dev.to/m_midas/12-interview-questions-git-19ai (resumen de busqueda, no leido, 2026-09-14)
- Que aprueba: explica que merge preserva el historial real (incluye un commit de merge con dos padres) y rebase reescribe el historial para dejarlo lineal; anade el criterio practico de no rebasear ramas publicas/compartidas porque reescribe commits que otros ya tienen.

**F16. Git: resolucion de conflictos**
- ES: Se produce un conflicto de merge en un archivo compartido por dos personas. Camina al entrevistador por los pasos que seguirias para resolverlo con seguridad.
- EN: A merge conflict happens in a file shared by two people. Walk the interviewer through the steps you'd take to resolve it safely.
- Tipo: razonamiento | Nivel: junior | Frecuencia: media (parte del mismo bloque de preguntas de Git citado en dev.to/m_midas, resumen de busqueda, no leido, 2026-09-14)
- Fuente: https://dev.to/m_midas/12-interview-questions-git-19ai (resumen de busqueda, no leido, 2026-09-14)
- Que aprueba: menciona identificar los marcadores de conflicto (`<<<<<<<`, `=======`, `>>>>>>>`), entender ambos cambios antes de decidir, probar/testear despues de resolver, y comunicarse con la otra persona si el conflicto es semantico y no solo textual.

**F17. Git: flujo de trabajo (branching)**
- ES: ¿Que estrategia de ramas (git flow, trunk-based, GitHub flow) usas normalmente y por que?
- EN: What branching strategy (git flow, trunk-based, GitHub flow) do you normally use and why?
- Tipo: comportamental | Nivel: mid | Frecuencia: baja (mencionado de forma puntual en guias de entrevista de Git; hipotesis de frecuencia baja/media, no confirmado con multiples fuentes independientes)
- Fuente: https://dev.to/m_midas/12-interview-questions-git-19ai (resumen de busqueda, no leido, 2026-09-14)

**F18. Complejidad algoritmica: Big O basico**
- ES: ¿Que es la notacion Big O? Da la complejidad temporal de buscar en un array, en un objeto/Map, y de ordenar con `Array.sort`.
- EN: What is Big O notation? Give the time complexity of searching in an array, in an object/Map, and of sorting with `Array.sort`.
- Tipo: definicion | Nivel: junior | Frecuencia: alta (citado como tema recurrente en el hilo de Hacker News "My list of JavaScript interview questions", seccion "Concepts", via WebFetch 2026-09-14)
- Fuente: https://news.ycombinator.com/item?id=14667256 (leido 2026-09-14, publicado 2017-06-29)
- Que aprueba: no solo recita definiciones sino que las aplica: sabe que buscar por clave en un objeto/Map es O(1) amortizado y buscar en un array por valor es O(n), y que el ordenado nativo de V8 es O(n log n) en el caso general.

**F19. Estructuras de datos basicas para un fullstack**
- ES: ¿Cuando usarias un `Map` en vez de un objeto plano `{}` en JavaScript? ¿Y un `Set` en vez de un array?
- EN: When would you use a `Map` instead of a plain object `{}` in JavaScript? And a `Set` instead of an array?
- Tipo: fundamento | Nivel: junior | Frecuencia: alta (parte del TOC de sudheerj/javascript-interview-questions: "How do you compare Object and Map", via WebFetch 2026-09-14; tambien aparece en lydiahallie como pregunta de "Object Keys vs Set Has")
- Fuente: https://github.com/sudheerj/javascript-interview-questions (leido 2026-09-14)
- Que aprueba: menciona que `Map` preserva el tipo original de las claves (no las convierte a string), tiene mejor rendimiento en inserciones/borrados frecuentes y expone `.size`; que `Set` garantiza unicidad y una comprobacion `has()` en O(1) frente a `includes()` en un array que es O(n).

**F20. Programacion funcional basica: funciones puras**
- ES: ¿Que es una funcion pura? ¿Por que son mas faciles de testear?
- EN: What is a pure function? Why are they easier to test?
- Tipo: definicion | Nivel: junior | Frecuencia: alta (parte del TOC de sudheerj/javascript-interview-questions: "What is a pure function", "What are the benefits of pure functions", via WebFetch 2026-09-14)
- Fuente: https://github.com/sudheerj/javascript-interview-questions (leido 2026-09-14)

**F21. Programacion funcional: inmutabilidad**
- ES: ¿Que significa inmutabilidad en JavaScript? ¿Es `Object.freeze` suficiente para garantizarla?
- EN: What does immutability mean in JavaScript? Is `Object.freeze` enough to guarantee it?
- Tipo: fundamento | Nivel: mid | Frecuencia: media (relacionado con "mutable vs immutable objects" del listado de h5bp/Front-end-Developer-Interview-Questions, via WebFetch 2026-09-14)
- Fuente: https://github.com/h5bp/Front-end-Developer-Interview-Questions/blob/main/src/questions/javascript-questions.md (leido 2026-09-14)
- Que aprueba: aclara que `Object.freeze` es superficial (shallow) y no congela objetos anidados, y menciona alternativas practicas (copias con spread/structuredClone, librerias como Immer) para trabajar de forma inmutable sin congelar objetos manualmente.

**F22. Concurrencia basica: JS es single-threaded**
- ES: JavaScript es de un solo hilo, entonces ¿como puede manejar operaciones asincronas sin bloquear la interfaz?
- EN: JavaScript is single-threaded, so how can it handle asynchronous operations without blocking the UI?
- Tipo: fundamento | Nivel: junior | Frecuencia: alta (pregunta "What is event loop?" en h5bp/Front-end-Developer-Interview-Questions, via WebFetch 2026-09-14; tambien citada en Glassdoor segun resumen de busqueda)
- Fuente: https://github.com/h5bp/Front-end-Developer-Interview-Questions/blob/main/src/questions/javascript-questions.md (leido 2026-09-14)
- Que aprueba: explica que el hilo principal delega operaciones de I/O al entorno (navegador o Node/libuv), que las callbacks/promesas vuelven a la cola de tareas, y que el event loop las procesa cuando el call stack esta vacio; ver tambien pregunta J17 (event loop en detalle).

**F23. Concurrencia: condiciones de carrera en frontend**
- ES: Da un ejemplo de condicion de carrera (race condition) que puede ocurrir en el frontend, por ejemplo con peticiones fetch, y como la evitarias.
- EN: Give an example of a race condition that can happen in the frontend, for example with fetch requests, and how you'd avoid it.
- Tipo: razonamiento | Nivel: mid | Frecuencia: media (variante del tema de "performance optimization and page load diagnosis" citado en el hilo de HN 14667256, via WebFetch 2026-09-14; combinacion con conocimiento general de patrones de peticion)
- Fuente: https://news.ycombinator.com/item?id=14667256 (leido 2026-09-14)
- Que aprueba: identifica el caso clasico de un autocompletado donde la respuesta de una peticion antigua llega despues que una mas reciente y pisa el resultado correcto; propone solucion con un token/id de peticion, `AbortController`, o quedarse solo con la ultima promesa.

**F24. Review de codigo: ¿que miras primero?**
- ES: Te llega un Pull Request de 400 lineas. ¿En que te fijas primero al revisarlo?
- EN: You receive a 400-line Pull Request. What do you look at first when reviewing it?
- Tipo: review | Nivel: mid | Frecuencia: baja (pregunta de tipo comportamental/practica citada de forma generica en foros de entrevistas senior; hipotesis, no confirmada con multiples fuentes independientes)
- Fuente: hipotesis basada en patrones de entrevista senior observados en el hilo de HN 7827048 (no accedido de primera mano por error HTTP 429 al hacer WebFetch, 2026-09-14; ver Incertidumbres)
- Que aprueba: prioriza correccion y riesgo (¿rompe algo en produccion?, ¿tiene tests?) sobre el estilo, sugiere partir PRs grandes en mas pequenos como buena practica, y distingue comentarios bloqueantes de sugerencias opcionales.

**F26. Testing de integracion vs e2e**
- ES: ¿Cual es la diferencia practica entre un test de integracion y un test e2e (end-to-end)? Da un ejemplo de cada uno para una funcionalidad de login.
- EN: What is the practical difference between an integration test and an e2e test? Give an example of each for a login feature.
- Tipo: fundamento | Nivel: mid | Frecuencia: media (parte del mismo bloque de "unit-testing, continuous integration" citado repetidamente en resumenes de busqueda de Glassdoor, 2026-09-14, no leido de primera mano)
- Fuente: https://www.glassdoor.com/Interview/frontend-javascript-developer-interview-questions-SRCH_KO0,29.htm (resumen de busqueda, no leido de primera mano, 2026-09-14)
- Que aprueba: distingue que un test de integracion verifica que varias piezas del propio sistema colaboran bien (por ejemplo, el formulario de login llama al servicio de auth mockeando la red), mientras un e2e recorre la app real de punta a punta (UI + backend real o casi real) simulando a un usuario, y reconoce que los e2e son mas lentos y frágiles por eso se usan con moderacion.

**F27. Patron Repository / capa de acceso a datos**
- ES: ¿Que es el patron Repository y que problema resuelve al separar la logica de negocio del acceso a datos?
- EN: What is the Repository pattern and what problem does it solve by separating business logic from data access?
- Tipo: fundamento | Nivel: mid | Frecuencia: media (patron citado de forma recurrente junto a Factory/Observer/Strategy en guias generales de patrones para entrevista; resumen general, no fuente unica textual verificada, 2026-09-14)
- Fuente: resumen de busqueda general sobre patrones de diseño en entrevistas fullstack, sin URL unica verificada de primera mano (2026-09-14)
- Que aprueba: explica que el Repository abstrae el origen de los datos (base de datos, API externa, cache) detras de una interfaz simple, lo que permite testear la logica de negocio con un repositorio falso (in-memory) sin tocar una base de datos real.

**F28. Complejidad: cuando O(n^2) es un problema real**
- ES: Tienes un bucle anidado que compara cada elemento de un array de 10.000 elementos contra todos los demas (O(n^2)). ¿Como lo detectarias como un problema y como lo mejorarias?
- EN: You have a nested loop comparing every element of a 10,000-item array against every other (O(n^2)). How would you spot it as a problem and how would you improve it?
- Tipo: razonamiento | Nivel: mid | Frecuencia: media (extension practica del tema de Big O citado en el hilo de HN 14667256, seccion "Concepts", via WebFetch 2026-09-14)
- Fuente: https://news.ycombinator.com/item?id=14667256 (leido 2026-09-14, publicado 2017-06-29)
- Que aprueba: reconoce la señal (10.000^2 = 100 millones de comparaciones, notablemente lento) antes de que se lo digan, y propone sustituir la comparacion anidada por una estructura de busqueda O(1) (`Map`/`Set`/indice) cuando el criterio de comparacion lo permite, bajando a O(n).

**F29. Programacion funcional: composicion de funciones**
- ES: ¿Que es la composicion de funciones? Implementa una funcion `compose(...fns)` que combine varias funciones de un solo argumento.
- EN: What is function composition? Implement a `compose(...fns)` function that combines several single-argument functions.
- Tipo: kata | Nivel: mid | Frecuencia: baja (extension natural del bloque de programacion funcional citado en sudheerj TOC items 11-17, via WebFetch 2026-09-14; sin cita textual exacta de esta variante especifica)
- Fuente: https://github.com/sudheerj/javascript-interview-questions (leido 2026-09-14)

**F30. Concurrencia en Node.js: Worker Threads vs proceso unico**
- ES: Node.js corre en un solo hilo para el JavaScript, pero ¿como manejarias una tarea intensiva en CPU (por ejemplo, procesar un CSV enorme) sin bloquear el servidor?
- EN: Node.js runs JavaScript on a single thread, so how would you handle a CPU-intensive task (e.g. processing a huge CSV) without blocking the server?
- Tipo: razonamiento | Nivel: senior | Frecuencia: baja (extension practica del tema de concurrencia citado en h5bp sobre event loop, via WebFetch 2026-09-14; combinacion con conocimiento general de Node.js, no verificado contra una fuente de entrevista especifica sobre Worker Threads)
- Fuente: https://github.com/h5bp/Front-end-Developer-Interview-Questions/blob/main/src/questions/javascript-questions.md (leido 2026-09-14, pregunta base sobre event loop; la extension a Worker Threads es hipotesis, ver Incertidumbres)
- Que aprueba: propone mover el trabajo pesado a un `worker_thread` o a un proceso hijo (`child_process`) para no bloquear el event loop principal, y como alternativa menciona trocear el trabajo (chunking) con `setImmediate`/colas si no se puede usar un hilo separado.

**F25. Clean code: comentarios**
- ES: ¿Cuando un comentario en el codigo es una señal de que el codigo deberia reescribirse en vez de comentarse?
- EN: When is a code comment a sign that the code should be rewritten instead of commented?
- Tipo: fundamento | Nivel: mid | Frecuencia: baja (tema clasico de clean code, mencionado de forma generica en guias; hipotesis de frecuencia, no confirmada con conteo de fuentes)
- Fuente: hipotesis basada en la literatura general de clean code citada indirectamente en holasoymalva/Guia-para-Entrevistas-Laborales-de-Programacion (leido parcialmente 2026-09-14); no se encontro una cita textual especifica de esta pregunta en las fuentes exploradas

### B.2 JavaScript

**J1. ¿Que es un closure?**
- ES: ¿Que es un closure (cierre) en JavaScript y como/por que lo usarias?
- EN: What is a closure in JavaScript and how/why would you use one?
- Tipo: definicion | Nivel: junior | Frecuencia: alta (h5bp/Front-end-Developer-Interview-Questions, via WebFetch 2026-09-14: "What is a closure, and how/why would you use one?"; tambien citada como "la pregunta mas critica de JS" segun busqueda de dev.to/arjuncodess, resumen de busqueda, no leido, 2026-09-14; y en sudheerj TOC, item 28 "What are closures")
- Fuente: https://github.com/h5bp/Front-end-Developer-Interview-Questions/blob/main/src/questions/javascript-questions.md (leido 2026-09-14)

**J2. Scope: let, var, const**
- ES: ¿Cual es la diferencia entre `var`, `let` y `const` en cuanto a scope y reasignacion?
- EN: What is the difference between `var`, `let` and `const` in terms of scope and reassignment?
- Tipo: definicion | Nivel: junior | Frecuencia: alta (webreactiva.com/blog/15-preguntas-entrevistas-javascript, preguntas 5 y 6, leido via WebFetch 2026-09-14, publicado 2023-06-06; tambien h5bp y sudheerj TOC items 18-20)
- Fuente: https://www.webreactiva.com/blog/15-preguntas-entrevistas-javascript (leido 2026-09-14, publicado 2023-06-06)

**J3. Temporal Dead Zone**
- ES: ¿Que es la "Temporal Dead Zone" (TDZ) en JavaScript?
- EN: What is the "Temporal Dead Zone" (TDZ) in JavaScript?
- Tipo: definicion | Nivel: mid | Frecuencia: media (sudheerj/javascript-interview-questions TOC, item 22 "What is the Temporal Dead Zone", via WebFetch 2026-09-14)
- Fuente: https://github.com/sudheerj/javascript-interview-questions (leido 2026-09-14)
- Que aprueba: explica que `let`/`const` si se "hoistean" (se registran) pero quedan en una zona no inicializada desde el inicio del bloque hasta la declaracion, por lo que acceder antes lanza `ReferenceError`, a diferencia de `var` que devuelve `undefined`.

**J4. Hoisting**
- ES: Explica que es el "hoisting" en JavaScript, con un ejemplo de como se comporta distinto con `var`, funciones declaradas y `let`.
- EN: Explain "hoisting" in JavaScript, with an example of how it behaves differently with `var`, function declarations, and `let`.
- Tipo: fundamento | Nivel: junior | Frecuencia: alta (h5bp: "Explain 'hoisting'.", via WebFetch 2026-09-14; sudheerj TOC item 26)
- Fuente: https://github.com/h5bp/Front-end-Developer-Interview-Questions/blob/main/src/questions/javascript-questions.md (leido 2026-09-14)

**J5. `this` en JavaScript**
- ES: Explica como funciona `this` en JavaScript. ¿Como cambia entre una funcion normal, un metodo de objeto, un arrow function y un event handler?
- EN: Explain how `this` works in JavaScript. How does it change between a regular function, an object method, an arrow function, and an event handler?
- Tipo: fundamento | Nivel: junior | Frecuencia: alta (h5bp: "Explain how `this` works in JavaScript.", via WebFetch 2026-09-14; lydiahallie tema #2/#3 de su lista de "que hace este codigo", via WebFetch 2026-09-14)
- Fuente: https://github.com/h5bp/Front-end-Developer-Interview-Questions/blob/main/src/questions/javascript-questions.md (leido 2026-09-14)
- Que aprueba: distingue que `this` se resuelve segun como se llama la funcion (binding dinamico), no donde se define, salvo en arrow functions que capturan el `this` lexico del contexto donde se crearon; menciona `call`/`apply`/`bind` como formas de fijarlo explicitamente.

**J6. Prototipos y herencia prototipica**
- ES: Explica como funciona la herencia prototipica en JavaScript y la diferencia con las clases de ES6.
- EN: Explain how prototypal inheritance works in JavaScript and the difference with ES6 classes.
- Tipo: fundamento | Nivel: mid | Frecuencia: alta (h5bp: "Explain how prototypal inheritance works.", via WebFetch 2026-09-14; sudheerj TOC item 2 "What is a prototype chain")
- Fuente: https://github.com/h5bp/Front-end-Developer-Interview-Questions/blob/main/src/questions/javascript-questions.md (leido 2026-09-14)
- Que aprueba: explica la cadena de prototipos (`__proto__` / `Object.getPrototypeOf`), que cada objeto busca una propiedad en si mismo y si no la encuentra sube por la cadena hasta `null`, y aclara que las clases ES6 son azucar sintactico sobre este mecanismo, no un sistema de herencia distinto.

**J7. call, apply y bind**
- ES: ¿Cual es la diferencia entre `Function.call`, `Function.apply` y `Function.prototype.bind`?
- EN: What is the difference between `Function.call`, `Function.apply` and `Function.prototype.bind`?
- Tipo: definicion | Nivel: junior | Frecuencia: alta (h5bp, dos preguntas separadas sobre call/apply y bind, via WebFetch 2026-09-14; sudheerj TOC item 3)
- Fuente: https://github.com/h5bp/Front-end-Developer-Interview-Questions/blob/main/src/questions/javascript-questions.md (leido 2026-09-14)

**J8. Event loop**
- ES: Explica el event loop de JavaScript: call stack, cola de tareas (macrotasks) y cola de microtasks.
- EN: Explain the JavaScript event loop: call stack, task queue (macrotasks), and microtask queue.
- Tipo: fundamento | Nivel: mid | Frecuencia: alta (h5bp: "What is event loop?", via WebFetch 2026-09-14; citado como tema recurrente en Glassdoor segun resumen de busqueda: "event loop, React component lifecycle" en entrevistas de Mercado Libre, 2026-09-14, no leido de primera mano por bloqueo)
- Fuente: https://github.com/h5bp/Front-end-Developer-Interview-Questions/blob/main/src/questions/javascript-questions.md (leido 2026-09-14)
- Que aprueba: describe que el call stack ejecuta codigo sincrono, que al vaciarse se procesan TODAS las microtasks pendientes (promesas, `queueMicrotask`) antes de tomar la siguiente macrotask (timers, I/O, eventos), y da un ejemplo con `setTimeout` vs `Promise.resolve().then()` prediciendo el orden de salida.

**J9. Microtasks vs macrotasks: orden de ejecucion**
- ES: Dado un fragmento con `console.log`, `setTimeout(fn, 0)` y `Promise.resolve().then(fn)`, ¿en que orden se imprime?
- EN: Given a snippet with `console.log`, `setTimeout(fn, 0)` and `Promise.resolve().then(fn)`, in what order does it print?
- Tipo: kata | Nivel: mid | Frecuencia: alta (patron de pregunta "que imprime este codigo" caracteristico de lydiahallie/javascript-questions, tema #30 "Event Loop with setTimeout", via WebFetch 2026-09-14)
- Fuente: https://github.com/lydiahallie/javascript-questions (leido parcialmente via raw README, 2026-09-14)
- Que aprueba: predice correctamente el orden (codigo sincrono primero, luego todas las microtasks, luego el timeout) y explica el porque, no solo memoriza el resultado.

**J10. Promesas: estados y encadenado**
- ES: ¿Que es una Promise y cuales son sus tres estados posibles? ¿Que pasa si no manejas un `.catch()`?
- EN: What is a Promise and what are its three possible states? What happens if you don't handle a `.catch()`?
- Tipo: definicion | Nivel: junior | Frecuencia: alta (h5bp: "What is a promise?", via WebFetch 2026-09-14)
- Fuente: https://github.com/h5bp/Front-end-Developer-Interview-Questions/blob/main/src/questions/javascript-questions.md (leido 2026-09-14)

**J11. async/await vs promesas encadenadas**
- ES: ¿En que se diferencia usar `async/await` de encadenar `.then()`? ¿Sigue siendo asincrono el codigo con `await`?
- EN: How is using `async/await` different from chaining `.then()`? Is code with `await` still asynchronous?
- Tipo: fundamento | Nivel: mid | Frecuencia: alta (tema recurrente citado como parte del bloque de "Promises methods and generators... commonly asked in intermediate-to-senior interviews" segun resumen de busqueda de codesignal.com, 2026-09-14, no leido de primera mano)
- Fuente: https://codesignal.com/blog/25-javascript-interview-questions-and-answers-from-basic-to-senior-level/ (resumen de busqueda, no leido, 2026-09-14)
- Que aprueba: aclara que `async/await` es azucar sintactico sobre promesas (sigue siendo asincrono y no bloqueante), que una funcion `async` siempre devuelve una promesa, y que los errores se capturan con `try/catch` alrededor del `await` en vez de `.catch()`.

**J12. Promise.all, Promise.race, Promise.allSettled, Promise.any**
- ES: ¿Cual es la diferencia entre `Promise.all`, `Promise.race`, `Promise.allSettled` y `Promise.any`? Da un caso de uso de cada uno.
- EN: What is the difference between `Promise.all`, `Promise.race`, `Promise.allSettled` and `Promise.any`? Give a use case for each.
- Tipo: fundamento | Nivel: mid | Frecuencia: media (citado indirectamente via la popularidad de la kata "implementar un polyfill de Promise.all", ver kata K7 en seccion C; multiples fuentes de blogs de interviewprep, resumen de busqueda, no leido de primera mano en una unica fuente, 2026-09-14)
- Fuente: https://www.geeksforgeeks.org/javascript/implement-polyfill-for-promise-all-method-in-javascript/ (resumen de busqueda, no leido, 2026-09-14)

**J13. Modulos: ESM vs CommonJS**
- ES: ¿Cual es la diferencia entre los modulos ES (`import`/`export`) y CommonJS (`require`/`module.exports`)?
- EN: What is the difference between ES modules (`import`/`export`) and CommonJS (`require`/`module.exports`)?
- Tipo: definicion | Nivel: mid | Frecuencia: media (sudheerj TOC items 29-30 "What are modules", "Why do you need modules", via WebFetch 2026-09-14)
- Fuente: https://github.com/sudheerj/javascript-interview-questions (leido 2026-09-14)
- Que aprueba: menciona que ESM se resuelve de forma estatica (permite tree-shaking) y CommonJS de forma dinamica/sincrona en tiempo de ejecucion; que ESM tiene "top-level await" y bindings en vivo, y que Node soporta ambos con matices de configuracion (`"type": "module"`, extension `.mjs`).

**J14. == vs ===**
- ES: ¿Cual es la diferencia entre `==` y `===`? ¿Cuando, si alguna vez, usarias `==`?
- EN: What is the difference between `==` and `===`? When, if ever, would you use `==`?
- Tipo: definicion | Nivel: junior | Frecuencia: alta (h5bp, webreactiva pregunta 7, sudheerj TOC item 9; triple fuente, via WebFetch 2026-09-14)
- Fuente: https://www.webreactiva.com/blog/15-preguntas-entrevistas-javascript (leido 2026-09-14, publicado 2023-06-06)

**J15. Coercion de tipos**
- ES: ¿Que es la coercion de tipos en JavaScript? Predice el resultado de `[] + []`, `[] + {}` y `1 + "1"`.
- EN: What is type coercion in JavaScript? Predict the result of `[] + []`, `[] + {}` and `1 + "1"`.
- Tipo: kata | Nivel: junior | Frecuencia: alta (h5bp: "What is type coercion?", via WebFetch 2026-09-14; lydiahallie tema #15 "Type Coercion in Addition", via WebFetch 2026-09-14)
- Fuente: https://github.com/h5bp/Front-end-Developer-Interview-Questions/blob/main/src/questions/javascript-questions.md (leido 2026-09-14)

**J16. Valores falsy**
- ES: ¿Cuales son los 8 valores "falsy" en JavaScript?
- EN: What are the 8 "falsy" values in JavaScript?
- Tipo: definicion | Nivel: junior | Frecuencia: media (lydiahallie tema #35 "Falsy Values List", via WebFetch 2026-09-14, lista `undefined`, `null`, `NaN`, `false`, `''`, `0`, `-0`, `0n`)
- Fuente: https://github.com/lydiahallie/javascript-questions (leido parcialmente via raw README, 2026-09-14)

**J17. map, filter, reduce**
- ES: Implementa con `reduce` lo mismo que hace `map` y lo mismo que hace `filter`. ¿Por que `reduce` es mas generico?
- EN: Implement what `map` does and what `filter` does using `reduce`. Why is `reduce` more general?
- Tipo: kata | Nivel: mid | Frecuencia: alta (patron de kata clasico citado de forma recurrente en guias de JS funcional para entrevistas; combinacion de lo visto en sudheerj TOC items 11-17 sobre first-class/higher-order/curry functions, via WebFetch 2026-09-14)
- Fuente: https://github.com/sudheerj/javascript-interview-questions (leido 2026-09-14)
- Que aprueba: implementa ambos casos correctamente usando el acumulador de `reduce`, y explica que `map`/`filter`/`reduce` son casos particulares de "fold" y que `reduce` puede expresar cualquiera de los otros dos (y mas, como `groupBy`).

**J18. Debounce**
- ES: Implementa una funcion `debounce(fn, delay)` desde cero. ¿En que casos de uso real la aplicarias?
- EN: Implement a `debounce(fn, delay)` function from scratch. In what real use cases would you apply it?
- Tipo: kata | Nivel: mid | Frecuencia: alta (descrito como "de las preguntas de rendimiento en JS mas comunes en entrevistas tecnicas" segun resumen de busqueda de prachub.com/interview-questions, etiquetado como pregunta real de entrevista de Amazon, 2026-09-14, no leido de primera mano)
- Fuente: https://prachub.com/interview-questions/implement-robust-debounce-and-throttle-in-javascript (resumen de busqueda, no leido, 2026-09-14)
- Que aprueba: implementa correctamente el reseteo del timer en cada llamada con `clearTimeout`, y da un caso de uso real (autocompletado de busqueda, validacion de formulario mientras se escribe) explicando que evita disparar una peticion o calculo costoso en cada tecla.

**J19. Throttle**
- ES: Implementa una funcion `throttle(fn, interval)` desde cero. ¿En que se diferencia de `debounce`?
- EN: Implement a `throttle(fn, interval)` function from scratch. How does it differ from `debounce`?
- Tipo: kata | Nivel: mid | Frecuencia: alta (mismo bloque que J18, citado junto en prachub.com y en jsprep.pro segun resumen de busqueda, 2026-09-14, no leido de primera mano)
- Fuente: https://prachub.com/interview-questions/implement-robust-debounce-and-throttle-in-javascript (resumen de busqueda, no leido, 2026-09-14)
- Que aprueba: diferencia que throttle garantiza ejecucion como maximo una vez por intervalo (util en scroll/resize), mientras debounce espera a que pare la actividad; idealmente menciona las variantes "leading" y "trailing".

**J20. Memoria: memory leaks en JS**
- ES: Da tres causas comunes de fugas de memoria (memory leaks) en una aplicacion JavaScript del navegador.
- EN: Give three common causes of memory leaks in a browser JavaScript application.
- Tipo: fundamento | Nivel: senior | Frecuencia: media (citado como "tema de nivel senior" en resumen de busqueda de codesignal.com: "Memory leaks are another senior-level topic, often occurring due to abandoned DOM references, global variables, unreleased timers, or event listeners", 2026-09-14, no leido de primera mano)
- Fuente: https://codesignal.com/blog/25-javascript-interview-questions-and-answers-from-basic-to-senior-level/ (resumen de busqueda, no leido, 2026-09-14)
- Que aprueba: menciona al menos: listeners de eventos no removidos, timers (`setInterval`) sin limpiar, referencias a nodos DOM eliminados guardadas en variables globales o closures, y variables globales accidentales; idealmente menciona `WeakMap`/`WeakRef` como herramientas para evitar retener referencias.

**J21. ES2020+: optional chaining y nullish coalescing**
- ES: ¿Que hacen `?.` (optional chaining) y `??` (nullish coalescing)? ¿En que se diferencia `??` de `||`?
- EN: What do `?.` (optional chaining) and `??` (nullish coalescing) do? How does `??` differ from `||`?
- Tipo: definicion | Nivel: junior | Frecuencia: media (features ES2020 citadas de forma recurrente en listados de "que hay de nuevo en JS moderno" en guias de entrevista; sin fuente unica textual verificada de primera mano)
- Fuente: hipotesis basada en conocimiento general de la especificacion ES2020 (no verificado contra una fuente de entrevista especifica; ver Incertidumbres)
- Que aprueba: distingue que `??` solo cae al valor por defecto si el original es `null` o `undefined`, mientras `||` cae con cualquier valor falsy (`0`, `''`, `false`), citando el bug clasico de `cantidad || 10` cuando `cantidad` es `0`.

**J22. ES2020+: BigInt, Promise.allSettled, encadenado opcional**
- ES: Nombra 3 caracteristicas introducidas desde ES2020 en adelante que usas en tu dia a dia.
- EN: Name 3 features introduced from ES2020 onward that you use day to day.
- Tipo: fundamento | Nivel: mid | Frecuencia: baja (hipotesis, tema generico de "novedades del lenguaje" sin cita textual especifica encontrada en las fuentes exploradas)
- Fuente: hipotesis, no verificado con una fuente de entrevista concreta (ver Incertidumbres)

**J23. Diferencia entre null, undefined y una variable no declarada**
- ES: ¿Cual es la diferencia entre una variable que vale `null`, una que vale `undefined` y una que no ha sido declarada?
- EN: What is the difference between a variable that is `null`, `undefined`, or undeclared?
- Tipo: definicion | Nivel: junior | Frecuencia: alta (h5bp, cita textual exacta, via WebFetch 2026-09-14)
- Fuente: https://github.com/h5bp/Front-end-Developer-Interview-Questions/blob/main/src/questions/javascript-questions.md (leido 2026-09-14)

**J24. Diferencia entre mutable e inmutable**
- ES: Explica la diferencia entre objetos mutables e inmutables en JavaScript con un ejemplo de cada uno.
- EN: Explain the difference between mutable and immutable objects in JavaScript with an example of each.
- Tipo: definicion | Nivel: junior | Frecuencia: media (h5bp, cita textual exacta, via WebFetch 2026-09-14)
- Fuente: https://github.com/h5bp/Front-end-Developer-Interview-Questions/blob/main/src/questions/javascript-questions.md (leido 2026-09-14)

**J25. Funciones de primer orden y de orden superior**
- ES: ¿Que es una "first class function" y que es una "higher order function"? Da un ejemplo de cada una.
- EN: What is a "first class function" and what is a "higher order function"? Give an example of each.
- Tipo: definicion | Nivel: junior | Frecuencia: alta (sudheerj TOC items 11-13, via WebFetch 2026-09-14)
- Fuente: https://github.com/sudheerj/javascript-interview-questions (leido 2026-09-14)

**J26. Currying**
- ES: ¿Que es el currying en JavaScript? Escribe una funcion `curry` basica.
- EN: What is currying in JavaScript? Write a basic `curry` function.
- Tipo: kata | Nivel: mid | Frecuencia: media (sudheerj TOC item 15 "What is the currying function", via WebFetch 2026-09-14; h5bp: "Can you give an example of a curry function?")
- Fuente: https://github.com/h5bp/Front-end-Developer-Interview-Questions/blob/main/src/questions/javascript-questions.md (leido 2026-09-14)

**J27. Memoization**
- ES: ¿Que es la memoization? Implementa una funcion `memoize(fn)` generica.
- EN: What is memoization? Implement a generic `memoize(fn)` function.
- Tipo: kata | Nivel: mid | Frecuencia: media (sudheerj TOC item 25 "What is memoization", via WebFetch 2026-09-14)
- Fuente: https://github.com/sudheerj/javascript-interview-questions (leido 2026-09-14)
- Que aprueba: implementa un cache (objeto o `Map`) que guarda resultados por argumentos de entrada (serializados o via clave compuesta), y menciona el trade-off memoria vs velocidad, y que no es apta para funciones con efectos secundarios o argumentos no serializables facilmente.

**J28. IIFE**
- ES: ¿Que es una IIFE (Immediately Invoked Function Expression) y para que se usaba antes de tener modulos?
- EN: What is an IIFE (Immediately Invoked Function Expression) and what was it used for before modules existed?
- Tipo: definicion | Nivel: junior | Frecuencia: media (sudheerj TOC item 23, via WebFetch 2026-09-14)
- Fuente: https://github.com/sudheerj/javascript-interview-questions (leido 2026-09-14)

**J29. Destructuring y spread**
- ES: Da un ejemplo de destructuring de un objeto y de un array, y un ejemplo de uso del operador spread.
- EN: Give an example of destructuring an object and an array, and an example of using the spread operator.
- Tipo: kata | Nivel: junior | Frecuencia: alta (h5bp, dos preguntas separadas: destructuring y spread syntax, via WebFetch 2026-09-14)
- Fuente: https://github.com/h5bp/Front-end-Developer-Interview-Questions/blob/main/src/questions/javascript-questions.md (leido 2026-09-14)

**J30. Template literals**
- ES: Da un ejemplo de generar un string con template literals de ES6, incluyendo una tagged template.
- EN: Give an example of generating a string with ES6 template literals, including a tagged template.
- Tipo: kata | Nivel: junior | Frecuencia: media (h5bp: "Can you give an example of generating a string with ES6 Template Literals?", via WebFetch 2026-09-14; lydiahallie tema #17 "Tagged Template Literals")
- Fuente: https://github.com/h5bp/Front-end-Developer-Interview-Questions/blob/main/src/questions/javascript-questions.md (leido 2026-09-14)

**J31. Event bubbling y capturing**
- ES: Describe el "event bubbling" y el "event capturing" en el DOM. ¿Que es event delegation y por que es util?
- EN: Describe event bubbling and event capturing in the DOM. What is event delegation and why is it useful?
- Tipo: fundamento | Nivel: junior | Frecuencia: alta (h5bp: "Explain event delegation.", "Describe event bubbling and event capturing", via WebFetch 2026-09-14)
- Fuente: https://github.com/h5bp/Front-end-Developer-Interview-Questions/blob/main/src/questions/javascript-questions.md (leido 2026-09-14)

**J32. Strict mode**
- ES: ¿Que es el "strict mode" en JavaScript y que errores comunes previene?
- EN: What is "strict mode" in JavaScript and what common mistakes does it prevent?
- Tipo: definicion | Nivel: junior | Frecuencia: media (h5bp: "What is strict mode?", via WebFetch 2026-09-14; lydiahallie tema #20 "Strict Mode Variable Declaration")
- Fuente: https://github.com/h5bp/Front-end-Developer-Interview-Questions/blob/main/src/questions/javascript-questions.md (leido 2026-09-14)

**J33. Diferencia entre atributo y propiedad**
- ES: ¿Cual es la diferencia entre un "atributo" HTML y una "propiedad" del objeto DOM en JavaScript?
- EN: What is the difference between an HTML "attribute" and a DOM object "property" in JavaScript?
- Tipo: definicion | Nivel: mid | Frecuencia: media (h5bp, cita textual exacta, via WebFetch 2026-09-14)
- Fuente: https://github.com/h5bp/Front-end-Developer-Interview-Questions/blob/main/src/questions/javascript-questions.md (leido 2026-09-14)

**J34. localStorage, sessionStorage y cookies**
- ES: ¿Cuales son las diferencias entre `localStorage`, `sessionStorage` y las cookies?
- EN: What are the differences between `localStorage`, `sessionStorage` and cookies?
- Tipo: definicion | Nivel: junior | Frecuencia: alta (sudheerj TOC item 42 "What are the differences between cookie, local storage and session storage", via WebFetch 2026-09-14)
- Fuente: https://github.com/sudheerj/javascript-interview-questions (leido 2026-09-14)

**J35. JSON: parse y stringify**
- ES: ¿Que es JSON y cuales son sus operaciones comunes en JavaScript (`JSON.parse`, `JSON.stringify`)? ¿Que limitaciones tiene `JSON.stringify` con fechas o funciones?
- EN: What is JSON and what are its common operations in JavaScript (`JSON.parse`, `JSON.stringify`)? What limitations does `JSON.stringify` have with dates or functions?
- Tipo: fundamento | Nivel: junior | Frecuencia: alta (sudheerj TOC item 4, via WebFetch 2026-09-14)
- Fuente: https://github.com/sudheerj/javascript-interview-questions (leido 2026-09-14)

**J36. slice vs splice**
- ES: ¿Cual es la diferencia entre `Array.prototype.slice` y `Array.prototype.splice`?
- EN: What is the difference between `Array.prototype.slice` and `Array.prototype.splice`?
- Tipo: definicion | Nivel: junior | Frecuencia: alta (sudheerj TOC items 5-7, via WebFetch 2026-09-14)
- Fuente: https://github.com/sudheerj/javascript-interview-questions (leido 2026-09-14)

**J37. Copia superficial vs copia profunda**
- ES: ¿Como harias una copia profunda (deep copy) de un objeto anidado en JavaScript? ¿Que opciones nativas existen hoy (`structuredClone`)?
- EN: How would you make a deep copy of a nested object in JavaScript? What native options exist today (`structuredClone`)?
- Tipo: kata | Nivel: mid | Frecuencia: alta (webreactiva.com, pregunta 11 "¿Como hacer una copia profunda de un objeto en JavaScript?", leido via WebFetch 2026-09-14, publicado 2023-06-06)
- Fuente: https://www.webreactiva.com/blog/15-preguntas-entrevistas-javascript (leido 2026-09-14, publicado 2023-06-06)
- Que aprueba: menciona que el spread (`{...obj}`) y `Object.assign` solo hacen copia superficial, que `JSON.parse(JSON.stringify(x))` pierde funciones/`undefined`/`Date` y falla con referencias circulares, y que `structuredClone` (nativo desde 2022) resuelve la mayoria de estos casos sin depender de una libreria como lodash `cloneDeep`.

**J38. Ambito global y contaminacion del objeto global**
- ES: ¿Que pasa si asignas una variable sin `var`/`let`/`const` dentro de una funcion? ¿Como lo previene el strict mode?
- EN: What happens if you assign a variable without `var`/`let`/`const` inside a function? How does strict mode prevent it?
- Tipo: kata | Nivel: junior | Frecuencia: media (lydiahallie tema #9 "Global Variable Assignment", via WebFetch 2026-09-14)
- Fuente: https://github.com/lydiahallie/javascript-questions (leido parcialmente via raw README, 2026-09-14)

**J39. new sin constructor / comportamiento de new**
- ES: ¿Que pasa si llamas a una funcion constructora sin usar `new`?
- EN: What happens if you call a constructor function without using `new`?
- Tipo: kata | Nivel: mid | Frecuencia: media (lydiahallie tema #12 "Constructor Behavior Without new", via WebFetch 2026-09-14)
- Fuente: https://github.com/lydiahallie/javascript-questions (leido parcialmente via raw README, 2026-09-14)

**J40. Rest parameters**
- ES: ¿Que es un "rest parameter" en JavaScript? ¿Que tipo de dato produce dentro de la funcion?
- EN: What is a "rest parameter" in JavaScript? What data type does it produce inside the function?
- Tipo: kata | Nivel: junior | Frecuencia: baja (lydiahallie tema #19 "Rest Parameters and typeof", via WebFetch 2026-09-14)
- Fuente: https://github.com/lydiahallie/javascript-questions (leido parcialmente via raw README, 2026-09-14)

**J41. Deteccion de features vs UA sniffing**
- ES: ¿Cual es la diferencia entre "feature detection", "feature inference" y usar el UA string del navegador?
- EN: What is the difference between feature detection, feature inference, and using the UA string?
- Tipo: definicion | Nivel: mid | Frecuencia: baja (h5bp, cita textual exacta, via WebFetch 2026-09-14)
- Fuente: https://github.com/h5bp/Front-end-Developer-Interview-Questions/blob/main/src/questions/javascript-questions.md (leido 2026-09-14)

**J42. Same-origin policy**
- ES: Explica la politica de mismo origen (same-origin policy) en relacion con JavaScript y peticiones entre dominios.
- EN: Explain the same-origin policy with regard to JavaScript and cross-domain requests.
- Tipo: fundamento | Nivel: mid | Frecuencia: baja (h5bp, cita textual exacta, via WebFetch 2026-09-14)
- Fuente: https://github.com/h5bp/Front-end-Developer-Interview-Questions/blob/main/src/questions/javascript-questions.md (leido 2026-09-14)
- Que aprueba: explica que un script solo puede leer libremente recursos del mismo esquema+dominio+puerto, y que CORS (cabeceras `Access-Control-Allow-Origin`) es el mecanismo del servidor para relajar esa restriccion de forma controlada.

**J43. Pros y contras de extender objetos nativos**
- ES: ¿Cuales son los pros y contras de extender objetos nativos de JavaScript (por ejemplo `Array.prototype`)?
- EN: What are the pros and cons of extending built-in JavaScript objects (e.g. `Array.prototype`)?
- Tipo: fundamento | Nivel: senior | Frecuencia: baja (h5bp, cita textual exacta, via WebFetch 2026-09-14)
- Fuente: https://github.com/h5bp/Front-end-Developer-Interview-Questions/blob/main/src/questions/javascript-questions.md (leido 2026-09-14)
- Que aprueba: advierte del riesgo de colisiones futuras con nuevas features del propio lenguaje (por ejemplo, cuando `Array.prototype.flat` no existia y alguien lo implemento a mano con otro comportamiento) y de romper el codigo de terceros que iteran sobre el objeto; reconoce que puede ser aceptable en un polyfill controlado.

**J44. sessionStorage y duracion**
- ES: ¿Cuanto dura la informacion guardada en `sessionStorage`?
- EN: How long does data stored in `sessionStorage` persist?
- Tipo: definicion | Nivel: junior | Frecuencia: baja (lydiahallie tema #22 "sessionStorage Duration", via WebFetch 2026-09-14)
- Fuente: https://github.com/lydiahallie/javascript-questions (leido parcialmente via raw README, 2026-09-14)

**J46. WeakMap y WeakSet**
- ES: ¿Que es un `WeakMap` y en que se diferencia de un `Map` normal? ¿Cuando ayuda a evitar fugas de memoria?
- EN: What is a `WeakMap` and how does it differ from a regular `Map`? When does it help avoid memory leaks?
- Tipo: definicion | Nivel: senior | Frecuencia: baja (extension natural del tema de memory leaks citado en J20/codesignal.com, resumen de busqueda, no leido de primera mano, 2026-09-14)
- Fuente: https://codesignal.com/blog/25-javascript-interview-questions-and-answers-from-basic-to-senior-level/ (resumen de busqueda, no leido, 2026-09-14)
- Que aprueba: explica que las claves de un `WeakMap` deben ser objetos y que estas no impiden que el recolector de basura libere el objeto si no hay otras referencias (a diferencia de `Map`, que retiene la clave para siempre); da un caso de uso como metadatos asociados a nodos DOM que se limpian solos al eliminarse el nodo.

**J47. Generators e iteradores**
- ES: ¿Que es un generator (`function*`) en JavaScript? Escribe uno que genere una secuencia infinita de numeros.
- EN: What is a generator (`function*`) in JavaScript? Write one that generates an infinite sequence of numbers.
- Tipo: kata | Nivel: senior | Frecuencia: baja (mencionado junto a "Promises methods and generators" como tema intermedio-senior en resumen de busqueda de codesignal.com, 2026-09-14, no leido de primera mano)
- Fuente: https://codesignal.com/blog/25-javascript-interview-questions-and-answers-from-basic-to-senior-level/ (resumen de busqueda, no leido, 2026-09-14)

**J48. flat y flatMap**
- ES: ¿Que hacen `Array.prototype.flat()` y `Array.prototype.flatMap()`? Da un ejemplo de cuando `flatMap` ahorra un paso frente a usar `map` + `flat` por separado.
- EN: What do `Array.prototype.flat()` and `Array.prototype.flatMap()` do? Give an example where `flatMap` saves a step compared to `map` + `flat` separately.
- Tipo: kata | Nivel: mid | Frecuencia: baja (extension del bloque de metodos de array citado en sudheerj TOC (slice/splice) y h5bp (map/forEach), via WebFetch 2026-09-14; sin cita textual exacta de esta variante especifica)
- Fuente: https://github.com/sudheerj/javascript-interview-questions (leido 2026-09-14)

**J49. Proxy y Reflect**
- ES: ¿Que es un `Proxy` en JavaScript? Da un ejemplo simple de interceptar el acceso a una propiedad de un objeto.
- EN: What is a `Proxy` in JavaScript? Give a simple example of intercepting property access on an object.
- Tipo: definicion | Nivel: senior | Frecuencia: baja (feature ES2015+ citada de forma recurrente en listados de "JavaScript avanzado" para entrevistas senior; sin cita textual de entrevista especifica localizada, hipotesis de frecuencia baja, ver Incertidumbres)
- Fuente: hipotesis, no verificado con una fuente de entrevista concreta (2026-09-14)

**J50. forEach vs map: por que no se debe usar forEach para transformar datos**
- ES: ¿Puedes explicar la diferencia principal entre el bucle `Array.forEach()` y el metodo `Array.map()`?
- EN: Can you describe the main difference between the `Array.forEach()` loop and the `Array.map()` method?
- Tipo: definicion | Nivel: junior | Frecuencia: alta (h5bp, cita textual exacta, via WebFetch 2026-09-14)
- Fuente: https://github.com/h5bp/Front-end-Developer-Interview-Questions/blob/main/src/questions/javascript-questions.md (leido 2026-09-14)
- Que aprueba: explica que `forEach` no devuelve nada (siempre `undefined`) y se usa por efectos secundarios, mientras `map` devuelve un nuevo array transformado y no deberia usarse para efectos secundarios ni ignorar su retorno; menciona el antipatron de usar `map` solo para iterar sin usar el array resultante.

**J45. Comparar arrays de objetos y eliminar duplicados (variante de la pregunta de razonamiento)**
- ES: Dado un array de objetos con un campo `id`, escribe una funcion que elimine los duplicados quedandose con la primera ocurrencia.
- EN: Given an array of objects with an `id` field, write a function that removes duplicates, keeping the first occurrence.
- Tipo: kata | Nivel: junior | Frecuencia: alta (variante practica muy citada del patron general "find duplicates in an array", presente en multiples fuentes: GeeksforGeeks, js-craft.io, dev.to/rk042, resumen de busqueda, no leido de primera mano en ninguna en particular, 2026-09-14; ver tambien B.4 para la version de razonamiento a escala)
- Fuente: https://www.geeksforgeeks.org/javascript/javascript-program-to-find-duplicate-elements-in-an-array/ (resumen de busqueda, no leido, 2026-09-14)

### B.3 TypeScript

**T1. TypeScript como superset de JavaScript**
- ES: ¿Que significa que "TypeScript es un superset de JavaScript"? ¿Que aporta que no tenga JS?
- EN: What does it mean that "TypeScript is a superset of JavaScript"? What does it add that JS doesn't have?
- Tipo: definicion | Nivel: junior | Frecuencia: alta (Devinterview-io/typescript-interview-questions, pregunta 1-2 del listado, via WebFetch 2026-09-14)
- Fuente: https://github.com/Devinterview-io/typescript-interview-questions (leido 2026-09-14)

**T2. Tipos basicos**
- ES: Nombra los tipos basicos de TypeScript (`string`, `number`, `boolean`, `array`, `tuple`, etc.) con un ejemplo de cada uno.
- EN: Name TypeScript's basic types (`string`, `number`, `boolean`, `array`, `tuple`, etc.) with an example of each.
- Tipo: definicion | Nivel: junior | Frecuencia: alta (Devinterview-io, "What are the basic types available in TypeScript?", via WebFetch 2026-09-14)
- Fuente: https://github.com/Devinterview-io/typescript-interview-questions (leido 2026-09-14)

**T3. type vs interface**
- ES: ¿Cual es la diferencia entre `type` e `interface` en TypeScript? ¿Cuando usarias uno u otro?
- EN: What is the difference between `type` and `interface` in TypeScript? When would you use one over the other?
- Tipo: fundamento | Nivel: mid | Frecuencia: alta (pregunta clasica de TS, tema central del cheatsheet typescript-cheatsheets/react, via WebFetch 2026-09-14: el repo dedica secciones especificas a "types vs interfaces")
- Fuente: https://github.com/typescript-cheatsheets/react (leido 2026-09-14)
- Que aprueba: explica que `interface` se puede extender (`extends`) y hacer "declaration merging" (reabrir la misma interfaz para anadir campos), mientras `type` es mas flexible para uniones, intersecciones y tipos condicionales; da un criterio practico (interface para formas de objetos/props publicas de una libreria, type para uniones o tipos complejos) en vez de decir que da igual.

**T4. Interfaces y su uso**
- ES: ¿Que son las interfaces en TypeScript y como funcionan?
- EN: What are interfaces in TypeScript and how do they work?
- Tipo: definicion | Nivel: junior | Frecuencia: alta (Devinterview-io, cita textual, via WebFetch 2026-09-14)
- Fuente: https://github.com/Devinterview-io/typescript-interview-questions (leido 2026-09-14)

**T5. Genericos**
- ES: ¿Que son los genericos en TypeScript? Escribe una funcion generica `firstOf<T>(arr: T[]): T | undefined`.
- EN: What are generics in TypeScript? Write a generic function `firstOf<T>(arr: T[]): T | undefined`.
- Tipo: kata | Nivel: mid | Frecuencia: alta (tema central de typescript-cheatsheets/react, seccion de "Generics", via WebFetch 2026-09-14; tambien recurrente en listados generales de TS como aershov24/typescript-interview-questions segun resumen de busqueda)
- Fuente: https://github.com/typescript-cheatsheets/react (leido 2026-09-14)
- Que aprueba: explica que los genericos permiten escribir funciones/tipos reutilizables sin perder la informacion de tipo concreto (en vez de usar `any`), y su ejemplo compila mentalmente sin errores obvios; idealmente menciona restricciones (`extends`) para acotar el generico.

**T6. Utility types: Partial, Pick, Omit, Record**
- ES: Explica que hacen los utility types `Partial<T>`, `Pick<T, K>`, `Omit<T, K>` y `Record<K, V>`, con un ejemplo de cada uno.
- EN: Explain what the utility types `Partial<T>`, `Pick<T, K>`, `Omit<T, K>` and `Record<K, V>` do, with an example of each.
- Tipo: kata | Nivel: mid | Frecuencia: alta (utility types documentados como patron central en typescript-cheatsheets/react, via WebFetch 2026-09-14; tema recurrente en Devinterview-io "Top 100 Typescript Interview Questions")
- Fuente: https://github.com/typescript-cheatsheets/react (leido 2026-09-14)
- Que aprueba: da un ejemplo correcto de cada utility type (no solo la definicion), por ejemplo usar `Partial<User>` para un formulario de edicion parcial, `Pick`/`Omit` para construir un DTO a partir de una entidad, y `Record<string, number>` para un diccionario tipado.

**T7. unknown vs any**
- ES: ¿Cual es la diferencia entre `unknown` y `any` en TypeScript? ¿Por que se recomienda `unknown` en lugar de `any`?
- EN: What is the difference between `unknown` and `any` in TypeScript? Why is `unknown` recommended over `any`?
- Tipo: fundamento | Nivel: mid | Frecuencia: alta (dev.to/lucaspaganini "unknown vs any in typescript", resumen de busqueda, no leido de primera mano, 2026-09-14; tema documentado tambien en la TypeScript Handbook oficial)
- Fuente: https://dev.to/lucaspaganini/unknown-vs-any-in-typescript-1i31 (resumen de busqueda, no leido, 2026-09-14)
- Que aprueba: explica que `any` desactiva el chequeo de tipos (se puede operar con el valor sin restricciones, perdiendo seguridad), mientras `unknown` obliga a comprobar/estrechar el tipo (con `typeof`, `instanceof`, o un type guard) antes de poder usarlo; recomienda `unknown` como valor por defecto para datos externos (respuestas de API) y reservar `any` como ultimo recurso.

**T8. Narrowing (estrechamiento de tipos)**
- ES: ¿Que es el "narrowing" (estrechamiento) de tipos en TypeScript? Da un ejemplo con `typeof` y otro con un discriminated union.
- EN: What is type "narrowing" in TypeScript? Give an example with `typeof` and another with a discriminated union.
- Tipo: fundamento | Nivel: mid | Frecuencia: alta (TypeScript Handbook oficial, pagina dedicada "Narrowing", citada como referencia principal en multiples fuentes de busqueda, 2026-09-14)
- Fuente: https://www.typescriptlang.org/docs/handbook/2/narrowing.html (resumen de busqueda, no leido de primera mano en detalle, 2026-09-14)

**T9. Discriminated unions**
- ES: ¿Que es un "discriminated union" (union discriminada) en TypeScript? Modela una forma (`Circle`, `Square`) con este patron y una funcion `area` que use un `switch`.
- EN: What is a "discriminated union" in TypeScript? Model a shape (`Circle`, `Square`) using this pattern and an `area` function that uses a `switch`.
- Tipo: kata | Nivel: mid | Frecuencia: alta (Lucas Paganini academy, articulo dedicado "Discriminated Unions or Tagged Unions Types - TypeScript Narrowing #4", resumen de busqueda, no leido de primera mano, 2026-09-14)
- Fuente: https://www.lucaspaganini.com/academy/discriminated-unions-types-typescript-narrowing-4/ (resumen de busqueda, no leido, 2026-09-14)
- Que aprueba: usa una propiedad literal comun (por ejemplo `kind: "circle" | "square"`) para que TypeScript pueda estrechar el tipo dentro de cada rama del `switch`, y idealmente menciona el patron de "exhaustiveness checking" con una funcion `assertNever` en el `default` para que el compilador avise si se anade un nuevo caso sin manejarlo.

**T10. Enums vs union de literales**
- ES: ¿Que son los `enum` en TypeScript? ¿Por que muchos equipos prefieren usar una union de string literals en vez de un enum?
- EN: What are `enum`s in TypeScript? Why do many teams prefer a union of string literals over an enum?
- Tipo: fundamento | Nivel: mid | Frecuencia: media (Devinterview-io: "Describe the Enum type and when you might use it.", via WebFetch 2026-09-14; el debate enum vs union de literales es un tema recurrente en la comunidad TS, resumen general)
- Fuente: https://github.com/Devinterview-io/typescript-interview-questions (leido 2026-09-14)
- Que aprueba: explica que los enums numericos generan codigo JS extra en tiempo de ejecucion y tienen comportamientos sorprendentes (mapeo inverso), y que una union de literales (`type Status = "pending" | "done"`) suele ser mas simple, no genera codigo extra y se integra mejor con narrowing.

**T11. Strict mode en TypeScript**
- ES: ¿Que activa la opcion `strict: true` en `tsconfig.json`? Nombra al menos 3 flags que incluye.
- EN: What does the `strict: true` option in `tsconfig.json` enable? Name at least 3 flags it includes.
- Tipo: definicion | Nivel: mid | Frecuencia: media (tema documentado en la TypeScript Handbook oficial y mencionado en multiples guias de configuracion de proyectos TS; sin cita textual de entrevista especifica encontrada, ver Incertidumbres)
- Fuente: hipotesis basada en documentacion oficial de TypeScript (no verificado contra una fuente de entrevista concreta, 2026-09-14)
- Que aprueba: nombra flags concretos como `strictNullChecks` (obliga a manejar `null`/`undefined` explicitamente), `noImplicitAny` (prohibe tipos `any` implicitos) y `strictFunctionTypes`, y explica por que activarlos desde el inicio de un proyecto es mas facil que migrarlo despues.

**T12. Cuando NO usar TypeScript**
- ES: ¿En que casos consideras que NO vale la pena usar TypeScript en un proyecto?
- EN: In what cases do you think it's NOT worth using TypeScript on a project?
- Tipo: comportamental | Nivel: senior | Frecuencia: baja (pregunta de opinion/criterio, tema recurrente en debates de la comunidad sobre TS pero sin cita textual de entrevista especifica localizada; hipotesis de frecuencia baja-media, no confirmada con conteo de fuentes)
- Fuente: hipotesis, no verificado con una fuente de entrevista concreta (ver Incertidumbres)
- Que aprueba: da criterios concretos en vez de decir "siempre hay que usar TS": prototipos muy cortos o scripts de un solo uso, equipos sin experiencia previa bajo mucha presion de plazo, o proyectos donde el coste de configurar el tooling supera el beneficio a corto plazo; reconoce que la migracion incremental (`// @ts-check` con JSDoc, `allowJs`) es una alternativa intermedia.

**T13. Declaracion de tipos para librerias sin tipos (.d.ts)**
- ES: Tienes que usar una libreria de JavaScript que no tiene tipos. ¿Como le añadirias tipos en TypeScript?
- EN: You need to use a JavaScript library with no types. How would you add types to it in TypeScript?
- Tipo: razonamiento | Nivel: mid | Frecuencia: baja (tema documentado en la TypeScript Handbook oficial, seccion de "Declaration files"; sin cita textual de entrevista especifica localizada, hipotesis de frecuencia)
- Fuente: hipotesis basada en documentacion oficial de TypeScript (no verificado contra una fuente de entrevista concreta, 2026-09-14)
- Que aprueba: menciona `@types/<paquete>` de DefinitelyTyped como primera opcion, y si no existe, escribir un fichero `.d.ts` propio con `declare module`; sabe que puede empezar con un tipado minimo (`declare module 'libreria'`) e ir refinandolo.

**T14. Tipos condicionales (nivel avanzado)**
- ES: ¿Que es un tipo condicional en TypeScript (`T extends U ? X : Y`)? Da un ejemplo simple.
- EN: What is a conditional type in TypeScript (`T extends U ? X : Y`)? Give a simple example.
- Tipo: kata | Nivel: senior | Frecuencia: baja (documentado en typescript-cheatsheets/react como patron avanzado de "reusable type utilities", via WebFetch 2026-09-14)
- Fuente: https://github.com/typescript-cheatsheets/react (leido 2026-09-14)

**T15. Clases: modificadores de acceso**
- ES: ¿Que hacen los modificadores `public`, `private` y `protected` en una clase de TypeScript?
- EN: What do the `public`, `private` and `protected` modifiers do in a TypeScript class?
- Tipo: definicion | Nivel: junior | Frecuencia: media (Devinterview-io: "What are access modifiers and how do they work in TypeScript?", via WebFetch 2026-09-14)
- Fuente: https://github.com/Devinterview-io/typescript-interview-questions (leido 2026-09-14)

**T16. Inferencia de tipos**
- ES: ¿Que es la inferencia de tipos ("type inference") en TypeScript? ¿Cuando conviene anotar el tipo explicitamente aunque se pueda inferir?
- EN: What does "type inference" mean in TypeScript? When is it worth annotating the type explicitly even if it can be inferred?
- Tipo: fundamento | Nivel: junior | Frecuencia: media (Devinterview-io, cita textual, via WebFetch 2026-09-14)
- Fuente: https://github.com/Devinterview-io/typescript-interview-questions (leido 2026-09-14)

**T17. Genericos con restricciones (extends)**
- ES: ¿Como restringirias un tipo generico para que solo acepte objetos con una propiedad `id`?
- EN: How would you constrain a generic type so it only accepts objects with an `id` property?
- Tipo: kata | Nivel: mid | Frecuencia: baja (extension natural del tema de genericos documentado en typescript-cheatsheets/react, via WebFetch 2026-09-14; sin cita textual de pregunta exacta)
- Fuente: https://github.com/typescript-cheatsheets/react (leido 2026-09-14)
- Que aprueba: escribe algo equivalente a `function getId<T extends { id: string }>(item: T): string` y explica que `extends` aqui es una restriccion estructural, no herencia de clases.

**T18. as const**
- ES: ¿Que hace `as const` en TypeScript? Da un ejemplo con un array de strings.
- EN: What does `as const` do in TypeScript? Give an example with an array of strings.
- Tipo: kata | Nivel: mid | Frecuencia: baja (tema recurrente en cheatsheets modernos de TS incluido typescript-cheatsheets/react, via WebFetch 2026-09-14; sin cita textual exacta de pregunta de entrevista)
- Fuente: https://github.com/typescript-cheatsheets/react (leido 2026-09-14)

**T19. Tipar props de un componente (contexto React/UI)**
- ES: ¿Como tiparias las props de un componente que recibe `children` opcionales y un callback `onSelect(id: string): void`?
- EN: How would you type the props of a component that receives optional `children` and a callback `onSelect(id: string): void`?
- Tipo: kata | Nivel: mid | Frecuencia: media (tema nuclear del repo typescript-cheatsheets/react, seccion "Typing Component Props", via WebFetch 2026-09-14)
- Fuente: https://github.com/typescript-cheatsheets/react (leido 2026-09-14)

**T20. Compilacion: de TypeScript a JavaScript**
- ES: ¿Como se compilan los archivos TypeScript a JavaScript? ¿Que rol juega el `target` en `tsconfig.json`?
- EN: How are TypeScript files compiled to JavaScript? What role does `target` play in `tsconfig.json`?
- Tipo: definicion | Nivel: junior | Frecuencia: media (Devinterview-io: "How do you compile TypeScript files into JavaScript?", via WebFetch 2026-09-14)
- Fuente: https://github.com/Devinterview-io/typescript-interview-questions (leido 2026-09-14)

### B.4 Razonamiento hablado / preguntas abiertas tipo "tienes 100.000 pedidos..."

Nota metodologica: la pregunta exacta "tienes 100.000 pedidos y quieres detectar duplicados" citada en el encargo no se localizo textualmente en ninguna fuente publica durante esta investigacion (ver Incertidumbres). Las preguntas siguientes son del mismo estilo (razonamiento hablado sobre un problema practico a escala, sin pedir codigo LeetCode-hard) y si estan respaldadas por fuentes concretas: el hilo de Hacker News "Ask HN: Common interview questions for senior software engineer position?" (id 7827048) y "My list of JavaScript interview questions" (id 14667256), resumenes de busqueda de Glassdoor, y patrones citados en blogs de preparacion de entrevistas fullstack.

**R1. Detectar duplicados en un dataset grande**
- ES: Tienes un archivo con 100.000 pedidos y sospechas que hay pedidos duplicados (mismo cliente, mismo producto, mismo importe, en una ventana de minutos). ¿Como lo abordarias, hablando en voz alta desde la estrategia de datos hasta la implementacion?
- EN: You have a file with 100,000 orders and suspect there are duplicate orders (same customer, same product, same amount, within a few minutes). How would you approach it, thinking out loud from data strategy to implementation?
- Tipo: razonamiento | Nivel: mid | Frecuencia: media (hipotesis basada en el encargo del usuario, que la describe como pregunta real vivida en entrevista; el patron generico "find duplicates at scale" es un tema recurrente en preparacion de entrevistas segun multiples fuentes de busqueda sobre deteccion de duplicados en arrays/bases de datos, 2026-09-14, no se encontro la redaccion exacta de 100.000 pedidos en ninguna fuente publica)
- Fuente: hipotesis del usuario + patron generico documentado en https://www.geeksforgeeks.org/javascript/javascript-program-to-find-duplicate-elements-in-an-array/ (resumen de busqueda, no leido de primera mano, 2026-09-14); ver Incertidumbres
- Que aprueba: primero define que es "duplicado" (exact match vs match difuso por ventana temporal), propone una clave compuesta y una estructura O(n) (`Map`/`Set` o `GROUP BY` en SQL) en vez de comparar todos contra todos O(n^2), habla del trade-off memoria vs tiempo, y menciona como validaria falsos positivos (dos pedidos legitimos identicos hechos por error del usuario, no del sistema) antes de borrar nada.

**R2. Diagnosticar una pagina lenta**
- ES: Los usuarios reportan que una pagina tarda mucho en cargar. ¿Como averiguarias donde esta el cuello de botella y que harias despues?
- EN: Users are reporting that a page takes a long time to load. How would you find out where the time is being spent, and what would you do next?
- Tipo: razonamiento | Nivel: senior | Frecuencia: media (citada casi textualmente en resumen de busqueda de un articulo agregado de preguntas para senior: "Users are reporting that page X takes a long time to load. How would you go about finding out why...", via WebSearch 2026-09-14, no leido de primera mano en la fuente original)
- Fuente: resumen de busqueda que agrega contenido de codesignal.com/igmguru/interviewbit sobre preguntas senior de JS (no leido de primera mano en detalle, 2026-09-14)
- Que aprueba: propone medir antes de actuar (DevTools Performance/Network, Lighthouse, Web Vitals), distingue entre tiempo de red, parseo/render y JS bloqueante, y prioriza hipotesis por impacto (payload grande, N+1 de peticiones, render bloqueante) antes de proponer soluciones concretas.

**R3. Rastrear todos los clics del usuario en el sitio**
- ES: Quieren implementar un sistema que registre cada clic que hace el usuario en el sitio. ¿Como lo disenarias sin degradar el rendimiento?
- EN: The team wants to implement a way of tracking every click the user makes on the site. How would you design it without degrading performance?
- Tipo: razonamiento | Nivel: mid | Frecuencia: media (citada en resumen de busqueda de Glassdoor: "If we wanted to implement a method of tracking every click that the user made on the site, how would we want to do this?", via WebSearch 2026-09-14, no leido de primera mano por bloqueo 403 de Glassdoor)
- Fuente: https://www.glassdoor.com/Interview/frontend-javascript-developer-interview-questions-SRCH_KO0,29.htm (resumen de busqueda, no leido de primera mano, 2026-09-14)
- Que aprueba: propone event delegation (un unico listener en un ancestro comun en vez de un listener por elemento) para no degradar el rendimiento, batchea/agrupa los eventos antes de enviarlos (no un request por clic), y considera `navigator.sendBeacon` o una cola con reintentos para no perder eventos al cerrar la pestana.

**R4. Optimizar una funcion que se ejecuta 10 millones de veces**
- ES: Tienes una funcion que tarda 1 segundo en ejecutarse y necesitas ejecutarla 10 millones de veces. ¿Como reducirias el tiempo total de ejecucion?
- EN: Say there was a function that took 1 second to execute and you needed to run this function 10 million times, how would you cut down on the execution time?
- Tipo: razonamiento | Nivel: senior | Frecuencia: baja (cita casi textual encontrada en resumen de busqueda de Glassdoor sobre preguntas de "Frontend javascript developer", via WebSearch 2026-09-14, no leido de primera mano por bloqueo 403)
- Fuente: https://www.glassdoor.com/Interview/frontend-javascript-developer-interview-questions-SRCH_KO0,29.htm (resumen de busqueda, no leido de primera mano, 2026-09-14)
- Que aprueba: en vez de asumir que hay que "hacerlo mas rapido a fuerza bruta", pregunta primero si el resultado se puede cachear/memoizar (si hay inputs repetidos), si el trabajo se puede paralelizar (Web Workers, procesos en Node), o si el algoritmo interno tiene una complejidad mejorable; reconoce que 10 millones x 1 segundo es ~115 dias, por lo que el enfoque casi seguro es evitar ejecutar la funcion completa, no solo optimizarla linea a linea.

**R5. Renderizar HTML desde un string y un array de estilos (mini editor de texto)**
- ES: Te piden renderizar HTML a partir de un string de texto plano y un array que describe estilos (negrita, cursiva) en ciertos rangos, como en un editor de texto enriquecido simple. ¿Como estructurarias la solucion?
- EN: You're asked to render HTML from a plain text string and an array describing styles (bold, italic) over certain ranges, similar to a simple rich text editor. How would you structure the solution?
- Tipo: kata | Nivel: mid | Frecuencia: baja (citada en resumen de busqueda de Glassdoor como ejemplo de "practical coding challenge" para frontend, via WebSearch 2026-09-14, no leido de primera mano)
- Fuente: https://www.glassdoor.com/Interview/frontend-javascript-developer-interview-questions-SRCH_KO0,29.htm (resumen de busqueda, no leido de primera mano, 2026-09-14)

**R6. Escalar un endpoint que recibe picos de trafico**
- ES: Un endpoint que normalmente recibe 100 peticiones por minuto de repente recibe 10.000 en un minuto (por ejemplo, una promocion). ¿Que harias para que no caiga, pensando tanto en frontend como en backend?
- EN: An endpoint that normally gets 100 requests per minute suddenly gets 10,000 in a minute (e.g. a promotion). What would you do to keep it from falling over, thinking about both frontend and backend?
- Tipo: razonamiento | Nivel: senior | Frecuencia: baja (patron generico de pregunta de "escalabilidad ligera" para fullstack; hipotesis basada en el estilo de preguntas de sistema descrito de forma generica en yangshun/tech-interview-handbook, seccion de practical/system design, no se leyo el contenido especifico de esta pregunta, 2026-09-14)
- Fuente: hipotesis basada en el enfoque de yangshun/tech-interview-handbook (leido parcialmente en cuanto a licencia/estructura general, no en el contenido detallado de esta pregunta, 2026-09-14); ver Incertidumbres
- Que aprueba: en el lado cliente menciona debounce/throttle de reintentos, backoff exponencial y deshabilitar el boton tras el primer clic; en el lado servidor menciona rate limiting, colas, cache y horizontal scaling; y sobre todo prioriza (no intenta resolverlo todo a la vez).

**R7. Diseñar la cache de un listado que cambia poco**
- ES: Tienes un listado de productos que cambia poco (una vez al dia) pero se consulta miles de veces por minuto. ¿Donde y como lo cachearias?
- EN: You have a product listing that changes rarely (once a day) but is queried thousands of times per minute. Where and how would you cache it?
- Tipo: razonamiento | Nivel: mid | Frecuencia: baja (patron generico de pregunta practica de cache para fullstack; hipotesis, no se localizo una cita textual de entrevista especifica en las fuentes exploradas, ver Incertidumbres)
- Fuente: hipotesis, no verificado con una fuente de entrevista concreta (2026-09-14)
- Que aprueba: distingue niveles de cache (CDN/HTTP cache con `Cache-Control`, cache en memoria del servidor, cache en el cliente) y explica como invalidarla cuando el dato cambia (TTL corto, invalidacion manual al hacer el cambio, versionado de la clave de cache) en vez de solo decir "lo cacheo".

**R8. Depurar codigo asincrono que falla de forma intermitente**
- ES: Un test o una funcionalidad falla de forma intermitente (a veces pasa, a veces no) y sospechas que es un problema de asincronia. ¿Como lo depurarias?
- EN: A test or feature fails intermittently (sometimes it passes, sometimes it doesn't) and you suspect it's an async issue. How would you debug it?
- Tipo: razonamiento | Nivel: mid | Frecuencia: baja (variante practica del tema "debugging scenarios" citado en el hilo de HN 14667256, seccion final del post original, via WebFetch 2026-09-14)
- Fuente: https://news.ycombinator.com/item?id=14667256 (leido 2026-09-14, publicado 2017-06-29)
- Que aprueba: sospecha primero de condiciones de carrera (orden de promesas no garantizado, falta de `await`, dependencia de temporizadores en tests), propone reproducir el fallo de forma controlada (forzando delays, ejecutando el test muchas veces en bucle) antes de "arreglar a ciegas".

**R9. Diseño de sistema simple: acortador de URLs**
- ES: Diseña, a alto nivel, un acortador de URLs tipo bit.ly. ¿Que decisiones tomarias sobre como generar el codigo corto y como lo consultarias rapido?
- EN: Design, at a high level, a URL shortener like bit.ly. What decisions would you make about generating the short code and looking it up quickly?
- Tipo: razonamiento | Nivel: mid | Frecuencia: baja (ejemplo clasico de "system design ligero" citado de forma generica en preparacion de entrevistas fullstack; no se localizo una fuente de entrevista real especifica con esta redaccion exacta, hipotesis basada en patrones ampliamente documentados en la industria, ver Incertidumbres)
- Fuente: hipotesis, no verificado con una fuente de entrevista concreta (2026-09-14)

**R10. Que harias si el equipo no tiene tests y hay que anadir una feature critica**
- ES: Te unes a un proyecto sin tests y te piden anadir una funcionalidad critica de pagos. ¿Como lo abordas?
- EN: You join a project with no tests and are asked to add a critical payments feature. How do you approach it?
- Tipo: comportamental | Nivel: mid | Frecuencia: baja (variante practica del tema de testing citado de forma generica en Glassdoor: "test-driven development, unit-testing, continuous integration" segun resumen de busqueda, 2026-09-14, no leido de primera mano)
- Fuente: https://www.glassdoor.com/Interview/frontend-javascript-developer-interview-questions-SRCH_KO0,29.htm (resumen de busqueda, no leido de primera mano, 2026-09-14)
- Que aprueba: no propone "escribir tests de todo el proyecto primero" (poco realista), sino anadir tests alrededor del codigo que va a tocar (characterization tests) antes de modificarlo, y priorizar cobertura en la ruta critica de pagos por el riesgo de negocio.

**R11. Elegir entre reescribir o refactorizar codigo legado**
- ES: Heredas un modulo de codigo legado dificil de mantener. ¿Como decides si lo refactorizas de forma incremental o lo reescribes desde cero?
- EN: You inherit a hard-to-maintain legacy module. How do you decide whether to refactor it incrementally or rewrite it from scratch?
- Tipo: comportamental | Nivel: senior | Frecuencia: baja (tema recurrente de criterio senior citado de forma generica en discusiones sobre entrevistas senior; sin cita textual especifica localizada durante esta investigacion, hipotesis de frecuencia baja-media, ver Incertidumbres)
- Fuente: hipotesis, no verificado con una fuente de entrevista concreta (2026-09-14)
- Que aprueba: cita el riesgo conocido de las reescrituras completas (perder comportamiento no documentado, el "big rewrite" que nunca termina) y prefiere justificar una estrategia incremental (strangler fig pattern) salvo que el codigo este realmente aislado y sea pequeño.

**R12. Priorizar deuda tecnica frente a negocio**
- ES: El negocio pide una feature nueva pero tu ves deuda tecnica que la haria mas fragil. ¿Como planteas la conversacion?
- EN: The business wants a new feature but you see technical debt that would make it fragile. How do you frame that conversation?
- Tipo: comportamental | Nivel: senior | Frecuencia: baja (tema clasico de entrevista de comportamiento/liderazgo tecnico, citado de forma generica; hipotesis, no se localizo cita textual especifica en las fuentes exploradas, ver Incertidumbres)
- Fuente: hipotesis, no verificado con una fuente de entrevista concreta (2026-09-14)

**R13. Explicar un concepto tecnico a alguien no tecnico**
- ES: Explica que es una API a alguien que no tiene conocimientos tecnicos, en menos de un minuto.
- EN: Explain what an API is to someone with no technical background, in under a minute.
- Tipo: comportamental | Nivel: junior | Frecuencia: baja (formato de pregunta comportamental generico usado en varias guias de entrevista; sin cita textual especifica localizada, hipotesis de frecuencia, ver Incertidumbres)
- Fuente: hipotesis, no verificado con una fuente de entrevista concreta (2026-09-14)

**R14. Que harias si no sabes la respuesta a una pregunta tecnica**
- ES: Te hacen una pregunta tecnica en la entrevista y no sabes la respuesta. ¿Que haces?
- EN: You're asked a technical question in the interview and you don't know the answer. What do you do?
- Tipo: comportamental | Nivel: junior | Frecuencia: media (consejo/pregunta recurrente en guias generales de preparacion de entrevista, por ejemplo mencionado de forma implicita en coderslink.com, resumen de busqueda, no leido de primera mano, 2026-09-14)
- Fuente: https://coderslink.com/talento/blog/preguntas-esenciales-en-una-entrevista-de-programador/ (resumen de busqueda, no leido, 2026-09-14)
- Que aprueba: en vez de improvisar una respuesta inventada, admite honestamente que no lo sabe, explica como lo buscaria/verificaria, y si puede, relaciona el concepto con algo cercano que si conoce para mostrar razonamiento en lugar de silencio total.

**R15. Elegir entre dos librerias/soluciones tecnicas**
- ES: Tienes que elegir entre dos librerias para resolver el mismo problema (por ejemplo, gestion de estado). ¿Que criterios usas para decidir?
- EN: You have to choose between two libraries that solve the same problem (e.g. state management). What criteria do you use to decide?
- Tipo: comportamental | Nivel: mid | Frecuencia: baja (formato generico de pregunta de criterio tecnico citado en multiples guias sin una fuente unica textual localizada; hipotesis de frecuencia, ver Incertidumbres)
- Fuente: hipotesis, no verificado con una fuente de entrevista concreta (2026-09-14)
- Que aprueba: menciona criterios objetivos (mantenimiento activo, tamano del bundle, curva de aprendizaje del equipo, comunidad/documentacion, compatibilidad con el stack actual) en vez de una preferencia personal sin justificar.

**T21. Index signatures**
- ES: ¿Que es una "index signature" en TypeScript (`{ [key: string]: number }`)? ¿En que se diferencia de usar `Record<string, number>`?
- EN: What is an "index signature" in TypeScript (`{ [key: string]: number }`)? How does it differ from using `Record<string, number>`?
- Tipo: kata | Nivel: mid | Frecuencia: baja (extension natural del tema de utility types documentado en typescript-cheatsheets/react, via WebFetch 2026-09-14; sin cita textual exacta de esta comparacion especifica)
- Fuente: https://github.com/typescript-cheatsheets/react (leido 2026-09-14)

**T22. El tipo never**
- ES: ¿Que representa el tipo `never` en TypeScript? Da un ejemplo de uso en una funcion que siempre lanza una excepcion y otro en un `switch` exhaustivo.
- EN: What does the `never` type represent in TypeScript? Give an example in a function that always throws, and another in an exhaustive `switch`.
- Tipo: definicion | Nivel: senior | Frecuencia: baja (relacionado con el patron de "exhaustiveness checking" mencionado en T9 sobre discriminated unions, via WebFetch a lucaspaganini.com, resumen de busqueda, no leido de primera mano, 2026-09-14)
- Fuente: https://www.lucaspaganini.com/academy/discriminated-unions-types-typescript-narrowing-4/ (resumen de busqueda, no leido, 2026-09-14)

**T23. Enums numericos vs enums de string**
- ES: ¿Que diferencia hay entre un enum numerico y un enum de string en TypeScript? ¿Cual da mas seguridad al depurar?
- EN: What is the difference between a numeric enum and a string enum in TypeScript? Which gives more safety when debugging?
- Tipo: definicion | Nivel: mid | Frecuencia: baja (extension del tema T10 sobre enums, documentado en Devinterview-io, via WebFetch 2026-09-14)
- Fuente: https://github.com/Devinterview-io/typescript-interview-questions (leido 2026-09-14)
- Que aprueba: explica que un enum numerico por defecto asigna 0, 1, 2... lo que dificulta depurar (un log solo muestra un numero sin contexto), mientras un enum de string muestra el valor legible directamente; menciona el riesgo de reordenar miembros en un enum numerico y romper valores ya persistidos (por ejemplo en una base de datos).

**T24. Constructores y clases en TypeScript vs ES6**
- ES: ¿Como se implementa la herencia en una clase de TypeScript? ¿Que añade TypeScript sobre las clases de ES6 (por ejemplo, en el constructor)?
- EN: How is inheritance implemented in a TypeScript class? What does TypeScript add over ES6 classes (for example, in the constructor)?
- Tipo: definicion | Nivel: junior | Frecuencia: media (Devinterview-io: "How do you implement Inheritance in TypeScript?", via WebFetch 2026-09-14)
- Fuente: https://github.com/Devinterview-io/typescript-interview-questions (leido 2026-09-14)

**T25. Clases abstractas**
- ES: ¿Que es una clase abstracta en TypeScript y para que sirve frente a una interfaz?
- EN: What is an abstract class in TypeScript, and what is it useful for compared to an interface?
- Tipo: definicion | Nivel: mid | Frecuencia: baja (Devinterview-io: "Discuss Abstract classes and their purposes in TypeScript.", via WebFetch 2026-09-14)
- Fuente: https://github.com/Devinterview-io/typescript-interview-questions (leido 2026-09-14)
- Que aprueba: distingue que una clase abstracta puede tener implementacion parcial compartida (metodos concretos + metodos abstractos que las subclases deben implementar) y no se puede instanciar directamente, mientras una interfaz es un contrato puro sin implementacion; da un criterio de cuando usar cada una.

## C) Diez katas de JavaScript/TypeScript reales en entrevistas fullstack

**K1. Eliminar duplicados de un array**
- Fuente: patron citado en multiples guias (GeeksforGeeks, js-craft.io, dev.to/rk042), resumen de busqueda, no leido de primera mano, 2026-09-14. Ver tambien J45 y R1.
- Enunciado: Dado un array de numeros o de objetos (con un campo `id`), escribe una funcion `uniq(arr)` que devuelva los elementos unicos, preservando el orden de la primera aparicion.
- Casos de prueba sugeridos:
  - `uniq([1, 2, 2, 3, 1])` → `[1, 2, 3]`
  - `uniq([])` → `[]`
  - `uniqById([{id:1},{id:2},{id:1}])` → `[{id:1},{id:2}]`
  - Rendimiento: con un array de 100.000 elementos, la solucion no deberia ser O(n^2) (evitar `indexOf`/`includes` dentro de un bucle).

**K2. Implementar debounce**
- Fuente: https://prachub.com/interview-questions/implement-robust-debounce-and-throttle-in-javascript (citada como pregunta real de entrevista de Amazon; resumen de busqueda, no leido de primera mano, 2026-09-14). Ver tambien J18.
- Enunciado: Implementa `debounce(fn, delay)` que retrase la ejecucion de `fn` hasta que pasen `delay` ms sin nuevas llamadas.
- Casos de prueba sugeridos:
  - Llamar `debounced()` 5 veces en 100ms con `delay=300`: solo se ejecuta 1 vez, con los argumentos de la ultima llamada.
  - Si se deja de llamar durante `delay` ms, se ejecuta.
  - Version "leading": se ejecuta en la primera llamada y luego ignora hasta que pase el periodo de calma (opcional, nivel senior).

**K3. Implementar throttle**
- Fuente: https://prachub.com/interview-questions/implement-robust-debounce-and-throttle-in-javascript (resumen de busqueda, no leido de primera mano, 2026-09-14). Ver tambien J19.
- Enunciado: Implementa `throttle(fn, interval)` que garantice que `fn` se ejecuta como maximo una vez cada `interval` ms, sin importar cuantas veces se llame.
- Casos de prueba sugeridos:
  - Llamar 10 veces en 50ms con `interval=200`: se ejecuta como maximo 1 vez en esa ventana.
  - Con la variante "trailing", la ultima llamada dentro del intervalo tambien se ejecuta al final del periodo.

**K4. Polyfill de Promise.all**
- Fuente: https://www.geeksforgeeks.org/javascript/implement-polyfill-for-promise-all-method-in-javascript/ (resumen de busqueda, no leido de primera mano, 2026-09-14). Ver tambien J12.
- Enunciado: Implementa `myPromiseAll(promises)` que replique el comportamiento de `Promise.all`.
- Casos de prueba sugeridos:
  - Todas las promesas resuelven → devuelve un array con los valores en el mismo orden de entrada (no en orden de resolucion).
  - Una promesa rechaza → la promesa resultante rechaza inmediatamente con esa razon.
  - Array vacio → resuelve inmediatamente con `[]`.
  - Incluye valores no-promesa (por ejemplo un numero) → se tratan como ya resueltos.

**K5. Copia profunda de un objeto**
- Fuente: https://www.webreactiva.com/blog/15-preguntas-entrevistas-javascript, pregunta 11 (leido via WebFetch 2026-09-14, publicado 2023-06-06). Ver tambien J37.
- Enunciado: Implementa `deepClone(obj)` sin usar `structuredClone` ni librerias externas, que maneje objetos y arrays anidados.
- Casos de prueba sugeridos:
  - `deepClone({a: {b: 1}})` produce un objeto distinto en memoria, mutar la copia no afecta al original.
  - Maneja arrays anidados dentro de objetos y viceversa.
  - (Discusion oral) ¿Que pasa con fechas, funciones o referencias circulares? ¿Cuando usarias mejor `structuredClone`?

**K6. Currying**
- Fuente: https://github.com/h5bp/Front-end-Developer-Interview-Questions (leido via WebFetch 2026-09-14); sudheerj TOC item 15 (leido 2026-09-14). Ver tambien J26.
- Enunciado: Implementa `curry(fn)` que convierta una funcion de N argumentos en una secuencia de llamadas de un argumento cada una, permitiendo tambien llamarla con varios argumentos a la vez.
- Casos de prueba sugeridos:
  - `const add = curry((a,b,c) => a+b+c); add(1)(2)(3) === 6`
  - `add(1,2)(3) === 6`
  - `add(1,2,3) === 6`

**K7. Memoize**
- Fuente: sudheerj/javascript-interview-questions, TOC item 25 "What is memoization" (leido via WebFetch 2026-09-14). Ver tambien J27.
- Enunciado: Implementa `memoize(fn)` generico que cachee resultados por los argumentos de entrada.
- Casos de prueba sugeridos:
  - Llamar dos veces con los mismos argumentos primitivos solo ejecuta el calculo interno una vez (se puede verificar con un contador o un spy).
  - Llamar con argumentos distintos produce resultados independientes.
  - (Discusion oral) ¿Como manejarias argumentos que son objetos, donde la igualdad por referencia falla?

**K8. map/filter/reduce implementados con reduce**
- Fuente: patron generico de programacion funcional citado en sudheerj/javascript-interview-questions TOC items 11-17 (leido via WebFetch 2026-09-14). Ver tambien J17.
- Enunciado: Implementa tu propio `myMap(arr, fn)` y `myFilter(arr, fn)` usando `Array.prototype.reduce` internamente (no `Array.prototype.map`/`filter` nativos).
- Casos de prueba sugeridos:
  - `myMap([1,2,3], x => x*2)` → `[2,4,6]`
  - `myFilter([1,2,3,4], x => x % 2 === 0)` → `[2,4]`
  - Con array vacio, ambos devuelven `[]`.

**K9. Event emitter simple**
- Fuente: patron generico ligado al concepto de patron Observer citado en F8 (sin fuente unica de una kata textual especifica; combinacion de conocimiento general de la industria sobre katas frecuentes de "implementar tu propio EventEmitter" en entrevistas de Node.js/fullstack, hipotesis de frecuencia, ver Incertidumbres)
- Enunciado: Implementa una clase `EventEmitter` con metodos `on(event, callback)`, `off(event, callback)` y `emit(event, ...args)`.
- Casos de prueba sugeridos:
  - Suscribir dos callbacks al mismo evento y emitirlo dispara ambos con los argumentos correctos.
  - `off` elimina solo el callback indicado, no todos los del evento.
  - Emitir un evento sin listeners no lanza error.

**K10. Discriminated union + funcion exhaustiva en TypeScript**
- Fuente: https://www.lucaspaganini.com/academy/discriminated-unions-types-typescript-narrowing-4/ (resumen de busqueda, no leido de primera mano, 2026-09-14). Ver tambien T9.
- Enunciado: Modela en TypeScript un tipo `Shape` como union discriminada de `Circle` (`{ kind: "circle", radius: number }`) y `Rectangle` (`{ kind: "rectangle", width: number, height: number }`), y escribe una funcion `area(shape: Shape): number` que use un `switch` exhaustivo (que falle en tiempo de compilacion si se anade un nuevo `kind` sin manejarlo).
- Casos de prueba sugeridos:
  - `area({kind:"circle", radius: 2})` ≈ `12.566...`
  - `area({kind:"rectangle", width: 3, height: 4})` === `12`
  - (Prueba de tipos, no en runtime) Anadir un tercer tipo `Triangle` sin actualizar `area` debe producir un error de compilacion si se implemento correctamente el "exhaustiveness check" con `never`.

## D) Incertidumbres

- **La pregunta exacta "tienes 100.000 pedidos y quieres detectar duplicados, ¿como lo harias?"** citada en el encargo no se localizo textualmente en ninguna fuente publica durante esta investigacion (busquedas especificas en ingles y español, incluyendo Reddit r/cscareerquestions, no dieron con el hilo original). Se trato en R1 como hipotesis del estilo descrito, marcada como tal. Si el usuario recuerda donde la vivio (Glassdoor especifico, comunidad, screening propio de Devsparring), conviene anadir esa fuente directamente.
- **Glassdoor bloquea WebFetch de forma sistematica** (HTTP 403 en todos los intentos de acceso directo a glassdoor.com y glassdoor.es durante esta sesion, 2026-09-14). Todo el contenido de Glassdoor en este documento proviene de resumenes de busqueda (WebSearch), no de lectura directa de las paginas. No se pudo verificar fecha de las reseñas individuales ni el numero exacto de preguntas por empresa. Recomendacion: si se necesita ese contenido de primera mano, probar con un navegador con sesion iniciada o una herramienta de scraping autorizada, fuera del alcance de esta tarea.
- **Estrellas y fecha de ultimo commit exactas** no se pudieron confirmar para varios repos (lydiahallie/javascript-questions, h5bp/Front-end-Developer-Interview-Questions, yangshun/tech-interview-handbook, typescript-cheatsheets/react, midudev/preguntas-entrevista-react) porque WebFetch sobre GitHub devuelve a veces la interfaz sin los metadatos numericos completos, o porque no se solicito explicitamente la pagina de commits para cada uno (se prioriza tiempo/alcance). Los numeros de estrellas dados (cuando existen) tienen fecha de verificacion 2026-09-14 pero deben tratarse como aproximados salvo que se indique "via WebFetch" explicito con el numero.
- **midudev/preguntas-entrevista-react**: se confirmo su existencia y tema via WebSearch (una fuente menciona ~7.8k estrellas y 747 forks, resumen de busqueda, no leido de primera mano), pero no se leyo su LICENSE ni su contenido de preguntas directamente; queda pendiente en la tabla A como "no verificado". No se encontro un repositorio equivalente de midudev dedicado especificamente a JavaScript puro (solo a React) durante esta investigacion.
- **fforres/preguntas-y-respuestas-entrevistas-frontend usa licencia CC BY-NC-SA 4.0** (No Comercial). Esto significa que, estrictamente, su contenido NO se puede reutilizar en Devsparring si Devsparring es un producto comercial (de pago o con modelo de negocio), ni siquiera citando la fuente, sin permiso expreso del autor. Se recomienda tratarlo solo como fuente de inspiracion tematica, nunca copiar texto literal.
- **sudheerj/javascript-interview-questions y AGutierrezR/javascript-preguntas-entrevista no tienen fichero LICENSE visible.** Por defecto esto implica "todos los derechos reservados" bajo la ley de copyright: no se puede asumir que el contenido es libre de reutilizar solo por estar en GitHub publico. Se han usado unicamente como fuente de inspiracion de que preguntas son populares (senal de frecuencia), no se ha copiado texto literal de las preguntas al banco (se han reformulado).
- **Frecuencia estimada (alta/media/baja)** en este documento es una estimacion cualitativa basada en cuantas fuentes independientes mencionan cada pregunta y en la fuerza de esas fuentes (un repo con decenas de miles de estrellas cuenta mas que un blog personal). No es una medicion cuantitativa rigurosa (no se conto client-side cuantas veces aparece cada pregunta en un corpus grande); deberia tratarse como una guia orientativa, no un dato duro.
- **Preguntas marcadas como "hipotesis"** (por ejemplo J21, J22, T11, T12, T13, R6, R7, R9, R11, R12, R13, R15, K9) no tienen una cita textual de una fuente de entrevista real verificada durante esta sesion; se incluyeron porque son temas de alta relevancia segun el encargo (cubren familias pedidas explicitamente como TypeScript strict mode, cuando no usar TS, ES2020+, razonamiento de sistemas) pero deberian validarse con mas busqueda dirigida antes de presentarlas como "confirmadas por multiples fuentes" en producto.
- **No se exploraron a fondo** Reddit (busquedas especificas devolvieron resultados poco utiles o genericos) ni dev.to/Medium de forma sistematica mas alla de las citas puntuales recogidas; una segunda pasada podria enriquecer la seccion de razonamiento hablado (B.4) con mas anecdotas reales "me preguntaron..." si se dispone de mas tiempo.
- **Dos hilos de Hacker News no se pudieron leer** (id 7827048 y 13701311) por error HTTP 429 (rate limit) durante los intentos de WebFetch. No se reintentaron por limite de tiempo de la sesion; si se retoma esta investigacion, serian una buena fuente adicional para preguntas de nivel senior.
- **No se encontro un repositorio de preguntas de TypeScript tan popular/consolidado como los de JavaScript** (el mas grande localizado, aershov24/typescript-interview-questions, no se pudo verificar en detalle de estrellas/licencia por limite de tiempo; Devinterview-io/typescript-interview-questions tiene 208 estrellas, bastante menos que sudheerj o lydiahallie). Esto en si es un dato: sugiere que el ecosistema de banco de preguntas TS especificas es menos maduro que el de JS, y que el contenido TS de Devsparring probablemente necesite mas elaboracion propia que "importacion" directa.

## E) Fuentes (listado completo)

Repositorios de GitHub (banco de preguntas):
- https://github.com/sudheerj/javascript-interview-questions (leido 2026-09-14; 27.6k estrellas; ultimo commit visible 2026-08-20; sin LICENSE)
- https://github.com/lydiahallie/javascript-questions (LICENSE leido 2026-09-14, MIT; README leido parcialmente via raw 2026-09-14)
- https://github.com/yangshun/tech-interview-handbook (leido 2026-09-14; MIT; 142.6k estrellas)
- https://github.com/h5bp/Front-end-Developer-Interview-Questions (leido 2026-09-14; MIT; LICENSE.md 2012-2023; javascript-questions.md leido completo)
- https://github.com/DopplerHQ/awesome-interview-questions (leido 2026-09-14; CC0 1.0; 84.5k estrellas; archivado 2024-07-29)
- https://github.com/typescript-cheatsheets/react (leido 2026-09-14; MIT; 47.1k estrellas)
- https://github.com/fforres/preguntas-y-respuestas-entrevistas-frontend (leido 2026-09-14; CC BY-NC-SA 4.0; 323 estrellas)
- https://github.com/AGutierrezR/javascript-preguntas-entrevista (leido 2026-09-14; sin licencia visible; 20 estrellas)
- https://github.com/holasoymalva/Guia-para-Entrevistas-Laborales-de-Programacion (leido 2026-09-14; MIT; 116 estrellas)
- https://github.com/midudev/preguntas-entrevista-react (resumen de busqueda, no leido de primera mano, 2026-09-14)
- https://github.com/midudev/pruebas-tecnicas (resumen de busqueda, no leido de primera mano, 2026-09-14)
- https://github.com/Devinterview-io/typescript-interview-questions (leido 2026-09-14; 208 estrellas; licencia no confirmada)
- https://github.com/aershov24/typescript-interview-questions (mencionado via WebSearch, no explorado en detalle, 2026-09-14)
- https://github.com/thamaragerigr/Preguntas-de-Entrevista (mencionado via WebSearch, no explorado en detalle, 2026-09-14)
- https://github.com/Villanuevand/frontend-preguntas-y-respuestas (mencionado via WebSearch, no explorado en detalle, 2026-09-14)
- https://github.com/DevCaress/guia-entrevistas-de-programacion (mencionado via WebSearch, no explorado en detalle, 2026-09-14)

Glassdoor (todo via resumen de busqueda, no leido de primera mano por bloqueo HTTP 403 a WebFetch, verificado 2026-09-14):
- https://www.glassdoor.com/Interview/frontend-javascript-developer-interview-questions-SRCH_KO0,29.htm
- https://www.glassdoor.es/Entrevista/Indra-Frontend-Developer-Preguntas-de-entrevista-EI_IE9757.0,5_KO6,24.htm
- https://www.glassdoor.es/Entrevista/Mercado-Libre-Desarrollador-Frontend-Preguntas-de-entrevista-EI_IE6563240.0,13_KO14,36.htm
- https://www.glassdoor.es/Entrevista/desarrollador-front-end-preguntas-de-entrevista-SRCH_KO0,26.htm

Foros / comunidades:
- https://news.ycombinator.com/item?id=14667256 "My list of JavaScript interview questions" (leido 2026-09-14, publicado 2017-06-29)
- https://news.ycombinator.com/item?id=7827048 "Ask HN: Common interview questions for senior software engineer position?" (no leido, error HTTP 429, 2026-09-14)
- https://news.ycombinator.com/item?id=13701311 "Ask HN: What are the best interview questions you've been asked?" (no leido, error HTTP 429, 2026-09-14)

Blogs y newsletters en español:
- https://www.webreactiva.com/blog/15-preguntas-entrevistas-javascript (leido 2026-09-14, publicado 2023-06-06)
- https://coderslink.com/talento/blog/preguntas-esenciales-en-una-entrevista-de-programador/ (resumen de busqueda, no leido de primera mano, 2026-09-14)

Blogs en ingles (contenido tecnico especifico, no bancos de preguntas en si):
- https://codesignal.com/blog/25-javascript-interview-questions-and-answers-from-basic-to-senior-level/ (resumen de busqueda, no leido de primera mano, 2026-09-14)
- https://prachub.com/interview-questions/implement-robust-debounce-and-throttle-in-javascript (resumen de busqueda, no leido de primera mano, 2026-09-14)
- https://www.geeksforgeeks.org/javascript/implement-polyfill-for-promise-all-method-in-javascript/ (resumen de busqueda, no leido de primera mano, 2026-09-14)
- https://www.geeksforgeeks.org/javascript/javascript-program-to-find-duplicate-elements-in-an-array/ (resumen de busqueda, no leido de primera mano, 2026-09-14)
- https://dev.to/lucaspaganini/unknown-vs-any-in-typescript-1i31 (resumen de busqueda, no leido de primera mano, 2026-09-14)
- https://www.lucaspaganini.com/academy/discriminated-unions-types-typescript-narrowing-4/ (resumen de busqueda, no leido de primera mano, 2026-09-14)
- https://www.typescriptlang.org/docs/handbook/2/narrowing.html (resumen de busqueda, no leido de primera mano en detalle, 2026-09-14; documentacion oficial de TypeScript)
- https://www.adaface.com/blog/solid-principles-interview-questions/ (resumen de busqueda, no leido de primera mano, 2026-09-14)
- https://www.wecreateproblems.com/interview-questions/solid-principles-interview-questions (resumen de busqueda, no leido de primera mano, 2026-09-14)
- https://in.indeed.com/career-advice/interviewing/solid-principles-interview-questions (resumen de busqueda, no leido de primera mano, 2026-09-14)
- https://climbtheladder.com/solid-design-principles-interview-questions/ (resumen de busqueda, no leido de primera mano, 2026-09-14)
- https://dev.to/m_midas/12-interview-questions-git-19ai (resumen de busqueda, no leido de primera mano, 2026-09-14)

Cursos/handbooks mencionados solo para conocer prioridades tematicas (sin copiar contenido de pago):
- yangshun/tech-interview-handbook (ver arriba, leido 2026-09-14) y su version comercial "Front-End Interview Handbook" / GreatFrontEnd (intento de WebFetch a greatfrontend.com devolvio HTTP 404 el 2026-09-14, no se pudo verificar el listado de temas de primera mano; se omite cualquier afirmacion sobre su contenido)
- "Cracking the Coding Interview": no se consulto contenido, solo se tiene constancia general (conocimiento previo del modelo) de que prioriza estructuras de datos y algoritmos generales, no especifico de JS/TS; no verificado en esta sesion, ver Incertidumbres
