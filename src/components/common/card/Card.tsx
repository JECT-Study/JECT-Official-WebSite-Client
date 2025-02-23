import clsx from 'clsx';
import { ComponentPropsWithoutRef, ReactNode } from 'react';

import Interaction from '@/components/common/interaction/Interaction';
import Label from '@/components/common/Label';
import Title from '@/components/common/Title';

interface CardProps extends ComponentPropsWithoutRef<'button'> {
  title: string;
  label: string;
  children: ReactNode;
  imgUrl: string;
  isDescriptionVisible?: boolean;
}

const BUTTON_BASE_CLASS =
  'peer radius-md stroke-normal border-border-assistive-dark box-border border-x flex w-full h-[21.25rem] flex-col overflow-hidden';
const CONTENT_CONTAINER_CLASS =
  'gap-3xs flex w-full flex-col px-(--gap-md) pt-(--gap-xs) pb-(--gap-lg)';
const TITLE_LABEL_CONTAINER_CLASS = 'gap-4xs flex flex-col items-start';
const IMAGE_CONTAINER_BASE_CLASS = 'flex w-full overflow-hidden';

export const Card = ({
  title,
  label,
  children,
  imgUrl,
  isDescriptionVisible = true,
  disabled,
  ...restProps
}: CardProps) => {
  const bgClass = disabled ? 'bg-surface-deep-dark' : 'bg-surface-embossed-dark';
  const buttonClass = clsx(BUTTON_BASE_CLASS, bgClass);

  const titleTextColor = disabled ? 'text-object-disabled-dark' : 'text-object-hero-dark';
  const labelTextColor = disabled ? 'text-object-disabled-dark' : 'text-object-normal-dark';
  const descriptionTextColor = disabled ? 'text-object-disabled-dark' : 'text-object-neutral-dark';

  const imageHeightClass = isDescriptionVisible ? 'h-[11.6875rem]' : 'h-[15.5625rem]';
  const imageContainerClass = clsx(IMAGE_CONTAINER_BASE_CLASS, imageHeightClass);

  return (
    <Interaction
      variant='default'
      density='subtle'
      isInversed={false}
      className='peer-hover:duration-slower peer-focus:duration-slower peer-hover:ease-(--motion-fluent) peer-focus:ease-(--motion-fluent)'
    >
      <button type='button' disabled={!!disabled} className={buttonClass} {...restProps}>
        <div className={imageContainerClass}>
          <img src={imgUrl} alt='카드 이미지' className='block h-full w-full object-cover' />
        </div>
        <div className={CONTENT_CONTAINER_CLASS}>
          <div className={TITLE_LABEL_CONTAINER_CLASS}>
            <Title hierarchy='weak' textColor={titleTextColor}>
              {title}
            </Title>
            <Label hierarchy='stronger' weight='normal' textColor={labelTextColor}>
              {label}
            </Label>
          </div>
          {isDescriptionVisible && (
            <div className={`body-lg flex h-[3.375rem] ${descriptionTextColor} text-left`}>
              {children}
            </div>
          )}
        </div>
      </button>
    </Interaction>
  );
};
