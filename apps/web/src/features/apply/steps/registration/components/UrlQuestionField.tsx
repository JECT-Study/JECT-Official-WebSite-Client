import { TextField } from "@ject/jds";
import type { ChangeEvent } from "react";
import { useState } from "react";

import { QuestionFieldWrapper } from "./QuestionFieldWrapper";

import { APPLY_MESSAGE } from "@/constants/applyMessages";
import type { Question } from "@/types/apis/application";
import { validateUrlDetail, validateUrlStartHttp } from "@/utils/validateUrl";
import { deriveInputValidation } from "@/utils/validationHelpers";

interface UrlQuestionFieldProps {
  question: Question;
  value: string;
  onChange: (id: number, text: string) => void;
}

export function UrlQuestionField({ question, value, onChange }: UrlQuestionFieldProps) {
  const [hasUrlError, setHasUrlError] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    onChange(question.id, url);

    if (url.length === 0) {
      setHasUrlError(false);
    } else {
      setHasUrlError(!validateUrlStartHttp(url));
    }
  };

  const handleBlur = () => {
    if (value.length === 0) {
      setHasUrlError(false);
    } else {
      setHasUrlError(!validateUrlDetail(value));
    }
  };

  const hasValue = value.length > 0;
  const validation = deriveInputValidation({ hasError: hasUrlError, hasValue });
  const helperText = hasUrlError ? APPLY_MESSAGE.invalid.url : "";

  return (
    <QuestionFieldWrapper title={question.title}>
      <TextField
        label={question.label}
        placeholder={question.inputHint}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
        validation={validation}
        helperText={helperText}
      />
    </QuestionFieldWrapper>
  );
}
