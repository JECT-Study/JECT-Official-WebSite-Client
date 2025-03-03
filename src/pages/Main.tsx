const sectionClassName =
  'flex h-[60.3125rem] py-(--gap-7xl) px-(--gap-4xl) flex-col justify-center items-center gap0-7xl w-full snap-start';

const Main = () => {
  return (
    <div className='scroll-snap-y scroll-snap-mandatory h-screen overflow-y-scroll'>
      <section className={sectionClassName}>
        <div className='py-( gap-7xl flex shrink-0 grow basis-0 flex-col items-center justify-center self-stretch'>
          <div className='gap-2xl flex flex-col items-center justify-center self-stretch'>
            <div className='gap-md display-04 text-object-hero-dark flex items-center justify-center self-stretch text-center'></div>
            <div className='gap-md flex items-center justify-center self-stretch'></div>
            <div className='gap-md display-04 text-object-hero-dark flex items-center justify-center self-stretch text-center'></div>
          </div>
        </div>
      </section>
      <section className={sectionClassName}>Section 2 content</section>
      <section className={sectionClassName}>Section 3 content</section>
      <section className={sectionClassName}>Section 4 content</section>
      <section className={sectionClassName}>Section 5 content</section>
    </div>
  );
};

export default Main;
