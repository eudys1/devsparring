'use client';

// Los campos de formulario de la app, sobre React Aria Components (Adobe), como
// en opos-pt: accesibles de serie (teclado, lector de pantalla, foco), con la
// etiqueta visible, la ayuda debajo y el error pegado al campo y enlazado. Ya no
// se escriben <input>, <select> ni <textarea> a mano: un cambio de estilo se hace
// aquí. Los errores salen en español y dicen qué falta, tanto los del navegador
// (obligatorio, formato, longitud) como los que devuelve el servidor a través de
// <Form validationErrors>.
import { parseDate } from '@internationalized/date';
import {
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
} from 'lucide-react';
import { useState, type ReactNode } from 'react';
import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHeader,
  CalendarHeaderCell,
  Checkbox,
  DateInput,
  DatePicker,
  DateSegment,
  Dialog,
  FieldError,
  Group,
  Heading,
  I18nProvider,
  Input,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  Select,
  SelectValue,
  Text,
  TextArea,
  TextField,
  type ValidationResult,
} from 'react-aria-components';

// La caja: borde de 2px con 3:1 de contraste, cambio claro al pasar y al
// enfocar, rojo si hay error. Nada depende solo del color: el error lleva texto.
const caja =
  'w-full rounded-r border-2 border-linea-fuerte bg-papel-2 px-3 text-[0.9375rem] text-tinta outline-none placeholder:text-tinta-3 transition-[border-color,background-color] duration-[160ms] ease-salida hover:border-ink data-[focused]:border-punto data-[focus-within]:border-punto data-[invalid]:border-mal data-[disabled]:opacity-50';

function Etiqueta({ children, obligatorio }: { children: ReactNode; obligatorio?: boolean }) {
  return (
    <Label className="text-[0.875rem] font-medium text-tinta">
      {children}
      {obligatorio ? (
        <>
          <span className="ml-0.5 text-mal" aria-hidden>
            *
          </span>
          <span className="sr-only"> (obligatorio)</span>
        </>
      ) : null}
    </Label>
  );
}

function Ayuda({ children }: { children?: ReactNode }) {
  if (!children) return null;
  return (
    <Text slot="description" className="text-[0.8125rem] leading-snug text-tinta-3">
      {children}
    </Text>
  );
}

type Reglas = { etiqueta: string; minimo?: number; maximo?: number; tipo?: string };

// Traduce lo que el navegador sabe del campo a una frase que diga qué arreglar.
// Si el error viene del servidor (validationErrors), se usa tal cual.
export function mensajeDeError(v: ValidationResult, r: Reglas): string {
  if (v.validationErrors.length && !v.validationDetails.valueMissing) {
    // Errores de `validate` o del servidor: ya vienen redactados.
    const propio = v.validationErrors.find((e) => !/^(Constraints|Please|Rellena)/i.test(e));
    if (propio) return propio;
  }
  const d = v.validationDetails;
  const nombre = r.etiqueta.toLowerCase();
  if (d.valueMissing) return `Falta ${articulo(nombre)}${nombre}.`;
  if (d.typeMismatch && r.tipo === 'email')
    return 'Ese correo no es válido: revisa que tenga @ y un dominio (nombre@dominio.com).';
  if (d.typeMismatch && r.tipo === 'url')
    return 'Esa dirección no es válida: empieza por https://.';
  if (d.tooShort && r.minimo) return `Necesita al menos ${r.minimo} caracteres.`;
  if (d.tooLong && r.maximo) return `Como mucho ${r.maximo} caracteres.`;
  if (d.patternMismatch) return `El formato de ${nombre} no es válido.`;
  return v.validationErrors[0] ?? 'Revisa este campo.';
}

function articulo(nombre: string): string {
  // "Falta el correo", "Falta la contraseña": basta para las etiquetas de la app.
  return /^(contraseña|empresa|fecha|clave|pista|respuesta|explicación)/.test(nombre)
    ? 'la '
    : 'el ';
}

function ErrorCampo({ reglas }: { reglas: Reglas }) {
  return (
    <FieldError className="text-[0.8125rem] font-medium leading-snug text-mal">
      {(v) => mensajeDeError(v, reglas)}
    </FieldError>
  );
}

type Comunes = {
  etiqueta: string;
  nombre?: string;
  ayuda?: ReactNode;
  requerido?: boolean;
  placeholder?: string;
  className?: string;
  deshabilitado?: boolean;
  /** Validación propia en cliente: devuelve el mensaje o null si vale. */
  validar?: (valor: string) => string | null | undefined;
};

// ------------------------------------------------------------------- texto

