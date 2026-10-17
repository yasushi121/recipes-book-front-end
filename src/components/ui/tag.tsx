import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type TagProps = {
  children: ReactNode;
  variant?: "default" | "amber" | "emerald" | "rose" | "indigo";
  className?: string;
};

const variantStyles = {
  default:
    "bg-stone-100/90 text-stone-700 border-stone-200/80 dark:bg-stone-800/80 dark:text-stone-300 dark:border-stone-700/60",
  amber:
    "bg-amber-50 text-amber-800 border-amber-200/70 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900/50",
  emerald:
    "bg-emerald-50 text-emerald-800 border-emerald-200/70 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900/50",
  rose:
    "bg-rose-50 text-rose-800 border-rose-200/70 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-900/50",
  indigo:
    "bg-indigo-50 text-indigo-800 border-indigo-200/70 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-900/50",
};

export function Tag({ children, variant = "default", className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-tight transition-colors duration-200",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
