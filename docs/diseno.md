# Dirección de diseño de Devsparring

Decidida el 15-09-2026. Manda el listón de `C:\dev\CLAUDE.md`; esto lo concreta
para este producto. Si algo de aquí choca con ese listón, gana el listón.

## La metáfora: la tarjeta del juez

Devsparring es sparring: entrenar con alguien que te pega antes del combate de
verdad. De todo ese mundo, lo único que se usa es lo que **organiza información
de verdad**, no lo que decora:

| Del sparring      | En el producto                     | Qué organiza                                                                         |
| ----------------- | ---------------------------------- | ------------------------------------------------------------------------------------ |
| Asaltos (rounds)  | Cada pregunta de una sesión        | Una secuencia real y numerada: R3 de 10. La numeración está ganada, no es adorno     |
| Tarjeta del juez  | La corrección                      | Puntuación por dimensiones, marcada como se marca una tarjeta                        |
| Categoría de peso | Junior, mid, senior                | La misma respuesta se juzga con distinta vara. No es una etiqueta: cambia la rúbrica |
| La esquina        | El panel entre pregunta y pregunta | Lo que te dice quien te entrena antes del siguiente asalto                           |
| La campana        | El temporizador                    | Tiempo real de la prueba                                                             |

Lo que **no** se usa: guantes, rings, cinturones, emojis de boxeo, fotos de
gimnasio. La metáfora está en la estructura, no en el atrezo.

## Color

Un solo acento: **azul esquina** (`--esquina`). En boxeo el aspirante pelea en
la esquina azul; el color rojo se reserva entero para lo semántico. Los neutros
son grises con sesgo azul, elegidos, no heredados: el papel de una tarjeta
impresa bajo luz fría.

| Token                        | Claro                 | Oscuro                | Para qué                                                                 |
| ---------------------------- | --------------------- | --------------------- | ------------------------------------------------------------------------ |
| `--lienzo`                   | `#E9EBF0`             | `#0B0E14`             | Fondo de página                                                          |
| `--papel`                    | `#F6F7FA`             | `#141822`             | Superficie: paneles, filas                                               |
| `--papel-2`                  | `#FFFFFF`             | `#1B2130`             | Superficie elevada: campos, tarjeta                                      |
| `--tinta`                    | `#0F131B`             | `#E8EBF2`             | Texto principal                                                          |
| `--tinta-2`                  | `#434B5C`             | `#AAB4C6`             | Texto secundario                                                         |
| `--tinta-3`                  | `#767F93`             | `#7B8598`             | Etiquetas y datos                                                        |
| `--linea` / `--linea-fuerte` | `#D1D6E0` / `#A7B0C0` | `#232B3A` / `#3A445A` | Separadores y bordes de control                                          |
| `--esquina`                  | `#2340CE`             | `#7B96FF`             | El acento. Se gasta en la acción principal, el asalto en curso y el foco |
| `--ok` / `--aviso` / `--mal` | verde, ámbar, rojo    | ídem                  | Solo veredicto. No cuentan como acento                                   |

El nivel **no se codifica con color** (sería un segundo acento): se codifica con
forma, tres segmentos de los que se llenan uno, dos o tres.

## Tipografía

- **Display: Big Shoulders Display.** Condensada, industrial, de cartel. Solo en
  titulares grandes, cifras grandes y la marca. Aguanta tamaños enormes sin
  ocupar la pantalla entera, que es lo que permite un héroe que no es a pantalla
  completa.
- **Texto: IBM Plex Sans.** Técnica y legible en párrafos largos, que es lo que
  son las preguntas y las respuestas modelo.
- **Datos: IBM Plex Mono.** Etiquetas en versalitas, número de asalto, reloj,
  puntuaciones. Hermana de la anterior, así que el conjunto es una familia y no
  una mezcla.

Ninguna de las tres está en la lista de fuentes vetadas. Medida de ~65
caracteres en texto corrido, `text-wrap: balance` en titulares, `tabular-nums`
en toda columna de cifras.

## Forma

Radios pequeños (2 a 4 px). Una tarjeta de puntuación es un impreso, no una
pastilla: las esquinas muy redondeadas la convertirían en la tarjeta genérica de
cualquier producto. Las píldoras se reservan para las etiquetas de dato.

Casi nada lleva sombra. La jerarquía la hacen el papel, las líneas de un píxel y
un **canto izquierdo de 3 px** cuyo color dice el veredicto. Ese canto es el
recurso estructural del producto y aparece en la corrección, en el historial y
en la fila del modo elegido.

## Movimiento

Reglas de Emil Kowalski, con una regla propia por encima: **lo que se hace con
el teclado no se anima**. Practicar es teclear, puntuar con 1 a 4 y pasar con
Enter, decenas de veces por sesión; animar ese salto haría la app lenta.

- Curvas: `--salida: cubic-bezier(0.23, 1, 0.32, 1)` para entradas y salidas,
  `--mov: cubic-bezier(0.77, 0, 0.175, 1)` para movimiento en pantalla. Nunca
  rebote, nunca `ease-in`, nunca `transition: all`.
- Duraciones: pulsación 140 ms, hover 160 ms, revelado 380 ms. Nada de interfaz
  pasa de 300 ms salvo el revelado de la landing.
- Pulsar cualquier control: `scale(0.97)`. El hover solo con ratón fino.
- Un único momento coreografiado por pantalla: en la landing, la entrada
  escalonada del héroe (60 ms entre piezas); en la corrección, los segmentos de
  la tarjeta llenándose de izquierda a derecha, que es literalmente el juez
  marcando. Nada más se mueve.
- `prefers-reduced-motion` quita el desplazamiento y conserva la opacidad, que
  es la que comunica el cambio de estado.

