'use client';

import { useRef, useState } from 'react';
import { Boton } from '@/components/ui/Boton';
import { AreaTexto, Entrada, NotaObligatorio, Rotulo, Selector } from '@/components/ui/Campo';
import { registrarEntrevista } from './acciones';

export function FormularioEntrevista() {
  const ref = useRef<HTMLFormElement>(null);
  const [estado, setEstado] = useState<'quieto' | 'enviando' | 'ok' | 'error'>('quieto');
  const hoy = new Date().toISOString().slice(0, 10);

  return (
    <form
      ref={ref}
      className="h-max tarjeta px-4 py-4"
      action={async (form) => {
        setEstado('enviando');
        const r = await registrarEntrevista(form);
        setEstado(r.ok ? 'ok' : 'error');
        if (r.ok) ref.current?.reset();
      }}
    >
      <h2 className="text-[1.0625rem] font-semibold text-tinta">Apuntar una entrevista</h2>
      <p className="mt-0.5 text-[0.8125rem] text-tinta-3">Con la empresa y la fecha basta.</p>

      <div className="mt-4 space-y-3.5">
        <div>
          <Rotulo htmlFor="empresa" obligatorio>
            Empresa
          </Rotulo>
          <Entrada id="empresa" name="empresa" required maxLength={120} autoComplete="off" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Rotulo htmlFor="rol">Puesto</Rotulo>
            <Entrada id="rol" name="rol" placeholder="Fullstack React" maxLength={120} />
          </div>
          <div>
            <Rotulo htmlFor="nivel">Nivel</Rotulo>
            <Selector id="nivel" name="nivel" defaultValue="">
              <option value="">Sin indicar</option>
              <option value="junior">Junior</option>
              <option value="mid">Mid</option>
              <option value="senior">Senior</option>
            </Selector>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Rotulo htmlFor="fecha" obligatorio>
              Fecha
            </Rotulo>
            <Entrada id="fecha" name="fecha" type="date" defaultValue={hoy} required />
          </div>
          <div>
            <Rotulo htmlFor="formato">Formato</Rotulo>
            <Entrada id="formato" name="formato" placeholder="Live coding, 1 h" maxLength={200} />
          </div>
        </div>
        <div>
          <Rotulo htmlFor="preguntas" pista="una por línea">
            Qué te preguntaron
          </Rotulo>
          <AreaTexto
            id="preguntas"
            name="preguntas"
            className="min-h-28"
            placeholder={'¿Qué es un índice y cuándo empeora?\nDiseña un acortador de URLs'}
          />
        </div>
        <div>
          <Rotulo htmlFor="notas">Notas</Rotulo>
          <AreaTexto
            id="notas"
            name="notas"
            className="min-h-20"
            placeholder="Qué fue bien, qué no, qué repasar"
            maxLength={4000}
          />
        </div>
        <div>
          <Rotulo htmlFor="resultado">Resultado</Rotulo>
          <Entrada
            id="resultado"
            name="resultado"
            placeholder="Pasé a la siguiente / No / Pendiente"
            maxLength={120}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <Boton type="submit" variante="esquina" disabled={estado === 'enviando'}>
          {estado === 'enviando' ? 'Guardando…' : 'Guardar'}
        </Boton>
        <NotaObligatorio />
        <span aria-live="polite" className="text-[0.875rem]">
          {estado === 'ok' ? <span className="text-ok">Guardada.</span> : null}
          {estado === 'error' ? (
            <span className="text-mal">No se pudo guardar. Revisa la empresa y la fecha.</span>
          ) : null}
        </span>
      </div>
    </form>
  );
}
