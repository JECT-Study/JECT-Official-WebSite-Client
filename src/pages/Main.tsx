import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

import CalloutNumerical from '@/components/common/callout/CalloutNumerical';
import Hero from '@/components/common/callout/Hero';
import HeroIndex from '@/components/common/callout/HeroIndex';
import { Tab, TabHeader, TabItem, TabPanel } from '@/components/common/tab/Tab';
import Title from '@/components/common/title/Title';
import AnimatedSection from '@/components/main/animatedSection/AnimatedSection';
import RoleHero from '@/components/main/role/RoleHero';
import { corePrincipleData, positionData, timelineData } from '@/constants/mainPageData';

const sectionClassName =
  'flex h-[100dvh] py-(--gap-7xl) px-(--gap-4xl) flex-col justify-center items-center gap-7xl w-full';

const wrapperClassName = 'gap-7xl flex w-full max-w-[45rem] flex-col items-center';

const Main = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isScrolling = false;

    const disableScroll = () => {
      document.body.style.overflow = 'hidden';
    };

    const enableScroll = () => {
      document.body.style.overflow = '';
    };

    const context = gsap.context(() => {
      const sections = containerRef.current?.querySelectorAll('section');
      if (!sections) return;

      sections.forEach((section, index) => {
        if (index < sections.length - 1) {
          ScrollTrigger.create({
            trigger: section,
            start: 'center top',
            end: 'bottom top',
            onEnter: () => {
              if (!isScrolling && section.nextElementSibling) {
                isScrolling = true;
                disableScroll();
                gsap.to(window, {
                  scrollTo: section.nextElementSibling,
                  duration: 1,
                  ease: 'power2.inOut',
                  onComplete: () => {
                    setTimeout(() => {
                      isScrolling = false;
                      enableScroll();
                    }, 300);
                  },
                });
              }
            },
          });
        }
      });

      sections.forEach((section, index) => {
        if (index > 0) {
          ScrollTrigger.create({
            trigger: section,
            start: 'center bottom',
            end: 'top bottom',
            onEnterBack: () => {
              if (!isScrolling && section.previousElementSibling) {
                isScrolling = true;
                disableScroll();
                gsap.to(window, {
                  scrollTo: section.previousElementSibling,
                  duration: 1,
                  ease: 'power2.inOut',
                  onComplete: () => {
                    setTimeout(() => {
                      isScrolling = false;
                      enableScroll();
                    }, 300);
                  },
                });
              }
            },
          });
        }
      });
    }, containerRef);

    return () => {
      context.revert();
      enableScroll();
    };
  }, []);

  return (
    <div ref={containerRef} className='scroll flex flex-col'>
      <section className='flex h-[100dvh] w-full flex-col items-center justify-center py-(--gap-7xl)'>
        <AnimatedSection />
      </section>
      <section className={sectionClassName}>
        <div className={wrapperClassName}>
          <div className='gap-3xl flex flex-col items-center self-stretch'>
            <Title hierarchy='stronger'>몰입하며 진행하는 즐거운 프로젝트.</Title>
            <div className='gap-2xs flex flex-col items-center'>
              <Title hierarchy='weak'>
                젝트(JECT)는 <span className='text-accent-hero-dark'>IT 사이드 프로젝트</span>{' '}
                동아리에요.
              </Title>
              <Title hierarchy='weak'>
                다양한 포지션의 멤버들과 협업하는 즐거운 프로젝트를 지향하고 있어요.
              </Title>
              <Title hierarchy='weak'>
                프로젝트에 참여하고, 몰입하며 함께 서비스를 만드는 여정에 참여하세요!
              </Title>
            </div>
          </div>
          <div className='gap-4xl flex w-full'>
            <CalloutNumerical title='60' labelText='참여 동아리원 수' />
            <CalloutNumerical title='6+' labelText='개발 완료 프로젝트' />
            <CalloutNumerical title='8+' labelText='진행한 미니 스터디' />
          </div>
        </div>
      </section>
      <section className={sectionClassName}>
        <div className={wrapperClassName}>
          <Title hierarchy='stronger'>젝트 활동 타임라인</Title>
          <div className='gap-4xl flex w-full flex-col items-start'>
            {timelineData.map(
              ({ id, title, badgeText, description, badgeBgColor, badgeTextColor }) => (
                <HeroIndex
                  key={id}
                  index={id}
                  title={title}
                  badgeText={badgeText}
                  badgeBgColor={badgeBgColor}
                  badgeTextColor={badgeTextColor}
                >
                  {description}
                </HeroIndex>
              ),
            )}
          </div>
        </div>
      </section>
      <section className={sectionClassName}>
        <div className={wrapperClassName}>
          <Title hierarchy='stronger'>참여하는 포지션</Title>
          <div className='flex w-full flex-col items-start'>
            <Tab>
              <div className='gap-4xl flex w-[45rem] flex-col'>
                <TabHeader>
                  {positionData.map(({ id, title }) => (
                    <TabItem key={id} id={id} label={title} />
                  ))}
                </TabHeader>
                {positionData.map(({ id, title, variant, labels, description }) => (
                  <TabPanel key={id} id={id}>
                    <RoleHero title={title} variant={variant} labels={labels}>
                      {description}
                    </RoleHero>
                  </TabPanel>
                ))}
              </div>
            </Tab>
          </div>
        </div>
      </section>
      <section className={sectionClassName}>
        <div className={wrapperClassName}>
          <Title hierarchy='stronger'>젝트가 지향하는 것</Title>
          <div className='gap-4xl grid grid-cols-2'>
            {corePrincipleData.map(({ id, title, description }) => (
              <Hero key={id} title={title}>
                {description}
              </Hero>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Main;
