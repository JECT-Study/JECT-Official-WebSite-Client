import { ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';

interface ChipProps {
  param: string;
  children: ReactNode;
}

function Chip({ param, children }: ChipProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handlerClick = () => {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set('position', param);
    setSearchParams(newSearchParams);
  };

  return (
    <button
      onClick={handlerClick}
      className={`${searchParams.get('position') === param ? 'bg-fill-hero-dark label-md text-object-inverse-hero-dark' : 'bg-fill-assistive-dark label-md text-object-neutral-dark'} interaction-default-normal radius-circle px-(--gap-sm) py-(--gap-4xs)`}
    >
      {children}
    </button>
  );
}

export default Chip;
