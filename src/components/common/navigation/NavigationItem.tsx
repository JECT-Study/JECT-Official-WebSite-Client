import { NavLink } from 'react-router-dom';

import { PathValues } from '@/types/path';

interface NavigationItemProps {
  children: string;
  pathName: PathValues;
  disabled?: boolean;
}

function NavigationItem({ children, pathName, disabled = false }: NavigationItemProps) {
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
    <NavLink
      to={pathName}
      className={({ isActive }) =>
        (isActive
          ? 'text-accent-hero-dark interaction-brand-subtle '
          : 'text-object-hero-dark interaction-default-subtle') +
        'radius-2xs label-bold-lg cursor-pointer px-(--gap-xs) py-(--gap-4xs)'
      }
    >
      {children}
    </NavLink>
  );
}

export default NavigationItem;
