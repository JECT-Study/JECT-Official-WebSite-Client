interface ButtonProps {
  label: string;
  onClick?: () => void;
}

const Button = ({ label, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className='rounded bg-[var(--color-accent-hero-light)] px-3.5 py-2 font-semibold text-white shadow transition-colors hover:bg-[var(--color-accent-hero-dark)]'
    >
      {label}
    </button>
  );
};

export default Button;
