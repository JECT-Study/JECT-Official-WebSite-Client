import { createContext, useContext, ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Snackbar } from './Snackbar';
import { SnackbarHandler } from './snackbar.types';
import { SnackbarStackContainer } from './snackbar.styles';
import { useSnackbarProvider } from './useSnackbarProvider';
import { snackbarController } from './snackbarController';

interface SnackbarContextType {
  snackbar: SnackbarHandler;
  removeSnackbar: (id: string) => void;
}

const SnackbarContext = createContext<SnackbarContextType | null>(null);

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const { snackbars, snackbar: handler, removeSnackbar } = useSnackbarProvider({});

  useEffect(() => {
    snackbarController.setHandler(handler);
    return () => snackbarController.clearHandler();
  }, [handler]);

  return (
    <SnackbarContext.Provider value={{ snackbar: handler, removeSnackbar }}>
      {children}
      {createPortal(
        <SnackbarStackContainer>
          {snackbars.map(snackbar =>
            snackbar.type === 'basic' ? (
              <Snackbar.Basic
                key={snackbar.id}
                onRemove={() => removeSnackbar(snackbar.id!)}
                {...snackbar}
              />
            ) : (
              <Snackbar.Feedback
                key={snackbar.id}
                variant={snackbar.type}
                onRemove={() => removeSnackbar(snackbar.id!)}
                {...snackbar}
              />
            ),
          )}
        </SnackbarStackContainer>,
        document.body,
      )}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) throw new Error('useSnackbar must be used within SnackbarProvider');

  return context;
};
