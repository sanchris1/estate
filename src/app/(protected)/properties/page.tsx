import FrontendLayout from "@/components/layouts/FrontendLayout";
import Navbar from "@/components/navbar/Navbar";
import PropertyCard from "@/components/property/PropertyCard";
import CardSkeletons from "@/components/skeletons/CardSkeletons";
import { EmptyState } from "@/components/ui/EmptyState";
import { getUserProperties } from "@/server-actions/getCurrentUserProperties";
import { Suspense } from "react";

const PropertiesPage = () => {
  return (
    <FrontendLayout>
      <Navbar variant="solid" />

      <div className="mx-auto max-w-7xl p-6 lg:px-2 w-full">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold text-text md:text-3xl">
            My Properties
          </h2>
        </div>

        <Suspense fallback={<CardSkeletons />}>
          <PropertiesContent />
        </Suspense>
      </div>
    </FrontendLayout>
  );
};

export default PropertiesPage;

async function PropertiesContent() {
  const currentUserProperties = await getUserProperties();

  if (currentUserProperties.length === 0)
    return (
      <EmptyState
        title="No properties"
        subTitle="Please create some properties"
      />
    );

  return (
    <div className="grid  gap-8 md:grid-cols-2 xl:grid-cols-3 my-4">
      {currentUserProperties.map((p) => (
        <PropertyCard key={p.id} property={p} />
      ))}
    </div>
  );
}
