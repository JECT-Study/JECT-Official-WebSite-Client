import type { UseMutationResult } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { postEmailAuthCode } from "@/apis/apply";
import type { EmailAuthPayload } from "@/types/apis/apply";
import type { ApiResponse } from "@/types/apis/response";

export const useEmailAuthCodeMutation = (): UseMutationResult<
  ApiResponse<null>,
  AxiosError,
  EmailAuthPayload
> => {
  return useMutation({
    mutationKey: ["postEmailAuthCode"],
    mutationFn: postEmailAuthCode,
  });
};
