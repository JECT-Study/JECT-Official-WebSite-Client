import { BlockButton, Hero, Image, Label } from "@ject/jds";

import joinTeamMeetingImage from "@/assets/images/join-team-meeting.png";

const JoinSection = () => {
  return (
    <section className='flex justify-center bg-(--semantic-surface-static-inverse-standard) px-(--semantic-margin-lg) py-(--semantic-margin-5xl)'>
      <div className='flex w-full max-w-[922px] items-start gap-(--semantic-spacing-48) pb-(--semantic-spacing-80)'>
        <div className='flex flex-col items-start gap-(--semantic-spacing-48)'>
          <div className='flex flex-col gap-(--semantic-spacing-16)'>
            <div className='whitespace-pre-line'>
              <Hero size='xs' textAlign='left' color='white'>
                {"젝트의 구성원으로\n함께해주세요"}
              </Hero>
            </div>  
            <Label size='lg' textAlign='left' weight='bold' color='var(--semantic-object-static-inverse-normal)'>
              모든 구성원들의 몰입과 성장을 위해.
            </Label>
          </div>
          <BlockButton.Basic size='lg' hierarchy='accent' variant='solid' suffixIcon='arrow-right-line'>
            지원하러 가기
          </BlockButton.Basic>
        </div>

        <div className='flex-1'>
          <Image src={joinTeamMeetingImage} alt='젝트 구성원들' ratio='3:4' orientation='landscape' isReadonly={false} badgeVisible={false} className='overflow-hidden [&_img]:scale-120' />
        </div>
      </div>
    </section>
  );
};

export default JoinSection;
