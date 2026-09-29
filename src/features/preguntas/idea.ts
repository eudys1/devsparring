// "La idea en una frase": la cara de atrás de la tarjeta del repaso relámpago.
// No es algo que leer, es lo que intentas recordar antes de girar
// (plan-estudio-y-banco.md, fase 2). Si la pregunta trae `resumen` revisado, manda
// ese; si no, la primera frase de la respuesta modelo, que casi siempre es la idea.
import type { Pregunta } from './esquema';

const TOPE = 240;

export function ideaEnUnaFrase(p: Pick<Pregunta, 'resumen' | 'respuestaModelo'>): string {
  if (p.resumen) return p.resumen;
  const texto = p.respuestaModelo.replace(/\s+/g, ' ').trim();
  // Fin de frase: punto seguido de espacio y mayúscula, fuera de un bloque de
  // código en línea (los puntos de `obj.metodo()` no cortan).
  let enCodigo = false;
  for (let i = 0; i < texto.length; i++) {
    const c = texto[i];
    if (c === '`') enCodigo = !enCodigo;
    if (
      !enCodigo &&
      c === '.' &&
      texto[i + 1] === ' ' &&
      /[A-ZÁÉÍÓÚÑ¿¡`]/.test(texto[i + 2] ?? '')
    ) {
      const frase = texto.slice(0, i + 1);
      if (frase.length >= 40) return recortar(frase);
    }
  }
  return recortar(texto);
}

function recortar(t: string): string {
  if (t.length <= TOPE) return t;
  const corte = t.lastIndexOf(' ', TOPE - 1);
  return `${t.slice(0, corte > 0 ? corte : TOPE - 1)}…`;
}
