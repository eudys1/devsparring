import { Ficha, Peso } from '@/components/ui/Dato';
import { listarEntrevistas } from '@/features/entrevistas/db';
import { supabaseServidor, usuarioActual } from '@/lib/supabase/server';
import { BotonBorrar } from './BotonBorrar';
import { FormularioEntrevista } from './FormularioEntrevista';

export const metadata = { title: 'Entrevistas' };

export default async function Entrevistas() {
  const usuario = (await usuarioActual())!;
  const db = await supabaseServidor();
  const lista = await listarEntrevistas(db, usuario.id);
  const preguntas = lista.reduce((a, e) => a + e.preguntas.length, 0);

  return (
    <div className="mx-auto max-w-4xl">
      <p className="rotulo">Tu registro</p>
      <h1 className="display mt-1 text-[2.5rem] text-tinta">Entrevistas reales</h1>
      <p className="prosa mt-2 text-tinta-2">
        Al salir de cada entrevista, apunta qué te preguntaron. Es el dato que nadie más tiene: lo
        que se pregunta de verdad en las empresas a las que aplicas tú.
      </p>

      <div className="mt-7 grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
        <FormularioEntrevista />

        <section>
          <div className="flex items-baseline justify-between border-b border-linea pb-2">
            <h2 className="rotulo">Registradas</h2>
            <p className="tabular font-mono text-[0.75rem] text-tinta-3">
              {lista.length} entrevistas · {preguntas} preguntas
            </p>
          </div>

          {lista.length === 0 ? (
            <p className="mt-4 text-[0.9375rem] text-tinta-3">
              Todavía no hay ninguna. La primera que hagas, apúntala el mismo día: al día siguiente
              ya no te acuerdas de la mitad.
            </p>
          ) : (
            <ul className="mt-4 space-y-4">
              {lista.map((e) => (
                <li key={e.id} className="grid grid-cols-[3px_1fr] overflow-hidden tarjeta">
                  <span className="bg-linea-fuerte" aria-hidden />
                  <div className="px-4 py-3.5">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <p className="text-[1.0625rem] font-medium text-tinta">
                          {e.empresa}
                          {e.rol ? <span className="text-tinta-2"> · {e.rol}</span> : null}
                        </p>
                        <p className="mt-1 flex flex-wrap items-center gap-2 text-[0.8125rem] text-tinta-3">
                          <span className="tabular font-mono">{e.fecha}</span>
                          {e.nivel ? <Peso nivel={e.nivel} /> : null}
                          {e.formato ? <span>{e.formato}</span> : null}
                          {e.resultado ? <Ficha>{e.resultado}</Ficha> : null}
                        </p>
                      </div>
                      <BotonBorrar id={e.id} empresa={e.empresa} />
                    </div>
                    {e.preguntas.length ? (
                      <ol className="mt-3 space-y-1.5 border-t border-linea pt-3">
                        {e.preguntas.map((p, i) => (
                          <li
                            key={i}
                            className="grid grid-cols-[1.5rem_1fr] text-[0.9375rem] text-tinta"
                          >
                            <span className="tabular font-mono text-[0.75rem] text-tinta-3">
                              {i + 1}.
                            </span>
                            <span>{p}</span>
                          </li>
                        ))}
                      </ol>
                    ) : null}
                    {e.notas ? (
                      <p className="mt-3 whitespace-pre-line border-t border-linea pt-3 text-[0.875rem] text-tinta-2">
                        {e.notas}
                      </p>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
