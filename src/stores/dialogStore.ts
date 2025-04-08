import { create } from 'zustand';

import { DialogTypes } from '@/constants/dialog';

interface Actions {
  openDialog: (option: {
    type: DialogTypes;
    onPrimaryBtnClick?: () => void;
    onSecondaryBtnClick?: () => void;
  }) => void;
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
      set(state => ({
        item: {
          ...state.item,
          isOpen: true,
          type: option.type ?? state.item.type,
          onPrimaryBtnClick: option.onPrimaryBtnClick ?? state.item.onPrimaryBtnClick,
          onSecondaryBtnClick: option.onSecondaryBtnClick ?? state.item.onSecondaryBtnClick,
        },
      }));
    },
    resetDialog: () => set(() => ({ item: initialDialogState })),
  },
}));

export const useDialogItem = () => useDialogStore(state => state.item);
export const useDialogActions = () => useDialogStore(state => state.actions);
