import { obtenerPerfil } from '@/features/cuenta/db';
import { cargarBanco } from '@/features/preguntas/cargar';
import { MODOS, PISTAS, type Modo, type Pista } from '@/features/preguntas/esquema';
import { disponibilidad } from '@/features/preguntas/filtrar';
import { idsVencidas } from '@/features/srs/db';
import { supabaseServidor, usuarioActual } from '@/lib/supabase/server';
import { empezarSesion } from './acciones';
import { ConfigurarSesion } from './ConfigurarSesion';

export const metadata = { title: 'Practicar' };

export default async function Practicar({
  searchParams,
}: {
  searchParams: Promise<{ modo?: string; pista?: string; error?: string }>;
}) {
  const { modo: modoPedido, pista: pistaPedida, error } = await searchParams;
  const usuario = (await usuarioActual())!;
  const db = await supabaseServidor();
  const [banco, perfil, vencidas] = await Promise.all([
    cargarBanco(),
    obtenerPerfil(db, usuario.id),
    idsVencidas(db, usuario.id),
  ]);

  const matriz = disponibilidad(banco);
  const porId = new Map(banco.map((p) => [p.id, p]));
  const vencidasPorPista: Partial<Record<Pista, number>> = {};
  for (const id of vencidas) {
    const p = porId.get(id);
    if (p) vencidasPorPista[p.pista] = (vencidasPorPista[p.pista] ?? 0) + 1;
  }

  const modoInicial = (MODOS as readonly string[]).includes(modoPedido ?? '')
    ? (modoPedido as Modo)
    : 'flash';
  const pistaInicial = (PISTAS as readonly string[]).includes(pistaPedida ?? '')
    ? (pistaPedida as Pista)
    : undefined;

  return (
    <div className="mx-auto max-w-3xl">
      <p className="rotulo">Nueva sesión</p>
      <h1 className="display mt-1 text-[2.5rem] text-tinta">A qué te enfrentas hoy</h1>
      <p className="prosa mt-2 text-tinta-2">
        Elige el modo y la vara con la que quieres que te corrijan. Lo que tengas pendiente de
        repaso entra primero en la sesión.
      </p>

      {error === 'db' ? (
        <p
          role="alert"
          className="mt-5 rounded-r border border-mal/40 bg-mal-suave px-3 py-2.5 text-[0.9375rem] text-mal"
        >
          No se pudo crear la sesión. Vuelve a intentarlo; si sigue fallando, revisa que la base de
          datos esté disponible.
        </p>
      ) : null}

      <ConfigurarSesion
        disponibilidad={matriz}
        inicial={{
          modo: modoInicial,
          nivel: perfil.nivel_por_defecto,
          idioma: perfil.idioma,
          pista: pistaInicial,
        }}
        vencidasPorPista={vencidasPorPista}
        accion={empezarSesion}
      />
    </div>
  );
}
