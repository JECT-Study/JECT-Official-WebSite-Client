import type { ReactNode } from "react";

interface PagesContainerProps {
  children: ReactNode;
}

function PagesContainer({ children }: PagesContainerProps) {
  return <main className='min-h-dvh bg-(--semantic-surface-standard)'>{children}</main>;
}

export default PagesContainer;
