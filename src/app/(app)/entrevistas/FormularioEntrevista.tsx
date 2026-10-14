'use client';

import { getLocalTimeZone, today } from '@internationalized/date';
import { useActionState, useState } from 'react';
import { Form } from 'react-aria-components';
import { Boton } from '@/components/ui/Boton';
import {
  AreaTexto,
  CampoFecha,
  CampoTexto,
  NotaObligatorio,
  Selector,
} from '@/components/ui/Campo';
import { NIVELES } from '@/features/preguntas/esquema';
import { NOMBRE_NIVEL } from '@/features/preguntas/nombres';
import type { ResultadoForm } from '@/lib/validacion';
import { registrarEntrevista } from './acciones';

export function FormularioEntrevista() {
  // Al guardar se vacía el formulario: se remonta con una clave nueva.
  const [vuelta, setVuelta] = useState(0);
  const [estado, enviar, enviando] = useActionState(
    async (previo: ResultadoForm, form: FormData) => {
      const r = await registrarEntrevista(previo, form);
      if (r.ok) setVuelta((v) => v + 1);
      return r;
    },
    { ok: false } as ResultadoForm,
  );
  // El día local, no el de UTC: con toISOString, de 00:00 a 02:00 en España
  // salía la fecha de ayer.
  const hoy = today(getLocalTimeZone()).toString();

  return (
    <Form
      key={vuelta}
      action={enviar}
      validationErrors={estado.ok ? undefined : estado.errores}
      className="tarjeta h-max px-6 py-6"
    >
      <h2 className="text-[1.25rem] font-semibold text-tinta">Apuntar una entrevista</h2>
      <p className="mt-1 text-[0.875rem] text-tinta-2">Con la empresa y la fecha basta.</p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <CampoTexto
          etiqueta="Empresa"
          nombre="empresa"
          requerido
          maximo={120}
          autoComplete="organization"
          className="sm:col-span-2"
        />
        <CampoTexto
          etiqueta="Puesto"
          nombre="rol"
          placeholder="Fullstack .NET y React"
          maximo={120}
        />
        <Selector
          etiqueta="Nivel"
          nombre="nivel"
          valorInicial="sin"
          opciones={[
            { id: 'sin', texto: 'Sin indicar' },
            ...NIVELES.map((n) => ({ id: n, texto: NOMBRE_NIVEL[n].nombre })),
          ]}
        />
        <CampoFecha etiqueta="Fecha" nombre="fecha" requerido valorInicial={hoy} />
        <CampoTexto
          etiqueta="Formato"
          nombre="formato"
          placeholder="Live coding, 1 h"
          maximo={200}
        />
        <AreaTexto
          etiqueta="Qué te preguntaron"
          nombre="preguntas"
          ayuda="Una pregunta por línea."
          filas={4}
          placeholder={'¿Qué es un índice y cuándo empeora?\nDiseña un acortador de URLs'}
          className="sm:col-span-2"
        />
        <AreaTexto
          etiqueta="Notas"
          nombre="notas"
          filas={3}
          maximo={4000}
          placeholder="Qué fue bien, qué no, qué repasar"
          className="sm:col-span-2"
        />
        <CampoTexto
          etiqueta="Resultado"
          nombre="resultado"
          placeholder="Pasé a la siguiente / No / Pendiente"
          maximo={120}
          className="sm:col-span-2"
        />
      </div>

      {!estado.ok && estado.error ? (
        <p role="alert" className="mt-5 text-[0.875rem] text-mal">
          {estado.error}
        </p>
      ) : null}

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Boton type="submit" variante="esquina" disabled={enviando}>
          {enviando ? 'Guardando…' : 'Guardar'}
        </Boton>
        <NotaObligatorio />
        <span aria-live="polite" className="text-[0.875rem] text-ok">
          {estado.ok ? estado.aviso : ''}
        </span>
      </div>
    </Form>
  );
}
