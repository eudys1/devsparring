'use client';

// Empezar de cero: borra la práctica (respuestas, repasos, calendario de cada
// pregunta y sesiones) y, si se marca, el registro de entrevistas. Explica antes
// qué se pierde y pide escribir la palabra: un clic de más no puede costar meses
// de repasos. El servidor vuelve a comprobar la palabra.
import { useRouter } from 'next/navigation';
import { useActionState, useState } from 'react';
import { Form } from 'react-aria-components';
import { Boton } from '@/components/ui/Boton';
import { CampoTexto, Casilla } from '@/components/ui/Campo';
import { Dialogo } from '@/components/ui/Dialogo';
import { PALABRA_BORRAR } from '@/features/cuenta/perfil';
import type { ResultadoForm } from '@/lib/validacion';
import { borrarDatos } from './acciones';
import { BorrarCuenta } from './BorrarCuenta';

export function BorrarDatos({ email }: { email: string }) {
  const router = useRouter();
  const [abierto, setAbierto] = useState(false);
  const [entrevistas, setEntrevistas] = useState(false);
  // Al terminar bien se cierra y se refresca todo: Inicio ya no tiene racha.
  const [estado, enviar, enviando] = useActionState(
    async (previo: ResultadoForm, form: FormData) => {
      const r = await borrarDatos(previo, form);
      if (r.ok) {
        setAbierto(false);
        router.refresh();
      }
      return r;
    },
    { ok: false } as ResultadoForm,
  );

  return (
    <section className="tarjeta border-mal/40 px-6 py-6">
      <h2 className="text-[1.25rem] font-semibold text-tinta">Borrar tus datos</h2>
      <p className="mt-1 text-[0.875rem] text-tinta-2">
        Borra lo que has practicado y vuelve a empezar con el banco entero por delante. Tu cuenta,
        tu perfil y tu clave se quedan.
      </p>
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <Boton variante="peligro" data-prueba="abrir-borrar" onClick={() => setAbierto(true)}>
          Borrar mis datos de práctica…
        </Boton>
        <span aria-live="polite" className="text-[0.875rem] text-ok">
          {estado.ok ? estado.aviso : ''}
        </span>
      </div>

      <Dialogo
        abierto={abierto}
        onCerrar={() => setAbierto(false)}
        titulo="¿Borrar tus datos de práctica?"
        rol="alertdialog"
      >
        <div className="text-[0.9375rem] text-tinta-2">
          <p>Se borra para siempre, sin forma de recuperarlo:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>todas tus respuestas, notas y correcciones;</li>
            <li>
              el calendario de repaso de cada pregunta: todas vuelven a ser nuevas y desaparecen los
              repasos pendientes;
            </li>
            <li>tus sesiones, también las que tengas a medias;</li>
            <li>la racha y las cifras de Inicio.</li>
          </ul>
          <p className="mt-3">Se quedan tu cuenta, tu perfil, tu stack y tu clave de API.</p>
        </div>

        <Form
          action={enviar}
          validationErrors={estado.ok ? undefined : estado.errores}
          className="flex flex-col gap-4"
        >
          <Casilla marcada={entrevistas} onCambio={setEntrevistas}>
            Borrar también mi registro de entrevistas reales
          </Casilla>
          <input type="hidden" name="entrevistas" value={entrevistas ? 'si' : 'no'} />
          <CampoTexto
            etiqueta={`Escribe ${PALABRA_BORRAR} para confirmar`}
            nombre="confirmacion"
            requerido
            autoComplete="off"
            validar={(v) =>
              v && v.trim().toUpperCase() !== PALABRA_BORRAR
                ? `Escribe ${PALABRA_BORRAR}, tal cual, para confirmar.`
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
              data-prueba="confirmar-borrar"
            >
              {enviando ? 'Borrando…' : 'Borrar para siempre'}
            </Boton>
          </div>
        </Form>
      </Dialogo>

      <BorrarCuenta email={email} />
    </section>
  );
}
