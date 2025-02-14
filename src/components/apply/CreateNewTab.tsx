interface CreateNewTabProps {
  href: string;
  children: string;
}

function CreateNewTab({ href, children }: CreateNewTabProps) {
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

export default CreateNewTab;
