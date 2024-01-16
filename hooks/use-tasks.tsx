import { create } from "zustand";

type TasksStore = {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

export const useTasks = create<TasksStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
}));