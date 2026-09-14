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
      className="rounded-r border border-linea bg-papel p-4"
      action={async (form) => {
        setEstado('enviando');
        const r = await guardarPerfil(form);
        setEstado(r.ok ? 'ok' : 'error');
      }}
    >
      <h2 className="font-semibold">Perfil</h2>
      <div className="mt-4 space-y-3">
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
        <Boton type="submit" variante="brasa" disabled={estado === 'enviando'}>
          Guardar
        </Boton>
        {estado === 'ok' ? <span className="text-[0.875rem] text-ok">Guardado.</span> : null}
        {estado === 'error' ? (
          <span className="text-[0.875rem] text-mal">No se pudo guardar.</span>
        ) : null}
      </div>
    </form>
  );
}
