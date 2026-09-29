import { describe, expect, it } from 'vitest';
import { enlaceReportar } from './reportar';

const pregunta = {
  id: 'js-event-loop',
  version: 3,
  pista: 'javascript' as const,
  texto: { es: '¿Qué es el event loop & por qué importa?', en: 'What is the event loop?' },
};

describe('enlaceReportar', () => {
  it('abre un issue nuevo del repositorio con el id en el título', () => {
    const url = new URL(enlaceReportar(pregunta, 'el temario'));
    expect(url.origin + url.pathname).toBe('https://github.com/eudys1/devsparring/issues/new');
    expect(url.searchParams.get('title')).toBe('Pregunta mal: js-event-loop');
  });

  it('lleva en el cuerpo el texto, la versión y dónde se vio, sin romper la URL', () => {
    const cuerpo = new URL(enlaceReportar(pregunta, 'una sesión de Kata')).searchParams.get('body');
    expect(cuerpo).toContain('¿Qué es el event loop & por qué importa?');
    expect(cuerpo).toContain('versión 3, pista javascript');
    expect(cuerpo).toContain('una sesión de Kata');
  });
});
