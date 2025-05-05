import { Dispatch, ReactNode } from 'react';

export type AuthStep = 'EMAIL' | 'VERIFICATION' | 'PIN';

export interface AuthState {
  step: AuthStep;
  email: string;
  isAuthCodeExpired: boolean;
  isCooldownActive: boolean;
  cooldownTimer: number | null;
  verificationComplete: boolean;
}

export type AuthAction =
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_AUTH_CODE_EXPIRED'; payload: boolean }
  | { type: 'INVALIDATE_AUTH_CODE' }
  | { type: 'SET_COOLDOWN'; payload: boolean }
  | { type: 'SET_COOLDOWN_TIMER'; payload: number | null }
  | { type: 'NEXT_STEP' }
  | { type: 'COMPLETE_VERIFICATION' }
  | { type: 'RESET_STATE' };

export type TemplateType = 'AUTH_CODE' | 'PIN_RESET';

export interface AuthFlowContextType {
  state: AuthState;
  dispatch: Dispatch<AuthAction>;
  templateType: TemplateType;
  isResetPin: boolean;
  formId: string;
  isButtonDisabled: boolean;
  rightIconFillColor: string;
  handlePinSubmit: (pin: string) => void;
  isLoading: boolean;
  startCooldown: () => void;
  isRedirectExisting: boolean;
  onPinLogin?: (pin: string) => void;
}

export interface AuthFlowProps {
  children: ReactNode;
  templateType: TemplateType;
  isResetPin: boolean;
  onPinSubmit: (pin: string) => void;
  onPinLogin?: (pin: string) => void;
  isSubmitting: boolean;
  isRedirectExisting?: boolean;
  email?: string;
}
