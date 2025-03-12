import { ReactNode } from 'react';

import { Hierarchy } from '@/components/common/label/label.style';
import { titleStyle } from '@/components/common/title/title.style';

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
