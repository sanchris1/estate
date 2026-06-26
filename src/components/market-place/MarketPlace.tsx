import { getProperties } from "@/server-actions/getProperties";
import PropertyCard from "../property/PropertyCard";
import { Property } from "@/types/property";
import { EmptyState } from "../ui/EmptyState";

type MarketPlaceProps = {
  searchParams: {
    search?: string;
    propertyType?: string;
    location?: string;
    address?: string;
    minPrice?: number;
    maxPrice?: number;
  };
};

const MarketPlace = async ({ searchParams }: MarketPlaceProps) => {
  const properties: Property[] = await getProperties({
    search: searchParams.search,
    propertyType: searchParams.propertyType,
    location: searchParams.location,
    address: searchParams.address,
    minPrice: searchParams.minPrice,
    maxPrice: searchParams.maxPrice,
  });

  if (properties.length === 0)
    return (
      <EmptyState
        title="No matching properties"
        subTitle="Try adjusting your criteria or clear some filters to see more results"
        filter
      />
    );

  return (
    <div className="grid  gap-8 md:grid-cols-2 xl:grid-cols-3 my-4">
      {properties.map((p) => (
        <PropertyCard key={p.id} property={p} />
      ))}
    </div>
  );
};

export default MarketPlace;
