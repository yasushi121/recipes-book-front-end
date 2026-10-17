import { useEffect, useState, useMemo } from "react";
import { getAllRecipesService } from "@/services/recipe-service";
import { Button } from "@/components/ui/button";
import { AdminRecipesTable, type AdminRecipe } from "./admin-recipes-table";
import { RefreshCw, Search, BookOpen, Clock, Users, AlertCircle } from "lucide-react";

export function AdminRecipes() {
  const [recipes, setRecipes] = useState<AdminRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reload, setReload] = useState(0);
  const [search, setSearch] = useState("");

  useEffect(function fetchRecipes() {
    let active = true;

    async function loadAllRecipes() {
      setLoading(true);
      setError("");

      try {
        const rows = await getAllRecipesService();
        if (active) {
          setRecipes(rows);
        }
      } catch {
        if (active) {
          setError("Unable to load recipes across users. Ensure backend is running.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadAllRecipes();

    return () => {
      active = false;
    };
  }, [reload]);

  function handleRefresh() {
    setReload((prev) => prev + 1);
  }

  // Filter recipes
  const filteredRecipes = useMemo(() => {
    return recipes.filter(
      (r) =>
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.cuisine.toLowerCase().includes(search.toLowerCase()) ||
        (r.ownerName && r.ownerName.toLowerCase().includes(search.toLowerCase()))
    );
  }, [recipes, search]);

  // Quick stats
  const totalRecipes = recipes.length;
  const uniqueAuthors = useMemo(() => {
    return new Set(recipes.map((r) => r.userId)).size;
  }, [recipes]);
  const avgCookTime = useMemo(() => {
    if (recipes.length === 0) return 0;
    const total = recipes.reduce((acc, r) => acc + (r.cookTimeMinutes || 0), 0);
    return Math.round(total / recipes.length);
  }, [recipes]);

  return (
    <section aria-label="All recipes" className="space-y-6">
      {/* Admin KPI Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-stone-200/90 bg-white/90 p-5 shadow-2xs dark:border-stone-800 dark:bg-stone-900/90">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400">
                Total Recipes
              </p>
              <p className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-50">
                {totalRecipes}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-stone-200/90 bg-white/90 p-5 shadow-2xs dark:border-stone-800 dark:bg-stone-900/90">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400">
                Active Creators
              </p>
              <p className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-50">
                {uniqueAuthors}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-stone-200/90 bg-white/90 p-5 shadow-2xs dark:border-stone-800 dark:bg-stone-900/90">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-stone-500 dark:text-stone-400">
                Avg. Cook Time
              </p>
              <p className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-50">
                {avgCookTime} mins
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Actions Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
          <input
            type="text"
            placeholder="Search by recipe, cuisine, creator…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-2xl border border-stone-200/90 bg-white/90 pl-10 pr-4 py-2 text-sm text-stone-900 placeholder:text-stone-400 shadow-2xs outline-none transition-all focus:border-amber-500 focus:ring-3 focus:ring-amber-500/15 dark:border-stone-800 dark:bg-stone-900/90 dark:text-stone-100"
          />
        </div>

        <Button
          variant="secondary"
          size="sm"
          disabled={loading}
          onClick={handleRefresh}
          className="gap-2 self-start sm:self-auto"
        >
          <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh Records</span>
        </Button>
      </div>

      {error ? (
        <div
          role="alert"
          className="flex items-center gap-2.5 rounded-2xl border border-rose-200 bg-rose-50/90 p-4 text-sm text-rose-700 shadow-2xs dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-300"
        >
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      ) : (
        <AdminRecipesTable recipes={filteredRecipes} loading={loading} />
      )}
    </section>
  );
}
