import { ReactNode } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

import Logo from '../common/logo/Logo';

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

function AdminLayout() {
  return (
    <div className='flex'>
      <header className='bg-surface-embossed-dark gap-4xl flex h-dvh w-[13.75rem] flex-col px-(--gap-xl) py-(--gap-4xl)'>
        <button>
          <Logo height={19.87} fillColor='fill-object-hero-dark' />
        </button>
        <nav className='gap-sm flex flex-col'>
          <AdminNavigationItem to='/admin/temp' disabled>
            프로젝트 관리
          </AdminNavigationItem>
          <AdminNavigationItem to='/admin/temp' disabled>
            프로젝트 상세 관리
          </AdminNavigationItem>
          <AdminNavigationItem to='/admin/temp' disabled>
            {' '}
            활동 관리
          </AdminNavigationItem>
          <AdminNavigationItem to='/admin/temp' disabled>
            미니 스터디 관리
          </AdminNavigationItem>
          <AdminNavigationItem to='/admin/temp' disabled>
            젝톡 관리
          </AdminNavigationItem>
          <AdminNavigationItem to='/admin/apply'>지원서 관리</AdminNavigationItem>
          <AdminNavigationItem to='/admin/temp' disabled>
            자주 묻는 질문 관리
          </AdminNavigationItem>
        </nav>
      </header>
      <Outlet />
    </div>
  );
}

export default AdminLayout;
