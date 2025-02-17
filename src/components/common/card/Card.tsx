import { ReactNode } from 'react';

import Label from '@/components/common/Label.tsx';
import Title from '@/components/common/Title.tsx';

interface CardProps {
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
}: CardProps) => {
  const imgClass = isDescriptionVisible ? IMG_CLASS_DEFAULT : IMG_CLASS_EXPANDED;
  const containerClass = isDescriptionVisible ? CONTAINER_CLASS_VISIBLE : CONTAINER_CLASS_HIDDEN;

  return (
    <button
      type='button'
      className='radius-md stroke-normal border-border-assistive-dark bg-surface-embossed-dark box-border flex h-[21.25rem] w-[17.5rem] flex-col items-stretch overflow-hidden border'
    >
      <img src={imgUrl} alt='카드 이미지' className={imgClass} />
      <div className={containerClass}>
        <div className='gap-4xs flex flex-col items-start'>
          <Title hierarchy='weak'>{title}</Title>
          <Label hierarchy='stronger' weight='normal' textColor='text-object-normal-dark'>
            {label}
          </Label>
        </div>
        {isDescriptionVisible && (
          <div className='body-lg text-object-neutral-dark min-h-[3rem] flex-[1_0_0]'>
            {children}
          </div>
        )}
      </div>
    </button>
  );
};
