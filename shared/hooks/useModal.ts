"use client";

import { create } from "zustand";

interface ModalState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
}

const useModal = create<ModalState>((set) => ({
  isOpen: false,
  open: () => {
    set({ isOpen: true });
  },
  close: () => {
    set({ isOpen: false });
  },
  toggle: () => {
    set((state) => ({ isOpen: !state.isOpen }));
  },
}));

export default useModal;
