import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

import BlockButton from '@/components/common/button/BlockButton';

export interface DialogProps {
  type: 'vertical' | 'horizontal';
  title: string;
  children: ReactNode;
  btnLabel1: string;
  btnLabel2: string;
  isOpen: boolean;
  clickBtn1: () => void;
  clickBtn2: () => void;
}

function Dialog({
  type,
  title,
  children,
  btnLabel1,
  btnLabel2,
  isOpen,
  clickBtn1,
  clickBtn2,
}: DialogProps) {
  const handleClickBtn1 = () => {
    clickBtn1();
  };

  const handleClickBtn2 = () => {
    clickBtn2();
  };

  return (
    isOpen &&
    createPortal(
      <div aria-label='dialog' className='bg-surface-dimmed-dark fixed inset-0 z-50 h-dvh w-dvw'>
        <div className='bg-surface-embossed-dark shadow-overlay radius-md gap-5xl absolute top-1/2 left-1/2 flex w-[25rem] -translate-1/2 flex-col p-(--gap-2xl)'>
          <div className='gap-md flex flex-col items-center pt-(--gap-3xs)'>
            <p className='title-01 text-object-hero-dark'>{title}</p>
            <p className='body-lg text-object-normal-dark'>{children}</p>
          </div>
          <div className={`gap-xs i flex ${type === 'vertical' ? 'flex-col' : ''}`}>
            <BlockButton
              onClick={handleClickBtn1}
              size='md'
              hierarchy='secondary'
              style='solid'
              className={type === 'vertical' ? 'w-[22rem]' : 'w-[10.625rem]'}
            >
              {btnLabel1}
            </BlockButton>
            <BlockButton
              onClick={handleClickBtn2}
              size='md'
              hierarchy='accent'
              style='solid'
              className={type === 'vertical' ? 'w-[22rem]' : 'w-[10.625rem]'}
            >
              {btnLabel2}
            </BlockButton>
          </div>
        </div>
      </div>,
      document.body,
    )
  );
}

export default Dialog;
