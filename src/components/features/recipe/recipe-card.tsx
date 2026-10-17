import { Link } from "react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tag } from "@/components/ui/tag";
import RecipeMeta from "@/components/common/recipe-meta";
import { Trash2, ArrowUpRight } from "lucide-react";

type RecipeCardProps = {
  id: string;
  image: string;
  name: string;
  cuisine: string;
  mealType: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  cookTimeMinutes: number;
  tags: string[];
  onDelete: (id: string) => void;
};

export default function RecipeCard({
  id,
  image,
  name,
  cuisine,
  mealType,
  difficulty,
  cookTimeMinutes,
  tags,
  onDelete,
}: RecipeCardProps) {
  return (
    <Card className="group flex h-full flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-900/5 dark:hover:shadow-black/50 border border-stone-200/90 dark:border-stone-800">
      {/* Image container with gradient overlay & tags */}
      <div className="relative h-56 w-full overflow-hidden bg-stone-100 dark:bg-stone-800">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          onError={(e) => {
            // Fallback image if broken
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=800&q=80";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Floating Cuisine Badge */}
        <div className="absolute top-3 left-3">
          <span className="rounded-full bg-stone-950/70 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md shadow-xs">
            {cuisine}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div className="space-y-4">
          <Link to={`/recipe/${id}`} className="block group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
            <h3 className="font-serif text-xl font-bold tracking-tight text-stone-900 dark:text-stone-100 line-clamp-1">
              {name}
            </h3>
          </Link>

          <RecipeMeta
            cuisine={cuisine}
            mealType={mealType}
            difficulty={difficulty}
            cookTimeMinutes={cookTimeMinutes}
          />

          {tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {tags.slice(0, 4).map((tag) => (
                <Tag key={tag} variant="amber">
                  #{tag}
                </Tag>
              ))}
              {tags.length > 4 && (
                <Tag variant="default">+{tags.length - 4}</Tag>
              )}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-5 flex items-center gap-2 pt-3 border-t border-stone-100 dark:border-stone-800/80">
          <Link to={`/recipe/${id}`} className="flex-1">
            <Button className="w-full justify-center gap-1.5" size="sm">
              <span>View Recipe</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Button>
          </Link>

          <Button
            variant="danger"
            size="sm"
            onClick={() => onDelete(id)}
            title="Delete recipe"
            aria-label="Delete recipe"
            className="px-2.5"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
