import { captureException } from "@sentry/react";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";

import { applyApi, applyMutationKeys, applyQueryKeys } from "@/apis/apply";
import type { MemberProfilePayload } from "@/types/apis/apply";

interface MemberProfileVariables {
  recruitId: number;
  profile: MemberProfilePayload;
}

type UseMemberProfileMutationOptions = Omit<
  UseMutationOptions<null, Error, MemberProfileVariables, unknown>,
  "mutationKey" | "mutationFn"
>;

export function useMemberProfileMutation(options?: UseMemberProfileMutationOptions) {
  const queryClient = useQueryClient();
  const { onSuccess, onError, ...restOptions } = options ?? {};

  return useMutation({
    mutationKey: applyMutationKeys.profile.update,
    mutationFn: ({ recruitId, profile }: MemberProfileVariables) =>
      applyApi.updateProfile(recruitId, profile),
    retry: 1,
    ...restOptions,
    onSuccess: (data, variables, onMutateResult, mutationContext) => {
      void queryClient.invalidateQueries({ queryKey: applyQueryKeys.profile.all() });
      void queryClient.invalidateQueries({ queryKey: applyQueryKeys.status.all() });
      onSuccess?.(data, variables, onMutateResult, mutationContext);
    },
    onError: (error, variables, onMutateResult, mutationContext) => {
      captureException(error, {
        tags: { feature: "profile", action: "update" },
        extra: { message: "프로필 저장 실패" },
      });
      onError?.(error, variables, onMutateResult, mutationContext);
    },
  });
}