## La tesis visual

Arriba de la landing no hay eslogan sobre una imagen: está **la misma pregunta
real del banco con las dos varas**, junior y senior, y se cambia entre ellas con
un control. Sale del contenido de verdad, así que la landing no puede quedarse
vieja. Debajo, la ficha del banco con las cifras reales por pista.

## Accesibilidad, como criterio de aceptación

- Todo lo que se puede pulsar lo parece en reposo y responde al hover, al foco y
  a la pulsación. Nada depende solo del color.
- Foco visible siempre: 2 px del acento con 2 px de separación.
- Área táctil mínima de 44 px en móvil.
- La corrección se anuncia con `aria-live`; el reloj nunca, porque cambia cada
  segundo y secuestraría el lector de pantalla.
- Contraste mínimo 4,5:1 en texto y 3:1 en bordes de control, en ambos temas.
- Enlace de salto al contenido, jerarquía de encabezados correcta y `<button>`
  de verdad donde se pulsa.

## Segunda vuelta (15-09-2026): la velada

La primera versión de esta dirección salió correcta y sobria, y a Eudys le
supo a poco: "más básico imposible". La revisión se hizo mirando y usando
referencias reales (basement.studio, monogrid.com, resend.com, las galerías de
godly.design y awwwards) y quedándose con técnicas, no con estilos:

| De dónde        | Qué se toma                                                                                                                                 |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| basement.studio | Héroe a sangre con el titular anclado abajo, navegación mínima en mono, retícula de hairlines que se tocan y un control fijo abajo del todo |
| monogrid.com    | Azul eléctrico sobre negro como marca, etiquetas `EN_MAYUSCULAS_CON_GUION`, tipografía enorme usada como textura                            |
| resend.com      | Badge de píldora sobre el titular y una sola palabra del titular en el acento                                                               |
| Galerías        | Celdas con etiqueta en la esquina y el dato debajo, no encima                                                                               |

Y se añaden tres piezas propias que no salen de ninguna de ellas:

1. **El mando de la vara.** Fijo abajo, cambia junior o senior y **toda la
   página se relee**: la ronda en directo baja de nota, el cara a cara cambia de
   lado y los criterios que solo se le exigen al senior se encienden con un
   barrido. La web demuestra la tesis del producto sobre sí misma.
2. **La ronda en directo.** El héroe no es una captura: es una sesión jugándose
   sola, con la pregunta escribiéndose, la respuesta de ejemplo, el juez
   marcando la tarjeta y el veredicto. La pregunta y las dimensiones son del
   banco; la respuesta va rotulada como simulación.
3. **El mosaico del banco.** Una tesela por pregunta publicada, encendida según
   el nivel mínimo. Se ve el tamaño real del banco de un vistazo y al pasar por
   encima se lee cualquiera. Es dato convertido en imagen, no un adorno.

La landing vive siempre en el mundo de noche, con retícula, viñeta y grano; el
tema claro y oscuro sigue mandando dentro de la aplicación, que es donde se lee
durante horas.

## Tercera vuelta (15-09-2026): foco y bloque

La velada le siguió pareciendo plana a Eudys ("a lo mejor por la paleta"), el
mando fijo de la vara no le decía nada y un difuminado del héroe tapaba botones
y tarjeta. En vez de una cuarta pasada a ciegas se hicieron cinco bocetos en un
lienzo (Foco, Prensa, Consola, Bloques y la mezcla) y eligió la mezcla de dos:
**A manda, D aporta masa**.

- **La profundidad la da la luz, no el color.** Un foco cenital cálido detrás
  de todo (`.foco`, siempre con `z-index: -1` y sin eventos: nunca encima de
  un botón), paneles con bisel (`.panel`: luz arriba, sombra abajo), superficies
  hundidas donde se escribe (`.hundido`) y brillo solo en lo activo (`.brillo`).
- **La masa la da el bloque.** Un azul tinta hondo y poco saturado
  (`--bloque #1c2b74`, `--bloque-2 #24378f`) que se usa **solo a lo grande**:
  la mitad derecha del héroe con el asalto en curso en cifra gigante, la
  columna que juzga en el cara a cara, la leyenda del mosaico, el cierre y el
  carril de la app. Nunca como detalle. El cobalto de los bocetos (`#1f3bd6`)
  se descartó por chillón.
- **Los tokens se remapean por superficie.** `.noche` y `.bloque` redefinen
  `--tinta`, `--linea`, `--papel` y `--esquina`, así que las primitivas
  (`Peso`, `Casillas`, `Ficha`, `Boton`, `Marca`) se pintan bien en cualquiera
  de las tres superficies sin saber dónde están. En la noche el acento es un
  azul más claro que brilla; dentro del bloque el acento es blanco.
- **La vara se cambia donde cambia algo.** El conmutador vive en la tarjeta
  del héroe y en la cabecera del cara a cara; no hay barra fija.
- **El mosaico es una muestra.** Unas decenas de teselas, cinco por pista y
  seis abiertas con la pregunta a la vista; el resto se lee al pasar por
  encima. Las cifras reales van en el bloque de al lado. Las 377 de golpe eran
  ruido, no dato.
- **Radios.** Los bloques y paneles van a 6 px; las píldoras se quedan solo en
  botones y conmutadores. Dentro de la app, las tarjetas de papel llevan el
  mismo bisel (`.tarjeta`) según el tema.
- **Responsive.** El héroe apila el bloque bajo el titular en pantallas
  estrechas, la cifra gigante y los titulares van con `clamp`, el cara a cara
  y el mosaico apilan, y en móvil el carril se vuelve barra inferior con
  respeto al área segura del sistema.
