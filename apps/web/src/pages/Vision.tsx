import { Divider } from "@ject/jds";

import GoalSection from "@/components/vision/sections/GoalSection";
import GrowthStorySection from "@/components/vision/sections/GrowthStorySection";
import MemberSection from "@/components/vision/sections/MemberSection";
import ProjectStartSection from "@/components/vision/sections/ProjectStartSection";
import VisionHeroSection from "@/components/vision/sections/VisionHeroSection";

const Vision = () => {
  return (
    <div className='flex flex-col bg-(--semantic-surface-standard) mt-(--semantic-spacing-64)'>
      <div className='px-(--semantic-margin-lg) py-(--semantic-margin-2xl)'>
        <VisionHeroSection />
        <div className='flex flex-col items-center gap-(--semantic-spacing-48) pt-(--semantic-margin-xl) pb-(--semantic-margin-3xl)'>
          <ProjectStartSection />
          <Divider className='max-w-[922px]' />
          <GoalSection />
          <Divider className='max-w-[922px]' />
          <MemberSection />
        </div>
      </div>
      <GrowthStorySection />
    </div>
  );
};

export default Vision;
