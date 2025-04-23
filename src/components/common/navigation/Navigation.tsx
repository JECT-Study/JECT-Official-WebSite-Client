import { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Logo from '../logo/Logo';

import { PATH } from '@/constants/path';
import { useDialogActions } from '@/stores/dialogStore';

interface NavigationProps {
  children: ReactNode;
}

function Navigation({ children }: NavigationProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { openDialog } = useDialogActions();

  const handleClick = () => {
    if (pathname === PATH.applyRegistration) {
      return openDialog({
        type: 'dirtyCheck',
        onPrimaryBtnClick: () => void navigate(PATH.main),
      });
    }

    void navigate(PATH.main);
  };

  return (
    <header className='border-border-assistive-dark bg-surface-standard-dark gap-6xl fixed z-49 flex h-[3.68rem] w-dvw items-center border-b pl-(--gap-5xl)'>
      <button
        aria-label='메인으로 이동'
        onClick={handleClick}
        className='focus-visible:shadow-focus-visible radius-4xs cursor-pointer p-(--gap-5xs) outline-none'
      >
        <Logo height={24} fillColor='fill-object-hero-dark' />
      </button>
      <nav className='gap-md flex whitespace-nowrap'>{children}</nav>
    </header>
  );
}

export default Navigation;
