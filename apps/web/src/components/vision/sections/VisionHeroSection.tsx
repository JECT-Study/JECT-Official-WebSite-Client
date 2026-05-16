import { Image } from "@jects/jds";

import visionBannerImage from "@/assets/images/vision-banner.png";
import { Hero, Title } from "@/components/common/typography";

const VisionHeroSection = () => {
  return (
    <section className='flex w-full flex-col items-center pt-(--semantic-margin-xl) pb-(--semantic-margin-3xl)'>
      <div className='flex w-full max-w-[922px] flex-col items-start gap-(--semantic-spacing-24)'>
        <Title size='xs' textAlign='left' className='text-(--semantic-object-neutral)'>
          IT 생태계의 선순환을 목표로 활동하는
        </Title>
        <Hero size='xs' textAlign='left'>
          대한민국의 IT 동아리&nbsp;
          <span className='text-(--semantic-accent-normal)'>젝트</span>
        </Hero>
        <Image
          src={visionBannerImage}
          alt='JECT IT 동아리 젝트 배너'
          ratio='9:21'
          orientation='landscape'
          isReadonly
          badgeVisible={false}
        />
      </div>
    </section>
  );
};

export default VisionHeroSection;
