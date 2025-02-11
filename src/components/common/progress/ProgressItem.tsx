import { ReactNode } from 'react';

import Title from '../Title';
import ProgressIndex from './ProgressIndex';

interface ProgressItemProps {
  index: number;
  title: string;
  subTitle: string;
  content: ReactNode;
  isActive: boolean;
}

const ACTIVE_STYLE = 'border-border-alternative-dark bg-accent-trans-normal-dark';
const INACTIVE_STYLE = 'border-border-assistive-dark bg-surface-deep-dark';

function ProgressItem({ index, title, subTitle, content, isActive }: ProgressItemProps) {
  const activeStyle = isActive ? ACTIVE_STYLE : INACTIVE_STYLE;

  return (
    <div
      className={`${activeStyle} radius-xs gap-3xl flex items-center border px-(--gap-3xl) py-(--gap-2xl)`}
    >
      <ProgressIndex isActive={isActive}>{index}</ProgressIndex>
      <div className='gap-xs flex flex-col'>
        <div className='gap-sm flex items-center'>
          <Title hierarchy='normal'>{title}</Title>
          <Title hierarchy='weak' textColor='text-object-alternative-dark'>
            {subTitle}
          </Title>
        </div>
        <p className='body-lg text-object-normal-dark'>{content}</p>
      </div>
    </div>
  );
}

export default ProgressItem;
