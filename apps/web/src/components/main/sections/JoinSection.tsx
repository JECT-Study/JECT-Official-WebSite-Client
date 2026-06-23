import { BlockButton, Hero, Image, Label, Title } from "@jects/jds";
import { useNavigate } from "react-router-dom";

import joinTeamMeetingImage from "@/assets/images/join-team-meeting.png";
import SwypLogo from "@/assets/svg/swypLogo.svg?react";
import { PATH } from "@/constants/path";
import { trackApplyStart } from "@/utils/analytics";

const JoinSection = () => {
  const navigate = useNavigate();

  const handleApplyClick = () => {
    trackApplyStart("home_join_section");
    void navigate(PATH.applyList as string);
  };

  return (
    <section className='flex flex-col items-center bg-(--semantic-surface-static-inverse-standard) px-(--semantic-margin-lg) py-(--semantic-margin-5xl)'>
      <div className='tablet:flex-row flex w-full max-w-[922px] flex-col items-start gap-(--semantic-spacing-48) pt-(--semantic-margin-xl) pb-(--semantic-margin-3xl)'>
        <div className='flex flex-col gap-(--semantic-spacing-48)'>
          <div className='flex flex-col gap-(--semantic-spacing-16) whitespace-pre-line'>
            <Hero size='xs' textAlign='left' color='var(--semantic-system-white)'>
              {"젝트의 구성원으로\n함께해주세요"}
            </Hero>
            <Label
              as='p'
              className='text-object-static-inverse-normal-dark!'
              size='lg'
              textAlign='left'
              weight='bold'
            >
              모든 구성원들의 몰입과 성장을 위해.
            </Label>
          </div>
          <BlockButton.Basic
            size='lg'
            hierarchy='accent'
            variant='solid'
            suffixIcon='arrow-right-line'
            onClick={handleApplyClick}
          >
            지원하러 가기
          </BlockButton.Basic>
        </div>
        <Image
          src={joinTeamMeetingImage}
          alt='젝트 구성원들'
          ratio='3:4'
          orientation='landscape'
          isReadonly
          badgeVisible={false}
          className='flex-1 overflow-hidden [&_img]:scale-120'
        />
      </div>
      <div className='tablet:justify-between tablet:flex-row tablet:items-center mb-(--semantic-spacing-80) flex w-full max-w-[922px] flex-col gap-(--semantic-spacing-32) pt-(--semantic-spacing-32) pb-(--semantic-spacing-12)'>
        <div className='flex flex-col gap-(--semantic-spacing-16)'>
          <Title size='md' textAlign='left' color='var(--semantic-system-white)'>
            젝트와 함께하는 파트너
          </Title>
          <Label
            as='p'
            className='text-object-static-inverse-normal-dark!'
            size='lg'
            textAlign='left'
            weight='bold'
          >
            구성원들의 몰입과 성장을 지원하고 있어요.
          </Label>
        </div>
        <a
          href='https://swyp.im/'
          target='_blank'
          rel='noopener noreferrer'
          aria-label='스위프 웹사이트 (새 창 열림)'
          className='border-border-trans-alternative-dark bg-surface-deep-dark tablet:w-70 tablet:h-[118px] flex h-[110px] w-full items-center justify-center rounded-(--semantic-radius-6) border'
        >
          <SwypLogo aria-hidden />
        </a>
      </div>
    </section>
  );
};

export default JoinSection;
