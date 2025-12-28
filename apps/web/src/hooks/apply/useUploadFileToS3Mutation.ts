import { toastController } from "@ject/jds";
import { captureException } from "@sentry/react";
import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import axios from "axios";

import { applyApi, applyMutationKeys } from "@/apis/apply";
import { APPLY_MESSAGE } from "@/constants/applyMessages";

interface UploadFileToS3Variables {
  url: string;
  file: File;
}

type UseUploadFileToS3MutationOptions = Omit<
  UseMutationOptions<AxiosResponse, Error, UploadFileToS3Variables, unknown>,
  "mutationKey" | "mutationFn"
> & {
  isSuccessToastEnabled?: boolean;
  isErrorToastEnabled?: boolean;
};

export function useUploadFileToS3Mutation(options?: UseUploadFileToS3MutationOptions) {
  const { isSuccessToastEnabled = true, isErrorToastEnabled = true, onSuccess, onError, ...restOptions } = options ?? {};

  return useMutation({
    mutationKey: applyMutationKeys.upload.s3,
    mutationFn: ({ url, file }: UploadFileToS3Variables) => applyApi.uploadFileToS3(url, file),
    ...restOptions,
    onSuccess: (data, variables, onMutateResult, mutationContext) => {
      if (isSuccessToastEnabled) {
        toastController.positive(APPLY_MESSAGE.success.uploadFile);
      }
      onSuccess?.(data, variables, onMutateResult, mutationContext);
    },
    onError: (error, variables, onMutateResult, mutationContext) => {
      if (isErrorToastEnabled) {
        toastController.destructive(APPLY_MESSAGE.fail.uploadFile);
      }

      const errorType =
        axios.isAxiosError(error) && error.code === "ERR_NETWORK" ? "network" : "unexpected";
      captureException(error, {
        tags: { feature: "upload-file", type: errorType },
        extra: {
          message: `S3 파일 업로드 ${errorType === "network" ? "네트워크 오류" : "실패"}`,
          url: axios.isAxiosError(error) ? error.config?.url : undefined,
        },
      });

      onError?.(error, variables, onMutateResult, mutationContext);
    },
  });
}
