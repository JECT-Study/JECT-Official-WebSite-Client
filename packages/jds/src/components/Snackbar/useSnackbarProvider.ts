import { SnackbarItem, SnackbarBaseProps, UseSnackbarProviderProps } from './snackbar.types';
import { useLimitedQueueProvider } from '@/hooks/useLimitedQueueProvider';

export const useSnackbarProvider = ({ snackbarLimit = 3 }: UseSnackbarProviderProps) => {
  const { items, addItem, removeItem } = useLimitedQueueProvider<SnackbarItem>({
    limit: snackbarLimit,
  });

  const handler = {
    basic: (snackbarBaseProps: SnackbarBaseProps) =>
      addItem({ type: 'basic', ...snackbarBaseProps }),
    positive: (snackbarBaseProps: SnackbarBaseProps) =>
      addItem({ type: 'positive', ...snackbarBaseProps }),
    destructive: (snackbarBaseProps: SnackbarBaseProps) =>
      addItem({ type: 'destructive', ...snackbarBaseProps }),
  };

  return { snackbars: items, snackbar: handler, removeSnackbar: removeItem };
};
