'use client';

// Ventana sobre la página (React Aria, como en opos-pt): atrapa el foco, se
// cierra con Escape o con un clic fuera, devuelve el foco a donde estaba y
// bloquea el scroll de detrás. Entra con un fundido y la caja sube un poco. En
// móvil se pega abajo, como una hoja, que es donde llega el pulgar.
import { X } from 'lucide-react';
import type { ReactNode } from 'react';
import { Button, Dialog, Heading, Modal, ModalOverlay } from 'react-aria-components';

export function Dialogo({
  abierto,
  onCerrar,
  titulo,
  children,
  rol = 'dialog',
}: {
  abierto: boolean;
  onCerrar: () => void;
  titulo: string;
  children: ReactNode;
  /** alertdialog para lo destructivo: el lector lo anuncia como aviso. */
  rol?: 'dialog' | 'alertdialog';
}) {
  return (
    <ModalOverlay
      isOpen={abierto}
      onOpenChange={(abre) => {
        if (!abre) onCerrar();
      }}
      isDismissable
      className="dialogo-fondo fixed inset-0 z-50 flex items-end justify-center bg-[color-mix(in_oklab,var(--ink)_45%,transparent)] p-0 backdrop-blur-[2px] sm:items-center sm:p-4"
    >
      <Modal className="dialogo-caja tarjeta max-h-[92dvh] w-full overflow-y-auto rounded-b-none sm:max-w-[34rem] sm:rounded-b-[var(--radio-2)]">
        <Dialog role={rol} className="flex flex-col gap-4 px-6 py-5 outline-none">
          {({ close }) => (
            <>
              <div className="flex items-start gap-3">
                <Heading
                  slot="title"
                  className="min-w-0 flex-1 text-[1.25rem] font-semibold text-tinta"
                >
                  {titulo}
                </Heading>
                <Button
                  onPress={close}
                  aria-label="Cerrar"
                  className="-mr-2 -mt-1 grid h-10 w-10 shrink-0 cursor-pointer place-items-center rounded-[8px] text-tinta-3 outline-none transition-colors duration-[160ms] ease-salida hover:bg-punto/10 hover:text-tinta data-[focus-visible]:ring-2 data-[focus-visible]:ring-punto"
                >
                  <X className="h-5 w-5" strokeWidth={2} aria-hidden />
                </Button>
              </div>
              {children}
            </>
          )}
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
}
