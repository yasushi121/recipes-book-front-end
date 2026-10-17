import { useAuth } from "@/components/context/use-auth";
import { ThemeToggle } from "@/components/common/theme-toggle";
import { Button } from "@/components/ui/button";
import { CookingPot, LogOut, ShieldCheck, BookOpen } from "lucide-react";
import { Link, useLocation } from "react-router";

export function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const isAdmin = user.role === "ADMIN";

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-stone-200/80 bg-white/80 backdrop-blur-md dark:border-stone-800 dark:bg-[#0c0e14]/80 transition-colors duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand / Logo */}
        <Link to={isAdmin ? "/admin" : "/user"} className="group flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 text-stone-950 shadow-xs shadow-amber-500/20 transition-transform duration-300 group-hover:scale-105">
            <CookingPot className="h-5 w-5" />
          </div>
          <div>
            <span className="font-serif text-lg font-bold tracking-tight text-stone-900 dark:text-stone-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
              Savor
            </span>
            <span className="ml-1.5 hidden text-xs font-medium uppercase tracking-widest text-stone-400 sm:inline-block">
              Recipe Book
            </span>
          </div>
        </Link>

        {/* Navigation Links for Admin / User */}
        <div className="flex items-center gap-2 sm:gap-4">
          {isAdmin ? (
            <Link
              to="/admin"
              className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-amber-700 bg-amber-50 border border-amber-200/60 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900/50"
            >
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Admin Mode</span>
            </Link>
          ) : (
            <Link
              to="/user"
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                location.pathname.startsWith("/user") || location.pathname.startsWith("/recipe")
                  ? "bg-stone-100 text-stone-900 dark:bg-stone-800 dark:text-stone-100"
                  : "text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">My Recipes</span>
            </Link>
          )}

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* User Profile Pill */}
          <div className="hidden md:flex items-center gap-2 pl-2 border-l border-stone-200 dark:border-stone-800">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-stone-200 text-xs font-bold text-stone-700 dark:bg-stone-800 dark:text-stone-300 uppercase">
              {user.name ? user.name.charAt(0) : "U"}
            </div>
            <div className="text-left">
              <p className="text-xs font-medium text-stone-800 dark:text-stone-200 leading-tight">
                {user.name}
              </p>
              <p className="text-[10px] text-stone-400 uppercase tracking-wider">
                {user.role}
              </p>
            </div>
          </div>

          {/* Sign Out Button */}
          <Button
            variant="tertiary"
            size="sm"
            onClick={logout}
            title="Sign out"
            className="flex items-center gap-1 text-stone-500 hover:text-rose-600 dark:text-stone-400 dark:hover:text-rose-400"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Sign out</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}
