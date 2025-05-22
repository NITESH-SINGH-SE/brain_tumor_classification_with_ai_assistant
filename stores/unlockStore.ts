// stores/unlockStore.ts
import { create } from 'zustand';

interface UnlockState {
  predictionUnlocked: boolean;
  reportUnlocked: boolean;
  setPredictionUnlocked: (value: boolean) => void;
  setReportUnlocked: (value: boolean) => void;
  resetUnlocks: () => void;
}

export const useUnlockStore = create<UnlockState>((set) => ({
  predictionUnlocked: false,
  reportUnlocked: false,
  setPredictionUnlocked: (value) => set({ predictionUnlocked: value }),
  setReportUnlocked: (value) => set({ reportUnlocked: value }),
  resetUnlocks: () => set({ predictionUnlocked: false, reportUnlocked: false }),
}));
