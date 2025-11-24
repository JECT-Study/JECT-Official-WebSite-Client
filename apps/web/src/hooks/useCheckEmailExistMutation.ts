import type { UseMutationResult } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { checkEmailExists } from "@/apis/apply";
import type { Email } from "@/types/apis/apply";
import type { ApiResponse } from "@/types/apis/response";

export const useCheckEmailExistsMutation = (): UseMutationResult<
  ApiResponse<boolean>,
  AxiosError,
  Email
> => {
  return useMutation({
    mutationKey: ["checkEmailExists"],
    mutationFn: checkEmailExists,
  });
};
