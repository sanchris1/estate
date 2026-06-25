import FrontendLayout from "@/components/layouts/FrontendLayout";
import Navbar from "@/components/navbar/Navbar";
import Button from "@/components/ui/Button";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { dummyProperties } from "../constants/dummyProperties";
import PropertyCard from "@/components/property/PropertyCard";

const MarketPlace = () => {
  return (
    <FrontendLayout>
      <Navbar variant="solid" />

      <div className="mx-auto max-w-7xl p-6 lg:px-2 w-full">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold text-text md:text-3xl">Explore</h2>
          <Button
            variant="outline"
            icon={<HiOutlineAdjustmentsHorizontal size={20} />}
          >
            Filter
          </Button>
        </div>
        <div className="grid  gap-8 md:grid-cols-2 xl:grid-cols-3 my-4">
          {dummyProperties.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      </div>
    </FrontendLayout>
  );
};

export default MarketPlace;
