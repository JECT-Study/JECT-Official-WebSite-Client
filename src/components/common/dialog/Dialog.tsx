import { useEffect } from 'react';

import BlockButton from '@/components/common/button/BlockButton';
import { useDialogActions, useDialogItem } from '@/stores/dialogStore';

function Dialog() {
  const {
    isOpen,
    btnLayout,
    title,
    content,
    primaryBtnLabel,
    secondaryBtnLabel,
    onPrimaryBtnClick,
    onSecondaryBtnClick,
  } = useDialogItem();
  const { resetDialog, closeDialog } = useDialogActions();

  const handleClickPrimaryBtn = () => {
    if (onPrimaryBtnClick) {
      onPrimaryBtnClick();
      resetDialog();
    }
    closeDialog();
  };

  const handleClickSecondaryBtn = () => {
    if (onSecondaryBtnClick) {
      onSecondaryBtnClick();
      resetDialog();
    }
    closeDialog();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  return (
    isOpen && (
      <div aria-label='dialog' className='bg-surface-dimmed-dark fixed inset-0 z-50 h-dvh w-dvw'>
        <div className='bg-surface-embossed-dark shadow-overlay radius-md gap-5xl absolute top-1/2 left-1/2 flex w-[25rem] -translate-1/2 flex-col p-(--gap-2xl)'>
          <div className='gap-md flex flex-col items-center pt-(--gap-3xs)'>
            <p className='title-01 text-object-hero-dark'>{title}</p>
            <div className='body-lg text-object-normal-dark text-center'>{content}</div>
          </div>
          <div
            className={`gap-xs i *: flex *:flex-1 ${btnLayout === 'vertical' ? 'flex-col' : '*:first:order-2 *:last:order-1'}`}
          >
            <BlockButton onClick={handleClickPrimaryBtn} size='md' hierarchy='accent' style='solid'>
              {primaryBtnLabel}
            </BlockButton>
            <BlockButton
              onClick={handleClickSecondaryBtn}
              size='md'
              hierarchy='secondary'
              style='solid'
            >
              {secondaryBtnLabel}
            </BlockButton>
          </div>
        </div>
      </div>
    )
  );
}

export default Dialog;
