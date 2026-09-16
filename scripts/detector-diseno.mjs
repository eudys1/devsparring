// Detector mecánico de anti-patrones de diseño: recorre src/**/*.{tsx,ts,css}
// y busca, por regex, los "tells" que delatan una web hecha con plantilla de
// IA y las obligaciones del listón de C:\dev\CLAUDE.md, sección "Estilo web:
// que no parezca la típica web hecha por IA". No sustituye la mirada humana:
// es la primera pasada barata y determinista del bucle de revisión (ver
// scripts/revisar.mjs). Un hallazgo P0/P1 hace que el proceso salga con
// código 1; P2/P3 son avisos que no bloquean.
//
// Uso:
//   node scripts/detector-diseno.mjs             # recorre "src"
//   node scripts/detector-diseno.mjs src/app src/components
//
// Ignora ficheros de test (*.test.*, *.spec.*): no son superficie de diseño.
// Los colores literales solo se comprueban en src/components y src/app,
// excepto globals.css, que es donde viven los tokens a propósito.

import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const RAIZ = path.resolve(import.meta.dirname, '..');
const argumentos = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const objetivos = (argumentos.length ? argumentos : ['src']).map((r) => path.resolve(RAIZ, r));

const EXTENSIONES = new Set(['.tsx', '.ts', '.css']);
const EXCLUIR_NOMBRE = /\.(test|spec)\.[tj]sx?$/;
const SEVERIDAD_ORDEN = { P0: 0, P1: 1, P2: 2, P3: 3 };

/** @type {{fichero:string, linea:number, categoria:string, severidad:string, mensaje:string, accion:string}[]} */
const hallazgos = [];

function registrar(fichero, linea, categoria, severidad, mensaje, accion) {
  hallazgos.push({ fichero, linea, categoria, severidad, mensaje, accion });
}

// Como registrar(), pero a partir de un índice de carácter, y se salta las
// líneas que son puro comentario: describir la regla prohibida en un comentario
// (p. ej. "nunca ease-in") no es usarla. Solo detecta líneas de comentario
// completas (// , /* , * de continuación, {/* de JSX); un comentario a mitad
// de línea de código no se filtra, por simplicidad.
function registrarEnIndice(fichero, contenido, indice, categoria, severidad, mensaje, accion) {
  const inicio = contenido.lastIndexOf('\n', indice - 1) + 1;
  let fin = contenido.indexOf('\n', indice);
  if (fin === -1) fin = contenido.length;
  if (esLineaComentario(contenido.slice(inicio, fin))) return;
  registrar(fichero, numeroLinea(contenido, indice), categoria, severidad, mensaje, accion);
}

function esLineaComentario(lineaTexto) {
  const t = lineaTexto.trim();
  return t.startsWith('//') || t.startsWith('/*') || t.startsWith('*') || t.startsWith('{/*');
}

// --- utilidades ------------------------------------------------------------

async function recorrer(dir, acc = []) {
  let entradas;
  try {
    entradas = await readdir(dir, { withFileTypes: true });
  } catch {
    return acc; // ruta inexistente: silencioso aquí, se avisa en main()
  }
  for (const entrada of entradas) {
    const ruta = path.join(dir, entrada.name);
    if (entrada.isDirectory()) {
      await recorrer(ruta, acc);
    } else if (EXTENSIONES.has(path.extname(entrada.name)) && !EXCLUIR_NOMBRE.test(entrada.name)) {
      acc.push(ruta);
    }
  }
  return acc;
}

function numeroLinea(contenido, indice) {
  let n = 1;
  for (let i = 0; i < indice; i++) if (contenido.charCodeAt(i) === 10) n++;
  return n;
}

function* coincidencias(regex, contenido) {
  const flags = regex.flags.includes('g') ? regex.flags : regex.flags + 'g';
  const re = new RegExp(regex.source, flags);
  let m;
  while ((m = re.exec(contenido)) !== null) {
    yield m;
    if (m.index === re.lastIndex) re.lastIndex++; // evita bucle infinito con match vacío
  }
}

