import { ReactNode } from 'react';

import { Hierarchy, labelStyle, Weight } from '@/styles/labelStyle';

interface LabelProps {
  children: ReactNode;
  hierarchy: Hierarchy;
  weight: Weight;
  textColor: string;
  isRequired?: boolean;
  className?: string;
}

function Label({ children, weight, hierarchy, textColor, isRequired, className }: LabelProps) {
  const typo = labelStyle.weight[weight].hierarchy[hierarchy].typo;

  return (
    <div className={`${typo} ${className ?? ''} gap-5xs flex`}>
      <span className={`${textColor} ${className ?? ''} cursor-default whitespace-nowrap`}>
        {children}
      </span>
      {isRequired && <span className='text-feedback-notification-dark'>*</span>}
    </div>
  );
}

export default Label;
