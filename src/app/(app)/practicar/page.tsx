import { Boton } from '@/components/ui/Boton';
import { Rotulo, Selector } from '@/components/ui/Campo';
import { obtenerPerfil } from '@/features/cuenta/db';
import { cargarBanco } from '@/features/preguntas/cargar';
import { MODOS, NIVELES, PISTAS, type Modo } from '@/features/preguntas/esquema';
import { paraModo, publicadas } from '@/features/preguntas/filtrar';
import { NOMBRE_MODO, NOMBRE_NIVEL, NOMBRE_PISTA } from '@/features/preguntas/nombres';
import { idsVencidas } from '@/features/srs/db';
import { supabaseServidor, usuarioActual } from '@/lib/supabase/server';
import { empezarSesion } from './acciones';
import { SelectorModo } from './SelectorModo';

export const metadata = { title: 'Practicar' };

export default async function Practicar({
  searchParams,
}: {
  searchParams: Promise<{ modo?: string; error?: string }>;
}) {
  const { modo: modoInicial, error } = await searchParams;
  const usuario = (await usuarioActual())!;
  const db = await supabaseServidor();
  const [banco, perfil, vencidas] = await Promise.all([
    cargarBanco(),
    obtenerPerfil(db, usuario.id),
    idsVencidas(db, usuario.id),
  ]);
  const lista = publicadas(banco);
  const conteo = Object.fromEntries(MODOS.map((m) => [m, paraModo(lista, m).length])) as Record<
    Modo,
    number
  >;
  const pistasConContenido = PISTAS.filter((p) => lista.some((q) => q.pista === p));

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-semibold">Nueva sesión</h1>
      <p className="mt-1 text-tinta-2">
        Elige un modo. Lo que tengas pendiente de repaso
        {vencidas.length ? ` (${vencidas.length} preguntas)` : ''} va primero.
      </p>
      {error === 'db' ? (
        <p
          role="alert"
          className="mt-4 rounded-r border border-mal/40 bg-mal-suave px-3 py-2 text-mal"
        >
          No se pudo crear la sesión. Prueba otra vez.
        </p>
      ) : null}

      <form action={empezarSesion} className="mt-6 space-y-6">
        <SelectorModo
          conteo={conteo}
          nombres={NOMBRE_MODO}
          inicial={
            (MODOS as readonly string[]).includes(modoInicial ?? '')
              ? (modoInicial as Modo)
              : 'flash'
          }
        />

        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <Rotulo htmlFor="nivel">Nivel al que aplicas</Rotulo>
            <Selector id="nivel" name="nivel" defaultValue={perfil.nivel_por_defecto}>
              {NIVELES.map((n) => (
                <option key={n} value={n}>
                  {NOMBRE_NIVEL[n]}
                </option>
              ))}
            </Selector>
          </div>
          <div>
            <Rotulo htmlFor="pista">Pista</Rotulo>
            <Selector id="pista" name="pista" defaultValue="">
              <option value="">Todas</option>
              {pistasConContenido.map((p) => (
                <option key={p} value={p}>
                  {NOMBRE_PISTA[p]}
                </option>
              ))}
            </Selector>
          </div>
          <div>
            <Rotulo htmlFor="idioma">Idioma de la entrevista</Rotulo>
            <Selector id="idioma" name="idioma" defaultValue={perfil.idioma}>
              <option value="es">Español</option>
              <option value="en">Inglés</option>
            </Selector>
          </div>
        </div>

        <Boton type="submit" variante="brasa">
          Empezar
        </Boton>
      </form>
    </div>
  );
}
