import { ReactNode } from 'react';

import { Hierarchy } from '@/styles/labelStyle';
import { titleStyle } from '@/styles/titleStyle';

interface TitleProps {
  children: ReactNode;
  hierarchy: Hierarchy;
  textColor?: string;
  className?: string;
}

function Title({ children, hierarchy, textColor, className }: TitleProps) {
  const typo = titleStyle.hierarchy[hierarchy].typo;

  return (
    <div className={`${typo} ${textColor ?? 'text-object-hero-dark'} ${className ?? ''}`}>
      {children}
    </div>
  );
}

export default Title;
