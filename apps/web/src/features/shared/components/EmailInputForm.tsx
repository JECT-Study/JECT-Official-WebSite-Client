import { BlockButton, TextField } from "@ject/jds";
import type { FormEventHandler } from "react";
import { Controller } from "react-hook-form";

import { APPLY_BUTTON_TEXT } from "@/constants/applyMessages";
import { useApplyEmailForm } from "@/hooks/useApplyEmailForm";

interface EmailInputFormProps {
  defaultEmail?: string;
  placeholder?: string;
  onSubmit: (email: string) => void | Promise<void>;
}

export function EmailInputForm({
  defaultEmail = "",
  placeholder = "itclubject@ject.kr",
  onSubmit,
}: EmailInputFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useApplyEmailForm();

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = e => {
    void handleSubmit(async ({ email }) => {
      await onSubmit(email);
    })(e);
  };

  const hasEmailError = Boolean(errors.email);

  const emailValidation: "none" | "success" | "error" = (() => {
    if (hasEmailError) return "error";
    if (isValid) return "success";
    return "none";
  })();

  return (
    <form onSubmit={handleFormSubmit}>
      <Controller
        name='email'
        control={control}
        defaultValue={defaultEmail}
        render={({ field }) => (
          <TextField.Button
            type='email'
            label='이메일'
            validation={emailValidation}
            helperText={errors.email?.message ?? ""}
            placeholder={placeholder}
            value={field.value}
            onChange={field.onChange}
            button={
              <BlockButton.Basic
                type='submit'
                size='md'
                variant='solid'
                hierarchy='primary'
                disabled={!isValid}
              >
                {APPLY_BUTTON_TEXT.email.submit}
              </BlockButton.Basic>
            }
          />
        )}
      />
    </form>
  );
}
