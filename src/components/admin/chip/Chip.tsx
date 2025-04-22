import { ComponentPropsWithoutRef, ReactNode } from 'react';

interface ChipProps extends ComponentPropsWithoutRef<'button'> {
  isActive: boolean;
  children: ReactNode;
}

function Chip({ isActive, children, ...props }: ChipProps) {
  return (
    <button
      {...props}
      className={`${isActive ? 'bg-fill-hero-dark label-md text-object-inverse-hero-dark' : 'bg-fill-assistive-dark label-md text-object-neutral-dark'} interaction-default-normal radius-circle cursor-pointer px-(--gap-sm) py-(--gap-4xs)`}
    >
      {children}
    </button>
  );
}

export default Chip;
