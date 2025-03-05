import { HeroProps } from './Hero';

import Badge from '@/components/common/badge/Badge';
import Title from '@/components/common/title/Title';

interface HeroIndexProps extends HeroProps {
  index: number;
  badgeBgColor?: string;
  badgeTextColor?: string;
}

function HeroIndex({
  index,
  title,
  badgeText,
  content,
  badgeBgColor = 'bg-fill-assistive-dark',
  badgeTextColor = 'text-object-normal-dark',
}: HeroIndexProps) {
  return (
    <div className='radius-xs border-border-assistive-dark bg-surface-deep-dark gap-4xl flex items-center border px-(--gap-3xl) py-(--gap-2xl)'>
      <div className='min-w-[33px] text-center'>
        <Title hierarchy='stronger'>{index}</Title>
      </div>
      <div className='gap-xs flex flex-col'>
        <div className='gap-sm flex'>
          <Title hierarchy='normal'>{title}</Title>
          <Badge backgroundColor={badgeBgColor} textColor={badgeTextColor}>
            {badgeText}
          </Badge>
        </div>
        <p className='text-object-normal-dark body-lg'>{content}</p>
      </div>
    </div>
  );
}

export default HeroIndex;
