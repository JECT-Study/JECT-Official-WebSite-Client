import { create } from "zustand";

import type { DialogTypes } from "@/types/ui/dialog";

export type OpenDialogOption = {
  type: DialogTypes;
  onPrimaryBtnClick?: () => void;
  onSecondaryBtnClick?: () => void;
};

interface Actions {
  openDialog: (option: OpenDialogOption) => void;
  resetDialog: () => void;
}

interface Item {
  isOpen: boolean;
  type: DialogTypes | null;
  onPrimaryBtnClick: (() => void) | null;
  onSecondaryBtnClick: (() => void) | null;
}

interface DialogState {
  item: Item;
  actions: Actions;
}

const initialDialogState: Item = {
  isOpen: false,
  type: null,
  onPrimaryBtnClick: null,
  onSecondaryBtnClick: null,
};

const useDialogStore = create<DialogState>(set => ({
  item: initialDialogState,
  actions: {
    openDialog: option => {
      set(state => ({ item: { ...state.item, ...option, isOpen: true } }));
    },
    resetDialog: () => set(() => ({ item: initialDialogState })),
  },
}));

export const useDialogItem = () => useDialogStore(state => state.item);
export const useDialogActions = () => useDialogStore(state => state.actions);
