import { gsap } from 'gsap';
import { useEffect, useMemo, useRef, useState } from 'react';

import RoleBadge from '@/components/main/role/RoleBadge';
import { RoleVariant } from '@/types/ui/role';

const initialBackground =
  'bg-[radial-gradient(75.39%_50%_at_50%_50%,var(--tw-gradient-stops))] from-accent-normal-dark to-surface-standard-dark';

const gradientMap: Record<RoleVariant, string> = {
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

  const [roleVariant, setRoleVariant] = useState<RoleVariant>('fe');
  const [isInitial, setIsInitial] = useState(true);

  const topTextRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const bottomTextRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    const topState = { index: 0 };
    tl.to(topState, {
      duration: (topTextStates.length - 1) * 0.15,
      index: topTextStates.length - 1,
      ease: `steps(${topTextStates.length - 1})`,
      onUpdate: () => {
        const current = Math.floor(topState.index);
        if (topTextRef.current) {
          topTextRef.current.textContent = topTextStates[current];
        }
      },
    });
    tl.to({}, { duration: 0.5 });

    tl.call(() => {
      if (badgeRef.current) {
        badgeRef.current.classList.remove('hidden');
        gsap.set(badgeRef.current, { opacity: 0, y: 20, scale: 0 });
      }
    });

    tl.call(() => setIsInitial(false));
    tl.to({}, { duration: 0.2 });

    tl.call(() => {
      if (badgeRef.current && contentRef.current) {
        const badgeHeight = badgeRef.current.offsetHeight || 98;
        gsap.to(contentRef.current, {
          y: -badgeHeight / 2,
          duration: 0.4,
          ease: 'power1.out',
        });
      }
    });

    tl.to(badgeRef.current, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.4,
      ease: 'power1.out',
    });

    tl.to({}, { duration: 0.1 });
    tl.call(() => {
      if (bottomTextRef.current) {
        bottomTextRef.current.classList.remove('hidden');
        gsap.set(bottomTextRef.current, { opacity: 0, y: 20, scale: 0 });
      }
    });

    tl.call(() => {
      if (bottomTextRef.current && contentRef.current) {
        const targetHeight = bottomTextRef.current.scrollHeight || 94;
        gsap.to(contentRef.current, {
          y: -targetHeight / 2,
          duration: 0.4,
          ease: 'power1.out',
        });
        gsap.to(bottomTextRef.current, {
          height: targetHeight,
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: 'power1.out',
        });
      }
    });

    const bottomState = { index: 0 };
    tl.to(bottomState, {
      duration: (bottomTextStates.length - 1) * 0.15,
      index: bottomTextStates.length - 1,
      ease: `steps(${bottomTextStates.length - 1})`,
      onUpdate: () => {
        const current = Math.floor(bottomState.index);
        if (bottomTextRef.current) {
          bottomTextRef.current.textContent = bottomTextStates[current];
        }
      },
    });
    tl.to({}, { duration: 0.5 });

    tl.to(badgeRef.current, { scale: 0, duration: 0.3, ease: 'power1.in' });

    tl.call(() => {
      const variants: RoleVariant[] = ['fe', 'be', 'pm', 'pd'];
      let variantIndex = 1;
      gsap
        .timeline({ repeat: -1 })
        .call(() => {
          setRoleVariant(variants[variantIndex]);
          variantIndex = (variantIndex + 1) % variants.length;
        })
        .fromTo(badgeRef.current, { scale: 0 }, { scale: 1, duration: 0.2, ease: 'back.out(1.7)' })
        .to(badgeRef.current, { scale: 1, duration: 0.8 })
        .to(badgeRef.current, { scale: 0, duration: 0.3, ease: 'power1.in' });
    });
  }, [topTextStates, bottomTextStates]);

  return (
    <div className='relative flex h-full w-full items-center justify-center'>
      <div
        className={`absolute inset-0 z-0 opacity-35 transition-colors duration-500 ease-in-out ${
          isInitial ? initialBackground : gradientMap[roleVariant]
        }`}
      />
      <div className="pointer-events-none absolute inset-0 z-0 bg-[url('/src/assets/images/grain.png')] bg-auto bg-center bg-repeat opacity-63 mix-blend-multiply" />
      <div
        ref={contentRef}
        className='gap-2xl relative z-10 flex h-full w-full flex-col items-center justify-center'
      >
        <div ref={topTextRef} className='gap-md display-04 text-object-hero-dark text-center' />
        <div ref={badgeRef} className='hidden'>
          <RoleBadge variant={roleVariant} />
        </div>
        <div
          ref={bottomTextRef}
          className='gap-md display-04 text-object-hero-dark hidden text-center'
        />
      </div>
    </div>
  );
};

export default AnimatedSection;
