import { ReactNode } from 'react';
import { create } from 'zustand';

interface Dialog {
  isOpen: boolean;
  btnLayout: 'vertical' | 'horizontal';
  title: string;
  content: ReactNode;
  primaryBtnLabel: string;
  secondaryBtnLabel: string;
}

type ItemState = Dialog & {
  onPrimaryBtnClick: (() => void) | null;
  onSecondaryBtnClick: (() => void) | null;
};

type OpenDialogProp = Omit<Dialog, 'isOpen'> & {
  onPrimaryBtnClick?: () => void;
  onSecondaryBtnClick?: () => void;
};

interface Actions {
  openDialog: (option: OpenDialogProp) => void;
  closeDialog: () => void;
  resetDialog: () => void;
}

interface DialogState {
  item: ItemState;
  actions: Actions;
}

const initialDialogState: DialogState['item'] = {
  isOpen: false,
  btnLayout: 'vertical',
  title: '',
  content: '',
  primaryBtnLabel: '',
  secondaryBtnLabel: '',
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
          btnLayout: option.btnLayout,
          title: option.title,
          content: option.content,
          primaryBtnLabel: option.primaryBtnLabel,
          secondaryBtnLabel: option.secondaryBtnLabel,
          onPrimaryBtnClick: option.onPrimaryBtnClick ?? state.item.onPrimaryBtnClick,
          onSecondaryBtnClick: option.onSecondaryBtnClick ?? state.item.onSecondaryBtnClick,
        },
      }));
    },
    closeDialog: () => set(state => ({ item: { ...state.item, isOpen: false } })),
    resetDialog: () => set(() => ({ item: initialDialogState })),
  },
}));

export const useDialogItem = () => useDialogStore(state => state.item);
export const useDialogActions = () => useDialogStore(state => state.actions);