export function CampoTexto({
  etiqueta,
  nombre,
  ayuda,
  requerido,
  placeholder,
  className = '',
  deshabilitado,
  validar,
  tipo = 'text',
  autoComplete,
  valorInicial,
  valor,
  onCambio,
  minimo,
  maximo,
  autoFocus,
}: Comunes & {
  tipo?: 'text' | 'email' | 'url' | 'search';
  autoComplete?: string;
  valorInicial?: string;
  valor?: string;
  onCambio?: (v: string) => void;
  minimo?: number;
  maximo?: number;
  autoFocus?: boolean;
}) {
  return (
    <TextField
      name={nombre}
      type={tipo}
      autoComplete={autoComplete}
      isRequired={requerido}
      isDisabled={deshabilitado}
      minLength={minimo}
      maxLength={maximo}
      defaultValue={valorInicial}
      value={valor}
      onChange={onCambio}
      autoFocus={autoFocus}
      validate={validar ? (v) => validar(v) ?? null : undefined}
      className={`flex flex-col gap-1.5 ${className}`}
    >
      <Etiqueta obligatorio={requerido}>{etiqueta}</Etiqueta>
      <Input placeholder={placeholder} className={`${caja} min-h-11 py-2`} />
      <Ayuda>{ayuda}</Ayuda>
      <ErrorCampo reglas={{ etiqueta, minimo, maximo, tipo }} />
    </TextField>
  );
}

// -------------------------------------------------------------- contraseña

/** Contraseña con botón de ver u ocultar: escribir a ciegas causa errores tontos. */
export function CampoClave({
  etiqueta,
  nombre,
  ayuda,
  requerido,
  placeholder,
  className = '',
  deshabilitado,
  validar,
  autoComplete = 'current-password',
  valor,
  onCambio,
  minimo,
}: Comunes & {
  autoComplete?: 'current-password' | 'new-password' | 'off';
  valor?: string;
  onCambio?: (v: string) => void;
  minimo?: number;
}) {
  const [ver, setVer] = useState(false);
  return (
    <TextField
      name={nombre}
      type={ver ? 'text' : 'password'}
      autoComplete={autoComplete}
      isRequired={requerido}
      isDisabled={deshabilitado}
      minLength={minimo}
      value={valor}
      onChange={onCambio}
      validate={validar ? (v) => validar(v) ?? null : undefined}
      className={`flex flex-col gap-1.5 ${className}`}
    >
      <Etiqueta obligatorio={requerido}>{etiqueta}</Etiqueta>
      <div className="relative">
        <Input
          placeholder={placeholder}
          // Sin corrector ni mayúscula inicial: no deben tocar una clave.
          spellCheck={false}
          autoCapitalize="none"
          className={`${caja} min-h-11 py-2 pr-12 font-mono tracking-wide`}
        />
        <Button
          onPress={() => setVer(!ver)}
          aria-label={ver ? 'Ocultar' : 'Mostrar'}
          aria-pressed={ver}
          // Fuera del orden del Tab no: quien navega con teclado también lo necesita.
          className="absolute right-1 top-1/2 grid h-9 w-9 -translate-y-1/2 cursor-pointer place-items-center rounded-[7px] text-tinta-3 outline-none transition-colors duration-[160ms] ease-salida hover:bg-punto/10 hover:text-tinta data-[focus-visible]:ring-2 data-[focus-visible]:ring-punto"
        >
          {ver ? (
            <EyeOff className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden />
          ) : (
            <Eye className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden />
          )}
        </Button>
      </div>
      <Ayuda>{ayuda}</Ayuda>
      <ErrorCampo reglas={{ etiqueta, minimo }} />
    </TextField>
  );
}

// ---------------------------------------------------------- área de texto

export function AreaTexto({
  etiqueta,
  nombre,
  ayuda,
  requerido,
  placeholder,
  className = '',
  claseCaja = '',
  deshabilitado,
  validar,
  valorInicial,
  valor,
  onCambio,
  maximo,
  autoFocus,
  etiquetaOculta,
  filas = 4,
}: Comunes & {
  claseCaja?: string;
  valorInicial?: string;
  valor?: string;
  onCambio?: (v: string) => void;
  maximo?: number;
  autoFocus?: boolean;
  /** Cuando el título de la pantalla ya hace de etiqueta: se lee, no se ve. */
  etiquetaOculta?: boolean;
  filas?: number;
}) {
  return (
    <TextField
      name={nombre}
      isRequired={requerido}
      isDisabled={deshabilitado}
      maxLength={maximo}
      defaultValue={valorInicial}
      value={valor}
      onChange={onCambio}
      autoFocus={autoFocus}
      validate={validar ? (v) => validar(v) ?? null : undefined}
      className={`flex flex-col gap-1.5 ${className}`}
    >
      {etiquetaOculta ? (
        <Label className="sr-only">{etiqueta}</Label>
      ) : (
        <Etiqueta obligatorio={requerido}>{etiqueta}</Etiqueta>
      )}
      <TextArea
        rows={filas}
        placeholder={placeholder}
        className={`${caja} resize-y py-2.5 leading-relaxed ${claseCaja}`}
      />
      <Ayuda>{ayuda}</Ayuda>
      <ErrorCampo reglas={{ etiqueta, maximo }} />
    </TextField>
  );
}

