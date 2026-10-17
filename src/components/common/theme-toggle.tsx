import { useTheme } from "@/components/context/theme-context";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/cn";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "group relative flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-300 cursor-pointer shadow-xs",
        isDark
          ? "border-stone-800 bg-stone-900/90 text-amber-300 hover:border-stone-700 hover:bg-stone-800"
          : "border-stone-200 bg-white/90 text-stone-700 hover:border-stone-300 hover:bg-stone-100 hover:text-stone-900",
        className
      )}
    >
      <div className="relative flex h-4 w-4 items-center justify-center">
        {isDark ? (
          <Moon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-rotate-12 text-amber-300" />
        ) : (
          <Sun className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-45 text-amber-600" />
        )}
      </div>
      <span className="hidden sm:inline">
        {isDark ? "Dark" : "Light"}
      </span>
    </button>
  );
}
