import type { ReactNode } from "react";

interface PageBoardProps {
  children: ReactNode;
}

function PageBoard({ children }: PageBoardProps) {
  return (
    <div className='flex justify-center pt-[calc(44px+var(--semantic-margin-2xl))] pb-(--semantic-margin-2xl) tablet:pt-[calc(46px+var(--semantic-margin-2xl))] desktop:pt-[calc(56px+var(--semantic-margin-2xl))]'>
      {children}
    </div>
  );
}

export default PageBoard;
