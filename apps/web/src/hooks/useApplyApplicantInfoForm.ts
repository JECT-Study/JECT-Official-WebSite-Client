import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type { ApplyApplicantInfoFormData } from "@/schema/applySchema";
import { applyApplicantInfoSchema } from "@/schema/applySchema";

export const useApplyApplicantInfoForm = () => {
  return useForm<ApplyApplicantInfoFormData>({
    resolver: zodResolver(applyApplicantInfoSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      phoneNumber: "",
    },
  });
};
