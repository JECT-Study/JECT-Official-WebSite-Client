import { BlockButton, LabelButton, TextField } from "@ject/jds";
import type { FormEventHandler } from "react";
import { useState } from "react";
import { Controller } from "react-hook-form";

import {
  useCheckEmailExistsMutation,
  useSendAuthCodeMutation,
  useVerifyAuthCodeMutation,
} from "@/hooks/apply";
import { useApplyEmailForm } from "@/hooks/useApplyEmailForm";
import { useCountdownTimer } from "@/hooks/useCountdownTimer";
import { handleError } from "@/utils/errorLogger";
import { deriveInputValidation } from "@/utils/validationHelpers";

const formatTime = (seconds: number) => {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min}:${String(sec).padStart(2, "0")}`;
};

interface AuthCodeFormProps {
  defaultEmail?: string;
  template: "AUTH_CODE" | "PIN_RESET";
  onVerified: (email: string, authCode: string) => void | Promise<void>;
  onExistingMember?: (email: string) => void;
}

export function AuthCodeForm({
  defaultEmail = "",
  template,
  onVerified,
  onExistingMember,
}: AuthCodeFormProps) {
  const [hasSentCode, setHasSentCode] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState<string | null>(null);
  const [authCode, setAuthCode] = useState("");

  const timer = useCountdownTimer();

  const {
    control: emailControl,
    watch: watchEmail,
    getFieldState,
    formState,
  } = useApplyEmailForm();

  const currentEmail = watchEmail("email") || defaultEmail;
  const emailState = getFieldState("email", formState);

  const { mutateAsync: checkEmailMutateAsync } = useCheckEmailExistsMutation();
  const { mutate: sendCodeMutate } = useSendAuthCodeMutation({
    showToast: true,
  });
  const { mutateAsync: verifyCodeMutateAsync } = useVerifyAuthCodeMutation();

  const handleSendEmailCode = async () => {
    setEmailErrorMessage(null);
    //Todo: PIN_RESET 일 때는 checkEmailMutate가 호출되지 않도록
    const isUserExists = await checkEmailMutateAsync(currentEmail);

    if (template === "AUTH_CODE" && isUserExists) {
      onExistingMember?.(currentEmail);
      return;
    }

    if (template === "PIN_RESET" && !isUserExists) {
      setEmailErrorMessage("가입되지 않은 이메일입니다. 이메일을 확인해주세요.");
      return;
    }

    sendCodeMutate(
      { email: currentEmail, template },
      {
        onSuccess: () => {
          setHasSentCode(true);
          if (template === "AUTH_CODE") {
            timer.start(180);
          }
        },
        onError: error => {
          handleError(error, "인증번호 발송 실패");
        },
      },
    );
  };

  const handleVerifyCode: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();

    verifyCodeMutateAsync({
      payload: { email: currentEmail, authCode },
      queryParams: { template },
    })
      .then(() => onVerified(currentEmail, authCode))
      .catch(error => {
        handleError(error, "인증번호 확인 요청 실패");
      });
  };

  const hasEmailFormError = Boolean(emailState.error) || Boolean(emailErrorMessage);

  const emailValidation = deriveInputValidation({
    hasError: hasEmailFormError,
    hasValue: Boolean(currentEmail?.length),
  });

  const emailHelperText = emailState.error?.message ?? emailErrorMessage ?? "";

  const authCodeHelperText = timer.isActive ? formatTime(timer.seconds) : "";

  return (
    <div className='gap-7xl flex flex-col'>
      <Controller
        name='email'
        control={emailControl}
        defaultValue={defaultEmail}
        render={({ field }) => (
          <TextField.Button
            type='email'
            label='이메일'
            validation={emailValidation}
            helperText={emailHelperText}
            placeholder='이메일을 입력해주세요'
            value={field.value}
            onChange={field.onChange}
            button={
              <BlockButton.Basic
                size='md'
                variant='solid'
                hierarchy='primary'
                disabled={!formState.isValid}
                onClick={() => void handleSendEmailCode()}
              >
                인증번호 받기
              </BlockButton.Basic>
            }
          />
        )}
      />
      {hasSentCode && (
        <form className='gap-5xl flex flex-col' onSubmit={handleVerifyCode}>
          <div className='gap-2xs flex flex-col'>
            <TextField.Button
              label='인증번호'
              helperText={authCodeHelperText}
              placeholder='인증번호를 입력해주세요'
              value={authCode}
              onChange={e => setAuthCode(e.target.value)}
              button={
                <BlockButton.Basic type='submit' size='md' variant='solid' hierarchy='primary'>
                  인증하기
                </BlockButton.Basic>
              }
            />
            //Todo: 라우터 확인 후 해당 페이지로 이동
            <LabelButton.Basic size='sm' hierarchy='secondary'>
              인증번호를 받지 못하셨나요?
            </LabelButton.Basic>
          </div>
        </form>
      )}
    </div>
  );
}
