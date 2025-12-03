import type { UseMutationResult } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { postRegisterMember } from "@/apis/apply";
import type { RegisterMemberPayload, RegisterMemberResponse } from "@/types/apis/apply";
import type { ApiResponse } from "@/types/apis/response";

export const useRegisterMemberMutation = (): UseMutationResult<
  ApiResponse<RegisterMemberResponse>,
  AxiosError,
  RegisterMemberPayload
> => {
  return useMutation({
    mutationKey: ["postRegisterMember"],
    mutationFn: postRegisterMember,
  });
};
