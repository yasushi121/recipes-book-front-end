import { useState, type SubmitEvent } from "react";
import { updateRecipeService, type Recipe } from "@/services/recipe-service";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Save, AlertCircle } from "lucide-react";

type UpdateRecipeFormProps = {
  recipe: Recipe;
  onSuccess: (updatedRecipe: Recipe) => void;
};

export default function UpdateRecipeForm({ recipe, onSuccess }: UpdateRecipeFormProps) {
  const [name, setName] = useState(recipe.name);
  const [cuisine, setCuisine] = useState(recipe.cuisine);
  const [difficulty, setDifficulty] = useState(recipe.difficulty);
  const [cookTimeMinutes, setCookTimeMinutes] = useState(recipe.cookTimeMinutes);
  const [ingredients, setIngredients] = useState(recipe.ingredients.join("\n"));
  const [instructions, setInstructions] = useState(recipe.instructions.join("\n"));
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const handleUpdateRecipe = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setBusy(true);

    try {
      const updatedRecipe = await updateRecipeService(recipe.id, {
        name,
        cuisine,
        difficulty,
        cookTimeMinutes: Number(cookTimeMinutes),
        ingredients: ingredients.split("\n").filter((item) => item.trim() !== ""),
        instructions: instructions.split("\n").filter((item) => item.trim() !== ""),
      });

      onSuccess(updatedRecipe);
    } catch (requestError) {
      setError(
        typeof requestError === "object" && requestError !== null && "response" in requestError
          ? ((requestError as { response?: { data?: { message?: string } } }).response?.data?.message ||
              "Unable to update recipe. Please try again.")
          : "Unable to connect to the API server."
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={handleUpdateRecipe} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
          General Properties
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor="update-recipe-name">Recipe Name</Label>
            <Input
              id="update-recipe-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="update-recipe-cuisine">Cuisine</Label>
            <Input
              id="update-recipe-cuisine"
              type="text"
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="update-recipe-difficulty">Difficulty</Label>
            <Select
              id="update-recipe-difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as Recipe["difficulty"])}
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </Select>
          </div>

          <div>
            <Label htmlFor="update-recipe-cook-time">Cook Time (minutes)</Label>
            <Input
              id="update-recipe-cook-time"
              type="number"
              min="1"
              value={cookTimeMinutes}
              onChange={(e) => setCookTimeMinutes(Number(e.target.value))}
              required
            />
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4 border-t border-stone-100 dark:border-stone-800/80">
        <h3 className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
          Preparation Steps
        </h3>

        <div>
          <Label htmlFor="update-recipe-ingredients">Ingredients (one per line)</Label>
          <Textarea
            id="update-recipe-ingredients"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            rows={5}
            required
          />
        </div>

        <div>
          <Label htmlFor="update-recipe-instructions">Instructions (one per line)</Label>
          <Textarea
            id="update-recipe-instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            rows={5}
            required
          />
        </div>
      </div>

      {error && (
        <div
          role="alert"
          className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-300"
        >
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="pt-2">
        <Button
          type="submit"
          disabled={busy}
          className="w-full justify-center gap-2 py-3 shadow-md"
        >
          <Save className="h-4 w-4" />
          <span>{busy ? "Saving Changes…" : "Update Recipe"}</span>
        </Button>
      </div>
    </form>
  );
}
