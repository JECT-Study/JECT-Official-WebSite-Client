import { captureException } from "@sentry/react";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import axios from "axios";

import { applyApi, applyMutationKeys } from "@/apis/apply";
import type { PinLoginPayload } from "@/types/apis/apply";

type PinLoginResponse = { accessToken: string; refreshToken: string };
type UsePinLoginMutationOptions = Omit<
  UseMutationOptions<PinLoginResponse, Error, PinLoginPayload, unknown>,
  "mutationKey" | "mutationFn"
>;

export function usePinLoginMutation(options?: UsePinLoginMutationOptions) {
  const { onError, ...restOptions } = options ?? {};

  return useMutation({
    mutationKey: applyMutationKeys.auth.pinLogin,
    mutationFn: applyApi.loginWithPin,
    ...restOptions,
    onError: (error, variables, onMutateResult, mutationContext) => {
      const isUnauthorized = axios.isAxiosError(error) && error.response?.status === 401;

      if (!isUnauthorized) {
        captureException(error, {
          tags: { feature: "auth", action: "pin-login" },
          extra: {
            message: "PIN 로그인 실패",
            status: axios.isAxiosError(error) ? error.response?.status : undefined,
          },
        });
      }
      onError?.(error, variables, onMutateResult, mutationContext);
    },
  });
}
