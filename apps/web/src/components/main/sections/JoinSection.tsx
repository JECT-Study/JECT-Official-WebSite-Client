import { BlockButton, Hero, Image, Label, Title } from "@jects/jds";
import { useNavigate } from "react-router-dom";

import joinSectionImage from "@/assets/images/join-section.webp";
import altLogo from "@/assets/images/sponsors/alt-logo.png";
import bdaiLogo from "@/assets/images/sponsors/bdai-logo.png";
import figmaLogo from "@/assets/images/sponsors/figma-logo.png";
import my4cutLogo from "@/assets/images/sponsors/my4cut-logo.png";
import swypLogo from "@/assets/images/sponsors/swyp-logo.png";
import { PATH } from "@/constants/path";
import { trackApplyStart } from "@/utils/analytics";

interface Sponsor {
  name: string;
  logo: string;
  href: string;
}

const SPONSORS: Sponsor[] = [
  { name: "Figma", logo: figmaLogo, href: "https://www.figma.com/ko-kr" },
  { name: "스위프", logo: swypLogo, href: "https://swyp.im" },
  { name: "BDAI", logo: bdaiLogo, href: "https://www.bdai.co.kr" },
  { name: "Alt", logo: altLogo, href: "https://www.altalt.io/ko" },
  { name: "나만의 네컷", logo: my4cutLogo, href: "https://my4cut-official.com" },
];

const SponsorCard = ({ name, logo, href }: Sponsor) => {
  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      aria-label={`${name} 웹사이트 (새 창 열림)`}
      className='@container flex aspect-12/5 w-full items-center justify-center rounded-(--semantic-radius-6) border border-border-trans-alternative-dark bg-surface-deep-dark not-supports-[container-type:inline-size]:h-36'
    >
      <img
        src={logo}
        alt=''
        className='max-h-1/2 w-1/2 max-w-40 object-contain supports-[container-type:inline-size]:max-h-[calc(100cqw/4.8)]'
      />
    </a>
  );
};

const JoinSection = () => {
  const navigate = useNavigate();

  const handleApplyClick = () => {
    trackApplyStart("home_join_section");
    void navigate(PATH.applyList as string);
  };

  return (
    <section className='flex flex-col items-center bg-(--semantic-surface-static-inverse-standard) px-(--semantic-margin-lg) py-(--semantic-margin-5xl)'>
      <div className='flex w-full max-w-[922px] flex-col items-start gap-(--semantic-spacing-48) pt-(--semantic-margin-xl) pb-(--semantic-margin-3xl) tablet:flex-row'>
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
          src={joinSectionImage}
          alt='젝트 구성원들'
          ratio='3:4'
          orientation='landscape'
          isReadonly
          badgeVisible={false}
          className='flex-1 overflow-hidden [&_img]:scale-120'
        />
      </div>
      <div className='mb-(--semantic-spacing-80) flex w-full max-w-[922px] flex-col gap-(--semantic-spacing-32) pt-(--semantic-spacing-32) pb-(--semantic-spacing-12)'>
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
        <div className='grid grid-cols-1 gap-(--semantic-spacing-16) tablet:grid-cols-2 desktop:grid-cols-3'>
          {SPONSORS.map(sponsor => (
            <SponsorCard key={sponsor.name} {...sponsor} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default JoinSection;
