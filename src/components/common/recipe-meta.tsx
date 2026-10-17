import { Clock, Globe, Utensils, Flame } from "lucide-react";

type RecipeMetaProps = {
  cuisine: string;
  mealType: string[];
  difficulty: string;
  cookTimeMinutes: number;
};

export default function RecipeMeta({ cuisine, mealType, difficulty, cookTimeMinutes }: RecipeMetaProps) {
  const getDifficultyColor = (diff: string) => {
    switch (diff.toLowerCase()) {
      case "easy":
        return "text-emerald-700 bg-emerald-50 border-emerald-200/60 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900/50";
      case "medium":
        return "text-amber-700 bg-amber-50 border-amber-200/60 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900/50";
      case "hard":
        return "text-rose-700 bg-rose-50 border-rose-200/60 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-900/50";
      default:
        return "text-stone-700 bg-stone-50 border-stone-200 dark:bg-stone-800 dark:text-stone-300";
    }
  };

  return (
    <div className="grid grid-cols-2 gap-2.5 text-xs">
      <div className="flex items-center gap-2 rounded-xl border border-stone-100 bg-stone-50/70 p-2.5 dark:border-stone-800/80 dark:bg-stone-900/60">
        <Globe className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-wider text-stone-400">Cuisine</p>
          <p className="font-medium text-stone-800 dark:text-stone-200 truncate">{cuisine}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-stone-100 bg-stone-50/70 p-2.5 dark:border-stone-800/80 dark:bg-stone-900/60">
        <Clock className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-wider text-stone-400">Time</p>
          <p className="font-medium text-stone-800 dark:text-stone-200">{cookTimeMinutes} mins</p>
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-stone-100 bg-stone-50/70 p-2.5 dark:border-stone-800/80 dark:bg-stone-900/60">
        <Flame className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-wider text-stone-400">Level</p>
          <span className={`inline-block rounded-md border px-1.5 py-0.2 text-[11px] font-semibold ${getDifficultyColor(difficulty)}`}>
            {difficulty}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-stone-100 bg-stone-50/70 p-2.5 dark:border-stone-800/80 dark:bg-stone-900/60">
        <Utensils className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-wider text-stone-400">Meal</p>
          <p className="font-medium text-stone-800 dark:text-stone-200 truncate">{mealType.join(", ")}</p>
        </div>
      </div>
    </div>
  );
}
