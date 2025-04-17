import { ReactNode } from 'react';

interface PagesContainerProps {
  children: ReactNode;
}

function PagesContainer({ children }: PagesContainerProps) {
  return <main className='bg-surface-standard-dark min-h-dvh pt-[3.75rem]'>{children}</main>;
}

export default PagesContainer;
