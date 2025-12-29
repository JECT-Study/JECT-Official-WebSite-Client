import { Callout, ContentBadge, EmptyState, Hero, Icon, Image, Label, LabelButton, Title as JdsTitle } from "@ject/jds";
import { useNavigate } from "react-router-dom";

import introTeamMeetingImage from "@/assets/images/intro-team-meeting.png";
import { positionData, programData, statData } from "@/constants/mainPageData";

const wrapperClassName = "gap-(--semantic-spacing-48) flex w-full max-w-[922px] flex-col items-start";

const positionCardStyles = {
  green: "bg-[var(--semantic-theme-green-alpha-subtlest)] border-[var(--semantic-theme-green-alpha-subtler)]",
  sky: "bg-[var(--semantic-theme-sky-alpha-subtlest)] border-[var(--semantic-theme-sky-alpha-subtler)]",
  orange: "bg-[var(--semantic-theme-orange-alpha-subtlest)] border-[var(--semantic-theme-orange-alpha-subtler)]",
  purple: "bg-[var(--semantic-theme-purple-alpha-subtlest)] border-[var(--semantic-theme-purple-alpha-subtler)]",
} as const;

const IntroSection = () => {
  const navigate = useNavigate();

  return (
    <section className='bg-(--semantic-surface-standard) px-0 py-(--semantic-margin-5xl)'>
      <div className='flex w-full flex-col items-center gap-(--semantic-spacing-128) px-(--semantic-margin-lg) pt-(--semantic-margin-xl) pb-(--semantic-spacing-80)'>
        {/* IT 동아리 젝트 */}
        <div className={wrapperClassName}>
          <Image
            src={introTeamMeetingImage}
            alt='젝트 팀원들이 함께 모여 회의하는 모습'
            ratio='9:21'
            orientation='landscape'
            isReadonly
            badgeVisible={false}
            className='overflow-hidden [&_img]:scale-120 [&_img]:object-top'
          />

          <div className='flex flex-col items-start gap-(--semantic-spacing-40)'>
            <div className='flex flex-col items-start gap-(--semantic-spacing-24)'>
              <Hero size='xs' textAlign='left'>IT 동아리 젝트</Hero>
              <div className='flex flex-col gap-(--semantic-spacing-8)'>
                <p className='body-lg font-(--primitive-font-weight-body-bold) text-(--semantic-object-normal)'>
                  젝트는 개발, 기획(매니지먼트), 디자인 관련 포지션의 팀원들이 한 팀이 되어 실제
                  사용자에게 제공되는 디지털 서비스를 직접 만들고 운영하는 IT 동아리입니다.
                </p>
                <p className='body-lg font-(--primitive-font-weight-body-bold) text-(--semantic-object-normal)'>
                  기획-개발-디자인의 협업 과정 전반을 경험하며, 사용자의 불편함을 해결하는 프로덕트
                  개발·운영, 네트워킹을 통한 관계 구축을 핵심 가치로 삼고 있어요.
                </p>
              </div>
            </div>

            <div className='flex w-full flex-col gap-(--semantic-spacing-10)'>
              <div className='grid w-full grid-cols-1 gap-(--semantic-spacing-16) tablet:grid-cols-2 desktop:grid-cols-3'>
                {statData.map(({ id, title, description, isFullWidth }) => (
                  <Callout.Basic
                    key={id}
                    hierarchy='primary'
                    variant='hint'
                    size='lg'
                    title={title}
                    className={isFullWidth ? 'tablet:col-span-2 desktop:col-span-1' : undefined}
                  >
                    {description}
                  </Callout.Basic>
                ))}
              </div>
              <Label as='span' size='sm' weight='normal' color='var(--semantic-object-assistive)'>
                *현 3기 기준, 진행 완료 및 진행중 프로젝트 포함.
              </Label>
            </div>

            <LabelButton.Basic
              hierarchy='accent'
              size='lg'
              suffixIcon='arrow-right-line'
              onClick={() => void navigate("/vision")}
            >
              젝트의 비전과 스토리에 대해
            </LabelButton.Basic>
          </div>
        </div>

        {/* 다양한 포지션들이 젝트와 함께합니다 */}
        <div className={wrapperClassName}>
          <Hero size='xs' textAlign='left'>다양한 포지션들이 젝트와 함께합니다</Hero>

          <div className='grid w-full grid-cols-1 gap-(--semantic-spacing-16) tablet:grid-cols-2'>
            {positionData.map(({ id, title, icon, description, tags, themeColor }) => (
              <div
                key={id}
                className={`flex flex-col gap-(--semantic-spacing-16) rounded-(--semantic-radius-6) px-(--semantic-spacing-24) py-(--semantic-spacing-20) border ${positionCardStyles[themeColor]}`}
              >
                <div className='flex items-center gap-(--semantic-spacing-8)'>
                  <Icon name={icon} size='2xl' />
                  <JdsTitle size='sm' textAlign='left'>
                    {title}
                  </JdsTitle>
                </div>
                <p className='body-md font-(--primitive-font-weight-body-bold) text-(--semantic-object-normal)'>
                  {description}
                </p>
                <div className='flex flex-wrap gap-(--semantic-spacing-8)'>
                  {tags.map((tag) => (
                    <ContentBadge.Theme
                      key={tag}
                      variant={themeColor}
                      size='sm'
                      badgeStyle='alpha'
                      isMuted={false}
                    >
                      {tag}
                    </ContentBadge.Theme>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 프로그램들 */}
        <div className={wrapperClassName}>
          <Hero size='xs' textAlign='left'>구성원들의 성장을 돕는 프로그램들을 운영합니다</Hero>

          <div className='grid w-full grid-cols-1 gap-(--semantic-spacing-16) tablet:grid-cols-2'>
            {programData.map(({ id, title, description }) => (
              <Callout.Basic
                key={id}
                hierarchy={id === 1 ? 'accent' : 'secondary'}
                variant='hint'
                size='md'
                title={`${id}. ${title}`}
              >
                {description}
              </Callout.Basic>
            ))}
            <div className='col-span-full tablet:col-span-1 [&>div]:max-w-full! [&>div]:w-full [&>div]:h-full'>
              <EmptyState
                variant='outlined'
                header='그 밖에 더 많은 활동들이 기다리고 있어요...'
                body='젝트에 합류해서 직접 활동해보세요!'
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
