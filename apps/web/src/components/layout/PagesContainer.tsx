import type { ReactNode } from "react";

interface PagesContainerProps {
  children: ReactNode;
}

function PagesContainer({ children }: PagesContainerProps) {
  return <main className='min-h-dvh bg-surface-standard-dark pt-[3.75rem]'>{children}</main>;
}

export default PagesContainer;
