// Copia Monaco (node_modules/monaco-editor/min/vs) a public/monaco/vs para que
// el editor de katas se sirva desde nuestro dominio y no desde el CDN: sin red
// al CDN el modo kata no cargaba (deuda 1 y 9 de docs/arquitectura.md). La copia
// no va a git; se rehace solo si cambia la versión instalada.
//
// Uso: node scripts/copiar-monaco.mjs   (lo llaman `pnpm dev` y `pnpm build`)
import { cpSync, existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const raiz = path.resolve(import.meta.dirname, '..');
const paquete = path.join(raiz, 'node_modules', 'monaco-editor');
const origen = path.join(paquete, 'min', 'vs');
const destino = path.join(raiz, 'public', 'monaco', 'vs');
const sello = path.join(raiz, 'public', 'monaco', 'VERSION');

const version = JSON.parse(readFileSync(path.join(paquete, 'package.json'), 'utf8')).version;
if (existsSync(sello) && readFileSync(sello, 'utf8').trim() === version && existsSync(destino)) {
  process.exit(0);
}
rmSync(path.dirname(destino), { recursive: true, force: true });
cpSync(origen, destino, { recursive: true });
writeFileSync(sello, `${version}\n`);
console.log(`Monaco ${version} copiado a public/monaco/vs`);
