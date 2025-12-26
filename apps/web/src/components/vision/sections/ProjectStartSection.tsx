import { Title } from "@ject/jds";

const ProjectStartSection = () => {
  return (
    <section className='flex w-full flex-col items-center'>
      <div className='flex w-full max-w-[922px] flex-col items-start gap-(--semantic-spacing-16)'>
        <Title size='xs' textAlign='left'>
          프로<span className='text-(--semantic-accent-normal)'>젝트</span>&nbsp;시작
        </Title>

        <Title size='md' textAlign='left' color='var(--semantic-object-boldest)'>
          젝트는 개발자들의 소규모 사이드 프로젝트 모임으로 시작했습니다.
        </Title>

        <div className='flex flex-col gap-(--semantic-spacing-8) body-lg font-(--primitive-font-weight-body-bold) text-(--semantic-object-normal)'>
          <p className='leading-narrow'>
            프로젝트를 진행하면서, 개발자뿐만 아니라 여러 다양한 포지션들과의 협업을 경험하는 것이 더
            입체적으로 성장할 수 있다고 판단했어요.
          </p>
          <p className='leading-narrow'>
            뒤이어 IT 관련 다양한 포지션들을 구성원으로 영입하며 동아리 규모를 확대하고 있습니다.
          </p>
          <p className='leading-narrow'>
            지금에 이르러 젝트는 구성원들이 팀 프로젝트 활동과 학습을 통해 함께 성장하는 커뮤니티 허브가
            되었습니다.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProjectStartSection;
