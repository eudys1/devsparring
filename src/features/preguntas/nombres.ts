// Nombres para pantalla. El núcleo devuelve códigos; aquí se redacta la frase.
import type { Modo, Nivel, Pista, Tipo } from './esquema';

export const NOMBRE_PISTA: Record<Pista, string> = {
  fundamentos: 'Fundamentos',
  javascript: 'JavaScript',
  typescript: 'TypeScript',
  react: 'React',
  nextjs: 'Next.js',
  web: 'Web y HTTP',
  node: 'Node',
  datos: 'Datos y SQL',
  arquitectura: 'Arquitectura',
  devops: 'DevOps',
  ia: 'IA para devs',
  comportamental: 'Comportamental',
};

export const NOMBRE_MODO: Record<Modo, { nombre: string; frase: string; minutos: string }> = {
  flash: {
    nombre: 'Tipo test',
    frase: 'Cuatro opciones y el porqué de cada una',
    minutos: '5 min',
  },
  verbal: {
    nombre: 'Explicar',
    frase: 'Razonamiento con respuesta desarrollada, y te repreguntan',
    minutos: '10 min',
  },
  kata: { nombre: 'Kata', frase: 'Código con reloj y tests', minutos: '20 a 45 min' },
  review: {
    nombre: 'Revisión',
    frase: 'Encuentra lo que falla en código ajeno',
    minutos: '20 min',
  },
  diseno: {
    nombre: 'Diseño',
    frase: 'Sistemas y APIs: requisitos y trade-offs',
    minutos: '30 min',
  },
  star: { nombre: 'STAR', frase: 'Situaciones: conflicto, error, plazo', minutos: '10 min' },
};

export const NOMBRE_NIVEL: Record<Nivel, string> = {
  junior: 'Junior',
  mid: 'Mid',
  senior: 'Senior',
};

export const NOMBRE_TIPO: Record<Tipo, string> = {
  definicion: 'Definición',
  fundamento: 'Fundamento',
  razonamiento: 'Razonamiento',
  kata: 'Kata',
  review: 'Revisión de código',
  diseno: 'Diseño',
  comportamental: 'Comportamental',
};

// Las familias son identificadores del banco; aquí su nombre para pantalla.
// Una familia nueva sin entrada se pinta a partir del identificador.
export const NOMBRE_FAMILIA: Record<string, string> = {
  'agentes-tools': 'Agentes y herramientas',
  algoritmos: 'Algoritmos',
  'api-rest-graphql': 'API REST y GraphQL',
  apis: 'APIs',
  'app-router': 'App Router',
  'arrays-objetos': 'Arrays y objetos',
  asincronia: 'Asincronía',
  autenticacion: 'Autenticación',
  cache: 'Caché',
  'ci-cd': 'CI/CD',
  clases: 'Clases',
  'clean-code': 'Código limpio',
  closures: 'Closures',
  cloud: 'Cloud',
  concurrencia: 'Concurrencia',
  configuracion: 'Configuración',
  'coste-latencia': 'Coste y latencia',
  'criterio-tecnico': 'Criterio técnico',
  css: 'CSS',
  despliegue: 'Despliegue',
  'diseno-sistemas': 'Diseño de sistemas',
  docker: 'Docker',
  'dom-eventos': 'DOM y eventos',
  embeddings: 'Embeddings',
  'errores-validacion': 'Errores y validación',
  'es-moderno': 'JavaScript moderno',
  escalado: 'Escalado',
  estado: 'Estado',
  'evals-alucinaciones': 'Evals y alucinaciones',
  'event-loop': 'Event loop',
  'fine-tuning-eleccion': 'Fine-tuning y elegir modelo',
  frameworks: 'Frameworks',
  funcional: 'Programación funcional',
  'funciones-avanzadas': 'Funciones avanzadas',
  genericos: 'Genéricos',
  git: 'Git',
  hooks: 'Hooks',
  http: 'HTTP',
  indices: 'Índices',
  ingles: 'En inglés',
  'llm-fundamentos': 'Fundamentos de LLM',
  mcp: 'MCP',
  memoria: 'Memoria',
  modelado: 'Modelado de datos',
  modulos: 'Módulos',
  'monolito-servicios': 'Monolito y servicios',
  narrowing: 'Narrowing',
  'nosql-cache': 'NoSQL y caché',
  observabilidad: 'Observabilidad',
  orm: 'ORM',
  patrones: 'Patrones de diseño',
  'patrones-arquitectura': 'Patrones de arquitectura',
  poo: 'Programación orientada a objetos',
  produccion: 'Producción',
  'prompt-engineering': 'Prompt engineering',
  rag: 'RAG',
  razonamiento: 'Razonamiento',
  renderizado: 'Renderizado',
  rendimiento: 'Rendimiento',
  rrhh: 'Entrevista con RRHH',
  'scope-hoisting': 'Scope y hoisting',
  seguridad: 'Seguridad',
  'server-components': 'Server Components',
  solid: 'SOLID',
  sql: 'SQL',
  star: 'Situaciones (STAR)',
  'streams-colas': 'Streams y colas',
  supabase: 'Supabase',
  testing: 'Testing',
  'this-prototipos': 'this y prototipos',
  'tipos-coercion': 'Tipos y coerción',
  'tipos-interfaces': 'Tipos e interfaces',
  transacciones: 'Transacciones',
  'uso-diario-ia': 'La IA en el día a día',
  'utility-types': 'Utility types',
  'vector-stores': 'Bases vectoriales',
};

export function nombreFamilia(familia: string): string {
  const nombre = NOMBRE_FAMILIA[familia];
  if (nombre) return nombre;
  const texto = familia.replace(/-/g, ' ');
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}
