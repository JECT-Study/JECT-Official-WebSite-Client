import { ReactNode } from 'react';

interface TabViewProps {
  children: ReactNode;
}

function TabView({ children }: TabViewProps) {
  return (
    <div className='bg-surface-deeper-dark radius-sm inline-flex p-(--gap-5xs)'>{children}</div>
  );
}

export default TabView;
