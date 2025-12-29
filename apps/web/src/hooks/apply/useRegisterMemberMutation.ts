import { captureException } from "@sentry/react";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";

import { applyApi, applyMutationKeys, applyQueryKeys } from "@/apis/apply";
import type { RegisterMemberPayload } from "@/types/apis/apply";

type UseRegisterMemberMutationOptions = Omit<
  UseMutationOptions<boolean, Error, RegisterMemberPayload, unknown>,
  "mutationKey" | "mutationFn"
>;

export function useRegisterMemberMutation(options?: UseRegisterMemberMutationOptions) {
  const queryClient = useQueryClient();
  const { onSuccess, onError, ...restOptions } = options ?? {};

  return useMutation({
    mutationKey: applyMutationKeys.auth.register,
    mutationFn: applyApi.registerMember,
    retry: 1,
    ...restOptions,
    onSuccess: (data, variables, onMutateResult, mutationContext) => {
      void queryClient.invalidateQueries({ queryKey: applyQueryKeys.profile.all() });
      onSuccess?.(data, variables, onMutateResult, mutationContext);
    },
    onError: (error, variables, onMutateResult, mutationContext) => {
      captureException(error, {
        tags: { feature: "auth", action: "register" },
        extra: { message: "회원 등록 실패" },
      });
      onError?.(error, variables, onMutateResult, mutationContext);
    },
  });
}
