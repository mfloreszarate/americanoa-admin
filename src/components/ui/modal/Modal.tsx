import * as Dialog from "@radix-ui/react-dialog";
import type { ReactNode } from "react";
import { MaterialIcon } from "@/components/ui/MaterialIcon";

export interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  /** Extra classes on the dialog panel (Radix Content). */
  className?: string;
  /** Max width Tailwind class, e.g. `max-w-2xl`. */
  maxWidthClassName?: string;
  showCloseButton?: boolean;
}

/**
 * Generic accessible modal: focus trap, Escape, overlay click, and `aria` wiring via Radix Dialog.
 */
export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  className = "",
  maxWidthClassName = "max-w-2xl",
  showCloseButton = true,
}: ModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-on-surface/40 backdrop-blur-sm" />
        <Dialog.Content
          className={`fixed left-1/2 top-1/2 z-[100] flex max-h-[min(90vh,921px)] w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-[2rem] bg-surface-container-lowest shadow-2xl outline-none ${maxWidthClassName} ${className}`.trim()}
        >
          <div className="flex shrink-0 items-start justify-between px-10 pb-6 pt-10">
            <div className="min-w-0 pr-4">
              <Dialog.Title asChild>
                <h2 className="font-headline text-3xl font-black tracking-tight text-primary">
                  {title}
                </h2>
              </Dialog.Title>
              {description ? (
                <Dialog.Description asChild>
                  <p className="mt-1 text-on-surface-variant">{description}</p>
                </Dialog.Description>
              ) : (
                <Dialog.Description className="sr-only">
                  Dialog window
                </Dialog.Description>
              )}
            </div>
            {showCloseButton ? (
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="shrink-0 rounded-full p-2 transition-all hover:bg-surface-container-low"
                  aria-label="Close"
                >
                  <MaterialIcon name="close" className="text-outline" />
                </button>
              </Dialog.Close>
            ) : null}
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-10 pb-10">{children}</div>

          {footer ? (
            <div className="shrink-0 bg-surface-container-low px-10 py-8">{footer}</div>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
