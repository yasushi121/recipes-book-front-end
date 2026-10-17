import { Link, useParams } from "react-router";
import { Section } from "@/components/ui/section";
import { RecipeDetails } from "@/components/features/recipe/recipe-details";
import { Navbar } from "@/components/common/navbar";
import { ArrowLeft } from "lucide-react";

export default function RecipePage() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-stone-50/50 dark:bg-[#0c0e14] transition-colors duration-300 pb-16">
      <Navbar />

      <Section>
        <div className="pt-2">
          <Link
            to="/user"
            className="inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-xs font-semibold text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-stone-100"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to recipe collection</span>
          </Link>
        </div>

        {id && <RecipeDetails key={id} id={id} />}
      </Section>
    </div>
  );
}
