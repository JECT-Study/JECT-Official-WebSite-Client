import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';

interface ChipProps extends ComponentPropsWithoutRef<'button'> {
  param?: {
    key: string;
    value: string;
  };
  children: ReactNode;
}

function Chip({ param, children, ...props }: ChipProps) {
  const [searchParams] = useSearchParams();

  return (
    <button
      {...props}
      className={`${param && searchParams.get(param.key) === param.value ? 'bg-fill-hero-dark label-md text-object-inverse-hero-dark' : 'bg-fill-assistive-dark label-md text-object-neutral-dark'} interaction-default-normal radius-circle px-(--gap-sm) py-(--gap-4xs)`}
    >
      {children}
    </button>
  );
}

export default Chip;
