# Ciencia del aprendizaje: evidencia para Devsparring

**Fecha de creacion:** 19-09-2026
**Fecha de consulta de todas las fuentes:** 19-09-2026 (salvo que se indique otra)
**Objetivo:** antes de anadir un modo de preguntas de opcion multiple y un
sistema de tarjetas de repaso rapido a Devsparring, revisar que dice la
evidencia cientifica real (con cita verificable) sobre las tecnicas de
estudio implicadas. Este informe sustituye conclusiones escritas de memoria
en una version anterior; toda afirmacion de aqui en adelante lleva autor,
ano, titulo, donde se publico y URL. Cuando no se ha encontrado la fuente
original o el hallazgo esta en disputa, se dice explicitamente.

## Indice

1. [Efecto de la evocacion (testing effect)](#1-efecto-de-la-evocacion-testing-effect)
2. [Repeticion espaciada: intervalos, FSRS frente a SM-2](#2-repeticion-espaciada-intervalos-fsrs-frente-a-sm-2)
3. [Intercalado frente a practica por bloques](#3-intercalado-frente-a-practica-por-bloques)
4. [Dificultades deseables (Bjork)](#4-dificultades-deseables-bjork)
5. [Preguntas de opcion multiple: distractores, refuerzo del error, retencion](#5-preguntas-de-opcion-multiple-distractores-refuerzo-del-error-retencion)
6. [Feedback: inmediato frente a demorado, y nivel de detalle](#6-feedback-inmediato-frente-a-demorado-y-nivel-de-detalle)
7. [Ejemplos resueltos (worked examples)](#7-ejemplos-resueltos-worked-examples)
8. [Resumir o condensar la informacion](#8-resumir-o-condensar-la-informacion)
9. [Aprendizaje en adultos profesionales con poco tiempo](#9-aprendizaje-en-adultos-profesionales-con-poco-tiempo)
10. [Tabla resumen: tecnica, fuerza de la evidencia, traduccion a Devsparring](#10-tabla-resumen)
11. [Lo que no se encontro o esta en disputa](#11-lo-que-no-se-encontro-o-esta-en-disputa)

---

## 1. Efecto de la evocacion (testing effect)

**Que dice la evidencia:** practicar recordando activamente (evocar de
memoria) produce mejor retencion a medio y largo plazo que releer el mismo
material el mismo numero de veces, incluso sin dar feedback tras el
intento. El efecto crece cuanto mayor es el intervalo hasta la prueba
final (a partir de aprox. 1 dia el beneficio es mayor que en pruebas
inmediatas).

**Fuerza de la evidencia:** alta. No es un hallazgo de un solo estudio:
hay al menos dos meta-analisis grandes e independientes que coinciden en
la direccion y en la magnitud del efecto.

- Roediger, H. L. & Karpicke, J. D. (2006). "Test-Enhanced Learning: Taking
  Memory Tests Improves Long-Term Retention". *Psychological Science*,
  17(3), 249-255.
  https://colinallen.dnsalias.org/Readings/2006_Roediger_Karpicke_PsychSci.pdf
  (consultado 19-09-2026). Estudio original (no meta-analisis): estudiantes
  que hicieron recall libre tras leer un pasaje retuvieron el 61% de la
  informacion una semana despues frente al 40% de quienes solo lo releyeron
  repetidamente, con el mismo tiempo de exposicion.
- Rowland, C. A. (2014). "The Effect of Testing Versus Restudy on
  Retention: A Meta-Analytic Review of the Testing Effect". *Psychological
  Bulletin*, 140(6), 1432-1463. PubMed:
  https://pubmed.ncbi.nlm.nih.gov/25150680/ (consultado 19-09-2026).
  Meta-analisis de 61 estudios experimentales: tamano de efecto medio
  g = 0.50 a favor de testear frente a releer. El procesamiento esforzado
  (recall libre frente a reconocimiento) y el feedback aparecen como
  moderadores fiables; el intervalo de retencion tambien modera el efecto
  (a mas tiempo hasta la prueba final, mayor ventaja del testeo).
- Adesope, O. O., Trevisan, D. A. & Sundararajan, N. (2017). "Rethinking
  the Use of Tests: A Meta-Analysis of Practice Testing". *Review of
  Educational Research*, 87(3), 659-701.
  https://journals.sagepub.com/doi/abs/10.3102/0034654316689306
  (consultado 19-09-2026; resumen cualitativo verificado tambien via
  https://www.learningscientists.org/blog/2017/2/9-1, consultado
  19-09-2026, sin poder confirmar de primera mano el tamano de efecto
  agregado del articulo completo — "no encontrado" el numero exacto de g,
  solo referencias secundarias que lo describen como el meta-analisis mas
  amplio hasta la fecha, con 217 tamanos de efecto). Hallazgos relevantes
  para Devsparring: los tests hibridos (opcion multiple + recall) resultan
  mas efectivos que un solo formato; el feedback tras la prueba ayuda pero
  la ventaja de testear se mantiene incluso sin el; funciona igual en
  laboratorio que en aula real.

**Matiz:** el efecto es mas fuerte para "transferencia cercana" (recordar
lo mismo que se pregunto) que para transferencia lejana (aplicar el
concepto a un problema nuevo); varios autores discuten cuanto se generaliza
a razonamiento complejo frente a memoria factual (ver seccion 11).

## 2. Repeticion espaciada: intervalos, FSRS frente a SM-2

**Que dice la evidencia sobre espaciar (parte clasica):** distribuir la
practica en el tiempo produce mejor retencion a largo plazo que
concentrarla ("massed practice"), y existe una relacion entre el intervalo
optimo entre repasos (ISI) y cuanto tiempo despues se necesita recordar la
informacion (retention interval): cuanto mas lejos en el futuro se quiere
recordar, mayor debe ser el espaciado entre repasos.

**Fuerza de la evidencia:** alta para el efecto de espaciado en si (uno de
los hallazgos mas replicados de la psicologia cognitiva); moderada-alta
para la formula exacta de "intervalo optimo", que depende del intervalo de
retencion deseado y no es un numero unico.

- Cepeda, N. J., Pashler, H., Vul, E., Wixted, J. T. & Rohrer, D. (2006).
  "Distributed Practice in Verbal Recall Tasks: A Review and Quantitative
  Synthesis". *Psychological Bulletin*, 132(3), 354-380.
  https://www.yorku.ca/ncepeda/publications/CPVWR2006.html (consultado
  19-09-2026). Meta-analisis de 317 experimentos (839 comparaciones,
  184 articulos): confirma el efecto de espaciado y muestra que el
  intervalo entre sesiones (ISI) que maximiza la retencion final aumenta
  cuanto mayor es el intervalo de retencion (tiempo hasta la prueba que
  importa de verdad).
- Cepeda, N. J. et al. (2008). "Spacing Effects in Learning: A Temporal
  Ridgeline of Optimal Retention". *Psychological Science*, 19(11),
  1095-1102. https://laplab.ucsd.edu/articles/Cepeda%20et%20al%202008_psychsci.pdf
  (consultado 19-09-2026). Estudio empirico a gran escala (mas de 1350
  participantes) que cuantifica esa "cresta" de intervalo optimo en
  funcion del tiempo hasta la prueba.

**FSRS frente a SM-2:** SM-2 es el algoritmo original de SuperMemo (1987),
usado por Anki durante anos: usa un "factor de facilidad" por tarjeta
ajustado con reglas fijas. FSRS (Free Spaced Repetition Scheduler) es un
modelo mas moderno basado en un proceso de decision markoviano entrenado
con historiales reales de repaso.

- Ye, J., Su, J. & Cao, Y. (2022). "A Stochastic Shortest Path Algorithm
  for Optimizing Spaced Repetition Scheduling". *Proceedings of the 28th
  ACM SIGKDD Conference on Knowledge Discovery and Data Mining*,
  4381-4390. Referencia confirmada via
  https://github.com/open-spaced-repetition/fsrs4anki/wiki/Research-resources
  y anuncio del autor en
  https://x.com/JarrettYe/status/1559344908208508928 (ambos consultados
  19-09-2026; no se ha podido leer el PDF del articulo original completo,
  solo fuentes secundarias que lo describen). Es el articulo fundacional
  de FSRS, publicado en un congreso revisado por pares.
- open-spaced-repetition/srs-benchmark (repositorio publico, resultados
  actualizados; consultado via
  https://github.com/open-spaced-repetition/srs-benchmark y
  https://expertium.github.io/Benchmark.html, 19-09-2026). Benchmark sobre
  cerca de 10 000 colecciones de Anki (cientos de millones de repasos
  reales): FSRS-6 predice la probabilidad de recuerdo con menor log loss
  que SM-2 en aproximadamente el 99.6% de las colecciones evaluadas. La
  cifra de "20-30% menos repasos para la misma retencion" que circula en
  blogs proviene de simulaciones sobre estos mismos datos, no de un
  experimento controlado con estudiantes reales asignados a uno u otro
  algoritmo.

**Matiz importante (decirlo, no ocultarlo):** el propio equipo del
benchmark advierte que SM-2 nunca se diseno para predecir probabilidades
de recuerdo; para poder compararlo con FSRS en log loss hay que anadirle
formulas que no forman parte del algoritmo original, lo que hace la
comparacion algo menos limpia de lo que parece a primera vista. Ademas, la
superioridad de FSRS esta demostrada con datos observacionales de usuarios
de Anki (como predice mejor un modelo ya entrenado con esos datos), no con
un ensayo aleatorizado que mida notas de examen u otro resultado externo
al propio sistema de repaso. Es razonable adoptar FSRS por ser
tecnicamente mas sofisticado y estar respaldado por un articulo revisado
por pares, pero la afirmacion de que "mejora el aprendizaje real" (y no
solo la eficiencia de programacion de repasos dentro del propio sistema)
no esta tan probada como la ventaja de espaciar frente a no espaciar.

## 3. Intercalado frente a practica por bloques

**Que dice la evidencia:** mezclar tipos de problemas distintos dentro de
una misma sesion (intercalado) suele producir mejor rendimiento en una
prueba posterior que agrupar la practica por bloques homogeneos, aunque
durante la propia sesion de practica el intercalado se sienta mas dificil
y con peor rendimiento aparente (una "dificultad deseable", ver seccion
4). El tamano del efecto varia mucho segun el tipo de material.

**Fuerza de la evidencia:** moderada-alta en conjunto, pero heterogenea:
el efecto es solido en matematicas y en materiales visuales de
categorizacion, y ambiguo o incluso ausente en textos expositivos y en
listas de vocabulario por categorias.

- Brunmair, M. & Richter, T. (2019). "Similarity Matters: A Meta-Analysis
  of Interleaved Learning and Its Moderators". *Psychological Bulletin*,
  145(11), 1029-1052. PDF:
  https://www.psychologie.uni-wuerzburg.de/fileadmin/06020400/2019/Brunmair_Richter_in_press__2019_META-ANALYSIS_OF_INTERLEAVED_LEARNING.pdf
  (consultado 19-09-2026). Meta-analisis multinivel de 59 estudios (238
  tamanos de efecto, 158 muestras): efecto global moderado, Hedges'
  g = 0.42. Por tipo de material: g = 0.67 en categorizacion de pinturas/
  material visual, g = 0.34 (pequeno) en tareas matematicas; en textos
  expositivos el intercalado NO mostro ventaja clara sobre el bloqueado, y
  en aprendizaje de vocabulario por categorias (nombres, reglas de
  pronunciacion, traduccion) el intercalado incluso pareció perjudicar el
  aprendizaje.
- Taylor, K. & Rohrer, D. (2010). "The Effects of Interleaved Practice".
  *Applied Cognitive Psychology*, 24(6), 837-848.
  https://onlinelibrary.wiley.com/doi/abs/10.1002/acp.1598 (consultado
  19-09-2026). Estudio con alumnos de 4º de primaria resolviendo
  problemas de matematicas: en el examen a un dia vista, el grupo que
  habia practicado de forma intercalada obtuvo 77% de aciertos frente a
  38% el grupo que practico por bloques (d = 1.21), pese a que durante la
  propia practica el grupo intercalado rindio peor. El analisis de errores
  sugiere que el intercalado mejora la capacidad de identificar que
  procedimiento aplicar a cada problema (discriminacion), no solo de
  ejecutar el procedimiento.

**Matiz:** el propio Brunmair y Richter (2019) destacan que la similitud
entre los items que se intercalan es un moderador clave: intercalar
categorias muy distintas entre si puede no aportar nada o incluso
perjudicar, mientras que intercalar variantes de un mismo tipo de problema
(como distintos tipos de algoritmos o distintas figuras geometricas
parecidas) es donde mas se ha visto beneficio. Para Devsparring esto
importa: intercalar preguntas de temas totalmente distintos (ej. SQL y
CSS) tiene menos respaldo que intercalar variantes dentro de un mismo tema
(ej. distintos patrones de recursividad).

## 4. Dificultades deseables (Bjork)

**Que dice la evidencia:** Robert y Elizabeth Bjork proponen que ciertas
condiciones que hacen el aprendizaje mas lento o con mas errores durante
la practica (evocacion en vez de relectura, espaciado, intercalado,
variar el contexto de practica) producen mejor retencion y transferencia a
largo plazo, precisamente porque exigen mas procesamiento activo. Es un
marco teorico que integra los efectos de las secciones 1 a 3, no un
hallazgo aislado.

**Fuerza de la evidencia:** alta para las dificultades concretas que ya
tienen su propio cuerpo de evidencia (evocacion, espaciado, intercalado,
tratadas arriba con sus propios meta-analisis). Mas debil y discutida como
"marco general": no toda dificultad anadida ayuda, y algunos de los
ejemplos historicos que popularizaron la idea no han replicado bien.

- Bjork, E. L. & Bjork, R. A. (2011). "Making Things Hard on Yourself, But
  in a Good Way: Creating Desirable Difficulties to Enhance Learning". En
  M. A. Gernsbacher et al. (eds.), *Psychology and the Real World*, Worth
  Publishers. PDF:
  https://bjorklab.psych.ucla.edu/wp-content/uploads/sites/13/2016/04/EBjork_RBjork_2011.pdf
  (consultado 19-09-2026). Capitulo de sintesis (no meta-analisis) que
  define el concepto y agrupa la evidencia de espaciado, evocacion e
  intercalado bajo un mismo marco.
- Bjork, R. A. & Bjork, E. L. (2020). "Desirable Difficulties in Theory
  and Practice". *Journal of Applied Research in Memory and Cognition*,
  9(4), 475-479. PDF:
  https://www.waddesdonschool.com/wp-content/uploads/2021/02/Desriable-Difficulties-in-theory-and-practice-Bjork-Bjork-2020.pdf
  (consultado 19-09-2026). Revision de los propios autores diez anos
  despues, matizando el marco original.

**En disputa, y hay que decirlo:** el ejemplo mas citado historicamente
fuera del ambito de evocacion/espaciado/intercalado —que un texto impreso
en una tipografia dificil de leer ("disfluencia") mejora el recuerdo— no
ha replicado bien:

- Diemand-Yauman, C., Oppenheimer, D. M. & Vaughan, E. B. (2011). "Fortune
  Favors the Bold (and the Italicized): Effects of Disfluency on
  Educational Outcomes". *Cognition*, 118(1), 111-115. Estudio original
  que encontro el efecto.
- Meyer, A. et al. (2015). "Fortune Is Fickle: Null Effects of Disfluency
  on Learning Outcomes". *Metacognition and Learning*, 10(1), 41-62.
  https://link.springer.com/article/10.1007/s11409-015-9151-5 (consultado
  19-09-2026). Tres experimentos que intentaron replicar el experimento 1
  de Diemand-Yauman et al. y en ninguno la manipulacion de disfluencia
  afecto al rendimiento de aprendizaje. Un numero especial completo
  (13 experimentos, mas de 1000 participantes) reunio resultados mixtos
  sobre la disfluencia en general.

Ademas, la propia literatura reconoce un limite estructural del marco: el
**efecto de reversion de la pericia** (expertise reversal effect) — una
dificultad que ayuda a quien ya sabe puede perjudicar a quien es
principiante, y al reves un andamiaje que ayuda al principiante se vuelve
innecesario o cuenta en contra segun crece la pericia. Fuente para este
punto: resumida en
https://www.mindomax.com/desirable-difficulties (consultado 19-09-2026,
resumen de busqueda no verificado linea a linea contra el articulo
primario — declarado explicitamente porque no se ha podido acceder al
texto completo del articulo que originalmente describe el efecto de
reversion de la pericia dentro de esta busqueda). Tambien se advierte en
la literatura que la dificultad solo es "deseable" si el alumno tiene la
base minima para superarla con esfuerzo: si no la tiene, la dificultad
simplemente lo bloquea y no aprende nada.

**Traduccion practica:** aplicar dificultades deseables tiene buen respaldo
cuando se trata de evocar, espaciar e intercalar (secciones 1-3); no hay
que extrapolar el marco a "cualquier cosa que sea mas dificil ayuda" (p.
ej. tipografias dificiles de leer, quitar pistas a un principiante) sin
evidencia especifica para ese caso.

## 5. Preguntas de opcion multiple: distractores, refuerzo del error, retencion

Este es el punto mas relevante para la decision de producto, asi que se
detalla con varios estudios en vez de uno solo.

**5.1. ¿El multiple choice "ensena" o solo mide?**

La evidencia dice que un test de opcion multiple bien construido SI
produce aprendizaje (no solo mide lo que ya se sabia), mediante el mismo
mecanismo de evocacion de las secciones 1 y 4 — pero con una condicion
importante: los distractores tienen que ser "competitivos" (plausibles,
que compartan informacion relevante con la respuesta correcta), no
absurdos o faciles de descartar.

- Little, J. L., Bjork, E. L., Bjork, R. A. & Angello, G. (2012).
  "Multiple-Choice Tests Exonerated, at Least of Some Charges: Fostering
  Test-Induced Learning and Avoiding Test-Induced Forgetting".
  *Psychological Science*, 23(11), 1337-1344.
  https://doi.org/10.1177/0956797612443370 (consultado 19-09-2026).
  Hallazgo central: la mejora en la retencion de informacion relacionada
  (no solo lo preguntado directamente) depende de que las alternativas
  incorrectas sean competitivas — es decir, que obliguen a recuperar por
  que la correcta es correcta Y por que las incorrectas son incorrectas.
  Con distractores competitivos, el opcion multiple tuvo una ventaja
  sobre el recuerdo con pista (cued-recall) porque ademas beneficio el
  recuerdo de la informacion asociada a las alternativas incorrectas.
- Little, J. L. & Bjork, E. L. (2015). "Optimizing Multiple-Choice Tests
  as Tools for Learning". *Memory & Cognition*, 43(1), 14-26.
  https://link.springer.com/article/10.3758/s13421-014-0452-8 (consultado
  19-09-2026, solo resumen via busqueda, no se ha leido el articulo
  completo). Amplia la idea anterior: el diseno del test (numero y calidad
  de distractores) es lo que determina si el opcion multiple funciona como
  herramienta de aprendizaje o solo como medicion pasiva.
- Kang, S. H. K., McDermott, K. B. & Roediger, H. L. (2007). "Test Format
  and Corrective Feedback Modify the Effect of Testing on Long-Term
  Retention". *European Journal of Cognitive Psychology*, 19(4-5),
  528-558. https://www.tandfonline.com/doi/abs/10.1080/09541440601056620
  (consultado 19-09-2026). Con feedback, el formato de respuesta corta dio
  algo mas de beneficio que el opcion multiple; SIN feedback, el opcion
  multiple dio mayor beneficio que la respuesta corta. Es decir: el
  formato optimo depende de si hay feedback o no.

**Fuerza de la evidencia de 5.1:** moderada. Son varios estudios del mismo
grupo de investigacion (Bjork lab, Roediger lab) que convergen, pero no se
ha encontrado un meta-analisis dedicado exclusivamente a "opcion multiple
bien disenada vs. recuerdo libre" (mas alla de lo que ya reportan Rowland
2014 y Adesope et al. 2017 en la seccion 1, donde el formato hibrido
opcion-multiple + recall salio como el mas efectivo).

**5.2. ¿Elegir mal refuerza el error? (efecto de sugestion negativa)**

Si. Esta es la principal preocupacion legitima sobre el opcion multiple y
esta documentada, no es un mito: exponerse a una alternativa incorrecta
plausible ("lure") y elegirla puede hacer que esa informacion falsa se
recuerde despues como si fuera cierta, especialmente si no hay correccion.

- Roediger, H. L. & Marsh, E. J. (2005). "The Positive and Negative
  Consequences of Multiple-Choice Testing". *Journal of Experimental
  Psychology: Learning, Memory, and Cognition*, 31(5), 1155-1159. PDF:
  http://psychnet.wustl.edu/memory/wp-content/uploads/2018/04/Roediger-Marsh-2005_JEPLMC.pdf
  (consultado 19-09-2026). Hallazgo doble: hubo un efecto de evocacion
  positivo grande (responder preguntas de opcion multiple ayudo en un test
  final de recuerdo con pista), pero tambien un efecto negativo: cuantos
  mas distractores (lures) habia en las preguntas iniciales, menor el
  efecto positivo y mayor la probabilidad de que esos distractores
  aparecieran como respuestas incorrectas en el test final. Es decir,
  ponderar/leer distractores plausibles puede sembrar "conocimiento
  falso".
- Marsh, E. J., Roediger, H. L., Bjork, R. A. & Bjork, E. L. (2007). "The
  Memorial Consequences of Multiple-Choice Testing". *Psychonomic
  Bulletin & Review*, 14(2), 194-199. PDF:
  https://bjorklab.psych.ucla.edu/wp-content/uploads/sites/13/2016/07/Marsh_Roediger_BjorkBjork2007PBR.pdf
  (consultado 19-09-2026). Confirma y extiende el hallazgo anterior:
  elegir una alternativa incorrecta en un opcion multiple aumenta la
  probabilidad de reproducir ese mismo error mas tarde, en comparacion con
  no haber sido testeado.
- El termino especifico "negative suggestion effect" se origina en Brown,
  A. S., Schilling, H. E. H. & Hockensmith, M. L. (1999), segun referencias
  secundarias (no se ha localizado ni verificado el articulo original de
  1999 en esta busqueda: "no encontrado" de primera mano, solo citado por
  fuentes posteriores).

**Fuerza de la evidencia de 5.2:** alta. Replicado por al menos dos grupos
de investigacion distintos (Roediger/Marsh y Bjork/Bjork), con el mismo
patron.

**5.3. El feedback resuelve (parcialmente) el problema del refuerzo del
error**

- Butler, A. C. & Roediger, H. L. (2008). "Feedback Enhances the Positive
  Effects and Reduces the Negative Effects of Multiple-Choice Testing".
  *Memory & Cognition*, 36(3), 604-616.
  https://link.springer.com/article/10.3758/MC.36.3.604 (consultado
  19-09-2026; version PDF verificada tambien via
  https://gwern.net/doc/psychology/spaced-repetition/2008-butler.pdf).
  Hallazgo clave para Devsparring: tanto el feedback inmediato como el
  demorado, comparados con no dar feedback, aumentaron la proporcion de
  respuestas correctas Y redujeron la proporcion de intrusiones (los
  distractores elegidos por error reaparecen despues como respuesta) en
  un test de recuerdo demorado posterior. El feedback no elimina el efecto
  de sugestion negativa, pero lo reduce sustancialmente.

**Conclusion combinada 5.1-5.3, con la certeza que corresponde a cada
parte:** un modo de opcion multiple con distractores plausibles (no
absurdos) SI puede generar aprendizaje real, no solo medirlo (evidencia
moderada-alta); pero sin feedback claro que diga por que la respuesta
elegida era incorrecta y cual era la correcta, existe un riesgo real y
documentado de que el usuario recuerde despues el distractor como si
fuera el dato correcto (evidencia alta). La pieza que hace que el diseno
sea seguro no es el formato en si, es el feedback posterior (ver tambien
seccion 6).

## 6. Feedback: inmediato frente a demorado, y nivel de detalle

**Que dice la evidencia sobre el momento del feedback:** el resultado mas
robusto es que "depende del contexto", y quien busque una respuesta unica
("siempre mejor inmediato" o "siempre mejor demorado") no va a encontrarla
con respaldo solido.

- Kulik, J. A. & Kulik, C.-L. C. (1988). "Timing of Feedback and Verbal
  Learning". *Review of Educational Research*, 58(1), 79-97.
  https://journals.sagepub.com/doi/abs/10.3102/00346543058001079
  (consultado 19-09-2026). Meta-analisis de 53 estudios: en estudios
  aplicados con examenes y materiales de clase reales, el feedback
  inmediato solio ser mejor que el demorado; en estudios experimentales de
  laboratorio sobre adquisicion de listas, el patron se invirtio a menudo
  (demorado mejor). Es decir, el contexto del estudio (aula real vs.
  laboratorio de listas artificiales) predice mejor el resultado que una
  regla universal sobre el tiempo.
- Van der Kleij, F. M., Feskens, R. C. W. & Eggen, T. J. H. M. (2015).
  "Effects of Feedback in a Computer-Based Learning Environment on
  Students' Learning Outcomes: A Meta-Analysis". *Review of Educational
  Research*, 85(4), 475-511.
  https://journals.sagepub.com/doi/10.3102/0034654314564881 (consultado
  19-09-2026). Meta-analisis de 40 estudios (70 tamanos de efecto) en
  entornos de aprendizaje por ordenador (el contexto mas parecido a
  Devsparring): el feedback inmediato funciono algo mejor para aprendizaje
  de "orden inferior" (hechos, procedimientos simples) y el demorado para
  aprendizaje de "orden superior" (transferencia, comprension profunda),
  aunque la interaccion no llego a significacion estadistica formal en el
  propio meta-analisis (hay que decirlo: es una tendencia, no una
  certeza).

**Que dice la evidencia sobre el nivel de detalle (mas relevante para
Devsparring que el timing):** esto si tiene un resultado mas claro y
consistente entre estudios: el feedback elaborado (que explica el porque)
supera claramente al feedback minimo (solo decir si acerto o no, o solo
dar la respuesta correcta sin explicacion).

- Van der Kleij et al. (2015), mismo estudio de arriba: el feedback
  elaborado (explicacion) obtuvo un tamano de efecto de 0.49, frente a
  0.32 de dar solo la respuesta correcta y solo 0.05 de decir unicamente
  si la respuesta fue correcta o incorrecta sin mas contexto. La ventaja
  del feedback elaborado fue mayor todavia para objetivos de aprendizaje
  de orden superior.
- Wisniewski, B., Zierer, K. & Hattie, J. (2020). "The Power of Feedback
  Revisited: A Meta-Analysis of Educational Feedback Research". *Frontiers
  in Psychology*, 10, articulo 3087. PMC:
  https://pmc.ncbi.nlm.nih.gov/articles/PMC6987456/ (consultado
  19-09-2026). Meta-analisis muy grande: 435 estudios, 994 tamanos de
  efecto, mas de 61 000 participantes. Efecto medio global d = 0.48, con
  heterogeneidad alta (el feedback "no es un tratamiento unico"); el
  contenido informativo del feedback (cuanto explica, no solo si es
  positivo o negativo) es uno de los moderadores mas fuertes, y el efecto
  es mayor sobre resultados cognitivos y motores que sobre motivacion o
  conducta.
- Este patron (elaborar > dar solo la respuesta correcta > solo marcar
  correcto/incorrecto) es coherente con el hallazgo de la seccion 5.3
  (Butler & Roediger 2008): el feedback que reduce mejor el "conocimiento
  falso" tras elegir un distractor es el que explica por que la opcion
  elegida estaba mal, no solo el que senala la correcta.

**Traduccion practica:** para Devsparring, la variable que mas importa
segun la evidencia no es tanto "inmediato vs. demorado" (donde la
evidencia esta dividida y depende del tipo de tarea) sino la calidad y
el detalle del feedback: explicar por que la respuesta elegida es
incorrecta y por que la correcta lo es, no solo mostrar un check o una X.
Dado que Devsparring ya usa correccion con IA, dar el feedback
inmediatamente tras responder (en vez de acumularlo para el final de la
sesion) es razonable por ser el patron mas favorable en los estudios
aplicados en contexto de aula real y por simplicidad de implementacion,
aunque no hay una prueba definitiva de que sea siempre superior al
feedback demorado.

## 7. Ejemplos resueltos (worked examples)

**Que dice la evidencia:** para alumnos novatos, estudiar un ejemplo ya
resuelto paso a paso produce mejor aprendizaje (y menos carga cognitiva)
que intentar resolver el mismo tipo de problema sin ayuda desde el
principio. Es uno de los efectos mas replicados de la teoria de la carga
cognitiva (Sweller). Sin embargo, esta ventaja se invierte con la pericia:
para quien ya tiene conocimiento previo del tema, resolver problemas
activamente supera a releer ejemplos resueltos (efecto de reversion de la
pericia).

**Fuerza de la evidencia:** alta para el efecto en si (worked-example
effect), con meta-analisis dedicado; alta tambien para el efecto de
reversion de la pericia como fenomeno documentado, aunque es un area con
matices segun el dominio y el diseno del fading (como se retiran los
apoyos).

- Barbieri, C. A., Miller-Cotto, D., Clerjuste, S. N. & Chawla, K. (2023).
  "A Meta-Analysis of the Worked Examples Effect on Mathematics
  Performance". *Educational Psychology Review*, 35, articulo 11. DOI:
  10.1007/s10648-023-09745-1. PDF:
  https://www.danamillercotto.com/uploads/4/7/7/2/47725475/barbieri_et_al__2023__we_meta-analysis.pdf
  (consultado 19-09-2026). Meta-analisis centrado en matematicas: los
  resultados favorecen a los ejemplos resueltos tanto en pruebas de
  retencion como de transferencia tras el aprendizaje. No se ha podido
  extraer de la copia consultada el tamano de efecto agregado exacto (g o
  d) ni el numero preciso de estudios/participantes — "no encontrado" ese
  dato numerico concreto en esta pasada; la referencia bibliografica y la
  direccion del efecto si estan confirmadas.
- Kalyuga, S., Ayres, P., Chandler, P. & Sweller, J. (2003). "The
  Expertise Reversal Effect". *Educational Psychologist*, 38(1), 23-31.
  https://www.tandfonline.com/doi/abs/10.1207/S15326985EP3801_4
  (consultado 19-09-2026; solo resumen via busqueda, no se ha leido el
  articulo completo). Articulo de referencia sobre como los apoyos
  instruccionales (incluidos los ejemplos resueltos) que ayudan al novato
  se vuelven redundantes o incluso contraproducentes al crecer la
  pericia.
- Sobre el "fading" (retirar progresivamente los pasos resueltos): la
  busqueda encontro literatura (p. ej. estudios en
  https://pmc.ncbi.nlm.nih.gov/articles/PMC9648051/, consultado
  19-09-2026, sobre el orden de ejemplos correctos y erroneos) que apoya
  que pasar gradualmente de "ejemplo completo" a "problema con pasos
  ocultos" a "problema completo" facilita la transicion de estudiar
  ejemplos a resolver por cuenta propia, pero no se ha localizado un
  meta-analisis especifico sobre la magnitud de ese beneficio del fading
  frente a otras formas de transicion — declarado como zona de evidencia
  mas debil.

**Traduccion practica:** para preguntas nuevas o temas donde el usuario de
Devsparring es principiante, mostrar primero un ejemplo resuelto (o una
solucion modelo) antes de pedir que resuelva un problema equivalente tiene
buen respaldo. Para temas donde el usuario ya demuestra dominio (por
ejemplo, FSRS ya marca la tarjeta o el tema como "facil" o con muchos
aciertos), forzarle a leer ejemplos resueltos en vez de practicar
activamente puede ser contraproducente segun el efecto de reversion de la
pericia: mejor pasar a practica activa sin andamiaje.

## 8. Resumir o condensar la informacion

**Que dice la evidencia:** resumir es una "estrategia generativa"
(obliga a reorganizar la informacion con las propias palabras, no solo a
copiarla), y en ese sentido tiene una base teorica solida. Pero la
revision mas citada de tecnicas de estudio la califica de utilidad BAJA en
la practica, no por ser inutil en si, sino porque la mayoria de
estudiantes no sabe resumir bien sin entrenamiento previo, y esa carencia
de habilidad limita el beneficio real que se observa en los estudios.

**Fuerza de la evidencia:** alta en el sentido de que la revision es
extensa y ampliamente citada, pero la propia conclusion es un matiz, no
una condena ni una recomendacion clara — hay que trasladar ese matiz, no
simplificarlo a "resumir no sirve".

- Dunlosky, J., Rawson, K. A., Marsh, E. J., Nathan, M. J. & Willingham,
  D. T. (2013). "Improving Students' Learning With Effective Learning
  Techniques: Promising Directions from Cognitive and Educational
  Psychology". *Psychological Science in the Public Interest*, 14(1),
  4-58. https://journals.sagepub.com/doi/abs/10.1177/1529100612453266
  (consultado 19-09-2026). Revision (no meta-analisis cuantitativo propio,
  sino sintesis critica de la evidencia existente) de 10 tecnicas:
  clasifico el resumen (summarization) como de utilidad BAJA, junto con
  subrayado/highlighting y releer, frente a la practica de recuperacion y
  la practica distribuida, clasificadas como de utilidad ALTA. El motivo
  que dan no es que resumir sea ineficaz por naturaleza, sino que los
  estudiantes (sobre todo los mas jovenes) suelen escribir resumenes de
  baja calidad, pegados a las palabras y a la estructura del texto
  original, y que el beneficio real depende de si la persona sabe
  resumir bien — algo que mejora con entrenamiento explicito.
- Donoghue, G. M. & Hattie, J. A. C. (2021). "A Meta-Analysis of Ten
  Learning Techniques". *Frontiers in Education*, 6, 581216.
  https://doi.org/10.3389/feduc.2021.581216 (consultado 19-09-2026).
  Meta-analisis cuantitativo posterior sobre las mismas 10 tecnicas de
  Dunlosky et al.: 242 estudios, 1619 casos, 169 179 participantes
  distintos. Tamano de efecto para resumir/condensar (summarization):
  d = 0.44 — nada desdenable en terminos absolutos, pero por debajo de la
  practica distribuida (d = 0.85) y de la practica de recuperacion
  (d = 0.74).
- Fiorella, L. & Mayer, R. E. (2015). "Eight Ways to Promote Generative
  Learning". *Educational Psychology Review*, 27(4), 717-741. PDF:
  https://bootcampmilitaryfitnessinstitute.com/wp-content/uploads/2016/01/eight-ways-to-promote-generative-learning-fiorella-mayer-2015.pdf
  (consultado 19-09-2026). Matiz temporal relevante para Devsparring: las
  actividades generativas como resumir muestran mas beneficio en pruebas
  DEMORADAS que en pruebas inmediatas — el efecto tarda en manifestarse,
  por lo que evaluar "resumir vs. no resumir" solo con una prueba justo
  despues puede subestimar su utilidad real.

**Traduccion practica para el punto especifico que pregunta la tarea (¿un
resumen de una frase ayuda mas que un texto largo?):** no se ha
encontrado un estudio que compare directamente "una frase de resumen"
frente a "leer el texto completo" como formato de tarjeta de repaso —
"no encontrado" ese experimento especifico. Lo que si dice la evidencia es
que (a) el acto de generar el propio resumen ayuda mas que solo leer un
resumen ya hecho por otra persona (coherente con el principio generativo
de Fiorella y Mayer), y (b) que una frase de sintesis muy corta escrita
por un tercero (como seria una tarjeta de repaso en Devsparring) se
parece mas a un resumen "ya hecho" que el usuario solo lee, por lo que su
beneficio probablemente dependeria mas de si el usuario tiene que evocarla
activamente despues (testing effect, seccion 1) que del simple hecho de
que sea corta.

## 9. Aprendizaje en adultos profesionales con poco tiempo

**Que dice la evidencia:** hay bastante interes y literatura aplicada
sobre "microlearning" (sesiones muy cortas, formacion en el puesto de
trabajo) pero la calidad metodologica de esa literatura es mas debil que
la de los efectos clasicos de las secciones 1-4: faltan ensayos
controlados grandes y sobra literatura descriptiva o de bajo rigor.

**Fuerza de la evidencia:** baja-moderada, y hay que decirlo con
franqueza: esta es la seccion menos solida del informe.

- Taylor, A. D. & Hung, W. (2022). "The Effects of Microlearning: A
  Scoping Review". *Educational Technology Research and Development*, 70,
  363-395. DOI: 10.1007/s11423-022-10084-1. Consultado via
  https://eric.ed.gov/?id=EJ1337772 y
  https://link.springer.com/article/10.1007/s11423-022-10084-1 (ambos
  19-09-2026, solo resumen de busqueda, no se ha leido el articulo
  completo). Es una revision de alcance (scoping review), no un
  meta-analisis cuantitativo: cataloga como se ha usado el microlearning
  en formacion academica y en empresa, sin ofrecer un tamano de efecto
  agregado fiable sobre si mejora el aprendizaje frente a formatos mas
  largos.
- Multiples fuentes secundarias de busqueda (no verificadas de primera
  mano contra el articulo completo, declarado explicitamente) coinciden en
  que el microlearning se apoya conceptualmente en la repeticion espaciada
  y en la teoria de la carga cognitiva (secciones 2 y 7 de este informe),
  pero senalan explicitamente que "falta evidencia sobre el rendimiento
  real de los alumnos y su relacion con la satisfaccion", es decir, el
  propio campo reconoce el hueco.
- Sobre formacion espaciada en profesionales con poco tiempo si hay
  evidencia mas solida, aunque en el dominio medico, no en programacion:
  varios estudios de "spaced education" en facultades de medicina y
  residencias (ej. serie de estudios recogidos en
  https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5536283/ y
  https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8368805/, consultados
  19-09-2026, resumenes de busqueda no verificados linea a linea) muestran
  que distribuir contenido en preguntas breves periodicas por correo o app
  mejora la retencion de conocimiento frente a la formacion concentrada
  tradicional, en poblaciones adultas con agendas muy cargadas (residentes
  y estudiantes de medicina). Esto es coherente con el efecto de
  espaciado general (seccion 2) aplicado a un contexto profesional, mas
  que evidencia nueva e independiente.

**Lo que no se encontro:** ningun estudio especifico sobre programadores
o profesionales tech entrenando para entrevistas tecnicas con poco tiempo
disponible ("no encontrado"). La generalizacion de Devsparring a partir de
esta seccion se apoya en el efecto de espaciado (solido, seccion 2) y en
la plausibilidad de que sesiones cortas y frecuentes encajan mejor en la
agenda de un adulto ocupado, no en evidencia directa sobre este publico
exacto.

## 10. Tabla resumen

| Tecnica | Fuerza de la evidencia | Como se traduce a Devsparring |
|---|---|---|
| Evocacion / practica de recuperacion (testing effect) | Alta (2+ meta-analisis independientes, Rowland 2014 g=0.50; Adesope et al. 2017) | Ya es el nucleo del producto (preguntas + FSRS). Mantenerlo como prioridad sobre "modos de solo lectura". |
| Repeticion espaciada (efecto general) | Alta (Cepeda et al. 2006, 2008) | Confirma la apuesta de FSRS/repaso espaciado como columna vertebral. |
| FSRS frente a SM-2 | Moderada (un articulo revisado por pares + benchmarks propios del equipo, no ensayo aleatorizado externo) | Adoptar FSRS es razonable (mas preciso prediciendo recuerdo dentro de su propio sistema), pero no vender la mejora como "aprendes mas", sino como "el sistema programa mejor los repasos". |
| Intercalado | Moderada, muy dependiente del material (Brunmair & Richter 2019 g=0.42 global, g=0.34 en matematicas, ambiguo en texto) | Intercalar variantes de un mismo tema (ej. tipos de recursividad) tiene mas respaldo que intercalar temas muy distintos entre si (ej. SQL con CSS) en la misma tanda. |
| Dificultades deseables (marco general) | Alta para sus componentes probados (evocar/espaciar/intercalar); debil como principio universal | No extrapolar a "cuanto mas dificil, mejor" sin evidencia especifica; respetar el efecto de reversion de la pericia. |
| Opcion multiple con distractores competitivos + feedback | Moderada-alta el beneficio; alta el riesgo sin feedback (Little et al. 2012; Roediger & Marsh 2005; Butler & Roediger 2008) | Viable como modo nuevo SI: distractores plausibles (no absurdos) y feedback obligatorio y explicativo tras cada respuesta, nunca opcion multiple "muda". |
| Feedback elaborado vs. minimo | Alta (van der Kleij et al. 2015 d=0.49 vs 0.05; Wisniewski et al. 2020 d=0.48 global) | El feedback de Devsparring (ya con IA) debe explicar el porque, no solo marcar correcto/incorrecto; el timing (inmediato/demorado) es secundario frente a esto. |
| Ejemplos resueltos (worked examples) | Alta para novatos (Barbieri et al. 2023); alta tambien la reversion con la pericia (Kalyuga et al. 2003) | Mostrar solucion modelo antes de practicar en temas nuevos/dificiles para el usuario; retirarla cuando FSRS indique dominio. |
| Resumir / condensar | Moderada, y con reserva citada (Dunlosky et al. 2013: utilidad baja en su revision; Donoghue & Hattie 2021: d=0.44) | Una frase de repaso sola, solo leida, aporta poco por si misma; combinarla con evocacion activa (tapar y recordar) es lo que tiene respaldo, no la brevedad en si. |
| Microlearning / sesiones cortas para profesionales ocupados | Baja-moderada, campo con poca evidencia de alto rigor (Taylor & Hung 2022, scoping review) | Razonable como formato (encaja con espaciado, seccion 2), pero no presentarlo como "demostrado que funciona mejor" sin matizar que la evidencia directa es escasa. |

## 11. Lo que no se encontro o esta en disputa

- **Efecto de reversion de la pericia**: no se pudo leer el articulo
  primario de Kalyuga et al. (2003) completo en esta busqueda, solo
  resumenes; la referencia y la direccion del efecto estan bien
  establecidas en literatura secundaria, pero el detalle fino (a partir de
  que nivel de pericia se invierte el efecto, y como medirlo dentro de
  Devsparring) no esta resuelto y necesitaria lectura directa del articulo
  o de la revision de Kalyuga et al. (2003) antes de fijar un umbral de
  producto.
- **Tamano de efecto exacto de Adesope, Trevisan y Sundararajan (2017)**:
  no se ha podido confirmar el numero de g agregado del meta-analisis
  completo, solo resumenes secundarios. Antes de citarlo con un numero
  concreto en marketing o en documentacion publica, habria que acceder al
  articulo completo en *Review of Educational Research*.
- **Tamano de efecto exacto de Barbieri et al. (2023)** sobre worked
  examples en matematicas: mismo caso, solo se confirmo la direccion del
  efecto (favorece a los ejemplos resueltos), no el numero.
  Y no hay evidencia especifica encontrada sobre worked examples aplicados
  a programacion/entrevistas tecnicas (el meta-analisis es de matematicas).
- **"Negative suggestion effect" como termino**: el articulo que se cita
  como origen (Brown, Schilling y Hockensmith, 1999) no se pudo localizar
  ni verificar de primera mano; se conoce solo por citas de trabajos
  posteriores. Tratar esa atribucion como probable pero no confirmada.
- **Replicacion debil o discutida, y hay que decirlo explicitamente**:
  el ejemplo de la tipografia dificil de leer ("disfluencia") que
  popularizo la idea de dificultades deseables fuera del nucleo
  evocacion/espaciado/intercalado NO replico bien (Meyer et al. 2015,
  "Fortune Is Fickle"). Cualquier dificultad nueva que Devsparring quiera
  anadir (mas alla de las 3 ya bien probadas) deberia tratarse con la
  misma cautela hasta tener evidencia especifica.
- **Timing de feedback (inmediato vs. demorado)**: la evidencia esta
  dividida segun el contexto (Kulik & Kulik 1988; van der Kleij et al.
  2015 sin interaccion estadisticamente significativa). No hay una
  respuesta unica y cualquier decision de producto sobre el timing debe
  apoyarse mas en la usabilidad que en una supuesta certeza cientifica.
- **Microlearning para profesionales tech**: seccion completa marcada como
  evidencia debil (ver seccion 9); es el area del informe con menos
  respaldo directo.
- **Comparacion directa "resumen de una frase" vs. "texto largo" como
  formato de tarjeta**: no se encontro ningun estudio que compare
  exactamente estos dos formatos. Lo que existe es evidencia sobre resumir
  como actividad generativa en general (seccion 8), que no es exactamente
  lo mismo que leer una frase de sintesis ya hecha.
- **Metodologia de esta busqueda**: varias citas de este informe se
  verificaron solo mediante el resumen que devuelve el buscador (WebSearch)
  y no mediante lectura completa del PDF/HTML original; en cada caso se ha
  marcado explicitamente cuando ese es el caso. Donde se pudo abrir el
  documento fuente (via WebFetch), se indica tambien. Ante cualquier
  decision de producto importante basada en un numero concreto de este
  informe, se recomienda verificar ese numero contra el articulo completo
  antes de citarlo externamente (p. ej. en marketing).

