import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-stone-200/80 bg-white/95 backdrop-blur-xs shadow-xs transition-all duration-300 dark:border-stone-800/90 dark:bg-stone-900/90 dark:shadow-black/40 overflow-hidden",
        className
      )}
    >
      {children}
    </div>
  );
}
