import { SNACKBAR_TIMER } from "./Snackbar";
import type {
  SnackbarActionProps,
  SnackbarItem,
  SnackbarOptions,
  UseSnackbarProviderProps,
} from "./snackbar.types";

import { useLimitedQueueProvider } from "@/hooks/useLimitedQueueProvider";

export const useSnackbarProvider = ({ snackbarLimit = 3 }: UseSnackbarProviderProps) => {
  const { items, addItem, removeItem } = useLimitedQueueProvider<SnackbarItem>({
    limit: snackbarLimit,
    fallbackTimeout: SNACKBAR_TIMER.QUEUE_FALLBACK,
  });

  const handler = {
    basic: (
      title: string,
      labelText: SnackbarActionProps["labelText"],
      onButtonClick: SnackbarActionProps["onButtonClick"],
      options?: SnackbarOptions,
    ) => addItem({ feedback: "none", title, labelText, onButtonClick, ...options }),
    positive: (
      title: string,
      labelText: SnackbarActionProps["labelText"],
      onButtonClick: SnackbarActionProps["onButtonClick"],
      options?: SnackbarOptions,
    ) => addItem({ feedback: "positive", title, labelText, onButtonClick, ...options }),
    destructive: (
      title: string,
      labelText: SnackbarActionProps["labelText"],
      onButtonClick: SnackbarActionProps["onButtonClick"],
      options?: SnackbarOptions,
    ) => addItem({ feedback: "destructive", title, labelText, onButtonClick, ...options }),
    notifying: (
      title: string,
      labelText: SnackbarActionProps["labelText"],
      onButtonClick: SnackbarActionProps["onButtonClick"],
      options?: SnackbarOptions,
    ) => addItem({ feedback: "notifying", title, labelText, onButtonClick, ...options }),
  };

  return { snackbars: items, snackbar: handler, removeSnackbar: removeItem };
};
