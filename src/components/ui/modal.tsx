import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
};

export function Modal({ open, onClose, title, description, children }: ModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="flex w-full max-w-2xl max-h-[90vh] flex-col rounded-3xl border border-stone-200/90 bg-white/95 text-stone-900 shadow-2xl backdrop-blur-md dark:border-stone-800 dark:bg-stone-900/95 dark:text-stone-100 dark:shadow-black/60 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-stone-100 dark:border-stone-800/80 px-6 py-5">
          <div>
            <h2 className="text-xl font-bold font-serif tracking-tight text-stone-900 dark:text-stone-50">
              {title}
            </h2>
            {description && (
              <p className="mt-0.5 text-xs text-stone-500 dark:text-stone-400">
                {description}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="flex h-8 w-8 items-center justify-center rounded-full text-stone-400 transition-colors hover:bg-stone-100 hover:text-stone-700 dark:hover:bg-stone-800 dark:hover:text-stone-200 cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-6 custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
}