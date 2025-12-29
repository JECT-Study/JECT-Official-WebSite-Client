import { captureException } from "@sentry/react";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";

import { applyApi, applyMutationKeys, applyQueryKeys, type JobFamily } from "@/apis/apply";
import type { AnswersPayload } from "@/types/apis/application";

interface SubmitAnswerVariables {
  jobFamily: JobFamily;
  answers: AnswersPayload;
}

type UseSubmitAnswerMutationOptions = Omit<
  UseMutationOptions<null, Error, SubmitAnswerVariables, unknown>,
  "mutationKey" | "mutationFn"
>;

export function useSubmitAnswerMutation(options?: UseSubmitAnswerMutationOptions) {
  const queryClient = useQueryClient();
  const { onSuccess, onError, ...restOptions } = options ?? {};

  return useMutation({
    mutationKey: applyMutationKeys.submit,
    mutationFn: ({ jobFamily, answers }: SubmitAnswerVariables) => applyApi.submit(jobFamily, answers),
    retry: 1,
    ...restOptions,
    onSuccess: (data, variables, onMutateResult, mutationContext) => {
      void queryClient.invalidateQueries({ queryKey: applyQueryKeys.status.all() });
      void queryClient.invalidateQueries({ queryKey: applyQueryKeys.draft.all() });
      onSuccess?.(data, variables, onMutateResult, mutationContext);
    },
    onError: (error, variables, onMutateResult, mutationContext) => {
      captureException(error, {
        tags: { feature: "apply", action: "submit" },
        extra: { message: "지원서 제출 실패" },
      });
      onError?.(error, variables, onMutateResult, mutationContext);
    },
  });
}
