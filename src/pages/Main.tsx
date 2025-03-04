import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect } from 'react';

import CalloutNumerical from '@/components/common/callout/CalloutNumerical';
import Hero from '@/components/common/callout/Hero';
import HeroIndex from '@/components/common/callout/HeroIndex';
import { Tab, TabHeader, TabItem, TabPanel } from '@/components/common/tab/Tab';
import Title from '@/components/common/title/Title';
import AnimatedSection from '@/components/main/animatedSection/AnimatedSection';
import RoleHero from '@/components/main/role/RoleHero';
import { timelineData } from '@/constants/mainPageData.tsx';

const sectionClassName =
  'flex h-[60.3125rem] py-(--gap-7xl) px-(--gap-4xl) flex-col justify-center items-center gap-7xl w-full';

const wrapperClassName = 'gap-7xl flex w-full max-w-[45rem] flex-col items-center';

const Main = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    const context = gsap.context(() => {
      const sections = document.querySelectorAll('section');
      sections.forEach((section, index) => {
        if (index === sections.length - 1) return;

        let isTriggered = false;
        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          onUpdate: self => {
            if (self.progress >= 0.6 && self.direction > 0 && !isTriggered) {
              isTriggered = true;
              gsap.to(window, {
                scrollTo: section.nextElementSibling,
                duration: 1,
                ease: 'power2.inOut',
              });
            }
          },
        });
      });
    });

    return () => context.revert();
  }, []);

  return (
    <div className='scroll flex flex-col'>
      <section className='flex h-[60.3125rem] w-full flex-col items-center justify-center py-(--gap-7xl)'>
        <AnimatedSection />
      </section>
      <section className={sectionClassName}>
        <div className={wrapperClassName}>
          <div className='gap-3xl flex flex-col items-center self-stretch'>
            <Title hierarchy='stronger'>몰입하며 진행하는 즐거운 프로젝트.</Title>
            <div className='gap-2xs flex flex-col items-center'>
              <Title hierarchy='weak'>젝트(JECT)는 IT 사이드 프로젝트 동아리에요.</Title>
              <Title hierarchy='weak'>
                다양한 포지션의 멤버들과 협업하는 즐거운 프로젝트를 지향하고 있어요.
              </Title>
              <Title hierarchy='weak'>
                프로젝트에 참여하고, 몰입하며 함께 서비스를 만드는 여정에 참여하세요!
              </Title>
            </div>
          </div>
          <div className='gap-4xl flex w-full content-center items-start'>
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
            {timelineData.map(({ id, title, badgeText, description }) => (
              <HeroIndex key={id} index={id} title={title} badgeText={badgeText}>
                {description}
              </HeroIndex>
            ))}
          </div>
        </div>
      </section>
      <section className={sectionClassName}>
        <div className={wrapperClassName}>
          <Title hierarchy='stronger'>참여하는 포지션</Title>
          <div className='flex flex-col items-start'>
            <Tab>
              <div className='gap-4xl flex flex-col'>
                <TabHeader>
                  <TabItem id={0} label='프론트엔드 개발자' />
                  <TabItem id={1} label='백엔드 개발자' />
                  <TabItem id={2} label='프로젝트 매니저' />
                  <TabItem id={3} label='프로덕트 디자이너' />
                </TabHeader>
                <TabPanel id={0}>
                  <RoleHero
                    title='프론트엔드 개발자'
                    variant='fe'
                    labels={['HTML/CSS/JS', 'TS', 'React.js', '상태 관리', '성능 최적화']}
                  >
                    긍정적인 사용자 경험을 위해 서비스에 적합한 기술을 활용하고 성능을 최적화해요.
                    디자이너, 백엔드와 협업을 통해 데이터 흐름을 최적화해 효율적인 구조로 코드를
                    작성해요.
                  </RoleHero>
                </TabPanel>
                <TabPanel id={1}>
                  <RoleHero
                    title='백엔드 개발자'
                    variant='be'
                    labels={['HTML/CSS/JS', 'TS', 'React.js', '상태 관리', '성능 최적화']}
                  >
                    긍정적인 사용자 경험을 위해 서비스에 적합한 기술을 활용하고 성능을 최적화해요.
                    디자이너, 백엔드와 협업을 통해 데이터 흐름을 최적화해 효율적인 구조로 코드를
                    작성해요.
                  </RoleHero>
                </TabPanel>
                <TabPanel id={2}>
                  <RoleHero
                    title='프로젝트 매니저'
                    variant='pm'
                    labels={['HTML/CSS/JS', 'TS', 'React.js', '상태 관리', '성능 최적화']}
                  >
                    긍정적인 사용자 경험을 위해 서비스에 적합한 기술을 활용하고 성능을 최적화해요.
                    디자이너, 백엔드와 협업을 통해 데이터 흐름을 최적화해 효율적인 구조로 코드를
                    작성해요.
                  </RoleHero>
                </TabPanel>
                <TabPanel id={3}>
                  <RoleHero
                    title='프로덕트 디자이너'
                    variant='pd'
                    labels={['HTML/CSS/JS', 'TS', 'React.js', '상태 관리', '성능 최적화']}
                  >
                    긍정적인 사용자 경험을 위해 서비스에 적합한 기술을 활용하고 성능을 최적화해요.
                    디자이너, 백엔드와 협업을 통해 데이터 흐름을 최적화해 효율적인 구조로 코드를
                    작성해요.
                  </RoleHero>
                </TabPanel>
              </div>
            </Tab>
          </div>
        </div>
      </section>
      <section className={sectionClassName}>
        <div className={wrapperClassName}>
          <Title hierarchy='stronger'>젝트가 지향하는 것</Title>
          <div className='gap-4xl flex flex-wrap content-start items-start'>
            <Hero title='적극적인 참여'>
              프로젝트에 적극적인 태도와 열정으로 참여
              <br />
              하는 것을 지향해요.
            </Hero>
            <Hero title='몰입하기'>
              문제 해결 과정에서 몰입을 통해 재미를 찾<br />는 것을 추구합니다.
            </Hero>
            <Hero title='지속가능한 개발'>
              서비스 출시 완료에서 끝나지 않고, 운영까
              <br />지 진행해 보세요.
            </Hero>
            <Hero title='팀워크 중시'>
              함께하는 사람들과 긍정적인 협업 경험을 위<br />해 원활한 소통이 필요해요.
            </Hero>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Main;
