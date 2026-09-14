# Banco de preguntas: React, Next.js, web, backend Node, datos, arquitectura y DevOps

Investigacion para Devsparring. Fecha de referencia: 2026-09-14.
Metodologia: research-citado (toda afirmacion con fuente y fecha; lo no verificado se
marca "(resumen de busqueda, no leido)"; hipotesis marcadas explicitamente).

ESTADO: COMPLETO (primera pasada). 121 preguntas en la seccion B, 8 ejercicios en
C, 5 revisiones de codigo en D. Ver seccion E para limitaciones de acceso a fuentes
(Reddit y Glassdoor no fueron legibles en detalle en esta sesion).

## Indice

- A) Tabla de fuentes: licencia y veredicto de reutilizacion
- B) Banco de preguntas (>=120) por familia
  - B.1 React
  - B.2 Next.js
  - B.3 CSS y web (HTTP, REST/GraphQL, auth, seguridad, rendimiento)
  - B.4 Backend Node
  - B.5 Datos (SQL, ORMs, Postgres/Supabase, NoSQL, cache)
  - B.6 Arquitectura y diseno de sistemas
  - B.7 DevOps basico
  - B.8 Razonamiento con datos reales
- C) Ocho ejercicios practicos reales de entrevista fullstack
- D) Cinco ejercicios de revision de codigo (bugs plantados)
- E) Incertidumbres
- F) Fuentes (listado completo)

---

## A) Tabla de fuentes: licencia y veredicto de reutilizacion

| Fuente | URL | Licencia | Estrellas | Ultimo commit | Veredicto reutilizacion | Verificado |
|---|---|---|---|---|---|---|
| sudheerj/reactjs-interview-questions | https://github.com/sudheerj/reactjs-interview-questions | MIT (segun GitHub API) | 44.803 | 2026-09-12 | Reutilizable citando fuente; MIT permite copia y adaptacion en producto comercial | 2026-09-14, via api.github.com (WebFetch) |
| donnemartin/system-design-primer | https://github.com/donnemartin/system-design-primer | NOASSERTION (repo declara "licensed under CC BY-SA 4.0" en su README; GitHub API no reconoce el SPDX exacto) | 369.939 | 2026-03-20 | CC BY-SA 4.0 exige atribucion y compartir igual; no copiar literal sin atribuir, mejor usar como referencia/inspiracion y redactar preguntas propias | 2026-09-14, via api.github.com; licencia exacta "(resumen de busqueda, no leido el README completo)" |
| yangshun/front-end-interview-handbook | https://github.com/yangshun/front-end-interview-handbook | MIT (segun GitHub API) | 44.009 | 2026-08-13 | Reutilizable citando fuente; ojo: el contenido "vivo" se movio en gran parte a greatfrontend.com (producto de pago), el repo es la version legacy/handbook | 2026-09-14, via api.github.com |
| alex/what-happens-when | https://github.com/alex/what-happens-when | Sin licencia declarada (campo license = null en GitHub API) | 43.312 | 2024-08-19 (repo inactivo, sin commits en 2026) | Sin licencia explicita = por defecto todos los derechos reservados; se puede citar y enlazar, NO copiar texto literal al producto | 2026-09-14, via api.github.com |
| lydiahallie/javascript-questions | https://github.com/lydiahallie/javascript-questions | MIT (segun GitHub API) | 65.322 | 2024-08-04 (sin commits en 2026, repo en mantenimiento pasivo) | Reutilizable citando fuente; son katas de "que imprime este codigo" (closures, hoisting, event loop), muy utiles para B.8/C | 2026-09-14, via api.github.com |
| goldbergyoni/nodebestpractices | https://github.com/goldbergyoni/nodebestpractices | CC-BY-SA-4.0 (segun GitHub API) | 105.615 | 2026-06-15 | Exige atribucion y compartir igual; usar como fuente de "malas practicas tipicas" para D) code review, citando siempre | 2026-09-14, via api.github.com |
| learning-zone/javascript-basics (antes "javascript-interview-questions") | https://github.com/learning-zone/javascript-basics | Sin licencia declarada (license = null) | 1.867 | 2026-05-27 | Sin licencia explicita; solo citar/enlazar, no copiar literal | 2026-09-14, via api.github.com |
| learning-zone/nodejs-basics (antes "nodejs-interview-questions") | https://github.com/learning-zone/nodejs-basics | Sin licencia declarada (license = null) | 3.208 | 2026-07-26 | Sin licencia explicita; solo citar/enlazar, no copiar literal | 2026-09-14, via api.github.com |
| Devinterview-io/node-interview-questions | https://github.com/Devinterview-io/node-interview-questions | Sin licencia declarada (license = null) | 601 | 2026-01-04 | Sin licencia explicita; contenido generado (marca "2026" generica, aspecto de plantilla auto-generada), baja confianza como fuente primaria; solo referencia | 2026-09-14, via api.github.com |
| Devinterview-io/next-interview-questions | https://github.com/Devinterview-io/next-interview-questions | Sin licencia declarada (license = null) | 34 | 2026-01-04 | Pocas estrellas, contenido probablemente generado; usar solo como pista de temas, no como fuente de autoridad | 2026-09-14, via api.github.com |
| GreatFrontEnd (greatfrontend.com) | https://www.greatfrontend.com/ | Producto comercial, contenido de pago salvo "Front End Interview Handbook" y "Front End System Design Playbook" gratuitos | N/A (no es repo) | N/A | No es reutilizable como texto (copyright del producto); sirve para saber que temas/formatos preguntan y citar el enlace, sin copiar contenido de pago | 2026-09-14, paginas publicas via WebSearch, "(resumen de busqueda, no leido el detalle de cada pregunta)" |
| Hello Interview (hellointerview.com) | https://www.hellointerview.com/community/questions | Producto comercial; la "Real Interview Questions Database" es contenido enviado por usuarios, visible parcialmente sin cuenta | N/A | N/A | No reutilizable como texto propietario; util para citar enunciados reales de "diseñar X" reportados por candidatos | 2026-09-14, "(resumen de busqueda, no leido el detalle, requiere cuenta para ver todo)" |

---

## B) Banco de preguntas

Formato por pregunta:
- ES / EN
- Tipo: definicion \| fundamento \| razonamiento \| kata \| review \| diseno \| comportamental
- Nivel minimo: junior \| mid \| senior
- Frecuencia estimada: alta/media/baja
- Fuente + fecha
- (mid/senior) que dice una respuesta que aprueba

### B.1 React

