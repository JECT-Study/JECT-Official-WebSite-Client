import type { ReactNode } from "react";

import Badge from "@/components/common/badge/Badge";
import Title from "@/components/common/title/Title";

export interface HeroProps {
  title: string;
  badgeText?: string;
  children: ReactNode;
}

function Hero({ title, badgeText, children }: HeroProps) {
  return (
    <div className='gap-xs radius-xs flex flex-col border border-border-assistive-dark bg-surface-deep-dark px-(--gap-3xl) py-(--gap-2xl)'>
      <div className='gap-sm flex'>
        <Title hierarchy='normal'>{title}</Title>
        {badgeText && (
          <Badge backgroundColor='bg-fill-assistive-dark' textColor='text-object-normal-dark'>
            {badgeText}
          </Badge>
        )}
      </div>
      <p className='body-lg text-object-normal-dark'>{children}</p>
    </div>
  );
}

export default Hero;
