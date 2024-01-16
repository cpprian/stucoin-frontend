import { create } from "zustand";

type RewardsStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const useRewards = create<RewardsStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));