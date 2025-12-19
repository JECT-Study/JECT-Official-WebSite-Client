import { Hero, Icon, Label } from "@ject/jds";
import { useEffect, useState } from "react";

import heroBackground from "@/assets/images/hero-background.png";

const ANIMATION_DELAY_MS = 800;
const ANIMATION_DURATION_MS = 500;
const ANIMATION_CYCLE_MS = ANIMATION_DELAY_MS + ANIMATION_DURATION_MS;

const ROTATION_ITEMS = [
  { icon: "frontend", text: "프론트엔드 개발을" },
  { icon: "backend", text: "백엔드 개발을" },
  { icon: "product", text: "프로덕트 관리를" },
  { icon: "design", text: "프로덕트 디자인을" },
] as const;

const RotatingText = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(true);

  // 마지막 아이템 다음 첫 번째 아이템을 복제하여 무한 루프 효과
  const extendedItems = [...ROTATION_ITEMS, ROTATION_ITEMS[0]];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, ANIMATION_CYCLE_MS);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // 복제된 첫 번째 아이템에 도달하면 transition 없이 실제 첫 번째로 리셋
    if (currentIndex === ROTATION_ITEMS.length) {
      const timeout = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }, ANIMATION_DURATION_MS);

      return () => clearTimeout(timeout);
    }

    // 리셋 후 다시 transition 활성화
    if (!isTransitioning) {
      const timeout = setTimeout(() => {
        setIsTransitioning(true);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, isTransitioning]);

  return (
    <span className="inline-flex h-[1.2em] overflow-hidden align-middle">
      <span
        className="flex flex-col ease-(--semantic-motion-bouncy)"
        style={{
          transform: `translateY(-${currentIndex * 100}%)`,
          transition: isTransitioning ? `transform ${ANIMATION_DURATION_MS}ms` : "none",
        }}
      >
        {extendedItems.map((item, index) => (
          <span key={index} className="flex h-[1.2em] items-center justify-center gap-2">
            <Icon name={item.icon} size="4xl" color="currentColor" />
            <span>{item.text}</span>
          </span>
        ))}
      </span>
    </span>
  );
};

const HeroSection = () => {
  return (
    <section className='relative flex h-dvh w-full items-center justify-center'>
      <img
        src={heroBackground}
        alt='젝트 팀원들이 함께 모여 회의하는 모습'
        className='absolute inset-0 z-0 h-full w-full object-cover opacity-[0.76]'
      />

      <div
        className='absolute inset-0 z-2'
        style={{
          background: "linear-gradient(180deg, transparent 0%, transparent 50%, var(--semantic-surface-static-inverse-standard) 100%)",
        }}
      />

      <div className='relative z-10 flex h-full flex-col items-center justify-center'>
        <div
          style={{
            background:
              "radial-gradient(33.77% 43.9% at 50% 50%, #191B2480 0%, #191B2400 100%)",
          }}
        >
          <Hero size='xs' textAlign='center' color='white'>
            <span className="flex flex-col items-center">
              <span>젝트에서</span>
              <RotatingText />
              <span>경험해보세요.</span>
            </span>
          </Hero>
        </div>

        <div className='absolute bottom-10 flex flex-col items-center gap-2'>
          <Label as='span' size='md' weight='bold' color='white'>
            아래로 스크롤해주세요
          </Label>
          <Icon name='arrow-down-wide-line' size='md' color='white' />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
