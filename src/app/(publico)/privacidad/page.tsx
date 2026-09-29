import type { Metadata } from 'next';
import { TITULAR } from '@/lib/sitio';
import { PaginaLegal } from '../PaginaLegal';

export const metadata: Metadata = {
  title: 'Privacidad',
  description:
    'Qué datos guarda Devsparring, para qué, con quién los comparte y cómo borrarlos. Tu clave de API nunca sale de tu navegador salvo para corregir.',
  alternates: { canonical: '/privacidad' },
};

export default function Privacidad() {
  return (
    <PaginaLegal titulo="Privacidad" actualizada="29 de septiembre de 2026">
      <h2>Quién trata tus datos</h2>
      <p>
        Devsparring es un proyecto personal de {TITULAR.nombre}. Para cualquier cuestión sobre tus
        datos, escribe por el canal de contacto del{' '}
        <a href={TITULAR.contacto}>repositorio del proyecto</a>.
      </p>

      <h2>Qué datos guardamos y para qué</h2>
      <ul>
        <li>
          <strong>Tu correo y tu contraseña</strong>, para crear la cuenta y dejarte entrar.
          Supabase guarda la contraseña como hash, nunca en claro.
        </li>
        <li>
          <strong>Tu perfil</strong>: nombre si lo pones, rol, nivel e idioma por defecto.
        </li>
        <li>
          <strong>Tu práctica</strong>: las sesiones, lo que respondes, la nota y la corrección de
          cada respuesta, y el calendario de repaso de cada pregunta.
        </li>
        <li>
          <strong>Tu registro de entrevistas</strong>, si lo usas: empresa, rol, fecha, preguntas y
          notas que tú apuntas.
        </li>
      </ul>
      <p>
        Todo sirve para una sola cosa: que puedas practicar y repasar. La base legal es prestarte el
        servicio que pides al crear la cuenta (artículo 6.1.b del RGPD). No hay publicidad, no se
        venden datos y no se usan para nada más.
      </p>
      <p>La demo sin cuenta no guarda nada.</p>

      <h2>Tu clave de API</h2>
      <p>
        Si corriges con IA, tu clave de Anthropic se guarda solo en el almacenamiento de tu
        navegador. Viaja con cada corrección al servidor, que la usa para esa llamada y no la
        escribe en base de datos, disco ni registros.
      </p>

      <h2>Con quién se comparten</h2>
      <ul>
        <li>
          <strong>Supabase</strong> guarda la base de datos y gestiona el acceso a tu cuenta.
        </li>
        <li>
          <strong>Vercel</strong> aloja la web.
        </li>
        <li>
          <strong>Anthropic</strong> recibe la pregunta y tu respuesta solo cuando pides una
          corrección con IA, con tu propia clave y bajo tus condiciones con ellos.
        </li>
      </ul>

      <h2>Cookies y almacenamiento del navegador</h2>
      <p>
        Solo hay cookies técnicas: las de la sesión, sin las que no podrías seguir dentro. Tus
        preferencias (tema claro u oscuro, menú compacto, opciones de práctica) se guardan en el
        almacenamiento de tu navegador y no se envían a ningún sitio. No hay analítica ni
        publicidad, así que no hace falta pedirte consentimiento.
      </p>

      <h2>Cuánto tiempo</h2>
      <p>
        Mientras tengas cuenta. Si pides borrarla, se borran contigo el perfil, la práctica, el
        repaso y el registro de entrevistas.
      </p>

      <h2>Tus derechos</h2>
      <p>
        Puedes pedir acceder a tus datos, corregirlos, borrarlos, llevártelos, limitar su uso u
        oponerte a él, por el mismo canal de contacto. Si crees que no se atiende bien tu petición,
        puedes reclamar ante la{' '}
        <a href="https://www.aepd.es">Agencia Española de Protección de Datos</a>.
      </p>
    </PaginaLegal>
  );
}
