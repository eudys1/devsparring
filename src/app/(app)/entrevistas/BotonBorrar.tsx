'use client';

import { useState, useTransition } from 'react';
import { Boton } from '@/components/ui/Boton';
import { eliminarEntrevista } from './acciones';

// Borrar es irreversible: se pide confirmación en la propia fila, no con un
// diálogo del navegador que se acepta sin leer.
export function BotonBorrar({ id, empresa }: { id: string; empresa: string }) {
  const [confirmando, setConfirmando] = useState(false);
  const [pendiente, start] = useTransition();

  if (!confirmando) {
    return (
      <Boton
        variante="sutil"
        tamano="pequeno"
        onClick={() => setConfirmando(true)}
        aria-label={`Borrar la entrevista de ${empresa}`}
      >
        Borrar
      </Boton>
    );
  }
  return (
    <span className="flex items-center gap-1.5">
      <span className="text-[0.8125rem] text-tinta-2">¿Seguro?</span>
      <Boton
        variante="peligro"
        tamano="pequeno"
        disabled={pendiente}
        onClick={() => start(() => eliminarEntrevista(id))}
      >
        {pendiente ? 'Borrando…' : 'Sí, borrar'}
      </Boton>
      <Boton variante="sutil" tamano="pequeno" onClick={() => setConfirmando(false)}>
        No
      </Boton>
    </span>
  );
}
