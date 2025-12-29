import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type { ApplyEmailFormData } from "@/schema/applySchema";
import { applyEmailSchema } from "@/schema/applySchema";

export const useApplyEmailForm = () => {
  return useForm<ApplyEmailFormData>({
    resolver: zodResolver(applyEmailSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });
};
