import { createContext, useContext, useReducer, useEffect, useMemo, ReactNode } from 'react';
import { useState } from 'react';

import { authReducer, initialAuthState } from './reducer';
import { AuthFlowContextType, AuthFlowProps } from './types';

const AuthFlowContext = createContext<AuthFlowContextType | null>(null);

export const useAuthFlow = (): AuthFlowContextType => {
  const context = useContext(AuthFlowContext);
  if (!context) {
    throw new Error('useAuthFlow must be used within an AuthFlow component');
  }
  return context;
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
    email: email,
  });

  useEffect(() => {
    return () => {
      if (state.cooldownTimer) {
        window.clearTimeout(state.cooldownTimer);
      }
    };
  }, [state.cooldownTimer]);

  const [isPinValid, setPinValid] = useState(false);
  const [isTermsChecked, setIsTermsChecked] = useState(false);

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
        return true;
      case 'VERIFICATION':
        return !state.verificationComplete;
      case 'PIN':
        return !isPinValid || isSubmitting || (!isResetPin && !isTermsChecked);
      default:
        return true;
    }
  }, [state, isPinValid, isSubmitting, isResetPin, isTermsChecked]);

  const rightIconFillColor = useMemo(() => {
    return isButtonDisabled
      ? 'fill-accent-trans-hero-dark'
      : 'fill-object-static-inverse-hero-dark';
  }, [isButtonDisabled]);

  const handlePinSubmit = (pin: string) => {
    onPinSubmit(pin);
  };

  const contextValue: AuthFlowContextType = {
    state,
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
  };

  return <AuthFlowContext.Provider value={contextValue}>{children}</AuthFlowContext.Provider>;
};
