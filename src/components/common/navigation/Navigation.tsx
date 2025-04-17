import { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import Logo from '../logo/Logo';

interface NavigationProps {
  children: ReactNode;
}

function Navigation({ children }: NavigationProps) {
  return (
    <header className='border-border-assistive-dark bg-surface-standard-dark gap-6xl fixed z-49 flex h-[3.68rem] w-dvw items-center border-b pl-(--gap-5xl)'>
      <Link
        to='/'
        className='focus-visible:shadow-focus-visible radius-4xs cursor-pointer p-(--gap-5xs) outline-none'
      >
        <Logo height={24} fillColor='fill-object-hero-dark' />
      </Link>
      <nav className='gap-md flex whitespace-nowrap'>{children}</nav>
    </header>
  );
}

export default Navigation;
