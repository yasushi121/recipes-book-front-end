import { Table } from "@/components/ui/table";
import { Tag } from "@/components/ui/tag";
import type { AdminRecipe } from "@/services/recipe-service";
import { Clock, User } from "lucide-react";

export type { AdminRecipe } from "@/services/recipe-service";

type AdminRecipesTableProps = {
  recipes: AdminRecipe[];
  loading: boolean;
};

export function AdminRecipesTable({ recipes, loading }: AdminRecipesTableProps) {
  const getDifficultyVariant = (diff: string): "emerald" | "amber" | "rose" | "default" => {
    switch (diff.toLowerCase()) {
      case "easy":
        return "emerald";
      case "medium":
        return "amber";
      case "hard":
        return "rose";
      default:
        return "default";
    }
  };

  return (
    <Table>
      <caption className="sr-only">Recipes from all users</caption>
      <thead>
        <tr>
          <th scope="col">Recipe</th>
          <th scope="col">Cuisine</th>
          <th scope="col">Meal type</th>
          <th scope="col">Difficulty</th>
          <th scope="col">Cook time</th>
          <th scope="col">Author / Owner</th>
          <th scope="col">User ID</th>
        </tr>
      </thead>
      <tbody>
        {!loading && recipes.length === 0 && (
          <tr>
            <td colSpan={7} className="py-12 text-center text-stone-500 dark:text-stone-400">
              No recipes have been published in the database yet.
            </td>
          </tr>
        )}
        {recipes.map(function renderRecipe(recipe) {
          return (
            <tr key={recipe.id} className="transition-colors">
              <td>
                <div className="flex min-w-56 items-center gap-3">
                  <img
                    src={recipe.image}
                    alt=""
                    className="h-11 w-11 rounded-xl object-cover bg-stone-100 dark:bg-stone-800 border border-stone-200/80 dark:border-stone-800"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=400&q=80";
                    }}
                  />
                  <div>
                    <span className="font-semibold text-stone-900 dark:text-stone-100 block line-clamp-1">
                      {recipe.name}
                    </span>
                    <span className="text-[11px] text-stone-400 capitalize">
                      {recipe.cuisine}
                    </span>
                  </div>
                </div>
              </td>
              <td>
                <span className="inline-block rounded-md bg-stone-100 px-2 py-0.5 text-xs font-medium text-stone-700 dark:bg-stone-800 dark:text-stone-300">
                  {recipe.cuisine}
                </span>
              </td>
              <td>
                <span className="text-xs text-stone-600 dark:text-stone-400">
                  {recipe.mealType.join(", ")}
                </span>
              </td>
              <td>
                <Tag variant={getDifficultyVariant(recipe.difficulty)}>
                  {recipe.difficulty}
                </Tag>
              </td>
              <td>
                <div className="flex items-center gap-1.5 text-xs text-stone-600 dark:text-stone-300">
                  <Clock className="h-3.5 w-3.5 text-stone-400" />
                  <span>{recipe.cookTimeMinutes} mins</span>
                </div>
              </td>
              <td>
                <div className="flex items-center gap-2">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-100 text-[10px] font-bold text-amber-900 dark:bg-amber-950/60 dark:text-amber-300">
                    <User className="h-3 w-3" />
                  </div>
                  <span className="text-xs font-medium text-stone-800 dark:text-stone-200">
                    {recipe.ownerName || "Community Member"}
                  </span>
                </div>
              </td>
              <td>
                <code className="rounded bg-stone-100 px-1.5 py-0.5 font-mono text-[11px] text-stone-500 dark:bg-stone-800/80 dark:text-stone-400">
                  {recipe.userId.slice(0, 8)}…
                </code>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
