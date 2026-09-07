import { useEffect } from "react";

import BlockButton from "@/components/common/button/BlockButton";
import { dialogTypes } from "@/constants/dialog";
import { useDialogActions, useDialogItem } from "@/stores/dialogStore";

function Dialog() {
  const { isOpen, type, onPrimaryBtnClick, onSecondaryBtnClick } = useDialogItem();
  const { resetDialog } = useDialogActions();

  const handleClickPrimaryBtn = () => {
    onPrimaryBtnClick?.();
    resetDialog();
  };

  const handleClickSecondaryBtn = () => {
    onSecondaryBtnClick?.();
    resetDialog();
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isOpen]);

  if (!type) return;

  return (
    isOpen && (
      <div aria-label='dialog' className='fixed inset-0 z-50 h-dvh w-dvw bg-surface-dimmed-dark'>
        <div className='shadow-overlay radius-md gap-5xl absolute top-1/2 left-1/2 flex w-[25rem] -translate-1/2 flex-col bg-surface-embossed-dark p-(--gap-2xl)'>
          <div className='gap-md flex flex-col items-center pt-(--gap-3xs)'>
            <p className='title-01 text-object-hero-dark'>{dialogTypes[type].title}</p>
            <div className='body-lg text-center text-object-normal-dark'>
              {dialogTypes[type].content}
            </div>
          </div>
          <div
            className={`gap-xs i *: flex *:flex-1 ${dialogTypes[type].btnLayout === "vertical" ? "flex-col" : "*:first:order-2 *:last:order-1"}`}
          >
            <BlockButton onClick={handleClickPrimaryBtn} size='md' hierarchy='accent' style='solid'>
              {dialogTypes[type].primaryBtnLabel}
            </BlockButton>
            {dialogTypes[type].btnLayout !== "singleButton" && (
              <BlockButton
                onClick={handleClickSecondaryBtn}
                size='md'
                hierarchy='secondary'
                style='solid'
              >
                {dialogTypes[type].secondaryBtnLabel}
              </BlockButton>
            )}
          </div>
        </div>
      </div>
    )
  );
}

export default Dialog;
