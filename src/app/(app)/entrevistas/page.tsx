import { Etiqueta } from '@/components/ui/Etiqueta';
import { listarEntrevistas } from '@/features/entrevistas/db';
import { NOMBRE_NIVEL } from '@/features/preguntas/nombres';
import { supabaseServidor, usuarioActual } from '@/lib/supabase/server';
import { FormularioEntrevista } from './FormularioEntrevista';
import { BotonBorrar } from './BotonBorrar';

export const metadata = { title: 'Entrevistas' };

export default async function Entrevistas() {
  const usuario = (await usuarioActual())!;
  const db = await supabaseServidor();
  const lista = await listarEntrevistas(db, usuario.id);

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="text-2xl font-semibold">Tus entrevistas reales</h1>
      <p className="prosa mt-1 text-tinta-2">
        Después de cada entrevista, apunta qué te preguntaron. Es el dato que nadie más tiene: lo
        que preguntan de verdad en las empresas a las que aplicas.
      </p>

      <div className="mt-6 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <FormularioEntrevista />
        <section>
          <h2 className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-tinta-3">
            Registro · {lista.length}
          </h2>
          {lista.length === 0 ? (
            <p className="mt-2 text-[0.9375rem] text-tinta-3">
              Todavía no hay ninguna. La primera que hagas, apúntala aquí ese mismo día.
            </p>
          ) : (
            <ul className="mt-2 space-y-3">
              {lista.map((e) => (
                <li key={e.id} className="rounded-r border border-linea bg-papel p-4">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="font-medium">
                        {e.empresa}
                        {e.rol ? <span className="text-tinta-2"> · {e.rol}</span> : null}
                      </p>
                      <p className="mt-0.5 flex flex-wrap items-center gap-1.5 text-[0.8125rem] text-tinta-3">
                        <span className="tabular font-mono">{e.fecha}</span>
                        {e.nivel ? (
                          <Etiqueta tono={e.nivel === 'junior' ? 'junior' : 'senior'}>
                            {NOMBRE_NIVEL[e.nivel]}
                          </Etiqueta>
                        ) : null}
                        {e.formato ? <span>· {e.formato}</span> : null}
                        {e.resultado ? <span>· {e.resultado}</span> : null}
                      </p>
                    </div>
                    <BotonBorrar id={e.id} />
                  </div>
                  {e.preguntas.length ? (
                    <ol className="mt-3 list-decimal space-y-1 pl-5 text-[0.9375rem]">
                      {e.preguntas.map((p, i) => (
                        <li key={i}>{p}</li>
                      ))}
                    </ol>
                  ) : null}
                  {e.notas ? (
                    <p className="mt-3 whitespace-pre-line text-[0.875rem] text-tinta-2">
                      {e.notas}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
