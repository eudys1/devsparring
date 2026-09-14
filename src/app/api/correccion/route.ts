// Corrección con la API de Claude. Exige sesión, usa la clave del usuario (o la
// del dueño para su propia cuenta) y nunca la persiste ni la loggea.
import { NextResponse } from 'next/server';
import { z } from 'zod';
import {
  JSON_SCHEMA_CORRECCION,
  parsearCorreccion,
  VERSION_RUBRICA,
} from '@/features/correccion/esquema-salida';
import { promptSistema, promptUsuario } from '@/features/correccion/prompt';
import { errorDelgado, sanitizar } from '@/features/correccion/sanitizar';
import { cargarPregunta } from '@/features/preguntas/cargar';
import { rubricaParaNivel } from '@/features/preguntas/rubrica';
import { clienteAnthropic, formatoClaveValido, MODELOS } from '@/lib/anthropic';
import { config } from '@/lib/config';
import { usuarioActual } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

const Peticion = z.object({
  preguntaId: z.string().min(1),
  modo: z.enum(['flash', 'verbal', 'kata', 'review', 'diseno', 'star']),
  nivel: z.enum(['junior', 'mid', 'senior']),
  idioma: z.enum(['es', 'en']),
  respuesta: z.string().max(20_000),
  resultadoTests: z.string().max(20_000).optional(),
  modelo: z.enum(['estandar', 'exhaustivo']).default('estandar'),
  apiKey: z.string().max(300).optional(),
});

// Tope por usuario e instancia: protege del bug de cliente que dispara en bucle
// y le quema el crédito a alguien. Map con tope para no crecer sin límite.
const ventana = new Map<string, number[]>();
const MAX_POR_MINUTO = 12;
function permitido(userId: string): boolean {
  const ahora = Date.now();
  const lista = (ventana.get(userId) ?? []).filter((t) => ahora - t < 60_000);
  if (lista.length >= MAX_POR_MINUTO) return false;
  lista.push(ahora);
  ventana.set(userId, lista);
  if (ventana.size > 500) ventana.delete(ventana.keys().next().value as string);
  return true;
}

export async function POST(request: Request) {
  const usuario = await usuarioActual();
  if (!usuario) return NextResponse.json({ ok: false, codigo: 'sin_sesion' }, { status: 401 });
  if (!permitido(usuario.id))
    return NextResponse.json({ ok: false, codigo: 'limite_usuario' }, { status: 429 });

  const cuerpo = Peticion.safeParse(await request.json().catch(() => null));
  if (!cuerpo.success)
    return NextResponse.json({ ok: false, codigo: 'peticion_invalida' }, { status: 400 });
  const p = cuerpo.data;

  const cfg = config();
  const esDueno = cfg.DEVSPARRING_OWNER_USER_ID !== undefined && usuario.id === cfg.DEVSPARRING_OWNER_USER_ID;
  const clave = p.apiKey?.trim() || (esDueno ? cfg.DEVSPARRING_OWNER_ANTHROPIC_KEY : undefined);
  if (!clave) return NextResponse.json({ ok: false, codigo: 'sin_clave' }, { status: 400 });
  if (!formatoClaveValido(clave))
    return NextResponse.json({ ok: false, codigo: 'formato_clave' }, { status: 400 });

  const pregunta = await cargarPregunta(p.preguntaId);
  if (!pregunta)
    return NextResponse.json({ ok: false, codigo: 'pregunta_desconocida' }, { status: 404 });

  const rubrica = rubricaParaNivel(pregunta, p.nivel);
  const usuarioPrompt = promptUsuario({
    modo: p.modo,
    nivel: p.nivel,
    idioma: p.idioma,
    pregunta: pregunta.texto,
    contexto: pregunta.contexto,
    rubrica,
    respuestaModelo: pregunta.respuestaModelo,
    respuesta: p.respuesta,
    resultadoTests: p.resultadoTests,
  });
  const modelo = MODELOS[p.modelo];

  try {
    const cliente = clienteAnthropic(clave);
    const respuesta = await cliente.messages.create({
      model: modelo,
      max_tokens: 2048,
      // El sistema y la rúbrica van primero y se marcan para caché: una sesión
      // encadena correcciones en pocos minutos y el prefijo es estable.
      system: [{ type: 'text', text: promptSistema(), cache_control: { type: 'ephemeral' } }],
      messages: [{ role: 'user', content: usuarioPrompt }],
      output_config: { format: { type: 'json_schema', schema: JSON_SCHEMA_CORRECCION } },
    });
    const texto = respuesta.content.flatMap((b) => (b.type === 'text' ? [b.text] : [])).join('');
    const correccion = parsearCorreccion(texto);
    return NextResponse.json({ ok: true, correccion, modelo, versionRubrica: VERSION_RUBRICA });
  } catch (e) {
    if (e instanceof z.ZodError || e instanceof SyntaxError) {
      return NextResponse.json({ ok: false, codigo: 'salida_invalida' }, { status: 502 });
    }
    const delgado = errorDelgado(e);
    // Solo el código y el estado: el error del SDK puede llevar la petición entera.
    console.error(
      JSON.stringify(sanitizar({ evento: 'correccion_error', usuario: usuario.id, ...delgado })),
    );
    return NextResponse.json(
      { ok: false, codigo: delgado.codigo },
      { status: delgado.estado ?? 502 },
    );
  }
}
