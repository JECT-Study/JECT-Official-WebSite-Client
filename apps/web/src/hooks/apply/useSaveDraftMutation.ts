import { toastController } from "@ject/jds";
import { captureException } from "@sentry/react";
import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";

import { applyApi, applyMutationKeys, applyQueryKeys, type JobFamily } from "@/apis/apply";
import type { AnswersPayload } from "@/types/apis/application";

interface SaveDraftVariables {
  jobFamily: JobFamily;
  answers: AnswersPayload;
}

type UseSaveDraftMutationOptions = Omit<
  UseMutationOptions<null, Error, SaveDraftVariables, unknown>,
  "mutationKey" | "mutationFn"
>;

export function useSaveDraftMutation(options?: UseSaveDraftMutationOptions) {
  const queryClient = useQueryClient();
  const { onSuccess, onError, ...restOptions } = options ?? {};

  return useMutation({
    mutationKey: applyMutationKeys.draft.save,
    mutationFn: ({ jobFamily, answers }: SaveDraftVariables) => applyApi.saveDraft(jobFamily, answers),
    retry: 1,
    ...restOptions,
    onSuccess: (data, variables, onMutateResult, mutationContext) => {
      void queryClient.invalidateQueries({ queryKey: applyQueryKeys.draft.all() });
      toastController.positive("임시저장 되었습니다");
      onSuccess?.(data, variables, onMutateResult, mutationContext);
    },
    onError: (error, variables, onMutateResult, mutationContext) => {
      captureException(error, {
        tags: { feature: "draft", action: "save" },
        extra: { message: "임시저장 실패" },
      });
      toastController.destructive("저장에 실패했습니다. 다시 시도해주세요.");
      onError?.(error, variables, onMutateResult, mutationContext);
    },
  });
}
