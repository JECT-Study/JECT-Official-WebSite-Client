import type { ToastHandler } from "./toast.types";

import { createCtxProvider } from "@/hooks/createCtxProvider";

export interface ToastContextValue {
  toast: ToastHandler;
  removeToast: (id: string) => void;
}

export const [ToastContextProvider, useToast] = createCtxProvider<ToastContextValue>("Toast");
