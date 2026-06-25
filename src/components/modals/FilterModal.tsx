"use client";

import { useStore } from "zustand";
import Modal from "./Modal";
import { filterModalStore } from "@/store/useFilterModalStore";
import { useState } from "react";
import { propertyTypes } from "@/app/constants/PropertyTypes";
import PropertyTypeCard from "../property/PropertyTypeCard";
import Button from "../ui/Button";
import Input from "../ui/Input";

const STEPS = {
  TYPE: 0,
  LOCATION: 1,
  PRICING: 2,
};

const FilterModal = () => {
  const { isOpen, close } = useStore(filterModalStore, (state) => state);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [step, setSteps] = useState(STEPS.TYPE);
  const [listingType, setListingType] = useState<"rent" | "sale">("sale");
  const [propertyType, setPropertyType] = useState("");
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");

  const stepTitle = () => {
    switch (step) {
      case STEPS.TYPE:
        return "Select property type";
      case STEPS.LOCATION:
        return "Select location";
      case STEPS.PRICING:
        return "Set the price range";

      default:
        return "";
    }
  };

  const applyFilter = () => {
    console.log("chris");
  };

  return (
    <Modal isOpen={isOpen} onClose={close} title="Filter Properties">
      <div className="mb-6 flex items-center justify-between text-sm text-gray-500">
        <span className="">{step + 1} of 3</span>
        <span className="font-medium text-gray-700">{stepTitle()} </span>
      </div>

      <div className="min-h-55 rounded-xl text-gray-400 p-6 border border-dashed border-gray-300">
        {step === STEPS.TYPE && (
          <div className="grid grid-cols-2 w-full max-h-[50vh] overflow-y-scroll no-scrollbar">
            {propertyTypes.map((item) => (
              <PropertyTypeCard
                onClick={() => setPropertyType(item.slug)}
                key={item.slug}
                label={item.label}
                icon={item.icon}
                selected={propertyType === item.slug}
              />
            ))}
          </div>
        )}

        {step === STEPS.LOCATION && (
          <div className="space-y-6">
            <Input
              value={location}
              label="location"
              name="location"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setLocation(e.target.value)
              }
            />
            <Input
              value={address}
              label="address"
              name="address"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setAddress(e.target.value)
              }
            />
          </div>
        )}

        {step === STEPS.PRICING && (
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="min-price"
              type="number"
              name="min-price"
              value={minPrice}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setMinPrice(e.target.value)
              }
            />
            <Input
              label="max-price"
              type="number"
              name=",ax-price"
              value={maxPrice}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setMaxPrice(e.target.value)
              }
            />
          </div>
        )}
      </div>

      <div className="mt-8 flex gap-3">
        {step > STEPS.TYPE && (
          <Button
            variant="outline"
            fullWidth
            onclick={() => setSteps((prev) => prev - 1)}
          >
            Back
          </Button>
        )}

        <Button
          fullWidth
          onclick={() =>
            step < STEPS.PRICING ? setSteps((prev) => prev + 1) : applyFilter()
          }
        >
          {step === STEPS.PRICING ? "Apply Filter" : "Next"}
        </Button>
      </div>
    </Modal>
  );
};

export default FilterModal;
