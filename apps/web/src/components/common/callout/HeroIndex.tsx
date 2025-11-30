import type { HeroProps } from "./Hero";

import Badge from "@/components/common/badge/Badge";
import Title from "@/components/common/title/Title";

interface HeroIndexProps extends HeroProps {
  index: number;
  badgeBgColor?: string;
  badgeTextColor?: string;
}

function HeroIndex({
  index,
  title,
  badgeText,
  children,
  badgeBgColor = "bg-fill-assistive-dark",
  badgeTextColor = "text-object-normal-dark",
}: HeroIndexProps) {
  return (
    <div className='radius-xs gap-4xl flex w-full items-center border border-border-assistive-dark bg-surface-deep-dark px-(--gap-4xl) py-(--gap-xl)'>
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
        <p className='body-lg text-object-normal-dark'>{children}</p>
      </div>
    </div>
  );
}

export default HeroIndex;
