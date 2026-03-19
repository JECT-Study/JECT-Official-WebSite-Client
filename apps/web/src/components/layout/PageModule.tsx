import clsx from "clsx";
import type { ReactNode } from "react";

interface PageModuleProps {
  children: ReactNode;
  className?: string;
}

function PageModule({ children, className }: PageModuleProps) {
  return (
    <div
      className={clsx(
        "w-full max-w-[978px] px-(--semantic-margin-lg) pb-(--semantic-spacing-80)",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default PageModule;
