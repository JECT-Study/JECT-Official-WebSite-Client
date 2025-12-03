import type { UseMutationResult } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { postPinLogin } from "@/apis/apply";
import type { PinLoginPayload, PinLoginResponse } from "@/types/apis/apply";
import type { ApiResponse } from "@/types/apis/response";

export const usePinLoginMutation = (): UseMutationResult<
  ApiResponse<PinLoginResponse>,
  AxiosError,
  PinLoginPayload
> => {
  return useMutation({
    mutationKey: ["postPinLogin"],
    mutationFn: postPinLogin,
  });
};
