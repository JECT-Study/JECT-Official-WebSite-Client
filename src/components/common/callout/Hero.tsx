import Badge from '@/components/common/badge/Badge';
import Title from '@/components/common/title/Title';

export interface HeroProps {
  title: string;
  badgeText: string;
  content: string;
}

function Hero({ title, badgeText, content }: HeroProps) {
  return (
    <div className='gap-xl radius-xs border-border-assistive-dark bg-surface-deep-dark flex flex-col border px-(--gap-3xl) py-(--gap-2xl)'>
      <div className='gap-sm flex'>
        <Title hierarchy='normal'>{title}</Title>
        <Badge backgroundColor='bg-fill-assistive-dark' textColor='text-object-normal-dark'>
          {badgeText}
        </Badge>
      </div>
      <p className='text-object-normal-dark body-lg'>{content}</p>
    </div>
  );
}

export default Hero;
