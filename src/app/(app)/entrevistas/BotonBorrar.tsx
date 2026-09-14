'use client';

import { useTransition } from 'react';
import { eliminarEntrevista } from './acciones';

export function BotonBorrar({ id }: { id: string }) {
  const [pendiente, start] = useTransition();
  return (
    <button
      type="button"
      disabled={pendiente}
      onClick={() => {
        if (confirm('¿Borrar esta entrevista del registro? No se puede deshacer.'))
          start(() => eliminarEntrevista(id));
      }}
      className="text-[0.8125rem] text-tinta-3 underline-offset-2 hover:text-mal hover:underline disabled:opacity-50"
    >
      Borrar
    </button>
  );
}
