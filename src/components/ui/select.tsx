import type { SelectHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  error?: string;
};

export function Select({ className, error, children, ...props }: SelectProps) {
  return (
    <div className="w-full">
      <select
        className={cn(
          "w-full rounded-xl border px-3.5 py-2.5 text-sm transition-all duration-200 outline-none cursor-pointer",
          "bg-stone-50/80 text-stone-900 focus:bg-white focus:border-amber-500 focus:ring-3 focus:ring-amber-500/15",
          "dark:bg-stone-950/70 dark:text-stone-100 dark:focus:bg-stone-900 dark:focus:border-amber-400 dark:focus:ring-amber-400/20",
          error
            ? "border-rose-400 dark:border-rose-600 ring-2 ring-rose-500/10"
            : "border-stone-200 dark:border-stone-800",
          className
        )}
        aria-invalid={error ? true : undefined}
        {...props}
      >
        {children}
      </select>
      {error && <p className="mt-1.5 text-xs text-rose-600 dark:text-rose-400">{error}</p>}
    </div>
  );
}
