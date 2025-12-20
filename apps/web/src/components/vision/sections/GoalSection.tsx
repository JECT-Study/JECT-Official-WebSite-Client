import { Title } from "@ject/jds";

const GoalSection = () => {
  return (
    <section className='flex w-full flex-col items-center'>
      <div className='flex w-full max-w-[922px] flex-col items-start gap-(--semantic-spacing-16)'>
        <Title size='xs' textAlign='left'>
          <span className='text-(--semantic-accent-normal)'>젝트</span>의 목표
        </Title>

        <Title size='md' textAlign='left' color='var(--semantic-object-boldest)'>
          우리는 IT 생태계의 선순환을 목표로 활동하고 있습니다.
        </Title>

        <div className='flex flex-col gap-(--semantic-spacing-8) body-lg font-(--primitive-font-weight-body-bold) text-(--semantic-object-normal)'>
          <p className='leading-narrow'>
            젝트는 협업 경험과 피드백을 통한 학습, 인적 네트워크를 구성원들에게 제공합니다.
          </p>
          <p className='leading-narrow'>
            이를 통해 성장한 구성원은 곧 IT 생태계의 인적 자원으로서 전문성을 발휘하며 활동을 이어나가고,
          </p>
          <p className='leading-narrow'>
            구성원들이 자연스레 젝트가 추구하는 가치를 전파하고, 다른 이들과 경험을 나누는 선순환이
            지속되게 하는 것이 목표입니다.
          </p>
        </div>
      </div>
    </section>
  );
};

export default GoalSection;
