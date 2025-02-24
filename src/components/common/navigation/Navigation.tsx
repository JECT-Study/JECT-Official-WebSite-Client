import { ReactNode } from 'react';

import Logo from '../logo/Logo';

interface NavigationProps {
  children: ReactNode;
}

function Navigation({ children }: NavigationProps) {
  return (
    <nav className='bg-surface-standard-dark gap-6xl flex h-[3.68rem] items-center pl-(--gap-5xl)'>
      <button className='focus-visible:shadow-focus-visible cursor-pointer'>
        <Logo height={24} fillColor='fill-object-hero-dark' />
      </button>
      <div className='gap-md flex whitespace-nowrap'>{children}</div>
    </nav>
  );
}

export default Navigation;
