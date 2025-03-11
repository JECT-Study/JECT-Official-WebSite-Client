import { NavLink, NavLinkRenderProps } from 'react-router-dom';

import { PathValues } from '@/types/ui/path';

interface NavigationItemProps {
  children: string;
  pathName: PathValues;
  disabled?: boolean;
}

function NavigationItem({ children, pathName, disabled = false }: NavigationItemProps) {
  const className = disabled
    ? 'text-object-disabled-dark radius-2xs label-bold-lg px-(--gap-xs) py-(--gap-4xs) pointer-events-none'
    : ({ isActive }: NavLinkRenderProps) =>
        (isActive
          ? 'text-accent-hero-dark interaction-brand-subtle'
          : 'text-object-hero-dark interaction-default-subtle') +
        ' radius-2xs label-bold-lg cursor-pointer px-(--gap-xs) py-(--gap-4xs)';

  return (
    <NavLink to={pathName} className={className}>
      {children}
    </NavLink>
  );
}

export default NavigationItem;
