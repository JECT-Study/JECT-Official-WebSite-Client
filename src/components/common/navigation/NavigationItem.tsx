import { ComponentPropsWithoutRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Interaction from '@/components/common/interaction/Interaction';
import { PathName } from '@/types/pathname';

interface NavigationItemProps extends ComponentPropsWithoutRef<'button'> {
  children: string;
  pathName: PathName;
}

function NavigationItem({ children, pathName, disabled, ...props }: NavigationItemProps) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      {disabled ? (
        <button
          disabled
          className={`text-object-disabled-dark radius-2xs label-bold-lg px-(--gap-xs) py-(--gap-4xs)`}
        >
          {children}
        </button>
      ) : (
        <Interaction
          variant={pathName === location.pathname ? 'brand' : 'default'}
          density='subtle'
          isInversed={false}
        >
          <button
            {...props}
            onClick={() => void navigate(pathName)}
            className={`${pathName === location.pathname ? 'text-accent-hero-dark' : 'text-object-hero-dark'} peer radius-2xs label-bold-lg cursor-pointer px-(--gap-xs) py-(--gap-4xs)`}
          >
            {children}
          </button>
        </Interaction>
      )}
    </>
  );
}

export default NavigationItem;
