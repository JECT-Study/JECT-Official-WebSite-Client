import AnimatedSection from '@/components/main/animatedSection/AnimatedSection.tsx';

const sectionClassName =
  'flex h-[60.3125rem] py-(--gap-7xl) px-(--gap-4xl) flex-col justify-center items-center gap0-7xl w-full snap-start';

const Main = () => {
  return (
    <div className='scroll-snap-y scroll-snap-mandatory h-screen overflow-y-scroll'>
      <section className={sectionClassName}>
        <AnimatedSection />
      </section>
      <section className={sectionClassName}>Section 2 content</section>
      <section className={sectionClassName}>Section 3 content</section>
      <section className={sectionClassName}>Section 4 content</section>
      <section className={sectionClassName}>Section 5 content</section>
    </div>
  );
};

export default Main;
