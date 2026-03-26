import { ContentBadge, Icon, Image, Tab, Title } from "@jects/jds";
import { useState } from "react";

import {
  roleBadgeVariantMap,
  roleIconMap,
  supportersData,
  makers1Data,
  makers2Data,
  type SupporterMember,
  type MakersMember,
  type MemberTabItem,
} from "@/constants/memberData";

const FallbackAvatar = ({ size = 48 }: { size?: number }) => (
  <div className='flex h-full w-full items-center justify-center text-(--semantic-object-alternative)'>
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <circle cx='12' cy='8' r='4' />
      <path d='M4 20c0-4 4-6 8-6s8 2 8 6' />
    </svg>
  </div>
);

const SupportersCard = ({ member }: { member: SupporterMember }) => {
  const [hasImageError, setHasImageError] = useState(false);

  return (
    <div className='flex w-full flex-col gap-(--semantic-spacing-20) overflow-hidden rounded-(--semantic-radius-4) border border-(--semantic-stroke-subtle) bg-(--semantic-surface-shallow) p-(--semantic-margin-sm)'>
      <div className='aspect-square w-full overflow-hidden rounded-(--semantic-radius-4) bg-(--semantic-surface-assistive)'>
        {member.imageUrl && !hasImageError ? (
          <Image
            as='div'
            src={member.imageUrl}
            alt={`${member.name} 프로필`}
            ratio='1:1'
            isReadonly
            onError={() => setHasImageError(true)}
          />
        ) : (
          <FallbackAvatar size={48} />
        )}
      </div>
      <div className='flex items-center gap-(--semantic-spacing-8)'>
        {member.role === "대표" ? (
          <ContentBadge.Basic hierarchy='accent' size='sm' badgeStyle='solid'>
            {member.role}
          </ContentBadge.Basic>
        ) : (
          <ContentBadge.Theme
            variant={roleBadgeVariantMap[member.role]}
            size='sm'
            badgeStyle='alpha'
          >
            {member.role}
          </ContentBadge.Theme>
        )}
        <Title size='xs' textAlign='left'>
          {member.name}
        </Title>
      </div>
    </div>
  );
};

const MakersCard = ({ member }: { member: MakersMember }) => {
  const [hasImageError, setHasImageError] = useState(false);

  return (
    <div className='flex w-full gap-(--semantic-spacing-16) overflow-hidden rounded-(--semantic-radius-4) border border-(--semantic-stroke-subtle) bg-(--semantic-surface-shallow) p-(--semantic-margin-sm)'>
      <div className='aspect-square w-20 shrink-0 self-start overflow-hidden rounded-(--semantic-radius-4) bg-(--semantic-surface-assistive)'>
        {member.imageUrl && !hasImageError ? (
          <Image
            as='div'
            src={member.imageUrl}
            alt={`${member.name} 프로필`}
            ratio='1:1'
            isReadonly
            onError={() => setHasImageError(true)}
          />
        ) : (
          <FallbackAvatar size={32} />
        )}
      </div>
      <div className='flex flex-1 flex-col gap-(--semantic-spacing-12)'>
        <div className='flex items-center gap-(--semantic-spacing-8)'>
          <Icon name={roleIconMap[member.role]} size='xl' />
          <Title size='xs' textAlign='left'>
            {member.name}
          </Title>
        </div>

        <p className='desktop:h-[42px] not-desktop:h-[63px] font-(family-name:--primitive-typeface-body) text-(length:--primitive-font-size-body-xs) leading-(--primitive-font-line-height-body-xs) font-(--primitive-font-weight-body-bold) tracking-(--primitive-font-letter-spacing-body-xs) text-(--semantic-object-neutral)'>
          {member.description}
        </p>
      </div>
    </div>
  );
};

const memberTabs: MemberTabItem[] = [
  {
    value: "supporters",
    label: "운영 서포터즈",
    gridClassName: "tablet:grid-cols-4 grid-cols-2",
    renderCards: () =>
      supportersData.map(member => <SupportersCard key={member.id} member={member} />),
  },
  {
    value: "makers1",
    label: "메이커스 1팀",
    gridClassName: "tablet:grid-cols-2 grid-cols-1",
    renderCards: () => makers1Data.map(member => <MakersCard key={member.id} member={member} />),
  },
  {
    value: "makers2",
    label: "메이커스 2팀",
    gridClassName: "tablet:grid-cols-2 grid-cols-1",
    renderCards: () => makers2Data.map(member => <MakersCard key={member.id} member={member} />),
  },
];

const MemberSection = () => {
  return (
    <section className='flex w-full flex-col items-center'>
      <div className='flex w-full max-w-[922px] flex-col items-start gap-(--semantic-spacing-32)'>
        <div className='flex flex-col gap-(--semantic-spacing-16)'>
          <Title size='xs' textAlign='left'>
            <span className='text-(--semantic-accent-normal)'>젝트</span>를 만드는 사람들
          </Title>

          <Title size='md' textAlign='left' color='var(--semantic-object-boldest)'>
            열정 넘치는 구성원들이 젝트에 직접 기여하며 많은 가치를 창출하고 있습니다.
          </Title>
        </div>

        <Tab.Root defaultValue={memberTabs[0].value} variant='header' className='w-full'>
          <Tab.List aria-label='구성원 탭'>
            {memberTabs.map(tab => (
              <Tab.Trigger
                key={tab.value}
                value={tab.value}
                className='data-[state=active]:after:opacity-0!'
              >
                {tab.label}
              </Tab.Trigger>
            ))}
          </Tab.List>

          {memberTabs.map(tab => (
            <Tab.Content key={tab.value} value={tab.value}>
              <div
                className={`grid gap-(--semantic-spacing-16) pt-(--semantic-spacing-32) ${tab.gridClassName}`}
              >
                {tab.renderCards()}
              </div>
            </Tab.Content>
          ))}
        </Tab.Root>
      </div>
    </section>
  );
};

export default MemberSection;
