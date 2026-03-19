import type { ReactNode } from "react";

interface PageModuleProps {
  children: ReactNode;
}

function PageModule({ children }: PageModuleProps) {
  return (
    <div className='w-full max-w-[978px] px-(--semantic-margin-lg) pb-(--semantic-spacing-80)'>
      {children}
    </div>
  );
}

export default PageModule;