function enScopeColor(rutaAbs) {
  if (path.basename(rutaAbs) === 'globals.css') return false;
  const rel = path.relative(RAIZ, rutaAbs).replace(/\\/g, '/');
  return rel.startsWith('src/components/') || rel.startsWith('src/app/');
}

// --- comprobaciones ----------------------------------------------------

const FUENTES_PROHIBIDAS = [
  'Inter',
  'Roboto',
  'Poppins',
  'Space Grotesk',
  'Montserrat',
  'Open Sans',
  'Lato',
];

function checkFuentes(fichero, contenido) {
  for (const fuente of FUENTES_PROHIBIDAS) {
    const re = new RegExp(`\\b${fuente.replace(' ', '\\s+')}\\b`);
    for (const m of coincidencias(re, contenido)) {
      registrarEnIndice(
        fichero,
        contenido,
        m.index,
        'Fuentes prohibidas',
        'P1',
        `Aparece "${fuente}" — está en la lista negra del listón de diseño ("porque sí").`,
        'Usar una fuente propia del proyecto (ya cargada por next/font) o elegir otra con intención.',
      );
    }
  }
}

const PALETA_TAILWIND_DEFECTO = [
  'slate',
  'gray',
  'zinc',
  'neutral',
  'stone',
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
];
const PREFIJOS_COLOR_TAILWIND = [
  'bg',
  'text',
  'border',
  'ring',
  'from',
  'via',
  'to',
  'fill',
  'stroke',
  'outline',
  'divide',
  'accent',
  'caret',
  'decoration',
  'shadow',
];
const RE_COLOR_TAILWIND = new RegExp(
  `\\b(?:${PREFIJOS_COLOR_TAILWIND.join('|')})-(?:${PALETA_TAILWIND_DEFECTO.join('|')})-\\d{2,3}\\b`,
);
const RE_HEX = /#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{4}|[0-9a-fA-F]{3})\b/;
const RE_RGB = /\brgba?\(/;

function checkColores(fichero, contenido) {
  for (const m of coincidencias(RE_HEX, contenido)) {
    registrarEnIndice(
      fichero,
      contenido,
      m.index,
      'Color literal fuera de tokens',
      'P1',
      `Color hexadecimal literal "${m[0]}" fuera de globals.css.`,
      'Usar un token de :root (var(--...)) o una clase Tailwind mapeada a un token del proyecto.',
    );
  }
  for (const m of coincidencias(RE_RGB, contenido)) {
    registrarEnIndice(
      fichero,
      contenido,
      m.index,
      'Color literal fuera de tokens',
      'P1',
      'rgb()/rgba() literal fuera de globals.css.',
      'Usar un token de :root (var(--...)) o una clase Tailwind mapeada a un token del proyecto.',
    );
  }
  for (const m of coincidencias(RE_COLOR_TAILWIND, contenido)) {
    registrarEnIndice(
      fichero,
      contenido,
      m.index,
      'Color literal fuera de tokens',
      'P1',
      `Clase Tailwind de paleta por defecto "${m[0]}" en vez de un token del proyecto.`,
      'Sustituir por la clase de color propia del proyecto (bg-brasa, text-tinta-2, etc.).',
    );
  }
}

function checkTransitionAll(fichero, contenido) {
  for (const m of coincidencias(
    /\btransition(?:-property)?\s*:\s*all\b|\btransition-all\b/,
    contenido,
  )) {
    registrarEnIndice(
      fichero,
      contenido,
      m.index,
      'transition: all',
      'P2',
      `"${m[0]}" transiciona todas las propiedades, incluidas las que no deberían animarse.`,
      'Listar solo las propiedades que cambian (transform, opacity, filter...).',
    );
  }
}

function checkScaleCero(fichero, contenido) {
  for (const m of coincidencias(/\bscale\(\s*0\s*\)|\bscale-0\b/, contenido)) {
    registrarEnIndice(
      fichero,
      contenido,
      m.index,
      'scale(0) como estado inicial',
      'P2',
      `"${m[0]}" — si es el estado inicial de una animación de entrada, es un tell de plantilla.`,
      'Partir de una escala/opacidad más sutil (0.96-0.98) o de un desplazamiento pequeño, no de cero.',
    );
  }
}

function checkEaseIn(fichero, contenido) {
  for (const m of coincidencias(/\bease-in\b(?!-out)/, contenido)) {
    registrarEnIndice(
      fichero,
      contenido,
      m.index,
      'Ease prohibido',
      'P2',
      '"ease-in" a secas acelera de golpe: se siente brusco en una transición de interfaz.',
      'Usar un ease de cola larga (power3, ease-out) para entradas; ease-in-out para algo que va y vuelve.',
    );
  }
}

function checkEaseLinear(fichero, contenido) {
  const lineas = contenido.split('\n');
  lineas.forEach((linea, i) => {
    if (esLineaComentario(linea)) return;
    if (/\blinear\b/.test(linea) && /progres/i.test(linea)) return; // animación de progreso: permitido
    if (/\btransition\b/.test(linea) && /\blinear\b/.test(linea)) {
      registrar(
        fichero,
        i + 1,
        'Ease prohibido',
        'P2',
        '"linear" en una transición de interfaz se siente mecánico.',
        'Usar un ease de cola larga salvo que sea, de verdad, una animación de progreso.',
      );
    } else if (/\bease-linear\b/.test(linea)) {
      registrar(
        fichero,
        i + 1,
        'Ease prohibido',
        'P2',
        'Clase Tailwind "ease-linear" en una transición de interfaz.',
        'Usar un ease de cola larga salvo que sea, de verdad, una animación de progreso.',
      );
    }
  });
}

function checkBezierRebote(fichero, contenido) {
  const re =
    /cubic-bezier\(\s*([+-]?[\d.]+)\s*,\s*([+-]?[\d.]+)\s*,\s*([+-]?[\d.]+)\s*,\s*([+-]?[\d.]+)\s*\)/;
  for (const m of coincidencias(re, contenido)) {
    const p2 = Number(m[2]);
    const p4 = Number(m[4]);
    if (p2 < 0 || p4 > 1) {
      registrarEnIndice(
        fichero,
        contenido,
        m.index,
        'Ease con rebote',
        'P1',
        `${m[0]} tiene un parámetro fuera de [0,1] (p2=${p2}, p4=${p4}): produce rebote.`,
        'Sustituir por un ease de cola larga (power3.out) — el listón prohíbe back/bounce/elastic.',
      );
    }
  }
}

function checkDuracion(fichero, contenido) {
  for (const m of coincidencias(/\bduration-(\d+)\b/, contenido)) {
    const ms = Number(m[1]);
    if (ms > 300) {
      registrarEnIndice(
        fichero,
        contenido,
        m.index,
        'Duración de interfaz',
        'P2',
        `"${m[0]}" supera 300 ms.`,
        'Confirmar que es una excepción deliberada (entrada orquestada) o bajar a ≤300ms para micro-interacciones.',
      );
    }
  }
  for (const m of coincidencias(/transition(?:-duration)?\s*:\s*([^;]+);?/i, contenido)) {
    const valor = m[1];
    const numRe = /(\d+(?:\.\d+)?)(ms|s)\b/g;
    let mm;
    while ((mm = numRe.exec(valor)) !== null) {
      const n = Number(mm[1]);
      const ms = mm[2].toLowerCase() === 's' ? n * 1000 : n;
      if (ms > 300) {
        registrarEnIndice(
          fichero,
          contenido,
          m.index,
          'Duración de interfaz',
          'P2',
          `Duración de ${mm[1]}${mm[2]} (${ms}ms) supera 300 ms.`,
          'Confirmar que es una excepción deliberada o bajar a ≤300ms para micro-interacciones.',
        );
        break;
      }
    }
  }
}

function checkHoverTransform(fichero, contenido) {
  const tieneMediaHover = /@media\s*\(\s*hover\s*:\s*hover\s*\)/.test(contenido);
  if (tieneMediaHover) return;
  for (const m of coincidencias(/:hover\s*\{([^}]*)\}/, contenido)) {
    if (/transform/.test(m[1])) {
      registrarEnIndice(
        fichero,
        contenido,
        m.index,
        'Hover sin soporte táctil',
        'P2',
        ':hover con transform, y el fichero no comprueba @media (hover: hover).',
        'Envolver el efecto en @media (hover: hover) para que no se quede "pegado" en pantallas táctiles.',
      );
    }
  }
  for (const m of coincidencias(
    /\bhover:-?(?:scale|translate-x|translate-y|rotate|skew-x|skew-y)-\S+/,
    contenido,
  )) {
    registrarEnIndice(
      fichero,
      contenido,
      m.index,
      'Hover sin soporte táctil',
      'P2',
      `Clase "${m[0]}" (transform en hover) sin @media (hover: hover) en el fichero.`,
      'Envolver el efecto en @media (hover: hover) para que no se quede "pegado" en pantallas táctiles.',
    );
  }
}

