import { create } from "zustand";

export const useEditModalStore = create((set) => ({
  isOpened: false,
  currentTab: "",
  editElemId: "",
  open: (tab, id) =>
    set((state) => ({ isOpened: true, currentTab: tab, editElemId: id })),
  close: () => set((state) => ({ isOpened: false })),
}));
