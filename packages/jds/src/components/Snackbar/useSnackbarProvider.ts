import { SNACKBAR_TIMER } from "./Snackbar";
import type { SnackbarItem, SnackbarOptions, UseSnackbarProviderProps } from "./snackbar.types";

import { useLimitedQueueProvider } from "@/hooks/useLimitedQueueProvider";

export const useSnackbarProvider = ({ snackbarLimit = 3 }: UseSnackbarProviderProps) => {
  const { items, addItem, removeItem } = useLimitedQueueProvider<SnackbarItem>({
    limit: snackbarLimit,
    fallbackTimeout: SNACKBAR_TIMER.QUEUE_FALLBACK,
  });

  const handler = {
    basic: (title: string, options?: SnackbarOptions) =>
      addItem({ feedback: "none", title, ...options }),
    positive: (title: string, options?: SnackbarOptions) =>
      addItem({ feedback: "positive", title, ...options }),
    destructive: (title: string, options?: SnackbarOptions) =>
      addItem({ feedback: "destructive", title, ...options }),
    notifying: (title: string, options?: SnackbarOptions) =>
      addItem({ feedback: "notifying", title, ...options }),
  };

  return { snackbars: items, snackbar: handler, removeSnackbar: removeItem };
};
