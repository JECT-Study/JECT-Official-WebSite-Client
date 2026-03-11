import { toastController } from "@jects/jds";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { applyApi, applyMutationKeys } from "@/apis/apply";
import type { EmailAuthPayload } from "@/types/apis/apply";
import type { ApiResponse } from "@/types/apis/response";

type UseSendAuthCodeMutationOptions = Omit<
  UseMutationOptions<null, AxiosError<ApiResponse<string[]>>, EmailAuthPayload, unknown>,
  "mutationKey" | "mutationFn"
>;

export function useSendAuthCodeMutation(options?: UseSendAuthCodeMutationOptions) {
  const { onSuccess, ...restOptions } = options ?? {};

  return useMutation({
    mutationKey: applyMutationKeys.auth.sendCode,
    mutationFn: applyApi.sendAuthCode,
    ...restOptions,
    onSuccess: (data, variables, onMutateResult, mutationContext) => {
      toastController.basic("인증번호 발송됨", "재발송 요청은 3분 뒤에 가능합니다.");
      onSuccess?.(data, variables, onMutateResult, mutationContext);
    },
  });
}
