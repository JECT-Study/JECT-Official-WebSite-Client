import { Title } from "@ject/jds";
import type { ReactNode } from "react";

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
          <p className='text-(--semantic-object-alternative) text-[0.875rem] font-normal leading-[1.375rem] tracking-[0.0035rem]'>
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </fieldset>
  );
}
