import { ComponentPropsWithoutRef, ReactNode } from 'react';

interface TabViewItemProps extends ComponentPropsWithoutRef<'button'> {
  isActive: boolean;
  children: ReactNode;
}

function TabViewItem({ isActive, children, ...props }: TabViewItemProps) {
  const activeStyle = 'bg-fill-assistive-dark text-object-hero-dark interaction-default-normal';
  const inactiveStyle = 'text-object-assistive-dark interaction-default-subtle';

  return (
    <button
      {...props}
      className={`${isActive ? activeStyle : inactiveStyle} label-bold-md radius-2xs cursor-pointer px-(--gap-md) py-(--gap-4xs)`}
    >
      {children}
    </button>
  );
}

export default TabViewItem;
