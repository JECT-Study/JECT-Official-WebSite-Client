import CalloutNumerical from '@/components/common/callout/CalloutNumerical.tsx';
import Title from '@/components/common/title/Title.tsx';
import AnimatedSection from '@/components/main/animatedSection/AnimatedSection.tsx';

const sectionClassName =
  'flex h-[60.3125rem] py-(--gap-7xl) px-(--gap-4xl) flex-col justify-center items-center gap-7xl w-full';

const Main = () => {
  return (
    <div className='flex flex-col'>
      <section className={sectionClassName}>
        <AnimatedSection />
      </section>
      <section className={sectionClassName}>
        <div className='gap-7xl flex w-full max-w-[45rem] flex-col items-center'>
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
          <div className='gap-4xl flex w-full content-center items-start [&>*]:flex-shrink-0 [&>*]:flex-grow [&>*]:basis-0'>
            <CalloutNumerical title='60' labelText='참여 동아리원 수' />
            <CalloutNumerical title='6+' labelText='개발 완료 프로젝트' />
            <CalloutNumerical title='8+' labelText='진행한 미니 스터디' />
          </div>
        </div>
      </section>
      <section className={sectionClassName}>Section 3 content</section>
      <section className={sectionClassName}>Section 4 content</section>
      <section className={sectionClassName}>Section 5 content</section>
    </div>
  );
};

export default Main;
