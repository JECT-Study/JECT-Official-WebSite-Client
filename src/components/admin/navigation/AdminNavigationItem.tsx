import { ReactNode } from 'react';
import { NavLink } from 'react-router-dom';

interface AdminNavigationItemProps {
  to: string;
  children: ReactNode;
  disabled?: boolean;
}

function AdminNavigationItem({ to, children, disabled = false }: AdminNavigationItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${isActive ? 'text-accent-hero-dark interaction-brand-subtle' : 'text-object-hero-dark interaction-default-subtle'} ${disabled ? 'pointer-events-none' : ''} radius-2xs label-bold-md px-(--gap-xs) py-(--gap-4xs)`
      }
    >
      {children}
    </NavLink>
  );
}

export default AdminNavigationItem;
