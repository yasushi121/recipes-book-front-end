import { useEffect, useState } from "react";
import { getRecipeService, type Recipe } from "@/services/recipe-service";
import RecipeMeta from "@/components/common/recipe-meta";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import UpdateRecipeForm from "@/components/features/recipe/update-recipe-form";
import { Edit3, CheckCircle2, Circle, UtensilsCrossed, ChefHat, AlertCircle } from "lucide-react";

export function RecipeDetails({ id }: { id: string }) {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Interactive UX: Check off ingredients while cooking
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});

  useEffect(() => {
    let active = true;
    async function loadRecipe(recipeId: string) {
      try {
        setLoading(true);
        const result = await getRecipeService(recipeId);
        if (active) {
          setRecipe(result);
        }
      } catch {
        if (active) {
          setError("Recipe not found or you do not have permission to view it.");
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadRecipe(id);

    return () => {
      active = false;
    };
  }, [id]);

  function openForm() {
    setOpen(true);
  }

  function closeForm() {
    setOpen(false);
  }

  function handleUpdated(updatedRecipe: Recipe) {
    setRecipe(updatedRecipe);
    closeForm();
  }

  function toggleIngredient(index: number) {
    setCheckedIngredients((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  }

  if (loading) {
    return (
      <div className="mt-8 space-y-6">
        <div className="h-96 rounded-3xl bg-stone-100 animate-pulse dark:bg-stone-900" />
        <div className="grid gap-8 md:grid-cols-3">
          <div className="h-64 rounded-2xl bg-stone-100 animate-pulse dark:bg-stone-900" />
          <div className="md:col-span-2 h-64 rounded-2xl bg-stone-100 animate-pulse dark:bg-stone-900" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        role="alert"
        className="mt-8 flex items-center gap-3 rounded-2xl border border-rose-200 bg-rose-50/90 p-6 text-rose-700 shadow-2xs dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-300"
      >
        <AlertCircle className="h-5 w-5 shrink-0" />
        <div>
          <p className="font-semibold">Unable to load recipe</p>
          <p className="text-sm mt-0.5">{error}</p>
        </div>
      </div>
    );
  }

  if (!recipe) return null;

  return (
    <div className="mt-6 space-y-8">
      {/* Recipe Header Card */}
      <Card className="overflow-hidden border border-stone-200/90 dark:border-stone-800">
        <div className="grid lg:grid-cols-12">
          {/* Image Column */}
          <div className="relative h-72 sm:h-96 lg:h-auto lg:col-span-5 overflow-hidden bg-stone-100 dark:bg-stone-800">
            <img
              src={recipe.image}
              alt={recipe.name}
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=800&q=80";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
          </div>

          {/* Details Column */}
          <div className="flex flex-col justify-between p-6 sm:p-10 lg:col-span-7 space-y-6">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-700 dark:text-amber-300 uppercase tracking-wider">
                  {recipe.cuisine} Dish
                </span>
                <Button onClick={openForm} variant="secondary" size="sm" className="gap-1.5">
                  <Edit3 className="h-3.5 w-3.5" />
                  <span>Edit Recipe</span>
                </Button>
              </div>

              <h1 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 dark:text-stone-50">
                {recipe.name}
              </h1>

              {recipe.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {recipe.tags.map((tag) => (
                    <Tag key={tag} variant="amber">
                      #{tag}
                    </Tag>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Metadata Box */}
            <div className="rounded-2xl border border-stone-200/80 bg-stone-50/70 p-4 dark:border-stone-800 dark:bg-stone-950/60">
              <RecipeMeta
                cuisine={recipe.cuisine}
                mealType={recipe.mealType}
                difficulty={recipe.difficulty}
                cookTimeMinutes={recipe.cookTimeMinutes}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Main Culinary Breakdown: Ingredients & Step-by-Step Instructions */}
      <div className="grid gap-8 lg:grid-cols-12">
        {/* Left Column: Interactive Ingredients Checklist */}
        <div className="lg:col-span-5">
          <Card className="h-full p-6 sm:p-8 border border-stone-200/90 dark:border-stone-800">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4 dark:border-stone-800">
              <div className="flex items-center gap-2">
                <UtensilsCrossed className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
                  Ingredients
                </h2>
              </div>
              <span className="text-xs text-stone-500 dark:text-stone-400">
                {recipe.ingredients.length} items
              </span>
            </div>

            <p className="mt-3 text-xs text-stone-400 dark:text-stone-500">
              Tip: Click any ingredient to cross it off as you prep!
            </p>

            <ul className="mt-4 space-y-2.5">
              {recipe.ingredients.map((ingredient, index) => {
                const isChecked = !!checkedIngredients[index];
                return (
                  <li
                    key={`${ingredient}-${index}`}
                    onClick={() => toggleIngredient(index)}
                    className={`flex items-start gap-3 rounded-xl p-2.5 transition-colors cursor-pointer select-none ${
                      isChecked
                        ? "bg-emerald-50/60 text-stone-400 line-through dark:bg-emerald-950/20 dark:text-stone-500"
                        : "hover:bg-stone-50 dark:hover:bg-stone-800/50 text-stone-800 dark:text-stone-200"
                    }`}
                  >
                    {isChecked ? (
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
                    ) : (
                      <Circle className="h-4 w-4 shrink-0 text-stone-300 dark:text-stone-600 mt-0.5" />
                    )}
                    <span className="text-sm font-medium leading-relaxed">{ingredient}</span>
                  </li>
                );
              })}
            </ul>
          </Card>
        </div>

        {/* Right Column: Step-by-Step Instructions */}
        <div className="lg:col-span-7">
          <Card className="h-full p-6 sm:p-8 border border-stone-200/90 dark:border-stone-800">
            <div className="flex items-center justify-between border-b border-stone-100 pb-4 dark:border-stone-800">
              <div className="flex items-center gap-2">
                <ChefHat className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                <h2 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
                  Instructions
                </h2>
              </div>
              <span className="text-xs text-stone-500 dark:text-stone-400">
                {recipe.instructions.length} steps
              </span>
            </div>

            <div className="mt-6 space-y-4">
              {recipe.instructions.map((instruction, index) => (
                <div
                  key={`${instruction}-${index}`}
                  className="flex items-start gap-4 rounded-2xl border border-stone-100 bg-stone-50/50 p-4 transition-all duration-200 hover:border-stone-200 dark:border-stone-800/70 dark:bg-stone-900/40 dark:hover:border-stone-700"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-stone-900 font-mono text-xs font-bold text-white dark:bg-amber-500 dark:text-stone-950">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-stone-800 dark:text-stone-200 pt-0.5">
                    {instruction}
                  </p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Edit Recipe Modal */}
      <Modal
        open={open}
        onClose={closeForm}
        title="Edit Recipe"
        description="Update your ingredients, instructions, or recipe properties."
      >
        <UpdateRecipeForm recipe={recipe} onSuccess={handleUpdated} />
      </Modal>
    </div>
  );
}
