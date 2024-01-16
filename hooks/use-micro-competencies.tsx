import { create } from "zustand";

type MicroCompetenciesStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const useMicroCompetencies = create<MicroCompetenciesStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));