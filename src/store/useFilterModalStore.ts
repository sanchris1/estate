import { createStore } from "zustand";

interface FilterModalStore {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const filterModalStore = createStore<FilterModalStore>()((set) => ({
  isOpen: false,

  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
