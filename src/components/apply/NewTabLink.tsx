import { ReactNode } from 'react';

interface NewTabLinkProps {
  href: string;
  children: ReactNode;
}

function NewTabLink({ href, children }: NewTabLinkProps) {
  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      className='text-feedback-information-dark decoration-feedback-information-dark underline'
    >
      {children}
    </a>
  );
}

export default NewTabLink;
