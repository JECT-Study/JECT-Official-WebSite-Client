import type { UseMutationResult } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import { deleteDraft } from "@/apis/application";
import type { ApiResponse } from "@/types/apis/response";
import { removeDraftLocal } from "@/utils/draftUtils";

const useDeleteDraftMutation = (): UseMutationResult<
  ApiResponse<null>,
  AxiosError,
  null,
  unknown
> => {
  return useMutation({
    mutationKey: ["deleteDraft"],
    mutationFn: deleteDraft,
    onSuccess: () => removeDraftLocal(),
  });
};

export default useDeleteDraftMutation;
