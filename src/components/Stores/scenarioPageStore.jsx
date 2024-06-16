import { create } from "zustand";

export const useScenarioPageStore = create((set) => ({
  currentTaskId: "",
  setTaskId: (taskId) => set(() => ({ currentTaskId: taskId })),
}));
