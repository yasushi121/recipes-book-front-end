import { useState, type SubmitEvent } from "react";
import { createRecipeService, type Recipe } from "@/services/recipe-service";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { PlusCircle, AlertCircle } from "lucide-react";

type AddRecipeFormProps = {
  onSuccess: (newRecipe: Recipe) => void;
};

type FormErrors = {
  name?: string;
  image?: string;
  cuisine?: string;
  difficulty?: string;
  cookTimeMinutes?: string;
  mealType?: string;
  tags?: string;
  ingredients?: string;
  instructions?: string;
};

const messages: FormErrors = {
  name: "Recipe title is required",
  image: "Image URL is required",
  cuisine: "Cuisine type is required",
  difficulty: "Difficulty rating is required",
  cookTimeMinutes: "Cook time is required",
  mealType: "At least one meal type is required",
  tags: "At least one tag is required",
  ingredients: "Ingredients list is required",
  instructions: "Preparation steps are required",
};

export default function AddRecipeForm({ onSuccess }: AddRecipeFormProps) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard">("Easy");
  const [cookTimeMinutes, setCookTimeMinutes] = useState("");
  const [mealType, setMealType] = useState("");
  const [tags, setTags] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [busy, setBusy] = useState(false);

  const checkField = (field: keyof FormErrors, value: string) => {
    setErrors((prev) => ({
      ...prev,
      [field]: value.trim() === "" ? messages[field] : undefined,
    }));
  };

  const handleAddRecipe = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError("");

    const values = { name, image, cuisine, difficulty, cookTimeMinutes, mealType, tags, ingredients, instructions };
    const newErrors: FormErrors = {};
    let hasError = false;

    for (const field in values) {
      const key = field as keyof FormErrors;
      if (values[key].trim() === "") {
        newErrors[key] = messages[key];
        hasError = true;
      }
    }

    setErrors(newErrors);

    if (hasError) {
      return;
    }

    setBusy(true);

    try {
      const newRecipe = await createRecipeService({
        name,
        image,
        cuisine,
        difficulty,
        cookTimeMinutes: Number(cookTimeMinutes),
        mealType: mealType.split("\n").filter((item) => item.trim() !== ""),
        tags: tags.split("\n").filter((item) => item.trim() !== ""),
        ingredients: ingredients.split("\n").filter((item) => item.trim() !== ""),
        instructions: instructions.split("\n").filter((item) => item.trim() !== ""),
      });

      onSuccess(newRecipe);
    } catch (error) {
      setSubmitError(
        typeof error === "object" && error !== null && "response" in error
          ? ((error as { response?: { data?: { message?: string } } }).response?.data?.message ||
              "Unable to create recipe. Please try again.")
          : "Unable to connect to the API server."
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={handleAddRecipe} className="space-y-6">
      {/* Basic Information Section */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
          1. General Details
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Label htmlFor="recipe-name" error={errors.name}>Recipe Name</Label>
            <Input
              id="recipe-name"
              type="text"
              placeholder="e.g. Creamy Tuscan Garlic Chicken"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                checkField("name", e.target.value);
              }}
              onBlur={() => checkField("name", name)}
              error={errors.name}
            />
          </div>

          <div className="sm:col-span-2">
            <Label htmlFor="recipe-image" error={errors.image}>Image URL</Label>
            <div className="flex gap-3 items-center">
              <Input
                id="recipe-image"
                type="url"
                placeholder="https://example.com/photo.jpg"
                value={image}
                onChange={(e) => {
                  setImage(e.target.value);
                  checkField("image", e.target.value);
                }}
                onBlur={() => checkField("image", image)}
                error={errors.image}
              />
              {image && (
                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-stone-200 bg-stone-100 dark:border-stone-800 dark:bg-stone-800">
                  <img
                    src={image}
                    alt="Preview"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              )}
            </div>
            <p className="mt-1 text-[11px] text-stone-400">
              Provide a direct image link (e.g., Unsplash or high quality JPG/PNG).
            </p>
          </div>

          <div>
            <Label htmlFor="recipe-cuisine" error={errors.cuisine}>Cuisine</Label>
            <Input
              id="recipe-cuisine"
              type="text"
              placeholder="e.g. Italian, Japanese, Mexican"
              value={cuisine}
              onChange={(e) => {
                setCuisine(e.target.value);
                checkField("cuisine", e.target.value);
              }}
              onBlur={() => checkField("cuisine", cuisine)}
              error={errors.cuisine}
            />
          </div>

          <div>
            <Label htmlFor="recipe-difficulty" error={errors.difficulty}>Difficulty</Label>
            <Select
              id="recipe-difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as "Easy" | "Medium" | "Hard")}
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </Select>
          </div>

          <div>
            <Label htmlFor="recipe-cook-time" error={errors.cookTimeMinutes}>
              Cook Time (minutes)
            </Label>
            <Input
              id="recipe-cook-time"
              type="number"
              min="1"
              placeholder="e.g. 35"
              value={cookTimeMinutes}
              onChange={(e) => {
                setCookTimeMinutes(e.target.value);
                checkField("cookTimeMinutes", e.target.value);
              }}
              onBlur={() => checkField("cookTimeMinutes", cookTimeMinutes)}
              error={errors.cookTimeMinutes}
            />
          </div>
        </div>
      </div>

      {/* Categorization */}
      <div className="space-y-4 pt-4 border-t border-stone-100 dark:border-stone-800/80">
        <h3 className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
          2. Meal Type & Tags
        </h3>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="recipe-meal-type" error={errors.mealType}>
              Meal Types (one per line)
            </Label>
            <Textarea
              id="recipe-meal-type"
              rows={3}
              placeholder={"Dinner\nMain Course"}
              value={mealType}
              onChange={(e) => {
                setMealType(e.target.value);
                checkField("mealType", e.target.value);
              }}
              onBlur={() => checkField("mealType", mealType)}
              error={errors.mealType}
            />
          </div>

          <div>
            <Label htmlFor="recipe-tags" error={errors.tags}>
              Tags (one per line)
            </Label>
            <Textarea
              id="recipe-tags"
              rows={3}
              placeholder={"Comfort Food\nGluten Free\nQuick"}
              value={tags}
              onChange={(e) => {
                setTags(e.target.value);
                checkField("tags", e.target.value);
              }}
              onBlur={() => checkField("tags", tags)}
              error={errors.tags}
            />
          </div>
        </div>
      </div>

      {/* Culinary Preparation */}
      <div className="space-y-4 pt-4 border-t border-stone-100 dark:border-stone-800/80">
        <h3 className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
          3. Culinary Steps
        </h3>

        <div>
          <Label htmlFor="recipe-ingredients" error={errors.ingredients}>
            Ingredients (one per line)
          </Label>
          <Textarea
            id="recipe-ingredients"
            rows={4}
            placeholder={"2 boneless chicken breasts\n1 cup heavy cream\n3 cloves garlic, minced\n1 cup fresh spinach"}
            value={ingredients}
            onChange={(e) => {
              setIngredients(e.target.value);
              checkField("ingredients", e.target.value);
            }}
            onBlur={() => checkField("ingredients", ingredients)}
            error={errors.ingredients}
          />
        </div>

        <div>
          <Label htmlFor="recipe-instructions" error={errors.instructions}>
            Instructions (one step per line)
          </Label>
          <Textarea
            id="recipe-instructions"
            rows={5}
            placeholder={"Heat olive oil in a skillet over medium-high heat.\nSeason chicken with salt, pepper, and sear until golden.\nStir in garlic, heavy cream, and simmer until thick."}
            value={instructions}
            onChange={(e) => {
              setInstructions(e.target.value);
              checkField("instructions", e.target.value);
            }}
            onBlur={() => checkField("instructions", instructions)}
            error={errors.instructions}
          />
        </div>
      </div>

      {submitError && (
        <div
          role="alert"
          className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-300"
        >
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{submitError}</span>
        </div>
      )}

      <div className="pt-2">
        <Button
          type="submit"
          disabled={busy}
          className="w-full justify-center gap-2 py-3 shadow-md"
        >
          <PlusCircle className="h-4 w-4" />
          <span>{busy ? "Saving Recipe…" : "Publish Recipe"}</span>
        </Button>
      </div>
    </form>
  );
}
