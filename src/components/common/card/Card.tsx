import clsx from 'clsx';
import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { Link } from 'react-router-dom';

import Interaction from '@/components/common/interaction/Interaction';
import Label from '@/components/common/label/Label';
import Title from '@/components/common/title/Title';

interface CardProps extends ComponentPropsWithoutRef<typeof Link> {
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
    'peer radius-md stroke-normal border-border-assistive-dark box-border border flex w-full h-[21.25rem] flex-col overflow-hidden',
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
      <Link className={cardClass} {...restProps}>
        <div className={imageContainerClass}>
          <img src={imgUrl} alt='카드 이미지' className='block h-full w-full object-cover' />
        </div>
        <div className='gap-3xs flex w-full flex-col px-(--gap-md) pt-(--gap-xs) pb-(--gap-lg)'>
          <div className='gap-4xs flex flex-col items-start'>
            <Title
              hierarchy='weak'
              textColor={disabled ? 'text-object-disabled-dark' : 'text-object-hero-dark'}
              className='w-full truncate'
            >
              {title}
            </Title>
            <Label
              hierarchy='stronger'
              weight='normal'
              textColor={disabled ? 'text-object-disabled-dark' : 'text-object-normal-dark'}
              className='w-full truncate'
            >
              {label}
            </Label>
          </div>
          {isDescriptionVisible && (
            <span
              className={clsx(
                'body-lg line-clamp-2 h-[3.375rem] w-full text-left break-words whitespace-normal',
                disabled ? 'text-object-disabled-dark' : 'text-object-neutral-dark',
              )}
            >
              {children}
            </span>
          )}
        </div>
      </Link>
    </Interaction>
  );
};
