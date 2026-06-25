import { createStore } from "zustand";

interface AuthModalStore {
  isLoginOpen: boolean;
  isRegisterOpen: boolean;

  openLogin: () => void;
  closeLogin: () => void;

  openRegister: () => void;
  closeRegister: () => void;

  closeAll: () => void;
}

export const useAuthModal = createStore<AuthModalStore>()((set) => ({
  isLoginOpen: false,
  isRegisterOpen: false,

  openLogin: () => set({ isLoginOpen: true, isRegisterOpen: false }),
  closeLogin: () => set({ isLoginOpen: false }),

  openRegister: () => set({ isLoginOpen: false, isRegisterOpen: true }),
  closeRegister: () => set({ isRegisterOpen: false }),

  closeAll: () => set({ isLoginOpen: false, isRegisterOpen: false }),
}));
