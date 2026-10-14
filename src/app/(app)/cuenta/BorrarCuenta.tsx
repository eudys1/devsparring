'use client';

// Borrar la cuenta entera: lo que promete la página de privacidad, sin tener
// que pedirlo por otro canal. Explica antes qué se pierde y pide escribir tu
// correo; el servidor lo vuelve a comprobar y borra solo al usuario de la sesión.
import { useActionState, useState } from 'react';
import { Form } from 'react-aria-components';
import { Boton } from '@/components/ui/Boton';
import { CampoTexto } from '@/components/ui/Campo';
import { Dialogo } from '@/components/ui/Dialogo';
import type { ResultadoForm } from '@/lib/validacion';
import { borrarCuenta } from './acciones';

export function BorrarCuenta({ email }: { email: string }) {
  const [abierto, setAbierto] = useState(false);
  // Si sale bien, la acción redirige a la portada: aquí solo llegan errores.
  const [estado, enviar, enviando] = useActionState(borrarCuenta, { ok: false } as ResultadoForm);

  return (
    <div className="mt-5 border-t border-linea pt-5">
      <h3 className="text-[1rem] font-semibold text-tinta">Borrar tu cuenta</h3>
      <p className="mt-1 text-[0.875rem] text-tinta-2">
        Te vas del todo: se borra la cuenta y todo lo que hay en ella. Tu clave de API no se guarda
        en ningún servidor, así que no hay nada más que borrar.
      </p>
      <Boton
        variante="peligro"
        className="mt-4"
        data-prueba="abrir-borrar-cuenta"
        onClick={() => setAbierto(true)}
      >
        Borrar mi cuenta…
      </Boton>

      <Dialogo
        abierto={abierto}
        onCerrar={() => setAbierto(false)}
        titulo="¿Borrar tu cuenta?"
        rol="alertdialog"
      >
        <div className="text-[0.9375rem] text-tinta-2">
          <p>Se borra para siempre, sin forma de recuperarlo:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>tu cuenta: ya no podrás entrar con {email};</li>
            <li>tu perfil y tu stack;</li>
            <li>todas tus respuestas, repasos, sesiones e informes;</li>
            <li>tu registro de entrevistas reales.</li>
          </ul>
          <p className="mt-3">
            Si solo quieres empezar de cero, usa mejor «Borrar mis datos de práctica».
          </p>
        </div>

        <Form
          action={enviar}
          validationErrors={estado.ok ? undefined : estado.errores}
          className="flex flex-col gap-4"
        >
          <CampoTexto
            etiqueta="Escribe tu correo para confirmar"
            nombre="confirmacion"
            tipo="email"
            requerido
            autoComplete="off"
            placeholder={email}
            validar={(v) =>
              v && v.trim().toLowerCase() !== email.toLowerCase()
                ? 'No coincide con el correo de tu cuenta. Escríbelo tal cual.'
                : null
            }
          />
          {!estado.ok && estado.error ? (
            <p role="alert" className="text-[0.875rem] text-mal">
              {estado.error}
            </p>
          ) : null}
          <div className="flex flex-wrap justify-end gap-2">
            <Boton variante="normal" onClick={() => setAbierto(false)}>
              Cancelar
            </Boton>
            <Boton
              type="submit"
              variante="peligro"
              disabled={enviando}
              data-prueba="confirmar-borrar-cuenta"
            >
              {enviando ? 'Borrando…' : 'Borrar mi cuenta para siempre'}
            </Boton>
          </div>
        </Form>
      </Dialogo>
    </div>
  );
}
