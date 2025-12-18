import { Banner } from "@ject/jds";

import cycleVisionBannerImage from "@/assets/images/cycle-vision-banner.png";

const CycleSection = () => {
  return (
    <section>
      <Banner.Image
        src={cycleVisionBannerImage}
        alt="IT 생태계의 선순환을 목표로 하는 젝트"
        isReadonly
        title={"IT 생태계의\n선순환을 목표로 하는 젝트"}
        subtitle={"사적인 이윤을 추구하지 않고,\n발생한 수익은 운영과 구성원을 위한 인프라에 재투자합니다."}
      />
    </section>
  );
};

export default CycleSection;
