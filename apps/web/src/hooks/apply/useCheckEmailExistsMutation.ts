import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

import { applyApi, applyMutationKeys } from "@/apis/apply";

type UseCheckEmailExistsMutationOptions = UseMutationOptions<boolean, Error, string, unknown>;

export function useCheckEmailExistsMutation(options?: UseCheckEmailExistsMutationOptions) {
  return useMutation({
    mutationKey: applyMutationKeys.auth.checkEmail,
    mutationFn: applyApi.checkEmailExists,
    ...options,
  });
}
