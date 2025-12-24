import { LabelButton, TextField, type InputValidation } from "@ject/jds";
import type { ChangeEvent } from "react";
import { useState } from "react";

type InputInteraction = "enabled" | "disabled" | "readOnly";

interface PinInputFieldProps {
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  validation?: InputValidation;
  helperText?: string;
  interaction?: InputInteraction;
}

export function PinInputField({
  label = "PIN",
  placeholder = "6자리 비밀번호를 입력해주세요",
  value,
  onChange,
  validation = "none",
  helperText = "",
  interaction = "enabled",
}: PinInputFieldProps) {
  const [isPinHidden, setIsPinHidden] = useState(true);

  const togglePinVisibility = () => {
    setIsPinHidden(prev => !prev);
  };

  const isDisabled = interaction === "disabled";
  const isReadOnly = interaction === "readOnly";

  const buttonLabel = isPinHidden ? "보기" : "숨기기";
  const buttonIcon = isPinHidden ? "eye-off-line" : "eye-line";

  return (
    <TextField.Button
      type={isPinHidden ? "password" : "text"}
      inputMode='numeric'
      maxLength={6}
      autoComplete='off'
      label={label}
      validation={validation}
      helperText={helperText}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      disabled={isDisabled}
      readOnly={isReadOnly}
      button={
        <LabelButton.Basic
          type='button'
          size='lg'
          hierarchy='tertiary'
          prefixIcon={buttonIcon}
          onClick={togglePinVisibility}
          disabled={isDisabled || isReadOnly}
          aria-label={isPinHidden ? "비밀번호 표시" : "비밀번호 숨김"}
        >
          {buttonLabel}
        </LabelButton.Basic>
      }
    />
  );
}
