import { createStore } from "zustand";

interface CreatePropertyModal {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useCreatePropertyStateModal = createStore<CreatePropertyModal>()(
  (set) => ({
    isOpen: false,

    open: () => set({ isOpen: true }),
    close: () => set({ isOpen: false }),
  }),
);
