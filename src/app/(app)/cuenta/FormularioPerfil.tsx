'use client';

import { useState } from 'react';
import { Boton } from '@/components/ui/Boton';
import { Entrada, Rotulo, Selector } from '@/components/ui/Campo';
import type { Perfil } from '@/features/cuenta/db';
import { guardarPerfil } from './acciones';

export function FormularioPerfil({ perfil }: { perfil: Perfil }) {
  const [estado, setEstado] = useState<'quieto' | 'enviando' | 'ok' | 'error'>('quieto');
  return (
    <form
      className="h-max tarjeta px-4 py-4"
      action={async (form) => {
        setEstado('enviando');
        const r = await guardarPerfil(form);
        setEstado(r.ok ? 'ok' : 'error');
      }}
    >
      <h2 className="text-[1.0625rem] font-semibold text-tinta">Perfil</h2>
      <p className="mt-0.5 text-[0.8125rem] text-tinta-3">
        Solo sirve para arrancar cada sesión con lo que sueles elegir.
      </p>

      <div className="mt-4 space-y-3.5">
        <div>
          <Rotulo htmlFor="nombre">Nombre</Rotulo>
          <Entrada id="nombre" name="nombre" defaultValue={perfil.nombre ?? ''} maxLength={80} />
        </div>
        <div>
          <Rotulo htmlFor="rol_objetivo">Puesto al que aplicas</Rotulo>
          <Entrada
            id="rol_objetivo"
            name="rol_objetivo"
            defaultValue={perfil.rol_objetivo}
            maxLength={80}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Rotulo htmlFor="nivel_por_defecto">Nivel por defecto</Rotulo>
            <Selector
              id="nivel_por_defecto"
              name="nivel_por_defecto"
              defaultValue={perfil.nivel_por_defecto}
            >
              <option value="junior">Junior</option>
              <option value="mid">Mid</option>
              <option value="senior">Senior</option>
            </Selector>
          </div>
          <div>
            <Rotulo htmlFor="idioma">Idioma por defecto</Rotulo>
            <Selector id="idioma" name="idioma" defaultValue={perfil.idioma}>
              <option value="es">Español</option>
              <option value="en">Inglés</option>
            </Selector>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <Boton type="submit" variante="esquina" disabled={estado === 'enviando'}>
          {estado === 'enviando' ? 'Guardando…' : 'Guardar'}
        </Boton>
        <span aria-live="polite" className="text-[0.875rem]">
          {estado === 'ok' ? <span className="text-ok">Guardado.</span> : null}
          {estado === 'error' ? <span className="text-mal">No se pudo guardar.</span> : null}
        </span>
      </div>
    </form>
  );
}
