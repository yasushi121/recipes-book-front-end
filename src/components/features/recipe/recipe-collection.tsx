import { useEffect, useState, useMemo } from "react";
import { useAuth } from "@/components/context/use-auth";
import { deleteRecipeService, getRecipesService, type Recipe } from "@/services/recipe-service";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import RecipeCard from "@/components/features/recipe/recipe-card";
import AddRecipeForm from "@/components/features/recipe/add-recipe-form";
import { Navigate } from "react-router";
import { Plus, Search, Filter, Sparkles, ChefHat, AlertCircle } from "lucide-react";

export function RecipeCollection() {
  const { user, ready } = useAuth();
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // UX Enhancements: Search & Difficulty filter
  const [searchQuery, setSearchQuery] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("ALL");

  useEffect(function fetchRecipes() {
    if (!ready || !user) {
      return;
    }

    let active = true;

    async function loadRecipes() {
      try {
        setLoading(true);
        const result = await getRecipesService();
        if (active) {
          setRecipes(result);
          setError("");
        }
      } catch {
        if (active) {
          setError("Unable to load recipes. Please check your backend connection.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadRecipes();

    function cleanup() {
      active = false;
    }

    return cleanup;
  }, [ready, user]);

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to remove this recipe from your collection?")) return;
    try {
      await deleteRecipeService(id);
      setRecipes((current) => current.filter((recipe) => recipe.id !== id));
    } catch {
      setError("Unable to delete this recipe. Please try again.");
    }
  }

  // Filter recipes based on search query and difficulty filter
  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      const matchesSearch =
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
        recipe.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        recipe.ingredients.some((i) => i.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesDifficulty =
        difficultyFilter === "ALL" ||
        recipe.difficulty.toUpperCase() === difficultyFilter.toUpperCase();

      return matchesSearch && matchesDifficulty;
    });
  }, [recipes, searchQuery, difficultyFilter]);

  if (!ready) return null;
  if (!user) return <Navigate to="/auth/login" replace />;

  function openForm() {
    setOpen(true);
  }

  function closeForm() {
    setOpen(false);
  }

  function handleCreated(newRecipe: Recipe) {
    setRecipes((current) => [newRecipe, ...current]);
    closeForm();
  }

  return (
    <div>
      {/* Top Controls: Search, Difficulty filter pills, Add Recipe CTA */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-wrap items-center gap-3">
          {/* Search bar */}
          <div className="relative min-w-[240px] flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-stone-400" />
            <input
              type="text"
              placeholder="Search by recipe, cuisine, ingredient..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-2xl border border-stone-200/90 bg-white/90 pl-10 pr-4 py-2.5 text-sm text-stone-900 placeholder:text-stone-400 shadow-2xs outline-none transition-all focus:border-amber-500 focus:ring-3 focus:ring-amber-500/15 dark:border-stone-800 dark:bg-stone-900/90 dark:text-stone-100 dark:placeholder:text-stone-500"
            />
          </div>

          {/* Difficulty Filter Pills */}
          <div className="flex items-center gap-1 rounded-2xl border border-stone-200/90 bg-white/80 p-1 text-xs shadow-2xs dark:border-stone-800 dark:bg-stone-900/80">
            <Filter className="ml-2 mr-1 h-3.5 w-3.5 text-stone-400" />
            {(["ALL", "Easy", "Medium", "Hard"] as const).map((level) => (
              <button
                key={level}
                onClick={() => setDifficultyFilter(level)}
                className={`rounded-xl px-2.5 py-1 font-medium transition-all cursor-pointer ${
                  difficultyFilter === level
                    ? "bg-stone-900 text-stone-50 dark:bg-amber-500 dark:text-stone-950 shadow-2xs"
                    : "text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
                }`}
              >
                {level === "ALL" ? "All" : level}
              </button>
            ))}
          </div>
        </div>

        {/* Primary Action Button */}
        <Button onClick={openForm} className="shrink-0 gap-2 shadow-xs">
          <Plus className="h-4 w-4" />
          <span>New Recipe</span>
        </Button>
      </div>

      {/* Error alert if any */}
      {error && (
        <div
          role="alert"
          className="mb-6 flex items-center gap-2.5 rounded-2xl border border-rose-200 bg-rose-50/90 p-4 text-sm text-rose-700 shadow-2xs dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-300"
        >
          <AlertCircle className="h-4 w-4 shrink-0 text-rose-500" />
          <span>{error}</span>
        </div>
      )}

      {/* Loading Skeleton */}
      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="h-96 rounded-2xl border border-stone-200/60 bg-stone-100/50 animate-pulse dark:border-stone-800 dark:bg-stone-900/50"
            />
          ))}
        </div>
      ) : recipes.length === 0 ? (
        /* Empty State: No recipes yet */
        <div className="relative overflow-hidden rounded-3xl border border-dashed border-stone-300/80 bg-white/60 px-6 py-20 text-center dark:border-stone-800 dark:bg-stone-900/40">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <ChefHat className="h-8 w-8" />
          </div>
          <h3 className="mt-4 font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
            A blank canvas for your kitchen
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-stone-500 dark:text-stone-400">
            Capture secret family traditions, weekday staples, or experimental dishes you want to master.
          </p>
          <Button className="mt-6 gap-2" onClick={openForm}>
            <Sparkles className="h-4 w-4" />
            <span>Create your first recipe</span>
          </Button>
        </div>
      ) : filteredRecipes.length === 0 ? (
        /* Empty Filter Results */
        <div className="rounded-3xl border border-stone-200/80 bg-white/60 px-6 py-16 text-center dark:border-stone-800 dark:bg-stone-900/40">
          <p className="font-serif text-lg font-semibold text-stone-800 dark:text-stone-200">
            No recipes matched your search
          </p>
          <p className="mt-1 text-xs text-stone-500">
            Try searching for something else or clearing your filters.
          </p>
          <Button
            variant="secondary"
            size="sm"
            className="mt-4"
            onClick={() => {
              setSearchQuery("");
              setDifficultyFilter("ALL");
            }}
          >
            Reset Filters
          </Button>
        </div>
      ) : (
        /* Recipe Cards Grid */
        <div>
          <div className="mb-4 flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
            <span>
              Showing {filteredRecipes.length} of {recipes.length} {recipes.length === 1 ? "recipe" : "recipes"}
            </span>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} {...recipe} onDelete={handleDelete} />
            ))}
          </div>
        </div>
      )}

      {/* Add Recipe Modal */}
      <Modal
        open={open}
        onClose={closeForm}
        title="Create New Recipe"
        description="Fill in the details to add this dish to your cookbook."
      >
        <AddRecipeForm onSuccess={handleCreated} />
      </Modal>
    </div>
  );
}
