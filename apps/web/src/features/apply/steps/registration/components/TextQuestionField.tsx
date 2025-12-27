import { InputArea } from "@ject/jds";
import type { ChangeEvent } from "react";

import { QuestionFieldWrapper } from "./QuestionFieldWrapper";

import type { Question } from "@/apis/apply";
import { APPLY_MESSAGE } from "@/constants/applyMessages";

interface TextQuestionFieldProps {
  question: Question;
  value: string;
  onChange: (id: number, text: string) => void;
}

export function TextQuestionField({ question, value, onChange }: TextQuestionFieldProps) {
  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(question.id, e.target.value);
  };

  const hasError = question.maxTextLength ? value.length > question.maxTextLength : false;
  const validation = hasError ? "error" : "none";
  const helperText = hasError ? APPLY_MESSAGE.invalid.exceedText : "";

  return (
    <QuestionFieldWrapper title={question.title} isRequired={question.isRequired}>
      <InputArea
        placeholder={question.inputHint}
        maxLength={question.maxTextLength ?? undefined}
        value={value}
        onChange={handleChange}
        validation={validation}
        helperText={helperText}
      />
    </QuestionFieldWrapper>
  );
}
