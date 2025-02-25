import clsx from 'clsx';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

import Interaction from '@/components/common/interaction/Interaction';
import Label from '@/components/common/Label';
import Title from '@/components/common/Title';

interface CardProps extends ComponentPropsWithoutRef<'a'> {
  title: string;
  label: string;
  children: ReactNode;
  imgUrl: string;
  isDescriptionVisible?: boolean;
  disabled?: boolean;
}

export const Card = ({
  title,
  label,
  children,
  imgUrl,
  isDescriptionVisible = true,
  disabled = false,
  ...restProps
}: CardProps) => {
  const cardClass = clsx(
    'peer radius-md stroke-normal border-border-assistive-dark box-border border-x flex w-full h-[21.25rem] flex-col overflow-hidden',
    disabled
      ? 'bg-surface-deep-dark pointer-events-none cursor-not-allowed'
      : 'bg-surface-embossed-dark pointer-events-auto cursor-pointer',
  );
  const imageContainerClass = clsx(
    'flex w-full overflow-hidden border-border-assistive-dark border-b',
    isDescriptionVisible ? 'h-[11.6875rem]' : 'h-[15.5625rem]',
  );

  return (
    <Interaction
      variant='default'
      density='subtle'
      isInversed={false}
      className='peer-hover:duration-normal peer-focus:duration-normal peer-hover:ease-(--motion-fluent) peer-focus:ease-(--motion-fluent)'
    >
      <a
        className={cardClass}
        {...(disabled ? { 'aria-disabled': true, tabIndex: -1 } : {})}
        {...restProps}
      >
        <div className={imageContainerClass}>
          <img src={imgUrl} alt='카드 이미지' className='block h-full w-full object-cover' />
        </div>
        <div className='gap-3xs flex w-full flex-col px-(--gap-md) pt-(--gap-xs) pb-(--gap-lg)'>
          <div className='gap-4xs flex flex-col items-start'>
            <Title
              hierarchy='weak'
              textColor={disabled ? 'text-object-disabled-dark' : 'text-object-hero-dark'}
            >
              {title}
            </Title>
            <Label
              hierarchy='stronger'
              weight='normal'
              textColor={disabled ? 'text-object-disabled-dark' : 'text-object-normal-dark'}
            >
              {label}
            </Label>
          </div>
          {isDescriptionVisible && (
            <div
              className={clsx(
                'body-lg flex h-[3.375rem] text-left',
                disabled ? 'text-object-disabled-dark' : 'text-object-neutral-dark',
              )}
            >
              {children}
            </div>
          )}
        </div>
      </a>
    </Interaction>
  );
};
