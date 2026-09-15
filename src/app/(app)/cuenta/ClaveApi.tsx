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
  const [valor, setValor] = useState('');
  const modelo = useModeloPreferido();
  const [aviso, setAviso] = useState<string | null>(null);

  return (
    <section className="rounded-r border border-linea bg-papel p-4">
      <h2 className="font-semibold">Corrección con IA</h2>
      <p className="mt-1 text-[0.875rem] text-tinta-2">
        Devsparring corrige con la API de Claude usando <strong>tu</strong> clave. Se guarda solo en
        este navegador: Devsparring no la almacena en sus servidores y la usa solo para pedir la
        corrección. Si cambias de dispositivo tendrás que volver a pegarla.
      </p>
      {esDueno ? (
        <p className="mt-2 rounded-r border border-ok/40 bg-ok-suave px-3 py-2 text-[0.875rem] text-ok">
          Esta es la cuenta del dueño: la clave está configurada en el servidor y no necesitas
          pegarla.
        </p>
      ) : null}

      <div className="mt-4">
        <Rotulo htmlFor="clave">Clave de API (empieza por sk-ant-)</Rotulo>
        {guardada ? (
          <div className="flex items-center justify-between gap-3 rounded-r border border-linea bg-papel-2 px-3 py-2 font-mono text-[0.875rem]">
            <span>{enmascarar(guardada)}</span>
            <button
              type="button"
              className="text-[0.8125rem] text-tinta-2 underline-offset-2 hover:text-mal hover:underline"
              onClick={() => {
                olvidarClaveYAvisar();
                setAviso('Clave olvidada en este navegador.');
              }}
            >
              Olvidar
            </button>
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
              variante="brasa"
              onClick={() => {
                if (!/^sk-ant-[A-Za-z0-9_-]{20,}$/.test(valor.trim()))
                  return setAviso('Eso no parece una clave de Anthropic.');
                guardarClaveYAvisar(valor);
                setValor('');
                setAviso('Guardada en este navegador.');
              }}
            >
              Guardar
            </Boton>
          </div>
        )}
        <p className="mt-2 text-[0.8125rem] text-tinta-3">
          Se crea en la consola de Anthropic. Cada corrección cuesta alrededor de un céntimo con el
          modelo estándar. Anthropic recomienda rotarla cada tres meses.
        </p>
      </div>

      <div className="mt-4">
        <Rotulo htmlFor="modelo">Modelo</Rotulo>
        <Selector
          id="modelo"
          value={modelo}
          onChange={(e) => {
            const m = e.target.value as ModeloPreferido;
            guardarModeloYAvisar(m);
          }}
        >
          <option value="estandar">Estándar (Sonnet 5): rápido y barato</option>
          <option value="exhaustivo">
            Exhaustivo (Opus 5): para diseño de sistemas, 2,5 veces más caro
          </option>
        </Selector>
      </div>
      {aviso ? <p className="mt-3 text-[0.875rem] text-tinta-2">{aviso}</p> : null}
    </section>
  );
}
