import { ReactNode } from 'react';

interface NewTabLinkProps {
  href: string;
  className?: string;
  areaLabel: string;
  children: ReactNode;
}

function NewTabLink({ href, className = '', areaLabel, children }: NewTabLinkProps) {
  return (
    <a
      href={href}
      aria-label={areaLabel}
      target='_blank'
      rel='noopener noreferrer'
      className={className}
    >
      {children}
    </a>
  );
}

export default NewTabLink;
