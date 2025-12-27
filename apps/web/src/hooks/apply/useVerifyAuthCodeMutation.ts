import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

import { applyApi, applyMutationKeys } from "@/apis/apply";

interface VerifyAuthCodeVariables {
  email: string;
  authCode: string;
  template: "AUTH_CODE" | "PIN_RESET";
}

type UseVerifyAuthCodeMutationOptions = UseMutationOptions<
  { token: string },
  Error,
  VerifyAuthCodeVariables,
  unknown
>;

export function useVerifyAuthCodeMutation(options?: UseVerifyAuthCodeMutationOptions) {
  return useMutation({
    mutationKey: applyMutationKeys.auth.verifyCode,
    mutationFn: ({ email, authCode, template }: VerifyAuthCodeVariables) =>
      applyApi.verifyAuthCode({ email, authCode }, { template }),
    ...options,
  });
}
