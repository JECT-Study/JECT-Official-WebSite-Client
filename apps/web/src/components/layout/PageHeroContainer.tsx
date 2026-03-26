import type { ReactNode } from "react";

interface PageHeroContainerProps {
  children: ReactNode;
}

function PageHeroContainer({ children }: PageHeroContainerProps) {
  return (
    <div className='flex flex-col gap-(--semantic-spacing-32) pt-(--semantic-margin-xl) pb-(--semantic-margin-3xl)'>
      {children}
    </div>
  );
}

export default PageHeroContainer;
