import { ContentBadge, EmptyState, Tab, Title } from "@jects/jds";

import type { FigmaGuideItem, TeamProjectItem } from "@/constants/curriculumData";
import { figmaGuideCurriculumData, teamProjectScheduleData } from "@/constants/curriculumData";

const TeamProjectCard = ({ item }: { item: TeamProjectItem }) => {
  return (
    <div className='flex flex-col items-start gap-(--semantic-spacing-12) rounded-(--semantic-radius-4) border border-(--semantic-stroke-subtle) bg-(--semantic-surface-shallow) p-(--semantic-margin-sm)'>
      <div className='flex items-center justify-between self-stretch'>
        <p className='label-lg font-(--primitive-font-weight-label-subtle) text-(--semantic-object-alternative)'>
          {item.stepLabel}
        </p>
        {item.badges.length > 0 && (
          <div className='flex items-center gap-(--semantic-spacing-8)'>
            {item.badges.map(badge => (
              <ContentBadge.Theme
                key={badge.label}
                variant={badge.variant}
                size='sm'
                badgeStyle='alpha'
              >
                {badge.label}
              </ContentBadge.Theme>
            ))}
          </div>
        )}
      </div>
      <div className='flex flex-col items-start gap-(--semantic-spacing-8) self-stretch'>
        <Title size='xs' textAlign='left'>
          {item.title}
        </Title>
        <p className='body-lg self-stretch font-(--primitive-font-weight-body-normal) text-(--semantic-object-normal)'>
          {item.description}
        </p>
      </div>
    </div>
  );
};

const FigmaGuideCard = ({ item }: { item: FigmaGuideItem }) => {
  return (
    <div className='flex flex-col items-start gap-(--semantic-spacing-8) rounded-(--semantic-radius-4) border border-(--semantic-stroke-subtle) bg-(--semantic-surface-shallow) p-(--semantic-margin-sm)'>
      <Title size='xs' textAlign='left'>
        {item.title}
      </Title>
      <ul className='body-lg flex flex-col font-(--primitive-font-weight-body-normal) text-(--semantic-object-normal)'>
        {item.descriptions.map(desc => (
          <li key={desc} className='list-inside list-disc'>
            {desc}
          </li>
        ))}
      </ul>
    </div>
  );
};

const CurriculumTabSection = () => {
  return (
    <Tab.Root defaultValue='team-project-schedule' variant='header' className='w-full'>
      <Tab.List aria-label='커리큘럼 탭'>
        <Tab.Trigger value='team-project-schedule'>팀 프로젝트 일정</Tab.Trigger>
        <Tab.Trigger value='figma-guide-curriculum'>피그마 가이드 커리큘럼</Tab.Trigger>
      </Tab.List>

      <Tab.Content value='team-project-schedule'>
        <div className='grid w-full grid-cols-1 gap-(--semantic-spacing-16) pt-(--semantic-spacing-48) tablet:grid-cols-2'>
          {teamProjectScheduleData.map(item => (
            <TeamProjectCard key={item.id} item={item} />
          ))}
          <div className='[&>div]:h-full [&>div]:w-full [&>div]:max-w-full!'>
            <EmptyState
              variant='outlined'
              header='그 밖에 더 많은 활동들이 기다리고 있어요...'
              body='젝트에 합류해서 직접 활동해보세요!'
            />
          </div>
        </div>
      </Tab.Content>

      <Tab.Content value='figma-guide-curriculum'>
        <div className='grid w-full grid-cols-1 gap-(--semantic-spacing-16) pt-(--semantic-spacing-48) tablet:grid-cols-2'>
          {figmaGuideCurriculumData.map(item => (
            <FigmaGuideCard key={item.id} item={item} />
          ))}
        </div>
      </Tab.Content>
    </Tab.Root>
  );
};

export default CurriculumTabSection;
