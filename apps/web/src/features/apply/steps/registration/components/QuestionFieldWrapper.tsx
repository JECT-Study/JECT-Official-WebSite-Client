import { Title } from "@ject/jds";
import type { ReactNode } from "react";

interface QuestionFieldWrapperProps {
  title: string;
  children: ReactNode;
}

export function QuestionFieldWrapper({ title, children }: QuestionFieldWrapperProps) {
  return (
    <fieldset className='gap-2xl flex flex-col'>
      <Title size='xs' textAlign='left'>
        {title}
      </Title>
      {children}
    </fieldset>
  );
}
