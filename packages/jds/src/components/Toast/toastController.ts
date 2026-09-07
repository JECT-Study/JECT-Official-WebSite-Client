import type { ToastHandler } from "./toast.types";

interface ToastController {
  setHandler: (handler: ToastHandler) => void;
  clearHandler: () => void;
  basic: ToastHandler["basic"];
  positive: ToastHandler["positive"];
  destructive: ToastHandler["destructive"];
  notifying: ToastHandler["notifying"];
}

let currentHandler: ToastHandler | null = null;

export const toastController: ToastController = {
  setHandler: handler => {
    currentHandler = handler;
  },
  clearHandler: () => {
    currentHandler = null;
  },
  basic: (...args) => {
    if (!currentHandler) return console.warn("ToastProvider not ready");
    return currentHandler.basic(...args);
  },
  positive: (...args) => {
    if (!currentHandler) return console.warn("ToastProvider not ready");
    return currentHandler.positive(...args);
  },
  destructive: (...args) => {
    if (!currentHandler) return console.warn("ToastProvider not ready");
    return currentHandler.destructive(...args);
  },
  notifying: (...args) => {
    if (!currentHandler) return console.warn("ToastProvider not ready");
    return currentHandler.notifying(...args);
  },
};
