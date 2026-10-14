'use client';

// Entrar, crear cuenta y recuperar la contraseña, como los formularios de
// cualquier web: pestañas arriba, la contraseña con ver/ocultar, repetirla al
// crear la cuenta, "¿Olvidaste tu contraseña?" y los errores junto al campo.
// Cada campo se valida al salir de él con el mismo esquema que usa el servidor.
import Link from 'next/link';
import { useActionState, useState } from 'react';
import { Form } from 'react-aria-components';
import { Boton } from '@/components/ui/Boton';
import { CampoClave, CampoTexto, NotaObligatorio } from '@/components/ui/Campo';
import { claveNueva, correo, MINIMO_CLAVE } from '@/features/cuenta/acceso';
import { errorDe } from '@/lib/validacion';
import { entrar, recuperar, registrar, type EstadoAcceso } from './acciones';

export type ModoAcceso = 'entrar' | 'registro' | 'olvido';

const INICIAL: EstadoAcceso = { ok: false };

export function FormularioAcceso({ modo, volver }: { modo: ModoAcceso; volver: string }) {
  const accion = modo === 'registro' ? registrar : modo === 'olvido' ? recuperar : entrar;
  const [estado, enviar, enviando] = useActionState(accion, INICIAL);
  const [clave, setClave] = useState('');
  const conVolver = (m: ModoAcceso) => {
    const p = new URLSearchParams();
    if (m !== 'entrar') p.set('modo', m);
    if (volver !== '/inicio') p.set('volver', volver);
    const q = p.toString();
    return `/entrar${q ? `?${q}` : ''}`;
  };

  if (estado.ok && estado.aviso) {
    return (
      <div className="tarjeta px-6 py-6" role="status">
        <h1 className="display text-[1.75rem] text-tinta">Revisa tu correo</h1>
        <p className="mt-2 text-tinta-2">
          {estado.aviso === 'confirmar' ? (
            <>
              Te hemos enviado un enlace a <strong className="text-tinta">{estado.email}</strong>.
              Ábrelo para confirmar la cuenta y entrarás directamente.
            </>
          ) : (
            <>
              Si hay una cuenta con <strong className="text-tinta">{estado.email}</strong>, te
              llegará un enlace para elegir una contraseña nueva. Mira también en spam.
            </>
          )}
        </p>
        <Link
          href={conVolver('entrar')}
          className="mt-5 inline-block text-[0.875rem] text-tinta-2 underline decoration-linea-fuerte underline-offset-2 hover:text-tinta"
        >
          Volver a entrar
        </Link>
      </div>
    );
  }

  return (
    <div className="tarjeta overflow-hidden">
      {modo !== 'olvido' ? (
        <nav aria-label="Acceso" className="grid grid-cols-2 border-b border-linea">
          {(['entrar', 'registro'] as const).map((m) => (
            <Link
              key={m}
              href={conVolver(m)}
              aria-current={modo === m ? 'page' : undefined}
              className="relative px-4 py-3.5 text-center text-[0.9375rem] font-semibold text-tinta-2 transition-colors duration-[160ms] ease-salida hover:text-tinta aria-[current=page]:text-tinta aria-[current=page]:after:absolute aria-[current=page]:after:inset-x-4 aria-[current=page]:after:bottom-0 aria-[current=page]:after:h-[3px] aria-[current=page]:after:rounded-t aria-[current=page]:after:bg-punto"
            >
              {m === 'entrar' ? 'Entrar' : 'Crear cuenta'}
            </Link>
          ))}
        </nav>
      ) : null}

      <Form
        action={enviar}
        validationErrors={estado.ok ? undefined : estado.errores}
        className="px-6 py-6"
      >
        <h1 className="display text-[1.75rem] text-tinta">
          {modo === 'registro'
            ? 'Crea tu cuenta'
            : modo === 'olvido'
              ? 'Recupera tu contraseña'
              : 'Entra'}
        </h1>
        <p className="mt-1 text-[0.9375rem] text-tinta-2">
          {modo === 'registro'
            ? 'Con tu correo y una contraseña. La clave de la API de Claude se añade después, en Cuenta, y se queda en tu navegador.'
            : modo === 'olvido'
              ? 'Escribe el correo de tu cuenta y te mandamos un enlace para elegir una contraseña nueva.'
              : 'Con tu correo y tu contraseña.'}
        </p>

        <input type="hidden" name="volver" value={volver} />

        <div className="mt-6 flex flex-col gap-5">
          <CampoTexto
            etiqueta="Correo"
            nombre="email"
            tipo="email"
            autoComplete="email"
            requerido
            autoFocus
            validar={(v) => errorDe(correo, v)}
          />
          {modo !== 'olvido' ? (
            <div className="flex flex-col gap-1.5">
              <CampoClave
                etiqueta="Contraseña"
                nombre="clave"
                requerido
                autoComplete={modo === 'registro' ? 'new-password' : 'current-password'}
                valor={clave}
                onCambio={setClave}
                ayuda={
                  modo === 'registro'
                    ? `Al menos ${MINIMO_CLAVE} caracteres, con letras y algún número o símbolo.`
                    : undefined
                }
                validar={(v) =>
                  modo === 'registro' ? errorDe(claveNueva, v) : v ? null : 'Falta la contraseña.'
                }
              />
              {modo === 'entrar' ? (
                <Link
                  href={conVolver('olvido')}
                  className="self-end text-[0.8125rem] text-tinta-2 underline decoration-linea-fuerte underline-offset-2 hover:text-tinta"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              ) : null}
            </div>
          ) : null}
          {modo === 'registro' ? (
            <CampoClave
              etiqueta="Repite la contraseña"
              nombre="repetir"
              requerido
              autoComplete="new-password"
              validar={(v) => (v && v !== clave ? 'Las dos contraseñas no coinciden.' : null)}
            />
          ) : null}
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
          <Boton
            type="submit"
            variante="esquina"
            tamano="grande"
            disabled={enviando}
            data-prueba="enviar-acceso"
          >
            {enviando
              ? 'Un momento…'
              : modo === 'registro'
                ? 'Crear cuenta'
                : modo === 'olvido'
                  ? 'Enviar enlace'
                  : 'Entrar'}
          </Boton>
          {modo === 'olvido' ? (
            <Link
              href={conVolver('entrar')}
              className="text-[0.875rem] text-tinta-2 underline decoration-linea-fuerte underline-offset-2 hover:text-tinta"
            >
              Volver a entrar
            </Link>
          ) : (
            <NotaObligatorio />
          )}
        </div>
      </Form>
    </div>
  );
}
