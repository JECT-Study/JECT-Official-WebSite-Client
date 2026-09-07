import type { SnackbarHandler } from "./snackbar.types";

import { createCtxProvider } from "@/hooks/createCtxProvider";

export interface SnackbarContextValue {
  snackbar: SnackbarHandler;
  removeSnackbar: (id: string) => void;
}

export const [SnackbarContextProvider, useSnackbar] =
  createCtxProvider<SnackbarContextValue>("Snackbar");
