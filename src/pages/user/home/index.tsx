import { PageHeader } from "@/components/common/page-header";
import { RecipeCollection } from "@/components/features/recipe/recipe-collection";
import { Section } from "@/components/ui/section";
import { Navbar } from "@/components/common/navbar";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-stone-50/50 dark:bg-[#0c0e14] transition-colors duration-300 pb-16">
      <Navbar />

      <Section>
        <PageHeader
          eyebrow="Personal Cookbook"
          title="Savor Every Flavor"
          description="Crafted for food lovers. Keep your culinary inspiration, signature dishes, and everyday meal ideas in one elegant space."
        />

        <RecipeCollection />
      </Section>
    </div>
  );
}
