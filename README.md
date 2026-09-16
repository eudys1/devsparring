# Devsparring

Entrena entrevistas técnicas de programación, en español. Teoría hablada, katas
con editor, revisión de código ajeno, diseño de sistemas y preguntas de
comportamiento, corregido con una rúbrica distinta para junior y para senior, y
con repetición espaciada de lo que falles.

Sparring: entrenar con alguien que te pega antes del combate de verdad. Que la primera entrevista dura no sea la de verdad.

## Cómo funciona

- **Banco de preguntas** en `contenido/`, en JSON, con fuentes y fecha en cada
  pregunta. Se revisa por pull request y un barrido automático cada tres
  semanas propone altas y bajas.
- **Seis modos**: flash (teoría corta), en voz alta, kata (Monaco + tests en el
  navegador), revisión de código, diseño y STAR.
- **Corrección con IA** con tu propia clave de la API de Claude, que vive solo en
  tu navegador. Sin clave, copias el prompt y corriges en cualquier chat.
- **Repetición espaciada** (FSRS): lo que falles vuelve cuando toca.
- **Registro de entrevistas reales**: apunta qué te preguntaron de verdad.

## Arrancar

Requisitos: Node 22+, pnpm, un proyecto de Supabase.

```bash
pnpm install
cp .env.example .env.local   # rellena las claves de Supabase
pnpm dev
```

Las migraciones de `supabase/migrations/` las aplica la integración de GitHub de
Supabase en cada push a `main` (el proyecto está conectado al repositorio). Para
aplicarlas a mano: `npx supabase link` y `npx supabase db push`.

En Supabase, en Authentication, desactiva "Confirm email" si quieres entrar sin
verificar el correo durante el desarrollo, y añade `http://localhost:3000/auth/confirmar`
a las URL de redirección. Esos valores están también en `supabase/config.toml`.

## Verificar

```bash
pnpm revisar     # el bucle completo: verificación, build, detector y capturas
pnpm verify      # format:check + lint + typecheck + test + build
pnpm test:e2e    # Playwright contra el build; con E2E_EMAIL y E2E_PASSWORD en
                 # .env.local prueba también las pantallas con sesión
```

`pnpm revisar` deja las capturas en `capturas/` (fuera de git) para mirarlas
antes de enseñar una pantalla.

## Dónde está cada cosa

Ver `CLAUDE.md`, `docs/decisiones.md`, `docs/arquitectura.md` y, para la dirección
visual (por qué la noche, el bloque y la tarjeta del juez), `docs/diseno.md`.

## Licencia

MIT.
