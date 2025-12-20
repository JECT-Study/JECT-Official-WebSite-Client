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
    formState: { errors, isValid, isSubmitting },
  } = useApplyEmailForm();

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = e => {
    void handleSubmit(async ({ email }) => {
      await onSubmit(email);
    })(e);
  };

  const getValidation = () => {
    if (errors.email) return "error";
    if (isValid) return "success";
    return "none";
  };

  return (
    <form className='flex flex-col' onSubmit={handleFormSubmit}>
      <Controller
        name='email'
        control={control}
        defaultValue={defaultEmail}
        render={({ field }) => (
          <TextField
            type='email'
            label='이메일'
            validation={getValidation()}
            helperText={errors.email?.message ?? ""}
            placeholder={placeholder}
            value={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <div className='mt-7xl gap-md flex flex-col'>
        <BlockButton.Basic
          type='submit'
          size='md'
          variant='solid'
          hierarchy='primary'
          disabled={!isValid || isSubmitting}
        >
          {APPLY_BUTTON_TEXT.email.submit}
        </BlockButton.Basic>
      </div>
    </form>
  );
}
