import { createContext, useReducer, useCallback, useMemo, ReactNode, useContext } from 'react';
import { memo } from 'react';

import { authReducer, initialAuthState } from './reducer';
import { AuthFlowContextType, AuthFlowProps } from './types';

import { useButtonState } from '@/hooks/useButtonState';
import { useCooldown } from '@/hooks/useCooldown';
import { useFormId } from '@/hooks/useFormId';

const AuthFlowContext = createContext<AuthFlowContextType | undefined>(undefined);

export const useAuthFlow = (): AuthFlowContextType => {
  const context = useContext(AuthFlowContext);
  if (!context) {
    throw new Error('useAuthFlow must be used within AuthFlowProvider');
  }
  return context;
};

export const AuthFlowProvider = memo(function AuthFlowProvider({
  children,
  templateType,
  isResetPin,
  onPinSubmit,
  onPinLogin,
  isSubmitting,
  isRedirectExisting = true,
  email = '',
}: AuthFlowProps & { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, { ...initialAuthState, email });

  const { isActive: isCooldownActive, start: startCooldown } = useCooldown(60000);
  const formId = useFormId(state.step);
  const { isButtonDisabled, rightIconFillColor } = useButtonState({
    step: state.step,
    email: state.email,
    isCooldownActive: isCooldownActive,
    verificationComplete: state.verificationComplete,
    isPinValid: false,
    isResetPin,
    isTermsChecked: false,
    isSubmitting,
  });

  const handlePinSubmit = useCallback((pin: string) => onPinSubmit(pin), [onPinSubmit]);

  const contextValue = useMemo<AuthFlowContextType>(
    () => ({
      state,
      dispatch,
      templateType,
      isResetPin,
      formId,
      isButtonDisabled,
      rightIconFillColor,
      handlePinSubmit,
      isLoading: isSubmitting,
      isRedirectExisting,
      onPinLogin,
      startCooldown,
    }),
    [
      state,
      dispatch,
      templateType,
      isResetPin,
      formId,
      isButtonDisabled,
      rightIconFillColor,
      handlePinSubmit,
      isSubmitting,
      isRedirectExisting,
      onPinLogin,
      startCooldown,
    ],
  );

  return <AuthFlowContext.Provider value={contextValue}>{children}</AuthFlowContext.Provider>;
});
