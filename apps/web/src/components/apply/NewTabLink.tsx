import type { ReactNode } from "react";

interface NewTabLinkProps {
  href: string;
  className?: string;
  children: ReactNode;
}

function NewTabLink({ href, className = "", children }: NewTabLinkProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
    </a>
  );
}

export default NewTabLink;
