import { ReactNode } from 'react';

import { Hierarchy } from '@/styles/labelStyle';
import { titleStyle } from '@/styles/titleStyle';

interface TitleProps {
  children: ReactNode;
  hierarchy: Hierarchy;
}

function Title({ children, hierarchy }: TitleProps) {
  const typo = titleStyle.hierarchy[hierarchy].typo;

  return <div className={`${typo} text-object-hero-dark`}>{children}</div>;
}

export default Title;
