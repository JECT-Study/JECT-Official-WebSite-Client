// context.tsx
import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useMemo,
  ReactNode,
  useState,
  Dispatch,
} from 'react';

import { authReducer, initialAuthState } from './reducer';
import { AuthFlowProps, AuthState, AuthAction } from './types';

const AuthStateContext = createContext<AuthState | null>(null);

type AuthActionsContextType = {
  dispatch: Dispatch<AuthAction>;
  templateType: 'AUTH_CODE' | 'PIN_RESET' | 'PIN_LOGIN';
  isResetPin: boolean;
  formId: string;
  isButtonDisabled: boolean;
  rightIconFillColor: string;
  handlePinSubmit: (pin: string) => void;
  isLoading: boolean;
  redirectExisting: boolean;
  onPinLogin?: (pin: string) => void;
  setPinValid: (isValid: boolean) => void;
  setIsTermsChecked: (isChecked: boolean) => void;
};

const AuthActionsContext = createContext<AuthActionsContextType | null>(null);

export const useAuthState = (): AuthState => {
  const context = useContext(AuthStateContext);
  if (!context) {
    throw new Error('useAuthState must be used within an AuthFlowProvider');
  }
  return context;
};

export const useAuthActions = (): AuthActionsContextType => {
  const context = useContext(AuthActionsContext);
  if (!context) {
    throw new Error('useAuthActions must be used within an AuthFlowProvider');
  }
  return context;
};

export const useAuthFlow = () => {
  const state = useAuthState();
  const actions = useAuthActions();
  return { state, ...actions };
};

export const AuthFlowProvider = ({
  children,
  templateType,
  isResetPin,
  onPinSubmit,
  onPinLogin,
  isSubmitting,
  redirectExisting = true,
  email = '',
}: AuthFlowProps & { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, {
    ...initialAuthState,
    email,
  });

  const [isPinValid, setPinValid] = useState(false);
  const [isTermsChecked, setIsTermsChecked] = useState(false);

  useEffect(() => {
    return () => {
      if (state.cooldownTimer) {
        window.clearTimeout(state.cooldownTimer);
      }
    };
  }, [state.cooldownTimer]);

  const formId = useMemo(() => {
    switch (state.step) {
      case 'EMAIL':
        return 'emailForm';
      case 'VERIFICATION':
        return 'verificationForm';
      case 'PIN':
        return 'pinForm';
      default:
        return '';
    }
  }, [state.step]);

  const isButtonDisabled = useMemo(() => {
    switch (state.step) {
      case 'EMAIL':
        return !state.email || state.isCooldownActive;
      case 'VERIFICATION':
        return !state.verificationComplete;
      case 'PIN':
        return !isPinValid || isSubmitting || (!isResetPin && !isTermsChecked);
      default:
        return true;
    }
  }, [
    state.step,
    state.email,
    state.isCooldownActive,
    state.verificationComplete,
    isPinValid,
    isSubmitting,
    isResetPin,
    isTermsChecked,
  ]);

  const rightIconFillColor = useMemo(() => {
    return isButtonDisabled
      ? 'fill-accent-trans-hero-dark'
      : 'fill-object-static-inverse-hero-dark';
  }, [isButtonDisabled]);

  const handlePinSubmit = useMemo(() => {
    return (pin: string) => {
      onPinSubmit(pin);
    };
  }, [onPinSubmit]);

  const actionsValue = useMemo(
    () => ({
      dispatch,
      templateType,
      isResetPin,
      formId,
      isButtonDisabled,
      rightIconFillColor,
      handlePinSubmit,
      isLoading: isSubmitting,
      redirectExisting,
      onPinLogin,
      setPinValid,
      setIsTermsChecked,
    }),
    [
      templateType,
      isResetPin,
      formId,
      isButtonDisabled,
      rightIconFillColor,
      handlePinSubmit,
      isSubmitting,
      redirectExisting,
      onPinLogin,
    ],
  );

  return (
    <AuthStateContext.Provider value={state}>
      <AuthActionsContext.Provider value={actionsValue}>{children}</AuthActionsContext.Provider>
    </AuthStateContext.Provider>
  );
};