// ------------------------------------------------------------ desplegable

export type Opcion = { id: string; texto: string; detalle?: string };

/**
 * Desplegable accesible con el chevron dibujado (sin flecha nadie sabe que se
 * despliega). Se abre con teclado, se busca escribiendo y manda su valor en el
 * formulario con `nombre`, como un <select>.
 */
export function Selector({
  etiqueta,
  nombre,
  ayuda,
  requerido,
  className = '',
  deshabilitado,
  opciones,
  valorInicial,
  valor,
  onCambio,
  etiquetaOculta,
}: Omit<Comunes, 'validar' | 'placeholder'> & {
  opciones: Opcion[];
  valorInicial?: string;
  valor?: string;
  onCambio?: (v: string) => void;
  etiquetaOculta?: boolean;
}) {
  return (
    <Select
      name={nombre}
      isRequired={requerido}
      isDisabled={deshabilitado}
      defaultSelectedKey={valorInicial}
      selectedKey={valor}
      onSelectionChange={onCambio ? (k) => onCambio(String(k)) : undefined}
      placeholder="Elige una opción"
      className={`flex flex-col gap-1.5 ${className}`}
    >
      {etiquetaOculta ? (
        <Label className="sr-only">{etiqueta}</Label>
      ) : (
        <Etiqueta obligatorio={requerido}>{etiqueta}</Etiqueta>
      )}
      <Button
        className={`${caja} flex min-h-11 cursor-pointer items-center justify-between gap-2 py-2 text-left data-[pressed]:border-punto data-[focus-visible]:border-punto`}
      >
        {/* Solo el nombre de la opción: con su detalle y la marca debajo, el botón
            crecía y no alineaba con los campos de texto de la misma fila. */}
        <SelectValue className="truncate data-[placeholder]:text-tinta-3">
          {({ selectedText, defaultChildren, isPlaceholder }) =>
            isPlaceholder ? defaultChildren : selectedText
          }
        </SelectValue>
        <ChevronDown className="h-4 w-4 shrink-0 text-tinta-3" strokeWidth={2} aria-hidden />
      </Button>
      <Ayuda>{ayuda}</Ayuda>
      <ErrorCampo reglas={{ etiqueta }} />
      {/* La lista vive fuera de la tarjeta: lleva su propia piel de papel */}
      <Popover className="desplegable tarjeta min-w-[var(--trigger-width)] overflow-auto p-1">
        <ListBox className="max-h-72 outline-none" items={opciones}>
          {(o) => (
            <ListBoxItem
              id={o.id}
              textValue={o.texto}
              className="group flex cursor-pointer items-center justify-between gap-3 rounded-[7px] px-3 py-2 text-[0.9375rem] text-tinta outline-none data-[focused]:bg-punto/10 data-[selected]:font-semibold"
            >
              <span className="flex flex-col">
                {o.texto}
                {o.detalle ? (
                  <span className="text-[0.75rem] font-normal text-tinta-3">{o.detalle}</span>
                ) : null}
              </span>
              <Check
                className="invisible h-4 w-4 text-punto group-data-[selected]:visible"
                strokeWidth={2.25}
                aria-hidden
              />
            </ListBoxItem>
          )}
        </ListBox>
      </Popover>
    </Select>
  );
}

// ---------------------------------------------------------------- casilla

export function Casilla({
  children,
  nombre,
  marcada,
  marcadaInicial,
  onCambio,
  deshabilitada,
  className = '',
  valor,
  ...resto
}: {
  children: ReactNode;
  nombre?: string;
  marcada?: boolean;
  marcadaInicial?: boolean;
  onCambio?: (v: boolean) => void;
  deshabilitada?: boolean;
  className?: string;
  valor?: string;
  'data-prueba'?: string;
}) {
  return (
    <Checkbox
      name={nombre}
      value={valor}
      isSelected={marcada}
      defaultSelected={marcadaInicial}
      onChange={onCambio}
      isDisabled={deshabilitada}
      {...resto}
      className={`group flex cursor-pointer items-start gap-2.5 text-[0.9375rem] leading-snug text-tinta-2 data-[selected]:text-tinta data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 ${className}`}
    >
      <span
        aria-hidden
        className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-[5px] border-2 border-linea-fuerte bg-papel-2 transition-colors duration-[140ms] ease-salida group-hover:border-ink group-data-[selected]:border-punto group-data-[selected]:bg-punto group-data-[focus-visible]:ring-2 group-data-[focus-visible]:ring-punto group-data-[focus-visible]:ring-offset-1"
      >
        <Check
          className="h-3.5 w-3.5 text-white opacity-0 group-data-[selected]:opacity-100"
          strokeWidth={3}
        />
      </span>
      <span className="min-w-0">{children}</span>
    </Checkbox>
  );
}

