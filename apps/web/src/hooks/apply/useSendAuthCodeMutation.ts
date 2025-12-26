import { toastController } from "@ject/jds";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

import { applyApi, applyMutationKeys } from "@/apis/apply";
import type { EmailAuthPayload } from "@/types/apis/apply";

type UseSendAuthCodeMutationOptions = Omit<
  UseMutationOptions<null, Error, EmailAuthPayload, unknown>,
  "mutationKey" | "mutationFn"
>;

export function useSendAuthCodeMutation(options?: UseSendAuthCodeMutationOptions) {
  const { onSuccess, ...restOptions } = options ?? {};

  return useMutation({
    mutationKey: applyMutationKeys.auth.sendCode,
    mutationFn: applyApi.sendAuthCode,
    ...restOptions,
    onSuccess: (data, variables, onMutateResult, mutationContext) => {
      toastController.basic("인증번호를 발송했어요. 1분 뒤에 다시 요청하실 수 있어요.");
      onSuccess?.(data, variables, onMutateResult, mutationContext);
    },
  });
}
