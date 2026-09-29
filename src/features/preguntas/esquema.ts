// Esquema del banco de preguntas. Es el contrato entre contenido/ (JSON revisado
// por PR), el barrido automático y la app. Cualquier cambio aquí sube la
// versión de las preguntas afectadas y se documenta en contenido/esquema.md.
import { z } from 'zod';

export const PISTAS = [
  'fundamentos',
  'javascript',
  'typescript',
  'react',
  'nextjs',
  'web',
  'node',
  'datos',
  'arquitectura',
  'devops',
  'ia',
  'comportamental',
] as const;

export const TIPOS = [
  'definicion',
  'fundamento',
  'razonamiento',
  'kata',
  'review',
  'diseno',
  'comportamental',
] as const;

export const MODOS = ['flash', 'verbal', 'kata', 'review', 'diseno', 'star'] as const;

export const NIVELES = ['junior', 'mid', 'senior'] as const;

export const FRECUENCIAS = ['alta', 'media', 'baja'] as const;

export const ORIGENES = ['curada', 'generada-revisada', 'entrevista-real'] as const;

// Un caso de prueba serializable: la función bajo prueba se llama con `entrada`
// (argumentos en orden) y el resultado se compara estructuralmente con `esperado`.
const CasoPrueba = z.object({
  nombre: z.string().min(1),
  entrada: z.array(z.unknown()),
  esperado: z.unknown(),
  // Si el caso espera excepción, se indica el texto (o parte) del mensaje.
  lanza: z.string().optional(),
});

const Kata = z.object({
  // Nombre de la función exportada que ejecutan los casos de prueba.
  funcion: z.string().regex(/^[A-Za-z_$][\w$]*$/),
  codigoInicial: z.string(),
  casos: z.array(CasoPrueba).min(1),
  tiempoMin: z.number().int().positive(),
  // true cuando el ejercicio necesita Math.random o Date.now deterministas.
  congelarAleatorio: z.boolean().default(false),
});

const Fuente = z.object({
  url: z.string().url(),
  fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  // 'leida': la página se leyó entera. 'resumen': solo el resumen del buscador.
  tipo: z.enum(['leida', 'resumen']),
  nota: z.string().optional(),
});

// Tipo test: cuatro opciones cortas, una correcta, y el porqué de CADA una. Sin
// el porqué de los distractores el modo enseña el error (plan-estudio-y-banco.md,
// fase 1, condición innegociable). Se generan una vez y se revisan por PR.
const OpcionTest = z.object({
  texto: z.string().min(1).max(140),
  porque: z.string().min(20).max(320),
});
const Test = z.object({
  // La pregunta concreta a la que responden las opciones, cuando la original pide
  // varias cosas o un ejemplo propio. Sin él se usa el texto de la pregunta.
  enunciado: z.string().min(10).max(220).optional(),
  opciones: z.array(OpcionTest).length(4),
  correcta: z.number().int().min(0).max(3),
});
export type Test = z.infer<typeof Test>;

const Rubrica = z.object({
  junior: z.array(z.string().min(1)).min(1),
  senior: z.array(z.string().min(1)).min(1),
});

export const Pregunta = z
  .object({
    id: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'slug en minúsculas con guiones'),
    version: z.number().int().positive(),
    pista: z.enum(PISTAS),
    familia: z.string().min(1),
    tipo: z.enum(TIPOS),
    modos: z.array(z.enum(MODOS)).min(1),
    nivelMinimo: z.enum(NIVELES),
    frecuencia: z.enum(FRECUENCIAS),
    texto: z.object({ es: z.string().min(1), en: z.string().min(1) }),
    contexto: z.string().optional(),
    rubrica: Rubrica,
    respuestaModelo: z.string().min(1),
    // La idea en una frase: la cara de atrás del repaso relámpago. Opcional; sin
    // ella se usa la primera frase de respuestaModelo (idea.ts).
    resumen: z.string().min(20).max(240).optional(),
    kata: Kata.optional(),
    test: Test.optional(),
    etiquetas: z.array(z.string()).default([]),
    fuentes: z.array(Fuente).min(1),
    origen: z.enum(ORIGENES),
    estado: z.enum(['borrador', 'publicada', 'obsoleta']),
    motivoObsoleta: z.string().optional(),
  })
  .superRefine((p, ctx) => {
    if (p.tipo === 'kata' && !p.kata) {
      ctx.addIssue({
        code: 'custom',
        path: ['kata'],
        message: 'Una kata necesita el bloque kata.',
      });
    }
    if (p.tipo !== 'kata' && p.kata) {
      ctx.addIssue({
        code: 'custom',
        path: ['kata'],
        message: 'Solo el tipo kata lleva bloque kata.',
      });
    }
    if (p.modos.includes('kata') && p.tipo !== 'kata') {
      ctx.addIssue({ code: 'custom', path: ['modos'], message: 'El modo kata exige tipo kata.' });
    }
    if (p.test && p.tipo !== 'definicion' && p.tipo !== 'fundamento') {
      ctx.addIssue({
        code: 'custom',
        path: ['test'],
        message: 'Tipo test solo para preguntas de definición o fundamento.',
      });
    }
    if (p.test && !p.modos.includes('flash')) {
      ctx.addIssue({
        code: 'custom',
        path: ['modos'],
        message: 'Una pregunta con opciones de test tiene que estar en el modo flash (Tipo test).',
      });
    }
    if (p.test && new Set(p.test.opciones.map((o) => o.texto.trim())).size < 4) {
      ctx.addIssue({
        code: 'custom',
        path: ['test'],
        message: 'Las cuatro opciones son distintas.',
      });
    }
    if (p.estado === 'obsoleta' && !p.motivoObsoleta) {
      ctx.addIssue({
        code: 'custom',
        path: ['motivoObsoleta'],
        message: 'Una pregunta obsoleta explica por qué.',
      });
    }
  });

export type Pregunta = z.infer<typeof Pregunta>;
export type Pista = (typeof PISTAS)[number];
export type Tipo = (typeof TIPOS)[number];
export type Modo = (typeof MODOS)[number];
export type Nivel = (typeof NIVELES)[number];
export type CasoPrueba = z.infer<typeof CasoPrueba>;

// Un fichero de contenido/ es una lista de preguntas de la misma pista y familia.
export const FicheroPreguntas = z.object({
  pista: z.enum(PISTAS),
  familia: z.string().min(1),
  preguntas: z.array(Pregunta).min(1),
});
export type FicheroPreguntas = z.infer<typeof FicheroPreguntas>;
