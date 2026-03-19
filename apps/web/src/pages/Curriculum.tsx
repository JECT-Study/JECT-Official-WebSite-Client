import { Hero, Title } from "@jects/jds";

import CurriculumTabSection from "@/components/curriculum/sections/CurriculumTabSection";

const Curriculum = () => {
  return (
    //Todo: 항상 이렇게 Navbar만큼의 레이아웃을 별도로 계산해서 줄 수는 없음
    <div className='flex flex-col items-center bg-(--semantic-surface-standard) pt-[calc(var(--semantic-spacing-64)+var(--semantic-margin-2xl))] pb-(--semantic-margin-2xl)'>
      <div className='tablet:max-w-[720px] tablet:px-0 desktop:max-w-[978px] desktop:px-(--semantic-margin-lg) flex w-full max-w-[978px] flex-col items-center px-(--semantic-margin-lg) pb-(--semantic-margin-3xl)'>
        <div className='flex flex-col items-start gap-(--semantic-spacing-16) self-stretch pt-(--semantic-margin-xl) pb-(--semantic-margin-3xl)'>
          <Hero size='xs' textAlign='left' color='var(--semantic-object-boldest)'>
            활동 커리큘럼
          </Hero>
          <Title size='xs' textAlign='left' color='var(--semantic-object-bold)'>
            젝트의 구성원이 참여하는 커리큘럼을 소개합니다.
          </Title>
        </div>
        <CurriculumTabSection />
      </div>
    </div>
  );
};

export default Curriculum;
