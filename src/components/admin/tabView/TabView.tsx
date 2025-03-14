import { ReactNode } from 'react';

interface TabViewProps {
  children: ReactNode;
}

function TabView({ children }: TabViewProps) {
  return (
    <div className='bg-surface-deeper-dark radius-sm *:label-bold-md *:radius-2xs inline-flex p-(--gap-5xs) *:px-(--gap-md) *:py-(--gap-4xs)'>
      {children}
    </div>
  );
}

export default TabView;
