import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';

interface TabViewItemProps extends ComponentPropsWithoutRef<'button'> {
  children: ReactNode;
  param?: {
    key: string;
    value: string;
  };
}

function TabViewItem({ children, param, ...props }: TabViewItemProps) {
  const [searchParams] = useSearchParams();
  const activeStyle = 'bg-fill-assistive-dark text-object-hero-dark interaction-default-normal';
  const inactiveStyle = 'text-object-assistive-dark interaction-default-subtle';

  return (
    <button
      {...props}
      className={`${param && searchParams.get(param.key) === param.value ? activeStyle : inactiveStyle} `}
    >
      {children}
    </button>
  );
}

export default TabViewItem;
