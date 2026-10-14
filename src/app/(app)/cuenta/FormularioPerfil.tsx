'use client';

import { useActionState } from 'react';
import { Form } from 'react-aria-components';
import { Boton } from '@/components/ui/Boton';
import { CampoTexto, Casilla, Selector } from '@/components/ui/Campo';
import type { Perfil } from '@/features/cuenta/db';
import { NIVELES, PISTAS } from '@/features/preguntas/esquema';
import { NOMBRE_NIVEL, NOMBRE_PISTA } from '@/features/preguntas/nombres';
import type { ResultadoForm } from '@/lib/validacion';
import { guardarPerfil } from './acciones';

export function FormularioPerfil({ perfil }: { perfil: Perfil }) {
  const [estado, enviar, enviando] = useActionState(guardarPerfil, { ok: false } as ResultadoForm);
  return (
    <Form
      action={enviar}
      validationErrors={estado.ok ? undefined : estado.errores}
      className="tarjeta h-max px-6 py-6"
    >
      <h2 className="text-[1.25rem] font-semibold text-tinta">Perfil</h2>
      <p className="mt-1 text-[0.875rem] text-tinta-2">
        Con esto arranca cada sesión: tu nivel, tu idioma y las pistas en las que te centras.
      </p>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <CampoTexto
          etiqueta="Nombre"
          nombre="nombre"
          autoComplete="given-name"
          valorInicial={perfil.nombre ?? ''}
          maximo={60}
          ayuda="Para saludarte en Inicio. Opcional."
        />
        <CampoTexto
          etiqueta="Puesto al que aplicas"
          nombre="rol_objetivo"
          requerido
          valorInicial={perfil.rol_objetivo}
          minimo={2}
          maximo={80}
          placeholder="Fullstack .NET y React"
        />
        <Selector
          etiqueta="Nivel por defecto"
          nombre="nivel_por_defecto"
          requerido
          valorInicial={perfil.nivel_por_defecto}
          opciones={NIVELES.map((n) => ({
            id: n,
            texto: NOMBRE_NIVEL[n].nombre,
            detalle: NOMBRE_NIVEL[n].detalle,
          }))}
        />
        <Selector
          etiqueta="Idioma por defecto"
          nombre="idioma"
          requerido
          valorInicial={perfil.idioma}
          opciones={[
            { id: 'es', texto: 'Español' },
            { id: 'en', texto: 'Inglés', detalle: 'Para entrevistas en inglés' },
          ]}
        />
      </div>

      <fieldset className="mt-7 border-t border-linea pt-5">
        <legend className="text-[0.9375rem] font-semibold text-tinta">Tu stack</legend>
        <p className="mt-1 text-[0.875rem] text-tinta-2">
          Las sesiones con «Todas las pistas» salen solo de las que marques. Sin marcar ninguna,
          salen de todas.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3">
          {PISTAS.map((p) => (
            <Casilla
              key={p}
              nombre="pistas_foco"
              valor={p}
              marcadaInicial={perfil.pistas_foco.includes(p)}
            >
              {NOMBRE_PISTA[p]}
            </Casilla>
          ))}
        </div>
      </fieldset>

      {!estado.ok && estado.error ? (
        <p role="alert" className="mt-5 text-[0.875rem] text-mal">
          {estado.error}
        </p>
      ) : null}

      <div className="mt-6 flex items-center gap-3">
        <Boton type="submit" variante="esquina" disabled={enviando}>
          {enviando ? 'Guardando…' : 'Guardar perfil'}
        </Boton>
        <span aria-live="polite" className="text-[0.875rem] text-ok">
          {estado.ok ? estado.aviso : ''}
        </span>
      </div>
    </Form>
  );
}
