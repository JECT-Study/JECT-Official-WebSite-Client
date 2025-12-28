import { captureException } from "@sentry/react";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

import { applyApi, applyMutationKeys } from "@/apis/apply";
import type { ResetPinPayload } from "@/types/apis/apply";

type UseResetPinMutationOptions = Omit<
  UseMutationOptions<null, Error, ResetPinPayload, unknown>,
  "mutationKey" | "mutationFn"
>;

export function useResetPinMutation(options?: UseResetPinMutationOptions) {
  const { onError, ...restOptions } = options ?? {};

  return useMutation({
    mutationKey: applyMutationKeys.auth.resetPin,
    mutationFn: applyApi.resetPin,
    retry: 1,
    ...restOptions,
    onError: (error, variables, onMutateResult, mutationContext) => {
      captureException(error, {
        tags: { feature: "auth", action: "reset-pin" },
        extra: { message: "PIN 재설정 실패" },
      });
      onError?.(error, variables, onMutateResult, mutationContext);
    },
  });
}
