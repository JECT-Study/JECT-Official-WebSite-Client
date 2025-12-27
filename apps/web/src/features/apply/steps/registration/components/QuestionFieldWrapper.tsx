import { Title } from "@ject/jds";
import type { ReactNode } from "react";

interface QuestionFieldWrapperProps {
  title: string;
  isRequired?: boolean;
  children: ReactNode;
}

export function QuestionFieldWrapper({ title, isRequired, children }: QuestionFieldWrapperProps) {
  return (
    <fieldset className='flex flex-col gap-(--semantic-spacing-16) self-stretch'>
      <Title size='xs' textAlign='left'>
        {title}
        {isRequired && (
          <span className='text-feedback-notifying-neutral-light dark:text-feedback-notifying-neutral-dark'>
            *
          </span>
        )}
      </Title>
      {children}
    </fieldset>
  );
}
