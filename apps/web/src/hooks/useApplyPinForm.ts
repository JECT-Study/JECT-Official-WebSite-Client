import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type { ApplyPinFormData } from "@/schema/applySchema";
import { applyPinSchema } from "@/schema/applySchema";

export const useApplyPinForm = () => {
  return useForm<ApplyPinFormData>({
    resolver: zodResolver(applyPinSchema),
    mode: "onChange",
    defaultValues: {
      pin: "",
    },
  });
};
