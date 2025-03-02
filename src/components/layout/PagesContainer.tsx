import { ReactNode } from 'react';

interface PagesContainerProps {
  children: ReactNode;
}

function PagesContainer({ children }: PagesContainerProps) {
  return <main className='bg-surface-standard-dark min-h-[calc(100dvh-8.555rem)]'>{children}</main>;
}

export default PagesContainer;
