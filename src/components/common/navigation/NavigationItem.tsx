import { useLocation, useNavigate } from 'react-router-dom';

import Interaction from '@/components/common/interaction/Interaction';
import { PathName } from '@/constants/path';

interface NavigationItemProps {
  children: string;
  pathName: PathName;
  disabled?: boolean;
}

function NavigationItem({ children, pathName, disabled = false }: NavigationItemProps) {
  const location = useLocation();
  const navigate = useNavigate();

  if (disabled) {
    return (
      <button
        disabled
        className={`text-object-disabled-dark radius-2xs label-bold-lg px-(--gap-xs) py-(--gap-4xs)`}
      >
        {children}
      </button>
    );
  }

  return (
    <Interaction
      variant={pathName === location.pathname ? 'brand' : 'default'}
      density='subtle'
      isInversed={false}
    >
      <button
        onClick={() => void navigate(pathName)}
        className={`${pathName === location.pathname ? 'text-accent-hero-dark' : 'text-object-hero-dark'} peer radius-2xs label-bold-lg cursor-pointer px-(--gap-xs) py-(--gap-4xs)`}
      >
        {children}
      </button>
    </Interaction>
  );
}

export default NavigationItem;
