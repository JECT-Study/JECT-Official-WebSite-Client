import { useState, useCallback } from 'react';
import { SnackbarHandlerParam, SnackbarItem, UseSnackbarProviderProps } from './snackbar.types';

export const useSnackbarProvider = ({ snackbarLimit = 3 }: UseSnackbarProviderProps) => {
  const [snackbars, setSnackbars] = useState<SnackbarItem[]>([]);

  const removeSnackbar = useCallback((id: string) => {
    setSnackbars(prev => prev.filter(snackbar => snackbar.id !== id));
  }, []);

  const closeSnackbar = (id: string): Promise<void> => {
    return new Promise(resolve => {
      const snackbar = document.getElementById(id);
      if (!snackbar) return;
      if (snackbar.classList.contains('delete')) return;
      snackbar.classList.add('delete');

      snackbar.addEventListener('animationend', e => {
        if (e.target === snackbar) {
          removeSnackbar(id);
          resolve();
        }
      });
    });
  };

  const addSnackbar = useCallback(
    async (snackbar: SnackbarItem) => {
      const id = `snackbar-${Date.now()}`;
      const newSnackbar = { id, ...snackbar };

      if (snackbars.length >= snackbarLimit) {
        const firstActive = snackbars[0];
        await closeSnackbar(firstActive.id!);
      }

      setSnackbars(prev => [...prev, newSnackbar]);

      return id;
    },
    [snackbars, snackbarLimit],
  );

  const handler = {
    basic: (snackbarHandlerParam: SnackbarHandlerParam) =>
      addSnackbar({ type: 'basic', ...snackbarHandlerParam }),
    positive: (snackbarHandlerParam: SnackbarHandlerParam) =>
      addSnackbar({ type: 'positive', ...snackbarHandlerParam }),
    destructive: (snackbarHandlerParam: SnackbarHandlerParam) =>
      addSnackbar({ type: 'destructive', ...snackbarHandlerParam }),
  };

  return { snackbars, snackbar: handler, removeSnackbar };
};
