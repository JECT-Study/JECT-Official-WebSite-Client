import { captureException } from "@sentry/react";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import axios from "axios";

import { applyApi, applyMutationKeys } from "@/apis/apply";
import type { PinLoginPayload } from "@/types/apis/apply";
import type { ApiResponse, Status } from "@/types/apis/response";

// 사용자 입력이나 지원 상태로 발생하는 실패이므로 Sentry 보고에서 제외
const EXPECTED_STATUSES: Status[] = ["AUTH-5", "APPLICANT-1", "APPLY-12"];

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
      const isAxios = axios.isAxiosError<ApiResponse<unknown>>(error);
      const status = isAxios ? error.response?.data.status : undefined;

      if (!status || !EXPECTED_STATUSES.includes(status)) {
        captureException(error, {
          tags: { feature: "auth", action: "pin-login" },
          extra: {
            message: "PIN 로그인 실패",
            status,
            httpStatus: isAxios ? error.response?.status : undefined,
          },
        });
      }
      onError?.(error, variables, onMutateResult, mutationContext);
    },
  });
}
