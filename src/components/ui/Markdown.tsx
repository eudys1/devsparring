// Render mínimo de markdown para respuestas modelo y contexto: párrafos, listas,
// código en línea y bloques. Sin dependencia externa y sin HTML crudo: el texto
// se escapa siempre, así que el contenido del banco no puede inyectar nada.

function escapar(t: string): string {
  return t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function enLinea(t: string): string {
  return escapar(t)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>');
}

export function markdownAHtml(md: string): string {
  const lineas = md.replace(/\r\n/g, '\n').split('\n');
  const html: string[] = [];
  let i = 0;
  while (i < lineas.length) {
    const l = lineas[i] ?? '';
    if (l.startsWith('```')) {
      const bloque: string[] = [];
      i++;
      while (i < lineas.length && !(lineas[i] ?? '').startsWith('```')) {
        bloque.push(lineas[i] ?? '');
        i++;
      }
      i++;
      html.push(`<pre><code>${escapar(bloque.join('\n'))}</code></pre>`);
      continue;
    }
    if (/^\s*[-*] /.test(l)) {
      const items: string[] = [];
      while (i < lineas.length && /^\s*[-*] /.test(lineas[i] ?? '')) {
        items.push(`<li>${enLinea((lineas[i] ?? '').replace(/^\s*[-*] /, ''))}</li>`);
        i++;
      }
      html.push(`<ul>${items.join('')}</ul>`);
      continue;
    }
    if (/^\s*\d+\. /.test(l)) {
      const items: string[] = [];
      while (i < lineas.length && /^\s*\d+\. /.test(lineas[i] ?? '')) {
        items.push(`<li>${enLinea((lineas[i] ?? '').replace(/^\s*\d+\. /, ''))}</li>`);
        i++;
      }
      html.push(`<ol>${items.join('')}</ol>`);
      continue;
    }
    if (/^#{1,3} /.test(l)) {
      html.push(`<p><strong>${enLinea(l.replace(/^#{1,3} /, ''))}</strong></p>`);
      i++;
      continue;
    }
    if (l.trim() === '') {
      i++;
      continue;
    }
    const parrafo: string[] = [l];
    i++;
    while (
      i < lineas.length &&
      (lineas[i] ?? '').trim() !== '' &&
      !/^(```|\s*[-*] |\s*\d+\. |#{1,3} )/.test(lineas[i] ?? '')
    ) {
      parrafo.push(lineas[i] ?? '');
      i++;
    }
    html.push(`<p>${enLinea(parrafo.join(' '))}</p>`);
  }
  return html.join('');
}

export function Markdown({ texto, className = '' }: { texto: string; className?: string }) {
  return (
    <div
      className={`prosa ${className}`}
      dangerouslySetInnerHTML={{ __html: markdownAHtml(texto) }}
    />
  );
}
