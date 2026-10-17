import type { ReactNode } from "react";
import { Sparkles } from "lucide-react";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
};

export function PageHeader({ eyebrow, title, description, children }: PageHeaderProps) {
  return (
    <header className="relative mb-8 overflow-hidden rounded-3xl border border-stone-200/80 bg-gradient-to-br from-stone-100/90 via-stone-50/70 to-white/90 p-6 sm:p-10 shadow-xs dark:border-stone-800/90 dark:from-stone-900/90 dark:via-stone-900/60 dark:to-stone-950/90 dark:shadow-black/40">
      {/* Decorative ambient background blur */}
      <div className="pointer-events-none absolute -top-12 -right-12 h-44 w-44 rounded-full bg-amber-400/10 blur-3xl dark:bg-amber-500/10" />

      <div className="relative flex flex-wrap items-center justify-between gap-6">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/50 bg-amber-500/10 px-3 py-1 text-xs font-semibold tracking-wider text-amber-700 uppercase dark:border-amber-500/30 dark:text-amber-300">
            <Sparkles className="h-3 w-3" />
            <span>{eyebrow}</span>
          </div>
          <h1 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
            {title}
          </h1>
          <p className="mt-2 text-sm sm:text-base text-stone-600 dark:text-stone-300/80 leading-relaxed">
            {description}
          </p>
        </div>
        {children && <div className="flex flex-wrap items-center gap-3">{children}</div>}
      </div>
    </header>
  );
}
