import type { ReactNode } from "react";

import { Title } from "@/components/common/typography";

interface QuestionFieldWrapperProps {
  title: string;
  subtitle?: string | null;
  isRequired?: boolean;
  children: ReactNode;
}

export function QuestionFieldWrapper({
  title,
  subtitle,
  isRequired,
  children,
}: QuestionFieldWrapperProps) {
  return (
    <fieldset className='flex flex-col gap-(--semantic-spacing-16) self-stretch'>
      <div className='flex flex-col items-start gap-(--semantic-spacing-8) self-stretch'>
        <Title size='xs' textAlign='left'>
          {title}
          {isRequired && (
            <span className='text-feedback-notifying-neutral-light dark:text-feedback-notifying-neutral-dark'>
              *
            </span>
          )}
        </Title>
        {subtitle && (
          <p className='text-[0.875rem] leading-[1.375rem] font-normal tracking-[0.0035rem] text-(--semantic-object-alternative)'>
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </fieldset>
  );
}
