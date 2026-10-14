'use client';

// La clave vive solo en este navegador, así que no hay Server Action: se valida
// aquí y el servidor la vuelve a comprobar en cada corrección (formatoClaveValido).
import { useState } from 'react';
import { Form } from 'react-aria-components';
import { Boton } from '@/components/ui/Boton';
import { CampoClave, Selector } from '@/components/ui/Campo';
import {
  enmascarar,
  guardarClaveYAvisar,
  guardarModeloYAvisar,
  olvidarClaveYAvisar,
  useClaveGuardada,
  useModeloPreferido,
  type ModeloPreferido,
} from '@/features/cuenta/clave';

function errorClave(v: string): string | null {
  const c = v.trim();
  if (!c) return 'Falta la clave. Pégala desde la consola de Anthropic.';
  if (!c.startsWith('sk-ant-'))
    return 'Eso no es una clave de Anthropic: empiezan por sk-ant-. Revisa que la copiaste entera.';
  if (!/^sk-ant-[A-Za-z0-9_-]{20,}$/.test(c))
    return 'La clave parece cortada o con espacios en medio. Cópiala de nuevo entera.';
  return null;
}

export function ClaveApi({ esDueno }: { esDueno: boolean }) {
  const guardada = useClaveGuardada();
  const modelo = useModeloPreferido();
  const [valor, setValor] = useState('');
  const [aviso, setAviso] = useState<string | null>(null);

  return (
    <section className="tarjeta px-6 py-6">
      <h2 className="text-[1.25rem] font-semibold text-tinta">Corrección con IA</h2>
      <p className="mt-1 text-[0.875rem] text-tinta-2">
        Se corrige con la API de Claude usando <strong className="text-tinta">tu</strong> clave. Se
        guarda solo en este navegador: no se escribe en la base de datos ni en ningún registro. Si
        cambias de dispositivo, la vuelves a pegar.
      </p>

      {esDueno ? (
        <p className="mt-4 grid grid-cols-[3px_1fr] gap-2.5 rounded-r border border-ok/40 bg-ok-suave py-2 pr-3">
          <span className="bg-ok" aria-hidden />
          <span className="text-[0.875rem] text-ok">
            Cuenta del dueño: la clave está en el servidor y no necesitas pegar nada.
          </span>
        </p>
      ) : null}

      <div className="mt-5">
        {guardada ? (
          <div className="flex flex-col gap-1.5">
            <p className="text-[0.875rem] font-medium text-tinta">Clave de API</p>
            <div className="flex items-center justify-between gap-3 rounded-r border-2 border-linea-fuerte bg-papel-2 px-3 py-2">
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
          </div>
        ) : (
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              if (errorClave(valor)) return;
              guardarClaveYAvisar(valor);
              setValor('');
              setAviso('Guardada en este navegador.');
            }}
            className="flex flex-col gap-3 sm:flex-row sm:items-start"
          >
            <CampoClave
              etiqueta="Clave de API"
              ayuda="Empieza por sk-ant-. Se crea en la consola de Anthropic."
              autoComplete="off"
              placeholder="sk-ant-…"
              requerido
              valor={valor}
              onCambio={setValor}
              validar={(v) => (v ? errorClave(v) : null)}
              className="flex-1"
            />
            <Boton type="submit" variante="esquina" className="sm:mt-[1.6rem]">
              Guardar
            </Boton>
          </Form>
        )}
        <p className="mt-3 text-[0.8125rem] leading-relaxed text-tinta-3">
          Cada corrección cuesta alrededor de un céntimo con el modelo estándar. Conviene rotar la
          clave cada tres meses.
        </p>
      </div>

      <Selector
        etiqueta="Modelo"
        className="mt-5"
        valor={modelo}
        onCambio={(v) => guardarModeloYAvisar(v as ModeloPreferido)}
        opciones={[
          {
            id: 'estandar',
            texto: 'Claude Sonnet 5',
            detalle: 'Rápido, cerca de un céntimo por corrección',
          },
          {
            id: 'exhaustivo',
            texto: 'Claude Opus 5',
            detalle: 'Más fino en diseño de sistemas, unas 2,5 veces más caro',
          },
        ]}
      />

      <p aria-live="polite" className="mt-3 min-h-5 text-[0.875rem] text-tinta-2">
        {aviso}
      </p>
    </section>
  );
}
