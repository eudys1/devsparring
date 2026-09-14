'use client';

import { useState } from 'react';
import type { Modo } from '@/features/preguntas/esquema';

type Nombres = Record<Modo, { nombre: string; frase: string; minutos: string }>;

// Radios reales (accesibles, funcionan sin JS) pintados como filas de una hoja:
// el modo elegido lleva el canto en brasa, no una tarjeta con sombra.
export function SelectorModo({
  conteo,
  nombres,
  inicial,
}: {
  conteo: Record<Modo, number>;
  nombres: Nombres;
  inicial: Modo;
}) {
  const [modo, setModo] = useState<Modo>(inicial);
  const modos = Object.keys(nombres) as Modo[];
  return (
    <fieldset>
      <legend className="mb-2 text-[0.8125rem] font-medium text-tinta-2">Modo</legend>
      <div className="divide-y divide-linea rounded-r border border-linea bg-papel">
        {modos.map((m) => {
          const activo = modo === m;
          const vacio = conteo[m] === 0;
          return (
            <label
              key={m}
              className={`grid cursor-pointer grid-cols-[4px_1fr_auto] items-center gap-3 py-3 pr-4 ${vacio ? 'opacity-50' : ''}`}
            >
              <span
                className={`h-full w-1 ${activo ? 'bg-brasa' : 'bg-transparent'}`}
                aria-hidden
              />
              <span>
                <input
                  type="radio"
                  name="modo"
                  value={m}
                  checked={activo}
                  disabled={vacio}
                  onChange={() => setModo(m)}
                  className="sr-only"
                />
                <span className={`block font-medium ${activo ? 'text-tinta' : 'text-tinta-2'}`}>
                  {nombres[m].nombre}
                </span>
                <span className="block text-[0.8125rem] text-tinta-3">{nombres[m].frase}</span>
              </span>
              <span className="tabular text-right font-mono text-[0.75rem] text-tinta-3">
                {nombres[m].minutos}
                <br />
                {conteo[m]} preg.
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
