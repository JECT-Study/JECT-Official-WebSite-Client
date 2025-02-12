import { ReactNode } from 'react';

import Label from '@/components/common/Label.tsx';
import Title from '@/components/common/Title.tsx';

interface CardProps {
  title: string;
  label: string;
  children: ReactNode;
  imgUrl: string;
}

export const Card = ({ title, label, children, imgUrl }: CardProps) => {
  return (
    <div className='radius-md stroke-normal border-border-assistive-dark bg-surface-embossed-dark box-border flex h-[21.25rem] w-[17.5rem] flex-col items-start overflow-hidden border'>
      <img
        src={imgUrl}
        alt='카드 이미지'
        className='h=-[12.0625rem] border-border-assistive-dark box-border w-full border-b object-cover'
      />
      <div className='gap-3xs flex flex-[1_0_0] flex-col items-start self-stretch px-(--gap-md) py-(--gap-xs)'>
        <div className='gap-4xs flex flex-col items-start self-stretch'>
          <Title hierarchy='weak'>{title}</Title>
          <Label hierarchy='stronger' weight='normal' textColor='text-object-normal-dark'>
            {label}
          </Label>
        </div>
        <div className='body-lg text-object-neutral-dark min-h-[3rem] flex-[1_0_0] self-stretch'>
          {children}
        </div>
      </div>
    </div>
  );
};