// ------------------------------------------------------------------ fecha

/**
 * Fecha con calendario en español (día/mes/año), escribible por partes con el
 * teclado o elegible en el calendario. Manda AAAA-MM-DD en el formulario.
 */
export function CampoFecha({
  etiqueta,
  nombre,
  ayuda,
  requerido,
  className = '',
  valorInicial,
  maximo,
}: Omit<Comunes, 'validar' | 'placeholder' | 'deshabilitado'> & {
  valorInicial?: string;
  /** Fecha más tardía admitida, AAAA-MM-DD. */
  maximo?: string;
}) {
  return (
    <I18nProvider locale="es-ES">
      <DatePicker
        name={nombre}
        isRequired={requerido}
        defaultValue={valorInicial ? parseDate(valorInicial) : undefined}
        maxValue={maximo ? parseDate(maximo) : undefined}
        className={`flex flex-col gap-1.5 ${className}`}
      >
        <Etiqueta obligatorio={requerido}>{etiqueta}</Etiqueta>
        <Group className={`${caja} flex min-h-11 items-center gap-2 py-1 pr-1`}>
          <DateInput className="flex flex-1 tabular-nums">
            {(s) => (
              <DateSegment
                segment={s}
                className="rounded-[4px] px-0.5 outline-none data-[focused]:bg-punto data-[focused]:text-white data-[placeholder]:text-tinta-3"
              />
            )}
          </DateInput>
          <Button
            aria-label="Abrir el calendario"
            className="grid h-9 w-9 cursor-pointer place-items-center rounded-[7px] text-tinta-3 outline-none transition-colors duration-[160ms] ease-salida hover:bg-punto/10 hover:text-tinta data-[focus-visible]:ring-2 data-[focus-visible]:ring-punto"
          >
            <CalendarDays className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden />
          </Button>
        </Group>
        <Ayuda>{ayuda}</Ayuda>
        <ErrorCampo reglas={{ etiqueta }} />
        <Popover className="desplegable tarjeta p-3">
          <Dialog className="outline-none">
            <Calendar>
              <header className="mb-2 flex items-center justify-between gap-2">
                <Button
                  slot="previous"
                  aria-label="Mes anterior"
                  className="grid h-9 w-9 cursor-pointer place-items-center rounded-[7px] text-tinta-2 outline-none hover:bg-punto/10 data-[focus-visible]:ring-2 data-[focus-visible]:ring-punto"
                >
                  <ChevronLeft className="h-4 w-4" strokeWidth={2} aria-hidden />
                </Button>
                <Heading className="text-[0.9375rem] font-semibold capitalize text-tinta" />
                <Button
                  slot="next"
                  aria-label="Mes siguiente"
                  className="grid h-9 w-9 cursor-pointer place-items-center rounded-[7px] text-tinta-2 outline-none hover:bg-punto/10 data-[focus-visible]:ring-2 data-[focus-visible]:ring-punto"
                >
                  <ChevronRight className="h-4 w-4" strokeWidth={2} aria-hidden />
                </Button>
              </header>
              <CalendarGrid className="border-separate border-spacing-0.5">
                <CalendarGridHeader>
                  {(dia) => (
                    <CalendarHeaderCell className="pb-1 text-[0.75rem] font-medium text-tinta-3">
                      {dia}
                    </CalendarHeaderCell>
                  )}
                </CalendarGridHeader>
                <CalendarGridBody>
                  {(fecha) => (
                    <CalendarCell
                      date={fecha}
                      className="grid h-9 w-9 cursor-pointer place-items-center rounded-[7px] text-[0.875rem] tabular-nums text-tinta outline-none hover:bg-punto/10 data-[disabled]:cursor-default data-[disabled]:text-tinta-3/50 data-[outside-month]:hidden data-[selected]:bg-punto data-[selected]:font-semibold data-[selected]:text-white data-[focus-visible]:ring-2 data-[focus-visible]:ring-punto"
                    />
                  )}
                </CalendarGridBody>
              </CalendarGrid>
            </Calendar>
          </Dialog>
        </Popover>
      </DatePicker>
    </I18nProvider>
  );
}

// ------------------------------------------------------- pie de formulario

/** Nota de pie de formulario: qué significa el asterisco. */
export function NotaObligatorio() {
  return (
    <p className="text-[0.75rem] text-tinta-3">
      <span className="text-mal" aria-hidden>
        *
      </span>{' '}
      obligatorio
    </p>
  );
}