function checkActiveBoton(fichero, contenido) {
  const esComponenteBoton = /\b(Boton|Button)\b/.test(path.basename(fichero));
  const tieneButton = /<button\b/i.test(contenido);
  if (!esComponenteBoton && !tieneButton) return;
  const tieneActive = /:active\b/.test(contenido) || /\bactive:/.test(contenido);
  if (!tieneActive) {
    registrar(
      fichero,
      1,
      'Falta estado :active',
      'P1',
      'El fichero usa <button> o se llama Boton/Button pero no define :active ni active: en ningún sitio.',
      'Añadir una respuesta táctil real al pulsar (active:scale-[0.98] o equivalente), no solo hover.',
    );
  }
}

function check100vh(fichero, contenido) {
  for (const m of coincidencias(/\b100vh\b|\bh-screen\b|\bmin-h-screen\b/, contenido)) {
    registrarEnIndice(
      fichero,
      contenido,
      m.index,
      'Unidad de viewport',
      'P1',
      `"${m[0]}" no cuenta con la barra del navegador móvil.`,
      'Cambiar a dvh (100dvh / h-dvh / min-h-dvh).',
    );
  }
}

// Emoji como icono: solo los bloques pictográficos de verdad. Deja fuera
// Dingbats (2700-27BF) y flechas (2190-21FF/2B00-2BFF) a propósito: el
// listón exige el check "✔" y los chevrons dibujados en <select>, y viven ahí.
const RE_EMOJI = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{26FF}]/u;

