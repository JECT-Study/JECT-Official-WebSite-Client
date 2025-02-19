import clsx from 'clsx';
import { ReactNode } from 'react';

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

const IMG_CLASS_DEFAULT =
  'border-border-assistive-dark h-[12.0625rem] w-full border-b object-cover';
const IMG_CLASS_EXPANDED = 'border-border-assistive-dark w-full flex-1 border-b object-cover';

const CONTAINER_CLASS_VISIBLE =
  'gap-3xs flex flex-col items-start flex-1  px-(--gap-md) py-(--gap-xs)';
const CONTAINER_CLASS_HIDDEN =
  'gap-3xs flex flex-col items-start flex-1  px-(--gap-md) pt-(--gap-xs) pb-(--gap-lg)';

export const Card = ({
  title,
  label,
  children,
  imgUrl,
  isDescriptionVisible = true,
  disabled,
  ...restProps
}: CardProps) => {
  const imgClass = isDescriptionVisible ? IMG_CLASS_DEFAULT : IMG_CLASS_EXPANDED;
  const containerClass = isDescriptionVisible ? CONTAINER_CLASS_VISIBLE : CONTAINER_CLASS_HIDDEN;

  const bgClass = disabled ? 'bg-surface-deep-dark' : 'bg-surface-embossed-dark';
  const buttonClass = clsx(
    'peer radius-md stroke-normal border-border-assistive-dark box-border flex h-[21.25rem] w-[17.5rem] flex-col items-stretch overflow-hidden border',
    bgClass,
  );

  const titleTextColor = disabled ? 'text-object-disabled-dark' : 'text-object-hero-dark';
  const labelTextColor = disabled ? 'text-object-disabled-dark' : 'text-object-normal-dark';
  const descriptionTextColor = disabled ? 'text-object-disabled-dark' : 'text-object-neutral-dark';

  return (
    <Interaction
      variant='default'
      density='subtle'
      isInversed={false}
      className='peer-hover:duration-slower peer-focus:duration-slower peer-hover:ease-(--motion-fluent) peer-focus:ease-(--motion-fluent)'
    >
      <button type='button' disabled={!!disabled} className={buttonClass} {...restProps}>
        <img src={imgUrl} alt='카드 이미지' className={imgClass} />
        <div className={containerClass}>
          <div className='gap-4xs flex flex-col items-start'>
            <Title hierarchy='weak' textColor={titleTextColor}>
              {title}
            </Title>
            <Label hierarchy='stronger' weight='normal' textColor={labelTextColor}>
              {label}
            </Label>
          </div>
          {isDescriptionVisible && (
            <div className={`body-lg min-h-[3rem] flex-[1_0_0] ${descriptionTextColor}`}>
              {children}
            </div>
          )}
        </div>
      </button>
    </Interaction>
  );
};
