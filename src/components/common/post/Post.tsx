import clsx from 'clsx';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

import Interaction from '@/components/common/interaction/Interaction';
import Label from '@/components/common/Label';
import Title from '@/components/common/Title';

interface PostProps extends ComponentPropsWithoutRef<'a'> {
  title: string;
  label: string;
  date: string;
  children: ReactNode;
  disabled?: boolean;
}
export const Post = ({
  title,
  label,
  date,
  children,
  disabled = false,
  ...restProps
}: PostProps) => {
  const containerClass = clsx(
    'peer box-border radius-sm gap-3xs border border-border-assistive-dark flex w-full flex-col items-start px-(--gap-lg) py-(--gap-md)',
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
      <a
        className={containerClass}
        {...(disabled ? { 'aria-disabled': true, tabIndex: -1 } : {})}
        {...restProps}
      >
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
        <span
          className={clsx(
            'body-lg block h-[3.375rem] w-full text-left whitespace-normal',
            disabled ? 'text-object-disabled-dark' : 'text-object-neutral-dark',
          )}
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            wordBreak: 'break-word',
            overflowWrap: 'break-word',
          }}
        >
          {children}
        </span>
      </a>
    </Interaction>
  );
};
