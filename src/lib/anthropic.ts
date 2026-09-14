// Fábrica de clientes de Anthropic. Uno por petición, con la clave del usuario:
// un cliente global en serverless mezclaría usuarios. Ver docs/arquitectura.md.
import 'server-only';
import Anthropic from '@anthropic-ai/sdk';

export const MODELOS = {
  estandar: 'claude-sonnet-5',
  exhaustivo: 'claude-opus-5',
} as const;
export type ModeloCorreccion = keyof typeof MODELOS;

export function clienteAnthropic(apiKey: string) {
  return new Anthropic({ apiKey, maxRetries: 1, timeout: 60_000 });
}

export function formatoClaveValido(clave: string): boolean {
  return /^sk-ant-[A-Za-z0-9_-]{20,}$/.test(clave.trim());
}
