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
  flash: { nombre: 'Flash', frase: 'Teoría rápida, respuesta corta', minutos: '5 min' },
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