1. **ES:** ¿Qué problema resuelve `useEffect` y cuándo se ejecuta respecto al render?
   **EN:** What problem does `useEffect` solve and when does it run relative to render?
   Tipo: definicion. Nivel minimo: junior. Frecuencia: alta.
   Fuente: sudheerj/reactjs-interview-questions, seccion Hooks (https://github.com/sudheerj/reactjs-interview-questions), verificado 2026-09-14 via WebFetch del README.
   Que aprueba (mid/senior): distingue "commit" (DOM ya pintado) de `useLayoutEffect` (antes del paint); explica que se ejecuta tras cada render por defecto y que el array de dependencias controla cuándo se repite; menciona la funcion de limpieza (cleanup) para suscripciones/timers.

2. **ES:** ¿Cómo funciona el array de dependencias de `useEffect` y qué falla comete la gente al omitir dependencias?
   **EN:** How does the `useEffect` dependency array work and what mistake do people make by omitting dependencies?
   Tipo: fundamento. Nivel minimo: junior. Frecuencia: alta.
   Fuente: sudheerj/reactjs-interview-questions (https://github.com/sudheerj/reactjs-interview-questions), verificado 2026-09-14.
   Que aprueba (mid/senior): explica "stale closures" (el efecto captura valores viejos si faltan en el array); menciona `eslint-plugin-react-hooks` como red de seguridad; sabe cuándo usar `useEffectEvent` (React 19.2, disponible en Next.js 16) para sacar lógica no reactiva del efecto sin añadirla como dependencia.

3. **ES:** ¿Cuál es la diferencia entre `useMemo` y `useCallback`, y cuándo NO merece la pena usarlos?
   **EN:** What's the difference between `useMemo` and `useCallback`, and when is it NOT worth using them?
   Tipo: fundamento. Nivel minimo: mid. Frecuencia: alta.
   Fuente: sudheerj/reactjs-interview-questions (https://github.com/sudheerj/reactjs-interview-questions), verificado 2026-09-14.
   Que aprueba (mid/senior): `useCallback` memoriza la referencia de una función, `useMemo` memoriza un valor calculado; ambos tienen coste (comparar dependencias, memoria); solo compensan si el hijo está memoizado con `React.memo` o el cálculo es costoso; menciona que React Compiler (estable en Next.js 16, ver nextjs.org/blog/next-16) puede automatizar esta memoización y reducir la necesidad de escribirlos a mano.

4. **ES:** ¿Cómo compartirías lógica de estado entre dos componentes sin duplicar código? Explica los custom hooks.
   **EN:** How would you share stateful logic between two components without duplicating code? Explain custom hooks.
   Tipo: fundamento. Nivel minimo: junior. Frecuencia: alta.
   Fuente: sudheerj/reactjs-interview-questions, seccion "Custom React Hooks" (https://github.com/sudheerj/reactjs-interview-questions), verificado 2026-09-14.
   Que aprueba (mid/senior): un custom hook es una función que empieza por `use` y puede llamar a otros hooks; cada componente que lo usa obtiene su propia instancia de estado (no se comparte estado entre llamadas); da un ejemplo real (`useDebounce`, `useFetch`, `useLocalStorage`).

5. **ES:** ¿Para qué sirve `useRef` más allá de acceder al DOM? Pon un ejemplo de valor mutable que sobrevive a los renders.
   **EN:** What is `useRef` used for beyond accessing the DOM? Give an example of a mutable value that survives renders.
   Tipo: fundamento. Nivel minimo: junior. Frecuencia: media.
   Fuente: sudheerj/reactjs-interview-questions (https://github.com/sudheerj/reactjs-interview-questions), verificado 2026-09-14.
   Que aprueba (mid/senior): cambiar `.current` no dispara re-render; útil para guardar el id de un `setInterval`, el valor anterior de una prop, o una bandera "ya se hizo fetch"; distingue esto de `useState`, que sí re-renderiza.

6. **ES:** ¿Qué es la reconciliación y el algoritmo de diffing de React? ¿Qué reglas asume sobre las listas?
   **EN:** What is reconciliation and React's diffing algorithm? What rules does it assume about lists?
   Tipo: fundamento. Nivel minimo: mid. Frecuencia: alta.
   Fuente: sudheerj/reactjs-interview-questions, seccion "Rendering & Reconciliation" (https://github.com/sudheerj/reactjs-interview-questions), verificado 2026-09-14.
   Que aprueba (mid/senior): explica que React compara el árbol nuevo de elementos con el anterior por tipo y posición (O(n) heurístico, no O(n^3)); si el tipo de elemento cambia, desmonta y remonta el subárbol; las listas se comparan por `key`, no por posición, si hay keys estables.

7. **ES:** ¿Por qué usar el índice del array como `key` es un antipatrón? ¿Cuándo sí es aceptable?
   **EN:** Why is using the array index as `key` an anti-pattern? When is it actually acceptable?
   Tipo: fundamento. Nivel minimo: junior. Frecuencia: alta.
   Fuente: sudheerj/reactjs-interview-questions, seccion "Keys" (https://github.com/sudheerj/reactjs-interview-questions), verificado 2026-09-14.
   Que aprueba (mid/senior): si la lista se reordena, inserta o borra elementos, el índice deja de identificar al mismo item y React puede reusar el estado/DOM equivocado (bugs en inputs no controlados, animaciones, estado interno); es aceptable solo si la lista es estática y nunca se reordena/filtra.

8. **ES:** ¿Qué es React Fiber y qué problema del render "bloqueante" vino a resolver?
   **EN:** What is React Fiber and what "blocking render" problem did it solve?
   Tipo: fundamento. Nivel minimo: senior. Frecuencia: media.
   Fuente: sudheerj/reactjs-interview-questions (https://github.com/sudheerj/reactjs-interview-questions), verificado 2026-09-14.
   Que aprueba (mid/senior): Fiber reescribió el reconciler para trabajar en unidades interrumpibles (permite priorizar trabajo urgente como un input sobre trabajo de fondo); es la base de Concurrent React (Suspense, `useTransition`, `startTransition`).

9. **ES:** Estado local vs estado global: ¿cómo decides dónde vive un dato?
   **EN:** Local vs global state: how do you decide where a piece of data lives?
   Tipo: razonamiento. Nivel minimo: mid. Frecuencia: alta.
   Fuente: patrón repetido en agregadores de preguntas (sudheerj/reactjs-interview-questions, seccion Context) (https://github.com/sudheerj/reactjs-interview-questions), verificado 2026-09-14.
   Que aprueba (mid/senior): sube el estado solo hasta el ancestro común más cercano que lo necesita ("lift state up"); separa "server state" (viene de una API, se cachea e invalida) de "UI state" (abrir un modal, pestaña activa); usa Context para configuración de baja frecuencia de cambio, no como sustituto de un gestor de estado.

10. **ES:** ¿Cuál es el problema clásico de rendimiento con `Context` y cómo se mitiga?
    **EN:** What's the classic performance problem with `Context` and how is it mitigated?
    Tipo: fundamento. Nivel minimo: mid. Frecuencia: media.
    Fuente: sudheerj/reactjs-interview-questions, seccion Context (https://github.com/sudheerj/reactjs-interview-questions), verificado 2026-09-14.
    Que aprueba (mid/senior): cualquier cambio en el valor del Provider re-renderiza a TODOS los consumidores, aunque solo usen una parte del valor; mitigación: dividir el contexto en varios más pequeños, memoizar el valor del Provider, o mover ese estado a una librería con selectores (Zustand, Redux) que evite renders innecesarios.

11. **ES:** Zustand, Redux Toolkit y TanStack Query resuelven problemas distintos. ¿Cuáles y cuándo elegirías cada uno?
    **EN:** Zustand, Redux Toolkit and TanStack Query solve different problems. Which ones, and when would you pick each?
    Tipo: razonamiento. Nivel minimo: mid. Frecuencia: alta.
    Fuente: comparativas agregadas (resumen de busqueda, no leido en detalle cada articulo), p.ej. "Zustand vs. RTK Query vs. TanStack Query" (Medium, imranrafeek), consultado 2026-09-14.
    Que aprueba (mid/senior): separa "server state" (datos que vienen de una API, necesitan cache/invalidación/reintentos: TanStack Query) de "client/UI state" (tema, modal, filtros: Zustand encaja bien, ligero y sin boilerplate) de "estado complejo con reglas de negocio y necesidad de debugging/time-travel: Redux Toolkit"; evita meter datos de servidor en Redux/Zustand manualmente si una libreria de cache ya lo resuelve.

12. **ES:** ¿Qué es `React.memo` y por qué a veces empeora el rendimiento en vez de mejorarlo?
    **EN:** What is `React.memo` and why does it sometimes make performance worse instead of better?
    Tipo: fundamento. Nivel minimo: mid. Frecuencia: media.
    Fuente: sudheerj/reactjs-interview-questions (https://github.com/sudheerj/reactjs-interview-questions), verificado 2026-09-14.
    Que aprueba (mid/senior): `memo` evita re-render si las props son iguales (comparación superficial por defecto); si las props incluyen objetos/funciones nuevas en cada render (sin `useMemo`/`useCallback`), la comparación siempre falla y solo se añade coste extra; recalca medir con React DevTools Profiler antes de optimizar.

13. **ES:** ¿Qué son `Suspense` y los error boundaries, y por qué son mecanismos complementarios?
    **EN:** What are `Suspense` and error boundaries, and why are they complementary mechanisms?
    Tipo: definicion. Nivel minimo: mid. Frecuencia: alta.
    Fuente: sudheerj/reactjs-interview-questions (https://github.com/sudheerj/reactjs-interview-questions), verificado 2026-09-14.
    Que aprueba (mid/senior): `Suspense` captura una "promesa en curso" y muestra un fallback mientras se resuelve (carga de datos/código); los error boundaries (componentes de clase con `getDerivedStateFromError`/`componentDidCatch`, o `<ErrorBoundary>` de librerías) capturan errores de renderizado y muestran una UI alternativa; ninguno de los dos captura errores en handlers de eventos ni en código asíncrono fuera del render.

14. **ES:** ¿Cómo testearías un componente que hace fetch de datos, usando Testing Library?
    **EN:** How would you test a component that fetches data, using Testing Library?
    Tipo: fundamento. Nivel minimo: mid. Frecuencia: alta.
    Fuente: patrón habitual en bancos de preguntas React (sudheerj/reactjs-interview-questions, seccion Testing) (https://github.com/sudheerj/reactjs-interview-questions), verificado 2026-09-14.
    Que aprueba (mid/senior): usa `render` + `screen.findBy...` (async) en vez de `getBy...` para esperar a que el dato llegue; mockea la red (MSW o mock del cliente fetch) en vez de mockear implementación interna; testea lo que el usuario ve, no detalles internos del componente (filosofía de Testing Library).

15. **ES:** ¿Qué diferencia hay entre accesibilidad de un `<div onClick>` y un `<button>`? ¿Por qué importa en una revisión de código?
    **EN:** What's the accessibility difference between a `<div onClick>` and a `<button>`? Why does it matter in a code review?
    Tipo: fundamento. Nivel minimo: junior. Frecuencia: media.
    Fuente: patrón habitual de accesibilidad web (MDN, no leido pagina especifica en esta pasada; consultado conocimiento general contrastado con guias de a11y), verificado 2026-09-14.
    Que aprueba (mid/senior): un `<div onClick>` no es focuseable por teclado, no tiene rol semántico, no responde a Enter/Espacio ni lo anuncia un lector de pantalla; hay que añadir `tabIndex`, `role="button"` y manejar teclado a mano, o simplemente usar `<button>` que lo trae gratis.

16. **ES:** ¿Cuándo usarías `useTransition` o `useDeferredValue` en vez de un simple `useState`?
    **EN:** When would you use `useTransition` or `useDeferredValue` instead of a plain `useState`?
    Tipo: razonamiento. Nivel minimo: senior. Frecuencia: media.
    Fuente: sudheerj/reactjs-interview-questions, seccion Hooks (https://github.com/sudheerj/reactjs-interview-questions), verificado 2026-09-14.
    Que aprueba (mid/senior): útil cuando una actualización de estado dispara un render caro (filtrar 10.000 filas) y no quieres bloquear el input del usuario; `useTransition` marca la actualización como "no urgente" y permite interrumpirla; `useDeferredValue` retrasa el uso de un valor para renders no críticos; ninguno reemplaza debounce de llamadas de red.

17. **ES:** ¿Qué son las Server Components de React y en qué se diferencian de SSR tradicional?
    **EN:** What are React Server Components and how do they differ from traditional SSR?
    Tipo: definicion. Nivel minimo: senior. Frecuencia: alta.
    Fuente: resumen agregado de documentacion Next.js/React (nextjs.org/blog/next-16, seccion React 19.2), verificado 2026-09-14 via WebFetch.
    Que aprueba (mid/senior): SSR tradicional renderiza HTML en el servidor pero luego re-ejecuta e hidrata TODO el componente en el cliente; los Server Components se ejecutan solo en el servidor, nunca se envían al bundle del cliente, y pueden hacer acceso a datos directo (DB, fs) sin exponer secretos; solo los Client Components (`"use client"`) se hidratan.

18. **ES:** Tienes una lista de 5.000 elementos y el scroll va con tirones. ¿Qué técnicas aplicarías?
    **EN:** You have a list of 5,000 items and scrolling stutters. What techniques would you apply?
    Tipo: razonamiento. Nivel minimo: mid. Frecuencia: media.
    Fuente: patrón habitual de rendimiento React (sudheerj/reactjs-interview-questions, seccion Performance) (https://github.com/sudheerj/reactjs-interview-questions), verificado 2026-09-14.
    Que aprueba (mid/senior): windowing/virtualización (renderizar solo las filas visibles, p.ej. `react-window`/`@tanstack/react-virtual`); memoizar filas con `React.memo`; evitar recrear funciones/objetos inline como props; paginar o cargar bajo demanda en vez de traer todo de golpe.

19. **ES:** ¿Qué hace `key` distinto de una prop normal, y por qué React se queja si falta en un `.map()`?
    **EN:** What makes `key` different from a normal prop, and why does React warn when it's missing in a `.map()`?
    Tipo: definicion. Nivel minimo: junior. Frecuencia: alta.
    Fuente: sudheerj/reactjs-interview-questions, seccion Keys (https://github.com/sudheerj/reactjs-interview-questions), verificado 2026-09-14.
    Que aprueba (mid/senior): `key` no llega al componente como prop, es metadata interna que usa el reconciler para identidad estable entre renders; sin ella React cae al orden posicional, lo que puede mezclar estado entre elementos al reordenar.

20. **ES:** Explica el ciclo de vida efectivo de un componente funcional: montaje, actualización y desmontaje, usando hooks.
    **EN:** Explain the effective lifecycle of a function component: mount, update and unmount, using hooks.
    Tipo: fundamento. Nivel minimo: junior. Frecuencia: alta.
    Fuente: sudheerj/reactjs-interview-questions (https://github.com/sudheerj/reactjs-interview-questions), verificado 2026-09-14.
    Que aprueba (mid/senior): monta = primer render + efectos con array vacío; actualiza = re-render cuando cambia estado/props/contexto usado, efectos con dependencias que cambiaron; desmonta = React llama a la función de limpieza devuelta por cada efecto antes de quitar el componente del árbol.

21. **ES:** ¿Qué es el "prop drilling" y qué alternativas hay además de Context?
    **EN:** What is "prop drilling" and what alternatives exist besides Context?
    Tipo: fundamento. Nivel minimo: junior. Frecuencia: media.
    Fuente: patrón habitual en bancos de preguntas React (sudheerj/reactjs-interview-questions) (https://github.com/sudheerj/reactjs-interview-questions), verificado 2026-09-14.
    Que aprueba (mid/senior): pasar una prop por varios niveles intermedios que no la usan, solo la reenvían; alternativas: composición (pasar componentes como children en vez de datos), Context para casos de baja frecuencia, o un store externo (Zustand/Redux) para estado muy compartido.

22. **ES (comportamental):** Cuéntame de una vez que tuviste que decidir entre "hacerlo rápido" y "hacerlo bien" en un componente React de producción.
    **EN (behavioral):** Tell me about a time you had to choose between "doing it fast" and "doing it right" on a production React component.
    Tipo: comportamental. Nivel minimo: mid. Frecuencia: media.
    Fuente: patrón habitual de pregunta comportamental en procesos fullstack (Glassdoor, busqueda de preguntas "Senior react developer" Espana) (https://www.glassdoor.es/Entrevista/espana-senior-react-developer-preguntas-de-entrevista-SRCH_IL.0,6_KO7,29.htm), "(resumen de busqueda, no leido el contenido completo, pagina devolvio 403 al intentar leerla)", verificado 2026-09-14.
    Que aprueba (mid/senior): estructura tipo STAR (situación, tarea, acción, resultado); explica el trade-off técnico concreto (deuda técnica asumida, por qué, y cómo se pagó después); no es solo "lo hice rápido", muestra criterio de cuándo cada opción es razonable.

### B.2 Next.js

Nota de version: en 2026 la version estable actual es **Next.js 16** (lanzada el
21 de octubre de 2025, con actualizaciones menores 16.1/16.2/16.3 despues), segun
la nota de lanzamiento oficial. Fuente: https://nextjs.org/blog/next-16, verificado
2026-09-14 via WebFetch directo.

23. **ES:** ¿Cuál es la diferencia real entre un Server Component y un Client Component en el App Router?
    **EN:** What is the real difference between a Server Component and a Client Component in the App Router?
    Tipo: fundamento. Nivel minimo: mid. Frecuencia: alta.
    Fuente: https://nextjs.org/blog/next-16 y documentacion App Router, verificado 2026-09-14.
    Que aprueba (mid/senior): por defecto TODO en `app/` es Server Component; solo se convierte en Client con la directiva `"use client"` en la parte superior del archivo, y eso "contamina" a todo lo que importa desde ahí; un Server Component no puede usar `useState`/`useEffect`/eventos del navegador, pero puede hacer `await` directo a la base de datos; el candidato debe saber que la frontera "use client" mueve TODO el subárbol al bundle del cliente, no solo el componente marcado.

24. **ES:** ¿Qué son las Server Actions y qué problema de seguridad hay que vigilar al usarlas?
    **EN:** What are Server Actions and what security issue must you watch out for when using them?
    Tipo: fundamento. Nivel minimo: mid. Frecuencia: alta.
    Fuente: https://nextjs.org/blog/next-16 (contexto de `updateTag`/`refresh` en Server Actions), verificado 2026-09-14.
    Que aprueba (mid/senior): son funciones marcadas con `"use server"` que el cliente puede invocar como si fueran locales (Next genera un endpoint HTTP oculto); el riesgo es tratarlas como "de confianza" solo por estar en el servidor: hay que revalidar auth/autorizacion y validar el input dentro de la Server Action igual que en cualquier endpoint publico, porque cualquiera puede llamarla directamente con curl si conoce el id de la accion.

25. **ES:** Explica la diferencia entre SSR, SSG e ISR en Next.js, y cuándo usarías cada una.
    **EN:** Explain the difference between SSR, SSG and ISR in Next.js, and when you'd use each.
    Tipo: fundamento. Nivel minimo: mid. Frecuencia: alta.
    Fuente: patron estandar de preguntas Next.js (GreatFrontEnd blog "Next.js Interview Questions for Freshers 2026", resumen de busqueda, no leido en detalle) https://www.greatfrontend.com/blog/next-js-interview-questions-for-freshers, verificado 2026-09-14.
    Que aprueba (mid/senior): SSG genera HTML en build time (contenido que casi no cambia: landing, blog); SSR genera HTML en cada request (contenido personalizado por usuario); ISR regenera paginas estaticas en background tras un intervalo o bajo demanda (`revalidate`), balance entre frescura y velocidad; en Next 16 esto se reformula con Cache Components y `"use cache"` + `revalidateTag(tag, profile)`.

26. **ES:** ¿Qué es el modelo "Cache Components" (`"use cache"`) de Next.js 16 y en qué se diferencia del cacheo implícito de versiones anteriores?
    **EN:** What is the Next.js 16 "Cache Components" model (`"use cache"`) and how does it differ from the implicit caching of earlier versions?
    Tipo: definicion. Nivel minimo: senior. Frecuencia: media.
    Fuente: https://nextjs.org/blog/next-16, seccion "Cache Components", verificado 2026-09-14 via WebFetch.
    Que aprueba (mid/senior): antes del App Router asumía cacheo implícito por defecto (confuso: ¿esto se cachea o no?); con Cache Components el cacheo es explícito y opt-in vía la directiva `"use cache"` en páginas, componentes o funciones; sin esa directiva, todo el código dinámico se ejecuta en cada request por defecto; se activa con `cacheComponents: true` en `next.config.ts`.

27. **ES:** ¿Qué diferencia hay entre `revalidateTag()` y la nueva `updateTag()` en Next.js 16?
    **EN:** What's the difference between `revalidateTag()` and the new `updateTag()` in Next.js 16?
    Tipo: fundamento. Nivel minimo: senior. Frecuencia: baja.
    Fuente: https://nextjs.org/blog/next-16, seccion "Improved Caching APIs", verificado 2026-09-14 via WebFetch.
    Que aprueba (mid/senior): `revalidateTag(tag, profile)` invalida con semántica stale-while-revalidate (el usuario puede ver datos viejos un instante mientras se revalida en background) y desde Next 16 exige un perfil `cacheLife`; `updateTag()` solo se puede usar dentro de Server Actions y da semántica "read-your-writes" (expira y relee al instante, para que el usuario vea su propio cambio ya mismo, ej. tras guardar su perfil).

28. **ES:** El middleware clásico se llama ahora distinto en Next.js 16. ¿Qué cambió y por qué?
    **EN:** Classic middleware is now named differently in Next.js 16. What changed and why?
    Tipo: definicion. Nivel minimo: mid. Frecuencia: media.
    Fuente: https://nextjs.org/blog/next-16, seccion "proxy.ts (formerly middleware.ts)", verificado 2026-09-14 via WebFetch.
    Que aprueba (mid/senior): `middleware.ts` pasó a `proxy.ts` (con la función exportada renombrada a `proxy`) para dejar claro que es la frontera de red de la app; corre en runtime Node.js; `middleware.ts` sigue funcionando para Edge pero está deprecado.

29. **ES:** ¿Cómo manejas la autenticación y las rutas protegidas en el App Router?
    **EN:** How do you handle authentication and protected routes in the App Router?
    Tipo: razonamiento. Nivel minimo: mid. Frecuencia: alta.
    Fuente: patron estandar de preguntas Next.js senior (Medium, "Senior-Level Next.js Interview Questions on App Router", resumen de busqueda, no leido en detalle) https://medium.com/@aayushpagare21/senior-level-next-js-interview-questions-part-1-571b85306b94, verificado 2026-09-14.
    Que aprueba (mid/senior): valida la sesión en `proxy.ts`/middleware para redirigir antes de renderizar, pero también revalida en el propio Server Component/Server Action (defensa en profundidad, nunca confiar solo en el middleware); menciona cookies httpOnly para el token de sesión en vez de localStorage.

30. **ES:** Estás en un componente cliente y necesitas datos que solo existen en el servidor (una clave de API secreta). ¿Cómo lo resuelves sin filtrar el secreto al navegador?
    **EN:** You're in a client component and need data that only exists on the server (a secret API key). How do you solve this without leaking the secret to the browser?
    Tipo: razonamiento. Nivel minimo: mid. Frecuencia: media.
    Fuente: patron estandar App Router (documentacion Next.js, variables de entorno server-only), verificado 2026-09-14.
    Que aprueba (mid/senior): las variables sin prefijo `NEXT_PUBLIC_` solo existen en el servidor; el Client Component debe pedir el dato a un Server Component padre, a una Server Action, o a un Route Handler, nunca importar directamente el modulo que usa el secreto.

31. **ES:** ¿Qué trampa típica hay con `fetch` dentro de Server Components respecto al cacheo por defecto?
    **EN:** What's a typical trap with `fetch` inside Server Components regarding default caching behavior?
    Tipo: kata. Nivel minimo: mid. Frecuencia: media.
    Fuente: patron habitual en preguntas Next.js "trampas" (StackInterview, "Top 25 Next.js Interview Questions and Answers 2026", resumen de busqueda, no leido en detalle) https://stackinterview.dev/guides/nextjs-interview-questions-and-answers, verificado 2026-09-14.
    Que aprueba (mid/senior): en versiones previas a Cache Components, `fetch` podía cachearse implícitamente sin que el desarrollador lo pidiera, mostrando datos obsoletos en producción; con Next.js 16 y Cache Components el comportamiento por defecto es dinámico (sin cache) salvo que se use `"use cache"` explícitamente; el candidato debe saber comprobar la version del proyecto antes de asumir el comportamiento.

32. **ES:** ¿Cómo desplegarías una app Next.js en Vercel de forma que las Server Actions no queden expuestas a abuso (rate limiting, CSRF)?
    **EN:** How would you deploy a Next.js app on Vercel so Server Actions aren't exposed to abuse (rate limiting, CSRF)?
    Tipo: razonamiento. Nivel minimo: senior. Frecuencia: baja.
    Fuente: buenas practicas agregadas de despliegue Next.js/Vercel (conocimiento general contrastado con documentacion de Next.js sobre Server Actions y origenes permitidos), verificado 2026-09-14.
    Que aprueba (mid/senior): Next.js valida el origen de la petición para Server Actions por defecto (protección CSRF básica), pero eso no sustituye rate limiting a nivel de edge/proxy ni validación de input; menciona `serverActions.allowedOrigins` en config para dominios adicionales (previews, subdominios).

33. **ES:** Diferencia entre rutas API (`app/api/.../route.ts`) y Server Actions: ¿cuándo usarías cada una?
    **EN:** Difference between API routes (`app/api/.../route.ts`) and Server Actions: when would you use each?
    Tipo: razonamiento. Nivel minimo: mid. Frecuencia: alta.
    Fuente: patron estandar de preguntas Next.js (interviewbit, "Next.js Interview Questions and Answers 2026", resumen de busqueda, no leido en detalle) https://www.interviewbit.com/next-js-interview-questions/, verificado 2026-09-14.
    Que aprueba (mid/senior): Server Actions son ideales para mutaciones disparadas desde formularios/componentes de la misma app (progressive enhancement, menos boilerplate); las rutas API son necesarias cuando el consumidor es externo (webhooks, apps móviles, integraciones de terceros) o cuando se necesita control fino sobre métodos HTTP/headers.

34. **ES:** ¿Qué es Partial Prerendering (PPR) y cómo se relaciona con Suspense?
    **EN:** What is Partial Prerendering (PPR) and how does it relate to Suspense?
    Tipo: definicion. Nivel minimo: senior. Frecuencia: baja.
    Fuente: https://nextjs.org/blog/next-16, seccion "Cache Components" (menciona que completa la historia de PPR introducida en 2023), verificado 2026-09-14 via WebFetch.
    Que aprueba (mid/senior): permite que una misma ruta tenga una "carcasa" estática servida al instante y "huecos" dinámicos que se renderizan bajo demanda, delimitados con `<Suspense>`; en Next.js 16 esto se completa con Cache Components, donde `"use cache"` marca explícitamente qué partes son estáticas.

35. **ES:** ¿Qué rompe (breaking change) al pasar `params`/`searchParams` a asíncronos, introducido en versiones recientes de Next.js?
    **EN:** What breaks (breaking change) from making `params`/`searchParams` async, introduced in recent Next.js versions?
    Tipo: kata. Nivel minimo: mid. Frecuencia: media.
    Fuente: https://nextjs.org/blog/next-16, tabla "Removals" (Sync params/searchParams props access), verificado 2026-09-14 via WebFetch.
    Que aprueba (mid/senior): en Next.js 16 ya no se puede leer `params`/`searchParams`/`cookies()`/`headers()` de forma síncrona; hay que hacer `await params` (o usar `use(params)` en un Client Component); el candidato debe saber que esto rompe código de tutoriales antiguos y hay un codemod oficial (`@next/codemod`) para migrar.

36. **ES:** ¿Qué ventaja de rendimiento trae Turbopack en Next.js 16 y qué se sacrifica al hacerlo el bundler por defecto?
    **EN:** What performance advantage does Turbopack bring in Next.js 16, and what's traded off by making it the default bundler?
    Tipo: definicion. Nivel minimo: mid. Frecuencia: media.
    Fuente: https://nextjs.org/blog/next-16, seccion "Turbopack (stable)", verificado 2026-09-14 via WebFetch.
    Que aprueba (mid/senior): Turbopack es ahora el bundler por defecto (builds 2-5x más rápidos, Fast Refresh hasta 10x más rápido); proyectos con configuración webpack personalizada avanzada pueden necesitar `next dev --webpack`/`next build --webpack` como via de escape mientras migran.

37. **ES:** Tienes una página con 50 enlaces a productos que comparten layout. ¿Qué optimización de prefetching aplica Next.js 16 ahí?
    **EN:** You have a page with 50 product links sharing a layout. What prefetching optimization does Next.js 16 apply there?
    Tipo: kata. Nivel minimo: senior. Frecuencia: baja.
    Fuente: https://nextjs.org/blog/next-16, seccion "Enhanced Routing and Navigation" (layout deduplication), verificado 2026-09-14 via WebFetch.
    Que aprueba (mid/senior): con "layout deduplication" el layout compartido se descarga una sola vez en vez de una vez por cada `<Link>`, reduciendo mucho el tráfico de red; además el prefetch incremental solo trae las partes que faltan en caché y cancela peticiones si el link sale del viewport.

38. **ES:** ¿Cómo optimizarías imágenes en Next.js y qué cambió por defecto en `next/image` en la version 16?
    **EN:** How would you optimize images in Next.js, and what changed by default in `next/image` in version 16?
    Tipo: fundamento. Nivel minimo: mid. Frecuencia: media.
    Fuente: https://nextjs.org/blog/next-16, tabla "Behavior Changes" (images.minimumCacheTTL, images.qualities), verificado 2026-09-14 via WebFetch.
    Que aprueba (mid/senior): `next/image` sirve tamaños/formatos responsivos y hace lazy loading automático; en Next 16 el TTL de caché de imágenes subió de 60s a 4 horas por defecto y la calidad por defecto se fijó a `[75]`; usar `images.remotePatterns` en vez del deprecado `images.domains` por seguridad.

39. **ES:** ¿Qué trampa de seguridad reciente corrigió Next.js respecto a `next/image` con rutas locales y query strings?
    **EN:** What recent security trap did Next.js fix regarding `next/image` with local paths and query strings?
    Tipo: kata. Nivel minimo: senior. Frecuencia: baja.
    Fuente: https://nextjs.org/blog/next-16, tabla "Removals" (next/image local src with query strings), verificado 2026-09-14 via WebFetch.
    Que aprueba (mid/senior): permitir `src` locales con query strings sin restricción abría a un ataque de "enumeración" de archivos locales; desde Next.js 16 hace falta configurar explícitamente `images.localPatterns` para permitir ese caso, cerrando el hueco por defecto.

40. **ES (comportamental):** Cuéntame de una migración de Pages Router a App Router (o de una versión antigua de Next.js) que hayas hecho o estudiado: ¿qué se rompió primero?
    **EN (behavioral):** Tell me about a Pages Router to App Router migration (or an old Next.js version upgrade) you did or studied: what broke first?
    Tipo: comportamental. Nivel minimo: mid. Frecuencia: media.
    Fuente: patron de pregunta habitual en entrevistas senior Next.js (Medium, "Senior-Level Next.js Interview Questions", resumen de busqueda) https://medium.com/@aayushpagare21/senior-level-next-js-interview-questions-part-1-571b85306b94, verificado 2026-09-14.
    Que aprueba (mid/senior): respuesta concreta con un caso real o hipotético bien razonado (p.ej. data fetching que cambia de `getServerSideProps` a `fetch` directo en Server Component, o el codemod oficial); demuestra que sabe que existen herramientas de migracion automatizada (`npx @next/codemod@canary upgrade latest`) en vez de migrar todo a mano.

### B.3 CSS y web

41. **ES:** Explica el modelo de caja CSS (`box-sizing: content-box` vs `border-box`).
    **EN:** Explain the CSS box model (`box-sizing: content-box` vs `border-box`).
    Tipo: definicion. Nivel minimo: junior. Frecuencia: alta.
    Fuente: patron muy comun en bancos de preguntas frontend (yangshun/front-end-interview-handbook) https://github.com/yangshun/front-end-interview-handbook, verificado 2026-09-14 via WebFetch (API GitHub).
    Que aprueba (mid/senior): con `content-box` (por defecto) width/height solo miden el contenido, y padding/border se suman al tamaño final; con `border-box` width/height incluyen padding y border; explica por qué muchos resets globales usan `* { box-sizing: border-box; }` para que el layout sea predecible.

42. **ES:** ¿Cuándo usarías Flexbox y cuándo Grid? Da un ejemplo de layout donde uno encaja claramente mejor.
    **EN:** When would you use Flexbox vs Grid? Give an example layout where one clearly fits better.
    Tipo: razonamiento. Nivel minimo: junior. Frecuencia: alta.
    Fuente: yangshun/front-end-interview-handbook, https://github.com/yangshun/front-end-interview-handbook, verificado 2026-09-14.
    Que aprueba (mid/senior): Flexbox es unidimensional (una fila o columna: navbar, lista de tags), Grid es bidimensional (filas y columnas a la vez: layout de página completa, dashboard con áreas nombradas); menciona que se pueden combinar (Grid para el layout general, Flex dentro de cada celda).

43. **ES:** ¿Cómo se calcula la especificidad en CSS y qué problema causa el abuso de `!important`?
    **EN:** How is CSS specificity calculated, and what problem does overusing `!important` cause?
    Tipo: fundamento. Nivel minimo: mid. Frecuencia: media.
    Fuente: yangshun/front-end-interview-handbook, https://github.com/yangshun/front-end-interview-handbook, verificado 2026-09-14.
    Que aprueba (mid/senior): orden de peso: estilos inline > id > clase/atributo/pseudoclase > elemento/pseudoelemento, y se suma por cada selector; `!important` rompe esa jerarquía y obliga a usar más `!important` en cascada para sobreescribirlo, haciendo el CSS imposible de mantener con el tiempo.

44. **ES:** Diseña un layout responsive con mobile-first: ¿qué diferencia hay respecto a partir de desktop y usar media queries "max-width"?
    **EN:** Design a mobile-first responsive layout: how does it differ from starting from desktop and using "max-width" media queries?
    Tipo: razonamiento. Nivel minimo: mid. Frecuencia: media.
    Fuente: yangshun/front-end-interview-handbook, https://github.com/yangshun/front-end-interview-handbook, verificado 2026-09-14.
    Que aprueba (mid/senior): mobile-first define los estilos base para pantallas pequeñas y usa `min-width` para ir añadiendo complejidad en pantallas grandes; suele producir menos CSS y mejor rendimiento en móvil (que no descarga reglas pensadas para desktop que luego sobreescribe).

45. **ES:** ¿Qué son los Core Web Vitals actuales (LCP, INP, CLS) y qué significa cada uno?
    **EN:** What are the current Core Web Vitals (LCP, INP, CLS) and what does each one mean?
    Tipo: definicion. Nivel minimo: mid. Frecuencia: alta.
    Fuente: agregadores actualizados 2026 sobre Core Web Vitals (resumen de busqueda, no leido articulo completo) https://www.corewebvitals.io/core-web-vitals, verificado 2026-09-14; INP sustituyó a FID como métrica oficial de responsividad desde marzo de 2024 (hecho previo, no re-verificado en esta pasada, marcado como "conocimiento previo, no re-confirmado con fuente primaria de Google en esta sesion").
    Que aprueba (mid/senior): LCP (Largest Contentful Paint, <2.5s bueno) mide velocidad de carga percibida; INP (Interaction to Next Paint, <200ms bueno) mide la latencia de CUALQUIER interacción durante toda la visita, no solo la primera (por eso reemplazó a FID); CLS (Cumulative Layout Shift, <0.1 bueno) mide saltos visuales inesperados; se evalúan en el percentil 75 de usuarios reales (CrUX), no en un solo test de laboratorio.

46. **ES:** Menciona 3 causas típicas de un CLS alto y cómo las arreglarías.
    **EN:** Name 3 typical causes of a high CLS and how you'd fix them.
    Tipo: kata. Nivel minimo: mid. Frecuencia: media.
    Fuente: agregadores Core Web Vitals 2026 (resumen de busqueda, no leido en detalle) https://www.w3era.com/blog/seo/core-web-vitals-guide/, verificado 2026-09-14.
    Que aprueba (mid/senior): imágenes/vídeos sin `width`/`height` (o `aspect-ratio`) reservados, que empujan el contenido al cargar; fuentes web sin `font-display` que causan FOUT/reflow; contenido inyectado dinámicamente arriba del fold (banners, anuncios) sin espacio reservado.

47. **ES:** Explica la diferencia entre los métodos HTTP GET, POST, PUT, PATCH y DELETE, y cuáles son idempotentes.
    **EN:** Explain the difference between HTTP GET, POST, PUT, PATCH and DELETE, and which ones are idempotent.
    Tipo: definicion. Nivel minimo: junior. Frecuencia: alta.
    Fuente: patron estandar REST (semantica HTTP, MDN/RFC 9110; conocimiento consolidado, no requiere fuente adicional mas alla de la especificacion), contrastado con discusion de idempotencia en API design (Hello Interview, "API Design for System Design Interviews") https://www.hellointerview.com/learn/system-design/core-concepts/api-design, "(resumen de busqueda, no leido en detalle)", verificado 2026-09-14.
    Que aprueba (mid/senior): GET/PUT/DELETE/HEAD/OPTIONS son idempotentes (repetir la misma petición produce el mismo estado final); POST y PATCH normalmente no lo son; PUT reemplaza el recurso completo, PATCH aplica una modificación parcial; para operaciones POST que crean algo (pagos, reservas) hay que añadir una idempotency key manual porque el método en sí no lo garantiza.

48. **ES:** ¿Qué significan los códigos HTTP 401 vs 403? Da un ejemplo de cuándo usar cada uno.
    **EN:** What do HTTP status codes 401 vs 403 mean? Give an example of when to use each.
    Tipo: fundamento. Nivel minimo: junior. Frecuencia: alta.
    Fuente: patron estandar de entrevistas backend/fullstack (especificacion HTTP, conocimiento consolidado), verificado 2026-09-14.
    Que aprueba (mid/senior): 401 Unauthorized = no sabemos quién eres (falta o es inválida la autenticación, se espera que el cliente se autentique y reintente); 403 Forbidden = sabemos quién eres pero no tienes permiso (autenticado pero no autorizado); confundirlos es un error común detectado en revisiones de código.

49. **ES:** ¿Cómo funciona la cache HTTP con `Cache-Control`, `ETag` y `Last-Modified`? ¿Qué diferencia hay entre validación y expiración?
    **EN:** How does HTTP caching work with `Cache-Control`, `ETag` and `Last-Modified`? What's the difference between validation and expiration?
    Tipo: fundamento. Nivel minimo: mid. Frecuencia: media.
    Fuente: patron estandar HTTP caching (MDN/RFC 9111, conocimiento consolidado), verificado 2026-09-14.
    Que aprueba (mid/senior): `Cache-Control: max-age` fija cuánto tiempo se puede usar la respuesta sin preguntar al servidor (expiración); pasado ese tiempo, el navegador puede hacer una petición condicional con `If-None-Match`/`If-Modified-Since` para revalidar contra `ETag`/`Last-Modified` y recibir un 304 sin body si nada cambió (validación); distingue `no-cache` (revalida siempre) de `no-store` (nunca cachea).

50. **ES:** REST vs GraphQL: ¿qué problema real de REST resuelve GraphQL y qué problema nuevo introduce?
    **EN:** REST vs GraphQL: what real REST problem does GraphQL solve, and what new problem does it introduce?
    Tipo: razonamiento. Nivel minimo: mid. Frecuencia: alta.
    Fuente: patron habitual de comparativa en bancos de preguntas fullstack (yangshun/front-end-interview-handbook y sudheerj, ambos citan REST vs GraphQL como tema recurrente) https://github.com/yangshun/front-end-interview-handbook, verificado 2026-09-14.
    Que aprueba (mid/senior): GraphQL resuelve over-fetching/under-fetching (el cliente pide exactamente los campos que necesita, en una sola petición para datos anidados) y evita versionar el endpoint; a cambio complica el cacheo HTTP estándar (todo va por POST a un único endpoint), abre riesgo de queries costosas/anidadas sin límites (necesita "query complexity limiting"), y mueve parte de la lógica de agregación al backend (resolvers N+1).

51. **ES:** Compara JWT con sesiones basadas en cookies del lado del servidor. ¿Cuándo elegirías cada una?
    **EN:** Compare JWT with server-side cookie sessions. When would you choose each?
    Tipo: razonamiento. Nivel minimo: mid. Frecuencia: alta.
    Fuente: patron estandar de autenticacion en entrevistas fullstack (OWASP Top 10:2025, categoria de fallos de autenticacion) https://owasp.org/Top10/2025/, verificado 2026-09-14.
    Que aprueba (mid/senior): sesiones en servidor son fáciles de revocar al instante (borras la fila/entrada en Redis) pero necesitan almacenamiento compartido si hay varios servidores; JWT es autocontenido y sin estado (bueno para escalar horizontalmente y microservicios) pero difícil de revocar antes de que expire sin una lista negra; en ambos casos, el token/cookie de sesión debe ir en cookie `httpOnly`, `Secure`, `SameSite`, nunca en `localStorage`, para mitigar XSS.

52. **ES:** ¿Qué es OAuth 2.0 y qué diferencia hay entre autenticación y autorización?
    **EN:** What is OAuth 2.0 and what's the difference between authentication and authorization?
    Tipo: definicion. Nivel minimo: mid. Frecuencia: media.
    Fuente: patron estandar de entrevistas backend (conocimiento consolidado sobre RFC 6749, contrastado con la clasificacion OWASP de fallos de control de acceso) https://owasp.org/Top10/2025/, verificado 2026-09-14.
    Que aprueba (mid/senior): autenticación responde "¿quién eres?", autorización responde "¿qué puedes hacer?"; OAuth 2.0 es un protocolo de AUTORIZACIÓN (delega acceso a recursos sin compartir la contraseña, ej. "iniciar sesión con Google" usa OpenID Connect encima de OAuth para la parte de autenticación); distingue el rol de authorization server, resource server y client.

53. **ES:** ¿Qué son las cookies `SameSite=Strict/Lax/None` y qué ataque previenen?
    **EN:** What are `SameSite=Strict/Lax/None` cookies and what attack do they prevent?
    Tipo: fundamento. Nivel minimo: mid. Frecuencia: media.
    Fuente: OWASP Top 10:2025 (referencia a CSRF como parte de control de acceso roto), https://owasp.org/Top10/2025/, verificado 2026-09-14.
    Que aprueba (mid/senior): `SameSite` limita cuándo el navegador envía una cookie en peticiones cross-site; `Strict` nunca la envía cross-site, `Lax` la envía en navegación top-level tipo GET (por defecto en navegadores modernos), `None` la envía siempre pero exige `Secure`; mitiga CSRF porque un sitio malicioso ya no puede "montarse" en la sesión autenticada de la víctima.

54. **ES:** ¿Qué es CORS y por qué un error de CORS en consola NO es un problema de seguridad del navegador de la víctima?
    **EN:** What is CORS, and why is a CORS error in the console NOT a security problem for the victim's browser?
    Tipo: fundamento. Nivel minimo: mid. Frecuencia: alta.
    Fuente: patron muy comun de confusion en entrevistas junior/mid (documentacion MDN sobre CORS, conocimiento consolidado), verificado 2026-09-14.
    Que aprueba (mid/senior): CORS es una restricción que aplican los NAVEGADORES al código JavaScript de un origen que intenta leer la respuesta de otro origen; el servidor decide qué orígenes permite con la cabecera `Access-Control-Allow-Origin`; un atacante que no usa navegador (curl, servidor a servidor) no está limitado por CORS, así que CORS no sustituye autenticación/autorización en el backend.

55. **ES:** Explica XSS (cross-site scripting) y cómo lo mitigas en una app React/Next.js.
    **EN:** Explain XSS (cross-site scripting) and how you mitigate it in a React/Next.js app.
    Tipo: fundamento. Nivel minimo: mid. Frecuencia: alta.
    Fuente: OWASP Top 10:2025, https://owasp.org/Top10/2025/, verificado 2026-09-14 (XSS sigue mapeado dentro de las categorias de inyeccion/validacion de la lista 2025 segun cobertura agregada, ver nota en Incertidumbres sobre el mapeo exacto).
    Que aprueba (mid/senior): XSS inyecta script en una página que ve otro usuario; React escapa por defecto el contenido interpolado en JSX, así que el riesgo real está en `dangerouslySetInnerHTML`, atributos `href`/`src` con URLs controladas por el usuario (`javascript:`), o renderizar HTML de un CMS sin sanitizar (usar una librería como DOMPurify).

56. **ES:** Explica CSRF (cross-site request forgery) y por qué las Server Actions/formularios necesitan protección aunque uses cookies `httpOnly`.
    **EN:** Explain CSRF (cross-site request forgery) and why Server Actions/forms need protection even with `httpOnly` cookies.
    Tipo: fundamento. Nivel minimo: mid. Frecuencia: media.
    Fuente: OWASP Top 10:2025 (CSRF integrado en la categoria de control de acceso roto segun cambios de la edicion 2025) https://owasp.org/Top10/2025/, verificado 2026-09-14.
    Que aprueba (mid/senior): `httpOnly` evita que JavaScript malicioso LEA la cookie, pero el navegador la sigue ENVIANDO automáticamente en peticiones cross-site si no hay `SameSite` adecuado; CSRF explota justo eso: un sitio malicioso hace que el navegador de la víctima dispare una petición autenticada sin que ella lo sepa; mitigación: `SameSite=Lax/Strict`, tokens CSRF, o verificar el header `Origin`/`Referer`.

57. **ES:** ¿Qué son las inyecciones SQL y por qué un ORM no te protege automáticamente al 100%?
    **EN:** What are SQL injections, and why doesn't an ORM automatically protect you 100%?
    Tipo: fundamento. Nivel minimo: mid. Frecuencia: alta.
    Fuente: OWASP Top 10:2025 (categoria de inyeccion historicamente en el top de la lista), https://owasp.org/Top10/2025/, verificado 2026-09-14.
    Que aprueba (mid/senior): la inyección ocurre al concatenar input del usuario directamente en una query SQL; los ORMs (Prisma, Drizzle) usan queries parametrizadas por defecto, que sí protegen; el riesgo reaparece cuando el desarrollador usa `$queryRawUnsafe`/SQL crudo con interpolación de strings en vez de placeholders.

58. **ES:** Nombra 2 categorías nuevas del OWASP Top 10 más reciente y explica una.
    **EN:** Name 2 new categories from the latest OWASP Top 10 and explain one.
    Tipo: fundamento. Nivel minimo: senior. Frecuencia: baja.
    Fuente: OWASP Top 10:2025 (anunciada en OWASP Global AppSec, version final publicada enero 2026), https://owasp.org/Top10/2025/; resumen de cambios via Semgrep blog "OWASP Top 10 2025: What's New" (resumen de busqueda, no leido en detalle) https://semgrep.dev/blog/2026/owasp-top-10-2025-whats-new/, verificado 2026-09-14.
    Que aprueba (mid/senior): menciona las dos categorías nuevas de la edición 2025: "Software Supply Chain Failures" (dependencias/paquetes comprometidos, pipelines de build inseguros) y "Mishandling of Exceptional Conditions" (errores y excepciones mal gestionados que filtran información o dejan el sistema en estado inconsistente); explica con un ejemplo concreto de cualquiera de las dos.

59. **ES:** Tu API tarda 3 segundos en responder una lista simple. ¿Qué pasos seguirías para diagnosticar antes de "optimizar a ciegas"?
    **EN:** Your API takes 3 seconds to respond with a simple list. What steps would you follow to diagnose before "optimizing blindly"?
    Tipo: razonamiento. Nivel minimo: mid. Frecuencia: media.
    Fuente: patron habitual de pregunta de diagnostico en entrevistas fullstack (Glassdoor, busqueda "Full stack developer" interview questions) https://www.glassdoor.com/Interview/full-stack-developer-interview-questions-SRCH_KO0,20_SDRD.htm, "(resumen de busqueda, no leido el detalle, pagina no accesible sin cuenta)", verificado 2026-09-14.
    Que aprueba (mid/senior): mide antes de tocar código (logs con tiempos, `EXPLAIN ANALYZE` en la query, APM/tracing); separa si el cuello de botella es red, base de datos (falta de índice, N+1), serialización, o el propio cliente; propone hipótesis y las descarta una a una en vez de reescribir todo de golpe.

60. **ES (comportamental):** Cuéntame de un bug de seguridad o de rendimiento que encontraste en producción. ¿Cómo lo detectaste y qué cambiaste en el proceso para que no volviera a pasar?
    **EN (behavioral):** Tell me about a security or performance bug you found in production. How did you detect it and what did you change in the process so it wouldn't happen again?
    Tipo: comportamental. Nivel minimo: mid. Frecuencia: media.
    Fuente: patron habitual de pregunta comportamental tecnica (Glassdoor, busqueda "Full Stack Developer" interview questions Node.js React) https://www.glassdoor.com/Interview/full-stack-developer-react-nodejs-interview-questions-SRCH_KO0,33.htm, "(resumen de busqueda, no leido el detalle)", verificado 2026-09-14.
    Que aprueba (mid/senior): caso concreto y verificable, con causa raíz técnica explicada, no solo "lo arreglé"; incluye el cambio de proceso (test añadido, alerta nueva, checklist de revisión) que evita la repetición, mostrando pensamiento sistémico y no solo el parche puntual.

### B.4 Backend Node

61. **ES:** Explica el event loop de Node.js: ¿por qué un `while(true)` bloquea todas las peticiones aunque Node sea "no bloqueante"?
    **EN:** Explain the Node.js event loop: why does a `while(true)` block all requests even though Node is "non-blocking"?
    Tipo: fundamento. Nivel minimo: mid. Frecuencia: alta.
    Fuente: learning-zone/nodejs-basics (antes "nodejs-interview-questions"), https://github.com/learning-zone/nodejs-basics, verificado 2026-09-14 via WebFetch (API GitHub).
    Que aprueba (mid/senior): Node es single-threaded para el código JS de usuario; "no bloqueante" se refiere a I/O (red, disco) delegado a libuv/su thread pool, no a que el CPU-bound corra en paralelo; código síncrono pesado en el hilo principal bloquea el event loop y con él TODAS las peticiones concurrentes, porque no hay otro hilo atendiéndolas.

62. **ES:** ¿Cuáles son las fases del event loop (timers, poll, check, etc.) y dónde encajan `setImmediate` vs `process.nextTick`?
    **EN:** What are the event loop phases (timers, poll, check, etc.) and where do `setImmediate` vs `process.nextTick` fit?
    Tipo: fundamento. Nivel minimo: senior. Frecuencia: media.
    Fuente: learning-zone/nodejs-basics, https://github.com/learning-zone/nodejs-basics, verificado 2026-09-14.
    Que aprueba (mid/senior): `process.nextTick` (y las microtasks/promesas) se vacían ANTES de pasar a la siguiente fase del loop, con prioridad más alta que cualquier fase; `setImmediate` se ejecuta en la fase "check", después de I/O; abusar de `process.nextTick` en bucle puede morir de inanición el event loop (nunca deja pasar a otras fases).

63. **ES:** Diferencia entre Express, Fastify y NestJS: ¿cuándo elegirías cada uno para un proyecto fullstack nuevo?
    **EN:** Difference between Express, Fastify and NestJS: when would you choose each for a new fullstack project?
    Tipo: razonamiento. Nivel minimo: mid. Frecuencia: media.
    Fuente: goldbergyoni/nodebestpractices (guia de arquitectura y eleccion de framework), https://github.com/goldbergyoni/nodebestpractices, verificado 2026-09-14.
    Que aprueba (mid/senior): Express es minimalista y de bajo nivel (control total, pero hay que decidir estructura y validación tú mismo); Fastify prioriza rendimiento y validación de esquema integrada (JSON Schema) con overhead menor; NestJS aporta arquitectura opinada (inyección de dependencias, módulos, decoradores al estilo Angular), buena para equipos grandes que quieren convención sobre configuración a costa de más boilerplate y curva de aprendizaje.

64. **ES:** ¿Qué es un middleware en Express/Fastify y cómo se propaga (o se detiene) el manejo de una petición?
    **EN:** What is a middleware in Express/Fastify and how does request handling propagate (or stop)?
    Tipo: definicion. Nivel minimo: junior. Frecuencia: alta.
    Fuente: goldbergyoni/nodebestpractices, https://github.com/goldbergyoni/nodebestpractices, verificado 2026-09-14.
    Que aprueba (mid/senior): función con acceso a `req`, `res` y `next`; si no llama a `next()` (o no responde), la petición se queda colgada; el orden de registro importa (auth antes que la ruta protegida); los middlewares de error se distinguen por tener 4 argumentos `(err, req, res, next)` en Express.

65. **ES:** ¿Dónde y cómo validarías el body de una petición POST, y por qué no basta con validar en el frontend?
    **EN:** Where and how would you validate a POST request body, and why isn't frontend validation enough?
    Tipo: fundamento. Nivel minimo: junior. Frecuencia: alta.
    Fuente: goldbergyoni/nodebestpractices, seccion de validacion de input, https://github.com/goldbergyoni/nodebestpractices, verificado 2026-09-14.
    Que aprueba (mid/senior): valida en el borde de entrada del servidor (middleware o al inicio del handler) con una librería de esquemas (Zod, Joi, JSON Schema de Fastify) antes de tocar la base de datos; el frontend se puede saltar completamente con curl/Postman, así que es solo UX, nunca la barrera de seguridad real.

66. **ES:** ¿Cómo diseñarías el manejo de errores centralizado en una API Express, distinguiendo errores esperados (404, validación) de errores inesperados (excepción no controlada)?
    **EN:** How would you design centralized error handling in an Express API, distinguishing expected errors (404, validation) from unexpected ones (unhandled exceptions)?
    Tipo: razonamiento. Nivel minimo: mid. Frecuencia: alta.
    Fuente: goldbergyoni/nodebestpractices, seccion "Error Handling", https://github.com/goldbergyoni/nodebestpractices, verificado 2026-09-14.
    Que aprueba (mid/senior): errores "operacionales" (input inválido, recurso no encontrado) se manejan con clases de error propias y un middleware final que las mapea a códigos HTTP; errores de programación (excepción no capturada) se loguean con stack completo y, según el proceso, se deja morir el proceso de forma controlada (con un proceso supervisor/orquestador que lo reinicia) en vez de intentar "seguir como si nada".

67. **ES:** ¿Qué son los streams en Node.js y por qué usarías uno para servir un fichero de 2GB en vez de leerlo entero en memoria?
    **EN:** What are streams in Node.js, and why would you use one to serve a 2GB file instead of reading it entirely into memory?
    Tipo: fundamento. Nivel minimo: mid. Frecuencia: media.
    Fuente: learning-zone/nodejs-basics, https://github.com/learning-zone/nodejs-basics, verificado 2026-09-14.
    Que aprueba (mid/senior): un stream procesa datos en trozos (chunks) sin cargar el fichero completo en memoria, con backpressure (si el consumidor va más lento, el productor se pausa); leer 2GB con `fs.readFile` reventaría la memoria del proceso; `fs.createReadStream().pipe(res)` mantiene el uso de memoria constante.

68. **ES:** ¿Cuándo usarías una cola de mensajes (RabbitMQ, SQS, BullMQ sobre Redis) en vez de procesar todo síncronamente en el request?
    **EN:** When would you use a message queue (RabbitMQ, SQS, BullMQ over Redis) instead of processing everything synchronously in the request?
    Tipo: razonamiento. Nivel minimo: mid. Frecuencia: media.
    Fuente: patron habitual en preguntas de arquitectura backend/fullstack (goldbergyoni/nodebestpractices, seccion de patrones de produccion), https://github.com/goldbergyoni/nodebestpractices, verificado 2026-09-14.
    Que aprueba (mid/senior): cuando la tarea es lenta o no crítica para la respuesta inmediata (enviar email, generar un PDF, procesar una imagen); encolar desacopla al productor del consumidor, permite reintentos automáticos y absorbe picos de carga; el trade-off es complejidad operativa extra y que hay que diseñar para "eventualmente consistente" en vez de respuesta inmediata.

69. **ES:** ¿Cómo mantienes sincronizados varios servidores Node con WebSockets abiertos (por ejemplo, un chat) cuando escalas horizontalmente?
    **EN:** How do you keep multiple Node servers with open WebSockets in sync (e.g. a chat app) when you scale horizontally?
    Tipo: razonamiento. Nivel minimo: senior. Frecuencia: media.
    Fuente: patron recurrente en disenos de sistemas de chat (resumen de busqueda de multiples guias de "design a chat application", p.ej. designgurus.io/blog/design-chat-application) https://www.designgurus.io/blog/design-chat-application, "(resumen de busqueda, no leido en detalle)", verificado 2026-09-14.
    Que aprueba (mid/senior): un socket abierto vive en la memoria de UN proceso; si el usuario B está conectado a otra instancia, hace falta un bus compartido (Redis Pub/Sub con el adaptador `socket.io-redis`, o un broker) para que un mensaje publicado en la instancia A llegue a la B; menciona sticky sessions o un balanceador consciente de WebSockets.

70. **ES:** ¿Qué diferencia hay entre autenticación con sesión en memoria del proceso Node y sesión en Redis, en un entorno con varios contenedores?
    **EN:** What's the difference between authentication with an in-process Node session and a Redis-backed session, in a multi-container environment?
    Tipo: kata. Nivel minimo: mid. Frecuencia: media.
    Fuente: patron estandar de arquitectura backend (goldbergyoni/nodebestpractices, seccion de estado y escalabilidad), https://github.com/goldbergyoni/nodebestpractices, verificado 2026-09-14.
    Que aprueba (mid/senior): guardar la sesión en memoria del proceso ata al usuario a ESE contenedor concreto (rompe con balanceo round-robin o al reiniciar el pod); Redis (u otro store compartido) permite que cualquier instancia lea la sesión, requisito básico para escalar horizontalmente sin sticky sessions.

71. **ES:** ¿Qué patrón usarías para no bloquear el event loop al procesar una imagen o un CSV grande subido por el usuario?
    **EN:** What pattern would you use to avoid blocking the event loop when processing an uploaded image or large CSV?
    Tipo: razonamiento. Nivel minimo: senior. Frecuencia: baja.
    Fuente: learning-zone/nodejs-basics, seccion de rendimiento, https://github.com/learning-zone/nodejs-basics, verificado 2026-09-14.
    Que aprueba (mid/senior): mover el trabajo CPU-intensivo a un `worker_thread`, un proceso hijo, o una cola externa (procesado async fuera del request-response); procesar en streaming/chunks en vez de cargar todo el fichero; nunca hacer el parseo/transformación pesada de forma síncrona en el hilo principal que atiende peticiones.

72. **ES:** ¿Cómo estructurarías las variables de entorno y secretos entre local, staging y producción en una API Node?
    **EN:** How would you structure environment variables and secrets across local, staging and production in a Node API?
    Tipo: fundamento. Nivel minimo: junior. Frecuencia: media.
    Fuente: goldbergyoni/nodebestpractices, seccion de configuracion, https://github.com/goldbergyoni/nodebestpractices, verificado 2026-09-14.
    Que aprueba (mid/senior): nunca comitear secretos al repo (usar `.env` en `.gitignore` + un gestor de secretos en producción tipo Vault/parámetros del proveedor cloud); separar configuración por entorno con validación al arrancar (fallar rápido si falta una variable requerida) en vez de descubrir el problema en producción.

73. **ES (comportamental):** Cuéntame de una vez que un servicio Node.js se cayó o se quedó sin memoria en producción. ¿Cómo lo diagnosticaste?
    **EN (behavioral):** Tell me about a time a Node.js service crashed or ran out of memory in production. How did you diagnose it?
    Tipo: comportamental. Nivel minimo: senior. Frecuencia: baja.
    Fuente: patron habitual de pregunta comportamental backend (Glassdoor, busqueda "full stack node js developer" interview questions) https://www.glassdoor.com/Interview/full-stack-node-js-developer-interview-questions-SRCH_KO0,28.htm, "(resumen de busqueda, no leido el detalle)", verificado 2026-09-14.
    Que aprueba (mid/senior): menciona herramientas reales (heap snapshot, `--inspect`, APM, logs estructurados) en vez de "lo reinicié y ya"; identifica causa raíz plausible (memory leak por listeners/timers no limpiados, cache sin límite, conexiones no cerradas) y qué monitorización añadió después para detectarlo antes la próxima vez.

74. **ES:** Diseña el contrato de una API REST para "crear un pedido" (`POST /orders`): ¿qué validaciones, códigos de respuesta y estructura de error usarías?
    **EN:** Design the contract of a REST API for "create an order" (`POST /orders`): what validations, response codes and error structure would you use?
    Tipo: diseno. Nivel minimo: mid. Frecuencia: alta.
    Fuente: patron estandar de diseño de API en entrevistas fullstack (Hello Interview, "API Design for System Design Interviews") https://www.hellointerview.com/learn/system-design/core-concepts/api-design, "(resumen de busqueda, no leido en detalle)", verificado 2026-09-14.
    Que aprueba (mid/senior): valida el body con un esquema, devuelve 201 + el recurso creado (con `Location` del nuevo recurso) en éxito, 400 con un formato de error consistente y explicable por campo en fallo de validación, 409 si hay conflicto (stock insuficiente); menciona idempotencia con una `Idempotency-Key` para evitar pedidos duplicados si el cliente reintenta por timeout de red.

### B.5 Datos

75. **ES:** Explica los tipos de JOIN (`INNER`, `LEFT`, `RIGHT`, `FULL OUTER`) con un ejemplo de cuándo usar cada uno.
    **EN:** Explain the types of JOIN (`INNER`, `LEFT`, `RIGHT`, `FULL OUTER`) with an example of when to use each.
    Tipo: definicion. Nivel minimo: junior. Frecuencia: alta.
    Fuente: patron muy recurrente en bancos de preguntas SQL (jaimin-bariya/Awesome-SQL-Interview, resumen de busqueda, no leido en detalle) https://github.com/jaimin-bariya/Awesome-SQL-Interview, verificado 2026-09-14.
    Que aprueba (mid/senior): `INNER JOIN` solo filas con match en ambas tablas; `LEFT JOIN` todas las de la izquierda aunque no haya match (NULL en las columnas de la derecha); da un ejemplo real, ej. "todos los usuarios y sus pedidos si tienen" (LEFT) vs "solo usuarios que sí compraron" (INNER).

76. **ES:** ¿Cómo decides qué columnas indexar, y por qué un índice a veces EMPEORA el rendimiento?
    **EN:** How do you decide which columns to index, and why does an index sometimes MAKE performance WORSE?
    Tipo: razonamiento. Nivel minimo: mid. Frecuencia: alta.
    Fuente: patron recurrente en preguntas SQL/Postgres de nivel mid-senior (sanketrs/sql-interview-preparation-questions-with-answers, resumen de busqueda) https://github.com/sanketrs/sql-interview-preparation-questions-with-answers, verificado 2026-09-14.
    Que aprueba (mid/senior): indexa columnas usadas en `WHERE`, `JOIN` y `ORDER BY` con alta selectividad (muchos valores distintos); cada índice ralentiza los `INSERT`/`UPDATE`/`DELETE` (hay que mantenerlo) y ocupa espacio/memoria; un índice en una columna de baja cardinalidad (ej. un booleano) rara vez ayuda al planner; demasiados índices en una tabla de escritura intensiva puede ser peor que no tener ninguno.

77. **ES:** ¿Qué es el problema N+1 y cómo lo detectarías y arreglarías usando Prisma?
    **EN:** What is the N+1 problem and how would you detect and fix it using Prisma?
    Tipo: kata. Nivel minimo: mid. Frecuencia: alta.
    Fuente: documentacion oficial Prisma sobre optimizacion de queries, https://www.prisma.io/docs/orm/prisma-client/queries/advanced/query-optimization-performance, verificado 2026-09-14 via busqueda (resumen de busqueda, contenido tecnico contrastado con multiples fuentes coincidentes: dev.to/jtorchia y furkanbaytekin.dev).
    Que aprueba (mid/senior): 1 query para traer N filas + N queries adicionales (una por fila) para su relación, en vez de 1 query con `include`/`JOIN`; se detecta activando el logging de queries de Prisma y viendo docenas de queries idénticas repetidas; se arregla con `include`/`select` (eager loading) o con `relationLoadStrategy: "join"`, o con un dataloader que agrupa (batching) las queries en el mismo tick.

78. **ES:** ¿Qué son las transacciones y las propiedades ACID? Da un ejemplo de negocio donde una transacción es obligatoria.
    **EN:** What are transactions and the ACID properties? Give a business example where a transaction is mandatory.
    Tipo: definicion. Nivel minimo: mid. Frecuencia: alta.
    Fuente: patron muy recurrente en bancos SQL (kansiris/SQL-interview-questions, resumen de busqueda) https://github.com/kansiris/SQL-interview-questions, verificado 2026-09-14.
    Que aprueba (mid/senior): Atomicidad (todo o nada), Consistencia (las reglas/constraints se respetan siempre), Aislamiento (transacciones concurrentes no se pisan de forma incoherente), Durabilidad (una vez confirmada, sobrevive a un crash); ejemplo clásico: transferir dinero entre dos cuentas (debitar de una y acreditar en otra deben ser atómicas, o el dinero "desaparece" si falla a mitad).

79. **ES:** ¿Qué es la normalización de bases de datos y cuándo desnormalizarías a propósito?
    **EN:** What is database normalization, and when would you intentionally denormalize?
    Tipo: fundamento. Nivel minimo: mid. Frecuencia: media.
    Fuente: patron recurrente en bancos SQL (kansiris/SQL-interview-questions), https://github.com/kansiris/SQL-interview-questions, verificado 2026-09-14.
    Que aprueba (mid/senior): normalizar elimina redundancia y anomalías de actualización dividiendo datos en tablas relacionadas (1NF, 2NF, 3NF); desnormalizar (duplicar datos, o guardar un campo calculado) tiene sentido cuando el patrón de lectura domina sobre el de escritura y el JOIN repetido es el cuello de botella real, aceptando el coste de mantener la duplicación consistente.

80. **ES:** Diferencia entre `WHERE` y `HAVING` en una query con `GROUP BY`.
    **EN:** Difference between `WHERE` and `HAVING` in a query with `GROUP BY`.
    Tipo: definicion. Nivel minimo: junior. Frecuencia: alta.
    Fuente: patron muy recurrente en bancos SQL (jaimin-bariya/Awesome-SQL-Interview), https://github.com/jaimin-bariya/Awesome-SQL-Interview, verificado 2026-09-14.
    Que aprueba (mid/senior): `WHERE` filtra filas ANTES de agrupar (no puede usar funciones de agregación); `HAVING` filtra grupos DESPUÉS de agregar (ej. `HAVING COUNT(*) > 5`); confundirlos es un error común de sintaxis en entrevistas junior.

81. **ES:** ¿Qué diferencia hay entre Prisma y Drizzle como ORM/query builder para un proyecto Postgres nuevo?
    **EN:** What's the difference between Prisma and Drizzle as an ORM/query builder for a new Postgres project?
    Tipo: razonamiento. Nivel minimo: mid. Frecuencia: media.
    Fuente: comparativas agregadas 2026 (resumen de busqueda, no leido articulo especifico completo; tema recurrente en discusiones de la comunidad Next.js/Supabase), verificado 2026-09-14.
    Que aprueba (mid/senior): Prisma tiene su propio DSL de esquema, genera un cliente tipado y un motor intermedio, con gran DX pero un poco más de "magia" y overhead; Drizzle es más cercano a SQL (query builder tipado sobre TypeScript, sin motor Rust intermedio), da más control fino y suele ser más ligero en cold starts (relevante en serverless/edge); ninguno es objetivamente "mejor", depende de cuánto control sobre SQL quiere el equipo.

82. **ES:** ¿Qué es Row Level Security (RLS) en Supabase/Postgres y cuál es el error más peligroso al configurarla?
    **EN:** What is Row Level Security (RLS) in Supabase/Postgres, and what's the most dangerous mistake when configuring it?
    Tipo: fundamento. Nivel minimo: mid. Frecuencia: media.
    Fuente: guias de errores comunes de RLS en Supabase 2026 (resumen de busqueda de varias fuentes coincidentes: vibeappscanner.com/supabase-row-level-security, securifyai.co/blog/supabase-row-level-security-rls-common-misconfigurations-and-security-risks), verificado 2026-09-14.
    Que aprueba (mid/senior): RLS son políticas a nivel de fila que Postgres aplica según el usuario autenticado (via `auth.uid()`), pensadas para que el cliente pueda hablar directo con la base de datos de forma segura; el error más peligroso es CREAR la tabla y olvidar activar RLS (por defecto cualquier fila es accesible vía la API pública), o activarla y no probar el acceso desde el SDK cliente (el SQL Editor del dashboard IGNORA RLS, así que "funciona en el editor" no prueba nada).

83. **ES:** ¿Cuándo elegirías una base de datos NoSQL (documento/clave-valor) en vez de SQL para una feature nueva?
    **EN:** When would you choose a NoSQL (document/key-value) database over SQL for a new feature?
    Tipo: razonamiento. Nivel minimo: mid. Frecuencia: media.
    Fuente: patron recurrente en comparativas de arquitectura de datos en entrevistas fullstack (system design agregados, ej. algomaster.io/donnemartin/system-design-primer), https://github.com/donnemartin/system-design-primer, verificado 2026-09-14.
    Que aprueba (mid/senior): cuando el esquema es muy variable/anidado y no necesitas JOINs complejos ni transacciones multi-tabla estrictas (ej. logs de eventos, catálogos con atributos dinámicos); cuando la escala de escritura/lectura horizontal importa más que la consistencia fuerte inmediata; NO es "NoSQL siempre escala mejor" sin matices: Postgres bien indexado aguanta mucho más de lo que la gente cree.

84. **ES:** ¿Para qué usarías Redis en un stack Next.js + Postgres, más allá de "cache genérica"? Da 3 casos concretos.
    **EN:** What would you use Redis for in a Next.js + Postgres stack, beyond "generic cache"? Give 3 concrete cases.
    Tipo: razonamiento. Nivel minimo: mid. Frecuencia: media.
    Fuente: patron habitual en preguntas de arquitectura backend (goldbergyoni/nodebestpractices, y guias de rate limiting con Redis, resumen de busqueda), verificado 2026-09-14.
    Que aprueba (mid/senior): cache de resultados de queries caras con invalidación explícita; rate limiting (contador atómico con expiración, ej. token bucket con script Lua); sesiones compartidas entre instancias; cola ligera/pub-sub para notificar eventos entre servicios (BullMQ, WebSocket fan-out).

85. **ES:** ¿Qué son las migraciones de base de datos y por qué NO deberías editar el esquema de producción a mano desde un cliente SQL?
    **EN:** What are database migrations, and why should you NOT hand-edit the production schema from a SQL client?
    Tipo: fundamento. Nivel minimo: junior. Frecuencia: media.
    Fuente: patron habitual de buenas practicas de datos en entrevistas fullstack (documentacion Prisma Migrate / Drizzle Kit, conocimiento consolidado), verificado 2026-09-14.
    Que aprueba (mid/senior): las migraciones son scripts versionados y reproducibles (en git) que llevan el esquema de un estado a otro de forma auditable y aplicable en cualquier entorno; editar a mano en producción crea drift entre entornos, no queda registrado, no se puede revertir de forma fiable y no pasa por revisión de código.

86. **ES:** Tienes una tabla de 1 millón de pedidos y necesitas paginar el listado de un admin. ¿Por qué `OFFSET` se vuelve lento y qué harías en su lugar?
    **EN:** You have a table with 1 million orders and need to paginate an admin listing. Why does `OFFSET` get slow, and what would you do instead?
    Tipo: razonamiento. Nivel minimo: mid. Frecuencia: alta.
    Fuente: comparativa keyset vs offset en Postgres a escala (Sequin blog, "Keyset Cursors, Not Offsets, for Postgres Pagination") https://blog.sequinstream.com/keyset-cursors-not-offsets-for-postgres-pagination/, "(resumen de busqueda, no leido articulo completo)", verificado 2026-09-14.
    Que aprueba (mid/senior): `OFFSET N` obliga a Postgres a recorrer y descartar las primeras N filas del índice antes de devolver la página, así que el coste crece con la página (en la página 10.000 es mucho más lento que en la 2); la alternativa es paginación por keyset/cursor (`WHERE (created_at, id) < ($cursor_fecha, $cursor_id) ORDER BY created_at DESC, id DESC LIMIT n`) con un índice compuesto que matchee ese orden, coste casi constante por página; menciona que un híbrido (OFFSET solo en las primeras páginas, cursor para "cargar más") es una opción práctica.

87. **ES:** ¿Cómo diseñarías el índice para que la query de paginación anterior sea realmente rápida?
    **EN:** How would you design the index so the previous pagination query is actually fast?
    Tipo: kata. Nivel minimo: senior. Frecuencia: media.
    Fuente: guias de keyset pagination en Postgres (Stacksync, "Postgres Pagination: Keyset vs Offset vs Cursor") https://www.stacksync.com/blog/keyset-cursors-postgres-pagination-fast-accurate-scalable, "(resumen de busqueda, no leido articulo completo)", verificado 2026-09-14.
    Que aprueba (mid/senior): índice compuesto que siga exactamente el orden y dirección del `ORDER BY` (ej. `(created_at DESC, id DESC)`), con un "tiebreaker" único (normalmente `id`) para deshacer empates cuando dos filas comparten el mismo `created_at`; confirma con `EXPLAIN ANALYZE` que el planner usa un index scan y no un seq scan.

88. **ES (comportamental):** Cuéntame de una query lenta que optimizaste en producción. ¿Cómo la encontraste y qué cambiaste exactamente?
    **EN (behavioral):** Tell me about a slow query you optimized in production. How did you find it and what exactly did you change?
    Tipo: comportamental. Nivel minimo: mid. Frecuencia: media.
    Fuente: patron habitual de pregunta comportamental de datos (Glassdoor, busqueda generica de preguntas fullstack con backend/SQL) https://www.glassdoor.com/Interview/full-stack-developer-mid-interview-questions-SRCH_KO0,24.htm, "(resumen de busqueda, no leido el detalle)", verificado 2026-09-14.
    Que aprueba (mid/senior): usa evidencia real (slow query log, `EXPLAIN ANALYZE`, APM) para identificar la query, no adivina; explica el cambio concreto (índice nuevo, reescritura de la query, eliminación de un N+1, desnormalización puntual) y el resultado medido en tiempo o carga, no solo "ahora va más rápido".

### B.6 Arquitectura y diseno de sistemas

89. **ES:** Monolito vs microservicios: ¿qué problema organizativo (no solo técnico) resuelven los microservicios, y qué coste añaden?
    **EN:** Monolith vs microservices: what organizational problem (not just technical) do microservices solve, and what cost do they add?
    Tipo: razonamiento. Nivel minimo: senior. Frecuencia: alta.
    Fuente: donnemartin/system-design-primer, https://github.com/donnemartin/system-design-primer, verificado 2026-09-14 via WebFetch (API GitHub); contenido citado como referencia/inspiracion, licencia CC BY-SA 4.0 exige atribucion (ver tabla A).
    Que aprueba (mid/senior): microservicios permiten que equipos distintos desplieguen de forma independiente y escalen solo la parte que lo necesita (problema de "muchos equipos, un solo deploy" del monolito); el coste real es operativo: observabilidad distribuida, consistencia eventual entre servicios, latencia de red donde antes había una llamada de función, y mucha más complejidad de despliegue/testing de integración; para un equipo pequeño, un monolito bien modularizado suele ser la opción más pragmática.

90. **ES:** ¿Qué es la arquitectura hexagonal (puertos y adaptadores) y qué problema concreto evita en un backend Node/TypeScript?
    **EN:** What is hexagonal architecture (ports and adapters), and what concrete problem does it avoid in a Node/TypeScript backend?
    Tipo: definicion. Nivel minimo: senior. Frecuencia: media.
    Fuente: patron recurrente en discusiones de arquitectura backend (conocimiento consolidado sobre el patron de Alistair Cockburn, contrastado con goldbergyoni/nodebestpractices seccion de estructura de proyecto) https://github.com/goldbergyoni/nodebestpractices, verificado 2026-09-14.
    Que aprueba (mid/senior): separa la lógica de negocio (el "dominio") de los detalles técnicos (framework HTTP, ORM, proveedor de email) detrás de interfaces ("puertos"); evita que cambiar de Express a Fastify, o de Prisma a Drizzle, obligue a reescribir las reglas de negocio; el coste es más indirección/archivos para proyectos pequeños donde puede ser sobreingeniería.

91. **ES:** ¿Cómo diseñarías un sistema de colas y eventos para desacoplar "usuario se registra" de "enviar email de bienvenida" y "crear registro en CRM"?
    **EN:** How would you design a queue/event system to decouple "user signs up" from "send welcome email" and "create CRM record"?
    Tipo: diseno. Nivel minimo: senior. Frecuencia: media.
    Fuente: patron recurrente en preguntas de arquitectura orientada a eventos (donnemartin/system-design-primer, seccion de colas), https://github.com/donnemartin/system-design-primer, verificado 2026-09-14.
    Que aprueba (mid/senior): el endpoint de registro publica un evento (`user.registered`) a una cola/bus en vez de llamar directamente a cada servicio; cada consumidor (email, CRM) se suscribe de forma independiente y puede fallar/reintentar sin tumbar el registro del usuario; menciona idempotencia en los consumidores (pueden recibir el mismo evento dos veces) y una dead-letter queue para eventos que fallan repetidamente.

92. **ES:** ¿Cómo escalarías horizontalmente una API que hoy corre en un solo servidor y empieza a saturarse?
    **EN:** How would you scale horizontally an API that today runs on a single server and is starting to get saturated?
    Tipo: razonamiento. Nivel minimo: mid. Frecuencia: alta.
    Fuente: donnemartin/system-design-primer, https://github.com/donnemartin/system-design-primer, verificado 2026-09-14.
    Que aprueba (mid/senior): primero hacer el servidor "stateless" (sesión fuera del proceso, en Redis/DB) para poder tener N réplicas detrás de un balanceador de carga; luego identificar el cuello de botella real (¿es CPU de la app o la base de datos?) antes de simplemente añadir más réplicas; considera cache (CDN para estáticos, Redis para queries calientes) antes de escalar la base de datos.

93. **ES:** ¿Qué es un CDN y qué tipo de contenido NO deberías poner detrás de uno sin pensarlo bien?
    **EN:** What is a CDN, and what kind of content should you NOT put behind one without thinking it through?
    Tipo: fundamento. Nivel minimo: mid. Frecuencia: media.
    Fuente: donnemartin/system-design-primer, https://github.com/donnemartin/system-design-primer, verificado 2026-09-14.
    Que aprueba (mid/senior): un CDN sirve contenido cacheado desde nodos cerca geográficamente del usuario (estáticos: JS/CSS/imágenes, páginas SSG); contenido personalizado por usuario o muy sensible a frescura (saldo de cuenta, datos privados) necesita reglas de cache muy cuidadosas o no cachearse en el CDN, para no servirle a un usuario datos de otro por error de configuración de cache key.

94. **ES:** Diseña el rate limiting de una API pública: ¿qué algoritmo usarías y por qué, y a qué nivel lo aplicarías (usuario, IP, API key)?
    **EN:** Design rate limiting for a public API: what algorithm would you use and why, and at what level (user, IP, API key)?
    Tipo: diseno. Nivel minimo: senior. Frecuencia: media.
    Fuente: guias de rate limiting en entrevistas de sistemas (resumen de busqueda de multiples fuentes coincidentes: intervu.dev/blog/rate-limiter-system-design, digitalapplied.com/blog/api-rate-limiting-strategies-2026-engineering-reference), verificado 2026-09-14.
    Que aprueba (mid/senior): token bucket como default razonable para APIs de cara al usuario (permite ráfagas cortas, O(1) en memoria por usuario con un script Lua atómico en Redis); leaky bucket cuando hace falta una tasa de salida constante para proteger un sistema downstream frágil; limita por API key/usuario autenticado en vez de solo IP (varios usuarios detrás de un NAT comparten IP); devuelve 429 con cabeceras `Retry-After`/`X-RateLimit-Remaining`.

95. **ES:** ¿Qué es la idempotencia en el diseño de una API y por qué un endpoint de "cobrar pago" la necesita aunque use POST?
    **EN:** What is idempotency in API design, and why does a "charge payment" endpoint need it even though it uses POST?
    Tipo: fundamento. Nivel minimo: senior. Frecuencia: alta.
    Fuente: discusion de trampas de backend en entrevistas (post publico sobre "backend interview traps": idempotency, pagination, rate limiting) https://x.com/0xlelouch_/status/2063733246412632189, "(resumen de busqueda, no leido el hilo completo)"; contrastado con guia de idempotencia de Zuplo https://zuplo.com/learning-center/implementing-idempotency-keys-in-rest-apis-a-complete-guide, verificado 2026-09-14.
    Que aprueba (mid/senior): POST no es idempotente por definición HTTP, así que si el cliente reintenta tras un timeout de red (sin saber si el primer intento llegó), puede duplicar el cobro; la solución es que el cliente genere una `Idempotency-Key` única por operación, el servidor la guarda con el resultado de la primera ejecución, y en reintentos con la misma key devuelve el resultado guardado sin volver a cobrar.

96. **ES:** Diseña a nivel fullstack un acortador de URLs (tipo bit.ly): esquema de datos, generación del código corto y ruta de redirección.
    **EN:** Design a URL shortener (like bit.ly) at the fullstack level: data schema, short code generation, and redirect route.
    Tipo: diseno. Nivel minimo: mid. Frecuencia: alta.
    Fuente: guias agregadas de diseño de acortador de URLs (resumen de busqueda de multiples fuentes coincidentes: algomaster.io/learn/system-design-interviews/design-url-shortener, bytebytego.com/courses/system-design-interview/design-a-url-shortener), verificado 2026-09-14.
    Que aprueba (mid/senior): esquema mínimo (`short_code` PK, `long_url`, `owner_id`, `created_at`, `expires_at`, contador de clicks); genera el código corto con un contador incremental codificado en base62 (evita colisiones sin necesitar reintentos, a diferencia de hashear + truncar); la ruta de redirección hace un `SELECT` por índice sobre `short_code` y devuelve 301/302; a escala menciona cache (Redis) delante de la tabla de redirects porque la lectura domina brutalmente sobre la escritura.

97. **ES:** Diseña a nivel fullstack un chat 1:1 simple: cómo entregas mensajes en tiempo real y qué pasa si el receptor está offline.
    **EN:** Design a simple 1:1 chat at the fullstack level: how do you deliver messages in real time, and what happens if the receiver is offline?
    Tipo: diseno. Nivel minimo: senior. Frecuencia: media.
    Fuente: guias agregadas de diseño de chat (resumen de busqueda de multiples fuentes coincidentes: engineeringenablement.substack.com/p/how-i-would-design-a-real-time-chat-application, algomaster.io "Design a Chat Application like WhatsApp"), verificado 2026-09-14.
    Que aprueba (mid/senior): conexión WebSocket persistente para usuarios online (el servidor empuja el mensaje al instante); si el receptor está offline, el mensaje se persiste en la base de datos (Postgres para metadatos de conversación/usuario, o una tabla optimizada a escritura para mensajes) y se entrega cuando reconecta, más una notificación push opcional; menciona el problema de escalar WebSockets entre varias instancias (ver pregunta 69).

98. **ES:** Diseña a nivel fullstack un feed tipo timeline (posts de gente que sigues, ordenados cronológicamente o por relevancia).
    **EN:** Design a timeline-style feed at the fullstack level (posts from people you follow, ordered chronologically or by relevance).
    Tipo: diseno. Nivel minimo: senior. Frecuencia: media.
    Fuente: guias agregadas de diseño de feed/news feed (GreatFrontEnd, listado de temas de system design "News Feed (Facebook)", resumen de busqueda) https://www.greatfrontend.com/questions/system-design, verificado 2026-09-14.
    Que aprueba (mid/senior): distingue estrategia "pull" (al pedir el feed, consultar posts de todos los seguidos en el momento: barato de escribir, caro de leer si sigues a muchos) de "push"/fan-out en escritura (al publicar, insertar el post en el feed pre-computado de cada seguidor: lectura instantánea, pero caro si el autor tiene millones de seguidores, requiere un híbrido); menciona paginación por cursor (no offset) para el scroll infinito.

99. **ES:** ¿Qué son clean architecture y SOLID aplicados a un proyecto fullstack, sin caer en sobreingeniería para un CRUD simple?
    **EN:** What are clean architecture and SOLID applied to a fullstack project, without over-engineering a simple CRUD?
    Tipo: razonamiento. Nivel minimo: senior. Frecuencia: media.
    Fuente: patron recurrente en entrevistas de arquitectura senior (conocimiento consolidado sobre Clean Architecture de Robert C. Martin, contrastado con discusiones de la comunidad), verificado 2026-09-14.
    Que aprueba (mid/senior): explica el principio central (las dependencias apuntan hacia el dominio, no al revés) sin recitar la lista completa de memoria; da criterio de cuándo NO aplicarlo a rajatabla: un CRUD administrativo interno de bajo riesgo no necesita 4 capas si eso ralentiza al equipo sin beneficio real; el criterio es la complejidad/volatilidad esperada del dominio, no aplicar el patrón "porque toca".

100. **ES:** ¿Qué observabilidad (logs, métricas, trazas) pondrías desde el día 1 en un backend nuevo, antes de que haga falta depurar un incidente?
     **EN:** What observability (logs, metrics, traces) would you set up from day 1 in a new backend, before you need to debug an incident?
     Tipo: razonamiento. Nivel minimo: mid. Frecuencia: media.
     Fuente: goldbergyoni/nodebestpractices, seccion de produccion/monitorizacion, https://github.com/goldbergyoni/nodebestpractices, verificado 2026-09-14.
     Que aprueba (mid/senior): logs estructurados (JSON, con request id para correlacionar) en vez de `console.log` suelto; métricas básicas (latencia p50/p95/p99, tasa de error, saturación) expuestas para un dashboard; trazas distribuidas si hay más de un servicio; alertas sobre síntomas de usuario (tasa de error, latencia) más que sobre causas internas específicas.

101. **ES (comportamental):** Cuéntame de una decisión de arquitectura que tomaste y que, con el tiempo, resultó equivocada. ¿Qué harías distinto hoy?
     **EN (behavioral):** Tell me about an architecture decision you made that turned out wrong over time. What would you do differently today?
     Tipo: comportamental. Nivel minimo: senior. Frecuencia: media.
     Fuente: patron habitual de pregunta comportamental de arquitectura en entrevistas senior (Glassdoor, busqueda "Sr react developer" preguntas de entrevista) https://www.glassdoor.es/Entrevista/sr-react-developer-preguntas-de-entrevista-SRCH_KO0,18.htm, "(resumen de busqueda, no leido el detalle, pagina no accesible sin cuenta)", verificado 2026-09-14.
     Que aprueba (mid/senior): admite el error concreto sin excusas vagas, explica el contexto que hizo esa decisión razonable EN SU MOMENTO (no solo "fui tonto"), y qué señal temprana debería haber vigilado; muestra aprendizaje aplicado a una decisión posterior, no solo arrepentimiento.

### B.7 DevOps basico

102. **ES:** ¿Qué problema resuelve Docker que no resuelve simplemente "documentar cómo instalar las dependencias"?
     **EN:** What problem does Docker solve that simply "documenting how to install dependencies" doesn't?
     Tipo: fundamento. Nivel minimo: junior. Frecuencia: alta.
     Fuente: patron recurrente en entrevistas fullstack/DevOps basico (conocimiento consolidado sobre contenedores, contrastado con goldbergyoni/nodebestpractices seccion de Docker), https://github.com/goldbergyoni/nodebestpractices, verificado 2026-09-14.
     Que aprueba (mid/senior): empaqueta la app junto con su entorno de ejecución exacto (versión de Node, dependencias del sistema) en una imagen reproducible; elimina el "en mi máquina funciona" porque el contenedor es (casi) idéntico en local, CI y producción; distingue imagen (plantilla) de contenedor (instancia en ejecución).

103. **ES:** ¿Qué es una imagen multi-stage de Docker y por qué la usarías para una app Next.js en producción?
     **EN:** What is a Docker multi-stage image and why would you use one for a Next.js app in production?
     Tipo: fundamento. Nivel minimo: mid. Frecuencia: media.
     Fuente: patron habitual en guias de despliegue de apps Node/Next.js con Docker (conocimiento consolidado, practica estandar documentada en la propia documentacion de Next.js sobre despliegue con Docker), verificado 2026-09-14.
     Que aprueba (mid/senior): separa la fase de build (con devDependencies, compiladores, todo el código fuente) de la fase final que solo copia el resultado compilado y las dependencias de producción; reduce drásticamente el tamaño de la imagen final y la superficie de ataque (sin herramientas de build ni código fuente innecesario en producción).

104. **ES:** Describe un pipeline de CI/CD básico para una app fullstack: ¿qué pasos van en CI y cuáles en CD?
     **EN:** Describe a basic CI/CD pipeline for a fullstack app: which steps belong in CI and which in CD?
     Tipo: fundamento. Nivel minimo: junior. Frecuencia: alta.
     Fuente: patron estandar de entrevistas DevOps basico para fullstack (conocimiento consolidado sobre practicas de CI/CD, sin fuente especifica adicional en esta pasada), verificado 2026-09-14.
     Que aprueba (mid/senior): CI (Integración Continua) = en cada push/PR: instalar dependencias, lint, tests, build, para detectar problemas antes de mezclar código; CD (Entrega/Despliegue Continuo) = tras pasar CI en la rama principal, desplegar automáticamente (o con aprobación manual) a staging/producción; menciona que los tests que tardan mucho no deberían bloquear cada commit sino correr en paralelo o por etapas.

105. **ES:** ¿Qué diferencia hay entre los entornos de development, staging y producción, y por qué "probarlo en producción" es mala práctica salvo excepciones controladas?
     **EN:** What's the difference between development, staging and production environments, and why is "testing in production" bad practice except in controlled cases?
     Tipo: fundamento. Nivel minimo: junior. Frecuencia: media.
     Fuente: patron estandar de entrevistas DevOps basico (conocimiento consolidado), verificado 2026-09-14.
     Que aprueba (mid/senior): staging replica producción lo más fielmente posible (misma infraestructura, datos similares pero no reales/sensibles) para detectar problemas antes de que los vea el usuario real; probar directamente en producción arriesga datos reales y a usuarios reales; menciona excepciones controladas razonables (feature flags, canary releases, rollout gradual con métricas vigiladas) como la forma correcta de "probar en producción" cuando hace falta.

106. **ES:** Un despliegue nuevo tumbó producción. ¿Qué estrategia de rollback o mitigación aplicarías primero?
     **EN:** A new deployment broke production. What rollback or mitigation strategy would you apply first?
     Tipo: razonamiento. Nivel minimo: mid. Frecuencia: media.
     Fuente: patron habitual de pregunta de incidentes en entrevistas fullstack/DevOps (conocimiento consolidado sobre practicas de respuesta a incidentes), verificado 2026-09-14.
     Que aprueba (mid/senior): prioriza restaurar el servicio ANTES de investigar la causa raíz (revertir al despliegue anterior conocido-bueno, o apagar el feature flag de lo nuevo) en vez de intentar "arreglarlo hacia adelante" bajo presión; solo después, con el sistema estable, investiga causa raíz con logs/métricas del incidente.

107. **ES:** ¿Qué información pondrías en un log de una petición HTTP para que sea útil en una investigación, sin filtrar datos sensibles?
     **EN:** What information would you put in an HTTP request log to make it useful for investigation, without leaking sensitive data?
     Tipo: razonamiento. Nivel minimo: mid. Frecuencia: media.
     Fuente: goldbergyoni/nodebestpractices, seccion de logging, https://github.com/goldbergyoni/nodebestpractices, verificado 2026-09-14.
     Que aprueba (mid/senior): incluye un request id/trace id para correlacionar logs del mismo request entre servicios, método, ruta, código de estado, latencia, user id (no email/nombre si no hace falta); explícitamente excluye contraseñas, tokens, tarjetas y otros datos sensibles del log (o los enmascara), porque los logs suelen tener retención larga y menos control de acceso que la base de datos principal.

108. **ES:** ¿Qué opciones básicas de despliegue en cloud conoces para una app Next.js + API Node + Postgres (Vercel, un VPS con Docker, un PaaS)? ¿Qué trade-offs tiene cada una?
     **EN:** What basic cloud deployment options do you know for a Next.js + Node API + Postgres app (Vercel, a VPS with Docker, a PaaS)? What are the trade-offs of each?
     Tipo: razonamiento. Nivel minimo: mid. Frecuencia: media.
     Fuente: patron habitual de pregunta de despliegue en entrevistas fullstack (conocimiento consolidado, contrastado con documentacion oficial de despliegue de Next.js en Vercel), verificado 2026-09-14.
     Que aprueba (mid/senior): Vercel (o similar) minimiza la operación para el caso de uso para el que Next.js está optimizado, a cambio de menos control y coste que puede crecer con el tráfico; un VPS con Docker da control total (y coste más predecible) pero tú gestionas parches, escalado, backups; un PaaS (Railway, Render, Fly.io) queda en un punto intermedio; menciona que la base de datos (Postgres/Supabase) suele desplegarse por separado del compute de la app.

109. **ES:** ¿Qué son las health checks y por qué un balanceador de carga o un orquestador las necesita para no enviar tráfico a una instancia rota?
     **EN:** What are health checks, and why does a load balancer or orchestrator need them to avoid sending traffic to a broken instance?
     Tipo: definicion. Nivel minimo: mid. Frecuencia: baja.
     Fuente: patron estandar de conceptos de infraestructura basica (conocimiento consolidado sobre practicas de orquestacion de contenedores), verificado 2026-09-14.
     Que aprueba (mid/senior): un endpoint (`/health` o similar) que responde rápido si el proceso está vivo y puede atender tráfico (a veces distinguiendo "liveness" de "readiness": vivo pero no listo si aún no terminó de conectar a la DB); el orquestador lo consulta periódicamente y saca de rotación (o reinicia) instancias que fallan el check, evitando servir errores a usuarios reales.

110. **ES (comportamental):** Cuéntame de un incidente en producción que gestionaste (o en el que participaste). ¿Cómo se comunicó el estado mientras se resolvía?
     **EN (behavioral):** Tell me about a production incident you managed (or took part in). How was status communicated while it was being resolved?
     Tipo: comportamental. Nivel minimo: mid. Frecuencia: media.
     Fuente: patron habitual de pregunta comportamental de incidentes (Glassdoor, busqueda generica "full stack developer" interview questions) https://www.glassdoor.com/Interview/full-stack-developer-interview-questions-SRCH_KO0,20_SDRD.htm, "(resumen de busqueda, no leido el detalle)", verificado 2026-09-14.
     Que aprueba (mid/senior): describe el proceso real (quién decidía, cómo se avisó a stakeholders/usuarios, cuándo se declaró resuelto) y no solo el fix técnico; menciona un post-mortem sin buscar culpables (blameless) centrado en qué falló en el sistema/proceso, con acciones concretas de seguimiento.

### B.8 Razonamiento con datos reales

111. **ES:** Tienes que mostrar un listado de 1.000.000 de filas en el panel de admin sin que la base de datos ni el navegador sufran. Explica tu solución de extremo a extremo.
     **EN:** You need to show a listing of 1,000,000 rows in the admin panel without straining the database or the browser. Explain your end-to-end solution.
     Tipo: razonamiento. Nivel minimo: mid. Frecuencia: alta.
     Fuente: sintesis de las fuentes de paginacion citadas en B.5 (blog.sequinstream.com/keyset-cursors-not-offsets-for-postgres-pagination, stacksync.com/blog/keyset-cursors-postgres-pagination-fast-accurate-scalable), verificado 2026-09-14.
     Que aprueba (mid/senior): en el backend, paginación por keyset/cursor con índice compuesto (nunca traer el millón de filas ni hacer `OFFSET` grande); en el frontend, renderizar solo una página a la vez (o virtualización si hace falta scroll continuo) en vez de montar 1.000.000 de nodos DOM; si hace falta "ver el total", cuenta aproximada (cache o estimación) en vez de un `COUNT(*)` exacto costoso en cada request.

112. **ES:** Un usuario necesita subir un vídeo de 3GB desde el navegador. Diseña el flujo completo (frontend, backend, almacenamiento) para que no falle por timeout ni sature tu servidor.
     **EN:** A user needs to upload a 3GB video from the browser. Design the full flow (frontend, backend, storage) so it doesn't fail on timeout or overload your server.
     Tipo: razonamiento. Nivel minimo: senior. Frecuencia: media.
     Fuente: sintesis de guias de subida multipart con presigned URLs (dev.to/traindex/multipart-upload-for-large-files-using-pre-signed-urls-aws-4hg4, codewithmukesh.com/blog/upload-large-files-aspnet-core-s3-multipart-presigned-urls), verificado 2026-09-14.
     Que aprueba (mid/senior): el archivo NO pasa por tu servidor Node (evita saturar memoria/ancho de banda del backend); el backend solo genera URLs pre-firmadas hacia el almacenamiento de objetos (S3 o equivalente) por cada parte del multipart upload; el cliente sube los chunks directo al storage en paralelo con reintento por parte; el backend confirma la subida completa (uniendo las partes) y solo entonces guarda la referencia en la base de datos; menciona expiración corta de las URLs firmadas por seguridad.

113. **ES:** Diseña la búsqueda con autocompletado de un buscador de productos: qué pasa en cada tecla que pulsa el usuario, del frontend al backend.
     **EN:** Design the search-with-autocomplete for a product search: what happens on every keystroke, from frontend to backend.
     Tipo: razonamiento. Nivel minimo: mid. Frecuencia: alta.
     Fuente: GreatFrontEnd, "Autocomplete | Front End System Design Question" (resumen de busqueda, no leido en detalle, contenido parcialmente de pago) https://www.greatfrontend.com/questions/system-design/autocomplete, verificado 2026-09-14.
     Que aprueba (mid/senior): debounce de ~200-300ms en el input para no disparar una petición por tecla; cancela peticiones en vuelo obsoletas (o ignora respuestas que llegan fuera de orden) para que una respuesta lenta de una búsqueda vieja no pise a la más reciente (race condition); cache local de resultados ya vistos; en el backend, un índice preparado para prefijos (o un motor de búsqueda dedicado tipo Postgres `pg_trgm`/Elasticsearch/Meilisearch según escala) en vez de `LIKE '%texto%'` sobre una tabla grande sin índice.

114. **ES:** Un formulario de checkout permite hacer doble clic en "Pagar" por accidente (o el usuario reintenta tras un timeout de red). ¿Cómo evitas cobrar dos veces?
     **EN:** A checkout form lets users accidentally double-click "Pay" (or a user retries after a network timeout). How do you avoid charging twice?
     Tipo: razonamiento. Nivel minimo: mid. Frecuencia: alta.
     Fuente: mismo patron de idempotencia citado en B.6 (zuplo.com/learning-center/implementing-idempotency-keys-in-rest-apis-a-complete-guide), verificado 2026-09-14.
     Que aprueba (mid/senior): en frontend, deshabilita el botón tras el primer clic (defensa de UX, no de seguridad real); la protección real es una `Idempotency-Key` generada por el cliente y enviada al backend, que la guarda junto al resultado del primer intento y responde igual ante reintentos con la misma key sin volver a cobrar; menciona que confiar solo en deshabilitar el botón falla si el usuario recarga la página y reenvía el formulario.

115. **ES:** Tu feed necesita mostrar "5 nuevos posts" en tiempo real sin que el usuario recargue. ¿WebSockets, Server-Sent Events o polling? Justifica.
     **EN:** Your feed needs to show "5 new posts" in real time without the user reloading. WebSockets, Server-Sent Events, or polling? Justify.
     Tipo: razonamiento. Nivel minimo: senior. Frecuencia: media.
     Fuente: conocimiento consolidado sobre comparativa de mecanismos de tiempo real (contrastado con discusion recurrente en guias de diseño de chat/feed ya citadas en B.6), verificado 2026-09-14.
     Que aprueba (mid/senior): para un caso unidireccional simple (servidor a cliente, notificaciones tipo "hay contenido nuevo") SSE es más simple que WebSockets (reconexión automática nativa, funciona sobre HTTP normal) y evita el coste de mantener sockets bidireccionales que no se necesitan; WebSockets se justifican si además el cliente necesita enviar datos en tiempo real (chat, colaboración); polling (cada N segundos) es la opción más simple y a veces suficiente si la "tiempo real" no es crítica, a costa de latencia y carga innecesaria en el servidor.

116. **ES:** Tienes que exportar un reporte de 200.000 filas a CSV desde un botón de la interfaz. ¿Lo generas síncronamente en el request o de otra forma? Explica.
     **EN:** You need to export a 200,000-row report to CSV from a button in the UI. Do you generate it synchronously in the request, or some other way? Explain.
     Tipo: razonamiento. Nivel minimo: mid. Frecuencia: media.
     Fuente: patron habitual de pregunta de diseño de features en entrevistas fullstack (sintesis propia basada en patrones de streams de Node ya citados en B.4, goldbergyoni/nodebestpractices), verificado 2026-09-14.
     Que aprueba (mid/senior): para volúmenes grandes, generar el CSV de forma asíncrona (cola de trabajo) y avisar al usuario cuando esté listo (o hacer streaming de la respuesta con backpressure en vez de construir el CSV entero en memoria); nunca bloquear el request-response del servidor web principal con un trabajo que puede tardar minutos, porque satura el pool de conexiones/hilos disponibles para otras peticiones.

117. **ES:** Un cliente pide "que la web cargue instantánea" en un catálogo de productos con imágenes pesadas. Prioriza 3 acciones concretas y explica el porqué de ese orden.
     **EN:** A client asks for "instant loading" on a product catalog with heavy images. Prioritize 3 concrete actions and explain why in that order.
     Tipo: razonamiento. Nivel minimo: mid. Frecuencia: media.
     Fuente: sintesis de guias de Core Web Vitals 2026 ya citadas en B.3 (corewebvitals.io/core-web-vitals, w3era.com/blog/seo/core-web-vitals-guide), verificado 2026-09-14.
     Que aprueba (mid/senior): prioriza por impacto medible (LCP suele ser la imagen principal: optimizar formato/tamaño/`next/image` primero), luego lo que bloquea interactividad (código JS innecesario en el critical path), luego CLS (reservar espacio de imágenes); rechaza "optimizar a ciegas" sin medir antes con datos reales de campo (CrUX/RUM), no solo un test de laboratorio.

118. **ES:** Diseña cómo evitarías que dos usuarios reserven el mismo asiento de un evento al mismo tiempo (condición de carrera).
     **EN:** Design how you'd prevent two users from booking the same event seat at the same time (race condition).
     Tipo: razonamiento. Nivel minimo: senior. Frecuencia: media.
     Fuente: patron recurrente en preguntas de sistemas con inventario limitado (Hello Interview, listado de problemas reales de la comunidad, categoria SYSTEM_DESIGN) https://www.hellointerview.com/community/questions?type=SYSTEM_DESIGN, "(resumen de busqueda, no leido el detalle, requiere cuenta)", verificado 2026-09-14.
     Que aprueba (mid/senior): usa una transacción de base de datos con un bloqueo optimista (columna de versión) o pesimista (`SELECT ... FOR UPDATE`) sobre la fila del asiento al confirmar la reserva; explica el trade-off (pesimista es más simple de razonar pero reduce concurrencia; optimista escala mejor pero exige manejar el conflicto y reintentar); menciona un TTL de "reserva temporal" (hold) mientras el usuario completa el pago, para no bloquear el asiento indefinidamente si abandona el checkout.

119. **ES:** Un cron job que se ejecuta cada minuto empieza a solaparse consigo mismo cuando el trabajo tarda más de un minuto. ¿Cómo lo evitas a nivel de diseño?
     **EN:** A cron job that runs every minute starts overlapping with itself when the job takes longer than a minute. How do you prevent this at the design level?
     Tipo: razonamiento. Nivel minimo: mid. Frecuencia: baja.
     Fuente: patron habitual de trampa operativa en backend (goldbergyoni/nodebestpractices, seccion de patrones de produccion y tareas en background), https://github.com/goldbergyoni/nodebestpractices, verificado 2026-09-14.
     Que aprueba (mid/senior): usa un lock distribuido (una fila en la base de datos o una clave en Redis con expiración) que el job adquiere al empezar y libera al terminar, de forma que una segunda ejecución que arranca mientras la primera sigue viva se salta ese ciclo; menciona que el lock necesita un TTL de seguridad por si el proceso muere sin liberarlo, para no dejar el sistema bloqueado para siempre.

120. **ES:** Una migración de esquema necesita añadir una columna `NOT NULL` a una tabla de 10 millones de filas en producción sin downtime. ¿Cómo lo harías?
     **EN:** A schema migration needs to add a `NOT NULL` column to a 10-million-row table in production without downtime. How would you do it?
     Tipo: kata. Nivel minimo: senior. Frecuencia: baja.
     Fuente: patron habitual de trampa de migraciones a escala (conocimiento consolidado sobre practicas de "zero-downtime migrations" en Postgres, contrastado con documentacion de Prisma Migrate sobre migraciones expansivas/contractivas), verificado 2026-09-14.
     Que aprueba (mid/senior): añadir `NOT NULL` directamente bloquea la tabla mientras Postgres valida cada fila existente; en su lugar, añade la columna como nullable con un valor por defecto, rellena los datos existentes en lotes pequeños (batches) para no bloquear ni saturar el WAL, y solo al final añade el constraint `NOT NULL` (en versiones recientes de Postgres esto puede validarse sin bloqueo largo si ya existe un `CHECK` previamente validado); despliega el código que empieza a escribir la columna ANTES del backfill, en pasos separados.

121. **ES:** El equipo debate si usar TypeScript en modo `strict` desde el inicio de un proyecto nuevo o activarlo progresivamente. ¿Qué recomendarías y por qué?
     **EN:** The team debates whether to use TypeScript `strict` mode from the start of a new project or enable it progressively. What would you recommend and why?
     Tipo: razonamiento. Nivel minimo: mid. Frecuencia: baja.
     Fuente: patron recurrente en discusiones de configuracion inicial de proyectos TypeScript (conocimiento consolidado sobre la documentacion oficial de TypeScript acerca de `strict` y sus sub-flags), verificado 2026-09-14.
     Que aprueba (mid/senior): en un proyecto NUEVO, activar `strict` desde el día 1 es casi siempre correcto porque el coste de retrofit crece con el tamaño del código; en un proyecto EXISTENTE sin `strict`, activarlo progresivamente flag por flag (`noImplicitAny`, `strictNullChecks`, etc.) o con `// @ts-expect-error` acotado es más realista que un big-bang que bloquea el equipo semanas.

---

## C) Ocho ejercicios practicos reales de entrevista fullstack

Formato: enunciado, fuente/inspiracion, criterios de correccion. Todos son ejercicios
de "kata" tipicos de entrevista tecnica (live coding o take-home), reconstruidos a
partir de patrones documentados en las fuentes citadas, no copiados literalmente de
ningun test propietario.

### C.1 Componente React: buscador con autocompletado y cancelacion de peticiones

**Enunciado:** Implementa un componente `<ProductSearch />` con un input de texto
que, mientras el usuario escribe, consulte `GET /api/products?q=...` y muestre hasta
10 resultados en una lista. Requisitos: (1) no dispares una peticion por cada tecla,
usa debounce de 300ms; (2) si el usuario escribe rapido y hay varias peticiones en
vuelo, ignora las respuestas que ya no correspondan al ultimo texto escrito (evita
la condicion de carrera); (3) muestra un estado de carga y un estado de "sin
resultados"; (4) el componente debe ser accesible por teclado (flechas para navegar
la lista, Enter para seleccionar).

Fuente/inspiracion: patron "autocomplete" citado como la pregunta de diseño frontend
mas comun en entrevistas de nivel senior segun GreatFrontEnd (resumen de busqueda,
no leido en detalle) https://www.greatfrontend.com/questions/system-design/autocomplete,
verificado 2026-09-14.

Criterios de correccion:
- Usa debounce real (con `useEffect` + `setTimeout`/`clearTimeout`, o un hook
  `useDebouncedValue`), no solo un comentario diciendo que "se podria debounciar".
- Resuelve la condicion de carrera (con un flag de "peticion vigente", `AbortController`,
  o comparando el texto de la respuesta contra el texto actual del input antes de
  pintar resultados).
- Limpia el `useEffect` (cancela el timeout/la peticion) al desmontar o al cambiar
  el texto, para no dejar timers colgando.
- Maneja los 3 estados de UI (cargando, con resultados, sin resultados) sin parpadeos
  raros entre ellos.
- Bonus evaluado en senior: accesibilidad de teclado y `aria-live` para anunciar
  resultados a lectores de pantalla.

### C.2 API con validacion: endpoint de registro de usuario

**Enunciado:** Implementa `POST /api/users` en Express o Fastify que reciba
`{ email, password, name }`, valide el input con una libreria de esquemas (Zod o
equivalente), hashee la contraseña antes de guardarla, y devuelva 201 con el usuario
creado (sin la contraseña) o 400 con un error por campo si la validacion falla.
Debe rechazar emails duplicados con 409.

Fuente/inspiracion: patron estandar de "diseña el contrato de una API" citado en
goldbergyoni/nodebestpractices, seccion de validacion de input,
https://github.com/goldbergyoni/nodebestpractices, verificado 2026-09-14.

Criterios de correccion:
- La validacion ocurre en el servidor (no confia solo en que el frontend ya valido).
- La contraseña nunca se guarda en texto plano ni se devuelve en la respuesta.
- El error de validacion identifica QUE campo fallo y por que, no un mensaje generico.
- Maneja el caso de email duplicado con el codigo HTTP correcto (409, no 500 por
  una excepcion de constraint de base de datos sin capturar).
- Bonus: rate limiting basico en el endpoint para evitar registro masivo automatizado.

### C.3 Consulta SQL: top 5 clientes por gasto en los ultimos 30 dias, con datos faltantes

**Enunciado:** Dadas las tablas `customers(id, name)`, `orders(id, customer_id,
created_at, status)` y `order_items(id, order_id, product_id, quantity, unit_price)`,
escribe una consulta que devuelva los 5 clientes que mas han gastado en pedidos con
`status = 'completed'` en los ultimos 30 dias, incluyendo clientes con gasto 0 si no
tienen pedidos en ese periodo (deben aparecer con 0, no desaparecer del reporte si el
listado exige "todos los clientes VIP").

Fuente/inspiracion: patron recurrente de ejercicio de agregacion + JOIN en bancos SQL
(jaimin-bariya/Awesome-SQL-Interview, sanketrs/sql-interview-preparation-questions-with-answers),
https://github.com/jaimin-bariya/Awesome-SQL-Interview, verificado 2026-09-14.

Criterios de correccion:
- Usa `LEFT JOIN` desde `customers` (no `INNER JOIN`) para no perder clientes sin
  pedidos en el periodo.
- Filtra la fecha y el estado en la condicion del `JOIN` o en el `WHERE` de forma
  que no convierta accidentalmente el `LEFT JOIN` en un `INNER JOIN` (error clasico:
  poner el filtro de fecha en `WHERE` sin `OR fecha IS NULL` elimina las filas sin
  match).
- Calcula el gasto como `SUM(quantity * unit_price)`, con `COALESCE(..., 0)` para
  los clientes sin pedidos.
- Usa `GROUP BY` correctamente (todas las columnas no agregadas del `SELECT`) y
  `ORDER BY ... DESC LIMIT 5`.
- Bonus: explica que indice ayudaria a esta query en una tabla `orders` grande
  (compuesto sobre `customer_id, created_at` o `created_at, status`).

### C.4 Kata de JavaScript/TypeScript: normalizar y agrupar datos anidados

**Enunciado:** Dado un array de pedidos con la forma
`{ id, customerId, items: [{ productId, qty, price }] }`, escribe una funcion
`groupSpendByCustomer(orders)` que devuelva un `Map<customerId, number>` con el gasto
total por cliente, sin usar librerias externas. Debe ser tipada en TypeScript.

Fuente/inspiracion: patron recurrente de kata de manipulacion de arrays/objetos en
entrevistas fullstack (tipo de ejercicio citado en sudheerj/javascript-interview-questions
y equivalentes), verificado 2026-09-14 con conocimiento consolidado del patron.

Criterios de correccion:
- Tipado correcto de entrada y salida (interfaces/types explicitos, no `any`).
- Usa `reduce` (o un bucle claro) sin mutar el array de entrada.
- Maneja el caso de `items` vacio o `orders` vacio sin lanzar excepcion.
- Complejidad O(n), no anidar bucles innecesariamente para calcular el total.
- Bonus: version que ademas devuelva el producto mas comprado por cada cliente.

### C.5 Revision de esquema y consulta con Prisma: relacion uno a muchos y N+1

**Enunciado:** Tienes el modelo Prisma `User { id, posts Post[] }` y
`Post { id, title, authorId, author User }`. Escribe el endpoint que devuelve los
ultimos 20 posts con el nombre de su autor, evitando el problema N+1, y anade un
indice donde haga falta para que la consulta por `authorId` sea rapida.

Fuente/inspiracion: patron N+1 documentado en la documentacion oficial de Prisma
sobre optimizacion de queries, https://www.prisma.io/docs/orm/prisma-client/queries/advanced/query-optimization-performance,
verificado 2026-09-14 (resumen de busqueda, contrastado con multiples fuentes).

Criterios de correccion:
- Usa `include`/`select` en una sola llamada a `findMany`, no un `map` con una
  consulta por post dentro.
- Ordena por fecha de creacion descendente y limita a 20 (`take: 20`).
- Anade `@@index([authorId])` (o equivalente) en el modelo `Post` si no existe ya.
- Bonus: activa el logging de queries de Prisma en desarrollo y explica como se
  veria en el log si SI hubiera N+1 (docenas de `SELECT` identicos).

### C.6 Diseño de API con paginacion y filtros para un listado grande

**Enunciado:** Diseña (rutas, parametros de query, forma de la respuesta JSON) el
endpoint `GET /api/orders` para un panel de administracion con potencialmente
millones de filas, que soporte paginacion, filtro por estado y por rango de fechas,
y ordenacion. No hace falta implementar el SQL completo, pero si el contrato de la
API y la estrategia de paginacion.

Fuente/inspiracion: patron de "diseña una API de listado a escala" citado en Hello
Interview, "API Design for System Design Interviews" (resumen de busqueda, no leido
en detalle) https://www.hellointerview.com/learn/system-design/core-concepts/api-design,
combinado con la comparativa keyset vs offset ya citada en B.5, verificado 2026-09-14.

Criterios de correccion:
- Paginacion por cursor/keyset (no `page`/`offset` puro) para que sea eficiente a
  escala; el cursor debe ser opaco (codificado) o al menos autoexplicado sin exponer
  detalles internos innecesarios.
- Filtros y ordenacion expresados como parametros de query claros y validados
  (rechaza valores no permitidos en vez de pasarlos crudos a la query).
- La respuesta incluye el cursor de la siguiente pagina, no solo los datos.
- Explica por que NO se ofrece "saltar a la pagina 5000" con este esquema (limitacion
  aceptada y comunicada, no oculta).

### C.7 Server Action de Next.js con revalidacion y manejo de errores

**Enunciado:** Implementa una Server Action `updateProfileName(formData)` en el App
Router de Next.js que actualice el nombre de un usuario autenticado en la base de
datos, revalide la cache para que el usuario vea su nombre nuevo de inmediato, y
devuelva un error legible si el nombre esta vacio o el usuario no esta autenticado.

Fuente/inspiracion: patron de Server Actions y las APIs de cache nuevas de Next.js 16
(`updateTag`, semantica read-your-writes), https://nextjs.org/blog/next-16, seccion
"Improved Caching APIs", verificado 2026-09-14 via WebFetch.

Criterios de correccion:
- Verifica la sesion/autenticacion DENTRO de la Server Action (no confia solo en que
  la UI que la llama esta protegida), porque la Server Action es invocable
  directamente.
- Valida `formData` (nombre no vacio, longitud razonable) antes de tocar la base de
  datos.
- Usa `updateTag()` (o `revalidatePath`/`revalidateTag` segun la version del
  proyecto) para que el usuario vea su cambio reflejado de inmediato, no una version
  cacheada vieja.
- Devuelve un objeto de error serializable (no lanza una excepcion cruda que rompa
  la UI) para que el formulario pueda mostrar el mensaje.

### C.8 Diseño fullstack corto: rate limiting de un endpoint publico

**Enunciado:** Implementa un middleware Express/Fastify de rate limiting para el
endpoint publico `POST /api/contact` que permita como maximo 5 peticiones por IP
cada 10 minutos, usando Redis como almacen compartido (para que funcione con varias
instancias del servidor). Debe devolver 429 con cabecera `Retry-After` cuando se
supera el limite.

Fuente/inspiracion: patron de rate limiting con Redis citado en guias de sistemas
agregadas (intervu.dev/blog/rate-limiter-system-design, resumen de busqueda),
verificado 2026-09-14.

Criterios de correccion:
- El contador vive en Redis (no en memoria del proceso), para que funcione igual
  con 1 o con 10 instancias del servidor detras de un balanceador.
- La operacion de incrementar y comprobar el limite es atomica (evita condicion de
  carrera entre "leer contador" y "escribir contador", idealmente con un script Lua
  o `INCR` + `EXPIRE` bien secuenciados).
- Responde 429 con `Retry-After` calculado, no un numero fijo inventado.
- Bonus: distingue limitar por IP de limitar por usuario autenticado, y explica por
  que limitar solo por IP falla si varios usuarios comparten IP (NAT/oficina).

---

## D) Cinco ejercicios de revision de codigo

Fragmentos de 20 a 40 lineas escritos para esta investigacion, cada uno con 2 a 4
problemas plantados a partir de errores tipicos documentados en las fuentes citadas
mas arriba (no son copia de ningun ejercicio propietario). Cada fragmento indica la
fuente del error tipico en la explicacion.

### D.1 React: lista de usuarios con busqueda (bug + rendimiento + accesibilidad)

```tsx
function UserList({ users }) {
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState(users);

  useEffect(() => {
    setFiltered(users.filter(u => u.name.includes(query)));
  }, [query]);

  return (
    <div>
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      <ul>
        {filtered.map((user, index) => (
          <li key={index} onClick={() => console.log('selected', user.id)}>
            <img src={user.avatarUrl} onLoad={() => trackImageLoad(user.id)} />
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

Problemas plantados:
1. **Bug (stale closure / dependencia incompleta):** el `useEffect` depende de
   `query` pero usa `users` sin declararlo como dependencia; si `users` cambia
   (llega una prop nueva desde el padre) sin que `query` cambie, `filtered` se
   queda con la lista vieja. Fuente del error tipico: patron de dependencias
   incompletas en `useEffect` documentado en sudheerj/reactjs-interview-questions,
   seccion Hooks (https://github.com/sudheerj/reactjs-interview-questions).
2. **Rendimiento (key = index):** usar `index` como `key` en una lista que se
   FILTRA dinamicamente hace que React reutilice mal el estado/DOM de cada `<li>`
   al cambiar el filtro (dos busquedas distintas pueden compartir posicion pero no
   el mismo usuario). Fuente del error tipico: seccion "Keys" de
   sudheerj/reactjs-interview-questions (https://github.com/sudheerj/reactjs-interview-questions).
3. **Diseño/rendimiento (funcion inline + logica derivada en estado):** `filtered`
   no necesitaria ser estado ni un efecto; es un valor DERIVADO de `users` y
   `query`, mejor calculado directamente en el render (o con `useMemo` si el
   filtro es costoso) en vez de sincronizarlo manualmente con un efecto, lo que
   añade un render extra y una fuente de bugs de sincronizacion.
4. **Accesibilidad:** el `<li onClick>` no es focuseable ni operable por teclado
   (no responde a Enter/Espacio, no tiene rol de lista de opciones interactiva);
   un lector de pantalla no anuncia que es seleccionable.

### D.2 Node/Express: endpoint de login (seguridad x3)

```js
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const query = `SELECT * FROM users WHERE email = '${email}'`;
  const result = await db.query(query);
  const user = result.rows[0];

  console.log(`Login attempt: ${email} / ${password}`);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  if (user.password === password) {
    const token = jwt.sign({ id: user.id, email: user.email }, 'secret123');
    res.json({ token, user });
  } else {
    res.status(401).json({ error: 'Wrong password' });
  }
});
```

Problemas plantados:
1. **Seguridad (inyeccion SQL):** el email se interpola directamente en el string
   de la query en vez de usar un parametro (`$1`) o el ORM; un email como
   `' OR '1'='1` compromete la consulta. Fuente del error tipico: categoria de
   inyeccion del OWASP Top 10:2025 (https://owasp.org/Top10/2025/).
2. **Seguridad (contraseña en texto plano):** compara `user.password === password`
   directamente, lo que implica que la contraseña esta guardada SIN hashear en la
   base de datos; ademas la loguea en texto plano en `console.log`, quedando en
   los logs del sistema. Fuente del error tipico: mala practica de manejo de
   secretos documentada en goldbergyoni/nodebestpractices
   (https://github.com/goldbergyoni/nodebestpractices).
3. **Seguridad (secreto JWT hardcodeado):** `'secret123'` esta escrito directamente
   en el codigo fuente en vez de leerse de una variable de entorno/gestor de
   secretos; cualquiera con acceso al repo puede firmar tokens validos. Fuente del
   error tipico: seccion de configuracion/secretos de goldbergyoni/nodebestpractices.
4. **Diseño (filtracion de informacion / respuesta completa del usuario):**
   devuelve `user` completo (incluyendo el hash o contraseña) en la respuesta de
   exito, y distingue "usuario no existe" (404) de "contraseña incorrecta" (401),
   lo que permite a un atacante enumerar que emails estan registrados probando uno
   a uno.

### D.3 SQL: reporte de gasto por cliente (LEFT JOIN roto + indice + SELECT *)

```sql
SELECT
  c.*,
  SUM(oi.quantity * oi.unit_price) AS total_spent
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id
LEFT JOIN order_items oi ON oi.order_id = o.id
WHERE o.created_at >= NOW() - INTERVAL '30 days'
  AND o.status = 'completed'
GROUP BY c.id
ORDER BY total_spent DESC
LIMIT 5;
```

Problemas plantados:
1. **Bug de diseño (LEFT JOIN convertido en INNER JOIN):** el filtro
   `WHERE o.created_at >= ...` sobre una columna de la tabla del lado derecho del
   `LEFT JOIN` descarta las filas donde `o` es `NULL` (clientes sin pedidos),
   anulando el proposito de usar `LEFT JOIN`; el filtro deberia ir en la condicion
   del `ON`, no en el `WHERE`. Fuente del error tipico: patron muy citado en
   bancos de preguntas SQL sobre JOIN (jaimin-bariya/Awesome-SQL-Interview,
   https://github.com/jaimin-bariya/Awesome-SQL-Interview).
2. **Rendimiento (falta de indice compuesto):** filtrar y ordenar por
   `orders.created_at`/`status` sin un indice compuesto que cubra ambas columnas
   obliga a un escaneo completo en una tabla grande; fuente del error tipico:
   patron de "cuando un indice falta o esta mal elegido" citado en B.5 (pregunta
   76), sanketrs/sql-interview-preparation-questions-with-answers.
3. **Diseño (SELECT \*):** traer todas las columnas de `customers` cuando el
   reporte probablemente solo necesita `id` y `name` desperdicia ancho de banda y
   acopla el reporte a cualquier columna nueva que se añada a la tabla en el
   futuro (incluyendo columnas sensibles que nadie queria exponer).

### D.4 React: contador con auto-guardado (fuga de memoria + XSS + condicion de carrera)

```tsx
function AutoSaveNote({ noteId, initialHtml }) {
  const [html, setHtml] = useState(initialHtml);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`/api/notes/${noteId}`, {
        method: 'PUT',
        body: JSON.stringify({ html }),
      });
    }, 5000);
  }, [noteId]);

  return (
    <div>
      <textarea value={html} onChange={e => setHtml(e.target.value)} />
      <div
        className="preview"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
```

Problemas plantados:
1. **Bug (fuga de memoria / stale closure):** el `useEffect` crea un
   `setInterval` pero nunca devuelve una funcion de limpieza (`clearInterval`), asi
   que al desmontar el componente el intervalo sigue vivo; ademas la closure del
   intervalo captura el `html` del momento en que se creo el efecto (que solo se
   recrea si cambia `noteId`), asi que guarda siempre el texto ANTIGUO, no el
   actual. Fuente del error tipico: manejo de cleanup en `useEffect`,
   sudheerj/reactjs-interview-questions, seccion Hooks
   (https://github.com/sudheerj/reactjs-interview-questions).
2. **Seguridad (XSS):** `dangerouslySetInnerHTML` renderiza el HTML que el propio
   usuario escribio (o que pego de otro sitio) sin pasar por ningun sanitizador
   (DOMPurify u otro); si otro usuario ve esa nota (o el mismo la reabre tras un
   ataque de pegado malicioso), cualquier `<script>` o `onerror=` incrustado se
   ejecuta. Fuente del error tipico: guia de XSS y uso de
   `dangerouslySetInnerHTML` mapeada en categorias de inyeccion del OWASP Top
   10:2025 (https://owasp.org/Top10/2025/).
3. **Rendimiento/diseño (guardado sin control de fallos ni de peticiones en
   vuelo):** el `fetch` de auto-guardado no maneja el error de red ni evita que
   dos guardados se pisen si uno tarda mas que el intervalo de 5 segundos (no hay
   `AbortController` ni cola); si el usuario pierde conexion un momento, el
   cambio se pierde en silencio sin avisar.

### D.5 Node + Prisma: cerrar un pedido y notificar (N+1 + falta de transaccion + promesa sin manejar)

```js
async function closeOrder(orderId) {
  const order = await prisma.order.findUnique({ where: { id: orderId } });
  order.status = 'closed';
  await prisma.order.update({
    where: { id: orderId },
    data: { status: 'closed' },
  });

  const items = await prisma.orderItem.findMany({ where: { orderId } });
  for (const item of items) {
    const product = await prisma.product.findUnique({ where: { id: item.productId } });
    await prisma.product.update({
      where: { id: item.productId },
      data: { stock: product.stock - item.quantity },
    });
  }

  sendOrderClosedEmail(order.customerEmail);

  return order;
}
```

Problemas plantados:
1. **Rendimiento (N+1):** dentro del `for` se hace un `findUnique` y un `update`
   por cada `item`, en vez de traer todos los productos de una vez y/o agrupar la
   actualizacion; con un pedido de 50 items son ~100 queries en vez de 2-3. Fuente
   del error tipico: problema N+1 documentado en la propia documentacion de
   Prisma sobre optimizacion de queries
   (https://www.prisma.io/docs/orm/prisma-client/queries/advanced/query-optimization-performance).
2. **Bug/diseño (falta de transaccion, riesgo de inconsistencia):** actualizar el
   estado del pedido y descontar el stock de cada producto son operaciones que
   deberian ser atomicas (todo o nada); tal como esta escrito, si falla a mitad
   (por ejemplo el update del producto 3 de 5), el pedido ya quedo marcado
   "closed" pero el stock de los ultimos productos nunca se descuenta, dejando
   datos inconsistentes. Fuente del error tipico: concepto de transacciones/ACID
   citado en B.5 (pregunta 78), patron estandar de bancos SQL
   (kansiris/SQL-interview-questions).
3. **Bug (condicion de carrera en el descuento de stock):** `product.stock -
   item.quantity` lee el stock, calcula en la aplicacion y escribe de vuelta; si
   dos pedidos para el mismo producto se cierran casi a la vez, ambos pueden leer
   el mismo stock inicial y la segunda escritura pisa a la primera (se pierde un
   descuento); deberia usarse una operacion atomica del lado de la base de datos
   (`decrement`) o un bloqueo.
4. **Bug (promesa sin manejar / error silencioso):** `sendOrderClosedEmail(...)`
   se llama sin `await` ni `.catch`; si falla, la excepcion se convierte en un
   "unhandled promise rejection" que no se reporta en el flujo normal, y ademas
   el fallo del email no deberia tumbar el cierre del pedido si ya se decide
   separarlo, pero aqui simplemente se ignora sin loguearlo.

---

## E) Incertidumbres

- **Reddit no fue accesible directamente.** WebFetch rechazo explicitamente
  `www.reddit.com` ("Claude Code is unable to fetch from www.reddit.com") y las
  busquedas con `site:reddit.com` en r/reactjs, r/nextjs, r/webdev, r/ExperiencedDevs
  y r/devsarg no devolvieron contenido indexado de hilos reales (el buscador
  devolvio articulos de terceros que MENCIONAN Reddit, no los hilos en si). No se
  pudo citar ninguna experiencia de primera mano de Reddit con URL de hilo
  especifico. Esto es una limitacion real de cobertura de la fuente pedida en el
  encargo, no una ausencia de contenido en Reddit (es altamente probable que existan
  hilos relevantes, simplemente no fueron accesibles con las herramientas
  disponibles en esta sesion).
- **Glassdoor devolvio 403 al intentar leer el contenido completo con WebFetch**
  (`https://www.glassdoor.es/Entrevista/espana-senior-react-developer-preguntas-de-entrevista-...`).
  Solo se pudieron citar los RESULTADOS DE BUSQUEDA (titulos de pagina, numero de
  preguntas indicado, empresas mencionadas en el snippet), nunca el texto literal
  de una pregunta reportada por un candidato especifico en una empresa espanola
  concreta. Todas las citas a Glassdoor en este documento estan marcadas
  "(resumen de busqueda, no leido)" por esta razon.
- **GreatFrontEnd y Hello Interview son productos de pago** con partes publicas
  (el Front End Interview Handbook y el Front End System Design Playbook de
  GreatFrontEnd son gratuitos segun sus paginas publicas; la "Real Interview
  Questions Database" de Hello Interview requiere cuenta para ver el detalle
  completo). No se pudo verificar de primera mano el contenido especifico y
  completo de sus preguntas pagas; se cito solo lo visible en resultados de
  busqueda publicos.
- **dev.to, Substack y blogs individuales** citados para temas como paginacion,
  subida de archivos, autocompletado, idempotencia y rate limiting se consultaron
  via resumenes de busqueda (WebSearch), no via lectura completa articulo por
  articulo con WebFetch, salvo excepciones señaladas explicitamente en el texto.
  El contenido tecnico en si (N+1, keyset pagination, multipart upload, token
  bucket) es coincidente entre multiples fuentes independientes, lo que da
  confianza razonable en la exactitud aunque no se leyo cada pagina completa.
- **Licencia exacta de donnemartin/system-design-primer**: GitHub API devuelve
  `NOASSERTION` como `license.spdx_id`; el README del repositorio declara CC BY-SA
  4.0 segun busquedas de terceros, pero no se leyo el README completo linea por
  linea en esta sesion para confirmar el texto exacto de la licencia declarada.
  Tratar como CC BY-SA 4.0 (exige atribucion y compartir igual) es la hipotesis
  mas conservadora y probablemente correcta, pero queda marcada como no
  100% verificada de primera mano.
- **Mapeo exacto de XSS y CSRF dentro de las categorias del OWASP Top 10:2025**
  no se verifico leyendo la taxonomia completa oficial (https://owasp.org/Top10/2025/)
  linea por linea; se uso el resumen agregado de fuentes secundarias (Semgrep,
  Patrowl) que describen los cambios de la edicion 2025 respecto a 2021. Se
  recomienda, antes de publicar el banco en produccion, leer la pagina oficial de
  OWASP completa para confirmar en que categoria exacta caen XSS/CSRF en la
  edicion 2025 (en ediciones anteriores XSS estaba dentro de "Injection" e iba
  perdiendo peso relativo en cada revision).
  - La actualizacion de Core Web Vitals (INP reemplazando a FID como metrica
  oficial de responsividad) se dio por hecho como conocimiento previo del modelo,
  sin re-verificar con una fuente primaria de Google/web.dev en esta sesion
  especifica; los resultados de busqueda de 2026 confirman que INP es hoy una de
  las 3 metricas oficiales, lo cual es consistente, pero la fecha exacta del
  cambio (marzo 2024) no se re-confirmo con fuente primaria en esta pasada.
- **Estrellas y fechas de "ultimo commit"** de los repositorios de GitHub reflejan
  el momento de la consulta (2026-09-14) via la API publica de GitHub; estas
  cifras cambian con el tiempo y deberian re-verificarse antes de cualquier
  actualizacion periodica del banco (el propio proyecto Devsparring ya contempla un
  workflow de refresco cada 3 semanas segun `docs/decisiones.md`).
- **No se encontraron repositorios de GitHub especificos y consolidados para
  "preguntas de entrevista de arquitectura y diseño de sistemas fullstack" en
  español** durante esta investigacion; el contenido de arquitectura/system design
  en este documento se apoyo en fuentes en ingles (donnemartin/system-design-primer,
  guias agregadas de AlgoMaster/DesignGurus/ByteByteGo citadas via resumen de
  busqueda) y se tradujo/adapto al espanol por el investigador, no es traduccion
  literal de ninguna fuente.
- **Los ejercicios de la seccion C y los fragmentos de codigo de la seccion D
  fueron escritos para esta investigacion**, inspirados en patrones de error
  documentados en las fuentes citadas dentro de cada ejercicio; no son copia
  literal de ningun banco de ejercicios propietario, pero tampoco fueron
  "encontrados" como ejercicios reales de una empresa concreta con nombre y
  apellido (el encargo permitia expresamente escribirlos basandose en errores
  tipicos documentados).

---

## F) Fuentes (listado completo)

Todas verificadas el 2026-09-14 salvo que se indique otra fecha. "(RB)" = via
resumen de busqueda (WebSearch), no lectura completa de la pagina con WebFetch.

**Repositorios GitHub (verificados via api.github.com con WebFetch):**
- https://github.com/sudheerj/reactjs-interview-questions
- https://github.com/donnemartin/system-design-primer
- https://github.com/yangshun/front-end-interview-handbook
- https://github.com/alex/what-happens-when
- https://github.com/lydiahallie/javascript-questions
- https://github.com/goldbergyoni/nodebestpractices
- https://github.com/learning-zone/javascript-basics
- https://github.com/learning-zone/nodejs-basics
- https://github.com/Devinterview-io/node-interview-questions
- https://github.com/Devinterview-io/next-interview-questions
- https://github.com/jaimin-bariya/Awesome-SQL-Interview (RB)
- https://github.com/sanketrs/sql-interview-preparation-questions-with-answers (RB)
- https://github.com/kansiris/SQL-interview-questions (RB)

**Documentacion oficial:**
- https://nextjs.org/blog/next-16 (leido completo via WebFetch; publicado
  2025-10-21, autores del equipo Next.js)
- https://owasp.org/Top10/2025/ (existencia y fecha de publicacion confirmada via
  WebSearch; contenido detallado por categoria, RB)
- https://www.prisma.io/docs/orm/prisma-client/queries/advanced/query-optimization-performance (RB)

**Plataformas de preguntas de entrevista (contenido parcialmente de pago, RB):**
- https://www.greatfrontend.com/questions/system-design (RB)
- https://www.greatfrontend.com/questions/system-design/autocomplete (RB)
- https://www.greatfrontend.com/blog/next-js-interview-questions-for-freshers (RB)
- https://www.hellointerview.com/learn/system-design/core-concepts/api-design (RB)
- https://www.hellointerview.com/community/questions?type=SYSTEM_DESIGN (RB)
- https://www.hellointerview.com/learn/system-design/in-a-hurry/problem-breakdowns (RB)

**Glassdoor (solo resultados de busqueda, lectura completa bloqueada con 403):**
- https://www.glassdoor.es/Entrevista/espana-senior-react-developer-preguntas-de-entrevista-SRCH_IL.0,6_KO7,29.htm (RB)
- https://www.glassdoor.es/Entrevista/sr-react-developer-preguntas-de-entrevista-SRCH_KO0,18.htm (RB)
- https://www.glassdoor.com/Interview/full-stack-developer-interview-questions-SRCH_KO0,20_SDRD.htm (RB)
- https://www.glassdoor.com/Interview/full-stack-developer-react-nodejs-interview-questions-SRCH_KO0,33.htm (RB)
- https://www.glassdoor.com/Interview/full-stack-node-js-developer-interview-questions-SRCH_KO0,28.htm (RB)
- https://www.glassdoor.com/Interview/full-stack-developer-mid-interview-questions-SRCH_KO0,24.htm (RB)

**Bancos y guias tecnicas de segundo nivel (RB salvo indicado):**
- https://medium.com/@aayushpagare21/senior-level-next-js-interview-questions-part-1-571b85306b94 (RB)
- https://stackinterview.dev/guides/nextjs-interview-questions-and-answers (RB)
- https://www.interviewbit.com/next-js-interview-questions/ (RB)
- https://blog.sequinstream.com/keyset-cursors-not-offsets-for-postgres-pagination/ (RB)
- https://www.stacksync.com/blog/keyset-cursors-postgres-pagination-fast-accurate-scalable (RB)
- https://dev.to/traindex/multipart-upload-for-large-files-using-pre-signed-urls-aws-4hg4 (RB)
- https://codewithmukesh.com/blog/upload-large-files-aspnet-core-s3-multipart-presigned-urls/ (RB)
- https://vibeappscanner.com/supabase-row-level-security (RB)
- https://securifyai.co/blog/supabase-row-level-security-rls-common-misconfigurations-and-risks/ (RB)
- https://algomaster.io/learn/system-design-interviews/design-url-shortener (RB)
- https://bytebytego.com/courses/system-design-interview/design-a-url-shortener (RB)
- https://engineeringenablement.substack.com/p/how-i-would-design-a-real-time-chat-application (RB)
- https://intervu.dev/blog/rate-limiter-system-design/ (RB)
- https://www.digitalapplied.com/blog/api-rate-limiting-strategies-2026-engineering-reference (RB)
- https://zuplo.com/learning-center/implementing-idempotency-keys-in-rest-apis-a-complete-guide (RB)
- https://x.com/0xlelouch_/status/2063733246412632189 (RB, post publico sobre
  trampas de entrevistas backend)
- https://medium.com/@imranrafeek/zustand-vs-rtk-query-vs-tanstack-query-unpacking-the-react-state-management-toolbox-d47893479742 (RB)
- https://www.corewebvitals.io/core-web-vitals (RB)
- https://www.w3era.com/blog/seo/core-web-vitals-guide/ (RB)
- https://semgrep.dev/blog/2026/owasp-top-10-2025-whats-new/ (RB)
- https://patrowl.io/en/blog/owasp-top-10-2025-what-s-changed-and-the-2026-data (RB)

**No accesibles en esta sesion (ver seccion E, Incertidumbres):**
- www.reddit.com (r/reactjs, r/nextjs, r/webdev, r/ExperiencedDevs, r/devsarg):
  WebFetch rechazado explicitamente por la herramienta; busquedas `site:reddit.com`
  sin resultados utiles de hilos concretos.
