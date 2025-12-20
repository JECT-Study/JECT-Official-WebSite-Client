import { BlockButton, TextField } from "@ject/jds";
import type { FormEventHandler } from "react";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";

import { useSendAuthCodeMutation, useVerifyAuthCodeMutation } from "@/hooks/apply";
import { useApplyAuthCodeForm } from "@/hooks/useApplyAuthCodeForm";
import { handleError } from "@/utils/errorLogger";

interface AuthCodeFormProps {
  email: string;
  template: "AUTH_CODE" | "PIN_RESET";
  onVerified: () => void | Promise<void>;
}

export function AuthCodeForm({ email, template, onVerified }: AuthCodeFormProps) {
  const [isCooldownActive, setIsCooldownActive] = useState(true);
  const [isAuthCodeExpired, setIsAuthCodeExpired] = useState(false);

  const {
    control,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useApplyAuthCodeForm();

  const { mutate: sendCodeMutate, isPending: isResending } = useSendAuthCodeMutation({
    showToast: true,
  });
  const { mutateAsync: verifyCodeMutateAsync } = useVerifyAuthCodeMutation();

  const authCodeValue = watch("authCode");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsCooldownActive(false);
    }, 60000);

    return () => clearTimeout(timer);
  }, []);

  const handleResendCode = () => {
    sendCodeMutate(
      { email, template },
      {
        onSuccess: () => {
          setIsCooldownActive(true);
          setIsAuthCodeExpired(false);

          setTimeout(() => {
            setIsCooldownActive(false);
          }, 60000);
        },
        onError: error => handleError(error, "인증번호 재발송 실패"),
      },
    );
  };

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = e => {
    void handleSubmit(async ({ authCode }) => {
      try {
        await verifyCodeMutateAsync({
          payload: { email, authCode },
          queryParams: { template },
        });
        await onVerified();
      } catch (error) {
        handleError(error, "인증번호 확인 요청 실패");
        setError("authCode", {
          type: "manual",
          message: "인증번호가 올바르지 않거나 유효 시간이 초과되었어요.",
        });
      }
    })(e);
  };

  const getHelperText = () => {
    if (errors.authCode) {
      return errors.authCode.message;
    }
    return "";
  };

  const getAuthCodeValidation = () => {
    if (errors.authCode || isAuthCodeExpired) return "error";
    if (isValid && authCodeValue?.length === 6) return "success";
    return "none";
  };

  return (
    <div className='gap-7xl flex flex-col'>
      <div className='gap-2xs flex flex-col'>
        <TextField
          type='email'
          label='이메일'
          validation='success'
          interaction='disabled'
          value={email}
          onChange={() => {}}
          helperText=''
        />
        <BlockButton.Basic
          size='md'
          variant='solid'
          hierarchy='primary'
          disabled={isCooldownActive || isResending}
          onClick={handleResendCode}
        >
          {isCooldownActive ? "인증번호 발송됨" : "인증번호 재발송"}
        </BlockButton.Basic>
      </div>

      <form className='gap-xs flex flex-col' onSubmit={handleFormSubmit}>
        <Controller
          name='authCode'
          control={control}
          render={({ field }) => (
            <TextField
              label='인증번호'
              validation={getAuthCodeValidation()}
              helperText={getHelperText()}
              placeholder='인증번호를 입력해주세요'
              value={field.value ?? ""}
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
            인증하기
          </BlockButton.Basic>
        </div>
      </form>
    </div>
  );
}
