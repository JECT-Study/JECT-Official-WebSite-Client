import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

import BlockButton from '@/components/common/button/BlockButton';

export interface DialogProps {
  btnLayout: 'vertical' | 'horizontal';
  title: string;
  children: ReactNode;
  primaryBtnLabel: string;
  secondaryBtnLabel: string;
  isOpen: boolean;
  onPrimaryBtnClick: () => void;
  onSecondaryBtnClick: () => void;
}

function Dialog({
  btnLayout,
  title,
  children,
  primaryBtnLabel,
  secondaryBtnLabel,
  isOpen,
  onPrimaryBtnClick,
  onSecondaryBtnClick,
}: DialogProps) {
  return (
    isOpen &&
    createPortal(
      <div aria-label='dialog' className='bg-surface-dimmed-dark fixed inset-0 z-50 h-dvh w-dvw'>
        <div className='bg-surface-embossed-dark shadow-overlay radius-md gap-5xl absolute top-1/2 left-1/2 flex w-[25rem] -translate-1/2 flex-col p-(--gap-2xl)'>
          <div className='gap-md flex flex-col items-center pt-(--gap-3xs)'>
            <p className='title-01 text-object-hero-dark'>{title}</p>
            <p className='body-lg text-object-normal-dark'>{children}</p>
          </div>
          <div
            className={`gap-xs i *: flex *:flex-1 ${btnLayout === 'vertical' ? 'flex-col' : '*:first:order-2 *:last:order-1'}`}
          >
            <BlockButton onClick={onPrimaryBtnClick} size='md' hierarchy='accent' style='solid'>
              {primaryBtnLabel}
            </BlockButton>
            <BlockButton
              onClick={onSecondaryBtnClick}
              size='md'
              hierarchy='secondary'
              style='solid'
            >
              {secondaryBtnLabel}
            </BlockButton>
          </div>
        </div>
      </div>,
      document.body,
    )
  );
}

export default Dialog;
