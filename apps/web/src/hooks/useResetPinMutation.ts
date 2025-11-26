import type { UseMutationResult } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { putResetPin } from "@/apis/apply";
import type { ResetPinPayload, ResetPinResponse } from "@/types/apis/apply";
import type { ApiResponse } from "@/types/apis/response";

export const useResetPinMutation = (): UseMutationResult<
  ApiResponse<ResetPinResponse>,
  AxiosError,
  ResetPinPayload
> => {
  return useMutation({
    mutationKey: ["putResetPin"],
    mutationFn: putResetPin,
  });
};
