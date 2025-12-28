import { ContentBadge, Icon, Image, Tab, Title } from "@ject/jds";
import type { IconName, ThemeVariant } from "@ject/jds";
import { useState } from "react";

import {
  member1,
  member2,
  member3,
  member4,
  member5,
  member6,
  member7,
  member8,
  member9,
  member10,
  member11,
  member12,
  member13,
  member14,
  member15,
  member16,
  member17,
  member18,
} from "@/components/vision";

type SupportersRole = "대표" | "운영" | "행정" | "BX";
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

const roleBadgeVariantMap: Record<SupportersRole, ThemeVariant> = {
  대표: "lime",
  운영: "lime",
  행정: "blue",
  BX: "fuchsia",
};

const roleIconMap: Record<MakersRole, IconName> = {
  프론트엔드: "frontend",
  백엔드: "backend",
  디자인: "design",
  기획: "product",
};

const memberTabs = [
  { value: "supporters", label: "운영 서포터즈" },
  { value: "makers1", label: "메이커스 1팀" },
  { value: "makers2", label: "메이커스 2팀" },
];

const supportersData: SupporterMember[] = [
  { id: 1, name: "왕효준", role: "대표", imageUrl: member1 },
  { id: 2, name: "강채연", role: "운영", imageUrl: member2 },
  { id: 3, name: "김경욱", role: "운영", imageUrl: member3 },
  { id: 4, name: "이길남", role: "운영", imageUrl: member4 },
  { id: 5, name: "홍지호", role: "운영", imageUrl: member5 },
  { id: 6, name: "강석준", role: "행정", imageUrl: member6 },
  { id: 7, name: "김민진", role: "행정", imageUrl: member7 },
  { id: 8, name: "김원준", role: "행정", imageUrl: member8 },
  { id: 9, name: "오창민", role: "행정", imageUrl: member9 },
  { id: 10, name: "김동영", role: "BX", imageUrl: member10 },
  { id: 11, name: "신현지", role: "BX", imageUrl: member11 },
];

const makers1Data: MakersMember[] = [
  { id: 12, name: "강채연", role: "프론트엔드", imageUrl: member2, description: "디자인 시스템을 기반으로 공식 홈페이지를 구현하며 요구사항에 따른 안정적인 UX/UI를 개발합니다." },
  { id: 13, name: "김원준", role: "프론트엔드", imageUrl: member8, description: "홈페이지 운영과 유지 보수 및 전반적인 시스템을 개선합니다." },
  { id: 14, name: "김동구", role: "프론트엔드", imageUrl: member12, description: "디자인 시스템 기반의 일관된 UX/UI를 다듬고 확장하며, 서비스의 사용성을 개선합니다." },
  { id: 15, name: "공희상", role: "백엔드", imageUrl: member13, description: "사용자에게 필요한 기능을 실용적으로 구현하고자 고민하며 몰입하고 있습니다." },
  { id: 16, name: "오준용", role: "백엔드", imageUrl: member14, description: "효율적이고 견고한 백엔드 시스템을 구축하며, 안정성과 확장성을 갖춘 아키텍처를 설계하고 구현합니다." },
  { id: 17, name: "서한이", role: "기획", imageUrl: member15, description: "개발, 디자인팀과 협업해 공식 홈페이지와 백오피스 개발을 조율하며, 프로젝트 목표 달성을 이끌어갑니다." },
  { id: 18, name: "최원준", role: "디자인", imageUrl: member16, description: "프로덕트 관점에서 사용자 흐름과 경험을 설계하며, 서비스 전반의 품질과 일관된 경험을 만들어갑니다." },
];

const makers2Data: MakersMember[] = [
  { id: 19, name: "문소희", role: "프론트엔드", imageUrl: member17, description: "디자인 시스템 문서 플랫폼을 구현하며, 사용자가 쉽게 이해하고 활용할 수 있도록 구조와 사용성에 집중합니다." },
  { id: 20, name: "방재현", role: "프론트엔드", imageUrl: member8, description: "누구나 접근할 수 있는 디자인 시스템 문서 플랫폼을 구축하며, 쉽게 활용할 수 있도록 패키지를 제작합니다." },
  { id: 21, name: "정효림", role: "기획", imageUrl: member18, description: "디자인 시스템의 구조와 기능을 기획하며, 팀이 같은 방향으로 나아갈 수 있도록 이끌어갑니다." },
  { id: 22, name: "김동영", role: "디자인", imageUrl: member10, description: "젝트 BX 및 디자인 시스템(JDS)을 설계하며 긍정적인 협업 경험을 만들어냅니다." },
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
  const [hasImageError, setHasImageError] = useState<boolean>(false);

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
        {member.role === '대표' ? (
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
        <Title size='xs' textAlign='left'>{member.name}</Title>
      </div>
    </div>
  );
};

const MakersCard = ({ member }: { member: MakersMember }) => {
  const [hasImageError, setHasImageError] = useState<boolean>(false);

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
          <Title size='xs' textAlign='left'>{member.name}</Title>
        </div>
        {member.description && (
          <p className='pb-(--semantic-spacing-24) font-(family-name:--primitive-typeface-body) font-(--primitive-font-weight-body-bold) text-(length:--primitive-font-size-body-xs) leading-(--primitive-font-line-height-body-xs) tracking-(--primitive-font-letter-spacing-body-xs) text-(--semantic-object-neutral)'>
            {member.description}
          </p>
        )}
      </div>
    </div>
  );
};

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
            {memberTabs.map((tab) => (
              <Tab.Trigger
                key={tab.value}
                value={tab.value}
                className='data-[state=active]:after:opacity-0!'
              >
                {tab.label}
              </Tab.Trigger>
            ))}
          </Tab.List>

          <Tab.Content value='supporters'>
            <div className='grid grid-cols-2 gap-(--semantic-spacing-16) pt-(--semantic-spacing-32) tablet:grid-cols-4'>
              {supportersData.map((member) => (
                <SupportersCard key={member.id} member={member} />
              ))}
            </div>
          </Tab.Content>

          <Tab.Content value='makers1'>
            <div className='grid grid-cols-1 gap-(--semantic-spacing-16) pt-(--semantic-spacing-32) tablet:grid-cols-2'>
              {makers1Data.map((member) => (
                <MakersCard key={member.id} member={member} />
              ))}
            </div>
          </Tab.Content>

          <Tab.Content value='makers2'>
            <div className='grid grid-cols-1 gap-(--semantic-spacing-16) pt-(--semantic-spacing-32) tablet:grid-cols-2'>
              {makers2Data.map((member) => (
                <MakersCard key={member.id} member={member} />
              ))}
            </div>
          </Tab.Content>
        </Tab.Root>
      </div>
    </section>
  );
};

export default MemberSection;
