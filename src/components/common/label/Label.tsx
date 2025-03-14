import { ReactNode } from 'react';

import { Hierarchy, labelStyle, Weight } from '@/components/common/label/label.style';

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
    <div
      className={`${typo} ${textColor} ${isRequired ? "after:text-feedback-notification-dark after:ml-(--gap-5xs) after:content-['*']" : ''} whitespace-nowrap`}
    >
      {children}
    </div>
  );
}

export default Label;
