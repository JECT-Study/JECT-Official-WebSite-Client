import clsx from 'clsx';
import { ReactNode } from 'react';

import Interaction from '@/components/common/interaction/Interaction';
import Label from '@/components/common/label/Label';
import Title from '@/components/common/title/Title';


interface PostProps {
  title: string;
  label: string;
  date: string;
  children: ReactNode;
  disabled?: boolean;
}
export const Post = ({ title, label, date, children, disabled = false }: PostProps) => {
  const containerClass = clsx(
    'peer box-border radius-sm gap-3xs border-x border-border-assistive-dark flex w-full flex-col items-start px-(--gap-lg) py-(--gap-md)',
    disabled
      ? 'bg-surface-deep-dark pointer-events-none cursor-not-allowed'
      : 'bg-surface-embossed-dark pointer-events-auto cursor-pointer',
  );

  return (
    <Interaction
      variant='default'
      density='subtle'
      isInversed={false}
      className='peer-hover:duration-normal peer-focus:duration-normal peer-hover:ease-(--motion-fluent) peer-focus:ease-(--motion-fluent)'
    >
      <div className={containerClass}>
        <div className='gap-md flex items-center self-stretch'>
          <div className='gap-xs flex flex-[1_0_0] items-center self-stretch'>
            <Title
              hierarchy='weak'
              textColor={disabled ? 'text-object-disabled-dark' : 'text-object-hero-dark'}
            >
              {title}
            </Title>
            <Label
              hierarchy='strong'
              weight='bold'
              textColor={disabled ? 'text-object-disabled-dark' : 'text-object-neutral-dark'}
            >
              {label}
            </Label>
          </div>
          <Label
            hierarchy='normal'
            weight='normal'
            textColor={disabled ? 'text-object-disabled-dark' : 'text-object-alternative-dark'}
          >
            {date}
          </Label>
        </div>
        <div
          className={clsx(
            'body-lg flex h-[3.375rem] self-stretch text-left',
            disabled ? 'text-object-disabled-dark' : 'text-object-neutral-dark',
          )}
        >
          {children}
        </div>
      </div>
    </Interaction>
  );
};