function checkEmojis(fichero, contenido) {
  if (!fichero.endsWith('.tsx')) return;
  const lineas = contenido.split('\n');
  lineas.forEach((linea, i) => {
    if (esLineaComentario(linea)) return;
    if (RE_EMOJI.test(linea)) {
      registrar(
        fichero,
        i + 1,
        'Emoji como icono',
        'P0',
        `Emoji detectado: "${linea.trim().slice(0, 80)}"`,
        'Sustituir por un icono del sistema (lucide-react, ya instalado) o un glifo tipográfico con intención.',
      );
    }
  });
}

function checkGradientText(fichero, contenido) {
  for (const m of coincidencias(/background-clip\s*:\s*text\b|\bbg-clip-text\b/, contenido)) {
    registrarEnIndice(
      fichero,
      contenido,
      m.index,
      'Titular con degradado',
      'P0',
      `"${m[0]}" — relleno degradado en texto, tell clásico de plantilla IA.`,
      'Quitar el degradado del texto; si hace falta color, que sea el acento sólido.',
    );
  }
}

function checkOutlineNone(fichero, contenido) {
  const tieneFocusVisible =
    /:focus-visible\b/.test(contenido) || /\bfocus-visible:/.test(contenido);
  if (tieneFocusVisible) return;
  for (const m of coincidencias(/outline\s*:\s*none\b|\boutline-none\b/, contenido)) {
    registrarEnIndice(
      fichero,
      contenido,
      m.index,
      'outline:none sin focus-visible',
      'P1',
      `"${m[0]}" sin ningún :focus-visible / focus-visible: en el fichero.`,
      'Quitar el outline solo cuando hay un :focus-visible que lo sustituya; si no, el teclado pierde el foco.',
    );
  }
}

