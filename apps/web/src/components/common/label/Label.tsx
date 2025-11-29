import type { ReactNode } from "react";

import type { Hierarchy, Weight } from "@/components/common/label/label.style";
import { labelStyle } from "@/components/common/label/label.style";

interface LabelProps {
  children: ReactNode;
  hierarchy: Hierarchy;
  weight: Weight;
  textColor: string;
  isRequired?: boolean;
}

function Label({ children, weight, hierarchy, textColor, isRequired }: LabelProps) {
  const typo = labelStyle.weight[weight].hierarchy[hierarchy].typo;

  return (
    //TODO: 웹 접근성을 개선하기 위해 순수 label 태그 사용 및 htmlFor 속성 연동(Checkbox)
    <div
      className={`${typo} ${textColor} ${isRequired ? "after:text-feedback-notification-dark after:ml-(--gap-5xs) after:content-['*']" : ""} whitespace-nowrap`}
    >
      {children}
    </div>
  );
}

export default Label;
