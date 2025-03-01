import clsx from 'clsx';
import { ReactNode } from 'react';

import atom from '@/assets/images/atom.png';
import clipboard from '@/assets/images/clipboard.png';
import cursor from '@/assets/images/cursor.png';
import mobius from '@/assets/images/mobius.png';
import stack from '@/assets/images/stack.png';
import Badge from '@/components/common/badge/Badge';

type HeroVariant = 'fe' | 'be' | 'do' | 'pm' | 'pd';

const heroMap: Record<HeroVariant, { icon: string; style: string }> = {
  fe: {
    icon: atom,
    style: 'bg-gradient-to-r from-role-fe-normal-light to-role-fe-trans-neutral-dark',
  },
  be: {
    icon: stack,
    style: 'bg-gradient-to-r from-role-be-normal-dark to-role-be-trans-neutral-dark',
  },
  do: {
    icon: mobius,
    style: 'bg-gradient-to-r from-role-do-normal-dark to-role-do-trans-neutral-dark',
  },
  pm: {
    icon: clipboard,
    style: 'bg-gradient-to-r from-role-pm-normal-dark to-role-pm-trans-neutral-dark',
  },
  pd: {
    icon: cursor,
    style: 'bg-gradient-to-r from-role-pd-normal-dark to-role-pd-trans-neutral-dark',
  },
};

interface HeroProps {
  title: string;
  labels?: string[];
  children: ReactNode;
  variant: HeroVariant;
}

export const RoleHero = ({ title, labels = [], children, variant }: HeroProps) => {
  const displayedLabels = labels.slice(0, 5);
  const { icon: heroIcon, style } = heroMap[variant];

  return (
    <div
      className={`${style} radius-sm gap-6xl flex items-center pt-(--gap-3xl) pr-(--gap-3xl) pb-(--gap-3xl) pl-(--gap-6xl)`}
    >
      <div className='gap-xl flex min-h-[12.1875rem] shrink-0 grow basis-0 flex-col items-start'>
        <div className='gap-sm self-strectch flex flex-col items-start'>
          <span className='text-object-hero-dark title-03'>{title}</span>
          <div className='gap-2xs flex max-h-[5rem] flex-wrap content-start items-start'>
            {displayedLabels.map((label, idx) => (
              <Badge
                key={idx}
                backgroundColor='bg-fill-assistive-dark'
                textColor='text-object-normal-dark'
              >
                {label}
              </Badge>
            ))}
          </div>
        </div>
        <span className='body-lg text-object-normal-dark'>{children}</span>
      </div>
      <img src={heroIcon} alt={`${variant} 아이콘`} className='h-24 w-24 object-contain' />
    </div>
  );
};

export default RoleHero;
