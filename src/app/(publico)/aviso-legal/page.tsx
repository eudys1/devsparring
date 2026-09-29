import type { Metadata } from 'next';
import Link from 'next/link';
import { TITULAR } from '@/lib/sitio';
import { PaginaLegal } from '../PaginaLegal';

export const metadata: Metadata = {
  title: 'Aviso legal',
  description:
    'Quién está detrás de Devsparring, cómo contactar, bajo qué licencia está el código y el banco de preguntas, y qué límites tienen las correcciones con IA.',
  alternates: { canonical: '/aviso-legal' },
};

export default function AvisoLegal() {
  return (
    <PaginaLegal titulo="Aviso legal" actualizada="29 de septiembre de 2026">
      <h2>Titular</h2>
      <p>
        Devsparring es un proyecto personal de {TITULAR.nombre}. Contacto: el canal de{' '}
        <a href={TITULAR.contacto}>incidencias del repositorio</a>.
      </p>

      <h2>Qué es</h2>
      <p>
        Una herramienta para entrenar entrevistas técnicas de programación. Es para practicar: no
        está pensada ni se permite usarla como ayuda durante una entrevista real.
      </p>

      <h2>Código y contenido</h2>
      <p>
        El código y el banco de preguntas están publicados con{' '}
        <a href={`${TITULAR.repositorio}/blob/main/LICENSE`}>licencia MIT</a>. Cada pregunta cita
        sus fuentes; los textos enlazados pertenecen a sus autores.
      </p>

      <h2>Límites</h2>
      <p>
        Las respuestas modelo y las correcciones con IA son una ayuda para estudiar, no una
        evaluación oficial. La IA puede equivocarse: si una pregunta o una corrección te parece mal,
        avísalo desde la propia pregunta y se revisa.
      </p>

      <h2>Datos personales</h2>
      <p>
        Cómo se tratan está en la página de <Link href="/privacidad">privacidad</Link>.
      </p>

      <h2>Legislación</h2>
      <p>Este aviso se rige por la legislación española.</p>
    </PaginaLegal>
  );
}
