'use client';

import { useActionState, useState } from 'react';
import { Form } from 'react-aria-components';
import { Boton } from '@/components/ui/Boton';
import { CampoClave, NotaObligatorio } from '@/components/ui/Campo';
import { claveNueva, MINIMO_CLAVE } from '@/features/cuenta/acceso';
import { errorDe } from '@/lib/validacion';
import { cambiarClave, type EstadoAcceso } from '../entrar/acciones';

export function FormularioNuevaClave({ email }: { email?: string }) {
  const [estado, enviar, enviando] = useActionState(cambiarClave, { ok: false } as EstadoAcceso);
  const [clave, setClave] = useState('');
  return (
    <Form
      action={enviar}
      validationErrors={estado.ok ? undefined : estado.errores}
      className="tarjeta px-6 py-6"
    >
      <h1 className="display text-[1.75rem] text-tinta">Elige una contraseña nueva</h1>
      {email ? (
        <p className="mt-1 text-[0.9375rem] text-tinta-2">
          Para <strong className="text-tinta">{email}</strong>.
        </p>
      ) : null}
      <div className="mt-6 flex flex-col gap-5">
        <CampoClave
          etiqueta="Contraseña nueva"
          nombre="clave"
          requerido
          autoComplete="new-password"
          valor={clave}
          onCambio={setClave}
          ayuda={`Al menos ${MINIMO_CLAVE} caracteres, con letras y algún número o símbolo.`}
          validar={(v) => errorDe(claveNueva, v)}
        />
        <CampoClave
          etiqueta="Repite la contraseña"
          nombre="repetir"
          requerido
          autoComplete="new-password"
          validar={(v) => (v && v !== clave ? 'Las dos contraseñas no coinciden.' : null)}
        />
      </div>
      {!estado.ok && estado.error ? (
        <p
          role="alert"
          className="mt-5 rounded-r border border-mal/40 bg-mal-suave px-3 py-2 text-[0.875rem] text-mal"
        >
          {estado.error}
        </p>
      ) : null}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <Boton type="submit" variante="esquina" tamano="grande" disabled={enviando}>
          {enviando ? 'Guardando…' : 'Guardar y entrar'}
        </Boton>
        <NotaObligatorio />
      </div>
    </Form>
  );
}
