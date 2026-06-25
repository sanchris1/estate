"use client";

import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import Button from "../ui/Button";
import { useStore } from "zustand";
import { filterModalStore } from "@/store/useFilterModalStore";

const FilterButton = () => {
  const openModal = useStore(filterModalStore, (state) => state.open);

  return (
    <Button
      onclick={openModal}
      variant="outline"
      icon={<HiOutlineAdjustmentsHorizontal size={20} />}
    >
      Filter
    </Button>
  );
};

export default FilterButton;
