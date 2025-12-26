import { Title } from "@ject/jds";

const GrowthStorySection = () => {
  return (
    <section data-theme='dark' className='flex justify-center bg-(--semantic-surface-shallower) px-(--semantic-margin-lg) pt-(--semantic-margin-2xl) pb-(--semantic-margin-5xl)'>
      <div className='w-full max-w-[922px] py-(--semantic-spacing-80)'>
        <div className='flex flex-col items-center gap-(--semantic-spacing-24) text-center'>
          <Title size='xs' textAlign='center'>
            지금까지와 앞으로의&nbsp;<span className='text-(--semantic-accent-normal)'>젝트</span>
          </Title>

          <Title size='md' textAlign='left'>
            젝트는 약 1년 6개월만에 11배 성장을 이뤄냈어요.
          </Title>

          <div className='flex flex-col gap-(--semantic-spacing-8) font-(family-name:--primitive-typeface-body) font-(--primitive-font-weight-body-bold) text-(length:--primitive-font-size-body-lg) leading-(--primitive-font-line-height-body-lg) tracking-(--primitive-font-letter-spacing-body-lg) text-center text-(--semantic-object-bold)'>
            <p>
              우리는 구성원 9명의 소규모 그룹에서 시작해 누적 구성원 100명 이상을 달성했습니다.
            </p>
            <p>
              더 많은 사람들과 경험을 나누고, 함께 몰입하고, 성장하기 위해 이 성장세를 유지하고자 해요.
            </p>
            <p>
              우리는 100개의 팀 프로젝트 완성을 다음 목표로 설정했으며,
            </p>
            <p>
              정기 밋업과 해커톤을 포함해 지속적인 네트워킹을 이어갈 계획입니다.
            </p>
          </div>

          <Title size='sm' textAlign='left'>
            젝트의 다음 이야기를 함께 응원해주세요!
          </Title>
        </div>
      </div>
    </section>
  );
};

export default GrowthStorySection;
