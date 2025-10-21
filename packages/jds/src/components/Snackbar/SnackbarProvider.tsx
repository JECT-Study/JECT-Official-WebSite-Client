import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Snackbar } from './Snackbar';
import { SnackbarStyle } from './snackbar.types';
import { SnackbarStackContainer } from './snackbar.styles';
import { BlockButtonBasicProps } from '../Button/BlockButton';

type SnackbarButtonProps = Omit<BlockButtonBasicProps, 'hierarchy' | 'size' | 'variants'>;

interface SnackbarItem {
  id?: number;
  type: SnackbarStyle;
  title: string;
  caption?: string;
  isExiting?: boolean;
  prefixButtonProps?: SnackbarButtonProps;
  suffixButtonProps?: SnackbarButtonProps;
}

interface SnackbarFnParameter {
  title: string;
  caption?: string;
  prefixButtonProps?: SnackbarButtonProps;
  suffixButtonProps?: SnackbarButtonProps;
}

interface SnackbarHandler {
  basic: (snackbarFnParameter: SnackbarFnParameter) => void;
  positive: (snackbarFnParameter: SnackbarFnParameter) => void;
  destructive: (snackbarFnParameter: SnackbarFnParameter) => void;
}

export const snackbar: SnackbarHandler = {
  basic: () => console.warn('SnackbarProvider가 아직 등록되지 않았습니다.'),
  positive: () => console.warn('SnackbarProvider가 아직 등록되지 않았습니다.'),
  destructive: () => console.warn('SnackbarProvider가 아직 등록되지 않았습니다.'),
};

interface SnackbarContextType {
  snackbar: SnackbarHandler;
  removeToast: (id: number) => void;
}

const SnackbarContext = createContext<SnackbarContextType | null>(null);

export const SnackbarProvider = ({ children }: { children: ReactNode }) => {
  const [snackbars, setSnackbars] = useState<SnackbarItem[]>([]);
  const EXIT_ANIMATION_DURATION = 250;
  const EXPOSURE_DURATION = 3000;
  const TOAST_LIMITS = 3;

  const removeToast = (id: number) => {
    setSnackbars(prev => prev.filter(snackbar => snackbar.id !== id));
  };

  const startExit = (id: number): Promise<void> => {
    return new Promise(resolve => {
      setSnackbars(prev =>
        prev.map(snackbar => (snackbar.id === id ? { ...snackbar, isExiting: true } : snackbar)),
      );

      setTimeout(() => {
        removeToast(id);
        resolve();
      }, EXIT_ANIMATION_DURATION);
    });
  };

  const addSnackbar = async (snackbar: SnackbarItem) => {
    const id = Date.now();
    const newSnackbar = { id, ...snackbar };

    const activeSnackbars = snackbars.filter(sb => !sb.isExiting);

    if (activeSnackbars.length >= TOAST_LIMITS) {
      const firstActive = activeSnackbars[0];
      await startExit(firstActive.id!);
    }

    setSnackbars(prev => [...prev, newSnackbar]);
    setTimeout(() => startExit(id), EXPOSURE_DURATION);

    return id;
  };

  const handler: SnackbarHandler = {
    basic: (snackbarFnParameter: SnackbarFnParameter) =>
      addSnackbar({ type: 'basic', isExiting: false, ...snackbarFnParameter }),
    positive: (snackbarFnParameter: SnackbarFnParameter) =>
      addSnackbar({ type: 'positive', isExiting: false, ...snackbarFnParameter }),
    destructive: (snackbarFnParameter: SnackbarFnParameter) =>
      addSnackbar({ type: 'destructive', isExiting: false, ...snackbarFnParameter }),
  };

  useEffect(() => {
    snackbar.basic = handler.basic;
    snackbar.positive = handler.positive;
    snackbar.destructive = handler.destructive;
  }, [handler]);

  return (
    <SnackbarContext.Provider value={{ snackbar: handler, removeToast }}>
      {children}
      {createPortal(
        <SnackbarStackContainer>
          {snackbars.map(snackbar =>
            snackbar.type === 'basic' ? (
              <Snackbar.Basic
                key={snackbar.id}
                closeButtonFn={() => startExit(snackbar.id!)}
                {...snackbar}
              />
            ) : (
              <Snackbar.Feedback
                key={snackbar.id}
                feedback={snackbar.type}
                closeButtonFn={() => startExit(snackbar.id!)}
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
