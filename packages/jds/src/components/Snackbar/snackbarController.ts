import { SnackbarHandler } from './snackbar.types';

type SnackbarController = {
  setHandler: (handler: SnackbarHandler) => void;
  clearHandler: () => void;
  basic: SnackbarHandler['basic'];
  positive: SnackbarHandler['positive'];
  destructive: SnackbarHandler['destructive'];
};

let currentHandler: SnackbarHandler | null = null;

export const snackbarController: SnackbarController = {
  setHandler: handler => {
    currentHandler = handler;
  },
  clearHandler: () => {
    currentHandler = null;
  },
  basic: (...args) => {
    if (!currentHandler) return console.warn('SnackbarProvider not ready');
    return currentHandler.basic(...args);
  },
  positive: (...args) => {
    if (!currentHandler) return console.warn('SnackbarProvider not ready');
    return currentHandler.positive(...args);
  },
  destructive: (...args) => {
    if (!currentHandler) return console.warn('SnackbarProvider not ready');
    return currentHandler.destructive(...args);
  },
};