function checkAriaRoleButton(fichero, contenido) {
  if (!fichero.endsWith('.tsx')) return;
  for (const m of coincidencias(/<[a-zA-Z][^<>]*?\brole=["']button["'][^<>]*?>/, contenido)) {
    if (!/\baria-[\w-]+=/.test(m[0])) {
      registrarEnIndice(
        fichero,
        contenido,
        m.index,
        'role="button" sin aria-',
        'P1',
        'Elemento con role="button" sin ningún atributo aria- (aria-label, aria-pressed...).',
        'Añadir el aria- que describa el estado o el propósito; si puede ser un <button> nativo, mejor eso.',
      );
    }
  }
}

function checkImgSinAlt(fichero, contenido) {
  if (!fichero.endsWith('.tsx')) return;
  for (const m of coincidencias(/<img\b[^<>]*?>/, contenido)) {
    if (!/\balt=/.test(m[0])) {
      registrarEnIndice(
        fichero,
        contenido,
        m.index,
        '<img> sin alt',
        'P1',
        '<img> sin atributo alt.',
        'Añadir un alt descriptivo, o alt="" si es puramente decorativa.',
      );
    }
  }
}

function checkScrollListener(fichero, contenido) {
  for (const m of coincidencias(/addEventListener\(\s*['"]scroll['"]/, contenido)) {
    registrarEnIndice(
      fichero,
      contenido,
      m.index,
      'Listener de scroll',
      'P2',
      "addEventListener('scroll', ...) cuesta rendimiento y dispara en cada frame.",
      'Sustituir por IntersectionObserver para revelar al hacer scroll.',
    );
  }
}

function checkDangerouslySetInnerHTML(fichero, contenido) {
  if (!/dangerouslySetInnerHTML/.test(contenido)) return;
  if (/escap|saniti[sz]/i.test(contenido)) return; // hay alguna función de escape/saneado en el fichero
  const idx = contenido.indexOf('dangerouslySetInnerHTML');
  registrarEnIndice(
    fichero,
    contenido,
    idx,
    'dangerouslySetInnerHTML sin escape',
    'P2',
    'Usa dangerouslySetInnerHTML y el fichero no tiene ninguna función que mencione escapar/sanear.',
    'Confirmar a mano que el HTML insertado está escapado antes de este punto, o mover el saneado a este fichero.',
  );
}

// Comprobaciones que necesitan ver TODOS los ficheros a la vez.

function checkRadioRepetido(archivos) {
  const ocurrencias = [];
  for (const { fichero, contenido } of archivos) {
    for (const m of coincidencias(/\brounded-(?:lg|xl)\b/, contenido)) {
      ocurrencias.push({ fichero, linea: numeroLinea(contenido, m.index), clase: m[0] });
    }
  }
  if (ocurrencias.length > 6) {
    for (const o of ocurrencias) {
      registrar(
        o.fichero,
        o.linea,
        'Un radio para todo',
        'P2',
        `"${o.clase}" se repite ${ocurrencias.length} veces en el proyecto (más de 6 es la señal de "un radio para todo").`,
        'Definir un token propio (--radio en globals.css) o variar el radio según el elemento.',
      );
    }
  }
}

function checkReducedMotion(archivos) {
  const globals = archivos.find((a) => path.basename(a.fichero) === 'globals.css');
  if (!globals) return; // no se escaneó globals.css en esta pasada: no se puede comprobar
  if (!/prefers-reduced-motion/.test(globals.contenido)) {
    registrar(
      globals.fichero,
      1,
      'Falta prefers-reduced-motion',
      'P1',
      'globals.css no tiene una regla @media (prefers-reduced-motion: reduce).',
      'Añadir un bloque que anule o reduzca animaciones y transiciones cuando el usuario lo pida.',
    );
  }
}

// --- orquestación ------------------------------------------------------

async function main() {
  const ficherosAbs = [];
  for (const objetivo of objetivos) {
    ficherosAbs.push(...(await recorrer(objetivo)));
  }
  const unicos = [...new Set(ficherosAbs)];

  if (unicos.length === 0) {
    console.error(
      `Aviso: no se encontró ningún .tsx/.ts/.css bajo: ${objetivos.map((o) => path.relative(RAIZ, o) || '.').join(', ')}`,
    );
  }

  const archivos = [];
  for (const abs of unicos) {
    let contenido;
    try {
      contenido = await readFile(abs, 'utf8');
    } catch (err) {
      // Otro proceso puede estar editando src/ a la vez: un fichero que
      // desaparece entre el listado y la lectura no debe tumbar el detector.
      console.error(
        `Aviso: no se pudo leer ${path.relative(RAIZ, abs)} (${err.code ?? err.message}), se omite.`,
      );
      continue;
    }
    archivos.push({ fichero: path.relative(RAIZ, abs).replace(/\\/g, '/'), contenido, abs });
  }

  for (const { fichero, contenido, abs } of archivos) {
    checkFuentes(fichero, contenido);
    if (enScopeColor(abs)) checkColores(fichero, contenido);
    checkTransitionAll(fichero, contenido);
    checkScaleCero(fichero, contenido);
    checkEaseIn(fichero, contenido);
    checkEaseLinear(fichero, contenido);
    checkBezierRebote(fichero, contenido);
    checkDuracion(fichero, contenido);
    checkHoverTransform(fichero, contenido);
    checkActiveBoton(fichero, contenido);
    check100vh(fichero, contenido);
    checkEmojis(fichero, contenido);
    checkGradientText(fichero, contenido);
    checkOutlineNone(fichero, contenido);
    checkAriaRoleButton(fichero, contenido);
    checkImgSinAlt(fichero, contenido);
    checkScrollListener(fichero, contenido);
    checkDangerouslySetInnerHTML(fichero, contenido);
  }
  checkRadioRepetido(archivos);
  checkReducedMotion(archivos);

  imprimir(archivos.length);
}

function imprimir(totalFicheros) {
  hallazgos.sort(
    (a, b) =>
      SEVERIDAD_ORDEN[a.severidad] - SEVERIDAD_ORDEN[b.severidad] ||
      a.fichero.localeCompare(b.fichero) ||
      a.linea - b.linea,
  );

  console.log(`Detector de diseño — ${totalFicheros} ficheros revisados.\n`);

  if (hallazgos.length === 0) {
    console.log('Sin hallazgos: 0 anti-patrones detectados.\n');
  } else {
    for (const h of hallazgos) {
      console.log(`${h.fichero}:${h.linea}  [${h.severidad}] ${h.categoria}`);
      console.log(`  ${h.mensaje}`);
      console.log(`  -> ${h.accion}\n`);
    }
  }

  const porCategoria = new Map();
  for (const h of hallazgos) {
    if (!porCategoria.has(h.categoria))
      porCategoria.set(h.categoria, { P0: 0, P1: 0, P2: 0, P3: 0 });
    porCategoria.get(h.categoria)[h.severidad]++;
  }

  console.log('Resumen por categoría:');
  if (porCategoria.size === 0) {
    console.log('  (ninguna)');
  } else {
    for (const [categoria, cuentas] of [...porCategoria].sort((a, b) => a[0].localeCompare(b[0]))) {
      console.log(
        `  ${categoria}: P0=${cuentas.P0} P1=${cuentas.P1} P2=${cuentas.P2} P3=${cuentas.P3}`,
      );
    }
  }

  const totales = { P0: 0, P1: 0, P2: 0, P3: 0 };
  for (const h of hallazgos) totales[h.severidad]++;
  console.log(
    `\nTotal: P0=${totales.P0} P1=${totales.P1} P2=${totales.P2} P3=${totales.P3} (${hallazgos.length} hallazgos)`,
  );

  const bloqueante = totales.P0 > 0 || totales.P1 > 0;
  console.log(
    bloqueante ? '\nRESULTADO: FALLA (hay P0 o P1).' : '\nRESULTADO: OK (como mucho P2/P3).',
  );
  process.exitCode = bloqueante ? 1 : 0;
}

await main();
