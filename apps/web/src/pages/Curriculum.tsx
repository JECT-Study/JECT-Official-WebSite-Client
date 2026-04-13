import { Hero, Title } from "@jects/jds";

import CurriculumTabSection from "@/components/curriculum/sections/CurriculumTabSection";
import PageModule from "@/components/layout/PageModule";

const Curriculum = () => {
  return (
    <PageModule>
      <div className='flex flex-col items-start gap-(--semantic-spacing-16) pt-(--semantic-margin-xl) pb-(--semantic-margin-3xl)'>
        <Hero size='xs' textAlign='left'>
          활동 커리큘럼
        </Hero>
        <Title size='xs' textAlign='left'>
          젝트의 구성원이 참여하는 커리큘럼을 소개합니다.
        </Title>
      </div>
      <CurriculumTabSection />
    </PageModule>
  );
};

export default Curriculum;
