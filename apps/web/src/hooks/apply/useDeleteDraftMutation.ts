import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";

import { applyApi, applyMutationKeys, applyQueryKeys } from "@/apis/apply";

type UseDeleteDraftMutationOptions = Omit<
  UseMutationOptions<null, Error, void, unknown>,
  "mutationKey" | "mutationFn"
>;

export function useDeleteDraftMutation(options?: UseDeleteDraftMutationOptions) {
  const queryClient = useQueryClient();
  const { onSuccess, ...restOptions } = options ?? {};

  return useMutation({
    mutationKey: applyMutationKeys.draft.delete,
    mutationFn: applyApi.deleteDraft,
    ...restOptions,
    onSuccess: (data, variables, onMutateResult, mutationContext) => {
      void queryClient.invalidateQueries({ queryKey: applyQueryKeys.draft.all() });
      void queryClient.invalidateQueries({ queryKey: applyQueryKeys.status.all() });
      onSuccess?.(data, variables, onMutateResult, mutationContext);
    },
  });
}
