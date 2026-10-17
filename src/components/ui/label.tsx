import type { LabelHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type LabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  children: ReactNode;
  error?: boolean | string;
};

export function Label({ className, children, error, ...props }: LabelProps) {
  return (
    <label
      className={cn(
        "mb-1.5 block text-xs font-semibold tracking-wider uppercase",
        error
          ? "text-rose-600 dark:text-rose-400"
          : "text-stone-700 dark:text-stone-300",
        className
      )}
      {...props}
    >
      {children}
    </label>
  );
}
