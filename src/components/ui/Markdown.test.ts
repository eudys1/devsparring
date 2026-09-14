import { describe, expect, it } from 'vitest';
import { markdownAHtml } from './Markdown';

describe('markdownAHtml', () => {
  it('escapa HTML siempre, también dentro de código', () => {
    expect(markdownAHtml('<script>x</script>')).toBe('<p>&lt;script&gt;x&lt;/script&gt;</p>');
    expect(markdownAHtml('```\n<b>\n```')).toBe('<pre><code>&lt;b&gt;</code></pre>');
  });
  it('convierte listas, código en línea y negrita', () => {
    expect(markdownAHtml('- uno `x`\n- **dos**')).toBe(
      '<ul><li>uno <code>x</code></li><li><strong>dos</strong></li></ul>',
    );
  });
  it('une líneas de un mismo párrafo y separa por línea en blanco', () => {
    expect(markdownAHtml('a\nb\n\nc')).toBe('<p>a b</p><p>c</p>');
  });
});
