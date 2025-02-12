import { ReactNode } from 'react';

import Label from '@/components/common/Label';
import Title from '@/components/common/Title';

interface PostProps {
  title: string;
  label: string;
  date: string;
  children: ReactNode;
}
export const Post = ({ title, label, date, children }: PostProps) => {
  return (
    <div className='radius-sm gap-3xs border-border-assistive-dark bg-surface-embossed-dark flex w-[53.75rem] flex-col items-start px-(--gap-lg) py-(--gap-md)'>
      <div className='gap-md flex items-center self-stretch'>
        <div className='gap-xs flex flex-[1_0_0] items-center self-stretch'>
          <Title hierarchy='weak'>{title}</Title>
          <Label hierarchy='strong' weight='bold' textColor='text-object-neutral-dark'>
            {label}
          </Label>
        </div>
        <Label hierarchy='normal' weight='normal' textColor='text-object-alternative-dark'>
          {date}
        </Label>
      </div>
      <div className='body-lg text-object-neutral-dark min-h-[3.375rem] self-stretch'>
        {children}
      </div>
    </div>
  );
};
