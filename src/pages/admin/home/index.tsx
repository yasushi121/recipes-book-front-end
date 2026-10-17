import { PageHeader } from "@/components/common/page-header";
import { AdminRecipes } from "@/components/features/admin/admin-recipes";
import { Section } from "@/components/ui/section";
import { Navbar } from "@/components/common/navbar";

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-stone-50/50 dark:bg-[#0c0e14] transition-colors duration-300 pb-16">
      <Navbar />

      <Section>
        <PageHeader
          eyebrow="System Administration"
          title="Recipe Master Registry"
          description="Global administrative dashboard. Inspect, audit, and oversee all recipes created across student and user accounts."
        />

        <AdminRecipes />
      </Section>
    </div>
  );
}
