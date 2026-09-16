'use client';

import { useState } from 'react';
import { Boton } from '@/components/ui/Boton';
import { Entrada, Rotulo, Selector } from '@/components/ui/Campo';
import {
  enmascarar,
  guardarClaveYAvisar,
  guardarModeloYAvisar,
  olvidarClaveYAvisar,
  useClaveGuardada,
  useModeloPreferido,
  type ModeloPreferido,
} from '@/features/cuenta/clave';

export function ClaveApi({ esDueno }: { esDueno: boolean }) {
  const guardada = useClaveGuardada();
  const modelo = useModeloPreferido();
  const [valor, setValor] = useState('');
  const [aviso, setAviso] = useState<string | null>(null);

  return (
    <section className="h-max tarjeta px-4 py-4">
      <h2 className="text-[1.0625rem] font-semibold text-tinta">Corrección con IA</h2>
      <p className="mt-1 text-[0.875rem] text-tinta-2">
        Se corrige con la API de Claude usando <strong className="text-tinta">tu</strong> clave. Se
        guarda solo en este navegador: no se escribe en la base de datos ni en ningún registro. Si
        cambias de dispositivo, la vuelves a pegar.
      </p>

      {esDueno ? (
        <p className="mt-3 grid grid-cols-[3px_1fr] gap-2.5 rounded-r border border-ok/40 bg-ok-suave py-2 pr-3">
          <span className="bg-ok" aria-hidden />
          <span className="text-[0.875rem] text-ok">
            Cuenta del dueño: la clave está en el servidor y no necesitas pegar nada.
          </span>
        </p>
      ) : null}

      <div className="mt-4">
        <Rotulo htmlFor="clave" pista="empieza por sk-ant-">
          Clave de API
        </Rotulo>
        {guardada ? (
          <div className="flex items-center justify-between gap-3 rounded-r border border-linea-fuerte bg-papel-2 px-3 py-2">
            <span className="font-mono text-[0.875rem] text-tinta">{enmascarar(guardada)}</span>
            <Boton
              variante="sutil"
              tamano="pequeno"
              onClick={() => {
                olvidarClaveYAvisar();
                setAviso('Clave olvidada en este navegador.');
              }}
            >
              Olvidar
            </Boton>
          </div>
        ) : (
          <div className="flex gap-2">
            <Entrada
              id="clave"
              type="password"
              autoComplete="off"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              placeholder="sk-ant-…"
            />
            <Boton
              variante="esquina"
              onClick={() => {
                if (!/^sk-ant-[A-Za-z0-9_-]{20,}$/.test(valor.trim())) {
                  setAviso('Eso no parece una clave de Anthropic.');
                  return;
                }
                guardarClaveYAvisar(valor);
                setValor('');
                setAviso('Guardada en este navegador.');
              }}
            >
              Guardar
            </Boton>
          </div>
        )}
        <p className="mt-2 text-[0.8125rem] leading-relaxed text-tinta-3">
          Se crea en la consola de Anthropic. Cada corrección cuesta alrededor de un céntimo con el
          modelo estándar. Conviene rotarla cada tres meses.
        </p>
      </div>

      <div className="mt-4">
        <Rotulo htmlFor="modelo">Modelo</Rotulo>
        <Selector
          id="modelo"
          value={modelo}
          onChange={(e) => guardarModeloYAvisar(e.target.value as ModeloPreferido)}
        >
          <option value="estandar">Estándar: rápido y barato</option>
          <option value="exhaustivo">
            Exhaustivo: para diseño de sistemas, 2,5 veces más caro
          </option>
        </Selector>
      </div>

      <p aria-live="polite" className="mt-3 min-h-5 text-[0.875rem] text-tinta-2">
        {aviso}
      </p>
    </section>
  );
}
