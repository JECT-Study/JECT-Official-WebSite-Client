import { ReactNode } from 'react';

interface NewTabLinkProps {
  href: string;
  className?: string;
  ariaLabel: string;
  children: ReactNode;
}

function NewTabLink({ href, className = '', ariaLabel, children }: NewTabLinkProps) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      target='_blank'
      rel='noopener noreferrer'
      className={className}
    >
      {children}
    </a>
  );
}

export default NewTabLink;
