import FrontendLayout from "@/components/layouts/FrontendLayout";
import Navbar from "@/components/navbar/Navbar";
import FilterButton from "@/components/market-place/FilterButton";
import MarketPlace from "@/components/market-place/MarketPlace";
import { Suspense } from "react";
import CardSkeletons from "@/components/skeletons/CardSkeletons";

type MarketPlacePageProps = {
  searchParams: Promise<{
    search?: string;
    propertyType?: string;
    location?: string;
    address?: string;
    minPrice?: number;
    maxPrice?: number;
  }>;
};

const MarketPlacePage = async ({ searchParams }: MarketPlacePageProps) => {
  const params = await searchParams;

  return (
    <FrontendLayout>
      <Navbar variant="solid" />

      <div className="mx-auto max-w-7xl p-6 lg:px-2 w-full">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold text-text md:text-3xl">Explore</h2>
          <FilterButton />
        </div>
        <Suspense fallback={<CardSkeletons />}>
          <MarketPlace searchParams={params} />
        </Suspense>
      </div>
    </FrontendLayout>
  );
};

export default MarketPlacePage;
