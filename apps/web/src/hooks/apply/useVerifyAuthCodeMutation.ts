import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

import { applyApi, applyMutationKeys } from "@/apis/apply";

interface VerifyAuthCodeVariables {
  email: string;
  authCode: string;
  sendGroupCode: "AUTH_CODE" | "PIN_RESET";
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
    mutationFn: ({ email, authCode, sendGroupCode }: VerifyAuthCodeVariables) =>
      applyApi.verifyAuthCode({ email, authCode }, { sendGroupCode }),
    ...options,
  });
}
