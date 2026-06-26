import { Suspense } from "react";
import PropertyCard from "../property/PropertyCard";
import { getRecentProperties } from "@/server-actions/getRecentsProperties";
import CardSkeletons from "../skeletons/CardSkeletons";

const NewProperties = async () => {
  return (
    <section className="py-24 ">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        {/* header */}
        <div className="mx-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase text-primary tracking-[0.25em]">
            New listings
          </p>
          <h2 className="text-3xl font-bold text-text md:text-4xl">
            Discover recently Added properties
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-text/70">
            Browse latest homes ,apartments, villas and investment opportunities
            ass to our market place by out trusted property owners and agents.
          </p>
        </div>

        {/* properties grid */}
        <Suspense fallback={<CardSkeletons />}>
          <RecentPropertiesContent />
        </Suspense>
      </div>
    </section>
  );
};

export default NewProperties;

async function RecentPropertiesContent() {
  const properties = await getRecentProperties();
  return (
    <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3 my-6">
      {properties.slice(0, 6).map((property) => (
        <PropertyCard key={property.id} property={property} />
      ))}
    </div>
  );
}
