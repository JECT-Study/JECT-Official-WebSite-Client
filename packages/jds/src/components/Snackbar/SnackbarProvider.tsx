import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { Snackbar } from "./Snackbar";
import { stackContainer } from "./snackbar.css";
import type { SnackbarHandler } from "./snackbar.types";
import { snackbarController } from "./snackbarController";
import { useSnackbarProvider } from "./useSnackbarProvider";

interface SnackbarProviderProps {
  children: ReactNode;
  duration?: number;
}

interface SnackbarContextType {
  snackbar: SnackbarHandler;
  removeSnackbar: (id: string) => void;
}

const SnackbarContext = createContext<SnackbarContextType | null>(null);

export const SnackbarProvider = ({ children, duration }: SnackbarProviderProps) => {
  const { snackbars, snackbar: handler, removeSnackbar } = useSnackbarProvider({});
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    snackbarController.setHandler(handler);
    return () => snackbarController.clearHandler();
  }, [handler]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <SnackbarContext.Provider value={{ snackbar: handler, removeSnackbar }}>
      {children}

      {isMounted &&
        createPortal(
          <div className={stackContainer}>
            {snackbars.map(snackbar => (
              <Snackbar
                key={snackbar.id}
                onRemove={() => removeSnackbar(snackbar.id)}
                {...snackbar}
                duration={snackbar.duration ?? duration}
              />
            ))}
          </div>,
          document.body,
        )}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) throw new Error("useSnackbar must be used within SnackbarProvider");

  return context;
};
