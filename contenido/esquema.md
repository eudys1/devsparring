# Formato del banco de preguntas

Cada fichero de `contenido/pistas/<pista>/<familia>.json` contiene las preguntas
de una familia. El contrato exacto está en `src/features/preguntas/esquema.ts`
(zod) y se comprueba con `pnpm contenido:validar`. Nada entra sin pasar el
validador y sin revisión humana en una pull request.

## Pistas

`fundamentos`, `javascript`, `typescript`, `react`, `nextjs`, `web`, `node`,
`datos`, `arquitectura`, `devops`, `ia`, `comportamental`.

## Tipos y modos

| `tipo`           | Qué es                                                                     | `modos` habituales |
| ---------------- | -------------------------------------------------------------------------- | ------------------ |
| `definicion`     | "¿Qué es X?"                                                               | `flash`, `verbal`  |
| `fundamento`     | "¿Para qué sirve X, cuándo lo usarías, qué problema resuelve?"             | `flash`, `verbal`  |
| `razonamiento`   | "¿Cómo harías X?" con datos concretos (100.000 pedidos, 1 millón de filas) | `verbal`, `diseno` |
| `kata`           | Ejercicio de código con casos de prueba ejecutables                        | `kata`             |
| `review`         | Fragmento de código con problemas plantados; el candidato los encuentra    | `review`           |
| `diseno`         | Diseño de sistemas o de API                                                | `diseno`           |
| `comportamental` | Situaciones (STAR) y screening de RRHH                                     | `star`             |

## Reglas de redacción

- `texto.es` es la pregunta tal como la haría un entrevistador en España.
  `texto.en` es cómo se preguntaría en inglés, no una traducción literal.
- Términos técnicos en inglés como se usan en la industria (closure, event loop).
- `rubrica.junior` y `rubrica.senior` son listas de criterios observables, en
  infinitivo o en tercera persona ("Define…", "Menciona…", "Da la complejidad").
  La senior incluye siempre lo de la junior y añade profundidad: complejidad,
  alternativas descartadas, cómo lo probaría, cómo escala, lo explica sin que se lo pidan.
- `respuestaModelo` es markdown: qué dice una respuesta que aprueba, sin
  copiar texto literal de fuentes con licencia restrictiva.
- `fuentes`: al menos una, con `url`, `fecha` (AAAA-MM-DD, cuándo se verificó)
  y `tipo` (`leida` si se leyó la página, `resumen` si solo el resumen del buscador).
- `origen`: `curada` (tomada y adaptada de una fuente con licencia que lo
  permite), `generada-revisada` (redactada a partir de fuentes y revisada por
  una persona), `entrevista-real` (la contó alguien que la vivió).
- `estado`: `borrador` hasta que una persona la revisa; `publicada`; `obsoleta`
  con `motivoObsoleta`.
- `id`: slug estable con prefijo de pista (`js-closures-01`). Nunca cambia.
  `version` sube al cambiar texto o rúbrica.

## Katas

`kata.funcion` es el nombre de la función exportada. `kata.casos` son casos
serializables: `entrada` es la lista de argumentos y `esperado` el resultado
comparado estructuralmente; `lanza` (texto del error) sustituye a `esperado`
cuando se espera excepción. Solo tipos serializables en JSON (sin funciones,
fechas ni Map en los casos; si el ejercicio los necesita, se describen en
`contexto` y se comprueban con `lanza` o con un resultado derivado).

## Ejemplo mínimo

```json
{
  "pista": "javascript",
  "familia": "closures",
  "preguntas": [
    {
      "id": "js-closures-01",
      "version": 1,
      "pista": "javascript",
      "familia": "closures",
      "tipo": "definicion",
      "modos": ["flash", "verbal"],
      "nivelMinimo": "junior",
      "frecuencia": "alta",
      "texto": {
        "es": "¿Qué es un closure y para qué lo has usado?",
        "en": "What is a closure and when have you used one?"
      },
      "rubrica": {
        "junior": [
          "Define closure como función que conserva su ámbito léxico",
          "Da un ejemplo (contador, callback)"
        ],
        "senior": [
          "Lo anterior",
          "Explica el riesgo de fugas de memoria y de capturar variables de bucle",
          "Relaciona con módulos y con hooks de React"
        ]
      },
      "respuestaModelo": "Una función que recuerda las variables del ámbito donde se creó aunque se ejecute fuera de él…",
      "etiquetas": ["scope"],
      "fuentes": [
        {
          "url": "https://github.com/lydiahallie/javascript-questions",
          "fecha": "2026-09-14",
          "tipo": "leida"
        }
      ],
      "origen": "curada",
      "estado": "publicada"
    }
  ]
}
```
