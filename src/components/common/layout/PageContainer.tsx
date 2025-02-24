import { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
}

function PageContainer({ children }: PageContainerProps) {
  return <main className='bg-surface-standard-dark min-h-[calc(100dvh-8.555rem)]'>{children}</main>;
}

export default PageContainer;
