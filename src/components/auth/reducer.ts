import { Dispatch } from 'react';

import { AuthState, AuthAction } from './types';

export const initialAuthState: AuthState = {
  step: 'EMAIL',
  email: '',
  isAuthCodeExpired: false,
  isCooldownActive: false,
  cooldownTimer: null,
  verificationComplete: false,
};

export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, email: action.payload };
    case 'SET_AUTH_CODE_EXPIRED':
      return { ...state, isAuthCodeExpired: action.payload };
    case 'SET_COOLDOWN':
      return { ...state, isCooldownActive: action.payload };
    case 'SET_COOLDOWN_TIMER':
      return { ...state, cooldownTimer: action.payload };
    case 'NEXT_STEP':
      if (state.step === 'EMAIL') return { ...state, step: 'VERIFICATION' };
      if (state.step === 'VERIFICATION') return { ...state, step: 'PIN' };
      return state;
    case 'COMPLETE_VERIFICATION':
      return { ...state, verificationComplete: true };
    case 'RESET_STATE':
      return initialAuthState;
    default:
      return state;
  }
};

export const startCooldown = (dispatch: Dispatch<AuthAction>): number => {
  dispatch({ type: 'SET_COOLDOWN', payload: true });

  const timer = window.setTimeout(() => {
    dispatch({ type: 'SET_COOLDOWN', payload: false });
  }, 60000);

  dispatch({ type: 'SET_COOLDOWN_TIMER', payload: timer });

  return timer;
};
