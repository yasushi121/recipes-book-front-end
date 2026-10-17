import type { TableHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Table({ className, ...props }: TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-stone-200/90 bg-white/90 shadow-2xs dark:border-stone-800 dark:bg-stone-900/90">
      <table
        className={cn(
          "w-full text-left text-sm",
          "[&_th]:px-5 [&_th]:py-3.5 [&_th]:text-xs [&_th]:font-semibold [&_th]:tracking-wider [&_th]:uppercase [&_th]:text-stone-500 dark:[&_th]:text-stone-400",
          "[&_thead]:bg-stone-50/90 dark:[&_thead]:bg-stone-950/50",
          "[&_td]:px-5 [&_td]:py-4 [&_td]:text-stone-800 dark:[&_td]:text-stone-200",
          "[&_tbody_tr]:border-t [&_tbody_tr]:border-stone-100 dark:[&_tbody_tr]:border-stone-800/80 [&_tbody_tr]:transition-colors",
          "hover:[&_tbody_tr]:bg-stone-50/60 dark:hover:[&_tbody_tr]:bg-stone-800/40",
          className
        )}
        {...props}
      />
    </div>
  );
}
