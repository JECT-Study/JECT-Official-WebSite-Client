import { create } from "zustand";

export type ToastType = "normal" | "negative" | "positive";

interface Actions {
  addToast: (message: string, type?: ToastType) => void;
  removeToast: () => void;
}

export interface ToastItem {
  id: number;
  type: ToastType;
  message: string;
}

interface ToastState {
  toastItem: ToastItem | null;
  actions: Actions;
}

const useToastStore = create<ToastState>(set => ({
  toastItem: null,
  actions: {
    addToast: (message, type = "normal") => {
      set(state => ({
        toastItem: {
          ...state.toastItem,
          id: Date.now(),
          type: type,
          message: message,
        },
      }));
    },
    removeToast: () => set(state => ({ ...state, toastItem: null })),
  },
}));

export const useToastItem = () => useToastStore(state => state.toastItem);
export const useToastActions = () => useToastStore(state => state.actions);
