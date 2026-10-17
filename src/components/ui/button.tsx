import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "tertiary" | "danger";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
};

const variants = {
  primary:
    "bg-stone-900 text-stone-50 hover:bg-stone-800 shadow-xs hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 dark:bg-amber-500 dark:text-stone-950 dark:hover:bg-amber-400 dark:shadow-[0_2px_12px_rgba(245,158,11,0.2)] font-medium",
  secondary:
    "border border-stone-200/90 bg-white/90 text-stone-800 hover:bg-stone-100 hover:border-stone-300 shadow-2xs dark:border-stone-800 dark:bg-stone-900/90 dark:text-stone-200 dark:hover:bg-stone-800/90 dark:hover:border-stone-700",
  tertiary:
    "text-stone-600 hover:text-stone-950 hover:bg-stone-100/80 dark:text-stone-400 dark:hover:text-stone-100 dark:hover:bg-stone-800/60",
  danger:
    "border border-rose-200 bg-rose-50/80 text-rose-700 hover:bg-rose-100 shadow-2xs dark:border-rose-900/40 dark:bg-rose-950/40 dark:text-rose-300 dark:hover:bg-rose-900/50",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs rounded-lg gap-1.5",
  md: "px-4 py-2 text-sm rounded-xl gap-2",
  lg: "px-6 py-2.5 text-base rounded-xl gap-2.5",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center font-medium transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}