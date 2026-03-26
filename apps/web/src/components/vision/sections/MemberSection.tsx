import { ContentBadge, Icon, Image, Tab, Title } from "@jects/jds";
import type { IconName, ThemeVariant } from "@jects/jds";
import { useState } from "react";

import {
  대표_왕효준,
  운영_김경욱,
  운영_홍지호,
  운영_고혜린,
  운영_최지민,
  인프라_강석준,
  인프라_김민진,
  인프라_허정원,
  BX_김동영,
  BX_신현지,
  BX_홍승민,
  메이커스_김원준,
  메이커스_김민준,
  메이커스_김지훈,
  메이커스_김현중,
  메이커스_공희상,
  메이커스_오준용,
  메이커스_강태성,
  메이커스_이재호,
  메이커스_최원준,
  메이커스_권정인,
  메이커스_문소희,
  메이커스_정효림,
  메이커스_방재현,
} from "@/components/vision";

type SupportersRole = "대표" | "운영" | "인프라" | "BX";
type MakersRole = "프론트엔드" | "백엔드" | "디자인" | "기획";

interface SupporterMember {
  id: number;
  name: string;
  role: SupportersRole;
  imageUrl: string;
}

interface MakersMember {
  id: number;
  name: string;
  role: MakersRole;
  imageUrl: string;
  description: string;
}

interface MemberTabItem {
  value: string;
  label: string;
  gridClassName: string;
  renderCards: () => React.ReactNode;
}

const roleBadgeVariantMap: Record<SupportersRole, ThemeVariant> = {
  대표: "lime",
  운영: "lime",
  인프라: "blue",
  BX: "fuchsia",
};

const roleIconMap: Record<MakersRole, IconName> = {
  프론트엔드: "frontend",
  백엔드: "backend",
  디자인: "design",
  기획: "product",
};

const supportersData: SupporterMember[] = [
  { id: 1, name: "왕효준", role: "대표", imageUrl: 대표_왕효준 },
  { id: 2, name: "김경욱", role: "운영", imageUrl: 운영_김경욱 },
  { id: 3, name: "홍지호", role: "운영", imageUrl: 운영_홍지호 },
  { id: 4, name: "고혜린", role: "운영", imageUrl: 운영_고혜린 },
  { id: 5, name: "최지민", role: "운영", imageUrl: 운영_최지민 },
  { id: 6, name: "강석준", role: "인프라", imageUrl: 인프라_강석준 },
  { id: 7, name: "김민진", role: "인프라", imageUrl: 인프라_김민진 },
  { id: 8, name: "허정원", role: "인프라", imageUrl: 인프라_허정원 },
  { id: 9, name: "김동영", role: "BX", imageUrl: BX_김동영 },
  { id: 10, name: "신현지", role: "BX", imageUrl: BX_신현지 },
  { id: 11, name: "홍승민", role: "BX", imageUrl: BX_홍승민 },
];

const makers1Data: MakersMember[] = [
  {
    id: 12,
    name: "김원준",
    role: "프론트엔드",
    imageUrl: 메이커스_김원준,
    description: "홈페이지 운영과 유지 보수 및 전반적인 시스템을 개선합니다.",
  },
  {
    id: 13,
    name: "김민준",
    role: "프론트엔드",
    imageUrl: 메이커스_김민준,
    description: "직관적인 UX/UI를 고민하며 홈페이지와 백오피스를 개발합니다.",
  },
  {
    id: 14,
    name: "김지훈",
    role: "프론트엔드",
    imageUrl: 메이커스_김지훈,
    description: "공식 홈페이지 유지보수와 백오피스 개발을 통해 안정적인 서비스 운영을 지원합니다.",
  },
  {
    id: 15,
    name: "김현중",
    role: "프론트엔드",
    imageUrl: 메이커스_김현중,
    description:
      "디자인 시스템과 컴포넌트 구조에 관심 많은 프론트엔드 개발자입니다. 함께 성장하며 더 나은 경험을 만듭니다.",
  },
  {
    id: 16,
    name: "공희상",
    role: "백엔드",
    imageUrl: 메이커스_공희상,
    description: "사용자에게 필요한 기능을 실용적으로 구현하고자 고민하며 몰입하고 있습니다.",
  },
  {
    id: 17,
    name: "오준용",
    role: "백엔드",
    imageUrl: 메이커스_오준용,
    description:
      "효율적이고 견고한 백엔드 시스템을 구축하며, 안정성과 확장성을 갖춘 아키텍처를 설계하고 구현합니다.",
  },
  {
    id: 18,
    name: "강태성",
    role: "백엔드",
    imageUrl: 메이커스_강태성,
    description: "호기심을 바탕으로 깊게 고민하며, 문제의 본질을 찾아 해결합니다.",
  },
  {
    id: 19,
    name: "이재호",
    role: "기획",
    imageUrl: 메이커스_이재호,
    description:
      "개발자, 디자이너와 협업해 홈페이지와 백오피스 개발을 조율하며, 프로젝트 목표 달성을 이끌어갑니다.",
  },
  {
    id: 20,
    name: "최원준",
    role: "디자인",
    imageUrl: 메이커스_최원준,
    description:
      "프로덕트 관점에서 사용자 흐름과 경험을 설계하며, 서비스 전반의 품질과 일관된 경험을 만들어갑니다.",
  },
  {
    id: 21,
    name: "권정인",
    role: "디자인",
    imageUrl: 메이커스_권정인,
    description: "사용자가 쉽게 이해하고 편안하게 사용할 수 있도록 화면과 구조를 설계합니다.",
  },
];

const makers2Data: MakersMember[] = [
  {
    id: 20,
    name: "문소희",
    role: "프론트엔드",
    imageUrl: 메이커스_문소희,
    description:
      "디자인 시스템 문서 플랫폼을 구현하며, 사용자가 쉽게 이해하고 활용할 수 있도록 구조와 사용성에 집중합니다.",
  },
  {
    id: 20,
    name: "방재현",
    role: "프론트엔드",
    imageUrl: 메이커스_방재현,
    description:
      "누구나 접근할 수 있는 디자인 시스템 문서 플랫폼을 구축하며, 쉽게 활용할 수 있도록 패키지를 제작합니다.",
  },
  {
    id: 21,
    name: "정효림",
    role: "기획",
    imageUrl: 메이커스_정효림,
    description:
      "디자인 시스템의 구조와 기능을 기획하며, 팀이 같은 방향으로 나아갈 수 있도록 이끌어갑니다.",
  },
  {
    id: 22,
    name: "김동영",
    role: "디자인",
    imageUrl: BX_김동영,
    description: "젝트 BX 및 디자인 시스템(JDS)을 설계하며 긍정적인 협업 경험을 만들어냅니다.",
  },
];

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
        {member.description && (
          <p className='desktop:h-10.5 not-desktop:h-15.75 font-(family-name:--primitive-typeface-body) text-(length:--primitive-font-size-body-xs) leading-(--primitive-font-line-height-body-xs) font-(--primitive-font-weight-body-bold) tracking-(--primitive-font-letter-spacing-body-xs) text-(--semantic-object-neutral)'>
            {member.description}
          </p>
        )}
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
