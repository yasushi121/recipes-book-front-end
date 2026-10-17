import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionProps = {
  children: ReactNode;
  className?: string;
};

export function Section({ children, className }: SectionProps) {
  return (
    <section className={cn("mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8", className)}>
      {children}
    </section>
  );
}