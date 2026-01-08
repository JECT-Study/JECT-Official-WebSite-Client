import { captureException } from "@sentry/react";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

import { applyApi, applyMutationKeys } from "@/apis/apply";
import type { PresignedUrlPayload, PresignedUrlResponse } from "@/types/apis/application";

type UseCreatePresignedUrlsMutationOptions = Omit<
  UseMutationOptions<PresignedUrlResponse, Error, PresignedUrlPayload, unknown>,
  "mutationKey" | "mutationFn"
>;

export function useCreatePresignedUrlsMutation(options?: UseCreatePresignedUrlsMutationOptions) {
  const { onError, ...restOptions } = options ?? {};

  return useMutation({
    mutationKey: applyMutationKeys.upload.presignedUrls,
    mutationFn: applyApi.createPresignedUrls,
    retry: 1,
    ...restOptions,
    onError: (error, variables, onMutateResult, mutationContext) => {
      captureException(error, {
        tags: { feature: "upload", action: "presigned-urls" },
        extra: { message: "Presigned URL 생성 실패" },
      });
      onError?.(error, variables, onMutateResult, mutationContext);
    },
  });
}
