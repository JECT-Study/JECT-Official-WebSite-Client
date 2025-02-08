import { ReactNode } from 'react';

import { Hierarchy, labelStyle, Weight } from '@/styles/labelStyle';

interface LabelProps {
  children: ReactNode;
  hierarchy: Hierarchy;
  weight: Weight;
  textColor: string;
  isRequired?: boolean;
}

function Label({ children, weight, hierarchy, textColor, isRequired }: LabelProps) {
  const typo = labelStyle.weight[weight].hierarchy[hierarchy].typo;
  const lineHeight = labelStyle.weight[weight].hierarchy[hierarchy].lineHeight;

  return (
    <div className={`${typo} ${lineHeight} gap-5xs flex`}>
      <span className={`${textColor} whitespace-nowrap`}>{children}</span>
      {isRequired && <span className='text-feedback-notification-dark'>*</span>}
    </div>
  );
}

export default Label;
