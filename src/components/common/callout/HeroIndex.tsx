import Badge from '../Badge';
import Title from '../Title';
import { HeroProps } from './Hero';

interface HeroIndexProps extends HeroProps {
  index: number;
}

function HeroIndex({ index, title, badgeText, content }: HeroIndexProps) {
  return (
    <div className='radius-xs border-border-assistive-dark bg-surface-deep-dark gap-4xl flex items-center border px-(--gap-3xl) py-(--gap-2xl)'>
      <div className='min-w-[33px] text-center'>
        <Title hierarchy='stronger'>{index}</Title>
      </div>
      <div className='gap-xs flex flex-col'>
        <div className='gap-sm flex'>
          <Title hierarchy='normal'>{title}</Title>
          <Badge
            text={badgeText}
            backgroundColor='bg-fill-assistive-dark'
            textColor='text-object-normal-dark'
          />
        </div>
        <p className='text-object-normal-dark body-lg'>{content}</p>
      </div>
    </div>
  );
}

export default HeroIndex;
