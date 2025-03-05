import { useEffect, useState } from 'react';

import Label from '../label/Label';

import { ToastType, useToastActions, useToastItem } from '@/stores/toastStore';

type ToastStyleType = Record<
  ToastType,
  {
    backgroundColor: string;
    textColor: string;
  }
>;

const toastStyle: ToastStyleType = {
  normal: {
    backgroundColor: 'bg-object-hero-dark',
    textColor: 'text-object-inverse-hero-dark',
  },
  negative: {
    backgroundColor: 'bg-feedback-negative-dark',
    textColor: 'text-object-static-inverse-hero-dark',
  },
  positive: {
    backgroundColor: 'bg-feedback-positive-dark',
    textColor: 'text-object-static-inverse-hero-dark',
  },
};

function Toast() {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const toastItem = useToastItem();
  const { removeToast } = useToastActions();

  const handleAnimationEnd = () => {
    if (isFadingOut) {
      setIsFadingOut(false);
      removeToast();
    }
  };

  useEffect(() => {
    if (toastItem) {
      const timer = setTimeout(() => {
        setIsFadingOut(true);
      }, 2800);

      return () => clearTimeout(timer);
    }
  }, [toastItem]);

  if (!toastItem) return null;

  return (
    <div
      key={toastItem.id}
      className={`${toastStyle[toastItem.type].backgroundColor} ${isFadingOut ? 'animate-toast-fade-out' : 'animate-toast-fade-in'} shadow-overlay radius-xs fixed left-1/2 -translate-x-1/2 px-(--gap-lg) py-(--gap-3xs) *:inline`}
      onAnimationEnd={handleAnimationEnd}
    >
      <Label hierarchy='strong' weight='normal' textColor={toastStyle[toastItem.type].textColor}>
        {toastItem.message}
      </Label>
    </div>
  );
}

export default Toast;
