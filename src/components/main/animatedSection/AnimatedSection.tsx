import clsx from 'clsx';
import { useState, useEffect, useMemo } from 'react';

import RoleBadge from '@/components/main/role/RoleBadge';
import { RoleVariant } from '@/types/role';

const initialBackground =
  'bg-[radial-gradient(75.39%_50%_at_50%_50%,var(--tw-gradient-stops))] from-accent-normal-dark to-surface-standard-dark';

const gradientMap: Record<RoleVariant, string> = {
  normal:
    'bg-[radial-gradient(75.39%_50%_at_50%_50%,var(--tw-gradient-stops))] from-accent-normal-dark to-surface-standard-dark',
  fe: 'bg-[radial-gradient(75.39%_50%_at_50%_50%,var(--tw-gradient-stops))] from-role-fe-normal-dark to-surface-standard-dark',
  be: 'bg-[radial-gradient(75.39%_50%_at_50%_50%,var(--tw-gradient-stops))] from-role-be-normal-dark to-surface-standard-dark',
  do: 'bg-[radial-gradient(75.39%_50%_at_50%_50%,var(--tw-gradient-stops))] from-role-do-normal-dark to-surface-standard-dark',
  pm: 'bg-[radial-gradient(75.39%_50%_at_50%_50%,var(--tw-gradient-stops))] from-role-pm-normal-dark to-surface-standard-dark',
  pd: 'bg-[radial-gradient(75.39%_50%_at_50%_50%,var(--tw-gradient-stops))] from-role-pd-normal-dark to-surface-standard-dark',
};

const AnimatedSection = () => {
  const topTextStates = useMemo(
    () => [
      '',
      'ㅈ',
      '제',
      '젝',
      '젝트',
      '젝튼',
      '젝트느',
      '젝트는 ',
      '젝트는 ㅈ',
      '젝트는 지',
      '젝트는 직',
      '젝트는 지그',
      '젝트는 지금',
    ],
    [],
  );

  const bottomTextStates = useMemo(
    () => ['', 'ㅁ', '모', '몾', '모지', '모집', '모집 ', '모집 ㅈ', '모집 주', '모집 중'],
    [],
  );

  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [isBadgeExpanded, setBadgeExpanded] = useState(false);
  const [roleVariant, setRoleVariant] = useState<RoleVariant>('fe');

  useEffect(() => {
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    const animate = async () => {
      // 상단 텍스트 애니메이션
      for (const state of topTextStates) {
        setTopText(state);
        await delay(150);
      }
      await delay(500);
      setRoleVariant('fe');
      setBadgeExpanded(true);
      await delay(200);
      await delay(800);
      setBadgeExpanded(false);
      await delay(300);

      for (const state of bottomTextStates) {
        setBottomText(state);
        await delay(150);
      }
      await delay(500);

      const variants: RoleVariant[] = ['fe', 'be', 'do', 'pm', 'pd'];
      while (true) {
        for (const variant of variants) {
          setRoleVariant(variant);
          setBadgeExpanded(true);
          await delay(200);
          await delay(800);
          setBadgeExpanded(false);
          await delay(300);
        }
      }
    };

    void animate();
  }, [topTextStates, bottomTextStates]);

  const badgeAnimationClasses = clsx(
    'transition-transform',
    isBadgeExpanded
      ? 'scale-100 duration-normal ease--motion-bounce)'
      : 'scale-0 duration-slow ease--motion-fluent)',
  );

  return (
    <div className='relative flex h-full w-full items-center justify-center'>
      <div
        className={`absolute inset-0 opacity-[0.35] transition-colors duration-500 ease-in-out ${gradientMap[roleVariant]}`}
      />
      <div className="pointer-events-none absolute inset-0 bg-[url('/grain.png')] bg-repeat" />
      <div className='relative z-10 flex h-full w-full'>
        <div className='flex flex-1 flex-col items-center justify-center'>
          {!isBadgeExpanded && bottomText === '' ? (
            <div className='gap-md display-04 text-object-hero-dark text-center'>{topText}</div>
          ) : (
            <div className='gap-2xl flex flex-col items-center justify-center'>
              <div className='gap-md display-04 text-object-hero-dark text-center'>{topText}</div>
              <div className={badgeAnimationClasses}>
                <RoleBadge variant={roleVariant} />
              </div>
              <div className='gap-md display-04 text-object-hero-dark text-center'>
                {bottomText}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimatedSection;
