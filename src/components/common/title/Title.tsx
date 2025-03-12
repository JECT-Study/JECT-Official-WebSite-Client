import { ReactNode } from 'react';

import { titleStyle } from '@/components/common/title/title.style';
import { Hierarchy } from '@/styles/labelStyle';

interface TitleProps {
  children: ReactNode;
  hierarchy: Hierarchy;
  textColor?: string | null;
}

function Title({ children, hierarchy, textColor }: TitleProps) {
  const typo = titleStyle.hierarchy[hierarchy].typo;

  return <div className={`${typo} ${textColor ?? 'text-object-hero-dark'}`}>{children}</div>;
}

export default Title;
