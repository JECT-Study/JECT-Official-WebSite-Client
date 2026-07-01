import { SNACKBAR_TIMER } from "./Snackbar";
import type {
  SnackbarActionProps,
  SnackbarItem,
  SnackbarOptions,
} from "./snackbar.types";

import { useLimitedQueueProvider } from "@/hooks/useLimitedQueueProvider";

export const useSnackbarProvider = () => {
  const { items, addItem, removeItem } = useLimitedQueueProvider<SnackbarItem>({
    limit: 3,
    fallbackTimeout: SNACKBAR_TIMER.QUEUE_FALLBACK,
  });

  const handler = {
    basic: (
      title: string,
      label: SnackbarActionProps["label"],
      onClick: SnackbarActionProps["onClick"],
      options?: SnackbarOptions,
    ) => addItem({ feedback: "none", title, label, onClick, ...options }),
    positive: (
      title: string,
      label: SnackbarActionProps["label"],
      onClick: SnackbarActionProps["onClick"],
      options?: SnackbarOptions,
    ) => addItem({ feedback: "positive", title, label, onClick, ...options }),
    destructive: (
      title: string,
      label: SnackbarActionProps["label"],
      onClick: SnackbarActionProps["onClick"],
      options?: SnackbarOptions,
    ) => addItem({ feedback: "destructive", title, label, onClick, ...options }),
    notifying: (
      title: string,
      label: SnackbarActionProps["label"],
      onClick: SnackbarActionProps["onClick"],
      options?: SnackbarOptions,
    ) => addItem({ feedback: "notifying", title, label, onClick, ...options }),
  };

  return { snackbars: items, snackbar: handler, removeSnackbar: removeItem };
};
