import { create } from 'zustand';

interface ApplyVerifyState {
  isNewApplicant: boolean;
  userEmail: string;
  isResetPin: boolean;
}

interface ApplyVerifyActions {
  setEmailVerified: (email: string) => void;
  setExistingUserDetected: () => void;
  resetVerification: () => void;
  setIsResetPin: (value: boolean) => void;
}

type ApplyVerifyStore = ApplyVerifyState & ApplyVerifyActions;

export const useApplyVerifyStore = create<ApplyVerifyStore>(set => ({
  isNewApplicant: true,
  userEmail: '',
  isResetPin: false,

  setEmailVerified: (email: string) => set({ userEmail: email }),

  setExistingUserDetected: () => set({ isNewApplicant: false }),

  resetVerification: () =>
    set({
      isNewApplicant: true,
      userEmail: '',
    }),

  setIsResetPin: (value: boolean) => set({ isResetPin: value }),
}));
