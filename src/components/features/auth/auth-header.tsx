import { CookingPot } from "lucide-react";

export function AuthHeader() {
  return (
    <header className="mb-8 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-600 to-amber-400 text-stone-950 shadow-md shadow-amber-500/20">
        <CookingPot className="h-6 w-6" />
      </div>
      <p className="mb-2 text-xs font-semibold tracking-widest text-amber-700 uppercase dark:text-amber-400">
        Culinary Companion
      </p>
      <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
        Recipe Book
      </h1>
      <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
        Keep your favorite recipes organized and inspired.
      </p>
    </header>
  );
}