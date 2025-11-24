import type { UseMutationResult } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { postUploadPortfolio } from "@/apis/application";
import type { PresignedUrlPayload, PresignedUrlResponse } from "@/types/apis/application";
import type { ApiResponse } from "@/types/apis/response";

const useCreatePresignedUrlsMutation = (): UseMutationResult<
  ApiResponse<PresignedUrlResponse>,
  AxiosError,
  PresignedUrlPayload,
  unknown
> => {
  return useMutation({
    mutationKey: ["create PresignedUrl"],
    mutationFn: postUploadPortfolio,
  });
};

export default useCreatePresignedUrlsMutation;
